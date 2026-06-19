Since `preact-router` gots deprecated and the suggested replacement `preact-iso` does not support hash navigation,
I tried to create a very small and minimal router that will work in the browser.

It is very simple.
- usa a **Router** wrapper component with 2 optional parameters:
  - "prefix" will remove that initial string from the matching URL;
  - "fallback" will provide a default component;
- use the **Route** component with 2 mandatory parameters
  - "path", it can be an exact matching, or you can use "*" as wildcard;
  - "component", ofc its your component
- as alternative to Route you can use your own component with just the "path" attribute 

## v2 additions

2026-05-30: v2 keeps the original minimal API and adds the helpers already used by `test3.helecomedia.com`.

- `route(path, params)` can receive an optional params object for small runtime navigation state.
- `getRouterParams()` returns the params object passed to the last `route()` call.
- `isCurrentRoute(path)` returns `true` when the current path matches the provided app path.
- `Router` now normalizes children through Preact `toChildArray()`, so it works reliably with one child,
  multiple children and nested arrays.

## v2.2 additions

2026-06-01: `Router` can optionally observe query string changes without using the query string for route matching.

- `observeSearch={true}` makes the router re-render when `window.location.search` changes.
- The route match still uses only the path/hash managed by the router, so `/app/home/?q=test` can still match `/home/`.
- The matched child receives a `routerSearch` prop with the current query string, for example `?q=test`.
- Default is `false`, so existing apps keep the old behavior.

## v2.3 additions

2026-06-19: v2.3 updates dependencies for Preact Signals v2 without changing router behavior.

- `@preact/signals` now uses the `^2.0.0` range.
- `preact` now requires `>=10.25.0`, matching the Signals v2 peer dependency.
- Signals v2 can defer DOM updates, so tests or code that inspects DOM immediately after `route()` may need to wait for Preact rendering.
- Hash routing behavior is unchanged in v2.3.0.

Example:
```jsx
function HomeRoute({routerSearch}) {
    const q = new URLSearchParams(routerSearch).get('q') || '';
    return html`<${HomePage} q=${q} />`;
}

<${Router} prefix="/app" fallback=${HomeRoute} observeSearch=${true}>
    <${HomeRoute} path="/home/" />
<//>
```

Example using HTM library:
```jsx
<${Router} prefix="/#" fallback=${PageNotFound}>
    <${Route} path="/" component=${PageLogin}/>
    <${Router} path="/uno/*" prefix="/#/uno" fallback=${PageNotFound}>
        <${Route} path="/uno/" component=${PageUno}/>
        <${Route} path="/due/*" component=${PageDue}/>
        <${Route} path="*" component=${PageNotFound}/>
    <//>
    <${Route} path="/due/*" component=${PageCorsi}/>
<//>
```

## Navigation

To switch URL you can use normal links or the **route()** function.

Relative links are intercepted automatically by the router:

```html
<a class="btn" href="/app/home/">Home</a>
<a class="btn" href="#/due/alfa/">TEST2</a>
```

The router listens for clicks on `a[href^="/"]`, calls `event.preventDefault()`
and internally runs `route(href)`, so relative links such as `/app/home/` do not
reload the page.

Do not duplicate link navigation with both `href` and `onclick`. Use only
`href` for normal internal links.

Use **route()** for programmatic navigation, buttons, forms, or when you need
runtime params:

```jsx
<button class="btn" onclick=${() => route('#/due/alfa/')}>TEST2</button>
<button class="btn" onclick=${() => route('/profile', {from: 'feed'})}>Profile</button>
```

To read params after navigation:
```jsx
const params = getRouterParams();
```

For more info to use preact+htm+signal buildless, please see:
https://github.com/badpenguin/buildless-pwa

## Building

```
yarn install
yarn build
```
