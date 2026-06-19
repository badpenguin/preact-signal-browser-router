/**
 * preact-signal-browser-router by Antonio Gallo
 *
 * 2026-05-30: v2 allineata alla copia usata da test3.helecomedia.com.
 * - toChildArray rende Router stabile anche quando Preact passa un singolo child o children annidati;
 * - currentParams conserva piccoli dati runtime associati alla navigazione fatta via route();
 * - isCurrentRoute() espone un helper minimale per stati attivi di menu/header senza duplicare logica nell'app.
 * - 2026-06-01: observeSearch abilita render su cambio query string senza cambiare il matching delle route.
 * - 2026-06-02: gestione opzionale degli hash come ancore DOM tramite hashMode="anchor".
 * - 2026-06-19: hashMode mantiene compatibile il routing hash storico e rende opt-in il comportamento anchor usato dalle app con History API.
 */
import {signal} from '@preact/signals';
import {h, toChildArray} from 'preact';

const debug = false;
const HASH_MODE_ROUTE = 'route';
const HASH_MODE_ANCHOR = 'anchor';

const getCurrentPath = function () {
	const pathname = window.location.pathname;
	const hash = window.location.hash.slice(1);
	return pathname + (hash ? '#' + hash : '');
}

const getCurrentSearch = function () {
	return window.location.search;
}

const getHashTargetId = function (path) {
	const hash = path.split('#')[1] || '';
	return decodeURIComponent(hash);
}

const currentPath = signal(getCurrentPath());
const currentSearch = signal(getCurrentSearch());
let currentHashMode = HASH_MODE_ROUTE;
let scrollHashOnPopState = true;
let observeMissingHashTargets = false;
let pendingHashObserver = null;
let pendingHashTimeout = null;
let pendingHashTargetId = '';
const pendingHashTimeoutMs = 15000;

const updatePath = () => {
	currentPath.value = getCurrentPath();
	currentSearch.value = getCurrentSearch();
};

const normalizeHashMode = function (hashMode) {
	return hashMode === HASH_MODE_ANCHOR ? HASH_MODE_ANCHOR : HASH_MODE_ROUTE;
}

const isAnchorHashMode = function (hashMode = currentHashMode) {
	return normalizeHashMode(hashMode) === HASH_MODE_ANCHOR;
}

const clearPendingHashScroll = (reason) => {
	if (!pendingHashObserver && !pendingHashTimeout) {
		return;
	}

	debug && console.debug('[router-scroll] clear pending hash target', {
		reason,
		targetId: pendingHashTargetId,
		scrollY: window.scrollY
	});

	if (pendingHashObserver) {
		pendingHashObserver.disconnect();
		pendingHashObserver = null;
	}

	if (pendingHashTimeout) {
		window.clearTimeout(pendingHashTimeout);
		pendingHashTimeout = null;
	}

	pendingHashTargetId = '';
};

const startPendingHashScroll = (path, targetId) => {
	/*
	 * 2026-06-02: alcune view renderizzano il target hash dopo il cambio route,
	 * e in produzione potranno aspettare REST/cache. Il router osserva il DOM solo se abilitato.
	 */
	if (!observeMissingHashTargets || pendingHashTargetId === targetId || !window.MutationObserver) {
		return;
	}

	clearPendingHashScroll('new pending hash target');
	pendingHashTargetId = targetId;

	const root = document.getElementById('app') || document.body;

	debug && console.debug('[router-scroll] wait pending hash target', {
		path,
		targetId,
		scrollY: window.scrollY
	});

	pendingHashObserver = new MutationObserver(() => {
		const target = document.getElementById(targetId);

		if (!target) {
			return;
		}

		debug && console.debug('[router-scroll] scroll pending hash target', {
			path,
			targetId,
			scrollY: window.scrollY
		});
		clearPendingHashScroll('target found');
		target.scrollIntoView();
	});

	pendingHashObserver.observe(root, {
		childList: true,
		subtree: true
	});

	pendingHashTimeout = window.setTimeout(() => {
		debug && console.debug('[router-scroll] pending hash target timeout', {
			path,
			targetId,
			scrollY: window.scrollY
		});
		clearPendingHashScroll('timeout');
	}, pendingHashTimeoutMs);
};

const scrollToHashTarget = (path) => {
	/*
	 * 2026-06-02: pushState non esegue lo scroll nativo dell'ancora.
	 * Se la route contiene #start o altri hash gia' presenti nel DOM, il router replica il comportamento browser.
	 */
	const targetId = getHashTargetId(path);

	if (!targetId) {
		clearPendingHashScroll('route without hash');
		return;
	}

	const target = document.getElementById(targetId);

	if (!target) {
		debug && console.debug('[router-scroll] hash target missing', {
			path,
			targetId,
			scrollY: window.scrollY
		});
		startPendingHashScroll(path, targetId);
		return;
	}

	clearPendingHashScroll('target already available');
	debug && console.debug('[router-scroll] scrollIntoView hash target', {
		path,
		targetId,
		scrollY: window.scrollY
	});
	target.scrollIntoView();
};

const updatePathFromPopState = () => {
	/*
	 * 2026-06-02: back/forward browser puo' ripristinare lo scroll nativo.
	 * scrollHashOnPopState permette all'app di evitare che #start sovrascriva quel restore.
	 */
	updatePath();

	if (!scrollHashOnPopState) {
		clearPendingHashScroll('popstate hash scroll disabled');
		debug && console.debug('[router-scroll] skip hash scroll on popstate', {
			path: getCurrentPath(),
			scrollY: window.scrollY
		});
		return;
	}

	scrollToHashTarget(getCurrentPath());
};

