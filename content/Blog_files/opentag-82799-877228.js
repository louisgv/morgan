/*
 * OpenTag, a tag deployment platform
 * Copyright 2011-2012, QuBit Group
 * http://opentag.qubitproducts.com
 */

try{(function(){(function(){function q(){}q.getUrl=function(){return document.location.href};q.getQueryParam=function(y){var t,u,x,s,w,r,v;s=q.getUrl();if(s.indexOf("?")>0){r=s.substring(s.indexOf("?")+1).split("&");for(t=0,u=r.length;t<u;t+=1){w=r[t];if(w.indexOf("=")>0){v=w.split("=");if((v.length===2)&&(v[0]===y)){return v[1]}}}}return null};q.variableExists=function(r){return(r!==undefined)&&(r!==null)};q.getElementValue=function(r){var s=document.getElementById(r);if(s){return s.textContent||s.innerText}return null};q.substituteArray=function(v,u,w){var x,r,t,s;t=v.value.indexOf("[#]");x=v.value.substring(0,t);r=v.value.substring(t+3);w=w.replace(new RegExp(u+"\\.length","g"),x+".length");w=w.replace(new RegExp(u+"(\\[.*?\\])","g"),x+"$1"+r);return w};q.prepareQuotedString=function(r){if(typeof(r)==="string"){return'"'+(r.replace(/\"/g,'\\"'))+'"'}else{return r}};q.namespace=function(x,r){var v=x.split(".");var w=(function(){return eval("this")}());var u=null,s=null;for(var t=0;t<v.length;t++){u=w;s=v[t];w[s]=w[s]||{};w=w[s]}if(r){u[s]=r}return u[s]};q.namespace("qubit.qtag");qubit.qtag.Utils=qubit.qtag.Utils||q;window.qubit.qtag=window.qubit.qtag||qubit.qtag}());var b={};b.html={};b.html.fileLoader={};b.html.fileLoader.load=function(q,z,B,x,u,v){var r,s,y,t,w;w=false;t=function(C){return function(){if(!w){w=true;if(C&&!y){y={url:document.location.href}}B(q,y,C)}}};try{if(z){s=z(q)}}catch(A){s=false;B(q,"Exception loading pre",true)}finally{if(s!==false){r=b.html.fileLoader.createScriptEl(q,u,false,v);if(B){r.onload=t(false);r.onerror=t(true);r.onreadystatechange=function(){if((this.readyState==="complete")||(this.readyState==="loaded")){setTimeout(function(){t(false)()},1)}}}if(!x){x=window.document.getElementsByTagName("head")[0]}x.appendChild(r)}}};b.html.fileLoader.createScriptEl=function(u,t,v,q){var r,s=document.createElement("script");s.type="text/javascript";s.src=b.html.fileLoader.tidyUrl(u)+(v?("?"+new Date().getTime()):"");if(t!==false){s.async="true";s.defer="true"}else{s.async="false";if(s.async!==false){s.async=false}s.defer="false"}for(r in q){if(q.hasOwnProperty(r)){s.setAttribute(r,q[r])}}return s};b.html.fileLoader.tidyUrl=function(q){if(q.substring(0,5)==="http:"){return q}if(q.substring(0,6)==="https:"){return q}return"//"+q};b.html.PostData=function(t,x,z){var y,v,B,u,s,A,w,r,C,q;q=5;C=2000;w=false;r=function(){if(q>0){setTimeout(function(){if(!w){q-=1;y()}},C)}};v=navigator.userAgent.toLowerCase();B=v.indexOf("msie")!==-1;u=v.indexOf("msie 9")!==-1;s=((v.indexOf("msie 7")!==-1)||(v.indexOf("msie 6")!==-1));A=("https:"===document.location.protocol?"https:":"http:")+t;z=z||"POST";y=function(){var I;try{I=null;try{I=new XMLHttpRequest()}catch(H){}if(I&&!B){I.open(z,A,true)}else{if(typeof XDomainRequest!=="undefined"){I=new XDomainRequest();I.open(z,A)}else{I=null}}try{I.withCredentials=false}catch(G){}if(I.setRequestHeader){I.setRequestHeader("Content-Type","text/plain;charset=UTF-8")}I.onload=function(){w=true};I.onreadystatechange=function(){};I.ontimeout=function(){};I.onerror=function(){};I.onprogress=function(){};I.send(x)}catch(E){try{try{b.html.fileLoader.load(A)}catch(D){if(window.console&&window.console.log){window.console.log(E)}}}catch(F){}}r()};if(s){b.html.fileLoader.load(A);return}else{y()}};b.html.GlobalEval={};b.html.GlobalEval.globalEval=function(r){if(window.execScript){window.execScript(r)}else{var q=function(){window["eval"].call(window,r)};q()}};b.html.HtmlInjector={};b.html.HtmlInjector.inject=function(q,z,y,t,w){var v,C,x,B,u,A,r;if(y.toLowerCase().indexOf("<script")>=0){x=document.createElement("div");x.innerHTML="a"+y;B=x.getElementsByTagName("script");u=[];for(v=0,C=B.length;v<C;v+=1){u.push(B[v])}r=[];for(v=0,C=u.length;v<C;v+=1){A=u[v];var D={attributes:b.html.HtmlInjector.getAttributes(A)};if(A.src){D.src=A.src}else{D.script=A.innerHTML}r.push(D);A.parentNode.removeChild(A)}if(x.innerHTML){if(x.innerHTML.length>0){x.innerHTML=x.innerHTML.substring(1)}}b.html.HtmlInjector.doInject(q,z,x);b.html.HtmlInjector.loadScripts(r,0,t,q)}else{x=document.createElement("div");x.innerHTML=y;b.html.HtmlInjector.doInject(q,z,x);if(t){t()}}};b.html.HtmlInjector.doInject=function(s,r,t){if(t.childNodes.length>0){var q=document.createDocumentFragment();while(t.childNodes.length>0){q.appendChild(t.removeChild(t.childNodes[0]))}if(r){b.html.HtmlInjector.injectAtStart(s,q)}else{b.html.HtmlInjector.injectAtEnd(s,q)}}};b.html.HtmlInjector.injectAtStart=function(r,q){if(r.childNodes.length===0){r.appendChild(q)}else{r.insertBefore(q,r.childNodes[0])}};b.html.HtmlInjector.injectAtEnd=function(s,r,q){if(!q){q=1}if((s===document.body)&&(document.readyState!=="complete")&&(q<50)){setTimeout(function(){b.html.HtmlInjector.injectAtEnd(s,r,q+1)},100)}else{s.appendChild(r)}};b.html.HtmlInjector.loadScripts=function(u,s,r,q){var t,w,v=false;for(t=u.length;s<t;s+=1){w=u[s];if(w.src){v=true;break}else{b.html.GlobalEval.globalEval(w.script)}}if(v){b.html.fileLoader.load(w.src,null,function(){b.html.HtmlInjector.loadScripts(u,s+1,r,q)},q,false,w.attributes)}if(r&&(s===t)){r()}};b.html.HtmlInjector.getAttributes=function(u){var q,t,r,w,s,v={};if(u){r=u.attributes;t=r.length;for(q=0;q<t;q++){w=r[q].value;s=r[q].name.toLowerCase();if((w!=="")&&((s==="id")||(s==="class")||(s==="charset")||(s.substr(0,5)==="data-"))){v[s]=w}}return v}};(function(){var s,u=false,w=1,v,r,t,q;r=function(y){var x;if(y===true){w-=1}if(!w||(y!==true&&!u)){if(!document.body){return setTimeout(r,1)}u=true;if(y!==true){w-=1;if(w>0){return}}while(v.length>0){x=v.shift();x()}}};q=function(){if(u){return}try{document.documentElement.doScroll("left")}catch(x){setTimeout(q,1);return}r()};t=function(){if(v){return}v=[];if(document.readyState==="complete"){return setTimeout(r,1)}if(document.addEventListener){document.addEventListener("DOMContentLoaded",s,false);window.addEventListener("load",r,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",s);window.attachEvent("onload",r);var x=false;try{x=(window.frameElement===null)||(window.frameElement===undefined)}catch(y){}if(document.documentElement.doScroll&&x){q()}}}};b.html.ready=function(x){t();if(u){setTimeout(x,1)}else{v.push(x)}};if(document.addEventListener){s=function(){document.removeEventListener("DOMContentLoaded",s,false);r()}}else{if(document.attachEvent){s=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",s);r()}}}}}());b.cookie={};b.cookie.PageView={};b.cookie.PageView.update=function(){var q,t;t=function s(){return(Math.floor(1+Math.random()*65536)).toString(36).substring(1)};if(!window.__pageViewId__){q=new Date().getTime().toString(36);window.__pageViewId__=q+t()+t()+t()}return window.__pageViewId__};b.html.simplecookie={};b.html.simplecookie.readCookie=function(q){var w,t,x,v,y,s,u;y=q+"=";v=document.cookie.split(";");w=/^\s+|\s+$/g;for(s=0,u=v.length;s<u;s+=1){t=v[s].replace(w,"");if(t.indexOf(y)===0){x=unescape(t.substring(y.length));if(x.length===0){return null}return x}}return null};b.html.simplecookie.readAllCookies=function(s){var q,t,v,x,z,u,y,w;z=s+"=";x=document.cookie.split(";");q=/^\s+|\s+$/g;w=[];for(u=0,y=x.length;u<y;u+=1){t=x[u].replace(q,"");if(t.indexOf(z)===0){v=unescape(t.substring(z.length));if(v.length>0){w.push(v)}}}return w};b.html.simplecookie.writeCookie=function(s,v,w,u){var r,q,t;if(w){r=new Date();r.setTime(r.getTime()+(w*86400000));q="; expires="+r.toGMTString()}else{q=""}t=escape(s)+"="+escape(v)+q+"; path=/;";if(u){t+=" domain="+u}document.cookie=t};var p={};(function(){function u(A){return A<10?"0"+A:A}var s=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,w=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,x,r,z={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},y;function q(A){w.lastIndex=0;return w.test(A)?'"'+A.replace(w,function(B){var C=z[B];return typeof C==="string"?C:"\\u"+("0000"+B.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+A+'"'}function t(A){return isFinite(A.valueOf())?A.getUTCFullYear()+"-"+u(A.getUTCMonth()+1)+"-"+u(A.getUTCDate())+"T"+u(A.getUTCHours())+":"+u(A.getUTCMinutes())+":"+u(A.getUTCSeconds())+"Z":null}function v(H,E){var C,B,I,A,F=x,D,G=E[H];if(G instanceof Date){G=t(G)}else{if((G instanceof String)||(G instanceof Number)||(G instanceof Boolean)){G=G.valueOf()}}if(typeof y==="function"){G=y.call(E,H,G)}switch(typeof G){case"string":return q(G);case"number":return isFinite(G)?String(G):"null";case"boolean":case"null":return String(G);case"object":if(!G){return"null"}x+=r;D=[];if(Object.prototype.toString.apply(G)==="[object Array]"){A=G.length;for(C=0;C<A;C+=1){D[C]=v(C,G)||"null"}I=D.length===0?"[]":x?"[\n"+x+D.join(",\n"+x)+"\n"+F+"]":"["+D.join(",")+"]";x=F;return I}if(y&&typeof y==="object"){A=y.length;for(C=0;C<A;C+=1){if(typeof y[C]==="string"){B=y[C];I=v(B,G);if(I){D.push(q(B)+(x?": ":":")+I)}}}}else{for(B in G){if(Object.prototype.hasOwnProperty.call(G,B)){I=v(B,G);if(I){D.push(q(B)+(x?": ":":")+I)}}}}I=D.length===0?"{}":x?"{\n"+x+D.join(",\n"+x)+"\n"+F+"}":"{"+D.join(",")+"}";x=F;return I}}if(typeof p.stringify!=="function"){p.stringify=function(D,B,C){var A;x="";r="";if(typeof C==="number"){for(A=0;A<C;A+=1){r+=" "}}else{if(typeof C==="string"){r=C}}y=B;if(B&&typeof B!=="function"&&(typeof B!=="object"||typeof B.length!=="number")){throw new Error("JSON.stringify")}return v("",{"":D})}}if(typeof p.parse!=="function"){p.parse=function(D,A){var C;function B(H,G){var F,E,I=H[G];if(I&&typeof I==="object"){for(F in I){if(Object.prototype.hasOwnProperty.call(I,F)){E=B(I,F);if(E!==undefined){I[F]=E}else{delete I[F]}}}}return A.call(H,G,I)}D=String(D);s.lastIndex=0;if(s.test(D)){D=D.replace(s,function(E){return"\\u"+("0000"+E.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(D.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){C=eval("("+D+")");return typeof A==="function"?B({"":C},""):C}throw new SyntaxError("JSON.parse")}}}());(function(){var t={callbacks:{},unfired_events:[],early_callbacks:null,currentUV:null},r,s="universal_variable",q=0,v=500,u;t._isArray=function(w){return(Object.prototype.toString.call(w)==="[object Array]")};t._targetChanged=function(x,w,y){var B,z,A;if(y===null){if(w==="null"){return false}else{return true}}else{if(y===undefined){if(w===y){return false}else{return true}}else{B=p.parse(w);z=t._getNested(B,x);A=t._getNested(y,x);return !t._jsonIsEqual(z,A)}}};t._processCallbacks=function(){var w;if(t.early_callbacks&&t.early_callbacks.length>0){for(w=0;w<t.early_callbacks.length;w+=1){t.push(t.early_callbacks[w])}t.early_callbacks=null}};t._keyStringToArr=function(w){w=w.trim();if(w===""){return[]}else{w=w.replace(/\[(\w+)\]/g,".$1");w=w.replace(/^\./,"");return w.split(".")}};t._getNested=function(y,x){var w=t._keyStringToArr(x),z;while(w.length>0){z=w.shift();if(y.hasOwnProperty(z)){y=y[z]}else{return}}return y};t._jsonIsEqual=function(x,w){if(typeof x!=="string"){x=p.stringify(x,t._stripEvents)}if(typeof w!=="string"){w=p.stringify(w,t._stripEvents)}return x===w};t._stripEvents=function(w,x){if(w!=="events"){return x}else{return undefined}};t._on=function(x,y){var z,w;z=x.split(":");x=z[0];w=z[1];t.callbacks[x]=t.callbacks[x]||[];if(w){t.callbacks[x].push({keyString:w,func:y})}else{t.callbacks[x].push({func:y})}};t._trigger=function(y,z){var x,w;if(t.callbacks[y]){for(x=0;x<t.callbacks[y].length;x+=1){if(typeof t.callbacks[y][x].func==="function"){w=t.callbacks[y][x].keyString;if(w){if(y==="change"&&t._targetChanged(w,t.currentUV,r)){t.callbacks[y][x].func(z)}}else{t.callbacks[y][x].func(z)}}}}};t._eventsPush=function(w){var x,y;r.events[r.events.length]=w;w.time=w.time||(new Date()).getTime();if(t.callbacks.event){x=0;y=t.callbacks.event.length;for(x;x<y;x+=1){t.callbacks.event[x].func(w)}}w.has_fired=true};t._getUnfiredEvents=function(){var w=0;for(w=0;w<r.events.length;w+=1){if(!r.events[w].has_fired){t.unfired_events.push(r.events.splice(w,1)[0]);w-=1}}};t._fireEvents=function(){while(t.unfired_events.length>0){r.events.push(t.unfired_events.shift())}};t._resetEventsPush=function(){r.events=r.events||[];if(r.events.push.toString().indexOf("[native code]")!==-1){r.events.push=t._eventsPush;t._getUnfiredEvents();t._fireEvents()}};t._checkForChanges=function(){if(t.callbacks.change&&t.callbacks.change.length>0){if(!t._jsonIsEqual(t.currentUV,r)){t._trigger("change",r);t.currentUV=p.stringify(r,t._stripEvents)}}};t._setUVLocation=function(w){s=w;t._initUV()};t._initUV=function(){window[s]=window[s]||{events:[]};r=window[s];if(!r.events){r.events=[]}};t.push=function(w){if(!t._isArray(w)){return}if(w[0]==="on"){t._on(w[1],w[2])}else{if(w[0]==="trigger"&&w[1]){t._trigger(w[1])}}};t.init=function(x,w){if(w){s=w}t._initUV();if(!window.uv_listener||t._isArray(window.uv_listener)){t.early_callbacks=window.uv_listener||null;window.uv_listener=t;if(!x){t.start()}}else{if(w){window.uv_listener._setUVLocation(s)}}};t.start=function(){t.currentUV=p.stringify(r,t._stripEvents);u=setInterval(function(){t._resetEventsPush();t._checkForChanges()},v);t._processCallbacks()};b.html.UVListener=t}());(function(){function q(r){this.tagManager=r}q.prototype.sendLoadTimes=function(s){var u,t,r,w,v;if(!this.tagManager.isTellingLoadTimes){return}t="c="+s.qTagClientId+"&p="+s.profileName+"&l="+(s.tellLoadTimesProbability)+"&pv="+b.cookie.PageView.update()+"&d=";r=[];v=this.tagManager.loadTimes;for(u in v){if(v.hasOwnProperty(u)){w=this.tagManager.loadTimes[u];r.push('"'+u+'":'+(w.end-w.start));delete this.tagManager.loadTimes[u]}}t+=encodeURIComponent("{"+r.join(",")+"}");if(s.pingServerUrl){b.html.PostData("//"+s.pingServerUrl+"/tag2?"+t,null,"GET")}this.sendErrors(s)};q.prototype.sendErrors=function(r){if(!window.openTag_sendErrors){return}var u,t,v,s=[];for(u in this.tagManager.errors){if(this.tagManager.errors.hasOwnProperty(u)){t=this.tagManager.errors[u];s.push("{r: '"+t.reason+"',u:'"+t.url+"',l:'"+t.lineNumber+"'}")}}if(s.length>0){if(window.console&&window.console.log){window.console.log(s.join(","))}v="c="+r.qTagClientId+"&p="+r.profileName+"&pv="+b.cookie.PageView.update()+"&e="+("["+s.join(",")+"]");if(r.pingServerUrl){b.html.PostData("//"+r.pingServerUrl+"/tag_err?"+v,null,"GET")}}};qubit.qtag.Ping=qubit.qtag.Ping||q}());(function(){var q={},s=qubit.qtag.Utils,r={};q.registerTag=function(t){var u=t.getConfig().profileName;if(r[u]){}r[u]=t};q.getTag=function(t){return r[t]};q.getAllTags=function(){return r};q.getVariableValue=function(v,t,w){try{var B=r[v];var u=B.getConfig();var z=u.scriptLoaders[t];var A=u.pageVars[w];if(s.variableExists(A.pageValue)){return A.pageValue}var x=String(z.pageVars[w].defaultValue);return x}catch(y){}};qubit.Tags=qubit.Tags||q})();var f=[],h={},l={},n=false,g="",c="Opentag",a="",m=0,j=3000,k=null,d=false,i="",o=null;var g="82799";var a="877228";var f=[{filterType:"1",name:"Default filter: Match all",patternType:"1",pattern:"",priority:1,id:20682157,scriptLoaderKeys:["16859370"]},{filterType:"1",name:"/campaigns",patternType:"2",pattern:".dailykos.com/campaigns",priority:1,id:25056771,scriptLoaderKeys:["20298709"]},{filterType:"1",name:"default",patternType:"1",pattern:"",priority:1,id:-1,scriptLoaderKeys:["20298714"]},{filterType:"1",name:"Blog/Labor",patternType:"2",pattern:"http://www.dailykos.com/blog/labor",priority:1,id:25056774,scriptLoaderKeys:["20298724"]}];var h={};var l={16859370:{id:"16859370",name:"DK Homepage",scriptTimeout:5000,pre:"",url:"http://ib.adnxs.com/seg?add=1448952&t=1",post:"",html:"",locationId:1,positionId:1,locationDetail:"",async:true,needsConsent:false,usesDocWrite:false,pageVars:{},dependencies:[]},20298709:{id:"20298709",name:"Daily Kos Campaigns",scriptTimeout:5000,pre:"",url:"http://tag.rmhpi.com/seg?add=1448954&t=1",post:"",html:"",locationId:1,positionId:1,locationDetail:"",async:true,needsConsent:false,usesDocWrite:false,pageVars:{},dependencies:[]},20298714:{id:"20298714",name:"Daily Kos Stories",scriptTimeout:5000,pre:"",url:"http://tag.rmhpi.com/seg?add=1448956&t=1",post:"",html:"",locationId:1,positionId:1,locationDetail:"",async:true,needsConsent:false,usesDocWrite:false,pageVars:{},dependencies:[]},20298724:{id:"20298724",name:"DK Blog/Labor",scriptTimeout:5000,pre:"",url:"http://tag.rmhpi.com/seg?add=1448957&t=1",post:"",html:"",locationId:1,positionId:1,locationDetail:"",async:true,needsConsent:false,usesDocWrite:false,pageVars:{},dependencies:[]}};
var m=1;var k="pong.qubitproducts.com";var i="";var n=false;var j=3000;(function(){var t=qubit.Tags,x=qubit.qtag.Utils,C=b.html.simplecookie,y=b.html.GlobalEval,v=b.html.fileLoader,E=b.html.HtmlInjector,D=function(){},r=function(){},A=function(){},z=new qubit.qtag.Ping(B),u=qubit.qtag.Session;n=n||!!window.otDelayDocWrite;function w(F){if(window.console&&window.console.log){console.log(F)}}function B(H,G,F){f=H||f;l=G||l;h=F||h;t.registerTag(B);window["__ot_vars__"+a]=h;b.html.UVListener.init();B.isSync=B.determineIfSync();B.setup(f,l)}B.getConfig=function(){return{containerName:c,qTagClientId:g,profileName:a,delayDocWrite:n,tellLoadTimesProbability:m,pingServerUrl:k,maxCookieLength:j,qtag_domain:i,filters:f,scriptLoaders:l,pageVars:h,async:!B.isSync,scriptURL:o}};B.setup=function(I,H){var G,K,J={};B.docWriteUsers=[];B.errors={};B.loadersAwaitingConsent=[];B.isTellingLoadTimes=m>Math.random();if(B.isTellingLoadTimes){B.loadTimes={}}G=B.getFilterStates(I,x.getUrl(),J);for(var F in H){if(!H[F].scriptTimeout||H[F].scriptTimeout<0){H[F].scriptTimeout=B.TAG_MAX_WAIT}}B.qTagLoaders=B.getLoaders(G,H);B.qTagLoaderCount=0;B.loadTimesSent=false;B.loadersStarted=0;B.loadersFinished=0;B.initialLoadFinished=false;B.canCallLoaded=false;B.hasCalledLoaded=false;B.loadedSomeSync=false;B.runStarters(G,J);B.initialLoadFinished=true;B.waitingForSyncWrites=false;if(n){b.html.ready(function(){B.sequentiallyLoadingDelayed=false;B.loadLoadersSequentially()})}else{if(B.loadedSomeSync){setTimeout(B.loadLoadersSequentially,100)}else{B.loadLoadersSequentially()}b.html.ready(function(){B.loadLoadersSequentially()})}B.flushLoadTimes();if(B.canCallLoaded){B.callAllLoaded()}window.opentag_consentCBs=window.opentag_consentCBs||[];window.opentag_consentGiven=window.opentag_consentGiven||function(){var M,N,L;for(M=0,N=window.opentag_consentCBs.length;M<N;M+=1){window.opentag_consentCBs[M]()}};window.opentag_consentCBs.push(B.consentGiven)};B.ALL="1";B.SUBSTRING="2";B.REGEX="3";B.EXACT_MATCH="4";B.FN="100";B.DEDUPE_FN="110";B.FILTER_TYPE_INCLUDE="1";B.FILTER_TYPE_EXCLUDE="2";B.NORMAL_FILTER="1";B.DEDUPE_URL_FILTER="2";B.DEDUPE_SESSION_FILTER="3";B.JS_VALUE="2";B.QUERY_PARAM="3";B.COOKIE_VALUE="4";B.ELEMENT_VALUE="5";B.NOT_LOADED=0;B.LOADING=1;B.LOAD_FAILURE=2;B.LOAD_SUCCESS=3;B.determineIfSync=function(){var H,I,G,F,J;F=document.getElementsByTagName("script");for(H=0,I=F.length;H<I;H+=1){G=F[H];J=G.getAttribute("src");if(!!J&&(J.indexOf(""+g+"-"+a+".js")>0)){return(G.getAttribute("async")===null&&(G.getAttribute("defer")===false||G.getAttribute("defer")===""||G.getAttribute("defer")===null))}}return true};B.getFilterStates=function(H,F,J){var I,M,G,N={},K=[],L;if((!H)||(!F)){return K}for(I=0,M=H.length;I<M;I+=1){G=H[I];L=B.doesFilterMatch(G,F,J);if(L){K.push(G)}else{}}K.sort(function(P,O){return O.priority-P.priority});return K};B.getLoaders=function(J,K,G){var H,I,L={},F={};for(H=0,I=J.length;H<I;H+=1){B.updateLoaders(J[H],L)}for(H in L){if(L.hasOwnProperty(H)){F[H]=K[H];F[H].dedupe=L[H];F[H].state=B.NOT_LOADED;F[H].nextLoaders={}}}return F};B.updateLoaders=function(J,K){var G,I,H,F=J.scriptLoaderKeys;if(J.filterType===B.FILTER_TYPE_INCLUDE){for(G=0,I=F.length;G<I;G+=1){H=B.getFilterType(J);if((H===B.NORMAL_FILTER)||(H===B.DEDUPE_URL_FILTER)||(K[F[G]]===B.DEDUPE_URL_FILTER)){K[F[G]]=H}}}else{if(J.filterType===B.FILTER_TYPE_EXCLUDE){for(G=0,I=F.length;G<I;G+=1){delete K[F[G]]}}}};B.getFilterType=function(G){var F=parseInt(G.patternType,10);if((F<10)||(F===100)){return B.NORMAL_FILTER}if((F>=10)&&(F<20)){return B.DEDUPE_URL_FILTER}if(F===110){return B.DEDUPE_SESSION_FILTER}};B.runStarters=function(J,K){var G,I,H;for(G=0,I=J.length;G<I;G+=1){H=J[G];try{H.starter(K,B.createStarterCb(H))}catch(F){}}};B.createStarterCb=function(F){return function(J){var I,K,H,G=[],L;for(I=0,K=F.scriptLoaderKeys.length;I<K;I+=1){H=B.qTagLoaders[F.scriptLoaderKeys[I]];if(H&&J===true){if(H.state===B.LOAD_SUCCESS){H.state=B.NOT_LOADED;H.counted=false}else{}}if(H&&(H.state===B.NOT_LOADED)&&(H.dedupe!==B.DEDUPE_URL_FILTER)){if(!((H.dedupe===B.DEDUPE_SESSION_FILTER)&&(F.patternType!==B.DEDUPE_FN))){if(!H.counted){H.counted=true;G.push(H)}}}}for(I=0,K=G.length;I<K;I+=1){H=G[I];if(B.hasConsent()||!B.needsConsent(H)){B.loadLoader(H)}else{B.loadersAwaitingConsent.push(H)}}}};B.hasConsent=function(){return C.readCookie("qubitconsent")==="Accepted"};B.needsConsent=function(F){return !!F.needsConsent};B.consentGiven=function(){var G,H,F=B.loadersAwaitingConsent;for(G=0,H=F.length;G<H;G+=1){B.loadLoader(F[G])}};B.doesFilterMatch=function(G,F,J){var H=false;switch(G.patternType){case B.FN:case B.DEDUPE_FN:try{H=G.pattern(J)}catch(I){H=false}break;case B.EXACT_MATCH:case"1"+B.EXACT_MATCH:if(F.toLowerCase()===G.pattern.toLowerCase()){H=true}break;case B.SUBSTRING:case"1"+B.SUBSTRING:if(F.toLowerCase().indexOf(G.pattern.toLowerCase())>=0){H=true}break;case B.REGEX:case"1"+B.REGEX:if(new RegExp(G.pattern).test(F)){H=true}break;case B.ALL:case"1"+B.ALL:H=true;break}if(H&&!G.starter){G.starter=B.defaultStarter}return H};B.defaultStarter=function(G,F){F()};B.TAG_MAX_WAIT=10*1000;B.loadCheckInterval=500;B.loadLoader=function(G){var H,F;if((G.state===B.NOT_LOADED)&&B.dependenciesExist(G)){try{G.state=B.LOADING;G.startTime=new Date().valueOf();if(G.usesDocWrite&&!(B.isSync&&!G.async)){B.docWriteUsers.push(G);B.loadLoadersSequentially()}else{B.doWhenReady(G,B.loadTagLoader,function(){})}}catch(I){G.state=B.LOAD_FAILURE;H={reason:"error parsing loader, "+G.id+": "+I.reason,url:document.location.href};B.errors[G.id]=H;w(H)}}};B.dependenciesExist=function(F){var H,I,J,G,K=true;J=F.dependencies;if(!J){return true}for(H=0,I=J.length;H<I;H+=1){G=B.qTagLoaders[J[H]];if(!G){K=false}else{if(G.state!==B.LOAD_SUCCESS){G.nextLoaders[F.id]=true;K=false}else{}}}return K};function q(G,F){B.qTagLoaderCount+=1;F(G)}B.doWhenReady=function(G,F,H){if(B.canLoad(G)){q(G,F)}else{var I=new Date().valueOf()-G.startTime;if(I<G.scriptTimeout){setTimeout(function(){B.doWhenReady(G,F,H)},B.loadCheckInterval)}else{G.DONE_LOADING=true;if(B.canLoad(G,true)){q(G,F)}else{H(G)}}}};B.isPageVarsTimedOut=function(F){return F.scriptTimeout<(new Date().valueOf()-F.startTime)};B.canLoad=function(F,G){var H=B.elementExists(F)&&B.pageVariablesExist(h,F,G);return H};B.elementExists=function(F){if(B.isSync&&!F.async){return true}else{if(F.locationId===2){return !!document.body}else{if(F.locationId===3){return !!document.getElementById(F.locationDetail)}}}return true};B.pageVariablesExist=function(I,F,H){var G,J,K,M;if(!F.pageVars){return true}for(G in F.pageVars){if(F.pageVars.hasOwnProperty(G)){try{K=I[G];J=B.pageVariableExists(K,F,G,H);if(!J){return false}}catch(L){return false}}}return true};function s(F,H){var R,K,J,G,M,P,I,L=false;var O=F.type;var Q=F.value;switch(O){case B.JS_VALUE:try{if(Q.indexOf("[#]")===-1){y.globalEval("window.__var_test = ("+Q+")");I=window.__var_test}else{I=B.getArrayPageVariableExists(F);if(I){y.globalEval("window.__var_test = ("+I+")");I=window.__var_test;L=true}}}catch(N){I=null}break;case B.QUERY_PARAM:I=x.getQueryParam(Q);break;case B.COOKIE_VALUE:I=C.readCookie(Q);break;case B.ELEMENT_VALUE:I=x.getElementValue(Q);break}return{pageValue:I,isArray:L}}B.pageVariableExists=function(K,F,G,H){var J=s(K,F);var I=x.variableExists(J.pageValue);if(I){K.pageValue=J.pageValue;K.isArray=J.isArray}else{if(H){I=x.variableExists(F.pageVars[G].defaultValue)}}return I};B.getArrayPageVariableExists=function(F){var G,M,K,L,J,N,H;L=true;J=false;N="";H=F.value.split("[#]");for(G=0,M=H.length-1;L&&(G<M);G+=1){N+=H[G];try{y.globalEval("window.__var_test = ("+N+")");K=window.__var_test}catch(I){L=false}L=L&&x.variableExists(K);if(L){if(K.length===0){J=true;break}N+="[0]"}}if(!L){return null}else{if(J){return N}else{return F.value.replace("[#]","[0]")}}};B.loadingSequentially=false;B.waitingForSyncWrites=true;B.sequentiallyLoadingDelayed=n;B.loadLoadersSequentially=function(){var G,H,I,F;if(!B.waitingForSyncWrites&&!B.sequentiallyLoadingDelayed&&!B.loadingSequentially&&(B.docWriteUsers.length>0)){B.loadingSequentially=true;
F=false;for(H=0,I=B.docWriteUsers.length;H<I;H+=1){G=B.docWriteUsers[H];if(B.canLoad(G)){B.docWriteUsers.splice(H,1);F=true;break}else{}}if(F){B.doWhenReady(G,B.loadLoaderSequentially,function(){B.loadLoadersSequentially()})}else{B.loadingSequentially=false}}else{}};B.loadLoaderSequentially=function(G){var I=[],H,F;document.write=function(J){I.push(J)};document.writeln=function(J){I.push(J)};H=function(){var J=B.getLocation(G);E.inject(J,G.positionId===1,I.join("\n"),function(){})};G.finishHandler=H;B.loadTagLoader(G)};B.loadTagLoader=function(F){B.substituteValues(h,F);var G=B.getTimerEnder(F);try{if(F.url){if(!F.async&&B.isSync){B.loadTagLoaderSync(F)}else{v.load(F.url,B.getTimerStarter(F),G,F.parentNode,F.async)}}else{if(F.html){B.injectHtml(F)}}}catch(H){G(null,H,true)}};B.substituteValues=function(G,F){B._substituteValues(G,F,"html");B._substituteValues(G,F,"pre");B._substituteValues(G,F,"post");B._substituteValues(G,F,"url")};B._substituteValues=function(K,H,O){var G,J,I,F="_"+O,M,P;if(!H[F]){H[F]=H[O]}M=H[F];if(M&&M.length>0){for(J in H.pageVars){if(H.pageVars.hasOwnProperty(J)){G=K[J];I="\\${"+H.pageVars[J].token+"}";var L=G.pageValue;if(G.pageValue===undefined){L=t.getVariableValue(a,H.id,J)}if(G.isArray){M=x.substituteArray(G,I,M)}else{if(L instanceof Array){var N="qubit.Tags.getVariableValue("+a+","+H.id+","+J+")";M=M.replace(new RegExp(I,"g"),N)}else{L=L;M=M.replace(new RegExp(I,"g"),L)}}}}H[O]=M}};B.loadTagLoaderSync=function(F){var G,I="scr",H;B.getTimerStarter(F)();G=v.tidyUrl(F.url);H="<"+I+"ipt type='text/javascript' src='"+G+"'></"+I+"ipt>";document.write(H);B.loadedSomeSync=true;B.getTimerEnder(F)()};B.injectHtml=function(F){var G=B.getLocation(F);B.getTimerStarter(F)();E.inject(G,F.positionId===1,F.html,B.getTimerEnder(F))};B.getLocation=function(F){var G;if(F.locationId===1){G=document.getElementsByTagName("head")[0]}else{if(F.locationId===2){G=document.body}else{if(F.locationId===3){G=document.getElementById(F.locationDetail)}else{G=document.body}}}return G};B.getTimerStarter=function(F){var G;if(B.isTellingLoadTimes){G=(new Date()).getTime();B.loadTimes[F.id]={start:G}}return B.createStatementEvaluator(F.url?F.pre:"",true)};B.getTimerEnder=function(G){var H=false,F;return function(K,J,L){if(H){return}H=true;try{var N,I,O;if(B.isTellingLoadTimes){I=(new Date()).getTime();B.loadTimes[G.id].end=I}if(G.finishHandler){G.finishHandler()}B.createStatementEvaluator((!L&&!!G.url)?G.post:"",false)();if(J){B.errors[G.id]=J;G.state=B.LOAD_FAILURE}else{G.state=B.LOAD_SUCCESS}if(B.loadingSequentially){B.loadingSequentially=false}B.loadLoadersSequentially();if(!L){B.loadDependentScripts(G)}}catch(M){w(M)}}};B.loadDependentScripts=function(F){var G;for(G in F.nextLoaders){if(F.nextLoaders.hasOwnProperty(G)){if(B.qTagLoaders[G]){B.loadLoader(B.qTagLoaders[G])}}}};B.createStatementEvaluator=function(F,G){if((!!F)&&(F.length>0)){return function(){B.incrementLoadCounter(G);y.globalEval(F)}}else{return function(){B.incrementLoadCounter(G)}}};B.incrementLoadCounter=function(F){if(F){B.loadersStarted+=1;B.canCallLoaded=false}else{B.loadersFinished+=1}B.flushLoadTimes()};B.flushLoadTimes=function(){if((B.initialLoadFinished&&(B.loadersFinished===B.qTagLoaderCount))||(B.loadTimesSent&&(B.loadersStarted===B.loadersFinished))){z.sendLoadTimes(B.getConfig());B.canCallLoaded=true;if(B.initialLoadFinished){B.callAllLoaded()}B.loadTimesSent=true}};B.callAllLoaded=function(){if(!B.hasCalledLoaded){B.hasCalledLoaded=true;if(window.qTag_allLoaded){window.qTag_allLoaded()}}};B.isDebugMode=function(){var F=false;if(C.readCookie("opentag_debug")||C.readCookie("opentag_debug_tool")||document.location.href.indexOf("opentag_debug")>=0){F=true}return F};B.start=function(){if(B.STARTED){return}B.STARTED=true;if(B.isDebugMode()){var F=document.createElement("script");if(o){F.src=o}else{F.src="//s3-eu-west-1.amazonaws.com/opentag/opentag-"+g+"-"+a+"-debug.js"}document.getElementsByTagName("head")[0].appendChild(F)}else{var G=function(){var H=new B(f,l,h)};G()}};B.start()}())}())}catch(e){try{if(window.debug){console.log(e)}}catch(ex){}};