import{e as n3,f as o3,h as i3,q as t3,r as r3}from"./chunk-LSQYAVNN.js";import{a as R2}from"./chunk-DNTQYIQK.js";import{a as l3,d as I2}from"./chunk-BBSSQVTJ.js";import{a as s3,b as e3,c as a3,d as z2}from"./chunk-5MB42A56.js";import{$ as f2,A as I1,Aa as Y1,B as k2,Ba as F2,C as A2,D as P2,Da as k,Fa as X1,Ga as $1,H as R1,Ha as K1,Ia as Q1,J as O1,K as B1,Ka as D2,L as d,La as J1,M as g,Ma as R,N as H1,Na as Y,Oa as Z1,P,Pa as c3,Q as _1,Qa as X,R as x,S as u2,U as r,V as f,W as N,Z as E2,_ as U1,aa as T,ba as q1,c as V,ca as j1,da as m,ea as s2,fa as v,j as c2,la as S,oa as _,pa as T2,qa as m2,t as l2,u as F1,w as r2,wa as W1,xa as G1,y as b,ya as I,z as D1,za as V1}from"./chunk-VFUYZ56M.js";function j4(c,l){if(c&1&&(r(0,"div",1),m(1),f()),c&2){let a=l.ngIf;x("ngClass",a.type),d(),v(" ",a.message," ")}}var f3=(()=>{let l=class l{constructor(s){this.notificationService=s,this.notification$=this.notificationService.notifications$,this.notifSub=this.notification$.subscribe(e=>{e&&e.duration&&setTimeout(()=>{this.notificationService.clear()},e.duration)})}};l.\u0275fac=function(e){return new(e||l)(g(l3))},l.\u0275cmp=b({type:l,selectors:[["app-root"]],standalone:!0,features:[S],decls:3,vars:3,consts:[["class","toast",3,"ngClass",4,"ngIf"],[1,"toast",3,"ngClass"]],template:function(e,n){e&1&&(P(0,j4,2,2,"div",0),_(1,"async"),N(2,"router-outlet")),e&2&&x("ngIf",T2(1,1,n.notification$))},dependencies:[k,W1,I,V1,J1],styles:[".toast[_ngcontent-%COMP%]{position:fixed;top:30px;right:30px;z-index:99999;padding:1.5rem 2.5rem;border-radius:12px;color:#fff;font-weight:700;font-size:1.2rem;box-shadow:0 4px 12px #00000026;min-width:300px;text-align:center;opacity:.98;transition:opacity .3s}.toast.success[_ngcontent-%COMP%]{background:#27ae60}.toast.error[_ngcontent-%COMP%]{background:#e74c3c}.toast.info[_ngcontent-%COMP%]{background:#3498db}.toast.warning[_ngcontent-%COMP%]{background:#f1c40f;color:#222}"]});let c=l;return c})();var C2=(()=>{let l=class l{constructor(s,e){this.authService=s,this.router=e}canActivate(){if(this.authService.isLoggedIn()){let s=this.authService.isAdmin(),e=this.router.url;return console.log("[AuthGuard] isAdmin:",s,"| url:",e),s&&!e.includes("/admin")?(console.log("[AuthGuard] Redirection admin vers /admin/dashboard"),this.router.navigate(["/admin/dashboard"]),!1):!s&&e.includes("/admin")?(console.log("[AuthGuard] Redirection membre vers /dashboard"),this.router.navigate(["/dashboard"]),!1):!0}return console.log("[AuthGuard] Non connect\xE9, redirection vers /auth/login"),this.router.navigate(["/auth/login"]),!1}};l.\u0275fac=function(e){return new(e||l)(r2(I2),r2(R))},l.\u0275prov=l2({token:l,factory:l.\u0275fac,providedIn:"root"});let c=l;return c})();var m3=(()=>{let l=class l{constructor(s,e){this.authService=s,this.router=e}canActivate(){return this.authService.isAdmin()?!0:(console.warn("Acc\xE8s non autoris\xE9 : redirection vers le dashboard membre"),this.router.navigate(["/dashboard"]),!1)}};l.\u0275fac=function(e){return new(e||l)(r2(I2),r2(R))},l.\u0275prov=l2({token:l,factory:l.\u0275fac,providedIn:"root"});let c=l;return c})();function G4(c,l){if(c&1){let a=E2();r(0,"button",31),f2("click",function(){A2(a);let e=T().$implicit,n=T();return P2(n.registerForEvent(e.id))}),m(1," Inscrit "),f()}}function V4(c,l){if(c&1&&(r(0,"div",19)(1,"div",20)(2,"span",21),m(3),_(4,"date"),f(),r(5,"span",22),m(6),_(7,"date"),_(8,"uppercase"),f(),r(9,"span",23),m(10),_(11,"date"),f()(),r(12,"div",24)(13,"div",25),N(14,"img",26),f(),r(15,"div",27)(16,"div",28),m(17),f(),r(18,"h3",29),m(19),f(),P(20,G4,2,0,"button",30),f()()()),c&2){let a=l.$implicit;d(3),s2(m2(4,8,a.date,"d")),d(3),s2(T2(8,14,m2(7,11,a.date,"MMM"))),d(4),s2(m2(11,16,a.date,"yyyy")),d(4),x("src",a.image,B1)("alt",a.title),d(3),v("B\xB0 ",a.category,""),d(2),s2(a.title),d(),x("ngIf",!a.isRegistered)}}var L3=(()=>{let l=class l{constructor(s){this.eventService=s,this.events=[{id:"1",image:"assets/members/Clara.jpg",category:"Wouters & Hendrix",title:"Bedrijfsbezoek Wouters & Hendrix",location:"Wouters & Hendrix",date:new Date("2024-02-04"),organizer:{name:"Clara",avatar:"assets/members/Clara.jpg"}},{id:"2",image:"assets/members/Jon.jpg",category:"Silversquare Bailli",title:"Hall of Time - Chaque grande r\xE9ussite commence par une id\xE9e audacieuse...",location:"Silversquare Bailli",date:new Date("2024-02-04"),organizer:{name:"Jon",avatar:"assets/members/Jon.jpg"}},{id:"3",image:"assets/members/Nat.jpg",category:"Brabant Wallon (Axis Parc)",title:"Business Speed Dating - Axis Parc",location:"Axis Parc",date:new Date("2024-02-05"),organizer:{name:"Nat",avatar:"assets/members/Nat.jpg"}}]}ngOnInit(){this.loadEvents()}loadEvents(){this.eventService.getEventsByMonth(new Date).subscribe({next:s=>{console.log("\xC9v\xE9nements charg\xE9s:",s)},error:s=>{console.error("Erreur lors du chargement des \xE9v\xE9nements:",s)}})}registerForEvent(s){this.eventService.registerForEvent(s).subscribe({next:()=>{let e=this.events.find(n=>n.id===s);e&&(e.isRegistered=!0)},error:e=>{console.error("Erreur lors de l'inscription:",e)}})}};l.\u0275fac=function(e){return new(e||l)(g(z2))},l.\u0275cmp=b({type:l,selectors:[["app-calendar"]],standalone:!0,features:[S],decls:36,vars:1,consts:[[1,"agenda-wrapper"],[1,"new-event-btn"],[1,"fas","fa-plus"],[1,"region-selector"],[1,"fas","fa-map-marker-alt"],[1,"fas","fa-chevron-down"],[1,"events-list"],["class","event-card",4,"ngFor","ngForOf"],[1,"bottom-nav"],["routerLink","/agenda","routerLinkActive","active",1,"nav-item"],[1,"fas","fa-calendar"],["routerLink","/carpool",1,"nav-item"],[1,"fas","fa-car"],["routerLink","/profile",1,"nav-item"],[1,"fas","fa-user"],["routerLink","/search",1,"nav-item"],[1,"fas","fa-search"],["routerLink","/messages",1,"nav-item"],[1,"fas","fa-comment"],[1,"event-card"],[1,"event-date-block"],[1,"day"],[1,"month"],[1,"year"],[1,"event-content"],[1,"event-image"],[3,"src","alt"],[1,"event-details"],[1,"category"],[1,"title"],["class","register-btn",3,"click",4,"ngIf"],[1,"register-btn",3,"click"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"h1"),m(2,"Gestion des \xC9v\xE9nements"),f(),r(3,"button",1),N(4,"i",2),m(5," Nouvel \xE9v\xE9nement "),f(),r(6,"div",3),N(7,"i",4),r(8,"span"),m(9,"S\xE9lectionnez une r\xE9gion BT9"),f(),N(10,"i",5),f(),r(11,"h2"),m(12,"Prochainement"),f(),r(13,"div",6),P(14,V4,21,19,"div",7),f(),r(15,"nav",8)(16,"a",9),N(17,"i",10),r(18,"span"),m(19,"Agenda"),f()(),r(20,"a",11),N(21,"i",12),r(22,"span"),m(23,"Carpool"),f()(),r(24,"a",13),N(25,"i",14),r(26,"span"),m(27,"Profil"),f()(),r(28,"a",15),N(29,"i",16),r(30,"span"),m(31,"Recherche"),f()(),r(32,"a",17),N(33,"i",18),r(34,"span"),m(35,"Messages"),f()()()()),e&2&&(d(14),x("ngForOf",n.events))},dependencies:[k,G1,I,Y1,F2,X,Y,Z1],styles:[".agenda-wrapper[_ngcontent-%COMP%]{padding:2rem;background:#f8f9fa;min-height:100vh}h1[_ngcontent-%COMP%]{font-size:1.5rem;margin-bottom:1rem}.new-event-btn[_ngcontent-%COMP%]{background:#28a745;color:#fff;border:none;padding:.5rem 1rem;border-radius:4px;display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;cursor:pointer}.region-selector[_ngcontent-%COMP%]{background:#ff6b35;color:#fff;padding:1rem;display:flex;align-items:center;justify-content:space-between;border-radius:4px;margin-bottom:2rem;cursor:pointer}.events-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.event-card[_ngcontent-%COMP%]{background:#fff;border-radius:8px;overflow:hidden;display:flex;box-shadow:0 2px 4px #0000001a}.event-date-block[_ngcontent-%COMP%]{background:#fff;padding:1rem;text-align:center;min-width:80px;border-right:1px solid #eee}.day[_ngcontent-%COMP%]{display:block;font-size:1.5rem;font-weight:700;color:#333}.month[_ngcontent-%COMP%]{display:block;font-size:.8rem;color:#666;text-transform:uppercase}.year[_ngcontent-%COMP%]{display:block;font-size:.8rem;color:#666}.event-content[_ngcontent-%COMP%]{flex:1;display:flex;gap:1rem;padding:1rem}.event-image[_ngcontent-%COMP%]{width:120px;height:120px;border-radius:8px;overflow:hidden}.event-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.event-details[_ngcontent-%COMP%]{flex:1}.category[_ngcontent-%COMP%]{color:#666;font-size:.9rem;margin-bottom:.5rem}.title[_ngcontent-%COMP%]{margin:0 0 1rem;font-size:1.1rem;color:#333}.register-btn[_ngcontent-%COMP%]{background:#ff6b35;color:#fff;border:none;padding:.5rem 1rem;border-radius:4px;cursor:pointer}.bottom-nav[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(5,1fr);padding:.5rem;background:#fff;border-top:1px solid #eee}.nav-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:.3rem;text-decoration:none;color:#666;font-size:.8rem}.nav-item.active[_ngcontent-%COMP%]{color:#ff6b35}.nav-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.2rem}"]});let c=l;return c})();function Y4(c,l,a){return(l=$4(l))in c?Object.defineProperty(c,l,{value:a,enumerable:!0,configurable:!0,writable:!0}):c[l]=a,c}function p3(c,l){var a=Object.keys(c);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(c);l&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(c,e).enumerable})),a.push.apply(a,s)}return a}function i(c){for(var l=1;l<arguments.length;l++){var a=arguments[l]!=null?arguments[l]:{};l%2?p3(Object(a),!0).forEach(function(s){Y4(c,s,a[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(a)):p3(Object(a)).forEach(function(s){Object.defineProperty(c,s,Object.getOwnPropertyDescriptor(a,s))})}return c}function X4(c,l){if(typeof c!="object"||!c)return c;var a=c[Symbol.toPrimitive];if(a!==void 0){var s=a.call(c,l||"default");if(typeof s!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(l==="string"?String:Number)(c)}function $4(c){var l=X4(c,"string");return typeof l=="symbol"?l:l+""}var M3=()=>{},N1={},U3={},q3=null,j3={mark:M3,measure:M3};try{typeof window<"u"&&(N1=window),typeof document<"u"&&(U3=document),typeof MutationObserver<"u"&&(q3=MutationObserver),typeof performance<"u"&&(j3=performance)}catch{}var{userAgent:d3=""}=N1.navigator||{},K=N1,h=U3,u3=q3,B2=j3,I8=!!K.document,W=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",W3=~d3.indexOf("MSIE")||~d3.indexOf("Trident/"),K4=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Q4=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,G3={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},J4={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},V3=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],y="classic",W2="duotone",Z4="sharp",c0="sharp-duotone",Y3=[y,W2,Z4,c0],l0={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},s0={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},e0=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),a0={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},n0=["fak","fa-kit","fakd","fa-kit-duotone"],C3={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},o0=["kit"],i0={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},t0=["fak","fakd"],r0={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},h3={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},H2={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},f0=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],m0=["fak","fa-kit","fakd","fa-kit-duotone"],z0={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},L0={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},p0={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},n1={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},M0=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],o1=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...f0,...M0],d0=["solid","regular","light","thin","duotone","brands"],X3=[1,2,3,4,5,6,7,8,9,10],u0=X3.concat([11,12,13,14,15,16,17,18,19,20]),C0=[...Object.keys(p0),...d0,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",H2.GROUP,H2.SWAP_OPACITY,H2.PRIMARY,H2.SECONDARY].concat(X3.map(c=>"".concat(c,"x"))).concat(u0.map(c=>"w-".concat(c))),h0={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},q="___FONT_AWESOME___",i1=16,$3="fa",K3="svg-inline--fa",n2="data-fa-i2svg",t1="data-fa-pseudo-element",g0="data-fa-pseudo-element-pending",b1="data-prefix",S1="data-icon",g3="fontawesome-i2svg",x0="async",N0=["HTML","HEAD","STYLE","SCRIPT"],Q3=(()=>{try{return!0}catch{return!1}})();function S2(c){return new Proxy(c,{get(l,a){return a in l?l[a]:l[y]}})}var J3=i({},G3);J3[y]=i(i(i(i({},{"fa-duotone":"duotone"}),G3[y]),C3.kit),C3["kit-duotone"]);var b0=S2(J3),r1=i({},a0);r1[y]=i(i(i(i({},{duotone:"fad"}),r1[y]),h3.kit),h3["kit-duotone"]);var x3=S2(r1),f1=i({},n1);f1[y]=i(i({},f1[y]),r0.kit);var y1=S2(f1),m1=i({},L0);m1[y]=i(i({},m1[y]),i0.kit);var R8=S2(m1),S0=K4,Z3="fa-layers-text",y0=Q4,v0=i({},l0),O8=S2(v0),w0=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],c1=J4,k0=[...o0,...C0],g2=K.FontAwesomeConfig||{};function A0(c){var l=h.querySelector("script["+c+"]");if(l)return l.getAttribute(c)}function P0(c){return c===""?!0:c==="false"?!1:c==="true"?!0:c}h&&typeof h.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(l=>{let[a,s]=l,e=P0(A0(a));e!=null&&(g2[s]=e)});var c4={styleDefault:"solid",familyDefault:y,cssPrefix:$3,replacementClass:K3,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};g2.familyPrefix&&(g2.cssPrefix=g2.familyPrefix);var M2=i(i({},c4),g2);M2.autoReplaceSvg||(M2.observeMutations=!1);var z={};Object.keys(c4).forEach(c=>{Object.defineProperty(z,c,{enumerable:!0,set:function(l){M2[c]=l,x2.forEach(a=>a(z))},get:function(){return M2[c]}})});Object.defineProperty(z,"familyPrefix",{enumerable:!0,set:function(c){M2.cssPrefix=c,x2.forEach(l=>l(z))},get:function(){return M2.cssPrefix}});K.FontAwesomeConfig=z;var x2=[];function E0(c){return x2.push(c),()=>{x2.splice(x2.indexOf(c),1)}}var $=i1,O={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function T0(c){if(!c||!W)return;let l=h.createElement("style");l.setAttribute("type","text/css"),l.innerHTML=c;let a=h.head.childNodes,s=null;for(let e=a.length-1;e>-1;e--){let n=a[e],o=(n.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(s=n)}return h.head.insertBefore(l,s),c}var F0="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function N2(){let c=12,l="";for(;c-- >0;)l+=F0[Math.random()*62|0];return l}function d2(c){let l=[];for(let a=(c||[]).length>>>0;a--;)l[a]=c[a];return l}function v1(c){return c.classList?d2(c.classList):(c.getAttribute("class")||"").split(" ").filter(l=>l)}function l4(c){return"".concat(c).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function D0(c){return Object.keys(c||{}).reduce((l,a)=>l+"".concat(a,'="').concat(l4(c[a]),'" '),"").trim()}function G2(c){return Object.keys(c||{}).reduce((l,a)=>l+"".concat(a,": ").concat(c[a].trim(),";"),"")}function w1(c){return c.size!==O.size||c.x!==O.x||c.y!==O.y||c.rotate!==O.rotate||c.flipX||c.flipY}function I0(c){let{transform:l,containerWidth:a,iconWidth:s}=c,e={transform:"translate(".concat(a/2," 256)")},n="translate(".concat(l.x*32,", ").concat(l.y*32,") "),o="scale(".concat(l.size/16*(l.flipX?-1:1),", ").concat(l.size/16*(l.flipY?-1:1),") "),t="rotate(".concat(l.rotate," 0 0)"),p={transform:"".concat(n," ").concat(o," ").concat(t)},L={transform:"translate(".concat(s/2*-1," -256)")};return{outer:e,inner:p,path:L}}function R0(c){let{transform:l,width:a=i1,height:s=i1,startCentered:e=!1}=c,n="";return e&&W3?n+="translate(".concat(l.x/$-a/2,"em, ").concat(l.y/$-s/2,"em) "):e?n+="translate(calc(-50% + ".concat(l.x/$,"em), calc(-50% + ").concat(l.y/$,"em)) "):n+="translate(".concat(l.x/$,"em, ").concat(l.y/$,"em) "),n+="scale(".concat(l.size/$*(l.flipX?-1:1),", ").concat(l.size/$*(l.flipY?-1:1),") "),n+="rotate(".concat(l.rotate,"deg) "),n}var O0=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function s4(){let c=$3,l=K3,a=z.cssPrefix,s=z.replacementClass,e=O0;if(a!==c||s!==l){let n=new RegExp("\\.".concat(c,"\\-"),"g"),o=new RegExp("\\--".concat(c,"\\-"),"g"),t=new RegExp("\\.".concat(l),"g");e=e.replace(n,".".concat(a,"-")).replace(o,"--".concat(a,"-")).replace(t,".".concat(s))}return e}var N3=!1;function l1(){z.autoAddCss&&!N3&&(T0(s4()),N3=!0)}var B0={mixout(){return{dom:{css:s4,insertCss:l1}}},hooks(){return{beforeDOMElementCreation(){l1()},beforeI2svg(){l1()}}}},j=K||{};j[q]||(j[q]={});j[q].styles||(j[q].styles={});j[q].hooks||(j[q].hooks={});j[q].shims||(j[q].shims=[]);var B=j[q],e4=[],a4=function(){h.removeEventListener("DOMContentLoaded",a4),q2=1,e4.map(c=>c())},q2=!1;W&&(q2=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),q2||h.addEventListener("DOMContentLoaded",a4));function H0(c){W&&(q2?setTimeout(c,0):e4.push(c))}function y2(c){let{tag:l,attributes:a={},children:s=[]}=c;return typeof c=="string"?l4(c):"<".concat(l," ").concat(D0(a),">").concat(s.map(y2).join(""),"</").concat(l,">")}function b3(c,l,a){if(c&&c[l]&&c[l][a])return{prefix:l,iconName:a,icon:c[l][a]}}var _0=function(l,a){return function(s,e,n,o){return l.call(a,s,e,n,o)}},s1=function(l,a,s,e){var n=Object.keys(l),o=n.length,t=e!==void 0?_0(a,e):a,p,L,M;for(s===void 0?(p=1,M=l[n[0]]):(p=0,M=s);p<o;p++)L=n[p],M=t(M,l[L],L,l);return M};function U0(c){let l=[],a=0,s=c.length;for(;a<s;){let e=c.charCodeAt(a++);if(e>=55296&&e<=56319&&a<s){let n=c.charCodeAt(a++);(n&64512)==56320?l.push(((e&1023)<<10)+(n&1023)+65536):(l.push(e),a--)}else l.push(e)}return l}function z1(c){let l=U0(c);return l.length===1?l[0].toString(16):null}function q0(c,l){let a=c.length,s=c.charCodeAt(l),e;return s>=55296&&s<=56319&&a>l+1&&(e=c.charCodeAt(l+1),e>=56320&&e<=57343)?(s-55296)*1024+e-56320+65536:s}function S3(c){return Object.keys(c).reduce((l,a)=>{let s=c[a];return!!s.icon?l[s.iconName]=s.icon:l[a]=s,l},{})}function L1(c,l){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},{skipHooks:s=!1}=a,e=S3(l);typeof B.hooks.addPack=="function"&&!s?B.hooks.addPack(c,S3(l)):B.styles[c]=i(i({},B.styles[c]||{}),e),c==="fas"&&L1("fa",l)}var{styles:b2,shims:j0}=B,n4=Object.keys(y1),W0=n4.reduce((c,l)=>(c[l]=Object.keys(y1[l]),c),{}),k1=null,o4={},i4={},t4={},r4={},f4={};function G0(c){return~k0.indexOf(c)}function V0(c,l){let a=l.split("-"),s=a[0],e=a.slice(1).join("-");return s===c&&e!==""&&!G0(e)?e:null}var m4=()=>{let c=s=>s1(b2,(e,n,o)=>(e[o]=s1(n,s,{}),e),{});o4=c((s,e,n)=>(e[3]&&(s[e[3]]=n),e[2]&&e[2].filter(t=>typeof t=="number").forEach(t=>{s[t.toString(16)]=n}),s)),i4=c((s,e,n)=>(s[n]=n,e[2]&&e[2].filter(t=>typeof t=="string").forEach(t=>{s[t]=n}),s)),f4=c((s,e,n)=>{let o=e[2];return s[n]=n,o.forEach(t=>{s[t]=n}),s});let l="far"in b2||z.autoFetchSvg,a=s1(j0,(s,e)=>{let n=e[0],o=e[1],t=e[2];return o==="far"&&!l&&(o="fas"),typeof n=="string"&&(s.names[n]={prefix:o,iconName:t}),typeof n=="number"&&(s.unicodes[n.toString(16)]={prefix:o,iconName:t}),s},{names:{},unicodes:{}});t4=a.names,r4=a.unicodes,k1=V2(z.styleDefault,{family:z.familyDefault})};E0(c=>{k1=V2(c.styleDefault,{family:z.familyDefault})});m4();function A1(c,l){return(o4[c]||{})[l]}function Y0(c,l){return(i4[c]||{})[l]}function a2(c,l){return(f4[c]||{})[l]}function z4(c){return t4[c]||{prefix:null,iconName:null}}function X0(c){let l=r4[c],a=A1("fas",c);return l||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function Q(){return k1}var L4=()=>({prefix:null,iconName:null,rest:[]});function $0(c){let l=y,a=n4.reduce((s,e)=>(s[e]="".concat(z.cssPrefix,"-").concat(e),s),{});return Y3.forEach(s=>{(c.includes(a[s])||c.some(e=>W0[s].includes(e)))&&(l=s)}),l}function V2(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{family:a=y}=l,s=b0[a][c];if(a===W2&&!c)return"fad";let e=x3[a][c]||x3[a][s],n=c in B.styles?c:null;return e||n||null}function K0(c){let l=[],a=null;return c.forEach(s=>{let e=V0(z.cssPrefix,s);e?a=e:s&&l.push(s)}),{iconName:a,rest:l}}function y3(c){return c.sort().filter((l,a,s)=>s.indexOf(l)===a)}function Y2(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{skipLookups:a=!1}=l,s=null,e=o1.concat(m0),n=y3(c.filter(C=>e.includes(C))),o=y3(c.filter(C=>!o1.includes(C))),t=n.filter(C=>(s=C,!V3.includes(C))),[p=null]=t,L=$0(n),M=i(i({},K0(o)),{},{prefix:V2(p,{family:L})});return i(i(i({},M),c6({values:c,family:L,styles:b2,config:z,canonical:M,givenPrefix:s})),Q0(a,s,M))}function Q0(c,l,a){let{prefix:s,iconName:e}=a;if(c||!s||!e)return{prefix:s,iconName:e};let n=l==="fa"?z4(e):{},o=a2(s,e);return e=n.iconName||o||e,s=n.prefix||s,s==="far"&&!b2.far&&b2.fas&&!z.autoFetchSvg&&(s="fas"),{prefix:s,iconName:e}}var J0=Y3.filter(c=>c!==y||c!==W2),Z0=Object.keys(n1).filter(c=>c!==y).map(c=>Object.keys(n1[c])).flat();function c6(c){let{values:l,family:a,canonical:s,givenPrefix:e="",styles:n={},config:o={}}=c,t=a===W2,p=l.includes("fa-duotone")||l.includes("fad"),L=o.familyDefault==="duotone",M=s.prefix==="fad"||s.prefix==="fa-duotone";if(!t&&(p||L||M)&&(s.prefix="fad"),(l.includes("fa-brands")||l.includes("fab"))&&(s.prefix="fab"),!s.prefix&&J0.includes(a)&&(Object.keys(n).find(u=>Z0.includes(u))||o.autoFetchSvg)){let u=e0.get(a).defaultShortPrefixId;s.prefix=u,s.iconName=a2(s.prefix,s.iconName)||s.iconName}return(s.prefix==="fa"||e==="fa")&&(s.prefix=Q()||"fas"),s}var p1=class{constructor(){this.definitions={}}add(){for(var l=arguments.length,a=new Array(l),s=0;s<l;s++)a[s]=arguments[s];let e=a.reduce(this._pullDefinitions,{});Object.keys(e).forEach(n=>{this.definitions[n]=i(i({},this.definitions[n]||{}),e[n]),L1(n,e[n]);let o=y1[y][n];o&&L1(o,e[n]),m4()})}reset(){this.definitions={}}_pullDefinitions(l,a){let s=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(s).map(e=>{let{prefix:n,iconName:o,icon:t}=s[e],p=t[2];l[n]||(l[n]={}),p.length>0&&p.forEach(L=>{typeof L=="string"&&(l[n][L]=t)}),l[n][o]=t}),l}},v3=[],L2={},p2={},l6=Object.keys(p2);function s6(c,l){let{mixoutsTo:a}=l;return v3=c,L2={},Object.keys(p2).forEach(s=>{l6.indexOf(s)===-1&&delete p2[s]}),v3.forEach(s=>{let e=s.mixout?s.mixout():{};if(Object.keys(e).forEach(n=>{typeof e[n]=="function"&&(a[n]=e[n]),typeof e[n]=="object"&&Object.keys(e[n]).forEach(o=>{a[n]||(a[n]={}),a[n][o]=e[n][o]})}),s.hooks){let n=s.hooks();Object.keys(n).forEach(o=>{L2[o]||(L2[o]=[]),L2[o].push(n[o])})}s.provides&&s.provides(p2)}),a}function M1(c,l){for(var a=arguments.length,s=new Array(a>2?a-2:0),e=2;e<a;e++)s[e-2]=arguments[e];return(L2[c]||[]).forEach(o=>{l=o.apply(null,[l,...s])}),l}function o2(c){for(var l=arguments.length,a=new Array(l>1?l-1:0),s=1;s<l;s++)a[s-1]=arguments[s];(L2[c]||[]).forEach(n=>{n.apply(null,a)})}function J(){let c=arguments[0],l=Array.prototype.slice.call(arguments,1);return p2[c]?p2[c].apply(null,l):void 0}function d1(c){c.prefix==="fa"&&(c.prefix="fas");let{iconName:l}=c,a=c.prefix||Q();if(l)return l=a2(a,l)||l,b3(p4.definitions,a,l)||b3(B.styles,a,l)}var p4=new p1,e6=()=>{z.autoReplaceSvg=!1,z.observeMutations=!1,o2("noAuto")},a6={i2svg:function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return W?(o2("beforeI2svg",c),J("pseudoElements2svg",c),J("i2svg",c)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},{autoReplaceSvgRoot:l}=c;z.autoReplaceSvg===!1&&(z.autoReplaceSvg=!0),z.observeMutations=!0,H0(()=>{o6({autoReplaceSvgRoot:l}),o2("watch",c)})}},n6={icon:c=>{if(c===null)return null;if(typeof c=="object"&&c.prefix&&c.iconName)return{prefix:c.prefix,iconName:a2(c.prefix,c.iconName)||c.iconName};if(Array.isArray(c)&&c.length===2){let l=c[1].indexOf("fa-")===0?c[1].slice(3):c[1],a=V2(c[0]);return{prefix:a,iconName:a2(a,l)||l}}if(typeof c=="string"&&(c.indexOf("".concat(z.cssPrefix,"-"))>-1||c.match(S0))){let l=Y2(c.split(" "),{skipLookups:!0});return{prefix:l.prefix||Q(),iconName:a2(l.prefix,l.iconName)||l.iconName}}if(typeof c=="string"){let l=Q();return{prefix:l,iconName:a2(l,c)||c}}}},E={noAuto:e6,config:z,dom:a6,parse:n6,library:p4,findIconDefinition:d1,toHtml:y2},o6=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},{autoReplaceSvgRoot:l=h}=c;(Object.keys(B.styles).length>0||z.autoFetchSvg)&&W&&z.autoReplaceSvg&&E.dom.i2svg({node:l})};function X2(c,l){return Object.defineProperty(c,"abstract",{get:l}),Object.defineProperty(c,"html",{get:function(){return c.abstract.map(a=>y2(a))}}),Object.defineProperty(c,"node",{get:function(){if(!W)return;let a=h.createElement("div");return a.innerHTML=c.html,a.children}}),c}function i6(c){let{children:l,main:a,mask:s,attributes:e,styles:n,transform:o}=c;if(w1(o)&&a.found&&!s.found){let{width:t,height:p}=a,L={x:t/p/2,y:.5};e.style=G2(i(i({},n),{},{"transform-origin":"".concat(L.x+o.x/16,"em ").concat(L.y+o.y/16,"em")}))}return[{tag:"svg",attributes:e,children:l}]}function t6(c){let{prefix:l,iconName:a,children:s,attributes:e,symbol:n}=c,o=n===!0?"".concat(l,"-").concat(z.cssPrefix,"-").concat(a):n;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:i(i({},e),{},{id:o}),children:s}]}]}function P1(c){let{icons:{main:l,mask:a},prefix:s,iconName:e,transform:n,symbol:o,title:t,maskId:p,titleId:L,extra:M,watchable:C=!1}=c,{width:u,height:w}=a.found?a:l,G=t0.includes(s),Z=[z.replacementClass,e?"".concat(z.cssPrefix,"-").concat(e):""].filter(t2=>M.classes.indexOf(t2)===-1).filter(t2=>t2!==""||!!t2).concat(M.classes).join(" "),F={children:[],attributes:i(i({},M.attributes),{},{"data-prefix":s,"data-icon":e,class:Z,role:M.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(u," ").concat(w)})},H=G&&!~M.classes.indexOf("fa-fw")?{width:"".concat(u/w*16*.0625,"em")}:{};C&&(F.attributes[n2]=""),t&&(F.children.push({tag:"title",attributes:{id:F.attributes["aria-labelledby"]||"title-".concat(L||N2())},children:[t]}),delete F.attributes.title);let A=i(i({},F),{},{prefix:s,iconName:e,main:l,mask:a,maskId:p,transform:n,symbol:o,styles:i(i({},H),M.styles)}),{children:D,attributes:i2}=a.found&&l.found?J("generateAbstractMask",A)||{children:[],attributes:{}}:J("generateAbstractIcon",A)||{children:[],attributes:{}};return A.children=D,A.attributes=i2,o?t6(A):i6(A)}function w3(c){let{content:l,width:a,height:s,transform:e,title:n,extra:o,watchable:t=!1}=c,p=i(i(i({},o.attributes),n?{title:n}:{}),{},{class:o.classes.join(" ")});t&&(p[n2]="");let L=i({},o.styles);w1(e)&&(L.transform=R0({transform:e,startCentered:!0,width:a,height:s}),L["-webkit-transform"]=L.transform);let M=G2(L);M.length>0&&(p.style=M);let C=[];return C.push({tag:"span",attributes:p,children:[l]}),n&&C.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),C}function r6(c){let{content:l,title:a,extra:s}=c,e=i(i(i({},s.attributes),a?{title:a}:{}),{},{class:s.classes.join(" ")}),n=G2(s.styles);n.length>0&&(e.style=n);let o=[];return o.push({tag:"span",attributes:e,children:[l]}),a&&o.push({tag:"span",attributes:{class:"sr-only"},children:[a]}),o}var{styles:e1}=B;function u1(c){let l=c[0],a=c[1],[s]=c.slice(4),e=null;return Array.isArray(s)?e={tag:"g",attributes:{class:"".concat(z.cssPrefix,"-").concat(c1.GROUP)},children:[{tag:"path",attributes:{class:"".concat(z.cssPrefix,"-").concat(c1.SECONDARY),fill:"currentColor",d:s[0]}},{tag:"path",attributes:{class:"".concat(z.cssPrefix,"-").concat(c1.PRIMARY),fill:"currentColor",d:s[1]}}]}:e={tag:"path",attributes:{fill:"currentColor",d:s}},{found:!0,width:l,height:a,icon:e}}var f6={found:!1,width:512,height:512};function m6(c,l){!Q3&&!z.showMissingIcons&&c&&console.error('Icon with name "'.concat(c,'" and prefix "').concat(l,'" is missing.'))}function C1(c,l){let a=l;return l==="fa"&&z.styleDefault!==null&&(l=Q()),new Promise((s,e)=>{if(a==="fa"){let n=z4(c)||{};c=n.iconName||c,l=n.prefix||l}if(c&&l&&e1[l]&&e1[l][c]){let n=e1[l][c];return s(u1(n))}m6(c,l),s(i(i({},f6),{},{icon:z.showMissingIcons&&c?J("missingIconAbstract")||{}:{}}))})}var k3=()=>{},h1=z.measurePerformance&&B2&&B2.mark&&B2.measure?B2:{mark:k3,measure:k3},h2='FA "6.7.2"',z6=c=>(h1.mark("".concat(h2," ").concat(c," begins")),()=>M4(c)),M4=c=>{h1.mark("".concat(h2," ").concat(c," ends")),h1.measure("".concat(h2," ").concat(c),"".concat(h2," ").concat(c," begins"),"".concat(h2," ").concat(c," ends"))},E1={begin:z6,end:M4},_2=()=>{};function A3(c){return typeof(c.getAttribute?c.getAttribute(n2):null)=="string"}function L6(c){let l=c.getAttribute?c.getAttribute(b1):null,a=c.getAttribute?c.getAttribute(S1):null;return l&&a}function p6(c){return c&&c.classList&&c.classList.contains&&c.classList.contains(z.replacementClass)}function M6(){return z.autoReplaceSvg===!0?U2.replace:U2[z.autoReplaceSvg]||U2.replace}function d6(c){return h.createElementNS("http://www.w3.org/2000/svg",c)}function u6(c){return h.createElement(c)}function d4(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{ceFn:a=c.tag==="svg"?d6:u6}=l;if(typeof c=="string")return h.createTextNode(c);let s=a(c.tag);return Object.keys(c.attributes||[]).forEach(function(n){s.setAttribute(n,c.attributes[n])}),(c.children||[]).forEach(function(n){s.appendChild(d4(n,{ceFn:a}))}),s}function C6(c){let l=" ".concat(c.outerHTML," ");return l="".concat(l,"Font Awesome fontawesome.com "),l}var U2={replace:function(c){let l=c[0];if(l.parentNode)if(c[1].forEach(a=>{l.parentNode.insertBefore(d4(a),l)}),l.getAttribute(n2)===null&&z.keepOriginalSource){let a=h.createComment(C6(l));l.parentNode.replaceChild(a,l)}else l.remove()},nest:function(c){let l=c[0],a=c[1];if(~v1(l).indexOf(z.replacementClass))return U2.replace(c);let s=new RegExp("".concat(z.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){let n=a[0].attributes.class.split(" ").reduce((o,t)=>(t===z.replacementClass||t.match(s)?o.toSvg.push(t):o.toNode.push(t),o),{toNode:[],toSvg:[]});a[0].attributes.class=n.toSvg.join(" "),n.toNode.length===0?l.removeAttribute("class"):l.setAttribute("class",n.toNode.join(" "))}let e=a.map(n=>y2(n)).join(`
`);l.setAttribute(n2,""),l.innerHTML=e}};function P3(c){c()}function u4(c,l){let a=typeof l=="function"?l:_2;if(c.length===0)a();else{let s=P3;z.mutateApproach===x0&&(s=K.requestAnimationFrame||P3),s(()=>{let e=M6(),n=E1.begin("mutate");c.map(e),n(),a()})}}var T1=!1;function C4(){T1=!0}function g1(){T1=!1}var j2=null;function E3(c){if(!u3||!z.observeMutations)return;let{treeCallback:l=_2,nodeCallback:a=_2,pseudoElementsCallback:s=_2,observeMutationsRoot:e=h}=c;j2=new u3(n=>{if(T1)return;let o=Q();d2(n).forEach(t=>{if(t.type==="childList"&&t.addedNodes.length>0&&!A3(t.addedNodes[0])&&(z.searchPseudoElements&&s(t.target),l(t.target)),t.type==="attributes"&&t.target.parentNode&&z.searchPseudoElements&&s(t.target.parentNode),t.type==="attributes"&&A3(t.target)&&~w0.indexOf(t.attributeName))if(t.attributeName==="class"&&L6(t.target)){let{prefix:p,iconName:L}=Y2(v1(t.target));t.target.setAttribute(b1,p||o),L&&t.target.setAttribute(S1,L)}else p6(t.target)&&a(t.target)})}),W&&j2.observe(e,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function h6(){j2&&j2.disconnect()}function g6(c){let l=c.getAttribute("style"),a=[];return l&&(a=l.split(";").reduce((s,e)=>{let n=e.split(":"),o=n[0],t=n.slice(1);return o&&t.length>0&&(s[o]=t.join(":").trim()),s},{})),a}function x6(c){let l=c.getAttribute("data-prefix"),a=c.getAttribute("data-icon"),s=c.innerText!==void 0?c.innerText.trim():"",e=Y2(v1(c));return e.prefix||(e.prefix=Q()),l&&a&&(e.prefix=l,e.iconName=a),e.iconName&&e.prefix||(e.prefix&&s.length>0&&(e.iconName=Y0(e.prefix,c.innerText)||A1(e.prefix,z1(c.innerText))),!e.iconName&&z.autoFetchSvg&&c.firstChild&&c.firstChild.nodeType===Node.TEXT_NODE&&(e.iconName=c.firstChild.data)),e}function N6(c){let l=d2(c.attributes).reduce((e,n)=>(e.name!=="class"&&e.name!=="style"&&(e[n.name]=n.value),e),{}),a=c.getAttribute("title"),s=c.getAttribute("data-fa-title-id");return z.autoA11y&&(a?l["aria-labelledby"]="".concat(z.replacementClass,"-title-").concat(s||N2()):(l["aria-hidden"]="true",l.focusable="false")),l}function b6(){return{iconName:null,title:null,titleId:null,prefix:null,transform:O,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function T3(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},{iconName:a,prefix:s,rest:e}=x6(c),n=N6(c),o=M1("parseNodeAttributes",{},c),t=l.styleParser?g6(c):[];return i({iconName:a,title:c.getAttribute("title"),titleId:c.getAttribute("data-fa-title-id"),prefix:s,transform:O,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:e,styles:t,attributes:n}},o)}var{styles:S6}=B;function h4(c){let l=z.autoReplaceSvg==="nest"?T3(c,{styleParser:!1}):T3(c);return~l.extra.classes.indexOf(Z3)?J("generateLayersText",c,l):J("generateSvgReplacementMutation",c,l)}function y6(){return[...n0,...o1]}function F3(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!W)return Promise.resolve();let a=h.documentElement.classList,s=M=>a.add("".concat(g3,"-").concat(M)),e=M=>a.remove("".concat(g3,"-").concat(M)),n=z.autoFetchSvg?y6():V3.concat(Object.keys(S6));n.includes("fa")||n.push("fa");let o=[".".concat(Z3,":not([").concat(n2,"])")].concat(n.map(M=>".".concat(M,":not([").concat(n2,"])"))).join(", ");if(o.length===0)return Promise.resolve();let t=[];try{t=d2(c.querySelectorAll(o))}catch{}if(t.length>0)s("pending"),e("complete");else return Promise.resolve();let p=E1.begin("onTree"),L=t.reduce((M,C)=>{try{let u=h4(C);u&&M.push(u)}catch(u){Q3||u.name==="MissingIcon"&&console.error(u)}return M},[]);return new Promise((M,C)=>{Promise.all(L).then(u=>{u4(u,()=>{s("active"),s("complete"),e("pending"),typeof l=="function"&&l(),p(),M()})}).catch(u=>{p(),C(u)})})}function v6(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;h4(c).then(a=>{a&&u4([a],l)})}function w6(c){return function(l){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=(l||{}).icon?l:d1(l||{}),{mask:e}=a;return e&&(e=(e||{}).icon?e:d1(e||{})),c(s,i(i({},a),{},{mask:e}))}}var k6=function(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{transform:a=O,symbol:s=!1,mask:e=null,maskId:n=null,title:o=null,titleId:t=null,classes:p=[],attributes:L={},styles:M={}}=l;if(!c)return;let{prefix:C,iconName:u,icon:w}=c;return X2(i({type:"icon"},c),()=>(o2("beforeDOMElementCreation",{iconDefinition:c,params:l}),z.autoA11y&&(o?L["aria-labelledby"]="".concat(z.replacementClass,"-title-").concat(t||N2()):(L["aria-hidden"]="true",L.focusable="false")),P1({icons:{main:u1(w),mask:e?u1(e.icon):{found:!1,width:null,height:null,icon:{}}},prefix:C,iconName:u,transform:i(i({},O),a),symbol:s,title:o,maskId:n,titleId:t,extra:{attributes:L,styles:M,classes:p}})))},A6={mixout(){return{icon:w6(k6)}},hooks(){return{mutationObserverCallbacks(c){return c.treeCallback=F3,c.nodeCallback=v6,c}}},provides(c){c.i2svg=function(l){let{node:a=h,callback:s=()=>{}}=l;return F3(a,s)},c.generateSvgReplacementMutation=function(l,a){let{iconName:s,title:e,titleId:n,prefix:o,transform:t,symbol:p,mask:L,maskId:M,extra:C}=a;return new Promise((u,w)=>{Promise.all([C1(s,o),L.iconName?C1(L.iconName,L.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(G=>{let[Z,F]=G;u([l,P1({icons:{main:Z,mask:F},prefix:o,iconName:s,transform:t,symbol:p,maskId:M,title:e,titleId:n,extra:C,watchable:!0})])}).catch(w)})},c.generateAbstractIcon=function(l){let{children:a,attributes:s,main:e,transform:n,styles:o}=l,t=G2(o);t.length>0&&(s.style=t);let p;return w1(n)&&(p=J("generateAbstractTransformGrouping",{main:e,transform:n,containerWidth:e.width,iconWidth:e.width})),a.push(p||e.icon),{children:a,attributes:s}}}},P6={mixout(){return{layer(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{classes:a=[]}=l;return X2({type:"layer"},()=>{o2("beforeDOMElementCreation",{assembler:c,params:l});let s=[];return c(e=>{Array.isArray(e)?e.map(n=>{s=s.concat(n.abstract)}):s=s.concat(e.abstract)}),[{tag:"span",attributes:{class:["".concat(z.cssPrefix,"-layers"),...a].join(" ")},children:s}]})}}}},E6={mixout(){return{counter(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{title:a=null,classes:s=[],attributes:e={},styles:n={}}=l;return X2({type:"counter",content:c},()=>(o2("beforeDOMElementCreation",{content:c,params:l}),r6({content:c.toString(),title:a,extra:{attributes:e,styles:n,classes:["".concat(z.cssPrefix,"-layers-counter"),...s]}})))}}}},T6={mixout(){return{text(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},{transform:a=O,title:s=null,classes:e=[],attributes:n={},styles:o={}}=l;return X2({type:"text",content:c},()=>(o2("beforeDOMElementCreation",{content:c,params:l}),w3({content:c,transform:i(i({},O),a),title:s,extra:{attributes:n,styles:o,classes:["".concat(z.cssPrefix,"-layers-text"),...e]}})))}}},provides(c){c.generateLayersText=function(l,a){let{title:s,transform:e,extra:n}=a,o=null,t=null;if(W3){let p=parseInt(getComputedStyle(l).fontSize,10),L=l.getBoundingClientRect();o=L.width/p,t=L.height/p}return z.autoA11y&&!s&&(n.attributes["aria-hidden"]="true"),Promise.resolve([l,w3({content:l.innerHTML,width:o,height:t,transform:e,title:s,extra:n,watchable:!0})])}}},F6=new RegExp('"',"ug"),D3=[1105920,1112319],I3=i(i(i(i({},{FontAwesome:{normal:"fas",400:"fas"}}),s0),h0),z0),x1=Object.keys(I3).reduce((c,l)=>(c[l.toLowerCase()]=I3[l],c),{}),D6=Object.keys(x1).reduce((c,l)=>{let a=x1[l];return c[l]=a[900]||[...Object.entries(a)][0][1],c},{});function I6(c){let l=c.replace(F6,""),a=q0(l,0),s=a>=D3[0]&&a<=D3[1],e=l.length===2?l[0]===l[1]:!1;return{value:z1(e?l[0]:l),isSecondary:s||e}}function R6(c,l){let a=c.replace(/^['"]|['"]$/g,"").toLowerCase(),s=parseInt(l),e=isNaN(s)?"normal":s;return(x1[a]||{})[e]||D6[a]}function R3(c,l){let a="".concat(g0).concat(l.replace(":","-"));return new Promise((s,e)=>{if(c.getAttribute(a)!==null)return s();let o=d2(c.children).filter(u=>u.getAttribute(t1)===l)[0],t=K.getComputedStyle(c,l),p=t.getPropertyValue("font-family"),L=p.match(y0),M=t.getPropertyValue("font-weight"),C=t.getPropertyValue("content");if(o&&!L)return c.removeChild(o),s();if(L&&C!=="none"&&C!==""){let u=t.getPropertyValue("content"),w=R6(p,M),{value:G,isSecondary:Z}=I6(u),F=L[0].startsWith("FontAwesome"),H=A1(w,G),A=H;if(F){let D=X0(G);D.iconName&&D.prefix&&(H=D.iconName,w=D.prefix)}if(H&&!Z&&(!o||o.getAttribute(b1)!==w||o.getAttribute(S1)!==A)){c.setAttribute(a,A),o&&c.removeChild(o);let D=b6(),{extra:i2}=D;i2.attributes[t1]=l,C1(H,w).then(t2=>{let U4=P1(i(i({},D),{},{icons:{main:t2,mask:L4()},prefix:w,iconName:A,extra:i2,watchable:!0})),Z2=h.createElementNS("http://www.w3.org/2000/svg","svg");l==="::before"?c.insertBefore(Z2,c.firstChild):c.appendChild(Z2),Z2.outerHTML=U4.map(q4=>y2(q4)).join(`
`),c.removeAttribute(a),s()}).catch(e)}else s()}else s()})}function O6(c){return Promise.all([R3(c,"::before"),R3(c,"::after")])}function B6(c){return c.parentNode!==document.head&&!~N0.indexOf(c.tagName.toUpperCase())&&!c.getAttribute(t1)&&(!c.parentNode||c.parentNode.tagName!=="svg")}function O3(c){if(W)return new Promise((l,a)=>{let s=d2(c.querySelectorAll("*")).filter(B6).map(O6),e=E1.begin("searchPseudoElements");C4(),Promise.all(s).then(()=>{e(),g1(),l()}).catch(()=>{e(),g1(),a()})})}var H6={hooks(){return{mutationObserverCallbacks(c){return c.pseudoElementsCallback=O3,c}}},provides(c){c.pseudoElements2svg=function(l){let{node:a=h}=l;z.searchPseudoElements&&O3(a)}}},B3=!1,_6={mixout(){return{dom:{unwatch(){C4(),B3=!0}}}},hooks(){return{bootstrap(){E3(M1("mutationObserverCallbacks",{}))},noAuto(){h6()},watch(c){let{observeMutationsRoot:l}=c;B3?g1():E3(M1("mutationObserverCallbacks",{observeMutationsRoot:l}))}}}},H3=c=>{let l={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return c.toLowerCase().split(" ").reduce((a,s)=>{let e=s.toLowerCase().split("-"),n=e[0],o=e.slice(1).join("-");if(n&&o==="h")return a.flipX=!0,a;if(n&&o==="v")return a.flipY=!0,a;if(o=parseFloat(o),isNaN(o))return a;switch(n){case"grow":a.size=a.size+o;break;case"shrink":a.size=a.size-o;break;case"left":a.x=a.x-o;break;case"right":a.x=a.x+o;break;case"up":a.y=a.y-o;break;case"down":a.y=a.y+o;break;case"rotate":a.rotate=a.rotate+o;break}return a},l)},U6={mixout(){return{parse:{transform:c=>H3(c)}}},hooks(){return{parseNodeAttributes(c,l){let a=l.getAttribute("data-fa-transform");return a&&(c.transform=H3(a)),c}}},provides(c){c.generateAbstractTransformGrouping=function(l){let{main:a,transform:s,containerWidth:e,iconWidth:n}=l,o={transform:"translate(".concat(e/2," 256)")},t="translate(".concat(s.x*32,", ").concat(s.y*32,") "),p="scale(".concat(s.size/16*(s.flipX?-1:1),", ").concat(s.size/16*(s.flipY?-1:1),") "),L="rotate(".concat(s.rotate," 0 0)"),M={transform:"".concat(t," ").concat(p," ").concat(L)},C={transform:"translate(".concat(n/2*-1," -256)")},u={outer:o,inner:M,path:C};return{tag:"g",attributes:i({},u.outer),children:[{tag:"g",attributes:i({},u.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:i(i({},a.icon.attributes),u.path)}]}]}}}},a1={x:0,y:0,width:"100%",height:"100%"};function _3(c){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return c.attributes&&(c.attributes.fill||l)&&(c.attributes.fill="black"),c}function q6(c){return c.tag==="g"?c.children:[c]}var j6={hooks(){return{parseNodeAttributes(c,l){let a=l.getAttribute("data-fa-mask"),s=a?Y2(a.split(" ").map(e=>e.trim())):L4();return s.prefix||(s.prefix=Q()),c.mask=s,c.maskId=l.getAttribute("data-fa-mask-id"),c}}},provides(c){c.generateAbstractMask=function(l){let{children:a,attributes:s,main:e,mask:n,maskId:o,transform:t}=l,{width:p,icon:L}=e,{width:M,icon:C}=n,u=I0({transform:t,containerWidth:M,iconWidth:p}),w={tag:"rect",attributes:i(i({},a1),{},{fill:"white"})},G=L.children?{children:L.children.map(_3)}:{},Z={tag:"g",attributes:i({},u.inner),children:[_3(i({tag:L.tag,attributes:i(i({},L.attributes),u.path)},G))]},F={tag:"g",attributes:i({},u.outer),children:[Z]},H="mask-".concat(o||N2()),A="clip-".concat(o||N2()),D={tag:"mask",attributes:i(i({},a1),{},{id:H,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[w,F]},i2={tag:"defs",children:[{tag:"clipPath",attributes:{id:A},children:q6(C)},D]};return a.push(i2,{tag:"rect",attributes:i({fill:"currentColor","clip-path":"url(#".concat(A,")"),mask:"url(#".concat(H,")")},a1)}),{children:a,attributes:s}}}},W6={provides(c){let l=!1;K.matchMedia&&(l=K.matchMedia("(prefers-reduced-motion: reduce)").matches),c.missingIconAbstract=function(){let a=[],s={fill:"currentColor"},e={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:i(i({},s),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});let n=i(i({},e),{},{attributeName:"opacity"}),o={tag:"circle",attributes:i(i({},s),{},{cx:"256",cy:"364",r:"28"}),children:[]};return l||o.children.push({tag:"animate",attributes:i(i({},e),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:i(i({},n),{},{values:"1;0;1;1;0;1;"})}),a.push(o),a.push({tag:"path",attributes:i(i({},s),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:l?[]:[{tag:"animate",attributes:i(i({},n),{},{values:"1;0;0;0;0;1;"})}]}),l||a.push({tag:"path",attributes:i(i({},s),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:i(i({},n),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},G6={hooks(){return{parseNodeAttributes(c,l){let a=l.getAttribute("data-fa-symbol"),s=a===null?!1:a===""?!0:a;return c.symbol=s,c}}}},V6=[B0,A6,P6,E6,T6,H6,_6,U6,j6,W6,G6];s6(V6,{mixoutsTo:E});var B8=E.noAuto,H8=E.config,_8=E.library,U8=E.dom,g4=E.parse,q8=E.findIconDefinition,j8=E.toHtml,x4=E.icon,W8=E.layer,Y6=E.text,X6=E.counter;var $6=["*"],K6=c=>{throw new Error(`Could not find icon with iconName=${c.iconName} and prefix=${c.prefix} in the icon library.`)},Q6=()=>{throw new Error("Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.")},J6=c=>{let l={[`fa-${c.animation}`]:c.animation!=null&&!c.animation.startsWith("spin"),"fa-spin":c.animation==="spin"||c.animation==="spin-reverse","fa-spin-pulse":c.animation==="spin-pulse"||c.animation==="spin-pulse-reverse","fa-spin-reverse":c.animation==="spin-reverse"||c.animation==="spin-pulse-reverse","fa-pulse":c.animation==="spin-pulse"||c.animation==="spin-pulse-reverse","fa-fw":c.fixedWidth,"fa-border":c.border,"fa-inverse":c.inverse,"fa-layers-counter":c.counter,"fa-flip-horizontal":c.flip==="horizontal"||c.flip==="both","fa-flip-vertical":c.flip==="vertical"||c.flip==="both",[`fa-${c.size}`]:c.size!==null,[`fa-rotate-${c.rotate}`]:c.rotate!==null,[`fa-pull-${c.pull}`]:c.pull!==null,[`fa-stack-${c.stackItemSize}`]:c.stackItemSize!=null};return Object.keys(l).map(a=>l[a]?a:null).filter(a=>a)},Z6=c=>c.prefix!==void 0&&c.iconName!==void 0,c8=(c,l)=>Z6(c)?c:typeof c=="string"?{prefix:l,iconName:c}:{prefix:c[0],iconName:c[1]},l8=(()=>{let l=class l{constructor(){this.defaultPrefix="fas",this.fallbackIcon=null}};l.\u0275fac=function(e){return new(e||l)},l.\u0275prov=l2({token:l,factory:l.\u0275fac,providedIn:"root"});let c=l;return c})(),s8=(()=>{let l=class l{constructor(){this.definitions={}}addIcons(...s){for(let e of s){e.prefix in this.definitions||(this.definitions[e.prefix]={}),this.definitions[e.prefix][e.iconName]=e;for(let n of e.icon[2])typeof n=="string"&&(this.definitions[e.prefix][n]=e)}}addIconPacks(...s){for(let e of s){let n=Object.keys(e).map(o=>e[o]);this.addIcons(...n)}}getIconDefinition(s,e){return s in this.definitions&&e in this.definitions[s]?this.definitions[s][e]:null}};l.\u0275fac=function(e){return new(e||l)},l.\u0275prov=l2({token:l,factory:l.\u0275fac,providedIn:"root"});let c=l;return c})(),e8=(()=>{let l=class l{constructor(){this.stackItemSize="1x"}ngOnChanges(s){if("size"in s)throw new Error('fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.')}};l.\u0275fac=function(e){return new(e||l)},l.\u0275dir=I1({type:l,selectors:[["fa-icon","stackItemSize",""],["fa-duotone-icon","stackItemSize",""]],inputs:{stackItemSize:"stackItemSize",size:"size"},standalone:!0,features:[k2]});let c=l;return c})(),a8=(()=>{let l=class l{constructor(s,e){this.renderer=s,this.elementRef=e}ngOnInit(){this.renderer.addClass(this.elementRef.nativeElement,"fa-stack")}ngOnChanges(s){"size"in s&&(s.size.currentValue!=null&&this.renderer.addClass(this.elementRef.nativeElement,`fa-${s.size.currentValue}`),s.size.previousValue!=null&&this.renderer.removeClass(this.elementRef.nativeElement,`fa-${s.size.previousValue}`))}};l.\u0275fac=function(e){return new(e||l)(g(H1),g(R1))},l.\u0275cmp=b({type:l,selectors:[["fa-stack"]],inputs:{size:"size"},standalone:!0,features:[k2,S],ngContentSelectors:$6,decls:1,vars:0,template:function(e,n){e&1&&(q1(),j1(0))},encapsulation:2});let c=l;return c})(),$2=(()=>{let l=class l{set spin(s){this.animation=s?"spin":void 0}set pulse(s){this.animation=s?"spin-pulse":void 0}constructor(s,e,n,o,t){this.sanitizer=s,this.config=e,this.iconLibrary=n,this.stackItem=o,this.classes=[],t!=null&&o==null&&console.error('FontAwesome: fa-icon and fa-duotone-icon elements must specify stackItemSize attribute when wrapped into fa-stack. Example: <fa-icon stackItemSize="2x"></fa-icon>.')}ngOnChanges(s){if(this.icon==null&&this.config.fallbackIcon==null){Q6();return}if(s){let e=this.icon!=null?this.icon:this.config.fallbackIcon,n=this.findIconDefinition(e);if(n!=null){let o=this.buildParams();this.renderIcon(n,o)}}}render(){this.ngOnChanges({})}findIconDefinition(s){let e=c8(s,this.config.defaultPrefix);if("icon"in e)return e;let n=this.iconLibrary.getIconDefinition(e.prefix,e.iconName);return n??(K6(e),null)}buildParams(){let s={flip:this.flip,animation:this.animation,border:this.border,inverse:this.inverse,size:this.size||null,pull:this.pull||null,rotate:this.rotate||null,fixedWidth:typeof this.fixedWidth=="boolean"?this.fixedWidth:this.config.fixedWidth,stackItemSize:this.stackItem!=null?this.stackItem.stackItemSize:null},e=typeof this.transform=="string"?g4.transform(this.transform):this.transform;return{title:this.title,transform:e,classes:[...J6(s),...this.classes],mask:this.mask!=null?this.findIconDefinition(this.mask):null,styles:this.styles!=null?this.styles:{},symbol:this.symbol,attributes:{role:this.a11yRole}}}renderIcon(s,e){let n=x4(s,e);this.renderedIconHTML=this.sanitizer.bypassSecurityTrustHtml(n.html.join(`
`))}};l.\u0275fac=function(e){return new(e||l)(g(Q1),g(l8),g(s8),g(e8,8),g(a8,8))},l.\u0275cmp=b({type:l,selectors:[["fa-icon"]],hostAttrs:[1,"ng-fa-icon"],hostVars:2,hostBindings:function(e,n){e&2&&(U1("innerHTML",n.renderedIconHTML,O1),_1("title",n.title))},inputs:{icon:"icon",title:"title",animation:"animation",spin:"spin",pulse:"pulse",mask:"mask",styles:"styles",flip:"flip",size:"size",pull:"pull",border:"border",inverse:"inverse",symbol:"symbol",rotate:"rotate",fixedWidth:"fixedWidth",classes:"classes",transform:"transform",a11yRole:"a11yRole"},standalone:!0,features:[k2,S],decls:0,vars:0,template:function(e,n){},encapsulation:2});let c=l;return c})();var K2=(()=>{let l=class l{};l.\u0275fac=function(e){return new(e||l)},l.\u0275mod=D1({type:l}),l.\u0275inj=F1({});let c=l;return c})();var n8={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},b4=n8;var o8={prefix:"fas",iconName:"circle-xmark",icon:[512,512,[61532,"times-circle","xmark-circle"],"f057","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"]},S4=o8;var y4=(()=>{let l=class l{constructor(){this.faCheckCircle=b4}ngOnInit(){console.log("Paiement confirm\xE9 avec succ\xE8s, page de confirmation affich\xE9e")}};l.\u0275fac=function(e){return new(e||l)},l.\u0275cmp=b({type:l,selectors:[["app-payment-success"]],standalone:!0,features:[S],decls:13,vars:1,consts:[[1,"success-container"],[1,"success-card"],[1,"success-icon"],[3,"icon"],[1,"secondary-text"],[1,"actions"],["routerLink","/dashboard",1,"primary-button"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),N(3,"fa-icon",3),f(),r(4,"h2"),m(5,"Paiement r\xE9ussi !"),f(),r(6,"p"),m(7,"Votre inscription \xE0 l'\xE9v\xE9nement a \xE9t\xE9 confirm\xE9e."),f(),r(8,"p",4),m(9,"Un email de confirmation vous a \xE9t\xE9 envoy\xE9."),f(),r(10,"div",5)(11,"button",6),m(12," Retour au tableau de bord "),f()()()()),e&2&&(d(3),x("icon",n.faCheckCircle))},dependencies:[k,X,Y,K2,$2],styles:['@charset "UTF-8";.success-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;min-height:80vh;padding:2rem;background-color:#f8f9fa}.success-card[_ngcontent-%COMP%]{background:#fff;border-radius:8px;box-shadow:0 2px 10px #0000001a;padding:2rem;text-align:center;max-width:400px;width:100%}.success-icon[_ngcontent-%COMP%]{font-size:4rem;color:#98ff98;margin-bottom:1rem}h2[_ngcontent-%COMP%]{color:#2c3e50;margin-bottom:1rem;font-size:1.8rem}p[_ngcontent-%COMP%]{color:#2d3436;margin-bottom:1rem;font-size:1.1rem}.secondary-text[_ngcontent-%COMP%]{color:#7f8c8d;font-size:.9rem;margin-bottom:2rem}.actions[_ngcontent-%COMP%]{display:flex;justify-content:center}.primary-button[_ngcontent-%COMP%]{background:#98ff98;color:#2d3436;border:none;padding:.8rem 1.5rem;border-radius:4px;cursor:pointer;font-weight:500;transition:all .3s ease}.primary-button[_ngcontent-%COMP%]:hover{background:#78d978;transform:translateY(-2px)}']});let c=l;return c})();function t8(c,l){c&1&&(r(0,"div",3),N(1,"i",4),r(2,"p"),m(3,"V\xE9rification du paiement..."),f()())}function r8(c,l){if(c&1&&(r(0,"div",5),m(1),f()),c&2){let a=T();d(),v(" ",a.error," ")}}var v4=(()=>{let l=class l{constructor(s,e,n){this.route=s,this.router=e,this.paymentService=n,this.loading=!0,this.error=""}ngOnInit(){return V(this,null,function*(){let s=this.route.snapshot.queryParamMap.get("session_id");if(!s){this.error="Session de paiement invalide",this.loading=!1;return}try{(yield c2(this.paymentService.verifyPaymentStatus(s))).data.status==="completed"?this.router.navigate(["/payment/success"]):this.router.navigate(["/payment/error"])}catch(e){console.error("Erreur de v\xE9rification:",e),this.error="Erreur lors de la v\xE9rification du paiement",this.loading=!1}})}};l.\u0275fac=function(e){return new(e||l)(g(D2),g(R),g(R2))},l.\u0275cmp=b({type:l,selectors:[["app-payment-callback"]],standalone:!0,features:[S],decls:3,vars:2,consts:[[1,"callback-container"],["class","spinner",4,"ngIf"],["class","error-message",4,"ngIf"],[1,"spinner"],[1,"fas","fa-spinner","fa-spin"],[1,"error-message"]],template:function(e,n){e&1&&(r(0,"div",0),P(1,t8,4,0,"div",1)(2,r8,2,1,"div",2),f()),e&2&&(d(),x("ngIf",n.loading),d(),x("ngIf",n.error))},dependencies:[k,I],styles:[".callback-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;min-height:80vh}.spinner[_ngcontent-%COMP%]{text-align:center}.spinner[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:2rem;color:var(--primary-green);margin-bottom:1rem}.error-message[_ngcontent-%COMP%]{color:var(--danger);text-align:center}"]});let c=l;return c})();var w4=(()=>{let l=class l{constructor(){this.faTimesCircle=S4}};l.\u0275fac=function(e){return new(e||l)},l.\u0275cmp=b({type:l,selectors:[["app-payment-error"]],standalone:!0,features:[S],decls:11,vars:1,consts:[[1,"error-container"],[1,"error-card"],[1,"error-icon"],[3,"icon"],[1,"actions"],["routerLink","/dashboard",1,"retry-button"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),N(3,"fa-icon",3),f(),r(4,"h2"),m(5,"Erreur de paiement"),f(),r(6,"p"),m(7,"Une erreur est survenue lors du traitement de votre paiement."),f(),r(8,"div",4)(9,"button",5),m(10," Retourner au tableau de bord "),f()()()()),e&2&&(d(3),x("icon",n.faTimesCircle))},dependencies:[k,X,Y,K2,$2],styles:[".error-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;min-height:80vh;padding:2rem}.error-card[_ngcontent-%COMP%]{background:#fff;border-radius:8px;box-shadow:0 2px 10px #0000001a;padding:2rem;text-align:center;max-width:400px;width:100%}.error-icon[_ngcontent-%COMP%]{font-size:4rem;color:var(--danger);margin-bottom:1rem}h2[_ngcontent-%COMP%]{color:var(--primary-dark);margin-bottom:1rem}p[_ngcontent-%COMP%]{color:var(--text-secondary);margin-bottom:2rem}.actions[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:1rem}.retry-button[_ngcontent-%COMP%]{background:var(--primary-dark);color:#fff;border:none;padding:.8rem 1.5rem;border-radius:4px;cursor:pointer;font-weight:500;transition:background-color .3s ease}.retry-button[_ngcontent-%COMP%]:hover{background:var(--primary-green)}"]});let c=l;return c})();function f8(c,l){if(c&1&&(r(0,"div",10),m(1," \xC9v\xE9nement cr\xE9\xE9 avec succ\xE8s: "),r(2,"strong"),m(3),f()()),c&2){let a=T();d(3),s2(a.testEvent.title)}}var k4=(()=>{let l=class l{constructor(s,e){this.eventService=s,this.router=e,this.testEvent=null,this.isCreatingEvent=!1}ngOnInit(){console.log("Composant de test de paiement initialis\xE9")}createTestEvent(){return V(this,null,function*(){try{this.isCreatingEvent=!0;let s={title:"Workshop Networking - Session Test",description:"Session de test pour le syst\xE8me de paiement. Apprenez les meilleures pratiques du networking professionnel.",date:new Date().toISOString(),location:"Business Center Brussels",price:25,max_participants:30,is_validated:!0,is_cancelled:!1,participants_count:0,status:e3.UPCOMING,type_event:s3.WORKSHOP,participations:[],categories:[]},e=yield c2(this.eventService.createEvent(s));this.testEvent=e,console.log("\xC9v\xE9nement de test cr\xE9\xE9 avec succ\xE8s:",this.testEvent)}catch(s){console.error("Erreur lors de la cr\xE9ation de l'\xE9v\xE9nement de test:",s),alert("Erreur lors de la cr\xE9ation de l'\xE9v\xE9nement de test")}finally{this.isCreatingEvent=!1}})}};l.\u0275fac=function(e){return new(e||l)(g(z2),g(R))},l.\u0275cmp=b({type:l,selectors:[["app-payment-test"]],standalone:!0,features:[S],decls:55,vars:6,consts:[[1,"test-container"],[1,"test-card"],[1,"step-section"],[1,"action-btn",3,"click","disabled"],["class","success-message",4,"ngIf"],[1,"instructions-list"],[1,"instruction-title"],[1,"instruction-content"],[1,"actions"],["routerLink","/dashboard",1,"primary-button",3,"disabled"],[1,"success-message"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"div",1)(2,"h2"),m(3,"Sc\xE9nario de test de paiement"),f(),r(4,"div",2)(5,"h3"),m(6,"1. Pr\xE9paration du test"),f(),r(7,"p"),m(8,' Cr\xE9ez un \xE9v\xE9nement de test "Workshop Networking - Session Test" avec un prix de 25\u20AC. Stripe est configur\xE9 en mode test. '),f(),r(9,"button",3),f2("click",function(){return n.createTestEvent()}),m(10),f(),P(11,f8,4,1,"div",4),f(),r(12,"div",2)(13,"h3"),m(14,"2. Instructions pour le test"),f(),r(15,"ul",5)(16,"li")(17,"div",6),m(18,"Carte de test Stripe"),f(),r(19,"div",7)(20,"code"),m(21,"4242 4242 4242 4242"),f(),m(22," - Date future - CVC: 123 "),f()(),r(23,"li")(24,"div",6),m(25,"Parcours \xE0 tester"),f(),r(26,"div",7)(27,"ol")(28,"li"),m(29,"Connectez-vous \xE0 l'application"),f(),r(30,"li"),m(31,`Depuis le dashboard, trouvez l'\xE9v\xE9nement "Workshop Networking - Session Test"`),f(),r(32,"li"),m(33,'Cliquez sur le bouton "Participer"'),f(),r(34,"li"),m(35,"Compl\xE9tez le paiement avec la carte de test"),f(),r(36,"li"),m(37,"V\xE9rifiez que vous \xEAtes redirig\xE9 vers la page de confirmation"),f(),r(38,"li"),m(39,`V\xE9rifiez que l'\xE9v\xE9nement appara\xEEt dans "Mes \xE9v\xE9nements"`),f()()()()()(),r(40,"div",2)(41,"h3"),m(42,"3. Cas alternatifs \xE0 tester"),f(),r(43,"ul",5)(44,"li")(45,"div",6),m(46,"Paiement \xE9chou\xE9"),f(),r(47,"div",7),m(48," Utilisez la carte "),r(49,"code"),m(50,"4000 0000 0000 0002"),f(),m(51," pour simuler un \xE9chec "),f()()()(),r(52,"div",8)(53,"button",9),m(54," Aller au dashboard pour tester "),f()()()()),e&2&&(d(9),u2("loading",n.isCreatingEvent),x("disabled",n.isCreatingEvent),d(),v(" ",n.isCreatingEvent?"Cr\xE9ation en cours...":"Cr\xE9er un \xE9v\xE9nement de test"," "),d(),x("ngIf",n.testEvent),d(42),x("disabled",!n.testEvent))},dependencies:[k,I,X,Y,r3],styles:[".test-container[_ngcontent-%COMP%]{padding:2rem;max-width:800px;margin:0 auto}.test-card[_ngcontent-%COMP%]{background:#fff;border-radius:8px;box-shadow:0 2px 8px #0000001a;padding:2rem}h2[_ngcontent-%COMP%]{color:#2c3e50;margin-top:0;border-bottom:1px solid #eee;padding-bottom:1rem}.step-section[_ngcontent-%COMP%]{margin-bottom:2rem}h3[_ngcontent-%COMP%]{color:#3498db;margin-bottom:1rem}.action-btn[_ngcontent-%COMP%]{background:#98ff98;color:#2d3436;border:none;padding:.8rem 1.5rem;border-radius:4px;cursor:pointer;font-weight:500;margin-top:1rem}.action-btn[_ngcontent-%COMP%]:disabled{background:#95a5a6;cursor:not-allowed}.action-btn.loading[_ngcontent-%COMP%]{background:#95a5a6}.success-message[_ngcontent-%COMP%]{margin-top:1rem;padding:1rem;background:#e8f8f5;border-left:4px solid #2ecc71;border-radius:4px}.instructions-list[_ngcontent-%COMP%]{list-style:none;padding:0}.instructions-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:1rem;padding:1rem;background:#f8f9fa;border-radius:4px}.instruction-title[_ngcontent-%COMP%]{font-weight:700;margin-bottom:.5rem}code[_ngcontent-%COMP%]{background:#2c3e50;color:#fff;padding:.2rem .4rem;border-radius:4px;font-family:monospace}.actions[_ngcontent-%COMP%]{margin-top:2rem;display:flex;justify-content:flex-end}.primary-button[_ngcontent-%COMP%]{background:#3498db;color:#fff;border:none;padding:.8rem 1.5rem;border-radius:4px;cursor:pointer;font-weight:500}.primary-button[_ngcontent-%COMP%]:disabled{background:#95a5a6;cursor:not-allowed}"]});let c=l;return c})();var E4="acacia",m8=function(l){return l===3?"v3":l},T4="https://js.stripe.com",z8="".concat(T4,"/").concat(E4,"/stripe.js"),L8=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,p8=/^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/,A4="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",M8=function(l){return L8.test(l)||p8.test(l)},d8=function(){for(var l=document.querySelectorAll('script[src^="'.concat(T4,'"]')),a=0;a<l.length;a++){var s=l[a];if(M8(s.src))return s}return null},P4=function(l){var a=l&&!l.advancedFraudSignals?"?advancedFraudSignals=false":"",s=document.createElement("script");s.src="".concat(z8).concat(a);var e=document.head||document.body;if(!e)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return e.appendChild(s),s},u8=function(l,a){!l||!l._registerWrapper||l._registerWrapper({name:"stripe-js",version:"6.1.0",startTime:a})},v2=null,Q2=null,J2=null,C8=function(l){return function(a){l(new Error("Failed to load Stripe.js",{cause:a}))}},h8=function(l,a){return function(){window.Stripe?l(window.Stripe):a(new Error("Stripe.js not available"))}},g8=function(l){return v2!==null?v2:(v2=new Promise(function(a,s){if(typeof window>"u"||typeof document>"u"){a(null);return}if(window.Stripe&&l&&console.warn(A4),window.Stripe){a(window.Stripe);return}try{var e=d8();if(e&&l)console.warn(A4);else if(!e)e=P4(l);else if(e&&J2!==null&&Q2!==null){var n;e.removeEventListener("load",J2),e.removeEventListener("error",Q2),(n=e.parentNode)===null||n===void 0||n.removeChild(e),e=P4(l)}J2=h8(a,s),Q2=C8(s),e.addEventListener("load",J2),e.addEventListener("error",Q2)}catch(o){s(o);return}}),v2.catch(function(a){return v2=null,Promise.reject(a)}))},x8=function(l,a,s){if(l===null)return null;var e=a[0],n=e.match(/^pk_test/),o=m8(l.version),t=E4;n&&o!==t&&console.warn("Stripe.js@".concat(o," was loaded on the page, but @stripe/stripe-js@").concat("6.1.0"," expected Stripe.js@").concat(t,". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));var p=l.apply(void 0,a);return u8(p,s),p},w2,F4=!1,D4=function(){return w2||(w2=g8(null).catch(function(l){return w2=null,Promise.reject(l)}),w2)};Promise.resolve().then(function(){return D4()}).catch(function(c){F4||console.warn(c)});var I4=function(){for(var l=arguments.length,a=new Array(l),s=0;s<l;s++)a[s]=arguments[s];F4=!0;var e=Date.now();return D4().then(function(n){return x8(n,a,e)})};function N8(c,l){if(c&1&&(r(0,"span"),m(1),f()),c&2){let a=T(2);d(),v(" Payer ",a.event.price,"\u20AC ")}}function b8(c,l){c&1&&(r(0,"span"),m(1," Traitement en cours... "),f())}function S8(c,l){if(c&1&&(r(0,"div",8),m(1),f()),c&2){let a=T(2);d(),v(" ",a.errorMessage," ")}}function y8(c,l){if(c&1){let a=E2();r(0,"div",1)(1,"h2"),m(2),f(),r(3,"div",2)(4,"p")(5,"strong"),m(6,"Date:"),f(),m(7),_(8,"date"),f(),r(9,"p")(10,"strong"),m(11,"Lieu:"),f(),m(12),f(),r(13,"p")(14,"strong"),m(15,"Montant:"),f(),m(16),f()(),r(17,"form",3),f2("ngSubmit",function(e){A2(a);let n=T();return P2(n.handleSubmit(e))}),N(18,"div",4),r(19,"button",5),P(20,N8,2,1,"span",6)(21,b8,2,0,"span",6),f(),P(22,S8,2,1,"div",7),f()()}if(c&2){let a=T();d(2),v("Paiement pour ",a.event.title,""),d(5),v(" ",m2(8,10,a.event.date,"dd/MM/yyyy HH:mm"),""),d(5),v(" ",a.event.location,""),d(4),v(" ",a.event.price,"\u20AC"),d(3),u2("loading",a.isLoading),x("disabled",a.isLoading),d(),x("ngIf",!a.isLoading),d(),x("ngIf",a.isLoading),d(),x("ngIf",a.errorMessage)}}var R4=(()=>{let l=class l{constructor(s,e,n,o){this.route=s,this.router=e,this.paymentService=n,this.eventService=o,this.event=null,this.isLoading=!1,this.errorMessage="",this.stripe=null,this.elements=null}ngOnInit(){return V(this,null,function*(){let s=this.route.snapshot.paramMap.get("id");if(!s){this.router.navigate(["/dashboard"]);return}try{this.event=yield c2(this.eventService.getEventById(s)),yield this.initializePayment(s)}catch(e){console.error("Erreur chargement \xE9v\xE9nement:",e),this.errorMessage="Impossible de charger les d\xE9tails de l'\xE9v\xE9nement"}})}initializePayment(s){return V(this,null,function*(){try{let e=yield c2(this.paymentService.createPaymentIntent(s));if(!e?.data?.clientSecret)throw new Error("Pas de clientSecret re\xE7u");if(this.stripe=yield I4(a3.stripe.publishableKey),!this.stripe)throw new Error("Stripe not loaded");this.elements=this.stripe.elements({clientSecret:e.data.clientSecret,appearance:{theme:"stripe",variables:{colorPrimary:"#2ecc71"}}}),this.elements.create("payment").mount("#payment-element")}catch(e){console.error("Erreur initialisation paiement:",e),this.errorMessage="Impossible d'initialiser le paiement"}})}handleSubmit(s){return V(this,null,function*(){if(s.preventDefault(),!(!this.stripe||!this.elements||!this.event)){this.isLoading=!0,this.errorMessage="";try{let{error:e}=yield this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`${window.location.origin}/payment/success`}});e&&(this.errorMessage=e.message||"Une erreur est survenue")}catch(e){console.error("Erreur paiement:",e),this.errorMessage="Une erreur est survenue lors du paiement"}finally{this.isLoading=!1}}})}};l.\u0275fac=function(e){return new(e||l)(g(D2),g(R),g(R2),g(z2))},l.\u0275cmp=b({type:l,selectors:[["app-payment-form"]],standalone:!0,features:[S],decls:1,vars:1,consts:[["class","payment-container",4,"ngIf"],[1,"payment-container"],[1,"payment-details"],["id","payment-form",3,"ngSubmit"],["id","payment-element"],["type","submit",1,"pay-button",3,"disabled"],[4,"ngIf"],["class","error-message",4,"ngIf"],[1,"error-message"]],template:function(e,n){e&1&&P(0,y8,23,13,"div",0),e&2&&x("ngIf",n.event)},dependencies:[k,I,F2,t3,i3,n3,o3],styles:[".payment-container[_ngcontent-%COMP%]{max-width:600px;margin:2rem auto;padding:2rem;background:#fff;border-radius:8px;box-shadow:0 2px 4px #0000001a}.payment-details[_ngcontent-%COMP%]{margin:1.5rem 0;padding:1rem;background:#f8f9fa;border-radius:4px}.card-element[_ngcontent-%COMP%]{padding:1rem;border:1px solid #ddd;border-radius:4px;margin:.5rem 0}.pay-button[_ngcontent-%COMP%]{width:100%;padding:1rem;background:var(--primary-green);color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:500}.pay-button[_ngcontent-%COMP%]:disabled{background:#95a5a6;cursor:not-allowed}.error-message[_ngcontent-%COMP%]{color:#e74c3c;margin-top:.5rem;font-size:.9rem}"]});let c=l;return c})();var O4=[{path:"test",component:k4,canActivate:[C2]},{path:"event/:id",component:R4,canActivate:[C2]},{path:"callback",component:v4},{path:"success",component:y4},{path:"error",component:w4}];var B4=[{path:"",redirectTo:"/home",pathMatch:"full"},{path:"auth",loadChildren:()=>import("./chunk-N4X7EHSE.js").then(c=>c.AUTH_ROUTES)},{path:"dashboard",canActivate:[C2],loadComponent:()=>import("./chunk-5WZEJO5A.js").then(c=>c.MemberDashboardComponent)},{path:"admin",canActivate:[m3],loadChildren:()=>import("./chunk-QPXWCQZA.js").then(c=>c.ADMIN_ROUTES)},{path:"agenda",component:L3},{path:"payment",children:O4},{path:"events/:id",loadComponent:()=>import("./chunk-5YWXCBUA.js").then(c=>c.EventDetailComponent)},{path:"home",loadComponent:()=>import("./chunk-TQKOGECX.js").then(c=>c.HomeComponent)}];var H4=(c,l)=>{let a=localStorage.getItem("token");if(a){let s=c.clone({setHeaders:{Authorization:`Bearer ${a}`}});return l(s)}return l(c)};var _4={providers:[c3(B4),X1($1([H4]))]};K1(f3,_4).catch(c=>console.error(c));
