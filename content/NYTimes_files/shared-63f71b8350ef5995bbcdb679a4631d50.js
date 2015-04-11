define("ab/libs/cookie",[],function(){"use strict";return{getCookie:function(e){var t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},setCookie:function(e,t,n,i,r,o){var s;return n&&1e3>n&&(s=new Date,s.setTime(s.getTime()+24*n*60*60*1e3)),document.cookie=e+"="+encodeURIComponent(t)+(i?";path="+i:";path=/")+(n?";expires="+s.toUTCString():"")+(r?";domain="+r:";domain=.nytimes.com")+(o?";secure":"")}}}),define("ab/libs/logger",["ab/vendor/jquery","ab/libs/cookie"],function(e,t){"use strict";var n=function(e){this.prefix="["+e+"] ",this.levels={SILENT:0,ERROR:1,WARN:2,INFO:3,DEBUG:4};var n=t.getCookie("abTestLogLevel");n=null===n?this.levels.SILENT:parseInt(n,10),this.setLevel(n)};n.prototype={getLevelKey:function(e){var t,n=this.levels;for(t in n)if(n.hasOwnProperty(t)&&n[t]===e)return t;return null},setLevel:function(e){if(null===this.getLevelKey(e))throw new Error("Wrong log level");this.level=e,t.setCookie("abTestLogLevel",this.level)},log:function(e,t){var n,i;if(n="undefined"==typeof t?this.levels.INFO:t,i=this.getLevelKey(n),null===i)throw new Error("Wrong log level");return this.level!==this.levels.SILENT&&window.console&&n<=this.level?(console.log(i+" "+this.prefix+e),!0):!1},error:function(e){return this.log(e,this.levels.ERROR)},warn:function(e){return this.log(e,this.levels.WARN)},info:function(e){return this.log(e,this.levels.INFO)},debug:function(e){return this.log(e,this.levels.DEBUG)}};var i={};return n.get=function(e){return e=e||"global",i.hasOwnProperty(e)||(i[e]=new n(e)),i[e]},n}),define("ab/libs/utils",["ab/vendor/jquery","ab/libs/cookie","ab/libs/logger"],function(e,t,n){"use strict";var i={},r=n.get("utils");return i.parseUri=function(e){for(var t=i.parseUri.options,n=t.parser[t.strictMode?"strict":"loose"].exec(e),r={},o=14;o--;)r[t.key[o]]=n[o]||"";return r[t.q.name]={},r[t.key[12]].replace(t.q.parser,function(e,n,i){n&&(r[t.q.name][n]=i)}),r},i.parseUri.options={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},i.camelCase=function(e){return e.replace(/^-ms-/,"ms-").replace(/-([a-z]|[0-9])/gi,function(e,t){return(t+"").toUpperCase()})},i.cookie=function(t,n,i){if("undefined"==typeof n){var r=null;if(document.cookie&&""!==document.cookie)for(var o=document.cookie.split(";"),s=0;s<o.length;s++){var a=e.trim(o[s]);if(a.substring(0,t.length+1)===t+"="){r=decodeURIComponent(a.substring(t.length+1));break}}return r}i=i||{},null===n&&(n="",i.expires=-1);var c="";if(i.expires&&("number"==typeof i.expires||i.expires.toUTCString)){var u;"number"==typeof i.expires?(u=new Date,u.setTime(u.getTime()+24*i.expires*60*60*1e3)):u=i.expires,c="; expires="+u.toUTCString()}var l=i.path?"; path="+i.path:"",f=i.domain?"; domain="+i.domain:"",d=i.secure?"; secure":"";document.cookie=[t,"=",encodeURIComponent(n),c,l,f,d].join("")},i.inherits=function(t,n,i){var r,o=t;r=n&&n.hasOwnProperty("constructor")?n.constructor:function(){return o.apply(this,arguments)},e.extend(r,o,i);var s=function(){this.constructor=r};return s.prototype=o.prototype,r.prototype=new s,n&&e.extend(r.prototype,n),r.__super__=o.prototype,r.__super__.constructor=o,r},function(){var e={};i.Template=function(t,n){var r=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g,"',$1,'").split("<%").join("');").split("%>").join("p.push('")+"');}return p.join('');"):e[t]=e[t]||i.Template(document.getElementById(t).innerHTML);return n?r(n):r}}(),i.getMeter=function(t){var n=i.getCookie("nyt-m"),o=i.parseUri("?"+n).queryKey,s={};return t=t||["t","v","ft","fv"],e.each(t,function(e,t){s[t]=0}),e.each(t,function(e,t){"undefined"==typeof o[t]&&r.debug("FAILED to parse Meter cookie ("+t+" param)"),s[t]=o[t]?parseInt(o[t].toString().substr(2),10):0}),s},i.getScrubbedQueryString=function(){var t=i.getLocationSearch().slice(1).split("#"),n=t[1]?"#"+t[1]:"",r=(t[0]||"").split("&"),o=e.grep(r,function(e){return e=e.split("=")[0],!e.match(/^OC$/i)&&!e.match(/^(exit_)?uri$/i)});return o.join("&")+n},i.runWhenReady=function(e,t,n,i){setTimeout(function r(){e()?t():--i&&setTimeout(r,n)},n)},i.appendStyleTag=function(e){var t=document.createElement("style");return t.setAttribute("type","text/css"),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t),t},i.getLocationSearch=function(){return location.search},i.getCampaignId=function(){if("string"!=typeof this.getCampaignId.ret){var e=this.getLocationSearch().match(/campaignId=[0-9A-Z]*/i);this.getCampaignId.ret=e?e[0].split(/=/)[1]:""}return this.getCampaignId.ret},i.getTarget=function(e){var t;return e||(e=window.event),e.target?t=e.target:e.srcElement&&(t=e.srcElement),3===t.nodeType&&(t=t.parentNode),t},i.isLeftButton=function(e){e=e||window.event;var t=e.which||e.button;return 1===t},i.getCookie=function(e){return t.getCookie(e)},i.setCookie=function(e,n,i,r,o,s){return t.setCookie(e,n,i,r,o,s)},i.promiseSelector=function(t,n){var i=e.Deferred();return e(t).length?i.resolve(e(t)):e(document).on(n,function(){i.resolve(e(t))}),i.promise()},i.appendParamsToUrl=function(t,n){var r,o,s,a={};return t.indexOf("#")>-1&&(r=t.split("#"),t=r[0]),t.indexOf("?")>-1?(o=t.split("?"),s=o[0],a=i.parseUri(t).queryKey):s=t,a=e.extend({},a,n),s+"?"+e.param(a)+(r?"#"+r[1]:"")},i.appendParamsToLinks=function(t){e.each(t,function(t,n){return 0===e(n.selector).length?void r.error("Element does not exist: "+n.selector):void e(n.selector).each(function(){var t=e(this).attr("href");return t?void e(this).attr("href",i.appendParamsToUrl(t,n.params)):void r.error('Unable to get "href" from element '+n.selector)})})},i.queryToObject=function(e){for(var t,n={},i=e.replace(/^\?/,"").split("&"),r=i.length,o=0;r>o;o++)i[o]&&(t=i[o].split("="),n[t[0]]=t[1]);return n},i.preserveCurrentParams=function(t,n){var r,o,s,a={},c=i.getLocationSearch(),u=i.queryToObject(c);return t.indexOf("#")>-1&&(s=t.split("#"),t=s[0]),t.indexOf("?")>-1?(r=t.split("?"),a=i.queryToObject(r[1]),o=r[0]):o=t,u=e.extend({},u,a,n),o+"?"+e.param(u)+(s?"#"+s[1]:"")},i.appendHrefParams=function(t){e.each(t,function(t,n){if(0===e(n.selector).length)throw new Error("Element does not exist");e(n.selector).each(function(){var t=e(this).attr("href");if(!t)throw new Error('Unable to get "href" from element');e(this).attr("href",i.preserveCurrentParams(t,n.params))})})},i}),define("ab/libs/container",["ab/vendor/jquery","ab/libs/logger"],function(e,t){"use strict";var n=function(){var n;if(this.logger=t.get(this.name),!this.name)throw new Error("Name should be defined");if(this.deferred=e.Deferred(),this.conf=e.extend({},this.defaults,this.conf),this.container=e(this.conf.containerSelector),!this.container.length)throw new Error("Container element was not found in the DOM: "+this.conf.containerSelector);this.container.addClass(this.conf.className),this.events=e({});for(n in this.conditionsClassMap)this.conditionsClassMap.hasOwnProperty(n)&&this.conditionsClassMap[n]&&this.conditionsClassMap[n].apply&&this.conditionsClassMap[n]()&&this.container.addClass(n);this.initialize.apply(this,arguments)};return n.prototype={name:"",defaults:{containerSelector:"body",className:"abtest-container"},conditionsClassMap:{},conf:null,container:null,deferred:null,events:null,initialize:function(){},changeDom:function(){return this.deferred.resolve(),this.deferred.promise()},setTracking:function(){},getPromise:function(){return this.deferred.promise()}},n}),define("ab/libs/factor",["ab/vendor/jquery","ab/libs/utils","ab/libs/logger","ab/libs/container"],function(e,t,n,i){"use strict";var r=t.inherits(i,{conf:{className:"abtest-factor"}});return r}),define("ab/libs/variation",["ab/vendor/jquery","ab/libs/utils","ab/libs/logger","ab/libs/container"],function(e,t,n,i){"use strict";var r=t.inherits(i,{factors:null,_factors:null,conf:{className:"abtest-variation"},initialize:function(){if(this.factors=this.factors||[],this._factors=[],this.factors.length)for(var e=0,t=this.factors.length;t>e;e++)this._factors.push(new this.factors[e])},changeDom:function(){this.logger.debug("fn.changeDom");var t,n=[];if(this._factors.length){for(var i=0,r=this._factors.length;r>i;i++)t=this._factors[i],n.push(t.changeDom());e.when.apply(e,n).always(this.deferred.resolve)}else this.deferred.resolve();return this.deferred.promise()},setTracking:function(){this.logger.debug("fn.setTracking");var e;if(this._factors.length)for(var t=0,n=this._factors.length;n>t;t++)e=this._factors[t],e.setTracking()}});return r}),define("ab/libs/test/test",["ab/vendor/jquery","ab/libs/utils","ab/libs/logger","ab/libs/container"],function(e,t,n,i){"use strict";var r=t.inherits(i,{initialize:function(t){this.conf=e.extend({},this.conf,t)},conf:{className:"abtest-test",testId:"",jsHost:"",revision:0},variation:null,variationId:null,isAllocated:function(){throw new Error("fn.isAllocated is not implemented")},allocateVariation:function(){throw new Error("fn.allocateVariation is not implemented")},applyVariation:function(){throw new Error("fn.applyVariation is not implemented")},trackEvent:function(){throw new Error("fn.trackEvent is not implemented")},restoreContainers:function(){throw new Error("fn.restoreContainers is not implemented")},runExperiment:function(){throw new Error("fn.runExperiment is not implemented")}});return r}),define("ab/libs/test/strict_test",["ab/vendor/jquery","ab/libs/utils","ab/libs/test/test"],function(e,t,n){"use strict";var i=t.inherits(n,{allocate:function(){var t=this,n=this.conf.engine.allocate(),i=this._createTimeOut(n);return e.when(i,n).done(function(e,n){var i=n[0],r=n[1];t.logger.debug("[allocation] Allocated to "+i+" variation."),r?t.conf.trackerFacade.sendImpression(i):t.logger.debug("[allocation] skipping allocation calls"),t.variationId=i}).fail(function(e){t.variationId=e||-1})},getCampaignId:function(){return""},_createTimeOut:function(t){var n=e.Deferred();return t.then(function(){n.resolve()}),setTimeout(function(){n.reject()},8e3),n.promise()},applyVariation:function(){this.variation=new this.conf.variations[this.variationId](this),this.variation.changeDom(),this.variation.setTracking(this.trackingStrategyInst)},setTracking:function(){this.trackingStrategyInst.setTracking(this.selectorConversions),this.trackingStrategyInst.apply(this)},changDom:function(){},restoreContainers:function(){e(this.conf.containerSelector).show()},getInfo:function(){var e=this.conf;return{name:this.name,variationId:this.variationId,trackers:e.trackers||{}}},runExperiment:function(){var e=this,t=this.conf.trackingStrategy;this.trackingStrategyInst=new t(this.conf.trackerFacade),this.allocate().then(function(){e.changDom(),e.applyVariation(),e.setTracking(),e.restoreContainers(),e.deferred.resolve()}).fail(function(){e.restoreContainers(),e.deferred.reject()})}});return i}),define("ab/libs/tracking_facade",["ab/vendor/jquery"],function(e){"use strict";var t=function(e){this.trackers=e};return t.prototype={trackEvent:function(e,t){var n=[];for(var i in this.trackers)this.trackers.hasOwnProperty(i)&&n.push(this["_"+i+"TrackEvent"](e,this.trackers[i],t));return this._promisesWithTimeOut(n)},_promisesWithTimeOut:function(t){var n=e.when.apply(e,t),i=this._createTimeout(n);return e.when(n,i)},_createTimeout:function(t){var n=e.Deferred();return setTimeout(n.reject,2e3),t.then(n.resolve),n.promise()},sendImpression:function(e){this._callExistingMethod("sendImpression",[e])},setAttrs:function(e){this._callExistingMethod("setAttrs",[e])},_callExistingMethod:function(e,t){for(var n in this.trackers)this.trackers.hasOwnProperty(n)&&this.trackers[n][e]&&this.trackers[n][e].apply(this.trackers[n],t)},_guaTrackEvent:function(e,t){var n=e.params;return t.trackEvent(n.category,n.action,n.label,n.value)},_wtoTrackEvent:function(e,t){return t.trackEvent(e.params.label)},_evtTrackEvent:function(e,t){return t.trackEvent(e.getParams())}},t}),define("ab/libs/conversion",["ab/vendor/jquery"],function(e){"use strict";var t=function(t){var n={selector:"",eventType:"click",onActivate:function(){},action:"click",category:void 0,label:void 0,value:void 0,preventedEvents:[]};this.params=e.extend({},n,t),this.selector=this.params.selector,this.eventType=this.params.eventType,this.preventedEvents=this.params.preventedEvents};return t.prototype={isVoid:function(){return this.params.isVoid},activate:function(e,t){this.params.onActivate.apply(this.params,[t,e])},clone:function(n){var i=e.extend(!0,{},this.params,n);return new t(i)},getParams:function(){return{action:this.params.action,category:this.params.category,label:this.params.label,value:this.params.value}}},t}),define("ab/libs/tracking_strategies/tracking_strategy",["ab/vendor/jquery","ab/libs/utils"],function(e,t){"use strict";var n=!1;/iphone|ipod|ipad/gi.test(navigator.appVersion)&&(window.onpageshow=function(e){n=!1,e.persisted&&(n=!0)});var i=function(e){this.trackerFacade=e,this.initialize()};return i.prototype={initialize:function(){},setTracking:function(){},apply:function(){},_targetType:function(e){if(e.is("a")||e.parents("a").length>0)return"link";var t='input[type="submit"], button',n=e.is(t)||e.parents(t).length>0,i=e.parents("form");return n&&i.length>0&&(i.attr("action")||i.attr("onsubmit"))?"form":!1},_getLink:function(e){return e.is("a")?e:e.parents("a").eq(0)},_isHrefValid:function(e){var t=this._getLink(e).attr("href"),n=/^javascript:|^#|^mailto:/gim;return!t||t.match(n)?!1:!0},_isIntendedToFollow:function(e){return t.isLeftButton(e)&&!e.shiftKey&&!e.ctrlKey&&!e.metaKey&&!e.altKey},_isLinkToCauseReload:function(t){if(n)return!1;var i=this._isHrefValid(t),r=this._getLink(t).attr("target")||"_self",o=e.inArray(r,["_self","_parent","_top"])>-1;return i&&o?!0:!1},_redirect:function(e){if(!e)throw new Error("Empty href passed as a destination!");location.href=e},_followLink:function(t){return e.proxy(function(){var e=this._getLink(t).attr("href"),n=this;-1!==navigator.appVersion.indexOf("Mac")&&(window.onunload=function(){}),setTimeout(function(){n._redirect.call(n,e)},0)},this)},_getForm:function(e){return e.parents("form").eq(0)},_checkFormValidity:function(e){return e.checkValidity?e.checkValidity():!0},_submitForm:function(t){return e.proxy(function(){var e=this._getForm(t);this._checkFormValidity(e[0])&&e.submit()},this)},_linkGuard:function(e,t,n){switch(this._targetType(e)){case"link":var i=this._isIntendedToFollow(t),r=this._isLinkToCauseReload(e);return r&&i?(n.always(this._followLink(e)),!1):!0;case"form":return n.always(this._submitForm(e)),!1;default:return!0}},trackEvent:function(e,t){return e.activate(this.activator,t),this.trackerFacade.trackEvent(e,t)},_recordEvent:function(e,t,n){var i=this.trackEvent(e,t);return e.isVoid()?!0:this._linkGuard(t,n,i)}},i}),define("ab/libs/tracking_strategies/delegation_tracking_strategy",["ab/libs/tracking_strategies/tracking_strategy","ab/libs/utils","ab/vendor/jquery","ab/libs/conversion"],function(e,t,n,i){"use strict";var r=t.inherits(e,{initialize:function(){this.conversions=[]},setTracking:function(e){return"undefined"==typeof e?!0:(e instanceof Array||(e=[e]),e=this._makeConversions(e),void(this.conversions=this.conversions.concat(e)))},_makeConversions:function(e){for(var t=[],n=0;n<e.length;n++)t.push(new i(e[n]));return t},apply:function(e){this.activator=e;var t,i,r={};for(t=0;t<this.conversions.length;t++)i=this.conversions[t],this._isHrefValid(n(i.selector))&&"click"===i.eventType&&(this.conversions[t]=i=i.clone({eventType:"mouseup",preventedEvents:["click"]}),r.click=1),r[i.eventType]=1;for(var o in r)r.hasOwnProperty(o)&&this._listenTo(o+".ab")},_isSelector:function(e,t){return e.is(t)||!!e.parents(t).length},_handle:function(e){var i,r,o,s,a;for(i=0;i<this.conversions.length;i++)if(r=this.conversions[i],o=n(e.target),this._isSelector(o,r.selector)){if(n.inArray(e.type,r.preventedEvents)>-1&&t.isLeftButton(e)&&this._isLinkToCauseReload(o))return!1;if(r.eventType===e.type&&(s=r.preventedEvents.length>0,a=3===e.which,!s||!a))return this._recordEvent(r,o,e)}},_listenTo:function(e){n(this.activator.conf.containerSelector).on(e,n.proxy(this._handle,this))}});return r}),define("ab/libs/user_info_api",[],function(){"use strict";var e=function(e){this.info=e};return e.prototype={isLoggedIn:function(){return parseInt(this.info.data.id)>0},isSubscriber:function(){var e=this.getSubscription(),t=0;for(var n in e)e.hasOwnProperty(n)&&(t|=parseInt(e[n]));return!!t},getSubscription:function(){return this.info.data.subscription}},e.getHost=function(){return location.host},e}),define("ab/libs/user_info",["ab/vendor/jquery","ab/libs/utils","ab/libs/user_info_api"],function(e,t,n){"use strict";function i(){return Date.now()+Math.round(100*Math.random())}var r=e.Deferred(),o="//www.nytimes.com/svc/web-products/userinfo.json",s=function(t){e.getJSON(o,{_:i()},function(e){t.resolve(e)})},a=function(n){e.ajax({url:o+"p",data:{cookie:t.getCookie("NYT-S"),_:i()},dataType:"jsonp",success:function(e){n.resolve(e)}})};return"www.nytimes.com"===n.getHost()?s(r):a(r),setTimeout(function(){r.reject()},1e4),{isLoggedIn:function(){var t=e.Deferred();return r.done(function(e){var i=new n(e);i.isLoggedIn()?t.resolve():t.reject()}).fail(function(){t.reject()}),t.promise()},api:function(){return r.pipe(function(e){return new n(e)})},isSubscriber:function(){var t=e.Deferred();return r.done(function(e){var i=new n(e);i.isSubscriber()?t.resolve():t.reject()}).fail(function(){t.reject()}),t.promise()},promise:r.promise()}}),define("ab/libs/page_info",["ab/vendor/jquery","ab/libs/utils"],function(e,t){"use strict";return{getMetaData:function(){var e={sourceApp:"nyt4",pageCount:t.getMeter().v,gwViews:t.getMeter().g,campaignId:t.getCampaignId()||void 0};window.NYTD&&window.NYTD.OC&&window.NYTD.OC.active&&(e.offerChain=window.NYTD.OC.active);var n,i,r,o=document.getElementsByTagName("meta"),s={PT:"",CG:"",SCG:"",byl:"",tom:"",hdl:"",ptime:"",cre:"",articleid:""},a={PST:"Error Page",errorpage:"true"};for(r=0;r<o.length;r+=1)n=o[r].getAttribute("name"),i=o[r].getAttribute("content"),"string"==typeof n&&"string"==typeof i&&(s.hasOwnProperty(n)&&(e[n]=i),"sourceApp"===n&&i!==e.sourceApp?e.sourceApp=i:a[n]===i&&(e.errorPage=1));return e}}}),define("ab/libs/common_events",["ab/vendor/jquery","ab/libs/utils","ab/libs/logger"],function(e,t,n){"use strict";var i=function(){this.logger=new n("CommonEvents");var e=this._readFromCookie();this.experiments=this._cleanExpired(e),this._saveAll(this.experiments)};return i.prototype={logger:null,cookieName:"abTest_experiments",experiments:null,conversionTimeout:500,_readFromCookie:function(){this.logger.debug("fn._readFromCookie");var e=t.getCookie(this.cookieName),n={};if(e)try{n=JSON.parse(e)}catch(i){}return n},_saveAll:function(n){this.logger.debug("fn._saveAll"),e.isEmptyObject(n)||t.setCookie(this.cookieName,JSON.stringify(n),30)},_cleanExpired:function(t){this.logger.debug("fn._cleanExpired");var n=(new Date).getTime(),i=0,r=0,o=this;return t=e.extend({},t),e.each(t,function(e,s){r++,s.ts+s.ttl<n&&(o.logger.debug("removing expired experiment: "+e),delete t[e],i++)}),this.logger.info("Expired, total: "+i+" out of "+r),t},addToCookie:function(t){if(this.logger.debug("fn.addToCookie"),"undefined"==typeof t.expId)throw new Error("expId is not specified");if("undefined"==typeof t.expVar)throw new Error("expVar is not specified");var n={},i=this.experiments;n[t.expId]=e.extend({},{ts:(new Date).getTime(),ttl:18e5},t),i=e.extend({},i,n),this.experiments=i,this._saveAll(this.experiments)},_sendEvent:function(n,i,r,o){var s,a=this;n.trackEvent(i,r,e.extend({},o||{},{dimension3:"ab"})),t.getCookie(this.cookieName)&&(s=this.experiments=this._readFromCookie(),e.each(s,function(t,s){if(!s||"ab"!==s.dimension3){var c=e.extend({},s,o||{});window.setTimeout(function(){n.trackEvent(i,r,c)},a.conversionTimeout)}}))},setOrderFormListeners:function(t){this.logger.debug("fn.setOrderFormListeners");var n=this;e(document).ready(function(){n._sendEvent(t,"orderForm","load",{nonInteraction:1})}),Event.observe(document,NYTD.Event.Tracking.PURCHASE_THANKYOU_LOAD,function(){var e=NYTD.OC&&NYTD.OC.subscribed&&NYTD.OC.subscribed.bundle_type,i={dimension20:e?NYTD.OC.subscribed.bundle_type:"-1"};n._sendEvent(t,"orderForm","thankyou",i)})},setRegiPageListeners:function(t){var n=this;this.logger.debug("fn.setRegiPageListeners"),e(document).ready(function(){n._sendEvent(t,"regiPage","thankyou")})}},new i}),define("ab/libs/engine/ga",["ab/vendor/jquery","ab/libs/utils","ab/libs/logger","ab/libs/page_info","ab/libs/common_events"],function(e,t,n,i,r){"use strict";var o=function(t){this.logger=n.get("GA"),t=t||{},this.configs=e.extend({},this.configs,t),this.initApi()};return o.prototype={logger:null,cxApi:null,apiUrl:"//www.google-analytics.com/cx/api.js?experiment=",envPrefix:"",configs:{propertyId:"UA-45312927-1",cookieDomain:"nytimes.com",env:"live",component:"ab",experimentId:void 0},isStg:function(){return!(!t.getCookie("abTest")&&!t.getCookie("abtest"))},initApi:function(){this.logger.debug("fn.initApi");if("stg"!==this.configs.env&&"live"!==this.configs.env)throw new Error("unknown environment: "+this.configs.env);var e=this.getDefaultAttrs();window.gab||(this.loadGaApi(),gab("create",this.configs.propertyId,this.configs.cookieDomain),gab("set",e),gab("send","pageview"),this.logger.info("created main tracker for property "+this.configs.propertyId))},loadGaApi:function(){this.logger.debug("fn.loadGaApi"),function(e,t,n,i,r,o,s){e.GoogleAnalyticsObject=r,e[r]=e[r]||function(){(e[r].q=e[r].q||[]).push(arguments)},e[r].l=1*new Date,o=t.createElement(n),s=t.getElementsByTagName(n)[0],o.async=1,o.src=i,s.parentNode.insertBefore(o,s)}(window,document,"script","//www.google-analytics.com/analytics.js","gab")},loadCxApi:function(t){return this.logger.debug("fn.loadCxApi"),e.ajax({url:t,crossDomain:!0,dataType:"script"})},isAllocated:function(){return this.logger.debug("fn.isAllocated"),this.cxApi?this.getVariation()!==this.cxApi.NO_CHOSEN_VARIATION:!1},getVariation:function(){if(!this.cxApi)throw new Error("cxApi is not loaded");return this.cxApi.getChosenVariation(this.configs.experimentId)},allocate:function(){this.logger.debug("fn.allocate");var t=e.Deferred(),n=this;if("undefined"==typeof this.configs.experimentId)throw new Error("conf.experimentId should be defined");var i=this.apiUrl+this.configs.experimentId,r=!0;return e.when(this.loadCxApi(i)).done(function(){n.logger.info("cxApi is loaded for Experiment ID: "+n.configs.experimentId),n.cxApi=window.cxApi,n.cxApi.setDomainName(n.configs.cookieDomain),"undefined"!=typeof n.configs.variationId&&n.configs.variationId!==!1?(n.logger.info("Forcing variation "+n.configs.variationId),n.cxApi.setChosenVariation(n.configs.variationId,n.configs.experimentId)):n.isAllocated()?(n.logger.info("User is already allocated to variation"),r=!1):(n.logger.debug("Allocating to variation..."),n.cxApi.chooseVariation(n.configs.experimentId));var e=n.getVariation();return n.logger.info("Variation ID: "+e),-2===e?(n.logger.error("User is not part of experiment"),void t.reject(e)):-1===e||isNaN(e)?(n.logger.error("Allocation was not successful, abandoning experiment"),n.trackEvent("allocation","error",n.configs.experimentId,e,{expId:n.configs.experimentId,dimension24:e,nonInteraction:1}),void t.reject(e)):(n.setAttrs({expId:n.configs.experimentId,expVar:n.getVariation(),dimension3:n.configs.component}),"ab"!==n.configs.component&&n.saveFinalCookie(),void t.resolve(n.getVariation(),r))}).fail(function(){n.logger.error("Unable to load CE API"),n.trackEvent("allocation","error",n.configs.experimentId,-4,{expId:n.configs.experimentId,dimension24:-4,nonInteraction:1}),t.reject(-4)}),t.promise()},sendImpression:function(){return this.trackEvent("allocation","impression",this.configs.experimentId,this.getVariation(),{dimension24:this.getVariation(),nonInteraction:1})},setAttrs:function(e){this.logger.debug("fn.setAttrs"),gab(this.envPrefix+"set",e)},trackEvent:function(){this.logger.debug("fn.trackEvent");var t,n=e.Deferred(),i=Array.prototype.slice.call(arguments,0),r={};return i.length?(t=i[i.length-1],e.isPlainObject(t)?r=t:i.push(r),r.hitCallback=n.resolve,i=[this.envPrefix+"send","event"].concat(i),gab.apply(window,i),this.logger.info("GA event: "+JSON.stringify(i)),n.promise()):(this.logger.error("No event is sent"),n.resolve())},getUid:function(){var t=e.Deferred();return gab(function(e){var n=e.get("clientId");t.resolve(n)}),t.promise()},getDefaultAttrs:function(){var e=i.getMetaData();return this.logger.info(this.isStg()?'"STG / Preview" tracking':'"LIVE" tracking'),{dimension1:e.pageCount,dimension2:e.gwViews,dimension3:this.configs.component,dimension4:e.sourceApp,dimension5:e.offerChain,dimension6:t.getCookie("nyt-d")?"true":"false",dimension7:e.errorPage,dimension8:e.PT,dimension9:e.CG,dimension10:e.SCG,dimension11:e.byl,dimension12:e.tom,dimension13:e.hdl,dimension14:e.ptime,dimension15:e.cre,dimension16:e.articleid,dimension17:e.PST,dimension18:e.campaignId,dimension23:this.isStg()?"true":"false"}},saveFinalCookie:function(){this.logger.debug("fn.saveFinalCookie"),r.addToCookie({expId:this.configs.experimentId,expVar:this.getVariation(),dimension3:this.configs.component})}},o.getDebugVarFromUrl=function(e){var n,i;return"stg"===e&&(i=t.parseUri(window.location.search),n=i.queryKey.var),n},o}),define("ab/libs/tracker/event_tracker",["ab/vendor/jquery","ab/libs/utils","ab/libs/logger"],function(e,t,n){"use strict";var i=function(e,t){t=t||{},this.attrs={},this.queue=[],this.logger=n.get("evtTracker"),this.isLiteTracking=t.isLiteTracking||!1,this.setAttrs({module:"ab",eventName:"abtest",subject:"adx-ab-allocation",referrer:document.referrer||""}),e&&this.setAttrs(e),t.liteTracking&&(this.liteTracking=t.liteTracking)};return i.prototype={setAttrs:function(t){this.attrs=e.extend(!0,{},this.attrs,t)},sendImpression:function(e){this.setAttrs({treatment:e}),this.trackEvent({action:"impression",url:window.location.href}),this.logger.debug("Sending impression with id: "+e),this.setAttrs({subject:"module-interactions"})},liteTracking:["impression"],trackEvent:function(t){if(t=e.extend(!0,{},this.attrs,t),this.isLiteTracking&&-1===e.inArray(t.action,this.liteTracking))return void this.logger.debug("Event Tracker Lite skipped "+JSON.stringify(t));try{return this._send(t)}catch(n){this._addToQueue(t)}return e.Deferred().reject().promise()},_getOfferChain:function(){var e=NYTD.OC?NYTD.OC.active:!1;return e||"noOfferChain"},_getTracker:function(){return this._trackerInst||(this._trackerInst=NYTD.EventTracker()),this._trackerInst},_send:function(t){var n=(t.action,e.Deferred());return this._getTracker().track(t,{callback:n.resolve}),this.logger.info("Event sent: "+JSON.stringify(t)),n.promise()},_addToQueue:function(e){this.queue.push(e),this._isWorkerSpawned()||this._spawnWorker()},_isWorkerSpawned:function(){return!!this._worker},_spawnWorker:function(){this._worker=setTimeout(e.proxy(this._clearQueue,this),500)},_clearQueue:function(){var e;try{for(;e=this.queue.shift();)this._send(e)}catch(t){this._addToQueue(e),this._spawnWorker()}}},i});
//# sourceMappingURL=shared.js.map