var t,i,n,o;function r(o,r,e){var _,f,u,c={};for(u in r)"key"==u?_=r[u]:"ref"==u?f=r[u]:c[u]=r[u];if(arguments.length>2&&(c.children=arguments.length>3?t.call(arguments,2):e),"function"==typeof o&&null!=o.defaultProps)for(u in o.defaultProps)void 0===c[u]&&(c[u]=o.defaultProps[u]);return function(t,o,r,e,_){var f={type:t,props:o,key:r,ref:e,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==_?++n:_,__i:-1,__u:0};return null==_&&null!=i.vnode&&i.vnode(f),f}(o,c,_,f,null)}t=[].slice,i={__e:function(t,i,n,o){for(var r,e,_;i=i.__;)if((r=i.__c)&&!r.__)try{if((e=r.constructor)&&null!=e.getDerivedStateFromError&&(r.setState(e.getDerivedStateFromError(t)),_=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(t,o||{}),_=r.__d),_)return r.__E=r}catch(i){t=i}throw t}},n=0,o=function(t){return null!=t&&null==t.constructor},"function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout;var e,_,f,u,c=0,v=[],s=[],a=i,h=a.__b,d=a.__r,l=a.diffed,p=a.__c,y=a.unmount,m=a.__;function g(t,i){var n=function(t,i){a.__h&&a.__h(_,t,c||i),c=0;var n=_.__H||(_.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({__V:s}),n.__[t]}(e++,7);return function(t,i){return!t||t.length!==i.length||i.some((function(i,n){return i!==t[n]}))}(n.__H,i)?(n.__V=t(),n.i=i,n.__h=t,n.__V):n.__}function w(){for(var t;t=v.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(E),t.__H.__h.forEach(x),t.__H.__h=[]}catch(i){t.__H.__h=[],a.__e(i,t.__v)}}a.__b=function(t){_=null,h&&h(t)},a.__=function(t,i){t&&i.__k&&i.__k.__m&&(t.__m=i.__k.__m),m&&m(t,i)},a.__r=function(t){d&&d(t),e=0;var i=(_=t.__c).__H;i&&(f===_?(i.__h=[],_.__h=[],i.__.forEach((function(t){t.__N&&(t.__=t.__N),t.__V=s,t.__N=t.i=void 0}))):(i.__h.forEach(E),i.__h.forEach(x),i.__h=[],e=0)),f=_},a.diffed=function(t){l&&l(t);var i=t.__c;i&&i.__H&&(i.__H.__h.length&&(1!==v.push(i)&&u===a.requestAnimationFrame||((u=a.requestAnimationFrame)||S)(w)),i.__H.__.forEach((function(t){t.i&&(t.__H=t.i),t.__V!==s&&(t.__=t.__V),t.i=void 0,t.__V=s}))),f=_=null},a.__c=function(t,i){i.some((function(t){try{t.__h.forEach(E),t.__h=t.__h.filter((function(t){return!t.__||x(t)}))}catch(n){i.some((function(t){t.__h&&(t.__h=[])})),i=[],a.__e(n,t.__v)}})),p&&p(t,i)},a.unmount=function(t){y&&y(t);var i,n=t.__c;n&&n.__H&&(n.__H.__.forEach((function(t){try{E(t)}catch(t){i=t}})),n.__H=void 0,i&&a.__e(i,n.__v))};var b="function"==typeof requestAnimationFrame;function S(t){var i,n=function(){clearTimeout(o),b&&cancelAnimationFrame(i),setTimeout(t)},o=setTimeout(n,100);b&&(i=requestAnimationFrame(n))}function E(t){var i=_,n=t.__c;"function"==typeof n&&(t.__c=void 0,n()),_=i}function x(t){var i=_;t.__c=t.__(),_=i}var H,k,N=Symbol.for("preact-signals");function $(){if(U>1)U--;else{for(var t,i=!1;void 0!==k;){var n=k;for(k=void 0,A++;void 0!==n;){var o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&D(n))try{n.c()}catch(n){i||(t=n,i=!0)}n=o}}if(A=0,U--,i)throw t}}var P,U=0,A=0,V=0;function F(t){if(void 0!==H){var i=t.n;return void 0===i||i.t!==H?(i={i:0,S:t,p:H.s,n:void 0,t:H,e:void 0,x:void 0,r:i},void 0!==H.s&&(H.s.n=i),H.s=i,t.n=i,32&H.f&&t.S(i),i):-1===i.i?(i.i=0,void 0!==i.n&&(i.n.p=i.p,void 0!==i.p&&(i.p.n=i.n),i.p=H.s,i.n=void 0,H.s.n=i,H.s=i),i):void 0}}function O(t){this.v=t,this.i=0,this.n=void 0,this.t=void 0}function C(t){return new O(t)}function D(t){for(var i=t.s;void 0!==i;i=i.n)if(i.S.i!==i.i||!i.S.h()||i.S.i!==i.i)return!0;return!1}function T(t){for(var i=t.s;void 0!==i;i=i.n){var n=i.S.n;if(void 0!==n&&(i.r=n),i.S.n=i,i.i=-1,void 0===i.n){t.s=i;break}}}function q(t){for(var i,n=t.s;void 0!==n;){var o=n.p;-1===n.i?(n.S.U(n),void 0!==o&&(o.n=n.n),void 0!==n.n&&(n.n.p=o)):i=n,n.S.n=n.r,void 0!==n.r&&(n.r=void 0),n=o}t.s=i}function L(t){O.call(this,void 0),this.x=t,this.s=void 0,this.g=V-1,this.f=4}function j(t){var i=t.u;if(t.u=void 0,"function"==typeof i){U++;var n=H;H=void 0;try{i()}catch(i){throw t.f&=-2,t.f|=8,R(t),i}finally{H=n,$()}}}function R(t){for(var i=t.s;void 0!==i;i=i.n)i.S.U(i);t.x=void 0,t.s=void 0,j(t)}function G(t){if(H!==this)throw new Error("Out-of-order effect");q(this),H=t,this.f&=-2,8&this.f&&R(this),$()}function J(t){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}function W(t){var i=new J(t);try{i.c()}catch(t){throw i.d(),t}return i.d.bind(i)}function z(t,n){i[t]=n.bind(null,i[t]||function(){})}function B(t){P&&P(),P=t&&t.S()}function I(t){var i=this,n=t.data,r=function(t){return g((function(){return C(t)}),[])}(n);r.value=n;var e=g((function(){for(var t=i.__v;t=t.__;)if(t.__c){t.__c.__$f|=4;break}return i.__$u.c=function(){var t;o(e.peek())||3!==(null==(t=i.base)?void 0:t.nodeType)?(i.__$f|=1,i.setState({})):i.base.data=e.peek()},function(t){return new L(t)}((function(){var t=r.value.value;return 0===t?0:!0===t?"":t||""}))}),[]);return e.value}function K(t,i,n,o){var r=i in t&&void 0===t.ownerSVGElement,e=C(n);return{o:function(t,i){e.value=t,o=i},d:W((function(){var n=e.value.value;o[i]!==n&&(o[i]=n,r?t[i]=n:n?t.setAttribute(i,n):t.removeAttribute(i))}))}}O.prototype.brand=N,O.prototype.h=function(){return!0},O.prototype.S=function(t){this.t!==t&&void 0===t.e&&(t.x=this.t,void 0!==this.t&&(this.t.e=t),this.t=t)},O.prototype.U=function(t){if(void 0!==this.t){var i=t.e,n=t.x;void 0!==i&&(i.x=n,t.e=void 0),void 0!==n&&(n.e=i,t.x=void 0),t===this.t&&(this.t=n)}},O.prototype.subscribe=function(t){var i=this;return W((function(){var n=i.value,o=H;H=void 0;try{t(n)}finally{H=o}}))},O.prototype.valueOf=function(){return this.value},O.prototype.toString=function(){return this.value+""},O.prototype.toJSON=function(){return this.value},O.prototype.peek=function(){var t=H;H=void 0;try{return this.value}finally{H=t}},Object.defineProperty(O.prototype,"value",{get:function(){var t=F(this);return void 0!==t&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(A>100)throw new Error("Cycle detected");this.v=t,this.i++,V++,U++;try{for(var i=this.t;void 0!==i;i=i.x)i.t.N()}finally{$()}}}}),(L.prototype=new O).h=function(){if(this.f&=-3,1&this.f)return!1;if(32==(36&this.f))return!0;if(this.f&=-5,this.g===V)return!0;if(this.g=V,this.f|=1,this.i>0&&!D(this))return this.f&=-2,!0;var t=H;try{T(this),H=this;var i=this.x();(16&this.f||this.v!==i||0===this.i)&&(this.v=i,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return H=t,q(this),this.f&=-2,!0},L.prototype.S=function(t){if(void 0===this.t){this.f|=36;for(var i=this.s;void 0!==i;i=i.n)i.S.S(i)}O.prototype.S.call(this,t)},L.prototype.U=function(t){if(void 0!==this.t&&(O.prototype.U.call(this,t),void 0===this.t)){this.f&=-33;for(var i=this.s;void 0!==i;i=i.n)i.S.U(i)}},L.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;void 0!==t;t=t.x)t.t.N()}},Object.defineProperty(L.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=F(this);if(this.h(),void 0!==t&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),J.prototype.c=function(){var t=this.S();try{if(8&this.f)return;if(void 0===this.x)return;var i=this.x();"function"==typeof i&&(this.u=i)}finally{t()}},J.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,j(this),T(this),U++;var t=H;return H=this,G.bind(this,t)},J.prototype.N=function(){2&this.f||(this.f|=2,this.o=k,k=this)},J.prototype.d=function(){this.f|=8,1&this.f||R(this)},I.displayName="_st",Object.defineProperties(O.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:I},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}}),z("__b",(function(t,i){if("string"==typeof i.type){var n,o=i.props;for(var r in o)if("children"!==r){var e=o[r];e instanceof O&&(n||(i.__np=n={}),n[r]=e,o[r]=e.peek())}}t(i)})),z("__r",(function(t,i){B();var n,o=i.__c;o&&(o.__$f&=-2,void 0===(n=o.__$u)&&(o.__$u=n=function(t){var i;return W((function(){i=this})),i.c=function(){o.__$f|=1,o.setState({})},i}())),B(n),t(i)})),z("__e",(function(t,i,n,o){B(),t(i,n,o)})),z("diffed",(function(t,i){var n;if(B(),"string"==typeof i.type&&(n=i.__e)){var o=i.__np,r=i.props;if(o){var e=n.U;if(e)for(var _ in e){var f=e[_];void 0===f||_ in o||(f.d(),e[_]=void 0)}else e={},n.U=e;for(var u in o){var c=e[u],v=o[u];void 0===c?(c=K(n,u,v,r),e[u]=c):c.o(v,r)}}}t(i)})),z("unmount",(function(t,i){if("string"==typeof i.type){var n=i.__e;if(n){var o=n.U;if(o)for(var r in n.U=void 0,o){var e=o[r];e&&e.d()}}}else{var _=i.__c;if(_){var f=_.__$u;f&&(_.__$u=void 0,f.d())}}t(i)})),z("__h",(function(t,i,n,o){(o<3||9===o)&&(i.__$f|=2),t(i,n,o)}));var M=function(){var t=window.location.pathname,i=window.location.hash.slice(1);return t+(i?"#"+i:"")},Q=C(M()),X=function(){Q.value=M()},Y=function(t){var i=t.children,n=t.fallback,o=void 0===n?null:n,e=t.prefix,_=void 0===e?"":e,f=i.find((function(t){return function(t,i){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return n&&t.startsWith(n)&&(t=t.slice(n.length)),new RegExp("^".concat(i.replace(/\*/g,".*"),"$")).test(t)}(Q.value,t.props.path,_)}));return console.debug("* Router:",f?"[path: "+f.props.path+"]":"(NONE)"),f||(o?r(o):null)},Z=function(t){return r(t.component,{})},tt=function(t){console.debug("! route:",t),window.history.pushState(null,null,t),X()};window.addEventListener("hashchange",X),window.addEventListener("load",X),window.addEventListener("popstate",X),document.addEventListener("click",(function(t){var i=t.target.closest("a");if(i&&i.matches('a[href^="/"]')){t.preventDefault();var n=i.getAttribute("href");tt(n)}}));export{Z as Route,Y as Router,tt as route};
//# sourceMappingURL=router.esm.js.map
