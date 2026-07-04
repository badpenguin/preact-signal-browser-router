# preact-signal-browser-router [![](https://data.jsdelivr.com/v1/package/gh/badpenguin/preact-signal-browser-router/badge)](https://www.jsdelivr.com/package/gh/badpenguin/preact-signal-browser-router)

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

## CDN via jsDelivr

2026-06-27: the Git tag is `v3.0.2`, but jsDelivr exposes GitHub versions without the `v` prefix.
Use the versioned CDN URL:

```html
<script type="importmap">
{
    "imports": {
        "preact": "https://esm.sh/preact@10.26.9",
        "@preact/signals": "https://esm.sh/@preact/signals@2.0.1?deps=preact@10.26.9"
    }
}
</script>
<script type="module">
    import {
        Router,
        route,
        routeReplace,
        routeBackWithoutHash,
        getRouterParams,
        isCurrentRoute
    } from 'https://cdn.jsdelivr.net/gh/badpenguin/preact-signal-browser-router@3.0.2/router.js';
</script>
```

For a buildless single-file Preact + HTM + Signals bundle, see
[preact-htm-signals-standalone](https://github.com/badpenguin/preact-htm-signals-standalone).

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

## v3.0 additions

2026-06-19: v3 adds History API + anchor-hash support without removing the original hash-router behavior.

The important distinction is that `#something` can mean two different things in browser apps:

- **hash as route**: `/#/courses/intro/` means "show the courses intro route";
- **hash as anchor**: `/app/course/cucito/#comments` means "show the course route and scroll to the comments element".

This router originally existed because hash routing was still useful. For that reason v3 keeps the old behavior as the default.
If you already use `prefix="/#"` or routes like `#/page/`, you do not have to change anything.

### `hashMode`

`hashMode` decides whether the hash participates in route matching.

```jsx
<${Router} hashMode="route" />
```

`route` is the default mode. The current path includes the hash, so an URL like `/#/profile/`
can match routes configured for hash navigation.

```jsx
<${Router} hashMode="anchor" />
```

`anchor` mode is for apps that use normal paths with History API and want the hash to behave like
a browser anchor. In this mode `/app/home/#start` can still match a route such as `/home/`.
The hash remains in the URL, but it is ignored only for route matching and active-route checks.

Use `hashMode="anchor"` when:

- your app lives under a real path such as `/app/`;
- routes are normal paths such as `/home/`, `/course/cucito/`, `/post/10/`;
- hashes point to DOM elements such as `#comments`, `#lesson-files`, `#start`;
- you want `route('/app/post/10/#comments')` to render `/post/10/` and scroll to `id="comments"`.

Keep the default `hashMode="route"` when:

- your URLs are hash routes such as `/#/home/`;
- you use `prefix="/#"` or nested hash router prefixes;
- the hash itself identifies the screen to render.

### Anchor scrolling

When `hashMode="anchor"`, `route()` and `routeReplace()` call `history.pushState()` or
`history.replaceState()`. Browsers do not automatically perform native anchor scrolling after
those History API calls, so v3 adds explicit hash scrolling.

If the target exists immediately, the router calls `scrollIntoView()`:

```html
<section id="comments">...</section>
```

```jsx
route('/app/post/10/#comments');
```

If the route renders asynchronously, the target may not exist at the moment `route()` runs.
For that case use `observeMissingHashTargets={true}`.

```jsx
<${Router}
    prefix="/app"
    hashMode="anchor"
    observeMissingHashTargets=${true}
>
    <${PostRoute} path="/post/*" />
<//>
```

With that option enabled, the router waits for the missing element through `MutationObserver`
and scrolls when the element appears. This is useful for views that wait for API data, lazy UI,
or conditional sections.

### Back and forward navigation

Browsers may restore scroll position during back/forward navigation. If the router also scrolls
to the hash during `popstate`, it can fight the browser scroll restoration.

Use `scrollHashOnPopState={false}` when you prefer browser restoration for back/forward:

```jsx
<${Router}
    prefix="/app"
    hashMode="anchor"
    scrollHashOnPopState=${false}
    observeMissingHashTargets=${true}
>
    <${HomeRoute} path="/home/" />
    <${PostRoute} path="/post/*" />
<//>
```

Forward navigation through `route('/path/#target')` still scrolls to the anchor. The option only
controls the `popstate` case.

### `routeReplace()`

`routeReplace(path, params)` behaves like `route(path, params)`, but uses `history.replaceState()`
instead of `history.pushState()`.

Use it when a temporary screen should not remain in browser history:

```jsx
import {routeReplace} from 'preact-signal-browser-router';

function closeEditor(postId, commentId) {
    routeReplace(`/app/post/${postId}/#comment-${commentId}`);
}
```

This is useful for flows such as:

- editor -> detail page;
- login step -> final destination;
- modal-like route -> parent route.

### `routeBackWithoutHash()`

`routeBackWithoutHash()` is a small explicit helper for "Back" buttons:

```jsx
import {routeBackWithoutHash} from 'preact-signal-browser-router';