let currentParams = {};

const getRouterParams = function () {
	return currentParams;
}


const matchPath = (path, route, prefix = '', hashMode = HASH_MODE_ROUTE) => {
	/*
	 * 2026-06-19: il default resta hash-as-route per non rompere le app che usano prefix="/#".
	 * Solo hashMode="anchor" replica il comportamento anchor dove #start e' un'ancora DOM fuori dal matching.
	 */
	if (isAnchorHashMode(hashMode)) {
		path = path.split('#')[0];
	}

	if (prefix && path.startsWith(prefix)) {
		path = path.slice(prefix.length);
	}
	const regex = new RegExp(`^${route.replace(/\*/g, '.*')}$`);
	return regex.test(path);
};


const isCurrentRoute = (path, options = {}) => {
	const hashMode = normalizeHashMode(options.hashMode || currentHashMode);

	path = '/' + path;
	return isAnchorHashMode(hashMode)
		? currentPath.value.split('#')[0] === path.split('#')[0]
		: currentPath.value === path;
}


const Router = ({
	children,
	fallback = null,
	prefix = '',
	observeSearch = false,
	hashMode = HASH_MODE_ROUTE,
	scrollHashOnPopState: nextScrollHashOnPopState = true,
	observeMissingHashTargets: nextObserveMissingHashTargets = false
}) => {
	/*
	 * 2026-06-19: hashMode="route" conserva il router hash storico; le opzioni scroll sono attive solo in anchor mode.
	 * La preferenza e' globale perche' i listener History API sono registrati una sola volta a livello modulo.
	 * observeMissingHashTargets resta opt-in per app con contenuti async o caricati via API.
	 */
	currentHashMode = normalizeHashMode(hashMode);
	scrollHashOnPopState = isAnchorHashMode() && nextScrollHashOnPopState;
	observeMissingHashTargets = isAnchorHashMode() && nextObserveMissingHashTargets;
	const search = observeSearch ? currentSearch.value : '';

	const childArray = toChildArray(children);
	const match = childArray.find(child => matchPath(currentPath.value, child.props.path, prefix, currentHashMode));
	debug && console.debug('* Router:', match ? '[path: ' + match.props.path + ']' : '(NONE)');
	return match
		? observeSearch
			? h(match.type, {...match.props, routerSearch: search})
			: match
		: (fallback ? h(fallback) : null);
};


//noinspection JSUnusedGlobalSymbols
const Route = ({component: Component}) => h(Component, {});


// Helper function to navigate
const route = (path, params) => {
	params = params || {};
	debug && console.debug('! route:', path, params);
	clearPendingHashScroll('route change');
	currentParams = params;
	window.history.pushState(null, null, path);
	updatePath();
	if (isAnchorHashMode()) {
		scrollToHashTarget(path);
	}
};

const routeReplace = (path, params) => {
	/*
	 * 2026-06-16: sostituisce la entry corrente quando una pagina figlia viene chiusa.
	 * Serve per flussi come editor commento -> post, dove il form non deve restare nella history.
	 */
	params = params || {};
	debug && console.debug('! route replace:', path, params);
	clearPendingHashScroll('route replace');
	currentParams = params;
	window.history.replaceState(null, null, path);
	updatePath();
	if (isAnchorHashMode()) {
		scrollToHashTarget(path);
	}
};

const routeBackWithoutHash = () => {
	/*
	 * 2026-06-02: helper esplicito per UI "Torna indietro".
	 * Con scrollHashOnPopState=false il popstate aggiorna la route senza scrollare l'hash.
	 */
	debug && console.debug('[router-scroll] back without hash', {
		path: getCurrentPath(),
		scrollY: window.scrollY
	});
	window.history.back();
};

const updatePathFromLoad = () => {
	/*
	 * 2026-06-02: apertura diretta di URL con hash.
	 * Il browser puo' tentare lo scroll prima che Preact abbia renderizzato il target; usiamo la stessa risoluzione pending.
	 */
	updatePath();
	if (isAnchorHashMode()) {
		scrollToHashTarget(getCurrentPath());
	}
};

const updatePathFromPageShow = () => {
	/*
	 * 2026-06-02: su refresh il browser puo' applicare scroll restoration dopo load.
	 * Rieseguiamo la risoluzione hash al frame successivo, senza cambiare la logica back/forward popstate.
	 */
	updatePath();

	if (!isAnchorHashMode() || !getHashTargetId(getCurrentPath())) {
		return;
	}

	window.requestAnimationFrame(() => {
		debug && console.debug('[router-scroll] pageshow hash check', {
			path: getCurrentPath(),
			scrollY: window.scrollY
		});
		scrollToHashTarget(getCurrentPath());
	});
};

const updatePathFromHashChange = () => {
	/*
	 * 2026-06-19: in route mode il cambio hash e' routing storico; in anchor mode attiva anche lo scroll DOM.
	 */
	updatePath();
	if (isAnchorHashMode()) {
		scrollToHashTarget(getCurrentPath());
	}
};


// Start listening
window.addEventListener('hashchange', updatePathFromHashChange);
window.addEventListener('load', updatePathFromLoad);
window.addEventListener('pageshow', updatePathFromPageShow);
window.addEventListener('popstate', updatePathFromPopState);

// Intercept any link's click for relative URLs
document.addEventListener('click', (event) => {
	const target = event.target.closest('a');
	if (target && target.matches('a[href^="/"]')) {
		event.preventDefault();
		const href = target.getAttribute('href');
		route(href);
	}
});

export {Router, Route, route, routeReplace, routeBackWithoutHash, getRouterParams, isCurrentRoute};
