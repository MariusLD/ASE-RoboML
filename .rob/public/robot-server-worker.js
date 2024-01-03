"use strict";(()=>{var cw=Object.create;var zd=Object.defineProperty;var uw=Object.getOwnPropertyDescriptor;var fw=Object.getOwnPropertyNames;var dw=Object.getPrototypeOf,pw=Object.prototype.hasOwnProperty;var Py=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var K=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),mw=(t,e)=>{for(var r in e)zd(t,r,{get:e[r],enumerable:!0})},hw=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of fw(e))!pw.call(t,i)&&i!==r&&zd(t,i,{get:()=>e[i],enumerable:!(n=uw(e,i))||n.enumerable});return t};var pe=(t,e,r)=>(r=t!=null?cw(dw(t)):{},hw(e||!t||!t.__esModule?zd(r,"default",{value:t,enumerable:!0}):r,t));var Bn=K(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});var Vd;function Xd(){if(Vd===void 0)throw new Error("No runtime abstraction layer installed");return Vd}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Vd=r}t.install=e})(Xd||(Xd={}));Yd.default=Xd});var Jd=K(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.Disposable=void 0;var yw;(function(t){function e(r){return{dispose:r}}t.create=e})(yw=Aa.Disposable||(Aa.Disposable={}))});var no=K(ro=>{"use strict";Object.defineProperty(ro,"__esModule",{value:!0});ro.Emitter=ro.Event=void 0;var gw=Bn(),Tw;(function(t){let e={dispose(){}};t.None=function(){return e}})(Tw=ro.Event||(ro.Event={}));var Qd=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,gw.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Jl=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Qd),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};ro.Emitter=Jl;Jl._noop=function(){}});var Iy=K(Ql=>{"use strict";Object.defineProperty(Ql,"__esModule",{value:!0});Ql.AbstractMessageBuffer=void 0;var vw=13,xw=10,Rw=`\r
`,Zd=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let l=this._chunks[r];for(n=0;n<l.length;){switch(l[n]){case vw:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case xw:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=l.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(Rw);if(a.length<2)return s;for(let l=0;l<a.length-2;l++){let c=a[l],u=c.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=c.substr(0,u),m=c.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};Ql.AbstractMessageBuffer=Zd});var Ly=K(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});var Dy=Bn(),qo=Jd(),bw=no(),Aw=Iy(),Zl=class t extends Aw.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Zl.emptyBuffer=new Uint8Array(0);var ep=class{constructor(e){this.socket=e,this._onData=new bw.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Dy.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},tp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),qo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),qo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),qo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},Sw=new TextEncoder,Oy=Object.freeze({messageBuffer:Object.freeze({create:t=>new Zl(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(Sw.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new ep(t),asWritableStream:t=>new tp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function rp(){return Oy}(function(t){function e(){Dy.default.install(Oy)}t.install=e})(rp||(rp={}));np.default=rp});var Go=K(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.stringArray=rr.array=rr.func=rr.error=rr.number=rr.string=rr.boolean=void 0;function Cw(t){return t===!0||t===!1}rr.boolean=Cw;function My(t){return typeof t=="string"||t instanceof String}rr.string=My;function ww(t){return typeof t=="number"||t instanceof Number}rr.number=ww;function $w(t){return t instanceof Error}rr.error=$w;function kw(t){return typeof t=="function"}rr.func=kw;function Fy(t){return Array.isArray(t)}rr.array=Fy;function Ew(t){return Fy(t)&&t.every(e=>My(e))}rr.stringArray=Ew});var $p=K(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.Message=X.NotificationType9=X.NotificationType8=X.NotificationType7=X.NotificationType6=X.NotificationType5=X.NotificationType4=X.NotificationType3=X.NotificationType2=X.NotificationType1=X.NotificationType0=X.NotificationType=X.RequestType9=X.RequestType8=X.RequestType7=X.RequestType6=X.RequestType5=X.RequestType4=X.RequestType3=X.RequestType2=X.RequestType1=X.RequestType=X.RequestType0=X.AbstractMessageSignature=X.ParameterStructures=X.ResponseError=X.ErrorCodes=void 0;var io=Go(),Uy;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Uy=X.ErrorCodes||(X.ErrorCodes={}));var ip=class t extends Error{constructor(e,r,n){super(r),this.code=io.number(e)?e:Uy.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};X.ResponseError=ip;var Rr=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};X.ParameterStructures=Rr;Rr.auto=new Rr("auto");Rr.byPosition=new Rr("byPosition");Rr.byName=new Rr("byName");var Ye=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Rr.auto}};X.AbstractMessageSignature=Ye;var op=class extends Ye{constructor(e){super(e,0)}};X.RequestType0=op;var sp=class extends Ye{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType=sp;var ap=class extends Ye{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType1=ap;var lp=class extends Ye{constructor(e){super(e,2)}};X.RequestType2=lp;var cp=class extends Ye{constructor(e){super(e,3)}};X.RequestType3=cp;var up=class extends Ye{constructor(e){super(e,4)}};X.RequestType4=up;var fp=class extends Ye{constructor(e){super(e,5)}};X.RequestType5=fp;var dp=class extends Ye{constructor(e){super(e,6)}};X.RequestType6=dp;var pp=class extends Ye{constructor(e){super(e,7)}};X.RequestType7=pp;var mp=class extends Ye{constructor(e){super(e,8)}};X.RequestType8=mp;var hp=class extends Ye{constructor(e){super(e,9)}};X.RequestType9=hp;var yp=class extends Ye{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType=yp;var gp=class extends Ye{constructor(e){super(e,0)}};X.NotificationType0=gp;var Tp=class extends Ye{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType1=Tp;var vp=class extends Ye{constructor(e){super(e,2)}};X.NotificationType2=vp;var xp=class extends Ye{constructor(e){super(e,3)}};X.NotificationType3=xp;var Rp=class extends Ye{constructor(e){super(e,4)}};X.NotificationType4=Rp;var bp=class extends Ye{constructor(e){super(e,5)}};X.NotificationType5=bp;var Ap=class extends Ye{constructor(e){super(e,6)}};X.NotificationType6=Ap;var Sp=class extends Ye{constructor(e){super(e,7)}};X.NotificationType7=Sp;var Cp=class extends Ye{constructor(e){super(e,8)}};X.NotificationType8=Cp;var wp=class extends Ye{constructor(e){super(e,9)}};X.NotificationType9=wp;var Nw;(function(t){function e(i){let o=i;return o&&io.string(o.method)&&(io.string(o.id)||io.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&io.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(io.string(o.id)||io.number(o.id)||o.id===null)}t.isResponse=n})(Nw=X.Message||(X.Message={}))});var Ep=K(zn=>{"use strict";var qy;Object.defineProperty(zn,"__esModule",{value:!0});zn.LRUCache=zn.LinkedMap=zn.Touch=void 0;var fr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(fr=zn.Touch||(zn.Touch={}));var ec=class{constructor(){this[qy]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=fr.None){let n=this._map.get(e);if(n)return r!==fr.None&&this.touch(n,r),n.value}set(e,r,n=fr.None){let i=this._map.get(e);if(i)i.value=r,n!==fr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case fr.None:this.addItemLast(i);break;case fr.First:this.addItemFirst(i);break;case fr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(qy=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==fr.First&&r!==fr.Last)){if(r===fr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===fr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};zn.LinkedMap=ec;var kp=class extends ec{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=fr.AsNew){return super.get(e,r)}peek(e){return super.get(e,fr.None)}set(e,r){return super.set(e,r,fr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};zn.LRUCache=kp});var Ip=K(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.CancellationTokenSource=oo.CancellationToken=void 0;var _w=Bn(),Pw=Go(),Np=no(),_p;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Np.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Np.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||Pw.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(_p=oo.CancellationToken||(oo.CancellationToken={}));var Iw=Object.freeze(function(t,e){let r=(0,_w.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),tc=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?Iw:(this._emitter||(this._emitter=new Np.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Pp=class{get token(){return this._token||(this._token=new tc),this._token}cancel(){this._token?this._token.cancel():this._token=_p.Cancelled}dispose(){this._token?this._token instanceof tc&&this._token.dispose():this._token=_p.None}};oo.CancellationTokenSource=Pp});var Gy=K(Vn=>{"use strict";Object.defineProperty(Vn,"__esModule",{value:!0});Vn.ReadableStreamMessageReader=Vn.AbstractMessageReader=Vn.MessageReader=void 0;var Op=Bn(),jo=Go(),Dp=no(),Dw;(function(t){function e(r){let n=r;return n&&jo.func(n.listen)&&jo.func(n.dispose)&&jo.func(n.onError)&&jo.func(n.onClose)&&jo.func(n.onPartialMessage)}t.is=e})(Dw=Vn.MessageReader||(Vn.MessageReader={}));var rc=class{constructor(){this.errorEmitter=new Dp.Emitter,this.closeEmitter=new Dp.Emitter,this.partialMessageEmitter=new Dp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${jo.string(e.message)?e.message:"unknown"}`)}};Vn.AbstractMessageReader=rc;var Lp;(function(t){function e(r){let n,i,o,s=new Map,a,l=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let c of r.contentDecoders)s.set(c.name,c);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,l.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let c of r.contentTypeDecoders)l.set(c.name,c)}return a===void 0&&(a=(0,Op.default)().applicationJson.decoder,l.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:l}}t.fromOptions=e})(Lp||(Lp={}));var Mp=class extends rc{constructor(e,r){super(),this.readable=e,this.options=Lp.fromOptions(r),this.buffer=(0,Op.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Op.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Vn.ReadableStreamMessageReader=Mp});var jy=K(nc=>{"use strict";Object.defineProperty(nc,"__esModule",{value:!0});nc.Semaphore=void 0;var Ow=Bn(),Fp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,Ow.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};nc.Semaphore=Fp});var By=K(Xn=>{"use strict";Object.defineProperty(Xn,"__esModule",{value:!0});Xn.WriteableStreamMessageWriter=Xn.AbstractMessageWriter=Xn.MessageWriter=void 0;var Hy=Bn(),Sa=Go(),Lw=jy(),Ky=no(),Mw="Content-Length: ",Wy=`\r
`,Fw;(function(t){function e(r){let n=r;return n&&Sa.func(n.dispose)&&Sa.func(n.onClose)&&Sa.func(n.onError)&&Sa.func(n.write)}t.is=e})(Fw=Xn.MessageWriter||(Xn.MessageWriter={}));var ic=class{constructor(){this.errorEmitter=new Ky.Emitter,this.closeEmitter=new Ky.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Sa.string(e.message)?e.message:"unknown"}`)}};Xn.AbstractMessageWriter=ic;var Up;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Hy.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Hy.default)().applicationJson.encoder}}t.fromOptions=e})(Up||(Up={}));var qp=class extends ic{constructor(e,r){super(),this.writable=e,this.options=Up.fromOptions(r),this.errorCount=0,this.writeSemaphore=new Lw.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(Mw,n.byteLength.toString(),Wy),i.push(Wy),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Xn.WriteableStreamMessageWriter=qp});var Qy=K(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.createMessageConnection=J.ConnectionOptions=J.CancellationStrategy=J.CancellationSenderStrategy=J.CancellationReceiverStrategy=J.ConnectionStrategy=J.ConnectionError=J.ConnectionErrors=J.LogTraceNotification=J.SetTraceNotification=J.TraceFormat=J.TraceValues=J.Trace=J.NullLogger=J.ProgressType=J.ProgressToken=void 0;var zy=Bn(),Pt=Go(),ee=$p(),Vy=Ep(),Ca=no(),Gp=Ip(),$a;(function(t){t.type=new ee.NotificationType("$/cancelRequest")})($a||($a={}));var Xy;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(Xy=J.ProgressToken||(J.ProgressToken={}));var wa;(function(t){t.type=new ee.NotificationType("$/progress")})(wa||(wa={}));var jp=class{constructor(){}};J.ProgressType=jp;var Hp;(function(t){function e(r){return Pt.func(r)}t.is=e})(Hp||(Hp={}));J.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ne;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ne=J.Trace||(J.Trace={}));var Uw;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(Uw=J.TraceValues||(J.TraceValues={}));(function(t){function e(n){if(!Pt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ne=J.Trace||(J.Trace={}));var rn;(function(t){t.Text="text",t.JSON="json"})(rn=J.TraceFormat||(J.TraceFormat={}));(function(t){function e(r){return Pt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(rn=J.TraceFormat||(J.TraceFormat={}));var Yy;(function(t){t.type=new ee.NotificationType("$/setTrace")})(Yy=J.SetTraceNotification||(J.SetTraceNotification={}));var Kp;(function(t){t.type=new ee.NotificationType("$/logTrace")})(Kp=J.LogTraceNotification||(J.LogTraceNotification={}));var oc;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(oc=J.ConnectionErrors||(J.ConnectionErrors={}));var Ho=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};J.ConnectionError=Ho;var Jy;(function(t){function e(r){let n=r;return n&&Pt.func(n.cancelUndispatched)}t.is=e})(Jy=J.ConnectionStrategy||(J.ConnectionStrategy={}));var Wp;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Gp.CancellationTokenSource}});function e(r){let n=r;return n&&Pt.func(n.createCancellationTokenSource)}t.is=e})(Wp=J.CancellationReceiverStrategy||(J.CancellationReceiverStrategy={}));var Bp;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification($a.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}t.is=e})(Bp=J.CancellationSenderStrategy||(J.CancellationSenderStrategy={}));var zp;(function(t){t.Message=Object.freeze({receiver:Wp.Message,sender:Bp.Message});function e(r){let n=r;return n&&Wp.is(n.receiver)&&Bp.is(n.sender)}t.is=e})(zp=J.CancellationStrategy||(J.CancellationStrategy={}));var qw;(function(t){function e(r){let n=r;return n&&(zp.is(n.cancellationStrategy)||Jy.is(n.connectionStrategy))}t.is=e})(qw=J.ConnectionOptions||(J.ConnectionOptions={}));var nn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(nn||(nn={}));function Gw(t,e,r,n){let i=r!==void 0?r:J.NullLogger,o=0,s=0,a=0,l="2.0",c,u=new Map,f,m=new Map,T=new Map,A,C=new Vy.LinkedMap,N=new Map,w=new Set,v=new Map,g=Ne.Off,E=rn.Text,D,Y=nn.New,Te=new Ca.Emitter,Ee=new Ca.Emitter,Ht=new Ca.Emitter,xt=new Ca.Emitter,M=new Ca.Emitter,S=n&&n.cancellationStrategy?n.cancellationStrategy:zp.Message;function q(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function te(x,I){ee.Message.isRequest(I)?x.set(q(I.id),I):ee.Message.isResponse(I)?x.set(j(I.id),I):x.set(ce(),I)}function Z(x){}function Rt(){return Y===nn.Listening}function ut(){return Y===nn.Closed}function he(){return Y===nn.Disposed}function Er(){(Y===nn.New||Y===nn.Listening)&&(Y=nn.Closed,Ee.fire(void 0))}function Hn(x){Te.fire([x,void 0,void 0])}function Ra(x){Te.fire(x)}t.onClose(Er),t.onError(Hn),e.onClose(Er),e.onError(Ra);function Qi(){A||C.size===0||(A=(0,zy.default)().timer.setImmediate(()=>{A=void 0,ur()}))}function ur(){if(C.size===0)return;let x=C.shift();try{ee.Message.isRequest(x)?bt(x):ee.Message.isNotification(x)?Rn(x):ee.Message.isResponse(x)?er(x):Kt(x)}finally{Qi()}}let Mo=x=>{try{if(ee.Message.isNotification(x)&&x.method===$a.type.method){let I=x.params.id,F=q(I),z=C.get(F);if(ee.Message.isRequest(z)){let Le=n?.connectionStrategy,Qe=Le&&Le.cancelUndispatched?Le.cancelUndispatched(z,Z):void 0;if(Qe&&(Qe.error!==void 0||Qe.result!==void 0)){C.delete(F),v.delete(I),Qe.id=z.id,xr(Qe,x.method,Date.now()),e.write(Qe).catch(()=>i.error("Sending response for canceled message failed."));return}}let Oe=v.get(I);if(Oe!==void 0){Oe.cancel(),xi(x);return}else w.add(I)}te(C,x)}finally{Qi()}};function bt(x){if(he())return;function I(fe,qe,ve){let yt={jsonrpc:l,id:x.id};fe instanceof ee.ResponseError?yt.error=fe.toJson():yt.result=fe===void 0?null:fe,xr(yt,qe,ve),e.write(yt).catch(()=>i.error("Sending response failed."))}function F(fe,qe,ve){let yt={jsonrpc:l,id:x.id,error:fe.toJson()};xr(yt,qe,ve),e.write(yt).catch(()=>i.error("Sending response failed."))}function z(fe,qe,ve){fe===void 0&&(fe=null);let yt={jsonrpc:l,id:x.id,result:fe};xr(yt,qe,ve),e.write(yt).catch(()=>i.error("Sending response failed."))}Zi(x);let Oe=u.get(x.method),Le,Qe;Oe&&(Le=Oe.type,Qe=Oe.handler);let At=Date.now();if(Qe||c){let fe=x.id??String(Date.now()),qe=S.receiver.createCancellationTokenSource(fe);x.id!==null&&w.has(x.id)&&qe.cancel(),x.id!==null&&v.set(fe,qe);try{let ve;if(Qe)if(x.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){F(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Le.numberOfParams} params but received none.`),x.method,At);return}ve=Qe(qe.token)}else if(Array.isArray(x.params)){if(Le!==void 0&&Le.parameterStructures===ee.ParameterStructures.byName){F(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,At);return}ve=Qe(...x.params,qe.token)}else{if(Le!==void 0&&Le.parameterStructures===ee.ParameterStructures.byPosition){F(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,At);return}ve=Qe(x.params,qe.token)}else c&&(ve=c(x.method,x.params,qe.token));let yt=ve;ve?yt.then?yt.then(tr=>{v.delete(fe),I(tr,x.method,At)},tr=>{v.delete(fe),tr instanceof ee.ResponseError?F(tr,x.method,At):tr&&Pt.string(tr.message)?F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${tr.message}`),x.method,At):F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}):(v.delete(fe),I(ve,x.method,At)):(v.delete(fe),z(ve,x.method,At))}catch(ve){v.delete(fe),ve instanceof ee.ResponseError?I(ve,x.method,At):ve&&Pt.string(ve.message)?F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${ve.message}`),x.method,At):F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}}else F(new ee.ResponseError(ee.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,At)}function er(x){if(!he())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let I=x.id,F=N.get(I);if(Kd(x,F),F!==void 0){N.delete(I);try{if(x.error){let z=x.error;F.reject(new ee.ResponseError(z.code,z.message,z.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${F.method}' failed with message: ${z.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function Rn(x){if(he())return;let I,F;if(x.method===$a.type.method){let z=x.params.id;w.delete(z),xi(x);return}else{let z=m.get(x.method);z&&(F=z.handler,I=z.type)}if(F||f)try{if(xi(x),F)if(x.params===void 0)I!==void 0&&I.numberOfParams!==0&&I.parameterStructures!==ee.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let z=x.params;x.method===wa.type.method&&z.length===2&&Xy.is(z[0])?F({token:z[0],value:z[1]}):(I!==void 0&&(I.parameterStructures===ee.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),I.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received ${z.length} arguments`)),F(...z))}else I!==void 0&&I.parameterStructures===ee.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(z){z.message?i.error(`Notification handler '${x.method}' failed with message: ${z.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Ht.fire(x)}function Kt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let I=x;if(Pt.string(I.id)||Pt.number(I.id)){let F=I.id,z=N.get(F);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function ft(x){if(x!=null)switch(g){case Ne.Verbose:return JSON.stringify(x,null,4);case Ne.Compact:return JSON.stringify(x);default:return}}function Gr(x){if(!(g===Ne.Off||!D))if(E===rn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&x.params&&(I=`Params: ${ft(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,I)}else Ri("send-request",x)}function Nr(x){if(!(g===Ne.Off||!D))if(E===rn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&(x.params?I=`Params: ${ft(x.params)}

`:I=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,I)}else Ri("send-notification",x)}function xr(x,I,F){if(!(g===Ne.Off||!D))if(E===rn.Text){let z;(g===Ne.Verbose||g===Ne.Compact)&&(x.error&&x.error.data?z=`Error data: ${ft(x.error.data)}

`:x.result?z=`Result: ${ft(x.result)}

`:x.error===void 0&&(z=`No result returned.

`)),D.log(`Sending response '${I} - (${x.id})'. Processing request took ${Date.now()-F}ms`,z)}else Ri("send-response",x)}function Zi(x){if(!(g===Ne.Off||!D))if(E===rn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&x.params&&(I=`Params: ${ft(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,I)}else Ri("receive-request",x)}function xi(x){if(!(g===Ne.Off||!D||x.method===Kp.type.method))if(E===rn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&(x.params?I=`Params: ${ft(x.params)}

`:I=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,I)}else Ri("receive-notification",x)}function Kd(x,I){if(!(g===Ne.Off||!D))if(E===rn.Text){let F;if((g===Ne.Verbose||g===Ne.Compact)&&(x.error&&x.error.data?F=`Error data: ${ft(x.error.data)}

`:x.result?F=`Result: ${ft(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),I){let z=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${I.method} - (${x.id})' in ${Date.now()-I.timerStart}ms.${z}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else Ri("receive-response",x)}function Ri(x,I){if(!D||g===Ne.Off)return;let F={isLSPMessage:!0,type:x,message:I,timestamp:Date.now()};D.log(F)}function eo(){if(ut())throw new Ho(oc.Closed,"Connection is closed.");if(he())throw new Ho(oc.Disposed,"Connection is disposed.")}function Wd(){if(Rt())throw new Ho(oc.AlreadyListening,"Connection is already listening")}function Bd(){if(!Rt())throw new Error("Call listen() first.")}function to(x){return x===void 0?null:x}function Fo(x){if(x!==null)return x}function Vl(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function ba(x,I){switch(x){case ee.ParameterStructures.auto:return Vl(I)?Fo(I):[to(I)];case ee.ParameterStructures.byName:if(!Vl(I))throw new Error("Received parameters by name but param is not an object literal.");return Fo(I);case ee.ParameterStructures.byPosition:return[to(I)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function Xl(x,I){let F,z=x.numberOfParams;switch(z){case 0:F=void 0;break;case 1:F=ba(x.parameterStructures,I[0]);break;default:F=[];for(let Oe=0;Oe<I.length&&Oe<z;Oe++)F.push(to(I[Oe]));if(I.length<z)for(let Oe=I.length;Oe<z;Oe++)F.push(null);break}return F}let bi={sendNotification:(x,...I)=>{eo();let F,z;if(Pt.string(x)){F=x;let Le=I[0],Qe=0,At=ee.ParameterStructures.auto;ee.ParameterStructures.is(Le)&&(Qe=1,At=Le);let fe=I.length,qe=fe-Qe;switch(qe){case 0:z=void 0;break;case 1:z=ba(At,I[Qe]);break;default:if(At===ee.ParameterStructures.byName)throw new Error(`Received ${qe} parameters for 'by Name' notification parameter structure.`);z=I.slice(Qe,fe).map(ve=>to(ve));break}}else{let Le=I;F=x.method,z=Xl(x,Le)}let Oe={jsonrpc:l,method:F,params:z};return Nr(Oe),e.write(Oe).catch(()=>i.error("Sending notification failed."))},onNotification:(x,I)=>{eo();let F;return Pt.func(x)?f=x:I&&(Pt.string(x)?(F=x,m.set(x,{type:void 0,handler:I})):(F=x.method,m.set(x.method,{type:x,handler:I}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,I,F)=>{if(T.has(I))throw new Error(`Progress handler for token ${I} already registered`);return T.set(I,F),{dispose:()=>{T.delete(I)}}},sendProgress:(x,I,F)=>bi.sendNotification(wa.type,{token:I,value:F}),onUnhandledProgress:xt.event,sendRequest:(x,...I)=>{eo(),Bd();let F,z,Oe;if(Pt.string(x)){F=x;let fe=I[0],qe=I[I.length-1],ve=0,yt=ee.ParameterStructures.auto;ee.ParameterStructures.is(fe)&&(ve=1,yt=fe);let tr=I.length;Gp.CancellationToken.is(qe)&&(tr=tr-1,Oe=qe);let Kn=tr-ve;switch(Kn){case 0:z=void 0;break;case 1:z=ba(yt,I[ve]);break;default:if(yt===ee.ParameterStructures.byName)throw new Error(`Received ${Kn} parameters for 'by Name' request parameter structure.`);z=I.slice(ve,tr).map(bn=>to(bn));break}}else{let fe=I;F=x.method,z=Xl(x,fe);let qe=x.numberOfParams;Oe=Gp.CancellationToken.is(fe[qe])?fe[qe]:void 0}let Le=o++,Qe;return Oe&&(Qe=Oe.onCancellationRequested(()=>{let fe=S.sender.sendCancellation(bi,Le);return fe===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):fe.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((fe,qe)=>{let ve={jsonrpc:l,id:Le,method:F,params:z},yt=bn=>{fe(bn),S.sender.cleanup(Le),Qe?.dispose()},tr=bn=>{qe(bn),S.sender.cleanup(Le),Qe?.dispose()},Kn={method:F,timerStart:Date.now(),resolve:yt,reject:tr};Gr(ve);try{e.write(ve).catch(()=>i.error("Sending request failed."))}catch(bn){Kn.reject(new ee.ResponseError(ee.ErrorCodes.MessageWriteError,bn.message?bn.message:"Unknown reason")),Kn=null}Kn&&N.set(Le,Kn)})},onRequest:(x,I)=>{eo();let F=null;return Hp.is(x)?(F=void 0,c=x):Pt.string(x)?(F=null,I!==void 0&&(F=x,u.set(x,{handler:I,type:void 0}))):I!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:I})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):c=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,I,F)=>{let z=!1,Oe=rn.Text;F!==void 0&&(Pt.boolean(F)?z=F:(z=F.sendNotification||!1,Oe=F.traceFormat||rn.Text)),g=x,E=Oe,g===Ne.Off?D=void 0:D=I,z&&!ut()&&!he()&&await bi.sendNotification(Yy.type,{value:Ne.toString(x)})},onError:Te.event,onClose:Ee.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(he())return;Y=nn.Disposed,M.fire(void 0);let x=new ee.ResponseError(ee.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let I of N.values())I.reject(x);N=new Map,v=new Map,w=new Set,C=new Vy.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(t.dispose)&&t.dispose()},listen:()=>{eo(),Wd(),Y=nn.Listening,t.listen(Mo)},inspect:()=>{(0,zy.default)().console.log("inspect")}};return bi.onNotification(Kp.type,x=>{if(g===Ne.Off||!D)return;let I=g===Ne.Verbose||g===Ne.Compact;D.log(x.message,I?x.verbose:void 0)}),bi.onNotification(wa.type,x=>{let I=T.get(x.token);I?I(x.value):xt.fire(x)}),bi}J.createMessageConnection=Gw});var Jp=K(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var je=$p();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return je.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return je.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return je.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return je.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return je.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return je.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return je.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return je.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return je.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return je.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return je.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return je.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return je.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return je.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return je.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return je.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return je.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return je.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return je.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return je.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return je.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return je.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return je.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return je.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return je.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return je.ParameterStructures}});var Vp=Ep();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return Vp.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return Vp.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return Vp.Touch}});var jw=Jd();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return jw.Disposable}});var Zy=no();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return Zy.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return Zy.Emitter}});var eg=Ip();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return eg.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return eg.CancellationToken}});var Xp=Gy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return Xp.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return Xp.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Xp.ReadableStreamMessageReader}});var Yp=By();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return Yp.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return Yp.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Yp.WriteableStreamMessageWriter}});var nr=Qy();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return nr.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return nr.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return nr.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return nr.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return nr.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return nr.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return nr.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return nr.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return nr.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return nr.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return nr.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return nr.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return nr.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return nr.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return nr.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return nr.CancellationStrategy}});var Hw=Bn();_.RAL=Hw.default});var Yn=K(_r=>{"use strict";var Kw=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ww=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Kw(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.createMessageConnection=_r.BrowserMessageWriter=_r.BrowserMessageReader=void 0;var Bw=Ly();Bw.default.install();var Ko=Jp();Ww(Jp(),_r);var Qp=class extends Ko.AbstractMessageReader{constructor(e){super(),this._onData=new Ko.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};_r.BrowserMessageReader=Qp;var Zp=class extends Ko.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};_r.BrowserMessageWriter=Zp;function zw(t,e,r,n){return r===void 0&&(r=Ko.NullLogger),Ko.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Ko.createMessageConnection)(t,e,r,n)}_r.createMessageConnection=zw});var em=K((kG,tg)=>{"use strict";tg.exports=Yn()});var so=K((rg,sc)=>{(function(t){if(typeof sc=="object"&&typeof sc.exports=="object"){var e=t(Py,rg);e!==void 0&&(sc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(y,d){return y===Number.MAX_VALUE&&(y=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:y,character:d}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&$.uinteger(d.line)&&$.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(y,d,k,P){if($.uinteger(y)&&$.uinteger(d)&&$.uinteger(k)&&$.uinteger(P))return{start:s.create(y,d),end:s.create(k,P)};if(s.is(y)&&s.is(d))return{start:y,end:d};throw new Error("Range#create called with invalid arguments[".concat(y,", ").concat(d,", ").concat(k,", ").concat(P,"]"))}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var l;(function(p){function R(y,d){return{uri:y,range:d}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&a.is(d.range)&&($.string(d.uri)||$.undefined(d.uri))}p.is=b})(l=e.Location||(e.Location={}));var c;(function(p){function R(y,d,k,P){return{targetUri:y,targetRange:d,targetSelectionRange:k,originSelectionRange:P}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&a.is(d.targetRange)&&$.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||$.undefined(d.originSelectionRange))}p.is=b})(c=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(y,d,k,P){return{red:y,green:d,blue:k,alpha:P}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&$.numberRange(d.red,0,1)&&$.numberRange(d.green,0,1)&&$.numberRange(d.blue,0,1)&&$.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(y,d){return{range:y,color:d}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(y,d,k){return{label:y,textEdit:d,additionalTextEdits:k}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&$.string(d.label)&&($.undefined(d.textEdit)||D.is(d))&&($.undefined(d.additionalTextEdits)||$.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var A;(function(p){function R(y,d,k,P,ne,dt){var Ge={startLine:y,endLine:d};return $.defined(k)&&(Ge.startCharacter=k),$.defined(P)&&(Ge.endCharacter=P),$.defined(ne)&&(Ge.kind=ne),$.defined(dt)&&(Ge.collapsedText=dt),Ge}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&$.uinteger(d.startLine)&&$.uinteger(d.startLine)&&($.undefined(d.startCharacter)||$.uinteger(d.startCharacter))&&($.undefined(d.endCharacter)||$.uinteger(d.endCharacter))&&($.undefined(d.kind)||$.string(d.kind))}p.is=b})(A=e.FoldingRange||(e.FoldingRange={}));var C;(function(p){function R(y,d){return{location:y,message:d}}p.create=R;function b(y){var d=y;return $.defined(d)&&l.is(d.location)&&$.string(d.message)}p.is=b})(C=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var w;(function(p){p.Unnecessary=1,p.Deprecated=2})(w=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var y=b;return $.objectLiteral(y)&&$.string(y.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var g;(function(p){function R(y,d,k,P,ne,dt){var Ge={range:y,message:d};return $.defined(k)&&(Ge.severity=k),$.defined(P)&&(Ge.code=P),$.defined(ne)&&(Ge.source=ne),$.defined(dt)&&(Ge.relatedInformation=dt),Ge}p.create=R;function b(y){var d,k=y;return $.defined(k)&&a.is(k.range)&&$.string(k.message)&&($.number(k.severity)||$.undefined(k.severity))&&($.integer(k.code)||$.string(k.code)||$.undefined(k.code))&&($.undefined(k.codeDescription)||$.string((d=k.codeDescription)===null||d===void 0?void 0:d.href))&&($.string(k.source)||$.undefined(k.source))&&($.undefined(k.relatedInformation)||$.typedArray(k.relatedInformation,C.is))}p.is=b})(g=e.Diagnostic||(e.Diagnostic={}));var E;(function(p){function R(y,d){for(var k=[],P=2;P<arguments.length;P++)k[P-2]=arguments[P];var ne={title:y,command:d};return $.defined(k)&&k.length>0&&(ne.arguments=k),ne}p.create=R;function b(y){var d=y;return $.defined(d)&&$.string(d.title)&&$.string(d.command)}p.is=b})(E=e.Command||(e.Command={}));var D;(function(p){function R(k,P){return{range:k,newText:P}}p.replace=R;function b(k,P){return{range:{start:k,end:k},newText:P}}p.insert=b;function y(k){return{range:k,newText:""}}p.del=y;function d(k){var P=k;return $.objectLiteral(P)&&$.string(P.newText)&&a.is(P.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var Y;(function(p){function R(y,d,k){var P={label:y};return d!==void 0&&(P.needsConfirmation=d),k!==void 0&&(P.description=k),P}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&$.string(d.label)&&($.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&($.string(d.description)||d.description===void 0)}p.is=b})(Y=e.ChangeAnnotation||(e.ChangeAnnotation={}));var Te;(function(p){function R(b){var y=b;return $.string(y)}p.is=R})(Te=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function R(k,P,ne){return{range:k,newText:P,annotationId:ne}}p.replace=R;function b(k,P,ne){return{range:{start:k,end:k},newText:P,annotationId:ne}}p.insert=b;function y(k,P){return{range:k,newText:"",annotationId:P}}p.del=y;function d(k){var P=k;return D.is(P)&&(Y.is(P.annotationId)||Te.is(P.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function R(y,d){return{textDocument:y,edits:d}}p.create=R;function b(y){var d=y;return $.defined(d)&&ut.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var xt;(function(p){function R(y,d,k){var P={kind:"create",uri:y};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(P.options=d),k!==void 0&&(P.annotationId=k),P}p.create=R;function b(y){var d=y;return d&&d.kind==="create"&&$.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||$.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||$.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||Te.is(d.annotationId))}p.is=b})(xt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(y,d,k,P){var ne={kind:"rename",oldUri:y,newUri:d};return k!==void 0&&(k.overwrite!==void 0||k.ignoreIfExists!==void 0)&&(ne.options=k),P!==void 0&&(ne.annotationId=P),ne}p.create=R;function b(y){var d=y;return d&&d.kind==="rename"&&$.string(d.oldUri)&&$.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||$.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||$.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||Te.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var S;(function(p){function R(y,d,k){var P={kind:"delete",uri:y};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(P.options=d),k!==void 0&&(P.annotationId=k),P}p.create=R;function b(y){var d=y;return d&&d.kind==="delete"&&$.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||$.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||$.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||Te.is(d.annotationId))}p.is=b})(S=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function R(b){var y=b;return y&&(y.changes!==void 0||y.documentChanges!==void 0)&&(y.documentChanges===void 0||y.documentChanges.every(function(d){return $.string(d.kind)?xt.is(d)||M.is(d)||S.is(d):Ht.is(d)}))}p.is=R})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,y){var d,k;if(y===void 0?d=D.insert(R,b):Te.is(y)?(k=y,d=Ee.insert(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),k=this.changeAnnotations.manage(y),d=Ee.insert(R,b,k)),this.edits.push(d),k!==void 0)return k},p.prototype.replace=function(R,b,y){var d,k;if(y===void 0?d=D.replace(R,b):Te.is(y)?(k=y,d=Ee.replace(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),k=this.changeAnnotations.manage(y),d=Ee.replace(R,b,k)),this.edits.push(d),k!==void 0)return k},p.prototype.delete=function(R,b){var y,d;if(b===void 0?y=D.del(R):Te.is(b)?(d=b,y=Ee.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),y=Ee.del(R,d)),this.edits.push(y),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var y;if(Te.is(R)?y=R:(y=this.nextId(),b=R),this._annotations[y]!==void 0)throw new Error("Id ".concat(y," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(y));return this._annotations[y]=b,this._size++,y},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),te=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(y){if(Ht.is(y)){var d=new j(y.edits,b._changeAnnotations);b._textEditChanges[y.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(y){var d=new j(R.changes[y]);b._textEditChanges[y]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ut.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},y=this._textEditChanges[b.uri];if(!y){var d=[],k={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(k),y=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=y}return y}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var y=this._textEditChanges[R];if(!y){var d=[];this._workspaceEdit.changes[R]=d,y=new j(d),this._textEditChanges[R]=y}return y}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;Y.is(b)||Te.is(b)?d=b:y=b;var k,P;if(d===void 0?k=xt.create(R,y):(P=Te.is(d)?d:this._changeAnnotations.manage(d),k=xt.create(R,y,P)),this._workspaceEdit.documentChanges.push(k),P!==void 0)return P},p.prototype.renameFile=function(R,b,y,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var k;Y.is(y)||Te.is(y)?k=y:d=y;var P,ne;if(k===void 0?P=M.create(R,b,d):(ne=Te.is(k)?k:this._changeAnnotations.manage(k),P=M.create(R,b,d,ne)),this._workspaceEdit.documentChanges.push(P),ne!==void 0)return ne},p.prototype.deleteFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;Y.is(b)||Te.is(b)?d=b:y=b;var k,P;if(d===void 0?k=S.create(R,y):(P=Te.is(d)?d:this._changeAnnotations.manage(d),k=S.create(R,y,P)),this._workspaceEdit.documentChanges.push(k),P!==void 0)return P},p}();e.WorkspaceChange=te;var Z;(function(p){function R(y){return{uri:y}}p.create=R;function b(y){var d=y;return $.defined(d)&&$.string(d.uri)}p.is=b})(Z=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var Rt;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return $.defined(d)&&$.string(d.uri)&&$.integer(d.version)}p.is=b})(Rt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ut;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return $.defined(d)&&$.string(d.uri)&&(d.version===null||$.integer(d.version))}p.is=b})(ut=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var he;(function(p){function R(y,d,k,P){return{uri:y,languageId:d,version:k,text:P}}p.create=R;function b(y){var d=y;return $.defined(d)&&$.string(d.uri)&&$.string(d.languageId)&&$.integer(d.version)&&$.string(d.text)}p.is=b})(he=e.TextDocumentItem||(e.TextDocumentItem={}));var Er;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var y=b;return y===p.PlainText||y===p.Markdown}p.is=R})(Er=e.MarkupKind||(e.MarkupKind={}));var Hn;(function(p){function R(b){var y=b;return $.objectLiteral(b)&&Er.is(y.kind)&&$.string(y.value)}p.is=R})(Hn=e.MarkupContent||(e.MarkupContent={}));var Ra;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(Ra=e.CompletionItemKind||(e.CompletionItemKind={}));var Qi;(function(p){p.PlainText=1,p.Snippet=2})(Qi=e.InsertTextFormat||(e.InsertTextFormat={}));var ur;(function(p){p.Deprecated=1})(ur=e.CompletionItemTag||(e.CompletionItemTag={}));var Mo;(function(p){function R(y,d,k){return{newText:y,insert:d,replace:k}}p.create=R;function b(y){var d=y;return d&&$.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(Mo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var bt;(function(p){p.asIs=1,p.adjustIndentation=2})(bt=e.InsertTextMode||(e.InsertTextMode={}));var er;(function(p){function R(b){var y=b;return y&&($.string(y.detail)||y.detail===void 0)&&($.string(y.description)||y.description===void 0)}p.is=R})(er=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Rn;(function(p){function R(b){return{label:b}}p.create=R})(Rn=e.CompletionItem||(e.CompletionItem={}));var Kt;(function(p){function R(b,y){return{items:b||[],isIncomplete:!!y}}p.create=R})(Kt=e.CompletionList||(e.CompletionList={}));var ft;(function(p){function R(y){return y.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(y){var d=y;return $.string(d)||$.objectLiteral(d)&&$.string(d.language)&&$.string(d.value)}p.is=b})(ft=e.MarkedString||(e.MarkedString={}));var Gr;(function(p){function R(b){var y=b;return!!y&&$.objectLiteral(y)&&(Hn.is(y.contents)||ft.is(y.contents)||$.typedArray(y.contents,ft.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(Gr=e.Hover||(e.Hover={}));var Nr;(function(p){function R(b,y){return y?{label:b,documentation:y}:{label:b}}p.create=R})(Nr=e.ParameterInformation||(e.ParameterInformation={}));var xr;(function(p){function R(b,y){for(var d=[],k=2;k<arguments.length;k++)d[k-2]=arguments[k];var P={label:b};return $.defined(y)&&(P.documentation=y),$.defined(d)?P.parameters=d:P.parameters=[],P}p.create=R})(xr=e.SignatureInformation||(e.SignatureInformation={}));var Zi;(function(p){p.Text=1,p.Read=2,p.Write=3})(Zi=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var xi;(function(p){function R(b,y){var d={range:b};return $.number(y)&&(d.kind=y),d}p.create=R})(xi=e.DocumentHighlight||(e.DocumentHighlight={}));var Kd;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(Kd=e.SymbolKind||(e.SymbolKind={}));var Ri;(function(p){p.Deprecated=1})(Ri=e.SymbolTag||(e.SymbolTag={}));var eo;(function(p){function R(b,y,d,k,P){var ne={name:b,kind:y,location:{uri:k,range:d}};return P&&(ne.containerName=P),ne}p.create=R})(eo=e.SymbolInformation||(e.SymbolInformation={}));var Wd;(function(p){function R(b,y,d,k){return k!==void 0?{name:b,kind:y,location:{uri:d,range:k}}:{name:b,kind:y,location:{uri:d}}}p.create=R})(Wd=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Bd;(function(p){function R(y,d,k,P,ne,dt){var Ge={name:y,detail:d,kind:k,range:P,selectionRange:ne};return dt!==void 0&&(Ge.children=dt),Ge}p.create=R;function b(y){var d=y;return d&&$.string(d.name)&&$.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||$.string(d.detail))&&(d.deprecated===void 0||$.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(Bd=e.DocumentSymbol||(e.DocumentSymbol={}));var to;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(to=e.CodeActionKind||(e.CodeActionKind={}));var Fo;(function(p){p.Invoked=1,p.Automatic=2})(Fo=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var Vl;(function(p){function R(y,d,k){var P={diagnostics:y};return d!=null&&(P.only=d),k!=null&&(P.triggerKind=k),P}p.create=R;function b(y){var d=y;return $.defined(d)&&$.typedArray(d.diagnostics,g.is)&&(d.only===void 0||$.typedArray(d.only,$.string))&&(d.triggerKind===void 0||d.triggerKind===Fo.Invoked||d.triggerKind===Fo.Automatic)}p.is=b})(Vl=e.CodeActionContext||(e.CodeActionContext={}));var ba;(function(p){function R(y,d,k){var P={title:y},ne=!0;return typeof d=="string"?(ne=!1,P.kind=d):E.is(d)?P.command=d:P.edit=d,ne&&k!==void 0&&(P.kind=k),P}p.create=R;function b(y){var d=y;return d&&$.string(d.title)&&(d.diagnostics===void 0||$.typedArray(d.diagnostics,g.is))&&(d.kind===void 0||$.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||E.is(d.command))&&(d.isPreferred===void 0||$.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(ba=e.CodeAction||(e.CodeAction={}));var Xl;(function(p){function R(y,d){var k={range:y};return $.defined(d)&&(k.data=d),k}p.create=R;function b(y){var d=y;return $.defined(d)&&a.is(d.range)&&($.undefined(d.command)||E.is(d.command))}p.is=b})(Xl=e.CodeLens||(e.CodeLens={}));var bi;(function(p){function R(y,d){return{tabSize:y,insertSpaces:d}}p.create=R;function b(y){var d=y;return $.defined(d)&&$.uinteger(d.tabSize)&&$.boolean(d.insertSpaces)}p.is=b})(bi=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(y,d,k){return{range:y,target:d,data:k}}p.create=R;function b(y){var d=y;return $.defined(d)&&a.is(d.range)&&($.undefined(d.target)||$.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var I;(function(p){function R(y,d){return{range:y,parent:d}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(I=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var Oe;(function(p){function R(b){var y=b;return $.objectLiteral(y)&&(y.resultId===void 0||typeof y.resultId=="string")&&Array.isArray(y.data)&&(y.data.length===0||typeof y.data[0]=="number")}p.is=R})(Oe=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(p){function R(y,d){return{range:y,text:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&$.string(d.text)}p.is=b})(Le=e.InlineValueText||(e.InlineValueText={}));var Qe;(function(p){function R(y,d,k){return{range:y,variableName:d,caseSensitiveLookup:k}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&$.boolean(d.caseSensitiveLookup)&&($.string(d.variableName)||d.variableName===void 0)}p.is=b})(Qe=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var At;(function(p){function R(y,d){return{range:y,expression:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&($.string(d.expression)||d.expression===void 0)}p.is=b})(At=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var fe;(function(p){function R(y,d){return{frameId:y,stoppedLocation:d}}p.create=R;function b(y){var d=y;return $.defined(d)&&a.is(y.stoppedLocation)}p.is=b})(fe=e.InlineValueContext||(e.InlineValueContext={}));var qe;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(qe=e.InlayHintKind||(e.InlayHintKind={}));var ve;(function(p){function R(y){return{value:y}}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&(d.tooltip===void 0||$.string(d.tooltip)||Hn.is(d.tooltip))&&(d.location===void 0||l.is(d.location))&&(d.command===void 0||E.is(d.command))}p.is=b})(ve=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var yt;(function(p){function R(y,d,k){var P={position:y,label:d};return k!==void 0&&(P.kind=k),P}p.create=R;function b(y){var d=y;return $.objectLiteral(d)&&s.is(d.position)&&($.string(d.label)||$.typedArray(d.label,ve.is))&&(d.kind===void 0||qe.is(d.kind))&&d.textEdits===void 0||$.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||$.string(d.tooltip)||Hn.is(d.tooltip))&&(d.paddingLeft===void 0||$.boolean(d.paddingLeft))&&(d.paddingRight===void 0||$.boolean(d.paddingRight))}p.is=b})(yt=e.InlayHint||(e.InlayHint={}));var tr;(function(p){function R(b){var y=b;return $.objectLiteral(y)&&n.is(y.uri)&&$.string(y.name)}p.is=R})(tr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Kn;(function(p){function R(k,P,ne,dt){return new bn(k,P,ne,dt)}p.create=R;function b(k){var P=k;return!!($.defined(P)&&$.string(P.uri)&&($.undefined(P.languageId)||$.string(P.languageId))&&$.uinteger(P.lineCount)&&$.func(P.getText)&&$.func(P.positionAt)&&$.func(P.offsetAt))}p.is=b;function y(k,P){for(var ne=k.getText(),dt=d(P,function(Uo,Yl){var _y=Uo.range.start.line-Yl.range.start.line;return _y===0?Uo.range.start.character-Yl.range.start.character:_y}),Ge=ne.length,en=dt.length-1;en>=0;en--){var tn=dt[en],Wn=k.offsetAt(tn.range.start),de=k.offsetAt(tn.range.end);if(de<=Ge)ne=ne.substring(0,Wn)+tn.newText+ne.substring(de,ne.length);else throw new Error("Overlapping edit");Ge=Wn}return ne}p.applyEdits=y;function d(k,P){if(k.length<=1)return k;var ne=k.length/2|0,dt=k.slice(0,ne),Ge=k.slice(ne);d(dt,P),d(Ge,P);for(var en=0,tn=0,Wn=0;en<dt.length&&tn<Ge.length;){var de=P(dt[en],Ge[tn]);de<=0?k[Wn++]=dt[en++]:k[Wn++]=Ge[tn++]}for(;en<dt.length;)k[Wn++]=dt[en++];for(;tn<Ge.length;)k[Wn++]=Ge[tn++];return k}})(Kn=e.TextDocument||(e.TextDocument={}));var bn=function(){function p(R,b,y,d){this._uri=R,this._languageId=b,this._version=y,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),y=this.offsetAt(R.end);return this._content.substring(b,y)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,y=!0,d=0;d<b.length;d++){y&&(R.push(d),y=!1);var k=b.charAt(d);y=k==="\r"||k===`
`,k==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}y&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),y=0,d=b.length;if(d===0)return s.create(0,R);for(;y<d;){var k=Math.floor((y+d)/2);b[k]>R?d=k:y=k+1}var P=y-1;return s.create(P,R-b[P])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var y=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(y+R.character,d),y)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),$;(function(p){var R=Object.prototype.toString;function b(de){return typeof de<"u"}p.defined=b;function y(de){return typeof de>"u"}p.undefined=y;function d(de){return de===!0||de===!1}p.boolean=d;function k(de){return R.call(de)==="[object String]"}p.string=k;function P(de){return R.call(de)==="[object Number]"}p.number=P;function ne(de,Uo,Yl){return R.call(de)==="[object Number]"&&Uo<=de&&de<=Yl}p.numberRange=ne;function dt(de){return R.call(de)==="[object Number]"&&-2147483648<=de&&de<=2147483647}p.integer=dt;function Ge(de){return R.call(de)==="[object Number]"&&0<=de&&de<=2147483647}p.uinteger=Ge;function en(de){return R.call(de)==="[object Function]"}p.func=en;function tn(de){return de!==null&&typeof de=="object"}p.objectLiteral=tn;function Wn(de,Uo){return Array.isArray(de)&&de.every(Uo)}p.typedArray=Wn})($||($={}))})});var it=K(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.ProtocolNotificationType=dr.ProtocolNotificationType0=dr.ProtocolRequestType=dr.ProtocolRequestType0=dr.RegistrationType=dr.MessageDirection=void 0;var Wo=Yn(),Vw;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(Vw=dr.MessageDirection||(dr.MessageDirection={}));var tm=class{constructor(e){this.method=e}};dr.RegistrationType=tm;var rm=class extends Wo.RequestType0{constructor(e){super(e)}};dr.ProtocolRequestType0=rm;var nm=class extends Wo.RequestType{constructor(e){super(e,Wo.ParameterStructures.byName)}};dr.ProtocolRequestType=nm;var im=class extends Wo.NotificationType0{constructor(e){super(e)}};dr.ProtocolNotificationType0=im;var om=class extends Wo.NotificationType{constructor(e){super(e,Wo.ParameterStructures.byName)}};dr.ProtocolNotificationType=om});var ac=K(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.objectLiteral=St.typedArray=St.stringArray=St.array=St.func=St.error=St.number=St.string=St.boolean=void 0;function Xw(t){return t===!0||t===!1}St.boolean=Xw;function ng(t){return typeof t=="string"||t instanceof String}St.string=ng;function Yw(t){return typeof t=="number"||t instanceof Number}St.number=Yw;function Jw(t){return t instanceof Error}St.error=Jw;function Qw(t){return typeof t=="function"}St.func=Qw;function ig(t){return Array.isArray(t)}St.array=ig;function Zw(t){return ig(t)&&t.every(e=>ng(e))}St.stringArray=Zw;function e$(t,e){return Array.isArray(t)&&t.every(e)}St.typedArray=e$;function t$(t){return t!==null&&typeof t=="object"}St.objectLiteral=t$});var sg=K(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.ImplementationRequest=void 0;var og=it(),r$;(function(t){t.method="textDocument/implementation",t.messageDirection=og.MessageDirection.clientToServer,t.type=new og.ProtocolRequestType(t.method)})(r$=ka.ImplementationRequest||(ka.ImplementationRequest={}))});var lg=K(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.TypeDefinitionRequest=void 0;var ag=it(),n$;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=ag.MessageDirection.clientToServer,t.type=new ag.ProtocolRequestType(t.method)})(n$=Ea.TypeDefinitionRequest||(Ea.TypeDefinitionRequest={}))});var cg=K(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.DidChangeWorkspaceFoldersNotification=Ai.WorkspaceFoldersRequest=void 0;var lc=it(),i$;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=lc.MessageDirection.serverToClient,t.type=new lc.ProtocolRequestType0(t.method)})(i$=Ai.WorkspaceFoldersRequest||(Ai.WorkspaceFoldersRequest={}));var o$;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=lc.MessageDirection.clientToServer,t.type=new lc.ProtocolNotificationType(t.method)})(o$=Ai.DidChangeWorkspaceFoldersNotification||(Ai.DidChangeWorkspaceFoldersNotification={}))});var fg=K(Na=>{"use strict";Object.defineProperty(Na,"__esModule",{value:!0});Na.ConfigurationRequest=void 0;var ug=it(),s$;(function(t){t.method="workspace/configuration",t.messageDirection=ug.MessageDirection.serverToClient,t.type=new ug.ProtocolRequestType(t.method)})(s$=Na.ConfigurationRequest||(Na.ConfigurationRequest={}))});var dg=K(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.ColorPresentationRequest=Si.DocumentColorRequest=void 0;var cc=it(),a$;(function(t){t.method="textDocument/documentColor",t.messageDirection=cc.MessageDirection.clientToServer,t.type=new cc.ProtocolRequestType(t.method)})(a$=Si.DocumentColorRequest||(Si.DocumentColorRequest={}));var l$;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=cc.MessageDirection.clientToServer,t.type=new cc.ProtocolRequestType(t.method)})(l$=Si.ColorPresentationRequest||(Si.ColorPresentationRequest={}))});var mg=K(_a=>{"use strict";Object.defineProperty(_a,"__esModule",{value:!0});_a.FoldingRangeRequest=void 0;var pg=it(),c$;(function(t){t.method="textDocument/foldingRange",t.messageDirection=pg.MessageDirection.clientToServer,t.type=new pg.ProtocolRequestType(t.method)})(c$=_a.FoldingRangeRequest||(_a.FoldingRangeRequest={}))});var yg=K(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.DeclarationRequest=void 0;var hg=it(),u$;(function(t){t.method="textDocument/declaration",t.messageDirection=hg.MessageDirection.clientToServer,t.type=new hg.ProtocolRequestType(t.method)})(u$=Pa.DeclarationRequest||(Pa.DeclarationRequest={}))});var Tg=K(Ia=>{"use strict";Object.defineProperty(Ia,"__esModule",{value:!0});Ia.SelectionRangeRequest=void 0;var gg=it(),f$;(function(t){t.method="textDocument/selectionRange",t.messageDirection=gg.MessageDirection.clientToServer,t.type=new gg.ProtocolRequestType(t.method)})(f$=Ia.SelectionRangeRequest||(Ia.SelectionRangeRequest={}))});var vg=K(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});on.WorkDoneProgressCancelNotification=on.WorkDoneProgressCreateRequest=on.WorkDoneProgress=void 0;var d$=Yn(),uc=it(),p$;(function(t){t.type=new d$.ProgressType;function e(r){return r===t.type}t.is=e})(p$=on.WorkDoneProgress||(on.WorkDoneProgress={}));var m$;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=uc.MessageDirection.serverToClient,t.type=new uc.ProtocolRequestType(t.method)})(m$=on.WorkDoneProgressCreateRequest||(on.WorkDoneProgressCreateRequest={}));var h$;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=uc.MessageDirection.clientToServer,t.type=new uc.ProtocolNotificationType(t.method)})(h$=on.WorkDoneProgressCancelNotification||(on.WorkDoneProgressCancelNotification={}))});var xg=K(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.CallHierarchyOutgoingCallsRequest=sn.CallHierarchyIncomingCallsRequest=sn.CallHierarchyPrepareRequest=void 0;var Bo=it(),y$;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(y$=sn.CallHierarchyPrepareRequest||(sn.CallHierarchyPrepareRequest={}));var g$;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(g$=sn.CallHierarchyIncomingCallsRequest||(sn.CallHierarchyIncomingCallsRequest={}));var T$;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(T$=sn.CallHierarchyOutgoingCallsRequest||(sn.CallHierarchyOutgoingCallsRequest={}))});var Rg=K(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.SemanticTokensRefreshRequest=Ct.SemanticTokensRangeRequest=Ct.SemanticTokensDeltaRequest=Ct.SemanticTokensRequest=Ct.SemanticTokensRegistrationType=Ct.TokenFormat=void 0;var Jn=it(),v$;(function(t){t.Relative="relative"})(v$=Ct.TokenFormat||(Ct.TokenFormat={}));var fc;(function(t){t.method="textDocument/semanticTokens",t.type=new Jn.RegistrationType(t.method)})(fc=Ct.SemanticTokensRegistrationType||(Ct.SemanticTokensRegistrationType={}));var x$;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=fc.method})(x$=Ct.SemanticTokensRequest||(Ct.SemanticTokensRequest={}));var R$;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=fc.method})(R$=Ct.SemanticTokensDeltaRequest||(Ct.SemanticTokensDeltaRequest={}));var b$;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType(t.method),t.registrationMethod=fc.method})(b$=Ct.SemanticTokensRangeRequest||(Ct.SemanticTokensRangeRequest={}));var A$;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Jn.MessageDirection.clientToServer,t.type=new Jn.ProtocolRequestType0(t.method)})(A$=Ct.SemanticTokensRefreshRequest||(Ct.SemanticTokensRefreshRequest={}))});var Ag=K(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.ShowDocumentRequest=void 0;var bg=it(),S$;(function(t){t.method="window/showDocument",t.messageDirection=bg.MessageDirection.serverToClient,t.type=new bg.ProtocolRequestType(t.method)})(S$=Da.ShowDocumentRequest||(Da.ShowDocumentRequest={}))});var Cg=K(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.LinkedEditingRangeRequest=void 0;var Sg=it(),C$;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Sg.MessageDirection.clientToServer,t.type=new Sg.ProtocolRequestType(t.method)})(C$=Oa.LinkedEditingRangeRequest||(Oa.LinkedEditingRangeRequest={}))});var wg=K(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var jr=it(),w$;(function(t){t.file="file",t.folder="folder"})(w$=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var $$;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})($$=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var k$;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(k$=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var E$;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(E$=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var N$;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(N$=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var _$;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(_$=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var P$;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(P$=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var kg=K(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.MonikerRequest=an.MonikerKind=an.UniquenessLevel=void 0;var $g=it(),I$;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(I$=an.UniquenessLevel||(an.UniquenessLevel={}));var D$;(function(t){t.$import="import",t.$export="export",t.local="local"})(D$=an.MonikerKind||(an.MonikerKind={}));var O$;(function(t){t.method="textDocument/moniker",t.messageDirection=$g.MessageDirection.clientToServer,t.type=new $g.ProtocolRequestType(t.method)})(O$=an.MonikerRequest||(an.MonikerRequest={}))});var Eg=K(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.TypeHierarchySubtypesRequest=ln.TypeHierarchySupertypesRequest=ln.TypeHierarchyPrepareRequest=void 0;var zo=it(),L$;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method)})(L$=ln.TypeHierarchyPrepareRequest||(ln.TypeHierarchyPrepareRequest={}));var M$;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method)})(M$=ln.TypeHierarchySupertypesRequest||(ln.TypeHierarchySupertypesRequest={}));var F$;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method)})(F$=ln.TypeHierarchySubtypesRequest||(ln.TypeHierarchySubtypesRequest={}))});var Ng=K(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.InlineValueRefreshRequest=Ci.InlineValueRequest=void 0;var dc=it(),U$;(function(t){t.method="textDocument/inlineValue",t.messageDirection=dc.MessageDirection.clientToServer,t.type=new dc.ProtocolRequestType(t.method)})(U$=Ci.InlineValueRequest||(Ci.InlineValueRequest={}));var q$;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=dc.MessageDirection.clientToServer,t.type=new dc.ProtocolRequestType0(t.method)})(q$=Ci.InlineValueRefreshRequest||(Ci.InlineValueRefreshRequest={}))});var _g=K(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.InlayHintRefreshRequest=cn.InlayHintResolveRequest=cn.InlayHintRequest=void 0;var Vo=it(),G$;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})(G$=cn.InlayHintRequest||(cn.InlayHintRequest={}));var j$;(function(t){t.method="inlayHint/resolve",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType(t.method)})(j$=cn.InlayHintResolveRequest||(cn.InlayHintResolveRequest={}));var H$;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Vo.MessageDirection.clientToServer,t.type=new Vo.ProtocolRequestType0(t.method)})(H$=cn.InlayHintRefreshRequest||(cn.InlayHintRefreshRequest={}))});var Ig=K(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var Pg=Yn(),K$=ac(),Xo=it(),W$;(function(t){function e(r){let n=r;return n&&K$.boolean(n.retriggerRequest)}t.is=e})(W$=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var B$;(function(t){t.Full="full",t.Unchanged="unchanged"})(B$=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var z$;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method),t.partialResult=new Pg.ProgressType})(z$=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var V$;(function(t){t.method="workspace/diagnostic",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method),t.partialResult=new Pg.ProgressType})(V$=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var X$;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType0(t.method)})(X$=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var Lg=K(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.DidCloseNotebookDocumentNotification=Re.DidSaveNotebookDocumentNotification=Re.DidChangeNotebookDocumentNotification=Re.NotebookCellArrayChange=Re.DidOpenNotebookDocumentNotification=Re.NotebookDocumentSyncRegistrationType=Re.NotebookDocument=Re.NotebookCell=Re.ExecutionSummary=Re.NotebookCellKind=void 0;var La=so(),un=ac(),An=it(),Dg;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Dg=Re.NotebookCellKind||(Re.NotebookCellKind={}));var Og;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return un.objectLiteral(o)&&La.uinteger.is(o.executionOrder)&&(o.success===void 0||un.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Og=Re.ExecutionSummary||(Re.ExecutionSummary={}));var sm;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return un.objectLiteral(s)&&Dg.is(s.kind)&&La.DocumentUri.is(s.document)&&(s.metadata===void 0||un.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Og.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),l=Array.isArray(s);if(a!==l)return!1;if(a&&l){if(o.length!==s.length)return!1;for(let c=0;c<o.length;c++)if(!i(o[c],s[c]))return!1}if(un.objectLiteral(o)&&un.objectLiteral(s)){let c=Object.keys(o),u=Object.keys(s);if(c.length!==u.length||(c.sort(),u.sort(),!i(c,u)))return!1;for(let f=0;f<c.length;f++){let m=c[f];if(!i(o[m],s[m]))return!1}}return!0}})(sm=Re.NotebookCell||(Re.NotebookCell={}));var Y$;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return un.objectLiteral(i)&&un.string(i.uri)&&La.integer.is(i.version)&&un.typedArray(i.cells,sm.is)}t.is=r})(Y$=Re.NotebookDocument||(Re.NotebookDocument={}));var Ma;(function(t){t.method="notebookDocument/sync",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.RegistrationType(t.method)})(Ma=Re.NotebookDocumentSyncRegistrationType||(Re.NotebookDocumentSyncRegistrationType={}));var J$;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(J$=Re.DidOpenNotebookDocumentNotification||(Re.DidOpenNotebookDocumentNotification={}));var Q$;(function(t){function e(n){let i=n;return un.objectLiteral(i)&&La.uinteger.is(i.start)&&La.uinteger.is(i.deleteCount)&&(i.cells===void 0||un.typedArray(i.cells,sm.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(Q$=Re.NotebookCellArrayChange||(Re.NotebookCellArrayChange={}));var Z$;(function(t){t.method="notebookDocument/didChange",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(Z$=Re.DidChangeNotebookDocumentNotification||(Re.DidChangeNotebookDocumentNotification={}));var ek;(function(t){t.method="notebookDocument/didSave",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(ek=Re.DidSaveNotebookDocumentNotification||(Re.DidSaveNotebookDocumentNotification={}));var tk;(function(t){t.method="notebookDocument/didClose",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ma.method})(tk=Re.DidCloseNotebookDocumentNotification||(Re.DidCloseNotebookDocumentNotification={}))});var Wg=K(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=it(),Mg=so(),Bt=ac(),rk=sg();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return rk.ImplementationRequest}});var nk=lg();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return nk.TypeDefinitionRequest}});var Fg=cg();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return Fg.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return Fg.DidChangeWorkspaceFoldersNotification}});var ik=fg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return ik.ConfigurationRequest}});var Ug=dg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Ug.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Ug.ColorPresentationRequest}});var ok=mg();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return ok.FoldingRangeRequest}});var sk=yg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return sk.DeclarationRequest}});var ak=Tg();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return ak.SelectionRangeRequest}});var am=vg();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return am.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return am.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return am.WorkDoneProgressCancelNotification}});var lm=xg();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return lm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return lm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return lm.CallHierarchyPrepareRequest}});var Yo=Rg();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Yo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Yo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Yo.SemanticTokensRegistrationType}});var lk=Ag();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return lk.ShowDocumentRequest}});var ck=Cg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return ck.LinkedEditingRangeRequest}});var ao=wg();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return ao.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return ao.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return ao.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return ao.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return ao.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return ao.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return ao.WillDeleteFilesRequest}});var cm=kg();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return cm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return cm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return cm.MonikerRequest}});var um=Eg();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return um.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return um.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return um.TypeHierarchySupertypesRequest}});var qg=Ng();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return qg.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return qg.InlineValueRefreshRequest}});var fm=_g();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return fm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return fm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return fm.InlayHintRefreshRequest}});var Fa=Ig();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Fa.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Fa.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Fa.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Fa.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Fa.DiagnosticRefreshRequest}});var Sn=Lg();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Sn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Sn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Sn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Sn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Sn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Sn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidCloseNotebookDocumentNotification}});var Gg;(function(t){function e(r){let n=r;return Bt.string(n.language)||Bt.string(n.scheme)||Bt.string(n.pattern)}t.is=e})(Gg=h.TextDocumentFilter||(h.TextDocumentFilter={}));var jg;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebookType)||Bt.string(n.scheme)||Bt.string(n.pattern))}t.is=e})(jg=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Hg;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebook)||jg.is(n.notebook))&&(n.language===void 0||Bt.string(n.language))}t.is=e})(Hg=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var Kg;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Bt.string(n)&&!Gg.is(n)&&!Hg.is(n))return!1;return!0}t.is=e})(Kg=h.DocumentSelector||(h.DocumentSelector={}));var uk;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(uk=h.RegistrationRequest||(h.RegistrationRequest={}));var fk;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(fk=h.UnregistrationRequest||(h.UnregistrationRequest={}));var dk;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(dk=h.ResourceOperationKind||(h.ResourceOperationKind={}));var pk;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(pk=h.FailureHandlingKind||(h.FailureHandlingKind={}));var mk;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(mk=h.PositionEncodingKind||(h.PositionEncodingKind={}));var hk;(function(t){function e(r){let n=r;return n&&Bt.string(n.id)&&n.id.length>0}t.hasId=e})(hk=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var yk;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||Kg.is(n.documentSelector))}t.is=e})(yk=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var gk;(function(t){function e(n){let i=n;return Bt.objectLiteral(i)&&(i.workDoneProgress===void 0||Bt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Bt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(gk=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var Tk;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Tk=h.InitializeRequest||(h.InitializeRequest={}));var vk;(function(t){t.unknownProtocolVersion=1})(vk=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var xk;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(xk=h.InitializedNotification||(h.InitializedNotification={}));var Rk;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(Rk=h.ShutdownRequest||(h.ShutdownRequest={}));var bk;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(bk=h.ExitNotification||(h.ExitNotification={}));var Ak;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(Ak=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var Sk;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(Sk=h.MessageType||(h.MessageType={}));var Ck;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(Ck=h.ShowMessageNotification||(h.ShowMessageNotification={}));var wk;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(wk=h.ShowMessageRequest||(h.ShowMessageRequest={}));var $k;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})($k=h.LogMessageNotification||(h.LogMessageNotification={}));var kk;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(kk=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var Ek;(function(t){t.None=0,t.Full=1,t.Incremental=2})(Ek=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var Nk;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(Nk=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var _k;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(_k=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var Pk;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(Pk=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var Ik;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(Ik=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var Dk;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(Dk=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var Ok;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(Ok=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var Lk;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(Lk=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var Mk;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Mk=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var Fk;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(Fk=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var Uk;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(Uk=h.FileChangeType||(h.FileChangeType={}));var qk;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Mg.URI.is(n.baseUri)||Mg.WorkspaceFolder.is(n.baseUri))&&Bt.string(n.pattern)}t.is=e})(qk=h.RelativePattern||(h.RelativePattern={}));var Gk;(function(t){t.Create=1,t.Change=2,t.Delete=4})(Gk=h.WatchKind||(h.WatchKind={}));var jk;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(jk=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var Hk;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(Hk=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var Kk;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Kk=h.CompletionRequest||(h.CompletionRequest={}));var Wk;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Wk=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var Bk;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Bk=h.HoverRequest||(h.HoverRequest={}));var zk;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(zk=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var Vk;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Vk=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var Xk;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Xk=h.DefinitionRequest||(h.DefinitionRequest={}));var Yk;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Yk=h.ReferencesRequest||(h.ReferencesRequest={}));var Jk;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Jk=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var Qk;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Qk=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var Zk;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Zk=h.CodeActionRequest||(h.CodeActionRequest={}));var eE;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(eE=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var tE;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(tE=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var rE;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(rE=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var nE;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(nE=h.CodeLensRequest||(h.CodeLensRequest={}));var iE;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(iE=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var oE;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(oE=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var sE;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(sE=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var aE;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(aE=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var lE;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(lE=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var cE;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(cE=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var uE;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(uE=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var fE;(function(t){t.Identifier=1})(fE=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var dE;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(dE=h.RenameRequest||(h.RenameRequest={}));var pE;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(pE=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var mE;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(mE=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var hE;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(hE=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var zg=K(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.createProtocolConnection=void 0;var Bg=Yn();function yE(t,e,r,n){return Bg.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Bg.createMessageConnection)(t,e,r,n)}pc.createProtocolConnection=yE});var Vg=K(pr=>{"use strict";var gE=pr&&pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),mc=pr&&pr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&gE(e,t,r)};Object.defineProperty(pr,"__esModule",{value:!0});pr.LSPErrorCodes=pr.createProtocolConnection=void 0;mc(Yn(),pr);mc(so(),pr);mc(it(),pr);mc(Wg(),pr);var TE=zg();Object.defineProperty(pr,"createProtocolConnection",{enumerable:!0,get:function(){return TE.createProtocolConnection}});var vE;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(vE=pr.LSPErrorCodes||(pr.LSPErrorCodes={}))});var wt=K(Cn=>{"use strict";var xE=Cn&&Cn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Xg=Cn&&Cn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&xE(e,t,r)};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.createProtocolConnection=void 0;var RE=em();Xg(em(),Cn);Xg(Vg(),Cn);function bE(t,e,r,n){return(0,RE.createMessageConnection)(t,e,r,n)}Cn.createProtocolConnection=bE});var pm=K(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.SemanticTokensBuilder=wi.SemanticTokensDiff=wi.SemanticTokensFeature=void 0;var hc=wt(),AE=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(hc.SemanticTokensRefreshRequest.type),on:e=>{let r=hc.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=hc.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=hc.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};wi.SemanticTokensFeature=AE;var yc=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};wi.SemanticTokensDiff=yc;var dm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new yc(this._prevData,this._data).computeDiff()}:this.build()}};wi.SemanticTokensBuilder=dm});var hm=K(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.TextDocuments=void 0;var lo=wt(),mm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new lo.Emitter,this._onDidOpen=new lo.Emitter,this._onDidClose=new lo.Emitter,this._onDidSave=new lo.Emitter,this._onWillSave=new lo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=lo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),lo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};gc.TextDocuments=mm});var gm=K(Jo=>{"use strict";Object.defineProperty(Jo,"__esModule",{value:!0});Jo.NotebookDocuments=Jo.NotebookSyncFeature=void 0;var Hr=wt(),Yg=hm(),SE=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Hr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Hr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Hr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Hr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Jo.NotebookSyncFeature=SE;var Tc=class t{onDidOpenTextDocument(e){return this.openHandler=e,Hr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Hr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Hr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};Tc.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var ym=class{constructor(e){e instanceof Yg.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new Yg.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Hr.Emitter,this._onDidChange=new Hr.Emitter,this._onDidSave=new Hr.Emitter,this._onDidClose=new Hr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Tc,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,l=i.change;l.metadata!==void 0&&(a=!0,o.metadata=l.metadata);let c=[],u=[],f=[],m=[];if(l.cells!==void 0){let w=l.cells;if(w.structure!==void 0){let v=w.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),w.structure.didOpen!==void 0)for(let g of w.structure.didOpen)r.openTextDocument({textDocument:g}),c.push(g.uri);if(w.structure.didClose)for(let g of w.structure.didClose)r.closeTextDocument({textDocument:g}),u.push(g.uri)}if(w.data!==void 0){let v=new Map(w.data.map(g=>[g.document,g]));for(let g=0;g<=o.cells.length;g++){let E=v.get(o.cells[g].document);if(E!==void 0){let D=o.cells.splice(g,1,E);if(f.push({old:D[0],new:E}),v.delete(E.document),v.size===0)break}}}if(w.textContent!==void 0)for(let v of w.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let A=[];for(let w of c)A.push(this.getNotebookCell(w));let C=[];for(let w of u)C.push(this.getNotebookCell(w));let N=[];for(let w of m)N.push(this.getNotebookCell(w));(A.length>0||C.length>0||f.length>0||N.length>0)&&(T.cells={added:A,removed:C,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Hr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Jo.NotebookDocuments=ym});var Tm=K($t=>{"use strict";Object.defineProperty($t,"__esModule",{value:!0});$t.thenable=$t.typedArray=$t.stringArray=$t.array=$t.func=$t.error=$t.number=$t.string=$t.boolean=void 0;function CE(t){return t===!0||t===!1}$t.boolean=CE;function Jg(t){return typeof t=="string"||t instanceof String}$t.string=Jg;function wE(t){return typeof t=="number"||t instanceof Number}$t.number=wE;function $E(t){return t instanceof Error}$t.error=$E;function Qg(t){return typeof t=="function"}$t.func=Qg;function Zg(t){return Array.isArray(t)}$t.array=Zg;function kE(t){return Zg(t)&&t.every(e=>Jg(e))}$t.stringArray=kE;function EE(t,e){return Array.isArray(t)&&t.every(e)}$t.typedArray=EE;function NE(t){return t&&Qg(t.then)}$t.thenable=NE});var vm=K(Kr=>{"use strict";Object.defineProperty(Kr,"__esModule",{value:!0});Kr.generateUuid=Kr.parse=Kr.isUUID=Kr.v4=Kr.empty=void 0;var Ua=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},qa=class t extends Ua{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};qa._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];qa._timeHighBits=["8","9","a","b"];Kr.empty=new Ua("00000000-0000-0000-0000-000000000000");function eT(){return new qa}Kr.v4=eT;var _E=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function tT(t){return _E.test(t)}Kr.isUUID=tT;function PE(t){if(!tT(t))throw new Error("invalid uuid");return new Ua(t)}Kr.parse=PE;function IE(){return eT().asHex()}Kr.generateUuid=IE});var rT=K(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.attachPartialResult=ki.ProgressFeature=ki.attachWorkDone=void 0;var $i=wt(),DE=vm(),co=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress($i.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress($i.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress($i.WorkDoneProgress.type,this._token,{kind:"end"})}};co.Instances=new Map;var vc=class extends co{constructor(e,r){super(e,r),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ga=class{constructor(){}begin(){}report(){}done(){}},xc=class extends Ga{constructor(){super(),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function OE(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ga;let r=e.workDoneToken;return delete e.workDoneToken,new co(t,r)}ki.attachWorkDone=OE;var LE=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification($i.WorkDoneProgressCancelNotification.type,r=>{let n=co.Instances.get(r.token);(n instanceof vc||n instanceof xc)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ga:new co(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,DE.generateUuid)();return this.connection.sendRequest($i.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new vc(this.connection,e))}else return Promise.resolve(new xc)}};ki.ProgressFeature=LE;var xm;(function(t){t.type=new $i.ProgressType})(xm||(xm={}));var Rm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(xm.type,this._token,e)}};function ME(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new Rm(t,r)}ki.attachPartialResult=ME});var nT=K(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.ConfigurationFeature=void 0;var FE=wt(),UE=Tm(),qE=t=>class extends t{getConfiguration(e){return e?UE.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(FE.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Rc.ConfigurationFeature=qE});var iT=K(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.WorkspaceFoldersFeature=void 0;var bc=wt(),GE=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new bc.Emitter,this.connection.onNotification(bc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(bc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(bc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Ac.WorkspaceFoldersFeature=GE});var oT=K(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.CallHierarchyFeature=void 0;var bm=wt(),jE=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(bm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=bm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=bm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Sc.CallHierarchyFeature=jE});var sT=K(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.ShowDocumentFeature=void 0;var HE=wt(),KE=t=>class extends t{showDocument(e){return this.connection.sendRequest(HE.ShowDocumentRequest.type,e)}};Cc.ShowDocumentFeature=KE});var aT=K(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.FileOperationsFeature=void 0;var Qo=wt(),WE=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Qo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Qo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Qo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Qo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Qo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Qo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};wc.FileOperationsFeature=WE});var lT=K($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.LinkedEditingRangeFeature=void 0;var BE=wt(),zE=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(BE.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};$c.LinkedEditingRangeFeature=zE});var cT=K(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.TypeHierarchyFeature=void 0;var Am=wt(),VE=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Am.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Am.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Am.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};kc.TypeHierarchyFeature=VE});var fT=K(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.InlineValueFeature=void 0;var uT=wt(),XE=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(uT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(uT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Ec.InlineValueFeature=XE});var dT=K(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.InlayHintFeature=void 0;var Sm=wt(),YE=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Sm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Sm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Sm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Nc.InlayHintFeature=YE});var pT=K(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.DiagnosticFeature=void 0;var ja=wt(),JE=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(ja.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(ja.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ja.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(ja.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ja.WorkspaceDiagnosticRequest.partialResult,r)))}}};_c.DiagnosticFeature=JE});var mT=K(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.MonikerFeature=void 0;var QE=wt(),ZE=t=>class extends t{get moniker(){return{on:e=>{let r=QE.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Pc.MonikerFeature=ZE});var $T=K(ye=>{"use strict";Object.defineProperty(ye,"__esModule",{value:!0});ye.createConnection=ye.combineFeatures=ye.combineNotebooksFeatures=ye.combineLanguagesFeatures=ye.combineWorkspaceFeatures=ye.combineWindowFeatures=ye.combineClientFeatures=ye.combineTracerFeatures=ye.combineTelemetryFeatures=ye.combineConsoleFeatures=ye._NotebooksImpl=ye._LanguagesImpl=ye.BulkUnregistration=ye.BulkRegistration=ye.ErrorMessageTracker=void 0;var U=wt(),Wr=Tm(),wm=vm(),re=rT(),eN=nT(),tN=iT(),rN=oT(),nN=pm(),iN=sT(),oN=aT(),sN=lT(),aN=cT(),lN=fT(),cN=dT(),uN=pT(),fN=gm(),dN=mT();function Cm(t){if(t!==null)return t}var $m=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ye.ErrorMessageTracker=$m;var Ic=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},km=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Cm)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Cm)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Cm)}},hT=(0,iN.ShowDocumentFeature)((0,re.ProgressFeature)(km)),pN;(function(t){function e(){return new Dc}t.create=e})(pN=ye.BulkRegistration||(ye.BulkRegistration={}));var Dc=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Wr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=wm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},mN;(function(t){function e(){return new Ha(void 0,[])}t.create=e})(mN=ye.BulkUnregistration||(ye.BulkUnregistration={}));var Ha=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Wr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Oc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Dc?this.registerMany(e):e instanceof Ha?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Wr.string(r)?r:r.method,o=wm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Wr.string(e)?e:e.method,i=wm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new Ha(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Em=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},yT=(0,oN.FileOperationsFeature)((0,tN.WorkspaceFoldersFeature)((0,eN.ConfigurationFeature)(Em))),Lc=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Mc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Fc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};ye._LanguagesImpl=Fc;var gT=(0,dN.MonikerFeature)((0,uN.DiagnosticFeature)((0,cN.InlayHintFeature)((0,lN.InlineValueFeature)((0,aN.TypeHierarchyFeature)((0,sN.LinkedEditingRangeFeature)((0,nN.SemanticTokensFeature)((0,rN.CallHierarchyFeature)(Fc)))))))),Uc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};ye._NotebooksImpl=Uc;var TT=(0,fN.NotebookSyncFeature)(Uc);function vT(t,e){return function(r){return e(t(r))}}ye.combineConsoleFeatures=vT;function xT(t,e){return function(r){return e(t(r))}}ye.combineTelemetryFeatures=xT;function RT(t,e){return function(r){return e(t(r))}}ye.combineTracerFeatures=RT;function bT(t,e){return function(r){return e(t(r))}}ye.combineClientFeatures=bT;function AT(t,e){return function(r){return e(t(r))}}ye.combineWindowFeatures=AT;function ST(t,e){return function(r){return e(t(r))}}ye.combineWorkspaceFeatures=ST;function CT(t,e){return function(r){return e(t(r))}}ye.combineLanguagesFeatures=CT;function wT(t,e){return function(r){return e(t(r))}}ye.combineNotebooksFeatures=wT;function hN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,vT),tracer:r(t.tracer,e.tracer,RT),telemetry:r(t.telemetry,e.telemetry,xT),client:r(t.client,e.client,bT),window:r(t.window,e.window,AT),workspace:r(t.workspace,e.workspace,ST),languages:r(t.languages,e.languages,CT),notebooks:r(t.notebooks,e.notebooks,wT)}}ye.combineFeatures=hN;function yN(t,e,r){let n=r&&r.console?new(r.console(Ic)):new Ic,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Lc)):new Lc,s=r&&r.telemetry?new(r.telemetry(Mc)):new Mc,a=r&&r.client?new(r.client(Oc)):new Oc,l=r&&r.window?new(r.window(hT)):new hT,c=r&&r.workspace?new(r.workspace(yT)):new yT,u=r&&r.languages?new(r.languages(gT)):new gT,f=r&&r.notebooks?new(r.notebooks(TT)):new TT,m=[n,o,s,a,l,c,u,f];function T(v){return v instanceof Promise?v:Wr.thenable(v)?new Promise((g,E)=>{v.then(D=>g(D),D=>E(D))}):Promise.resolve(v)}let A,C,N,w={listen:()=>i.listen(),sendRequest:(v,...g)=>i.sendRequest(Wr.string(v)?v:v.method,...g),onRequest:(v,g)=>i.onRequest(v,g),sendNotification:(v,g)=>{let E=Wr.string(v)?v:v.method;return arguments.length===1?i.sendNotification(E):i.sendNotification(E,g)},onNotification:(v,g)=>i.onNotification(v,g),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(C=v,{dispose:()=>{C=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(A=v,{dispose:()=>{A=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return l},get workspace(){return c},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(g,E)=>v(g,E)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(g,E)=>v(g,E)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(g,E)=>v(g,E)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(g,E)=>v(g,E)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(g,E)=>v(g,E)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(g,E)=>v(g,E,(0,re.attachWorkDone)(i,g),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(w);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),Wr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let g of m)g.initialize(v.capabilities);if(C){let g=C(v,new U.CancellationTokenSource().token,(0,re.attachWorkDone)(i,v),void 0);return T(g).then(E=>{if(E instanceof U.ResponseError)return E;let D=E;D||(D={capabilities:{}});let Y=D.capabilities;Y||(Y={},D.capabilities=Y),Y.textDocumentSync===void 0||Y.textDocumentSync===null?Y.textDocumentSync=Wr.number(w.__textDocumentSync)?w.__textDocumentSync:U.TextDocumentSyncKind.None:!Wr.number(Y.textDocumentSync)&&!Wr.number(Y.textDocumentSync.change)&&(Y.textDocumentSync.change=Wr.number(w.__textDocumentSync)?w.__textDocumentSync:U.TextDocumentSyncKind.None);for(let Te of m)Te.fillServerCapabilities(Y);return D})}else{let g={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let E of m)E.fillServerCapabilities(g.capabilities);return g}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,A)return A(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),w}ye.createConnection=yN});var Nm=K(zt=>{"use strict";var gN=zt&&zt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),kT=zt&&zt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&gN(e,t,r)};Object.defineProperty(zt,"__esModule",{value:!0});zt.ProposedFeatures=zt.NotebookDocuments=zt.TextDocuments=zt.SemanticTokensBuilder=void 0;var TN=pm();Object.defineProperty(zt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return TN.SemanticTokensBuilder}});kT(wt(),zt);var vN=hm();Object.defineProperty(zt,"TextDocuments",{enumerable:!0,get:function(){return vN.TextDocuments}});var xN=gm();Object.defineProperty(zt,"NotebookDocuments",{enumerable:!0,get:function(){return xN.NotebookDocuments}});kT($T(),zt);var RN;(function(t){t.all={__brand:"features"}})(RN=zt.ProposedFeatures||(zt.ProposedFeatures={}))});var NT=K((Oj,ET)=>{"use strict";ET.exports=wt()});var Se=K(wn=>{"use strict";var bN=wn&&wn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),PT=wn&&wn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&bN(e,t,r)};Object.defineProperty(wn,"__esModule",{value:!0});wn.createConnection=void 0;var qc=Nm();PT(NT(),wn);PT(Nm(),wn);var _T=!1,AN={initialize:t=>{},get shutdownReceived(){return _T},set shutdownReceived(t){_T=t},exit:t=>{}};function SN(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),qc.ConnectionStrategy.is(t)||qc.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let l=c=>(0,qc.createProtocolConnection)(o,s,c,a);return(0,qc.createConnection)(l,AN,i)}wn.createConnection=SN});var zC=K((ile,BC)=>{"use strict";BC.exports=Se()});var WC=pe(Se(),1);var Gc=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=DT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),l=Math.max(i.end.line,0),c=this._lineOffsets,u=IT(n.text,!1,o);if(l-a===u.length)for(let m=0,T=u.length;m<T;m++)c[m+a+1]=u[m];else u.length<1e4?c.splice(a+1,l-a,...u):this._lineOffsets=c=c.slice(0,a+1).concat(u,c.slice(l+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,T=c.length;m<T;m++)c[m]=c[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=IT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},Zo;(function(t){function e(i,o,s,a){return new Gc(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Gc)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=_m(o.map(CN),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),l=0,c=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<l)throw new Error("Overlapping edit");f>l&&c.push(s.substring(l,f)),u.newText.length&&c.push(u.newText),l=i.offsetAt(u.range.end)}return c.push(s.substr(l)),c.join("")}t.applyEdits=n})(Zo||(Zo={}));function _m(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);_m(n,e),_m(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function IT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function DT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function CN(t){let e=DT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function kt(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Qn(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function OT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function es(t){return typeof t=="object"&&t!==null&&kt(t.container)&&Qn(t.reference)&&typeof t.message=="string"}var uo=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return kt(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function $n(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function fo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function LT(t){return $n(t)&&typeof t.fullText=="string"}var Pr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return mr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=wN(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?mr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return mr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(jc(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return mr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(jc(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return mr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?mr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function wN(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function jc(t){return!!t&&typeof t[Symbol.iterator]=="function"}var ts=new Pr(()=>{},()=>mr),mr=Object.freeze({done:!0,value:void 0});function oe(...t){if(t.length===1){let e=t[0];if(e instanceof Pr)return e;if(jc(e))return new Pr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Pr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:mr)}return t.length>1?new Pr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];jc(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return mr}):ts}var Br=class extends Pr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return mr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Ka;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Ka=Ka||(Ka={}));function Pm(t){return new Br(t,e=>$n(e)?e.content:[],{includeRoot:!0})}function UT(t){return Pm(t).filter(fo)}function qT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Wa(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function ir(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var Zn;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Zn=Zn||(Zn={}));function $N(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Zn.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Zn.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Zn.Inside:r?Zn.OverlapBack:Zn.OverlapFront}function Hc(t,e){return $N(t,e)>Zn.After}var Im=/^[\w\p{L}]$/u;function It(t,e,r=Im){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return br(t,e)}}function GT(t,e){if(t){let r=kN(t,!0);if(r&&MT(r,e))return r;if(LT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(MT(o,e))return o}}}}function MT(t,e){return fo(t)&&e.includes(t.tokenType.name)}function br(t,e){if(fo(t))return t;if($n(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return br(o,e)}if(r===n)return br(t.content[r],e)}}function kN(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function jT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function HT(t,e){let r=EN(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function EN(t,e){let r=FT(t),n=FT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function FT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function po(t,e,r,n){let i=[t,e,r,n].reduce(zT,{});return BT(i)}var Dm=Symbol("isProxy");function Kc(t){if(t&&t[Dm])for(let e of Object.values(t))Kc(e);return t}function BT(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>WT(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(WT(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Dm]});return r[Dm]=!0,r}var KT=Symbol();function WT(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===KT)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=KT;try{t[e]=typeof i=="function"?i(n):BT(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function zT(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=zT(i,n):t[r]=n}}return t}var Me=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ka.sum(oe(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return oe(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return oe(this.map.keys())}values(){return oe(this.map.values()).flat()}entriesGroupedByKey(){return oe(this.map.entries())}};var Om="AbstractRule";var mo="AbstractType";var NN="Condition";var _N="TypeDefinition";var Lm="AbstractElement";function rs(t){return ue.isInstance(t,Lm)}var VT="ArrayType";function ho(t){return ue.isInstance(t,VT)}var XT="Conjunction";function YT(t){return ue.isInstance(t,XT)}var JT="Disjunction";function QT(t){return ue.isInstance(t,JT)}var ZT="Grammar";function ns(t){return ue.isInstance(t,ZT)}var PN="GrammarImport";function Wc(t){return ue.isInstance(t,PN)}var IN="InferredType";function is(t){return ue.isInstance(t,IN)}var za="Interface";function Ar(t){return ue.isInstance(t,za)}var ev="LiteralCondition";function tv(t){return ue.isInstance(t,ev)}var rv="Negation";function nv(t){return ue.isInstance(t,rv)}var iv="Parameter";function ov(t){return ue.isInstance(t,iv)}var sv="ParameterReference";function os(t){return ue.isInstance(t,sv)}var av="ParserRule";function W(t){return ue.isInstance(t,av)}var lv="ReferenceType";function yo(t){return ue.isInstance(t,lv)}var DN="ReturnType";function ss(t){return ue.isInstance(t,DN)}var cv="SimpleType";function or(t){return ue.isInstance(t,cv)}var Mm="TerminalRule";function Ce(t){return ue.isInstance(t,Mm)}var Va="Type";function Mt(t){return ue.isInstance(t,Va)}var ON="TypeAttribute";function Bc(t){return ue.isInstance(t,ON)}var uv="UnionType";function zr(t){return ue.isInstance(t,uv)}var fv="Action";function _e(t){return ue.isInstance(t,fv)}var dv="Alternatives";function Ir(t){return ue.isInstance(t,dv)}var pv="Assignment";function be(t){return ue.isInstance(t,pv)}var mv="CharacterRange";function zc(t){return ue.isInstance(t,mv)}var hv="CrossReference";function Vt(t){return ue.isInstance(t,hv)}var yv="Group";function Ft(t){return ue.isInstance(t,yv)}var gv="Keyword";function pt(t){return ue.isInstance(t,gv)}var Tv="NegatedToken";function vv(t){return ue.isInstance(t,Tv)}var xv="RegexToken";function Rv(t){return ue.isInstance(t,xv)}var bv="RuleCall";function Pe(t){return ue.isInstance(t,bv)}var Av="TerminalAlternatives";function Sv(t){return ue.isInstance(t,Av)}var Cv="TerminalGroup";function wv(t){return ue.isInstance(t,Cv)}var $v="TerminalRuleCall";function Vc(t){return ue.isInstance(t,$v)}var kv="UnorderedGroup";function Dr(t){return ue.isInstance(t,kv)}var Ev="UntilToken";function Nv(t){return ue.isInstance(t,Ev)}var _v="Wildcard";function Pv(t){return ue.isInstance(t,_v)}var Ba=class extends uo{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case fv:return this.isSubtype(Lm,r)||this.isSubtype(mo,r);case dv:case pv:case mv:case hv:case yv:case gv:case Tv:case xv:case bv:case Av:case Cv:case $v:case kv:case Ev:case _v:return this.isSubtype(Lm,r);case VT:case lv:case cv:case uv:return this.isSubtype(_N,r);case XT:case JT:case ev:case rv:case sv:return this.isSubtype(NN,r);case za:case Va:return this.isSubtype(mo,r);case av:return this.isSubtype(Om,r)||this.isSubtype(mo,r);case Mm:return this.isSubtype(Om,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return mo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Om;case"Grammar:usedGrammars":return ZT;case"NamedArgument:parameter":case"ParameterReference:parameter":return iv;case"TerminalRuleCall:rule":return Mm;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},ue=new Ba;function Iv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{kt(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):kt(r)&&(r.$container=t,r.$containerProperty=e))}function Ie(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ie(t){let r=Xc(t).$document;if(!r)throw new Error("AST node has no document.");return r}function Xc(t){for(;t.$container;)t=t.$container;return t}function Ei(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(kt(o)){if(n.keyIndex++,Fm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(kt(a)&&Fm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return mr})}function Ze(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Br(t,r=>Ei(r,e))}function ti(t,e){if(t){if(e?.range&&!Fm(t,e.range))return new Br(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Br(t,r=>Ei(r,e),{includeRoot:!0})}function Fm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Hc(n,e):!1}function Yc(t){return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(Qn(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Qn(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return mr})}function Dv(t){var e,r;if(t){if("astNode"in t)return FN(t);if(Array.isArray(t))return t.reduce(Ov,void 0);{let n=t,i=LN(n)?MN((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return as(n,i)}}else return}function LN(t){return typeof t<"u"&&"element"in t&&"text"in t}function MN(t){try{return ie(t).uri.toString()}catch{return}}function FN(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return as(s,Um(n));{let a=l=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<l.length?l[o]:void 0:l.reduce(Ov,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let l=a(s.assignments[i]);return l&&as(l,Um(n))}else if(n.$cstNode){let l=a(Ni(n.$cstNode,i));return l&&as(l,Um(n))}else return}}}function Um(t){var e,r,n,i;return t.$cstNode?(r=(e=ie(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Br(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function as(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Ov(t,e){var r,n;if(t){if(!e)return t&&as(t)}else return e&&as(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),l=a-s,c={offset:s,end:a,length:l};if(t.range&&e.range&&(c.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let u=t.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;c.fileURI=m}return c}var qm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=UN(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function UN(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function Lv(t,e){let r=new qm(e),n=r.pushTraceRegion(void 0);Mv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Mv(t,e){typeof t=="string"?qN(t,e):t instanceof ls?GN(t,e):t instanceof Xt?qv(t,e):t instanceof _i&&jN(t,e)}function Fv(t,e){return typeof t=="string"?t.length!==0:t instanceof Xt?t.contents.some(r=>Fv(r,e)):t instanceof _i?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function qN(t,e){t&&(e.pendingIndent&&Uv(e,!1),e.append(t))}function Uv(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function qv(t,e){let r,n=Dv(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Mv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function GN(t,e){var r;if(Fv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),qv(t,e)}finally{e.decreaseIndent()}}}function jN(t,e){t.ifNotEmpty&&!HN(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Uv(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function HN(t){return t.trimStart()!==""}var oH=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Xa=/\r?\n/g,KN=/\S|$/;function Gv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(KN)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function jm(t,...e){let r=WN(t),n=BN(t,e,r);return VN(n)}function Kv(t,e,r){return(n,...i)=>Hm(t,e,r)(jm(n,...i))}function WN(t){let e=t.join("_").split(Xa),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Gv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function BN(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((c,u)=>{s.push(...c.split(Xa).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(u===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(Jc,m):(f,m,T)=>T===0?[m]:f.concat(Jc,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(Ya(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?Wv:[]))});let a=s.length,l=a!==0?s[a-1]:void 0;return(i||o)&&typeof l=="string"&&l.trim().length===0?n&&a!==1&&s[a-2]===Jc?s.slice(0,a-2):s.slice(0,a-1):s}var Jc={isNewLine:!0},Wv={isUndefinedSegment:!0},Hv=t=>t===Jc,Gm=t=>t===Wv,zN=t=>t.content!==void 0;function VN(t){return t.reduce((r,n,i)=>Gm(n)?r:Hv(n)?{node:i!==0&&(Gm(t[i-1])||Ya(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Gm(t[i-2])||Ya(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||Hv(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=zN(n)?n.content:n,l;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:c=>l=c.append(a)}):r.node.append(a),indented:l??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Xt}).node}var jv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function Ya(t){return t instanceof Xt||t instanceof ls||t instanceof _i}function cs(t,e){return Ya(t)?Lv(t,e).text:String(t)}var Xt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(kt(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(st)}appendNewLineIf(e){return e?this.append(st):this}appendNewLineIfNotEmpty(){return this.append(XN)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(jm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new ls(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(Kv(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function Hm(t,e,r){return n=>n instanceof Xt&&n.tracedSource===void 0?n.trace(t,e,r):new Xt().trace(t,e,r).append(n)}var ls=class extends Xt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},_i=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??jv,this.ifNotEmpty=r}},st=new _i,XN=new _i(void 0,!0);function ri(t){return"referenceType"in t}function ni(t){return"elementType"in t}function Dt(t){return"types"in t}function Bm(t){if(Dt(t)){let e=[];for(let r of t.types)e.push(...Bm(r));return e}else return[t]}function Or(t){return"value"in t}function Lr(t){return"primitive"in t}function kn(t){return"string"in t}function fn(t){return t&&"type"in t}function pn(t){return t&&"properties"in t}var Zc=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Xt;return r.append(`export type ${this.name} = ${dn(this.type,"AstType")};`,st),e&&(r.append(st),Vv(r,this.name)),this.dataType&&YN(r,this),cs(r)}toDeclaredTypesString(e){let r=new Xt;return r.append(`type ${zm(this.name,e)} = ${dn(this.type,"DeclaredType")};`,st),cs(r)}},us=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=pn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Xt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?go([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,st),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${go([...this.containerTypes].map(s=>s.name)).join(" | ")};`,st),this.typeNames.size>0&&o.append(`readonly $type: ${go([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,st),Bv(o,this.properties,"AstType")}),r.append("}",st),e&&(r.append(st),Vv(r,this.name)),cs(r)}toDeclaredTypesString(e){let r=new Xt,n=zm(this.name,e),i=go(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,st),r.indent(o=>Bv(o,this.properties,"DeclaredType",e)),r.append("}",st),cs(r)}},eu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function Qa(t,e){return Pi(t,e,new Map)}function Pi(t,e,r){let n=`${Ja(t)}\xBB${Ja(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Dt(t)?i=t.types.every(o=>Pi(o,e,r)):Dt(e)?i=e.types.some(o=>Pi(t,o,r)):Or(e)&&fn(e.value)?Or(t)&&fn(t.value)&&e.value.name===t.value.name?i=!0:i=Pi(t,e.value.type,r):ri(t)?i=ri(e)&&Pi(t.referenceType,e.referenceType,r):ni(t)?i=ni(e)&&Pi(t.elementType,e.elementType,r):Or(t)?fn(t.value)?i=Pi(t.value.type,e,r):Or(e)?fn(e.value)?i=Pi(t,e.value.type,r):i=zv(t.value,e.value,new Set):i=!1:Lr(t)?i=Lr(e)&&t.primitive===e.primitive:kn(t)&&(i=Lr(e)&&e.primitive==="string"||kn(e)&&e.string===t.string),i&&r.set(n,i)),i}function zv(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(pn(i)&&zv(i,e,r))return!0;return!1}function Ja(t){if(ri(t))return`@(${Ja(t.referenceType)})}`;if(ni(t))return`(${Ja(t.elementType)})[]`;if(Dt(t)){let e=t.types.map(r=>Ja(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Or(t))return`Value<${t.value.name}>`;if(Lr(t))return t.primitive;if(kn(t))return`'${t.string}'`}throw new Error("Invalid type")}function dn(t,e="AstType"){if(ri(t)){let r=dn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Km(t.referenceType,r)}`}else if(ni(t)){let r=dn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Km(t.elementType,r)}[]`}else if(Dt(t)){let r=t.types.map(n=>Km(n,dn(n,e)));return go(r).join(" | ")}else{if(Or(t))return t.value.name;if(Lr(t))return t.primitive;if(kn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function Km(t,e){return Dt(t)&&(e=`(${e})`),e}function Bv(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:zm(o.name,n),a=o.optional&&!tu(o.type),l=dn(o.type,r);return`${s}${a?"?":""}: ${l}`}go(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),st))}function tu(t){return ni(t)?!0:ri(t)?!1:Dt(t)?t.types.every(e=>tu(e)):Lr(t)?t.primitive==="boolean":!1}function Vv(t,e){t.append(`export const ${e} = '${e}';`,st),t.append(st),t.append(`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,st)),t.append("}",st)}function YN(t,e){switch(e.dataType){case"string":if(Wm(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=Xv(e.type),i=Yv(e.type);if(r.length===0&&n.length===0&&i.length===0)Qc(t,e.name,`typeof item === '${e.dataType}'`);else{let o=JN(r,n,i);Qc(t,e.name,o)}}break;case"number":case"boolean":case"bigint":Qc(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":Qc(t,e.name,"item instanceof Date");break;default:return}}function Wm(t){let e=!0;if(Lr(t))return t.primitive==="string";if(kn(t))return!0;if(Dt(t)){for(let r of t.types)if(Or(r))if(fn(r.value)){if(!Wm(r.value.type))return!1}else return!1;else if(Lr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Dt(r))e=Wm(r);else if(!kn(r))return!1}else return!1;return e}function JN(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function zm(t,e){return e.has(t)?`^${t}`:t}function Xv(t){let e=[];if(kn(t))return[t.string];if(Dt(t))for(let r of t.types)kn(r)?e.push(r.string):Dt(r)&&e.push(...Xv(r));return e}function Yv(t){let e=[];if(Lr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Dt(t))for(let r of t.types)Lr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Dt(r)&&e.push(...Yv(r));return e}function Qc(t,e,r){t.append(st,`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(n=>n.append(`return ${r};`,st)),t.append("}",st)}function go(t,e){return Array.from(new Set(t)).sort(e)}function Vm(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),l=n.getAstNode(a.parseResult.value,s.sourcePath);Ar(l)?(i.add(l),Vm(l,e,r,n).forEach(u=>i.add(u))):l&&Mt(l.$container)&&i.add(l.$container)}),i}function Za(t){let e=new Set;if(Ar(t))e.add(t),t.superTypes.forEach(r=>{if(Ar(r.ref)){e.add(r.ref);let n=Za(r.ref);for(let i of n)e.add(i)}});else if(Mt(t)){let r=Jv(t.type);for(let n of r){let i=Za(n);for(let o of i)e.add(o)}}return e}function Jv(t){var e;if(zr(t))return t.types.flatMap(r=>Jv(r));if(or(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Mt(r)||Ar(r))return[r]}return[]}function Xm(t,e){return t.interfaces.concat(e.interfaces)}function nu(t){return t.interfaces.concat(t.unions)}function Qv(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function Zv(t){return ru(t,new Set)}function ru(t,e){if(e.has(t))return[];if(e.add(t),Dt(t))return t.types.flatMap(r=>ru(r,e));if(Or(t)){let r=t.value;return"type"in r?ru(r.type,e):[r.name]}else if(ni(t))return ru(t.elementType,e);return[]}function el(t){return typeof t.name=="string"}var fs=class{getName(e){if(el(e))return e.name}getNameNode(e){return Yt(e.$cstNode,"name")}};function Q(t){return t.charCodeAt(0)}function iu(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function ds(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function To(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function tl(){throw Error("Internal Error - Should never get here!")}function Ym(t){return t.type==="Character"}var rl=[];for(let t=Q("0");t<=Q("9");t++)rl.push(t);var nl=[Q("_")].concat(rl);for(let t=Q("a");t<=Q("z");t++)nl.push(t);for(let t=Q("A");t<=Q("Z");t++)nl.push(t);var Jm=[Q(" "),Q("\f"),Q(`
`),Q("\r"),Q("	"),Q("\v"),Q("	"),Q("\xA0"),Q("\u1680"),Q("\u2000"),Q("\u2001"),Q("\u2002"),Q("\u2003"),Q("\u2004"),Q("\u2005"),Q("\u2006"),Q("\u2007"),Q("\u2008"),Q("\u2009"),Q("\u200A"),Q("\u2028"),Q("\u2029"),Q("\u202F"),Q("\u205F"),Q("\u3000"),Q("\uFEFF")];var QN=/[0-9a-fA-F]/,ou=/[0-9]/,ZN=/[1-9]/,vo=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":ds(n,"global");break;case"i":ds(n,"ignoreCase");break;case"m":ds(n,"multiLine");break;case"u":ds(n,"unicode");break;case"y":ds(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}To(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return tl()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;To(r);break}if(!(e===!0&&r===void 0)&&To(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),To(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):tl()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[Q(`
`),Q("\r"),Q("\u2028"),Q("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=rl;break;case"D":e=rl,r=!0;break;case"s":e=Jm;break;case"S":e=Jm,r=!0;break;case"w":e=nl;break;case"W":e=nl,r=!0;break}return To(e)?{type:"Set",value:e,complement:r}:tl()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=Q("\f");break;case"n":e=Q(`
`);break;case"r":e=Q("\r");break;case"t":e=Q("	");break;case"v":e=Q("\v");break}return To(e)?{type:"Character",value:e}:tl()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:Q("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:Q(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:Q(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(Ym(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(Ym(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else iu(n.value,e),e.push(Q("-")),iu(o.value,e)}else iu(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:Q("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(ZN.test(e)===!1)throw Error("Expecting a positive integer");for(;ou.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(ou.test(e)===!1)throw Error("Expecting an integer");for(;ou.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:Q(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return ou.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(QN.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var En=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var e_=new vo,Zm=class extends En{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=ii(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},Qm=new Zm;function ex(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),Qm.reset(t),Qm.visit(e_.pattern(t)),Qm.multiline}catch{return!1}}function eh(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function ii(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function tx(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:ii(e)).join("")}function rx(t,e){let r=t_(t),n=e.match(r);return!!n&&n[0].length>0}function t_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(c){o+=r.substr(n,c),n+=c}function l(c){o+="(?:"+r.substr(n,c)+"|$)",n+=c}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":l(3);break;case"x":l(4);break;case"u":e.unicode?r[n+2]==="{"?l(r.indexOf("}",n)-n+1):l(6):l(2);break;case"p":case"P":e.unicode?l(r.indexOf("}",n)-n+1):l(2);break;case"k":l(r.indexOf(">",n)-n+1);break;default:l(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],l(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):l(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:l(1);break}return o}return new RegExp(i(),t.flags)}var rh={};mw(rh,{URI:()=>th,Utils:()=>r_});var nx;(()=>{"use strict";var t={470:i=>{function o(l){if(typeof l!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(l))}function s(l,c){for(var u,f="",m=0,T=-1,A=0,C=0;C<=l.length;++C){if(C<l.length)u=l.charCodeAt(C);else{if(u===47)break;u=47}if(u===47){if(!(T===C-1||A===1))if(T!==C-1&&A===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=C,A=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=C,A=0;continue}}c&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+l.slice(T+1,C):f=l.slice(T+1,C),m=C-T-1;T=C,A=0}else u===46&&A!==-1?++A:A=-1}return f}var a={resolve:function(){for(var l,c="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(l===void 0&&(l=process.cwd()),m=l),o(m),m.length!==0&&(c=m+"/"+c,u=m.charCodeAt(0)===47)}return c=s(c,!u),u?c.length>0?"/"+c:"/":c.length>0?c:"."},normalize:function(l){if(o(l),l.length===0)return".";var c=l.charCodeAt(0)===47,u=l.charCodeAt(l.length-1)===47;return(l=s(l,!c)).length!==0||c||(l="."),l.length>0&&u&&(l+="/"),c?"/"+l:l},isAbsolute:function(l){return o(l),l.length>0&&l.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var l,c=0;c<arguments.length;++c){var u=arguments[c];o(u),u.length>0&&(l===void 0?l=u:l+="/"+u)}return l===void 0?".":a.normalize(l)},relative:function(l,c){if(o(l),o(c),l===c||(l=a.resolve(l))===(c=a.resolve(c)))return"";for(var u=1;u<l.length&&l.charCodeAt(u)===47;++u);for(var f=l.length,m=f-u,T=1;T<c.length&&c.charCodeAt(T)===47;++T);for(var A=c.length-T,C=m<A?m:A,N=-1,w=0;w<=C;++w){if(w===C){if(A>C){if(c.charCodeAt(T+w)===47)return c.slice(T+w+1);if(w===0)return c.slice(T+w)}else m>C&&(l.charCodeAt(u+w)===47?N=w:w===0&&(N=0));break}var v=l.charCodeAt(u+w);if(v!==c.charCodeAt(T+w))break;v===47&&(N=w)}var g="";for(w=u+N+1;w<=f;++w)w!==f&&l.charCodeAt(w)!==47||(g.length===0?g+="..":g+="/..");return g.length>0?g+c.slice(T+N):(T+=N,c.charCodeAt(T)===47&&++T,c.slice(T))},_makeLong:function(l){return l},dirname:function(l){if(o(l),l.length===0)return".";for(var c=l.charCodeAt(0),u=c===47,f=-1,m=!0,T=l.length-1;T>=1;--T)if((c=l.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":l.slice(0,f)},basename:function(l,c){if(c!==void 0&&typeof c!="string")throw new TypeError('"ext" argument must be a string');o(l);var u,f=0,m=-1,T=!0;if(c!==void 0&&c.length>0&&c.length<=l.length){if(c.length===l.length&&c===l)return"";var A=c.length-1,C=-1;for(u=l.length-1;u>=0;--u){var N=l.charCodeAt(u);if(N===47){if(!T){f=u+1;break}}else C===-1&&(T=!1,C=u+1),A>=0&&(N===c.charCodeAt(A)?--A==-1&&(m=u):(A=-1,m=C))}return f===m?m=C:m===-1&&(m=l.length),l.slice(f,m)}for(u=l.length-1;u>=0;--u)if(l.charCodeAt(u)===47){if(!T){f=u+1;break}}else m===-1&&(T=!1,m=u+1);return m===-1?"":l.slice(f,m)},extname:function(l){o(l);for(var c=-1,u=0,f=-1,m=!0,T=0,A=l.length-1;A>=0;--A){var C=l.charCodeAt(A);if(C!==47)f===-1&&(m=!1,f=A+1),C===46?c===-1?c=A:T!==1&&(T=1):c!==-1&&(T=-1);else if(!m){u=A+1;break}}return c===-1||f===-1||T===0||T===1&&c===f-1&&c===u+1?"":l.slice(c,f)},format:function(l){if(l===null||typeof l!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof l);return function(c,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,l)},parse:function(l){o(l);var c={root:"",dir:"",base:"",ext:"",name:""};if(l.length===0)return c;var u,f=l.charCodeAt(0),m=f===47;m?(c.root="/",u=1):u=0;for(var T=-1,A=0,C=-1,N=!0,w=l.length-1,v=0;w>=u;--w)if((f=l.charCodeAt(w))!==47)C===-1&&(N=!1,C=w+1),f===46?T===-1?T=w:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){A=w+1;break}return T===-1||C===-1||v===0||v===1&&T===C-1&&T===A+1?C!==-1&&(c.base=c.name=A===0&&m?l.slice(1,C):l.slice(A,C)):(A===0&&m?(c.name=l.slice(1,T),c.base=l.slice(1,C)):(c.name=l.slice(A,T),c.base=l.slice(A,C)),c.ext=l.slice(T,C)),A>0?c.dir=l.slice(0,A-1):m&&(c.dir="/"),c},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>xt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function l(M,S){if(!M.scheme&&S)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let c="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(S){return S instanceof m||!!S&&typeof S.authority=="string"&&typeof S.fragment=="string"&&typeof S.path=="string"&&typeof S.query=="string"&&typeof S.scheme=="string"&&typeof S.fsPath=="string"&&typeof S.with=="function"&&typeof S.toString=="function"}scheme;authority;path;query;fragment;constructor(S,q,j,ce,te,Z=!1){typeof S=="object"?(this.scheme=S.scheme||c,this.authority=S.authority||c,this.path=S.path||c,this.query=S.query||c,this.fragment=S.fragment||c):(this.scheme=function(Rt,ut){return Rt||ut?Rt:"file"}(S,Z),this.authority=q||c,this.path=function(Rt,ut){switch(Rt){case"https":case"http":case"file":ut?ut[0]!==u&&(ut=u+ut):ut=u}return ut}(this.scheme,j||c),this.query=ce||c,this.fragment=te||c,l(this,Z))}get fsPath(){return v(this,!1)}with(S){if(!S)return this;let{scheme:q,authority:j,path:ce,query:te,fragment:Z}=S;return q===void 0?q=this.scheme:q===null&&(q=c),j===void 0?j=this.authority:j===null&&(j=c),ce===void 0?ce=this.path:ce===null&&(ce=c),te===void 0?te=this.query:te===null&&(te=c),Z===void 0?Z=this.fragment:Z===null&&(Z=c),q===this.scheme&&j===this.authority&&ce===this.path&&te===this.query&&Z===this.fragment?this:new A(q,j,ce,te,Z)}static parse(S,q=!1){let j=f.exec(S);return j?new A(j[2]||c,Y(j[4]||c),Y(j[5]||c),Y(j[7]||c),Y(j[9]||c),q):new A(c,c,c,c,c)}static file(S){let q=c;if(i&&(S=S.replace(/\\/g,u)),S[0]===u&&S[1]===u){let j=S.indexOf(u,2);j===-1?(q=S.substring(2),S=u):(q=S.substring(2,j),S=S.substring(j)||u)}return new A("file",q,S,c,c)}static from(S){let q=new A(S.scheme,S.authority,S.path,S.query,S.fragment);return l(q,!0),q}toString(S=!1){return g(this,S)}toJSON(){return this}static revive(S){if(S){if(S instanceof m)return S;{let q=new A(S);return q._formatted=S.external,q._fsPath=S._sep===T?S.fsPath:null,q}}return S}}let T=i?1:void 0;class A extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(S=!1){return S?g(this,!0):(this._formatted||(this._formatted=g(this,!1)),this._formatted)}toJSON(){let S={$mid:1};return this._fsPath&&(S.fsPath=this._fsPath,S._sep=T),this._formatted&&(S.external=this._formatted),this.path&&(S.path=this.path),this.scheme&&(S.scheme=this.scheme),this.authority&&(S.authority=this.authority),this.query&&(S.query=this.query),this.fragment&&(S.fragment=this.fragment),S}}let C={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,S,q){let j,ce=-1;for(let te=0;te<M.length;te++){let Z=M.charCodeAt(te);if(Z>=97&&Z<=122||Z>=65&&Z<=90||Z>=48&&Z<=57||Z===45||Z===46||Z===95||Z===126||S&&Z===47||q&&Z===91||q&&Z===93||q&&Z===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,te)),ce=-1),j!==void 0&&(j+=M.charAt(te));else{j===void 0&&(j=M.substr(0,te));let Rt=C[Z];Rt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,te)),ce=-1),j+=Rt):ce===-1&&(ce=te)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function w(M){let S;for(let q=0;q<M.length;q++){let j=M.charCodeAt(q);j===35||j===63?(S===void 0&&(S=M.substr(0,q)),S+=C[j]):S!==void 0&&(S+=M[q])}return S!==void 0?S:M}function v(M,S){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?S?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function g(M,S){let q=S?w:N,j="",{scheme:ce,authority:te,path:Z,query:Rt,fragment:ut}=M;if(ce&&(j+=ce,j+=":"),(te||ce==="file")&&(j+=u,j+=u),te){let he=te.indexOf("@");if(he!==-1){let Er=te.substr(0,he);te=te.substr(he+1),he=Er.lastIndexOf(":"),he===-1?j+=q(Er,!1,!1):(j+=q(Er.substr(0,he),!1,!1),j+=":",j+=q(Er.substr(he+1),!1,!0)),j+="@"}te=te.toLowerCase(),he=te.lastIndexOf(":"),he===-1?j+=q(te,!1,!0):(j+=q(te.substr(0,he),!1,!0),j+=te.substr(he))}if(Z){if(Z.length>=3&&Z.charCodeAt(0)===47&&Z.charCodeAt(2)===58){let he=Z.charCodeAt(1);he>=65&&he<=90&&(Z=`/${String.fromCharCode(he+32)}:${Z.substr(3)}`)}else if(Z.length>=2&&Z.charCodeAt(1)===58){let he=Z.charCodeAt(0);he>=65&&he<=90&&(Z=`${String.fromCharCode(he+32)}:${Z.substr(2)}`)}j+=q(Z,!0,!1)}return Rt&&(j+="?",j+=q(Rt,!1,!1)),ut&&(j+="#",j+=S?ut:N(ut,!1,!1)),j}function E(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+E(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function Y(M){return M.match(D)?M.replace(D,S=>E(S)):M}var Te=r(470);let Ee=Te.posix||Te,Ht="/";var xt;(function(M){M.joinPath=function(S,...q){return S.with({path:Ee.join(S.path,...q)})},M.resolvePath=function(S,...q){let j=S.path,ce=!1;j[0]!==Ht&&(j=Ht+j,ce=!0);let te=Ee.resolve(j,...q);return ce&&te[0]===Ht&&!S.authority&&(te=te.substring(1)),S.with({path:te})},M.dirname=function(S){if(S.path.length===0||S.path===Ht)return S;let q=Ee.dirname(S.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),S.with({path:q})},M.basename=function(S){return Ee.basename(S.path)},M.extname=function(S){return Ee.extname(S.path)}})(xt||(xt={}))})(),nx=n})();var{URI:th,Utils:r_}=nx;var oi=rh;"default"in oi&&(oi=oi.default);var Jt=oi.URI;var xe;(function(t){t.basename=oi.Utils.basename,t.dirname=oi.Utils.dirname,t.extname=oi.Utils.extname,t.joinPath=oi.Utils.joinPath,t.resolvePath=oi.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),l=s.split("/").filter(m=>m.length>0),c=0;for(;c<a.length&&a[c]===l[c];c++);let u="../".repeat(a.length-c),f=l.slice(c).join("/");return u+f}t.relative=r})(xe=xe||(xe={}));var OH=xe.equals,LH=xe.relative;var su,ix=()=>su??(su=au(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var uu=pe(so(),1);var il=pe(Yn(),1);function n_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var ox=0,i_=10;var sx=Symbol("OperationCancelled");function xo(t){return t===sx}async function et(t){if(t===il.CancellationToken.None)return;let e=Date.now();if(e-ox>=i_&&(ox=e,await n_()),t.isCancellationRequested)throw sx}var lu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new il.CancellationTokenSource}lock(e){this.cancel();let r=new il.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{xo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Mr(t){return{code:t}}var ps;(function(t){t.all=["fast","slow","built-in"]})(ps=ps||(ps={}));var cu=class{constructor(e){this.entries=new Me,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let l={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,l)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(xo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=oe(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function ax(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:Ro(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(mn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:Ro(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function Ro(t){if(ho(t))return{elementType:Ro(t.elementType)};if(yo(t))return{referenceType:Ro(t.referenceType)};if(zr(t))return{types:t.types.map(Ro)};if(or(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=Nn(r);if(n)return ms(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function hs(t){return"referenceType"in t}function nh(t){return"elementType"in t}function lx(t){return"types"in t}function ih(t){return"value"in t}function o_(t){return"primitive"in t}function s_(t){return"string"in t}function cx(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new us(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new Zc(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=a_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=ol(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function a_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:ol(t.type,void 0,e,r)}}function ol(t,e,r,n){if(nh(t))return{elementType:ol(t.elementType,e,r,n)};if(hs(t))return{referenceType:ol(t.referenceType,void 0,r,n)};if(lx(t))return{types:t.types.map(i=>ol(i,e,r,n))};if(s_(t))return{string:t.string};if(o_(t))return{primitive:t.primitive,regex:t.regex};if(ih(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function sh(t,e){let r=sl(t),n=sl(e);for(let i of n)l_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function l_(t,e){return t.some(r=>oh(r,e))}function oh(t,e){return nh(t)&&nh(e)?oh(t.elementType,e.elementType):hs(t)&&hs(e)?oh(t.referenceType,e.referenceType):ih(t)&&ih(e)?t.value===e.value:!1}function sl(t){return lx(t)?t.types.flatMap(e=>sl(e)):[t]}function ux(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var we;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(we=we||(we={}));var fu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Mr(we.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>W(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>W(o)&&!Fr(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Mr(we.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Fr(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>oe(i.rules).filter(o=>!al(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>oe(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Me;n(e).forEach(l=>o.add(l.name,l));for(let[,l]of o.entriesGroupedByKey())l.length>1&&l.forEach(c=>{r("error",`A ${i}'s name has to be unique.`,{node:c,property:"name"})});let s=new Set,a=ll(this.documents,e);for(let l of a)n(l).forEach(c=>s.add(c.name));for(let l of o.keys())s.has(l)&&o.get(l).forEach(u=>{r("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Me;for(let i of e.imports){let o=si(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[uu.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=ll(this.documents,o);n.set(o,s)}let i=new Me;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let l=n.get(a),c=this.getDuplicateExportedRules(s,l);for(let u of c)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+oe(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let l=a.name;for(let c of o){let u=c.name;l===u&&s.add(c.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let l of e.types)s.add(l.name);for(let l of e.interfaces)s.add(l.name);for(let l of ll(this.documents,e))l.types.forEach(c=>s.add(c.name)),l.interfaces.forEach(c=>s.add(c.name));for(let l of e.rules.filter(W)){if(al(l))continue;let c=Fr(l),u=!l.returnType&&!l.dataType,f=Nn(l);if(!c&&f&&s.has(f)===u){if((u||((n=l.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&l.inferredType===void 0)r("error",a(f,u),{node:l,property:"name",data:Mr(we.MissingReturns)});else if(u||((i=l.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Vr(l.inferredType.$cstNode,"infers");r("error",a(f,u),{node:l.inferredType,property:"name",data:{code:we.InvalidInfers,actionSegment:ir(m)}})}}else if(c&&u){let m=Vr(l.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:l,property:"inferredType",data:{code:we.InvalidInfers,actionSegment:ir(m)}})}}for(let l of Ze(e).filter(_e)){let c=this.getActionType(l);if(c){let u=!!l.inferredType,f=Nn(l);if(l.type&&f&&s.has(f)===u){let m=u?Vr(l.$cstNode,"infer"):Vr(l.$cstNode,"{");r("error",a(f,u),{node:l,property:"type",data:{code:u?we.SuperfluousInfer:we.MissingInfer,actionSegment:ir(m)}})}else if(c&&f&&s.has(f)&&u&&l.$cstNode){let m=Yt((o=l.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=Vr(l.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:l,property:"type",data:{code:we.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(l,c){return c?`The type '${l}' is already explicitly declared and cannot be inferred.`:`The type '${l}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Mr(we.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Yr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",l=s+"isu",c=new Set,u=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);l.includes(T)?s.includes(T)&&u.add(T):c.add(T)}let f=this.getFlagRange(e);f&&(c.size>0?r("error",`'${Array.from(c).join("")}' ${c.size>1?"are":"is"} not valid regular expression flag${c.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&r("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!Ce(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Yt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Ie(e,i=>Ce(i)||W(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ce(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ce(n)&&n.fragment&&Ie(e,W)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Mr(we.CrossRefTokenSyntax)})}checkPackageImport(e,r){si(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Mr(we.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Mr(we.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=ys(e,!0);for(let i of e.rules)Ce(i)&&i.hidden||al(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[uu.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Me,i=new Set;for(let c of e.rules)Ce(c)&&c.name&&n.add(c.name,c),W(c)&&Ze(c).filter(pt).forEach(f=>i.add(f.value));let o=new Me,s=new Me;for(let c of e.imports){let u=ll(this.documents,c);for(let f of u)for(let m of f.rules)Ce(m)&&m.name?o.add(m.name,c):W(m)&&m.name&&Ze(m).filter(pt).forEach(A=>s.add(A.value,c))}for(let c of n.values())if(i.has(c.name))r("error","Terminal name clashes with existing keyword.",{node:c,property:"name"});else if(s.has(c.name)){let u=s.get(c.name);r("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:c,property:"name"})}let a=new Me;for(let c of i)for(let u of o.get(c))a.add(u,c);for(let[c,u]of a.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:c,property:"path"});let l=new Me;for(let[c,u]of o.entriesGroupedByKey()){let f=s.get(c);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>l.add(m,c))}for(let[c,u]of l.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:c,property:"path"})}checkRuleName(e,r){if(e.name&&!al(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Mr(we.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&c_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Ie(e,W)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Xr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Mr(we.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Ze(e).filter(os);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[uu.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(al(e))return;let n=dx(e),i=Fr(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&Pe(e.terminal)&&W(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Ze(e.terminal).map(o=>Vt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=Ro(n.type),o=sl(i),s=!1,a=!1;for(let l of o)hs(l)?s=!0:hs(l)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!ms(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(W(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else Ce(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!cl(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(Pe(i)){let o=i.rule.ref;W(o)&&!Fr(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):W(o)&&!px(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):Ce(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Mt(e.type.ref)&&zr(e.type.ref.type)){let n=fx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;W((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){or(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&W(e.ref)&&!Fr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=Nn(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Vt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function al(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var c_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function fx(t){let e=[];return t.types.forEach(r=>{var n;or(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Mt(r.typeRef.ref)&&(zr(r.typeRef.ref.type)?e.push(...fx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Xr(t,e){return t==="?"||t==="*"||Ft(e)&&!!e.guardCondition}function mx(t){return t==="*"||t==="+"}function Fr(t){return hx(t,new Set)}function hx(t,e){if(e.has(t))return!0;e.add(t);for(let r of Ze(t))if(Pe(r)){if(!r.rule.ref||W(r.rule.ref)&&!hx(r.rule.ref,e))return!1}else{if(be(r))return!1;if(_e(r))return!1}return!!t.definition}function dx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Mt(r)&&u_(r)}function u_(t){return lh(t.type,new Set)}function lh(t,e){if(e.has(t))return!0;if(e.add(t),ho(t))return!1;if(yo(t))return!1;if(zr(t))return t.types.every(r=>lh(r,e));if(or(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Mt(r)?lh(r.type,e):!1}else return!1}else return!1}function px(t){return ul(t,new Set)}function ul(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),W(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return ul(t.returnType.ref,e)}else{if(Mt(t))return ul(t.type,e);if(ho(t))return!1;if(yo(t))return!1;if(zr(t))return t.types.every(i=>ul(i,e));if(or(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return ul(t.typeRef.ref,e)}}return!1}function uh(t){let e=t.$container;if(Ft(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(_e(o))return o;{let s=Ze(r[i]).find(_e);if(s)return s}}}if(rs(e))return uh(e)}function mn(t){var e;if(W(t))return Fr(t)?t.name:(e=Ts(t))!==null&&e!==void 0?e:t.name;if(Ar(t)||Mt(t)||ss(t))return t.name;if(_e(t)){let r=vs(t);if(r)return r}else if(is(t))return t.name;throw new eu("Cannot get name of Unknown Type",t.$cstNode)}function Nn(t){if(t)try{return mn(t)}catch{return}}function Ts(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(W(e))return e.name;if(Ar(e)||Mt(e))return e.name}}}function vs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return mn(t.type.ref)}function bo(t){var e,r,n;return Ce(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Fr(t)?t.name:(n=Ts(t))!==null&&n!==void 0?n:t.name}function Yr(t){let e={s:!1,i:!1,u:!1},r=xs(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var fh=/[\s\S]/.source;function xs(t,e){if(Sv(t))return f_(t);if(wv(t))return d_(t);if(zc(t))return h_(t);if(Vc(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return ai(xs(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(vv(t))return m_(t);if(Nv(t))return p_(t);if(Rv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),ai(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Pv(t))return ai(fh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function f_(t){return ai(t.elements.map(e=>xs(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function d_(t){return ai(t.elements.map(e=>xs(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function p_(t){return ai(`${fh}*?${xs(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function m_(t){return ai(`(?!${xs(t.terminal)})${fh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function h_(t){return t.right?ai(`[${ah(t.left)}-${ah(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):ai(ah(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function ah(t){return ii(t.value)}function ai(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function dh(t){if(t.path===void 0||t.path.length===0)return;let e=xe.dirname(ie(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),xe.resolvePath(e,r)}function si(t,e){let r=dh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ns(i))return i}}catch{}}function ll(t,e){if(Wc(e)){let r=si(t,e);if(r){let n=ch(t,r);return n.push(r),n}return[]}else return ch(t,e)}function ch(t,e,r=e,n=new Set,i=new Set){let o=ie(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=si(t,s);a&&ch(t,a,r,n,i)}}return Array.from(i)}function gs(t){return be(t)?[t]:Ir(t)||Ft(t)||Dr(t)?t.elements.flatMap(e=>gs(e)):Pe(t)&&t.rule.ref?gs(t.rule.ref.definition):[]}var y_=["string","number","boolean","Date","bigint"];function ms(t){return y_.includes(t)}var ph=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:yx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let l={alt:s,next:a.children};l.next.length===0?(l.alt.super=l.alt.super.filter(c=>c!==l.alt.name),i.push(l)):i.push(...this.applyNext(e,l))}return Rx(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(yx(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ao();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function g_(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(gx)}}function yx(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>gx(e))}}function gx(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function Tx(t,e,r){let n=[],i={fragments:new Map};for(let l of t)n.push(...vx(i,l));let o=A_(n),s=S_(o),a=C_(o,s,r);for(let l of e){let c=T_(l);a.unions.push({name:l.name,declared:!1,type:c,subTypes:new Set,superTypes:new Set,dataType:l.dataType})}return a}function T_(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=mh(t.definition,r);return e?{primitive:"string"}:n}function mh(t,e){var r,n,i;if(t.cardinality)return e();if(Ir(t))return{types:t.elements.map(o=>mh(o,e))};if(Ft(t)||Dr(t))return t.elements.length!==1?e():mh(t.elements[0],e);if(Pe(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?Ce(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Yr(o).toString()}:{value:o.name}:e()}else if(pt(t))return{string:t.value};return e()}function vx(t,e){let r=Ao(e),n=new ph(t,r);return e.definition&&hh(n,n.root,e.definition),n.getTypes()}function Ao(t){return{name:W(t)||_e(t)?Nn(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function hh(t,e,r){let n=Xr(r.cardinality,r);if(Ir(r)){let i=[];n&&i.push(t.connect(e,Ao()));for(let o of r.elements){let s=t.connect(e,Ao());i.push(hh(t,s,o))}return t.merge(...i)}else if(Ft(r)||Dr(r)){let i=t.connect(e,Ao()),o;n&&(o=t.connect(e,Ao()));for(let s of r.elements)i=hh(t,i,s);return o?t.merge(o,i):i}else{if(_e(r))return v_(t,e,r);be(r)?x_(e,r):Pe(r)&&R_(t,e,r)}return e}function v_(t,e,r){var n;if(!t.hasLeafNode(e)){let o=g_(e);t.connect(e,o)}let i=t.connect(e,Ao(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&el(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:So(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function x_(t,e){let r={types:new Set,reference:!1};xx(e.terminal,r);let n=So(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Xr(e.cardinality),type:n,astNodes:new Set([e])})}function xx(t,e){if(Ir(t)||Dr(t)||Ft(t))for(let r of t.elements)xx(r,e);else if(pt(t))e.types.add(`'${t.value}'`);else if(Pe(t)&&t.rule.ref)e.types.add(bo(t.rule.ref));else if(Vt(t)&&t.type.ref){let r=Nn(t.type.ref);r&&e.types.add(r),e.reference=!0}}function R_(t,e,r){let n=r.rule.ref;if(W(n)&&n.fragment){let i=b_(n,t.context);Xr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else W(n)&&e.ruleCalls.push(bo(n))}function b_(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=Nn(t),o=vx(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function A_(t){let e=new Map,r=[],n=Rx(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function Rx(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Me),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let l of i){let c=l.alt;a.alt.super.push(...c.super),a.next.push(...l.next);let u=c.properties;for(let f of u){let m=o.find(T=>T.name===f.name);m?(m.type=sh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}c.ruleCalls.forEach(f=>s.add(f))}for(let l of i){let c=l.alt;if(c.ruleCalls.length===0)for(let u of o)c.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function S_(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Me;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:So(!1,!1,o)};r.push(s)}return r}function C_(t,e,r){let n=new Me;for(let a of t)for(let l of a.superTypes)n.add(l,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let l=new Set(n.get(a.name));if(a.properties.length===0&&l.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let c=So(!1,!1,Array.from(l)),u=s.get(a.name);if(u)u.type=sh(u.type,c);else{let f={name:a.name,declared:!1,subTypes:l,superTypes:a.superTypes,type:c};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(l=>!s.has(l)));return o}function So(t,e,r){if(t)return{elementType:So(!1,e,r)};if(e)return{referenceType:So(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:ms(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>So(!1,!1,[n]))}}function bx(t,e){let r=Ax(t,e),n=ax(r.interfaces,r.types),i=Tx(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function Ax(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ie(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)W(s)&&!s.fragment&&(Fr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>si(e,a)).filter(a=>a!==void 0);Ax(s,e,r,n)}}}return n}function wx(t,e){let{inferred:r,declared:n,astResources:i}=bx(t,e);return{astResources:i,inferred:Sx(n,r),declared:Sx(r,n)}}function Sx(t,e){var r,n;let i={interfaces:Qv(Cx(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:Cx(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=cx(i);return w_(o),o}function Cx(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function w_(t){let e=k_(t),r=Array.from(e.values());E_(r),N_(t.interfaces),$_(r)}function $_(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function k_({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,yh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function yh(t,e){if(e.has(t))return!0;if(e.add(t),Dt(t))return t.types.every(r=>yh(r,e));if(Or(t)){let r=t.value;return fn(r)?yh(r.type,e):!1}else return Lr(t)||kn(t)}function E_(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function N_(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(l=>Zv(l.type));for(let l of a)(e=r.get(l))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)pn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(l=>a.containerTypes.add(l)),o.has(a)||(o.add(a),i.push(a)))}}var __={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},P_={maxLookahead:3},$x={AstReflection:()=>new Ba},kx={Grammar:()=>ix(),LanguageMetaData:()=>__,parser:{ParserConfig:()=>P_}};var fl=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},Rs=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=oe(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},Ex={getElement(){},getAllElements(){return ts}};var du=pe(Yn(),1);var bs=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=du.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=Ei,i=du.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await et(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=du.CancellationToken.None){let n=e.parseResult.value,i=new Me;for(let o of Ze(n))await et(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var pu=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},gh=class extends pu{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},mu=class extends pu{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var hu=class extends gh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var As=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new hu(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ie(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(oe(a).filter(l=>this.reflection.isSubtype(l.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new fl(oe(e),r,n)}createScopeForNodes(e,r,n){let i=oe(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new fl(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new Rs(this.indexManager.allElements(e)))}};var yu=class extends As{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===mo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ie(r.container).precomputedScopes,o=Xc(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=oe(a).filter(l=>l.type===za||l.type===Va))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Ie(r.container,ns);if(!n)return Ex;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===mo&&(o=o.filter(s=>s.type===za||s.type===Va)),new Rs(o)}gatherImports(e,r){for(let n of e.imports){let i=dh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ns(s)&&this.gatherImports(s,r)}}}},gu=class extends bs{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),W(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Ze(e).forEach(o=>{if(_e(o)&&o.inferredType){let s=vs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){ss(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&W(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=Xc(e);if(i&&_e(e)&&e.inferredType){let o=vs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ie(e)){let i,o=()=>{var s;return i??(i=ir((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:ir(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var Ur=pe(Se(),1);var sr=pe(Se(),1);var Tu=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=sr.CancellationToken.None){let i=e.parseResult,o=[];if(await et(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===hn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(xo(s))throw s;console.error("An error occurred during validation:",s)}return await et(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:sr.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Mr(hn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=sr.Range.create(0,0,0,0);else{let a=sr.Position.create(s.endLine-1,s.endColumn);o=sr.Range.create(a,a)}}}else o=Wa(i.token);if(o){let s={severity:sr.DiagnosticSeverity.Error,range:o,message:i.message,data:Mr(hn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:hn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=sr.CancellationToken.None){let i=[],o=(s,a,l)=>{i.push(this.toDiagnostic(s,a,l))};return await Promise.all(ti(e).map(async s=>{await et(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let l of a)await l(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:I_(n),severity:D_(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function I_(t){if(sr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Yt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Vr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function D_(t){switch(t){case"error":return sr.DiagnosticSeverity.Error;case"warning":return sr.DiagnosticSeverity.Warning;case"info":return sr.DiagnosticSeverity.Information;case"hint":return sr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var hn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(hn=hn||(hn={}));var vu=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case we.GrammarNameUppercase:case we.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case we.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case we.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case we.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case we.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case we.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case we.MissingReturns:n(this.fixMissingReturns(e,r));break;case we.InvalidInfers:case we.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case we.MissingInfer:n(this.fixMissingInfer(e,r));break;case we.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case hn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=br(i,n),s=Ie(o?.astNode,zc);if(s&&s.right&&s.$cstNode){let a=s.left.value,l=s.right.value;return{title:"Refactor into regular expression",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${ii(a)}-${ii(l)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Yt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,l=s.offset,c=n.$cstNode.text.indexOf(")",l)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(c)}})}for(let a of i){let l=a.ref;if(l&&Ce(l)&&!l.hidden&&l.$cstNode){let c=l.$cstNode.range.start;o.push({newText:"hidden ",range:{start:c,end:c}})}}return{title:"Fix hidden terminals",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=br(o,i),a=Ie(s?.astNode,W);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),l=this.indexManager.allElements(a).filter(m=>m.name===r.refText),c=[],u=-1,f=-1;for(let m of l){if(xe.equals(m.documentUri,n.uri))continue;let T=O_(n.uri,m.documentUri),A,C="",N=n.parseResult.value,w=N.imports.find(v=>v.path&&T<v.path);if(w)A=(i=w.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(A={line:v.line+1,character:0})}else N.rules.length>0&&(A=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,C=`
`);A&&((u<0||T.length<f)&&(u=c.length,f=T.length),c.push({title:`Add import to '${T}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:A,end:A},newText:`import '${T}'
${C}`}]}}}))}return u>=0&&(c[u].isPreferred=!0),c}};function O_(t,e){let r=xe.dirname(t),n=xe.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Ix=pe(so(),1);var ws=pe(Se(),1);function Th(t,e){let r={stacks:t,tokens:e};return L_(r),r.stacks.flat().forEach(i=>{i.property=void 0}),_x(r.stacks).map(i=>i[i.length-1])}function vh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,l=s;for(;l.$container;)if(Ft(l.$container)){a=l.$container;break}else if(rs(l.$container))l=l.$container;else break;if(mx(l.cardinality)){let c=Ss({next:{feature:l,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let u of c)i.add(u.feature);o.push(...c)}if(a){let c=a.elements.indexOf(l);c!==void 0&&c<a.elements.length-1&&o.push(...Nx({feature:a,type:e.type,new:!1},c+1,r,n,i)),o.every(u=>Xr(u.feature.cardinality,u.feature)||Xr(r.get(u.feature))||i.has(u.feature))&&o.push(...vh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function dl(t){return kt(t)&&(t={feature:t}),Ss({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function Ss(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:l,type:c}=i;if(Ft(l)){if(s.has(l))return[];s.add(l)}if(Ft(l))return Nx(i,0,o,s,a).map(u=>xu(u,l.cardinality,o));if(Ir(l)||Dr(l))return l.elements.flatMap(u=>Ss({next:{feature:u,new:!1,type:c},cardinalities:o,visited:s,plus:a})).map(u=>xu(u,l.cardinality,o));if(be(l)){let u={feature:l.terminal,new:!1,type:c,property:(e=i.property)!==null&&e!==void 0?e:l.feature};return Ss({next:u,cardinalities:o,visited:s,plus:a}).map(f=>xu(f,l.cardinality,o))}else{if(_e(l))return vh({next:{feature:l,new:!0,type:mn(l),property:(r=i.property)!==null&&r!==void 0?r:l.feature},cardinalities:o,visited:s,plus:a});if(Pe(l)&&W(l.rule.ref)){let u=l.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=Ts(u))!==null&&n!==void 0?n:u.name,property:i.property};return Ss({next:f,cardinalities:o,visited:s,plus:a}).map(m=>xu(m,l.cardinality,o))}else return[i]}}function xu(t,e,r){return r.set(t.feature,e),t}function Nx(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...Ss({next:a,cardinalities:r,visited:n,plus:i})),!!Xr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function L_(t){for(let e of t.tokens){let r=_x(t.stacks,e);t.stacks=r}}function _x(t,e){let r=[];for(let n of t)r.push(...M_(n,e));return r}function M_(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(F_)),i=[];for(;t.length>0;){let o=t.pop(),s=vh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?xh(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Xr(a.feature.cardinality,a.feature)||Xr(r.get(a.feature))))break}return i}function F_(t){if(t.cardinality==="+")return!0;let e=Ie(t,be);return!!(e&&e.cardinality==="+")}function xh(t,e){if(pt(t))return t.value===e.image;if(Pe(t))return U_(t.rule.ref,e);if(Vt(t)){let r=Ru(t);if(r)return xh(r,e)}return!1}function U_(t,e){return W(t)?dl(t.definition).some(n=>xh(n.feature,e)):Ce(t)?Yr(t).test(e.image):!1}function Px(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Cs=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(l,c)=>{let u=this.fillCompletionItem(l,c);u&&n.push(u)},s=l=>pt(l.feature)?l.feature.value:l.feature,a=[];for(let l of i)if(await Promise.all(oe(l.features).distinct(s).exclude(a).map(c=>this.completionFor(l,c,o))),a.push(...l.features),!this.continueCompletion(n))break;return ws.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return oe(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:ws.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let l=bu(this.grammar),c=dl({feature:l.definition,new:!0,type:Ts(l)});return o.length>0?(o.shift(),Th(c.map(u=>[u]),o)):c}let s=[...o].splice(i.tokenIndex);return Th([i.elementStack.map(l=>({feature:l}))],s)}*buildContexts(e,r){var n,i,o,s,a;let l=e.parseResult.value.$cstNode;if(!l)return;let c=e.textDocument,u=c.getText(),f=c.offsetAt(r),m={document:e,textDocument:c,offset:f,position:r},T=this.findDataTypeRuleStart(l,f);if(T){let[g,E]=T,D=(n=br(l,g))===null||n===void 0?void 0:n.astNode,Y=this.findFeaturesAt(c,g);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:g,tokenEndOffset:E,features:Y})}let{nextTokenStart:A,nextTokenEnd:C,previousTokenStart:N,previousTokenEnd:w}=this.backtrackToAnyToken(u,f),v;if(N!==void 0&&w!==void 0&&w===f){v=(i=br(l,N))===null||i===void 0?void 0:i.astNode;let g=this.findFeaturesAt(c,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:w,features:g})}if(v=(s=(o=br(l,A))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=br(l,N))===null||a===void 0?void 0:a.astNode,v){let g=this.findFeaturesAt(c,A);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:A,tokenEndOffset:C,features:g})}else{let g=bu(this.grammar),E=dl(g.definition);yield Object.assign(Object.assign({},m),{tokenOffset:A,tokenEndOffset:C,features:E})}}findDataTypeRuleStart(e,r){var n,i;let o=It(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,W))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,W))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(W(r)){let i=dl(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(pt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Vt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Ie(r.feature,be),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),l=new Set;a.getAllElements().forEach(c=>{!l.has(c.name)&&this.filterCrossReference(c)&&(n(e,this.createReferenceCompletionItem(c)),l.add(c.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:ws.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let c=this.nameProvider.getName(r.node);if(!c)return;o=c}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Au=class extends Cs{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Ie(r.feature,be);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let l=e.textDocument.positionAt(e.tokenOffset+1),c=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:l,end:c}}for(let a of o){let l=i.length>0?"":'"',c=`${l}${a}${l}`;r(e,{label:a,textEdit:{newText:c,range:s},kind:Ix.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=xe.dirname(e.uri).toString(),o=[];for(let s of r)if(!xe.equals(s.uri,n)){let a=s.uri.toString(),l=a.substring(0,a.length-xe.extname(s.uri).length),c=xe.relative(i,l);c.startsWith(".")||(c=`./${c}`),o.push(c)}return o}};var pl=pe(Se(),1);var $s=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Ze(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of UT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,pl.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),pl.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===pl.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Su=class extends $s{shouldProcessContent(e){return!W(e)}};var Cu=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Rh(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,l,c)=>{var u,f;let m=this.nodeModeToKey(a,l),T=i.get(m),A=(u=c.options.priority)!==null&&u!==void 0?u:0,C=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||C<=A)&&i.set(m,c)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Ze(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],l=this.iterateCstTree(e,o).iterator(),c,u;do if(u=l.next(),!u.done){let f=u.value,m=fo(f),T=this.nodeModeToKey(f,"prepend"),A=r.get(T);if(r.delete(T),A){let w=this.createTextEdit(c,f,A,o);for(let v of w)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let C=this.nodeModeToKey(f,"append"),N=r.get(C);if(r.delete(C),N){let w=jT(f);if(w){let v=this.createTextEdit(f,w,N,o);for(let g of v)g&&this.insideRange(g.range,i)&&this.isNecessary(g,e.textDocument)&&s.push(g)}}if(!A&&f.hidden){let w=this.createHiddenTextEdits(c,f,void 0,o);for(let v of w)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(c=f)}while(!u.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],l={start:{character:0,line:s},end:r.range.start},c=i.document.getText(l),u=this.findFittingMove(l,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(c,i),T=this.getIndentationCharacterCount(i,u)-f;if(T===0)return[];let A="";T>0&&(A=(i.options.insertSpaces?" ":"	").repeat(T));let C=r.text.split(`
`);C[0]=c+C[0];for(let N=0;N<C.length;N++){let w=s+N,v={character:0,line:w};if(T>0)a.push({newText:A,range:{start:v,end:v}});else{let g=C[N],E=0;for(;E<g.length;E++){let D=g.charAt(E);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:w,character:Math.min(E,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let l=a.characters,c=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return l!==void 0?m.push(this.createSpaceTextEdit(s,l,n.options)):c!==void 0?m.push(this.createLineTextEdit(s,c,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),fo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Br(i,o=>this.iterateCst(o,r)):ts}iterateCst(e,r){if(!$n(e))return ts;let n=r.indentation;return new Pr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,mr))}},Rh=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new yn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new yn(r,this.collector)}property(e,r){let n=Yt(this.astNode.$cstNode,e,r);return new yn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Ni(this.astNode.$cstNode,n);r.push(...i)}return new yn(r,this.collector)}keyword(e,r){let n=Vr(this.astNode.$cstNode,e,r);return new yn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=wu(this.astNode.$cstNode,n);r.push(...i)}return new yn(r,this.collector)}cst(e){return new yn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new yn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new yn(HT(o,s),this.collector)}},yn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ge;(function(t){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(c)}}t.fit=e;function r(u){return i(0,u)}t.noSpace=r;function n(u){return i(1,u)}t.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}t.spaces=i;function o(u){return s(1,u)}t.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}t.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function l(u){return{options:u??{},moves:[{tabs:0}]}}t.noIndent=l;function c(u,f){var m,T,A,C,N,w;let v=(m=u.lines)!==null&&m!==void 0?m:0,g=(T=f.lines)!==null&&T!==void 0?T:0,E=(A=u.tabs)!==null&&A!==void 0?A:0,D=(C=f.tabs)!==null&&C!==void 0?C:0,Y=(N=u.characters)!==null&&N!==void 0?N:0,Te=(w=f.characters)!==null&&w!==void 0?w:0;return v<g?-1:v>g?1:E<D?-1:E>D?1:Y<Te?-1:Y>Te?1:0}})(ge=ge||(ge={}));var $u=class extends Cu{format(e){if(Vt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ge.noSpace());else if(W(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ge.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ge.oneSpace()):r.property("name").append(ge.noSpace()),r.properties("parameters").append(ge.noSpace()),r.keywords(",").append(ge.oneSpace()),r.keywords("<").append(ge.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ge.noSpace()),r.interior(i,n).prepend(ge.indent()),n.prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(Ce(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ge.oneSpace()),r.keyword("returns").append(ge.oneSpace())),r.keywords("hidden","terminal","fragment").append(ge.oneSpace()),r.keyword(":").prepend(ge.noSpace()),r.keyword(";").prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ge.noSpace()),r.keywords(".","+=","=").surround(ge.noSpace()),r.keyword("}").prepend(ge.noSpace())}else if(is(e))this.getNodeFormatter(e).keywords("infer","infers").append(ge.oneSpace());else if(be(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ge.noSpace());else if(Pe(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ge.noSpace()),r.keyword(",").append(ge.oneSpace()),r.properties("arguments").append(ge.noSpace())}rs(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ge.noSpace())}};var li=pe(Se(),1);var se=pe(Se(),1);var Sh={[se.SemanticTokenTypes.class]:0,[se.SemanticTokenTypes.comment]:1,[se.SemanticTokenTypes.enum]:2,[se.SemanticTokenTypes.enumMember]:3,[se.SemanticTokenTypes.event]:4,[se.SemanticTokenTypes.function]:5,[se.SemanticTokenTypes.interface]:6,[se.SemanticTokenTypes.keyword]:7,[se.SemanticTokenTypes.macro]:8,[se.SemanticTokenTypes.method]:9,[se.SemanticTokenTypes.modifier]:10,[se.SemanticTokenTypes.namespace]:11,[se.SemanticTokenTypes.number]:12,[se.SemanticTokenTypes.operator]:13,[se.SemanticTokenTypes.parameter]:14,[se.SemanticTokenTypes.property]:15,[se.SemanticTokenTypes.regexp]:16,[se.SemanticTokenTypes.string]:17,[se.SemanticTokenTypes.struct]:18,[se.SemanticTokenTypes.type]:19,[se.SemanticTokenTypes.typeParameter]:20,[se.SemanticTokenTypes.variable]:21},Dx={[se.SemanticTokenModifiers.abstract]:1,[se.SemanticTokenModifiers.async]:2,[se.SemanticTokenModifiers.declaration]:4,[se.SemanticTokenModifiers.defaultLibrary]:8,[se.SemanticTokenModifiers.definition]:16,[se.SemanticTokenModifiers.deprecated]:32,[se.SemanticTokenModifiers.documentation]:64,[se.SemanticTokenModifiers.modification]:128,[se.SemanticTokenModifiers.readonly]:256,[se.SemanticTokenModifiers.static]:512},Ox={legend:{tokenTypes:Object.keys(Sh),tokenModifiers:Object.keys(Dx)},full:{delta:!0},range:!0},Ah=class extends se.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},ku=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=se.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=se.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=se.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Ah;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=ti(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await et(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Hc(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Sh[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=Dx[u];a|=f}}let l=n.start.line,c=n.end.line;if(l===c){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(l,u,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(l,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:l+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=l+1;m<c;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(c,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Yt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Ni(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let l=Vr(r.$cstNode,n,o);l&&a.push(l)}else a.push(...wu(r.$cstNode,n));for(let l of a)this.highlightNode({node:l,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},bh;(function(t){function e(n,i){let o=new Map;Object.entries(Sh).forEach(([l,c])=>o.set(c,l));let s=0,a=0;return r(n.data,5).map(l=>{s+=l[0],l[0]!==0&&(a=0),a+=l[1];let c=l[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(l[3]),tokenModifiers:l[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+c}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(bh=bh||(bh={}));var Eu=class extends ku{highlightElement(e,r){var n;be(e)?r({node:e,property:"feature",type:li.SemanticTokenTypes.property}):_e(e)?e.feature&&r({node:e,property:"feature",type:li.SemanticTokenTypes.property}):ss(e)?r({node:e,property:"name",type:li.SemanticTokenTypes.type}):or(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:li.SemanticTokenTypes.type}):ov(e)?r({node:e,property:"name",type:li.SemanticTokenTypes.parameter}):os(e)?r({node:e,property:"parameter",type:li.SemanticTokenTypes.parameter}):Pe(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:li.SemanticTokenTypes.type}):Bc(e)&&r({node:e,property:"name",type:li.SemanticTokenTypes.property})}};var Nu=class extends fs{getName(e){return be(e)?e.feature:super.getName(e)}getNameNode(e){return be(e)?Yt(e.$cstNode,"feature"):super.getNameNode(e)}};var ks=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Es(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(Qn(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Qn(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||qT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>xe.equals(o.sourceUri,r.documentUri))),n.push(...i),oe(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ie(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:ir(r),local:!0}}}};var _u=class extends ks{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Es(e);if(n&&n.feature==="feature"){if(be(r))return this.findAssignmentDeclaration(r);if(_e(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return Bc(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Ie(e,Ar);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=Vm(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let l=this.findRulesWithReturnType(a);s.push(...l)}),s.forEach(a=>{let l=this.createReferencesToAttribute(a,e);n.push(...l)})}return oe(n)}createReferencesToAttribute(e,r){let n=[];if(W(e)){let i=gs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ie(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ie(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:xe.equals(ie(i).uri,ie(r).uri)})}}else{if(e.feature===r.name){let o=Yt(e.$cstNode,"feature");o&&n.push({sourceUri:ie(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ie(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:xe.equals(ie(e).uri,ie(r).uri)})}let i=Ie(e,W);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Ie(e,W),i=uh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Ar(n.returnType.ref)||Mt(n.returnType.ref))){let o=Za(n.returnType.ref);for(let s of o){let a=s.attributes.find(l=>l.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=Za(e.type.ref);for(let s of o){let a=s.attributes.find(l=>l.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(W(s)||_e(s))&&r.push(s)}),r}};var ml=pe(Se(),1);var Lx=pe(Se(),1);var Pu=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=It(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:Lx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var Mx=pe(Se(),1);var Ns=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=It(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Mx.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ie(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var Fx=pe(Se(),1);var Iu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=xe.equals(ie(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(c=>this.createDocumentHighlight(c)).toArray()}}createDocumentHighlight(e){return Fx.DocumentHighlight.create(e.segment.range)}};var Du=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of Ei(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Ux=pe(Se(),1),Ou=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=Ux.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};var Lu=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let l=r.charCodeAt(a),c=e.charCodeAt(o);if((l===c||this.toUpperCharCode(l)===this.toUpperCharCode(c))&&(n||(n=i===void 0||this.isWordTransition(i,l)),n&&o++,o===e.length))return!0;i=l}return!1}isWordTransition(e,r){return qx<=e&&e<=Gx&&q_<=r&&r<=G_||e===jx&&r!==jx}toUpperCharCode(e){return qx<=e&&e<=Gx?e-32:e}},qx="a".charCodeAt(0),Gx="z".charCodeAt(0),q_="A".charCodeAt(0),G_="Z".charCodeAt(0),jx="_".charCodeAt(0);var Ch=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=It(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let l=this.references.findDeclaration(a);if(l)return this.getAstNodeHoverContent(l)}}}},Mu=class extends Ch{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var j_=pe(Se(),1);var H_=pe(Se(),1);var Jr=pe(Se(),1);var He;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(He=He||(He={}));var Fu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Jt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:He.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:He.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=Zo.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Uu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return oe(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=He.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=He.Changed,this.documentMap.delete(r)),n}};var K_=pe(Se(),1);function Hx(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var qu=class{constructor(e){this.onInitializeEmitter=new Jr.Emitter,this.onInitializedEmitter=new Jr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Kc(this.services),this.services.ServiceRegistry.all.forEach(e=>Kc(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(S=>S.lsp.Formatter),o=n.map(S=>{var q;return(q=S.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(S=>!!S),s=this.hasService(S=>S.lsp.CodeActionProvider),a=this.hasService(S=>S.lsp.SemanticTokenProvider),l=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,c=this.hasService(S=>S.lsp.DocumentLinkProvider),u=Hx(n.map(S=>{var q;return(q=S.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(S=>S.lsp.TypeProvider),m=this.hasService(S=>S.lsp.ImplementationProvider),T=this.hasService(S=>S.lsp.CompletionProvider),A=Px(n.map(S=>{var q;return(q=S.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),C=this.hasService(S=>S.lsp.ReferencesProvider),N=this.hasService(S=>S.lsp.DocumentSymbolProvider),w=this.hasService(S=>S.lsp.DefinitionProvider),v=this.hasService(S=>S.lsp.DocumentHighlightProvider),g=this.hasService(S=>S.lsp.FoldingRangeProvider),E=this.hasService(S=>S.lsp.HoverProvider),D=this.hasService(S=>S.lsp.RenameProvider),Y=this.hasService(S=>S.lsp.CallHierarchyProvider),Te=this.hasService(S=>S.lsp.CodeLensProvider),Ee=this.hasService(S=>S.lsp.DeclarationProvider),Ht=this.hasService(S=>S.lsp.InlayHintProvider),xt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:l&&{commands:l},textDocumentSync:Jr.TextDocumentSyncKind.Incremental,completionProvider:T?A:void 0,referencesProvider:C,documentSymbolProvider:N,definitionProvider:w,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:g,hoverProvider:E,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Ox:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:Y?{}:void 0,documentLinkProvider:c?{resolveProvider:!1}:void 0,codeLensProvider:Te?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:xt?{resolveProvider:!!xt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function Wx(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");W_(e,t),B_(e,t),z_(e,t),V_(e,t),Y_(e,t),J_(e,t),Q_(e,t),Z_(e,t),tP(e,t),nP(e,t),iP(e,t),X_(e,t),oP(e,t),rP(e,t),sP(e,t),aP(e,t),cP(e,t),fP(e,t),mP(e,t),dP(e,t),uP(e,t),lP(e,t),eP(e,t),pP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function W_(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(l=>r.update(s,a,l))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Jt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],l=[];for(let c of s.changes){let u=Jt.parse(c.uri);c.type===Jr.FileChangeType.Deleted?l.push(u):a.push(u)}i(a,l)})}function B_(t,e){e.workspace.DocumentBuilder.onBuildPhase(He.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function z_(t,e){t.onCompletion(ar((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function V_(t,e){t.onReferences(ar((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function X_(t,e){t.onCodeAction(ar((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function Y_(t,e){t.onDocumentSymbol(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function J_(t,e){t.onDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function Q_(t,e){t.onTypeDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function Z_(t,e){t.onImplementation(ar((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function eP(t,e){t.onDeclaration(ar((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function tP(t,e){t.onDocumentHighlight(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function rP(t,e){t.onHover(ar((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function nP(t,e){t.onFoldingRanges(ar((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function iP(t,e){t.onDocumentFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function oP(t,e){t.onRenameRequest(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function sP(t,e){t.languages.inlayHint.on(Ii((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function aP(t,e){let r={data:[]};t.languages.semanticTokens.on(Ii((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Ii((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Ii((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function lP(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function cP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return _s(s)}})}function uP(t,e){t.onDocumentLinks(Ii((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function fP(t,e){t.onSignatureHelp(Ii((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function dP(t,e){t.onCodeLens(Ii((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function pP(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return _s(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return _s(a)}})}}function mP(t,e){t.languages.callHierarchy.onPrepare(Ii((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(Kx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(Kx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function Kx(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Jt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return _s(a)}}}function Ii(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let l=r.getOrCreateDocument(s);if(!l)throw new Error;try{return await t(a,l,i,o)}catch(c){return _s(c)}}}function ar(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let l=r.getOrCreateDocument(s);if(!l)return null;try{return await t(a,l,i,o)}catch(c){return _s(c)}}}function _s(t){if(xo(t))return new Jr.ResponseError(Jr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Jr.ResponseError)return t;throw t}var ju=pe(Se(),1),Gu=class{getSymbolKind(){return ju.SymbolKind.Field}getCompletionItemKind(){return ju.CompletionItemKind.Reference}};var Bx=pe(Se(),1);var Hu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(Bx.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var zx=pe(Se(),1);var Ku=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=It(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let l={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,l).forEach(u=>{let f=zx.TextEdit.replace(u.segment.range,r.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=It(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&el(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var hP=pe(Se(),1);var Vx=pe(Se(),1);var Wu=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=Vx.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await et(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var Bu=class extends Ns{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,l;let c="path";if(Wc(e.astNode)&&((n=Es(e))===null||n===void 0?void 0:n.feature)===c){let u=si(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:ml.Range.create(0,0,0,0),T=(l=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&l!==void 0?l:ml.Range.create(0,0,0,0);return[ml.LocationLink.create(u.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:Ei(e).head()}};var wh=pe(Se(),1);var zu=class extends Pu{getIncomingCalls(e,r){if(!W(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=br(s.$cstNode,i.segment.offset);if(!a)return;let l=Ie(a.astNode,W);if(!l||!l.$cstNode)return;let c=this.nameProvider.getNameNode(l);if(!c)return;let u=i.sourceUri.toString(),f=u+"@"+c.text;n.has(f)?n.set(f,{parserRule:l.$cstNode,nameNode:c,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:l.$cstNode,nameNode:c,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:wh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!W(e))return;let r=Ze(e).filter(Pe).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let l=this.nameProvider.getNameNode(a.astNode);if(!l)return;let c=ie(a.astNode).uri.toString(),u=c+"@"+l.text;n.has(u)?n.set(u,{refCstNode:a,to:l,from:[...n.get(u).from,s.range],docUri:c}):n.set(u,{refCstNode:a,to:l,from:[s.range],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:wh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var Vu=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=wx(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=yP(e);for(let a of nu(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=oe(e.interfaces).concat(e.types).reduce((a,l)=>a.set(l.name,l),new Map);for(let a of nu(n)){let l=s.get(a.name);if(l){let c=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},c??{}),{declared:a,declaredNode:l}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=Xm(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of Xm(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function yP({parserRules:t,datatypeRules:e}){let r=new Me;oe(t).concat(e).forEach(i=>r.add(bo(i),i));function n(i){if(_e(i)){let o=vs(i);o&&r.add(o,i)}(Ir(i)||Ft(i)||Dr(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function Xx(t){return t&&"declared"in t}function Yx(t){return t&&"inferred"in t}function Jx(t){return t&&"inferred"in t&&"declared"in t}function Zx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var Xu=class{checkCyclicType(e,r){Di(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Di(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(Xx(o)&&pn(o.declared)&&Ar(o.declaredNode)){let s=o;TP(s,r),vP(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())Yx(o)&&o.inferred instanceof us&&gP(o.inferred,r),Jx(o)&&bP(o,i,r)}checkActionIsNotUnionType(e,r){Mt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Di(t,e){var r;if(e.has(t))return!0;if(e.add(t),Mt(t))return Di(t.type,e);if(Ar(t))return t.superTypes.some(n=>n.ref&&Di(n.ref,new Set(e)));if(or(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Di(t.typeRef.ref,e)}else{if(yo(t))return Di(t.referenceType,e);if(ho(t))return Di(t.elementType,e);if(zr(t))return t.types.some(n=>Di(n,new Set(e)))}return!1}function gP(t,e){t.properties.forEach(r=>{var n;let i=Bm(r.type);if(i.length>1){let o=a=>ri(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function TP({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(fn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function vP({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Me);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let l of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(l.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let l=i[s],c=i[a],u=pn(l)?l.superProperties:[],f=pn(c)?c.superProperties:[],m=xP(u,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${l}' and '${c}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=pn(s)?s.superProperties:[];for(let l of a)o.add(l.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(l=>l.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function xP(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!RP(n,i)&&r.push(n.name)}return r}function RP(t,e){return Qa(t.type,e.type)&&Qa(e.type,t.type)}function bP(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,l=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:_e(T)?"type":"name"})),c=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:be(T)||_e(T)?"feature":"name"})),u=f=>{s.forEach(m=>{W(m)&&gs(m.definition).find(A=>A.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(fn(n)&&fn(i))AP(n.type,i.type,l(`in a rule that returns type '${a}'`));else if(pn(n)&&pn(i))SP(n,i,e,l(`in a rule that returns type '${a}'`),c,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;l()(f),r("error",f,{node:o,property:"name"})}}function AP(t,e,r){Qa(t,e)||r(`Cannot assign type '${dn(t,"DeclaredType")}' to '${dn(e,"DeclaredType")}'`)}function Qx(t){return t.optional||tu(t.type)}function SP(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),l=new Map(e.superProperties.map(f=>[f.name,f])),c=f=>{if(Dt(f))return{types:f.types.map(m=>c(m))};if(ri(f))return{referenceType:c(f.referenceType)};if(ni(f))return{elementType:c(f.elementType)};if(Or(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=l.get(f);if(T){let A=dn(m.type,"DeclaredType"),C=dn(T.type,"DeclaredType");if(!Qa(c(m.type),T.type)&&C!=="unknown"){let w=`The assigned type '${A}' is not compatible with the declared property '${f}' of type '${C}'.`;i(m.astNodes,w)}m.optional&&!Qx(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of l.entries())!a.get(f)&&!Qx(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",T=Array.from(u).map(A=>`'${A}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var CP={validation:{LangiumGrammarValidator:t=>new fu(t),ValidationResourcesCollector:t=>new Vu(t),LangiumGrammarTypesValidator:()=>new Xu},lsp:{FoldingRangeProvider:t=>new Su(t),CodeActionProvider:t=>new vu(t),SemanticTokenProvider:t=>new Eu(t),Formatter:()=>new $u,DefinitionProvider:t=>new Bu(t),CallHierarchyProvider:t=>new zu(t),CompletionProvider:t=>new Au(t)},references:{ScopeComputation:t=>new gu(t),ScopeProvider:t=>new yu(t),References:t=>new _u(t),NameProvider:()=>new Nu}};function eR(t,e){let r=po(yl(t),$x,e),n=po(hl({shared:r}),kx,CP);return wP(r,n),r.ServiceRegistry.register(n),ux(n),Zx(n),{shared:r,grammar:n}}function wP(t,e){t.workspace.DocumentBuilder.onBuildPhase(He.IndexedReferences,async(n,i)=>{for(let o of n){await et(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var $h=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Ps={fileSystemProvider:()=>new $h};function bu(t){return t.rules.find(e=>W(e)&&e.entry)}function $P(t){return t.rules.filter(e=>Ce(e)&&e.hidden)}function ys(t,e){let r=new Set,n=bu(t);if(!n)return new Set(t.rules);let i=[n].concat($P(t));for(let s of i)tR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||Ce(s)&&s.hidden)&&o.add(s);return o}function tR(t,e,r){e.add(t.name),Ze(t).forEach(n=>{if(Pe(n)||r&&Vc(n)){let i=n.rule.ref;i&&!e.has(i.name)&&tR(i,e,r)}})}function Ru(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=cl(t.type.ref);return e?.terminal}}function rR(t){return t.hidden&&!Yr(t).test(" ")}function Ni(t,e){return!t||!e?[]:kh(t,e,t.astNode,!0)}function Yt(t,e,r){if(!t||!e)return;let n=kh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function kh(t,e,r,n){if(!n){let i=Ie(t.grammarSource,be);if(i&&i.feature===e)return[t]}return $n(t)&&t.astNode===r?t.content.flatMap(i=>kh(i,e,r,!1)):[]}function wu(t,e){return t?nR(t,e,t?.astNode):[]}function Vr(t,e,r){if(!t)return;let n=nR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function nR(t,e,r){if(t.astNode!==r)return[];if(pt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=Pm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?pt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Es(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(t.grammarSource,be);if(n)return n;t=t.container}}function cl(t){return is(t)&&(t=t.$container),iR(t,new Map)}function iR(t,e){var r;function n(i,o){let s;return Ie(i,be)||(s=iR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Ze(t)){if(be(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Pe(i)&&W(i.rule.ref))return n(i,i.rule.ref);if(or(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function au(t){var e;let r=eR(Ps).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Jt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function oR(t){let e=[],r=t.Grammar;for(let n of r.rules)Ce(n)&&rR(n)&&ex(Yr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Im}}var kP=typeof global=="object"&&global&&global.Object===Object&&global,Yu=kP;var EP=typeof self=="object"&&self&&self.Object===Object&&self,NP=Yu||EP||Function("return this")(),Et=NP;var _P=Et.Symbol,Ut=_P;var sR=Object.prototype,PP=sR.hasOwnProperty,IP=sR.toString,gl=Ut?Ut.toStringTag:void 0;function DP(t){var e=PP.call(t,gl),r=t[gl];try{t[gl]=void 0;var n=!0}catch{}var i=IP.call(t);return n&&(e?t[gl]=r:delete t[gl]),i}var aR=DP;var OP=Object.prototype,LP=OP.toString;function MP(t){return LP.call(t)}var lR=MP;var FP="[object Null]",UP="[object Undefined]",cR=Ut?Ut.toStringTag:void 0;function qP(t){return t==null?t===void 0?UP:FP:cR&&cR in Object(t)?aR(t):lR(t)}var hr=qP;function GP(t){return t!=null&&typeof t=="object"}var gt=GP;var jP="[object Symbol]";function HP(t){return typeof t=="symbol"||gt(t)&&hr(t)==jP}var _n=HP;function KP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var Pn=KP;var WP=Array.isArray,V=WP;var BP=1/0,uR=Ut?Ut.prototype:void 0,fR=uR?uR.toString:void 0;function dR(t){if(typeof t=="string")return t;if(V(t))return Pn(t,dR)+"";if(_n(t))return fR?fR.call(t):"";var e=t+"";return e=="0"&&1/t==-BP?"-0":e}var pR=dR;var zP=/\s/;function VP(t){for(var e=t.length;e--&&zP.test(t.charAt(e)););return e}var mR=VP;var XP=/^\s+/;function YP(t){return t&&t.slice(0,mR(t)+1).replace(XP,"")}var hR=YP;function JP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var at=JP;var yR=0/0,QP=/^[-+]0x[0-9a-f]+$/i,ZP=/^0b[01]+$/i,eI=/^0o[0-7]+$/i,tI=parseInt;function rI(t){if(typeof t=="number")return t;if(_n(t))return yR;if(at(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=at(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=hR(t);var r=ZP.test(t);return r||eI.test(t)?tI(t.slice(2),r?2:8):QP.test(t)?yR:+t}var gR=rI;var TR=1/0,nI=17976931348623157e292;function iI(t){if(!t)return t===0?t:0;if(t=gR(t),t===TR||t===-TR){var e=t<0?-1:1;return e*nI}return t===t?t:0}var vR=iI;function oI(t){var e=vR(t),r=e%1;return e===e?r?e-r:e:0}var In=oI;function sI(t){return t}var Sr=sI;var aI="[object AsyncFunction]",lI="[object Function]",cI="[object GeneratorFunction]",uI="[object Proxy]";function fI(t){if(!at(t))return!1;var e=hr(t);return e==lI||e==cI||e==aI||e==uI}var yr=fI;var dI=Et["__core-js_shared__"],Ju=dI;var xR=function(){var t=/[^.]+$/.exec(Ju&&Ju.keys&&Ju.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function pI(t){return!!xR&&xR in t}var RR=pI;var mI=Function.prototype,hI=mI.toString;function yI(t){if(t!=null){try{return hI.call(t)}catch{}try{return t+""}catch{}}return""}var ci=yI;var gI=/[\\^$.*+?()[\]{}|]/g,TI=/^\[object .+?Constructor\]$/,vI=Function.prototype,xI=Object.prototype,RI=vI.toString,bI=xI.hasOwnProperty,AI=RegExp("^"+RI.call(bI).replace(gI,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function SI(t){if(!at(t)||RR(t))return!1;var e=yr(t)?AI:TI;return e.test(ci(t))}var bR=SI;function CI(t,e){return t?.[e]}var AR=CI;function wI(t,e){var r=AR(t,e);return bR(r)?r:void 0}var Cr=wI;var $I=Cr(Et,"WeakMap"),Qu=$I;var SR=Object.create,kI=function(){function t(){}return function(e){if(!at(e))return{};if(SR)return SR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),CR=kI;function EI(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var wR=EI;function NI(){}var lt=NI;function _I(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var $R=_I;var PI=800,II=16,DI=Date.now;function OI(t){var e=0,r=0;return function(){var n=DI(),i=II-(n-r);if(r=n,i>0){if(++e>=PI)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var kR=OI;function LI(t){return function(){return t}}var ER=LI;var MI=function(){try{var t=Cr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Is=MI;var FI=Is?function(t,e){return Is(t,"toString",{configurable:!0,enumerable:!1,value:ER(e),writable:!0})}:Sr,NR=FI;var UI=kR(NR),_R=UI;function qI(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var Zu=qI;function GI(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var ef=GI;function jI(t){return t!==t}var PR=jI;function HI(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var IR=HI;function KI(t,e,r){return e===e?IR(t,e,r):ef(t,PR,r)}var Ds=KI;function WI(t,e){var r=t==null?0:t.length;return!!r&&Ds(t,e,0)>-1}var tf=WI;var BI=9007199254740991,zI=/^(?:0|[1-9]\d*)$/;function VI(t,e){var r=typeof t;return e=e??BI,!!e&&(r=="number"||r!="symbol"&&zI.test(t))&&t>-1&&t%1==0&&t<e}var Oi=VI;function XI(t,e,r){e=="__proto__"&&Is?Is(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Os=XI;function YI(t,e){return t===e||t!==t&&e!==e}var Dn=YI;var JI=Object.prototype,QI=JI.hasOwnProperty;function ZI(t,e,r){var n=t[e];(!(QI.call(t,e)&&Dn(n,r))||r===void 0&&!(e in t))&&Os(t,e,r)}var Li=ZI;function eD(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],l=n?n(r[a],t[a],a,r,t):void 0;l===void 0&&(l=t[a]),i?Os(r,a,l):Li(r,a,l)}return r}var On=eD;var DR=Math.max;function tD(t,e,r){return e=DR(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=DR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),wR(t,this,a)}}var OR=tD;function rD(t,e){return _R(OR(t,e,Sr),t+"")}var Ls=rD;var nD=9007199254740991;function iD(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=nD}var Ms=iD;function oD(t){return t!=null&&Ms(t.length)&&!yr(t)}var Nt=oD;function sD(t,e,r){if(!at(r))return!1;var n=typeof e;return(n=="number"?Nt(r)&&Oi(e,r.length):n=="string"&&e in r)?Dn(r[e],t):!1}var Mi=sD;function aD(t){return Ls(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Mi(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var LR=aD;var lD=Object.prototype;function cD(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||lD;return t===r}var Ln=cD;function uD(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var MR=uD;var fD="[object Arguments]";function dD(t){return gt(t)&&hr(t)==fD}var Eh=dD;var FR=Object.prototype,pD=FR.hasOwnProperty,mD=FR.propertyIsEnumerable,hD=Eh(function(){return arguments}())?Eh:function(t){return gt(t)&&pD.call(t,"callee")&&!mD.call(t,"callee")},Fi=hD;function yD(){return!1}var UR=yD;var jR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,qR=jR&&typeof module=="object"&&module&&!module.nodeType&&module,gD=qR&&qR.exports===jR,GR=gD?Et.Buffer:void 0,TD=GR?GR.isBuffer:void 0,vD=TD||UR,ui=vD;var xD="[object Arguments]",RD="[object Array]",bD="[object Boolean]",AD="[object Date]",SD="[object Error]",CD="[object Function]",wD="[object Map]",$D="[object Number]",kD="[object Object]",ED="[object RegExp]",ND="[object Set]",_D="[object String]",PD="[object WeakMap]",ID="[object ArrayBuffer]",DD="[object DataView]",OD="[object Float32Array]",LD="[object Float64Array]",MD="[object Int8Array]",FD="[object Int16Array]",UD="[object Int32Array]",qD="[object Uint8Array]",GD="[object Uint8ClampedArray]",jD="[object Uint16Array]",HD="[object Uint32Array]",Je={};Je[OD]=Je[LD]=Je[MD]=Je[FD]=Je[UD]=Je[qD]=Je[GD]=Je[jD]=Je[HD]=!0;Je[xD]=Je[RD]=Je[ID]=Je[bD]=Je[DD]=Je[AD]=Je[SD]=Je[CD]=Je[wD]=Je[$D]=Je[kD]=Je[ED]=Je[ND]=Je[_D]=Je[PD]=!1;function KD(t){return gt(t)&&Ms(t.length)&&!!Je[hr(t)]}var HR=KD;function WD(t){return function(e){return t(e)}}var Mn=WD;var KR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Tl=KR&&typeof module=="object"&&module&&!module.nodeType&&module,BD=Tl&&Tl.exports===KR,Nh=BD&&Yu.process,zD=function(){try{var t=Tl&&Tl.require&&Tl.require("util").types;return t||Nh&&Nh.binding&&Nh.binding("util")}catch{}}(),Qr=zD;var WR=Qr&&Qr.isTypedArray,VD=WR?Mn(WR):HR,Fs=VD;var XD=Object.prototype,YD=XD.hasOwnProperty;function JD(t,e){var r=V(t),n=!r&&Fi(t),i=!r&&!n&&ui(t),o=!r&&!n&&!i&&Fs(t),s=r||n||i||o,a=s?MR(t.length,String):[],l=a.length;for(var c in t)(e||YD.call(t,c))&&!(s&&(c=="length"||i&&(c=="offset"||c=="parent")||o&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||Oi(c,l)))&&a.push(c);return a}var rf=JD;function QD(t,e){return function(r){return t(e(r))}}var nf=QD;var ZD=nf(Object.keys,Object),BR=ZD;var eO=Object.prototype,tO=eO.hasOwnProperty;function rO(t){if(!Ln(t))return BR(t);var e=[];for(var r in Object(t))tO.call(t,r)&&r!="constructor"&&e.push(r);return e}var of=rO;function nO(t){return Nt(t)?rf(t):of(t)}var Ke=nO;var iO=Object.prototype,oO=iO.hasOwnProperty,sO=LR(function(t,e){if(Ln(e)||Nt(e)){On(e,Ke(e),t);return}for(var r in e)oO.call(e,r)&&Li(t,r,e[r])}),Qt=sO;function aO(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var zR=aO;var lO=Object.prototype,cO=lO.hasOwnProperty;function uO(t){if(!at(t))return zR(t);var e=Ln(t),r=[];for(var n in t)n=="constructor"&&(e||!cO.call(t,n))||r.push(n);return r}var VR=uO;function fO(t){return Nt(t)?rf(t,!0):VR(t)}var Ui=fO;var dO=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,pO=/^\w*$/;function mO(t,e){if(V(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||_n(t)?!0:pO.test(t)||!dO.test(t)||e!=null&&t in Object(e)}var Us=mO;var hO=Cr(Object,"create"),fi=hO;function yO(){this.__data__=fi?fi(null):{},this.size=0}var XR=yO;function gO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var YR=gO;var TO="__lodash_hash_undefined__",vO=Object.prototype,xO=vO.hasOwnProperty;function RO(t){var e=this.__data__;if(fi){var r=e[t];return r===TO?void 0:r}return xO.call(e,t)?e[t]:void 0}var JR=RO;var bO=Object.prototype,AO=bO.hasOwnProperty;function SO(t){var e=this.__data__;return fi?e[t]!==void 0:AO.call(e,t)}var QR=SO;var CO="__lodash_hash_undefined__";function wO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=fi&&e===void 0?CO:e,this}var ZR=wO;function qs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}qs.prototype.clear=XR;qs.prototype.delete=YR;qs.prototype.get=JR;qs.prototype.has=QR;qs.prototype.set=ZR;var _h=qs;function $O(){this.__data__=[],this.size=0}var eb=$O;function kO(t,e){for(var r=t.length;r--;)if(Dn(t[r][0],e))return r;return-1}var qi=kO;var EO=Array.prototype,NO=EO.splice;function _O(t){var e=this.__data__,r=qi(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():NO.call(e,r,1),--this.size,!0}var tb=_O;function PO(t){var e=this.__data__,r=qi(e,t);return r<0?void 0:e[r][1]}var rb=PO;function IO(t){return qi(this.__data__,t)>-1}var nb=IO;function DO(t,e){var r=this.__data__,n=qi(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var ib=DO;function Gs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Gs.prototype.clear=eb;Gs.prototype.delete=tb;Gs.prototype.get=rb;Gs.prototype.has=nb;Gs.prototype.set=ib;var Gi=Gs;var OO=Cr(Et,"Map"),ji=OO;function LO(){this.size=0,this.__data__={hash:new _h,map:new(ji||Gi),string:new _h}}var ob=LO;function MO(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var sb=MO;function FO(t,e){var r=t.__data__;return sb(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Hi=FO;function UO(t){var e=Hi(this,t).delete(t);return this.size-=e?1:0,e}var ab=UO;function qO(t){return Hi(this,t).get(t)}var lb=qO;function GO(t){return Hi(this,t).has(t)}var cb=GO;function jO(t,e){var r=Hi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var ub=jO;function js(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}js.prototype.clear=ob;js.prototype.delete=ab;js.prototype.get=lb;js.prototype.has=cb;js.prototype.set=ub;var Co=js;var HO="Expected a function";function Ph(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(HO);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(Ph.Cache||Co),r}Ph.Cache=Co;var fb=Ph;var KO=500;function WO(t){var e=fb(t,function(n){return r.size===KO&&r.clear(),n}),r=e.cache;return e}var db=WO;var BO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,zO=/\\(\\)?/g,VO=db(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(BO,function(r,n,i,o){e.push(i?o.replace(zO,"$1"):n||r)}),e}),pb=VO;function XO(t){return t==null?"":pR(t)}var mb=XO;function YO(t,e){return V(t)?t:Us(t,e)?[t]:pb(mb(t))}var Ki=YO;var JO=1/0;function QO(t){if(typeof t=="string"||_n(t))return t;var e=t+"";return e=="0"&&1/t==-JO?"-0":e}var Fn=QO;function ZO(t,e){e=Ki(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Fn(e[r++])];return r&&r==n?t:void 0}var Hs=ZO;function e0(t,e,r){var n=t==null?void 0:Hs(t,e);return n===void 0?r:n}var hb=e0;function t0(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Ks=t0;var yb=Ut?Ut.isConcatSpreadable:void 0;function r0(t){return V(t)||Fi(t)||!!(yb&&t&&t[yb])}var gb=r0;function Tb(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=gb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?Tb(a,e-1,r,n,i):Ks(i,a):n||(i[i.length]=a)}return i}var Ws=Tb;function n0(t){var e=t==null?0:t.length;return e?Ws(t,1):[]}var Tt=n0;var i0=nf(Object.getPrototypeOf,Object),sf=i0;function o0(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var af=o0;function s0(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var vb=s0;function a0(){this.__data__=new Gi,this.size=0}var xb=a0;function l0(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var Rb=l0;function c0(t){return this.__data__.get(t)}var bb=c0;function u0(t){return this.__data__.has(t)}var Ab=u0;var f0=200;function d0(t,e){var r=this.__data__;if(r instanceof Gi){var n=r.__data__;if(!ji||n.length<f0-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Co(n)}return r.set(t,e),this.size=r.size,this}var Sb=d0;function Bs(t){var e=this.__data__=new Gi(t);this.size=e.size}Bs.prototype.clear=xb;Bs.prototype.delete=Rb;Bs.prototype.get=bb;Bs.prototype.has=Ab;Bs.prototype.set=Sb;var Wi=Bs;function p0(t,e){return t&&On(e,Ke(e),t)}var Cb=p0;function m0(t,e){return t&&On(e,Ui(e),t)}var wb=m0;var Nb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,$b=Nb&&typeof module=="object"&&module&&!module.nodeType&&module,h0=$b&&$b.exports===Nb,kb=h0?Et.Buffer:void 0,Eb=kb?kb.allocUnsafe:void 0;function y0(t,e){if(e)return t.slice();var r=t.length,n=Eb?Eb(r):new t.constructor(r);return t.copy(n),n}var _b=y0;function g0(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var zs=g0;function T0(){return[]}var lf=T0;var v0=Object.prototype,x0=v0.propertyIsEnumerable,Pb=Object.getOwnPropertySymbols,R0=Pb?function(t){return t==null?[]:(t=Object(t),zs(Pb(t),function(e){return x0.call(t,e)}))}:lf,Vs=R0;function b0(t,e){return On(t,Vs(t),e)}var Ib=b0;var A0=Object.getOwnPropertySymbols,S0=A0?function(t){for(var e=[];t;)Ks(e,Vs(t)),t=sf(t);return e}:lf,cf=S0;function C0(t,e){return On(t,cf(t),e)}var Db=C0;function w0(t,e,r){var n=e(t);return V(t)?n:Ks(n,r(t))}var uf=w0;function $0(t){return uf(t,Ke,Vs)}var vl=$0;function k0(t){return uf(t,Ui,cf)}var ff=k0;var E0=Cr(Et,"DataView"),df=E0;var N0=Cr(Et,"Promise"),pf=N0;var _0=Cr(Et,"Set"),Bi=_0;var Ob="[object Map]",P0="[object Object]",Lb="[object Promise]",Mb="[object Set]",Fb="[object WeakMap]",Ub="[object DataView]",I0=ci(df),D0=ci(ji),O0=ci(pf),L0=ci(Bi),M0=ci(Qu),wo=hr;(df&&wo(new df(new ArrayBuffer(1)))!=Ub||ji&&wo(new ji)!=Ob||pf&&wo(pf.resolve())!=Lb||Bi&&wo(new Bi)!=Mb||Qu&&wo(new Qu)!=Fb)&&(wo=function(t){var e=hr(t),r=e==P0?t.constructor:void 0,n=r?ci(r):"";if(n)switch(n){case I0:return Ub;case D0:return Ob;case O0:return Lb;case L0:return Mb;case M0:return Fb}return e});var gn=wo;var F0=Object.prototype,U0=F0.hasOwnProperty;function q0(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&U0.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var qb=q0;var G0=Et.Uint8Array,Xs=G0;function j0(t){var e=new t.constructor(t.byteLength);return new Xs(e).set(new Xs(t)),e}var Ys=j0;function H0(t,e){var r=e?Ys(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Gb=H0;var K0=/\w*$/;function W0(t){var e=new t.constructor(t.source,K0.exec(t));return e.lastIndex=t.lastIndex,e}var jb=W0;var Hb=Ut?Ut.prototype:void 0,Kb=Hb?Hb.valueOf:void 0;function B0(t){return Kb?Object(Kb.call(t)):{}}var Wb=B0;function z0(t,e){var r=e?Ys(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var Bb=z0;var V0="[object Boolean]",X0="[object Date]",Y0="[object Map]",J0="[object Number]",Q0="[object RegExp]",Z0="[object Set]",eL="[object String]",tL="[object Symbol]",rL="[object ArrayBuffer]",nL="[object DataView]",iL="[object Float32Array]",oL="[object Float64Array]",sL="[object Int8Array]",aL="[object Int16Array]",lL="[object Int32Array]",cL="[object Uint8Array]",uL="[object Uint8ClampedArray]",fL="[object Uint16Array]",dL="[object Uint32Array]";function pL(t,e,r){var n=t.constructor;switch(e){case rL:return Ys(t);case V0:case X0:return new n(+t);case nL:return Gb(t,r);case iL:case oL:case sL:case aL:case lL:case cL:case uL:case fL:case dL:return Bb(t,r);case Y0:return new n;case J0:case eL:return new n(t);case Q0:return jb(t);case Z0:return new n;case tL:return Wb(t)}}var zb=pL;function mL(t){return typeof t.constructor=="function"&&!Ln(t)?CR(sf(t)):{}}var Vb=mL;var hL="[object Map]";function yL(t){return gt(t)&&gn(t)==hL}var Xb=yL;var Yb=Qr&&Qr.isMap,gL=Yb?Mn(Yb):Xb,Jb=gL;var TL="[object Set]";function vL(t){return gt(t)&&gn(t)==TL}var Qb=vL;var Zb=Qr&&Qr.isSet,xL=Zb?Mn(Zb):Qb,eA=xL;var RL=1,bL=2,AL=4,tA="[object Arguments]",SL="[object Array]",CL="[object Boolean]",wL="[object Date]",$L="[object Error]",rA="[object Function]",kL="[object GeneratorFunction]",EL="[object Map]",NL="[object Number]",nA="[object Object]",_L="[object RegExp]",PL="[object Set]",IL="[object String]",DL="[object Symbol]",OL="[object WeakMap]",LL="[object ArrayBuffer]",ML="[object DataView]",FL="[object Float32Array]",UL="[object Float64Array]",qL="[object Int8Array]",GL="[object Int16Array]",jL="[object Int32Array]",HL="[object Uint8Array]",KL="[object Uint8ClampedArray]",WL="[object Uint16Array]",BL="[object Uint32Array]",We={};We[tA]=We[SL]=We[LL]=We[ML]=We[CL]=We[wL]=We[FL]=We[UL]=We[qL]=We[GL]=We[jL]=We[EL]=We[NL]=We[nA]=We[_L]=We[PL]=We[IL]=We[DL]=We[HL]=We[KL]=We[WL]=We[BL]=!0;We[$L]=We[rA]=We[OL]=!1;function mf(t,e,r,n,i,o){var s,a=e&RL,l=e&bL,c=e&AL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!at(t))return t;var u=V(t);if(u){if(s=qb(t),!a)return $R(t,s)}else{var f=gn(t),m=f==rA||f==kL;if(ui(t))return _b(t,a);if(f==nA||f==tA||m&&!i){if(s=l||m?{}:Vb(t),!a)return l?Db(t,wb(s,t)):Ib(t,Cb(s,t))}else{if(!We[f])return i?t:{};s=zb(t,f,a)}}o||(o=new Wi);var T=o.get(t);if(T)return T;o.set(t,s),eA(t)?t.forEach(function(N){s.add(mf(N,e,r,N,t,o))}):Jb(t)&&t.forEach(function(N,w){s.set(w,mf(N,e,r,w,t,o))});var A=c?l?ff:vl:l?Ui:Ke,C=u?void 0:A(t);return Zu(C||t,function(N,w){C&&(w=N,N=t[w]),Li(s,w,mf(N,e,r,w,t,o))}),s}var iA=mf;var zL=4;function VL(t){return iA(t,zL)}var Be=VL;function XL(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Un=XL;var YL="__lodash_hash_undefined__";function JL(t){return this.__data__.set(t,YL),this}var oA=JL;function QL(t){return this.__data__.has(t)}var sA=QL;function hf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Co;++e<r;)this.add(t[e])}hf.prototype.add=hf.prototype.push=oA;hf.prototype.has=sA;var Js=hf;function ZL(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var yf=ZL;function eM(t,e){return t.has(e)}var Qs=eM;var tM=1,rM=2;function nM(t,e,r,n,i,o){var s=r&tM,a=t.length,l=e.length;if(a!=l&&!(s&&l>a))return!1;var c=o.get(t),u=o.get(e);if(c&&u)return c==e&&u==t;var f=-1,m=!0,T=r&rM?new Js:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var A=t[f],C=e[f];if(n)var N=s?n(C,A,f,e,t,o):n(A,C,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!yf(e,function(w,v){if(!Qs(T,v)&&(A===w||i(A,w,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(A===C||i(A,C,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var gf=nM;function iM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var aA=iM;function oM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var Zs=oM;var sM=1,aM=2,lM="[object Boolean]",cM="[object Date]",uM="[object Error]",fM="[object Map]",dM="[object Number]",pM="[object RegExp]",mM="[object Set]",hM="[object String]",yM="[object Symbol]",gM="[object ArrayBuffer]",TM="[object DataView]",lA=Ut?Ut.prototype:void 0,Ih=lA?lA.valueOf:void 0;function vM(t,e,r,n,i,o,s){switch(r){case TM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case gM:return!(t.byteLength!=e.byteLength||!o(new Xs(t),new Xs(e)));case lM:case cM:case dM:return Dn(+t,+e);case uM:return t.name==e.name&&t.message==e.message;case pM:case hM:return t==e+"";case fM:var a=aA;case mM:var l=n&sM;if(a||(a=Zs),t.size!=e.size&&!l)return!1;var c=s.get(t);if(c)return c==e;n|=aM,s.set(t,e);var u=gf(a(t),a(e),n,i,o,s);return s.delete(t),u;case yM:if(Ih)return Ih.call(t)==Ih.call(e)}return!1}var cA=vM;var xM=1,RM=Object.prototype,bM=RM.hasOwnProperty;function AM(t,e,r,n,i,o){var s=r&xM,a=vl(t),l=a.length,c=vl(e),u=c.length;if(l!=u&&!s)return!1;for(var f=l;f--;){var m=a[f];if(!(s?m in e:bM.call(e,m)))return!1}var T=o.get(t),A=o.get(e);if(T&&A)return T==e&&A==t;var C=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<l;){m=a[f];var w=t[m],v=e[m];if(n)var g=s?n(v,w,m,e,t,o):n(w,v,m,t,e,o);if(!(g===void 0?w===v||i(w,v,r,n,o):g)){C=!1;break}N||(N=m=="constructor")}if(C&&!N){var E=t.constructor,D=e.constructor;E!=D&&"constructor"in t&&"constructor"in e&&!(typeof E=="function"&&E instanceof E&&typeof D=="function"&&D instanceof D)&&(C=!1)}return o.delete(t),o.delete(e),C}var uA=AM;var SM=1,fA="[object Arguments]",dA="[object Array]",Tf="[object Object]",CM=Object.prototype,pA=CM.hasOwnProperty;function wM(t,e,r,n,i,o){var s=V(t),a=V(e),l=s?dA:gn(t),c=a?dA:gn(e);l=l==fA?Tf:l,c=c==fA?Tf:c;var u=l==Tf,f=c==Tf,m=l==c;if(m&&ui(t)){if(!ui(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new Wi),s||Fs(t)?gf(t,e,r,n,i,o):cA(t,e,l,r,n,i,o);if(!(r&SM)){var T=u&&pA.call(t,"__wrapped__"),A=f&&pA.call(e,"__wrapped__");if(T||A){var C=T?t.value():t,N=A?e.value():e;return o||(o=new Wi),i(C,N,r,n,o)}}return m?(o||(o=new Wi),uA(t,e,r,n,i,o)):!1}var mA=wM;function hA(t,e,r,n,i){return t===e?!0:t==null||e==null||!gt(t)&&!gt(e)?t!==t&&e!==e:mA(t,e,r,n,hA,i)}var vf=hA;var $M=1,kM=2;function EM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var l=a[0],c=t[l],u=a[1];if(s&&a[2]){if(c===void 0&&!(l in t))return!1}else{var f=new Wi;if(n)var m=n(c,u,l,t,e,f);if(!(m===void 0?vf(u,c,$M|kM,n,f):m))return!1}}return!0}var yA=EM;function NM(t){return t===t&&!at(t)}var xf=NM;function _M(t){for(var e=Ke(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,xf(i)]}return e}var gA=_M;function PM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Rf=PM;function IM(t){var e=gA(t);return e.length==1&&e[0][2]?Rf(e[0][0],e[0][1]):function(r){return r===t||yA(r,t,e)}}var TA=IM;function DM(t,e){return t!=null&&e in Object(t)}var vA=DM;function OM(t,e,r){e=Ki(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Fn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Ms(i)&&Oi(s,i)&&(V(t)||Fi(t)))}var bf=OM;function LM(t,e){return t!=null&&bf(t,e,vA)}var xA=LM;var MM=1,FM=2;function UM(t,e){return Us(t)&&xf(e)?Rf(Fn(t),e):function(r){var n=hb(r,t);return n===void 0&&n===e?xA(r,t):vf(e,n,MM|FM)}}var RA=UM;function qM(t){return function(e){return e?.[t]}}var bA=qM;function GM(t){return function(e){return Hs(e,t)}}var AA=GM;function jM(t){return Us(t)?bA(Fn(t)):AA(t)}var SA=jM;function HM(t){return typeof t=="function"?t:t==null?Sr:typeof t=="object"?V(t)?RA(t[0],t[1]):TA(t):SA(t)}var mt=HM;function KM(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var CA=KM;function WM(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var l=s[t?a:++i];if(r(o[l],l,o)===!1)break}return e}}var wA=WM;var BM=wA(),$A=BM;function zM(t,e){return t&&$A(t,e,Ke)}var kA=zM;function VM(t,e){return function(r,n){if(r==null)return r;if(!Nt(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var EA=VM;var XM=EA(kA),wr=XM;function YM(t,e,r,n){return wr(t,function(i,o,s){e(n,i,r(i),s)}),n}var NA=YM;function JM(t,e){return function(r,n){var i=V(r)?CA:NA,o=e?e():{};return i(r,t,mt(n,2),o)}}var _A=JM;var PA=Object.prototype,QM=PA.hasOwnProperty,ZM=Ls(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Mi(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Ui(o),a=-1,l=s.length;++a<l;){var c=s[a],u=t[c];(u===void 0||Dn(u,PA[c])&&!QM.call(t,c))&&(t[c]=o[c])}return t}),ea=ZM;function eF(t){return gt(t)&&Nt(t)}var Dh=eF;function tF(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Af=tF;var rF=200;function nF(t,e,r,n){var i=-1,o=tf,s=!0,a=t.length,l=[],c=e.length;if(!a)return l;r&&(e=Pn(e,Mn(r))),n?(o=Af,s=!1):e.length>=rF&&(o=Qs,s=!1,e=new Js(e));e:for(;++i<a;){var u=t[i],f=r==null?u:r(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=c;m--;)if(e[m]===f)continue e;l.push(u)}else o(e,f,n)||l.push(u)}return l}var IA=nF;var iF=Ls(function(t,e){return Dh(t)?IA(t,Ws(e,1,Dh,!0)):[]}),zi=iF;function oF(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var qn=oF;function sF(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:In(e),af(t,e<0?0:e,n)):[]}var vt=sF;function aF(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:In(e),e=n-e,af(t,0,e<0?0:e)):[]}var di=aF;function lF(t){return typeof t=="function"?t:Sr}var DA=lF;function cF(t,e){var r=V(t)?Zu:wr;return r(t,DA(e))}var G=cF;function uF(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var OA=uF;function fF(t,e){var r=!0;return wr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var LA=fF;function dF(t,e,r){var n=V(t)?OA:LA;return r&&Mi(t,e,r)&&(e=void 0),n(t,mt(e,3))}var lr=dF;function pF(t,e){var r=[];return wr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var Sf=pF;function mF(t,e){var r=V(t)?zs:Sf;return r(t,mt(e,3))}var qt=mF;function hF(t){return function(e,r,n){var i=Object(e);if(!Nt(e)){var o=mt(r,3);e=Ke(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var MA=hF;var yF=Math.max;function gF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:In(r);return i<0&&(i=yF(n+i,0)),ef(t,mt(e,3),i)}var FA=gF;var TF=MA(FA),Gn=TF;function vF(t){return t&&t.length?t[0]:void 0}var Gt=vF;function xF(t,e){var r=-1,n=Nt(t)?Array(t.length):[];return wr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var UA=xF;function RF(t,e){var r=V(t)?Pn:UA;return r(t,mt(e,3))}var L=RF;function bF(t,e){return Ws(L(t,e),1)}var Zt=bF;var AF=Object.prototype,SF=AF.hasOwnProperty,CF=_A(function(t,e,r){SF.call(t,r)?t[r].push(e):Os(t,r,[e])}),Oh=CF;var wF=Object.prototype,$F=wF.hasOwnProperty;function kF(t,e){return t!=null&&$F.call(t,e)}var qA=kF;function EF(t,e){return t!=null&&bf(t,e,qA)}var B=EF;var NF="[object String]";function _F(t){return typeof t=="string"||!V(t)&&gt(t)&&hr(t)==NF}var Ot=_F;function PF(t,e){return Pn(e,function(r){return t[r]})}var GA=PF;function IF(t){return t==null?[]:GA(t,Ke(t))}var De=IF;var DF=Math.max;function OF(t,e,r,n){t=Nt(t)?t:De(t),r=r&&!n?In(r):0;var i=t.length;return r<0&&(r=DF(i+r,0)),Ot(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ds(t,e,r)>-1}var tt=OF;var LF=Math.max;function MF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:In(r);return i<0&&(i=LF(n+i,0)),Ds(t,e,i)}var Cf=MF;var FF="[object Map]",UF="[object Set]",qF=Object.prototype,GF=qF.hasOwnProperty;function jF(t){if(t==null)return!0;if(Nt(t)&&(V(t)||typeof t=="string"||typeof t.splice=="function"||ui(t)||Fs(t)||Fi(t)))return!t.length;var e=gn(t);if(e==FF||e==UF)return!t.size;if(Ln(t))return!of(t).length;for(var r in t)if(GF.call(t,r))return!1;return!0}var ae=jF;var HF="[object RegExp]";function KF(t){return gt(t)&&hr(t)==HF}var jA=KF;var HA=Qr&&Qr.isRegExp,WF=HA?Mn(HA):jA,Zr=WF;function BF(t){return t===void 0}var cr=BF;function zF(t,e){return t<e}var KA=zF;function VF(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!_n(s):r(s,a)))var a=s,l=o}return l}var WA=VF;function XF(t){return t&&t.length?WA(t,Sr,KA):void 0}var BA=XF;var YF="Expected a function";function JF(t){if(typeof t!="function")throw new TypeError(YF);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var zA=JF;function QF(t,e,r,n){if(!at(t))return t;e=Ki(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var l=Fn(e[i]),c=r;if(l==="__proto__"||l==="constructor"||l==="prototype")return t;if(i!=s){var u=a[l];c=n?n(u,l,a):void 0,c===void 0&&(c=at(u)?u:Oi(e[i+1])?[]:{})}Li(a,l,c),a=a[l]}return t}var VA=QF;function ZF(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Hs(t,s);r(a,s)&&VA(o,Ki(s,t),a)}return o}var XA=ZF;function e1(t,e){if(t==null)return{};var r=Pn(ff(t),function(n){return[n]});return e=mt(e),XA(t,r,function(n,i){return e(n,i[0])})}var $r=e1;function t1(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var YA=t1;function r1(t,e,r){var n=V(t)?vb:YA,i=arguments.length<3;return n(t,mt(e,4),r,i,wr)}var ct=r1;function n1(t,e){var r=V(t)?zs:Sf;return r(t,zA(mt(e,3)))}var Vi=n1;function i1(t,e){var r;return wr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var JA=i1;function o1(t,e,r){var n=V(t)?yf:JA;return r&&Mi(t,e,r)&&(e=void 0),n(t,mt(e,3))}var xl=o1;var s1=1/0,a1=Bi&&1/Zs(new Bi([,-0]))[1]==s1?function(t){return new Bi(t)}:lt,QA=a1;var l1=200;function c1(t,e,r){var n=-1,i=tf,o=t.length,s=!0,a=[],l=a;if(r)s=!1,i=Af;else if(o>=l1){var c=e?null:QA(t);if(c)return Zs(c);s=!1,i=Qs,l=new Js}else l=e?[]:a;e:for(;++n<o;){var u=t[n],f=e?e(u):u;if(u=r||u!==0?u:0,s&&f===f){for(var m=l.length;m--;)if(l[m]===f)continue e;e&&l.push(f),a.push(u)}else i(l,f,r)||(l!==a&&l.push(f),a.push(u))}return a}var wf=c1;function u1(t){return t&&t.length?wf(t):[]}var ta=u1;function f1(t,e){return t&&t.length?wf(t,mt(e,2)):[]}var ZA=f1;function ra(t){console&&console.error&&console.error(`Error: ${t}`)}function Rl(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function bl(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Al(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function d1(t){return p1(t)?t.LABEL:t.name}function p1(t){return Ot(t.LABEL)&&t.LABEL!==""}var qr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},$e=class extends qr{constructor(e){super([]),this.idx=1,Qt(this,$r(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},gr=class extends qr{constructor(e){super(e.definition),this.orgText="",Qt(this,$r(e,r=>r!==void 0))}},ze=class extends qr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Qt(this,$r(e,r=>r!==void 0))}},ke=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,$r(e,r=>r!==void 0))}},Ve=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,$r(e,r=>r!==void 0))}},Xe=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,$r(e,r=>r!==void 0))}},me=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,$r(e,r=>r!==void 0))}},Fe=class extends qr{constructor(e){super(e.definition),this.idx=1,Qt(this,$r(e,r=>r!==void 0))}},Ue=class extends qr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Qt(this,$r(e,r=>r!==void 0))}},le=class{constructor(e){this.idx=1,Qt(this,$r(e,r=>r!==void 0))}accept(e){e.visit(this)}};function $f(t){return L(t,na)}function na(t){function e(r){return L(r,na)}if(t instanceof $e){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Ot(t.label)&&(r.label=t.label),r}else{if(t instanceof ze)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Xe)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:na(new le({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Fe)return{type:"RepetitionWithSeparator",idx:t.idx,separator:na(new le({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof me)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Ue)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof le){let r={type:"Terminal",name:t.terminalType.name,label:d1(t.terminalType),idx:t.idx};Ot(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=Zr(n)?n.source:n),r}else{if(t instanceof gr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var Tr=class{visit(e){let r=e;switch(r.constructor){case $e:return this.visitNonTerminal(r);case ze:return this.visitAlternative(r);case ke:return this.visitOption(r);case Ve:return this.visitRepetitionMandatory(r);case Xe:return this.visitRepetitionMandatoryWithSeparator(r);case Fe:return this.visitRepetitionWithSeparator(r);case me:return this.visitRepetition(r);case Ue:return this.visitAlternation(r);case le:return this.visitTerminal(r);case gr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Lh(t){return t instanceof ze||t instanceof ke||t instanceof me||t instanceof Ve||t instanceof Xe||t instanceof Fe||t instanceof le||t instanceof gr}function $o(t,e=[]){return t instanceof ke||t instanceof me||t instanceof Fe?!0:t instanceof Ue?xl(t.definition,n=>$o(n,e)):t instanceof $e&&tt(e,t)?!1:t instanceof qr?(t instanceof $e&&e.push(t),lr(t.definition,n=>$o(n,e))):!1}function Mh(t){return t instanceof Ue}function kr(t){if(t instanceof $e)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof me)return"MANY";if(t instanceof le)return"CONSUME";throw Error("non exhaustive match")}var pi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=vt(e.definition,i+1);if(n instanceof $e)this.walkProdRef(n,o,r);else if(n instanceof le)this.walkTerminal(n,o,r);else if(n instanceof ze)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof Ve)this.walkAtLeastOne(n,o,r);else if(n instanceof Xe)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Fe)this.walkManySep(n,o,r);else if(n instanceof me)this.walkMany(n,o,r);else if(n instanceof Ue)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=eS(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=eS(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new ze({definition:[o]});this.walk(s,i)})}};function eS(t,e,r){return[new ke({definition:[new le({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function ko(t){if(t instanceof $e)return ko(t.referencedRule);if(t instanceof le)return y1(t);if(Lh(t))return m1(t);if(Mh(t))return h1(t);throw Error("non exhaustive match")}function m1(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=$o(o),e=e.concat(ko(o)),n=n+1,i=r.length>n;return ta(e)}function h1(t){let e=L(t.definition,r=>ko(r));return ta(Tt(e))}function y1(t){return[t.terminalType]}var kf="_~IN~_";var Fh=class extends pi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=g1(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new ze({definition:o}),a=ko(s);this.follows[i]=a}};function tS(t){let e={};return G(t,r=>{let n=new Fh(r).startWalking();Qt(e,n)}),e}function g1(t,e){return t.name+e+kf}var Ef={},T1=new vo;function ia(t){let e=t.toString();if(Ef.hasOwnProperty(e))return Ef[e];{let r=T1.pattern(e);return Ef[e]=r,r}}function rS(){Ef={}}var iS="Complement Sets are not supported for first char optimization",Sl=`Unable to use "first char" lexer optimizations:
`;function oS(t,e=!1){try{let r=ia(t);return Uh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===iS)e&&Rl(`${Sl}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ra(`${Sl}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Uh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Uh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Nf(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(iS);G(s.value,l=>{if(typeof l=="number")Nf(l,e,r);else{let c=l;if(r===!0)for(let u=c.from;u<=c.to;u++)Nf(u,e,r);else{for(let u=c.from;u<=c.to&&u<oa;u++)Nf(u,e,r);if(c.to>=oa){let u=c.from>=oa?c.from:oa,f=c.to,m=jn(u),T=jn(f);for(let A=m;A<=T;A++)e[A]=A}}}});break;case"Group":Uh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&qh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return De(e)}function Nf(t,e,r){let n=jn(t);e[n]=n,r===!0&&v1(t,e)}function v1(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=jn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=jn(i.charCodeAt(0));e[o]=o}}}function nS(t,e){return Gn(t.value,r=>{if(typeof r=="number")return tt(e,r);{let n=r;return Gn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function qh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?V(t.value)?lr(t.value,qh):qh(t.value):!1}var Gh=class extends En{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){tt(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?nS(e,this.targetCharCodes)===void 0&&(this.found=!0):nS(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function _f(t,e){if(e instanceof RegExp){let r=ia(e),n=new Gh(t);return n.visit(r),n.found}else return Gn(e,r=>tt(t,r.charCodeAt(0)))!==void 0}var Eo="PATTERN",sa="defaultMode",Pf="modes",Hh=typeof new RegExp("(?:)").sticky=="boolean";function lS(t,e){e=ea(e,{useSticky:Hh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,g)=>g()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{M1()});let n;r("Reject Lexer.NA",()=>{n=Vi(t,v=>v[Eo]===ht.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let g=v[Eo];if(Zr(g)){let E=g.source;return E.length===1&&E!=="^"&&E!=="$"&&E!=="."&&!g.ignoreCase?E:E.length===2&&E[0]==="\\"&&!tt(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],E[1])?E[1]:e.useSticky?aS(g):sS(g)}else{if(yr(g))return i=!0,{exec:g};if(typeof g=="object")return i=!0,g;if(typeof g=="string"){if(g.length===1)return g;{let E=g.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp(E);return e.useSticky?aS(D):sS(D)}}else throw Error("non exhaustive match")}})});let s,a,l,c,u;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let g=v.GROUP;if(g!==ht.SKIPPED){if(Ot(g))return g;if(cr(g))return!1;throw Error("non exhaustive match")}}),l=L(n,v=>{let g=v.LONGER_ALT;if(g)return V(g)?L(g,D=>Cf(n,D)):[Cf(n,g)]}),c=L(n,v=>v.PUSH_MODE),u=L(n,v=>B(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=yS(e.lineTerminatorCharacters);f=L(n,g=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,g=>B(g,"LINE_BREAKS")?!!g.LINE_BREAKS:hS(g,v)===!1&&_f(v,g.PATTERN)))});let m,T,A,C;r("Misc Mapping #2",()=>{m=L(n,pS),T=L(o,O1),A=ct(n,(v,g)=>{let E=g.GROUP;return Ot(E)&&E!==ht.SKIPPED&&(v[E]=[]),v},{}),C=L(o,(v,g)=>({pattern:o[g],longerAlt:l[g],canLineTerminator:f[g],isCustom:m[g],short:T[g],group:a[g],push:c[g],pop:u[g],tokenTypeIdx:s[g],tokenType:n[g]}))});let N=!0,w=[];return e.safeMode||r("First Char Optimization",()=>{w=ct(n,(v,g,E)=>{if(typeof g.PATTERN=="string"){let D=g.PATTERN.charCodeAt(0),Y=jn(D);jh(v,Y,C[E])}else if(V(g.START_CHARS_HINT)){let D;G(g.START_CHARS_HINT,Y=>{let Te=typeof Y=="string"?Y.charCodeAt(0):Y,Ee=jn(Te);D!==Ee&&(D=Ee,jh(v,Ee,C[E]))})}else if(Zr(g.PATTERN))if(g.PATTERN.unicode)N=!1,e.ensureOptimizations&&ra(`${Sl}	Unable to analyze < ${g.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=oS(g.PATTERN,e.ensureOptimizations);ae(D)&&(N=!1),G(D,Y=>{jh(v,Y,C[E])})}else e.ensureOptimizations&&ra(`${Sl}	TokenType: <${g.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:A,patternIdxToConfig:C,charCodeToPatternIdxToConfig:w,hasCustom:i,canBeOptimized:N}}function cS(t,e){let r=[],n=R1(t);r=r.concat(n.errors);let i=b1(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(x1(o)),r=r.concat(N1(o)),r=r.concat(_1(o,e)),r=r.concat(P1(o)),r}function x1(t){let e=[],r=qt(t,n=>Zr(n[Eo]));return e=e.concat(S1(r)),e=e.concat($1(r)),e=e.concat(k1(r)),e=e.concat(E1(r)),e=e.concat(C1(r)),e}function R1(t){let e=qt(t,i=>!B(i,Eo)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:rt.MISSING_PATTERN,tokenTypes:[i]})),n=zi(t,e);return{errors:r,valid:n}}function b1(t){let e=qt(t,i=>{let o=i[Eo];return!Zr(o)&&!yr(o)&&!B(o,"exec")&&!Ot(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:rt.INVALID_PATTERN,tokenTypes:[i]})),n=zi(t,e);return{errors:r,valid:n}}var A1=/[^\\][$]/;function S1(t){class e extends En{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=ia(o),a=new e;return a.visit(s),a.found}catch{return A1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function C1(t){let e=qt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:rt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var w1=/[^\\[][\^]|^\^/;function $1(t){class e extends En{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=ia(o),a=new e;return a.visit(s),a.found}catch{return w1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function k1(t){let e=qt(t,n=>{let i=n[Eo];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:rt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function E1(t){let e=[],r=L(t,o=>ct(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!tt(e,a)&&a.PATTERN!==ht.NA&&(e.push(a),s.push(a)),s),[]));r=Un(r);let n=qt(r,o=>o.length>1);return L(n,o=>{let s=L(o,l=>l.name);return{message:`The same RegExp pattern ->${Gt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:rt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function N1(t){let e=qt(t,n=>{if(!B(n,"GROUP"))return!1;let i=n.GROUP;return i!==ht.SKIPPED&&i!==ht.NA&&!Ot(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:rt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function _1(t,e){let r=qt(t,i=>i.PUSH_MODE!==void 0&&!tt(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:rt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function P1(t){let e=[],r=ct(t,(n,i,o)=>{let s=i.PATTERN;return s===ht.NA||(Ot(s)?n.push({str:s,idx:o,tokenType:i}):Zr(s)&&D1(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&I1(o,n.PATTERN)){let l=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:rt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function I1(t,e){if(Zr(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(yr(e))return e(t,0,[],{});if(B(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function D1(t){return Gn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function sS(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function aS(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function uS(t,e,r){let n=[];return B(t,sa)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+sa+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),B(t,Pf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Pf+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),B(t,Pf)&&B(t,sa)&&!B(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${sa}: <${t.defaultMode}>which does not exist
`,type:rt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),B(t,Pf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(cr(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:rt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(B(s,"LONGER_ALT")){let l=V(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(l,c=>{!cr(c)&&!tt(i,c)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${c.name}> on token <${s.name}> outside of mode <${o}>
`,type:rt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function fS(t,e,r){let n=[],i=!1,o=Un(Tt(De(t.modes))),s=Vi(o,l=>l[Eo]===ht.NA),a=yS(r);return e&&G(s,l=>{let c=hS(l,a);if(c!==!1){let f={message:L1(l,c),type:c.issue,tokenType:l};n.push(f)}else B(l,"LINE_BREAKS")?l.LINE_BREAKS===!0&&(i=!0):_f(a,l.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:rt.NO_LINE_BREAKS_FLAGS}),n}function dS(t){let e={},r=Ke(t);return G(r,n=>{let i=t[n];if(V(i))e[n]=[];else throw Error("non exhaustive match")}),e}function pS(t){let e=t.PATTERN;if(Zr(e))return!1;if(yr(e))return!0;if(B(e,"exec"))return!0;if(Ot(e))return!1;throw Error("non exhaustive match")}function O1(t){return Ot(t)&&t.length===1?t.charCodeAt(0):!1}var mS={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function hS(t,e){if(B(t,"LINE_BREAKS"))return!1;if(Zr(t.PATTERN)){try{_f(e,t.PATTERN)}catch(r){return{issue:rt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Ot(t.PATTERN))return!1;if(pS(t))return{issue:rt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function L1(t,e){if(e.issue===rt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===rt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function yS(t){return L(t,r=>Ot(r)?r.charCodeAt(0):r)}function jh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var oa=256,If=[];function jn(t){return t<oa?t:If[t]}function M1(){if(ae(If)){If=new Array(65536);for(let t=0;t<65536;t++)If[t]=t>255?255+~~(t/255):t}}function mi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function aa(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var gS=1,vS={};function hi(t){let e=F1(t);U1(e),G1(e),q1(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function F1(t){let e=Be(t),r=t,n=!0;for(;n;){r=Un(Tt(L(r,o=>o.CATEGORIES)));let i=zi(r,e);e=e.concat(i),ae(i)?n=!1:r=i}return e}function U1(t){G(t,e=>{Kh(e)||(vS[gS]=e,e.tokenTypeIdx=gS++),TS(e)&&!V(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),TS(e)||(e.CATEGORIES=[]),j1(e)||(e.categoryMatches=[]),H1(e)||(e.categoryMatchesMap={})})}function q1(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(vS[n].tokenTypeIdx)})})}function G1(t){G(t,e=>{xS([],e)})}function xS(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);tt(n,r)||xS(n,r)})}function Kh(t){return B(t,"tokenTypeIdx")}function TS(t){return B(t,"CATEGORIES")}function j1(t){return B(t,"categoryMatches")}function H1(t){return B(t,"categoryMatchesMap")}function RS(t){return B(t,"tokenTypeIdx")}var Wh={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var rt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(rt||(rt={}));var Cl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Wh,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Cl);var ht=class{constructor(e,r=Cl){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:l}=bl(o),c=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&c(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,l}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Qt({},Cl,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Cl.lineTerminatorsPattern)this.config.lineTerminatorsPattern=mS;else if(this.config.lineTerminatorCharacters===Cl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),V(e)?i={modes:{defaultMode:Be(e)},defaultMode:sa}:(o=!1,i=Be(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(uS(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(fS(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,l)=>{i.modes[l]=Vi(a,c=>cr(c))});let s=Ke(i.modes);if(G(i.modes,(a,l)=>{this.TRACE_INIT(`Mode: <${l}> processing`,()=>{if(this.modes.push(l),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(cS(a,s))}),ae(this.lexerDefinitionErrors)){hi(a);let c;this.TRACE_INIT("analyzeTokenTypes",()=>{c=lS(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[l]=c.patternIdxToConfig,this.charCodeToPatternIdxToConfig[l]=c.charCodeToPatternIdxToConfig,this.emptyGroups=Qt({},this.emptyGroups,c.emptyGroups),this.hasCustom=c.hasCustom||this.hasCustom,this.canModeBeOptimized[l]=c.canBeOptimized}})}),this.defaultMode=i.defaultMode,!ae(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let l=L(this.lexerDefinitionErrors,c=>c.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}G(this.lexerDefinitionWarning,a=>{Rl(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Hh?(this.chopInput=Sr,this.match=this.matchWithTest):(this.updateLastIndex=lt,this.match=this.matchWithExec),o&&(this.handleModes=lt),this.trackStartLines===!1&&(this.computeNewColumn=Sr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=lt),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=ct(this.canModeBeOptimized,(l,c,u)=>(c===!1&&l.push(u),l),[]);if(r.ensureOptimizations&&!ae(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{rS()}),this.TRACE_INIT("toFastProperties",()=>{Al(this)})})}tokenize(e,r=this.defaultMode){if(!ae(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,l,c,u,f,m,T,A,C,N,w,v,g=e,E=g.length,D=0,Y=0,Te=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(Te),Ht=[],xt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,S=dS(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,te=[],Z=[],Rt=[],ut=[];Object.freeze(ut);let he;function Er(){return te}function Hn(bt){let er=jn(bt),Rn=Z[er];return Rn===void 0?ut:Rn}let Ra=bt=>{if(Rt.length===1&&bt.tokenType.PUSH_MODE===void 0){let er=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(bt);Ht.push({offset:bt.startOffset,line:bt.startLine,column:bt.startColumn,length:bt.image.length,message:er})}else{Rt.pop();let er=qn(Rt);te=this.patternIdxToConfig[er],Z=this.charCodeToPatternIdxToConfig[er],ce=te.length;let Rn=this.canModeBeOptimized[er]&&this.config.safeMode===!1;Z&&Rn?he=Hn:he=Er}};function Qi(bt){Rt.push(bt),Z=this.charCodeToPatternIdxToConfig[bt],te=this.patternIdxToConfig[bt],ce=te.length,ce=te.length;let er=this.canModeBeOptimized[bt]&&this.config.safeMode===!1;Z&&er?he=Hn:he=Er}Qi.call(this,r);let ur,Mo=this.config.recoveryEnabled;for(;D<E;){l=null;let bt=g.charCodeAt(D),er=he(bt),Rn=er.length;for(n=0;n<Rn;n++){ur=er[n];let Kt=ur.pattern;c=null;let ft=ur.short;if(ft!==!1?bt===ft&&(l=Kt):ur.isCustom===!0?(v=Kt.exec(g,D,Ee,S),v!==null?(l=v[0],v.payload!==void 0&&(c=v.payload)):l=null):(this.updateLastIndex(Kt,D),l=this.match(Kt,e,D)),l!==null){if(a=ur.longerAlt,a!==void 0){let Gr=a.length;for(o=0;o<Gr;o++){let Nr=te[a[o]],xr=Nr.pattern;if(u=null,Nr.isCustom===!0?(v=xr.exec(g,D,Ee,S),v!==null?(s=v[0],v.payload!==void 0&&(u=v.payload)):s=null):(this.updateLastIndex(xr,D),s=this.match(xr,e,D)),s&&s.length>l.length){l=s,c=u,ur=Nr;break}}}break}}if(l!==null){if(f=l.length,m=ur.group,m!==void 0&&(T=ur.tokenTypeIdx,A=this.createTokenInstance(l,D,T,ur.tokenType,xt,M,f),this.handlePayload(A,c),m===!1?Y=this.addToken(Ee,Y,A):S[m].push(A)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&ur.canLineTerminator===!0){let Kt=0,ft,Gr;j.lastIndex=0;do ft=j.test(l),ft===!0&&(Gr=j.lastIndex-1,Kt++);while(ft===!0);Kt!==0&&(xt=xt+Kt,M=f-Gr,this.updateTokenEndLineColumnLocation(A,m,Gr,Kt,xt,M,f))}this.handleModes(ur,Ra,Qi,A)}else{let Kt=D,ft=xt,Gr=M,Nr=Mo===!1;for(;Nr===!1&&D<E;)for(e=this.chopInput(e,1),D++,i=0;i<ce;i++){let xr=te[i],Zi=xr.pattern,xi=xr.short;if(xi!==!1?g.charCodeAt(D)===xi&&(Nr=!0):xr.isCustom===!0?Nr=Zi.exec(g,D,Ee,S)!==null:(this.updateLastIndex(Zi,D),Nr=Zi.exec(e)!==null),Nr===!0)break}if(C=D-Kt,M=this.computeNewColumn(M,C),w=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g,Kt,C,ft,Gr),Ht.push({offset:Kt,line:ft,column:Gr,length:C,message:w}),Mo===!1)break}}return this.hasCustom||(Ee.length=Y),{tokens:Ee,groups:S,errors:Ht}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let l,c;r!==void 0&&(l=n===a-1,c=l?-1:0,i===1&&l===!0||(e.endLine=o+c,e.endColumn=s-1+-c))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};ht.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";ht.NA=/NOT_APPLICABLE/;function yi(t){return Bh(t)?t.LABEL:t.name}function Bh(t){return Ot(t.LABEL)&&t.LABEL!==""}var K1="parent",bS="categories",AS="label",SS="group",CS="push_mode",wS="pop_mode",$S="longer_alt",kS="line_breaks",ES="start_chars_hint";function Df(t){return W1(t)}function W1(t){let e=t.pattern,r={};if(r.name=t.name,cr(e)||(r.PATTERN=e),B(t,K1))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return B(t,bS)&&(r.CATEGORIES=t[bS]),hi([r]),B(t,AS)&&(r.LABEL=t[AS]),B(t,SS)&&(r.GROUP=t[SS]),B(t,wS)&&(r.POP_MODE=t[wS]),B(t,CS)&&(r.PUSH_MODE=t[CS]),B(t,$S)&&(r.LONGER_ALT=t[$S]),B(t,kS)&&(r.LINE_BREAKS=t[kS]),B(t,ES)&&(r.START_CHARS_HINT=t[ES]),r}var Tn=Df({name:"EOF",pattern:ht.NA});hi([Tn]);function No(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function wl(t,e){return mi(t,e)}var gi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${Bh(t)?`--> ${yi(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+Gt(e).image+"'";if(n)return o+n+a;{let l=ct(t,(m,T)=>m.concat(T),[]),c=L(l,m=>`[${L(m,T=>yi(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(c,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+Gt(e).image+"'";if(r)return i+r+s;{let l=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,c=>`[${L(c,u=>yi(u)).join(",")}]`).join(" ,")}>`;return i+l+s}}};Object.freeze(gi);var NS={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},vn={buildDuplicateFoundError(t,e){function r(u){return u instanceof le?u.terminalType.name:u instanceof $e?u.nonTerminalName:""}let n=t.name,i=Gt(e),o=i.idx,s=kr(i),a=r(i),l=o>0,c=`->${s}${l?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return c=c.replace(/[ \t]+/g," "),c=c.replace(/\s\s+/g,`
`),c},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
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
For Further details.`,n},buildEmptyRepetitionError(t){let e=kr(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof gr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function _S(t,e){let r=new zh(t,e);return r.resolveRefs(),r.errors}var zh=class extends Tr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(De(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Lt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var Vh=class extends pi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Be(this.path.ruleStack).reverse(),this.occurrenceStack=Be(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){ae(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Of=class extends Vh{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new ze({definition:i});this.possibleTokTypes=ko(o),this.found=!0}}},la=class extends pi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Lf=class extends la{walkMany(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof le&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},$l=class extends la{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof le&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Mf=class extends la{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof le&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},kl=class extends la{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof le&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function Ff(t,e,r=[]){r=Be(r);let n=[],i=0;function o(a){return a.concat(vt(t,i+1))}function s(a){let l=Ff(o(a),e,r);return n.concat(l)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof ze)return s(a.definition);if(a instanceof $e)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof Ve){let l=a.definition.concat([new me({definition:a.definition})]);return s(l)}else if(a instanceof Xe){let l=[new ze({definition:a.definition}),new me({definition:[new le({terminalType:a.separator})].concat(a.definition)})];return s(l)}else if(a instanceof Fe){let l=a.definition.concat([new me({definition:[new le({terminalType:a.separator})].concat(a.definition)})]);n=s(l)}else if(a instanceof me){let l=a.definition.concat([new me({definition:a.definition})]);n=s(l)}else{if(a instanceof Ue)return G(a.definition,l=>{ae(l.definition)===!1&&(n=s(l.definition))}),n;if(a instanceof le)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:vt(t,i)}),n}function Uf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,l=e.length,c=l-n-1,u=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!ae(f);){let m=f.pop();if(m===s){a&&qn(f).idx<=c&&f.pop();continue}let T=m.def,A=m.idx,C=m.ruleStack,N=m.occurrenceStack;if(ae(T))continue;let w=T[0];if(w===i){let v={idx:A,def:vt(T),ruleStack:di(C),occurrenceStack:di(N)};f.push(v)}else if(w instanceof le)if(A<l-1){let v=A+1,g=e[v];if(r(g,w.terminalType)){let E={idx:v,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(E)}}else if(A===l-1)u.push({nextTokenType:w.terminalType,nextTokenOccurrence:w.idx,ruleStack:C,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(w instanceof $e){let v=Be(C);v.push(w.nonTerminalName);let g=Be(N);g.push(w.idx);let E={idx:A,def:w.definition.concat(o,vt(T)),ruleStack:v,occurrenceStack:g};f.push(E)}else if(w instanceof ke){let v={idx:A,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(v),f.push(s);let g={idx:A,def:w.definition.concat(vt(T)),ruleStack:C,occurrenceStack:N};f.push(g)}else if(w instanceof Ve){let v=new me({definition:w.definition,idx:w.idx}),g=w.definition.concat([v],vt(T)),E={idx:A,def:g,ruleStack:C,occurrenceStack:N};f.push(E)}else if(w instanceof Xe){let v=new le({terminalType:w.separator}),g=new me({definition:[v].concat(w.definition),idx:w.idx}),E=w.definition.concat([g],vt(T)),D={idx:A,def:E,ruleStack:C,occurrenceStack:N};f.push(D)}else if(w instanceof Fe){let v={idx:A,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(v),f.push(s);let g=new le({terminalType:w.separator}),E=new me({definition:[g].concat(w.definition),idx:w.idx}),D=w.definition.concat([E],vt(T)),Y={idx:A,def:D,ruleStack:C,occurrenceStack:N};f.push(Y)}else if(w instanceof me){let v={idx:A,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(v),f.push(s);let g=new me({definition:w.definition,idx:w.idx}),E=w.definition.concat([g],vt(T)),D={idx:A,def:E,ruleStack:C,occurrenceStack:N};f.push(D)}else if(w instanceof Ue)for(let v=w.definition.length-1;v>=0;v--){let g=w.definition[v],E={idx:A,def:g.definition.concat(vt(T)),ruleStack:C,occurrenceStack:N};f.push(E),f.push(s)}else if(w instanceof ze)f.push({idx:A,def:w.definition.concat(vt(T)),ruleStack:C,occurrenceStack:N});else if(w instanceof gr)f.push(B1(w,A,C,N));else throw Error("non exhaustive match")}return u}function B1(t,e,r,n){let i=Be(r);i.push(t.name);let o=Be(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var nt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(nt||(nt={}));function El(t){if(t instanceof ke||t==="Option")return nt.OPTION;if(t instanceof me||t==="Repetition")return nt.REPETITION;if(t instanceof Ve||t==="RepetitionMandatory")return nt.REPETITION_MANDATORY;if(t instanceof Xe||t==="RepetitionMandatoryWithSeparator")return nt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Fe||t==="RepetitionWithSeparator")return nt.REPETITION_WITH_SEPARATOR;if(t instanceof Ue||t==="Alternation")return nt.ALTERNATION;throw Error("non exhaustive match")}function Gf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=El(n);return o===nt.ALTERNATION?ca(e,r,i):ua(e,r,o,i)}function IS(t,e,r,n,i,o){let s=ca(t,e,r),a=US(s)?aa:mi;return o(s,n,a,i)}function DS(t,e,r,n,i,o){let s=ua(t,e,i,r),a=US(s)?aa:mi;return o(s[0],a,n)}function OS(t,e,r,n){let i=t.length,o=lr(t,s=>lr(s,a=>a.length===1));if(e)return function(s){let a=L(s,l=>l.GATE);for(let l=0;l<i;l++){let c=t[l],u=c.length,f=a[l];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let T=c[m],A=T.length;for(let C=0;C<A;C++){let N=this.LA(C+1);if(r(N,T[C])===!1)continue e}return l}}};if(o&&!n){let s=L(t,l=>Tt(l)),a=ct(s,(l,c,u)=>(G(c,f=>{B(l,f.tokenTypeIdx)||(l[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{B(l,m)||(l[m]=u)})}),l),{});return function(){let l=this.LA(1);return a[l.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],l=a.length;e:for(let c=0;c<l;c++){let u=a[c],f=u.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,u[m])===!1)continue e}return s}}}}function LS(t,e,r){let n=lr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=Tt(t);if(o.length===1&&ae(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=ct(o,(a,l,c)=>(a[l.tokenTypeIdx]=!0,G(l.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let l=0;l<a;l++){let c=this.LA(l+1);if(e(c,s[l])===!1)continue e}return!0}return!1}}var Yh=class extends pi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,nt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,nt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},qf=class extends Tr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,nt.OPTION)}visitRepetition(e){this.checkIsTarget(e,nt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,nt.ALTERNATION)}};function PS(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function Xh(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let l="_"+n.categoryMatches[a];i.push(s+l)}}e=i}return e}function z1(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function MS(t,e){let r=L(t,s=>Ff([s],1)),n=PS(r.length),i=L(r,s=>{let a={};return G(s,l=>{let c=Xh(l.partialPath);G(c,u=>{a[u]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=PS(a.length);for(let l=0;l<a.length;l++){let c=a[l];for(let u=0;u<c.length;u++){let f=c[u].partialPath,m=c[u].suffixDef,T=Xh(f);if(z1(i,T,l)||ae(m)||f.length===e){let C=n[l];if(jf(C,f)===!1){C.push(f);for(let N=0;N<T.length;N++){let w=T[N];i[l][w]=!0}}}else{let C=Ff(m,s+1,f);o[l]=o[l].concat(C),G(C,N=>{let w=Xh(N.partialPath);G(w,v=>{i[l][v]=!0})})}}}}return n}function ca(t,e,r,n){let i=new qf(t,nt.ALTERNATION,n);return e.accept(i),MS(i.result,r)}function ua(t,e,r,n){let i=new qf(t,r);e.accept(i);let o=i.result,a=new Yh(e,t,r).startWalking(),l=new ze({definition:o}),c=new ze({definition:a});return MS([l,c],n)}function jf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function FS(t,e){return t.length<e.length&&lr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function US(t){return lr(t,e=>lr(e,r=>lr(r,n=>ae(n.categoryMatches))))}function qS(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Lt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function GS(t,e,r,n){let i=Zt(t,l=>V1(l,r)),o=eU(t,e,r),s=Zt(t,l=>J1(l,r)),a=Zt(t,l=>Y1(l,t,n,r));return i.concat(o,s,a)}function V1(t,e){let r=new Jh;t.accept(r);let n=r.allProductions,i=Oh(n,X1),o=$r(i,a=>a.length>1);return L(De(o),a=>{let l=Gt(a),c=e.buildDuplicateFoundError(t,a),u=kr(l),f={message:c,type:Lt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:u,occurrence:l.idx},m=jS(l);return m&&(f.parameter=m),f})}function X1(t){return`${kr(t)}_#_${t.idx}_#_${jS(t)}`}function jS(t){return t instanceof le?t.terminalType.name:t instanceof $e?t.nonTerminalName:""}var Jh=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function Y1(t,e,r,n){let i=[];if(ct(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Lt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function HS(t,e,r){let n=[],i;return tt(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Lt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function Zh(t,e,r,n=[]){let i=[],o=Hf(e.definition);if(ae(o))return[];{let s=t.name;tt(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Lt.LEFT_RECURSION,ruleName:s});let l=zi(o,n.concat([t])),c=Zt(l,u=>{let f=Be(n);return f.push(u),Zh(t,u,r,f)});return i.concat(c)}}function Hf(t){let e=[];if(ae(t))return e;let r=Gt(t);if(r instanceof $e)e.push(r.referencedRule);else if(r instanceof ze||r instanceof ke||r instanceof Ve||r instanceof Xe||r instanceof Fe||r instanceof me)e=e.concat(Hf(r.definition));else if(r instanceof Ue)e=Tt(L(r.definition,o=>Hf(o.definition)));else if(!(r instanceof le))throw Error("non exhaustive match");let n=$o(r),i=t.length>1;if(n&&i){let o=vt(t);return e.concat(Hf(o))}else return e}var Nl=class extends Tr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function KS(t,e){let r=new Nl;t.accept(r);let n=r.alternations;return Zt(n,o=>{let s=di(o.definition);return Zt(s,(a,l)=>{let c=Uf([a],[],mi,1);return ae(c)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:l}),type:Lt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:l+1}]:[]})})}function WS(t,e,r){let n=new Nl;t.accept(n);let i=n.alternations;return i=Vi(i,s=>s.ignoreAmbiguities===!0),Zt(i,s=>{let a=s.idx,l=s.maxLookahead||e,c=ca(a,t,l,s),u=Q1(c,s,t,r),f=Z1(c,s,t,r);return u.concat(f)})}var Qh=class extends Tr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function J1(t,e){let r=new Nl;t.accept(r);let n=r.alternations;return Zt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Lt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function BS(t,e,r){let n=[];return G(t,i=>{let o=new Qh;i.accept(o);let s=o.allProductions;G(s,a=>{let l=El(a),c=a.maxLookahead||e,u=a.idx,m=ua(u,i,l,c)[0];if(ae(Tt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Lt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function Q1(t,e,r,n){let i=[],o=ct(t,(a,l,c)=>(e.definition[c].ignoreAmbiguities===!0||G(l,u=>{let f=[c];G(t,(m,T)=>{c!==T&&jf(m,u)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!jf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let l=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:l,prefixPath:a.path}),type:Lt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function Z1(t,e,r,n){let i=ct(t,(s,a,l)=>{let c=L(a,u=>({idx:l,path:u}));return s.concat(c)},[]);return Un(Zt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let l=s.idx,c=s.path,u=qt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<l&&FS(m.path,c));return L(u,m=>{let T=[m.idx+1,l+1],A=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Lt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:A,alternatives:T}})}))}function eU(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(tt(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Lt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function zS(t){let e=ea(t,{errMsgProvider:NS}),r={};return G(t.rules,n=>{r[n.name]=n}),_S(r,e.errMsgProvider)}function VS(t){return t=ea(t,{errMsgProvider:vn}),GS(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var XS="MismatchedTokenException",YS="NoViableAltException",JS="EarlyExitException",QS="NotAllInputParsedException",ZS=[XS,YS,JS,QS];Object.freeze(ZS);function Xi(t){return tt(ZS,t.name)}var fa=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},_o=class extends fa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=XS}},_l=class extends fa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=YS}},Pl=class extends fa{constructor(e,r){super(e,r),this.name=QS}},Il=class extends fa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=JS}};var ey={},ry="InRuleRecoveryException",ty=class extends Error{constructor(e){super(e),this.name=ry}},Kf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=B(e,"recoveryEnabled")?e.recoveryEnabled:vr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=tU)}getTokenToInsert(e){let r=No(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],l=!1,c=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:m,ruleName:this.getCurrRuleFullName()}),A=new _o(T,c,this.LA(0));A.resyncedTokens=di(a),this.SAVE_ERROR(A)};for(;!l;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(u,o)?l=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new ty("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||ae(r))return!1;let n=this.LA(1);return Gn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return tt(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Gn(e,o=>wl(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return ey;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?ey:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return Tt(e)}getFollowSetFromFollowKey(e){if(e===ey)return[Tn];let r=e.ruleName+e.idxInCallingRule+kf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,Tn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return di(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=Be(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function tU(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),l=this.firstAfterRepMap[a];if(l===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];l=new o(T,i).startWalking(),this.firstAfterRepMap[a]=l}let c=l.token,u=l.occurrence,f=l.isEndOfRule;this.RULE_STACK.length===1&&f&&c===void 0&&(c=Tn,u=1),!(c===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(c,u,s)&&this.tryInRepetitionRecovery(t,e,r,c)}function Wf(t,e,r){return r|e|t}var ere=32-8;var Ti=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:vr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(ae(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Zt(e,r=>Zh(r,r,vn))}validateEmptyOrAlternatives(e){return Zt(e,r=>KS(r,vn))}validateAmbiguousAlternationAlternatives(e,r){return Zt(e,n=>WS(n,r,vn))}validateSomeNonEmptyLookaheadPath(e,r){return BS(e,r,vn)}buildLookaheadForAlternation(e){return IS(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,OS)}buildLookaheadForOptional(e){return DS(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,El(e.prodType),LS)}};var zf=class{initLooksAhead(e){this.dynamicTokensEnabled=B(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:vr.dynamicTokensEnabled,this.maxLookahead=B(e,"maxLookahead")?e.maxLookahead:vr.maxLookahead,this.lookaheadStrategy=B(e,"lookaheadStrategy")?e.lookaheadStrategy:new Ti({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:l}=rU(r);G(n,c=>{let u=c.idx===0?"":c.idx;this.TRACE_INIT(`${kr(c)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:c.idx,rule:r,maxLookahead:c.maxLookahead||this.maxLookahead,hasPredicates:c.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=Wf(this.fullRuleNameToShort[r.name],256,c.idx);this.setLaFuncCache(m,f)})}),G(i,c=>{this.computeLookaheadFunc(r,c.idx,768,"Repetition",c.maxLookahead,kr(c))}),G(o,c=>{this.computeLookaheadFunc(r,c.idx,512,"Option",c.maxLookahead,kr(c))}),G(s,c=>{this.computeLookaheadFunc(r,c.idx,1024,"RepetitionMandatory",c.maxLookahead,kr(c))}),G(a,c=>{this.computeLookaheadFunc(r,c.idx,1536,"RepetitionMandatoryWithSeparator",c.maxLookahead,kr(c))}),G(l,c=>{this.computeLookaheadFunc(r,c.idx,1280,"RepetitionWithSeparator",c.maxLookahead,kr(c))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),l=Wf(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(l,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return Wf(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},ny=class extends Tr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},Bf=new ny;function rU(t){Bf.reset(),t.accept(Bf);let e=Bf.dslMethods;return Bf.reset(),e}function sy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function ay(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function eC(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function tC(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var nU="name";function ly(t,e){Object.defineProperty(t,nU,{enumerable:!1,configurable:!0,writable:!1,value:e})}function iU(t,e){let r=Ke(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let l=0;l<a;l++){let c=s[l];c.tokenTypeIdx===void 0&&this[c.name](c.children,e)}}}function rC(t,e){let r=function(){};ly(r,t+"BaseSemantics");let n={visit:function(i,o){if(V(i)&&(i=i[0]),!cr(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=oU(this,e);if(!ae(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function nC(t,e,r){let n=function(){};ly(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=iU}),n.prototype=i,n.prototype.constructor=n,n}var cy;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(cy||(cy={}));function oU(t,e){return sU(t,e)}function sU(t,e){let r=qt(e,i=>yr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:cy.MISSING_METHOD,methodName:i}));return Un(n)}var Jf=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=B(e,"nodeLocationTracking")?e.nodeLocationTracking:vr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=lt,this.cstFinallyStateUpdate=lt,this.cstPostTerminal=lt,this.cstPostNonTerminal=lt,this.cstPostRule=lt;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=ay,this.setNodeLocationFromNode=ay,this.cstPostRule=lt,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=lt,this.setNodeLocationFromNode=lt,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=sy,this.setNodeLocationFromNode=sy,this.cstPostRule=lt,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=lt,this.setNodeLocationFromNode=lt,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=lt,this.setNodeLocationFromNode=lt,this.cstPostRule=lt,this.setInitialNodeLocation=lt;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];eC(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];tC(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(cr(this.baseCstVisitorConstructor)){let e=rC(this.className,Ke(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(cr(this.baseCstVisitorWithDefaultsConstructor)){let e=nC(this.className,Ke(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var Qf=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):da}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?da:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var Zf=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=pa){if(tt(this.definedRulesNames,e)){let s={message:vn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Lt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=pa){let i=HS(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Xi(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return $f(De(this.gastProductionsCache))}};var ed=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=aa,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},B(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(V(e)){if(ae(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(V(e))this.tokensMap=ct(e,(o,s)=>(o[s.name]=s,o),{});else if(B(e,"modes")&&lr(Tt(De(e.modes)),RS)){let o=Tt(De(e.modes)),s=ta(o);this.tokensMap=ct(s,(a,l)=>(a[l.name]=l,a),{})}else if(at(e))this.tokensMap=Be(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=Tn;let n=B(e,"modes")?Tt(De(e.modes)):De(e),i=lr(n,o=>ae(o.categoryMatches));this.tokenMatcher=i?aa:mi,hi(De(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=B(n,"resyncEnabled")?n.resyncEnabled:pa.resyncEnabled,o=B(n,"recoveryValueFunc")?n.recoveryValueFunc:pa.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Xi(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];return l.recoveredNode=!0,l}else return n(e);else{if(this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];l.recoveredNode=!0,s.partialCstResult=l}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Mf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,kl],a,1536,e,kl)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let l=i;i=()=>a.call(this)&&l.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Lf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,$l],a,1280,e,$l)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=V(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Pl(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Xi(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new _o(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===ry?n:o}}else throw n}saveRecogState(){let e=this.errors,r=Be(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),Tn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var td=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=B(e,"errorMessageProvider")?e.errorMessageProvider:vr.errorMessageProvider}SAVE_ERROR(e){if(Xi(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Be(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Be(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=ua(e,o,r,this.maxLookahead)[0],l=[];for(let u=1;u<=this.maxLookahead;u++)l.push(this.LA(u));let c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:l,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Il(c,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=ca(e,i,this.maxLookahead),s=[];for(let c=1;c<=this.maxLookahead;c++)s.push(this.LA(c));let a=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new _l(l,this.LA(1),a))}};var rd=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(cr(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Uf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=Gt(e.ruleStack),i=this.getGAstProductions()[r];return new Of(i,e).startWalking()}};var od={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(od);var iC=!0,oC=Math.pow(2,8)-1,aC=Df({name:"RECORDING_PHASE_TOKEN",pattern:ht.NA});hi([aC]);var lC=No(aC,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(lC);var lU={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},nd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return da}topLevelRuleRecord(e,r){try{let n=new gr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Ol.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){Ol.call(this,Ve,r,e)}atLeastOneSepFirstInternalRecord(e,r){Ol.call(this,Xe,r,e,iC)}manyInternalRecord(e,r){Ol.call(this,me,r,e)}manySepFirstInternalRecord(e,r){Ol.call(this,Fe,r,e,iC)}orInternalRecord(e,r){return cU.call(this,e,r)}subruleInternalRecord(e,r,n){if(id(r),!e||B(e,"ruleName")===!1){let a=new Error(`<SUBRULE${sC(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=qn(this.recordingProdStack),o=e.ruleName,s=new $e({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?lU:od}consumeInternalRecord(e,r,n){if(id(r),!Kh(e)){let s=new Error(`<CONSUME${sC(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=qn(this.recordingProdStack),o=new le({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),lC}};function Ol(t,e,r,n=!1){id(r);let i=qn(this.recordingProdStack),o=yr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),B(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),od}function cU(t,e){id(e);let r=qn(this.recordingProdStack),n=V(t)===!1,i=n===!1?t:t.DEF,o=new Ue({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});B(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=xl(i,a=>yr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let l=new ze({definition:[]});o.definition.push(l),B(a,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:B(a,"GATE")&&(l.ignoreAmbiguities=!0),this.recordingProdStack.push(l),a.ALT.call(this),this.recordingProdStack.pop()}),od}function sC(t){return t===0?"":`${t}`}function id(t){if(t<0||t>oC){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${oC+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var sd=class{initPerformanceTracer(e){if(B(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=vr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=bl(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function cC(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var da=No(Tn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(da);var vr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:gi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),pa=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Lt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Lt||(Lt={}));function ad(t=void 0){return function(){return t}}var Ll=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Al(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=zS({rules:De(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(ae(n)&&this.skipValidations===!1){let i=VS({rules:De(this.gastProductionsCache),tokenTypes:De(this.tokensMap),errMsgProvider:vn,grammarName:r}),o=qS({lookaheadStrategy:this.lookaheadStrategy,rules:De(this.gastProductionsCache),tokenTypes:De(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),ae(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=tS(De(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:De(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(De(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!ae(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),B(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=B(r,"skipValidations")?r.skipValidations:vr.skipValidations}};Ll.DEFER_DEFINITION_ERRORS_HANDLING=!1;cC(Ll,[Kf,zf,Jf,Qf,ed,Zf,td,rd,nd,sd]);var Ml=class extends Ll{constructor(e,r=vr){let n=Be(r);n.outputCst=!1,super(e,n)}};function Po(t,e,r){return`${t.name}_${e}_${r}`}var Yi=1,fU=2,uC=4,fC=5;var ya=7,dU=8,pU=9,mU=10,hU=11,dC=12,Fl=class{constructor(e){this.target=e}isEpsilon(){return!1}},ma=class extends Fl{constructor(e,r){super(e),this.tokenType=r}},Ul=class extends Fl{constructor(e){super(e)}isEpsilon(){return!0}},ha=class extends Fl{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function pC(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};yU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Io(e,i,i);o!==void 0&&$U(e,i,o)}return e}function yU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=jt(t,i,void 0,{type:fU}),s=jt(t,i,void 0,{type:ya});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function mC(t,e,r){return r instanceof le?fy(t,e,r.terminalType,r):r instanceof $e?wU(t,e,r):r instanceof Ue?RU(t,e,r):r instanceof ke?bU(t,e,r):r instanceof me?gU(t,e,r):r instanceof Fe?TU(t,e,r):r instanceof Ve?vU(t,e,r):r instanceof Xe?xU(t,e,r):Io(t,e,r)}function gU(t,e,r){let n=jt(t,e,r,{type:fC});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r));return yC(t,e,r,i)}function TU(t,e,r){let n=jt(t,e,r,{type:fC});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r)),o=fy(t,e,r.separator,r);return yC(t,e,r,i,o)}function vU(t,e,r){let n=jt(t,e,r,{type:uC});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r));return hC(t,e,r,i)}function xU(t,e,r){let n=jt(t,e,r,{type:uC});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r)),o=fy(t,e,r.separator,r);return hC(t,e,r,i,o)}function RU(t,e,r){let n=jt(t,e,r,{type:Yi});Ji(t,n);let i=L(r.definition,s=>mC(t,e,s));return ga(t,e,n,r,...i)}function bU(t,e,r){let n=jt(t,e,r,{type:Yi});Ji(t,n);let i=ga(t,e,n,r,Io(t,e,r));return AU(t,e,r,i)}function Io(t,e,r){let n=qt(L(r.definition,i=>mC(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:CU(t,n)}function hC(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:hU});Ji(t,a);let l=jt(t,e,r,{type:dC});return o.loopback=a,l.loopback=a,t.decisionMap[Po(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,l)):(_t(a,l),_t(a,i.left),_t(i.right,o)),{left:o,right:l}}function yC(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:mU});Ji(t,a);let l=jt(t,e,r,{type:dC}),c=jt(t,e,r,{type:pU});return a.loopback=c,l.loopback=c,_t(a,o),_t(a,l),_t(s,c),i!==void 0?(_t(c,l),_t(c,i.left),_t(i.right,o)):_t(c,a),t.decisionMap[Po(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:l}}function AU(t,e,r,n){let i=n.left,o=n.right;return _t(i,o),t.decisionMap[Po(e,"Option",r.idx)]=i,n}function Ji(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function ga(t,e,r,n,...i){let o=jt(t,e,n,{type:dU,start:r});r.end=o;for(let a of i)a!==void 0?(_t(r,a.left),_t(a.right,o)):_t(r,o);let s={left:r,right:o};return t.decisionMap[Po(e,SU(n),n.idx)]=r,s}function SU(t){if(t instanceof Ue)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof me)return"Repetition";if(t instanceof Fe)return"RepetitionWithSeparator";if(t instanceof Ve)return"RepetitionMandatory";if(t instanceof Xe)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function CU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let l=a instanceof ha,c=a,u=e[o+1].left;s.left.type===Yi&&s.right.type===Yi&&a!==void 0&&(l&&c.followState===s.right||a.target===s.right)?(l?c.followState=u:a.target=u,kU(t,s.right)):_t(s.right,u)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function fy(t,e,r,n){let i=jt(t,e,n,{type:Yi}),o=jt(t,e,n,{type:Yi});return dy(i,new ma(o,r)),{left:i,right:o}}function wU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=jt(t,e,r,{type:Yi}),s=jt(t,e,r,{type:Yi}),a=new ha(i,n,s);return dy(o,a),{left:o,right:s}}function $U(t,e,r){let n=t.ruleToStartState.get(e);_t(n,r.left);let i=t.ruleToStopState.get(e);return _t(r.right,i),{left:n,right:i}}function _t(t,e){let r=new Ul(e);dy(t,r)}function jt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function dy(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function kU(t,e){t.states.splice(t.states.indexOf(e),1)}var ql={},Ta=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=py(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function py(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function EU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var ld=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},gC=new ld,Gl=class extends Ti{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=pC(e.rules),this.dfas=NU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=Po(n,"Alternation",r),u=this.atn.decisionMap[l].decision,f=L(Gf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(TC(f,!1)&&!o){let m=ct(f,(T,A,C)=>(G(A,N=>{N&&(T[N.tokenTypeIdx]=C,G(N.categoryMatches,w=>{T[w]=C}))}),T),{});return i?function(T){var A;let C=this.LA(1),N=m[C.tokenTypeIdx];if(T!==void 0&&N!==void 0){let w=(A=T[N])===null||A===void 0?void 0:A.GATE;if(w!==void 0&&w.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new ld,A=m===void 0?0:m.length;for(let N=0;N<A;N++){let w=m?.[N].GATE;T.set(N,w===void 0||w.call(this))}let C=my.call(this,s,u,T,a);return typeof C=="number"?C:void 0}:function(){let m=my.call(this,s,u,gC,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=Po(n,i,r),u=this.atn.decisionMap[l].decision,f=L(Gf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(TC(f)&&f[0][0]&&!o){let m=f[0],T=Tt(m);if(T.length===1&&ae(T[0].categoryMatches)){let C=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===C}}else{let A=ct(T,(C,N)=>(N!==void 0&&(C[N.tokenTypeIdx]=!0,G(N.categoryMatches,w=>{C[w]=!0})),C),{});return function(){let C=this.LA(1);return A[C.tokenTypeIdx]===!0}}}return function(){let m=my.call(this,s,u,gC,a);return typeof m=="object"?!1:m===0}}};function TC(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function NU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=EU(t.decisionStates[n],n);return r}function my(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=GU(i.atnStartState);o=RC(i,xC(a)),i.start=o}return _U.apply(this,[i,o,r,n])}function _U(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let l=MU(i,a);if(l===void 0&&(l=PU.apply(this,[t,i,a,o,r,n])),l===ql)return LU(s,i,a);if(l.isAcceptState===!0)return l.prediction;i=l,s.push(a),a=this.LA(o++)}}function PU(t,e,r,n,i,o){let s=FU(e.configs,r,i);if(s.size===0)return vC(t,e,r,ql),ql;let a=xC(s),l=qU(s,i);if(l!==void 0)a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l;else if(WU(s)){let c=BA(s.alts);a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c,IU.apply(this,[t,n,s.alts,o])}return a=vC(t,e,r,a),a}function IU(t,e,r,n){let i=[];for(let c=1;c<=e;c++)i.push(this.LA(c).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,l=DU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(l)}function DU(t){let e=L(t.prefixPath,i=>yi(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${OU(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function OU(t){if(t instanceof $e)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof me)return"MANY";if(t instanceof le)return"CONSUME";throw Error("non exhaustive match")}function LU(t,e,r){let n=Zt(e.configs.elements,o=>o.state.transitions),i=ZA(n.filter(o=>o instanceof ma).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function MU(t,e){return t.edges[e.tokenTypeIdx]}function FU(t,e,r){let n=new Ta,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===ya){i.push(s);continue}let a=s.state.transitions.length;for(let l=0;l<a;l++){let c=s.state.transitions[l],u=UU(c,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new Ta;for(let s of n.elements)cd(s,o)}if(i.length>0&&!HU(o))for(let s of i)o.add(s);return o}function UU(t,e){if(t instanceof ma&&wl(e,t.tokenType))return t.target}function qU(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function xC(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function vC(t,e,r,n){return n=RC(t,n),e.edges[r.tokenTypeIdx]=n,n}function RC(t,e){if(e===ql)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function GU(t){let e=new Ta,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};cd(o,e)}return e}function cd(t,e){let r=t.state;if(r.type===ya){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};cd(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=jU(t,o);s!==void 0&&cd(s,e)}}function jU(t,e){if(e instanceof Ul)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ha){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function HU(t){for(let e of t.elements)if(e.state.type===ya)return!0;return!1}function KU(t){for(let e of t.elements)if(e.state.type!==ya)return!1;return!0}function WU(t){if(KU(t))return!0;let e=BU(t.elements);return zU(e)&&!VU(e)}function BU(t){let e=new Map;for(let r of t){let n=py(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function zU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function VU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var hy=pe(so(),1);var ud=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new gy(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new pd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new dd(e.startOffset,e.image.length,Wa(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new dd(r.startOffset,r.image.length,Wa(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:l}=s;if($n(s)&&n>a&&i<l){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},fd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},dd=class extends fd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},pd=class extends fd{constructor(){super(...arguments),this.content=new yy(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:hy.Position.create(0,0),end:hy.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},yy=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},gy=class extends pd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var vy=Symbol("Datatype");function Ty(t){return t.$type===vy}var bC="\u200B",AC=t=>t.endsWith(bC)?t:t+bC,md=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Ry(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},hd=class extends md{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new ud,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Fr(e)?vy:mn(e),i=this.wrapper.DEFINE_RULE(AC(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===vy&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),l=this.current;if(s){let c=pt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,c,o,a)}else if(Ty(l)){let c=i.image;pt(n)||(c=this.converter.convert(c,o).toString()),l.value+=c}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Ty(s))s.value+=e.toString();else{let a=e.$type,l=this.assignWithoutOverride(e,s);a&&(l.$type=a);let c=l;this.stack.pop(),this.stack.push(c)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return Iv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),Ty(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Ie(e,be);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Vt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},xy=class{buildMismatchTokenMessage(e){return gi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return gi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return gi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return gi.buildEarlyExitMessage(e)}},jl=class extends xy{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},yd=class extends md{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(AC(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},XU={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new jl},Ry=class extends Ml{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},XU),{lookaheadStrategy:n?new Ti({maxLookahead:r.maxLookahead}):new Gl}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Hl=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function gd(t){throw new Error("Error! The input value was not handled.")}function vd(t,e,r){return YU({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function YU(t,e){let r=ys(e,!1),n=oe(e.rules).filter(W).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Do(o,i.definition)))}}function Do(t,e,r=!1){let n;if(pt(e))n=nq(t,e);else if(_e(e))n=JU(t,e);else if(be(e))n=Do(t,e.terminal);else if(Vt(e))n=SC(t,e);else if(Pe(e))n=QU(t,e);else if(Ir(e))n=eq(t,e);else if(Dr(e))n=tq(t,e);else if(Ft(e))n=rq(t,e);else throw new Hl(e.$cstNode,`Unexpected element type: ${e.$type}`);return CC(t,r?void 0:Td(e),n,e.cardinality)}function JU(t,e){let r=mn(e);return()=>t.parser.action(r,e)}function QU(t,e){let r=e.rule.ref;if(W(r)){let n=t.subrule++,i=e.arguments.length>0?ZU(r,e.arguments):()=>({});return o=>t.parser.subrule(n,wC(t,r),e,i(o))}else if(Ce(r)){let n=t.consume++,i=by(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)gd(r);else throw new Hl(e.$cstNode,`Undefined rule type: ${e.$type}`)}function ZU(t,e){let r=e.map(n=>vi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function vi(t){if(QT(t)){let e=vi(t.left),r=vi(t.right);return n=>e(n)||r(n)}else if(YT(t)){let e=vi(t.left),r=vi(t.right);return n=>e(n)&&r(n)}else if(nv(t)){let e=vi(t.value);return r=>!e(r)}else if(os(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(tv(t)){let e=!!t.true;return()=>e}gd(t)}function eq(t,e){if(e.elements.length===1)return Do(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Do(t,i,!0)},s=Td(i);s&&(o.GATE=vi(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function tq(t,e){if(e.elements.length===1)return Do(t,e.elements[0]);let r=[];for(let a of e.elements){let l={ALT:Do(t,a,!0)},c=Td(a);c&&(l.GATE=vi(c)),r.push(l)}let n=t.or++,i=(a,l)=>{let c=l.getRuleStack().join("-");return`uGroup_${a}_${c}`},o=a=>t.parser.alternatives(n,r.map((l,c)=>{let u={ALT:()=>!0},f=t.parser;u.ALT=()=>{if(l.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let A=f.unorderedGroups.get(T);typeof A?.[c]>"u"&&(A[c]=!0)}};let m=l.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[c]},u})),s=CC(t,Td(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function rq(t,e){let r=e.elements.map(n=>Do(t,n));return n=>r.forEach(i=>i(n))}function Td(t){if(Ft(t))return t.guardCondition}function SC(t,e,r=e.terminal){if(r)if(Pe(r)&&W(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,wC(t,r.rule.ref),e,i)}else if(Pe(r)&&Ce(r.rule.ref)){let n=t.consume++,i=by(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(pt(r)){let n=t.consume++,i=by(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=cl(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+mn(e.type.ref));return SC(t,e,i)}}function nq(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function CC(t,e,r,n){let i=e&&vi(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:ad(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:ad(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else gd(n)}function wC(t,e){let r=iq(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function iq(t,e){if(W(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!W(n);)(Ft(n)||Ir(n)||Dr(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function by(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function $C(t){let e=t.Grammar,r=t.parser.Lexer,n=new yd(t);return vd(e,n,r.definition),n.finalize(),n}function kC(t){let e=oq(t);return e.finalize(),e}function oq(t){let e=t.Grammar,r=t.parser.Lexer,n=new hd(t);return vd(e,n,r.definition)}var xd=class{buildTokens(e,r){let n=oe(ys(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&eh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(Ce).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Yr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=eh(r)?ht.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(W).flatMap(i=>Ze(i).filter(pt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(tx(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&rx("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Rd=class{convert(e,r){let n=r.grammarSource;if(Vt(n)&&(n=Ru(n)),Pe(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return cq(r);case"STRING":return sq(r);case"ID":return lq(r)}switch((i=bo(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return dq(r);case"boolean":return pq(r);case"bigint":return uq(r);case"date":return fq(r);default:return r}}};function sq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=aq(i)}else e+=n}return e}function aq(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function lq(t){return t.charAt(0)==="^"?t.substring(1):t}function cq(t){return parseInt(t)}function uq(t){return BigInt(t)}function fq(t){return new Date(t)}function dq(t){return Number(t)}function pq(t){return t.toLowerCase()==="true"}var EC=pe(Se(),1);var bd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=EC.CancellationToken.None){for(let n of ti(e.parseResult.value))await et(r),Yc(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(es(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(kt(this._ref))return this._ref;if(OT(this._nodeDescription)){let l=o.loadAstNode(this._nodeDescription);this._ref=l??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let l=o.getLinkedNode({reference:s,container:e,property:r});if(l.error&&ie(e).state<He.ComputedScopes)return;this._ref=(a=l.node)!==null&&a!==void 0?a:l.error,this._nodeDescription=l.descr}return kt(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return es(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(es(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ie(e.container);n.state<He.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function _C(t){return typeof t.$comment=="string"}function NC(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Ad=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,l,c;if(!this.ignoreProperties.has(e))if(Qn(r)){let u=r.ref,f=n?r.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(l=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&l!==void 0?l:"Could not resolve reference"}}else{let u;if(o&&kt(r)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ie(r).uri.toString()}catch{}return i&&!e&&kt(r)&&(u??(u=Object.assign({},r)),u.$sourceText=(c=r.$cstNode)===null||c===void 0?void 0:c.text),s&&kt(r)&&(u??(u=Object.assign({},r)),u.$comment=this.commentProvider.getComment(r)),u??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Ni(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,l]of Object.entries(e))if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];NC(u)?l[c]=this.reviveReference(e,a,r,u):kt(u)&&this.linkNode(u,r,e,a,c)}else NC(l)?e[a]=this.reviveReference(e,a,r,l):kt(l)&&this.linkNode(l,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Sd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=xe.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var PC=pe(Se(),1);var Cd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ie(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=ir((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:ir(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},wd=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=PC.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ti(i))await et(r),Yc(o).filter(s=>!es(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ie(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:ir(n),local:xe.equals(r.documentUri,i)}}};var $d=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),l=parseInt(o.substring(s+1)),c=i[a];return c?.[l]}return i[o]},e)}};var IC=pe(wt(),1),kd=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(IC.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var va=pe(Se(),1);var Ed=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Me,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=va.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===He.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=He.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let l=this.buildState.get(a),c=(i=l?.result)===null||i===void 0?void 0:i.validationChecks;if(c){let f=((o=r.validation.categories)!==null&&o!==void 0?o:ps.all).filter(m=>!c.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:l.result}),s.state=He.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=va.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=oe(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,He.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await et(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<He.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),va.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,He.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,He.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,He.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,He.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,He.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,He.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await et(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),va.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await et(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,l=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...l):e.diagnostics=l;let c=this.buildState.get(e.uri.toString());if(c){(n=c.result)!==null&&n!==void 0||(c.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:ps.all;c.result.validationChecks?c.result.validationChecks.push(...u):c.result.validationChecks=[...u]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Ay=pe(Se(),1);var Nd=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new mu,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ie(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{xe.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),oe(i)}allElements(e,r){let n=oe(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Ay.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Ay.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var DC=pe(Se(),1);var _d=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=DC.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await et(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Jt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=xe.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=xe.extname(r.uri);return n.includes(o)}return!1}};var Pd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=OC(r)?Object.values(r):r;this.chevrotainLexer=new ht(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(OC(e))return e;let r=LC(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function mq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function LC(t){return t&&"modes"in t&&"defaultMode"in t}function OC(t){return!mq(t)&&!LC(t)}var Ae=pe(Se(),1);function UC(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Ae.Position.create(0,0));let o=GC(t),s=wy(n),a=yq({lines:o,position:i,options:s});return Rq({index:0,tokens:a,position:i})}function qC(t,e){let r=wy(e),n=GC(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function GC(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Xa)}var MC=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,hq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function yq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let l=a===0,c=a===t.lines.length-1,u=t.lines[a],f=0;if(l&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(u);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(u);T&&(f=T.index+T[0].length)}if(c){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(u);T&&(u=u.substring(0,T.index))}if(u=u.substring(0,xq(u)),Cy(u,0)>=u.length){if(i.length>0){let T=Ae.Position.create(o,s);i.push({type:"break",content:"",range:Ae.Range.create(T,T)})}}else{MC.lastIndex=f;let T=MC.exec(u);if(T){let A=T[0],C=T[1],N=Ae.Position.create(o,s+f),w=Ae.Position.create(o,s+f+A.length);i.push({type:"tag",content:C,range:Ae.Range.create(N,w)}),f+=A.length,f=Cy(u,f)}if(f<u.length){let A=u.substring(f),C=Array.from(A.matchAll(hq));i.push(...gq(C,A,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function gq(t,e,r,n){let i=[];if(t.length===0){let o=Ae.Position.create(r,n),s=Ae.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Ae.Range.create(o,s)})}else{let o=0;for(let a of t){let l=a.index,c=e.substring(o,l);c.length>0&&i.push({type:"text",content:e.substring(o,l),range:Ae.Range.create(Ae.Position.create(r,o+n),Ae.Position.create(r,l+n))});let u=c.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:Ae.Range.create(Ae.Position.create(r,o+u+n),Ae.Position.create(r,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:Ae.Range.create(Ae.Position.create(r,o+u+n),Ae.Position.create(r,o+u+m.length+n))})}else i.push({type:"text",content:"",range:Ae.Range.create(Ae.Position.create(r,o+u+n),Ae.Position.create(r,o+u+n))});o=l+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:Ae.Range.create(Ae.Position.create(r,o+n),Ae.Position.create(r,o+n+s.length))})}return i}var Tq=/\S/,vq=/\s*$/;function Cy(t,e){let r=t.substring(e).match(Tq);return r?e+r.index:t.length}function xq(t){let e=t.match(vq);if(e&&typeof e.index=="number")return e.index}function Rq(t){var e,r,n,i;let o=Ae.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Id([],Ae.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let c=bq(t,s[s.length-1]);c&&s.push(c)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,l=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Id(s,Ae.Range.create(a,l))}function bq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return HC(t,!1);if(r.type==="text"||r.type==="inline-tag")return jC(t);Aq(r,e),t.index++}function Aq(t,e){if(e){let r=new Dd("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function jC(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Sq(t)),n=e,e=t.tokens[t.index];return new Wl(i,Ae.Range.create(r.range.start,n.range.end))}function Sq(t){return t.tokens[t.index].type==="inline-tag"?HC(t,!0):KC(t)}function HC(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=KC(t);return new Kl(n,new Wl([o],o.range),e,Ae.Range.create(r.range.start,o.range.end))}else{let o=jC(t);return new Kl(n,o,e,Ae.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Kl(n,new Wl([],o),e,o)}}function KC(t){let e=t.tokens[t.index++];return new Dd(e.content,e.range)}function wy(t){if(!t)return wy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:Sy(e,!0),end:Sy(r,!1),line:Sy(n,!0)}}function Sy(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?ii(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Id=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=FC(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=FC(r)+i}return r.trim()}},Kl=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=Cq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Cq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let l=Cy(e,o);s=e.substring(l),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:wq(e,s)}}function wq(t,e){try{return Jt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Wl=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Dd=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function FC(t){return t.endsWith(`
`)?`
`:`

`}var Od=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&qC(r))return UC(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,l=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${l.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ie(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(l=>l.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Ld=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return _C(e)?e.$comment:(r=GT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function hl(t){return{documentation:{CommentProvider:e=>new Ld(e),DocumentationProvider:e=>new Od(e)},parser:{GrammarConfig:e=>oR(e),LangiumParser:e=>kC(e),CompletionParser:e=>$C(e),ValueConverter:()=>new Rd,TokenBuilder:()=>new xd,Lexer:e=>new Pd(e),ParserErrorMessageProvider:()=>new jl},lsp:{CompletionProvider:e=>new Cs(e),DocumentSymbolProvider:e=>new Du(e),HoverProvider:e=>new Mu(e),FoldingRangeProvider:e=>new $s(e),ReferencesProvider:e=>new Hu(e),DefinitionProvider:e=>new Ns(e),DocumentHighlightProvider:e=>new Iu(e),RenameProvider:e=>new Ku(e)},workspace:{AstNodeLocator:()=>new $d,AstNodeDescriptionProvider:e=>new Cd(e),ReferenceDescriptionProvider:e=>new wd(e)},references:{Linker:e=>new bd(e),NameProvider:()=>new fs,ScopeProvider:e=>new As(e),ScopeComputation:e=>new bs(e),References:e=>new ks(e)},serializer:{JsonSerializer:e=>new Ad(e)},validation:{DocumentValidator:e=>new Tu(e),ValidationRegistry:e=>new cu(e)},shared:()=>t.shared}}function yl(t){return{ServiceRegistry:()=>new Sd,lsp:{Connection:()=>t.connection,LanguageServer:e=>new qu(e),WorkspaceSymbolProvider:e=>new Wu(e),NodeKindProvider:()=>new Gu,FuzzyMatcher:()=>new Lu},workspace:{LangiumDocuments:e=>new Uu(e),LangiumDocumentFactory:e=>new Fu(e),DocumentBuilder:e=>new Ed(e),TextDocuments:()=>new WC.TextDocuments(Zo),IndexManager:e=>new Nd(e),WorkspaceManager:e=>new _d(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new lu,ConfigurationProvider:e=>new kd(e)}}}var xa=pe(zC(),1);var $q="Instruction";var kq="Type";var VC="Block";var XC="Command";var Eq="DeclarationVariable";var YC="ExpressionBase";var Nq="BooleanType";var _q="Distance";var Pq="NumberType";var Iq="Time";var Dq="IF";var Oq="LOOP";var Lq="DirectionCommand";var JC="ReadSensorCommand";var Mq="RotateCommand";var Fq="SpeedCommand";var Uq="Affectation";var QC="Call";var ZC="Expression";var qq="DistanceSensorCommand";var Gq="TimeSensorCommand";var jq="CallFunction";var Hq="CallVariable";var Kq="And";var ew="BooleanExp";var Wq="Equals";var Bq="MultDiv";var zq="MultDivDistance";var Vq="MultDivTime";var Xq="Not";var Yq="Or";var Jq="PlusMinus";var Qq="PlusMinusDistance";var Zq="PlusMinusTime";var eG="PrimaryExprAri";var tG="PrimaryExprDistance";var rG="PrimaryExprTime";var nG="PrimaryExprBool";var Bl=class extends uo{getAllTypes(){return["Affectation","And","Block","BooleanExp","BooleanType","Call","CallFunction","CallVariable","Command","DeclarationVariable","DirectionCommand","Distance","DistanceExpression","DistanceSensorCommand","Equals","Expression","ExpressionBase","FunctionN","IF","Instruction","LOOP","MultDiv","MultDivDistance","MultDivTime","Not","NumberType","Or","Parameter","PlusMinus","PlusMinusDistance","PlusMinusTime","PrimaryExprAri","PrimaryExprBool","PrimaryExprDistance","PrimaryExprTime","ReadSensorCommand","Robot","RotateCommand","SpeedCommand","Time","TimeExpression","TimeSensorCommand","Type","TypeClass"]}computeIsSubtype(e,r){switch(e){case Uq:case QC:case ZC:return this.isSubtype(YC,r);case Kq:case ew:case Wq:case Bq:case zq:case Vq:case Xq:case Yq:case Jq:case Qq:case Zq:case eG:case tG:case rG:return this.isSubtype(ZC,r);case VC:case XC:case Eq:case YC:return this.isSubtype($q,r);case Nq:case _q:case Pq:case Iq:return this.isSubtype(kq,r);case jq:case Hq:return this.isSubtype(QC,r);case Lq:case JC:case Mq:case Fq:return this.isSubtype(XC,r);case qq:case Gq:return this.isSubtype(JC,r);case Dq:case Oq:return this.isSubtype(VC,r);case nG:return this.isSubtype(ew,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"FunctionN":return{name:"FunctionN",mandatory:[{name:"instruction",type:"array"},{name:"parameters",type:"array"}]};case"Robot":return{name:"Robot",mandatory:[{name:"functions",type:"array"}]};case"Block":return{name:"Block",mandatory:[{name:"instruction",type:"array"}]};case"BooleanType":return{name:"BooleanType",mandatory:[{name:"value",type:"boolean"}]};case"CallFunction":return{name:"CallFunction",mandatory:[{name:"parameters",type:"array"}]};case"And":return{name:"And",mandatory:[{name:"right",type:"array"}]};case"MultDiv":return{name:"MultDiv",mandatory:[{name:"operateur",type:"array"},{name:"right",type:"array"}]};case"MultDivDistance":return{name:"MultDivDistance",mandatory:[{name:"operateur",type:"array"},{name:"right",type:"array"}]};case"MultDivTime":return{name:"MultDivTime",mandatory:[{name:"operateur",type:"array"},{name:"right",type:"array"}]};case"Or":return{name:"Or",mandatory:[{name:"right",type:"array"}]};case"PlusMinus":return{name:"PlusMinus",mandatory:[{name:"operateur",type:"array"},{name:"right",type:"array"}]};case"PlusMinusDistance":return{name:"PlusMinusDistance",mandatory:[{name:"operateur",type:"array"},{name:"right",type:"array"}]};case"PlusMinusTime":return{name:"PlusMinusTime",mandatory:[{name:"operateur",type:"array"},{name:"right",type:"array"}]};default:return{name:e,mandatory:[]}}}},sle=new Bl;var Md,tw=()=>Md??(Md=au(`{
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
                    "$ref": "#/rules@10"
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
                    "$ref": "#/rules@10"
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
                  "$ref": "#/rules@17"
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
                  "$ref": "#/rules@24"
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
                  "$ref": "#/rules@29"
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
              "$ref": "#/rules@25"
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
        "$ref": "#/interfaces@4"
      },
      "definition": {
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
        "$ref": "#/interfaces@19"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
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
        "$ref": "#/interfaces@18"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
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
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
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
              "$ref": "#/rules@38"
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
              "$ref": "#/rules@43"
            },
            "arguments": []
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
        "$ref": "#/interfaces@17"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
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
      "name": "BooleanExp",
      "returnType": {
        "$ref": "#/interfaces@20"
      },
      "definition": {
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
              "$ref": "#/rules@34"
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
            "feature": "returnType",
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
                "$ref": "#/rules@36"
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
                    "$ref": "#/rules@11"
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
                        "$ref": "#/rules@11"
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
      "name": "RotateCommand",
      "returnType": {
        "$ref": "#/interfaces@21"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@21"
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
      "name": "DirectionCommand",
      "returnType": {
        "$ref": "#/interfaces@23"
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
                "$ref": "#/rules@37"
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
        "$ref": "#/interfaces@24"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@24"
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
                "$ref": "#/rules@37"
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
        "$ref": "#/interfaces@25"
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
                  "$ref": "#/interfaces@25"
                }
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
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
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
        "$ref": "#/interfaces@27"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@27"
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
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@19"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "+=",
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
                "feature": "right",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@19"
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
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@22"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "+=",
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
                "feature": "right",
                "operator": "+=",
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
      "name": "PlusMinusDistance",
      "returnType": {
        "$ref": "#/interfaces@12"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "+=",
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
                "feature": "right",
                "operator": "+=",
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
      "name": "MultDivDistance",
      "returnType": {
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "+=",
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
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "right",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@23"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "right",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@43"
                      },
                      "arguments": []
                    }
                  }
                ]
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
        "$ref": "#/interfaces@28"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "num",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@43"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "call",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
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
      "name": "PrimaryExprDistance",
      "returnType": {
        "$ref": "#/interfaces@29"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "dist",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@37"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "call",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "num",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@43"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": "*"
              },
              {
                "$type": "Assignment",
                "feature": "dist",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@37"
                  },
                  "arguments": []
                }
              }
            ]
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
            "feature": "typeV",
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
                "$ref": "#/rules@36"
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
                "$ref": "#/rules@36"
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
            "feature": "callVariable",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@27"
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
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "value",
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
            "feature": "call",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
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
      "name": "And",
      "returnType": {
        "$ref": "#/interfaces@38"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@33"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "AND"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@33"
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
        "$ref": "#/interfaces@39"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "left",
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
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "OR"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
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
        "$ref": "#/interfaces@40"
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
                    "$type": "Assignment",
                    "feature": "not",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@33"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "("
                      },
                      {
                        "$type": "Assignment",
                        "feature": "or",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@32"
                          },
                          "arguments": []
                        }
                      },
                      {
                        "$type": "Keyword",
                        "value": ")"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "exp",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@30"
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
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@32"
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
            "feature": "right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@32"
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
              "$ref": "#/rules@46"
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
              "$ref": "#/rules@46"
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
                  "$ref": "#/rules@46"
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
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
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
                "$ref": "#/rules@43"
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
                "$ref": "#/rules@43"
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
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@40"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "+=",
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
                "feature": "right",
                "operator": "+=",
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
      "name": "MultDivTime",
      "returnType": {
        "$ref": "#/interfaces@15"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@41"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "+=",
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
                "feature": "right",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@41"
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
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "time",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "call",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "time",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@38"
                  },
                  "arguments": []
                }
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
                      "value": "/"
                    },
                    {
                      "$type": "Keyword",
                      "value": "*"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "num",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@43"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "num",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@43"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": "*"
              },
              {
                "$type": "Assignment",
                "feature": "time",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@38"
                  },
                  "arguments": []
                }
              }
            ]
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
      "name": "BooleanType",
      "returnType": {
        "$ref": "#/interfaces@42"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@44"
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
        "$ref": "#/interfaces@43"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@35"
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
          "name": "returnType",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
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
              "$ref": "#/interfaces@18"
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
      "name": "Type",
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
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Time",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
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
              "$ref": "#/interfaces@4"
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
              "$ref": "#/interfaces@43"
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
              "$ref": "#/interfaces@43"
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
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@11"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@11"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "primitiveType": "string"
            }
          },
          "isOptional": false
        }
      ],
      "name": "PlusMinus",
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
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@28"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@28"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "primitiveType": "string"
            }
          },
          "isOptional": false
        }
      ],
      "name": "MultDiv",
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
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@13"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@13"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "primitiveType": "string"
            }
          },
          "isOptional": false
        }
      ],
      "name": "PlusMinusDistance",
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
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@29"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "primitiveType": "string"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "ArrayType",
                "elementType": {
                  "$type": "SimpleType",
                  "typeRef": {
                    "$ref": "#/interfaces@29"
                  }
                }
              },
              {
                "$type": "ArrayType",
                "elementType": {
                  "$type": "SimpleType",
                  "typeRef": {
                    "$ref": "#/interfaces@43"
                  }
                }
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "MultDivDistance",
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
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@15"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@15"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "primitiveType": "string"
            }
          },
          "isOptional": false
        }
      ],
      "name": "PlusMinusTime",
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
          "name": "left",
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
          "name": "right",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@16"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "primitiveType": "string"
            }
          },
          "isOptional": false
        }
      ],
      "name": "MultDivTime",
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
          "name": "call",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@19"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "time",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@9"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operateur",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "num",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@43"
            }
          },
          "isOptional": false
        }
      ],
      "name": "PrimaryExprTime",
      "superTypes": [
        {
          "$ref": "#/interfaces@17"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Expression",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ],
      "attributes": []
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
          "$ref": "#/interfaces@18"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "BooleanExp",
      "superTypes": [
        {
          "$ref": "#/interfaces@17"
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
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          }
        }
      ],
      "name": "RotateCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@22"
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
          "$ref": "#/interfaces@22"
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
          "$ref": "#/interfaces@22"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "ReadSensorCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@22"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "DistanceSensorCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@25"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "TimeSensorCommand",
      "superTypes": [
        {
          "$ref": "#/interfaces@25"
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
              "$ref": "#/interfaces@4"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "call",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@19"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "num",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@43"
            }
          }
        }
      ],
      "name": "PrimaryExprAri",
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
              "$ref": "#/interfaces@4"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "call",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@19"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "num",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@43"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "dist",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          },
          "isOptional": false
        }
      ],
      "name": "PrimaryExprDistance",
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
              "$ref": "#/interfaces@18"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "typeV",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
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
              "$ref": "#/interfaces@17"
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
          "$ref": "#/interfaces@19"
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
                "$ref": "#/interfaces@18"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "CallFunction",
      "superTypes": [
        {
          "$ref": "#/interfaces@19"
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
              "$ref": "#/interfaces@18"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "callVariable",
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
          "$ref": "#/interfaces@18"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "call",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@19"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "value",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@42"
            }
          }
        }
      ],
      "name": "PrimaryExprBool",
      "superTypes": [
        {
          "$ref": "#/interfaces@20"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@40"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@40"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "And",
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
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@38"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@38"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Or",
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
          "name": "not",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@40"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "or",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@39"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "exp",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@37"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Not",
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
          "name": "right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@39"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@39"
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
      "name": "Equals",
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
          "$ref": "#/interfaces@3"
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
          "$ref": "#/interfaces@3"
        }
      ]
    }
  ],
  "types": [],
  "usedGrammars": []
}`));var iG={languageId:"robot",fileExtensions:[".rob"],caseInsensitive:!1},rw={AstReflection:()=>new Bl},nw={Grammar:()=>tw(),LanguageMetaData:()=>iG,parser:{}};function ow(t){let e=t.validation.ValidationRegistry,r=t.validation.RobotValidator,n={DeclarationVariable:r.checkDeclarationVariable,FunctionN:r.checkFunctionReturnType,LOOP:r.checkWhileLoop,IF:r.checkIfLoop,CallVariable:r.checkCallVariable,CallFunction:r.checkCallFunction};e.register(n,r)}var $y=[],ky=[],iw={},Fd=class{checkDeclarationVariable(e,r){let n=["boolean","distance","time","number","void"];for(let i of n)Ey(e.typeV,i);$y.includes(e.nom)&&r("error","Variable ${declarationVariable.name} already declared",{node:e,property:"nom"}),$y.push(e.nom)}checkFunctionReturnType(e,r){ky.includes(e.name)?r("error","Function ${functionN.name} already declared",{node:e,property:"name"}):e.returnType&&!Ey(e.returnType,"void")||e.returnType&&Ey(e.returnType,"void")&&e.returnedValue&&r("error","You should not have a return",{node:e,property:"instruction"}),ky.push(e.name);let n=[];e.parameters.forEach(i=>{n.push(i.typeP.$type)}),iw[e.name]=n}checkCallVariable(e,r){$y.includes(e.nom)||r("error","Variable ${callVariable.name} not declared",{node:e,property:"nom"})}checkCallFunction(e,r){if(!ky.includes(e.nom))r("error","Function ${callFunction.name} not declared",{node:e,property:"nom"});else if(e.parameters.length!=iw[e.nom].length)r("error","Function ${callFunction.name} has ${declaredParams[callFunction.nom].length} parameters",{node:e,property:"nom"});else if(e.parameters.length>0)for(let n=0;n<e.parameters.length;n++);}checkWhileLoop(e,r){}checkIfLoop(e,r){}};function Ey(t,e){return t.$type===e}function H(t,e){switch(t.$type){case"FunctionN":return t.accept(e);case"Instruction":return console.log("instruction"),t.accept(e);case"DirectionCommand":return console.log("direction"),t.accept(e);case"DistanceExpression":return console.log("distanceEXP"),t.accept(e);case"Distance":return console.log("distance"),t.accept(e);case"NumberType":return console.log("number"),t.accept(e);case"RotateCommand":return console.log("rotate"),t.accept(e);case"SpeedCommand":return console.log("speed"),t.accept(e);case"Time":return console.log("time"),t.accept(e);case"TimeExpression":return console.log("timeEXP"),t.accept(e);case"DistanceSensorCommand":return console.log("distSensor"),t.accept(e);case"TimeSensorCommand":return console.log("timeSensor"),t.accept(e);case"CallFunction":return console.log("callFunction"),t.accept(e);case"CallVariable":return console.log("callVariable"),t.accept(e);case"Affectation":return console.log("affectation"),t.accept(e);case"PrimaryExprBool":return console.log("primaryExprBool"),t.accept(e);case"PrimaryExprAri":return console.log("primaryExprAri"),t.accept(e);case"PrimaryExprDistance":return console.log("primaryExprDistance"),t.accept(e);case"PrimaryExprTime":return console.log("primaryExprTime"),t.accept(e);case"MultDiv":return console.log("multDiv"),t.accept(e);case"PlusMinus":return console.log("plusMinus"),t.accept(e);case"MultDivDistance":return console.log("multDivDistance"),t.accept(e);case"PlusMinusDistance":return console.log("plusMinusDistance"),t.accept(e);case"MultDivTime":return console.log("multDivTime"),t.accept(e);case"PlusMinusTime":return console.log("plusMinusTime"),t.accept(e);case"Equals":return console.log("equals"),t.accept(e);case"Or":return console.log("or"),t.accept(e);case"And":return console.log("and"),t.accept(e);case"Not":return console.log("not"),t.accept(e);case"Block":return console.log("block"),t.accept(e);case"DeclarationVariable":return console.log("declarationVariable"),t.accept(e);case"IF":return console.log("if"),t.accept(e);case"LOOP":return console.log("loop"),t.accept(e);case"Parameter":return console.log("parameter"),t.accept(e);case"BooleanType":return console.log("booleanType"),t.accept(e);case"TypeClass":return console.log("typeClass"),t.accept(e);default:throw new Error(`Unknown node type ${t.$type}`)}}var xn=class t{static fromAngle(e,r){return new t(Math.cos(e)*r,Math.sin(e)*r)}static null(){return new t(0,0)}constructor(e,r){this.x=e,this.y=r}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}scale(e){return new t(this.x*e,this.y*e)}projX(){return new t(this.x,0)}projY(){return new t(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}},Ud=class{constructor(e,r){this.origin=e,this.vector=r}intersect(e){let r=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),r=r.concat(o)}return this.findClosestIntersection(r)}findClosestIntersection(e){let r=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,r=i)}return e[r]}else return}getPoiFinder(){return(e,r)=>{let n=e.minus(r),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,l=n.x*s.y-s.x*n.y,c=a/o,u=-l/o;if(c>0&&c<1&&u>0)return e.plus(n.scale(-c))}}}};var zl=class{constructor(e,r,n,i,o){this.type="Robot",this.pos=e,this.size=r,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){return[]}turn(e){this.rad+=e*Math.PI/180;let r=e/this.speed*250;this.scene.time+=r,this.scene.timestamps.push(new Oo(this.scene.time,this))}move(e){let r=Math.cos(this.rad)*e,n=Math.sin(this.rad)*e;this.pos.x+=r,this.pos.y+=n;let i=e/this.speed*250;this.scene.time+=i,this.scene.timestamps.push(new Oo(this.scene.time,this))}side(e){let r=this.rad-Math.PI/2,n=Math.cos(r)*e,i=Math.sin(r)*e;this.pos.x+=n,this.pos.y+=i;let o=e/this.speed*250;this.scene.time+=o,this.scene.timestamps.push(new Oo(this.scene.time,this))}getRay(){return new Ud(this.pos,xn.fromAngle(this.rad,1e4).scale(-1))}},Oo=class extends zl{constructor(e,r){super(r.pos.scale(1),r.size.scale(1),r.rad,r.speed,r.scene),this.rad=r.rad,this.time=e}};var Lo=class{constructor(e,r){this.type="Wall",this.pos=e,this.size=r}intersect(e){let r=e.getPoiFinder()(this.pos,this.size);return r?[r]:[]}};var qd=class{constructor(e=new xn(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new zl(this.size.scale(.5),new xn(250,250),0,30,this),this.entities.push(new Lo(xn.null(),this.size.projX())),this.entities.push(new Lo(xn.null(),this.size.projY())),this.entities.push(new Lo(this.size,this.size.projY())),this.entities.push(new Lo(this.size,this.size.projX())),this.timestamps.push(new Oo(0,this.robot))}};var Gd=class{constructor(e,r){this.scene=new qd(new xn(e*10,r*10)),this.robot=this.scene.robot,this.variables=Array(),this.wait=!1,this.niveau=0,this.functions=Array()}visitRobot(e){let r;for(let n of e.functions)n.returnType?this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:H(n.returnType,this)}):this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:void 0}),n.name==="main"&&(r=n);return H(r,this),this.scene}visitInstruction(e){H(e,this)}visitFunctionN(e){this.niveau++;for(let r of e.instruction)H(r,this);if(e.returnType&&e.returnedValue)return H(e.returnedValue,this)}visitExpressionBase(e){H(e,this)}visitDistanceExpression(e){let r=H(e.unit,this),n=H(e.number,this);return r==="cm"&&(n=n*10),n}visitTimeExpression(e){return H(e.number,this)}visitDistance(e){return e.typeD}visitTime(e){}visitDirectionCommand(e){if(e.operateur==="FORWARD"){let r=H(e.distance,this);this.robot.move(r)}else e.operateur==="BACKWARD"?this.robot.move(-H(e.distance,this)):e.operateur==="LEFT"?this.robot.side(-H(e.distance,this)):e.operateur==="RIGHT"&&this.robot.side(H(e.distance,this))}visitSpeedCommand(e){let r=H(e.speed,this);this.robot.speed=r}visitDistanceSensorCommand(e){let r=this.robot.getRay().intersect(this.scene.entities);return r?this.robot.pos.minus(r).norm():-1}visitTimeSensorCommand(e){return this.scene.time}visitRotateCommand(e){this.robot.turn(e.angle)}visitCallVariable(e){var r;let n=e.nom,i=this.niveau,o;for(;i>=0;){if(this.variables[i].has(n)){o=(r=this.variables[i].get(n))===null||r===void 0?void 0:r.value;break}i--}return o}visitCallFunction(e){let r=e.nom,n=this.functions.find(i=>i.name===r);if(this.niveau++,n&&n.parameters&&n.parameters.length>0){console.log("mdr nullos1");let i=0;this.variables[this.niveau]=new Map;for(let o of n.parameters)this.variables[this.niveau].set(o.nom,{name:o.nom,type:H(o.typeP,this),value:H(e.parameters[i],this),niveau:this.niveau}),i++}n&&H(n.func,this),n&&n.parameters&&n.parameters.length>0&&(console.log("mdr nullos"),console.log(n.parameters),this.variables[this.niveau].clear()),this.niveau--}visitAffectation(e){let r=e.callVariable.nom,n=this.niveau;for(;n>=0;){if(this.variables[n].has(r)){let i=this.variables[n].get(r);i&&(i.value=H(e.expressionbase,this));break}n--}}visitBooleanType(e){return e.value}visitNumberType(e){return e.value}visitPlusMinus(e){let r=H(e.left,this),n=0;for(let i of e.right)e.operateur[n]==="+"?r=r+H(i,this):r=r-H(i,this);return r}visitMultDiv(e){let r=H(e.left,this),n=0;for(let i of e.right)e.operateur[n]==="*"?r=r*H(i,this):r=r/H(i,this);return r}visitPlusMinusDistance(e){let r=H(e.left,this),n=0;for(let i of e.right)e.operateur[n]==="+"?r=r+H(i,this):r=r-H(i,this)}visitMultDivDistance(e){let r=H(e.left,this),n=0;for(let i of e.right)e.operateur[n]==="*"?r=r*H(i,this):r=r/H(i,this)}visitPlusMinusTime(e){let r=H(e.left,this),n=0;for(let i of e.right)e.operateur[n]==="+"?r=r+H(i,this):r=r-H(i,this)}visitMultDivTime(e){let r=H(e.left,this),n=0;for(let i of e.right)e.operateur[n]==="*"?r=r*H(i,this):r=r/H(i,this)}visitDeclarationVariable(e){this.variables[this.niveau].set(e.nom,{name:e.nom,type:H(e.typeV,this),value:H(e.expressionbase,this),niveau:this.niveau})}visitPrimaryExprAri(e){if(e.num)return H(e.num,this);if(e.call)return H(e.call,this)}visitPrimaryExprBool(e){if(e.value)return H(e.value,this);if(e.call)return H(e.call,this)}visitPrimaryExprDistance(e){if(e.call)return H(e.call,this);if(e.num)return H(e.num,this)*H(e.dist,this);if(e.dist&&!e.num)return H(e.dist,this)}visitBlock(e){throw new Error("Method not implemented.")}visitIF(e){throw new Error("Method not implemented.")}visitLOOP(e){throw new Error("Method not implemented.")}visitAnd(e){if(e.right.length==0)return H(e.left,this);{let r=H(e.left,this);for(let n of e.right)r=r&&H(n,this);return r}}visitOr(e){if(e.right.length==0)return H(e.left,this);{let r=H(e.left,this);for(let n of e.right)r=r||H(n,this);return r}}visitNot(e){return e.or?!H(e.or,this):e.not?!H(e.not,this):H(e.exp,this)}visitEquals(e){let r=e.operateur;if(r==="==")return H(e.left,this)===H(e.right,this);if(r==="!=")return H(e.left,this)!==H(e.right,this)}visitPrimaryExprTime(e){return e.call?H(e.call,this):e.time&&e.operateur?e.operateur==="*"?H(e.time,this)*H(e.num,this):H(e.time,this)/H(e.num,this):e.time&&!e.operateur?H(e.time,this)*H(e.num,this):H(e.time,this)}visitParameter(e){}visitTypeClass(e){return e.typeT}};function sw(t,e,r){let n=new Gd(e,r);return t.accept(n)}async function sG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,th.parse("memory://robot.document"));return await e.shared.workspace.DocumentBuilder.build([n],{validation:!0}),(r=n.parseResult)===null||r===void 0?void 0:r.value}async function aw(t){let e=t[0],r=t[1],n=t[2],i=jd(Ps).Robot,o=await sG(e,i),s=sw(o,r,n);return Promise.resolve(s)}function lw(t){let e=t.validation.ValidationRegistry,r=t.validation.RoboMlAcceptWeaver;e.register(r.checks,r)}var Hd=class{constructor(){this.checks={Robot:this.weaveRobot,Instruction:this.weaveInstruction,FunctionN:this.weaveFunctionN,ExpressionBase:this.weaveExpressionBase,DistanceExpression:this.weaveDistanceExpression,TimeExpression:this.weaveTimeExpression,Distance:this.weaveDistance,Time:this.weaveTime,DirectionCommand:this.weaveDirectionCommand,SpeedCommand:this.weaveSpeedCommand,DistanceSensorCommand:this.weaveDistanceSensorCommand,TimeSensorCommand:this.weaveTimeSensorCommand,RotateCommand:this.weaveRotateCommand,CallVariable:this.weaveCallVariable,CallFunction:this.weaveCallFunction,Affectation:this.weaveAffectation,BooleanType:this.weaveBooleanType,NumberType:this.weaveNumberType,PlusMinus:this.weavePlusMinus,MultDiv:this.weaveMultDiv,PlusMinusDistance:this.weavePlusMinusDistance,MultDivDistance:this.weaveMultDivDistance,PlusMinusTime:this.weavePlusMinusTime,MultDivTime:this.weaveMultDivTime,DeclarationVariable:this.weaveDeclarationVariable,PrimaryExprAri:this.weavePrimaryExprAri,PrimaryExprBool:this.weavePrimaryExprBool,PrimaryExprDistance:this.weavePrimaryExprDistance,Block:this.weaveBlock,IF:this.weaveIF,LOOP:this.weaveLOOP,And:this.weaveAnd,Or:this.weaveOr,Not:this.weaveNot,Equals:this.weaveEquals}}weaveRobot(e,r){e.accept=n=>n.visitRobot(e)}weaveInstruction(e,r){e.accept=n=>n.visitInstruction(e)}weaveFunctionN(e,r){e.accept=n=>n.visitFunctionN(e)}weaveExpressionBase(e,r){e.accept=n=>n.visitExpressionBase(e)}weaveDistanceExpression(e,r){e.accept=n=>n.visitDistanceExpression(e)}weaveTimeExpression(e,r){e.accept=n=>n.visitTimeExpression(e)}weaveDistance(e,r){e.accept=n=>n.visitDistance(e)}weaveTime(e,r){e.accept=n=>n.visitTime(e)}weaveDirectionCommand(e,r){e.accept=n=>n.visitDirectionCommand(e)}weaveSpeedCommand(e,r){e.accept=n=>n.visitSpeedCommand(e)}weaveDistanceSensorCommand(e,r){e.accept=n=>n.visitDistanceSensorCommand(e)}weaveTimeSensorCommand(e,r){e.accept=n=>n.visitTimeSensorCommand(e)}weaveRotateCommand(e,r){e.accept=n=>n.visitRotateCommand(e)}weaveCallVariable(e,r){e.accept=n=>n.visitCallVariable(e)}weaveCallFunction(e,r){e.accept=n=>n.visitCallFunction(e)}weaveAffectation(e,r){e.accept=n=>n.visitAffectation(e)}weaveBooleanType(e,r){e.accept=n=>n.visitBooleanType(e)}weaveNumberType(e,r){e.accept=n=>n.visitNumberType(e)}weavePlusMinus(e,r){e.accept=n=>n.visitPlusMinus(e)}weaveMultDiv(e,r){e.accept=n=>n.visitMultDiv(e)}weavePlusMinusDistance(e,r){e.accept=n=>n.visitPlusMinusDistance(e)}weaveMultDivDistance(e,r){e.accept=n=>n.visitMultDivDistance(e)}weavePlusMinusTime(e,r){e.accept=n=>n.visitPlusMinusTime(e)}weaveMultDivTime(e,r){e.accept=n=>n.visitMultDivTime(e)}weaveDeclarationVariable(e,r){e.accept=n=>n.visitDeclarationVariable(e)}weavePrimaryExprAri(e,r){e.accept=n=>n.visitPrimaryExprAri(e)}weavePrimaryExprBool(e,r){e.accept=n=>n.visitPrimaryExprBool(e)}weavePrimaryExprDistance(e,r){e.accept=n=>n.visitPrimaryExprDistance(e)}weaveBlock(e,r){e.accept=n=>n.visitBlock(e)}weaveIF(e,r){e.accept=n=>n.visitIF(e)}weaveLOOP(e,r){e.accept=n=>n.visitLOOP(e)}weaveAnd(e,r){e.accept=n=>n.visitAnd(e)}weaveOr(e,r){e.accept=n=>n.visitOr(e)}weaveNot(e,r){e.accept=n=>n.visitNot(e)}weaveEquals(e,r){e.accept=n=>n.visitEquals(e)}};var Ny=class extends Ou{registerCommands(e){e("parseAndGenerate",r=>aw(r[0]))}},aG={validation:{RobotValidator:()=>new Fd,RoboMlAcceptWeaver:()=>new Hd}};function jd(t){let e=po(yl(t),rw),r=po(hl({shared:e}),nw,aG);return e.lsp.ExecuteCommandHandler=new Ny,e.ServiceRegistry.register(r),ow(r),lw(r),{shared:e,Robot:r}}var lG=new xa.BrowserMessageReader(self),cG=new xa.BrowserMessageWriter(self),uG=(0,xa.createConnection)(lG,cG),{shared:fG}=jd(Object.assign({connection:uG},Ps));Wx(fG);})();
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