function BackButton() {
    return html`
        <button type="button" onClick=${routeBackWithoutHash}>
            Back
        </button>
    `;
}
```

The helper delegates to `window.history.back()`. Hash scrolling on the resulting `popstate`
still follows the mounted Router configuration, especially `scrollHashOnPopState`.

### Active route checks

`isCurrentRoute(path)` keeps the default hash-as-route behavior. In an anchor-hash app, either call
it after a Router with `hashMode="anchor"` has mounted, or pass the mode explicitly:

```jsx
import {isCurrentRoute} from 'preact-signal-browser-router';

const active = isCurrentRoute('/post/10/', {
    hashMode: 'anchor'
});
```

With the explicit mode, `/app/post/10/#comments` can be considered active for `/post/10/`.

### Complete examples

Classic hash router, unchanged from v2:

```jsx
<${Router} prefix="/#" fallback=${PageNotFound}>
    <${Route} path="/" component=${PageLogin}/>
    <${Route} path="/home/" component=${PageHome}/>
    <${Route} path="/course/*" component=${PageCourse}/>
<//>
```

History API app with anchor hashes:

```jsx
function PostRoute({routerSearch}) {
    const search = new URLSearchParams(routerSearch);
    const highlight = search.get('highlight') || '';

    return html`
        <${PostView} highlight=${highlight} />
    `;
}

<${Router}
    prefix="/app"
    fallback=${HomeRoute}
    observeSearch=${true}
    hashMode="anchor"
    scrollHashOnPopState=${false}
    observeMissingHashTargets=${true}
>
    <${HomeRoute} path="/home/" />
    <${PostRoute} path="/post/*" />
<//>
```

Programmatic navigation to an async-rendered comment:

```jsx
import {route} from 'preact-signal-browser-router';

function openComment(postId, commentId) {
    route(`/app/post/${postId}/#comment-${commentId}`, {
        from: 'notification'
    });
}
```

The route renders `/post/*`; the hash is kept in the URL and, with
`observeMissingHashTargets={true}`, the router scrolls when `id="comment-123"` appears.

## v3.0.2 additions

2026-06-27: v3.0.2 fixes direct deep-links for History API apps that mount the anchor Router after an application bootstrap step, such as session loading.

- In `hashMode="anchor"`, the Router now re-runs the existing hash resolver when it mounts with a current URL hash.
- This uses the same `scrollToHashTarget()` path as `route()`, `routeReplace()`, `load`, `pageshow`, and `hashchange`.
- If the target is still missing and `observeMissingHashTargets={true}` is enabled, the existing `MutationObserver` pending-target flow is used.
- This covers URLs opened directly, for example `/app/post/10/#comment-123`, when the DOM target appears only after async app data is rendered.

Example:
```jsx
<${Router} prefix="/app" hashMode="anchor" observeMissingHashTargets=${true}>
```

## v3.0.1 additions

2026-06-19: v3.0.1 adds GitHub Pages examples for both `hashMode` variants.

### GitHub Pages demos

2026-06-19: this repository includes two buildless examples that can be published through GitHub Pages:

- [hashMode route](https://badpenguin.github.io/preact-signal-browser-router/examples/hash-route/)
- [hashMode anchor](https://badpenguin.github.io/preact-signal-browser-router/examples/hash-anchor/)

The `hashMode="anchor"` demo uses client-side History API navigation. Open the linked demo index first,
then use the in-page navigation so GitHub Pages does not need a server-side SPA rewrite.

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
