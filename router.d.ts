/*
 * 2026-07-10: public declarations live with the router source so every consumer
 * receives the same API contract instead of maintaining local node_modules shims.
 */
import type {ComponentChildren, ComponentType, VNode} from 'preact';

export type RouterHashMode = 'route' | 'anchor';
export type RouterParams = Record<string, unknown>;

export interface RouterProps {
	children?: ComponentChildren;
	fallback?: ComponentType | null;
	prefix?: string;
	observeSearch?: boolean;
	hashMode?: RouterHashMode;
	scrollHashOnPopState?: boolean;
	observeMissingHashTargets?: boolean;
}

export interface RouteProps {
	component: ComponentType;
	path?: string;
}

export interface CurrentRouteOptions {
	hashMode?: RouterHashMode;
}

export function Router(props: RouterProps): VNode | null;
export function Route(props: RouteProps): VNode;
export function route<TParams extends RouterParams = RouterParams>(path: string, params?: TParams): void;
export function routeReplace<TParams extends RouterParams = RouterParams>(path: string, params?: TParams): void;
export function routeBackWithoutHash(): void;
export function getRouterParams<TParams extends RouterParams = Record<string, any>>(): TParams;
export function isCurrentRoute(path: string, options?: CurrentRouteOptions): boolean;
