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

To switch URL you can use normal links or the **route()** function:
```
<a class="btn" href="#/due/alfa/">TEST2</a>
<button class="btn" onclick="${()=>{route('#/due/alfa/')}}">TEST2</button>
```

For more info to use preact+htm+signal buildless, please see:
https://github.com/badpenguin/buildless-pwa
