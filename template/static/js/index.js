/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

window.MRT=window.MRT||{},function(){var e,t,n;(function(r){function v(e,t){return h.call(e,t)}function m(e,t){var n,r,i,s,o,u,a,f,c,h,p,v=t&&t.split("/"),m=l.map,g=m&&m["*"]||{};if(e&&e.charAt(0)===".")if(t){v=v.slice(0,v.length-1),e=e.split("/"),o=e.length-1,l.nodeIdCompat&&d.test(e[o])&&(e[o]=e[o].replace(d,"")),e=v.concat(e);for(c=0;c<e.length;c+=1){p=e[c];if(p===".")e.splice(c,1),c-=1;else if(p===".."){if(c===1&&(e[2]===".."||e[0]===".."))break;c>0&&(e.splice(c-1,2),c-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((v||g)&&m){n=e.split("/");for(c=n.length;c>0;c-=1){r=n.slice(0,c).join("/");if(v)for(h=v.length;h>0;h-=1){i=m[v.slice(0,h).join("/")];if(i){i=i[r];if(i){s=i,u=c;break}}}if(s)break;!a&&g&&g[r]&&(a=g[r],f=c)}!s&&a&&(s=a,u=f),s&&(n.splice(0,u,s),e=n.join("/"))}return e}function g(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function y(e){return function(t){return m(t,e)}}function b(e){return function(t){a[e]=t}}function w(e){if(v(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!v(a,e)&&!v(c,e))throw new Error("No "+e);return a[e]}function E(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function S(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice,d=/\.js$/;o=function(e,t){var n,r=E(e),i=r[0];return e=r[1],i&&(i=m(i,t),n=w(i)),i?n&&n.normalize?e=n.normalize(e,y(t)):e=m(e,t):(e=m(e,t),r=E(e),i=r[0],e=r[1],i&&(n=w(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return g(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:S(e)}}},i=function(e,t,n,i){var s,l,h,p,d,m=[],y=typeof n,E;i=i||e;if(y==="undefined"||y==="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(d=0;d<t.length;d+=1){p=o(t[d],i),l=p.f;if(l==="require")m[d]=u.require(e);else if(l==="exports")m[d]=u.exports(e),E=!0;else if(l==="module")s=m[d]=u.module(e);else if(v(a,l)||v(f,l)||v(c,l))m[d]=w(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,g(i,!0),b(l),{}),m[d]=a[l]}}h=n?n.apply(a[e],m):undefined;if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!E)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){if(typeof e=="string")return u[e]?u[e](t):w(o(e,t).f);if(!e.splice){l=e,l.deps&&s(l.deps,l.callback);if(!t)return;t.splice?(e=t,t=n,n=null):e=r}return t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s},s.config=function(e){return s(e)},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!v(a,e)&&!v(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}})(),n("almond",["almond/almond"],function(e){return e}),n("almond/almond",function(){}),t.config({map:{"*":{underscore:"js/lodash",jquery:"js/jquery",lodash:"js/lodash"}}}),n("js/index",["require"],function(e){return{ready:function(e){$(window).on("resize",function(){MR.resize()})},render:function(e){var t=e["poll-content"].poll.collection.models,n=t[0].get("pct"),r=t[1].get("pct"),i=function(e){var t=$(".percent-left"),n=$(".progress-percent.left");t.text(e),n.width(e),e<50&&n.addClass("is-under-50")},s=function(e){var t=$(".percent-right");t.text(e)},o=function(){return navigator.appName=="Microsoft Internet Explorer"||navigator.appName=="Netscape"&&(new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)!=null};t[0].on("change:pct",function(e){i(e.get("pct")+"%")}),t[1].on("change:pct",function(e){s(e.get("pct")+"%")}),i((n!==undefined&&n!==null?n:50)+"%"),s((r!==undefined&&r!==null?r:50)+"%"),$(".tow-vote-btns a.facebook").attr("data-allow-propagation","true"),$("#poll-content").on("click",".tow-vote-btns",function(e){$("#poll-content").attr("data-selected",$(this).data("option-label")),o()&&($(e.target).hasClass("twitter")||$(e.target).parent(".twitter").length)&&_.delay(function(){MR.ENV.instance.trigger("state:post-vote")},300)}),MR.ENV.instance.on("#poll-content:post-vote-rendered",function(e){var t=$(".vote-mssg"),n=$("#poll-content").data("selected");$(".pcmax-tow").addClass("is-after-vote"),$('.tow-option[data-option-label="'+n+'"]').parent(".results-item").addClass("is-selected"),t.fadeOut()}),MR.ENV.pipe("#template:state:pre-vote","#poll-content:state:pre-vote"),MR.ENV.pipe("#template:state:post-vote","#poll-content:state:post-vote"),$("html").hasClass("touch")&&$(".tow-option-btn-wrap").on("click",function(e){$(".tow-option-btn-wrap").removeClass("is-toggled"),$(this).addClass("is-toggled")})}}}),t(["js/index"]),window.MRT.require=t,window.MRT.define=n,window.MRT.requirejs=e}();