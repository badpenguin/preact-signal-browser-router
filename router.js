/**
 * preact-signal-browser-router by Antonio Gallo
 */
import {signal} from '@preact/signals';
import { h } from 'preact';

const debug = true;

const getCurrentPath = function () {
	const pathname = window.location.pathname;
	const hash = window.location.hash.slice(1);
	return pathname + (hash ? '#' + hash : '');
}

const currentPath = signal(getCurrentPath());



const updatePath = () => {
	currentPath.value = getCurrentPath();
};


const matchPath = (path, route, prefix = '') => {
	if (prefix && path.startsWith(prefix)) {
		path = path.slice(prefix.length);
	}
	const regex = new RegExp(`^${route.replace(/\*/g, '.*')}$`);
	return regex.test(path);
};


const Router = ({ children, fallback=null, prefix = '' }) => {
	const	match = children.find(child => matchPath(currentPath.value, child.props.path, prefix));
	debug && console.debug('* Router:', match ? '[path: '+ match.props.path+ ']' : '(NONE)' );
	return match ? match : (fallback ? h(fallback) : null);
};


const Route = ({ component: Component }) => h(Component, {});


// Helper function to navigate
const route = (path) => {
	debug && console.debug('! route:', path);
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

export { Router, Route, route };