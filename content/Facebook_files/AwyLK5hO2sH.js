/*!CK:3460474597!*//*1428353902,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["cOkQU"]); }

__d("BrowseLogger",["Banzai","copyProperties","mapObject","Run"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k='browse',l='browse_aggr',m=null,n={},o={},p=function(x){if(x==null)return 'undefined';var y=x.tagName.toLowerCase(),z=x.id,aa=x.className;if(z)y+='#'+z;if(aa)y+='.'+aa;return y;};function q(){m=null;n={};o={};}function r(x){h(x,{clientSessionID:m});return x;}function s(x){g.post(k,r(x));}function t(){if(m===null)return;o.aggregated=n;g.post(l,r(o));q();}function u(x){n[x]=(n[x]||0)+1;}function v(x){h(o,x);}j.onUnload(t);var w={newSession:function(){t();m=Math.random().toString();if(!o.start_time)o.start_time=Math.round(Date.now()/1000);},logResultClick:function(x,y,z,aa){var ba={action:'result_click',click_type:x.ct||'result',section:x.section||'unknown',id:x.id||0,path:x.path||'unknown',rank:x.rank||0,referrer:x.referrer||'unknown',result_type:x.result_type||'unknown',session_id:x.session_id||0,query_time:x.query_time,abtest_version:x.abtest_version||'NONE',abtest_params:x.abtest_params,typeahead_sid:x.typeahead_sid||'',result_title:x.result_title||'unknown',result_href:x.result_href||'unknown',result_semantic:x.result_semantic||'unknown',type:x.experience_type||'unknown',click_action:z,sub_id:x.sub_id,owner_id:x.owner_id,browse_location:x.browse_location||'unknown',query_data:x.query_data||'unknown',is_headline:x.is_headline||false,qid:y.qid||0,mf_story_key:y.mf_story_key||0,module:x.module||'NONE',view:x.view};if(y.tn)ba.tn=y.tn;if(x.cst)ba.click_subtype=x.cst;u('result_click_'+ba.click_type);v({path:ba.path,referrer:ba.referrer,result_type:ba.result_type,session_id:ba.session_id,abtest_version:ba.abtest_version,abtest_params:ba.abtest_params,typeahead_sid:ba.typeahead_sid});s(ba);if(!x.id&&(x.browse_location!=='browse_location:mf_trending'))s({action:'logging_error',click_action:z,click_type:ba.click_type,attributes:JSON.stringify(x),element:i({srcElement:aa.srcElement,target:aa.target,toElement:aa.toElement},p),event:{button:aa.button,clientX:aa.clientX,clientY:aa.clientY,ctrlKey:aa.ctrlKey,layerX:aa.layerX,layerY:aa.layerY,offsetX:aa.offsetX,offsetY:aa.offsetY,pageX:aa.pageX,pageY:aa.pageY,screenX:aa.screenX,screenY:aa.screenY,shiftKey:aa.shiftKey,type:aa.type,x:aa.x,y:aa.y}});},logControlsClick:function(x,y){var z={action:'controls_click',click_type:y,path:x.path||'unknown',referrer:x.referrer||'unknown',session_id:x.session_id||0,query_time:x.query_time,filter_name:x.name||'unknown',typeahead_sid:x.typeahead_sid||'',result_type:x.result_type||'unknown',type:x.experience_type||'unknown'};if(x.cst)z.click_subtype=x.cst;u('controls_click_'+y);v({path:z.path,referrer:z.referrer,session_id:z.session_id,typeahead_sid:z.typeahead_sid});s(z);},logResultHover:function(x,y){var z={action:'result_hover',id:x.id||0,path:x.path||'unknown',rank:x.rank,result_type:x.result_type||'unknown',session_id:x.session_id||0,query_time:x.query_time,time_elapsed:y,typeahead_sid:x.typeahead_sid||0,type:x.experience_type||'unknown',module:x.module||'NONE',view:x.view};u('result_hover');v({path:z.path,session_id:z.session_id,typeahead_sid:z.typeahead_sid});s(z);},logScroll:function(x,y,z,aa){var ba={action:'scroll',encoded_query:x,fragments:y,position:z,session_id:aa||0};s(ba);},logNUXStep:function(x){var y={action:'nux_step',step:x};s(y);},logDisambiguationImpression:function(x,y,z,aa,ba){var ca={action:'disambiguation_imp',ids:aa,name:x,path:z,type:y,typeahead_sid:ba};s(ca);},logDisambiguationClick:function(x,y,z,aa,ba,ca){var da={action:'disambiguation_clk',id:ba,index:aa,name:x,path:z,type:y,typeahead_sid:ca};s(da);},logDYMLinkClick:function(x,y,z,aa){var ba={action:'dym_click',path:x.path||'unknown',referrer:x.referrer||'unknown',session_id:x.session_id||0,query_time:x.query_time,abtest_version:x.abtest_version||'NONE',abtest_params:x.abtest_params,typeahead_sid:x.typeahead_sid||'',type:x.experience_type||'unknown',click_action:z,sub_id:x.sub_id,owner_id:x.owner_id,browse_location:x.browse_location||'unknown',query_data:x.query_data||'unknown',module:x.module||'NONE',view:x.view,dym_confidence:x.dym_confidence||'NONE',dym_query:x.dym_query||'',dym_correction:x.dym_correction||'',dym_clicked:x.dym_clicked||''};s(ba);}};e.exports=w;},null);
__d("BrowseClickLogger",["Event","BrowseLogger","BrowseClientEventLogger","collectDataAttributes","DOMQuery"],function(a,b,c,d,e,f,g,h,i,j,k){b.__markCompiled&&b.__markCompiled();function l(n,o){var p=n.target,q=j(p,['bt','ft','gt']);q.gt.click_type=q.ft.tn;i.logClick(q.gt);if(k.scry(p,'^.recourse-link').length>0){if(o==='left_click')h.logDYMLinkClick(q.bt,q.ft,o,n);}else h.logResultClick(q.bt,q.ft,o,n);}var m={init:function(n){g.listen(n,'mousedown',function(o){var p=(o.button===2||o.which===3)?'right_click':'left_click';if(o.shiftKey)p+='_shift';if(o.altKey)p+='_alt';if(o.metaKey||o.ctrlKey)p+='_ctrl';l(o,p);}.bind(this));}};e.exports=m;},null);
__d("BrowseResultsAreSlow",["CSS"],function(a,b,c,d,e,f,g){b.__markCompiled&&b.__markCompiled();var h=1500,i={register:function(j,k,l){var m=l?0:h;setTimeout(function(){if(j.firstChild===k)g.show(k);},m);}};e.exports=i;},null);
__d("BrowseScrollLogger",["BrowseLogger","Event","getUnboundedScrollPosition","throttle"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k=200;function l(m,n,o){"use strict";this.$BrowseScrollLogger0=m;this.$BrowseScrollLogger1=n;this.$BrowseScrollLogger2=0;this.$BrowseScrollLogger3=1;this.$BrowseScrollLogger4=o;h.listen(window,'scroll',j(this.$BrowseScrollLogger5,100,this));}l.prototype.$BrowseScrollLogger5=function(){"use strict";this.$BrowseScrollLogger2=i(window).y;if(this.$BrowseScrollLogger2/this.$BrowseScrollLogger3>k){this.$BrowseScrollLogger3++;g.logScroll(this.$BrowseScrollLogger0,this.$BrowseScrollLogger1,this.$BrowseScrollLogger2,this.$BrowseScrollLogger4);}};l.init=function(m,n,o){"use strict";return new l(m,n,o);};e.exports=l;},null);
__d("BrowseWindowTransitions",["Arbiter","Banzai","BrowseClientEventLogger","Event","NavigationMessage","Run","SubscriptionsHandler"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){b.__markCompiled&&b.__markCompiled();var n={init:function(o,p){this.subscriptions=new m();this.currentSessionID=o;this.currentVertical=p;this.logData('window_load');l.onLeave(function(){this.logData('window_transition_to_fb_page');this.cleanup();}.bind(this));if(!this.unLoadAttached){this.unLoadAttached=true;l.onUnload(function(){this.logData('window_unloaded');}.bind(this));}this.subscriptions.addSubscriptions(j.listen(window,'focus',function(){this.logData('window_focus');}.bind(this)),j.listen(window,'blur',function(){this.logData('window_blur');}.bind(this)),g.subscribe('pre_page_transition',function(event,q){this.logData('window_pre_page_transition');}.bind(this)),g.subscribe(k.NAVIGATION_BEGIN,function(event,q){this.logData('window_transition_to_LHC');this.cleanup();}.bind(this)),g.subscribe('BlueBar/homeClick',function(){this.logData('window_transition_to_home_click');this.cleanup();}.bind(this)));},logData:function(event){i.logData(event,this.currentSessionID,this.currentVertical);},cleanup:function(){this.subscriptions.release();}};e.exports=n;},null);
__d("NodeHighlighter",["DOM","TokenizeUtil","concatMap","createArrayFromMixed","escapeRegex","getElementText"],function(a,b,c,d,e,f,g,h,i,j,k,l){b.__markCompiled&&b.__markCompiled();var m={};function n(q,r){var s=l(q).split(r),t=s.map(function(u){if(r.test(u))return o(u);return u||'';});return s.length>1?t:null;}function o(q){var r=g.create('span',{'class':'highlightNode',className:'highlightNode'},q);return r;}var p={getTextNodes:function(q){if(this.isLeafNode(q)||this.isStopNode(q)){return q;}else if(this.isDiscardNode(q))return [];return i(this.getTextNodes.bind(this),j(q.childNodes));},getHighlightCandidates:function(){return [];},isLeafNode:function(q){return g.isTextNode(q);},isStopNode:function(q){return false;},isDiscardNode:function(q){return false;},createSegmentedRegex:function(q){var r=h.getPunctuation();q=this.escapeAndAddBidirectionalCharsToTokens(q);q=q.map(function(s){s=s.split(/\s+/).join(("(?:"+r+"|\\s)+"));return s;});return '(^|\\s|'+r+')('+q.join('|')+')(?=(?:$|\\s|'+r+'))';},createNonSegmentedRegex:function(q){return '('+q.map(k).join('|')+')';},escapeAndAddBidirectionalCharsToTokens:function(q){var r='[\\u200E\\u200F\\u202A\\u202B\\u202C\\u202D\\u202E]*';return q.map(function(s){return r+String(s).split('').map(k).join(r)+r;});},createRegex:function(q){q=q.filter(function(x){return x;});if(!q||q.length===0)return new RegExp(null);var r=q.join('|');if(m[r])return m[r];var s=/[\u0E00-\u109F\u2000-\uFFFF]/,t=[],u=[];q.forEach(function(x){if(s.test(x)){u.push(x);}else t.push(x);});var v='';if(t.length){v+=this.createSegmentedRegex(t);v+=(u.length)?'|':'';}if(u.length)v+=this.createNonSegmentedRegex(u);var w=new RegExp(v,'i');m[r]=w;return w;},searchNodes:function(q,r){return g.scry(q,r);},highlight:function(q,r){r=r.filter(function(u){return u;});if(!r||r.length===0||!q)return;var s=i(function(u){return i(this.getTextNodes.bind(this),this.searchNodes(q,u));}.bind(this),this.getHighlightCandidates()),t=this.createRegex(r);s.forEach(function(u){var v=n(u,t);if(v)if(this.isStopNode(u)){g.setContent(u,v);}else g.replace(u,v);}.bind(this));}};e.exports=p;},null);
__d("SearchCommentHighlighter",["Arbiter","CSS","NodeHighlighter","Parent","csx"],function(a,b,c,d,e,f,g,h,i,j,k){b.__markCompiled&&b.__markCompiled();var l='data-highlight-tokens',m=Object.assign({},i,{_enableCommentHighlighting:function(){if(this._subscription)return;this._subscription=g.subscribe('ufi/changed',function(n,o){var p=o.form;return this._highlightComments(p);}.bind(this));g.subscribeOnce('pre_page_transition',function(){return this._disableCommentHighlighting();}.bind(this));},_disableCommentHighlighting:function(){this._subscription.unsubscribe();this._subscription=null;},_highlightComments:function(n){var o=this._getHighlightTokens(n);if(o)i.highlight.call(this,n,o);},_getHighlightTokens:function(n){var o=j.byAttribute(n,l);return o?JSON.parse(o.getAttribute(l)):null;},isDiscardNode:function(n){return h.hasClass(n,'highlightNode');},getHighlightCandidates:function(){return [".UFICommentContent"];},highlight:function(n,o){if(!n.setAttribute)return;n.setAttribute(l,JSON.stringify(o));this._enableCommentHighlighting();}});e.exports=m;},null);
__d("FbFeedHighlighter",["CSS","NodeHighlighter","SearchCommentHighlighter","csx","cx"],function(a,b,c,d,e,f,g,h,i,j,k){b.__markCompiled&&b.__markCompiled();var l="_58cn",m=Object.assign({},h,{getHighlightCandidates:function(){return ["._5pbw","._5pbx","._6m6","._6ma","._5b-_","._5b_0","._4_j6",".commentBody","._g2z","._6lc","._6s_"];},isStopNode:function(n){return g.hasClass(n,l);},isDiscardNode:function(n){return g.hasClass(n,'text_exposed_link');},highlight:function(n,o){h.highlight.call(this,n,o);i.highlight(n,o);}});e.exports=m;},null);
__d("XUIPageNavigationShim",["DOMContainer.react","React","isNode"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();function j(l){var m;if(l.children)m=l.children.map(function(o){if(typeof o==='object'&&typeof o.ctor==='function'){return j(o);}else if(i(o)){return h.createElement(g,null,o);}else return o;});var n=l.ctor;return h.createElement(n,h.__spread({},l.props),m);}var k=h.createClass({displayName:"XUIPageNavigationShim",render:function(){return j(this.props);}});e.exports=k;},null);