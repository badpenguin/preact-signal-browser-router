/**
 * preact-signal-browser-router by Antonio Gallo
 *
 * 2026-05-30: v2 allineata alla copia usata da test3.helecomedia.com.
 * - toChildArray rende Router stabile anche quando Preact passa un singolo child o children annidati;
 * - currentParams conserva piccoli dati runtime associati alla navigazione fatta via route();
 * - isCurrentRoute() espone un helper minimale per stati attivi di menu/header senza duplicare logica nell'app.
 * - 2026-06-01: observeSearch abilita render su cambio query string senza cambiare il matching delle route.
 */
import {signal} from '@preact/signals';
import {h, toChildArray} from 'preact';

const debug = true;

const getCurrentPath = function () {
	const pathname = window.location.pathname;
	const hash = window.location.hash.slice(1);
	return pathname + (hash ? '#' + hash : '');
}

const getCurrentSearch = function () {
	return window.location.search;
}

const currentPath = signal(getCurrentPath());
const currentSearch = signal(getCurrentSearch());

const updatePath = () => {
	currentPath.value = getCurrentPath();
	currentSearch.value = getCurrentSearch();
};

let currentParams = {};

const getRouterParams = function () {
	return currentParams;
}


const matchPath = (path, route, prefix = '') => {
	if (prefix && path.startsWith(prefix)) {
		path = path.slice(prefix.length);
	}
	const regex = new RegExp(`^${route.replace(/\*/g, '.*')}$`);
	return regex.test(path);
};


const isCurrentRoute = (path) => {
	path = '/' + path;
	return (currentPath.value === path);
}


const Router = ({children, fallback = null, prefix = '', observeSearch = false}) => {
	const search = observeSearch ? currentSearch.value : '';

	const childArray = toChildArray(children);
	const match = childArray.find(child => matchPath(currentPath.value, child.props.path, prefix));
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
	currentParams = params;
	window.history.pushState(null, null, path);
	updatePath();
};


// Start listening
window.addEventListener('hashchange', updatePath);
window.addEventListener('load', updatePath);
window.addEventListener('popstate', updatePath);

// Intercept any link's click for relative URLs
document.addEventListener('click', (event) => {
	const target = event.target.closest('a');
	if (target && target.matches('a[href^="/"]')) {
		event.preventDefault();
		const href = target.getAttribute('href');
		route(href);
	}
});

export {Router, Route, route, getRouterParams, isCurrentRoute};
