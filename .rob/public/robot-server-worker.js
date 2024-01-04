"use strict";(()=>{var ow=Object.create;var zd=Object.defineProperty;var sw=Object.getOwnPropertyDescriptor;var aw=Object.getOwnPropertyNames;var cw=Object.getPrototypeOf,lw=Object.prototype.hasOwnProperty;var $y=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),uw=(t,e)=>{for(var r in e)zd(t,r,{get:e[r],enumerable:!0})},fw=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of aw(e))!lw.call(t,i)&&i!==r&&zd(t,i,{get:()=>e[i],enumerable:!(n=sw(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?ow(cw(t)):{},fw(e||!t||!t.__esModule?zd(r,"default",{value:t,enumerable:!0}):r,t));var Bn=H(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});var Vd;function Xd(){if(Vd===void 0)throw new Error("No runtime abstraction layer installed");return Vd}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Vd=r}t.install=e})(Xd||(Xd={}));Yd.default=Xd});var Jd=H(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.Disposable=void 0;var dw;(function(t){function e(r){return{dispose:r}}t.create=e})(dw=Aa.Disposable||(Aa.Disposable={}))});var no=H(ro=>{"use strict";Object.defineProperty(ro,"__esModule",{value:!0});ro.Emitter=ro.Event=void 0;var pw=Bn(),mw;(function(t){let e={dispose(){}};t.None=function(){return e}})(mw=ro.Event||(ro.Event={}));var Qd=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,pw.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Jc=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Qd),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};ro.Emitter=Jc;Jc._noop=function(){}});var Ny=H(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.AbstractMessageBuffer=void 0;var hw=13,yw=10,gw=`\r
`,Zd=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let c=this._chunks[r];for(n=0;n<c.length;){switch(c[n]){case hw:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case yw:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(gw);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let l=a[c],u=l.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,u),m=l.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};Qc.AbstractMessageBuffer=Zd});var Iy=H(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});var _y=Bn(),qo=Jd(),Tw=no(),vw=Ny(),Zc=class t extends vw.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Zc.emptyBuffer=new Uint8Array(0);var ep=class{constructor(e){this.socket=e,this._onData=new Tw.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,_y.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},tp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},xw=new TextEncoder,Py=Object.freeze({messageBuffer:Object.freeze({create:t=>new Zc(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(xw.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new ep(t),asWritableStream:t=>new tp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function rp(){return Py}(function(t){function e(){_y.default.install(Py)}t.install=e})(rp||(rp={}));np.default=rp});var Go=H(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.stringArray=rr.array=rr.func=rr.error=rr.number=rr.string=rr.boolean=void 0;function Rw(t){return t===!0||t===!1}rr.boolean=Rw;function Dy(t){return typeof t=="string"||t instanceof String}rr.string=Dy;function bw(t){return typeof t=="number"||t instanceof Number}rr.number=bw;function Aw(t){return t instanceof Error}rr.error=Aw;function Cw(t){return typeof t=="function"}rr.func=Cw;function Oy(t){return Array.isArray(t)}rr.array=Oy;function Sw(t){return Oy(t)&&t.every(e=>Dy(e))}rr.stringArray=Sw});var kp=H(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var io=Go(),Ly;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Ly=V.ErrorCodes||(V.ErrorCodes={}));var ip=class t extends Error{constructor(e,r,n){super(r),this.code=io.number(e)?e:Ly.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=ip;var Rr=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=Rr;Rr.auto=new Rr("auto");Rr.byPosition=new Rr("byPosition");Rr.byName=new Rr("byName");var Xe=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Rr.auto}};V.AbstractMessageSignature=Xe;var op=class extends Xe{constructor(e){super(e,0)}};V.RequestType0=op;var sp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=sp;var ap=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=ap;var cp=class extends Xe{constructor(e){super(e,2)}};V.RequestType2=cp;var lp=class extends Xe{constructor(e){super(e,3)}};V.RequestType3=lp;var up=class extends Xe{constructor(e){super(e,4)}};V.RequestType4=up;var fp=class extends Xe{constructor(e){super(e,5)}};V.RequestType5=fp;var dp=class extends Xe{constructor(e){super(e,6)}};V.RequestType6=dp;var pp=class extends Xe{constructor(e){super(e,7)}};V.RequestType7=pp;var mp=class extends Xe{constructor(e){super(e,8)}};V.RequestType8=mp;var hp=class extends Xe{constructor(e){super(e,9)}};V.RequestType9=hp;var yp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=yp;var gp=class extends Xe{constructor(e){super(e,0)}};V.NotificationType0=gp;var Tp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=Tp;var vp=class extends Xe{constructor(e){super(e,2)}};V.NotificationType2=vp;var xp=class extends Xe{constructor(e){super(e,3)}};V.NotificationType3=xp;var Rp=class extends Xe{constructor(e){super(e,4)}};V.NotificationType4=Rp;var bp=class extends Xe{constructor(e){super(e,5)}};V.NotificationType5=bp;var Ap=class extends Xe{constructor(e){super(e,6)}};V.NotificationType6=Ap;var Cp=class extends Xe{constructor(e){super(e,7)}};V.NotificationType7=Cp;var Sp=class extends Xe{constructor(e){super(e,8)}};V.NotificationType8=Sp;var wp=class extends Xe{constructor(e){super(e,9)}};V.NotificationType9=wp;var ww;(function(t){function e(i){let o=i;return o&&io.string(o.method)&&(io.string(o.id)||io.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&io.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(io.string(o.id)||io.number(o.id)||o.id===null)}t.isResponse=n})(ww=V.Message||(V.Message={}))});var $p=H(zn=>{"use strict";var My;Object.defineProperty(zn,"__esModule",{value:!0});zn.LRUCache=zn.LinkedMap=zn.Touch=void 0;var fr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(fr=zn.Touch||(zn.Touch={}));var el=class{constructor(){this[My]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=fr.None){let n=this._map.get(e);if(n)return r!==fr.None&&this.touch(n,r),n.value}set(e,r,n=fr.None){let i=this._map.get(e);if(i)i.value=r,n!==fr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case fr.None:this.addItemLast(i);break;case fr.First:this.addItemFirst(i);break;case fr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(My=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==fr.First&&r!==fr.Last)){if(r===fr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===fr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};zn.LinkedMap=el;var Ep=class extends el{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=fr.AsNew){return super.get(e,r)}peek(e){return super.get(e,fr.None)}set(e,r){return super.set(e,r,fr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};zn.LRUCache=Ep});var Ip=H(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.CancellationTokenSource=oo.CancellationToken=void 0;var kw=Bn(),Ew=Go(),Np=no(),_p;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Np.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Np.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||Ew.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(_p=oo.CancellationToken||(oo.CancellationToken={}));var $w=Object.freeze(function(t,e){let r=(0,kw.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),tl=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?$w:(this._emitter||(this._emitter=new Np.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Pp=class{get token(){return this._token||(this._token=new tl),this._token}cancel(){this._token?this._token.cancel():this._token=_p.Cancelled}dispose(){this._token?this._token instanceof tl&&this._token.dispose():this._token=_p.None}};oo.CancellationTokenSource=Pp});var Fy=H(Vn=>{"use strict";Object.defineProperty(Vn,"__esModule",{value:!0});Vn.ReadableStreamMessageReader=Vn.AbstractMessageReader=Vn.MessageReader=void 0;var Op=Bn(),jo=Go(),Dp=no(),Nw;(function(t){function e(r){let n=r;return n&&jo.func(n.listen)&&jo.func(n.dispose)&&jo.func(n.onError)&&jo.func(n.onClose)&&jo.func(n.onPartialMessage)}t.is=e})(Nw=Vn.MessageReader||(Vn.MessageReader={}));var rl=class{constructor(){this.errorEmitter=new Dp.Emitter,this.closeEmitter=new Dp.Emitter,this.partialMessageEmitter=new Dp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${jo.string(e.message)?e.message:"unknown"}`)}};Vn.AbstractMessageReader=rl;var Lp;(function(t){function e(r){let n,i,o,s=new Map,a,c=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)s.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,c.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)c.set(l.name,l)}return a===void 0&&(a=(0,Op.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}t.fromOptions=e})(Lp||(Lp={}));var Mp=class extends rl{constructor(e,r){super(),this.readable=e,this.options=Lp.fromOptions(r),this.buffer=(0,Op.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Op.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Vn.ReadableStreamMessageReader=Mp});var Uy=H(nl=>{"use strict";Object.defineProperty(nl,"__esModule",{value:!0});nl.Semaphore=void 0;var _w=Bn(),Fp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,_w.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};nl.Semaphore=Fp});var Hy=H(Xn=>{"use strict";Object.defineProperty(Xn,"__esModule",{value:!0});Xn.WriteableStreamMessageWriter=Xn.AbstractMessageWriter=Xn.MessageWriter=void 0;var qy=Bn(),Ca=Go(),Pw=Uy(),Gy=no(),Iw="Content-Length: ",jy=`\r
`,Dw;(function(t){function e(r){let n=r;return n&&Ca.func(n.dispose)&&Ca.func(n.onClose)&&Ca.func(n.onError)&&Ca.func(n.write)}t.is=e})(Dw=Xn.MessageWriter||(Xn.MessageWriter={}));var il=class{constructor(){this.errorEmitter=new Gy.Emitter,this.closeEmitter=new Gy.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Ca.string(e.message)?e.message:"unknown"}`)}};Xn.AbstractMessageWriter=il;var Up;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,qy.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,qy.default)().applicationJson.encoder}}t.fromOptions=e})(Up||(Up={}));var qp=class extends il{constructor(e,r){super(),this.writable=e,this.options=Up.fromOptions(r),this.errorCount=0,this.writeSemaphore=new Pw.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(Iw,n.byteLength.toString(),jy),i.push(jy),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Xn.WriteableStreamMessageWriter=qp});var Xy=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var Ky=Bn(),Pt=Go(),Z=kp(),Wy=$p(),Sa=no(),Gp=Ip(),ka;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(ka||(ka={}));var By;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(By=Y.ProgressToken||(Y.ProgressToken={}));var wa;(function(t){t.type=new Z.NotificationType("$/progress")})(wa||(wa={}));var jp=class{constructor(){}};Y.ProgressType=jp;var Hp;(function(t){function e(r){return Pt.func(r)}t.is=e})(Hp||(Hp={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var Ow;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(Ow=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!Pt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})($e=Y.Trace||(Y.Trace={}));var rn;(function(t){t.Text="text",t.JSON="json"})(rn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return Pt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(rn=Y.TraceFormat||(Y.TraceFormat={}));var zy;(function(t){t.type=new Z.NotificationType("$/setTrace")})(zy=Y.SetTraceNotification||(Y.SetTraceNotification={}));var Kp;(function(t){t.type=new Z.NotificationType("$/logTrace")})(Kp=Y.LogTraceNotification||(Y.LogTraceNotification={}));var ol;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(ol=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Ho=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=Ho;var Vy;(function(t){function e(r){let n=r;return n&&Pt.func(n.cancelUndispatched)}t.is=e})(Vy=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var Wp;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Gp.CancellationTokenSource}});function e(r){let n=r;return n&&Pt.func(n.createCancellationTokenSource)}t.is=e})(Wp=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var Bp;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(ka.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}t.is=e})(Bp=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var zp;(function(t){t.Message=Object.freeze({receiver:Wp.Message,sender:Bp.Message});function e(r){let n=r;return n&&Wp.is(n.receiver)&&Bp.is(n.sender)}t.is=e})(zp=Y.CancellationStrategy||(Y.CancellationStrategy={}));var Lw;(function(t){function e(r){let n=r;return n&&(zp.is(n.cancellationStrategy)||Vy.is(n.connectionStrategy))}t.is=e})(Lw=Y.ConnectionOptions||(Y.ConnectionOptions={}));var nn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(nn||(nn={}));function Mw(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,c="2.0",l,u=new Map,f,m=new Map,v=new Map,A,C=new Wy.LinkedMap,N=new Map,S=new Set,T=new Map,y=$e.Off,$=rn.Text,D,X=nn.New,ge=new Sa.Emitter,Ee=new Sa.Emitter,Ht=new Sa.Emitter,xt=new Sa.Emitter,M=new Sa.Emitter,w=n&&n.cancellationStrategy?n.cancellationStrategy:zp.Message;function q(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function ee(x,I){Z.Message.isRequest(I)?x.set(q(I.id),I):Z.Message.isResponse(I)?x.set(j(I.id),I):x.set(ce(),I)}function Q(x){}function Rt(){return X===nn.Listening}function lt(){return X===nn.Closed}function me(){return X===nn.Disposed}function $r(){(X===nn.New||X===nn.Listening)&&(X=nn.Closed,Ee.fire(void 0))}function Hn(x){ge.fire([x,void 0,void 0])}function Ra(x){ge.fire(x)}t.onClose($r),t.onError(Hn),e.onClose($r),e.onError(Ra);function Qi(){A||C.size===0||(A=(0,Ky.default)().timer.setImmediate(()=>{A=void 0,ur()}))}function ur(){if(C.size===0)return;let x=C.shift();try{Z.Message.isRequest(x)?bt(x):Z.Message.isNotification(x)?Rn(x):Z.Message.isResponse(x)?er(x):Kt(x)}finally{Qi()}}let Mo=x=>{try{if(Z.Message.isNotification(x)&&x.method===ka.type.method){let I=x.params.id,F=q(I),B=C.get(F);if(Z.Message.isRequest(B)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(B,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){C.delete(F),T.delete(I),Je.id=B.id,xr(Je,x.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=T.get(I);if(De!==void 0){De.cancel(),xi(x);return}else S.add(I)}ee(C,x)}finally{Qi()}};function bt(x){if(me())return;function I(ue,Ue,Te){let ht={jsonrpc:c,id:x.id};ue instanceof Z.ResponseError?ht.error=ue.toJson():ht.result=ue===void 0?null:ue,xr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function F(ue,Ue,Te){let ht={jsonrpc:c,id:x.id,error:ue.toJson()};xr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function B(ue,Ue,Te){ue===void 0&&(ue=null);let ht={jsonrpc:c,id:x.id,result:ue};xr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}Zi(x);let De=u.get(x.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let At=Date.now();if(Je||l){let ue=x.id??String(Date.now()),Ue=w.receiver.createCancellationTokenSource(ue);x.id!==null&&S.has(x.id)&&Ue.cancel(),x.id!==null&&T.set(ue,Ue);try{let Te;if(Je)if(x.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Oe.numberOfParams} params but received none.`),x.method,At);return}Te=Je(Ue.token)}else if(Array.isArray(x.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,At);return}Te=Je(...x.params,Ue.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,At);return}Te=Je(x.params,Ue.token)}else l&&(Te=l(x.method,x.params,Ue.token));let ht=Te;Te?ht.then?ht.then(tr=>{T.delete(ue),I(tr,x.method,At)},tr=>{T.delete(ue),tr instanceof Z.ResponseError?F(tr,x.method,At):tr&&Pt.string(tr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${tr.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}):(T.delete(ue),I(Te,x.method,At)):(T.delete(ue),B(Te,x.method,At))}catch(Te){T.delete(ue),Te instanceof Z.ResponseError?I(Te,x.method,At):Te&&Pt.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${Te.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,At)}function er(x){if(!me())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let I=x.id,F=N.get(I);if(Kd(x,F),F!==void 0){N.delete(I);try{if(x.error){let B=x.error;F.reject(new Z.ResponseError(B.code,B.message,B.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(B){B.message?i.error(`Response handler '${F.method}' failed with message: ${B.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function Rn(x){if(me())return;let I,F;if(x.method===ka.type.method){let B=x.params.id;S.delete(B),xi(x);return}else{let B=m.get(x.method);B&&(F=B.handler,I=B.type)}if(F||f)try{if(xi(x),F)if(x.params===void 0)I!==void 0&&I.numberOfParams!==0&&I.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let B=x.params;x.method===wa.type.method&&B.length===2&&By.is(B[0])?F({token:B[0],value:B[1]}):(I!==void 0&&(I.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),I.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received ${B.length} arguments`)),F(...B))}else I!==void 0&&I.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(B){B.message?i.error(`Notification handler '${x.method}' failed with message: ${B.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Ht.fire(x)}function Kt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let I=x;if(Pt.string(I.id)||Pt.number(I.id)){let F=I.id,B=N.get(F);B&&B.reject(new Error("The received response has neither a result nor an error property."))}}function ut(x){if(x!=null)switch(y){case $e.Verbose:return JSON.stringify(x,null,4);case $e.Compact:return JSON.stringify(x);default:return}}function Gr(x){if(!(y===$e.Off||!D))if($===rn.Text){let I;(y===$e.Verbose||y===$e.Compact)&&x.params&&(I=`Params: ${ut(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,I)}else Ri("send-request",x)}function Nr(x){if(!(y===$e.Off||!D))if($===rn.Text){let I;(y===$e.Verbose||y===$e.Compact)&&(x.params?I=`Params: ${ut(x.params)}

`:I=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,I)}else Ri("send-notification",x)}function xr(x,I,F){if(!(y===$e.Off||!D))if($===rn.Text){let B;(y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?B=`Error data: ${ut(x.error.data)}

`:x.result?B=`Result: ${ut(x.result)}

`:x.error===void 0&&(B=`No result returned.

`)),D.log(`Sending response '${I} - (${x.id})'. Processing request took ${Date.now()-F}ms`,B)}else Ri("send-response",x)}function Zi(x){if(!(y===$e.Off||!D))if($===rn.Text){let I;(y===$e.Verbose||y===$e.Compact)&&x.params&&(I=`Params: ${ut(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,I)}else Ri("receive-request",x)}function xi(x){if(!(y===$e.Off||!D||x.method===Kp.type.method))if($===rn.Text){let I;(y===$e.Verbose||y===$e.Compact)&&(x.params?I=`Params: ${ut(x.params)}

`:I=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,I)}else Ri("receive-notification",x)}function Kd(x,I){if(!(y===$e.Off||!D))if($===rn.Text){let F;if((y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?F=`Error data: ${ut(x.error.data)}

`:x.result?F=`Result: ${ut(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),I){let B=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${I.method} - (${x.id})' in ${Date.now()-I.timerStart}ms.${B}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else Ri("receive-response",x)}function Ri(x,I){if(!D||y===$e.Off)return;let F={isLSPMessage:!0,type:x,message:I,timestamp:Date.now()};D.log(F)}function eo(){if(lt())throw new Ho(ol.Closed,"Connection is closed.");if(me())throw new Ho(ol.Disposed,"Connection is disposed.")}function Wd(){if(Rt())throw new Ho(ol.AlreadyListening,"Connection is already listening")}function Bd(){if(!Rt())throw new Error("Call listen() first.")}function to(x){return x===void 0?null:x}function Fo(x){if(x!==null)return x}function Vc(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function ba(x,I){switch(x){case Z.ParameterStructures.auto:return Vc(I)?Fo(I):[to(I)];case Z.ParameterStructures.byName:if(!Vc(I))throw new Error("Received parameters by name but param is not an object literal.");return Fo(I);case Z.ParameterStructures.byPosition:return[to(I)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function Xc(x,I){let F,B=x.numberOfParams;switch(B){case 0:F=void 0;break;case 1:F=ba(x.parameterStructures,I[0]);break;default:F=[];for(let De=0;De<I.length&&De<B;De++)F.push(to(I[De]));if(I.length<B)for(let De=I.length;De<B;De++)F.push(null);break}return F}let bi={sendNotification:(x,...I)=>{eo();let F,B;if(Pt.string(x)){F=x;let Oe=I[0],Je=0,At=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,At=Oe);let ue=I.length,Ue=ue-Je;switch(Ue){case 0:B=void 0;break;case 1:B=ba(At,I[Je]);break;default:if(At===Z.ParameterStructures.byName)throw new Error(`Received ${Ue} parameters for 'by Name' notification parameter structure.`);B=I.slice(Je,ue).map(Te=>to(Te));break}}else{let Oe=I;F=x.method,B=Xc(x,Oe)}let De={jsonrpc:c,method:F,params:B};return Nr(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(x,I)=>{eo();let F;return Pt.func(x)?f=x:I&&(Pt.string(x)?(F=x,m.set(x,{type:void 0,handler:I})):(F=x.method,m.set(x.method,{type:x,handler:I}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,I,F)=>{if(v.has(I))throw new Error(`Progress handler for token ${I} already registered`);return v.set(I,F),{dispose:()=>{v.delete(I)}}},sendProgress:(x,I,F)=>bi.sendNotification(wa.type,{token:I,value:F}),onUnhandledProgress:xt.event,sendRequest:(x,...I)=>{eo(),Bd();let F,B,De;if(Pt.string(x)){F=x;let ue=I[0],Ue=I[I.length-1],Te=0,ht=Z.ParameterStructures.auto;Z.ParameterStructures.is(ue)&&(Te=1,ht=ue);let tr=I.length;Gp.CancellationToken.is(Ue)&&(tr=tr-1,De=Ue);let Kn=tr-Te;switch(Kn){case 0:B=void 0;break;case 1:B=ba(ht,I[Te]);break;default:if(ht===Z.ParameterStructures.byName)throw new Error(`Received ${Kn} parameters for 'by Name' request parameter structure.`);B=I.slice(Te,tr).map(bn=>to(bn));break}}else{let ue=I;F=x.method,B=Xc(x,ue);let Ue=x.numberOfParams;De=Gp.CancellationToken.is(ue[Ue])?ue[Ue]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ue=w.sender.sendCancellation(bi,Oe);return ue===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ue.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ue,Ue)=>{let Te={jsonrpc:c,id:Oe,method:F,params:B},ht=bn=>{ue(bn),w.sender.cleanup(Oe),Je?.dispose()},tr=bn=>{Ue(bn),w.sender.cleanup(Oe),Je?.dispose()},Kn={method:F,timerStart:Date.now(),resolve:ht,reject:tr};Gr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(bn){Kn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,bn.message?bn.message:"Unknown reason")),Kn=null}Kn&&N.set(Oe,Kn)})},onRequest:(x,I)=>{eo();let F=null;return Hp.is(x)?(F=void 0,l=x):Pt.string(x)?(F=null,I!==void 0&&(F=x,u.set(x,{handler:I,type:void 0}))):I!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:I})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):l=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,I,F)=>{let B=!1,De=rn.Text;F!==void 0&&(Pt.boolean(F)?B=F:(B=F.sendNotification||!1,De=F.traceFormat||rn.Text)),y=x,$=De,y===$e.Off?D=void 0:D=I,B&&!lt()&&!me()&&await bi.sendNotification(zy.type,{value:$e.toString(x)})},onError:ge.event,onClose:Ee.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=nn.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let I of N.values())I.reject(x);N=new Map,T=new Map,S=new Set,C=new Wy.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(t.dispose)&&t.dispose()},listen:()=>{eo(),Wd(),X=nn.Listening,t.listen(Mo)},inspect:()=>{(0,Ky.default)().console.log("inspect")}};return bi.onNotification(Kp.type,x=>{if(y===$e.Off||!D)return;let I=y===$e.Verbose||y===$e.Compact;D.log(x.message,I?x.verbose:void 0)}),bi.onNotification(wa.type,x=>{let I=v.get(x.token);I?I(x.value):xt.fire(x)}),bi}Y.createMessageConnection=Mw});var Jp=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var Ge=kp();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var Vp=$p();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return Vp.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return Vp.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return Vp.Touch}});var Fw=Jd();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return Fw.Disposable}});var Yy=no();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return Yy.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return Yy.Emitter}});var Jy=Ip();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return Jy.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return Jy.CancellationToken}});var Xp=Fy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return Xp.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return Xp.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Xp.ReadableStreamMessageReader}});var Yp=Hy();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return Yp.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return Yp.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Yp.WriteableStreamMessageWriter}});var nr=Xy();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return nr.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return nr.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return nr.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return nr.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return nr.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return nr.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return nr.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return nr.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return nr.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return nr.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return nr.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return nr.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return nr.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return nr.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return nr.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return nr.CancellationStrategy}});var Uw=Bn();_.RAL=Uw.default});var Yn=H(_r=>{"use strict";var qw=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Gw=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&qw(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.createMessageConnection=_r.BrowserMessageWriter=_r.BrowserMessageReader=void 0;var jw=Iy();jw.default.install();var Ko=Jp();Gw(Jp(),_r);var Qp=class extends Ko.AbstractMessageReader{constructor(e){super(),this._onData=new Ko.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};_r.BrowserMessageReader=Qp;var Zp=class extends Ko.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};_r.BrowserMessageWriter=Zp;function Hw(t,e,r,n){return r===void 0&&(r=Ko.NullLogger),Ko.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Ko.createMessageConnection)(t,e,r,n)}_r.createMessageConnection=Hw});var em=H((wG,Qy)=>{"use strict";Qy.exports=Yn()});var so=H((Zy,sl)=>{(function(t){if(typeof sl=="object"&&typeof sl.exports=="object"){var e=t($y,Zy);e!==void 0&&(sl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(g,d){return g===Number.MAX_VALUE&&(g=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:g,character:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(g,d,E,P){if(k.uinteger(g)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(P))return{start:s.create(g,d),end:s.create(E,P)};if(s.is(g)&&s.is(d))return{start:g,end:d};throw new Error("Range#create called with invalid arguments[".concat(g,", ").concat(d,", ").concat(E,", ").concat(P,"]"))}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function R(g,d){return{uri:g,range:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var l;(function(p){function R(g,d,E,P){return{targetUri:g,targetRange:d,targetSelectionRange:E,originSelectionRange:P}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(g,d,E,P){return{red:g,green:d,blue:E,alpha:P}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(g,d){return{range:g,color:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(g,d,E){return{label:g,textEdit:d,additionalTextEdits:E}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var A;(function(p){function R(g,d,E,P,re,ft){var qe={startLine:g,endLine:d};return k.defined(E)&&(qe.startCharacter=E),k.defined(P)&&(qe.endCharacter=P),k.defined(re)&&(qe.kind=re),k.defined(ft)&&(qe.collapsedText=ft),qe}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(A=e.FoldingRange||(e.FoldingRange={}));var C;(function(p){function R(g,d){return{location:g,message:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&c.is(d.location)&&k.string(d.message)}p.is=b})(C=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var S;(function(p){p.Unnecessary=1,p.Deprecated=2})(S=e.DiagnosticTag||(e.DiagnosticTag={}));var T;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&k.string(g.href)}p.is=R})(T=e.CodeDescription||(e.CodeDescription={}));var y;(function(p){function R(g,d,E,P,re,ft){var qe={range:g,message:d};return k.defined(E)&&(qe.severity=E),k.defined(P)&&(qe.code=P),k.defined(re)&&(qe.source=re),k.defined(ft)&&(qe.relatedInformation=ft),qe}p.create=R;function b(g){var d,E=g;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,C.is))}p.is=b})(y=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(g,d){for(var E=[],P=2;P<arguments.length;P++)E[P-2]=arguments[P];var re={title:g,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var D;(function(p){function R(E,P){return{range:E,newText:P}}p.replace=R;function b(E,P){return{range:{start:E,end:E},newText:P}}p.insert=b;function g(E){return{range:E,newText:""}}p.del=g;function d(E){var P=E;return k.objectLiteral(P)&&k.string(P.newText)&&a.is(P.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(g,d,E){var P={label:g};return d!==void 0&&(P.needsConfirmation=d),E!==void 0&&(P.description=E),P}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ge;(function(p){function R(b){var g=b;return k.string(g)}p.is=R})(ge=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function R(E,P,re){return{range:E,newText:P,annotationId:re}}p.replace=R;function b(E,P,re){return{range:{start:E,end:E},newText:P,annotationId:re}}p.insert=b;function g(E,P){return{range:E,newText:"",annotationId:P}}p.del=g;function d(E){var P=E;return D.is(P)&&(X.is(P.annotationId)||ge.is(P.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function R(g,d){return{textDocument:g,edits:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&lt.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var xt;(function(p){function R(g,d,E){var P={kind:"create",uri:g};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=R;function b(g){var d=g;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(xt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(g,d,E,P){var re={kind:"rename",oldUri:g,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),P!==void 0&&(re.annotationId=P),re}p.create=R;function b(g){var d=g;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var w;(function(p){function R(g,d,E){var P={kind:"delete",uri:g};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=R;function b(g){var d=g;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(w=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function R(b){var g=b;return g&&(g.changes!==void 0||g.documentChanges!==void 0)&&(g.documentChanges===void 0||g.documentChanges.every(function(d){return k.string(d.kind)?xt.is(d)||M.is(d)||w.is(d):Ht.is(d)}))}p.is=R})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,g){var d,E;if(g===void 0?d=D.insert(R,b):ge.is(g)?(E=g,d=Ee.insert(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,g){var d,E;if(g===void 0?d=D.replace(R,b):ge.is(g)?(E=g,d=Ee.replace(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var g,d;if(b===void 0?g=D.del(R):ge.is(b)?(d=b,g=Ee.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),g=Ee.del(R,d)),this.edits.push(g),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var g;if(ge.is(R)?g=R:(g=this.nextId(),b=R),this._annotations[g]!==void 0)throw new Error("Id ".concat(g," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(g));return this._annotations[g]=b,this._size++,g},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(g){if(Ht.is(g)){var d=new j(g.edits,b._changeAnnotations);b._textEditChanges[g.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(g){var d=new j(R.changes[g]);b._textEditChanges[g]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(lt.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},g=this._textEditChanges[b.uri];if(!g){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),g=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=g}return g}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var g=this._textEditChanges[R];if(!g){var d=[];this._workspaceEdit.changes[R]=d,g=new j(d),this._textEditChanges[R]=g}return g}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:g=b;var E,P;if(d===void 0?E=xt.create(R,g):(P=ge.is(d)?d:this._changeAnnotations.manage(d),E=xt.create(R,g,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p.prototype.renameFile=function(R,b,g,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(g)||ge.is(g)?E=g:d=g;var P,re;if(E===void 0?P=M.create(R,b,d):(re=ge.is(E)?E:this._changeAnnotations.manage(E),P=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(P),re!==void 0)return re},p.prototype.deleteFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:g=b;var E,P;if(d===void 0?E=w.create(R,g):(P=ge.is(d)?d:this._changeAnnotations.manage(d),E=w.create(R,g,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(g){return{uri:g}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var Rt;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(Rt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var lt;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(lt=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function R(g,d,E,P){return{uri:g,languageId:d,version:E,text:P}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var $r;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var g=b;return g===p.PlainText||g===p.Markdown}p.is=R})($r=e.MarkupKind||(e.MarkupKind={}));var Hn;(function(p){function R(b){var g=b;return k.objectLiteral(b)&&$r.is(g.kind)&&k.string(g.value)}p.is=R})(Hn=e.MarkupContent||(e.MarkupContent={}));var Ra;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(Ra=e.CompletionItemKind||(e.CompletionItemKind={}));var Qi;(function(p){p.PlainText=1,p.Snippet=2})(Qi=e.InsertTextFormat||(e.InsertTextFormat={}));var ur;(function(p){p.Deprecated=1})(ur=e.CompletionItemTag||(e.CompletionItemTag={}));var Mo;(function(p){function R(g,d,E){return{newText:g,insert:d,replace:E}}p.create=R;function b(g){var d=g;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(Mo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var bt;(function(p){p.asIs=1,p.adjustIndentation=2})(bt=e.InsertTextMode||(e.InsertTextMode={}));var er;(function(p){function R(b){var g=b;return g&&(k.string(g.detail)||g.detail===void 0)&&(k.string(g.description)||g.description===void 0)}p.is=R})(er=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Rn;(function(p){function R(b){return{label:b}}p.create=R})(Rn=e.CompletionItem||(e.CompletionItem={}));var Kt;(function(p){function R(b,g){return{items:b||[],isIncomplete:!!g}}p.create=R})(Kt=e.CompletionList||(e.CompletionList={}));var ut;(function(p){function R(g){return g.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(g){var d=g;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(ut=e.MarkedString||(e.MarkedString={}));var Gr;(function(p){function R(b){var g=b;return!!g&&k.objectLiteral(g)&&(Hn.is(g.contents)||ut.is(g.contents)||k.typedArray(g.contents,ut.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(Gr=e.Hover||(e.Hover={}));var Nr;(function(p){function R(b,g){return g?{label:b,documentation:g}:{label:b}}p.create=R})(Nr=e.ParameterInformation||(e.ParameterInformation={}));var xr;(function(p){function R(b,g){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var P={label:b};return k.defined(g)&&(P.documentation=g),k.defined(d)?P.parameters=d:P.parameters=[],P}p.create=R})(xr=e.SignatureInformation||(e.SignatureInformation={}));var Zi;(function(p){p.Text=1,p.Read=2,p.Write=3})(Zi=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var xi;(function(p){function R(b,g){var d={range:b};return k.number(g)&&(d.kind=g),d}p.create=R})(xi=e.DocumentHighlight||(e.DocumentHighlight={}));var Kd;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(Kd=e.SymbolKind||(e.SymbolKind={}));var Ri;(function(p){p.Deprecated=1})(Ri=e.SymbolTag||(e.SymbolTag={}));var eo;(function(p){function R(b,g,d,E,P){var re={name:b,kind:g,location:{uri:E,range:d}};return P&&(re.containerName=P),re}p.create=R})(eo=e.SymbolInformation||(e.SymbolInformation={}));var Wd;(function(p){function R(b,g,d,E){return E!==void 0?{name:b,kind:g,location:{uri:d,range:E}}:{name:b,kind:g,location:{uri:d}}}p.create=R})(Wd=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Bd;(function(p){function R(g,d,E,P,re,ft){var qe={name:g,detail:d,kind:E,range:P,selectionRange:re};return ft!==void 0&&(qe.children=ft),qe}p.create=R;function b(g){var d=g;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(Bd=e.DocumentSymbol||(e.DocumentSymbol={}));var to;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(to=e.CodeActionKind||(e.CodeActionKind={}));var Fo;(function(p){p.Invoked=1,p.Automatic=2})(Fo=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var Vc;(function(p){function R(g,d,E){var P={diagnostics:g};return d!=null&&(P.only=d),E!=null&&(P.triggerKind=E),P}p.create=R;function b(g){var d=g;return k.defined(d)&&k.typedArray(d.diagnostics,y.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Fo.Invoked||d.triggerKind===Fo.Automatic)}p.is=b})(Vc=e.CodeActionContext||(e.CodeActionContext={}));var ba;(function(p){function R(g,d,E){var P={title:g},re=!0;return typeof d=="string"?(re=!1,P.kind=d):$.is(d)?P.command=d:P.edit=d,re&&E!==void 0&&(P.kind=E),P}p.create=R;function b(g){var d=g;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,y.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(ba=e.CodeAction||(e.CodeAction={}));var Xc;(function(p){function R(g,d){var E={range:g};return k.defined(d)&&(E.data=d),E}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=b})(Xc=e.CodeLens||(e.CodeLens={}));var bi;(function(p){function R(g,d){return{tabSize:g,insertSpaces:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(bi=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(g,d,E){return{range:g,target:d,data:E}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var I;(function(p){function R(g,d){return{range:g,parent:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(I=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var B;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(B=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&(g.resultId===void 0||typeof g.resultId=="string")&&Array.isArray(g.data)&&(g.data.length===0||typeof g.data[0]=="number")}p.is=R})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function R(g,d){return{range:g,text:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function R(g,d,E){return{range:g,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var At;(function(p){function R(g,d){return{range:g,expression:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(At=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ue;(function(p){function R(g,d){return{frameId:g,stoppedLocation:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(g.stoppedLocation)}p.is=b})(ue=e.InlineValueContext||(e.InlineValueContext={}));var Ue;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(Ue=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function R(g){return{value:g}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Hn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ht;(function(p){function R(g,d,E){var P={position:g,label:d};return E!==void 0&&(P.kind=E),P}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||Ue.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Hn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(ht=e.InlayHint||(e.InlayHint={}));var tr;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&n.is(g.uri)&&k.string(g.name)}p.is=R})(tr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Kn;(function(p){function R(E,P,re,ft){return new bn(E,P,re,ft)}p.create=R;function b(E){var P=E;return!!(k.defined(P)&&k.string(P.uri)&&(k.undefined(P.languageId)||k.string(P.languageId))&&k.uinteger(P.lineCount)&&k.func(P.getText)&&k.func(P.positionAt)&&k.func(P.offsetAt))}p.is=b;function g(E,P){for(var re=E.getText(),ft=d(P,function(Uo,Yc){var Ey=Uo.range.start.line-Yc.range.start.line;return Ey===0?Uo.range.start.character-Yc.range.start.character:Ey}),qe=re.length,en=ft.length-1;en>=0;en--){var tn=ft[en],Wn=E.offsetAt(tn.range.start),fe=E.offsetAt(tn.range.end);if(fe<=qe)re=re.substring(0,Wn)+tn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");qe=Wn}return re}p.applyEdits=g;function d(E,P){if(E.length<=1)return E;var re=E.length/2|0,ft=E.slice(0,re),qe=E.slice(re);d(ft,P),d(qe,P);for(var en=0,tn=0,Wn=0;en<ft.length&&tn<qe.length;){var fe=P(ft[en],qe[tn]);fe<=0?E[Wn++]=ft[en++]:E[Wn++]=qe[tn++]}for(;en<ft.length;)E[Wn++]=ft[en++];for(;tn<qe.length;)E[Wn++]=qe[tn++];return E}})(Kn=e.TextDocument||(e.TextDocument={}));var bn=function(){function p(R,b,g,d){this._uri=R,this._languageId=b,this._version=g,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),g=this.offsetAt(R.end);return this._content.substring(b,g)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,g=!0,d=0;d<b.length;d++){g&&(R.push(d),g=!1);var E=b.charAt(d);g=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}g&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),g=0,d=b.length;if(d===0)return s.create(0,R);for(;g<d;){var E=Math.floor((g+d)/2);b[E]>R?d=E:g=E+1}var P=g-1;return s.create(P,R-b[P])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var g=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(g+R.character,d),g)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function g(fe){return typeof fe>"u"}p.undefined=g;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return R.call(fe)==="[object String]"}p.string=E;function P(fe){return R.call(fe)==="[object Number]"}p.number=P;function re(fe,Uo,Yc){return R.call(fe)==="[object Number]"&&Uo<=fe&&fe<=Yc}p.numberRange=re;function ft(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=ft;function qe(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=qe;function en(fe){return R.call(fe)==="[object Function]"}p.func=en;function tn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=tn;function Wn(fe,Uo){return Array.isArray(fe)&&fe.every(Uo)}p.typedArray=Wn})(k||(k={}))})});var nt=H(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.ProtocolNotificationType=dr.ProtocolNotificationType0=dr.ProtocolRequestType=dr.ProtocolRequestType0=dr.RegistrationType=dr.MessageDirection=void 0;var Wo=Yn(),Kw;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(Kw=dr.MessageDirection||(dr.MessageDirection={}));var tm=class{constructor(e){this.method=e}};dr.RegistrationType=tm;var rm=class extends Wo.RequestType0{constructor(e){super(e)}};dr.ProtocolRequestType0=rm;var nm=class extends Wo.RequestType{constructor(e){super(e,Wo.ParameterStructures.byName)}};dr.ProtocolRequestType=nm;var im=class extends Wo.NotificationType0{constructor(e){super(e)}};dr.ProtocolNotificationType0=im;var om=class extends Wo.NotificationType{constructor(e){super(e,Wo.ParameterStructures.byName)}};dr.ProtocolNotificationType=om});var al=H(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.objectLiteral=Ct.typedArray=Ct.stringArray=Ct.array=Ct.func=Ct.error=Ct.number=Ct.string=Ct.boolean=void 0;function Ww(t){return t===!0||t===!1}Ct.boolean=Ww;function eg(t){return typeof t=="string"||t instanceof String}Ct.string=eg;function Bw(t){return typeof t=="number"||t instanceof Number}Ct.number=Bw;function zw(t){return t instanceof Error}Ct.error=zw;function Vw(t){return typeof t=="function"}Ct.func=Vw;function tg(t){return Array.isArray(t)}Ct.array=tg;function Xw(t){return tg(t)&&t.every(e=>eg(e))}Ct.stringArray=Xw;function Yw(t,e){return Array.isArray(t)&&t.every(e)}Ct.typedArray=Yw;function Jw(t){return t!==null&&typeof t=="object"}Ct.objectLiteral=Jw});var ng=H(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.ImplementationRequest=void 0;var rg=nt(),Qw;(function(t){t.method="textDocument/implementation",t.messageDirection=rg.MessageDirection.clientToServer,t.type=new rg.ProtocolRequestType(t.method)})(Qw=Ea.ImplementationRequest||(Ea.ImplementationRequest={}))});var og=H($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.TypeDefinitionRequest=void 0;var ig=nt(),Zw;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=ig.MessageDirection.clientToServer,t.type=new ig.ProtocolRequestType(t.method)})(Zw=$a.TypeDefinitionRequest||($a.TypeDefinitionRequest={}))});var sg=H(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.DidChangeWorkspaceFoldersNotification=Ai.WorkspaceFoldersRequest=void 0;var cl=nt(),ek;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=cl.MessageDirection.serverToClient,t.type=new cl.ProtocolRequestType0(t.method)})(ek=Ai.WorkspaceFoldersRequest||(Ai.WorkspaceFoldersRequest={}));var tk;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=cl.MessageDirection.clientToServer,t.type=new cl.ProtocolNotificationType(t.method)})(tk=Ai.DidChangeWorkspaceFoldersNotification||(Ai.DidChangeWorkspaceFoldersNotification={}))});var cg=H(Na=>{"use strict";Object.defineProperty(Na,"__esModule",{value:!0});Na.ConfigurationRequest=void 0;var ag=nt(),rk;(function(t){t.method="workspace/configuration",t.messageDirection=ag.MessageDirection.serverToClient,t.type=new ag.ProtocolRequestType(t.method)})(rk=Na.ConfigurationRequest||(Na.ConfigurationRequest={}))});var lg=H(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.ColorPresentationRequest=Ci.DocumentColorRequest=void 0;var ll=nt(),nk;(function(t){t.method="textDocument/documentColor",t.messageDirection=ll.MessageDirection.clientToServer,t.type=new ll.ProtocolRequestType(t.method)})(nk=Ci.DocumentColorRequest||(Ci.DocumentColorRequest={}));var ik;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=ll.MessageDirection.clientToServer,t.type=new ll.ProtocolRequestType(t.method)})(ik=Ci.ColorPresentationRequest||(Ci.ColorPresentationRequest={}))});var fg=H(_a=>{"use strict";Object.defineProperty(_a,"__esModule",{value:!0});_a.FoldingRangeRequest=void 0;var ug=nt(),ok;(function(t){t.method="textDocument/foldingRange",t.messageDirection=ug.MessageDirection.clientToServer,t.type=new ug.ProtocolRequestType(t.method)})(ok=_a.FoldingRangeRequest||(_a.FoldingRangeRequest={}))});var pg=H(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.DeclarationRequest=void 0;var dg=nt(),sk;(function(t){t.method="textDocument/declaration",t.messageDirection=dg.MessageDirection.clientToServer,t.type=new dg.ProtocolRequestType(t.method)})(sk=Pa.DeclarationRequest||(Pa.DeclarationRequest={}))});var hg=H(Ia=>{"use strict";Object.defineProperty(Ia,"__esModule",{value:!0});Ia.SelectionRangeRequest=void 0;var mg=nt(),ak;(function(t){t.method="textDocument/selectionRange",t.messageDirection=mg.MessageDirection.clientToServer,t.type=new mg.ProtocolRequestType(t.method)})(ak=Ia.SelectionRangeRequest||(Ia.SelectionRangeRequest={}))});var yg=H(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});on.WorkDoneProgressCancelNotification=on.WorkDoneProgressCreateRequest=on.WorkDoneProgress=void 0;var ck=Yn(),ul=nt(),lk;(function(t){t.type=new ck.ProgressType;function e(r){return r===t.type}t.is=e})(lk=on.WorkDoneProgress||(on.WorkDoneProgress={}));var uk;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=ul.MessageDirection.serverToClient,t.type=new ul.ProtocolRequestType(t.method)})(uk=on.WorkDoneProgressCreateRequest||(on.WorkDoneProgressCreateRequest={}));var fk;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=ul.MessageDirection.clientToServer,t.type=new ul.ProtocolNotificationType(t.method)})(fk=on.WorkDoneProgressCancelNotification||(on.WorkDoneProgressCancelNotification={}))});var gg=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.CallHierarchyOutgoingCallsRequest=sn.CallHierarchyIncomingCallsRequest=sn.CallHierarchyPrepareRequest=void 0;var Bo=nt(),dk;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(dk=sn.CallHierarchyPrepareRequest||(sn.CallHierarchyPrepareRequest={}));var pk;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(pk=sn.CallHierarchyIncomingCallsRequest||(sn.CallHierarchyIncomingCallsRequest={}));var mk;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(mk=sn.CallHierarchyOutgoingCallsRequest||(sn.CallHierarchyOutgoingCallsRequest={}))});var Tg=H(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.SemanticTokensRefreshRequest=St.SemanticTokensRangeRequest=St.SemanticTokensDeltaRequest=St.SemanticTokensRequest=St.SemanticTokensRegistrationType=St.TokenFormat=void 0;var Jn=nt(),hk;(function(t){t.Relative="relative"})(hk=St.TokenFormat||(St.TokenFormat={}));var fl;(function(t){t.method="textDocument/semanticTokens",t.type=new Jn.RegistrationType(t.method)})(fl=St.SemanticTokensRegistrationType||(St.SemanticTokensRegistrationType={}));var yk;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=fl.method})(yk=St.SemanticTokensRequest||(St.SemanticTokensRequest={}));var gk;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=fl.method})(gk=St.SemanticTokensDeltaRequest||(St.SemanticTokensDeltaRequest={}));var Tk;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=fl.method})(Tk=St.SemanticTokensRangeRequest||(St.SemanticTokensRangeRequest={}));var vk;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType0(t.method)})(vk=St.SemanticTokensRefreshRequest||(St.SemanticTokensRefreshRequest={}))});var xg=H(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.ShowDocumentRequest=void 0;var vg=nt(),xk;(function(t){t.method="window/showDocument",t.messageDirection=vg.MessageDirection.serverToClient,t.type=new vg.ProtocolRequestType(t.method)})(xk=Da.ShowDocumentRequest||(Da.ShowDocumentRequest={}))});var bg=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.LinkedEditingRangeRequest=void 0;var Rg=nt(),Rk;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Rg.MessageDirection.clientToServer,t.type=new Rg.ProtocolRequestType(t.method)})(Rk=Oa.LinkedEditingRangeRequest||(Oa.LinkedEditingRangeRequest={}))});var Ag=H(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.WillDeleteFilesRequest=it.DidDeleteFilesNotification=it.DidRenameFilesNotification=it.WillRenameFilesRequest=it.DidCreateFilesNotification=it.WillCreateFilesRequest=it.FileOperationPatternKind=void 0;var jr=nt(),bk;(function(t){t.file="file",t.folder="folder"})(bk=it.FileOperationPatternKind||(it.FileOperationPatternKind={}));var Ak;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(Ak=it.WillCreateFilesRequest||(it.WillCreateFilesRequest={}));var Ck;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(Ck=it.DidCreateFilesNotification||(it.DidCreateFilesNotification={}));var Sk;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(Sk=it.WillRenameFilesRequest||(it.WillRenameFilesRequest={}));var wk;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(wk=it.DidRenameFilesNotification||(it.DidRenameFilesNotification={}));var kk;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(kk=it.DidDeleteFilesNotification||(it.DidDeleteFilesNotification={}));var Ek;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(Ek=it.WillDeleteFilesRequest||(it.WillDeleteFilesRequest={}))});var Sg=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.MonikerRequest=an.MonikerKind=an.UniquenessLevel=void 0;var Cg=nt(),$k;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})($k=an.UniquenessLevel||(an.UniquenessLevel={}));var Nk;(function(t){t.$import="import",t.$export="export",t.local="local"})(Nk=an.MonikerKind||(an.MonikerKind={}));var _k;(function(t){t.method="textDocument/moniker",t.messageDirection=Cg.MessageDirection.clientToServer,t.type=new Cg.ProtocolRequestType(t.method)})(_k=an.MonikerRequest||(an.MonikerRequest={}))});var wg=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.TypeHierarchySubtypesRequest=cn.TypeHierarchySupertypesRequest=cn.TypeHierarchyPrepareRequest=void 0;var zo=nt(),Pk;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method)})(Pk=cn.TypeHierarchyPrepareRequest||(cn.TypeHierarchyPrepareRequest={}));var Ik;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method)})(Ik=cn.TypeHierarchySupertypesRequest||(cn.TypeHierarchySupertypesRequest={}));var Dk;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method)})(Dk=cn.TypeHierarchySubtypesRequest||(cn.TypeHierarchySubtypesRequest={}))});var kg=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.InlineValueRefreshRequest=Si.InlineValueRequest=void 0;var dl=nt(),Ok;(function(t){t.method="textDocument/inlineValue",t.messageDirection=dl.MessageDirection.clientToServer,t.type=new dl.ProtocolRequestType(t.method)})(Ok=Si.InlineValueRequest||(Si.InlineValueRequest={}));var Lk;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=dl.MessageDirection.clientToServer,t.type=new dl.ProtocolRequestType0(t.method)})(Lk=Si.InlineValueRefreshRequest||(Si.InlineValueRefreshRequest={}))});var Eg=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.InlayHintRefreshRequest=ln.InlayHintResolveRequest=ln.InlayHintRequest=void 0;var Vo=nt(),Mk;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})(Mk=ln.InlayHintRequest||(ln.InlayHintRequest={}));var Fk;(function(t){t.method="inlayHint/resolve",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})(Fk=ln.InlayHintResolveRequest||(ln.InlayHintResolveRequest={}));var Uk;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType0(t.method)})(Uk=ln.InlayHintRefreshRequest||(ln.InlayHintRefreshRequest={}))});var Ng=H(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var $g=Yn(),qk=al(),Xo=nt(),Gk;(function(t){function e(r){let n=r;return n&&qk.boolean(n.retriggerRequest)}t.is=e})(Gk=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var jk;(function(t){t.Full="full",t.Unchanged="unchanged"})(jk=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var Hk;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method),t.partialResult=new $g.ProgressType})(Hk=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var Kk;(function(t){t.method="workspace/diagnostic",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method),t.partialResult=new $g.ProgressType})(Kk=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var Wk;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType0(t.method)})(Wk=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var Ig=H(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.DidCloseNotebookDocumentNotification=xe.DidSaveNotebookDocumentNotification=xe.DidChangeNotebookDocumentNotification=xe.NotebookCellArrayChange=xe.DidOpenNotebookDocumentNotification=xe.NotebookDocumentSyncRegistrationType=xe.NotebookDocument=xe.NotebookCell=xe.ExecutionSummary=xe.NotebookCellKind=void 0;var La=so(),un=al(),An=nt(),_g;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(_g=xe.NotebookCellKind||(xe.NotebookCellKind={}));var Pg;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return un.objectLiteral(o)&&La.uinteger.is(o.executionOrder)&&(o.success===void 0||un.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Pg=xe.ExecutionSummary||(xe.ExecutionSummary={}));var sm;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return un.objectLiteral(s)&&_g.is(s.kind)&&La.DocumentUri.is(s.document)&&(s.metadata===void 0||un.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Pg.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(un.objectLiteral(o)&&un.objectLiteral(s)){let l=Object.keys(o),u=Object.keys(s);if(l.length!==u.length||(l.sort(),u.sort(),!i(l,u)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(sm=xe.NotebookCell||(xe.NotebookCell={}));var Bk;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return un.objectLiteral(i)&&un.string(i.uri)&&La.integer.is(i.version)&&un.typedArray(i.cells,sm.is)}t.is=r})(Bk=xe.NotebookDocument||(xe.NotebookDocument={}));var Ma;(function(t){t.method="notebookDocument/sync",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.RegistrationType(t.method)})(Ma=xe.NotebookDocumentSyncRegistrationType||(xe.NotebookDocumentSyncRegistrationType={}));var zk;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(zk=xe.DidOpenNotebookDocumentNotification||(xe.DidOpenNotebookDocumentNotification={}));var Vk;(function(t){function e(n){let i=n;return un.objectLiteral(i)&&La.uinteger.is(i.start)&&La.uinteger.is(i.deleteCount)&&(i.cells===void 0||un.typedArray(i.cells,sm.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(Vk=xe.NotebookCellArrayChange||(xe.NotebookCellArrayChange={}));var Xk;(function(t){t.method="notebookDocument/didChange",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(Xk=xe.DidChangeNotebookDocumentNotification||(xe.DidChangeNotebookDocumentNotification={}));var Yk;(function(t){t.method="notebookDocument/didSave",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(Yk=xe.DidSaveNotebookDocumentNotification||(xe.DidSaveNotebookDocumentNotification={}));var Jk;(function(t){t.method="notebookDocument/didClose",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(Jk=xe.DidCloseNotebookDocumentNotification||(xe.DidCloseNotebookDocumentNotification={}))});var jg=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=nt(),Dg=so(),Bt=al(),Qk=ng();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return Qk.ImplementationRequest}});var Zk=og();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return Zk.TypeDefinitionRequest}});var Og=sg();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return Og.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return Og.DidChangeWorkspaceFoldersNotification}});var eE=cg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return eE.ConfigurationRequest}});var Lg=lg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Lg.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Lg.ColorPresentationRequest}});var tE=fg();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return tE.FoldingRangeRequest}});var rE=pg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return rE.DeclarationRequest}});var nE=hg();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return nE.SelectionRangeRequest}});var am=yg();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return am.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return am.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return am.WorkDoneProgressCancelNotification}});var cm=gg();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return cm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return cm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return cm.CallHierarchyPrepareRequest}});var Yo=Tg();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Yo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Yo.SemanticTokensRegistrationType}});var iE=xg();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return iE.ShowDocumentRequest}});var oE=bg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return oE.LinkedEditingRangeRequest}});var ao=Ag();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return ao.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return ao.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return ao.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return ao.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return ao.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return ao.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return ao.WillDeleteFilesRequest}});var lm=Sg();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return lm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return lm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return lm.MonikerRequest}});var um=wg();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return um.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return um.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return um.TypeHierarchySupertypesRequest}});var Mg=kg();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Mg.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Mg.InlineValueRefreshRequest}});var fm=Eg();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return fm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return fm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return fm.InlayHintRefreshRequest}});var Fa=Ng();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Fa.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Fa.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Fa.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Fa.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Fa.DiagnosticRefreshRequest}});var Cn=Ig();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Cn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Cn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Cn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Cn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Cn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Cn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidCloseNotebookDocumentNotification}});var Fg;(function(t){function e(r){let n=r;return Bt.string(n.language)||Bt.string(n.scheme)||Bt.string(n.pattern)}t.is=e})(Fg=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Ug;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebookType)||Bt.string(n.scheme)||Bt.string(n.pattern))}t.is=e})(Ug=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var qg;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebook)||Ug.is(n.notebook))&&(n.language===void 0||Bt.string(n.language))}t.is=e})(qg=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var Gg;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Bt.string(n)&&!Fg.is(n)&&!qg.is(n))return!1;return!0}t.is=e})(Gg=h.DocumentSelector||(h.DocumentSelector={}));var sE;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(sE=h.RegistrationRequest||(h.RegistrationRequest={}));var aE;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(aE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var cE;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(cE=h.ResourceOperationKind||(h.ResourceOperationKind={}));var lE;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(lE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var uE;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(uE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var fE;(function(t){function e(r){let n=r;return n&&Bt.string(n.id)&&n.id.length>0}t.hasId=e})(fE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var dE;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||Gg.is(n.documentSelector))}t.is=e})(dE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var pE;(function(t){function e(n){let i=n;return Bt.objectLiteral(i)&&(i.workDoneProgress===void 0||Bt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Bt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(pE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var mE;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(mE=h.InitializeRequest||(h.InitializeRequest={}));var hE;(function(t){t.unknownProtocolVersion=1})(hE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var yE;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(yE=h.InitializedNotification||(h.InitializedNotification={}));var gE;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(gE=h.ShutdownRequest||(h.ShutdownRequest={}));var TE;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(TE=h.ExitNotification||(h.ExitNotification={}));var vE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(vE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var xE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(xE=h.MessageType||(h.MessageType={}));var RE;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(RE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var bE;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(bE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var AE;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(AE=h.LogMessageNotification||(h.LogMessageNotification={}));var CE;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(CE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var SE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(SE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var wE;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(wE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var kE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(kE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var EE;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(EE=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var $E;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})($E=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var NE;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(NE=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var _E;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(_E=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var PE;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(PE=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var IE;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(IE=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var DE;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(DE=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var OE;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(OE=h.FileChangeType||(h.FileChangeType={}));var LE;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Dg.URI.is(n.baseUri)||Dg.WorkspaceFolder.is(n.baseUri))&&Bt.string(n.pattern)}t.is=e})(LE=h.RelativePattern||(h.RelativePattern={}));var ME;(function(t){t.Create=1,t.Change=2,t.Delete=4})(ME=h.WatchKind||(h.WatchKind={}));var FE;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(FE=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var UE;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(UE=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var qE;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(qE=h.CompletionRequest||(h.CompletionRequest={}));var GE;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(GE=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var jE;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(jE=h.HoverRequest||(h.HoverRequest={}));var HE;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(HE=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var KE;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(KE=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var WE;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(WE=h.DefinitionRequest||(h.DefinitionRequest={}));var BE;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(BE=h.ReferencesRequest||(h.ReferencesRequest={}));var zE;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(zE=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var VE;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(VE=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var XE;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(XE=h.CodeActionRequest||(h.CodeActionRequest={}));var YE;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(YE=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var JE;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(JE=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var QE;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(QE=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var ZE;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(ZE=h.CodeLensRequest||(h.CodeLensRequest={}));var e$;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(e$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var t$;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(t$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var r$;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(r$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var n$;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(n$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var i$;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(i$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var o$;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(o$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var s$;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(s$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var a$;(function(t){t.Identifier=1})(a$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var c$;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(c$=h.RenameRequest||(h.RenameRequest={}));var l$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(l$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var u$;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(u$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var f$;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(f$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var Kg=H(pl=>{"use strict";Object.defineProperty(pl,"__esModule",{value:!0});pl.createProtocolConnection=void 0;var Hg=Yn();function d$(t,e,r,n){return Hg.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Hg.createMessageConnection)(t,e,r,n)}pl.createProtocolConnection=d$});var Wg=H(pr=>{"use strict";var p$=pr&&pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ml=pr&&pr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&p$(e,t,r)};Object.defineProperty(pr,"__esModule",{value:!0});pr.LSPErrorCodes=pr.createProtocolConnection=void 0;ml(Yn(),pr);ml(so(),pr);ml(nt(),pr);ml(jg(),pr);var m$=Kg();Object.defineProperty(pr,"createProtocolConnection",{enumerable:!0,get:function(){return m$.createProtocolConnection}});var h$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(h$=pr.LSPErrorCodes||(pr.LSPErrorCodes={}))});var wt=H(Sn=>{"use strict";var y$=Sn&&Sn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Bg=Sn&&Sn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&y$(e,t,r)};Object.defineProperty(Sn,"__esModule",{value:!0});Sn.createProtocolConnection=void 0;var g$=em();Bg(em(),Sn);Bg(Wg(),Sn);function T$(t,e,r,n){return(0,g$.createMessageConnection)(t,e,r,n)}Sn.createProtocolConnection=T$});var pm=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.SemanticTokensBuilder=wi.SemanticTokensDiff=wi.SemanticTokensFeature=void 0;var hl=wt(),v$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(hl.SemanticTokensRefreshRequest.type),on:e=>{let r=hl.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=hl.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=hl.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};wi.SemanticTokensFeature=v$;var yl=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};wi.SemanticTokensDiff=yl;var dm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new yl(this._prevData,this._data).computeDiff()}:this.build()}};wi.SemanticTokensBuilder=dm});var hm=H(gl=>{"use strict";Object.defineProperty(gl,"__esModule",{value:!0});gl.TextDocuments=void 0;var co=wt(),mm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new co.Emitter,this._onDidOpen=new co.Emitter,this._onDidClose=new co.Emitter,this._onDidSave=new co.Emitter,this._onWillSave=new co.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=co.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),co.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};gl.TextDocuments=mm});var gm=H(Jo=>{"use strict";Object.defineProperty(Jo,"__esModule",{value:!0});Jo.NotebookDocuments=Jo.NotebookSyncFeature=void 0;var Hr=wt(),zg=hm(),x$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Hr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Hr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Hr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Hr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Jo.NotebookSyncFeature=x$;var Tl=class t{onDidOpenTextDocument(e){return this.openHandler=e,Hr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Hr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Hr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};Tl.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var ym=class{constructor(e){e instanceof zg.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new zg.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Hr.Emitter,this._onDidChange=new Hr.Emitter,this._onDidSave=new Hr.Emitter,this._onDidClose=new Hr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Tl,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let l=[],u=[],f=[],m=[];if(c.cells!==void 0){let S=c.cells;if(S.structure!==void 0){let T=S.structure.array;if(o.cells.splice(T.start,T.deleteCount,...T.cells!==void 0?T.cells:[]),S.structure.didOpen!==void 0)for(let y of S.structure.didOpen)r.openTextDocument({textDocument:y}),l.push(y.uri);if(S.structure.didClose)for(let y of S.structure.didClose)r.closeTextDocument({textDocument:y}),u.push(y.uri)}if(S.data!==void 0){let T=new Map(S.data.map(y=>[y.document,y]));for(let y=0;y<=o.cells.length;y++){let $=T.get(o.cells[y].document);if($!==void 0){let D=o.cells.splice(y,1,$);if(f.push({old:D[0],new:$}),T.delete($.document),T.size===0)break}}}if(S.textContent!==void 0)for(let T of S.textContent)r.changeTextDocument({textDocument:T.document,contentChanges:T.changes}),m.push(T.document.uri)}this.updateCellMap(o);let v={notebookDocument:o};a&&(v.metadata={old:s,new:o.metadata});let A=[];for(let S of l)A.push(this.getNotebookCell(S));let C=[];for(let S of u)C.push(this.getNotebookCell(S));let N=[];for(let S of m)N.push(this.getNotebookCell(S));(A.length>0||C.length>0||f.length>0||N.length>0)&&(v.cells={added:A,removed:C,changed:{data:f,textContent:N}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Hr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Jo.NotebookDocuments=ym});var Tm=H(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.thenable=kt.typedArray=kt.stringArray=kt.array=kt.func=kt.error=kt.number=kt.string=kt.boolean=void 0;function R$(t){return t===!0||t===!1}kt.boolean=R$;function Vg(t){return typeof t=="string"||t instanceof String}kt.string=Vg;function b$(t){return typeof t=="number"||t instanceof Number}kt.number=b$;function A$(t){return t instanceof Error}kt.error=A$;function Xg(t){return typeof t=="function"}kt.func=Xg;function Yg(t){return Array.isArray(t)}kt.array=Yg;function C$(t){return Yg(t)&&t.every(e=>Vg(e))}kt.stringArray=C$;function S$(t,e){return Array.isArray(t)&&t.every(e)}kt.typedArray=S$;function w$(t){return t&&Xg(t.then)}kt.thenable=w$});var vm=H(Kr=>{"use strict";Object.defineProperty(Kr,"__esModule",{value:!0});Kr.generateUuid=Kr.parse=Kr.isUUID=Kr.v4=Kr.empty=void 0;var Ua=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},qa=class t extends Ua{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};qa._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];qa._timeHighBits=["8","9","a","b"];Kr.empty=new Ua("00000000-0000-0000-0000-000000000000");function Jg(){return new qa}Kr.v4=Jg;var k$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function Qg(t){return k$.test(t)}Kr.isUUID=Qg;function E$(t){if(!Qg(t))throw new Error("invalid uuid");return new Ua(t)}Kr.parse=E$;function $$(){return Jg().asHex()}Kr.generateUuid=$$});var Zg=H(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.attachPartialResult=Ei.ProgressFeature=Ei.attachWorkDone=void 0;var ki=wt(),N$=vm(),lo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,{kind:"end"})}};lo.Instances=new Map;var vl=class extends lo{constructor(e,r){super(e,r),this._source=new ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ga=class{constructor(){}begin(){}report(){}done(){}},xl=class extends Ga{constructor(){super(),this._source=new ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function _$(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ga;let r=e.workDoneToken;return delete e.workDoneToken,new lo(t,r)}Ei.attachWorkDone=_$;var P$=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(ki.WorkDoneProgressCancelNotification.type,r=>{let n=lo.Instances.get(r.token);(n instanceof vl||n instanceof xl)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ga:new lo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,N$.generateUuid)();return this.connection.sendRequest(ki.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new vl(this.connection,e))}else return Promise.resolve(new xl)}};Ei.ProgressFeature=P$;var xm;(function(t){t.type=new ki.ProgressType})(xm||(xm={}));var Rm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(xm.type,this._token,e)}};function I$(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new Rm(t,r)}Ei.attachPartialResult=I$});var eT=H(Rl=>{"use strict";Object.defineProperty(Rl,"__esModule",{value:!0});Rl.ConfigurationFeature=void 0;var D$=wt(),O$=Tm(),L$=t=>class extends t{getConfiguration(e){return e?O$.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(D$.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Rl.ConfigurationFeature=L$});var tT=H(Al=>{"use strict";Object.defineProperty(Al,"__esModule",{value:!0});Al.WorkspaceFoldersFeature=void 0;var bl=wt(),M$=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new bl.Emitter,this.connection.onNotification(bl.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(bl.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(bl.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Al.WorkspaceFoldersFeature=M$});var rT=H(Cl=>{"use strict";Object.defineProperty(Cl,"__esModule",{value:!0});Cl.CallHierarchyFeature=void 0;var bm=wt(),F$=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(bm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=bm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=bm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Cl.CallHierarchyFeature=F$});var nT=H(Sl=>{"use strict";Object.defineProperty(Sl,"__esModule",{value:!0});Sl.ShowDocumentFeature=void 0;var U$=wt(),q$=t=>class extends t{showDocument(e){return this.connection.sendRequest(U$.ShowDocumentRequest.type,e)}};Sl.ShowDocumentFeature=q$});var iT=H(wl=>{"use strict";Object.defineProperty(wl,"__esModule",{value:!0});wl.FileOperationsFeature=void 0;var Qo=wt(),G$=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Qo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Qo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Qo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Qo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Qo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Qo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};wl.FileOperationsFeature=G$});var oT=H(kl=>{"use strict";Object.defineProperty(kl,"__esModule",{value:!0});kl.LinkedEditingRangeFeature=void 0;var j$=wt(),H$=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(j$.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};kl.LinkedEditingRangeFeature=H$});var sT=H(El=>{"use strict";Object.defineProperty(El,"__esModule",{value:!0});El.TypeHierarchyFeature=void 0;var Am=wt(),K$=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Am.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Am.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Am.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};El.TypeHierarchyFeature=K$});var cT=H($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.InlineValueFeature=void 0;var aT=wt(),W$=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(aT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(aT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};$l.InlineValueFeature=W$});var lT=H(Nl=>{"use strict";Object.defineProperty(Nl,"__esModule",{value:!0});Nl.InlayHintFeature=void 0;var Cm=wt(),B$=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Cm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Cm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Cm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Nl.InlayHintFeature=B$});var uT=H(_l=>{"use strict";Object.defineProperty(_l,"__esModule",{value:!0});_l.DiagnosticFeature=void 0;var ja=wt(),z$=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(ja.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(ja.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ja.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(ja.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ja.WorkspaceDiagnosticRequest.partialResult,r)))}}};_l.DiagnosticFeature=z$});var fT=H(Pl=>{"use strict";Object.defineProperty(Pl,"__esModule",{value:!0});Pl.MonikerFeature=void 0;var V$=wt(),X$=t=>class extends t{get moniker(){return{on:e=>{let r=V$.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Pl.MonikerFeature=X$});var CT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var U=wt(),Wr=Tm(),wm=vm(),te=Zg(),Y$=eT(),J$=tT(),Q$=rT(),Z$=pm(),eN=nT(),tN=iT(),rN=oT(),nN=sT(),iN=cT(),oN=lT(),sN=uT(),aN=gm(),cN=fT();function Sm(t){if(t!==null)return t}var km=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=km;var Il=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},Em=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Sm)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Sm)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Sm)}},dT=(0,eN.ShowDocumentFeature)((0,te.ProgressFeature)(Em)),lN;(function(t){function e(){return new Dl}t.create=e})(lN=he.BulkRegistration||(he.BulkRegistration={}));var Dl=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Wr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=wm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},uN;(function(t){function e(){return new Ha(void 0,[])}t.create=e})(uN=he.BulkUnregistration||(he.BulkUnregistration={}));var Ha=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Wr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Ol=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Dl?this.registerMany(e):e instanceof Ha?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Wr.string(r)?r:r.method,o=wm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Wr.string(e)?e:e.method,i=wm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new Ha(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},$m=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},pT=(0,tN.FileOperationsFeature)((0,J$.WorkspaceFoldersFeature)((0,Y$.ConfigurationFeature)($m))),Ll=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Ml=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Fl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Fl;var mT=(0,cN.MonikerFeature)((0,sN.DiagnosticFeature)((0,oN.InlayHintFeature)((0,iN.InlineValueFeature)((0,nN.TypeHierarchyFeature)((0,rN.LinkedEditingRangeFeature)((0,Z$.SemanticTokensFeature)((0,Q$.CallHierarchyFeature)(Fl)))))))),Ul=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=Ul;var hT=(0,aN.NotebookSyncFeature)(Ul);function yT(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=yT;function gT(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=gT;function TT(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=TT;function vT(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=vT;function xT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=xT;function RT(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=RT;function bT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=bT;function AT(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=AT;function fN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,yT),tracer:r(t.tracer,e.tracer,TT),telemetry:r(t.telemetry,e.telemetry,gT),client:r(t.client,e.client,vT),window:r(t.window,e.window,xT),workspace:r(t.workspace,e.workspace,RT),languages:r(t.languages,e.languages,bT),notebooks:r(t.notebooks,e.notebooks,AT)}}he.combineFeatures=fN;function dN(t,e,r){let n=r&&r.console?new(r.console(Il)):new Il,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Ll)):new Ll,s=r&&r.telemetry?new(r.telemetry(Ml)):new Ml,a=r&&r.client?new(r.client(Ol)):new Ol,c=r&&r.window?new(r.window(dT)):new dT,l=r&&r.workspace?new(r.workspace(pT)):new pT,u=r&&r.languages?new(r.languages(mT)):new mT,f=r&&r.notebooks?new(r.notebooks(hT)):new hT,m=[n,o,s,a,c,l,u,f];function v(T){return T instanceof Promise?T:Wr.thenable(T)?new Promise((y,$)=>{T.then(D=>y(D),D=>$(D))}):Promise.resolve(T)}let A,C,N,S={listen:()=>i.listen(),sendRequest:(T,...y)=>i.sendRequest(Wr.string(T)?T:T.method,...y),onRequest:(T,y)=>i.onRequest(T,y),sendNotification:(T,y)=>{let $=Wr.string(T)?T:T.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,y)},onNotification:(T,y)=>i.onNotification(T,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:T=>(C=T,{dispose:()=>{C=void 0}}),onInitialized:T=>i.onNotification(U.InitializedNotification.type,T),onShutdown:T=>(A=T,{dispose:()=>{A=void 0}}),onExit:T=>(N=T,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return l},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:T=>i.onNotification(U.DidChangeConfigurationNotification.type,T),onDidChangeWatchedFiles:T=>i.onNotification(U.DidChangeWatchedFilesNotification.type,T),__textDocumentSync:void 0,onDidOpenTextDocument:T=>i.onNotification(U.DidOpenTextDocumentNotification.type,T),onDidChangeTextDocument:T=>i.onNotification(U.DidChangeTextDocumentNotification.type,T),onDidCloseTextDocument:T=>i.onNotification(U.DidCloseTextDocumentNotification.type,T),onWillSaveTextDocument:T=>i.onNotification(U.WillSaveTextDocumentNotification.type,T),onWillSaveTextDocumentWaitUntil:T=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,T),onDidSaveTextDocument:T=>i.onNotification(U.DidSaveTextDocumentNotification.type,T),sendDiagnostics:T=>i.sendNotification(U.PublishDiagnosticsNotification.type,T),onHover:T=>i.onRequest(U.HoverRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onCompletion:T=>i.onRequest(U.CompletionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCompletionResolve:T=>i.onRequest(U.CompletionResolveRequest.type,T),onSignatureHelp:T=>i.onRequest(U.SignatureHelpRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDeclaration:T=>i.onRequest(U.DeclarationRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDefinition:T=>i.onRequest(U.DefinitionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onTypeDefinition:T=>i.onRequest(U.TypeDefinitionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onImplementation:T=>i.onRequest(U.ImplementationRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onReferences:T=>i.onRequest(U.ReferencesRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentHighlight:T=>i.onRequest(U.DocumentHighlightRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentSymbol:T=>i.onRequest(U.DocumentSymbolRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbol:T=>i.onRequest(U.WorkspaceSymbolRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:T=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,T),onCodeAction:T=>i.onRequest(U.CodeActionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeActionResolve:T=>i.onRequest(U.CodeActionResolveRequest.type,(y,$)=>T(y,$)),onCodeLens:T=>i.onRequest(U.CodeLensRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeLensResolve:T=>i.onRequest(U.CodeLensResolveRequest.type,(y,$)=>T(y,$)),onDocumentFormatting:T=>i.onRequest(U.DocumentFormattingRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:T=>i.onRequest(U.DocumentRangeFormattingRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:T=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(y,$)=>T(y,$)),onRenameRequest:T=>i.onRequest(U.RenameRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onPrepareRename:T=>i.onRequest(U.PrepareRenameRequest.type,(y,$)=>T(y,$)),onDocumentLinks:T=>i.onRequest(U.DocumentLinkRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentLinkResolve:T=>i.onRequest(U.DocumentLinkResolveRequest.type,(y,$)=>T(y,$)),onDocumentColor:T=>i.onRequest(U.DocumentColorRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onColorPresentation:T=>i.onRequest(U.ColorPresentationRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onFoldingRanges:T=>i.onRequest(U.FoldingRangeRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onSelectionRanges:T=>i.onRequest(U.SelectionRangeRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onExecuteCommand:T=>i.onRequest(U.ExecuteCommandRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let T of m)T.attach(S);return i.onRequest(U.InitializeRequest.type,T=>{e.initialize(T),Wr.string(T.trace)&&(o.trace=U.Trace.fromString(T.trace));for(let y of m)y.initialize(T.capabilities);if(C){let y=C(T,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,T),void 0);return v(y).then($=>{if($ instanceof U.ResponseError)return $;let D=$;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Wr.number(S.__textDocumentSync)?S.__textDocumentSync:U.TextDocumentSyncKind.None:!Wr.number(X.textDocumentSync)&&!Wr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Wr.number(S.__textDocumentSync)?S.__textDocumentSync:U.TextDocumentSyncKind.None);for(let ge of m)ge.fillServerCapabilities(X);return D})}else{let y={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,A)return A(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,T=>{o.trace=U.Trace.fromString(T.value)}),S}he.createConnection=dN});var Nm=H(zt=>{"use strict";var pN=zt&&zt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ST=zt&&zt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&pN(e,t,r)};Object.defineProperty(zt,"__esModule",{value:!0});zt.ProposedFeatures=zt.NotebookDocuments=zt.TextDocuments=zt.SemanticTokensBuilder=void 0;var mN=pm();Object.defineProperty(zt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return mN.SemanticTokensBuilder}});ST(wt(),zt);var hN=hm();Object.defineProperty(zt,"TextDocuments",{enumerable:!0,get:function(){return hN.TextDocuments}});var yN=gm();Object.defineProperty(zt,"NotebookDocuments",{enumerable:!0,get:function(){return yN.NotebookDocuments}});ST(CT(),zt);var gN;(function(t){t.all={__brand:"features"}})(gN=zt.ProposedFeatures||(zt.ProposedFeatures={}))});var kT=H((Ij,wT)=>{"use strict";wT.exports=wt()});var Ae=H(wn=>{"use strict";var TN=wn&&wn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),$T=wn&&wn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&TN(e,t,r)};Object.defineProperty(wn,"__esModule",{value:!0});wn.createConnection=void 0;var ql=Nm();$T(kT(),wn);$T(Nm(),wn);var ET=!1,vN={initialize:t=>{},get shutdownReceived(){return ET},set shutdownReceived(t){ET=t},exit:t=>{}};function xN(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),ql.ConnectionStrategy.is(t)||ql.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let c=l=>(0,ql.createProtocolConnection)(o,s,l,a);return(0,ql.createConnection)(c,vN,i)}wn.createConnection=xN});var KS=H((rce,HS)=>{"use strict";HS.exports=Ae()});var jS=de(Ae(),1);var Gl=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=_T(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),l=this._lineOffsets,u=NT(n.text,!1,o);if(c-a===u.length)for(let m=0,v=u.length;m<v;m++)l[m+a+1]=u[m];else u.length<1e4?l.splice(a+1,c-a,...u):this._lineOffsets=l=l.slice(0,a+1).concat(u,l.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,v=l.length;m<v;m++)l[m]=l[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=NT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},Zo;(function(t){function e(i,o,s,a){return new Gl(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Gl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=_m(o.map(RN),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),c=0,l=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&l.push(s.substring(c,f)),u.newText.length&&l.push(u.newText),c=i.offsetAt(u.range.end)}return l.push(s.substr(c)),l.join("")}t.applyEdits=n})(Zo||(Zo={}));function _m(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);_m(n,e),_m(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function NT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function _T(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function RN(t){let e=_T(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function Et(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Qn(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function PT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function es(t){return typeof t=="object"&&t!==null&&Et(t.container)&&Qn(t.reference)&&typeof t.message=="string"}var uo=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return Et(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function kn(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function fo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function IT(t){return kn(t)&&typeof t.fullText=="string"}var Pr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return mr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=bN(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?mr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return mr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(jl(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return mr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(jl(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return mr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?mr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function bN(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function jl(t){return!!t&&typeof t[Symbol.iterator]=="function"}var ts=new Pr(()=>{},()=>mr),mr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Pr)return e;if(jl(e))return new Pr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Pr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:mr)}return t.length>1?new Pr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];jl(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return mr}):ts}var Br=class extends Pr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return mr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Ka;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Ka=Ka||(Ka={}));function Pm(t){return new Br(t,e=>kn(e)?e.content:[],{includeRoot:!0})}function LT(t){return Pm(t).filter(fo)}function MT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Wa(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function ir(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var Zn;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Zn=Zn||(Zn={}));function AN(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Zn.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Zn.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Zn.Inside:r?Zn.OverlapBack:Zn.OverlapFront}function Hl(t,e){return AN(t,e)>Zn.After}var Im=/^[\w\p{L}]$/u;function It(t,e,r=Im){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return br(t,e)}}function FT(t,e){if(t){let r=CN(t,!0);if(r&&DT(r,e))return r;if(IT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(DT(o,e))return o}}}}function DT(t,e){return fo(t)&&e.includes(t.tokenType.name)}function br(t,e){if(fo(t))return t;if(kn(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return br(o,e)}if(r===n)return br(t.content[r],e)}}function CN(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function UT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function qT(t,e){let r=SN(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function SN(t,e){let r=OT(t),n=OT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function OT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function po(t,e,r,n){let i=[t,e,r,n].reduce(KT,{});return HT(i)}var Dm=Symbol("isProxy");function Kl(t){if(t&&t[Dm])for(let e of Object.values(t))Kl(e);return t}function HT(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>jT(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(jT(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Dm]});return r[Dm]=!0,r}var GT=Symbol();function jT(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===GT)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=GT;try{t[e]=typeof i=="function"?i(n):HT(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function KT(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=KT(i,n):t[r]=n}}return t}var Le=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ka.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Om="AbstractRule";var mo="AbstractType";var wN="Condition";var kN="TypeDefinition";var Lm="AbstractElement";function rs(t){return le.isInstance(t,Lm)}var WT="ArrayType";function ho(t){return le.isInstance(t,WT)}var BT="Conjunction";function zT(t){return le.isInstance(t,BT)}var VT="Disjunction";function XT(t){return le.isInstance(t,VT)}var YT="Grammar";function ns(t){return le.isInstance(t,YT)}var EN="GrammarImport";function Wl(t){return le.isInstance(t,EN)}var $N="InferredType";function is(t){return le.isInstance(t,$N)}var za="Interface";function Ar(t){return le.isInstance(t,za)}var JT="LiteralCondition";function QT(t){return le.isInstance(t,JT)}var ZT="Negation";function ev(t){return le.isInstance(t,ZT)}var tv="Parameter";function rv(t){return le.isInstance(t,tv)}var nv="ParameterReference";function os(t){return le.isInstance(t,nv)}var iv="ParserRule";function K(t){return le.isInstance(t,iv)}var ov="ReferenceType";function yo(t){return le.isInstance(t,ov)}var NN="ReturnType";function ss(t){return le.isInstance(t,NN)}var sv="SimpleType";function or(t){return le.isInstance(t,sv)}var Mm="TerminalRule";function Ce(t){return le.isInstance(t,Mm)}var Va="Type";function Mt(t){return le.isInstance(t,Va)}var _N="TypeAttribute";function Bl(t){return le.isInstance(t,_N)}var av="UnionType";function zr(t){return le.isInstance(t,av)}var cv="Action";function Ne(t){return le.isInstance(t,cv)}var lv="Alternatives";function Ir(t){return le.isInstance(t,lv)}var uv="Assignment";function Re(t){return le.isInstance(t,uv)}var fv="CharacterRange";function zl(t){return le.isInstance(t,fv)}var dv="CrossReference";function Vt(t){return le.isInstance(t,dv)}var pv="Group";function Ft(t){return le.isInstance(t,pv)}var mv="Keyword";function dt(t){return le.isInstance(t,mv)}var hv="NegatedToken";function yv(t){return le.isInstance(t,hv)}var gv="RegexToken";function Tv(t){return le.isInstance(t,gv)}var vv="RuleCall";function _e(t){return le.isInstance(t,vv)}var xv="TerminalAlternatives";function Rv(t){return le.isInstance(t,xv)}var bv="TerminalGroup";function Av(t){return le.isInstance(t,bv)}var Cv="TerminalRuleCall";function Vl(t){return le.isInstance(t,Cv)}var Sv="UnorderedGroup";function Dr(t){return le.isInstance(t,Sv)}var wv="UntilToken";function kv(t){return le.isInstance(t,wv)}var Ev="Wildcard";function $v(t){return le.isInstance(t,Ev)}var Ba=class extends uo{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case cv:return this.isSubtype(Lm,r)||this.isSubtype(mo,r);case lv:case uv:case fv:case dv:case pv:case mv:case hv:case gv:case vv:case xv:case bv:case Cv:case Sv:case wv:case Ev:return this.isSubtype(Lm,r);case WT:case ov:case sv:case av:return this.isSubtype(kN,r);case BT:case VT:case JT:case ZT:case nv:return this.isSubtype(wN,r);case za:case Va:return this.isSubtype(mo,r);case iv:return this.isSubtype(Om,r)||this.isSubtype(mo,r);case Mm:return this.isSubtype(Om,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return mo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Om;case"Grammar:usedGrammars":return YT;case"NamedArgument:parameter":case"ParameterReference:parameter":return tv;case"TerminalRuleCall:rule":return Mm;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Ba;function Nv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{Et(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):Et(r)&&(r.$container=t,r.$containerProperty=e))}function Pe(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=Xl(t).$document;if(!r)throw new Error("AST node has no document.");return r}function Xl(t){for(;t.$container;)t=t.$container;return t}function $i(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(Et(o)){if(n.keyIndex++,Fm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(Et(a)&&Fm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return mr})}function Qe(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Br(t,r=>$i(r,e))}function ti(t,e){if(t){if(e?.range&&!Fm(t,e.range))return new Br(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Br(t,r=>$i(r,e),{includeRoot:!0})}function Fm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Hl(n,e):!1}function Yl(t){return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(Qn(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Qn(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return mr})}function _v(t){var e,r;if(t){if("astNode"in t)return DN(t);if(Array.isArray(t))return t.reduce(Pv,void 0);{let n=t,i=PN(n)?IN((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return as(n,i)}}else return}function PN(t){return typeof t<"u"&&"element"in t&&"text"in t}function IN(t){try{return ne(t).uri.toString()}catch{return}}function DN(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return as(s,Um(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(Pv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let c=a(s.assignments[i]);return c&&as(c,Um(n))}else if(n.$cstNode){let c=a(Ni(n.$cstNode,i));return c&&as(c,Um(n))}else return}}}function Um(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Br(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function as(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Pv(t,e){var r,n;if(t){if(!e)return t&&as(t)}else return e&&as(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),c=a-s,l={offset:s,end:a,length:c};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let u=t.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;l.fileURI=m}return l}var qm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=ON(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function ON(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function Iv(t,e){let r=new qm(e),n=r.pushTraceRegion(void 0);Dv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Dv(t,e){typeof t=="string"?LN(t,e):t instanceof cs?MN(t,e):t instanceof Xt?Mv(t,e):t instanceof _i&&FN(t,e)}function Ov(t,e){return typeof t=="string"?t.length!==0:t instanceof Xt?t.contents.some(r=>Ov(r,e)):t instanceof _i?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function LN(t,e){t&&(e.pendingIndent&&Lv(e,!1),e.append(t))}function Lv(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Mv(t,e){let r,n=_v(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Dv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function MN(t,e){var r;if(Ov(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Mv(t,e)}finally{e.decreaseIndent()}}}function FN(t,e){t.ifNotEmpty&&!UN(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Lv(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function UN(t){return t.trimStart()!==""}var nH=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Xa=/\r?\n/g,qN=/\S|$/;function Fv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(qN)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function jm(t,...e){let r=GN(t),n=jN(t,e,r);return KN(n)}function Gv(t,e,r){return(n,...i)=>Hm(t,e,r)(jm(n,...i))}function GN(t){let e=t.join("_").split(Xa),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Fv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function jN(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((l,u)=>{s.push(...l.split(Xa).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(u===0?(f,m,v)=>v===0?n?[]:[m]:v===1&&f.length===0?[m]:f.concat(Jl,m):(f,m,v)=>v===0?[m]:f.concat(Jl,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(Ya(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?jv:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===Jl?s.slice(0,a-2):s.slice(0,a-1):s}var Jl={isNewLine:!0},jv={isUndefinedSegment:!0},qv=t=>t===Jl,Gm=t=>t===jv,HN=t=>t.content!==void 0;function KN(t){return t.reduce((r,n,i)=>Gm(n)?r:qv(n)?{node:i!==0&&(Gm(t[i-1])||Ya(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Gm(t[i-2])||Ya(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||qv(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=HN(n)?n.content:n,c;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>c=l.append(a)}):r.node.append(a),indented:c??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Xt}).node}var Uv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function Ya(t){return t instanceof Xt||t instanceof cs||t instanceof _i}function ls(t,e){return Ya(t)?Iv(t,e).text:String(t)}var Xt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(Et(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(ot)}appendNewLineIf(e){return e?this.append(ot):this}appendNewLineIfNotEmpty(){return this.append(WN)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(jm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new cs(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(Gv(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function Hm(t,e,r){return n=>n instanceof Xt&&n.tracedSource===void 0?n.trace(t,e,r):new Xt().trace(t,e,r).append(n)}var cs=class extends Xt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},_i=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Uv,this.ifNotEmpty=r}},ot=new _i,WN=new _i(void 0,!0);function ri(t){return"referenceType"in t}function ni(t){return"elementType"in t}function Dt(t){return"types"in t}function Bm(t){if(Dt(t)){let e=[];for(let r of t.types)e.push(...Bm(r));return e}else return[t]}function Or(t){return"value"in t}function Lr(t){return"primitive"in t}function En(t){return"string"in t}function fn(t){return t&&"type"in t}function pn(t){return t&&"properties"in t}var Zl=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Xt;return r.append(`export type ${this.name} = ${dn(this.type,"AstType")};`,ot),e&&(r.append(ot),Wv(r,this.name)),this.dataType&&BN(r,this),ls(r)}toDeclaredTypesString(e){let r=new Xt;return r.append(`type ${zm(this.name,e)} = ${dn(this.type,"DeclaredType")};`,ot),ls(r)}},us=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=pn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Xt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?go([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,ot),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${go([...this.containerTypes].map(s=>s.name)).join(" | ")};`,ot),this.typeNames.size>0&&o.append(`readonly $type: ${go([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,ot),Hv(o,this.properties,"AstType")}),r.append("}",ot),e&&(r.append(ot),Wv(r,this.name)),ls(r)}toDeclaredTypesString(e){let r=new Xt,n=zm(this.name,e),i=go(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,ot),r.indent(o=>Hv(o,this.properties,"DeclaredType",e)),r.append("}",ot),ls(r)}},eu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function Qa(t,e){return Pi(t,e,new Map)}function Pi(t,e,r){let n=`${Ja(t)}\xBB${Ja(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Dt(t)?i=t.types.every(o=>Pi(o,e,r)):Dt(e)?i=e.types.some(o=>Pi(t,o,r)):Or(e)&&fn(e.value)?Or(t)&&fn(t.value)&&e.value.name===t.value.name?i=!0:i=Pi(t,e.value.type,r):ri(t)?i=ri(e)&&Pi(t.referenceType,e.referenceType,r):ni(t)?i=ni(e)&&Pi(t.elementType,e.elementType,r):Or(t)?fn(t.value)?i=Pi(t.value.type,e,r):Or(e)?fn(e.value)?i=Pi(t,e.value.type,r):i=Kv(t.value,e.value,new Set):i=!1:Lr(t)?i=Lr(e)&&t.primitive===e.primitive:En(t)&&(i=Lr(e)&&e.primitive==="string"||En(e)&&e.string===t.string),i&&r.set(n,i)),i}function Kv(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(pn(i)&&Kv(i,e,r))return!0;return!1}function Ja(t){if(ri(t))return`@(${Ja(t.referenceType)})}`;if(ni(t))return`(${Ja(t.elementType)})[]`;if(Dt(t)){let e=t.types.map(r=>Ja(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Or(t))return`Value<${t.value.name}>`;if(Lr(t))return t.primitive;if(En(t))return`'${t.string}'`}throw new Error("Invalid type")}function dn(t,e="AstType"){if(ri(t)){let r=dn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Km(t.referenceType,r)}`}else if(ni(t)){let r=dn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Km(t.elementType,r)}[]`}else if(Dt(t)){let r=t.types.map(n=>Km(n,dn(n,e)));return go(r).join(" | ")}else{if(Or(t))return t.value.name;if(Lr(t))return t.primitive;if(En(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function Km(t,e){return Dt(t)&&(e=`(${e})`),e}function Hv(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:zm(o.name,n),a=o.optional&&!tu(o.type),c=dn(o.type,r);return`${s}${a?"?":""}: ${c}`}go(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),ot))}function tu(t){return ni(t)?!0:ri(t)?!1:Dt(t)?t.types.every(e=>tu(e)):Lr(t)?t.primitive==="boolean":!1}function Wv(t,e){t.append(`export const ${e} = '${e}';`,ot),t.append(ot),t.append(`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,ot)),t.append("}",ot)}function BN(t,e){switch(e.dataType){case"string":if(Wm(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=Bv(e.type),i=zv(e.type);if(r.length===0&&n.length===0&&i.length===0)Ql(t,e.name,`typeof item === '${e.dataType}'`);else{let o=zN(r,n,i);Ql(t,e.name,o)}}break;case"number":case"boolean":case"bigint":Ql(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":Ql(t,e.name,"item instanceof Date");break;default:return}}function Wm(t){let e=!0;if(Lr(t))return t.primitive==="string";if(En(t))return!0;if(Dt(t)){for(let r of t.types)if(Or(r))if(fn(r.value)){if(!Wm(r.value.type))return!1}else return!1;else if(Lr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Dt(r))e=Wm(r);else if(!En(r))return!1}else return!1;return e}function zN(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function zm(t,e){return e.has(t)?`^${t}`:t}function Bv(t){let e=[];if(En(t))return[t.string];if(Dt(t))for(let r of t.types)En(r)?e.push(r.string):Dt(r)&&e.push(...Bv(r));return e}function zv(t){let e=[];if(Lr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Dt(t))for(let r of t.types)Lr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Dt(r)&&e.push(...zv(r));return e}function Ql(t,e,r){t.append(ot,`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(n=>n.append(`return ${r};`,ot)),t.append("}",ot)}function go(t,e){return Array.from(new Set(t)).sort(e)}function Vm(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);Ar(c)?(i.add(c),Vm(c,e,r,n).forEach(u=>i.add(u))):c&&Mt(c.$container)&&i.add(c.$container)}),i}function Za(t){let e=new Set;if(Ar(t))e.add(t),t.superTypes.forEach(r=>{if(Ar(r.ref)){e.add(r.ref);let n=Za(r.ref);for(let i of n)e.add(i)}});else if(Mt(t)){let r=Vv(t.type);for(let n of r){let i=Za(n);for(let o of i)e.add(o)}}return e}function Vv(t){var e;if(zr(t))return t.types.flatMap(r=>Vv(r));if(or(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Mt(r)||Ar(r))return[r]}return[]}function Xm(t,e){return t.interfaces.concat(e.interfaces)}function nu(t){return t.interfaces.concat(t.unions)}function Xv(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function Yv(t){return ru(t,new Set)}function ru(t,e){if(e.has(t))return[];if(e.add(t),Dt(t))return t.types.flatMap(r=>ru(r,e));if(Or(t)){let r=t.value;return"type"in r?ru(r.type,e):[r.name]}else if(ni(t))return ru(t.elementType,e);return[]}function ec(t){return typeof t.name=="string"}var fs=class{getName(e){if(ec(e))return e.name}getNameNode(e){return Yt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function iu(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function ds(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function To(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function tc(){throw Error("Internal Error - Should never get here!")}function Ym(t){return t.type==="Character"}var rc=[];for(let t=J("0");t<=J("9");t++)rc.push(t);var nc=[J("_")].concat(rc);for(let t=J("a");t<=J("z");t++)nc.push(t);for(let t=J("A");t<=J("Z");t++)nc.push(t);var Jm=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var VN=/[0-9a-fA-F]/,ou=/[0-9]/,XN=/[1-9]/,vo=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":ds(n,"global");break;case"i":ds(n,"ignoreCase");break;case"m":ds(n,"multiLine");break;case"u":ds(n,"unicode");break;case"y":ds(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}To(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return tc()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;To(r);break}if(!(e===!0&&r===void 0)&&To(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),To(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):tc()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=rc;break;case"D":e=rc,r=!0;break;case"s":e=Jm;break;case"S":e=Jm,r=!0;break;case"w":e=nc;break;case"W":e=nc,r=!0;break}return To(e)?{type:"Set",value:e,complement:r}:tc()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return To(e)?{type:"Character",value:e}:tc()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(Ym(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(Ym(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else iu(n.value,e),e.push(J("-")),iu(o.value,e)}else iu(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(XN.test(e)===!1)throw Error("Expecting a positive integer");for(;ou.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(ou.test(e)===!1)throw Error("Expecting an integer");for(;ou.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return ou.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(VN.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var $n=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var YN=new vo,Zm=class extends $n{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=ii(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},Qm=new Zm;function Jv(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),Qm.reset(t),Qm.visit(YN.pattern(t)),Qm.multiline}catch{return!1}}function eh(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function ii(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Qv(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:ii(e)).join("")}function Zv(t,e){let r=JN(t),n=e.match(r);return!!n&&n[0].length>0}function JN(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(l){o+=r.substr(n,l),n+=l}function c(l){o+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?r[n+2]==="{"?c(r.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(r.indexOf("}",n)-n+1):c(2);break;case"k":c(r.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):c(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),t.flags)}var rh={};uw(rh,{URI:()=>th,Utils:()=>QN});var ex;(()=>{"use strict";var t={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,l){for(var u,f="",m=0,v=-1,A=0,C=0;C<=c.length;++C){if(C<c.length)u=c.charCodeAt(C);else{if(u===47)break;u=47}if(u===47){if(!(v===C-1||A===1))if(v!==C-1&&A===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),v=C,A=0;continue}}else if(f.length===2||f.length===1){f="",m=0,v=C,A=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(v+1,C):f=c.slice(v+1,C),m=C-v-1;v=C,A=0}else u===46&&A!==-1?++A:A=-1}return f}var a={resolve:function(){for(var c,l="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(l=m+"/"+l,u=m.charCodeAt(0)===47)}return l=s(l,!u),u?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(c){if(o(c),c.length===0)return".";var l=c.charCodeAt(0)===47,u=c.charCodeAt(c.length-1)===47;return(c=s(c,!l)).length!==0||l||(c="."),c.length>0&&u&&(c+="/"),l?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,l=0;l<arguments.length;++l){var u=arguments[l];o(u),u.length>0&&(c===void 0?c=u:c+="/"+u)}return c===void 0?".":a.normalize(c)},relative:function(c,l){if(o(c),o(l),c===l||(c=a.resolve(c))===(l=a.resolve(l)))return"";for(var u=1;u<c.length&&c.charCodeAt(u)===47;++u);for(var f=c.length,m=f-u,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var A=l.length-v,C=m<A?m:A,N=-1,S=0;S<=C;++S){if(S===C){if(A>C){if(l.charCodeAt(v+S)===47)return l.slice(v+S+1);if(S===0)return l.slice(v+S)}else m>C&&(c.charCodeAt(u+S)===47?N=S:S===0&&(N=0));break}var T=c.charCodeAt(u+S);if(T!==l.charCodeAt(v+S))break;T===47&&(N=S)}var y="";for(S=u+N+1;S<=f;++S)S!==f&&c.charCodeAt(S)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+l.slice(v+N):(v+=N,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var l=c.charCodeAt(0),u=l===47,f=-1,m=!0,v=c.length-1;v>=1;--v)if((l=c.charCodeAt(v))===47){if(!m){f=v;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":c.slice(0,f)},basename:function(c,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(c);var u,f=0,m=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=c.length){if(l.length===c.length&&l===c)return"";var A=l.length-1,C=-1;for(u=c.length-1;u>=0;--u){var N=c.charCodeAt(u);if(N===47){if(!v){f=u+1;break}}else C===-1&&(v=!1,C=u+1),A>=0&&(N===l.charCodeAt(A)?--A==-1&&(m=u):(A=-1,m=C))}return f===m?m=C:m===-1&&(m=c.length),c.slice(f,m)}for(u=c.length-1;u>=0;--u)if(c.charCodeAt(u)===47){if(!v){f=u+1;break}}else m===-1&&(v=!1,m=u+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var l=-1,u=0,f=-1,m=!0,v=0,A=c.length-1;A>=0;--A){var C=c.charCodeAt(A);if(C!==47)f===-1&&(m=!1,f=A+1),C===46?l===-1?l=A:v!==1&&(v=1):l!==-1&&(v=-1);else if(!m){u=A+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===u+1?"":c.slice(l,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(l,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var l={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return l;var u,f=c.charCodeAt(0),m=f===47;m?(l.root="/",u=1):u=0;for(var v=-1,A=0,C=-1,N=!0,S=c.length-1,T=0;S>=u;--S)if((f=c.charCodeAt(S))!==47)C===-1&&(N=!1,C=S+1),f===46?v===-1?v=S:T!==1&&(T=1):v!==-1&&(T=-1);else if(!N){A=S+1;break}return v===-1||C===-1||T===0||T===1&&v===C-1&&v===A+1?C!==-1&&(l.base=l.name=A===0&&m?c.slice(1,C):c.slice(A,C)):(A===0&&m?(l.name=c.slice(1,v),l.base=c.slice(1,C)):(l.name=c.slice(A,v),l.base=c.slice(A,C)),l.ext=c.slice(v,C)),A>0?l.dir=c.slice(0,A-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>xt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,w){if(!M.scheme&&w)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(w){return w instanceof m||!!w&&typeof w.authority=="string"&&typeof w.fragment=="string"&&typeof w.path=="string"&&typeof w.query=="string"&&typeof w.scheme=="string"&&typeof w.fsPath=="string"&&typeof w.with=="function"&&typeof w.toString=="function"}scheme;authority;path;query;fragment;constructor(w,q,j,ce,ee,Q=!1){typeof w=="object"?(this.scheme=w.scheme||l,this.authority=w.authority||l,this.path=w.path||l,this.query=w.query||l,this.fragment=w.fragment||l):(this.scheme=function(Rt,lt){return Rt||lt?Rt:"file"}(w,Q),this.authority=q||l,this.path=function(Rt,lt){switch(Rt){case"https":case"http":case"file":lt?lt[0]!==u&&(lt=u+lt):lt=u}return lt}(this.scheme,j||l),this.query=ce||l,this.fragment=ee||l,c(this,Q))}get fsPath(){return T(this,!1)}with(w){if(!w)return this;let{scheme:q,authority:j,path:ce,query:ee,fragment:Q}=w;return q===void 0?q=this.scheme:q===null&&(q=l),j===void 0?j=this.authority:j===null&&(j=l),ce===void 0?ce=this.path:ce===null&&(ce=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),q===this.scheme&&j===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new A(q,j,ce,ee,Q)}static parse(w,q=!1){let j=f.exec(w);return j?new A(j[2]||l,X(j[4]||l),X(j[5]||l),X(j[7]||l),X(j[9]||l),q):new A(l,l,l,l,l)}static file(w){let q=l;if(i&&(w=w.replace(/\\/g,u)),w[0]===u&&w[1]===u){let j=w.indexOf(u,2);j===-1?(q=w.substring(2),w=u):(q=w.substring(2,j),w=w.substring(j)||u)}return new A("file",q,w,l,l)}static from(w){let q=new A(w.scheme,w.authority,w.path,w.query,w.fragment);return c(q,!0),q}toString(w=!1){return y(this,w)}toJSON(){return this}static revive(w){if(w){if(w instanceof m)return w;{let q=new A(w);return q._formatted=w.external,q._fsPath=w._sep===v?w.fsPath:null,q}}return w}}let v=i?1:void 0;class A extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=T(this,!1)),this._fsPath}toString(w=!1){return w?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let w={$mid:1};return this._fsPath&&(w.fsPath=this._fsPath,w._sep=v),this._formatted&&(w.external=this._formatted),this.path&&(w.path=this.path),this.scheme&&(w.scheme=this.scheme),this.authority&&(w.authority=this.authority),this.query&&(w.query=this.query),this.fragment&&(w.fragment=this.fragment),w}}let C={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,w,q){let j,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||w&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let Rt=C[Q];Rt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j+=Rt):ce===-1&&(ce=ee)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function S(M){let w;for(let q=0;q<M.length;q++){let j=M.charCodeAt(q);j===35||j===63?(w===void 0&&(w=M.substr(0,q)),w+=C[j]):w!==void 0&&(w+=M[q])}return w!==void 0?w:M}function T(M,w){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?w?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function y(M,w){let q=w?S:N,j="",{scheme:ce,authority:ee,path:Q,query:Rt,fragment:lt}=M;if(ce&&(j+=ce,j+=":"),(ee||ce==="file")&&(j+=u,j+=u),ee){let me=ee.indexOf("@");if(me!==-1){let $r=ee.substr(0,me);ee=ee.substr(me+1),me=$r.lastIndexOf(":"),me===-1?j+=q($r,!1,!1):(j+=q($r.substr(0,me),!1,!1),j+=":",j+=q($r.substr(me+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?j+=q(ee,!1,!0):(j+=q(ee.substr(0,me),!1,!0),j+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}j+=q(Q,!0,!1)}return Rt&&(j+="?",j+=q(Rt,!1,!1)),lt&&(j+="#",j+=w?lt:N(lt,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,w=>$(w)):M}var ge=r(470);let Ee=ge.posix||ge,Ht="/";var xt;(function(M){M.joinPath=function(w,...q){return w.with({path:Ee.join(w.path,...q)})},M.resolvePath=function(w,...q){let j=w.path,ce=!1;j[0]!==Ht&&(j=Ht+j,ce=!0);let ee=Ee.resolve(j,...q);return ce&&ee[0]===Ht&&!w.authority&&(ee=ee.substring(1)),w.with({path:ee})},M.dirname=function(w){if(w.path.length===0||w.path===Ht)return w;let q=Ee.dirname(w.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),w.with({path:q})},M.basename=function(w){return Ee.basename(w.path)},M.extname=function(w){return Ee.extname(w.path)}})(xt||(xt={}))})(),ex=n})();var{URI:th,Utils:QN}=ex;var oi=rh;"default"in oi&&(oi=oi.default);var Jt=oi.URI;var ve;(function(t){t.basename=oi.Utils.basename,t.dirname=oi.Utils.dirname,t.extname=oi.Utils.extname,t.joinPath=oi.Utils.joinPath,t.resolvePath=oi.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===c[l];l++);let u="../".repeat(a.length-l),f=c.slice(l).join("/");return u+f}t.relative=r})(ve=ve||(ve={}));var IH=ve.equals,DH=ve.relative;var su,tx=()=>su??(su=au(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var uu=de(so(),1);var ic=de(Yn(),1);function ZN(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var rx=0,e_=10;var nx=Symbol("OperationCancelled");function xo(t){return t===nx}async function Ze(t){if(t===ic.CancellationToken.None)return;let e=Date.now();if(e-rx>=e_&&(rx=e,await ZN()),t.isCancellationRequested)throw nx}var cu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new ic.CancellationTokenSource}lock(e){this.cancel();let r=new ic.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{xo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Mr(t){return{code:t}}var ps;(function(t){t.all=["fast","slow","built-in"]})(ps=ps||(ps={}));var lu=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(xo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function ix(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:Ro(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(mn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:Ro(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function Ro(t){if(ho(t))return{elementType:Ro(t.elementType)};if(yo(t))return{referenceType:Ro(t.referenceType)};if(zr(t))return{types:t.types.map(Ro)};if(or(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=Nn(r);if(n)return ms(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function hs(t){return"referenceType"in t}function nh(t){return"elementType"in t}function ox(t){return"types"in t}function ih(t){return"value"in t}function t_(t){return"primitive"in t}function r_(t){return"string"in t}function sx(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new us(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new Zl(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=n_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=oc(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function n_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:oc(t.type,void 0,e,r)}}function oc(t,e,r,n){if(nh(t))return{elementType:oc(t.elementType,e,r,n)};if(hs(t))return{referenceType:oc(t.referenceType,void 0,r,n)};if(ox(t))return{types:t.types.map(i=>oc(i,e,r,n))};if(r_(t))return{string:t.string};if(t_(t))return{primitive:t.primitive,regex:t.regex};if(ih(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function sh(t,e){let r=sc(t),n=sc(e);for(let i of n)i_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function i_(t,e){return t.some(r=>oh(r,e))}function oh(t,e){return nh(t)&&nh(e)?oh(t.elementType,e.elementType):hs(t)&&hs(e)?oh(t.referenceType,e.referenceType):ih(t)&&ih(e)?t.value===e.value:!1}function sc(t){return ox(t)?t.types.flatMap(e=>sc(e)):[t]}function ax(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Se;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Se=Se||(Se={}));var fu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Mr(Se.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>K(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>K(o)&&!Fr(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Mr(Se.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Fr(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!ac(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Le;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=cc(this.documents,e);for(let c of a)n(c).forEach(l=>s.add(l.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(u=>{r("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Le;for(let i of e.imports){let o=si(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[uu.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=cc(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),l=this.getDuplicateExportedRules(s,c);for(let u of l)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let l of o){let u=l.name;c===u&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of cc(this.documents,e))c.types.forEach(l=>s.add(l.name)),c.interfaces.forEach(l=>s.add(l.name));for(let c of e.rules.filter(K)){if(ac(c))continue;let l=Fr(c),u=!c.returnType&&!c.dataType,f=Nn(c);if(!l&&f&&s.has(f)===u){if((u||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)r("error",a(f,u),{node:c,property:"name",data:Mr(Se.MissingReturns)});else if(u||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Vr(c.inferredType.$cstNode,"infers");r("error",a(f,u),{node:c.inferredType,property:"name",data:{code:Se.InvalidInfers,actionSegment:ir(m)}})}}else if(l&&u){let m=Vr(c.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:Se.InvalidInfers,actionSegment:ir(m)}})}}for(let c of Qe(e).filter(Ne)){let l=this.getActionType(c);if(l){let u=!!c.inferredType,f=Nn(c);if(c.type&&f&&s.has(f)===u){let m=u?Vr(c.$cstNode,"infer"):Vr(c.$cstNode,"{");r("error",a(f,u),{node:c,property:"type",data:{code:u?Se.SuperfluousInfer:Se.MissingInfer,actionSegment:ir(m)}})}else if(l&&f&&s.has(f)&&u&&c.$cstNode){let m=Yt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),v=Vr(c.$cstNode,"{");m&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:Se.SuperfluousInfer,actionRange:{start:v.range.end,end:m.range.start}}})}}}function a(c,l){return l?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Mr(Se.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Yr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",l=new Set,u=new Set;for(let m=0;m<o.length;m++){let v=o.charAt(m);c.includes(v)?s.includes(v)&&u.add(v):l.add(v)}let f=this.getFlagRange(e);f&&(l.size>0?r("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&r("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!Ce(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Yt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Pe(e,i=>Ce(i)||K(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ce(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ce(n)&&n.fragment&&Pe(e,K)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Mr(Se.CrossRefTokenSyntax)})}checkPackageImport(e,r){si(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Mr(Se.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Mr(Se.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=ys(e,!0);for(let i of e.rules)Ce(i)&&i.hidden||ac(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[uu.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Le,i=new Set;for(let l of e.rules)Ce(l)&&l.name&&n.add(l.name,l),K(l)&&Qe(l).filter(dt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let l of e.imports){let u=cc(this.documents,l);for(let f of u)for(let m of f.rules)Ce(m)&&m.name?o.add(m.name,l):K(m)&&m.name&&Qe(m).filter(dt).forEach(A=>s.add(A.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let u=s.get(l.name);r("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:l,property:"name"})}let a=new Le;for(let l of i)for(let u of o.get(l))a.add(u,l);for(let[l,u]of a.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let c=new Le;for(let[l,u]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>c.add(m,l))}for(let[l,u]of c.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!ac(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Mr(Se.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&o_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Pe(e,K)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Xr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Mr(Se.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(os);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[uu.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(ac(e))return;let n=lx(e),i=Fr(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&_e(e.terminal)&&K(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>Vt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=Ro(n.type),o=sc(i),s=!1,a=!1;for(let c of o)hs(c)?s=!0:hs(c)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!ms(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(K(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else Ce(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!lc(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(_e(i)){let o=i.rule.ref;K(o)&&!Fr(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):K(o)&&!ux(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):Ce(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Mt(e.type.ref)&&zr(e.type.ref.type)){let n=cx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;K((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){or(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&K(e.ref)&&!Fr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=Nn(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Vt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function ac(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var o_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function cx(t){let e=[];return t.types.forEach(r=>{var n;or(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Mt(r.typeRef.ref)&&(zr(r.typeRef.ref.type)?e.push(...cx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Xr(t,e){return t==="?"||t==="*"||Ft(e)&&!!e.guardCondition}function fx(t){return t==="*"||t==="+"}function Fr(t){return dx(t,new Set)}function dx(t,e){if(e.has(t))return!0;e.add(t);for(let r of Qe(t))if(_e(r)){if(!r.rule.ref||K(r.rule.ref)&&!dx(r.rule.ref,e))return!1}else{if(Re(r))return!1;if(Ne(r))return!1}return!!t.definition}function lx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Mt(r)&&s_(r)}function s_(t){return ch(t.type,new Set)}function ch(t,e){if(e.has(t))return!0;if(e.add(t),ho(t))return!1;if(yo(t))return!1;if(zr(t))return t.types.every(r=>ch(r,e));if(or(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Mt(r)?ch(r.type,e):!1}else return!1}else return!1}function ux(t){return uc(t,new Set)}function uc(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),K(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return uc(t.returnType.ref,e)}else{if(Mt(t))return uc(t.type,e);if(ho(t))return!1;if(yo(t))return!1;if(zr(t))return t.types.every(i=>uc(i,e));if(or(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return uc(t.typeRef.ref,e)}}return!1}function uh(t){let e=t.$container;if(Ft(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(Ne(o))return o;{let s=Qe(r[i]).find(Ne);if(s)return s}}}if(rs(e))return uh(e)}function mn(t){var e;if(K(t))return Fr(t)?t.name:(e=Ts(t))!==null&&e!==void 0?e:t.name;if(Ar(t)||Mt(t)||ss(t))return t.name;if(Ne(t)){let r=vs(t);if(r)return r}else if(is(t))return t.name;throw new eu("Cannot get name of Unknown Type",t.$cstNode)}function Nn(t){if(t)try{return mn(t)}catch{return}}function Ts(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(K(e))return e.name;if(Ar(e)||Mt(e))return e.name}}}function vs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return mn(t.type.ref)}function bo(t){var e,r,n;return Ce(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Fr(t)?t.name:(n=Ts(t))!==null&&n!==void 0?n:t.name}function Yr(t){let e={s:!1,i:!1,u:!1},r=xs(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var fh=/[\s\S]/.source;function xs(t,e){if(Rv(t))return a_(t);if(Av(t))return c_(t);if(zl(t))return f_(t);if(Vl(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return ai(xs(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(yv(t))return u_(t);if(kv(t))return l_(t);if(Tv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),ai(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if($v(t))return ai(fh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function a_(t){return ai(t.elements.map(e=>xs(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function c_(t){return ai(t.elements.map(e=>xs(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function l_(t){return ai(`${fh}*?${xs(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function u_(t){return ai(`(?!${xs(t.terminal)})${fh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function f_(t){return t.right?ai(`[${ah(t.left)}-${ah(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):ai(ah(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function ah(t){return ii(t.value)}function ai(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function dh(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function si(t,e){let r=dh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ns(i))return i}}catch{}}function cc(t,e){if(Wl(e)){let r=si(t,e);if(r){let n=lh(t,r);return n.push(r),n}return[]}else return lh(t,e)}function lh(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=si(t,s);a&&lh(t,a,r,n,i)}}return Array.from(i)}function gs(t){return Re(t)?[t]:Ir(t)||Ft(t)||Dr(t)?t.elements.flatMap(e=>gs(e)):_e(t)&&t.rule.ref?gs(t.rule.ref.definition):[]}var d_=["string","number","boolean","Date","bigint"];function ms(t){return d_.includes(t)}var ph=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:px(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(l=>l!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return Tx(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(px(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ao();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function p_(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(mx)}}function px(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>mx(e))}}function mx(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function hx(t,e,r){let n=[],i={fragments:new Map};for(let c of t)n.push(...yx(i,c));let o=v_(n),s=x_(o),a=R_(o,s,r);for(let c of e){let l=m_(c);a.unions.push({name:c.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function m_(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=mh(t.definition,r);return e?{primitive:"string"}:n}function mh(t,e){var r,n,i;if(t.cardinality)return e();if(Ir(t))return{types:t.elements.map(o=>mh(o,e))};if(Ft(t)||Dr(t))return t.elements.length!==1?e():mh(t.elements[0],e);if(_e(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?Ce(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Yr(o).toString()}:{value:o.name}:e()}else if(dt(t))return{string:t.value};return e()}function yx(t,e){let r=Ao(e),n=new ph(t,r);return e.definition&&hh(n,n.root,e.definition),n.getTypes()}function Ao(t){return{name:K(t)||Ne(t)?Nn(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function hh(t,e,r){let n=Xr(r.cardinality,r);if(Ir(r)){let i=[];n&&i.push(t.connect(e,Ao()));for(let o of r.elements){let s=t.connect(e,Ao());i.push(hh(t,s,o))}return t.merge(...i)}else if(Ft(r)||Dr(r)){let i=t.connect(e,Ao()),o;n&&(o=t.connect(e,Ao()));for(let s of r.elements)i=hh(t,i,s);return o?t.merge(o,i):i}else{if(Ne(r))return h_(t,e,r);Re(r)?y_(e,r):_e(r)&&g_(t,e,r)}return e}function h_(t,e,r){var n;if(!t.hasLeafNode(e)){let o=p_(e);t.connect(e,o)}let i=t.connect(e,Ao(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&ec(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:Co(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function y_(t,e){let r={types:new Set,reference:!1};gx(e.terminal,r);let n=Co(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Xr(e.cardinality),type:n,astNodes:new Set([e])})}function gx(t,e){if(Ir(t)||Dr(t)||Ft(t))for(let r of t.elements)gx(r,e);else if(dt(t))e.types.add(`'${t.value}'`);else if(_e(t)&&t.rule.ref)e.types.add(bo(t.rule.ref));else if(Vt(t)&&t.type.ref){let r=Nn(t.type.ref);r&&e.types.add(r),e.reference=!0}}function g_(t,e,r){let n=r.rule.ref;if(K(n)&&n.fragment){let i=T_(n,t.context);Xr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else K(n)&&e.ruleCalls.push(bo(n))}function T_(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=Nn(t),o=yx(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function v_(t){let e=new Map,r=[],n=Tx(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function Tx(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Le),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let l=c.alt;a.alt.super.push(...l.super),a.next.push(...c.next);let u=l.properties;for(let f of u){let m=o.find(v=>v.name===f.name);m?(m.type=sh(m.type,f.type),f.astNodes.forEach(v=>m.astNodes.add(v))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let l=c.alt;if(l.ruleCalls.length===0)for(let u of o)l.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function x_(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Le;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:Co(!1,!1,o)};r.push(s)}return r}function R_(t,e,r){let n=new Le;for(let a of t)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=Co(!1,!1,Array.from(c)),u=s.get(a.name);if(u)u.type=sh(u.type,l);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function Co(t,e,r){if(t)return{elementType:Co(!1,e,r)};if(e)return{referenceType:Co(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:ms(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>Co(!1,!1,[n]))}}function vx(t,e){let r=xx(t,e),n=ix(r.interfaces,r.types),i=hx(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function xx(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)K(s)&&!s.fragment&&(Fr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>si(e,a)).filter(a=>a!==void 0);xx(s,e,r,n)}}}return n}function Ax(t,e){let{inferred:r,declared:n,astResources:i}=vx(t,e);return{astResources:i,inferred:Rx(n,r),declared:Rx(r,n)}}function Rx(t,e){var r,n;let i={interfaces:Xv(bx(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:bx(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=sx(i);return b_(o),o}function bx(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function b_(t){let e=C_(t),r=Array.from(e.values());S_(r),w_(t.interfaces),A_(r)}function A_(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function C_({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,yh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function yh(t,e){if(e.has(t))return!0;if(e.add(t),Dt(t))return t.types.every(r=>yh(r,e));if(Or(t)){let r=t.value;return fn(r)?yh(r.type,e):!1}else return Lr(t)||En(t)}function S_(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function w_(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(c=>Yv(c.type));for(let c of a)(e=r.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)pn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var k_={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},E_={maxLookahead:3},Cx={AstReflection:()=>new Ba},Sx={Grammar:()=>tx(),LanguageMetaData:()=>k_,parser:{ParserConfig:()=>E_}};var fc=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},Rs=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},wx={getElement(){},getAllElements(){return ts}};var du=de(Yn(),1);var bs=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=du.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=$i,i=du.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ze(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=du.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var pu=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},gh=class extends pu{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},mu=class extends pu{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var hu=class extends gh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var As=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new hu(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new fc(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new fc(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new Rs(this.indexManager.allElements(e)))}};var yu=class extends As{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===mo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=Xl(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===za||c.type===Va))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Pe(r.container,ns);if(!n)return wx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===mo&&(o=o.filter(s=>s.type===za||s.type===Va)),new Rs(o)}gatherImports(e,r){for(let n of e.imports){let i=dh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ns(s)&&this.gatherImports(s,r)}}}},gu=class extends bs{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),K(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(Ne(o)&&o.inferredType){let s=vs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){ss(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&K(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=Xl(e);if(i&&Ne(e)&&e.inferredType){let o=vs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=ir((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:ir(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var Ur=de(Ae(),1);var sr=de(Ae(),1);var Tu=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=sr.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(xo(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:sr.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Mr(hn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=sr.Range.create(0,0,0,0);else{let a=sr.Position.create(s.endLine-1,s.endColumn);o=sr.Range.create(a,a)}}}else o=Wa(i.token);if(o){let s={severity:sr.DiagnosticSeverity.Error,range:o,message:i.message,data:Mr(hn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:hn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=sr.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(ti(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:$_(n),severity:N_(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function $_(t){if(sr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Yt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Vr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function N_(t){switch(t){case"error":return sr.DiagnosticSeverity.Error;case"warning":return sr.DiagnosticSeverity.Warning;case"info":return sr.DiagnosticSeverity.Information;case"hint":return sr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var hn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(hn=hn||(hn={}));var vu=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Se.GrammarNameUppercase:case Se.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Se.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Se.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Se.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Se.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Se.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Se.MissingReturns:n(this.fixMissingReturns(e,r));break;case Se.InvalidInfers:case Se.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Se.MissingInfer:n(this.fixMissingInfer(e,r));break;case Se.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case hn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=br(i,n),s=Pe(o?.astNode,zl);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${ii(a)}-${ii(c)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Yt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,l=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(l)}})}for(let a of i){let c=a.ref;if(c&&Ce(c)&&!c.hidden&&c.$cstNode){let l=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=br(o,i),a=Pe(s?.astNode,K);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===r.refText),l=[],u=-1,f=-1;for(let m of c){if(ve.equals(m.documentUri,n.uri))continue;let v=__(n.uri,m.documentUri),A,C="",N=n.parseResult.value,S=N.imports.find(T=>T.path&&v<T.path);if(S)A=(i=S.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let T=N.imports[N.imports.length-1].$cstNode.range.end;T&&(A={line:T.line+1,character:0})}else N.rules.length>0&&(A=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,C=`
`);A&&((u<0||v.length<f)&&(u=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:A,end:A},newText:`import '${v}'
${C}`}]}}}))}return u>=0&&(l[u].isPreferred=!0),l}};function __(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Nx=de(so(),1);var ws=de(Ae(),1);function Th(t,e){let r={stacks:t,tokens:e};return P_(r),r.stacks.flat().forEach(i=>{i.property=void 0}),Ex(r.stacks).map(i=>i[i.length-1])}function vh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(Ft(c.$container)){a=c.$container;break}else if(rs(c.$container))c=c.$container;else break;if(fx(c.cardinality)){let l=Cs({next:{feature:c,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let u of l)i.add(u.feature);o.push(...l)}if(a){let l=a.elements.indexOf(c);l!==void 0&&l<a.elements.length-1&&o.push(...kx({feature:a,type:e.type,new:!1},l+1,r,n,i)),o.every(u=>Xr(u.feature.cardinality,u.feature)||Xr(r.get(u.feature))||i.has(u.feature))&&o.push(...vh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function dc(t){return Et(t)&&(t={feature:t}),Cs({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function Cs(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:c,type:l}=i;if(Ft(c)){if(s.has(c))return[];s.add(c)}if(Ft(c))return kx(i,0,o,s,a).map(u=>xu(u,c.cardinality,o));if(Ir(c)||Dr(c))return c.elements.flatMap(u=>Cs({next:{feature:u,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(u=>xu(u,c.cardinality,o));if(Re(c)){let u={feature:c.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return Cs({next:u,cardinalities:o,visited:s,plus:a}).map(f=>xu(f,c.cardinality,o))}else{if(Ne(c))return vh({next:{feature:c,new:!0,type:mn(c),property:(r=i.property)!==null&&r!==void 0?r:c.feature},cardinalities:o,visited:s,plus:a});if(_e(c)&&K(c.rule.ref)){let u=c.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=Ts(u))!==null&&n!==void 0?n:u.name,property:i.property};return Cs({next:f,cardinalities:o,visited:s,plus:a}).map(m=>xu(m,c.cardinality,o))}else return[i]}}function xu(t,e,r){return r.set(t.feature,e),t}function kx(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...Cs({next:a,cardinalities:r,visited:n,plus:i})),!!Xr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function P_(t){for(let e of t.tokens){let r=Ex(t.stacks,e);t.stacks=r}}function Ex(t,e){let r=[];for(let n of t)r.push(...I_(n,e));return r}function I_(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(D_)),i=[];for(;t.length>0;){let o=t.pop(),s=vh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?xh(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Xr(a.feature.cardinality,a.feature)||Xr(r.get(a.feature))))break}return i}function D_(t){if(t.cardinality==="+")return!0;let e=Pe(t,Re);return!!(e&&e.cardinality==="+")}function xh(t,e){if(dt(t))return t.value===e.image;if(_e(t))return O_(t.rule.ref,e);if(Vt(t)){let r=Ru(t);if(r)return xh(r,e)}return!1}function O_(t,e){return K(t)?dc(t.definition).some(n=>xh(n.feature,e)):Ce(t)?Yr(t).test(e.image):!1}function $x(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Ss=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(c,l)=>{let u=this.fillCompletionItem(c,l);u&&n.push(u)},s=c=>dt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(l=>this.completionFor(c,l,o))),a.push(...c.features),!this.continueCompletion(n))break;return ws.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:ws.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=bu(this.grammar),l=dc({feature:c.definition,new:!0,type:Ts(c)});return o.length>0?(o.shift(),Th(l.map(u=>[u]),o)):l}let s=[...o].splice(i.tokenIndex);return Th([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,r){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let l=e.textDocument,u=l.getText(),f=l.offsetAt(r),m={document:e,textDocument:l,offset:f,position:r},v=this.findDataTypeRuleStart(c,f);if(v){let[y,$]=v,D=(n=br(c,y))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,y);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:y,tokenEndOffset:$,features:X})}let{nextTokenStart:A,nextTokenEnd:C,previousTokenStart:N,previousTokenEnd:S}=this.backtrackToAnyToken(u,f),T;if(N!==void 0&&S!==void 0&&S===f){T=(i=br(c,N))===null||i===void 0?void 0:i.astNode;let y=this.findFeaturesAt(l,N);yield Object.assign(Object.assign({},m),{node:T,tokenOffset:N,tokenEndOffset:S,features:y})}if(T=(s=(o=br(c,A))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=br(c,N))===null||a===void 0?void 0:a.astNode,T){let y=this.findFeaturesAt(l,A);yield Object.assign(Object.assign({},m),{node:T,tokenOffset:A,tokenEndOffset:C,features:y})}else{let y=bu(this.grammar),$=dc(y.definition);yield Object.assign(Object.assign({},m),{tokenOffset:A,tokenEndOffset:C,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=It(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Pe(o?.grammarSource,K))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Pe(o?.grammarSource,K))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(K(r)){let i=dc(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(dt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Vt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Pe(r.feature,Re),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(l=>{!c.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),c.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:ws.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let l=this.nameProvider.getName(r.node);if(!l)return;o=l}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Au=class extends Ss{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Pe(r.feature,Re);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:l}}for(let a of o){let c=i.length>0?"":'"',l=`${c}${a}${c}`;r(e,{label:a,textEdit:{newText:l,range:s},kind:Nx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-ve.extname(s.uri).length),l=ve.relative(i,c);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var pc=de(Ae(),1);var ks=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of LT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,pc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),pc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===pc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Cu=class extends ks{shouldProcessContent(e){return!K(e)}};var Su=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Rh(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,c,l)=>{var u,f;let m=this.nodeModeToKey(a,c),v=i.get(m),A=(u=l.options.priority)!==null&&u!==void 0?u:0,C=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||C<=A)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),l,u;do if(u=c.next(),!u.done){let f=u.value,m=fo(f),v=this.nodeModeToKey(f,"prepend"),A=r.get(v);if(r.delete(v),A){let S=this.createTextEdit(l,f,A,o);for(let T of S)T&&this.insideRange(T.range,i)&&this.isNecessary(T,e.textDocument)&&s.push(T)}let C=this.nodeModeToKey(f,"append"),N=r.get(C);if(r.delete(C),N){let S=UT(f);if(S){let T=this.createTextEdit(f,S,N,o);for(let y of T)y&&this.insideRange(y.range,i)&&this.isNecessary(y,e.textDocument)&&s.push(y)}}if(!A&&f.hidden){let S=this.createHiddenTextEdits(l,f,void 0,o);for(let T of S)T&&this.insideRange(T.range,i)&&this.isNecessary(T,e.textDocument)&&s.push(T)}m&&(l=f)}while(!u.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:r.range.start},l=i.document.getText(c),u=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,u)-f;if(v===0)return[];let A="";v>0&&(A=(i.options.insertSpaces?" ":"	").repeat(v));let C=r.text.split(`
`);C[0]=l+C[0];for(let N=0;N<C.length;N++){let S=s+N,T={character:0,line:S};if(v>0)a.push({newText:A,range:{start:T,end:T}});else{let y=C[N],$=0;for(;$<y.length;$++){let D=y.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:T,end:{line:S,character:Math.min($,Math.abs(v))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,l=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),fo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Br(i,o=>this.iterateCst(o,r)):ts}iterateCst(e,r){if(!kn(e))return ts;let n=r.indentation;return new Pr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,mr))}},Rh=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new yn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new yn(r,this.collector)}property(e,r){let n=Yt(this.astNode.$cstNode,e,r);return new yn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Ni(this.astNode.$cstNode,n);r.push(...i)}return new yn(r,this.collector)}keyword(e,r){let n=Vr(this.astNode.$cstNode,e,r);return new yn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=wu(this.astNode.$cstNode,n);r.push(...i)}return new yn(r,this.collector)}cst(e){return new yn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new yn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new yn(qT(o,s),this.collector)}},yn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ye;(function(t){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(u){return i(0,u)}t.noSpace=r;function n(u){return i(1,u)}t.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}t.spaces=i;function o(u){return s(1,u)}t.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}t.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function c(u){return{options:u??{},moves:[{tabs:0}]}}t.noIndent=c;function l(u,f){var m,v,A,C,N,S;let T=(m=u.lines)!==null&&m!==void 0?m:0,y=(v=f.lines)!==null&&v!==void 0?v:0,$=(A=u.tabs)!==null&&A!==void 0?A:0,D=(C=f.tabs)!==null&&C!==void 0?C:0,X=(N=u.characters)!==null&&N!==void 0?N:0,ge=(S=f.characters)!==null&&S!==void 0?S:0;return T<y?-1:T>y?1:$<D?-1:$>D?1:X<ge?-1:X>ge?1:0}})(ye=ye||(ye={}));var ku=class extends Su{format(e){if(Vt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ye.noSpace());else if(K(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ye.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ye.oneSpace()):r.property("name").append(ye.noSpace()),r.properties("parameters").append(ye.noSpace()),r.keywords(",").append(ye.oneSpace()),r.keywords("<").append(ye.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ye.noSpace()),r.interior(i,n).prepend(ye.indent()),n.prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(Ce(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ye.oneSpace()),r.keyword("returns").append(ye.oneSpace())),r.keywords("hidden","terminal","fragment").append(ye.oneSpace()),r.keyword(":").prepend(ye.noSpace()),r.keyword(";").prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(Ne(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ye.noSpace()),r.keywords(".","+=","=").surround(ye.noSpace()),r.keyword("}").prepend(ye.noSpace())}else if(is(e))this.getNodeFormatter(e).keywords("infer","infers").append(ye.oneSpace());else if(Re(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ye.noSpace());else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ye.noSpace()),r.keyword(",").append(ye.oneSpace()),r.properties("arguments").append(ye.noSpace())}rs(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ye.noSpace())}};var ci=de(Ae(),1);var oe=de(Ae(),1);var Ch={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},_x={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},Px={legend:{tokenTypes:Object.keys(Ch),tokenModifiers:Object.keys(_x)},full:{delta:!0},range:!0},Ah=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Eu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Ah;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=ti(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Hl(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Ch[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=_x[u];a|=f}}let c=n.start.line,l=n.end.line;if(c===l){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(c,u,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=c+1;m<l;m++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-v-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Yt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Ni(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=Vr(r.$cstNode,n,o);c&&a.push(c)}else a.push(...wu(r.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},bh;(function(t){function e(n,i){let o=new Map;Object.entries(Ch).forEach(([c,l])=>o.set(l,c));let s=0,a=0;return r(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let l=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(bh=bh||(bh={}));var $u=class extends Eu{highlightElement(e,r){var n;Re(e)?r({node:e,property:"feature",type:ci.SemanticTokenTypes.property}):Ne(e)?e.feature&&r({node:e,property:"feature",type:ci.SemanticTokenTypes.property}):ss(e)?r({node:e,property:"name",type:ci.SemanticTokenTypes.type}):or(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ci.SemanticTokenTypes.type}):rv(e)?r({node:e,property:"name",type:ci.SemanticTokenTypes.parameter}):os(e)?r({node:e,property:"parameter",type:ci.SemanticTokenTypes.parameter}):_e(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ci.SemanticTokenTypes.type}):Bl(e)&&r({node:e,property:"name",type:ci.SemanticTokenTypes.property})}};var Nu=class extends fs{getName(e){return Re(e)?e.feature:super.getName(e)}getNameNode(e){return Re(e)?Yt(e.$cstNode,"feature"):super.getNameNode(e)}};var Es=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=$s(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(Qn(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Qn(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||MT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:ir(r),local:!0}}}};var _u=class extends Es{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=$s(e);if(n&&n.feature==="feature"){if(Re(r))return this.findAssignmentDeclaration(r);if(Ne(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return Bl(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Pe(e,Ar);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=Vm(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(K(e)){let i=gs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Yt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Pe(e,K);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Pe(e,K),i=uh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Ar(n.returnType.ref)||Mt(n.returnType.ref))){let o=Za(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=Za(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(K(s)||Ne(s))&&r.push(s)}),r}};var mc=de(Ae(),1);var Ix=de(Ae(),1);var Pu=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=It(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:Ix.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var Dx=de(Ae(),1);var Ns=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=It(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Dx.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var Ox=de(Ae(),1);var Iu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return Ox.DocumentHighlight.create(e.segment.range)}};var Du=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of $i(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Lx=de(Ae(),1),Ou=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=Lx.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};var Lu=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let c=r.charCodeAt(a),l=e.charCodeAt(o);if((c===l||this.toUpperCharCode(c)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,r){return Mx<=e&&e<=Fx&&L_<=r&&r<=M_||e===Ux&&r!==Ux}toUpperCharCode(e){return Mx<=e&&e<=Fx?e-32:e}},Mx="a".charCodeAt(0),Fx="z".charCodeAt(0),L_="A".charCodeAt(0),M_="Z".charCodeAt(0),Ux="_".charCodeAt(0);var Sh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=It(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},Mu=class extends Sh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var F_=de(Ae(),1);var U_=de(Ae(),1);var Jr=de(Ae(),1);var je;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(je=je||(je={}));var Fu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Jt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:je.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:je.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=Zo.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Uu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,this.documentMap.delete(r)),n}};var q_=de(Ae(),1);function qx(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var qu=class{constructor(e){this.onInitializeEmitter=new Jr.Emitter,this.onInitializedEmitter=new Jr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Kl(this.services),this.services.ServiceRegistry.all.forEach(e=>Kl(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(w=>w.lsp.Formatter),o=n.map(w=>{var q;return(q=w.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(w=>!!w),s=this.hasService(w=>w.lsp.CodeActionProvider),a=this.hasService(w=>w.lsp.SemanticTokenProvider),c=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.hasService(w=>w.lsp.DocumentLinkProvider),u=qx(n.map(w=>{var q;return(q=w.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(w=>w.lsp.TypeProvider),m=this.hasService(w=>w.lsp.ImplementationProvider),v=this.hasService(w=>w.lsp.CompletionProvider),A=$x(n.map(w=>{var q;return(q=w.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),C=this.hasService(w=>w.lsp.ReferencesProvider),N=this.hasService(w=>w.lsp.DocumentSymbolProvider),S=this.hasService(w=>w.lsp.DefinitionProvider),T=this.hasService(w=>w.lsp.DocumentHighlightProvider),y=this.hasService(w=>w.lsp.FoldingRangeProvider),$=this.hasService(w=>w.lsp.HoverProvider),D=this.hasService(w=>w.lsp.RenameProvider),X=this.hasService(w=>w.lsp.CallHierarchyProvider),ge=this.hasService(w=>w.lsp.CodeLensProvider),Ee=this.hasService(w=>w.lsp.DeclarationProvider),Ht=this.hasService(w=>w.lsp.InlayHintProvider),xt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Jr.TextDocumentSyncKind.Incremental,completionProvider:v?A:void 0,referencesProvider:C,documentSymbolProvider:N,definitionProvider:S,typeDefinitionProvider:f,documentHighlightProvider:T,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:y,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Px:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:ge?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:xt?{resolveProvider:!!xt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function jx(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");G_(e,t),j_(e,t),H_(e,t),K_(e,t),B_(e,t),z_(e,t),V_(e,t),X_(e,t),J_(e,t),Z_(e,t),eP(e,t),W_(e,t),tP(e,t),Q_(e,t),rP(e,t),nP(e,t),oP(e,t),aP(e,t),uP(e,t),cP(e,t),sP(e,t),iP(e,t),Y_(e,t),lP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function G_(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>r.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Jt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let l of s.changes){let u=Jt.parse(l.uri);l.type===Jr.FileChangeType.Deleted?c.push(u):a.push(u)}i(a,c)})}function j_(t,e){e.workspace.DocumentBuilder.onBuildPhase(je.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function H_(t,e){t.onCompletion(ar((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function K_(t,e){t.onReferences(ar((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function W_(t,e){t.onCodeAction(ar((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function B_(t,e){t.onDocumentSymbol(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function z_(t,e){t.onDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function V_(t,e){t.onTypeDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function X_(t,e){t.onImplementation(ar((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function Y_(t,e){t.onDeclaration(ar((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function J_(t,e){t.onDocumentHighlight(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function Q_(t,e){t.onHover(ar((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function Z_(t,e){t.onFoldingRanges(ar((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function eP(t,e){t.onDocumentFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function tP(t,e){t.onRenameRequest(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function rP(t,e){t.languages.inlayHint.on(Ii((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function nP(t,e){let r={data:[]};t.languages.semanticTokens.on(Ii((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Ii((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Ii((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function iP(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function oP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return _s(s)}})}function sP(t,e){t.onDocumentLinks(Ii((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function aP(t,e){t.onSignatureHelp(Ii((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function cP(t,e){t.onCodeLens(Ii((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function lP(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return _s(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return _s(a)}})}}function uP(t,e){t.languages.callHierarchy.onPrepare(Ii((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(Gx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(Gx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function Gx(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Jt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return _s(a)}}}function Ii(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=r.getOrCreateDocument(s);if(!c)throw new Error;try{return await t(a,c,i,o)}catch(l){return _s(l)}}}function ar(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=r.getOrCreateDocument(s);if(!c)return null;try{return await t(a,c,i,o)}catch(l){return _s(l)}}}function _s(t){if(xo(t))return new Jr.ResponseError(Jr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Jr.ResponseError)return t;throw t}var ju=de(Ae(),1),Gu=class{getSymbolKind(){return ju.SymbolKind.Field}getCompletionItemKind(){return ju.CompletionItemKind.Reference}};var Hx=de(Ae(),1);var Hu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(Hx.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var Kx=de(Ae(),1);var Ku=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=It(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(u=>{let f=Kx.TextEdit.replace(u.segment.range,r.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=It(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&ec(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var fP=de(Ae(),1);var Wx=de(Ae(),1);var Wu=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=Wx.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var Bu=class extends Ns{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,c;let l="path";if(Wl(e.astNode)&&((n=$s(e))===null||n===void 0?void 0:n.feature)===l){let u=si(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:mc.Range.create(0,0,0,0),v=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:mc.Range.create(0,0,0,0);return[mc.LocationLink.create(u.$document.uri.toString(),v,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:$i(e).head()}};var wh=de(Ae(),1);var zu=class extends Pu{getIncomingCalls(e,r){if(!K(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=br(s.$cstNode,i.segment.offset);if(!a)return;let c=Pe(a.astNode,K);if(!c||!c.$cstNode)return;let l=this.nameProvider.getNameNode(c);if(!l)return;let u=i.sourceUri.toString(),f=u+"@"+l.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:wh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!K(e))return;let r=Qe(e).filter(_e).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let l=ne(a.astNode).uri.toString(),u=l+"@"+c.text;n.has(u)?n.set(u,{refCstNode:a,to:c,from:[...n.get(u).from,s.range],docUri:l}):n.set(u,{refCstNode:a,to:c,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:wh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var Vu=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=Ax(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=dP(e);for(let a of nu(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of nu(n)){let c=s.get(a.name);if(c){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=Xm(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of Xm(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function dP({parserRules:t,datatypeRules:e}){let r=new Le;ie(t).concat(e).forEach(i=>r.add(bo(i),i));function n(i){if(Ne(i)){let o=vs(i);o&&r.add(o,i)}(Ir(i)||Ft(i)||Dr(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function Bx(t){return t&&"declared"in t}function zx(t){return t&&"inferred"in t}function Vx(t){return t&&"inferred"in t&&"declared"in t}function Yx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var Xu=class{checkCyclicType(e,r){Di(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Di(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(Bx(o)&&pn(o.declared)&&Ar(o.declaredNode)){let s=o;mP(s,r),hP(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())zx(o)&&o.inferred instanceof us&&pP(o.inferred,r),Vx(o)&&TP(o,i,r)}checkActionIsNotUnionType(e,r){Mt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Di(t,e){var r;if(e.has(t))return!0;if(e.add(t),Mt(t))return Di(t.type,e);if(Ar(t))return t.superTypes.some(n=>n.ref&&Di(n.ref,new Set(e)));if(or(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Di(t.typeRef.ref,e)}else{if(yo(t))return Di(t.referenceType,e);if(ho(t))return Di(t.elementType,e);if(zr(t))return t.types.some(n=>Di(n,new Set(e)))}return!1}function pP(t,e){t.properties.forEach(r=>{var n;let i=Bm(r.type);if(i.length>1){let o=a=>ri(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function mP({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(fn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function hP({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],l=i[a],u=pn(c)?c.superProperties:[],f=pn(l)?l.superProperties:[],m=yP(u,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${c}' and '${l}'. Their ${m.map(v=>"'"+v+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=pn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function yP(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!gP(n,i)&&r.push(n.name)}return r}function gP(t,e){return Qa(t.type,e.type)&&Qa(e.type,t.type)}function TP(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,c=f=>m=>s.forEach(v=>r("error",`${m}${f?` ${f}`:""}.`,v?.inferredType?{node:v?.inferredType,property:"name"}:{node:v,property:Ne(v)?"type":"name"})),l=(f,m)=>f.forEach(v=>r("error",m,{node:v,property:Re(v)||Ne(v)?"feature":"name"})),u=f=>{s.forEach(m=>{K(m)&&gs(m.definition).find(A=>A.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(fn(n)&&fn(i))vP(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(pn(n)&&pn(i))xP(n,i,e,c(`in a rule that returns type '${a}'`),l,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),r("error",f,{node:o,property:"name"})}}function vP(t,e,r){Qa(t,e)||r(`Cannot assign type '${dn(t,"DeclaredType")}' to '${dn(e,"DeclaredType")}'`)}function Xx(t){return t.optional||tu(t.type)}function xP(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Dt(f))return{types:f.types.map(m=>l(m))};if(ri(f))return{referenceType:l(f.referenceType)};if(ni(f))return{elementType:l(f.elementType)};if(Or(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let v=c.get(f);if(v){let A=dn(m.type,"DeclaredType"),C=dn(v.type,"DeclaredType");if(!Qa(l(m.type),v.type)&&C!=="unknown"){let S=`The assigned type '${A}' is not compatible with the declared property '${f}' of type '${C}'.`;i(m.astNodes,S)}m.optional&&!Xx(v)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of c.entries())!a.get(f)&&!Xx(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",v=Array.from(u).map(A=>`'${A}'`).sort().join(", ");n(`${f} ${v} ${m}.`)}}var RP={validation:{LangiumGrammarValidator:t=>new fu(t),ValidationResourcesCollector:t=>new Vu(t),LangiumGrammarTypesValidator:()=>new Xu},lsp:{FoldingRangeProvider:t=>new Cu(t),CodeActionProvider:t=>new vu(t),SemanticTokenProvider:t=>new $u(t),Formatter:()=>new ku,DefinitionProvider:t=>new Bu(t),CallHierarchyProvider:t=>new zu(t),CompletionProvider:t=>new Au(t)},references:{ScopeComputation:t=>new gu(t),ScopeProvider:t=>new yu(t),References:t=>new _u(t),NameProvider:()=>new Nu}};function Jx(t,e){let r=po(yc(t),Cx,e),n=po(hc({shared:r}),Sx,RP);return bP(r,n),r.ServiceRegistry.register(n),ax(n),Yx(n),{shared:r,grammar:n}}function bP(t,e){t.workspace.DocumentBuilder.onBuildPhase(je.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var kh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Ps={fileSystemProvider:()=>new kh};function bu(t){return t.rules.find(e=>K(e)&&e.entry)}function AP(t){return t.rules.filter(e=>Ce(e)&&e.hidden)}function ys(t,e){let r=new Set,n=bu(t);if(!n)return new Set(t.rules);let i=[n].concat(AP(t));for(let s of i)Qx(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||Ce(s)&&s.hidden)&&o.add(s);return o}function Qx(t,e,r){e.add(t.name),Qe(t).forEach(n=>{if(_e(n)||r&&Vl(n)){let i=n.rule.ref;i&&!e.has(i.name)&&Qx(i,e,r)}})}function Ru(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=lc(t.type.ref);return e?.terminal}}function Zx(t){return t.hidden&&!Yr(t).test(" ")}function Ni(t,e){return!t||!e?[]:Eh(t,e,t.astNode,!0)}function Yt(t,e,r){if(!t||!e)return;let n=Eh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Eh(t,e,r,n){if(!n){let i=Pe(t.grammarSource,Re);if(i&&i.feature===e)return[t]}return kn(t)&&t.astNode===r?t.content.flatMap(i=>Eh(i,e,r,!1)):[]}function wu(t,e){return t?eR(t,e,t?.astNode):[]}function Vr(t,e,r){if(!t)return;let n=eR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function eR(t,e,r){if(t.astNode!==r)return[];if(dt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=Pm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?dt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function $s(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Pe(t.grammarSource,Re);if(n)return n;t=t.container}}function lc(t){return is(t)&&(t=t.$container),tR(t,new Map)}function tR(t,e){var r;function n(i,o){let s;return Pe(i,Re)||(s=tR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Qe(t)){if(Re(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(_e(i)&&K(i.rule.ref))return n(i,i.rule.ref);if(or(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function au(t){var e;let r=Jx(Ps).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Jt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function rR(t){let e=[],r=t.Grammar;for(let n of r.rules)Ce(n)&&Zx(n)&&Jv(Yr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Im}}var CP=typeof global=="object"&&global&&global.Object===Object&&global,Yu=CP;var SP=typeof self=="object"&&self&&self.Object===Object&&self,wP=Yu||SP||Function("return this")(),$t=wP;var kP=$t.Symbol,Ut=kP;var nR=Object.prototype,EP=nR.hasOwnProperty,$P=nR.toString,gc=Ut?Ut.toStringTag:void 0;function NP(t){var e=EP.call(t,gc),r=t[gc];try{t[gc]=void 0;var n=!0}catch{}var i=$P.call(t);return n&&(e?t[gc]=r:delete t[gc]),i}var iR=NP;var _P=Object.prototype,PP=_P.toString;function IP(t){return PP.call(t)}var oR=IP;var DP="[object Null]",OP="[object Undefined]",sR=Ut?Ut.toStringTag:void 0;function LP(t){return t==null?t===void 0?OP:DP:sR&&sR in Object(t)?iR(t):oR(t)}var hr=LP;function MP(t){return t!=null&&typeof t=="object"}var yt=MP;var FP="[object Symbol]";function UP(t){return typeof t=="symbol"||yt(t)&&hr(t)==FP}var _n=UP;function qP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var Pn=qP;var GP=Array.isArray,z=GP;var jP=1/0,aR=Ut?Ut.prototype:void 0,cR=aR?aR.toString:void 0;function lR(t){if(typeof t=="string")return t;if(z(t))return Pn(t,lR)+"";if(_n(t))return cR?cR.call(t):"";var e=t+"";return e=="0"&&1/t==-jP?"-0":e}var uR=lR;var HP=/\s/;function KP(t){for(var e=t.length;e--&&HP.test(t.charAt(e)););return e}var fR=KP;var WP=/^\s+/;function BP(t){return t&&t.slice(0,fR(t)+1).replace(WP,"")}var dR=BP;function zP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var st=zP;var pR=0/0,VP=/^[-+]0x[0-9a-f]+$/i,XP=/^0b[01]+$/i,YP=/^0o[0-7]+$/i,JP=parseInt;function QP(t){if(typeof t=="number")return t;if(_n(t))return pR;if(st(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=st(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=dR(t);var r=XP.test(t);return r||YP.test(t)?JP(t.slice(2),r?2:8):VP.test(t)?pR:+t}var mR=QP;var hR=1/0,ZP=17976931348623157e292;function eI(t){if(!t)return t===0?t:0;if(t=mR(t),t===hR||t===-hR){var e=t<0?-1:1;return e*ZP}return t===t?t:0}var yR=eI;function tI(t){var e=yR(t),r=e%1;return e===e?r?e-r:e:0}var In=tI;function rI(t){return t}var Cr=rI;var nI="[object AsyncFunction]",iI="[object Function]",oI="[object GeneratorFunction]",sI="[object Proxy]";function aI(t){if(!st(t))return!1;var e=hr(t);return e==iI||e==oI||e==nI||e==sI}var yr=aI;var cI=$t["__core-js_shared__"],Ju=cI;var gR=function(){var t=/[^.]+$/.exec(Ju&&Ju.keys&&Ju.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function lI(t){return!!gR&&gR in t}var TR=lI;var uI=Function.prototype,fI=uI.toString;function dI(t){if(t!=null){try{return fI.call(t)}catch{}try{return t+""}catch{}}return""}var li=dI;var pI=/[\\^$.*+?()[\]{}|]/g,mI=/^\[object .+?Constructor\]$/,hI=Function.prototype,yI=Object.prototype,gI=hI.toString,TI=yI.hasOwnProperty,vI=RegExp("^"+gI.call(TI).replace(pI,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function xI(t){if(!st(t)||TR(t))return!1;var e=yr(t)?vI:mI;return e.test(li(t))}var vR=xI;function RI(t,e){return t?.[e]}var xR=RI;function bI(t,e){var r=xR(t,e);return vR(r)?r:void 0}var Sr=bI;var AI=Sr($t,"WeakMap"),Qu=AI;var RR=Object.create,CI=function(){function t(){}return function(e){if(!st(e))return{};if(RR)return RR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),bR=CI;function SI(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var AR=SI;function wI(){}var at=wI;function kI(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var CR=kI;var EI=800,$I=16,NI=Date.now;function _I(t){var e=0,r=0;return function(){var n=NI(),i=$I-(n-r);if(r=n,i>0){if(++e>=EI)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var SR=_I;function PI(t){return function(){return t}}var wR=PI;var II=function(){try{var t=Sr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Is=II;var DI=Is?function(t,e){return Is(t,"toString",{configurable:!0,enumerable:!1,value:wR(e),writable:!0})}:Cr,kR=DI;var OI=SR(kR),ER=OI;function LI(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var Zu=LI;function MI(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var ef=MI;function FI(t){return t!==t}var $R=FI;function UI(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var NR=UI;function qI(t,e,r){return e===e?NR(t,e,r):ef(t,$R,r)}var Ds=qI;function GI(t,e){var r=t==null?0:t.length;return!!r&&Ds(t,e,0)>-1}var tf=GI;var jI=9007199254740991,HI=/^(?:0|[1-9]\d*)$/;function KI(t,e){var r=typeof t;return e=e??jI,!!e&&(r=="number"||r!="symbol"&&HI.test(t))&&t>-1&&t%1==0&&t<e}var Oi=KI;function WI(t,e,r){e=="__proto__"&&Is?Is(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Os=WI;function BI(t,e){return t===e||t!==t&&e!==e}var Dn=BI;var zI=Object.prototype,VI=zI.hasOwnProperty;function XI(t,e,r){var n=t[e];(!(VI.call(t,e)&&Dn(n,r))||r===void 0&&!(e in t))&&Os(t,e,r)}var Li=XI;function YI(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;c===void 0&&(c=t[a]),i?Os(r,a,c):Li(r,a,c)}return r}var On=YI;var _R=Math.max;function JI(t,e,r){return e=_R(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=_R(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),AR(t,this,a)}}var PR=JI;function QI(t,e){return ER(PR(t,e,Cr),t+"")}var Ls=QI;var ZI=9007199254740991;function eD(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=ZI}var Ms=eD;function tD(t){return t!=null&&Ms(t.length)&&!yr(t)}var Nt=tD;function rD(t,e,r){if(!st(r))return!1;var n=typeof e;return(n=="number"?Nt(r)&&Oi(e,r.length):n=="string"&&e in r)?Dn(r[e],t):!1}var Mi=rD;function nD(t){return Ls(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Mi(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var IR=nD;var iD=Object.prototype;function oD(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||iD;return t===r}var Ln=oD;function sD(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var DR=sD;var aD="[object Arguments]";function cD(t){return yt(t)&&hr(t)==aD}var $h=cD;var OR=Object.prototype,lD=OR.hasOwnProperty,uD=OR.propertyIsEnumerable,fD=$h(function(){return arguments}())?$h:function(t){return yt(t)&&lD.call(t,"callee")&&!uD.call(t,"callee")},Fi=fD;function dD(){return!1}var LR=dD;var UR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,MR=UR&&typeof module=="object"&&module&&!module.nodeType&&module,pD=MR&&MR.exports===UR,FR=pD?$t.Buffer:void 0,mD=FR?FR.isBuffer:void 0,hD=mD||LR,ui=hD;var yD="[object Arguments]",gD="[object Array]",TD="[object Boolean]",vD="[object Date]",xD="[object Error]",RD="[object Function]",bD="[object Map]",AD="[object Number]",CD="[object Object]",SD="[object RegExp]",wD="[object Set]",kD="[object String]",ED="[object WeakMap]",$D="[object ArrayBuffer]",ND="[object DataView]",_D="[object Float32Array]",PD="[object Float64Array]",ID="[object Int8Array]",DD="[object Int16Array]",OD="[object Int32Array]",LD="[object Uint8Array]",MD="[object Uint8ClampedArray]",FD="[object Uint16Array]",UD="[object Uint32Array]",Ye={};Ye[_D]=Ye[PD]=Ye[ID]=Ye[DD]=Ye[OD]=Ye[LD]=Ye[MD]=Ye[FD]=Ye[UD]=!0;Ye[yD]=Ye[gD]=Ye[$D]=Ye[TD]=Ye[ND]=Ye[vD]=Ye[xD]=Ye[RD]=Ye[bD]=Ye[AD]=Ye[CD]=Ye[SD]=Ye[wD]=Ye[kD]=Ye[ED]=!1;function qD(t){return yt(t)&&Ms(t.length)&&!!Ye[hr(t)]}var qR=qD;function GD(t){return function(e){return t(e)}}var Mn=GD;var GR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Tc=GR&&typeof module=="object"&&module&&!module.nodeType&&module,jD=Tc&&Tc.exports===GR,Nh=jD&&Yu.process,HD=function(){try{var t=Tc&&Tc.require&&Tc.require("util").types;return t||Nh&&Nh.binding&&Nh.binding("util")}catch{}}(),Qr=HD;var jR=Qr&&Qr.isTypedArray,KD=jR?Mn(jR):qR,Fs=KD;var WD=Object.prototype,BD=WD.hasOwnProperty;function zD(t,e){var r=z(t),n=!r&&Fi(t),i=!r&&!n&&ui(t),o=!r&&!n&&!i&&Fs(t),s=r||n||i||o,a=s?DR(t.length,String):[],c=a.length;for(var l in t)(e||BD.call(t,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Oi(l,c)))&&a.push(l);return a}var rf=zD;function VD(t,e){return function(r){return t(e(r))}}var nf=VD;var XD=nf(Object.keys,Object),HR=XD;var YD=Object.prototype,JD=YD.hasOwnProperty;function QD(t){if(!Ln(t))return HR(t);var e=[];for(var r in Object(t))JD.call(t,r)&&r!="constructor"&&e.push(r);return e}var of=QD;function ZD(t){return Nt(t)?rf(t):of(t)}var He=ZD;var eO=Object.prototype,tO=eO.hasOwnProperty,rO=IR(function(t,e){if(Ln(e)||Nt(e)){On(e,He(e),t);return}for(var r in e)tO.call(e,r)&&Li(t,r,e[r])}),Qt=rO;function nO(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var KR=nO;var iO=Object.prototype,oO=iO.hasOwnProperty;function sO(t){if(!st(t))return KR(t);var e=Ln(t),r=[];for(var n in t)n=="constructor"&&(e||!oO.call(t,n))||r.push(n);return r}var WR=sO;function aO(t){return Nt(t)?rf(t,!0):WR(t)}var Ui=aO;var cO=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,lO=/^\w*$/;function uO(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||_n(t)?!0:lO.test(t)||!cO.test(t)||e!=null&&t in Object(e)}var Us=uO;var fO=Sr(Object,"create"),fi=fO;function dO(){this.__data__=fi?fi(null):{},this.size=0}var BR=dO;function pO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var zR=pO;var mO="__lodash_hash_undefined__",hO=Object.prototype,yO=hO.hasOwnProperty;function gO(t){var e=this.__data__;if(fi){var r=e[t];return r===mO?void 0:r}return yO.call(e,t)?e[t]:void 0}var VR=gO;var TO=Object.prototype,vO=TO.hasOwnProperty;function xO(t){var e=this.__data__;return fi?e[t]!==void 0:vO.call(e,t)}var XR=xO;var RO="__lodash_hash_undefined__";function bO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=fi&&e===void 0?RO:e,this}var YR=bO;function qs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}qs.prototype.clear=BR;qs.prototype.delete=zR;qs.prototype.get=VR;qs.prototype.has=XR;qs.prototype.set=YR;var _h=qs;function AO(){this.__data__=[],this.size=0}var JR=AO;function CO(t,e){for(var r=t.length;r--;)if(Dn(t[r][0],e))return r;return-1}var qi=CO;var SO=Array.prototype,wO=SO.splice;function kO(t){var e=this.__data__,r=qi(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():wO.call(e,r,1),--this.size,!0}var QR=kO;function EO(t){var e=this.__data__,r=qi(e,t);return r<0?void 0:e[r][1]}var ZR=EO;function $O(t){return qi(this.__data__,t)>-1}var eb=$O;function NO(t,e){var r=this.__data__,n=qi(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var tb=NO;function Gs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Gs.prototype.clear=JR;Gs.prototype.delete=QR;Gs.prototype.get=ZR;Gs.prototype.has=eb;Gs.prototype.set=tb;var Gi=Gs;var _O=Sr($t,"Map"),ji=_O;function PO(){this.size=0,this.__data__={hash:new _h,map:new(ji||Gi),string:new _h}}var rb=PO;function IO(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var nb=IO;function DO(t,e){var r=t.__data__;return nb(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Hi=DO;function OO(t){var e=Hi(this,t).delete(t);return this.size-=e?1:0,e}var ib=OO;function LO(t){return Hi(this,t).get(t)}var ob=LO;function MO(t){return Hi(this,t).has(t)}var sb=MO;function FO(t,e){var r=Hi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var ab=FO;function js(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}js.prototype.clear=rb;js.prototype.delete=ib;js.prototype.get=ob;js.prototype.has=sb;js.prototype.set=ab;var So=js;var UO="Expected a function";function Ph(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(UO);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(Ph.Cache||So),r}Ph.Cache=So;var cb=Ph;var qO=500;function GO(t){var e=cb(t,function(n){return r.size===qO&&r.clear(),n}),r=e.cache;return e}var lb=GO;var jO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,HO=/\\(\\)?/g,KO=lb(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(jO,function(r,n,i,o){e.push(i?o.replace(HO,"$1"):n||r)}),e}),ub=KO;function WO(t){return t==null?"":uR(t)}var fb=WO;function BO(t,e){return z(t)?t:Us(t,e)?[t]:ub(fb(t))}var Ki=BO;var zO=1/0;function VO(t){if(typeof t=="string"||_n(t))return t;var e=t+"";return e=="0"&&1/t==-zO?"-0":e}var Fn=VO;function XO(t,e){e=Ki(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Fn(e[r++])];return r&&r==n?t:void 0}var Hs=XO;function YO(t,e,r){var n=t==null?void 0:Hs(t,e);return n===void 0?r:n}var db=YO;function JO(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Ks=JO;var pb=Ut?Ut.isConcatSpreadable:void 0;function QO(t){return z(t)||Fi(t)||!!(pb&&t&&t[pb])}var mb=QO;function hb(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=mb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?hb(a,e-1,r,n,i):Ks(i,a):n||(i[i.length]=a)}return i}var Ws=hb;function ZO(t){var e=t==null?0:t.length;return e?Ws(t,1):[]}var gt=ZO;var e0=nf(Object.getPrototypeOf,Object),sf=e0;function t0(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var af=t0;function r0(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var yb=r0;function n0(){this.__data__=new Gi,this.size=0}var gb=n0;function i0(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var Tb=i0;function o0(t){return this.__data__.get(t)}var vb=o0;function s0(t){return this.__data__.has(t)}var xb=s0;var a0=200;function c0(t,e){var r=this.__data__;if(r instanceof Gi){var n=r.__data__;if(!ji||n.length<a0-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new So(n)}return r.set(t,e),this.size=r.size,this}var Rb=c0;function Bs(t){var e=this.__data__=new Gi(t);this.size=e.size}Bs.prototype.clear=gb;Bs.prototype.delete=Tb;Bs.prototype.get=vb;Bs.prototype.has=xb;Bs.prototype.set=Rb;var Wi=Bs;function l0(t,e){return t&&On(e,He(e),t)}var bb=l0;function u0(t,e){return t&&On(e,Ui(e),t)}var Ab=u0;var kb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Cb=kb&&typeof module=="object"&&module&&!module.nodeType&&module,f0=Cb&&Cb.exports===kb,Sb=f0?$t.Buffer:void 0,wb=Sb?Sb.allocUnsafe:void 0;function d0(t,e){if(e)return t.slice();var r=t.length,n=wb?wb(r):new t.constructor(r);return t.copy(n),n}var Eb=d0;function p0(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var zs=p0;function m0(){return[]}var cf=m0;var h0=Object.prototype,y0=h0.propertyIsEnumerable,$b=Object.getOwnPropertySymbols,g0=$b?function(t){return t==null?[]:(t=Object(t),zs($b(t),function(e){return y0.call(t,e)}))}:cf,Vs=g0;function T0(t,e){return On(t,Vs(t),e)}var Nb=T0;var v0=Object.getOwnPropertySymbols,x0=v0?function(t){for(var e=[];t;)Ks(e,Vs(t)),t=sf(t);return e}:cf,lf=x0;function R0(t,e){return On(t,lf(t),e)}var _b=R0;function b0(t,e,r){var n=e(t);return z(t)?n:Ks(n,r(t))}var uf=b0;function A0(t){return uf(t,He,Vs)}var vc=A0;function C0(t){return uf(t,Ui,lf)}var ff=C0;var S0=Sr($t,"DataView"),df=S0;var w0=Sr($t,"Promise"),pf=w0;var k0=Sr($t,"Set"),Bi=k0;var Pb="[object Map]",E0="[object Object]",Ib="[object Promise]",Db="[object Set]",Ob="[object WeakMap]",Lb="[object DataView]",$0=li(df),N0=li(ji),_0=li(pf),P0=li(Bi),I0=li(Qu),wo=hr;(df&&wo(new df(new ArrayBuffer(1)))!=Lb||ji&&wo(new ji)!=Pb||pf&&wo(pf.resolve())!=Ib||Bi&&wo(new Bi)!=Db||Qu&&wo(new Qu)!=Ob)&&(wo=function(t){var e=hr(t),r=e==E0?t.constructor:void 0,n=r?li(r):"";if(n)switch(n){case $0:return Lb;case N0:return Pb;case _0:return Ib;case P0:return Db;case I0:return Ob}return e});var gn=wo;var D0=Object.prototype,O0=D0.hasOwnProperty;function L0(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&O0.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Mb=L0;var M0=$t.Uint8Array,Xs=M0;function F0(t){var e=new t.constructor(t.byteLength);return new Xs(e).set(new Xs(t)),e}var Ys=F0;function U0(t,e){var r=e?Ys(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Fb=U0;var q0=/\w*$/;function G0(t){var e=new t.constructor(t.source,q0.exec(t));return e.lastIndex=t.lastIndex,e}var Ub=G0;var qb=Ut?Ut.prototype:void 0,Gb=qb?qb.valueOf:void 0;function j0(t){return Gb?Object(Gb.call(t)):{}}var jb=j0;function H0(t,e){var r=e?Ys(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var Hb=H0;var K0="[object Boolean]",W0="[object Date]",B0="[object Map]",z0="[object Number]",V0="[object RegExp]",X0="[object Set]",Y0="[object String]",J0="[object Symbol]",Q0="[object ArrayBuffer]",Z0="[object DataView]",eL="[object Float32Array]",tL="[object Float64Array]",rL="[object Int8Array]",nL="[object Int16Array]",iL="[object Int32Array]",oL="[object Uint8Array]",sL="[object Uint8ClampedArray]",aL="[object Uint16Array]",cL="[object Uint32Array]";function lL(t,e,r){var n=t.constructor;switch(e){case Q0:return Ys(t);case K0:case W0:return new n(+t);case Z0:return Fb(t,r);case eL:case tL:case rL:case nL:case iL:case oL:case sL:case aL:case cL:return Hb(t,r);case B0:return new n;case z0:case Y0:return new n(t);case V0:return Ub(t);case X0:return new n;case J0:return jb(t)}}var Kb=lL;function uL(t){return typeof t.constructor=="function"&&!Ln(t)?bR(sf(t)):{}}var Wb=uL;var fL="[object Map]";function dL(t){return yt(t)&&gn(t)==fL}var Bb=dL;var zb=Qr&&Qr.isMap,pL=zb?Mn(zb):Bb,Vb=pL;var mL="[object Set]";function hL(t){return yt(t)&&gn(t)==mL}var Xb=hL;var Yb=Qr&&Qr.isSet,yL=Yb?Mn(Yb):Xb,Jb=yL;var gL=1,TL=2,vL=4,Qb="[object Arguments]",xL="[object Array]",RL="[object Boolean]",bL="[object Date]",AL="[object Error]",Zb="[object Function]",CL="[object GeneratorFunction]",SL="[object Map]",wL="[object Number]",eA="[object Object]",kL="[object RegExp]",EL="[object Set]",$L="[object String]",NL="[object Symbol]",_L="[object WeakMap]",PL="[object ArrayBuffer]",IL="[object DataView]",DL="[object Float32Array]",OL="[object Float64Array]",LL="[object Int8Array]",ML="[object Int16Array]",FL="[object Int32Array]",UL="[object Uint8Array]",qL="[object Uint8ClampedArray]",GL="[object Uint16Array]",jL="[object Uint32Array]",Ke={};Ke[Qb]=Ke[xL]=Ke[PL]=Ke[IL]=Ke[RL]=Ke[bL]=Ke[DL]=Ke[OL]=Ke[LL]=Ke[ML]=Ke[FL]=Ke[SL]=Ke[wL]=Ke[eA]=Ke[kL]=Ke[EL]=Ke[$L]=Ke[NL]=Ke[UL]=Ke[qL]=Ke[GL]=Ke[jL]=!0;Ke[AL]=Ke[Zb]=Ke[_L]=!1;function mf(t,e,r,n,i,o){var s,a=e&gL,c=e&TL,l=e&vL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!st(t))return t;var u=z(t);if(u){if(s=Mb(t),!a)return CR(t,s)}else{var f=gn(t),m=f==Zb||f==CL;if(ui(t))return Eb(t,a);if(f==eA||f==Qb||m&&!i){if(s=c||m?{}:Wb(t),!a)return c?_b(t,Ab(s,t)):Nb(t,bb(s,t))}else{if(!Ke[f])return i?t:{};s=Kb(t,f,a)}}o||(o=new Wi);var v=o.get(t);if(v)return v;o.set(t,s),Jb(t)?t.forEach(function(N){s.add(mf(N,e,r,N,t,o))}):Vb(t)&&t.forEach(function(N,S){s.set(S,mf(N,e,r,S,t,o))});var A=l?c?ff:vc:c?Ui:He,C=u?void 0:A(t);return Zu(C||t,function(N,S){C&&(S=N,N=t[S]),Li(s,S,mf(N,e,r,S,t,o))}),s}var tA=mf;var HL=4;function KL(t){return tA(t,HL)}var We=KL;function WL(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Un=WL;var BL="__lodash_hash_undefined__";function zL(t){return this.__data__.set(t,BL),this}var rA=zL;function VL(t){return this.__data__.has(t)}var nA=VL;function hf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new So;++e<r;)this.add(t[e])}hf.prototype.add=hf.prototype.push=rA;hf.prototype.has=nA;var Js=hf;function XL(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var yf=XL;function YL(t,e){return t.has(e)}var Qs=YL;var JL=1,QL=2;function ZL(t,e,r,n,i,o){var s=r&JL,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=o.get(t),u=o.get(e);if(l&&u)return l==e&&u==t;var f=-1,m=!0,v=r&QL?new Js:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var A=t[f],C=e[f];if(n)var N=s?n(C,A,f,e,t,o):n(A,C,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(v){if(!yf(e,function(S,T){if(!Qs(v,T)&&(A===S||i(A,S,r,n,o)))return v.push(T)})){m=!1;break}}else if(!(A===C||i(A,C,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var gf=ZL;function eM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var iA=eM;function tM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var Zs=tM;var rM=1,nM=2,iM="[object Boolean]",oM="[object Date]",sM="[object Error]",aM="[object Map]",cM="[object Number]",lM="[object RegExp]",uM="[object Set]",fM="[object String]",dM="[object Symbol]",pM="[object ArrayBuffer]",mM="[object DataView]",oA=Ut?Ut.prototype:void 0,Ih=oA?oA.valueOf:void 0;function hM(t,e,r,n,i,o,s){switch(r){case mM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case pM:return!(t.byteLength!=e.byteLength||!o(new Xs(t),new Xs(e)));case iM:case oM:case cM:return Dn(+t,+e);case sM:return t.name==e.name&&t.message==e.message;case lM:case fM:return t==e+"";case aM:var a=iA;case uM:var c=n&rM;if(a||(a=Zs),t.size!=e.size&&!c)return!1;var l=s.get(t);if(l)return l==e;n|=nM,s.set(t,e);var u=gf(a(t),a(e),n,i,o,s);return s.delete(t),u;case dM:if(Ih)return Ih.call(t)==Ih.call(e)}return!1}var sA=hM;var yM=1,gM=Object.prototype,TM=gM.hasOwnProperty;function vM(t,e,r,n,i,o){var s=r&yM,a=vc(t),c=a.length,l=vc(e),u=l.length;if(c!=u&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:TM.call(e,m)))return!1}var v=o.get(t),A=o.get(e);if(v&&A)return v==e&&A==t;var C=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<c;){m=a[f];var S=t[m],T=e[m];if(n)var y=s?n(T,S,m,e,t,o):n(S,T,m,t,e,o);if(!(y===void 0?S===T||i(S,T,r,n,o):y)){C=!1;break}N||(N=m=="constructor")}if(C&&!N){var $=t.constructor,D=e.constructor;$!=D&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(C=!1)}return o.delete(t),o.delete(e),C}var aA=vM;var xM=1,cA="[object Arguments]",lA="[object Array]",Tf="[object Object]",RM=Object.prototype,uA=RM.hasOwnProperty;function bM(t,e,r,n,i,o){var s=z(t),a=z(e),c=s?lA:gn(t),l=a?lA:gn(e);c=c==cA?Tf:c,l=l==cA?Tf:l;var u=c==Tf,f=l==Tf,m=c==l;if(m&&ui(t)){if(!ui(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new Wi),s||Fs(t)?gf(t,e,r,n,i,o):sA(t,e,c,r,n,i,o);if(!(r&xM)){var v=u&&uA.call(t,"__wrapped__"),A=f&&uA.call(e,"__wrapped__");if(v||A){var C=v?t.value():t,N=A?e.value():e;return o||(o=new Wi),i(C,N,r,n,o)}}return m?(o||(o=new Wi),aA(t,e,r,n,i,o)):!1}var fA=bM;function dA(t,e,r,n,i){return t===e?!0:t==null||e==null||!yt(t)&&!yt(e)?t!==t&&e!==e:fA(t,e,r,n,dA,i)}var vf=dA;var AM=1,CM=2;function SM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var c=a[0],l=t[c],u=a[1];if(s&&a[2]){if(l===void 0&&!(c in t))return!1}else{var f=new Wi;if(n)var m=n(l,u,c,t,e,f);if(!(m===void 0?vf(u,l,AM|CM,n,f):m))return!1}}return!0}var pA=SM;function wM(t){return t===t&&!st(t)}var xf=wM;function kM(t){for(var e=He(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,xf(i)]}return e}var mA=kM;function EM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Rf=EM;function $M(t){var e=mA(t);return e.length==1&&e[0][2]?Rf(e[0][0],e[0][1]):function(r){return r===t||pA(r,t,e)}}var hA=$M;function NM(t,e){return t!=null&&e in Object(t)}var yA=NM;function _M(t,e,r){e=Ki(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Fn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Ms(i)&&Oi(s,i)&&(z(t)||Fi(t)))}var bf=_M;function PM(t,e){return t!=null&&bf(t,e,yA)}var gA=PM;var IM=1,DM=2;function OM(t,e){return Us(t)&&xf(e)?Rf(Fn(t),e):function(r){var n=db(r,t);return n===void 0&&n===e?gA(r,t):vf(e,n,IM|DM)}}var TA=OM;function LM(t){return function(e){return e?.[t]}}var vA=LM;function MM(t){return function(e){return Hs(e,t)}}var xA=MM;function FM(t){return Us(t)?vA(Fn(t)):xA(t)}var RA=FM;function UM(t){return typeof t=="function"?t:t==null?Cr:typeof t=="object"?z(t)?TA(t[0],t[1]):hA(t):RA(t)}var pt=UM;function qM(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var bA=qM;function GM(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[t?a:++i];if(r(o[c],c,o)===!1)break}return e}}var AA=GM;var jM=AA(),CA=jM;function HM(t,e){return t&&CA(t,e,He)}var SA=HM;function KM(t,e){return function(r,n){if(r==null)return r;if(!Nt(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var wA=KM;var WM=wA(SA),wr=WM;function BM(t,e,r,n){return wr(t,function(i,o,s){e(n,i,r(i),s)}),n}var kA=BM;function zM(t,e){return function(r,n){var i=z(r)?bA:kA,o=e?e():{};return i(r,t,pt(n,2),o)}}var EA=zM;var $A=Object.prototype,VM=$A.hasOwnProperty,XM=Ls(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Mi(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Ui(o),a=-1,c=s.length;++a<c;){var l=s[a],u=t[l];(u===void 0||Dn(u,$A[l])&&!VM.call(t,l))&&(t[l]=o[l])}return t}),ea=XM;function YM(t){return yt(t)&&Nt(t)}var Dh=YM;function JM(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Af=JM;var QM=200;function ZM(t,e,r,n){var i=-1,o=tf,s=!0,a=t.length,c=[],l=e.length;if(!a)return c;r&&(e=Pn(e,Mn(r))),n?(o=Af,s=!1):e.length>=QM&&(o=Qs,s=!1,e=new Js(e));e:for(;++i<a;){var u=t[i],f=r==null?u:r(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;c.push(u)}else o(e,f,n)||c.push(u)}return c}var NA=ZM;var e1=Ls(function(t,e){return Dh(t)?NA(t,Ws(e,1,Dh,!0)):[]}),zi=e1;function t1(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var qn=t1;function r1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:In(e),af(t,e<0?0:e,n)):[]}var Tt=r1;function n1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:In(e),e=n-e,af(t,0,e<0?0:e)):[]}var di=n1;function i1(t){return typeof t=="function"?t:Cr}var _A=i1;function o1(t,e){var r=z(t)?Zu:wr;return r(t,_A(e))}var G=o1;function s1(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var PA=s1;function a1(t,e){var r=!0;return wr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var IA=a1;function c1(t,e,r){var n=z(t)?PA:IA;return r&&Mi(t,e,r)&&(e=void 0),n(t,pt(e,3))}var cr=c1;function l1(t,e){var r=[];return wr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var Cf=l1;function u1(t,e){var r=z(t)?zs:Cf;return r(t,pt(e,3))}var qt=u1;function f1(t){return function(e,r,n){var i=Object(e);if(!Nt(e)){var o=pt(r,3);e=He(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var DA=f1;var d1=Math.max;function p1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:In(r);return i<0&&(i=d1(n+i,0)),ef(t,pt(e,3),i)}var OA=p1;var m1=DA(OA),Gn=m1;function h1(t){return t&&t.length?t[0]:void 0}var Gt=h1;function y1(t,e){var r=-1,n=Nt(t)?Array(t.length):[];return wr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var LA=y1;function g1(t,e){var r=z(t)?Pn:LA;return r(t,pt(e,3))}var L=g1;function T1(t,e){return Ws(L(t,e),1)}var Zt=T1;var v1=Object.prototype,x1=v1.hasOwnProperty,R1=EA(function(t,e,r){x1.call(t,r)?t[r].push(e):Os(t,r,[e])}),Oh=R1;var b1=Object.prototype,A1=b1.hasOwnProperty;function C1(t,e){return t!=null&&A1.call(t,e)}var MA=C1;function S1(t,e){return t!=null&&bf(t,e,MA)}var W=S1;var w1="[object String]";function k1(t){return typeof t=="string"||!z(t)&&yt(t)&&hr(t)==w1}var Ot=k1;function E1(t,e){return Pn(e,function(r){return t[r]})}var FA=E1;function $1(t){return t==null?[]:FA(t,He(t))}var Ie=$1;var N1=Math.max;function _1(t,e,r,n){t=Nt(t)?t:Ie(t),r=r&&!n?In(r):0;var i=t.length;return r<0&&(r=N1(i+r,0)),Ot(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ds(t,e,r)>-1}var et=_1;var P1=Math.max;function I1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:In(r);return i<0&&(i=P1(n+i,0)),Ds(t,e,i)}var Sf=I1;var D1="[object Map]",O1="[object Set]",L1=Object.prototype,M1=L1.hasOwnProperty;function F1(t){if(t==null)return!0;if(Nt(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||ui(t)||Fs(t)||Fi(t)))return!t.length;var e=gn(t);if(e==D1||e==O1)return!t.size;if(Ln(t))return!of(t).length;for(var r in t)if(M1.call(t,r))return!1;return!0}var se=F1;var U1="[object RegExp]";function q1(t){return yt(t)&&hr(t)==U1}var UA=q1;var qA=Qr&&Qr.isRegExp,G1=qA?Mn(qA):UA,Zr=G1;function j1(t){return t===void 0}var lr=j1;function H1(t,e){return t<e}var GA=H1;function K1(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!_n(s):r(s,a)))var a=s,c=o}return c}var jA=K1;function W1(t){return t&&t.length?jA(t,Cr,GA):void 0}var HA=W1;var B1="Expected a function";function z1(t){if(typeof t!="function")throw new TypeError(B1);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var KA=z1;function V1(t,e,r,n){if(!st(t))return t;e=Ki(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var c=Fn(e[i]),l=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=s){var u=a[c];l=n?n(u,c,a):void 0,l===void 0&&(l=st(u)?u:Oi(e[i+1])?[]:{})}Li(a,c,l),a=a[c]}return t}var WA=V1;function X1(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Hs(t,s);r(a,s)&&WA(o,Ki(s,t),a)}return o}var BA=X1;function Y1(t,e){if(t==null)return{};var r=Pn(ff(t),function(n){return[n]});return e=pt(e),BA(t,r,function(n,i){return e(n,i[0])})}var kr=Y1;function J1(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var zA=J1;function Q1(t,e,r){var n=z(t)?yb:zA,i=arguments.length<3;return n(t,pt(e,4),r,i,wr)}var ct=Q1;function Z1(t,e){var r=z(t)?zs:Cf;return r(t,KA(pt(e,3)))}var Vi=Z1;function eF(t,e){var r;return wr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var VA=eF;function tF(t,e,r){var n=z(t)?yf:VA;return r&&Mi(t,e,r)&&(e=void 0),n(t,pt(e,3))}var xc=tF;var rF=1/0,nF=Bi&&1/Zs(new Bi([,-0]))[1]==rF?function(t){return new Bi(t)}:at,XA=nF;var iF=200;function oF(t,e,r){var n=-1,i=tf,o=t.length,s=!0,a=[],c=a;if(r)s=!1,i=Af;else if(o>=iF){var l=e?null:XA(t);if(l)return Zs(l);s=!1,i=Qs,c=new Js}else c=e?[]:a;e:for(;++n<o;){var u=t[n],f=e?e(u):u;if(u=r||u!==0?u:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(u)}else i(c,f,r)||(c!==a&&c.push(f),a.push(u))}return a}var wf=oF;function sF(t){return t&&t.length?wf(t):[]}var ta=sF;function aF(t,e){return t&&t.length?wf(t,pt(e,2)):[]}var YA=aF;function ra(t){console&&console.error&&console.error(`Error: ${t}`)}function Rc(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function bc(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Ac(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function cF(t){return lF(t)?t.LABEL:t.name}function lF(t){return Ot(t.LABEL)&&t.LABEL!==""}var qr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},we=class extends qr{constructor(e){super([]),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},gr=class extends qr{constructor(e){super(e.definition),this.orgText="",Qt(this,kr(e,r=>r!==void 0))}},Be=class extends qr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Qt(this,kr(e,r=>r!==void 0))}},ke=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},ze=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},Ve=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},pe=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},Me=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,kr(e,r=>r!==void 0))}},Fe=class extends qr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Qt(this,kr(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Qt(this,kr(e,r=>r!==void 0))}accept(e){e.visit(this)}};function kf(t){return L(t,na)}function na(t){function e(r){return L(r,na)}if(t instanceof we){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Ot(t.label)&&(r.label=t.label),r}else{if(t instanceof Be)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof ze)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:na(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Me)return{type:"RepetitionWithSeparator",idx:t.idx,separator:na(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Fe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:cF(t.terminalType),idx:t.idx};Ot(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=Zr(n)?n.source:n),r}else{if(t instanceof gr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var Tr=class{visit(e){let r=e;switch(r.constructor){case we:return this.visitNonTerminal(r);case Be:return this.visitAlternative(r);case ke:return this.visitOption(r);case ze:return this.visitRepetitionMandatory(r);case Ve:return this.visitRepetitionMandatoryWithSeparator(r);case Me:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Fe:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case gr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Lh(t){return t instanceof Be||t instanceof ke||t instanceof pe||t instanceof ze||t instanceof Ve||t instanceof Me||t instanceof ae||t instanceof gr}function ko(t,e=[]){return t instanceof ke||t instanceof pe||t instanceof Me?!0:t instanceof Fe?xc(t.definition,n=>ko(n,e)):t instanceof we&&et(e,t)?!1:t instanceof qr?(t instanceof we&&e.push(t),cr(t.definition,n=>ko(n,e))):!1}function Mh(t){return t instanceof Fe}function Er(t){if(t instanceof we)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var pi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=Tt(e.definition,i+1);if(n instanceof we)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof Be)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof ze)this.walkAtLeastOne(n,o,r);else if(n instanceof Ve)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Me)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Fe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=JA(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=JA(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new Be({definition:[o]});this.walk(s,i)})}};function JA(t,e,r){return[new ke({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function Eo(t){if(t instanceof we)return Eo(t.referencedRule);if(t instanceof ae)return dF(t);if(Lh(t))return uF(t);if(Mh(t))return fF(t);throw Error("non exhaustive match")}function uF(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=ko(o),e=e.concat(Eo(o)),n=n+1,i=r.length>n;return ta(e)}function fF(t){let e=L(t.definition,r=>Eo(r));return ta(gt(e))}function dF(t){return[t.terminalType]}var Ef="_~IN~_";var Fh=class extends pi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=pF(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new Be({definition:o}),a=Eo(s);this.follows[i]=a}};function QA(t){let e={};return G(t,r=>{let n=new Fh(r).startWalking();Qt(e,n)}),e}function pF(t,e){return t.name+e+Ef}var $f={},mF=new vo;function ia(t){let e=t.toString();if($f.hasOwnProperty(e))return $f[e];{let r=mF.pattern(e);return $f[e]=r,r}}function ZA(){$f={}}var tC="Complement Sets are not supported for first char optimization",Cc=`Unable to use "first char" lexer optimizations:
`;function rC(t,e=!1){try{let r=ia(t);return Uh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===tC)e&&Rc(`${Cc}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ra(`${Cc}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Uh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Uh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Nf(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(tC);G(s.value,c=>{if(typeof c=="number")Nf(c,e,r);else{let l=c;if(r===!0)for(let u=l.from;u<=l.to;u++)Nf(u,e,r);else{for(let u=l.from;u<=l.to&&u<oa;u++)Nf(u,e,r);if(l.to>=oa){let u=l.from>=oa?l.from:oa,f=l.to,m=jn(u),v=jn(f);for(let A=m;A<=v;A++)e[A]=A}}}});break;case"Group":Uh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&qh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Ie(e)}function Nf(t,e,r){let n=jn(t);e[n]=n,r===!0&&hF(t,e)}function hF(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=jn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=jn(i.charCodeAt(0));e[o]=o}}}function eC(t,e){return Gn(t.value,r=>{if(typeof r=="number")return et(e,r);{let n=r;return Gn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function qh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?cr(t.value,qh):qh(t.value):!1}var Gh=class extends $n{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?eC(e,this.targetCharCodes)===void 0&&(this.found=!0):eC(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function _f(t,e){if(e instanceof RegExp){let r=ia(e),n=new Gh(t);return n.visit(r),n.found}else return Gn(e,r=>et(t,r.charCodeAt(0)))!==void 0}var $o="PATTERN",sa="defaultMode",Pf="modes",Hh=typeof new RegExp("(?:)").sticky=="boolean";function oC(t,e){e=ea(e,{useSticky:Hh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(T,y)=>y()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{IF()});let n;r("Reject Lexer.NA",()=>{n=Vi(t,T=>T[$o]===mt.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,T=>{let y=T[$o];if(Zr(y)){let $=y.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!y.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?iC(y):nC(y)}else{if(yr(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{let $=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?iC(D):nC(D)}}else throw Error("non exhaustive match")}})});let s,a,c,l,u;r("misc mapping",()=>{s=L(n,T=>T.tokenTypeIdx),a=L(n,T=>{let y=T.GROUP;if(y!==mt.SKIPPED){if(Ot(y))return y;if(lr(y))return!1;throw Error("non exhaustive match")}}),c=L(n,T=>{let y=T.LONGER_ALT;if(y)return z(y)?L(y,D=>Sf(n,D)):[Sf(n,y)]}),l=L(n,T=>T.PUSH_MODE),u=L(n,T=>W(T,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let T=pC(e.lineTerminatorCharacters);f=L(n,y=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,y=>W(y,"LINE_BREAKS")?!!y.LINE_BREAKS:dC(y,T)===!1&&_f(T,y.PATTERN)))});let m,v,A,C;r("Misc Mapping #2",()=>{m=L(n,uC),v=L(o,_F),A=ct(n,(T,y)=>{let $=y.GROUP;return Ot($)&&$!==mt.SKIPPED&&(T[$]=[]),T},{}),C=L(o,(T,y)=>({pattern:o[y],longerAlt:c[y],canLineTerminator:f[y],isCustom:m[y],short:v[y],group:a[y],push:l[y],pop:u[y],tokenTypeIdx:s[y],tokenType:n[y]}))});let N=!0,S=[];return e.safeMode||r("First Char Optimization",()=>{S=ct(n,(T,y,$)=>{if(typeof y.PATTERN=="string"){let D=y.PATTERN.charCodeAt(0),X=jn(D);jh(T,X,C[$])}else if(z(y.START_CHARS_HINT)){let D;G(y.START_CHARS_HINT,X=>{let ge=typeof X=="string"?X.charCodeAt(0):X,Ee=jn(ge);D!==Ee&&(D=Ee,jh(T,Ee,C[$]))})}else if(Zr(y.PATTERN))if(y.PATTERN.unicode)N=!1,e.ensureOptimizations&&ra(`${Cc}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=rC(y.PATTERN,e.ensureOptimizations);se(D)&&(N=!1),G(D,X=>{jh(T,X,C[$])})}else e.ensureOptimizations&&ra(`${Cc}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return T},[])}),{emptyGroups:A,patternIdxToConfig:C,charCodeToPatternIdxToConfig:S,hasCustom:i,canBeOptimized:N}}function sC(t,e){let r=[],n=gF(t);r=r.concat(n.errors);let i=TF(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(yF(o)),r=r.concat(wF(o)),r=r.concat(kF(o,e)),r=r.concat(EF(o)),r}function yF(t){let e=[],r=qt(t,n=>Zr(n[$o]));return e=e.concat(xF(r)),e=e.concat(AF(r)),e=e.concat(CF(r)),e=e.concat(SF(r)),e=e.concat(RF(r)),e}function gF(t){let e=qt(t,i=>!W(i,$o)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=zi(t,e);return{errors:r,valid:n}}function TF(t){let e=qt(t,i=>{let o=i[$o];return!Zr(o)&&!yr(o)&&!W(o,"exec")&&!Ot(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=zi(t,e);return{errors:r,valid:n}}var vF=/[^\\][$]/;function xF(t){class e extends $n{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=ia(o),a=new e;return a.visit(s),a.found}catch{return vF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function RF(t){let e=qt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var bF=/[^\\[][\^]|^\^/;function AF(t){class e extends $n{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=ia(o),a=new e;return a.visit(s),a.found}catch{return bF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function CF(t){let e=qt(t,n=>{let i=n[$o];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function SF(t){let e=[],r=L(t,o=>ct(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==mt.NA&&(e.push(a),s.push(a)),s),[]));r=Un(r);let n=qt(r,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${Gt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function wF(t){let e=qt(t,n=>{if(!W(n,"GROUP"))return!1;let i=n.GROUP;return i!==mt.SKIPPED&&i!==mt.NA&&!Ot(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function kF(t,e){let r=qt(t,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function EF(t){let e=[],r=ct(t,(n,i,o)=>{let s=i.PATTERN;return s===mt.NA||(Ot(s)?n.push({str:s,idx:o,tokenType:i}):Zr(s)&&NF(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&$F(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function $F(t,e){if(Zr(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(yr(e))return e(t,0,[],{});if(W(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function NF(t){return Gn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function nC(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function iC(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function aC(t,e,r){let n=[];return W(t,sa)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+sa+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),W(t,Pf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Pf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),W(t,Pf)&&W(t,sa)&&!W(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${sa}: <${t.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),W(t,Pf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(lr(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(W(s,"LONGER_ALT")){let c=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,l=>{!lr(l)&&!et(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function cC(t,e,r){let n=[],i=!1,o=Un(gt(Ie(t.modes))),s=Vi(o,c=>c[$o]===mt.NA),a=pC(r);return e&&G(s,c=>{let l=dC(c,a);if(l!==!1){let f={message:PF(c,l),type:l.issue,tokenType:c};n.push(f)}else W(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):_f(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function lC(t){let e={},r=He(t);return G(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function uC(t){let e=t.PATTERN;if(Zr(e))return!1;if(yr(e))return!0;if(W(e,"exec"))return!0;if(Ot(e))return!1;throw Error("non exhaustive match")}function _F(t){return Ot(t)&&t.length===1?t.charCodeAt(0):!1}var fC={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function dC(t,e){if(W(t,"LINE_BREAKS"))return!1;if(Zr(t.PATTERN)){try{_f(e,t.PATTERN)}catch(r){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Ot(t.PATTERN))return!1;if(uC(t))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function PF(t,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function pC(t){return L(t,r=>Ot(r)?r.charCodeAt(0):r)}function jh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var oa=256,If=[];function jn(t){return t<oa?t:If[t]}function IF(){if(se(If)){If=new Array(65536);for(let t=0;t<65536;t++)If[t]=t>255?255+~~(t/255):t}}function mi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function aa(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var mC=1,yC={};function hi(t){let e=DF(t);OF(e),MF(e),LF(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function DF(t){let e=We(t),r=t,n=!0;for(;n;){r=Un(gt(L(r,o=>o.CATEGORIES)));let i=zi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function OF(t){G(t,e=>{Kh(e)||(yC[mC]=e,e.tokenTypeIdx=mC++),hC(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),hC(e)||(e.CATEGORIES=[]),FF(e)||(e.categoryMatches=[]),UF(e)||(e.categoryMatchesMap={})})}function LF(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(yC[n].tokenTypeIdx)})})}function MF(t){G(t,e=>{gC([],e)})}function gC(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);et(n,r)||gC(n,r)})}function Kh(t){return W(t,"tokenTypeIdx")}function hC(t){return W(t,"CATEGORIES")}function FF(t){return W(t,"categoryMatches")}function UF(t){return W(t,"categoryMatchesMap")}function TC(t){return W(t,"tokenTypeIdx")}var Wh={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var tt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var Sc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Wh,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Sc);var mt=class{constructor(e,r=Sc){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=bc(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Qt({},Sc,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Sc.lineTerminatorsPattern)this.config.lineTerminatorsPattern=fC;else if(this.config.lineTerminatorCharacters===Sc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:We(e)},defaultMode:sa}:(o=!1,i=We(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(aC(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(cC(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=Vi(a,l=>lr(l))});let s=He(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(sC(a,s))}),se(this.lexerDefinitionErrors)){hi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=oC(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Qt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{Rc(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Hh?(this.chopInput=Cr,this.match=this.matchWithTest):(this.updateLastIndex=at,this.match=this.matchWithExec),o&&(this.handleModes=at),this.trackStartLines===!1&&(this.computeNewColumn=Cr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=at),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=ct(this.canModeBeOptimized,(c,l,u)=>(l===!1&&c.push(u),c),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{ZA()}),this.TRACE_INIT("toFastProperties",()=>{Ac(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,c,l,u,f,m,v,A,C,N,S,T,y=e,$=y.length,D=0,X=0,ge=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ge),Ht=[],xt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,w=lC(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],Rt=[],lt=[];Object.freeze(lt);let me;function $r(){return ee}function Hn(bt){let er=jn(bt),Rn=Q[er];return Rn===void 0?lt:Rn}let Ra=bt=>{if(Rt.length===1&&bt.tokenType.PUSH_MODE===void 0){let er=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(bt);Ht.push({offset:bt.startOffset,line:bt.startLine,column:bt.startColumn,length:bt.image.length,message:er})}else{Rt.pop();let er=qn(Rt);ee=this.patternIdxToConfig[er],Q=this.charCodeToPatternIdxToConfig[er],ce=ee.length;let Rn=this.canModeBeOptimized[er]&&this.config.safeMode===!1;Q&&Rn?me=Hn:me=$r}};function Qi(bt){Rt.push(bt),Q=this.charCodeToPatternIdxToConfig[bt],ee=this.patternIdxToConfig[bt],ce=ee.length,ce=ee.length;let er=this.canModeBeOptimized[bt]&&this.config.safeMode===!1;Q&&er?me=Hn:me=$r}Qi.call(this,r);let ur,Mo=this.config.recoveryEnabled;for(;D<$;){c=null;let bt=y.charCodeAt(D),er=me(bt),Rn=er.length;for(n=0;n<Rn;n++){ur=er[n];let Kt=ur.pattern;l=null;let ut=ur.short;if(ut!==!1?bt===ut&&(c=Kt):ur.isCustom===!0?(T=Kt.exec(y,D,Ee,w),T!==null?(c=T[0],T.payload!==void 0&&(l=T.payload)):c=null):(this.updateLastIndex(Kt,D),c=this.match(Kt,e,D)),c!==null){if(a=ur.longerAlt,a!==void 0){let Gr=a.length;for(o=0;o<Gr;o++){let Nr=ee[a[o]],xr=Nr.pattern;if(u=null,Nr.isCustom===!0?(T=xr.exec(y,D,Ee,w),T!==null?(s=T[0],T.payload!==void 0&&(u=T.payload)):s=null):(this.updateLastIndex(xr,D),s=this.match(xr,e,D)),s&&s.length>c.length){c=s,l=u,ur=Nr;break}}}break}}if(c!==null){if(f=c.length,m=ur.group,m!==void 0&&(v=ur.tokenTypeIdx,A=this.createTokenInstance(c,D,v,ur.tokenType,xt,M,f),this.handlePayload(A,l),m===!1?X=this.addToken(Ee,X,A):w[m].push(A)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&ur.canLineTerminator===!0){let Kt=0,ut,Gr;j.lastIndex=0;do ut=j.test(c),ut===!0&&(Gr=j.lastIndex-1,Kt++);while(ut===!0);Kt!==0&&(xt=xt+Kt,M=f-Gr,this.updateTokenEndLineColumnLocation(A,m,Gr,Kt,xt,M,f))}this.handleModes(ur,Ra,Qi,A)}else{let Kt=D,ut=xt,Gr=M,Nr=Mo===!1;for(;Nr===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<ce;i++){let xr=ee[i],Zi=xr.pattern,xi=xr.short;if(xi!==!1?y.charCodeAt(D)===xi&&(Nr=!0):xr.isCustom===!0?Nr=Zi.exec(y,D,Ee,w)!==null:(this.updateLastIndex(Zi,D),Nr=Zi.exec(e)!==null),Nr===!0)break}if(C=D-Kt,M=this.computeNewColumn(M,C),S=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y,Kt,C,ut,Gr),Ht.push({offset:Kt,line:ut,column:Gr,length:C,message:S}),Mo===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:w,errors:Ht}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let c,l;r!==void 0&&(c=n===a-1,l=c?-1:0,i===1&&c===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};mt.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";mt.NA=/NOT_APPLICABLE/;function yi(t){return Bh(t)?t.LABEL:t.name}function Bh(t){return Ot(t.LABEL)&&t.LABEL!==""}var qF="parent",vC="categories",xC="label",RC="group",bC="push_mode",AC="pop_mode",CC="longer_alt",SC="line_breaks",wC="start_chars_hint";function Df(t){return GF(t)}function GF(t){let e=t.pattern,r={};if(r.name=t.name,lr(e)||(r.PATTERN=e),W(t,qF))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return W(t,vC)&&(r.CATEGORIES=t[vC]),hi([r]),W(t,xC)&&(r.LABEL=t[xC]),W(t,RC)&&(r.GROUP=t[RC]),W(t,AC)&&(r.POP_MODE=t[AC]),W(t,bC)&&(r.PUSH_MODE=t[bC]),W(t,CC)&&(r.LONGER_ALT=t[CC]),W(t,SC)&&(r.LINE_BREAKS=t[SC]),W(t,wC)&&(r.START_CHARS_HINT=t[wC]),r}var Tn=Df({name:"EOF",pattern:mt.NA});hi([Tn]);function No(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function wc(t,e){return mi(t,e)}var gi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${Bh(t)?`--> ${yi(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+Gt(e).image+"'";if(n)return o+n+a;{let c=ct(t,(m,v)=>m.concat(v),[]),l=L(c,m=>`[${L(m,v=>yi(v)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,v)=>`  ${v+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+Gt(e).image+"'";if(r)return i+r+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,l=>`[${L(l,u=>yi(u)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(gi);var kC={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},vn={buildDuplicateFoundError(t,e){function r(u){return u instanceof ae?u.terminalType.name:u instanceof we?u.nonTerminalName:""}let n=t.name,i=Gt(e),o=i.idx,s=Er(i),a=r(i),c=o>0,l=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>yi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>yi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=Er(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof gr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function EC(t,e){let r=new zh(t,e);return r.resolveRefs(),r.errors}var zh=class extends Tr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(Ie(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Lt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var Vh=class extends pi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=We(this.path.ruleStack).reverse(),this.occurrenceStack=We(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Of=class extends Vh{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new Be({definition:i});this.possibleTokTypes=Eo(o),this.found=!0}}},ca=class extends pi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Lf=class extends ca{walkMany(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},kc=class extends ca{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Mf=class extends ca{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Ec=class extends ca{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function Ff(t,e,r=[]){r=We(r);let n=[],i=0;function o(a){return a.concat(Tt(t,i+1))}function s(a){let c=Ff(o(a),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof Be)return s(a.definition);if(a instanceof we)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof ze){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof Ve){let c=[new Be({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Me){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Fe)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:Tt(t,i)}),n}function Uf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,l=c-n-1,u=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&qn(f).idx<=l&&f.pop();continue}let v=m.def,A=m.idx,C=m.ruleStack,N=m.occurrenceStack;if(se(v))continue;let S=v[0];if(S===i){let T={idx:A,def:Tt(v),ruleStack:di(C),occurrenceStack:di(N)};f.push(T)}else if(S instanceof ae)if(A<c-1){let T=A+1,y=e[T];if(r(y,S.terminalType)){let $={idx:T,def:Tt(v),ruleStack:C,occurrenceStack:N};f.push($)}}else if(A===c-1)u.push({nextTokenType:S.terminalType,nextTokenOccurrence:S.idx,ruleStack:C,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(S instanceof we){let T=We(C);T.push(S.nonTerminalName);let y=We(N);y.push(S.idx);let $={idx:A,def:S.definition.concat(o,Tt(v)),ruleStack:T,occurrenceStack:y};f.push($)}else if(S instanceof ke){let T={idx:A,def:Tt(v),ruleStack:C,occurrenceStack:N};f.push(T),f.push(s);let y={idx:A,def:S.definition.concat(Tt(v)),ruleStack:C,occurrenceStack:N};f.push(y)}else if(S instanceof ze){let T=new pe({definition:S.definition,idx:S.idx}),y=S.definition.concat([T],Tt(v)),$={idx:A,def:y,ruleStack:C,occurrenceStack:N};f.push($)}else if(S instanceof Ve){let T=new ae({terminalType:S.separator}),y=new pe({definition:[T].concat(S.definition),idx:S.idx}),$=S.definition.concat([y],Tt(v)),D={idx:A,def:$,ruleStack:C,occurrenceStack:N};f.push(D)}else if(S instanceof Me){let T={idx:A,def:Tt(v),ruleStack:C,occurrenceStack:N};f.push(T),f.push(s);let y=new ae({terminalType:S.separator}),$=new pe({definition:[y].concat(S.definition),idx:S.idx}),D=S.definition.concat([$],Tt(v)),X={idx:A,def:D,ruleStack:C,occurrenceStack:N};f.push(X)}else if(S instanceof pe){let T={idx:A,def:Tt(v),ruleStack:C,occurrenceStack:N};f.push(T),f.push(s);let y=new pe({definition:S.definition,idx:S.idx}),$=S.definition.concat([y],Tt(v)),D={idx:A,def:$,ruleStack:C,occurrenceStack:N};f.push(D)}else if(S instanceof Fe)for(let T=S.definition.length-1;T>=0;T--){let y=S.definition[T],$={idx:A,def:y.definition.concat(Tt(v)),ruleStack:C,occurrenceStack:N};f.push($),f.push(s)}else if(S instanceof Be)f.push({idx:A,def:S.definition.concat(Tt(v)),ruleStack:C,occurrenceStack:N});else if(S instanceof gr)f.push(jF(S,A,C,N));else throw Error("non exhaustive match")}return u}function jF(t,e,r,n){let i=We(r);i.push(t.name);let o=We(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function $c(t){if(t instanceof ke||t==="Option")return rt.OPTION;if(t instanceof pe||t==="Repetition")return rt.REPETITION;if(t instanceof ze||t==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(t instanceof Ve||t==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Me||t==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(t instanceof Fe||t==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Gf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=$c(n);return o===rt.ALTERNATION?la(e,r,i):ua(e,r,o,i)}function NC(t,e,r,n,i,o){let s=la(t,e,r),a=LC(s)?aa:mi;return o(s,n,a,i)}function _C(t,e,r,n,i,o){let s=ua(t,e,i,r),a=LC(s)?aa:mi;return o(s[0],a,n)}function PC(t,e,r,n){let i=t.length,o=cr(t,s=>cr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let l=t[c],u=l.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let v=l[m],A=v.length;for(let C=0;C<A;C++){let N=this.LA(C+1);if(r(N,v[C])===!1)continue e}return c}}};if(o&&!n){let s=L(t,c=>gt(c)),a=ct(s,(c,l,u)=>(G(l,f=>{W(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{W(c,m)||(c[m]=u)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],c=a.length;e:for(let l=0;l<c;l++){let u=a[l],f=u.length;for(let m=0;m<f;m++){let v=this.LA(m+1);if(r(v,u[m])===!1)continue e}return s}}}}function IC(t,e,r){let n=cr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=gt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=ct(o,(a,c,l)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let c=0;c<a;c++){let l=this.LA(c+1);if(e(l,s[c])===!1)continue e}return!0}return!1}}var Yh=class extends pi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,rt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,rt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},qf=class extends Tr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function $C(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function Xh(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function HF(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function DC(t,e){let r=L(t,s=>Ff([s],1)),n=$C(r.length),i=L(r,s=>{let a={};return G(s,c=>{let l=Xh(c.partialPath);G(l,u=>{a[u]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=$C(a.length);for(let c=0;c<a.length;c++){let l=a[c];for(let u=0;u<l.length;u++){let f=l[u].partialPath,m=l[u].suffixDef,v=Xh(f);if(HF(i,v,c)||se(m)||f.length===e){let C=n[c];if(jf(C,f)===!1){C.push(f);for(let N=0;N<v.length;N++){let S=v[N];i[c][S]=!0}}}else{let C=Ff(m,s+1,f);o[c]=o[c].concat(C),G(C,N=>{let S=Xh(N.partialPath);G(S,T=>{i[c][T]=!0})})}}}}return n}function la(t,e,r,n){let i=new qf(t,rt.ALTERNATION,n);return e.accept(i),DC(i.result,r)}function ua(t,e,r,n){let i=new qf(t,r);e.accept(i);let o=i.result,a=new Yh(e,t,r).startWalking(),c=new Be({definition:o}),l=new Be({definition:a});return DC([c,l],n)}function jf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function OC(t,e){return t.length<e.length&&cr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function LC(t){return cr(t,e=>cr(e,r=>cr(r,n=>se(n.categoryMatches))))}function MC(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Lt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function FC(t,e,r,n){let i=Zt(t,c=>KF(c,r)),o=YF(t,e,r),s=Zt(t,c=>zF(c,r)),a=Zt(t,c=>BF(c,t,n,r));return i.concat(o,s,a)}function KF(t,e){let r=new Jh;t.accept(r);let n=r.allProductions,i=Oh(n,WF),o=kr(i,a=>a.length>1);return L(Ie(o),a=>{let c=Gt(a),l=e.buildDuplicateFoundError(t,a),u=Er(c),f={message:l,type:Lt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:u,occurrence:c.idx},m=UC(c);return m&&(f.parameter=m),f})}function WF(t){return`${Er(t)}_#_${t.idx}_#_${UC(t)}`}function UC(t){return t instanceof ae?t.terminalType.name:t instanceof we?t.nonTerminalName:""}var Jh=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function BF(t,e,r,n){let i=[];if(ct(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Lt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function qC(t,e,r){let n=[],i;return et(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Lt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function Zh(t,e,r,n=[]){let i=[],o=Hf(e.definition);if(se(o))return[];{let s=t.name;et(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Lt.LEFT_RECURSION,ruleName:s});let c=zi(o,n.concat([t])),l=Zt(c,u=>{let f=We(n);return f.push(u),Zh(t,u,r,f)});return i.concat(l)}}function Hf(t){let e=[];if(se(t))return e;let r=Gt(t);if(r instanceof we)e.push(r.referencedRule);else if(r instanceof Be||r instanceof ke||r instanceof ze||r instanceof Ve||r instanceof Me||r instanceof pe)e=e.concat(Hf(r.definition));else if(r instanceof Fe)e=gt(L(r.definition,o=>Hf(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=ko(r),i=t.length>1;if(n&&i){let o=Tt(t);return e.concat(Hf(o))}else return e}var Nc=class extends Tr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function GC(t,e){let r=new Nc;t.accept(r);let n=r.alternations;return Zt(n,o=>{let s=di(o.definition);return Zt(s,(a,c)=>{let l=Uf([a],[],mi,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:c}),type:Lt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:c+1}]:[]})})}function jC(t,e,r){let n=new Nc;t.accept(n);let i=n.alternations;return i=Vi(i,s=>s.ignoreAmbiguities===!0),Zt(i,s=>{let a=s.idx,c=s.maxLookahead||e,l=la(a,t,c,s),u=VF(l,s,t,r),f=XF(l,s,t,r);return u.concat(f)})}var Qh=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function zF(t,e){let r=new Nc;t.accept(r);let n=r.alternations;return Zt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Lt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function HC(t,e,r){let n=[];return G(t,i=>{let o=new Qh;i.accept(o);let s=o.allProductions;G(s,a=>{let c=$c(a),l=a.maxLookahead||e,u=a.idx,m=ua(u,i,c,l)[0];if(se(gt(m))){let v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:v,type:Lt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function VF(t,e,r,n){let i=[],o=ct(t,(a,c,l)=>(e.definition[l].ignoreAmbiguities===!0||G(c,u=>{let f=[l];G(t,(m,v)=>{l!==v&&jf(m,u)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!jf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let c=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Lt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function XF(t,e,r,n){let i=ct(t,(s,a,c)=>{let l=L(a,u=>({idx:c,path:u}));return s.concat(l)},[]);return Un(Zt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,l=s.path,u=qt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&OC(m.path,l));return L(u,m=>{let v=[m.idx+1,c+1],A=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:m.path}),type:Lt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:A,alternatives:v}})}))}function YF(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(et(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Lt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function KC(t){let e=ea(t,{errMsgProvider:kC}),r={};return G(t.rules,n=>{r[n.name]=n}),EC(r,e.errMsgProvider)}function WC(t){return t=ea(t,{errMsgProvider:vn}),FC(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var BC="MismatchedTokenException",zC="NoViableAltException",VC="EarlyExitException",XC="NotAllInputParsedException",YC=[BC,zC,VC,XC];Object.freeze(YC);function Xi(t){return et(YC,t.name)}var fa=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},_o=class extends fa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=BC}},_c=class extends fa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=zC}},Pc=class extends fa{constructor(e,r){super(e,r),this.name=XC}},Ic=class extends fa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=VC}};var ey={},ry="InRuleRecoveryException",ty=class extends Error{constructor(e){super(e),this.name=ry}},Kf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=W(e,"recoveryEnabled")?e.recoveryEnabled:vr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=JF)}getTokenToInsert(e){let r=No(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,l=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),v=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),A=new _o(v,l,this.LA(0));A.resyncedTokens=di(a),this.SAVE_ERROR(A)};for(;!c;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(u,o)?c=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new ty("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Gn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Gn(e,o=>wc(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return ey;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?ey:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return gt(e)}getFollowSetFromFollowKey(e){if(e===ey)return[Tn];let r=e.ruleName+e.idxInCallingRule+Ef+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,Tn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return di(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=We(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function JF(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),v=this.getGAstProductions()[m];c=new o(v,i).startWalking(),this.firstAfterRepMap[a]=c}let l=c.token,u=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=Tn,u=1),!(l===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,u,s)&&this.tryInRepetitionRecovery(t,e,r,l)}function Wf(t,e,r){return r|e|t}var Qte=32-8;var Ti=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:vr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Zt(e,r=>Zh(r,r,vn))}validateEmptyOrAlternatives(e){return Zt(e,r=>GC(r,vn))}validateAmbiguousAlternationAlternatives(e,r){return Zt(e,n=>jC(n,r,vn))}validateSomeNonEmptyLookaheadPath(e,r){return HC(e,r,vn)}buildLookaheadForAlternation(e){return NC(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,PC)}buildLookaheadForOptional(e){return _C(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,$c(e.prodType),IC)}};var zf=class{initLooksAhead(e){this.dynamicTokensEnabled=W(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:vr.dynamicTokensEnabled,this.maxLookahead=W(e,"maxLookahead")?e.maxLookahead:vr.maxLookahead,this.lookaheadStrategy=W(e,"lookaheadStrategy")?e.lookaheadStrategy:new Ti({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=QF(r);G(n,l=>{let u=l.idx===0?"":l.idx;this.TRACE_INIT(`${Er(l)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:r,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=Wf(this.fullRuleNameToShort[r.name],256,l.idx);this.setLaFuncCache(m,f)})}),G(i,l=>{this.computeLookaheadFunc(r,l.idx,768,"Repetition",l.maxLookahead,Er(l))}),G(o,l=>{this.computeLookaheadFunc(r,l.idx,512,"Option",l.maxLookahead,Er(l))}),G(s,l=>{this.computeLookaheadFunc(r,l.idx,1024,"RepetitionMandatory",l.maxLookahead,Er(l))}),G(a,l=>{this.computeLookaheadFunc(r,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,Er(l))}),G(c,l=>{this.computeLookaheadFunc(r,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,Er(l))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=Wf(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return Wf(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},ny=class extends Tr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},Bf=new ny;function QF(t){Bf.reset(),t.accept(Bf);let e=Bf.dslMethods;return Bf.reset(),e}function sy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function ay(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function JC(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function QC(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var ZF="name";function cy(t,e){Object.defineProperty(t,ZF,{enumerable:!1,configurable:!0,writable:!1,value:e})}function eU(t,e){let r=He(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let c=0;c<a;c++){let l=s[c];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function ZC(t,e){let r=function(){};cy(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!lr(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=tU(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function eS(t,e,r){let n=function(){};cy(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=eU}),n.prototype=i,n.prototype.constructor=n,n}var ly;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(ly||(ly={}));function tU(t,e){return rU(t,e)}function rU(t,e){let r=qt(e,i=>yr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:ly.MISSING_METHOD,methodName:i}));return Un(n)}var Jf=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=W(e,"nodeLocationTracking")?e.nodeLocationTracking:vr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=at,this.cstFinallyStateUpdate=at,this.cstPostTerminal=at,this.cstPostNonTerminal=at,this.cstPostRule=at;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=ay,this.setNodeLocationFromNode=ay,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=sy,this.setNodeLocationFromNode=sy,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=at,this.setInitialNodeLocation=at;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];JC(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];QC(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(lr(this.baseCstVisitorConstructor)){let e=ZC(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(lr(this.baseCstVisitorWithDefaultsConstructor)){let e=eS(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var Qf=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):da}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?da:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var Zf=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=pa){if(et(this.definedRulesNames,e)){let s={message:vn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Lt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=pa){let i=qC(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Xi(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return kf(Ie(this.gastProductionsCache))}};var ed=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=aa,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},W(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=ct(e,(o,s)=>(o[s.name]=s,o),{});else if(W(e,"modes")&&cr(gt(Ie(e.modes)),TC)){let o=gt(Ie(e.modes)),s=ta(o);this.tokensMap=ct(s,(a,c)=>(a[c.name]=c,a),{})}else if(st(e))this.tokensMap=We(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=Tn;let n=W(e,"modes")?gt(Ie(e.modes)):Ie(e),i=cr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?aa:mi,hi(Ie(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=W(n,"resyncEnabled")?n.resyncEnabled:pa.resyncEnabled,o=W(n,"recoveryValueFunc")?n.recoveryValueFunc:pa.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Xi(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Mf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Ec],a,1536,e,Ec)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Lf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,kc],a,1280,e,kc)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Pc(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Xi(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new _o(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===ry?n:o}}else throw n}saveRecogState(){let e=this.errors,r=We(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),Tn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var td=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=W(e,"errorMessageProvider")?e.errorMessageProvider:vr.errorMessageProvider}SAVE_ERROR(e){if(Xi(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:We(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return We(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=ua(e,o,r,this.maxLookahead)[0],c=[];for(let u=1;u<=this.maxLookahead;u++)c.push(this.LA(u));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Ic(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=la(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new _c(c,this.LA(1),a))}};var rd=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(lr(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Uf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=Gt(e.ruleStack),i=this.getGAstProductions()[r];return new Of(i,e).startWalking()}};var od={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(od);var tS=!0,rS=Math.pow(2,8)-1,iS=Df({name:"RECORDING_PHASE_TOKEN",pattern:mt.NA});hi([iS]);var oS=No(iS,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(oS);var iU={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},nd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return da}topLevelRuleRecord(e,r){try{let n=new gr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Oc.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){Oc.call(this,ze,r,e)}atLeastOneSepFirstInternalRecord(e,r){Oc.call(this,Ve,r,e,tS)}manyInternalRecord(e,r){Oc.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){Oc.call(this,Me,r,e,tS)}orInternalRecord(e,r){return oU.call(this,e,r)}subruleInternalRecord(e,r,n){if(id(r),!e||W(e,"ruleName")===!1){let a=new Error(`<SUBRULE${nS(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=qn(this.recordingProdStack),o=e.ruleName,s=new we({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?iU:od}consumeInternalRecord(e,r,n){if(id(r),!Kh(e)){let s=new Error(`<CONSUME${nS(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=qn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),oS}};function Oc(t,e,r,n=!1){id(r);let i=qn(this.recordingProdStack),o=yr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),W(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),od}function oU(t,e){id(e);let r=qn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});W(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=xc(i,a=>yr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let c=new Be({definition:[]});o.definition.push(c),W(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:W(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),od}function nS(t){return t===0?"":`${t}`}function id(t){if(t<0||t>rS){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${rS+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var sd=class{initPerformanceTracer(e){if(W(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=vr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=bc(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function sS(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var da=No(Tn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(da);var vr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:gi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),pa=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Lt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Lt||(Lt={}));function ad(t=void 0){return function(){return t}}var Lc=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Ac(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=KC({rules:Ie(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=WC({rules:Ie(this.gastProductionsCache),tokenTypes:Ie(this.tokensMap),errMsgProvider:vn,grammarName:r}),o=MC({lookaheadStrategy:this.lookaheadStrategy,rules:Ie(this.gastProductionsCache),tokenTypes:Ie(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=QA(Ie(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Ie(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Ie(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),W(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=W(r,"skipValidations")?r.skipValidations:vr.skipValidations}};Lc.DEFER_DEFINITION_ERRORS_HANDLING=!1;sS(Lc,[Kf,zf,Jf,Qf,ed,Zf,td,rd,nd,sd]);var Mc=class extends Lc{constructor(e,r=vr){let n=We(r);n.outputCst=!1,super(e,n)}};function Po(t,e,r){return`${t.name}_${e}_${r}`}var Yi=1,aU=2,aS=4,cS=5;var ya=7,cU=8,lU=9,uU=10,fU=11,lS=12,Fc=class{constructor(e){this.target=e}isEpsilon(){return!1}},ma=class extends Fc{constructor(e,r){super(e),this.tokenType=r}},Uc=class extends Fc{constructor(e){super(e)}isEpsilon(){return!0}},ha=class extends Fc{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function uS(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};dU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Io(e,i,i);o!==void 0&&AU(e,i,o)}return e}function dU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=jt(t,i,void 0,{type:aU}),s=jt(t,i,void 0,{type:ya});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function fS(t,e,r){return r instanceof ae?fy(t,e,r.terminalType,r):r instanceof we?bU(t,e,r):r instanceof Fe?gU(t,e,r):r instanceof ke?TU(t,e,r):r instanceof pe?pU(t,e,r):r instanceof Me?mU(t,e,r):r instanceof ze?hU(t,e,r):r instanceof Ve?yU(t,e,r):Io(t,e,r)}function pU(t,e,r){let n=jt(t,e,r,{type:cS});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r));return pS(t,e,r,i)}function mU(t,e,r){let n=jt(t,e,r,{type:cS});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r)),o=fy(t,e,r.separator,r);return pS(t,e,r,i,o)}function hU(t,e,r){let n=jt(t,e,r,{type:aS});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r));return dS(t,e,r,i)}function yU(t,e,r){let n=jt(t,e,r,{type:aS});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r)),o=fy(t,e,r.separator,r);return dS(t,e,r,i,o)}function gU(t,e,r){let n=jt(t,e,r,{type:Yi});Ji(t,n);let i=L(r.definition,s=>fS(t,e,s));return ga(t,e,n,r,...i)}function TU(t,e,r){let n=jt(t,e,r,{type:Yi});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r));return vU(t,e,r,i)}function Io(t,e,r){let n=qt(L(r.definition,i=>fS(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:RU(t,n)}function dS(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:fU});Ji(t,a);let c=jt(t,e,r,{type:lS});return o.loopback=a,c.loopback=a,t.decisionMap[Po(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,c)):(_t(a,c),_t(a,i.left),_t(i.right,o)),{left:o,right:c}}function pS(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:uU});Ji(t,a);let c=jt(t,e,r,{type:lS}),l=jt(t,e,r,{type:lU});return a.loopback=l,c.loopback=l,_t(a,o),_t(a,c),_t(s,l),i!==void 0?(_t(l,c),_t(l,i.left),_t(i.right,o)):_t(l,a),t.decisionMap[Po(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:c}}function vU(t,e,r,n){let i=n.left,o=n.right;return _t(i,o),t.decisionMap[Po(e,"Option",r.idx)]=i,n}function Ji(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function ga(t,e,r,n,...i){let o=jt(t,e,n,{type:cU,start:r});r.end=o;for(let a of i)a!==void 0?(_t(r,a.left),_t(a.right,o)):_t(r,o);let s={left:r,right:o};return t.decisionMap[Po(e,xU(n),n.idx)]=r,s}function xU(t){if(t instanceof Fe)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Me)return"RepetitionWithSeparator";if(t instanceof ze)return"RepetitionMandatory";if(t instanceof Ve)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function RU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof ha,l=a,u=e[o+1].left;s.left.type===Yi&&s.right.type===Yi&&a!==void 0&&(c&&l.followState===s.right||a.target===s.right)?(c?l.followState=u:a.target=u,CU(t,s.right)):_t(s.right,u)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function fy(t,e,r,n){let i=jt(t,e,n,{type:Yi}),o=jt(t,e,n,{type:Yi});return dy(i,new ma(o,r)),{left:i,right:o}}function bU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=jt(t,e,r,{type:Yi}),s=jt(t,e,r,{type:Yi}),a=new ha(i,n,s);return dy(o,a),{left:o,right:s}}function AU(t,e,r){let n=t.ruleToStartState.get(e);_t(n,r.left);let i=t.ruleToStopState.get(e);return _t(r.right,i),{left:n,right:i}}function _t(t,e){let r=new Uc(e);dy(t,r)}function jt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function dy(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function CU(t,e){t.states.splice(t.states.indexOf(e),1)}var qc={},Ta=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=py(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function py(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function SU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var cd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},mS=new cd,Gc=class extends Ti{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=uS(e.rules),this.dfas=wU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Po(n,"Alternation",r),u=this.atn.decisionMap[c].decision,f=L(Gf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,v=>v[0]));if(hS(f,!1)&&!o){let m=ct(f,(v,A,C)=>(G(A,N=>{N&&(v[N.tokenTypeIdx]=C,G(N.categoryMatches,S=>{v[S]=C}))}),v),{});return i?function(v){var A;let C=this.LA(1),N=m[C.tokenTypeIdx];if(v!==void 0&&N!==void 0){let S=(A=v[N])===null||A===void 0?void 0:A.GATE;if(S!==void 0&&S.call(this)===!1)return}return N}:function(){let v=this.LA(1);return m[v.tokenTypeIdx]}}else return i?function(m){let v=new cd,A=m===void 0?0:m.length;for(let N=0;N<A;N++){let S=m?.[N].GATE;v.set(N,S===void 0||S.call(this))}let C=my.call(this,s,u,v,a);return typeof C=="number"?C:void 0}:function(){let m=my.call(this,s,u,mS,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Po(n,i,r),u=this.atn.decisionMap[c].decision,f=L(Gf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,v=>v[0]));if(hS(f)&&f[0][0]&&!o){let m=f[0],v=gt(m);if(v.length===1&&se(v[0].categoryMatches)){let C=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===C}}else{let A=ct(v,(C,N)=>(N!==void 0&&(C[N.tokenTypeIdx]=!0,G(N.categoryMatches,S=>{C[S]=!0})),C),{});return function(){let C=this.LA(1);return A[C.tokenTypeIdx]===!0}}}return function(){let m=my.call(this,s,u,mS,a);return typeof m=="object"?!1:m===0}}};function hS(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function wU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=SU(t.decisionStates[n],n);return r}function my(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=MU(i.atnStartState);o=TS(i,gS(a)),i.start=o}return kU.apply(this,[i,o,r,n])}function kU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=IU(i,a);if(c===void 0&&(c=EU.apply(this,[t,i,a,o,r,n])),c===qc)return PU(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function EU(t,e,r,n,i,o){let s=DU(e.configs,r,i);if(s.size===0)return yS(t,e,r,qc),qc;let a=gS(s),c=LU(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(GU(s)){let l=HA(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,$U.apply(this,[t,n,s.alts,o])}return a=yS(t,e,r,a),a}function $U(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,c=NU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(c)}function NU(t){let e=L(t.prefixPath,i=>yi(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${_U(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function _U(t){if(t instanceof we)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function PU(t,e,r){let n=Zt(e.configs.elements,o=>o.state.transitions),i=YA(n.filter(o=>o instanceof ma).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function IU(t,e){return t.edges[e.tokenTypeIdx]}function DU(t,e,r){let n=new Ta,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===ya){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let l=s.state.transitions[c],u=OU(l,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new Ta;for(let s of n.elements)ld(s,o)}if(i.length>0&&!UU(o))for(let s of i)o.add(s);return o}function OU(t,e){if(t instanceof ma&&wc(e,t.tokenType))return t.target}function LU(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function gS(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function yS(t,e,r,n){return n=TS(t,n),e.edges[r.tokenTypeIdx]=n,n}function TS(t,e){if(e===qc)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function MU(t){let e=new Ta,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};ld(o,e)}return e}function ld(t,e){let r=t.state;if(r.type===ya){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};ld(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=FU(t,o);s!==void 0&&ld(s,e)}}function FU(t,e){if(e instanceof Uc)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ha){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function UU(t){for(let e of t.elements)if(e.state.type===ya)return!0;return!1}function qU(t){for(let e of t.elements)if(e.state.type!==ya)return!1;return!0}function GU(t){if(qU(t))return!0;let e=jU(t.elements);return HU(e)&&!KU(e)}function jU(t){let e=new Map;for(let r of t){let n=py(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function HU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function KU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var hy=de(so(),1);var ud=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new gy(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new pd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new dd(e.startOffset,e.image.length,Wa(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new dd(r.startOffset,r.image.length,Wa(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if(kn(s)&&n>a&&i<c){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},fd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},dd=class extends fd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},pd=class extends fd{constructor(){super(...arguments),this.content=new yy(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:hy.Position.create(0,0),end:hy.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},yy=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},gy=class extends pd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var vy=Symbol("Datatype");function Ty(t){return t.$type===vy}var vS="\u200B",xS=t=>t.endsWith(vS)?t:t+vS,md=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Ry(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},hd=class extends md{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new ud,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Fr(e)?vy:mn(e),i=this.wrapper.DEFINE_RULE(xS(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===vy&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let l=dt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(Ty(c)){let l=i.image;dt(n)||(l=this.converter.convert(l,o).toString()),c.value+=l}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Ty(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let l=c;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return Nv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),Ty(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Pe(e,Re);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Vt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},xy=class{buildMismatchTokenMessage(e){return gi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return gi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return gi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return gi.buildEarlyExitMessage(e)}},jc=class extends xy{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},yd=class extends md{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(xS(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},WU={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new jc},Ry=class extends Mc{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},WU),{lookaheadStrategy:n?new Ti({maxLookahead:r.maxLookahead}):new Gc}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Hc=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function gd(t){throw new Error("Error! The input value was not handled.")}function vd(t,e,r){return BU({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function BU(t,e){let r=ys(e,!1),n=ie(e.rules).filter(K).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Do(o,i.definition)))}}function Do(t,e,r=!1){let n;if(dt(e))n=ZU(t,e);else if(Ne(e))n=zU(t,e);else if(Re(e))n=Do(t,e.terminal);else if(Vt(e))n=RS(t,e);else if(_e(e))n=VU(t,e);else if(Ir(e))n=YU(t,e);else if(Dr(e))n=JU(t,e);else if(Ft(e))n=QU(t,e);else throw new Hc(e.$cstNode,`Unexpected element type: ${e.$type}`);return bS(t,r?void 0:Td(e),n,e.cardinality)}function zU(t,e){let r=mn(e);return()=>t.parser.action(r,e)}function VU(t,e){let r=e.rule.ref;if(K(r)){let n=t.subrule++,i=e.arguments.length>0?XU(r,e.arguments):()=>({});return o=>t.parser.subrule(n,AS(t,r),e,i(o))}else if(Ce(r)){let n=t.consume++,i=by(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)gd(r);else throw new Hc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function XU(t,e){let r=e.map(n=>vi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function vi(t){if(XT(t)){let e=vi(t.left),r=vi(t.right);return n=>e(n)||r(n)}else if(zT(t)){let e=vi(t.left),r=vi(t.right);return n=>e(n)&&r(n)}else if(ev(t)){let e=vi(t.value);return r=>!e(r)}else if(os(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(QT(t)){let e=!!t.true;return()=>e}gd(t)}function YU(t,e){if(e.elements.length===1)return Do(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Do(t,i,!0)},s=Td(i);s&&(o.GATE=vi(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function JU(t,e){if(e.elements.length===1)return Do(t,e.elements[0]);let r=[];for(let a of e.elements){let c={ALT:Do(t,a,!0)},l=Td(a);l&&(c.GATE=vi(l)),r.push(c)}let n=t.or++,i=(a,c)=>{let l=c.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>t.parser.alternatives(n,r.map((c,l)=>{let u={ALT:()=>!0},f=t.parser;u.ALT=()=>{if(c.ALT(a),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let A=f.unorderedGroups.get(v);typeof A?.[l]>"u"&&(A[l]=!0)}};let m=c.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},u})),s=bS(t,Td(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function QU(t,e){let r=e.elements.map(n=>Do(t,n));return n=>r.forEach(i=>i(n))}function Td(t){if(Ft(t))return t.guardCondition}function RS(t,e,r=e.terminal){if(r)if(_e(r)&&K(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,AS(t,r.rule.ref),e,i)}else if(_e(r)&&Ce(r.rule.ref)){let n=t.consume++,i=by(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(dt(r)){let n=t.consume++,i=by(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=lc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+mn(e.type.ref));return RS(t,e,i)}}function ZU(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function bS(t,e,r,n){let i=e&&vi(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:ad(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:ad(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else gd(n)}function AS(t,e){let r=eq(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function eq(t,e){if(K(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!K(n);)(Ft(n)||Ir(n)||Dr(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function by(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function CS(t){let e=t.Grammar,r=t.parser.Lexer,n=new yd(t);return vd(e,n,r.definition),n.finalize(),n}function SS(t){let e=tq(t);return e.finalize(),e}function tq(t){let e=t.Grammar,r=t.parser.Lexer,n=new hd(t);return vd(e,n,r.definition)}var xd=class{buildTokens(e,r){let n=ie(ys(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&eh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(Ce).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Yr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=eh(r)?mt.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(K).flatMap(i=>Qe(i).filter(dt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(Qv(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&Zv("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Rd=class{convert(e,r){let n=r.grammarSource;if(Vt(n)&&(n=Ru(n)),_e(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return oq(r);case"STRING":return rq(r);case"ID":return iq(r)}switch((i=bo(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return cq(r);case"boolean":return lq(r);case"bigint":return sq(r);case"date":return aq(r);default:return r}}};function rq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=nq(i)}else e+=n}return e}function nq(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function iq(t){return t.charAt(0)==="^"?t.substring(1):t}function oq(t){return parseInt(t)}function sq(t){return BigInt(t)}function aq(t){return new Date(t)}function cq(t){return Number(t)}function lq(t){return t.toLowerCase()==="true"}var wS=de(Ae(),1);var bd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=wS.CancellationToken.None){for(let n of ti(e.parseResult.value))await Ze(r),Yl(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(es(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(Et(this._ref))return this._ref;if(PT(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:r});if(c.error&&ne(e).state<je.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return Et(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return es(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(es(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<je.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function ES(t){return typeof t.$comment=="string"}function kS(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Ad=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,l;if(!this.ignoreProperties.has(e))if(Qn(r)){let u=r.ref,f=n?r.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(c=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let u;if(o&&Et(r)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&Et(r)&&(u??(u=Object.assign({},r)),u.$sourceText=(l=r.$cstNode)===null||l===void 0?void 0:l.text),s&&Et(r)&&(u??(u=Object.assign({},r)),u.$comment=this.commentProvider.getComment(r)),u??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Ni(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];kS(u)?c[l]=this.reviveReference(e,a,r,u):Et(u)&&this.linkNode(u,r,e,a,l)}else kS(c)?e[a]=this.reviveReference(e,a,r,c):Et(c)&&this.linkNode(c,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Cd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var $S=de(Ae(),1);var Sd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=ir((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:ir(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},wd=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=$S.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ti(i))await Ze(r),Yl(o).filter(s=>!es(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:ir(n),local:ve.equals(r.documentUri,i)}}};var kd=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),l=i[a];return l?.[c]}return i[o]},e)}};var NS=de(wt(),1),Ed=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(NS.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var va=de(Ae(),1);var $d=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=va.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===je.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=je.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let c=this.buildState.get(a),l=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=r.validation.categories)!==null&&o!==void 0?o:ps.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:c.result}),s.state=je.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=va.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,je.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<je.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),va.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,je.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,je.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,je.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,je.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,je.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,je.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await Ze(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),va.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:ps.all;l.result.validationChecks?l.result.validationChecks.push(...u):l.result.validationChecks=[...u]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Ay=de(Ae(),1);var Nd=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new mu,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Ay.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Ay.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var _S=de(Ae(),1);var _d=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=_S.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Jt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var Pd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=PS(r)?Object.values(r):r;this.chevrotainLexer=new mt(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(PS(e))return e;let r=IS(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function uq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function IS(t){return t&&"modes"in t&&"defaultMode"in t}function PS(t){return!uq(t)&&!IS(t)}var be=de(Ae(),1);function LS(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=be.Position.create(0,0));let o=FS(t),s=wy(n),a=dq({lines:o,position:i,options:s});return gq({index:0,tokens:a,position:i})}function MS(t,e){let r=wy(e),n=FS(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function FS(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Xa)}var DS=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,fq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function dq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let c=a===0,l=a===t.lines.length-1,u=t.lines[a],f=0;if(c&&t.options.start){let v=(e=t.options.start)===null||e===void 0?void 0:e.exec(u);v&&(f=v.index+v[0].length)}else{let v=(r=t.options.line)===null||r===void 0?void 0:r.exec(u);v&&(f=v.index+v[0].length)}if(l){let v=(n=t.options.end)===null||n===void 0?void 0:n.exec(u);v&&(u=u.substring(0,v.index))}if(u=u.substring(0,yq(u)),Sy(u,0)>=u.length){if(i.length>0){let v=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(v,v)})}}else{DS.lastIndex=f;let v=DS.exec(u);if(v){let A=v[0],C=v[1],N=be.Position.create(o,s+f),S=be.Position.create(o,s+f+A.length);i.push({type:"tag",content:C,range:be.Range.create(N,S)}),f+=A.length,f=Sy(u,f)}if(f<u.length){let A=u.substring(f),C=Array.from(A.matchAll(fq));i.push(...pq(C,A,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function pq(t,e,r,n){let i=[];if(t.length===0){let o=be.Position.create(r,n),s=be.Position.create(r,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of t){let c=a.index,l=e.substring(o,c);l.length>0&&i.push({type:"text",content:e.substring(o,c),range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,c+n))});let u=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,o+n+s.length))})}return i}var mq=/\S/,hq=/\s*$/;function Sy(t,e){let r=t.substring(e).match(mq);return r?e+r.index:t.length}function yq(t){let e=t.match(hq);if(e&&typeof e.index=="number")return e.index}function gq(t){var e,r,n,i;let o=be.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Id([],be.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let l=Tq(t,s[s.length-1]);l&&s.push(l)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Id(s,be.Range.create(a,c))}function Tq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return qS(t,!1);if(r.type==="text"||r.type==="inline-tag")return US(t);vq(r,e),t.index++}function vq(t,e){if(e){let r=new Dd("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function US(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(xq(t)),n=e,e=t.tokens[t.index];return new Wc(i,be.Range.create(r.range.start,n.range.end))}function xq(t){return t.tokens[t.index].type==="inline-tag"?qS(t,!0):GS(t)}function qS(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=GS(t);return new Kc(n,new Wc([o],o.range),e,be.Range.create(r.range.start,o.range.end))}else{let o=US(t);return new Kc(n,o,e,be.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Kc(n,new Wc([],o),e,o)}}function GS(t){let e=t.tokens[t.index++];return new Dd(e.content,e.range)}function wy(t){if(!t)return wy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:Cy(e,!0),end:Cy(r,!1),line:Cy(n,!0)}}function Cy(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?ii(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Id=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=OS(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=OS(r)+i}return r.trim()}},Kc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=Rq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Rq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=Sy(e,o);s=e.substring(c),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:bq(e,s)}}function bq(t,e){try{return Jt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Wc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Dd=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function OS(t){return t.endsWith(`
`)?`
`:`

`}var Od=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&MS(r))return LS(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Ld=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return ES(e)?e.$comment:(r=FT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function hc(t){return{documentation:{CommentProvider:e=>new Ld(e),DocumentationProvider:e=>new Od(e)},parser:{GrammarConfig:e=>rR(e),LangiumParser:e=>SS(e),CompletionParser:e=>CS(e),ValueConverter:()=>new Rd,TokenBuilder:()=>new xd,Lexer:e=>new Pd(e),ParserErrorMessageProvider:()=>new jc},lsp:{CompletionProvider:e=>new Ss(e),DocumentSymbolProvider:e=>new Du(e),HoverProvider:e=>new Mu(e),FoldingRangeProvider:e=>new ks(e),ReferencesProvider:e=>new Hu(e),DefinitionProvider:e=>new Ns(e),DocumentHighlightProvider:e=>new Iu(e),RenameProvider:e=>new Ku(e)},workspace:{AstNodeLocator:()=>new kd,AstNodeDescriptionProvider:e=>new Sd(e),ReferenceDescriptionProvider:e=>new wd(e)},references:{Linker:e=>new bd(e),NameProvider:()=>new fs,ScopeProvider:e=>new As(e),ScopeComputation:e=>new bs(e),References:e=>new Es(e)},serializer:{JsonSerializer:e=>new Ad(e)},validation:{DocumentValidator:e=>new Tu(e),ValidationRegistry:e=>new lu(e)},shared:()=>t.shared}}function yc(t){return{ServiceRegistry:()=>new Cd,lsp:{Connection:()=>t.connection,LanguageServer:e=>new qu(e),WorkspaceSymbolProvider:e=>new Wu(e),NodeKindProvider:()=>new Gu,FuzzyMatcher:()=>new Lu},workspace:{LangiumDocuments:e=>new Uu(e),LangiumDocumentFactory:e=>new Fu(e),DocumentBuilder:e=>new $d(e),TextDocuments:()=>new jS.TextDocuments(Zo),IndexManager:e=>new Nd(e),WorkspaceManager:e=>new _d(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new cu,ConfigurationProvider:e=>new Ed(e)}}}var xa=de(KS(),1);var Aq="Instruction";var Cq="Type";var WS="Block";var BS="Command";var Sq="DeclarationVariable";var zS="ExpressionBase";var wq="BooleanType";var VS="Distance";var kq="NumberType";var Eq="Time";var $q="IF";var Nq="LOOP";var _q="DirectionCommand";var XS="ReadSensorCommand";var Pq="RotateCommand";var Iq="SpeedCommand";var Dq="Affectation";var YS="Call";var JS="Expression";var Oq="CM";var Lq="Mm";var Mq="DistanceSensorCommand";var Fq="TimeSensorCommand";var Uq="CallFunction";var qq="CallVariable";var Gq="And";var jq="BooleanExp";var Hq="Equals";var Kq="MultDiv";var Wq="MultDivDistance";var Bq="MultDivTime";var zq="Not";var Vq="Or";var Xq="PlusMinus";var Yq="PlusMinusDistance";var Jq="PlusMinusTime";var Qq="PrimaryExprAri";var Zq="PrimaryExprBool";var eG="PrimaryExprDistance";var tG="PrimaryExprTime";var Bc=class extends uo{getAllTypes(){return["Affectation","And","Block","BooleanExp","BooleanType","CM","Call","CallFunction","CallVariable","Command","DeclarationVariable","DirectionCommand","Distance","DistanceExpression","DistanceSensorCommand","Equals","Expression","ExpressionBase","FunctionN","IF","Instruction","LOOP","Mm","MultDiv","MultDivDistance","MultDivTime","Not","NumberType","Or","Parameter","PlusMinus","PlusMinusDistance","PlusMinusTime","PrimaryExprAri","PrimaryExprBool","PrimaryExprDistance","PrimaryExprTime","ReadSensorCommand","Robot","RotateCommand","SpeedCommand","Time","TimeExpression","TimeSensorCommand","Type","TypeClass"]}computeIsSubtype(e,r){switch(e){case Dq:case YS:case JS:return this.isSubtype(zS,r);case Gq:case jq:case Hq:case Kq:case Wq:case Bq:case zq:case Vq:case Xq:case Yq:case Jq:case Qq:case Zq:case eG:case tG:return this.isSubtype(JS,r);case WS:case BS:case Sq:case zS:return this.isSubtype(Aq,r);case wq:case VS:case kq:case Eq:return this.isSubtype(Cq,r);case Uq:case qq:return this.isSubtype(YS,r);case Oq:case Lq:return this.isSubtype(VS,r);case _q:case XS:case Pq:case Iq:return this.isSubtype(BS,r);case Mq:case Fq:return this.isSubtype(XS,r);case $q:case Nq:return this.isSubtype(WS,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"FunctionN":return{name:"FunctionN",mandatory:[{name:"instruction",type:"array"},{name:"parameters",type:"array"}]};case"Robot":return{name:"Robot",mandatory:[{name:"functions",type:"array"}]};case"Block":return{name:"Block",mandatory:[{name:"instruction",type:"array"}]};case"BooleanType":return{name:"BooleanType",mandatory:[{name:"value",type:"boolean"}]};case"CallFunction":return{name:"CallFunction",mandatory:[{name:"parameters",type:"array"}]};default:return{name:e,mandatory:[]}}}},ice=new Bc;var Md,QS=()=>Md??(Md=au(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "Robot",
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Robot",
      "entry": true,
      "returnType": {
        "$ref": "#/interfaces@0"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@0"
            }
          },
          {
            "$type": "Keyword",
            "value": "Robot"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "functions",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@9"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "functions",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@9"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Instruction",
      "returnType": {
        "$ref": "#/interfaces@2"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@11"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@12"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@13"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@14"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@15"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@16"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@8"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@23"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@6"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@28"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@2"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Block",
      "returnType": {
        "$ref": "#/interfaces@32"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeClass",
      "returnType": {
        "$ref": "#/interfaces@3"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@3"
            }
          },
          {
            "$type": "Assignment",
            "feature": "typeT",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "boolean"
                },
                {
                  "$type": "Keyword",
                  "value": "distance"
                },
                {
                  "$type": "Keyword",
                  "value": "time"
                },
                {
                  "$type": "Keyword",
                  "value": "number"
                },
                {
                  "$type": "Keyword",
                  "value": "void"
                }
              ]
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Distance",
      "returnType": {
        "$ref": "#/interfaces@5"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@5"
            }
          },
          {
            "$type": "Assignment",
            "feature": "typeD",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "cm"
                },
                {
                  "$type": "Keyword",
                  "value": "mm"
                }
              ]
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Time",
      "returnType": {
        "$ref": "#/interfaces@6"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@6"
            }
          },
          {
            "$type": "Keyword",
            "value": "s"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Call",
      "returnType": {
        "$ref": "#/interfaces@18"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExpressionBase",
      "returnType": {
        "$ref": "#/interfaces@17"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expression",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionN",
      "returnType": {
        "$ref": "#/interfaces@1"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@1"
            }
          },
          {
            "$type": "Keyword",
            "value": "let"
          },
          {
            "$type": "Assignment",
            "feature": "return",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameters",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@10"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@10"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "instruction",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "instruction",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "return"
              },
              {
                "$type": "Assignment",
                "feature": "returnedValue",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@7"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "returnType": {
        "$ref": "#/interfaces@7"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@7"
            }
          },
          {
            "$type": "Assignment",
            "feature": "typeP",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "nom",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RotateCommand",
      "returnType": {
        "$ref": "#/interfaces@20"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@20"
            }
          },
          {
            "$type": "Keyword",
            "value": "CLOCK"
          },
          {
            "$type": "Assignment",
            "feature": "angle",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "DirectionCommand",
      "returnType": {
        "$ref": "#/interfaces@22"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "operateur",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "FORWARD"
                },
                {
                  "$type": "Keyword",
                  "value": "BACKWARD"
                },
                {
                  "$type": "Keyword",
                  "value": "LEFT"
                },
                {
                  "$type": "Keyword",
                  "value": "RIGHT"
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@36"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SpeedCommand",
      "returnType": {
        "$ref": "#/interfaces@23"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@23"
            }
          },
          {
            "$type": "Keyword",
            "value": "SPEED"
          },
          {
            "$type": "Assignment",
            "feature": "speed",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@36"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReadSensorCommand",
      "returnType": {
        "$ref": "#/interfaces@24"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@24"
                }
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@15"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "DistanceSensorCommand",
      "returnType": {
        "$ref": "#/interfaces@25"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@25"
            }
          },
          {
            "$type": "Keyword",
            "value": "READ_DISTANCE"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TimeSensorCommand",
      "returnType": {
        "$ref": "#/interfaces@26"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@26"
            }
          },
          {
            "$type": "Keyword",
            "value": "READ_TIME"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PlusMinus",
      "returnType": {
        "$ref": "#/interfaces@10"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@18"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MultDiv",
      "returnType": {
        "$ref": "#/interfaces@11"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PlusMinusDistance",
      "returnType": {
        "$ref": "#/interfaces@12"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@20"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MultDivDistance",
      "returnType": {
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@22"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimaryExprAri",
      "returnType": {
        "$ref": "#/interfaces@27"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "expr",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@42"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@27"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimaryExprDistance",
      "returnType": {
        "$ref": "#/interfaces@28"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "expr",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@36"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@27"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "DeclarationVariable",
      "returnType": {
        "$ref": "#/interfaces@30"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "var"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "nom",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expressionbase",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LOOP",
      "returnType": {
        "$ref": "#/interfaces@31"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "LOOP"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "instruction",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "instruction",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IF",
      "returnType": {
        "$ref": "#/interfaces@33"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "IF"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "instruction",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "instruction",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "ELSE"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "instruction",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@1"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "instruction",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@1"
                      },
                      "arguments": []
                    },
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CallVariable",
      "returnType": {
        "$ref": "#/interfaces@34"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@34"
            }
          },
          {
            "$type": "Assignment",
            "feature": "nom",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CallFunction",
      "returnType": {
        "$ref": "#/interfaces@35"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@35"
            }
          },
          {
            "$type": "Assignment",
            "feature": "nom",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameters",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@7"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@7"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Affectation",
      "returnType": {
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "callvariable",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expressionbase",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimaryExprBool",
      "returnType": {
        "$ref": "#/interfaces@37"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "expr",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@41"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@27"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "And",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "AND"
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@32"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Or",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "OR"
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Not",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "NOT"
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@32"
                    },
                    "arguments": []
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@31"
                    },
                    "arguments": []
                  }
                ]
              }
            ]
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Equals",
      "returnType": {
        "$ref": "#/interfaces@41"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "expr1",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@31"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "operateur",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "=="
                },
                {
                  "$type": "Keyword",
                  "value": "!="
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "expr2",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@31"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EDouble",
      "dataType": "number",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "-",
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "."
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "E"
                  },
                  {
                    "$type": "Keyword",
                    "value": "e"
                  }
                ]
              },
              {
                "$type": "Keyword",
                "value": "-",
                "cardinality": "?"
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@45"
                },
                "arguments": []
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EString",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "DistanceExpression",
      "returnType": {
        "$ref": "#/interfaces@8"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "number",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@42"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TimeExpression",
      "returnType": {
        "$ref": "#/interfaces@9"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "number",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@42"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PlusMinusTime",
      "returnType": {
        "$ref": "#/interfaces@14"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@39"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MultDivTime",
      "returnType": {
        "$ref": "#/interfaces@15"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@16"
                },
                "feature": "expr1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "expr2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimaryExprTime",
      "returnType": {
        "$ref": "#/interfaces@29"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "expr",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@37"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@27"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanType",
      "returnType": {
        "$ref": "#/interfaces@44"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@43"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NumberType",
      "returnType": {
        "$ref": "#/interfaces@45"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@34"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EBoolean",
      "dataType": "boolean",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "^"
            },
            "cardinality": "?"
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "a"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "z"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "A"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "Z"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "_"
                }
              }
            ]
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "a"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "z"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "A"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "Z"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "_"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "0"
        },
        "right": {
          "$type": "Keyword",
          "value": "9"
        },
        "cardinality": "+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\""
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              }
            ]
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "'"
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              }
            ]
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "/*"
            }
          },
          {
            "$type": "UntilToken",
            "terminal": {
              "$type": "CharacterRange",
              "left": {
                "$type": "Keyword",
                "value": "*/"
              }
            }
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "//"
            }
          },
          {
            "$type": "NegatedToken",
            "terminal": {
              "$type": "TerminalAlternatives",
              "elements": [
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\n"
                  }
                },
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\r"
                  }
                }
              ]
            }
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                },
                "cardinality": "?"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\n"
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": " "
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\t"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\n"
            }
          }
        ],
        "cardinality": "+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ANY_OTHER",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "Wildcard"
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "interfaces": [
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "functions",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Robot",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "name",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "instruction",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "parameters",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@7"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "return",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "returnedValue",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@17"
            }
          }
        }
      ],
      "name": "FunctionN",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Instruction",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "typeT",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "TypeClass",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Type",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "typeD",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "Distance",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Time",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "typeP",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "nom",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "Parameter",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "number",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@45"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@5"
            }
          },
          "isOptional": false
        }
      ],
      "name": "DistanceExpression",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "number",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@45"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@6"
            }
          },
          "isOptional": false
        }
      ],
      "name": "TimeExpression",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "PlusMinus",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "MultDiv",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "PlusMinusDistance",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "MultDivDistance",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "PlusMinusTime",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "MultDivTime",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "expr1",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@16"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expr2",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@16"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "Expression",
      "superTypes": [
        {
          "$ref": "#/interfaces@17"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "ExpressionBase",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Call",
      "superTypes": [
        {
          "$ref": "#/interfaces@17"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "BooleanExp",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "angle",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          },
          "isOptional": false
        }
      ],
      "name": "RotateCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Command",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "distance",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "DirectionCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "speed",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          }
        }
      ],
      "name": "SpeedCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "ReadSensorCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "DistanceSensorCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "TimeSensorCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "expr",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@45"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@34"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@35"
                }
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "PrimaryExprAri",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "expr",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@8"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@34"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@35"
                }
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "PrimaryExprDistance",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "expr",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@9"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@34"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@35"
                }
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "PrimaryExprTime",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "nom",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expressionbase",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@17"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          },
          "isOptional": false
        }
      ],
      "name": "DeclarationVariable",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "LOOP",
      "superTypes": [
        {
          "$ref": "#/interfaces@32"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "instruction",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@16"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Block",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "IF",
      "superTypes": [
        {
          "$ref": "#/interfaces@32"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "nom",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "CallVariable",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "nom",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "parameters",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@17"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "CallFunction",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "expressionbase",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@17"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "callvariable",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@34"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Affectation",
      "superTypes": [
        {
          "$ref": "#/interfaces@17"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "expr",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@44"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@34"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@35"
                }
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "PrimaryExprBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "And",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Or",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Not",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Equals",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "CM",
      "superTypes": [
        {
          "$ref": "#/interfaces@5"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Mm",
      "superTypes": [
        {
          "$ref": "#/interfaces@5"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "value",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "boolean"
          },
          "isOptional": false
        }
      ],
      "name": "BooleanType",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "value",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          },
          "isOptional": false
        }
      ],
      "name": "NumberType",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    }
  ],
  "types": [],
  "usedGrammars": []
}`));var rG={languageId:"robot",fileExtensions:[".rob"],caseInsensitive:!1},ZS={AstReflection:()=>new Bc},ew={Grammar:()=>QS(),LanguageMetaData:()=>rG,parser:{}};function tw(t){let e=t.validation.ValidationRegistry,r=t.validation.RobotValidator,n={Robot:r.checkRobot};e.register(n,r)}var Fd=class{constructor(){this.functionVariableMap=new Map}checkRobot(e,r){this.traverseFunctionDeclarations(e,r),this.traverseFunctionCalls(e,r),this.checkReturn(e,r)}traverseFunctionDeclarations(e,r){e.functions.forEach(n=>{let i=new Set;n.parameters.forEach(o=>{i.has(o.nom)?r("error","Parameters' name should be different.",{node:o,property:"nom"}):i.add(o.nom)}),this.functionVariableMap.set(n.name,i)})}checkCall(e,r,n){switch(e.$type){case"CallVariable":let i=e;r.has(i.nom)||n("error","Variable not declared.",{node:i,property:"nom"});break;case"CallFunction":let o=e;this.functionVariableMap.has(o.nom)?o.parameters.forEach(a=>{this.checkCall(a,r,n)}):n("error","Function not declared.",{node:o,property:"nom"});break;case"Expression":let s=e;this.checkExpression(s,r,n);break}}traverseFunctionCalls(e,r){e.functions.forEach(n=>{n.instruction.forEach(i=>{let o=this.functionVariableMap.get(n.name);o===void 0?r("error","Function not declared.",{node:n,property:"name"}):this.traverseInstructions(i,o,r)})})}traverseInstructions(e,r,n){switch(e.$type){case"DeclarationVariable":let i=e;r.has(i.nom)?n("error","Variable already declared.",{node:i,property:"nom"}):(this.checkCall(i.expressionbase,r,n),r.add(i.nom));break;case"Affectation":let o=e;r.has(o.callvariable.nom)||n("error","Variable not declared.",{node:o}),this.checkCall(o.expressionbase,r,n);break;case"LOOP":let s=e;this.checkCall(s.expression,r,n),s.instruction.forEach(c=>{this.traverseInstructions(c,r,n)});break;case"IF":let a=e;this.checkCall(a.expression,r,n),a.instruction.forEach(c=>{this.traverseInstructions(c,r,n)});break}}checkReturn(e,r){e.functions.forEach(n=>{let i=n.return!==void 0,o=n.returnedValue!==void 0;i!==o?i?r("error","Function should have a return value.",{node:n,property:"name"}):r("error","Function should not have a return value.",{node:n,property:"name"}):i&&this.checkCall(n.returnedValue,this.functionVariableMap.get(n.name),r)})}checkExpression(e,r,n){switch(e.$type){case"Expression":let i=e;this.checkExpression(i.expr1,r,n),this.checkExpression(i.expr2,r,n);break;case"And":let o=e;this.checkExpression(o.expr1,r,n),this.checkExpression(o.expr2,r,n);break;case"Or":let s=e;this.checkExpression(s.expr1,r,n),this.checkExpression(s.expr2,r,n);break;case"Equals":let a=e;this.checkExpression(a.expr1,r,n),this.checkExpression(a.expr2,r,n);break;case"PrimaryExprBool":let c=e;switch(c.expr.$type){case"CallVariable":let T=c.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=c.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break;case"PlusMinus":let l=e;this.checkExpression(l.expr1,r,n),this.checkExpression(l.expr2,r,n);break;case"MultDiv":let u=e;this.checkExpression(u.expr1,r,n),this.checkExpression(u.expr1,r,n);break;case"PlusMinusDistance":let f=e;this.checkExpression(f.expr1,r,n),this.checkExpression(f.expr2,r,n);break;case"MultDivDistance":let m=e;this.checkExpression(m.expr1,r,n),this.checkExpression(m.expr2,r,n);break;case"PlusMinusTime":let v=e;this.checkExpression(v.expr1,r,n),this.checkExpression(v.expr2,r,n);break;case"MultDivTime":let A=e;this.checkExpression(A.expr1,r,n),this.checkExpression(A.expr2,r,n);break;case"PrimaryExprTime":let C=e;switch(C.expr.$type){case"CallVariable":let T=C.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=C.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break;case"PrimaryExprDistance":let N=e;switch(N.expr.$type){case"CallVariable":let T=N.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=N.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break;case"PrimaryExprAri":let S=e;switch(S.expr.$type){case"CallVariable":let T=S.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=S.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break}}};function vt(t,e){switch(t.$type){case"FunctionN":return t.accept(e);case"Instruction":return console.log("instruction"),t.accept(e);case"DirectionCommand":return console.log("direction"),t.accept(e);case"DistanceExpression":return console.log("distanceEXP"),t.accept(e);case"Distance":return console.log("distance"),t.accept(e);case"NumberType":return console.log("number"),t.accept(e);case"RotateCommand":return console.log("rotate"),t.accept(e);case"SpeedCommand":return console.log("speed"),t.accept(e);case"Time":return console.log("time"),t.accept(e);case"TimeExpression":return console.log("timeEXP"),t.accept(e);case"DistanceSensorCommand":return console.log("distSensor"),t.accept(e);case"TimeSensorCommand":return console.log("timeSensor"),t.accept(e);case"CallFunction":return console.log("callFunction"),t.accept(e);case"CallVariable":return console.log("callVariable"),t.accept(e);case"Affectation":return console.log("affectation"),t.accept(e);case"PrimaryExprBool":return console.log("primaryExprBool"),t.accept(e);case"PrimaryExprAri":return console.log("primaryExprAri"),t.accept(e);case"PrimaryExprDistance":return console.log("primaryExprDistance"),t.accept(e);case"MultDiv":return console.log("multDiv"),t.accept(e);case"PlusMinus":return console.log("plusMinus"),t.accept(e);case"MultDivDistance":return console.log("multDivDistance"),t.accept(e);case"PlusMinusDistance":return console.log("plusMinusDistance"),t.accept(e);case"MultDivTime":return console.log("multDivTime"),t.accept(e);case"PlusMinusTime":return console.log("plusMinusTime"),t.accept(e);case"Equals":return console.log("equals"),t.accept(e);case"Or":return console.log("or"),t.accept(e);case"And":return console.log("and"),t.accept(e);case"Not":return console.log("not"),t.accept(e);case"Block":return console.log("block"),t.accept(e);case"DeclarationVariable":return console.log("declarationVariable"),t.accept(e);case"IF":return console.log("if"),t.accept(e);case"LOOP":return console.log("loop"),t.accept(e);case"Parameter":return console.log("parameter"),t.accept(e);case"BooleanType":return console.log("booleanType"),t.accept(e);case"TypeClass":return console.log("typeClass"),t.accept(e);default:throw new Error(`Unknown node type ${t.$type}`)}}var xn=class t{static fromAngle(e,r){return new t(Math.cos(e)*r,Math.sin(e)*r)}static null(){return new t(0,0)}constructor(e,r){this.x=e,this.y=r}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}scale(e){return new t(this.x*e,this.y*e)}projX(){return new t(this.x,0)}projY(){return new t(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}},Ud=class{constructor(e,r){this.origin=e,this.vector=r}intersect(e){let r=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),r=r.concat(o)}return this.findClosestIntersection(r)}findClosestIntersection(e){let r=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,r=i)}return e[r]}else return}getPoiFinder(){return(e,r)=>{let n=e.minus(r),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,c=n.x*s.y-s.x*n.y,l=a/o,u=-c/o;if(l>0&&l<1&&u>0)return e.plus(n.scale(-l))}}}};var zc=class{constructor(e,r,n,i,o){this.type="Robot",this.pos=e,this.size=r,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){return[]}turn(e){this.rad+=e*Math.PI/180;let r=e/this.speed*250;this.scene.time+=r,this.scene.timestamps.push(new Oo(this.scene.time,this))}move(e){let r=Math.cos(this.rad)*e,n=Math.sin(this.rad)*e;this.pos.x+=r,this.pos.y+=n;let i=e/this.speed*250;this.scene.time+=i,this.scene.timestamps.push(new Oo(this.scene.time,this))}side(e){let r=this.rad-Math.PI/2,n=Math.cos(r)*e,i=Math.sin(r)*e;this.pos.x+=n,this.pos.y+=i;let o=e/this.speed*250;this.scene.time+=o,this.scene.timestamps.push(new Oo(this.scene.time,this))}getRay(){return new Ud(this.pos,xn.fromAngle(this.rad,1e4).scale(-1))}},Oo=class extends zc{constructor(e,r){super(r.pos.scale(1),r.size.scale(1),r.rad,r.speed,r.scene),this.rad=r.rad,this.time=e}};var Lo=class{constructor(e,r){this.type="Wall",this.pos=e,this.size=r}intersect(e){let r=e.getPoiFinder()(this.pos,this.size);return r?[r]:[]}};var qd=class{constructor(e=new xn(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new zc(this.size.scale(.5),new xn(250,250),0,30,this),this.entities.push(new Lo(xn.null(),this.size.projX())),this.entities.push(new Lo(xn.null(),this.size.projY())),this.entities.push(new Lo(this.size,this.size.projY())),this.entities.push(new Lo(this.size,this.size.projX())),this.timestamps.push(new Oo(0,this.robot))}};var Gd=class{constructor(e,r){this.scene=new qd(new xn(e*10,r*10)),this.robot=this.scene.robot,this.variables=Array(),this.wait=!1,this.niveau=0,this.functions=Array()}visitRobot(e){let r;for(let n of e.functions)n.return?this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:vt(n.return,this)}):this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:void 0}),n.name==="main"&&(r=n);return vt(r,this),this.scene}visitInstruction(e){vt(e,this)}visitFunctionN(e){this.niveau++;for(let r of e.instruction)vt(r,this);if(e.returnType&&e.returnedValue)return vt(e.returnedValue,this)}visitExpressionBase(e){vt(e,this)}visitDistanceExpression(e){let r=vt(e.unit,this),n=vt(e.number,this);return r==="cm"&&(n=n*10),n}visitTimeExpression(e){return vt(e.number,this)}visitDistance(e){return e.typeD}visitTime(e){}visitDirectionCommand(e){if(e.operateur==="FORWARD"){let r=vt(e.distance,this);this.robot.move(r)}else e.operateur==="BACKWARD"?this.robot.move(-vt(e.distance,this)):e.operateur==="LEFT"?this.robot.side(-vt(e.distance,this)):e.operateur==="RIGHT"&&this.robot.side(vt(e.distance,this))}visitSpeedCommand(e){let r=vt(e.speed,this);this.robot.speed=r}visitDistanceSensorCommand(e){let r=this.robot.getRay().intersect(this.scene.entities);return r?this.robot.pos.minus(r).norm():-1}visitTimeSensorCommand(e){return this.scene.time}visitRotateCommand(e){this.robot.turn(e.angle)}visitCallVariable(e){var r;let n=e.nom,i=this.niveau,o;for(;i>=0;){if(this.variables[i].has(n)){o=(r=this.variables[i].get(n))===null||r===void 0?void 0:r.value;break}i--}return o}visitCallFunction(e){let r=e.nom,n=this.functions.find(i=>i.name===r);if(this.niveau++,n&&n.parameters&&n.parameters.length>0){let i=0;this.variables[this.niveau]=new Map;for(let o of n.parameters)this.variables[this.niveau].set(o.nom,{name:o.nom,type:vt(o.typeP,this),value:vt(e.parameters[i],this),niveau:this.niveau}),i++}n&&vt(n.func,this),n&&n.parameters&&n.parameters.length>0&&this.variables[this.niveau].clear(),this.niveau--}visitAffectation(e){let r=e.callvariable.nom,n=this.niveau;for(;n>=0;){if(this.variables[n].has(r)){let i=this.variables[n].get(r);i&&(i.value=vt(e.expressionbase,this));break}n--}}visitBooleanType(e){return e.value}visitNumberType(e){return e.value}visitPlusMinus(e){throw new Error("Method not implemented.")}visitMultDiv(e){throw new Error("Method not implemented.")}visitPlusMinusDistance(e){throw new Error("Method not implemented.")}visitMultDivDistance(e){throw new Error("Method not implemented.")}visitPlusMinusTime(e){throw new Error("Method not implemented.")}visitMultDivTime(e){throw new Error("Method not implemented.")}visitDeclarationVariable(e){this.variables[this.niveau].set(e.nom,{name:e.nom,type:vt(e.type,this),value:vt(e.expressionbase,this),niveau:this.niveau})}visitPrimaryExprAri(e){throw new Error("Method not implemented.")}visitPrimaryExprBool(e){throw new Error("Method not implemented.")}visitPrimaryExprDistance(e){throw new Error("Method not implemented.")}visitBlock(e){throw new Error("Method not implemented.")}visitIF(e){throw new Error("Method not implemented.")}visitLOOP(e){throw new Error("Method not implemented.")}visitAnd(e){throw new Error("Method not implemented.")}visitOr(e){throw new Error("Method not implemented.")}visitNot(e){throw new Error("Method not implemented.")}visitEquals(e){throw new Error("Method not implemented.")}visitParameter(e){}visitTypeClass(e){return e.typeT}};function rw(t,e,r){let n=new Gd(e,r);return t.accept(n)}async function iG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,th.parse("memory://robot.document"));return await e.shared.workspace.DocumentBuilder.build([n],{validation:!0}),(r=n.parseResult)===null||r===void 0?void 0:r.value}async function nw(t){let e=t[0],r=t[1],n=t[2],i=jd(Ps).Robot,o=await iG(e,i),s=rw(o,r,n);return Promise.resolve(s)}function iw(t){let e=t.validation.ValidationRegistry,r=t.validation.RoboMlAcceptWeaver;e.register(r.checks,r)}var Hd=class{constructor(){this.checks={Robot:this.weaveRobot,Instruction:this.weaveInstruction,FunctionN:this.weaveFunctionN,ExpressionBase:this.weaveExpressionBase,DistanceExpression:this.weaveDistanceExpression,TimeExpression:this.weaveTimeExpression,Distance:this.weaveDistance,Time:this.weaveTime,DirectionCommand:this.weaveDirectionCommand,SpeedCommand:this.weaveSpeedCommand,DistanceSensorCommand:this.weaveDistanceSensorCommand,TimeSensorCommand:this.weaveTimeSensorCommand,RotateCommand:this.weaveRotateCommand,CallVariable:this.weaveCallVariable,CallFunction:this.weaveCallFunction,Affectation:this.weaveAffectation,BooleanType:this.weaveBooleanType,NumberType:this.weaveNumberType,PlusMinus:this.weavePlusMinus,MultDiv:this.weaveMultDiv,PlusMinusDistance:this.weavePlusMinusDistance,MultDivDistance:this.weaveMultDivDistance,PlusMinusTime:this.weavePlusMinusTime,MultDivTime:this.weaveMultDivTime,DeclarationVariable:this.weaveDeclarationVariable,PrimaryExprAri:this.weavePrimaryExprAri,PrimaryExprBool:this.weavePrimaryExprBool,PrimaryExprDistance:this.weavePrimaryExprDistance,Block:this.weaveBlock,IF:this.weaveIF,LOOP:this.weaveLOOP,And:this.weaveAnd,Or:this.weaveOr,Not:this.weaveNot,Equals:this.weaveEquals}}weaveRobot(e,r){e.accept=n=>n.visitRobot(e)}weaveInstruction(e,r){e.accept=n=>n.visitInstruction(e)}weaveFunctionN(e,r){e.accept=n=>n.visitFunctionN(e)}weaveExpressionBase(e,r){e.accept=n=>n.visitExpressionBase(e)}weaveDistanceExpression(e,r){e.accept=n=>n.visitDistanceExpression(e)}weaveTimeExpression(e,r){e.accept=n=>n.visitTimeExpression(e)}weaveDistance(e,r){e.accept=n=>n.visitDistance(e)}weaveTime(e,r){e.accept=n=>n.visitTime(e)}weaveDirectionCommand(e,r){e.accept=n=>n.visitDirectionCommand(e)}weaveSpeedCommand(e,r){e.accept=n=>n.visitSpeedCommand(e)}weaveDistanceSensorCommand(e,r){e.accept=n=>n.visitDistanceSensorCommand(e)}weaveTimeSensorCommand(e,r){e.accept=n=>n.visitTimeSensorCommand(e)}weaveRotateCommand(e,r){e.accept=n=>n.visitRotateCommand(e)}weaveCallVariable(e,r){e.accept=n=>n.visitCallVariable(e)}weaveCallFunction(e,r){e.accept=n=>n.visitCallFunction(e)}weaveAffectation(e,r){e.accept=n=>n.visitAffectation(e)}weaveBooleanType(e,r){e.accept=n=>n.visitBooleanType(e)}weaveNumberType(e,r){e.accept=n=>n.visitNumberType(e)}weavePlusMinus(e,r){e.accept=n=>n.visitPlusMinus(e)}weaveMultDiv(e,r){e.accept=n=>n.visitMultDiv(e)}weavePlusMinusDistance(e,r){e.accept=n=>n.visitPlusMinusDistance(e)}weaveMultDivDistance(e,r){e.accept=n=>n.visitMultDivDistance(e)}weavePlusMinusTime(e,r){e.accept=n=>n.visitPlusMinusTime(e)}weaveMultDivTime(e,r){e.accept=n=>n.visitMultDivTime(e)}weaveDeclarationVariable(e,r){e.accept=n=>n.visitDeclarationVariable(e)}weavePrimaryExprAri(e,r){e.accept=n=>n.visitPrimaryExprAri(e)}weavePrimaryExprBool(e,r){e.accept=n=>n.visitPrimaryExprBool(e)}weavePrimaryExprDistance(e,r){e.accept=n=>n.visitPrimaryExprDistance(e)}weaveBlock(e,r){e.accept=n=>n.visitBlock(e)}weaveIF(e,r){e.accept=n=>n.visitIF(e)}weaveLOOP(e,r){e.accept=n=>n.visitLOOP(e)}weaveAnd(e,r){e.accept=n=>n.visitAnd(e)}weaveOr(e,r){e.accept=n=>n.visitOr(e)}weaveNot(e,r){e.accept=n=>n.visitNot(e)}weaveEquals(e,r){e.accept=n=>n.visitEquals(e)}};var ky=class extends Ou{registerCommands(e){e("parseAndGenerate",r=>nw(r[0]))}},oG={validation:{RobotValidator:()=>new Fd,RoboMlAcceptWeaver:()=>new Hd}};function jd(t){let e=po(yc(t),ZS),r=po(hc({shared:e}),ew,oG);return e.lsp.ExecuteCommandHandler=new ky,e.ServiceRegistry.register(r),tw(r),iw(r),{shared:e,Robot:r}}var sG=new xa.BrowserMessageReader(self),aG=new xa.BrowserMessageWriter(self),cG=(0,xa.createConnection)(sG,aG),{shared:lG}=jd(Object.assign({connection:cG},Ps));jx(lG);})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
