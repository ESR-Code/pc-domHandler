parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wKXd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.assetChecker=exports.errorHandler=void 0;var e=["css","html"],r=function(e){if(!e)throw"Domhandler Error : At least one file must be specified";if(!pc)throw"There is no playcanvas Instance"};exports.errorHandler=r;var o=function(e){if(!e)throw"Domhandler Error :File not found"};exports.assetChecker=o;
},{}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DomHandler=r;var e,t,o=require("./errorHandler"),n=[];function r(){this.loaded=!1,this.autoUpdate=!0;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.files=t,(0,o.errorHandler)(this.files),this.files.forEach(function(e){return a(e)}),this._addUpdateEventToElements()}var a=function(e){var t=e.split("."),r=t[0],a=t[1],i=pc.app.assets.find(r,a);return(0,o.assetChecker)(i),n.push(i),!0},i=function(o){e=document.createElement("style"),t=document.createElement("div"),"function"==typeof o&&o()};r.prototype={_toggleLoaded:function(){return this.loaded=!this.loaded},loadDom:function(o){var r=this;if(this.loaded)throw new Error("".concat(this.files," already loaded"));i(function(){n.forEach(function(o){"css"==o.type?e.innerHTML+=o.resource:"html"==o.type&&(t.innerHTML+=o.resource)}),document.head.appendChild(e),document.body.appendChild(t),r._toggleLoaded()}),"function"==typeof o&&o()},removeDom:function(o){if(!this.loaded)throw new Error("".concat(this.files," not loaded yet"));e.remove(),t.remove(),this._toggleLoaded(),"function"==typeof o&&o()},toggleAutoUpdate:function(){this.autoUpdate=!this.autoUpdate;var e=this;this.autoUpdate?n.forEach(function(t){t.on("change",function(){e.loaded&&e.removeDom(function(){e.loadDom()})})}):n.forEach(function(e){e.off("change")})},_addUpdateEventToElements:function(){var e=this;n.forEach(function(t){t.on("change",function(){e.loaded&&e.removeDom(function(){e.loadDom()})})})}};
},{"./errorHandler":"wKXd"}]},{},["Focm"], "esr")