"use strict";(()=>{var ES=Object.create;var np=Object.defineProperty;var $S=Object.getOwnPropertyDescriptor;var NS=Object.getOwnPropertyNames;var _S=Object.getPrototypeOf,PS=Object.prototype.hasOwnProperty;var Gy=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),IS=(t,e)=>{for(var r in e)np(t,r,{get:e[r],enumerable:!0})},DS=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of NS(e))!PS.call(t,i)&&i!==r&&np(t,i,{get:()=>e[i],enumerable:!(n=$S(e,i))||n.enumerable});return t};var me=(t,e,r)=>(r=t!=null?ES(_S(t)):{},DS(e||!t||!t.__esModule?np(r,"default",{value:t,enumerable:!0}):r,t));var Vn=H(sp=>{"use strict";Object.defineProperty(sp,"__esModule",{value:!0});var ip;function op(){if(ip===void 0)throw new Error("No runtime abstraction layer installed");return ip}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");ip=r}t.install=e})(op||(op={}));sp.default=op});var ap=H(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.Disposable=void 0;var OS;(function(t){function e(r){return{dispose:r}}t.create=e})(OS=ka.Disposable||(ka.Disposable={}))});var oo=H(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.Emitter=io.Event=void 0;var LS=Vn(),MS;(function(t){let e={dispose(){}};t.None=function(){return e}})(MS=io.Event||(io.Event={}));var lp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,LS.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},oc=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new lp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};io.Emitter=oc;oc._noop=function(){}});var jy=H(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.AbstractMessageBuffer=void 0;var FS=13,US=10,qS=`\r
`,cp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let l=this._chunks[r];for(n=0;n<l.length;){switch(l[n]){case FS:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case US:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=l.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(qS);if(a.length<2)return s;for(let l=0;l<a.length-2;l++){let c=a[l],u=c.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=c.substr(0,u),m=c.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};sc.AbstractMessageBuffer=cp});var By=H(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});var Ky=Vn(),Ko=ap(),GS=oo(),jS=jy(),ac=class t extends jS.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};ac.emptyBuffer=new Uint8Array(0);var up=class{constructor(e){this.socket=e,this._onData=new GS.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Ky.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Ko.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ko.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ko.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},fp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Ko.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ko.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ko.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},KS=new TextEncoder,Hy=Object.freeze({messageBuffer:Object.freeze({create:t=>new ac(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(KS.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new up(t),asWritableStream:t=>new fp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function dp(){return Hy}(function(t){function e(){Ky.default.install(Hy)}t.install=e})(dp||(dp={}));pp.default=dp});var Ho=H(nr=>{"use strict";Object.defineProperty(nr,"__esModule",{value:!0});nr.stringArray=nr.array=nr.func=nr.error=nr.number=nr.string=nr.boolean=void 0;function HS(t){return t===!0||t===!1}nr.boolean=HS;function Wy(t){return typeof t=="string"||t instanceof String}nr.string=Wy;function BS(t){return typeof t=="number"||t instanceof Number}nr.number=BS;function WS(t){return t instanceof Error}nr.error=WS;function zS(t){return typeof t=="function"}nr.func=zS;function zy(t){return Array.isArray(t)}nr.array=zy;function VS(t){return zy(t)&&t.every(e=>Wy(e))}nr.stringArray=VS});var Mp=H(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.Message=X.NotificationType9=X.NotificationType8=X.NotificationType7=X.NotificationType6=X.NotificationType5=X.NotificationType4=X.NotificationType3=X.NotificationType2=X.NotificationType1=X.NotificationType0=X.NotificationType=X.RequestType9=X.RequestType8=X.RequestType7=X.RequestType6=X.RequestType5=X.RequestType4=X.RequestType3=X.RequestType2=X.RequestType1=X.RequestType=X.RequestType0=X.AbstractMessageSignature=X.ParameterStructures=X.ResponseError=X.ErrorCodes=void 0;var so=Ho(),Vy;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Vy=X.ErrorCodes||(X.ErrorCodes={}));var mp=class t extends Error{constructor(e,r,n){super(r),this.code=so.number(e)?e:Vy.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};X.ResponseError=mp;var br=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};X.ParameterStructures=br;br.auto=new br("auto");br.byPosition=new br("byPosition");br.byName=new br("byName");var Ye=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return br.auto}};X.AbstractMessageSignature=Ye;var hp=class extends Ye{constructor(e){super(e,0)}};X.RequestType0=hp;var yp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType=yp;var gp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.RequestType1=gp;var Tp=class extends Ye{constructor(e){super(e,2)}};X.RequestType2=Tp;var vp=class extends Ye{constructor(e){super(e,3)}};X.RequestType3=vp;var xp=class extends Ye{constructor(e){super(e,4)}};X.RequestType4=xp;var Rp=class extends Ye{constructor(e){super(e,5)}};X.RequestType5=Rp;var bp=class extends Ye{constructor(e){super(e,6)}};X.RequestType6=bp;var Cp=class extends Ye{constructor(e){super(e,7)}};X.RequestType7=Cp;var Ap=class extends Ye{constructor(e){super(e,8)}};X.RequestType8=Ap;var wp=class extends Ye{constructor(e){super(e,9)}};X.RequestType9=wp;var Sp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType=Sp;var kp=class extends Ye{constructor(e){super(e,0)}};X.NotificationType0=kp;var Ep=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};X.NotificationType1=Ep;var $p=class extends Ye{constructor(e){super(e,2)}};X.NotificationType2=$p;var Np=class extends Ye{constructor(e){super(e,3)}};X.NotificationType3=Np;var _p=class extends Ye{constructor(e){super(e,4)}};X.NotificationType4=_p;var Pp=class extends Ye{constructor(e){super(e,5)}};X.NotificationType5=Pp;var Ip=class extends Ye{constructor(e){super(e,6)}};X.NotificationType6=Ip;var Dp=class extends Ye{constructor(e){super(e,7)}};X.NotificationType7=Dp;var Op=class extends Ye{constructor(e){super(e,8)}};X.NotificationType8=Op;var Lp=class extends Ye{constructor(e){super(e,9)}};X.NotificationType9=Lp;var XS;(function(t){function e(i){let o=i;return o&&so.string(o.method)&&(so.string(o.id)||so.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&so.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(so.string(o.id)||so.number(o.id)||o.id===null)}t.isResponse=n})(XS=X.Message||(X.Message={}))});var Up=H(Xn=>{"use strict";var Xy;Object.defineProperty(Xn,"__esModule",{value:!0});Xn.LRUCache=Xn.LinkedMap=Xn.Touch=void 0;var dr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(dr=Xn.Touch||(Xn.Touch={}));var lc=class{constructor(){this[Xy]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=dr.None){let n=this._map.get(e);if(n)return r!==dr.None&&this.touch(n,r),n.value}set(e,r,n=dr.None){let i=this._map.get(e);if(i)i.value=r,n!==dr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case dr.None:this.addItemLast(i);break;case dr.First:this.addItemFirst(i);break;case dr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(Xy=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==dr.First&&r!==dr.Last)){if(r===dr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===dr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Xn.LinkedMap=lc;var Fp=class extends lc{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=dr.AsNew){return super.get(e,r)}peek(e){return super.get(e,dr.None)}set(e,r){return super.set(e,r,dr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Xn.LRUCache=Fp});var Kp=H(ao=>{"use strict";Object.defineProperty(ao,"__esModule",{value:!0});ao.CancellationTokenSource=ao.CancellationToken=void 0;var YS=Vn(),JS=Ho(),qp=oo(),Gp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:qp.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:qp.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||JS.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Gp=ao.CancellationToken||(ao.CancellationToken={}));var QS=Object.freeze(function(t,e){let r=(0,YS.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),cc=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?QS:(this._emitter||(this._emitter=new qp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},jp=class{get token(){return this._token||(this._token=new cc),this._token}cancel(){this._token?this._token.cancel():this._token=Gp.Cancelled}dispose(){this._token?this._token instanceof cc&&this._token.dispose():this._token=Gp.None}};ao.CancellationTokenSource=jp});var Yy=H(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.ReadableStreamMessageReader=Yn.AbstractMessageReader=Yn.MessageReader=void 0;var Bp=Vn(),Bo=Ho(),Hp=oo(),ZS;(function(t){function e(r){let n=r;return n&&Bo.func(n.listen)&&Bo.func(n.dispose)&&Bo.func(n.onError)&&Bo.func(n.onClose)&&Bo.func(n.onPartialMessage)}t.is=e})(ZS=Yn.MessageReader||(Yn.MessageReader={}));var uc=class{constructor(){this.errorEmitter=new Hp.Emitter,this.closeEmitter=new Hp.Emitter,this.partialMessageEmitter=new Hp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Bo.string(e.message)?e.message:"unknown"}`)}};Yn.AbstractMessageReader=uc;var Wp;(function(t){function e(r){let n,i,o,s=new Map,a,l=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let c of r.contentDecoders)s.set(c.name,c);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,l.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let c of r.contentTypeDecoders)l.set(c.name,c)}return a===void 0&&(a=(0,Bp.default)().applicationJson.decoder,l.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:l}}t.fromOptions=e})(Wp||(Wp={}));var zp=class extends uc{constructor(e,r){super(),this.readable=e,this.options=Wp.fromOptions(r),this.buffer=(0,Bp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Bp.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Yn.ReadableStreamMessageReader=zp});var Jy=H(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.Semaphore=void 0;var ek=Vn(),Vp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,ek.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};fc.Semaphore=Vp});var tg=H(Jn=>{"use strict";Object.defineProperty(Jn,"__esModule",{value:!0});Jn.WriteableStreamMessageWriter=Jn.AbstractMessageWriter=Jn.MessageWriter=void 0;var Qy=Vn(),Ea=Ho(),tk=Jy(),Zy=oo(),rk="Content-Length: ",eg=`\r
`,nk;(function(t){function e(r){let n=r;return n&&Ea.func(n.dispose)&&Ea.func(n.onClose)&&Ea.func(n.onError)&&Ea.func(n.write)}t.is=e})(nk=Jn.MessageWriter||(Jn.MessageWriter={}));var dc=class{constructor(){this.errorEmitter=new Zy.Emitter,this.closeEmitter=new Zy.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Ea.string(e.message)?e.message:"unknown"}`)}};Jn.AbstractMessageWriter=dc;var Xp;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Qy.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Qy.default)().applicationJson.encoder}}t.fromOptions=e})(Xp||(Xp={}));var Yp=class extends dc{constructor(e,r){super(),this.writable=e,this.options=Xp.fromOptions(r),this.errorCount=0,this.writeSemaphore=new tk.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(rk,n.byteLength.toString(),eg),i.push(eg),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Jn.WriteableStreamMessageWriter=Yp});var ag=H(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.createMessageConnection=J.ConnectionOptions=J.CancellationStrategy=J.CancellationSenderStrategy=J.CancellationReceiverStrategy=J.ConnectionStrategy=J.ConnectionError=J.ConnectionErrors=J.LogTraceNotification=J.SetTraceNotification=J.TraceFormat=J.TraceValues=J.Trace=J.NullLogger=J.ProgressType=J.ProgressToken=void 0;var rg=Vn(),It=Ho(),ee=Mp(),ng=Up(),$a=oo(),Jp=Kp(),_a;(function(t){t.type=new ee.NotificationType("$/cancelRequest")})(_a||(_a={}));var ig;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(ig=J.ProgressToken||(J.ProgressToken={}));var Na;(function(t){t.type=new ee.NotificationType("$/progress")})(Na||(Na={}));var Qp=class{constructor(){}};J.ProgressType=Qp;var Zp;(function(t){function e(r){return It.func(r)}t.is=e})(Zp||(Zp={}));J.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ne;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ne=J.Trace||(J.Trace={}));var ik;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(ik=J.TraceValues||(J.TraceValues={}));(function(t){function e(n){if(!It.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ne=J.Trace||(J.Trace={}));var nn;(function(t){t.Text="text",t.JSON="json"})(nn=J.TraceFormat||(J.TraceFormat={}));(function(t){function e(r){return It.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(nn=J.TraceFormat||(J.TraceFormat={}));var og;(function(t){t.type=new ee.NotificationType("$/setTrace")})(og=J.SetTraceNotification||(J.SetTraceNotification={}));var em;(function(t){t.type=new ee.NotificationType("$/logTrace")})(em=J.LogTraceNotification||(J.LogTraceNotification={}));var pc;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(pc=J.ConnectionErrors||(J.ConnectionErrors={}));var Wo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};J.ConnectionError=Wo;var sg;(function(t){function e(r){let n=r;return n&&It.func(n.cancelUndispatched)}t.is=e})(sg=J.ConnectionStrategy||(J.ConnectionStrategy={}));var tm;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Jp.CancellationTokenSource}});function e(r){let n=r;return n&&It.func(n.createCancellationTokenSource)}t.is=e})(tm=J.CancellationReceiverStrategy||(J.CancellationReceiverStrategy={}));var rm;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(_a.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}t.is=e})(rm=J.CancellationSenderStrategy||(J.CancellationSenderStrategy={}));var nm;(function(t){t.Message=Object.freeze({receiver:tm.Message,sender:rm.Message});function e(r){let n=r;return n&&tm.is(n.receiver)&&rm.is(n.sender)}t.is=e})(nm=J.CancellationStrategy||(J.CancellationStrategy={}));var ok;(function(t){function e(r){let n=r;return n&&(nm.is(n.cancellationStrategy)||sg.is(n.connectionStrategy))}t.is=e})(ok=J.ConnectionOptions||(J.ConnectionOptions={}));var on;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(on||(on={}));function sk(t,e,r,n){let i=r!==void 0?r:J.NullLogger,o=0,s=0,a=0,l="2.0",c,u=new Map,f,m=new Map,T=new Map,C,A=new ng.LinkedMap,N=new Map,w=new Set,v=new Map,g=Ne.Off,$=nn.Text,D,K=on.New,se=new $a.Emitter,$e=new $a.Emitter,Ht=new $a.Emitter,Rt=new $a.Emitter,M=new $a.Emitter,S=n&&n.cancellationStrategy?n.cancellationStrategy:nm.Message;function q(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ue(){return"not-"+(++s).toString()}function te(x,I){ee.Message.isRequest(I)?x.set(q(I.id),I):ee.Message.isResponse(I)?x.set(j(I.id),I):x.set(ue(),I)}function Z(x){}function bt(){return K===on.Listening}function ft(){return K===on.Closed}function ye(){return K===on.Disposed}function Nr(){(K===on.New||K===on.Listening)&&(K=on.Closed,$e.fire(void 0))}function Bn(x){se.fire([x,void 0,void 0])}function wa(x){se.fire(x)}t.onClose(Nr),t.onError(Bn),e.onClose(Nr),e.onError(wa);function eo(){C||A.size===0||(C=(0,rg.default)().timer.setImmediate(()=>{C=void 0,fr()}))}function fr(){if(A.size===0)return;let x=A.shift();try{ee.Message.isRequest(x)?Ct(x):ee.Message.isNotification(x)?Cn(x):ee.Message.isResponse(x)?tr(x):Bt(x)}finally{eo()}}let qo=x=>{try{if(ee.Message.isNotification(x)&&x.method===_a.type.method){let I=x.params.id,F=q(I),z=A.get(F);if(ee.Message.isRequest(z)){let Le=n?.connectionStrategy,Qe=Le&&Le.cancelUndispatched?Le.cancelUndispatched(z,Z):void 0;if(Qe&&(Qe.error!==void 0||Qe.result!==void 0)){A.delete(F),v.delete(I),Qe.id=z.id,Rr(Qe,x.method,Date.now()),e.write(Qe).catch(()=>i.error("Sending response for canceled message failed."));return}}let Oe=v.get(I);if(Oe!==void 0){Oe.cancel(),bi(x);return}else w.add(I)}te(A,x)}finally{eo()}};function Ct(x){if(ye())return;function I(de,qe,ve){let gt={jsonrpc:l,id:x.id};de instanceof ee.ResponseError?gt.error=de.toJson():gt.result=de===void 0?null:de,Rr(gt,qe,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}function F(de,qe,ve){let gt={jsonrpc:l,id:x.id,error:de.toJson()};Rr(gt,qe,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}function z(de,qe,ve){de===void 0&&(de=null);let gt={jsonrpc:l,id:x.id,result:de};Rr(gt,qe,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}to(x);let Oe=u.get(x.method),Le,Qe;Oe&&(Le=Oe.type,Qe=Oe.handler);let At=Date.now();if(Qe||c){let de=x.id??String(Date.now()),qe=S.receiver.createCancellationTokenSource(de);x.id!==null&&w.has(x.id)&&qe.cancel(),x.id!==null&&v.set(de,qe);try{let ve;if(Qe)if(x.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){F(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Le.numberOfParams} params but received none.`),x.method,At);return}ve=Qe(qe.token)}else if(Array.isArray(x.params)){if(Le!==void 0&&Le.parameterStructures===ee.ParameterStructures.byName){F(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,At);return}ve=Qe(...x.params,qe.token)}else{if(Le!==void 0&&Le.parameterStructures===ee.ParameterStructures.byPosition){F(new ee.ResponseError(ee.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,At);return}ve=Qe(x.params,qe.token)}else c&&(ve=c(x.method,x.params,qe.token));let gt=ve;ve?gt.then?gt.then(rr=>{v.delete(de),I(rr,x.method,At)},rr=>{v.delete(de),rr instanceof ee.ResponseError?F(rr,x.method,At):rr&&It.string(rr.message)?F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${rr.message}`),x.method,At):F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}):(v.delete(de),I(ve,x.method,At)):(v.delete(de),z(ve,x.method,At))}catch(ve){v.delete(de),ve instanceof ee.ResponseError?I(ve,x.method,At):ve&&It.string(ve.message)?F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${ve.message}`),x.method,At):F(new ee.ResponseError(ee.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}}else F(new ee.ResponseError(ee.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,At)}function tr(x){if(!ye())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let I=x.id,F=N.get(I);if(ep(x,F),F!==void 0){N.delete(I);try{if(x.error){let z=x.error;F.reject(new ee.ResponseError(z.code,z.message,z.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${F.method}' failed with message: ${z.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function Cn(x){if(ye())return;let I,F;if(x.method===_a.type.method){let z=x.params.id;w.delete(z),bi(x);return}else{let z=m.get(x.method);z&&(F=z.handler,I=z.type)}if(F||f)try{if(bi(x),F)if(x.params===void 0)I!==void 0&&I.numberOfParams!==0&&I.parameterStructures!==ee.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let z=x.params;x.method===Na.type.method&&z.length===2&&ig.is(z[0])?F({token:z[0],value:z[1]}):(I!==void 0&&(I.parameterStructures===ee.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),I.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received ${z.length} arguments`)),F(...z))}else I!==void 0&&I.parameterStructures===ee.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(z){z.message?i.error(`Notification handler '${x.method}' failed with message: ${z.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Ht.fire(x)}function Bt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let I=x;if(It.string(I.id)||It.number(I.id)){let F=I.id,z=N.get(F);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function dt(x){if(x!=null)switch(g){case Ne.Verbose:return JSON.stringify(x,null,4);case Ne.Compact:return JSON.stringify(x);default:return}}function jr(x){if(!(g===Ne.Off||!D))if($===nn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&x.params&&(I=`Params: ${dt(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,I)}else Ci("send-request",x)}function _r(x){if(!(g===Ne.Off||!D))if($===nn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&(x.params?I=`Params: ${dt(x.params)}

`:I=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,I)}else Ci("send-notification",x)}function Rr(x,I,F){if(!(g===Ne.Off||!D))if($===nn.Text){let z;(g===Ne.Verbose||g===Ne.Compact)&&(x.error&&x.error.data?z=`Error data: ${dt(x.error.data)}

`:x.result?z=`Result: ${dt(x.result)}

`:x.error===void 0&&(z=`No result returned.

`)),D.log(`Sending response '${I} - (${x.id})'. Processing request took ${Date.now()-F}ms`,z)}else Ci("send-response",x)}function to(x){if(!(g===Ne.Off||!D))if($===nn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&x.params&&(I=`Params: ${dt(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,I)}else Ci("receive-request",x)}function bi(x){if(!(g===Ne.Off||!D||x.method===em.type.method))if($===nn.Text){let I;(g===Ne.Verbose||g===Ne.Compact)&&(x.params?I=`Params: ${dt(x.params)}

`:I=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,I)}else Ci("receive-notification",x)}function ep(x,I){if(!(g===Ne.Off||!D))if($===nn.Text){let F;if((g===Ne.Verbose||g===Ne.Compact)&&(x.error&&x.error.data?F=`Error data: ${dt(x.error.data)}

`:x.result?F=`Result: ${dt(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),I){let z=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${I.method} - (${x.id})' in ${Date.now()-I.timerStart}ms.${z}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else Ci("receive-response",x)}function Ci(x,I){if(!D||g===Ne.Off)return;let F={isLSPMessage:!0,type:x,message:I,timestamp:Date.now()};D.log(F)}function ro(){if(ft())throw new Wo(pc.Closed,"Connection is closed.");if(ye())throw new Wo(pc.Disposed,"Connection is disposed.")}function tp(){if(bt())throw new Wo(pc.AlreadyListening,"Connection is already listening")}function rp(){if(!bt())throw new Error("Call listen() first.")}function no(x){return x===void 0?null:x}function Go(x){if(x!==null)return x}function rc(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function Sa(x,I){switch(x){case ee.ParameterStructures.auto:return rc(I)?Go(I):[no(I)];case ee.ParameterStructures.byName:if(!rc(I))throw new Error("Received parameters by name but param is not an object literal.");return Go(I);case ee.ParameterStructures.byPosition:return[no(I)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function nc(x,I){let F,z=x.numberOfParams;switch(z){case 0:F=void 0;break;case 1:F=Sa(x.parameterStructures,I[0]);break;default:F=[];for(let Oe=0;Oe<I.length&&Oe<z;Oe++)F.push(no(I[Oe]));if(I.length<z)for(let Oe=I.length;Oe<z;Oe++)F.push(null);break}return F}let Ai={sendNotification:(x,...I)=>{ro();let F,z;if(It.string(x)){F=x;let Le=I[0],Qe=0,At=ee.ParameterStructures.auto;ee.ParameterStructures.is(Le)&&(Qe=1,At=Le);let de=I.length,qe=de-Qe;switch(qe){case 0:z=void 0;break;case 1:z=Sa(At,I[Qe]);break;default:if(At===ee.ParameterStructures.byName)throw new Error(`Received ${qe} parameters for 'by Name' notification parameter structure.`);z=I.slice(Qe,de).map(ve=>no(ve));break}}else{let Le=I;F=x.method,z=nc(x,Le)}let Oe={jsonrpc:l,method:F,params:z};return _r(Oe),e.write(Oe).catch(()=>i.error("Sending notification failed."))},onNotification:(x,I)=>{ro();let F;return It.func(x)?f=x:I&&(It.string(x)?(F=x,m.set(x,{type:void 0,handler:I})):(F=x.method,m.set(x.method,{type:x,handler:I}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,I,F)=>{if(T.has(I))throw new Error(`Progress handler for token ${I} already registered`);return T.set(I,F),{dispose:()=>{T.delete(I)}}},sendProgress:(x,I,F)=>Ai.sendNotification(Na.type,{token:I,value:F}),onUnhandledProgress:Rt.event,sendRequest:(x,...I)=>{ro(),rp();let F,z,Oe;if(It.string(x)){F=x;let de=I[0],qe=I[I.length-1],ve=0,gt=ee.ParameterStructures.auto;ee.ParameterStructures.is(de)&&(ve=1,gt=de);let rr=I.length;Jp.CancellationToken.is(qe)&&(rr=rr-1,Oe=qe);let Wn=rr-ve;switch(Wn){case 0:z=void 0;break;case 1:z=Sa(gt,I[ve]);break;default:if(gt===ee.ParameterStructures.byName)throw new Error(`Received ${Wn} parameters for 'by Name' request parameter structure.`);z=I.slice(ve,rr).map(An=>no(An));break}}else{let de=I;F=x.method,z=nc(x,de);let qe=x.numberOfParams;Oe=Jp.CancellationToken.is(de[qe])?de[qe]:void 0}let Le=o++,Qe;return Oe&&(Qe=Oe.onCancellationRequested(()=>{let de=S.sender.sendCancellation(Ai,Le);return de===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):de.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((de,qe)=>{let ve={jsonrpc:l,id:Le,method:F,params:z},gt=An=>{de(An),S.sender.cleanup(Le),Qe?.dispose()},rr=An=>{qe(An),S.sender.cleanup(Le),Qe?.dispose()},Wn={method:F,timerStart:Date.now(),resolve:gt,reject:rr};jr(ve);try{e.write(ve).catch(()=>i.error("Sending request failed."))}catch(An){Wn.reject(new ee.ResponseError(ee.ErrorCodes.MessageWriteError,An.message?An.message:"Unknown reason")),Wn=null}Wn&&N.set(Le,Wn)})},onRequest:(x,I)=>{ro();let F=null;return Zp.is(x)?(F=void 0,c=x):It.string(x)?(F=null,I!==void 0&&(F=x,u.set(x,{handler:I,type:void 0}))):I!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:I})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):c=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,I,F)=>{let z=!1,Oe=nn.Text;F!==void 0&&(It.boolean(F)?z=F:(z=F.sendNotification||!1,Oe=F.traceFormat||nn.Text)),g=x,$=Oe,g===Ne.Off?D=void 0:D=I,z&&!ft()&&!ye()&&await Ai.sendNotification(og.type,{value:Ne.toString(x)})},onError:se.event,onClose:$e.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(ye())return;K=on.Disposed,M.fire(void 0);let x=new ee.ResponseError(ee.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let I of N.values())I.reject(x);N=new Map,v=new Map,w=new Set,A=new ng.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(t.dispose)&&t.dispose()},listen:()=>{ro(),tp(),K=on.Listening,t.listen(qo)},inspect:()=>{(0,rg.default)().console.log("inspect")}};return Ai.onNotification(em.type,x=>{if(g===Ne.Off||!D)return;let I=g===Ne.Verbose||g===Ne.Compact;D.log(x.message,I?x.verbose:void 0)}),Ai.onNotification(Na.type,x=>{let I=T.get(x.token);I?I(x.value):Rt.fire(x)}),Ai}J.createMessageConnection=sk});var am=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var je=Mp();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return je.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return je.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return je.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return je.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return je.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return je.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return je.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return je.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return je.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return je.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return je.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return je.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return je.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return je.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return je.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return je.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return je.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return je.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return je.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return je.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return je.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return je.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return je.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return je.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return je.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return je.ParameterStructures}});var im=Up();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return im.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return im.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return im.Touch}});var ak=ap();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return ak.Disposable}});var lg=oo();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return lg.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return lg.Emitter}});var cg=Kp();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return cg.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return cg.CancellationToken}});var om=Yy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return om.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return om.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return om.ReadableStreamMessageReader}});var sm=tg();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return sm.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return sm.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return sm.WriteableStreamMessageWriter}});var ir=ag();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return ir.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return ir.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return ir.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return ir.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return ir.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return ir.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return ir.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return ir.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return ir.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return ir.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return ir.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return ir.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return ir.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return ir.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return ir.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return ir.CancellationStrategy}});var lk=Vn();_.RAL=lk.default});var Qn=H(Pr=>{"use strict";var ck=Pr&&Pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),uk=Pr&&Pr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&ck(e,t,r)};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.createMessageConnection=Pr.BrowserMessageWriter=Pr.BrowserMessageReader=void 0;var fk=By();fk.default.install();var zo=am();uk(am(),Pr);var lm=class extends zo.AbstractMessageReader{constructor(e){super(),this._onData=new zo.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Pr.BrowserMessageReader=lm;var cm=class extends zo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Pr.BrowserMessageWriter=cm;function dk(t,e,r,n){return r===void 0&&(r=zo.NullLogger),zo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,zo.createMessageConnection)(t,e,r,n)}Pr.createMessageConnection=dk});var um=H((uj,ug)=>{"use strict";ug.exports=Qn()});var lo=H((fg,mc)=>{(function(t){if(typeof mc=="object"&&typeof mc.exports=="object"){var e=t(Gy,fg);e!==void 0&&(mc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(y,d){return y===Number.MAX_VALUE&&(y=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:y,character:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(y,d,E,P){if(k.uinteger(y)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(P))return{start:s.create(y,d),end:s.create(E,P)};if(s.is(y)&&s.is(d))return{start:y,end:d};throw new Error("Range#create called with invalid arguments[".concat(y,", ").concat(d,", ").concat(E,", ").concat(P,"]"))}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var l;(function(p){function R(y,d){return{uri:y,range:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(l=e.Location||(e.Location={}));var c;(function(p){function R(y,d,E,P){return{targetUri:y,targetRange:d,targetSelectionRange:E,originSelectionRange:P}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(c=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(y,d,E,P){return{red:y,green:d,blue:E,alpha:P}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(y,d){return{range:y,color:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(y,d,E){return{label:y,textEdit:d,additionalTextEdits:E}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var C;(function(p){function R(y,d,E,P,ne,pt){var Ge={startLine:y,endLine:d};return k.defined(E)&&(Ge.startCharacter=E),k.defined(P)&&(Ge.endCharacter=P),k.defined(ne)&&(Ge.kind=ne),k.defined(pt)&&(Ge.collapsedText=pt),Ge}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(C=e.FoldingRange||(e.FoldingRange={}));var A;(function(p){function R(y,d){return{location:y,message:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&l.is(d.location)&&k.string(d.message)}p.is=b})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var w;(function(p){p.Unnecessary=1,p.Deprecated=2})(w=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&k.string(y.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var g;(function(p){function R(y,d,E,P,ne,pt){var Ge={range:y,message:d};return k.defined(E)&&(Ge.severity=E),k.defined(P)&&(Ge.code=P),k.defined(ne)&&(Ge.source=ne),k.defined(pt)&&(Ge.relatedInformation=pt),Ge}p.create=R;function b(y){var d,E=y;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,A.is))}p.is=b})(g=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(y,d){for(var E=[],P=2;P<arguments.length;P++)E[P-2]=arguments[P];var ne={title:y,command:d};return k.defined(E)&&E.length>0&&(ne.arguments=E),ne}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var D;(function(p){function R(E,P){return{range:E,newText:P}}p.replace=R;function b(E,P){return{range:{start:E,end:E},newText:P}}p.insert=b;function y(E){return{range:E,newText:""}}p.del=y;function d(E){var P=E;return k.objectLiteral(P)&&k.string(P.newText)&&a.is(P.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var K;(function(p){function R(y,d,E){var P={label:y};return d!==void 0&&(P.needsConfirmation=d),E!==void 0&&(P.description=E),P}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(K=e.ChangeAnnotation||(e.ChangeAnnotation={}));var se;(function(p){function R(b){var y=b;return k.string(y)}p.is=R})(se=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var $e;(function(p){function R(E,P,ne){return{range:E,newText:P,annotationId:ne}}p.replace=R;function b(E,P,ne){return{range:{start:E,end:E},newText:P,annotationId:ne}}p.insert=b;function y(E,P){return{range:E,newText:"",annotationId:P}}p.del=y;function d(E){var P=E;return D.is(P)&&(K.is(P.annotationId)||se.is(P.annotationId))}p.is=d})($e=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function R(y,d){return{textDocument:y,edits:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&ft.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Rt;(function(p){function R(y,d,E){var P={kind:"create",uri:y};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=R;function b(y){var d=y;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||se.is(d.annotationId))}p.is=b})(Rt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(y,d,E,P){var ne={kind:"rename",oldUri:y,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(ne.options=E),P!==void 0&&(ne.annotationId=P),ne}p.create=R;function b(y){var d=y;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||se.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var S;(function(p){function R(y,d,E){var P={kind:"delete",uri:y};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=R;function b(y){var d=y;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||se.is(d.annotationId))}p.is=b})(S=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function R(b){var y=b;return y&&(y.changes!==void 0||y.documentChanges!==void 0)&&(y.documentChanges===void 0||y.documentChanges.every(function(d){return k.string(d.kind)?Rt.is(d)||M.is(d)||S.is(d):Ht.is(d)}))}p.is=R})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,y){var d,E;if(y===void 0?d=D.insert(R,b):se.is(y)?(E=y,d=$e.insert(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=$e.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,y){var d,E;if(y===void 0?d=D.replace(R,b):se.is(y)?(E=y,d=$e.replace(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=$e.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var y,d;if(b===void 0?y=D.del(R):se.is(b)?(d=b,y=$e.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),y=$e.del(R,d)),this.edits.push(y),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ue=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var y;if(se.is(R)?y=R:(y=this.nextId(),b=R),this._annotations[y]!==void 0)throw new Error("Id ".concat(y," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(y));return this._annotations[y]=b,this._size++,y},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),te=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ue(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(y){if(Ht.is(y)){var d=new j(y.edits,b._changeAnnotations);b._textEditChanges[y.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(y){var d=new j(R.changes[y]);b._textEditChanges[y]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ft.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},y=this._textEditChanges[b.uri];if(!y){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),y=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=y}return y}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var y=this._textEditChanges[R];if(!y){var d=[];this._workspaceEdit.changes[R]=d,y=new j(d),this._textEditChanges[R]=y}return y}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ue,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;K.is(b)||se.is(b)?d=b:y=b;var E,P;if(d===void 0?E=Rt.create(R,y):(P=se.is(d)?d:this._changeAnnotations.manage(d),E=Rt.create(R,y,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p.prototype.renameFile=function(R,b,y,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;K.is(y)||se.is(y)?E=y:d=y;var P,ne;if(E===void 0?P=M.create(R,b,d):(ne=se.is(E)?E:this._changeAnnotations.manage(E),P=M.create(R,b,d,ne)),this._workspaceEdit.documentChanges.push(P),ne!==void 0)return ne},p.prototype.deleteFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;K.is(b)||se.is(b)?d=b:y=b;var E,P;if(d===void 0?E=S.create(R,y):(P=se.is(d)?d:this._changeAnnotations.manage(d),E=S.create(R,y,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p}();e.WorkspaceChange=te;var Z;(function(p){function R(y){return{uri:y}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)}p.is=b})(Z=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var bt;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(bt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ft;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(ft=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var ye;(function(p){function R(y,d,E,P){return{uri:y,languageId:d,version:E,text:P}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(ye=e.TextDocumentItem||(e.TextDocumentItem={}));var Nr;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var y=b;return y===p.PlainText||y===p.Markdown}p.is=R})(Nr=e.MarkupKind||(e.MarkupKind={}));var Bn;(function(p){function R(b){var y=b;return k.objectLiteral(b)&&Nr.is(y.kind)&&k.string(y.value)}p.is=R})(Bn=e.MarkupContent||(e.MarkupContent={}));var wa;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(wa=e.CompletionItemKind||(e.CompletionItemKind={}));var eo;(function(p){p.PlainText=1,p.Snippet=2})(eo=e.InsertTextFormat||(e.InsertTextFormat={}));var fr;(function(p){p.Deprecated=1})(fr=e.CompletionItemTag||(e.CompletionItemTag={}));var qo;(function(p){function R(y,d,E){return{newText:y,insert:d,replace:E}}p.create=R;function b(y){var d=y;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(qo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var Ct;(function(p){p.asIs=1,p.adjustIndentation=2})(Ct=e.InsertTextMode||(e.InsertTextMode={}));var tr;(function(p){function R(b){var y=b;return y&&(k.string(y.detail)||y.detail===void 0)&&(k.string(y.description)||y.description===void 0)}p.is=R})(tr=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Cn;(function(p){function R(b){return{label:b}}p.create=R})(Cn=e.CompletionItem||(e.CompletionItem={}));var Bt;(function(p){function R(b,y){return{items:b||[],isIncomplete:!!y}}p.create=R})(Bt=e.CompletionList||(e.CompletionList={}));var dt;(function(p){function R(y){return y.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(y){var d=y;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(dt=e.MarkedString||(e.MarkedString={}));var jr;(function(p){function R(b){var y=b;return!!y&&k.objectLiteral(y)&&(Bn.is(y.contents)||dt.is(y.contents)||k.typedArray(y.contents,dt.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(jr=e.Hover||(e.Hover={}));var _r;(function(p){function R(b,y){return y?{label:b,documentation:y}:{label:b}}p.create=R})(_r=e.ParameterInformation||(e.ParameterInformation={}));var Rr;(function(p){function R(b,y){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var P={label:b};return k.defined(y)&&(P.documentation=y),k.defined(d)?P.parameters=d:P.parameters=[],P}p.create=R})(Rr=e.SignatureInformation||(e.SignatureInformation={}));var to;(function(p){p.Text=1,p.Read=2,p.Write=3})(to=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var bi;(function(p){function R(b,y){var d={range:b};return k.number(y)&&(d.kind=y),d}p.create=R})(bi=e.DocumentHighlight||(e.DocumentHighlight={}));var ep;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(ep=e.SymbolKind||(e.SymbolKind={}));var Ci;(function(p){p.Deprecated=1})(Ci=e.SymbolTag||(e.SymbolTag={}));var ro;(function(p){function R(b,y,d,E,P){var ne={name:b,kind:y,location:{uri:E,range:d}};return P&&(ne.containerName=P),ne}p.create=R})(ro=e.SymbolInformation||(e.SymbolInformation={}));var tp;(function(p){function R(b,y,d,E){return E!==void 0?{name:b,kind:y,location:{uri:d,range:E}}:{name:b,kind:y,location:{uri:d}}}p.create=R})(tp=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var rp;(function(p){function R(y,d,E,P,ne,pt){var Ge={name:y,detail:d,kind:E,range:P,selectionRange:ne};return pt!==void 0&&(Ge.children=pt),Ge}p.create=R;function b(y){var d=y;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(rp=e.DocumentSymbol||(e.DocumentSymbol={}));var no;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(no=e.CodeActionKind||(e.CodeActionKind={}));var Go;(function(p){p.Invoked=1,p.Automatic=2})(Go=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var rc;(function(p){function R(y,d,E){var P={diagnostics:y};return d!=null&&(P.only=d),E!=null&&(P.triggerKind=E),P}p.create=R;function b(y){var d=y;return k.defined(d)&&k.typedArray(d.diagnostics,g.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Go.Invoked||d.triggerKind===Go.Automatic)}p.is=b})(rc=e.CodeActionContext||(e.CodeActionContext={}));var Sa;(function(p){function R(y,d,E){var P={title:y},ne=!0;return typeof d=="string"?(ne=!1,P.kind=d):$.is(d)?P.command=d:P.edit=d,ne&&E!==void 0&&(P.kind=E),P}p.create=R;function b(y){var d=y;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,g.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(Sa=e.CodeAction||(e.CodeAction={}));var nc;(function(p){function R(y,d){var E={range:y};return k.defined(d)&&(E.data=d),E}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=b})(nc=e.CodeLens||(e.CodeLens={}));var Ai;(function(p){function R(y,d){return{tabSize:y,insertSpaces:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(Ai=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(y,d,E){return{range:y,target:d,data:E}}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var I;(function(p){function R(y,d){return{range:y,parent:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(I=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var Oe;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&(y.resultId===void 0||typeof y.resultId=="string")&&Array.isArray(y.data)&&(y.data.length===0||typeof y.data[0]=="number")}p.is=R})(Oe=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(p){function R(y,d){return{range:y,text:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Le=e.InlineValueText||(e.InlineValueText={}));var Qe;(function(p){function R(y,d,E){return{range:y,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Qe=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var At;(function(p){function R(y,d){return{range:y,expression:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(At=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var de;(function(p){function R(y,d){return{frameId:y,stoppedLocation:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(y.stoppedLocation)}p.is=b})(de=e.InlineValueContext||(e.InlineValueContext={}));var qe;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(qe=e.InlayHintKind||(e.InlayHintKind={}));var ve;(function(p){function R(y){return{value:y}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.location===void 0||l.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(ve=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var gt;(function(p){function R(y,d,E){var P={position:y,label:d};return E!==void 0&&(P.kind=E),P}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,ve.is))&&(d.kind===void 0||qe.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(gt=e.InlayHint||(e.InlayHint={}));var rr;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&n.is(y.uri)&&k.string(y.name)}p.is=R})(rr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Wn;(function(p){function R(E,P,ne,pt){return new An(E,P,ne,pt)}p.create=R;function b(E){var P=E;return!!(k.defined(P)&&k.string(P.uri)&&(k.undefined(P.languageId)||k.string(P.languageId))&&k.uinteger(P.lineCount)&&k.func(P.getText)&&k.func(P.positionAt)&&k.func(P.offsetAt))}p.is=b;function y(E,P){for(var ne=E.getText(),pt=d(P,function(jo,ic){var qy=jo.range.start.line-ic.range.start.line;return qy===0?jo.range.start.character-ic.range.start.character:qy}),Ge=ne.length,tn=pt.length-1;tn>=0;tn--){var rn=pt[tn],zn=E.offsetAt(rn.range.start),pe=E.offsetAt(rn.range.end);if(pe<=Ge)ne=ne.substring(0,zn)+rn.newText+ne.substring(pe,ne.length);else throw new Error("Overlapping edit");Ge=zn}return ne}p.applyEdits=y;function d(E,P){if(E.length<=1)return E;var ne=E.length/2|0,pt=E.slice(0,ne),Ge=E.slice(ne);d(pt,P),d(Ge,P);for(var tn=0,rn=0,zn=0;tn<pt.length&&rn<Ge.length;){var pe=P(pt[tn],Ge[rn]);pe<=0?E[zn++]=pt[tn++]:E[zn++]=Ge[rn++]}for(;tn<pt.length;)E[zn++]=pt[tn++];for(;rn<Ge.length;)E[zn++]=Ge[rn++];return E}})(Wn=e.TextDocument||(e.TextDocument={}));var An=function(){function p(R,b,y,d){this._uri=R,this._languageId=b,this._version=y,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),y=this.offsetAt(R.end);return this._content.substring(b,y)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,y=!0,d=0;d<b.length;d++){y&&(R.push(d),y=!1);var E=b.charAt(d);y=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}y&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),y=0,d=b.length;if(d===0)return s.create(0,R);for(;y<d;){var E=Math.floor((y+d)/2);b[E]>R?d=E:y=E+1}var P=y-1;return s.create(P,R-b[P])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var y=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(y+R.character,d),y)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(pe){return typeof pe<"u"}p.defined=b;function y(pe){return typeof pe>"u"}p.undefined=y;function d(pe){return pe===!0||pe===!1}p.boolean=d;function E(pe){return R.call(pe)==="[object String]"}p.string=E;function P(pe){return R.call(pe)==="[object Number]"}p.number=P;function ne(pe,jo,ic){return R.call(pe)==="[object Number]"&&jo<=pe&&pe<=ic}p.numberRange=ne;function pt(pe){return R.call(pe)==="[object Number]"&&-2147483648<=pe&&pe<=2147483647}p.integer=pt;function Ge(pe){return R.call(pe)==="[object Number]"&&0<=pe&&pe<=2147483647}p.uinteger=Ge;function tn(pe){return R.call(pe)==="[object Function]"}p.func=tn;function rn(pe){return pe!==null&&typeof pe=="object"}p.objectLiteral=rn;function zn(pe,jo){return Array.isArray(pe)&&pe.every(jo)}p.typedArray=zn})(k||(k={}))})});var ot=H(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.ProtocolNotificationType=pr.ProtocolNotificationType0=pr.ProtocolRequestType=pr.ProtocolRequestType0=pr.RegistrationType=pr.MessageDirection=void 0;var Vo=Qn(),pk;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(pk=pr.MessageDirection||(pr.MessageDirection={}));var fm=class{constructor(e){this.method=e}};pr.RegistrationType=fm;var dm=class extends Vo.RequestType0{constructor(e){super(e)}};pr.ProtocolRequestType0=dm;var pm=class extends Vo.RequestType{constructor(e){super(e,Vo.ParameterStructures.byName)}};pr.ProtocolRequestType=pm;var mm=class extends Vo.NotificationType0{constructor(e){super(e)}};pr.ProtocolNotificationType0=mm;var hm=class extends Vo.NotificationType{constructor(e){super(e,Vo.ParameterStructures.byName)}};pr.ProtocolNotificationType=hm});var hc=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.objectLiteral=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function mk(t){return t===!0||t===!1}wt.boolean=mk;function dg(t){return typeof t=="string"||t instanceof String}wt.string=dg;function hk(t){return typeof t=="number"||t instanceof Number}wt.number=hk;function yk(t){return t instanceof Error}wt.error=yk;function gk(t){return typeof t=="function"}wt.func=gk;function pg(t){return Array.isArray(t)}wt.array=pg;function Tk(t){return pg(t)&&t.every(e=>dg(e))}wt.stringArray=Tk;function vk(t,e){return Array.isArray(t)&&t.every(e)}wt.typedArray=vk;function xk(t){return t!==null&&typeof t=="object"}wt.objectLiteral=xk});var hg=H(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.ImplementationRequest=void 0;var mg=ot(),Rk;(function(t){t.method="textDocument/implementation",t.messageDirection=mg.MessageDirection.clientToServer,t.type=new mg.ProtocolRequestType(t.method)})(Rk=Pa.ImplementationRequest||(Pa.ImplementationRequest={}))});var gg=H(Ia=>{"use strict";Object.defineProperty(Ia,"__esModule",{value:!0});Ia.TypeDefinitionRequest=void 0;var yg=ot(),bk;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=yg.MessageDirection.clientToServer,t.type=new yg.ProtocolRequestType(t.method)})(bk=Ia.TypeDefinitionRequest||(Ia.TypeDefinitionRequest={}))});var Tg=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.DidChangeWorkspaceFoldersNotification=wi.WorkspaceFoldersRequest=void 0;var yc=ot(),Ck;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=yc.MessageDirection.serverToClient,t.type=new yc.ProtocolRequestType0(t.method)})(Ck=wi.WorkspaceFoldersRequest||(wi.WorkspaceFoldersRequest={}));var Ak;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=yc.MessageDirection.clientToServer,t.type=new yc.ProtocolNotificationType(t.method)})(Ak=wi.DidChangeWorkspaceFoldersNotification||(wi.DidChangeWorkspaceFoldersNotification={}))});var xg=H(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.ConfigurationRequest=void 0;var vg=ot(),wk;(function(t){t.method="workspace/configuration",t.messageDirection=vg.MessageDirection.serverToClient,t.type=new vg.ProtocolRequestType(t.method)})(wk=Da.ConfigurationRequest||(Da.ConfigurationRequest={}))});var Rg=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.ColorPresentationRequest=Si.DocumentColorRequest=void 0;var gc=ot(),Sk;(function(t){t.method="textDocument/documentColor",t.messageDirection=gc.MessageDirection.clientToServer,t.type=new gc.ProtocolRequestType(t.method)})(Sk=Si.DocumentColorRequest||(Si.DocumentColorRequest={}));var kk;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=gc.MessageDirection.clientToServer,t.type=new gc.ProtocolRequestType(t.method)})(kk=Si.ColorPresentationRequest||(Si.ColorPresentationRequest={}))});var Cg=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.FoldingRangeRequest=void 0;var bg=ot(),Ek;(function(t){t.method="textDocument/foldingRange",t.messageDirection=bg.MessageDirection.clientToServer,t.type=new bg.ProtocolRequestType(t.method)})(Ek=Oa.FoldingRangeRequest||(Oa.FoldingRangeRequest={}))});var wg=H(La=>{"use strict";Object.defineProperty(La,"__esModule",{value:!0});La.DeclarationRequest=void 0;var Ag=ot(),$k;(function(t){t.method="textDocument/declaration",t.messageDirection=Ag.MessageDirection.clientToServer,t.type=new Ag.ProtocolRequestType(t.method)})($k=La.DeclarationRequest||(La.DeclarationRequest={}))});var kg=H(Ma=>{"use strict";Object.defineProperty(Ma,"__esModule",{value:!0});Ma.SelectionRangeRequest=void 0;var Sg=ot(),Nk;(function(t){t.method="textDocument/selectionRange",t.messageDirection=Sg.MessageDirection.clientToServer,t.type=new Sg.ProtocolRequestType(t.method)})(Nk=Ma.SelectionRangeRequest||(Ma.SelectionRangeRequest={}))});var Eg=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.WorkDoneProgressCancelNotification=sn.WorkDoneProgressCreateRequest=sn.WorkDoneProgress=void 0;var _k=Qn(),Tc=ot(),Pk;(function(t){t.type=new _k.ProgressType;function e(r){return r===t.type}t.is=e})(Pk=sn.WorkDoneProgress||(sn.WorkDoneProgress={}));var Ik;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Tc.MessageDirection.serverToClient,t.type=new Tc.ProtocolRequestType(t.method)})(Ik=sn.WorkDoneProgressCreateRequest||(sn.WorkDoneProgressCreateRequest={}));var Dk;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Tc.MessageDirection.clientToServer,t.type=new Tc.ProtocolNotificationType(t.method)})(Dk=sn.WorkDoneProgressCancelNotification||(sn.WorkDoneProgressCancelNotification={}))});var $g=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.CallHierarchyOutgoingCallsRequest=an.CallHierarchyIncomingCallsRequest=an.CallHierarchyPrepareRequest=void 0;var Xo=ot(),Ok;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(Ok=an.CallHierarchyPrepareRequest||(an.CallHierarchyPrepareRequest={}));var Lk;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(Lk=an.CallHierarchyIncomingCallsRequest||(an.CallHierarchyIncomingCallsRequest={}));var Mk;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(Mk=an.CallHierarchyOutgoingCallsRequest||(an.CallHierarchyOutgoingCallsRequest={}))});var Ng=H(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.SemanticTokensRefreshRequest=St.SemanticTokensRangeRequest=St.SemanticTokensDeltaRequest=St.SemanticTokensRequest=St.SemanticTokensRegistrationType=St.TokenFormat=void 0;var Zn=ot(),Fk;(function(t){t.Relative="relative"})(Fk=St.TokenFormat||(St.TokenFormat={}));var vc;(function(t){t.method="textDocument/semanticTokens",t.type=new Zn.RegistrationType(t.method)})(vc=St.SemanticTokensRegistrationType||(St.SemanticTokensRegistrationType={}));var Uk;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=vc.method})(Uk=St.SemanticTokensRequest||(St.SemanticTokensRequest={}));var qk;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=vc.method})(qk=St.SemanticTokensDeltaRequest||(St.SemanticTokensDeltaRequest={}));var Gk;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=vc.method})(Gk=St.SemanticTokensRangeRequest||(St.SemanticTokensRangeRequest={}));var jk;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType0(t.method)})(jk=St.SemanticTokensRefreshRequest||(St.SemanticTokensRefreshRequest={}))});var Pg=H(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.ShowDocumentRequest=void 0;var _g=ot(),Kk;(function(t){t.method="window/showDocument",t.messageDirection=_g.MessageDirection.serverToClient,t.type=new _g.ProtocolRequestType(t.method)})(Kk=Fa.ShowDocumentRequest||(Fa.ShowDocumentRequest={}))});var Dg=H(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.LinkedEditingRangeRequest=void 0;var Ig=ot(),Hk;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Ig.MessageDirection.clientToServer,t.type=new Ig.ProtocolRequestType(t.method)})(Hk=Ua.LinkedEditingRangeRequest||(Ua.LinkedEditingRangeRequest={}))});var Og=H(st=>{"use strict";Object.defineProperty(st,"__esModule",{value:!0});st.WillDeleteFilesRequest=st.DidDeleteFilesNotification=st.DidRenameFilesNotification=st.WillRenameFilesRequest=st.DidCreateFilesNotification=st.WillCreateFilesRequest=st.FileOperationPatternKind=void 0;var Kr=ot(),Bk;(function(t){t.file="file",t.folder="folder"})(Bk=st.FileOperationPatternKind||(st.FileOperationPatternKind={}));var Wk;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(Wk=st.WillCreateFilesRequest||(st.WillCreateFilesRequest={}));var zk;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(zk=st.DidCreateFilesNotification||(st.DidCreateFilesNotification={}));var Vk;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(Vk=st.WillRenameFilesRequest||(st.WillRenameFilesRequest={}));var Xk;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(Xk=st.DidRenameFilesNotification||(st.DidRenameFilesNotification={}));var Yk;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(Yk=st.DidDeleteFilesNotification||(st.DidDeleteFilesNotification={}));var Jk;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(Jk=st.WillDeleteFilesRequest||(st.WillDeleteFilesRequest={}))});var Mg=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.MonikerRequest=ln.MonikerKind=ln.UniquenessLevel=void 0;var Lg=ot(),Qk;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(Qk=ln.UniquenessLevel||(ln.UniquenessLevel={}));var Zk;(function(t){t.$import="import",t.$export="export",t.local="local"})(Zk=ln.MonikerKind||(ln.MonikerKind={}));var eE;(function(t){t.method="textDocument/moniker",t.messageDirection=Lg.MessageDirection.clientToServer,t.type=new Lg.ProtocolRequestType(t.method)})(eE=ln.MonikerRequest||(ln.MonikerRequest={}))});var Fg=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.TypeHierarchySubtypesRequest=cn.TypeHierarchySupertypesRequest=cn.TypeHierarchyPrepareRequest=void 0;var Yo=ot(),tE;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(tE=cn.TypeHierarchyPrepareRequest||(cn.TypeHierarchyPrepareRequest={}));var rE;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(rE=cn.TypeHierarchySupertypesRequest||(cn.TypeHierarchySupertypesRequest={}));var nE;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(nE=cn.TypeHierarchySubtypesRequest||(cn.TypeHierarchySubtypesRequest={}))});var Ug=H(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.InlineValueRefreshRequest=ki.InlineValueRequest=void 0;var xc=ot(),iE;(function(t){t.method="textDocument/inlineValue",t.messageDirection=xc.MessageDirection.clientToServer,t.type=new xc.ProtocolRequestType(t.method)})(iE=ki.InlineValueRequest||(ki.InlineValueRequest={}));var oE;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=xc.MessageDirection.clientToServer,t.type=new xc.ProtocolRequestType0(t.method)})(oE=ki.InlineValueRefreshRequest||(ki.InlineValueRefreshRequest={}))});var qg=H(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.InlayHintRefreshRequest=un.InlayHintResolveRequest=un.InlayHintRequest=void 0;var Jo=ot(),sE;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(sE=un.InlayHintRequest||(un.InlayHintRequest={}));var aE;(function(t){t.method="inlayHint/resolve",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(aE=un.InlayHintResolveRequest||(un.InlayHintResolveRequest={}));var lE;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType0(t.method)})(lE=un.InlayHintRefreshRequest||(un.InlayHintRefreshRequest={}))});var jg=H(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var Gg=Qn(),cE=hc(),Qo=ot(),uE;(function(t){function e(r){let n=r;return n&&cE.boolean(n.retriggerRequest)}t.is=e})(uE=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var fE;(function(t){t.Full="full",t.Unchanged="unchanged"})(fE=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var dE;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method),t.partialResult=new Gg.ProgressType})(dE=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var pE;(function(t){t.method="workspace/diagnostic",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method),t.partialResult=new Gg.ProgressType})(pE=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var mE;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType0(t.method)})(mE=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var Bg=H(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.DidCloseNotebookDocumentNotification=Re.DidSaveNotebookDocumentNotification=Re.DidChangeNotebookDocumentNotification=Re.NotebookCellArrayChange=Re.DidOpenNotebookDocumentNotification=Re.NotebookDocumentSyncRegistrationType=Re.NotebookDocument=Re.NotebookCell=Re.ExecutionSummary=Re.NotebookCellKind=void 0;var qa=lo(),fn=hc(),wn=ot(),Kg;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Kg=Re.NotebookCellKind||(Re.NotebookCellKind={}));var Hg;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return fn.objectLiteral(o)&&qa.uinteger.is(o.executionOrder)&&(o.success===void 0||fn.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Hg=Re.ExecutionSummary||(Re.ExecutionSummary={}));var ym;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return fn.objectLiteral(s)&&Kg.is(s.kind)&&qa.DocumentUri.is(s.document)&&(s.metadata===void 0||fn.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Hg.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),l=Array.isArray(s);if(a!==l)return!1;if(a&&l){if(o.length!==s.length)return!1;for(let c=0;c<o.length;c++)if(!i(o[c],s[c]))return!1}if(fn.objectLiteral(o)&&fn.objectLiteral(s)){let c=Object.keys(o),u=Object.keys(s);if(c.length!==u.length||(c.sort(),u.sort(),!i(c,u)))return!1;for(let f=0;f<c.length;f++){let m=c[f];if(!i(o[m],s[m]))return!1}}return!0}})(ym=Re.NotebookCell||(Re.NotebookCell={}));var hE;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return fn.objectLiteral(i)&&fn.string(i.uri)&&qa.integer.is(i.version)&&fn.typedArray(i.cells,ym.is)}t.is=r})(hE=Re.NotebookDocument||(Re.NotebookDocument={}));var Ga;(function(t){t.method="notebookDocument/sync",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.RegistrationType(t.method)})(Ga=Re.NotebookDocumentSyncRegistrationType||(Re.NotebookDocumentSyncRegistrationType={}));var yE;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(yE=Re.DidOpenNotebookDocumentNotification||(Re.DidOpenNotebookDocumentNotification={}));var gE;(function(t){function e(n){let i=n;return fn.objectLiteral(i)&&qa.uinteger.is(i.start)&&qa.uinteger.is(i.deleteCount)&&(i.cells===void 0||fn.typedArray(i.cells,ym.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(gE=Re.NotebookCellArrayChange||(Re.NotebookCellArrayChange={}));var TE;(function(t){t.method="notebookDocument/didChange",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(TE=Re.DidChangeNotebookDocumentNotification||(Re.DidChangeNotebookDocumentNotification={}));var vE;(function(t){t.method="notebookDocument/didSave",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(vE=Re.DidSaveNotebookDocumentNotification||(Re.DidSaveNotebookDocumentNotification={}));var xE;(function(t){t.method="notebookDocument/didClose",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(xE=Re.DidCloseNotebookDocumentNotification||(Re.DidCloseNotebookDocumentNotification={}))});var eT=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=ot(),Wg=lo(),zt=hc(),RE=hg();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return RE.ImplementationRequest}});var bE=gg();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return bE.TypeDefinitionRequest}});var zg=Tg();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return zg.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return zg.DidChangeWorkspaceFoldersNotification}});var CE=xg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return CE.ConfigurationRequest}});var Vg=Rg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Vg.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Vg.ColorPresentationRequest}});var AE=Cg();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return AE.FoldingRangeRequest}});var wE=wg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return wE.DeclarationRequest}});var SE=kg();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return SE.SelectionRangeRequest}});var gm=Eg();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return gm.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return gm.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return gm.WorkDoneProgressCancelNotification}});var Tm=$g();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyPrepareRequest}});var Zo=Ng();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Zo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Zo.SemanticTokensRegistrationType}});var kE=Pg();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return kE.ShowDocumentRequest}});var EE=Dg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return EE.LinkedEditingRangeRequest}});var co=Og();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return co.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return co.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return co.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return co.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return co.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return co.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return co.WillDeleteFilesRequest}});var vm=Mg();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return vm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return vm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return vm.MonikerRequest}});var xm=Fg();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return xm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySupertypesRequest}});var Xg=Ug();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Xg.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Xg.InlineValueRefreshRequest}});var Rm=qg();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return Rm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Rm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Rm.InlayHintRefreshRequest}});var ja=jg();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return ja.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return ja.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return ja.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return ja.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return ja.DiagnosticRefreshRequest}});var Sn=Bg();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Sn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Sn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Sn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Sn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Sn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Sn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidCloseNotebookDocumentNotification}});var Yg;(function(t){function e(r){let n=r;return zt.string(n.language)||zt.string(n.scheme)||zt.string(n.pattern)}t.is=e})(Yg=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Jg;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebookType)||zt.string(n.scheme)||zt.string(n.pattern))}t.is=e})(Jg=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Qg;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebook)||Jg.is(n.notebook))&&(n.language===void 0||zt.string(n.language))}t.is=e})(Qg=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var Zg;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!zt.string(n)&&!Yg.is(n)&&!Qg.is(n))return!1;return!0}t.is=e})(Zg=h.DocumentSelector||(h.DocumentSelector={}));var $E;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})($E=h.RegistrationRequest||(h.RegistrationRequest={}));var NE;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(NE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var _E;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(_E=h.ResourceOperationKind||(h.ResourceOperationKind={}));var PE;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(PE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var IE;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(IE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var DE;(function(t){function e(r){let n=r;return n&&zt.string(n.id)&&n.id.length>0}t.hasId=e})(DE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var OE;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||Zg.is(n.documentSelector))}t.is=e})(OE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var LE;(function(t){function e(n){let i=n;return zt.objectLiteral(i)&&(i.workDoneProgress===void 0||zt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&zt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(LE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var ME;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(ME=h.InitializeRequest||(h.InitializeRequest={}));var FE;(function(t){t.unknownProtocolVersion=1})(FE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var UE;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(UE=h.InitializedNotification||(h.InitializedNotification={}));var qE;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(qE=h.ShutdownRequest||(h.ShutdownRequest={}));var GE;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(GE=h.ExitNotification||(h.ExitNotification={}));var jE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(jE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var KE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(KE=h.MessageType||(h.MessageType={}));var HE;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(HE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var BE;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(BE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var WE;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(WE=h.LogMessageNotification||(h.LogMessageNotification={}));var zE;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(zE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var VE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(VE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var XE;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(XE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var YE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(YE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var JE;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(JE=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var QE;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(QE=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var ZE;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(ZE=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var e$;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(e$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var t$;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(t$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var r$;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(r$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var n$;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(n$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var i$;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(i$=h.FileChangeType||(h.FileChangeType={}));var o$;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(Wg.URI.is(n.baseUri)||Wg.WorkspaceFolder.is(n.baseUri))&&zt.string(n.pattern)}t.is=e})(o$=h.RelativePattern||(h.RelativePattern={}));var s$;(function(t){t.Create=1,t.Change=2,t.Delete=4})(s$=h.WatchKind||(h.WatchKind={}));var a$;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(a$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var l$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(l$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var c$;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(c$=h.CompletionRequest||(h.CompletionRequest={}));var u$;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(u$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var f$;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(f$=h.HoverRequest||(h.HoverRequest={}));var d$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(d$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var p$;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(p$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var m$;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(m$=h.DefinitionRequest||(h.DefinitionRequest={}));var h$;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(h$=h.ReferencesRequest||(h.ReferencesRequest={}));var y$;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(y$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var g$;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(g$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var T$;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(T$=h.CodeActionRequest||(h.CodeActionRequest={}));var v$;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(v$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var x$;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(x$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var R$;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(R$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var b$;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(b$=h.CodeLensRequest||(h.CodeLensRequest={}));var C$;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(C$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var A$;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(A$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var w$;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(w$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var S$;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(S$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var k$;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(k$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var E$;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(E$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var $$;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})($$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var N$;(function(t){t.Identifier=1})(N$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var _$;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(_$=h.RenameRequest||(h.RenameRequest={}));var P$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(P$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var I$;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(I$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var D$;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(D$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var rT=H(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.createProtocolConnection=void 0;var tT=Qn();function O$(t,e,r,n){return tT.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,tT.createMessageConnection)(t,e,r,n)}Rc.createProtocolConnection=O$});var nT=H(mr=>{"use strict";var L$=mr&&mr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),bc=mr&&mr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&L$(e,t,r)};Object.defineProperty(mr,"__esModule",{value:!0});mr.LSPErrorCodes=mr.createProtocolConnection=void 0;bc(Qn(),mr);bc(lo(),mr);bc(ot(),mr);bc(eT(),mr);var M$=rT();Object.defineProperty(mr,"createProtocolConnection",{enumerable:!0,get:function(){return M$.createProtocolConnection}});var F$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(F$=mr.LSPErrorCodes||(mr.LSPErrorCodes={}))});var kt=H(kn=>{"use strict";var U$=kn&&kn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),iT=kn&&kn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&U$(e,t,r)};Object.defineProperty(kn,"__esModule",{value:!0});kn.createProtocolConnection=void 0;var q$=um();iT(um(),kn);iT(nT(),kn);function G$(t,e,r,n){return(0,q$.createMessageConnection)(t,e,r,n)}kn.createProtocolConnection=G$});var Cm=H(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.SemanticTokensBuilder=Ei.SemanticTokensDiff=Ei.SemanticTokensFeature=void 0;var Cc=kt(),j$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Cc.SemanticTokensRefreshRequest.type),on:e=>{let r=Cc.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Cc.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Cc.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ei.SemanticTokensFeature=j$;var Ac=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ei.SemanticTokensDiff=Ac;var bm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Ac(this._prevData,this._data).computeDiff()}:this.build()}};Ei.SemanticTokensBuilder=bm});var wm=H(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.TextDocuments=void 0;var uo=kt(),Am=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new uo.Emitter,this._onDidOpen=new uo.Emitter,this._onDidClose=new uo.Emitter,this._onDidSave=new uo.Emitter,this._onWillSave=new uo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=uo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),uo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};wc.TextDocuments=Am});var km=H(es=>{"use strict";Object.defineProperty(es,"__esModule",{value:!0});es.NotebookDocuments=es.NotebookSyncFeature=void 0;var Hr=kt(),oT=wm(),K$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Hr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Hr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Hr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Hr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};es.NotebookSyncFeature=K$;var Sc=class t{onDidOpenTextDocument(e){return this.openHandler=e,Hr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Hr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Hr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};Sc.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Sm=class{constructor(e){e instanceof oT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new oT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Hr.Emitter,this._onDidChange=new Hr.Emitter,this._onDidSave=new Hr.Emitter,this._onDidClose=new Hr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Sc,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,l=i.change;l.metadata!==void 0&&(a=!0,o.metadata=l.metadata);let c=[],u=[],f=[],m=[];if(l.cells!==void 0){let w=l.cells;if(w.structure!==void 0){let v=w.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),w.structure.didOpen!==void 0)for(let g of w.structure.didOpen)r.openTextDocument({textDocument:g}),c.push(g.uri);if(w.structure.didClose)for(let g of w.structure.didClose)r.closeTextDocument({textDocument:g}),u.push(g.uri)}if(w.data!==void 0){let v=new Map(w.data.map(g=>[g.document,g]));for(let g=0;g<=o.cells.length;g++){let $=v.get(o.cells[g].document);if($!==void 0){let D=o.cells.splice(g,1,$);if(f.push({old:D[0],new:$}),v.delete($.document),v.size===0)break}}}if(w.textContent!==void 0)for(let v of w.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let C=[];for(let w of c)C.push(this.getNotebookCell(w));let A=[];for(let w of u)A.push(this.getNotebookCell(w));let N=[];for(let w of m)N.push(this.getNotebookCell(w));(C.length>0||A.length>0||f.length>0||N.length>0)&&(T.cells={added:C,removed:A,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Hr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};es.NotebookDocuments=Sm});var Em=H(Et=>{"use strict";Object.defineProperty(Et,"__esModule",{value:!0});Et.thenable=Et.typedArray=Et.stringArray=Et.array=Et.func=Et.error=Et.number=Et.string=Et.boolean=void 0;function H$(t){return t===!0||t===!1}Et.boolean=H$;function sT(t){return typeof t=="string"||t instanceof String}Et.string=sT;function B$(t){return typeof t=="number"||t instanceof Number}Et.number=B$;function W$(t){return t instanceof Error}Et.error=W$;function aT(t){return typeof t=="function"}Et.func=aT;function lT(t){return Array.isArray(t)}Et.array=lT;function z$(t){return lT(t)&&t.every(e=>sT(e))}Et.stringArray=z$;function V$(t,e){return Array.isArray(t)&&t.every(e)}Et.typedArray=V$;function X$(t){return t&&aT(t.then)}Et.thenable=X$});var $m=H(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.generateUuid=Br.parse=Br.isUUID=Br.v4=Br.empty=void 0;var Ka=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Ha=class t extends Ka{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Ha._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Ha._timeHighBits=["8","9","a","b"];Br.empty=new Ka("00000000-0000-0000-0000-000000000000");function cT(){return new Ha}Br.v4=cT;var Y$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function uT(t){return Y$.test(t)}Br.isUUID=uT;function J$(t){if(!uT(t))throw new Error("invalid uuid");return new Ka(t)}Br.parse=J$;function Q$(){return cT().asHex()}Br.generateUuid=Q$});var fT=H(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.attachPartialResult=Ni.ProgressFeature=Ni.attachWorkDone=void 0;var $i=kt(),Z$=$m(),fo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress($i.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress($i.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress($i.WorkDoneProgress.type,this._token,{kind:"end"})}};fo.Instances=new Map;var kc=class extends fo{constructor(e,r){super(e,r),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ba=class{constructor(){}begin(){}report(){}done(){}},Ec=class extends Ba{constructor(){super(),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function eN(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ba;let r=e.workDoneToken;return delete e.workDoneToken,new fo(t,r)}Ni.attachWorkDone=eN;var tN=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification($i.WorkDoneProgressCancelNotification.type,r=>{let n=fo.Instances.get(r.token);(n instanceof kc||n instanceof Ec)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ba:new fo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,Z$.generateUuid)();return this.connection.sendRequest($i.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new kc(this.connection,e))}else return Promise.resolve(new Ec)}};Ni.ProgressFeature=tN;var Nm;(function(t){t.type=new $i.ProgressType})(Nm||(Nm={}));var _m=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Nm.type,this._token,e)}};function rN(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new _m(t,r)}Ni.attachPartialResult=rN});var dT=H($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.ConfigurationFeature=void 0;var nN=kt(),iN=Em(),oN=t=>class extends t{getConfiguration(e){return e?iN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(nN.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};$c.ConfigurationFeature=oN});var pT=H(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.WorkspaceFoldersFeature=void 0;var Nc=kt(),sN=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Nc.Emitter,this.connection.onNotification(Nc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Nc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Nc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};_c.WorkspaceFoldersFeature=sN});var mT=H(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.CallHierarchyFeature=void 0;var Pm=kt(),aN=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Pm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Pm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Pm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Pc.CallHierarchyFeature=aN});var hT=H(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.ShowDocumentFeature=void 0;var lN=kt(),cN=t=>class extends t{showDocument(e){return this.connection.sendRequest(lN.ShowDocumentRequest.type,e)}};Ic.ShowDocumentFeature=cN});var yT=H(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.FileOperationsFeature=void 0;var ts=kt(),uN=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(ts.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(ts.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(ts.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(ts.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(ts.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(ts.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Dc.FileOperationsFeature=uN});var gT=H(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.LinkedEditingRangeFeature=void 0;var fN=kt(),dN=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(fN.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Oc.LinkedEditingRangeFeature=dN});var TT=H(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.TypeHierarchyFeature=void 0;var Im=kt(),pN=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Im.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Im.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Im.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Lc.TypeHierarchyFeature=pN});var xT=H(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.InlineValueFeature=void 0;var vT=kt(),mN=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(vT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(vT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Mc.InlineValueFeature=mN});var RT=H(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.InlayHintFeature=void 0;var Dm=kt(),hN=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Dm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Dm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Dm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Fc.InlayHintFeature=hN});var bT=H(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.DiagnosticFeature=void 0;var Wa=kt(),yN=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Wa.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Wa.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Wa.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Wa.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Wa.WorkspaceDiagnosticRequest.partialResult,r)))}}};Uc.DiagnosticFeature=yN});var CT=H(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.MonikerFeature=void 0;var gN=kt(),TN=t=>class extends t{get moniker(){return{on:e=>{let r=gN.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};qc.MonikerFeature=TN});var LT=H(ge=>{"use strict";Object.defineProperty(ge,"__esModule",{value:!0});ge.createConnection=ge.combineFeatures=ge.combineNotebooksFeatures=ge.combineLanguagesFeatures=ge.combineWorkspaceFeatures=ge.combineWindowFeatures=ge.combineClientFeatures=ge.combineTracerFeatures=ge.combineTelemetryFeatures=ge.combineConsoleFeatures=ge._NotebooksImpl=ge._LanguagesImpl=ge.BulkUnregistration=ge.BulkRegistration=ge.ErrorMessageTracker=void 0;var U=kt(),Wr=Em(),Lm=$m(),re=fT(),vN=dT(),xN=pT(),RN=mT(),bN=Cm(),CN=hT(),AN=yT(),wN=gT(),SN=TT(),kN=xT(),EN=RT(),$N=bT(),NN=km(),_N=CT();function Om(t){if(t!==null)return t}var Mm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ge.ErrorMessageTracker=Mm;var Gc=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},Fm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Om)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Om)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Om)}},AT=(0,CN.ShowDocumentFeature)((0,re.ProgressFeature)(Fm)),PN;(function(t){function e(){return new jc}t.create=e})(PN=ge.BulkRegistration||(ge.BulkRegistration={}));var jc=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Wr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Lm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},IN;(function(t){function e(){return new za(void 0,[])}t.create=e})(IN=ge.BulkUnregistration||(ge.BulkUnregistration={}));var za=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Wr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Kc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof jc?this.registerMany(e):e instanceof za?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Wr.string(r)?r:r.method,o=Lm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Wr.string(e)?e:e.method,i=Lm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new za(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Um=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},wT=(0,AN.FileOperationsFeature)((0,xN.WorkspaceFoldersFeature)((0,vN.ConfigurationFeature)(Um))),Hc=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Bc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Wc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};ge._LanguagesImpl=Wc;var ST=(0,_N.MonikerFeature)((0,$N.DiagnosticFeature)((0,EN.InlayHintFeature)((0,kN.InlineValueFeature)((0,SN.TypeHierarchyFeature)((0,wN.LinkedEditingRangeFeature)((0,bN.SemanticTokensFeature)((0,RN.CallHierarchyFeature)(Wc)))))))),zc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,re.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,re.attachPartialResult)(this.connection,r)}};ge._NotebooksImpl=zc;var kT=(0,NN.NotebookSyncFeature)(zc);function ET(t,e){return function(r){return e(t(r))}}ge.combineConsoleFeatures=ET;function $T(t,e){return function(r){return e(t(r))}}ge.combineTelemetryFeatures=$T;function NT(t,e){return function(r){return e(t(r))}}ge.combineTracerFeatures=NT;function _T(t,e){return function(r){return e(t(r))}}ge.combineClientFeatures=_T;function PT(t,e){return function(r){return e(t(r))}}ge.combineWindowFeatures=PT;function IT(t,e){return function(r){return e(t(r))}}ge.combineWorkspaceFeatures=IT;function DT(t,e){return function(r){return e(t(r))}}ge.combineLanguagesFeatures=DT;function OT(t,e){return function(r){return e(t(r))}}ge.combineNotebooksFeatures=OT;function DN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,ET),tracer:r(t.tracer,e.tracer,NT),telemetry:r(t.telemetry,e.telemetry,$T),client:r(t.client,e.client,_T),window:r(t.window,e.window,PT),workspace:r(t.workspace,e.workspace,IT),languages:r(t.languages,e.languages,DT),notebooks:r(t.notebooks,e.notebooks,OT)}}ge.combineFeatures=DN;function ON(t,e,r){let n=r&&r.console?new(r.console(Gc)):new Gc,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Hc)):new Hc,s=r&&r.telemetry?new(r.telemetry(Bc)):new Bc,a=r&&r.client?new(r.client(Kc)):new Kc,l=r&&r.window?new(r.window(AT)):new AT,c=r&&r.workspace?new(r.workspace(wT)):new wT,u=r&&r.languages?new(r.languages(ST)):new ST,f=r&&r.notebooks?new(r.notebooks(kT)):new kT,m=[n,o,s,a,l,c,u,f];function T(v){return v instanceof Promise?v:Wr.thenable(v)?new Promise((g,$)=>{v.then(D=>g(D),D=>$(D))}):Promise.resolve(v)}let C,A,N,w={listen:()=>i.listen(),sendRequest:(v,...g)=>i.sendRequest(Wr.string(v)?v:v.method,...g),onRequest:(v,g)=>i.onRequest(v,g),sendNotification:(v,g)=>{let $=Wr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,g)},onNotification:(v,g)=>i.onNotification(v,g),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(A=v,{dispose:()=>{A=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(C=v,{dispose:()=>{C=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return l},get workspace(){return c},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(g,$)=>v(g,$)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(g,$)=>v(g,$)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(g,$)=>v(g,$)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(g,$)=>v(g,$)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(g,$)=>v(g,$)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),(0,re.attachPartialResult)(i,g))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(g,$)=>v(g,$,(0,re.attachWorkDone)(i,g),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(w);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),Wr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let g of m)g.initialize(v.capabilities);if(A){let g=A(v,new U.CancellationTokenSource().token,(0,re.attachWorkDone)(i,v),void 0);return T(g).then($=>{if($ instanceof U.ResponseError)return $;let D=$;D||(D={capabilities:{}});let K=D.capabilities;K||(K={},D.capabilities=K),K.textDocumentSync===void 0||K.textDocumentSync===null?K.textDocumentSync=Wr.number(w.__textDocumentSync)?w.__textDocumentSync:U.TextDocumentSyncKind.None:!Wr.number(K.textDocumentSync)&&!Wr.number(K.textDocumentSync.change)&&(K.textDocumentSync.change=Wr.number(w.__textDocumentSync)?w.__textDocumentSync:U.TextDocumentSyncKind.None);for(let se of m)se.fillServerCapabilities(K);return D})}else{let g={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(g.capabilities);return g}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,C)return C(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),w}ge.createConnection=ON});var qm=H(Vt=>{"use strict";var LN=Vt&&Vt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),MT=Vt&&Vt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&LN(e,t,r)};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.ProposedFeatures=Vt.NotebookDocuments=Vt.TextDocuments=Vt.SemanticTokensBuilder=void 0;var MN=Cm();Object.defineProperty(Vt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return MN.SemanticTokensBuilder}});MT(kt(),Vt);var FN=wm();Object.defineProperty(Vt,"TextDocuments",{enumerable:!0,get:function(){return FN.TextDocuments}});var UN=km();Object.defineProperty(Vt,"NotebookDocuments",{enumerable:!0,get:function(){return UN.NotebookDocuments}});MT(LT(),Vt);var qN;(function(t){t.all={__brand:"features"}})(qN=Vt.ProposedFeatures||(Vt.ProposedFeatures={}))});var UT=H((gK,FT)=>{"use strict";FT.exports=kt()});var Ae=H(En=>{"use strict";var GN=En&&En.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),GT=En&&En.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&GN(e,t,r)};Object.defineProperty(En,"__esModule",{value:!0});En.createConnection=void 0;var Vc=qm();GT(UT(),En);GT(qm(),En);var qT=!1,jN={initialize:t=>{},get shutdownReceived(){return qT},set shutdownReceived(t){qT=t},exit:t=>{}};function KN(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Vc.ConnectionStrategy.is(t)||Vc.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let l=c=>(0,Vc.createProtocolConnection)(o,s,c,a);return(0,Vc.createConnection)(l,jN,i)}En.createConnection=KN});var rS=H((qle,tS)=>{"use strict";tS.exports=Ae()});var eS=me(Ae(),1);var Xc=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=KT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),l=Math.max(i.end.line,0),c=this._lineOffsets,u=jT(n.text,!1,o);if(l-a===u.length)for(let m=0,T=u.length;m<T;m++)c[m+a+1]=u[m];else u.length<1e4?c.splice(a+1,l-a,...u):this._lineOffsets=c=c.slice(0,a+1).concat(u,c.slice(l+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,T=c.length;m<T;m++)c[m]=c[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=jT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},rs;(function(t){function e(i,o,s,a){return new Xc(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Xc)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=Gm(o.map(HN),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),l=0,c=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<l)throw new Error("Overlapping edit");f>l&&c.push(s.substring(l,f)),u.newText.length&&c.push(u.newText),l=i.offsetAt(u.range.end)}return c.push(s.substr(l)),c.join("")}t.applyEdits=n})(rs||(rs={}));function Gm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);Gm(n,e),Gm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function jT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function KT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function HN(t){let e=KT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function $t(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function ei(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function HT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function ns(t){return typeof t=="object"&&t!==null&&$t(t.container)&&ei(t.reference)&&typeof t.message=="string"}var po=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return $t(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function $n(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function mo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function BT(t){return $n(t)&&typeof t.fullText=="string"}var Ir=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return hr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=BN(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?hr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return hr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(Yc(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return hr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(Yc(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return hr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?hr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function BN(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Yc(t){return!!t&&typeof t[Symbol.iterator]=="function"}var is=new Ir(()=>{},()=>hr),hr=Object.freeze({done:!0,value:void 0});function oe(...t){if(t.length===1){let e=t[0];if(e instanceof Ir)return e;if(Yc(e))return new Ir(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Ir(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:hr)}return t.length>1?new Ir(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Yc(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return hr}):is}var zr=class extends Ir{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return hr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Va;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Va=Va||(Va={}));function jm(t){return new zr(t,e=>$n(e)?e.content:[],{includeRoot:!0})}function VT(t){return jm(t).filter(mo)}function XT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Xa(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function or(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var ti;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(ti=ti||(ti={}));function WN(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return ti.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return ti.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?ti.Inside:r?ti.OverlapBack:ti.OverlapFront}function Jc(t,e){return WN(t,e)>ti.After}var Km=/^[\w\p{L}]$/u;function Dt(t,e,r=Km){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Cr(t,e)}}function YT(t,e){if(t){let r=zN(t,!0);if(r&&WT(r,e))return r;if(BT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(WT(o,e))return o}}}}function WT(t,e){return mo(t)&&e.includes(t.tokenType.name)}function Cr(t,e){if(mo(t))return t;if($n(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return Cr(o,e)}if(r===n)return Cr(t.content[r],e)}}function zN(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function JT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function QT(t,e){let r=VN(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function VN(t,e){let r=zT(t),n=zT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function zT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function ho(t,e,r,n){let i=[t,e,r,n].reduce(rv,{});return tv(i)}var Hm=Symbol("isProxy");function Qc(t){if(t&&t[Hm])for(let e of Object.values(t))Qc(e);return t}function tv(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>ev(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(ev(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Hm]});return r[Hm]=!0,r}var ZT=Symbol();function ev(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===ZT)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=ZT;try{t[e]=typeof i=="function"?i(n):tv(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function rv(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=rv(i,n):t[r]=n}}return t}var Me=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Va.sum(oe(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return oe(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return oe(this.map.keys())}values(){return oe(this.map.values()).flat()}entriesGroupedByKey(){return oe(this.map.entries())}};var Bm="AbstractRule";var yo="AbstractType";var XN="Condition";var YN="TypeDefinition";var Wm="AbstractElement";function os(t){return fe.isInstance(t,Wm)}var nv="ArrayType";function go(t){return fe.isInstance(t,nv)}var iv="Conjunction";function ov(t){return fe.isInstance(t,iv)}var sv="Disjunction";function av(t){return fe.isInstance(t,sv)}var lv="Grammar";function ss(t){return fe.isInstance(t,lv)}var JN="GrammarImport";function Zc(t){return fe.isInstance(t,JN)}var QN="InferredType";function as(t){return fe.isInstance(t,QN)}var Ja="Interface";function Ar(t){return fe.isInstance(t,Ja)}var cv="LiteralCondition";function uv(t){return fe.isInstance(t,cv)}var fv="Negation";function dv(t){return fe.isInstance(t,fv)}var pv="Parameter";function mv(t){return fe.isInstance(t,pv)}var hv="ParameterReference";function ls(t){return fe.isInstance(t,hv)}var yv="ParserRule";function B(t){return fe.isInstance(t,yv)}var gv="ReferenceType";function To(t){return fe.isInstance(t,gv)}var ZN="ReturnType";function cs(t){return fe.isInstance(t,ZN)}var Tv="SimpleType";function sr(t){return fe.isInstance(t,Tv)}var zm="TerminalRule";function we(t){return fe.isInstance(t,zm)}var Qa="Type";function Ft(t){return fe.isInstance(t,Qa)}var e_="TypeAttribute";function eu(t){return fe.isInstance(t,e_)}var vv="UnionType";function Vr(t){return fe.isInstance(t,vv)}var xv="Action";function _e(t){return fe.isInstance(t,xv)}var Rv="Alternatives";function Dr(t){return fe.isInstance(t,Rv)}var bv="Assignment";function be(t){return fe.isInstance(t,bv)}var Cv="CharacterRange";function tu(t){return fe.isInstance(t,Cv)}var Av="CrossReference";function Xt(t){return fe.isInstance(t,Av)}var wv="Group";function Ut(t){return fe.isInstance(t,wv)}var Sv="Keyword";function mt(t){return fe.isInstance(t,Sv)}var kv="NegatedToken";function Ev(t){return fe.isInstance(t,kv)}var $v="RegexToken";function Nv(t){return fe.isInstance(t,$v)}var _v="RuleCall";function Pe(t){return fe.isInstance(t,_v)}var Pv="TerminalAlternatives";function Iv(t){return fe.isInstance(t,Pv)}var Dv="TerminalGroup";function Ov(t){return fe.isInstance(t,Dv)}var Lv="TerminalRuleCall";function ru(t){return fe.isInstance(t,Lv)}var Mv="UnorderedGroup";function Or(t){return fe.isInstance(t,Mv)}var Fv="UntilToken";function Uv(t){return fe.isInstance(t,Fv)}var qv="Wildcard";function Gv(t){return fe.isInstance(t,qv)}var Ya=class extends po{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case xv:return this.isSubtype(Wm,r)||this.isSubtype(yo,r);case Rv:case bv:case Cv:case Av:case wv:case Sv:case kv:case $v:case _v:case Pv:case Dv:case Lv:case Mv:case Fv:case qv:return this.isSubtype(Wm,r);case nv:case gv:case Tv:case vv:return this.isSubtype(YN,r);case iv:case sv:case cv:case fv:case hv:return this.isSubtype(XN,r);case Ja:case Qa:return this.isSubtype(yo,r);case yv:return this.isSubtype(Bm,r)||this.isSubtype(yo,r);case zm:return this.isSubtype(Bm,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return yo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Bm;case"Grammar:usedGrammars":return lv;case"NamedArgument:parameter":case"ParameterReference:parameter":return pv;case"TerminalRuleCall:rule":return zm;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},fe=new Ya;function jv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{$t(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):$t(r)&&(r.$container=t,r.$containerProperty=e))}function Ie(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ie(t){let r=nu(t).$document;if(!r)throw new Error("AST node has no document.");return r}function nu(t){for(;t.$container;)t=t.$container;return t}function _i(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Ir(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if($t(o)){if(n.keyIndex++,Vm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if($t(a)&&Vm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return hr})}function Ze(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new zr(t,r=>_i(r,e))}function ni(t,e){if(t){if(e?.range&&!Vm(t,e.range))return new zr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new zr(t,r=>_i(r,e),{includeRoot:!0})}function Vm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Jc(n,e):!1}function iu(t){return new Ir(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(ei(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(ei(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return hr})}function Kv(t){var e,r;if(t){if("astNode"in t)return n_(t);if(Array.isArray(t))return t.reduce(Hv,void 0);{let n=t,i=t_(n)?r_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return us(n,i)}}else return}function t_(t){return typeof t<"u"&&"element"in t&&"text"in t}function r_(t){try{return ie(t).uri.toString()}catch{return}}function n_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return us(s,Xm(n));{let a=l=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<l.length?l[o]:void 0:l.reduce(Hv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let l=a(s.assignments[i]);return l&&us(l,Xm(n))}else if(n.$cstNode){let l=a(Pi(n.$cstNode,i));return l&&us(l,Xm(n))}else return}}}function Xm(t){var e,r,n,i;return t.$cstNode?(r=(e=ie(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new zr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function us(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Hv(t,e){var r,n;if(t){if(!e)return t&&us(t)}else return e&&us(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),l=a-s,c={offset:s,end:a,length:l};if(t.range&&e.range&&(c.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let u=t.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;c.fileURI=m}return c}var Ym=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=i_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function i_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function Bv(t,e){let r=new Ym(e),n=r.pushTraceRegion(void 0);Wv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Wv(t,e){typeof t=="string"?o_(t,e):t instanceof fs?s_(t,e):t instanceof Yt?Xv(t,e):t instanceof Ii&&a_(t,e)}function zv(t,e){return typeof t=="string"?t.length!==0:t instanceof Yt?t.contents.some(r=>zv(r,e)):t instanceof Ii?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function o_(t,e){t&&(e.pendingIndent&&Vv(e,!1),e.append(t))}function Vv(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Xv(t,e){let r,n=Kv(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Wv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function s_(t,e){var r;if(zv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Xv(t,e)}finally{e.decreaseIndent()}}}function a_(t,e){t.ifNotEmpty&&!l_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Vv(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function l_(t){return t.trimStart()!==""}var GK=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Za=/\r?\n/g,c_=/\S|$/;function Yv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(c_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function Qm(t,...e){let r=u_(t),n=f_(t,e,r);return p_(n)}function Zv(t,e,r){return(n,...i)=>Zm(t,e,r)(Qm(n,...i))}function u_(t){let e=t.join("_").split(Za),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Yv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function f_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((c,u)=>{s.push(...c.split(Za).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(u===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(ou,m):(f,m,T)=>T===0?[m]:f.concat(ou,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(el(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?ex:[]))});let a=s.length,l=a!==0?s[a-1]:void 0;return(i||o)&&typeof l=="string"&&l.trim().length===0?n&&a!==1&&s[a-2]===ou?s.slice(0,a-2):s.slice(0,a-1):s}var ou={isNewLine:!0},ex={isUndefinedSegment:!0},Qv=t=>t===ou,Jm=t=>t===ex,d_=t=>t.content!==void 0;function p_(t){return t.reduce((r,n,i)=>Jm(n)?r:Qv(n)?{node:i!==0&&(Jm(t[i-1])||el(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Jm(t[i-2])||el(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||Qv(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=d_(n)?n.content:n,l;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:c=>l=c.append(a)}):r.node.append(a),indented:l??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Yt}).node}var Jv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function el(t){return t instanceof Yt||t instanceof fs||t instanceof Ii}function ds(t,e){return el(t)?Bv(t,e).text:String(t)}var Yt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if($t(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(at)}appendNewLineIf(e){return e?this.append(at):this}appendNewLineIfNotEmpty(){return this.append(m_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(Qm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new fs(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(Zv(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function Zm(t,e,r){return n=>n instanceof Yt&&n.tracedSource===void 0?n.trace(t,e,r):new Yt().trace(t,e,r).append(n)}var fs=class extends Yt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},Ii=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Jv,this.ifNotEmpty=r}},at=new Ii,m_=new Ii(void 0,!0);function ii(t){return"referenceType"in t}function oi(t){return"elementType"in t}function Ot(t){return"types"in t}function rh(t){if(Ot(t)){let e=[];for(let r of t.types)e.push(...rh(r));return e}else return[t]}function Lr(t){return"value"in t}function Mr(t){return"primitive"in t}function Nn(t){return"string"in t}function dn(t){return t&&"type"in t}function mn(t){return t&&"properties"in t}var au=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Yt;return r.append(`export type ${this.name} = ${pn(this.type,"AstType")};`,at),e&&(r.append(at),nx(r,this.name)),this.dataType&&h_(r,this),ds(r)}toDeclaredTypesString(e){let r=new Yt;return r.append(`type ${nh(this.name,e)} = ${pn(this.type,"DeclaredType")};`,at),ds(r)}},ps=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=mn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Yt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?vo([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,at),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${vo([...this.containerTypes].map(s=>s.name)).join(" | ")};`,at),this.typeNames.size>0&&o.append(`readonly $type: ${vo([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,at),tx(o,this.properties,"AstType")}),r.append("}",at),e&&(r.append(at),nx(r,this.name)),ds(r)}toDeclaredTypesString(e){let r=new Yt,n=nh(this.name,e),i=vo(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,at),r.indent(o=>tx(o,this.properties,"DeclaredType",e)),r.append("}",at),ds(r)}},lu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function rl(t,e){return Di(t,e,new Map)}function Di(t,e,r){let n=`${tl(t)}\xBB${tl(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Ot(t)?i=t.types.every(o=>Di(o,e,r)):Ot(e)?i=e.types.some(o=>Di(t,o,r)):Lr(e)&&dn(e.value)?Lr(t)&&dn(t.value)&&e.value.name===t.value.name?i=!0:i=Di(t,e.value.type,r):ii(t)?i=ii(e)&&Di(t.referenceType,e.referenceType,r):oi(t)?i=oi(e)&&Di(t.elementType,e.elementType,r):Lr(t)?dn(t.value)?i=Di(t.value.type,e,r):Lr(e)?dn(e.value)?i=Di(t,e.value.type,r):i=rx(t.value,e.value,new Set):i=!1:Mr(t)?i=Mr(e)&&t.primitive===e.primitive:Nn(t)&&(i=Mr(e)&&e.primitive==="string"||Nn(e)&&e.string===t.string),i&&r.set(n,i)),i}function rx(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(mn(i)&&rx(i,e,r))return!0;return!1}function tl(t){if(ii(t))return`@(${tl(t.referenceType)})}`;if(oi(t))return`(${tl(t.elementType)})[]`;if(Ot(t)){let e=t.types.map(r=>tl(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Lr(t))return`Value<${t.value.name}>`;if(Mr(t))return t.primitive;if(Nn(t))return`'${t.string}'`}throw new Error("Invalid type")}function pn(t,e="AstType"){if(ii(t)){let r=pn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${eh(t.referenceType,r)}`}else if(oi(t)){let r=pn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${eh(t.elementType,r)}[]`}else if(Ot(t)){let r=t.types.map(n=>eh(n,pn(n,e)));return vo(r).join(" | ")}else{if(Lr(t))return t.value.name;if(Mr(t))return t.primitive;if(Nn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function eh(t,e){return Ot(t)&&(e=`(${e})`),e}function tx(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:nh(o.name,n),a=o.optional&&!cu(o.type),l=pn(o.type,r);return`${s}${a?"?":""}: ${l}`}vo(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),at))}function cu(t){return oi(t)?!0:ii(t)?!1:Ot(t)?t.types.every(e=>cu(e)):Mr(t)?t.primitive==="boolean":!1}function nx(t,e){t.append(`export const ${e} = '${e}';`,at),t.append(at),t.append(`export function is${e}(item: unknown): item is ${e} {`,at),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,at)),t.append("}",at)}function h_(t,e){switch(e.dataType){case"string":if(th(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=ix(e.type),i=ox(e.type);if(r.length===0&&n.length===0&&i.length===0)su(t,e.name,`typeof item === '${e.dataType}'`);else{let o=y_(r,n,i);su(t,e.name,o)}}break;case"number":case"boolean":case"bigint":su(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":su(t,e.name,"item instanceof Date");break;default:return}}function th(t){let e=!0;if(Mr(t))return t.primitive==="string";if(Nn(t))return!0;if(Ot(t)){for(let r of t.types)if(Lr(r))if(dn(r.value)){if(!th(r.value.type))return!1}else return!1;else if(Mr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Ot(r))e=th(r);else if(!Nn(r))return!1}else return!1;return e}function y_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function nh(t,e){return e.has(t)?`^${t}`:t}function ix(t){let e=[];if(Nn(t))return[t.string];if(Ot(t))for(let r of t.types)Nn(r)?e.push(r.string):Ot(r)&&e.push(...ix(r));return e}function ox(t){let e=[];if(Mr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Ot(t))for(let r of t.types)Mr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Ot(r)&&e.push(...ox(r));return e}function su(t,e,r){t.append(at,`export function is${e}(item: unknown): item is ${e} {`,at),t.indent(n=>n.append(`return ${r};`,at)),t.append("}",at)}function vo(t,e){return Array.from(new Set(t)).sort(e)}function ih(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),l=n.getAstNode(a.parseResult.value,s.sourcePath);Ar(l)?(i.add(l),ih(l,e,r,n).forEach(u=>i.add(u))):l&&Ft(l.$container)&&i.add(l.$container)}),i}function nl(t){let e=new Set;if(Ar(t))e.add(t),t.superTypes.forEach(r=>{if(Ar(r.ref)){e.add(r.ref);let n=nl(r.ref);for(let i of n)e.add(i)}});else if(Ft(t)){let r=sx(t.type);for(let n of r){let i=nl(n);for(let o of i)e.add(o)}}return e}function sx(t){var e;if(Vr(t))return t.types.flatMap(r=>sx(r));if(sr(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Ft(r)||Ar(r))return[r]}return[]}function oh(t,e){return t.interfaces.concat(e.interfaces)}function fu(t){return t.interfaces.concat(t.unions)}function ax(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function lx(t){return uu(t,new Set)}function uu(t,e){if(e.has(t))return[];if(e.add(t),Ot(t))return t.types.flatMap(r=>uu(r,e));if(Lr(t)){let r=t.value;return"type"in r?uu(r.type,e):[r.name]}else if(oi(t))return uu(t.elementType,e);return[]}function il(t){return typeof t.name=="string"}var ms=class{getName(e){if(il(e))return e.name}getNameNode(e){return Jt(e.$cstNode,"name")}};function Q(t){return t.charCodeAt(0)}function du(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function hs(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function xo(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function ol(){throw Error("Internal Error - Should never get here!")}function sh(t){return t.type==="Character"}var sl=[];for(let t=Q("0");t<=Q("9");t++)sl.push(t);var al=[Q("_")].concat(sl);for(let t=Q("a");t<=Q("z");t++)al.push(t);for(let t=Q("A");t<=Q("Z");t++)al.push(t);var ah=[Q(" "),Q("\f"),Q(`
`),Q("\r"),Q("	"),Q("\v"),Q("	"),Q("\xA0"),Q("\u1680"),Q("\u2000"),Q("\u2001"),Q("\u2002"),Q("\u2003"),Q("\u2004"),Q("\u2005"),Q("\u2006"),Q("\u2007"),Q("\u2008"),Q("\u2009"),Q("\u200A"),Q("\u2028"),Q("\u2029"),Q("\u202F"),Q("\u205F"),Q("\u3000"),Q("\uFEFF")];var g_=/[0-9a-fA-F]/,pu=/[0-9]/,T_=/[1-9]/,Ro=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":hs(n,"global");break;case"i":hs(n,"ignoreCase");break;case"m":hs(n,"multiLine");break;case"u":hs(n,"unicode");break;case"y":hs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}xo(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return ol()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;xo(r);break}if(!(e===!0&&r===void 0)&&xo(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),xo(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):ol()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[Q(`
`),Q("\r"),Q("\u2028"),Q("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=sl;break;case"D":e=sl,r=!0;break;case"s":e=ah;break;case"S":e=ah,r=!0;break;case"w":e=al;break;case"W":e=al,r=!0;break}return xo(e)?{type:"Set",value:e,complement:r}:ol()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=Q("\f");break;case"n":e=Q(`
`);break;case"r":e=Q("\r");break;case"t":e=Q("	");break;case"v":e=Q("\v");break}return xo(e)?{type:"Character",value:e}:ol()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:Q("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:Q(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:Q(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(sh(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(sh(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else du(n.value,e),e.push(Q("-")),du(o.value,e)}else du(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:Q("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(T_.test(e)===!1)throw Error("Expecting a positive integer");for(;pu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(pu.test(e)===!1)throw Error("Expecting an integer");for(;pu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:Q(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return pu.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(g_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var _n=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var v_=new Ro,ch=class extends _n{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=si(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},lh=new ch;function cx(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),lh.reset(t),lh.visit(v_.pattern(t)),lh.multiline}catch{return!1}}function uh(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function si(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ux(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:si(e)).join("")}function fx(t,e){let r=x_(t),n=e.match(r);return!!n&&n[0].length>0}function x_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(c){o+=r.substr(n,c),n+=c}function l(c){o+="(?:"+r.substr(n,c)+"|$)",n+=c}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":l(3);break;case"x":l(4);break;case"u":e.unicode?r[n+2]==="{"?l(r.indexOf("}",n)-n+1):l(6):l(2);break;case"p":case"P":e.unicode?l(r.indexOf("}",n)-n+1):l(2);break;case"k":l(r.indexOf(">",n)-n+1);break;default:l(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],l(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):l(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:l(1);break}return o}return new RegExp(i(),t.flags)}var fh={};IS(fh,{URI:()=>mu,Utils:()=>R_});var dx;(()=>{"use strict";var t={470:i=>{function o(l){if(typeof l!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(l))}function s(l,c){for(var u,f="",m=0,T=-1,C=0,A=0;A<=l.length;++A){if(A<l.length)u=l.charCodeAt(A);else{if(u===47)break;u=47}if(u===47){if(!(T===A-1||C===1))if(T!==A-1&&C===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=A,C=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=A,C=0;continue}}c&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+l.slice(T+1,A):f=l.slice(T+1,A),m=A-T-1;T=A,C=0}else u===46&&C!==-1?++C:C=-1}return f}var a={resolve:function(){for(var l,c="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(l===void 0&&(l=process.cwd()),m=l),o(m),m.length!==0&&(c=m+"/"+c,u=m.charCodeAt(0)===47)}return c=s(c,!u),u?c.length>0?"/"+c:"/":c.length>0?c:"."},normalize:function(l){if(o(l),l.length===0)return".";var c=l.charCodeAt(0)===47,u=l.charCodeAt(l.length-1)===47;return(l=s(l,!c)).length!==0||c||(l="."),l.length>0&&u&&(l+="/"),c?"/"+l:l},isAbsolute:function(l){return o(l),l.length>0&&l.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var l,c=0;c<arguments.length;++c){var u=arguments[c];o(u),u.length>0&&(l===void 0?l=u:l+="/"+u)}return l===void 0?".":a.normalize(l)},relative:function(l,c){if(o(l),o(c),l===c||(l=a.resolve(l))===(c=a.resolve(c)))return"";for(var u=1;u<l.length&&l.charCodeAt(u)===47;++u);for(var f=l.length,m=f-u,T=1;T<c.length&&c.charCodeAt(T)===47;++T);for(var C=c.length-T,A=m<C?m:C,N=-1,w=0;w<=A;++w){if(w===A){if(C>A){if(c.charCodeAt(T+w)===47)return c.slice(T+w+1);if(w===0)return c.slice(T+w)}else m>A&&(l.charCodeAt(u+w)===47?N=w:w===0&&(N=0));break}var v=l.charCodeAt(u+w);if(v!==c.charCodeAt(T+w))break;v===47&&(N=w)}var g="";for(w=u+N+1;w<=f;++w)w!==f&&l.charCodeAt(w)!==47||(g.length===0?g+="..":g+="/..");return g.length>0?g+c.slice(T+N):(T+=N,c.charCodeAt(T)===47&&++T,c.slice(T))},_makeLong:function(l){return l},dirname:function(l){if(o(l),l.length===0)return".";for(var c=l.charCodeAt(0),u=c===47,f=-1,m=!0,T=l.length-1;T>=1;--T)if((c=l.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":l.slice(0,f)},basename:function(l,c){if(c!==void 0&&typeof c!="string")throw new TypeError('"ext" argument must be a string');o(l);var u,f=0,m=-1,T=!0;if(c!==void 0&&c.length>0&&c.length<=l.length){if(c.length===l.length&&c===l)return"";var C=c.length-1,A=-1;for(u=l.length-1;u>=0;--u){var N=l.charCodeAt(u);if(N===47){if(!T){f=u+1;break}}else A===-1&&(T=!1,A=u+1),C>=0&&(N===c.charCodeAt(C)?--C==-1&&(m=u):(C=-1,m=A))}return f===m?m=A:m===-1&&(m=l.length),l.slice(f,m)}for(u=l.length-1;u>=0;--u)if(l.charCodeAt(u)===47){if(!T){f=u+1;break}}else m===-1&&(T=!1,m=u+1);return m===-1?"":l.slice(f,m)},extname:function(l){o(l);for(var c=-1,u=0,f=-1,m=!0,T=0,C=l.length-1;C>=0;--C){var A=l.charCodeAt(C);if(A!==47)f===-1&&(m=!1,f=C+1),A===46?c===-1?c=C:T!==1&&(T=1):c!==-1&&(T=-1);else if(!m){u=C+1;break}}return c===-1||f===-1||T===0||T===1&&c===f-1&&c===u+1?"":l.slice(c,f)},format:function(l){if(l===null||typeof l!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof l);return function(c,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,l)},parse:function(l){o(l);var c={root:"",dir:"",base:"",ext:"",name:""};if(l.length===0)return c;var u,f=l.charCodeAt(0),m=f===47;m?(c.root="/",u=1):u=0;for(var T=-1,C=0,A=-1,N=!0,w=l.length-1,v=0;w>=u;--w)if((f=l.charCodeAt(w))!==47)A===-1&&(N=!1,A=w+1),f===46?T===-1?T=w:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){C=w+1;break}return T===-1||A===-1||v===0||v===1&&T===A-1&&T===C+1?A!==-1&&(c.base=c.name=C===0&&m?l.slice(1,A):l.slice(C,A)):(C===0&&m?(c.name=l.slice(1,T),c.base=l.slice(1,A)):(c.name=l.slice(C,T),c.base=l.slice(C,A)),c.ext=l.slice(T,A)),C>0?c.dir=l.slice(0,C-1):m&&(c.dir="/"),c},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>Rt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function l(M,S){if(!M.scheme&&S)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let c="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(S){return S instanceof m||!!S&&typeof S.authority=="string"&&typeof S.fragment=="string"&&typeof S.path=="string"&&typeof S.query=="string"&&typeof S.scheme=="string"&&typeof S.fsPath=="string"&&typeof S.with=="function"&&typeof S.toString=="function"}scheme;authority;path;query;fragment;constructor(S,q,j,ue,te,Z=!1){typeof S=="object"?(this.scheme=S.scheme||c,this.authority=S.authority||c,this.path=S.path||c,this.query=S.query||c,this.fragment=S.fragment||c):(this.scheme=function(bt,ft){return bt||ft?bt:"file"}(S,Z),this.authority=q||c,this.path=function(bt,ft){switch(bt){case"https":case"http":case"file":ft?ft[0]!==u&&(ft=u+ft):ft=u}return ft}(this.scheme,j||c),this.query=ue||c,this.fragment=te||c,l(this,Z))}get fsPath(){return v(this,!1)}with(S){if(!S)return this;let{scheme:q,authority:j,path:ue,query:te,fragment:Z}=S;return q===void 0?q=this.scheme:q===null&&(q=c),j===void 0?j=this.authority:j===null&&(j=c),ue===void 0?ue=this.path:ue===null&&(ue=c),te===void 0?te=this.query:te===null&&(te=c),Z===void 0?Z=this.fragment:Z===null&&(Z=c),q===this.scheme&&j===this.authority&&ue===this.path&&te===this.query&&Z===this.fragment?this:new C(q,j,ue,te,Z)}static parse(S,q=!1){let j=f.exec(S);return j?new C(j[2]||c,K(j[4]||c),K(j[5]||c),K(j[7]||c),K(j[9]||c),q):new C(c,c,c,c,c)}static file(S){let q=c;if(i&&(S=S.replace(/\\/g,u)),S[0]===u&&S[1]===u){let j=S.indexOf(u,2);j===-1?(q=S.substring(2),S=u):(q=S.substring(2,j),S=S.substring(j)||u)}return new C("file",q,S,c,c)}static from(S){let q=new C(S.scheme,S.authority,S.path,S.query,S.fragment);return l(q,!0),q}toString(S=!1){return g(this,S)}toJSON(){return this}static revive(S){if(S){if(S instanceof m)return S;{let q=new C(S);return q._formatted=S.external,q._fsPath=S._sep===T?S.fsPath:null,q}}return S}}let T=i?1:void 0;class C extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(S=!1){return S?g(this,!0):(this._formatted||(this._formatted=g(this,!1)),this._formatted)}toJSON(){let S={$mid:1};return this._fsPath&&(S.fsPath=this._fsPath,S._sep=T),this._formatted&&(S.external=this._formatted),this.path&&(S.path=this.path),this.scheme&&(S.scheme=this.scheme),this.authority&&(S.authority=this.authority),this.query&&(S.query=this.query),this.fragment&&(S.fragment=this.fragment),S}}let A={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,S,q){let j,ue=-1;for(let te=0;te<M.length;te++){let Z=M.charCodeAt(te);if(Z>=97&&Z<=122||Z>=65&&Z<=90||Z>=48&&Z<=57||Z===45||Z===46||Z===95||Z===126||S&&Z===47||q&&Z===91||q&&Z===93||q&&Z===58)ue!==-1&&(j+=encodeURIComponent(M.substring(ue,te)),ue=-1),j!==void 0&&(j+=M.charAt(te));else{j===void 0&&(j=M.substr(0,te));let bt=A[Z];bt!==void 0?(ue!==-1&&(j+=encodeURIComponent(M.substring(ue,te)),ue=-1),j+=bt):ue===-1&&(ue=te)}}return ue!==-1&&(j+=encodeURIComponent(M.substring(ue))),j!==void 0?j:M}function w(M){let S;for(let q=0;q<M.length;q++){let j=M.charCodeAt(q);j===35||j===63?(S===void 0&&(S=M.substr(0,q)),S+=A[j]):S!==void 0&&(S+=M[q])}return S!==void 0?S:M}function v(M,S){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?S?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function g(M,S){let q=S?w:N,j="",{scheme:ue,authority:te,path:Z,query:bt,fragment:ft}=M;if(ue&&(j+=ue,j+=":"),(te||ue==="file")&&(j+=u,j+=u),te){let ye=te.indexOf("@");if(ye!==-1){let Nr=te.substr(0,ye);te=te.substr(ye+1),ye=Nr.lastIndexOf(":"),ye===-1?j+=q(Nr,!1,!1):(j+=q(Nr.substr(0,ye),!1,!1),j+=":",j+=q(Nr.substr(ye+1),!1,!0)),j+="@"}te=te.toLowerCase(),ye=te.lastIndexOf(":"),ye===-1?j+=q(te,!1,!0):(j+=q(te.substr(0,ye),!1,!0),j+=te.substr(ye))}if(Z){if(Z.length>=3&&Z.charCodeAt(0)===47&&Z.charCodeAt(2)===58){let ye=Z.charCodeAt(1);ye>=65&&ye<=90&&(Z=`/${String.fromCharCode(ye+32)}:${Z.substr(3)}`)}else if(Z.length>=2&&Z.charCodeAt(1)===58){let ye=Z.charCodeAt(0);ye>=65&&ye<=90&&(Z=`${String.fromCharCode(ye+32)}:${Z.substr(2)}`)}j+=q(Z,!0,!1)}return bt&&(j+="?",j+=q(bt,!1,!1)),ft&&(j+="#",j+=S?ft:N(ft,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function K(M){return M.match(D)?M.replace(D,S=>$(S)):M}var se=r(470);let $e=se.posix||se,Ht="/";var Rt;(function(M){M.joinPath=function(S,...q){return S.with({path:$e.join(S.path,...q)})},M.resolvePath=function(S,...q){let j=S.path,ue=!1;j[0]!==Ht&&(j=Ht+j,ue=!0);let te=$e.resolve(j,...q);return ue&&te[0]===Ht&&!S.authority&&(te=te.substring(1)),S.with({path:te})},M.dirname=function(S){if(S.path.length===0||S.path===Ht)return S;let q=$e.dirname(S.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),S.with({path:q})},M.basename=function(S){return $e.basename(S.path)},M.extname=function(S){return $e.extname(S.path)}})(Rt||(Rt={}))})(),dx=n})();var{URI:mu,Utils:R_}=dx;var ai=fh;"default"in ai&&(ai=ai.default);var Qt=ai.URI;var xe;(function(t){t.basename=ai.Utils.basename,t.dirname=ai.Utils.dirname,t.extname=ai.Utils.extname,t.joinPath=ai.Utils.joinPath,t.resolvePath=ai.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),l=s.split("/").filter(m=>m.length>0),c=0;for(;c<a.length&&a[c]===l[c];c++);let u="../".repeat(a.length-c),f=l.slice(c).join("/");return u+f}t.relative=r})(xe=xe||(xe={}));var gH=xe.equals,TH=xe.relative;var hu,px=()=>hu??(hu=yu(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var vu=me(lo(),1);var ll=me(Qn(),1);function b_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var mx=0,C_=10;var hx=Symbol("OperationCancelled");function bo(t){return t===hx}async function et(t){if(t===ll.CancellationToken.None)return;let e=Date.now();if(e-mx>=C_&&(mx=e,await b_()),t.isCancellationRequested)throw hx}var gu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new ll.CancellationTokenSource}lock(e){this.cancel();let r=new ll.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{bo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Fr(t){return{code:t}}var ys;(function(t){t.all=["fast","slow","built-in"]})(ys=ys||(ys={}));var Tu=class{constructor(e){this.entries=new Me,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let l={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,l)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=oe(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function yx(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:Co(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(hn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:Co(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function Co(t){if(go(t))return{elementType:Co(t.elementType)};if(To(t))return{referenceType:Co(t.referenceType)};if(Vr(t))return{types:t.types.map(Co)};if(sr(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=Pn(r);if(n)return gs(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function Ts(t){return"referenceType"in t}function dh(t){return"elementType"in t}function gx(t){return"types"in t}function ph(t){return"value"in t}function A_(t){return"primitive"in t}function w_(t){return"string"in t}function Tx(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ps(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new au(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=S_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=cl(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function S_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:cl(t.type,void 0,e,r)}}function cl(t,e,r,n){if(dh(t))return{elementType:cl(t.elementType,e,r,n)};if(Ts(t))return{referenceType:cl(t.referenceType,void 0,r,n)};if(gx(t))return{types:t.types.map(i=>cl(i,e,r,n))};if(w_(t))return{string:t.string};if(A_(t))return{primitive:t.primitive,regex:t.regex};if(ph(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function hh(t,e){let r=ul(t),n=ul(e);for(let i of n)k_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function k_(t,e){return t.some(r=>mh(r,e))}function mh(t,e){return dh(t)&&dh(e)?mh(t.elementType,e.elementType):Ts(t)&&Ts(e)?mh(t.referenceType,e.referenceType):ph(t)&&ph(e)?t.value===e.value:!1}function ul(t){return gx(t)?t.types.flatMap(e=>ul(e)):[t]}function vx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Se;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Se=Se||(Se={}));var xu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Fr(Se.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>B(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>B(o)&&!Ur(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Fr(Se.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Ur(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>oe(i.rules).filter(o=>!fl(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>oe(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Me;n(e).forEach(l=>o.add(l.name,l));for(let[,l]of o.entriesGroupedByKey())l.length>1&&l.forEach(c=>{r("error",`A ${i}'s name has to be unique.`,{node:c,property:"name"})});let s=new Set,a=dl(this.documents,e);for(let l of a)n(l).forEach(c=>s.add(c.name));for(let l of o.keys())s.has(l)&&o.get(l).forEach(u=>{r("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Me;for(let i of e.imports){let o=li(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[vu.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=dl(this.documents,o);n.set(o,s)}let i=new Me;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let l=n.get(a),c=this.getDuplicateExportedRules(s,l);for(let u of c)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+oe(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let l=a.name;for(let c of o){let u=c.name;l===u&&s.add(c.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let l of e.types)s.add(l.name);for(let l of e.interfaces)s.add(l.name);for(let l of dl(this.documents,e))l.types.forEach(c=>s.add(c.name)),l.interfaces.forEach(c=>s.add(c.name));for(let l of e.rules.filter(B)){if(fl(l))continue;let c=Ur(l),u=!l.returnType&&!l.dataType,f=Pn(l);if(!c&&f&&s.has(f)===u){if((u||((n=l.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&l.inferredType===void 0)r("error",a(f,u),{node:l,property:"name",data:Fr(Se.MissingReturns)});else if(u||((i=l.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Xr(l.inferredType.$cstNode,"infers");r("error",a(f,u),{node:l.inferredType,property:"name",data:{code:Se.InvalidInfers,actionSegment:or(m)}})}}else if(c&&u){let m=Xr(l.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:l,property:"inferredType",data:{code:Se.InvalidInfers,actionSegment:or(m)}})}}for(let l of Ze(e).filter(_e)){let c=this.getActionType(l);if(c){let u=!!l.inferredType,f=Pn(l);if(l.type&&f&&s.has(f)===u){let m=u?Xr(l.$cstNode,"infer"):Xr(l.$cstNode,"{");r("error",a(f,u),{node:l,property:"type",data:{code:u?Se.SuperfluousInfer:Se.MissingInfer,actionSegment:or(m)}})}else if(c&&f&&s.has(f)&&u&&l.$cstNode){let m=Jt((o=l.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=Xr(l.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:l,property:"type",data:{code:Se.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(l,c){return c?`The type '${l}' is already explicitly declared and cannot be inferred.`:`The type '${l}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Fr(Se.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Jr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",l=s+"isu",c=new Set,u=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);l.includes(T)?s.includes(T)&&u.add(T):c.add(T)}let f=this.getFlagRange(e);f&&(c.size>0?r("error",`'${Array.from(c).join("")}' ${c.size>1?"are":"is"} not valid regular expression flag${c.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&r("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!we(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Jt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Ie(e,i=>we(i)||B(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;we(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;we(n)&&n.fragment&&Ie(e,B)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Fr(Se.CrossRefTokenSyntax)})}checkPackageImport(e,r){li(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Fr(Se.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Fr(Se.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=vs(e,!0);for(let i of e.rules)we(i)&&i.hidden||fl(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[vu.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Me,i=new Set;for(let c of e.rules)we(c)&&c.name&&n.add(c.name,c),B(c)&&Ze(c).filter(mt).forEach(f=>i.add(f.value));let o=new Me,s=new Me;for(let c of e.imports){let u=dl(this.documents,c);for(let f of u)for(let m of f.rules)we(m)&&m.name?o.add(m.name,c):B(m)&&m.name&&Ze(m).filter(mt).forEach(C=>s.add(C.value,c))}for(let c of n.values())if(i.has(c.name))r("error","Terminal name clashes with existing keyword.",{node:c,property:"name"});else if(s.has(c.name)){let u=s.get(c.name);r("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:c,property:"name"})}let a=new Me;for(let c of i)for(let u of o.get(c))a.add(u,c);for(let[c,u]of a.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:c,property:"path"});let l=new Me;for(let[c,u]of o.entriesGroupedByKey()){let f=s.get(c);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>l.add(m,c))}for(let[c,u]of l.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:c,property:"path"})}checkRuleName(e,r){if(e.name&&!fl(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Fr(Se.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&E_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Ie(e,B)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Yr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Fr(Se.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Ze(e).filter(ls);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[vu.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(fl(e))return;let n=Rx(e),i=Ur(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&Pe(e.terminal)&&B(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Ze(e.terminal).map(o=>Xt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=Co(n.type),o=ul(i),s=!1,a=!1;for(let l of o)Ts(l)?s=!0:Ts(l)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!gs(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(B(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else we(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!pl(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(Pe(i)){let o=i.rule.ref;B(o)&&!Ur(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):B(o)&&!bx(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):we(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Ft(e.type.ref)&&Vr(e.type.ref.type)){let n=xx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;B((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){sr(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&B(e.ref)&&!Ur(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=Pn(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Xt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function fl(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var E_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function xx(t){let e=[];return t.types.forEach(r=>{var n;sr(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Ft(r.typeRef.ref)&&(Vr(r.typeRef.ref.type)?e.push(...xx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Yr(t,e){return t==="?"||t==="*"||Ut(e)&&!!e.guardCondition}function Cx(t){return t==="*"||t==="+"}function Ur(t){return Ax(t,new Set)}function Ax(t,e){if(e.has(t))return!0;e.add(t);for(let r of Ze(t))if(Pe(r)){if(!r.rule.ref||B(r.rule.ref)&&!Ax(r.rule.ref,e))return!1}else{if(be(r))return!1;if(_e(r))return!1}return!!t.definition}function Rx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Ft(r)&&$_(r)}function $_(t){return gh(t.type,new Set)}function gh(t,e){if(e.has(t))return!0;if(e.add(t),go(t))return!1;if(To(t))return!1;if(Vr(t))return t.types.every(r=>gh(r,e));if(sr(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Ft(r)?gh(r.type,e):!1}else return!1}else return!1}function bx(t){return ml(t,new Set)}function ml(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),B(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return ml(t.returnType.ref,e)}else{if(Ft(t))return ml(t.type,e);if(go(t))return!1;if(To(t))return!1;if(Vr(t))return t.types.every(i=>ml(i,e));if(sr(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return ml(t.typeRef.ref,e)}}return!1}function vh(t){let e=t.$container;if(Ut(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(_e(o))return o;{let s=Ze(r[i]).find(_e);if(s)return s}}}if(os(e))return vh(e)}function hn(t){var e;if(B(t))return Ur(t)?t.name:(e=Rs(t))!==null&&e!==void 0?e:t.name;if(Ar(t)||Ft(t)||cs(t))return t.name;if(_e(t)){let r=bs(t);if(r)return r}else if(as(t))return t.name;throw new lu("Cannot get name of Unknown Type",t.$cstNode)}function Pn(t){if(t)try{return hn(t)}catch{return}}function Rs(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(B(e))return e.name;if(Ar(e)||Ft(e))return e.name}}}function bs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return hn(t.type.ref)}function Ao(t){var e,r,n;return we(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Ur(t)?t.name:(n=Rs(t))!==null&&n!==void 0?n:t.name}function Jr(t){let e={s:!1,i:!1,u:!1},r=Cs(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var xh=/[\s\S]/.source;function Cs(t,e){if(Iv(t))return N_(t);if(Ov(t))return __(t);if(tu(t))return D_(t);if(ru(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return ci(Cs(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(Ev(t))return I_(t);if(Uv(t))return P_(t);if(Nv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),ci(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Gv(t))return ci(xh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function N_(t){return ci(t.elements.map(e=>Cs(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function __(t){return ci(t.elements.map(e=>Cs(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function P_(t){return ci(`${xh}*?${Cs(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function I_(t){return ci(`(?!${Cs(t.terminal)})${xh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function D_(t){return t.right?ci(`[${yh(t.left)}-${yh(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):ci(yh(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function yh(t){return si(t.value)}function ci(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function Rh(t){if(t.path===void 0||t.path.length===0)return;let e=xe.dirname(ie(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),xe.resolvePath(e,r)}function li(t,e){let r=Rh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ss(i))return i}}catch{}}function dl(t,e){if(Zc(e)){let r=li(t,e);if(r){let n=Th(t,r);return n.push(r),n}return[]}else return Th(t,e)}function Th(t,e,r=e,n=new Set,i=new Set){let o=ie(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=li(t,s);a&&Th(t,a,r,n,i)}}return Array.from(i)}function xs(t){return be(t)?[t]:Dr(t)||Ut(t)||Or(t)?t.elements.flatMap(e=>xs(e)):Pe(t)&&t.rule.ref?xs(t.rule.ref.definition):[]}var O_=["string","number","boolean","Date","bigint"];function gs(t){return O_.includes(t)}var bh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:wx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let l={alt:s,next:a.children};l.next.length===0?(l.alt.super=l.alt.super.filter(c=>c!==l.alt.name),i.push(l)):i.push(...this.applyNext(e,l))}return Nx(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(wx(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=wo();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function L_(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(Sx)}}function wx(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>Sx(e))}}function Sx(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function kx(t,e,r){let n=[],i={fragments:new Map};for(let l of t)n.push(...Ex(i,l));let o=j_(n),s=K_(o),a=H_(o,s,r);for(let l of e){let c=M_(l);a.unions.push({name:l.name,declared:!1,type:c,subTypes:new Set,superTypes:new Set,dataType:l.dataType})}return a}function M_(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=Ch(t.definition,r);return e?{primitive:"string"}:n}function Ch(t,e){var r,n,i;if(t.cardinality)return e();if(Dr(t))return{types:t.elements.map(o=>Ch(o,e))};if(Ut(t)||Or(t))return t.elements.length!==1?e():Ch(t.elements[0],e);if(Pe(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?we(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Jr(o).toString()}:{value:o.name}:e()}else if(mt(t))return{string:t.value};return e()}function Ex(t,e){let r=wo(e),n=new bh(t,r);return e.definition&&Ah(n,n.root,e.definition),n.getTypes()}function wo(t){return{name:B(t)||_e(t)?Pn(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Ah(t,e,r){let n=Yr(r.cardinality,r);if(Dr(r)){let i=[];n&&i.push(t.connect(e,wo()));for(let o of r.elements){let s=t.connect(e,wo());i.push(Ah(t,s,o))}return t.merge(...i)}else if(Ut(r)||Or(r)){let i=t.connect(e,wo()),o;n&&(o=t.connect(e,wo()));for(let s of r.elements)i=Ah(t,i,s);return o?t.merge(o,i):i}else{if(_e(r))return F_(t,e,r);be(r)?U_(e,r):Pe(r)&&q_(t,e,r)}return e}function F_(t,e,r){var n;if(!t.hasLeafNode(e)){let o=L_(e);t.connect(e,o)}let i=t.connect(e,wo(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&il(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:So(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function U_(t,e){let r={types:new Set,reference:!1};$x(e.terminal,r);let n=So(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Yr(e.cardinality),type:n,astNodes:new Set([e])})}function $x(t,e){if(Dr(t)||Or(t)||Ut(t))for(let r of t.elements)$x(r,e);else if(mt(t))e.types.add(`'${t.value}'`);else if(Pe(t)&&t.rule.ref)e.types.add(Ao(t.rule.ref));else if(Xt(t)&&t.type.ref){let r=Pn(t.type.ref);r&&e.types.add(r),e.reference=!0}}function q_(t,e,r){let n=r.rule.ref;if(B(n)&&n.fragment){let i=G_(n,t.context);Yr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else B(n)&&e.ruleCalls.push(Ao(n))}function G_(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=Pn(t),o=Ex(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function j_(t){let e=new Map,r=[],n=Nx(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function Nx(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Me),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let l of i){let c=l.alt;a.alt.super.push(...c.super),a.next.push(...l.next);let u=c.properties;for(let f of u){let m=o.find(T=>T.name===f.name);m?(m.type=hh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}c.ruleCalls.forEach(f=>s.add(f))}for(let l of i){let c=l.alt;if(c.ruleCalls.length===0)for(let u of o)c.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function K_(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Me;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:So(!1,!1,o)};r.push(s)}return r}function H_(t,e,r){let n=new Me;for(let a of t)for(let l of a.superTypes)n.add(l,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let l=new Set(n.get(a.name));if(a.properties.length===0&&l.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let c=So(!1,!1,Array.from(l)),u=s.get(a.name);if(u)u.type=hh(u.type,c);else{let f={name:a.name,declared:!1,subTypes:l,superTypes:a.superTypes,type:c};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(l=>!s.has(l)));return o}function So(t,e,r){if(t)return{elementType:So(!1,e,r)};if(e)return{referenceType:So(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:gs(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>So(!1,!1,[n]))}}function _x(t,e){let r=Px(t,e),n=yx(r.interfaces,r.types),i=kx(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function Px(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ie(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)B(s)&&!s.fragment&&(Ur(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>li(e,a)).filter(a=>a!==void 0);Px(s,e,r,n)}}}return n}function Ox(t,e){let{inferred:r,declared:n,astResources:i}=_x(t,e);return{astResources:i,inferred:Ix(n,r),declared:Ix(r,n)}}function Ix(t,e){var r,n;let i={interfaces:ax(Dx(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:Dx(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=Tx(i);return B_(o),o}function Dx(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function B_(t){let e=z_(t),r=Array.from(e.values());V_(r),X_(t.interfaces),W_(r)}function W_(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function z_({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,wh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function wh(t,e){if(e.has(t))return!0;if(e.add(t),Ot(t))return t.types.every(r=>wh(r,e));if(Lr(t)){let r=t.value;return dn(r)?wh(r.type,e):!1}else return Mr(t)||Nn(t)}function V_(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function X_(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(l=>lx(l.type));for(let l of a)(e=r.get(l))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)mn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(l=>a.containerTypes.add(l)),o.has(a)||(o.add(a),i.push(a)))}}var Y_={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},J_={maxLookahead:3},Lx={AstReflection:()=>new Ya},Mx={Grammar:()=>px(),LanguageMetaData:()=>Y_,parser:{ParserConfig:()=>J_}};var hl=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},As=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=oe(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},Fx={getElement(){},getAllElements(){return is}};var Ru=me(Qn(),1);var ws=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=Ru.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=_i,i=Ru.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await et(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=Ru.CancellationToken.None){let n=e.parseResult.value,i=new Me;for(let o of Ze(n))await et(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var bu=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},Sh=class extends bu{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},Cu=class extends bu{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var Au=class extends Sh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var Ss=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new Au(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ie(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(oe(a).filter(l=>this.reflection.isSubtype(l.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new hl(oe(e),r,n)}createScopeForNodes(e,r,n){let i=oe(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new hl(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new As(this.indexManager.allElements(e)))}};var wu=class extends Ss{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===yo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ie(r.container).precomputedScopes,o=nu(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=oe(a).filter(l=>l.type===Ja||l.type===Qa))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Ie(r.container,ss);if(!n)return Fx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===yo&&(o=o.filter(s=>s.type===Ja||s.type===Qa)),new As(o)}gatherImports(e,r){for(let n of e.imports){let i=Rh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ss(s)&&this.gatherImports(s,r)}}}},Su=class extends ws{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),B(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Ze(e).forEach(o=>{if(_e(o)&&o.inferredType){let s=bs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){cs(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&B(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=nu(e);if(i&&_e(e)&&e.inferredType){let o=bs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ie(e)){let i,o=()=>{var s;return i??(i=or((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:or(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var qr=me(Ae(),1);var ar=me(Ae(),1);var ku=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=ar.CancellationToken.None){let i=e.parseResult,o=[];if(await et(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s)}return await et(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:ar.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Fr(yn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=ar.Range.create(0,0,0,0);else{let a=ar.Position.create(s.endLine-1,s.endColumn);o=ar.Range.create(a,a)}}}else o=Xa(i.token);if(o){let s={severity:ar.DiagnosticSeverity.Error,range:o,message:i.message,data:Fr(yn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:yn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=ar.CancellationToken.None){let i=[],o=(s,a,l)=>{i.push(this.toDiagnostic(s,a,l))};return await Promise.all(ni(e).map(async s=>{await et(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let l of a)await l(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:Q_(n),severity:Z_(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function Q_(t){if(ar.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Jt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Xr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function Z_(t){switch(t){case"error":return ar.DiagnosticSeverity.Error;case"warning":return ar.DiagnosticSeverity.Warning;case"info":return ar.DiagnosticSeverity.Information;case"hint":return ar.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var yn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(yn=yn||(yn={}));var Eu=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Se.GrammarNameUppercase:case Se.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Se.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Se.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Se.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Se.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Se.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Se.MissingReturns:n(this.fixMissingReturns(e,r));break;case Se.InvalidInfers:case Se.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Se.MissingInfer:n(this.fixMissingInfer(e,r));break;case Se.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case yn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=Cr(i,n),s=Ie(o?.astNode,tu);if(s&&s.right&&s.$cstNode){let a=s.left.value,l=s.right.value;return{title:"Refactor into regular expression",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${si(a)}-${si(l)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Jt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,l=s.offset,c=n.$cstNode.text.indexOf(")",l)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(c)}})}for(let a of i){let l=a.ref;if(l&&we(l)&&!l.hidden&&l.$cstNode){let c=l.$cstNode.range.start;o.push({newText:"hidden ",range:{start:c,end:c}})}}return{title:"Fix hidden terminals",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=Cr(o,i),a=Ie(s?.astNode,B);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),l=this.indexManager.allElements(a).filter(m=>m.name===r.refText),c=[],u=-1,f=-1;for(let m of l){if(xe.equals(m.documentUri,n.uri))continue;let T=eP(n.uri,m.documentUri),C,A="",N=n.parseResult.value,w=N.imports.find(v=>v.path&&T<v.path);if(w)C=(i=w.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(C={line:v.line+1,character:0})}else N.rules.length>0&&(C=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,A=`
`);C&&((u<0||T.length<f)&&(u=c.length,f=T.length),c.push({title:`Add import to '${T}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:C,end:C},newText:`import '${T}'
${A}`}]}}}))}return u>=0&&(c[u].isPreferred=!0),c}};function eP(t,e){let r=xe.dirname(t),n=xe.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var jx=me(lo(),1);var $s=me(Ae(),1);function kh(t,e){let r={stacks:t,tokens:e};return tP(r),r.stacks.flat().forEach(i=>{i.property=void 0}),qx(r.stacks).map(i=>i[i.length-1])}function Eh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,l=s;for(;l.$container;)if(Ut(l.$container)){a=l.$container;break}else if(os(l.$container))l=l.$container;else break;if(Cx(l.cardinality)){let c=ks({next:{feature:l,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let u of c)i.add(u.feature);o.push(...c)}if(a){let c=a.elements.indexOf(l);c!==void 0&&c<a.elements.length-1&&o.push(...Ux({feature:a,type:e.type,new:!1},c+1,r,n,i)),o.every(u=>Yr(u.feature.cardinality,u.feature)||Yr(r.get(u.feature))||i.has(u.feature))&&o.push(...Eh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function yl(t){return $t(t)&&(t={feature:t}),ks({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function ks(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:l,type:c}=i;if(Ut(l)){if(s.has(l))return[];s.add(l)}if(Ut(l))return Ux(i,0,o,s,a).map(u=>$u(u,l.cardinality,o));if(Dr(l)||Or(l))return l.elements.flatMap(u=>ks({next:{feature:u,new:!1,type:c},cardinalities:o,visited:s,plus:a})).map(u=>$u(u,l.cardinality,o));if(be(l)){let u={feature:l.terminal,new:!1,type:c,property:(e=i.property)!==null&&e!==void 0?e:l.feature};return ks({next:u,cardinalities:o,visited:s,plus:a}).map(f=>$u(f,l.cardinality,o))}else{if(_e(l))return Eh({next:{feature:l,new:!0,type:hn(l),property:(r=i.property)!==null&&r!==void 0?r:l.feature},cardinalities:o,visited:s,plus:a});if(Pe(l)&&B(l.rule.ref)){let u=l.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=Rs(u))!==null&&n!==void 0?n:u.name,property:i.property};return ks({next:f,cardinalities:o,visited:s,plus:a}).map(m=>$u(m,l.cardinality,o))}else return[i]}}function $u(t,e,r){return r.set(t.feature,e),t}function Ux(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...ks({next:a,cardinalities:r,visited:n,plus:i})),!!Yr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function tP(t){for(let e of t.tokens){let r=qx(t.stacks,e);t.stacks=r}}function qx(t,e){let r=[];for(let n of t)r.push(...rP(n,e));return r}function rP(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(nP)),i=[];for(;t.length>0;){let o=t.pop(),s=Eh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?$h(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Yr(a.feature.cardinality,a.feature)||Yr(r.get(a.feature))))break}return i}function nP(t){if(t.cardinality==="+")return!0;let e=Ie(t,be);return!!(e&&e.cardinality==="+")}function $h(t,e){if(mt(t))return t.value===e.image;if(Pe(t))return iP(t.rule.ref,e);if(Xt(t)){let r=Nu(t);if(r)return $h(r,e)}return!1}function iP(t,e){return B(t)?yl(t.definition).some(n=>$h(n.feature,e)):we(t)?Jr(t).test(e.image):!1}function Gx(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Es=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(l,c)=>{let u=this.fillCompletionItem(l,c);u&&n.push(u)},s=l=>mt(l.feature)?l.feature.value:l.feature,a=[];for(let l of i)if(await Promise.all(oe(l.features).distinct(s).exclude(a).map(c=>this.completionFor(l,c,o))),a.push(...l.features),!this.continueCompletion(n))break;return $s.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return oe(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:$s.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let l=_u(this.grammar),c=yl({feature:l.definition,new:!0,type:Rs(l)});return o.length>0?(o.shift(),kh(c.map(u=>[u]),o)):c}let s=[...o].splice(i.tokenIndex);return kh([i.elementStack.map(l=>({feature:l}))],s)}*buildContexts(e,r){var n,i,o,s,a;let l=e.parseResult.value.$cstNode;if(!l)return;let c=e.textDocument,u=c.getText(),f=c.offsetAt(r),m={document:e,textDocument:c,offset:f,position:r},T=this.findDataTypeRuleStart(l,f);if(T){let[g,$]=T,D=(n=Cr(l,g))===null||n===void 0?void 0:n.astNode,K=this.findFeaturesAt(c,g);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:g,tokenEndOffset:$,features:K})}let{nextTokenStart:C,nextTokenEnd:A,previousTokenStart:N,previousTokenEnd:w}=this.backtrackToAnyToken(u,f),v;if(N!==void 0&&w!==void 0&&w===f){v=(i=Cr(l,N))===null||i===void 0?void 0:i.astNode;let g=this.findFeaturesAt(c,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:w,features:g})}if(v=(s=(o=Cr(l,C))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=Cr(l,N))===null||a===void 0?void 0:a.astNode,v){let g=this.findFeaturesAt(c,C);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:C,tokenEndOffset:A,features:g})}else{let g=_u(this.grammar),$=yl(g.definition);yield Object.assign(Object.assign({},m),{tokenOffset:C,tokenEndOffset:A,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=Dt(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,B))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,B))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(B(r)){let i=yl(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(mt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Xt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Ie(r.feature,be),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),l=new Set;a.getAllElements().forEach(c=>{!l.has(c.name)&&this.filterCrossReference(c)&&(n(e,this.createReferenceCompletionItem(c)),l.add(c.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:$s.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let c=this.nameProvider.getName(r.node);if(!c)return;o=c}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Pu=class extends Es{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Ie(r.feature,be);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let l=e.textDocument.positionAt(e.tokenOffset+1),c=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:l,end:c}}for(let a of o){let l=i.length>0?"":'"',c=`${l}${a}${l}`;r(e,{label:a,textEdit:{newText:c,range:s},kind:jx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=xe.dirname(e.uri).toString(),o=[];for(let s of r)if(!xe.equals(s.uri,n)){let a=s.uri.toString(),l=a.substring(0,a.length-xe.extname(s.uri).length),c=xe.relative(i,l);c.startsWith(".")||(c=`./${c}`),o.push(c)}return o}};var gl=me(Ae(),1);var Ns=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Ze(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of VT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,gl.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),gl.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===gl.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Iu=class extends Ns{shouldProcessContent(e){return!B(e)}};var Du=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Nh(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,l,c)=>{var u,f;let m=this.nodeModeToKey(a,l),T=i.get(m),C=(u=c.options.priority)!==null&&u!==void 0?u:0,A=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||A<=C)&&i.set(m,c)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Ze(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],l=this.iterateCstTree(e,o).iterator(),c,u;do if(u=l.next(),!u.done){let f=u.value,m=mo(f),T=this.nodeModeToKey(f,"prepend"),C=r.get(T);if(r.delete(T),C){let w=this.createTextEdit(c,f,C,o);for(let v of w)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let A=this.nodeModeToKey(f,"append"),N=r.get(A);if(r.delete(A),N){let w=JT(f);if(w){let v=this.createTextEdit(f,w,N,o);for(let g of v)g&&this.insideRange(g.range,i)&&this.isNecessary(g,e.textDocument)&&s.push(g)}}if(!C&&f.hidden){let w=this.createHiddenTextEdits(c,f,void 0,o);for(let v of w)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(c=f)}while(!u.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],l={start:{character:0,line:s},end:r.range.start},c=i.document.getText(l),u=this.findFittingMove(l,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(c,i),T=this.getIndentationCharacterCount(i,u)-f;if(T===0)return[];let C="";T>0&&(C=(i.options.insertSpaces?" ":"	").repeat(T));let A=r.text.split(`
`);A[0]=c+A[0];for(let N=0;N<A.length;N++){let w=s+N,v={character:0,line:w};if(T>0)a.push({newText:C,range:{start:v,end:v}});else{let g=A[N],$=0;for(;$<g.length;$++){let D=g.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:w,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let l=a.characters,c=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return l!==void 0?m.push(this.createSpaceTextEdit(s,l,n.options)):c!==void 0?m.push(this.createLineTextEdit(s,c,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),mo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new zr(i,o=>this.iterateCst(o,r)):is}iterateCst(e,r){if(!$n(e))return is;let n=r.indentation;return new Ir(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,hr))}},Nh=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new gn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new gn(r,this.collector)}property(e,r){let n=Jt(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Pi(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}keyword(e,r){let n=Xr(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Ou(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}cst(e){return new gn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new gn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new gn(QT(o,s),this.collector)}},gn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},Te;(function(t){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(c)}}t.fit=e;function r(u){return i(0,u)}t.noSpace=r;function n(u){return i(1,u)}t.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}t.spaces=i;function o(u){return s(1,u)}t.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}t.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function l(u){return{options:u??{},moves:[{tabs:0}]}}t.noIndent=l;function c(u,f){var m,T,C,A,N,w;let v=(m=u.lines)!==null&&m!==void 0?m:0,g=(T=f.lines)!==null&&T!==void 0?T:0,$=(C=u.tabs)!==null&&C!==void 0?C:0,D=(A=f.tabs)!==null&&A!==void 0?A:0,K=(N=u.characters)!==null&&N!==void 0?N:0,se=(w=f.characters)!==null&&w!==void 0?w:0;return v<g?-1:v>g?1:$<D?-1:$>D?1:K<se?-1:K>se?1:0}})(Te=Te||(Te={}));var Lu=class extends Du{format(e){if(Xt(e))this.getNodeFormatter(e).properties("type","terminal").surround(Te.noSpace());else if(B(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Te.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Te.oneSpace()):r.property("name").append(Te.noSpace()),r.properties("parameters").append(Te.noSpace()),r.keywords(",").append(Te.oneSpace()),r.keywords("<").append(Te.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Te.noSpace()),r.interior(i,n).prepend(Te.indent()),n.prepend(Te.fit(Te.noSpace(),Te.newLine())),r.node(e).prepend(Te.noIndent())}else if(we(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Te.oneSpace()),r.keyword("returns").append(Te.oneSpace())),r.keywords("hidden","terminal","fragment").append(Te.oneSpace()),r.keyword(":").prepend(Te.noSpace()),r.keyword(";").prepend(Te.fit(Te.noSpace(),Te.newLine())),r.node(e).prepend(Te.noIndent())}else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Te.noSpace()),r.keywords(".","+=","=").surround(Te.noSpace()),r.keyword("}").prepend(Te.noSpace())}else if(as(e))this.getNodeFormatter(e).keywords("infer","infers").append(Te.oneSpace());else if(be(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Te.noSpace());else if(Pe(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Te.noSpace()),r.keyword(",").append(Te.oneSpace()),r.properties("arguments").append(Te.noSpace())}os(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Te.noSpace())}};var ui=me(Ae(),1);var ae=me(Ae(),1);var Ih={[ae.SemanticTokenTypes.class]:0,[ae.SemanticTokenTypes.comment]:1,[ae.SemanticTokenTypes.enum]:2,[ae.SemanticTokenTypes.enumMember]:3,[ae.SemanticTokenTypes.event]:4,[ae.SemanticTokenTypes.function]:5,[ae.SemanticTokenTypes.interface]:6,[ae.SemanticTokenTypes.keyword]:7,[ae.SemanticTokenTypes.macro]:8,[ae.SemanticTokenTypes.method]:9,[ae.SemanticTokenTypes.modifier]:10,[ae.SemanticTokenTypes.namespace]:11,[ae.SemanticTokenTypes.number]:12,[ae.SemanticTokenTypes.operator]:13,[ae.SemanticTokenTypes.parameter]:14,[ae.SemanticTokenTypes.property]:15,[ae.SemanticTokenTypes.regexp]:16,[ae.SemanticTokenTypes.string]:17,[ae.SemanticTokenTypes.struct]:18,[ae.SemanticTokenTypes.type]:19,[ae.SemanticTokenTypes.typeParameter]:20,[ae.SemanticTokenTypes.variable]:21},Kx={[ae.SemanticTokenModifiers.abstract]:1,[ae.SemanticTokenModifiers.async]:2,[ae.SemanticTokenModifiers.declaration]:4,[ae.SemanticTokenModifiers.defaultLibrary]:8,[ae.SemanticTokenModifiers.definition]:16,[ae.SemanticTokenModifiers.deprecated]:32,[ae.SemanticTokenModifiers.documentation]:64,[ae.SemanticTokenModifiers.modification]:128,[ae.SemanticTokenModifiers.readonly]:256,[ae.SemanticTokenModifiers.static]:512},Hx={legend:{tokenTypes:Object.keys(Ih),tokenModifiers:Object.keys(Kx)},full:{delta:!0},range:!0},Ph=class extends ae.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Mu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=ae.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=ae.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=ae.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Ph;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=ni(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await et(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Jc(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Ih[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=Kx[u];a|=f}}let l=n.start.line,c=n.end.line;if(l===c){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(l,u,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(l,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:l+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=l+1;m<c;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(c,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Jt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Pi(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let l=Xr(r.$cstNode,n,o);l&&a.push(l)}else a.push(...Ou(r.$cstNode,n));for(let l of a)this.highlightNode({node:l,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},_h;(function(t){function e(n,i){let o=new Map;Object.entries(Ih).forEach(([l,c])=>o.set(c,l));let s=0,a=0;return r(n.data,5).map(l=>{s+=l[0],l[0]!==0&&(a=0),a+=l[1];let c=l[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(l[3]),tokenModifiers:l[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+c}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(_h=_h||(_h={}));var Fu=class extends Mu{highlightElement(e,r){var n;be(e)?r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):_e(e)?e.feature&&r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):cs(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.type}):sr(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ui.SemanticTokenTypes.type}):mv(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.parameter}):ls(e)?r({node:e,property:"parameter",type:ui.SemanticTokenTypes.parameter}):Pe(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ui.SemanticTokenTypes.type}):eu(e)&&r({node:e,property:"name",type:ui.SemanticTokenTypes.property})}};var Uu=class extends ms{getName(e){return be(e)?e.feature:super.getName(e)}getNameNode(e){return be(e)?Jt(e.$cstNode,"feature"):super.getNameNode(e)}};var _s=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Ps(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(ei(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(ei(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||XT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>xe.equals(o.sourceUri,r.documentUri))),n.push(...i),oe(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ie(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:or(r),local:!0}}}};var qu=class extends _s{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Ps(e);if(n&&n.feature==="feature"){if(be(r))return this.findAssignmentDeclaration(r);if(_e(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return eu(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Ie(e,Ar);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=ih(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let l=this.findRulesWithReturnType(a);s.push(...l)}),s.forEach(a=>{let l=this.createReferencesToAttribute(a,e);n.push(...l)})}return oe(n)}createReferencesToAttribute(e,r){let n=[];if(B(e)){let i=xs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ie(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ie(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:or(o),local:xe.equals(ie(i).uri,ie(r).uri)})}}else{if(e.feature===r.name){let o=Jt(e.$cstNode,"feature");o&&n.push({sourceUri:ie(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ie(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:or(o),local:xe.equals(ie(e).uri,ie(r).uri)})}let i=Ie(e,B);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Ie(e,B),i=vh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Ar(n.returnType.ref)||Ft(n.returnType.ref))){let o=nl(n.returnType.ref);for(let s of o){let a=s.attributes.find(l=>l.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=nl(e.type.ref);for(let s of o){let a=s.attributes.find(l=>l.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(B(s)||_e(s))&&r.push(s)}),r}};var Tl=me(Ae(),1);var Bx=me(Ae(),1);var Gu=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=Dt(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:Bx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=r.parseResult.value,i=Dt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=r.parseResult.value,i=Dt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var Wx=me(Ae(),1);var Is=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Dt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Wx.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ie(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var zx=me(Ae(),1);var ju=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Dt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=xe.equals(ie(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(c=>this.createDocumentHighlight(c)).toArray()}}createDocumentHighlight(e){return zx.DocumentHighlight.create(e.segment.range)}};var Ku=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of _i(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Vx=me(Ae(),1),Hu=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=Vx.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};var Bu=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let l=r.charCodeAt(a),c=e.charCodeAt(o);if((l===c||this.toUpperCharCode(l)===this.toUpperCharCode(c))&&(n||(n=i===void 0||this.isWordTransition(i,l)),n&&o++,o===e.length))return!0;i=l}return!1}isWordTransition(e,r){return Xx<=e&&e<=Yx&&oP<=r&&r<=sP||e===Jx&&r!==Jx}toUpperCharCode(e){return Xx<=e&&e<=Yx?e-32:e}},Xx="a".charCodeAt(0),Yx="z".charCodeAt(0),oP="A".charCodeAt(0),sP="Z".charCodeAt(0),Jx="_".charCodeAt(0);var Dh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Dt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let l=this.references.findDeclaration(a);if(l)return this.getAstNodeHoverContent(l)}}}},Wu=class extends Dh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var aP=me(Ae(),1);var lP=me(Ae(),1);var Qr=me(Ae(),1);var Ke;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(Ke=Ke||(Ke={}));var zu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Qt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:Ke.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:Ke.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=rs.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Vu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return oe(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ke.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ke.Changed,this.documentMap.delete(r)),n}};var cP=me(Ae(),1);function Qx(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Xu=class{constructor(e){this.onInitializeEmitter=new Qr.Emitter,this.onInitializedEmitter=new Qr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Qc(this.services),this.services.ServiceRegistry.all.forEach(e=>Qc(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(S=>S.lsp.Formatter),o=n.map(S=>{var q;return(q=S.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(S=>!!S),s=this.hasService(S=>S.lsp.CodeActionProvider),a=this.hasService(S=>S.lsp.SemanticTokenProvider),l=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,c=this.hasService(S=>S.lsp.DocumentLinkProvider),u=Qx(n.map(S=>{var q;return(q=S.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(S=>S.lsp.TypeProvider),m=this.hasService(S=>S.lsp.ImplementationProvider),T=this.hasService(S=>S.lsp.CompletionProvider),C=Gx(n.map(S=>{var q;return(q=S.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),A=this.hasService(S=>S.lsp.ReferencesProvider),N=this.hasService(S=>S.lsp.DocumentSymbolProvider),w=this.hasService(S=>S.lsp.DefinitionProvider),v=this.hasService(S=>S.lsp.DocumentHighlightProvider),g=this.hasService(S=>S.lsp.FoldingRangeProvider),$=this.hasService(S=>S.lsp.HoverProvider),D=this.hasService(S=>S.lsp.RenameProvider),K=this.hasService(S=>S.lsp.CallHierarchyProvider),se=this.hasService(S=>S.lsp.CodeLensProvider),$e=this.hasService(S=>S.lsp.DeclarationProvider),Ht=this.hasService(S=>S.lsp.InlayHintProvider),Rt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:l&&{commands:l},textDocumentSync:Qr.TextDocumentSyncKind.Incremental,completionProvider:T?C:void 0,referencesProvider:A,documentSymbolProvider:N,definitionProvider:w,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:g,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Hx:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:K?{}:void 0,documentLinkProvider:c?{resolveProvider:!1}:void 0,codeLensProvider:se?{resolveProvider:!1}:void 0,declarationProvider:$e,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:Rt?{resolveProvider:!!Rt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function eR(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");uP(e,t),fP(e,t),dP(e,t),pP(e,t),hP(e,t),yP(e,t),gP(e,t),TP(e,t),xP(e,t),bP(e,t),CP(e,t),mP(e,t),AP(e,t),RP(e,t),wP(e,t),SP(e,t),EP(e,t),NP(e,t),IP(e,t),_P(e,t),$P(e,t),kP(e,t),vP(e,t),PP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function uP(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(l=>r.update(s,a,l))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Qt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],l=[];for(let c of s.changes){let u=Qt.parse(c.uri);c.type===Qr.FileChangeType.Deleted?l.push(u):a.push(u)}i(a,l)})}function fP(t,e){e.workspace.DocumentBuilder.onBuildPhase(Ke.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function dP(t,e){t.onCompletion(lr((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function pP(t,e){t.onReferences(lr((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function mP(t,e){t.onCodeAction(lr((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function hP(t,e){t.onDocumentSymbol(lr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function yP(t,e){t.onDefinition(lr((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function gP(t,e){t.onTypeDefinition(lr((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function TP(t,e){t.onImplementation(lr((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function vP(t,e){t.onDeclaration(lr((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function xP(t,e){t.onDocumentHighlight(lr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function RP(t,e){t.onHover(lr((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function bP(t,e){t.onFoldingRanges(lr((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function CP(t,e){t.onDocumentFormatting(lr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(lr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(lr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function AP(t,e){t.onRenameRequest(lr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(lr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function wP(t,e){t.languages.inlayHint.on(Oi((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function SP(t,e){let r={data:[]};t.languages.semanticTokens.on(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function kP(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function EP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Ds(s)}})}function $P(t,e){t.onDocumentLinks(Oi((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function NP(t,e){t.onSignatureHelp(Oi((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function _P(t,e){t.onCodeLens(Oi((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function PP(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Ds(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Ds(a)}})}}function IP(t,e){t.languages.callHierarchy.onPrepare(Oi((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(Zx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(Zx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function Zx(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Qt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return Ds(a)}}}function Oi(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let l=r.getOrCreateDocument(s);if(!l)throw new Error;try{return await t(a,l,i,o)}catch(c){return Ds(c)}}}function lr(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let l=r.getOrCreateDocument(s);if(!l)return null;try{return await t(a,l,i,o)}catch(c){return Ds(c)}}}function Ds(t){if(bo(t))return new Qr.ResponseError(Qr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Qr.ResponseError)return t;throw t}var Ju=me(Ae(),1),Yu=class{getSymbolKind(){return Ju.SymbolKind.Field}getCompletionItemKind(){return Ju.CompletionItemKind.Reference}};var tR=me(Ae(),1);var Qu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Dt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(tR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var rR=me(Ae(),1);var Zu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=Dt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let l={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,l).forEach(u=>{let f=rR.TextEdit.replace(u.segment.range,r.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Dt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&il(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var DP=me(Ae(),1);var nR=me(Ae(),1);var ef=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=nR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await et(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var tf=class extends Is{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,l;let c="path";if(Zc(e.astNode)&&((n=Ps(e))===null||n===void 0?void 0:n.feature)===c){let u=li(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:Tl.Range.create(0,0,0,0),T=(l=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&l!==void 0?l:Tl.Range.create(0,0,0,0);return[Tl.LocationLink.create(u.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:_i(e).head()}};var Oh=me(Ae(),1);var rf=class extends Gu{getIncomingCalls(e,r){if(!B(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=Cr(s.$cstNode,i.segment.offset);if(!a)return;let l=Ie(a.astNode,B);if(!l||!l.$cstNode)return;let c=this.nameProvider.getNameNode(l);if(!c)return;let u=i.sourceUri.toString(),f=u+"@"+c.text;n.has(f)?n.set(f,{parserRule:l.$cstNode,nameNode:c,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:l.$cstNode,nameNode:c,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:Oh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!B(e))return;let r=Ze(e).filter(Pe).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let l=this.nameProvider.getNameNode(a.astNode);if(!l)return;let c=ie(a.astNode).uri.toString(),u=c+"@"+l.text;n.has(u)?n.set(u,{refCstNode:a,to:l,from:[...n.get(u).from,s.range],docUri:c}):n.set(u,{refCstNode:a,to:l,from:[s.range],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:Oh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var nf=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=Ox(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=OP(e);for(let a of fu(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=oe(e.interfaces).concat(e.types).reduce((a,l)=>a.set(l.name,l),new Map);for(let a of fu(n)){let l=s.get(a.name);if(l){let c=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},c??{}),{declared:a,declaredNode:l}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=oh(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of oh(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function OP({parserRules:t,datatypeRules:e}){let r=new Me;oe(t).concat(e).forEach(i=>r.add(Ao(i),i));function n(i){if(_e(i)){let o=bs(i);o&&r.add(o,i)}(Dr(i)||Ut(i)||Or(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function iR(t){return t&&"declared"in t}function oR(t){return t&&"inferred"in t}function sR(t){return t&&"inferred"in t&&"declared"in t}function lR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var of=class{checkCyclicType(e,r){Li(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Li(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(iR(o)&&mn(o.declared)&&Ar(o.declaredNode)){let s=o;MP(s,r),FP(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())oR(o)&&o.inferred instanceof ps&&LP(o.inferred,r),sR(o)&&GP(o,i,r)}checkActionIsNotUnionType(e,r){Ft(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Li(t,e){var r;if(e.has(t))return!0;if(e.add(t),Ft(t))return Li(t.type,e);if(Ar(t))return t.superTypes.some(n=>n.ref&&Li(n.ref,new Set(e)));if(sr(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Li(t.typeRef.ref,e)}else{if(To(t))return Li(t.referenceType,e);if(go(t))return Li(t.elementType,e);if(Vr(t))return t.types.some(n=>Li(n,new Set(e)))}return!1}function LP(t,e){t.properties.forEach(r=>{var n;let i=rh(r.type);if(i.length>1){let o=a=>ii(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function MP({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(dn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function FP({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Me);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let l of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(l.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let l=i[s],c=i[a],u=mn(l)?l.superProperties:[],f=mn(c)?c.superProperties:[],m=UP(u,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${l}' and '${c}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=mn(s)?s.superProperties:[];for(let l of a)o.add(l.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(l=>l.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function UP(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!qP(n,i)&&r.push(n.name)}return r}function qP(t,e){return rl(t.type,e.type)&&rl(e.type,t.type)}function GP(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,l=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:_e(T)?"type":"name"})),c=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:be(T)||_e(T)?"feature":"name"})),u=f=>{s.forEach(m=>{B(m)&&xs(m.definition).find(C=>C.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(dn(n)&&dn(i))jP(n.type,i.type,l(`in a rule that returns type '${a}'`));else if(mn(n)&&mn(i))KP(n,i,e,l(`in a rule that returns type '${a}'`),c,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;l()(f),r("error",f,{node:o,property:"name"})}}function jP(t,e,r){rl(t,e)||r(`Cannot assign type '${pn(t,"DeclaredType")}' to '${pn(e,"DeclaredType")}'`)}function aR(t){return t.optional||cu(t.type)}function KP(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),l=new Map(e.superProperties.map(f=>[f.name,f])),c=f=>{if(Ot(f))return{types:f.types.map(m=>c(m))};if(ii(f))return{referenceType:c(f.referenceType)};if(oi(f))return{elementType:c(f.elementType)};if(Lr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=l.get(f);if(T){let C=pn(m.type,"DeclaredType"),A=pn(T.type,"DeclaredType");if(!rl(c(m.type),T.type)&&A!=="unknown"){let w=`The assigned type '${C}' is not compatible with the declared property '${f}' of type '${A}'.`;i(m.astNodes,w)}m.optional&&!aR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of l.entries())!a.get(f)&&!aR(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",T=Array.from(u).map(C=>`'${C}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var HP={validation:{LangiumGrammarValidator:t=>new xu(t),ValidationResourcesCollector:t=>new nf(t),LangiumGrammarTypesValidator:()=>new of},lsp:{FoldingRangeProvider:t=>new Iu(t),CodeActionProvider:t=>new Eu(t),SemanticTokenProvider:t=>new Fu(t),Formatter:()=>new Lu,DefinitionProvider:t=>new tf(t),CallHierarchyProvider:t=>new rf(t),CompletionProvider:t=>new Pu(t)},references:{ScopeComputation:t=>new Su(t),ScopeProvider:t=>new wu(t),References:t=>new qu(t),NameProvider:()=>new Uu}};function cR(t,e){let r=ho(xl(t),Lx,e),n=ho(vl({shared:r}),Mx,HP);return BP(r,n),r.ServiceRegistry.register(n),vx(n),lR(n),{shared:r,grammar:n}}function BP(t,e){t.workspace.DocumentBuilder.onBuildPhase(Ke.IndexedReferences,async(n,i)=>{for(let o of n){await et(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Lh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},ko={fileSystemProvider:()=>new Lh};function _u(t){return t.rules.find(e=>B(e)&&e.entry)}function WP(t){return t.rules.filter(e=>we(e)&&e.hidden)}function vs(t,e){let r=new Set,n=_u(t);if(!n)return new Set(t.rules);let i=[n].concat(WP(t));for(let s of i)uR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||we(s)&&s.hidden)&&o.add(s);return o}function uR(t,e,r){e.add(t.name),Ze(t).forEach(n=>{if(Pe(n)||r&&ru(n)){let i=n.rule.ref;i&&!e.has(i.name)&&uR(i,e,r)}})}function Nu(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=pl(t.type.ref);return e?.terminal}}function fR(t){return t.hidden&&!Jr(t).test(" ")}function Pi(t,e){return!t||!e?[]:Mh(t,e,t.astNode,!0)}function Jt(t,e,r){if(!t||!e)return;let n=Mh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Mh(t,e,r,n){if(!n){let i=Ie(t.grammarSource,be);if(i&&i.feature===e)return[t]}return $n(t)&&t.astNode===r?t.content.flatMap(i=>Mh(i,e,r,!1)):[]}function Ou(t,e){return t?dR(t,e,t?.astNode):[]}function Xr(t,e,r){if(!t)return;let n=dR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function dR(t,e,r){if(t.astNode!==r)return[];if(mt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=jm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?mt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Ps(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(t.grammarSource,be);if(n)return n;t=t.container}}function pl(t){return as(t)&&(t=t.$container),pR(t,new Map)}function pR(t,e){var r;function n(i,o){let s;return Ie(i,be)||(s=pR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Ze(t)){if(be(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Pe(i)&&B(i.rule.ref))return n(i,i.rule.ref);if(sr(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function yu(t){var e;let r=cR(ko).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Qt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function mR(t){let e=[],r=t.Grammar;for(let n of r.rules)we(n)&&fR(n)&&cx(Jr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Km}}var zP=typeof global=="object"&&global&&global.Object===Object&&global,sf=zP;var VP=typeof self=="object"&&self&&self.Object===Object&&self,XP=sf||VP||Function("return this")(),Nt=XP;var YP=Nt.Symbol,qt=YP;var hR=Object.prototype,JP=hR.hasOwnProperty,QP=hR.toString,Rl=qt?qt.toStringTag:void 0;function ZP(t){var e=JP.call(t,Rl),r=t[Rl];try{t[Rl]=void 0;var n=!0}catch{}var i=QP.call(t);return n&&(e?t[Rl]=r:delete t[Rl]),i}var yR=ZP;var eI=Object.prototype,tI=eI.toString;function rI(t){return tI.call(t)}var gR=rI;var nI="[object Null]",iI="[object Undefined]",TR=qt?qt.toStringTag:void 0;function oI(t){return t==null?t===void 0?iI:nI:TR&&TR in Object(t)?yR(t):gR(t)}var yr=oI;function sI(t){return t!=null&&typeof t=="object"}var Tt=sI;var aI="[object Symbol]";function lI(t){return typeof t=="symbol"||Tt(t)&&yr(t)==aI}var In=lI;function cI(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var Dn=cI;var uI=Array.isArray,V=uI;var fI=1/0,vR=qt?qt.prototype:void 0,xR=vR?vR.toString:void 0;function RR(t){if(typeof t=="string")return t;if(V(t))return Dn(t,RR)+"";if(In(t))return xR?xR.call(t):"";var e=t+"";return e=="0"&&1/t==-fI?"-0":e}var bR=RR;var dI=/\s/;function pI(t){for(var e=t.length;e--&&dI.test(t.charAt(e)););return e}var CR=pI;var mI=/^\s+/;function hI(t){return t&&t.slice(0,CR(t)+1).replace(mI,"")}var AR=hI;function yI(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var lt=yI;var wR=0/0,gI=/^[-+]0x[0-9a-f]+$/i,TI=/^0b[01]+$/i,vI=/^0o[0-7]+$/i,xI=parseInt;function RI(t){if(typeof t=="number")return t;if(In(t))return wR;if(lt(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=lt(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=AR(t);var r=TI.test(t);return r||vI.test(t)?xI(t.slice(2),r?2:8):gI.test(t)?wR:+t}var SR=RI;var kR=1/0,bI=17976931348623157e292;function CI(t){if(!t)return t===0?t:0;if(t=SR(t),t===kR||t===-kR){var e=t<0?-1:1;return e*bI}return t===t?t:0}var ER=CI;function AI(t){var e=ER(t),r=e%1;return e===e?r?e-r:e:0}var On=AI;function wI(t){return t}var wr=wI;var SI="[object AsyncFunction]",kI="[object Function]",EI="[object GeneratorFunction]",$I="[object Proxy]";function NI(t){if(!lt(t))return!1;var e=yr(t);return e==kI||e==EI||e==SI||e==$I}var gr=NI;var _I=Nt["__core-js_shared__"],af=_I;var $R=function(){var t=/[^.]+$/.exec(af&&af.keys&&af.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function PI(t){return!!$R&&$R in t}var NR=PI;var II=Function.prototype,DI=II.toString;function OI(t){if(t!=null){try{return DI.call(t)}catch{}try{return t+""}catch{}}return""}var fi=OI;var LI=/[\\^$.*+?()[\]{}|]/g,MI=/^\[object .+?Constructor\]$/,FI=Function.prototype,UI=Object.prototype,qI=FI.toString,GI=UI.hasOwnProperty,jI=RegExp("^"+qI.call(GI).replace(LI,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function KI(t){if(!lt(t)||NR(t))return!1;var e=gr(t)?jI:MI;return e.test(fi(t))}var _R=KI;function HI(t,e){return t?.[e]}var PR=HI;function BI(t,e){var r=PR(t,e);return _R(r)?r:void 0}var Sr=BI;var WI=Sr(Nt,"WeakMap"),lf=WI;var IR=Object.create,zI=function(){function t(){}return function(e){if(!lt(e))return{};if(IR)return IR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),DR=zI;function VI(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var OR=VI;function XI(){}var ct=XI;function YI(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var LR=YI;var JI=800,QI=16,ZI=Date.now;function eD(t){var e=0,r=0;return function(){var n=ZI(),i=QI-(n-r);if(r=n,i>0){if(++e>=JI)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var MR=eD;function tD(t){return function(){return t}}var FR=tD;var rD=function(){try{var t=Sr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Os=rD;var nD=Os?function(t,e){return Os(t,"toString",{configurable:!0,enumerable:!1,value:FR(e),writable:!0})}:wr,UR=nD;var iD=MR(UR),qR=iD;function oD(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var cf=oD;function sD(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var uf=sD;function aD(t){return t!==t}var GR=aD;function lD(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var jR=lD;function cD(t,e,r){return e===e?jR(t,e,r):uf(t,GR,r)}var Ls=cD;function uD(t,e){var r=t==null?0:t.length;return!!r&&Ls(t,e,0)>-1}var ff=uD;var fD=9007199254740991,dD=/^(?:0|[1-9]\d*)$/;function pD(t,e){var r=typeof t;return e=e??fD,!!e&&(r=="number"||r!="symbol"&&dD.test(t))&&t>-1&&t%1==0&&t<e}var Mi=pD;function mD(t,e,r){e=="__proto__"&&Os?Os(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Ms=mD;function hD(t,e){return t===e||t!==t&&e!==e}var Ln=hD;var yD=Object.prototype,gD=yD.hasOwnProperty;function TD(t,e,r){var n=t[e];(!(gD.call(t,e)&&Ln(n,r))||r===void 0&&!(e in t))&&Ms(t,e,r)}var Fi=TD;function vD(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],l=n?n(r[a],t[a],a,r,t):void 0;l===void 0&&(l=t[a]),i?Ms(r,a,l):Fi(r,a,l)}return r}var Mn=vD;var KR=Math.max;function xD(t,e,r){return e=KR(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=KR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),OR(t,this,a)}}var HR=xD;function RD(t,e){return qR(HR(t,e,wr),t+"")}var Fs=RD;var bD=9007199254740991;function CD(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=bD}var Us=CD;function AD(t){return t!=null&&Us(t.length)&&!gr(t)}var _t=AD;function wD(t,e,r){if(!lt(r))return!1;var n=typeof e;return(n=="number"?_t(r)&&Mi(e,r.length):n=="string"&&e in r)?Ln(r[e],t):!1}var Ui=wD;function SD(t){return Fs(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Ui(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var BR=SD;var kD=Object.prototype;function ED(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||kD;return t===r}var Fn=ED;function $D(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var WR=$D;var ND="[object Arguments]";function _D(t){return Tt(t)&&yr(t)==ND}var Fh=_D;var zR=Object.prototype,PD=zR.hasOwnProperty,ID=zR.propertyIsEnumerable,DD=Fh(function(){return arguments}())?Fh:function(t){return Tt(t)&&PD.call(t,"callee")&&!ID.call(t,"callee")},qi=DD;function OD(){return!1}var VR=OD;var JR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,XR=JR&&typeof module=="object"&&module&&!module.nodeType&&module,LD=XR&&XR.exports===JR,YR=LD?Nt.Buffer:void 0,MD=YR?YR.isBuffer:void 0,FD=MD||VR,di=FD;var UD="[object Arguments]",qD="[object Array]",GD="[object Boolean]",jD="[object Date]",KD="[object Error]",HD="[object Function]",BD="[object Map]",WD="[object Number]",zD="[object Object]",VD="[object RegExp]",XD="[object Set]",YD="[object String]",JD="[object WeakMap]",QD="[object ArrayBuffer]",ZD="[object DataView]",e0="[object Float32Array]",t0="[object Float64Array]",r0="[object Int8Array]",n0="[object Int16Array]",i0="[object Int32Array]",o0="[object Uint8Array]",s0="[object Uint8ClampedArray]",a0="[object Uint16Array]",l0="[object Uint32Array]",Je={};Je[e0]=Je[t0]=Je[r0]=Je[n0]=Je[i0]=Je[o0]=Je[s0]=Je[a0]=Je[l0]=!0;Je[UD]=Je[qD]=Je[QD]=Je[GD]=Je[ZD]=Je[jD]=Je[KD]=Je[HD]=Je[BD]=Je[WD]=Je[zD]=Je[VD]=Je[XD]=Je[YD]=Je[JD]=!1;function c0(t){return Tt(t)&&Us(t.length)&&!!Je[yr(t)]}var QR=c0;function u0(t){return function(e){return t(e)}}var Un=u0;var ZR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,bl=ZR&&typeof module=="object"&&module&&!module.nodeType&&module,f0=bl&&bl.exports===ZR,Uh=f0&&sf.process,d0=function(){try{var t=bl&&bl.require&&bl.require("util").types;return t||Uh&&Uh.binding&&Uh.binding("util")}catch{}}(),Zr=d0;var eb=Zr&&Zr.isTypedArray,p0=eb?Un(eb):QR,qs=p0;var m0=Object.prototype,h0=m0.hasOwnProperty;function y0(t,e){var r=V(t),n=!r&&qi(t),i=!r&&!n&&di(t),o=!r&&!n&&!i&&qs(t),s=r||n||i||o,a=s?WR(t.length,String):[],l=a.length;for(var c in t)(e||h0.call(t,c))&&!(s&&(c=="length"||i&&(c=="offset"||c=="parent")||o&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||Mi(c,l)))&&a.push(c);return a}var df=y0;function g0(t,e){return function(r){return t(e(r))}}var pf=g0;var T0=pf(Object.keys,Object),tb=T0;var v0=Object.prototype,x0=v0.hasOwnProperty;function R0(t){if(!Fn(t))return tb(t);var e=[];for(var r in Object(t))x0.call(t,r)&&r!="constructor"&&e.push(r);return e}var mf=R0;function b0(t){return _t(t)?df(t):mf(t)}var He=b0;var C0=Object.prototype,A0=C0.hasOwnProperty,w0=BR(function(t,e){if(Fn(e)||_t(e)){Mn(e,He(e),t);return}for(var r in e)A0.call(e,r)&&Fi(t,r,e[r])}),Zt=w0;function S0(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var rb=S0;var k0=Object.prototype,E0=k0.hasOwnProperty;function $0(t){if(!lt(t))return rb(t);var e=Fn(t),r=[];for(var n in t)n=="constructor"&&(e||!E0.call(t,n))||r.push(n);return r}var nb=$0;function N0(t){return _t(t)?df(t,!0):nb(t)}var Gi=N0;var _0=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,P0=/^\w*$/;function I0(t,e){if(V(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||In(t)?!0:P0.test(t)||!_0.test(t)||e!=null&&t in Object(e)}var Gs=I0;var D0=Sr(Object,"create"),pi=D0;function O0(){this.__data__=pi?pi(null):{},this.size=0}var ib=O0;function L0(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var ob=L0;var M0="__lodash_hash_undefined__",F0=Object.prototype,U0=F0.hasOwnProperty;function q0(t){var e=this.__data__;if(pi){var r=e[t];return r===M0?void 0:r}return U0.call(e,t)?e[t]:void 0}var sb=q0;var G0=Object.prototype,j0=G0.hasOwnProperty;function K0(t){var e=this.__data__;return pi?e[t]!==void 0:j0.call(e,t)}var ab=K0;var H0="__lodash_hash_undefined__";function B0(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=pi&&e===void 0?H0:e,this}var lb=B0;function js(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}js.prototype.clear=ib;js.prototype.delete=ob;js.prototype.get=sb;js.prototype.has=ab;js.prototype.set=lb;var qh=js;function W0(){this.__data__=[],this.size=0}var cb=W0;function z0(t,e){for(var r=t.length;r--;)if(Ln(t[r][0],e))return r;return-1}var ji=z0;var V0=Array.prototype,X0=V0.splice;function Y0(t){var e=this.__data__,r=ji(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():X0.call(e,r,1),--this.size,!0}var ub=Y0;function J0(t){var e=this.__data__,r=ji(e,t);return r<0?void 0:e[r][1]}var fb=J0;function Q0(t){return ji(this.__data__,t)>-1}var db=Q0;function Z0(t,e){var r=this.__data__,n=ji(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var pb=Z0;function Ks(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ks.prototype.clear=cb;Ks.prototype.delete=ub;Ks.prototype.get=fb;Ks.prototype.has=db;Ks.prototype.set=pb;var Ki=Ks;var eO=Sr(Nt,"Map"),Hi=eO;function tO(){this.size=0,this.__data__={hash:new qh,map:new(Hi||Ki),string:new qh}}var mb=tO;function rO(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var hb=rO;function nO(t,e){var r=t.__data__;return hb(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Bi=nO;function iO(t){var e=Bi(this,t).delete(t);return this.size-=e?1:0,e}var yb=iO;function oO(t){return Bi(this,t).get(t)}var gb=oO;function sO(t){return Bi(this,t).has(t)}var Tb=sO;function aO(t,e){var r=Bi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var vb=aO;function Hs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Hs.prototype.clear=mb;Hs.prototype.delete=yb;Hs.prototype.get=gb;Hs.prototype.has=Tb;Hs.prototype.set=vb;var Eo=Hs;var lO="Expected a function";function Gh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(lO);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(Gh.Cache||Eo),r}Gh.Cache=Eo;var xb=Gh;var cO=500;function uO(t){var e=xb(t,function(n){return r.size===cO&&r.clear(),n}),r=e.cache;return e}var Rb=uO;var fO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,dO=/\\(\\)?/g,pO=Rb(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(fO,function(r,n,i,o){e.push(i?o.replace(dO,"$1"):n||r)}),e}),bb=pO;function mO(t){return t==null?"":bR(t)}var Cb=mO;function hO(t,e){return V(t)?t:Gs(t,e)?[t]:bb(Cb(t))}var Wi=hO;var yO=1/0;function gO(t){if(typeof t=="string"||In(t))return t;var e=t+"";return e=="0"&&1/t==-yO?"-0":e}var qn=gO;function TO(t,e){e=Wi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[qn(e[r++])];return r&&r==n?t:void 0}var Bs=TO;function vO(t,e,r){var n=t==null?void 0:Bs(t,e);return n===void 0?r:n}var Ab=vO;function xO(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Ws=xO;var wb=qt?qt.isConcatSpreadable:void 0;function RO(t){return V(t)||qi(t)||!!(wb&&t&&t[wb])}var Sb=RO;function kb(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=Sb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?kb(a,e-1,r,n,i):Ws(i,a):n||(i[i.length]=a)}return i}var zs=kb;function bO(t){var e=t==null?0:t.length;return e?zs(t,1):[]}var vt=bO;var CO=pf(Object.getPrototypeOf,Object),hf=CO;function AO(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var yf=AO;function wO(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var Eb=wO;function SO(){this.__data__=new Ki,this.size=0}var $b=SO;function kO(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var Nb=kO;function EO(t){return this.__data__.get(t)}var _b=EO;function $O(t){return this.__data__.has(t)}var Pb=$O;var NO=200;function _O(t,e){var r=this.__data__;if(r instanceof Ki){var n=r.__data__;if(!Hi||n.length<NO-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Eo(n)}return r.set(t,e),this.size=r.size,this}var Ib=_O;function Vs(t){var e=this.__data__=new Ki(t);this.size=e.size}Vs.prototype.clear=$b;Vs.prototype.delete=Nb;Vs.prototype.get=_b;Vs.prototype.has=Pb;Vs.prototype.set=Ib;var zi=Vs;function PO(t,e){return t&&Mn(e,He(e),t)}var Db=PO;function IO(t,e){return t&&Mn(e,Gi(e),t)}var Ob=IO;var Ub=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Lb=Ub&&typeof module=="object"&&module&&!module.nodeType&&module,DO=Lb&&Lb.exports===Ub,Mb=DO?Nt.Buffer:void 0,Fb=Mb?Mb.allocUnsafe:void 0;function OO(t,e){if(e)return t.slice();var r=t.length,n=Fb?Fb(r):new t.constructor(r);return t.copy(n),n}var qb=OO;function LO(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Xs=LO;function MO(){return[]}var gf=MO;var FO=Object.prototype,UO=FO.propertyIsEnumerable,Gb=Object.getOwnPropertySymbols,qO=Gb?function(t){return t==null?[]:(t=Object(t),Xs(Gb(t),function(e){return UO.call(t,e)}))}:gf,Ys=qO;function GO(t,e){return Mn(t,Ys(t),e)}var jb=GO;var jO=Object.getOwnPropertySymbols,KO=jO?function(t){for(var e=[];t;)Ws(e,Ys(t)),t=hf(t);return e}:gf,Tf=KO;function HO(t,e){return Mn(t,Tf(t),e)}var Kb=HO;function BO(t,e,r){var n=e(t);return V(t)?n:Ws(n,r(t))}var vf=BO;function WO(t){return vf(t,He,Ys)}var Cl=WO;function zO(t){return vf(t,Gi,Tf)}var xf=zO;var VO=Sr(Nt,"DataView"),Rf=VO;var XO=Sr(Nt,"Promise"),bf=XO;var YO=Sr(Nt,"Set"),Vi=YO;var Hb="[object Map]",JO="[object Object]",Bb="[object Promise]",Wb="[object Set]",zb="[object WeakMap]",Vb="[object DataView]",QO=fi(Rf),ZO=fi(Hi),eL=fi(bf),tL=fi(Vi),rL=fi(lf),$o=yr;(Rf&&$o(new Rf(new ArrayBuffer(1)))!=Vb||Hi&&$o(new Hi)!=Hb||bf&&$o(bf.resolve())!=Bb||Vi&&$o(new Vi)!=Wb||lf&&$o(new lf)!=zb)&&($o=function(t){var e=yr(t),r=e==JO?t.constructor:void 0,n=r?fi(r):"";if(n)switch(n){case QO:return Vb;case ZO:return Hb;case eL:return Bb;case tL:return Wb;case rL:return zb}return e});var Tn=$o;var nL=Object.prototype,iL=nL.hasOwnProperty;function oL(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&iL.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Xb=oL;var sL=Nt.Uint8Array,Js=sL;function aL(t){var e=new t.constructor(t.byteLength);return new Js(e).set(new Js(t)),e}var Qs=aL;function lL(t,e){var r=e?Qs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Yb=lL;var cL=/\w*$/;function uL(t){var e=new t.constructor(t.source,cL.exec(t));return e.lastIndex=t.lastIndex,e}var Jb=uL;var Qb=qt?qt.prototype:void 0,Zb=Qb?Qb.valueOf:void 0;function fL(t){return Zb?Object(Zb.call(t)):{}}var eC=fL;function dL(t,e){var r=e?Qs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var tC=dL;var pL="[object Boolean]",mL="[object Date]",hL="[object Map]",yL="[object Number]",gL="[object RegExp]",TL="[object Set]",vL="[object String]",xL="[object Symbol]",RL="[object ArrayBuffer]",bL="[object DataView]",CL="[object Float32Array]",AL="[object Float64Array]",wL="[object Int8Array]",SL="[object Int16Array]",kL="[object Int32Array]",EL="[object Uint8Array]",$L="[object Uint8ClampedArray]",NL="[object Uint16Array]",_L="[object Uint32Array]";function PL(t,e,r){var n=t.constructor;switch(e){case RL:return Qs(t);case pL:case mL:return new n(+t);case bL:return Yb(t,r);case CL:case AL:case wL:case SL:case kL:case EL:case $L:case NL:case _L:return tC(t,r);case hL:return new n;case yL:case vL:return new n(t);case gL:return Jb(t);case TL:return new n;case xL:return eC(t)}}var rC=PL;function IL(t){return typeof t.constructor=="function"&&!Fn(t)?DR(hf(t)):{}}var nC=IL;var DL="[object Map]";function OL(t){return Tt(t)&&Tn(t)==DL}var iC=OL;var oC=Zr&&Zr.isMap,LL=oC?Un(oC):iC,sC=LL;var ML="[object Set]";function FL(t){return Tt(t)&&Tn(t)==ML}var aC=FL;var lC=Zr&&Zr.isSet,UL=lC?Un(lC):aC,cC=UL;var qL=1,GL=2,jL=4,uC="[object Arguments]",KL="[object Array]",HL="[object Boolean]",BL="[object Date]",WL="[object Error]",fC="[object Function]",zL="[object GeneratorFunction]",VL="[object Map]",XL="[object Number]",dC="[object Object]",YL="[object RegExp]",JL="[object Set]",QL="[object String]",ZL="[object Symbol]",eM="[object WeakMap]",tM="[object ArrayBuffer]",rM="[object DataView]",nM="[object Float32Array]",iM="[object Float64Array]",oM="[object Int8Array]",sM="[object Int16Array]",aM="[object Int32Array]",lM="[object Uint8Array]",cM="[object Uint8ClampedArray]",uM="[object Uint16Array]",fM="[object Uint32Array]",Be={};Be[uC]=Be[KL]=Be[tM]=Be[rM]=Be[HL]=Be[BL]=Be[nM]=Be[iM]=Be[oM]=Be[sM]=Be[aM]=Be[VL]=Be[XL]=Be[dC]=Be[YL]=Be[JL]=Be[QL]=Be[ZL]=Be[lM]=Be[cM]=Be[uM]=Be[fM]=!0;Be[WL]=Be[fC]=Be[eM]=!1;function Cf(t,e,r,n,i,o){var s,a=e&qL,l=e&GL,c=e&jL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!lt(t))return t;var u=V(t);if(u){if(s=Xb(t),!a)return LR(t,s)}else{var f=Tn(t),m=f==fC||f==zL;if(di(t))return qb(t,a);if(f==dC||f==uC||m&&!i){if(s=l||m?{}:nC(t),!a)return l?Kb(t,Ob(s,t)):jb(t,Db(s,t))}else{if(!Be[f])return i?t:{};s=rC(t,f,a)}}o||(o=new zi);var T=o.get(t);if(T)return T;o.set(t,s),cC(t)?t.forEach(function(N){s.add(Cf(N,e,r,N,t,o))}):sC(t)&&t.forEach(function(N,w){s.set(w,Cf(N,e,r,w,t,o))});var C=c?l?xf:Cl:l?Gi:He,A=u?void 0:C(t);return cf(A||t,function(N,w){A&&(w=N,N=t[w]),Fi(s,w,Cf(N,e,r,w,t,o))}),s}var pC=Cf;var dM=4;function pM(t){return pC(t,dM)}var We=pM;function mM(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Gn=mM;var hM="__lodash_hash_undefined__";function yM(t){return this.__data__.set(t,hM),this}var mC=yM;function gM(t){return this.__data__.has(t)}var hC=gM;function Af(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Eo;++e<r;)this.add(t[e])}Af.prototype.add=Af.prototype.push=mC;Af.prototype.has=hC;var Zs=Af;function TM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var wf=TM;function vM(t,e){return t.has(e)}var ea=vM;var xM=1,RM=2;function bM(t,e,r,n,i,o){var s=r&xM,a=t.length,l=e.length;if(a!=l&&!(s&&l>a))return!1;var c=o.get(t),u=o.get(e);if(c&&u)return c==e&&u==t;var f=-1,m=!0,T=r&RM?new Zs:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var C=t[f],A=e[f];if(n)var N=s?n(A,C,f,e,t,o):n(C,A,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!wf(e,function(w,v){if(!ea(T,v)&&(C===w||i(C,w,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(C===A||i(C,A,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var Sf=bM;function CM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var yC=CM;function AM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var ta=AM;var wM=1,SM=2,kM="[object Boolean]",EM="[object Date]",$M="[object Error]",NM="[object Map]",_M="[object Number]",PM="[object RegExp]",IM="[object Set]",DM="[object String]",OM="[object Symbol]",LM="[object ArrayBuffer]",MM="[object DataView]",gC=qt?qt.prototype:void 0,jh=gC?gC.valueOf:void 0;function FM(t,e,r,n,i,o,s){switch(r){case MM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case LM:return!(t.byteLength!=e.byteLength||!o(new Js(t),new Js(e)));case kM:case EM:case _M:return Ln(+t,+e);case $M:return t.name==e.name&&t.message==e.message;case PM:case DM:return t==e+"";case NM:var a=yC;case IM:var l=n&wM;if(a||(a=ta),t.size!=e.size&&!l)return!1;var c=s.get(t);if(c)return c==e;n|=SM,s.set(t,e);var u=Sf(a(t),a(e),n,i,o,s);return s.delete(t),u;case OM:if(jh)return jh.call(t)==jh.call(e)}return!1}var TC=FM;var UM=1,qM=Object.prototype,GM=qM.hasOwnProperty;function jM(t,e,r,n,i,o){var s=r&UM,a=Cl(t),l=a.length,c=Cl(e),u=c.length;if(l!=u&&!s)return!1;for(var f=l;f--;){var m=a[f];if(!(s?m in e:GM.call(e,m)))return!1}var T=o.get(t),C=o.get(e);if(T&&C)return T==e&&C==t;var A=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<l;){m=a[f];var w=t[m],v=e[m];if(n)var g=s?n(v,w,m,e,t,o):n(w,v,m,t,e,o);if(!(g===void 0?w===v||i(w,v,r,n,o):g)){A=!1;break}N||(N=m=="constructor")}if(A&&!N){var $=t.constructor,D=e.constructor;$!=D&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(A=!1)}return o.delete(t),o.delete(e),A}var vC=jM;var KM=1,xC="[object Arguments]",RC="[object Array]",kf="[object Object]",HM=Object.prototype,bC=HM.hasOwnProperty;function BM(t,e,r,n,i,o){var s=V(t),a=V(e),l=s?RC:Tn(t),c=a?RC:Tn(e);l=l==xC?kf:l,c=c==xC?kf:c;var u=l==kf,f=c==kf,m=l==c;if(m&&di(t)){if(!di(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new zi),s||qs(t)?Sf(t,e,r,n,i,o):TC(t,e,l,r,n,i,o);if(!(r&KM)){var T=u&&bC.call(t,"__wrapped__"),C=f&&bC.call(e,"__wrapped__");if(T||C){var A=T?t.value():t,N=C?e.value():e;return o||(o=new zi),i(A,N,r,n,o)}}return m?(o||(o=new zi),vC(t,e,r,n,i,o)):!1}var CC=BM;function AC(t,e,r,n,i){return t===e?!0:t==null||e==null||!Tt(t)&&!Tt(e)?t!==t&&e!==e:CC(t,e,r,n,AC,i)}var Ef=AC;var WM=1,zM=2;function VM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var l=a[0],c=t[l],u=a[1];if(s&&a[2]){if(c===void 0&&!(l in t))return!1}else{var f=new zi;if(n)var m=n(c,u,l,t,e,f);if(!(m===void 0?Ef(u,c,WM|zM,n,f):m))return!1}}return!0}var wC=VM;function XM(t){return t===t&&!lt(t)}var $f=XM;function YM(t){for(var e=He(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,$f(i)]}return e}var SC=YM;function JM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Nf=JM;function QM(t){var e=SC(t);return e.length==1&&e[0][2]?Nf(e[0][0],e[0][1]):function(r){return r===t||wC(r,t,e)}}var kC=QM;function ZM(t,e){return t!=null&&e in Object(t)}var EC=ZM;function e1(t,e,r){e=Wi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=qn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Us(i)&&Mi(s,i)&&(V(t)||qi(t)))}var _f=e1;function t1(t,e){return t!=null&&_f(t,e,EC)}var $C=t1;var r1=1,n1=2;function i1(t,e){return Gs(t)&&$f(e)?Nf(qn(t),e):function(r){var n=Ab(r,t);return n===void 0&&n===e?$C(r,t):Ef(e,n,r1|n1)}}var NC=i1;function o1(t){return function(e){return e?.[t]}}var _C=o1;function s1(t){return function(e){return Bs(e,t)}}var PC=s1;function a1(t){return Gs(t)?_C(qn(t)):PC(t)}var IC=a1;function l1(t){return typeof t=="function"?t:t==null?wr:typeof t=="object"?V(t)?NC(t[0],t[1]):kC(t):IC(t)}var ht=l1;function c1(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var DC=c1;function u1(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var l=s[t?a:++i];if(r(o[l],l,o)===!1)break}return e}}var OC=u1;var f1=OC(),LC=f1;function d1(t,e){return t&&LC(t,e,He)}var MC=d1;function p1(t,e){return function(r,n){if(r==null)return r;if(!_t(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var FC=p1;var m1=FC(MC),kr=m1;function h1(t,e,r,n){return kr(t,function(i,o,s){e(n,i,r(i),s)}),n}var UC=h1;function y1(t,e){return function(r,n){var i=V(r)?DC:UC,o=e?e():{};return i(r,t,ht(n,2),o)}}var qC=y1;var GC=Object.prototype,g1=GC.hasOwnProperty,T1=Fs(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Ui(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Gi(o),a=-1,l=s.length;++a<l;){var c=s[a],u=t[c];(u===void 0||Ln(u,GC[c])&&!g1.call(t,c))&&(t[c]=o[c])}return t}),ra=T1;function v1(t){return Tt(t)&&_t(t)}var Kh=v1;function x1(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Pf=x1;var R1=200;function b1(t,e,r,n){var i=-1,o=ff,s=!0,a=t.length,l=[],c=e.length;if(!a)return l;r&&(e=Dn(e,Un(r))),n?(o=Pf,s=!1):e.length>=R1&&(o=ea,s=!1,e=new Zs(e));e:for(;++i<a;){var u=t[i],f=r==null?u:r(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=c;m--;)if(e[m]===f)continue e;l.push(u)}else o(e,f,n)||l.push(u)}return l}var jC=b1;var C1=Fs(function(t,e){return Kh(t)?jC(t,zs(e,1,Kh,!0)):[]}),Xi=C1;function A1(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var jn=A1;function w1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:On(e),yf(t,e<0?0:e,n)):[]}var xt=w1;function S1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:On(e),e=n-e,yf(t,0,e<0?0:e)):[]}var mi=S1;function k1(t){return typeof t=="function"?t:wr}var KC=k1;function E1(t,e){var r=V(t)?cf:kr;return r(t,KC(e))}var G=E1;function $1(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var HC=$1;function N1(t,e){var r=!0;return kr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var BC=N1;function _1(t,e,r){var n=V(t)?HC:BC;return r&&Ui(t,e,r)&&(e=void 0),n(t,ht(e,3))}var cr=_1;function P1(t,e){var r=[];return kr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var If=P1;function I1(t,e){var r=V(t)?Xs:If;return r(t,ht(e,3))}var Gt=I1;function D1(t){return function(e,r,n){var i=Object(e);if(!_t(e)){var o=ht(r,3);e=He(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var WC=D1;var O1=Math.max;function L1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:On(r);return i<0&&(i=O1(n+i,0)),uf(t,ht(e,3),i)}var zC=L1;var M1=WC(zC),Kn=M1;function F1(t){return t&&t.length?t[0]:void 0}var jt=F1;function U1(t,e){var r=-1,n=_t(t)?Array(t.length):[];return kr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var VC=U1;function q1(t,e){var r=V(t)?Dn:VC;return r(t,ht(e,3))}var L=q1;function G1(t,e){return zs(L(t,e),1)}var er=G1;var j1=Object.prototype,K1=j1.hasOwnProperty,H1=qC(function(t,e,r){K1.call(t,r)?t[r].push(e):Ms(t,r,[e])}),Hh=H1;var B1=Object.prototype,W1=B1.hasOwnProperty;function z1(t,e){return t!=null&&W1.call(t,e)}var XC=z1;function V1(t,e){return t!=null&&_f(t,e,XC)}var W=V1;var X1="[object String]";function Y1(t){return typeof t=="string"||!V(t)&&Tt(t)&&yr(t)==X1}var Lt=Y1;function J1(t,e){return Dn(e,function(r){return t[r]})}var YC=J1;function Q1(t){return t==null?[]:YC(t,He(t))}var De=Q1;var Z1=Math.max;function eF(t,e,r,n){t=_t(t)?t:De(t),r=r&&!n?On(r):0;var i=t.length;return r<0&&(r=Z1(i+r,0)),Lt(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ls(t,e,r)>-1}var tt=eF;var tF=Math.max;function rF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:On(r);return i<0&&(i=tF(n+i,0)),Ls(t,e,i)}var Df=rF;var nF="[object Map]",iF="[object Set]",oF=Object.prototype,sF=oF.hasOwnProperty;function aF(t){if(t==null)return!0;if(_t(t)&&(V(t)||typeof t=="string"||typeof t.splice=="function"||di(t)||qs(t)||qi(t)))return!t.length;var e=Tn(t);if(e==nF||e==iF)return!t.size;if(Fn(t))return!mf(t).length;for(var r in t)if(sF.call(t,r))return!1;return!0}var le=aF;var lF="[object RegExp]";function cF(t){return Tt(t)&&yr(t)==lF}var JC=cF;var QC=Zr&&Zr.isRegExp,uF=QC?Un(QC):JC,en=uF;function fF(t){return t===void 0}var ur=fF;function dF(t,e){return t<e}var ZC=dF;function pF(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!In(s):r(s,a)))var a=s,l=o}return l}var eA=pF;function mF(t){return t&&t.length?eA(t,wr,ZC):void 0}var tA=mF;var hF="Expected a function";function yF(t){if(typeof t!="function")throw new TypeError(hF);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var rA=yF;function gF(t,e,r,n){if(!lt(t))return t;e=Wi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var l=qn(e[i]),c=r;if(l==="__proto__"||l==="constructor"||l==="prototype")return t;if(i!=s){var u=a[l];c=n?n(u,l,a):void 0,c===void 0&&(c=lt(u)?u:Mi(e[i+1])?[]:{})}Fi(a,l,c),a=a[l]}return t}var nA=gF;function TF(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Bs(t,s);r(a,s)&&nA(o,Wi(s,t),a)}return o}var iA=TF;function vF(t,e){if(t==null)return{};var r=Dn(xf(t),function(n){return[n]});return e=ht(e),iA(t,r,function(n,i){return e(n,i[0])})}var Er=vF;function xF(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var oA=xF;function RF(t,e,r){var n=V(t)?Eb:oA,i=arguments.length<3;return n(t,ht(e,4),r,i,kr)}var ut=RF;function bF(t,e){var r=V(t)?Xs:If;return r(t,rA(ht(e,3)))}var Yi=bF;function CF(t,e){var r;return kr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var sA=CF;function AF(t,e,r){var n=V(t)?wf:sA;return r&&Ui(t,e,r)&&(e=void 0),n(t,ht(e,3))}var Al=AF;var wF=1/0,SF=Vi&&1/ta(new Vi([,-0]))[1]==wF?function(t){return new Vi(t)}:ct,aA=SF;var kF=200;function EF(t,e,r){var n=-1,i=ff,o=t.length,s=!0,a=[],l=a;if(r)s=!1,i=Pf;else if(o>=kF){var c=e?null:aA(t);if(c)return ta(c);s=!1,i=ea,l=new Zs}else l=e?[]:a;e:for(;++n<o;){var u=t[n],f=e?e(u):u;if(u=r||u!==0?u:0,s&&f===f){for(var m=l.length;m--;)if(l[m]===f)continue e;e&&l.push(f),a.push(u)}else i(l,f,r)||(l!==a&&l.push(f),a.push(u))}return a}var Of=EF;function $F(t){return t&&t.length?Of(t):[]}var na=$F;function NF(t,e){return t&&t.length?Of(t,ht(e,2)):[]}var lA=NF;function ia(t){console&&console.error&&console.error(`Error: ${t}`)}function wl(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function Sl(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function kl(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function _F(t){return PF(t)?t.LABEL:t.name}function PF(t){return Lt(t.LABEL)&&t.LABEL!==""}var Gr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},ke=class extends Gr{constructor(e){super([]),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},Tr=class extends Gr{constructor(e){super(e.definition),this.orgText="",Zt(this,Er(e,r=>r!==void 0))}},ze=class extends Gr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Zt(this,Er(e,r=>r!==void 0))}},Ee=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Ve=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Xe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},he=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Fe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Ue=class extends Gr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Zt(this,Er(e,r=>r!==void 0))}},ce=class{constructor(e){this.idx=1,Zt(this,Er(e,r=>r!==void 0))}accept(e){e.visit(this)}};function Lf(t){return L(t,oa)}function oa(t){function e(r){return L(r,oa)}if(t instanceof ke){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Lt(t.label)&&(r.label=t.label),r}else{if(t instanceof ze)return{type:"Alternative",definition:e(t.definition)};if(t instanceof Ee)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Xe)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:oa(new ce({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Fe)return{type:"RepetitionWithSeparator",idx:t.idx,separator:oa(new ce({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof he)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Ue)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ce){let r={type:"Terminal",name:t.terminalType.name,label:_F(t.terminalType),idx:t.idx};Lt(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=en(n)?n.source:n),r}else{if(t instanceof Tr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var vr=class{visit(e){let r=e;switch(r.constructor){case ke:return this.visitNonTerminal(r);case ze:return this.visitAlternative(r);case Ee:return this.visitOption(r);case Ve:return this.visitRepetitionMandatory(r);case Xe:return this.visitRepetitionMandatoryWithSeparator(r);case Fe:return this.visitRepetitionWithSeparator(r);case he:return this.visitRepetition(r);case Ue:return this.visitAlternation(r);case ce:return this.visitTerminal(r);case Tr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Bh(t){return t instanceof ze||t instanceof Ee||t instanceof he||t instanceof Ve||t instanceof Xe||t instanceof Fe||t instanceof ce||t instanceof Tr}function No(t,e=[]){return t instanceof Ee||t instanceof he||t instanceof Fe?!0:t instanceof Ue?Al(t.definition,n=>No(n,e)):t instanceof ke&&tt(e,t)?!1:t instanceof Gr?(t instanceof ke&&e.push(t),cr(t.definition,n=>No(n,e))):!1}function Wh(t){return t instanceof Ue}function $r(t){if(t instanceof ke)return"SUBRULE";if(t instanceof Ee)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof he)return"MANY";if(t instanceof ce)return"CONSUME";throw Error("non exhaustive match")}var hi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=xt(e.definition,i+1);if(n instanceof ke)this.walkProdRef(n,o,r);else if(n instanceof ce)this.walkTerminal(n,o,r);else if(n instanceof ze)this.walkFlat(n,o,r);else if(n instanceof Ee)this.walkOption(n,o,r);else if(n instanceof Ve)this.walkAtLeastOne(n,o,r);else if(n instanceof Xe)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Fe)this.walkManySep(n,o,r);else if(n instanceof he)this.walkMany(n,o,r);else if(n instanceof Ue)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new Ee({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=cA(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new Ee({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=cA(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new ze({definition:[o]});this.walk(s,i)})}};function cA(t,e,r){return[new Ee({definition:[new ce({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function _o(t){if(t instanceof ke)return _o(t.referencedRule);if(t instanceof ce)return OF(t);if(Bh(t))return IF(t);if(Wh(t))return DF(t);throw Error("non exhaustive match")}function IF(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=No(o),e=e.concat(_o(o)),n=n+1,i=r.length>n;return na(e)}function DF(t){let e=L(t.definition,r=>_o(r));return na(vt(e))}function OF(t){return[t.terminalType]}var Mf="_~IN~_";var zh=class extends hi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=LF(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new ze({definition:o}),a=_o(s);this.follows[i]=a}};function uA(t){let e={};return G(t,r=>{let n=new zh(r).startWalking();Zt(e,n)}),e}function LF(t,e){return t.name+e+Mf}var Ff={},MF=new Ro;function sa(t){let e=t.toString();if(Ff.hasOwnProperty(e))return Ff[e];{let r=MF.pattern(e);return Ff[e]=r,r}}function fA(){Ff={}}var pA="Complement Sets are not supported for first char optimization",El=`Unable to use "first char" lexer optimizations:
`;function mA(t,e=!1){try{let r=sa(t);return Vh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===pA)e&&wl(`${El}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ia(`${El}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Vh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Vh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Uf(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(pA);G(s.value,l=>{if(typeof l=="number")Uf(l,e,r);else{let c=l;if(r===!0)for(let u=c.from;u<=c.to;u++)Uf(u,e,r);else{for(let u=c.from;u<=c.to&&u<aa;u++)Uf(u,e,r);if(c.to>=aa){let u=c.from>=aa?c.from:aa,f=c.to,m=Hn(u),T=Hn(f);for(let C=m;C<=T;C++)e[C]=C}}}});break;case"Group":Vh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&Xh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return De(e)}function Uf(t,e,r){let n=Hn(t);e[n]=n,r===!0&&FF(t,e)}function FF(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=Hn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=Hn(i.charCodeAt(0));e[o]=o}}}function dA(t,e){return Kn(t.value,r=>{if(typeof r=="number")return tt(e,r);{let n=r;return Kn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function Xh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?V(t.value)?cr(t.value,Xh):Xh(t.value):!1}var Yh=class extends _n{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){tt(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?dA(e,this.targetCharCodes)===void 0&&(this.found=!0):dA(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function qf(t,e){if(e instanceof RegExp){let r=sa(e),n=new Yh(t);return n.visit(r),n.found}else return Kn(e,r=>tt(t,r.charCodeAt(0)))!==void 0}var Po="PATTERN",la="defaultMode",Gf="modes",Qh=typeof new RegExp("(?:)").sticky=="boolean";function gA(t,e){e=ra(e,{useSticky:Qh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,g)=>g()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{rU()});let n;r("Reject Lexer.NA",()=>{n=Yi(t,v=>v[Po]===yt.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let g=v[Po];if(en(g)){let $=g.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!g.ignoreCase?$:$.length===2&&$[0]==="\\"&&!tt(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?yA(g):hA(g)}else{if(gr(g))return i=!0,{exec:g};if(typeof g=="object")return i=!0,g;if(typeof g=="string"){if(g.length===1)return g;{let $=g.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?yA(D):hA(D)}}else throw Error("non exhaustive match")}})});let s,a,l,c,u;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let g=v.GROUP;if(g!==yt.SKIPPED){if(Lt(g))return g;if(ur(g))return!1;throw Error("non exhaustive match")}}),l=L(n,v=>{let g=v.LONGER_ALT;if(g)return V(g)?L(g,D=>Df(n,D)):[Df(n,g)]}),c=L(n,v=>v.PUSH_MODE),u=L(n,v=>W(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=wA(e.lineTerminatorCharacters);f=L(n,g=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,g=>W(g,"LINE_BREAKS")?!!g.LINE_BREAKS:AA(g,v)===!1&&qf(v,g.PATTERN)))});let m,T,C,A;r("Misc Mapping #2",()=>{m=L(n,bA),T=L(o,eU),C=ut(n,(v,g)=>{let $=g.GROUP;return Lt($)&&$!==yt.SKIPPED&&(v[$]=[]),v},{}),A=L(o,(v,g)=>({pattern:o[g],longerAlt:l[g],canLineTerminator:f[g],isCustom:m[g],short:T[g],group:a[g],push:c[g],pop:u[g],tokenTypeIdx:s[g],tokenType:n[g]}))});let N=!0,w=[];return e.safeMode||r("First Char Optimization",()=>{w=ut(n,(v,g,$)=>{if(typeof g.PATTERN=="string"){let D=g.PATTERN.charCodeAt(0),K=Hn(D);Jh(v,K,A[$])}else if(V(g.START_CHARS_HINT)){let D;G(g.START_CHARS_HINT,K=>{let se=typeof K=="string"?K.charCodeAt(0):K,$e=Hn(se);D!==$e&&(D=$e,Jh(v,$e,A[$]))})}else if(en(g.PATTERN))if(g.PATTERN.unicode)N=!1,e.ensureOptimizations&&ia(`${El}	Unable to analyze < ${g.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=mA(g.PATTERN,e.ensureOptimizations);le(D)&&(N=!1),G(D,K=>{Jh(v,K,A[$])})}else e.ensureOptimizations&&ia(`${El}	TokenType: <${g.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:C,patternIdxToConfig:A,charCodeToPatternIdxToConfig:w,hasCustom:i,canBeOptimized:N}}function TA(t,e){let r=[],n=qF(t);r=r.concat(n.errors);let i=GF(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(UF(o)),r=r.concat(XF(o)),r=r.concat(YF(o,e)),r=r.concat(JF(o)),r}function UF(t){let e=[],r=Gt(t,n=>en(n[Po]));return e=e.concat(KF(r)),e=e.concat(WF(r)),e=e.concat(zF(r)),e=e.concat(VF(r)),e=e.concat(HF(r)),e}function qF(t){let e=Gt(t,i=>!W(i,Po)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:rt.MISSING_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}function GF(t){let e=Gt(t,i=>{let o=i[Po];return!en(o)&&!gr(o)&&!W(o,"exec")&&!Lt(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:rt.INVALID_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}var jF=/[^\\][$]/;function KF(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=Gt(t,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return jF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function HF(t){let e=Gt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:rt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var BF=/[^\\[][\^]|^\^/;function WF(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=Gt(t,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return BF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function zF(t){let e=Gt(t,n=>{let i=n[Po];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:rt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function VF(t){let e=[],r=L(t,o=>ut(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!tt(e,a)&&a.PATTERN!==yt.NA&&(e.push(a),s.push(a)),s),[]));r=Gn(r);let n=Gt(r,o=>o.length>1);return L(n,o=>{let s=L(o,l=>l.name);return{message:`The same RegExp pattern ->${jt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:rt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function XF(t){let e=Gt(t,n=>{if(!W(n,"GROUP"))return!1;let i=n.GROUP;return i!==yt.SKIPPED&&i!==yt.NA&&!Lt(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:rt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function YF(t,e){let r=Gt(t,i=>i.PUSH_MODE!==void 0&&!tt(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:rt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function JF(t){let e=[],r=ut(t,(n,i,o)=>{let s=i.PATTERN;return s===yt.NA||(Lt(s)?n.push({str:s,idx:o,tokenType:i}):en(s)&&ZF(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&QF(o,n.PATTERN)){let l=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:rt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function QF(t,e){if(en(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(gr(e))return e(t,0,[],{});if(W(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function ZF(t){return Kn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function hA(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function yA(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function vA(t,e,r){let n=[];return W(t,la)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+la+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),W(t,Gf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Gf+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),W(t,Gf)&&W(t,la)&&!W(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${la}: <${t.defaultMode}>which does not exist
`,type:rt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),W(t,Gf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(ur(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:rt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(W(s,"LONGER_ALT")){let l=V(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(l,c=>{!ur(c)&&!tt(i,c)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${c.name}> on token <${s.name}> outside of mode <${o}>
`,type:rt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function xA(t,e,r){let n=[],i=!1,o=Gn(vt(De(t.modes))),s=Yi(o,l=>l[Po]===yt.NA),a=wA(r);return e&&G(s,l=>{let c=AA(l,a);if(c!==!1){let f={message:tU(l,c),type:c.issue,tokenType:l};n.push(f)}else W(l,"LINE_BREAKS")?l.LINE_BREAKS===!0&&(i=!0):qf(a,l.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:rt.NO_LINE_BREAKS_FLAGS}),n}function RA(t){let e={},r=He(t);return G(r,n=>{let i=t[n];if(V(i))e[n]=[];else throw Error("non exhaustive match")}),e}function bA(t){let e=t.PATTERN;if(en(e))return!1;if(gr(e))return!0;if(W(e,"exec"))return!0;if(Lt(e))return!1;throw Error("non exhaustive match")}function eU(t){return Lt(t)&&t.length===1?t.charCodeAt(0):!1}var CA={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function AA(t,e){if(W(t,"LINE_BREAKS"))return!1;if(en(t.PATTERN)){try{qf(e,t.PATTERN)}catch(r){return{issue:rt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Lt(t.PATTERN))return!1;if(bA(t))return{issue:rt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function tU(t,e){if(e.issue===rt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===rt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function wA(t){return L(t,r=>Lt(r)?r.charCodeAt(0):r)}function Jh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var aa=256,jf=[];function Hn(t){return t<aa?t:jf[t]}function rU(){if(le(jf)){jf=new Array(65536);for(let t=0;t<65536;t++)jf[t]=t>255?255+~~(t/255):t}}function yi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function ca(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var SA=1,EA={};function gi(t){let e=nU(t);iU(e),sU(e),oU(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function nU(t){let e=We(t),r=t,n=!0;for(;n;){r=Gn(vt(L(r,o=>o.CATEGORIES)));let i=Xi(r,e);e=e.concat(i),le(i)?n=!1:r=i}return e}function iU(t){G(t,e=>{Zh(e)||(EA[SA]=e,e.tokenTypeIdx=SA++),kA(e)&&!V(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),kA(e)||(e.CATEGORIES=[]),aU(e)||(e.categoryMatches=[]),lU(e)||(e.categoryMatchesMap={})})}function oU(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(EA[n].tokenTypeIdx)})})}function sU(t){G(t,e=>{$A([],e)})}function $A(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);tt(n,r)||$A(n,r)})}function Zh(t){return W(t,"tokenTypeIdx")}function kA(t){return W(t,"CATEGORIES")}function aU(t){return W(t,"categoryMatches")}function lU(t){return W(t,"categoryMatchesMap")}function NA(t){return W(t,"tokenTypeIdx")}var ey={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var rt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(rt||(rt={}));var $l={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:ey,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze($l);var yt=class{constructor(e,r=$l){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:l}=Sl(o),c=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&c(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,l}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Zt({},$l,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===$l.lineTerminatorsPattern)this.config.lineTerminatorsPattern=CA;else if(this.config.lineTerminatorCharacters===$l.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),V(e)?i={modes:{defaultMode:We(e)},defaultMode:la}:(o=!1,i=We(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(vA(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(xA(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,l)=>{i.modes[l]=Yi(a,c=>ur(c))});let s=He(i.modes);if(G(i.modes,(a,l)=>{this.TRACE_INIT(`Mode: <${l}> processing`,()=>{if(this.modes.push(l),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(TA(a,s))}),le(this.lexerDefinitionErrors)){gi(a);let c;this.TRACE_INIT("analyzeTokenTypes",()=>{c=gA(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[l]=c.patternIdxToConfig,this.charCodeToPatternIdxToConfig[l]=c.charCodeToPatternIdxToConfig,this.emptyGroups=Zt({},this.emptyGroups,c.emptyGroups),this.hasCustom=c.hasCustom||this.hasCustom,this.canModeBeOptimized[l]=c.canBeOptimized}})}),this.defaultMode=i.defaultMode,!le(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let l=L(this.lexerDefinitionErrors,c=>c.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}G(this.lexerDefinitionWarning,a=>{wl(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Qh?(this.chopInput=wr,this.match=this.matchWithTest):(this.updateLastIndex=ct,this.match=this.matchWithExec),o&&(this.handleModes=ct),this.trackStartLines===!1&&(this.computeNewColumn=wr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=ct),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=ut(this.canModeBeOptimized,(l,c,u)=>(c===!1&&l.push(u),l),[]);if(r.ensureOptimizations&&!le(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{fA()}),this.TRACE_INIT("toFastProperties",()=>{kl(this)})})}tokenize(e,r=this.defaultMode){if(!le(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,l,c,u,f,m,T,C,A,N,w,v,g=e,$=g.length,D=0,K=0,se=this.hasCustom?0:Math.floor(e.length/10),$e=new Array(se),Ht=[],Rt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,S=RA(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,ue=0,te=[],Z=[],bt=[],ft=[];Object.freeze(ft);let ye;function Nr(){return te}function Bn(Ct){let tr=Hn(Ct),Cn=Z[tr];return Cn===void 0?ft:Cn}let wa=Ct=>{if(bt.length===1&&Ct.tokenType.PUSH_MODE===void 0){let tr=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(Ct);Ht.push({offset:Ct.startOffset,line:Ct.startLine,column:Ct.startColumn,length:Ct.image.length,message:tr})}else{bt.pop();let tr=jn(bt);te=this.patternIdxToConfig[tr],Z=this.charCodeToPatternIdxToConfig[tr],ue=te.length;let Cn=this.canModeBeOptimized[tr]&&this.config.safeMode===!1;Z&&Cn?ye=Bn:ye=Nr}};function eo(Ct){bt.push(Ct),Z=this.charCodeToPatternIdxToConfig[Ct],te=this.patternIdxToConfig[Ct],ue=te.length,ue=te.length;let tr=this.canModeBeOptimized[Ct]&&this.config.safeMode===!1;Z&&tr?ye=Bn:ye=Nr}eo.call(this,r);let fr,qo=this.config.recoveryEnabled;for(;D<$;){l=null;let Ct=g.charCodeAt(D),tr=ye(Ct),Cn=tr.length;for(n=0;n<Cn;n++){fr=tr[n];let Bt=fr.pattern;c=null;let dt=fr.short;if(dt!==!1?Ct===dt&&(l=Bt):fr.isCustom===!0?(v=Bt.exec(g,D,$e,S),v!==null?(l=v[0],v.payload!==void 0&&(c=v.payload)):l=null):(this.updateLastIndex(Bt,D),l=this.match(Bt,e,D)),l!==null){if(a=fr.longerAlt,a!==void 0){let jr=a.length;for(o=0;o<jr;o++){let _r=te[a[o]],Rr=_r.pattern;if(u=null,_r.isCustom===!0?(v=Rr.exec(g,D,$e,S),v!==null?(s=v[0],v.payload!==void 0&&(u=v.payload)):s=null):(this.updateLastIndex(Rr,D),s=this.match(Rr,e,D)),s&&s.length>l.length){l=s,c=u,fr=_r;break}}}break}}if(l!==null){if(f=l.length,m=fr.group,m!==void 0&&(T=fr.tokenTypeIdx,C=this.createTokenInstance(l,D,T,fr.tokenType,Rt,M,f),this.handlePayload(C,c),m===!1?K=this.addToken($e,K,C):S[m].push(C)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&fr.canLineTerminator===!0){let Bt=0,dt,jr;j.lastIndex=0;do dt=j.test(l),dt===!0&&(jr=j.lastIndex-1,Bt++);while(dt===!0);Bt!==0&&(Rt=Rt+Bt,M=f-jr,this.updateTokenEndLineColumnLocation(C,m,jr,Bt,Rt,M,f))}this.handleModes(fr,wa,eo,C)}else{let Bt=D,dt=Rt,jr=M,_r=qo===!1;for(;_r===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<ue;i++){let Rr=te[i],to=Rr.pattern,bi=Rr.short;if(bi!==!1?g.charCodeAt(D)===bi&&(_r=!0):Rr.isCustom===!0?_r=to.exec(g,D,$e,S)!==null:(this.updateLastIndex(to,D),_r=to.exec(e)!==null),_r===!0)break}if(A=D-Bt,M=this.computeNewColumn(M,A),w=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g,Bt,A,dt,jr),Ht.push({offset:Bt,line:dt,column:jr,length:A,message:w}),qo===!1)break}}return this.hasCustom||($e.length=K),{tokens:$e,groups:S,errors:Ht}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let l,c;r!==void 0&&(l=n===a-1,c=l?-1:0,i===1&&l===!0||(e.endLine=o+c,e.endColumn=s-1+-c))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};yt.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";yt.NA=/NOT_APPLICABLE/;function Ti(t){return ty(t)?t.LABEL:t.name}function ty(t){return Lt(t.LABEL)&&t.LABEL!==""}var cU="parent",_A="categories",PA="label",IA="group",DA="push_mode",OA="pop_mode",LA="longer_alt",MA="line_breaks",FA="start_chars_hint";function Kf(t){return uU(t)}function uU(t){let e=t.pattern,r={};if(r.name=t.name,ur(e)||(r.PATTERN=e),W(t,cU))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return W(t,_A)&&(r.CATEGORIES=t[_A]),gi([r]),W(t,PA)&&(r.LABEL=t[PA]),W(t,IA)&&(r.GROUP=t[IA]),W(t,OA)&&(r.POP_MODE=t[OA]),W(t,DA)&&(r.PUSH_MODE=t[DA]),W(t,LA)&&(r.LONGER_ALT=t[LA]),W(t,MA)&&(r.LINE_BREAKS=t[MA]),W(t,FA)&&(r.START_CHARS_HINT=t[FA]),r}var vn=Kf({name:"EOF",pattern:yt.NA});gi([vn]);function Io(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function Nl(t,e){return yi(t,e)}var vi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${ty(t)?`--> ${Ti(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+jt(e).image+"'";if(n)return o+n+a;{let l=ut(t,(m,T)=>m.concat(T),[]),c=L(l,m=>`[${L(m,T=>Ti(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(c,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+jt(e).image+"'";if(r)return i+r+s;{let l=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,c=>`[${L(c,u=>Ti(u)).join(",")}]`).join(" ,")}>`;return i+l+s}}};Object.freeze(vi);var UA={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},xn={buildDuplicateFoundError(t,e){function r(u){return u instanceof ce?u.terminalType.name:u instanceof ke?u.nonTerminalName:""}let n=t.name,i=jt(e),o=i.idx,s=$r(i),a=r(i),l=o>0,c=`->${s}${l?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return c=c.replace(/[ \t]+/g," "),c=c.replace(/\s\s+/g,`
`),c},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=$r(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof Tr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function qA(t,e){let r=new ry(t,e);return r.resolveRefs(),r.errors}var ry=class extends vr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(De(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Mt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var ny=class extends hi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=We(this.path.ruleStack).reverse(),this.occurrenceStack=We(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){le(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Hf=class extends ny{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new ze({definition:i});this.possibleTokTypes=_o(o),this.found=!0}}},ua=class extends hi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Bf=class extends ua{walkMany(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ce&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},_l=class extends ua{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ce&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Wf=class extends ua{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ce&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Pl=class extends ua{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ce&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function zf(t,e,r=[]){r=We(r);let n=[],i=0;function o(a){return a.concat(xt(t,i+1))}function s(a){let l=zf(o(a),e,r);return n.concat(l)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof ze)return s(a.definition);if(a instanceof ke)return s(a.definition);if(a instanceof Ee)n=s(a.definition);else if(a instanceof Ve){let l=a.definition.concat([new he({definition:a.definition})]);return s(l)}else if(a instanceof Xe){let l=[new ze({definition:a.definition}),new he({definition:[new ce({terminalType:a.separator})].concat(a.definition)})];return s(l)}else if(a instanceof Fe){let l=a.definition.concat([new he({definition:[new ce({terminalType:a.separator})].concat(a.definition)})]);n=s(l)}else if(a instanceof he){let l=a.definition.concat([new he({definition:a.definition})]);n=s(l)}else{if(a instanceof Ue)return G(a.definition,l=>{le(l.definition)===!1&&(n=s(l.definition))}),n;if(a instanceof ce)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:xt(t,i)}),n}function Vf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,l=e.length,c=l-n-1,u=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!le(f);){let m=f.pop();if(m===s){a&&jn(f).idx<=c&&f.pop();continue}let T=m.def,C=m.idx,A=m.ruleStack,N=m.occurrenceStack;if(le(T))continue;let w=T[0];if(w===i){let v={idx:C,def:xt(T),ruleStack:mi(A),occurrenceStack:mi(N)};f.push(v)}else if(w instanceof ce)if(C<l-1){let v=C+1,g=e[v];if(r(g,w.terminalType)){let $={idx:v,def:xt(T),ruleStack:A,occurrenceStack:N};f.push($)}}else if(C===l-1)u.push({nextTokenType:w.terminalType,nextTokenOccurrence:w.idx,ruleStack:A,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(w instanceof ke){let v=We(A);v.push(w.nonTerminalName);let g=We(N);g.push(w.idx);let $={idx:C,def:w.definition.concat(o,xt(T)),ruleStack:v,occurrenceStack:g};f.push($)}else if(w instanceof Ee){let v={idx:C,def:xt(T),ruleStack:A,occurrenceStack:N};f.push(v),f.push(s);let g={idx:C,def:w.definition.concat(xt(T)),ruleStack:A,occurrenceStack:N};f.push(g)}else if(w instanceof Ve){let v=new he({definition:w.definition,idx:w.idx}),g=w.definition.concat([v],xt(T)),$={idx:C,def:g,ruleStack:A,occurrenceStack:N};f.push($)}else if(w instanceof Xe){let v=new ce({terminalType:w.separator}),g=new he({definition:[v].concat(w.definition),idx:w.idx}),$=w.definition.concat([g],xt(T)),D={idx:C,def:$,ruleStack:A,occurrenceStack:N};f.push(D)}else if(w instanceof Fe){let v={idx:C,def:xt(T),ruleStack:A,occurrenceStack:N};f.push(v),f.push(s);let g=new ce({terminalType:w.separator}),$=new he({definition:[g].concat(w.definition),idx:w.idx}),D=w.definition.concat([$],xt(T)),K={idx:C,def:D,ruleStack:A,occurrenceStack:N};f.push(K)}else if(w instanceof he){let v={idx:C,def:xt(T),ruleStack:A,occurrenceStack:N};f.push(v),f.push(s);let g=new he({definition:w.definition,idx:w.idx}),$=w.definition.concat([g],xt(T)),D={idx:C,def:$,ruleStack:A,occurrenceStack:N};f.push(D)}else if(w instanceof Ue)for(let v=w.definition.length-1;v>=0;v--){let g=w.definition[v],$={idx:C,def:g.definition.concat(xt(T)),ruleStack:A,occurrenceStack:N};f.push($),f.push(s)}else if(w instanceof ze)f.push({idx:C,def:w.definition.concat(xt(T)),ruleStack:A,occurrenceStack:N});else if(w instanceof Tr)f.push(fU(w,C,A,N));else throw Error("non exhaustive match")}return u}function fU(t,e,r,n){let i=We(r);i.push(t.name);let o=We(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var nt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(nt||(nt={}));function Il(t){if(t instanceof Ee||t==="Option")return nt.OPTION;if(t instanceof he||t==="Repetition")return nt.REPETITION;if(t instanceof Ve||t==="RepetitionMandatory")return nt.REPETITION_MANDATORY;if(t instanceof Xe||t==="RepetitionMandatoryWithSeparator")return nt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Fe||t==="RepetitionWithSeparator")return nt.REPETITION_WITH_SEPARATOR;if(t instanceof Ue||t==="Alternation")return nt.ALTERNATION;throw Error("non exhaustive match")}function Yf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Il(n);return o===nt.ALTERNATION?fa(e,r,i):da(e,r,o,i)}function jA(t,e,r,n,i,o){let s=fa(t,e,r),a=VA(s)?ca:yi;return o(s,n,a,i)}function KA(t,e,r,n,i,o){let s=da(t,e,i,r),a=VA(s)?ca:yi;return o(s[0],a,n)}function HA(t,e,r,n){let i=t.length,o=cr(t,s=>cr(s,a=>a.length===1));if(e)return function(s){let a=L(s,l=>l.GATE);for(let l=0;l<i;l++){let c=t[l],u=c.length,f=a[l];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let T=c[m],C=T.length;for(let A=0;A<C;A++){let N=this.LA(A+1);if(r(N,T[A])===!1)continue e}return l}}};if(o&&!n){let s=L(t,l=>vt(l)),a=ut(s,(l,c,u)=>(G(c,f=>{W(l,f.tokenTypeIdx)||(l[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{W(l,m)||(l[m]=u)})}),l),{});return function(){let l=this.LA(1);return a[l.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],l=a.length;e:for(let c=0;c<l;c++){let u=a[c],f=u.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,u[m])===!1)continue e}return s}}}}function BA(t,e,r){let n=cr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=vt(t);if(o.length===1&&le(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=ut(o,(a,l,c)=>(a[l.tokenTypeIdx]=!0,G(l.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let l=0;l<a;l++){let c=this.LA(l+1);if(e(c,s[l])===!1)continue e}return!0}return!1}}var oy=class extends hi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,nt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,nt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},Xf=class extends vr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,nt.OPTION)}visitRepetition(e){this.checkIsTarget(e,nt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,nt.ALTERNATION)}};function GA(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function iy(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let l="_"+n.categoryMatches[a];i.push(s+l)}}e=i}return e}function dU(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function WA(t,e){let r=L(t,s=>zf([s],1)),n=GA(r.length),i=L(r,s=>{let a={};return G(s,l=>{let c=iy(l.partialPath);G(c,u=>{a[u]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=GA(a.length);for(let l=0;l<a.length;l++){let c=a[l];for(let u=0;u<c.length;u++){let f=c[u].partialPath,m=c[u].suffixDef,T=iy(f);if(dU(i,T,l)||le(m)||f.length===e){let A=n[l];if(Jf(A,f)===!1){A.push(f);for(let N=0;N<T.length;N++){let w=T[N];i[l][w]=!0}}}else{let A=zf(m,s+1,f);o[l]=o[l].concat(A),G(A,N=>{let w=iy(N.partialPath);G(w,v=>{i[l][v]=!0})})}}}}return n}function fa(t,e,r,n){let i=new Xf(t,nt.ALTERNATION,n);return e.accept(i),WA(i.result,r)}function da(t,e,r,n){let i=new Xf(t,r);e.accept(i);let o=i.result,a=new oy(e,t,r).startWalking(),l=new ze({definition:o}),c=new ze({definition:a});return WA([l,c],n)}function Jf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function zA(t,e){return t.length<e.length&&cr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function VA(t){return cr(t,e=>cr(e,r=>cr(r,n=>le(n.categoryMatches))))}function XA(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Mt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function YA(t,e,r,n){let i=er(t,l=>pU(l,r)),o=vU(t,e,r),s=er(t,l=>yU(l,r)),a=er(t,l=>hU(l,t,n,r));return i.concat(o,s,a)}function pU(t,e){let r=new sy;t.accept(r);let n=r.allProductions,i=Hh(n,mU),o=Er(i,a=>a.length>1);return L(De(o),a=>{let l=jt(a),c=e.buildDuplicateFoundError(t,a),u=$r(l),f={message:c,type:Mt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:u,occurrence:l.idx},m=JA(l);return m&&(f.parameter=m),f})}function mU(t){return`${$r(t)}_#_${t.idx}_#_${JA(t)}`}function JA(t){return t instanceof ce?t.terminalType.name:t instanceof ke?t.nonTerminalName:""}var sy=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function hU(t,e,r,n){let i=[];if(ut(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Mt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function QA(t,e,r){let n=[],i;return tt(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Mt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function ly(t,e,r,n=[]){let i=[],o=Qf(e.definition);if(le(o))return[];{let s=t.name;tt(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Mt.LEFT_RECURSION,ruleName:s});let l=Xi(o,n.concat([t])),c=er(l,u=>{let f=We(n);return f.push(u),ly(t,u,r,f)});return i.concat(c)}}function Qf(t){let e=[];if(le(t))return e;let r=jt(t);if(r instanceof ke)e.push(r.referencedRule);else if(r instanceof ze||r instanceof Ee||r instanceof Ve||r instanceof Xe||r instanceof Fe||r instanceof he)e=e.concat(Qf(r.definition));else if(r instanceof Ue)e=vt(L(r.definition,o=>Qf(o.definition)));else if(!(r instanceof ce))throw Error("non exhaustive match");let n=No(r),i=t.length>1;if(n&&i){let o=xt(t);return e.concat(Qf(o))}else return e}var Dl=class extends vr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function ZA(t,e){let r=new Dl;t.accept(r);let n=r.alternations;return er(n,o=>{let s=mi(o.definition);return er(s,(a,l)=>{let c=Vf([a],[],yi,1);return le(c)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:l}),type:Mt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:l+1}]:[]})})}function ew(t,e,r){let n=new Dl;t.accept(n);let i=n.alternations;return i=Yi(i,s=>s.ignoreAmbiguities===!0),er(i,s=>{let a=s.idx,l=s.maxLookahead||e,c=fa(a,t,l,s),u=gU(c,s,t,r),f=TU(c,s,t,r);return u.concat(f)})}var ay=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function yU(t,e){let r=new Dl;t.accept(r);let n=r.alternations;return er(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Mt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function tw(t,e,r){let n=[];return G(t,i=>{let o=new ay;i.accept(o);let s=o.allProductions;G(s,a=>{let l=Il(a),c=a.maxLookahead||e,u=a.idx,m=da(u,i,l,c)[0];if(le(vt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Mt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function gU(t,e,r,n){let i=[],o=ut(t,(a,l,c)=>(e.definition[c].ignoreAmbiguities===!0||G(l,u=>{let f=[c];G(t,(m,T)=>{c!==T&&Jf(m,u)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Jf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let l=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:l,prefixPath:a.path}),type:Mt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function TU(t,e,r,n){let i=ut(t,(s,a,l)=>{let c=L(a,u=>({idx:l,path:u}));return s.concat(c)},[]);return Gn(er(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let l=s.idx,c=s.path,u=Gt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<l&&zA(m.path,c));return L(u,m=>{let T=[m.idx+1,l+1],C=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Mt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:C,alternatives:T}})}))}function vU(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(tt(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Mt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function rw(t){let e=ra(t,{errMsgProvider:UA}),r={};return G(t.rules,n=>{r[n.name]=n}),qA(r,e.errMsgProvider)}function nw(t){return t=ra(t,{errMsgProvider:xn}),YA(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var iw="MismatchedTokenException",ow="NoViableAltException",sw="EarlyExitException",aw="NotAllInputParsedException",lw=[iw,ow,sw,aw];Object.freeze(lw);function Ji(t){return tt(lw,t.name)}var pa=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Do=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=iw}},Ol=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=ow}},Ll=class extends pa{constructor(e,r){super(e,r),this.name=aw}},Ml=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=sw}};var cy={},fy="InRuleRecoveryException",uy=class extends Error{constructor(e){super(e),this.name=fy}},Zf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=W(e,"recoveryEnabled")?e.recoveryEnabled:xr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=xU)}getTokenToInsert(e){let r=Io(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],l=!1,c=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:m,ruleName:this.getCurrRuleFullName()}),C=new Do(T,c,this.LA(0));C.resyncedTokens=mi(a),this.SAVE_ERROR(C)};for(;!l;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(u,o)?l=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new uy("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||le(r))return!1;let n=this.LA(1);return Kn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return tt(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Kn(e,o=>Nl(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return cy;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?cy:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return vt(e)}getFollowSetFromFollowKey(e){if(e===cy)return[vn];let r=e.ruleName+e.idxInCallingRule+Mf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,vn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return mi(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=We(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function xU(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),l=this.firstAfterRepMap[a];if(l===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];l=new o(T,i).startWalking(),this.firstAfterRepMap[a]=l}let c=l.token,u=l.occurrence,f=l.isEndOfRule;this.RULE_STACK.length===1&&f&&c===void 0&&(c=vn,u=1),!(c===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(c,u,s)&&this.tryInRepetitionRecovery(t,e,r,c)}function ed(t,e,r){return r|e|t}var Lre=32-8;var xi=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:xr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(le(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return er(e,r=>ly(r,r,xn))}validateEmptyOrAlternatives(e){return er(e,r=>ZA(r,xn))}validateAmbiguousAlternationAlternatives(e,r){return er(e,n=>ew(n,r,xn))}validateSomeNonEmptyLookaheadPath(e,r){return tw(e,r,xn)}buildLookaheadForAlternation(e){return jA(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,HA)}buildLookaheadForOptional(e){return KA(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Il(e.prodType),BA)}};var rd=class{initLooksAhead(e){this.dynamicTokensEnabled=W(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:xr.dynamicTokensEnabled,this.maxLookahead=W(e,"maxLookahead")?e.maxLookahead:xr.maxLookahead,this.lookaheadStrategy=W(e,"lookaheadStrategy")?e.lookaheadStrategy:new xi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:l}=RU(r);G(n,c=>{let u=c.idx===0?"":c.idx;this.TRACE_INIT(`${$r(c)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:c.idx,rule:r,maxLookahead:c.maxLookahead||this.maxLookahead,hasPredicates:c.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=ed(this.fullRuleNameToShort[r.name],256,c.idx);this.setLaFuncCache(m,f)})}),G(i,c=>{this.computeLookaheadFunc(r,c.idx,768,"Repetition",c.maxLookahead,$r(c))}),G(o,c=>{this.computeLookaheadFunc(r,c.idx,512,"Option",c.maxLookahead,$r(c))}),G(s,c=>{this.computeLookaheadFunc(r,c.idx,1024,"RepetitionMandatory",c.maxLookahead,$r(c))}),G(a,c=>{this.computeLookaheadFunc(r,c.idx,1536,"RepetitionMandatoryWithSeparator",c.maxLookahead,$r(c))}),G(l,c=>{this.computeLookaheadFunc(r,c.idx,1280,"RepetitionWithSeparator",c.maxLookahead,$r(c))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),l=ed(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(l,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return ed(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},dy=class extends vr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},td=new dy;function RU(t){td.reset(),t.accept(td);let e=td.dslMethods;return td.reset(),e}function hy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function yy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function cw(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function uw(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var bU="name";function gy(t,e){Object.defineProperty(t,bU,{enumerable:!1,configurable:!0,writable:!1,value:e})}function CU(t,e){let r=He(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let l=0;l<a;l++){let c=s[l];c.tokenTypeIdx===void 0&&this[c.name](c.children,e)}}}function fw(t,e){let r=function(){};gy(r,t+"BaseSemantics");let n={visit:function(i,o){if(V(i)&&(i=i[0]),!ur(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=AU(this,e);if(!le(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function dw(t,e,r){let n=function(){};gy(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=CU}),n.prototype=i,n.prototype.constructor=n,n}var Ty;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Ty||(Ty={}));function AU(t,e){return wU(t,e)}function wU(t,e){let r=Gt(e,i=>gr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:Ty.MISSING_METHOD,methodName:i}));return Gn(n)}var sd=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=W(e,"nodeLocationTracking")?e.nodeLocationTracking:xr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=ct,this.cstFinallyStateUpdate=ct,this.cstPostTerminal=ct,this.cstPostNonTerminal=ct,this.cstPostRule=ct;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=yy,this.setNodeLocationFromNode=yy,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=hy,this.setNodeLocationFromNode=hy,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=ct,this.setInitialNodeLocation=ct;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];cw(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];uw(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(ur(this.baseCstVisitorConstructor)){let e=fw(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(ur(this.baseCstVisitorWithDefaultsConstructor)){let e=dw(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var ad=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ma}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?ma:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var ld=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=ha){if(tt(this.definedRulesNames,e)){let s={message:xn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Mt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=ha){let i=QA(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Ji(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Lf(De(this.gastProductionsCache))}};var cd=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ca,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},W(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(V(e)){if(le(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(V(e))this.tokensMap=ut(e,(o,s)=>(o[s.name]=s,o),{});else if(W(e,"modes")&&cr(vt(De(e.modes)),NA)){let o=vt(De(e.modes)),s=na(o);this.tokensMap=ut(s,(a,l)=>(a[l.name]=l,a),{})}else if(lt(e))this.tokensMap=We(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=vn;let n=W(e,"modes")?vt(De(e.modes)):De(e),i=cr(n,o=>le(o.categoryMatches));this.tokenMatcher=i?ca:yi,gi(De(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=W(n,"resyncEnabled")?n.resyncEnabled:ha.resyncEnabled,o=W(n,"recoveryValueFunc")?n.recoveryValueFunc:ha.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Ji(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];return l.recoveredNode=!0,l}else return n(e);else{if(this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];l.recoveredNode=!0,s.partialCstResult=l}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Wf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Pl],a,1536,e,Pl)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let l=i;i=()=>a.call(this)&&l.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Bf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,_l],a,1280,e,_l)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=V(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Ll(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Ji(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Do(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===fy?n:o}}else throw n}saveRecogState(){let e=this.errors,r=We(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),vn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var ud=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=W(e,"errorMessageProvider")?e.errorMessageProvider:xr.errorMessageProvider}SAVE_ERROR(e){if(Ji(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:We(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return We(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=da(e,o,r,this.maxLookahead)[0],l=[];for(let u=1;u<=this.maxLookahead;u++)l.push(this.LA(u));let c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:l,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Ml(c,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=fa(e,i,this.maxLookahead),s=[];for(let c=1;c<=this.maxLookahead;c++)s.push(this.LA(c));let a=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Ol(l,this.LA(1),a))}};var fd=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(ur(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Vf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=jt(e.ruleStack),i=this.getGAstProductions()[r];return new Hf(i,e).startWalking()}};var md={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(md);var pw=!0,mw=Math.pow(2,8)-1,yw=Kf({name:"RECORDING_PHASE_TOKEN",pattern:yt.NA});gi([yw]);var gw=Io(yw,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(gw);var kU={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},dd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return ma}topLevelRuleRecord(e,r){try{let n=new Tr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Ul.call(this,Ee,e,r)}atLeastOneInternalRecord(e,r){Ul.call(this,Ve,r,e)}atLeastOneSepFirstInternalRecord(e,r){Ul.call(this,Xe,r,e,pw)}manyInternalRecord(e,r){Ul.call(this,he,r,e)}manySepFirstInternalRecord(e,r){Ul.call(this,Fe,r,e,pw)}orInternalRecord(e,r){return EU.call(this,e,r)}subruleInternalRecord(e,r,n){if(pd(r),!e||W(e,"ruleName")===!1){let a=new Error(`<SUBRULE${hw(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=jn(this.recordingProdStack),o=e.ruleName,s=new ke({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?kU:md}consumeInternalRecord(e,r,n){if(pd(r),!Zh(e)){let s=new Error(`<CONSUME${hw(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=jn(this.recordingProdStack),o=new ce({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),gw}};function Ul(t,e,r,n=!1){pd(r);let i=jn(this.recordingProdStack),o=gr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),W(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),md}function EU(t,e){pd(e);let r=jn(this.recordingProdStack),n=V(t)===!1,i=n===!1?t:t.DEF,o=new Ue({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});W(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=Al(i,a=>gr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let l=new ze({definition:[]});o.definition.push(l),W(a,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:W(a,"GATE")&&(l.ignoreAmbiguities=!0),this.recordingProdStack.push(l),a.ALT.call(this),this.recordingProdStack.pop()}),md}function hw(t){return t===0?"":`${t}`}function pd(t){if(t<0||t>mw){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${mw+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var hd=class{initPerformanceTracer(e){if(W(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=xr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=Sl(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function Tw(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var ma=Io(vn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ma);var xr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:vi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ha=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Mt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Mt||(Mt={}));function yd(t=void 0){return function(){return t}}var ql=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{kl(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=rw({rules:De(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(le(n)&&this.skipValidations===!1){let i=nw({rules:De(this.gastProductionsCache),tokenTypes:De(this.tokensMap),errMsgProvider:xn,grammarName:r}),o=XA({lookaheadStrategy:this.lookaheadStrategy,rules:De(this.gastProductionsCache),tokenTypes:De(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),le(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=uA(De(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:De(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(De(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!le(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),W(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=W(r,"skipValidations")?r.skipValidations:xr.skipValidations}};ql.DEFER_DEFINITION_ERRORS_HANDLING=!1;Tw(ql,[Zf,rd,sd,ad,cd,ld,ud,fd,dd,hd]);var Gl=class extends ql{constructor(e,r=xr){let n=We(r);n.outputCst=!1,super(e,n)}};function Oo(t,e,r){return`${t.name}_${e}_${r}`}var Qi=1,NU=2,vw=4,xw=5;var Ta=7,_U=8,PU=9,IU=10,DU=11,Rw=12,jl=class{constructor(e){this.target=e}isEpsilon(){return!1}},ya=class extends jl{constructor(e,r){super(e),this.tokenType=r}},Kl=class extends jl{constructor(e){super(e)}isEpsilon(){return!0}},ga=class extends jl{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function bw(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};OU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Lo(e,i,i);o!==void 0&&WU(e,i,o)}return e}function OU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Kt(t,i,void 0,{type:NU}),s=Kt(t,i,void 0,{type:Ta});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function Cw(t,e,r){return r instanceof ce?xy(t,e,r.terminalType,r):r instanceof ke?BU(t,e,r):r instanceof Ue?qU(t,e,r):r instanceof Ee?GU(t,e,r):r instanceof he?LU(t,e,r):r instanceof Fe?MU(t,e,r):r instanceof Ve?FU(t,e,r):r instanceof Xe?UU(t,e,r):Lo(t,e,r)}function LU(t,e,r){let n=Kt(t,e,r,{type:xw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return ww(t,e,r,i)}function MU(t,e,r){let n=Kt(t,e,r,{type:xw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r)),o=xy(t,e,r.separator,r);return ww(t,e,r,i,o)}function FU(t,e,r){let n=Kt(t,e,r,{type:vw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return Aw(t,e,r,i)}function UU(t,e,r){let n=Kt(t,e,r,{type:vw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r)),o=xy(t,e,r.separator,r);return Aw(t,e,r,i,o)}function qU(t,e,r){let n=Kt(t,e,r,{type:Qi});Zi(t,n);let i=L(r.definition,s=>Cw(t,e,s));return va(t,e,n,r,...i)}function GU(t,e,r){let n=Kt(t,e,r,{type:Qi});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return jU(t,e,r,i)}function Lo(t,e,r){let n=Gt(L(r.definition,i=>Cw(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:HU(t,n)}function Aw(t,e,r,n,i){let o=n.left,s=n.right,a=Kt(t,e,r,{type:DU});Zi(t,a);let l=Kt(t,e,r,{type:Rw});return o.loopback=a,l.loopback=a,t.decisionMap[Oo(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,Pt(s,a),i===void 0?(Pt(a,o),Pt(a,l)):(Pt(a,l),Pt(a,i.left),Pt(i.right,o)),{left:o,right:l}}function ww(t,e,r,n,i){let o=n.left,s=n.right,a=Kt(t,e,r,{type:IU});Zi(t,a);let l=Kt(t,e,r,{type:Rw}),c=Kt(t,e,r,{type:PU});return a.loopback=c,l.loopback=c,Pt(a,o),Pt(a,l),Pt(s,c),i!==void 0?(Pt(c,l),Pt(c,i.left),Pt(i.right,o)):Pt(c,a),t.decisionMap[Oo(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:l}}function jU(t,e,r,n){let i=n.left,o=n.right;return Pt(i,o),t.decisionMap[Oo(e,"Option",r.idx)]=i,n}function Zi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function va(t,e,r,n,...i){let o=Kt(t,e,n,{type:_U,start:r});r.end=o;for(let a of i)a!==void 0?(Pt(r,a.left),Pt(a.right,o)):Pt(r,o);let s={left:r,right:o};return t.decisionMap[Oo(e,KU(n),n.idx)]=r,s}function KU(t){if(t instanceof Ue)return"Alternation";if(t instanceof Ee)return"Option";if(t instanceof he)return"Repetition";if(t instanceof Fe)return"RepetitionWithSeparator";if(t instanceof Ve)return"RepetitionMandatory";if(t instanceof Xe)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function HU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let l=a instanceof ga,c=a,u=e[o+1].left;s.left.type===Qi&&s.right.type===Qi&&a!==void 0&&(l&&c.followState===s.right||a.target===s.right)?(l?c.followState=u:a.target=u,zU(t,s.right)):Pt(s.right,u)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function xy(t,e,r,n){let i=Kt(t,e,n,{type:Qi}),o=Kt(t,e,n,{type:Qi});return Ry(i,new ya(o,r)),{left:i,right:o}}function BU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Kt(t,e,r,{type:Qi}),s=Kt(t,e,r,{type:Qi}),a=new ga(i,n,s);return Ry(o,a),{left:o,right:s}}function WU(t,e,r){let n=t.ruleToStartState.get(e);Pt(n,r.left);let i=t.ruleToStopState.get(e);return Pt(r.right,i),{left:n,right:i}}function Pt(t,e){let r=new Kl(e);Ry(t,r)}function Kt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function Ry(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function zU(t,e){t.states.splice(t.states.indexOf(e),1)}var Hl={},xa=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=by(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function by(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function VU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var gd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},Sw=new gd,Bl=class extends xi{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=bw(e.rules),this.dfas=XU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=Oo(n,"Alternation",r),u=this.atn.decisionMap[l].decision,f=L(Yf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(kw(f,!1)&&!o){let m=ut(f,(T,C,A)=>(G(C,N=>{N&&(T[N.tokenTypeIdx]=A,G(N.categoryMatches,w=>{T[w]=A}))}),T),{});return i?function(T){var C;let A=this.LA(1),N=m[A.tokenTypeIdx];if(T!==void 0&&N!==void 0){let w=(C=T[N])===null||C===void 0?void 0:C.GATE;if(w!==void 0&&w.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new gd,C=m===void 0?0:m.length;for(let N=0;N<C;N++){let w=m?.[N].GATE;T.set(N,w===void 0||w.call(this))}let A=Cy.call(this,s,u,T,a);return typeof A=="number"?A:void 0}:function(){let m=Cy.call(this,s,u,Sw,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=Oo(n,i,r),u=this.atn.decisionMap[l].decision,f=L(Yf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(kw(f)&&f[0][0]&&!o){let m=f[0],T=vt(m);if(T.length===1&&le(T[0].categoryMatches)){let A=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let C=ut(T,(A,N)=>(N!==void 0&&(A[N.tokenTypeIdx]=!0,G(N.categoryMatches,w=>{A[w]=!0})),A),{});return function(){let A=this.LA(1);return C[A.tokenTypeIdx]===!0}}}return function(){let m=Cy.call(this,s,u,Sw,a);return typeof m=="object"?!1:m===0}}};function kw(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function XU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=VU(t.decisionStates[n],n);return r}function Cy(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=sq(i.atnStartState);o=Nw(i,$w(a)),i.start=o}return YU.apply(this,[i,o,r,n])}function YU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let l=rq(i,a);if(l===void 0&&(l=JU.apply(this,[t,i,a,o,r,n])),l===Hl)return tq(s,i,a);if(l.isAcceptState===!0)return l.prediction;i=l,s.push(a),a=this.LA(o++)}}function JU(t,e,r,n,i,o){let s=nq(e.configs,r,i);if(s.size===0)return Ew(t,e,r,Hl),Hl;let a=$w(s),l=oq(s,i);if(l!==void 0)a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l;else if(uq(s)){let c=tA(s.alts);a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c,QU.apply(this,[t,n,s.alts,o])}return a=Ew(t,e,r,a),a}function QU(t,e,r,n){let i=[];for(let c=1;c<=e;c++)i.push(this.LA(c).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,l=ZU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(l)}function ZU(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${eq(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function eq(t){if(t instanceof ke)return"SUBRULE";if(t instanceof Ee)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof he)return"MANY";if(t instanceof ce)return"CONSUME";throw Error("non exhaustive match")}function tq(t,e,r){let n=er(e.configs.elements,o=>o.state.transitions),i=lA(n.filter(o=>o instanceof ya).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function rq(t,e){return t.edges[e.tokenTypeIdx]}function nq(t,e,r){let n=new xa,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===Ta){i.push(s);continue}let a=s.state.transitions.length;for(let l=0;l<a;l++){let c=s.state.transitions[l],u=iq(c,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new xa;for(let s of n.elements)Td(s,o)}if(i.length>0&&!lq(o))for(let s of i)o.add(s);return o}function iq(t,e){if(t instanceof ya&&Nl(e,t.tokenType))return t.target}function oq(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function $w(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function Ew(t,e,r,n){return n=Nw(t,n),e.edges[r.tokenTypeIdx]=n,n}function Nw(t,e){if(e===Hl)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function sq(t){let e=new xa,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};Td(o,e)}return e}function Td(t,e){let r=t.state;if(r.type===Ta){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};Td(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=aq(t,o);s!==void 0&&Td(s,e)}}function aq(t,e){if(e instanceof Kl)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ga){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function lq(t){for(let e of t.elements)if(e.state.type===Ta)return!0;return!1}function cq(t){for(let e of t.elements)if(e.state.type!==Ta)return!1;return!0}function uq(t){if(cq(t))return!0;let e=fq(t.elements);return dq(e)&&!pq(e)}function fq(t){let e=new Map;for(let r of t){let n=by(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function dq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function pq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var Ay=me(lo(),1);var vd=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new Sy(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new bd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Rd(e.startOffset,e.image.length,Xa(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Rd(r.startOffset,r.image.length,Xa(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:l}=s;if($n(s)&&n>a&&i<l){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},xd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},Rd=class extends xd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},bd=class extends xd{constructor(){super(...arguments),this.content=new wy(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:Ay.Position.create(0,0),end:Ay.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},wy=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},Sy=class extends bd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Ey=Symbol("Datatype");function ky(t){return t.$type===Ey}var _w="\u200B",Pw=t=>t.endsWith(_w)?t:t+_w,Cd=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Ny(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},Ad=class extends Cd{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new vd,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Ur(e)?Ey:hn(e),i=this.wrapper.DEFINE_RULE(Pw(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===Ey&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),l=this.current;if(s){let c=mt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,c,o,a)}else if(ky(l)){let c=i.image;mt(n)||(c=this.converter.convert(c,o).toString()),l.value+=c}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(ky(s))s.value+=e.toString();else{let a=e.$type,l=this.assignWithoutOverride(e,s);a&&(l.$type=a);let c=l;this.stack.pop(),this.stack.push(c)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return jv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),ky(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Ie(e,be);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Xt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},$y=class{buildMismatchTokenMessage(e){return vi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return vi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return vi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return vi.buildEarlyExitMessage(e)}},Wl=class extends $y{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},wd=class extends Cd{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(Pw(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},mq={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Wl},Ny=class extends Gl{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},mq),{lookaheadStrategy:n?new xi({maxLookahead:r.maxLookahead}):new Bl}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var zl=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function Sd(t){throw new Error("Error! The input value was not handled.")}function Ed(t,e,r){return hq({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function hq(t,e){let r=vs(e,!1),n=oe(e.rules).filter(B).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Mo(o,i.definition)))}}function Mo(t,e,r=!1){let n;if(mt(e))n=bq(t,e);else if(_e(e))n=yq(t,e);else if(be(e))n=Mo(t,e.terminal);else if(Xt(e))n=Iw(t,e);else if(Pe(e))n=gq(t,e);else if(Dr(e))n=vq(t,e);else if(Or(e))n=xq(t,e);else if(Ut(e))n=Rq(t,e);else throw new zl(e.$cstNode,`Unexpected element type: ${e.$type}`);return Dw(t,r?void 0:kd(e),n,e.cardinality)}function yq(t,e){let r=hn(e);return()=>t.parser.action(r,e)}function gq(t,e){let r=e.rule.ref;if(B(r)){let n=t.subrule++,i=e.arguments.length>0?Tq(r,e.arguments):()=>({});return o=>t.parser.subrule(n,Ow(t,r),e,i(o))}else if(we(r)){let n=t.consume++,i=_y(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)Sd(r);else throw new zl(e.$cstNode,`Undefined rule type: ${e.$type}`)}function Tq(t,e){let r=e.map(n=>Ri(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function Ri(t){if(av(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)||r(n)}else if(ov(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)&&r(n)}else if(dv(t)){let e=Ri(t.value);return r=>!e(r)}else if(ls(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(uv(t)){let e=!!t.true;return()=>e}Sd(t)}function vq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Mo(t,i,!0)},s=kd(i);s&&(o.GATE=Ri(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function xq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);let r=[];for(let a of e.elements){let l={ALT:Mo(t,a,!0)},c=kd(a);c&&(l.GATE=Ri(c)),r.push(l)}let n=t.or++,i=(a,l)=>{let c=l.getRuleStack().join("-");return`uGroup_${a}_${c}`},o=a=>t.parser.alternatives(n,r.map((l,c)=>{let u={ALT:()=>!0},f=t.parser;u.ALT=()=>{if(l.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let C=f.unorderedGroups.get(T);typeof C?.[c]>"u"&&(C[c]=!0)}};let m=l.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[c]},u})),s=Dw(t,kd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function Rq(t,e){let r=e.elements.map(n=>Mo(t,n));return n=>r.forEach(i=>i(n))}function kd(t){if(Ut(t))return t.guardCondition}function Iw(t,e,r=e.terminal){if(r)if(Pe(r)&&B(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,Ow(t,r.rule.ref),e,i)}else if(Pe(r)&&we(r.rule.ref)){let n=t.consume++,i=_y(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(mt(r)){let n=t.consume++,i=_y(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=pl(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+hn(e.type.ref));return Iw(t,e,i)}}function bq(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function Dw(t,e,r,n){let i=e&&Ri(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:yd(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:yd(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else Sd(n)}function Ow(t,e){let r=Cq(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Cq(t,e){if(B(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!B(n);)(Ut(n)||Dr(n)||Or(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function _y(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function Lw(t){let e=t.Grammar,r=t.parser.Lexer,n=new wd(t);return Ed(e,n,r.definition),n.finalize(),n}function Mw(t){let e=Aq(t);return e.finalize(),e}function Aq(t){let e=t.Grammar,r=t.parser.Lexer,n=new Ad(t);return Ed(e,n,r.definition)}var $d=class{buildTokens(e,r){let n=oe(vs(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&uh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(we).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Jr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=uh(r)?yt.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(B).flatMap(i=>Ze(i).filter(mt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(ux(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&fx("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Nd=class{convert(e,r){let n=r.grammarSource;if(Xt(n)&&(n=Nu(n)),Pe(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return Eq(r);case"STRING":return wq(r);case"ID":return kq(r)}switch((i=Ao(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return _q(r);case"boolean":return Pq(r);case"bigint":return $q(r);case"date":return Nq(r);default:return r}}};function wq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=Sq(i)}else e+=n}return e}function Sq(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function kq(t){return t.charAt(0)==="^"?t.substring(1):t}function Eq(t){return parseInt(t)}function $q(t){return BigInt(t)}function Nq(t){return new Date(t)}function _q(t){return Number(t)}function Pq(t){return t.toLowerCase()==="true"}var Fw=me(Ae(),1);var _d=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=Fw.CancellationToken.None){for(let n of ni(e.parseResult.value))await et(r),iu(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(ns(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if($t(this._ref))return this._ref;if(HT(this._nodeDescription)){let l=o.loadAstNode(this._nodeDescription);this._ref=l??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let l=o.getLinkedNode({reference:s,container:e,property:r});if(l.error&&ie(e).state<Ke.ComputedScopes)return;this._ref=(a=l.node)!==null&&a!==void 0?a:l.error,this._nodeDescription=l.descr}return $t(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return ns(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(ns(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ie(e.container);n.state<Ke.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function qw(t){return typeof t.$comment=="string"}function Uw(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Pd=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,l,c;if(!this.ignoreProperties.has(e))if(ei(r)){let u=r.ref,f=n?r.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(l=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&l!==void 0?l:"Could not resolve reference"}}else{let u;if(o&&$t(r)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ie(r).uri.toString()}catch{}return i&&!e&&$t(r)&&(u??(u=Object.assign({},r)),u.$sourceText=(c=r.$cstNode)===null||c===void 0?void 0:c.text),s&&$t(r)&&(u??(u=Object.assign({},r)),u.$comment=this.commentProvider.getComment(r)),u??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Pi(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,l]of Object.entries(e))if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];Uw(u)?l[c]=this.reviveReference(e,a,r,u):$t(u)&&this.linkNode(u,r,e,a,c)}else Uw(l)?e[a]=this.reviveReference(e,a,r,l):$t(l)&&this.linkNode(l,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Id=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=xe.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var Gw=me(Ae(),1);var Dd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ie(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=or((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:or(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Od=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Gw.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ni(i))await et(r),iu(o).filter(s=>!ns(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ie(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:or(n),local:xe.equals(r.documentUri,i)}}};var Ld=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),l=parseInt(o.substring(s+1)),c=i[a];return c?.[l]}return i[o]},e)}};var jw=me(kt(),1),Md=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(jw.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var Ra=me(Ae(),1);var Fd=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Me,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Ra.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===Ke.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=Ke.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let l=this.buildState.get(a),c=(i=l?.result)===null||i===void 0?void 0:i.validationChecks;if(c){let f=((o=r.validation.categories)!==null&&o!==void 0?o:ys.all).filter(m=>!c.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:l.result}),s.state=Ke.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=Ra.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=oe(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,Ke.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await et(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<Ke.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),Ra.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,Ke.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,Ke.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,Ke.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,Ke.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,Ke.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,Ke.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await et(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Ra.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await et(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,l=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...l):e.diagnostics=l;let c=this.buildState.get(e.uri.toString());if(c){(n=c.result)!==null&&n!==void 0||(c.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:ys.all;c.result.validationChecks?c.result.validationChecks.push(...u):c.result.validationChecks=[...u]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Py=me(Ae(),1);var Ud=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new Cu,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ie(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{xe.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),oe(i)}allElements(e,r){let n=oe(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var Kw=me(Ae(),1);var qd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Kw.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await et(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Qt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=xe.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=xe.extname(r.uri);return n.includes(o)}return!1}};var Gd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=Hw(r)?Object.values(r):r;this.chevrotainLexer=new yt(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(Hw(e))return e;let r=Bw(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function Iq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function Bw(t){return t&&"modes"in t&&"defaultMode"in t}function Hw(t){return!Iq(t)&&!Bw(t)}var Ce=me(Ae(),1);function Vw(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Ce.Position.create(0,0));let o=Yw(t),s=Oy(n),a=Oq({lines:o,position:i,options:s});return qq({index:0,tokens:a,position:i})}function Xw(t,e){let r=Oy(e),n=Yw(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function Yw(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Za)}var Ww=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,Dq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Oq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let l=a===0,c=a===t.lines.length-1,u=t.lines[a],f=0;if(l&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(u);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(u);T&&(f=T.index+T[0].length)}if(c){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(u);T&&(u=u.substring(0,T.index))}if(u=u.substring(0,Uq(u)),Dy(u,0)>=u.length){if(i.length>0){let T=Ce.Position.create(o,s);i.push({type:"break",content:"",range:Ce.Range.create(T,T)})}}else{Ww.lastIndex=f;let T=Ww.exec(u);if(T){let C=T[0],A=T[1],N=Ce.Position.create(o,s+f),w=Ce.Position.create(o,s+f+C.length);i.push({type:"tag",content:A,range:Ce.Range.create(N,w)}),f+=C.length,f=Dy(u,f)}if(f<u.length){let C=u.substring(f),A=Array.from(C.matchAll(Dq));i.push(...Lq(A,C,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Lq(t,e,r,n){let i=[];if(t.length===0){let o=Ce.Position.create(r,n),s=Ce.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Ce.Range.create(o,s)})}else{let o=0;for(let a of t){let l=a.index,c=e.substring(o,l);c.length>0&&i.push({type:"text",content:e.substring(o,l),range:Ce.Range.create(Ce.Position.create(r,o+n),Ce.Position.create(r,l+n))});let u=c.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:Ce.Range.create(Ce.Position.create(r,o+u+n),Ce.Position.create(r,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:Ce.Range.create(Ce.Position.create(r,o+u+n),Ce.Position.create(r,o+u+m.length+n))})}else i.push({type:"text",content:"",range:Ce.Range.create(Ce.Position.create(r,o+u+n),Ce.Position.create(r,o+u+n))});o=l+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:Ce.Range.create(Ce.Position.create(r,o+n),Ce.Position.create(r,o+n+s.length))})}return i}var Mq=/\S/,Fq=/\s*$/;function Dy(t,e){let r=t.substring(e).match(Mq);return r?e+r.index:t.length}function Uq(t){let e=t.match(Fq);if(e&&typeof e.index=="number")return e.index}function qq(t){var e,r,n,i;let o=Ce.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new jd([],Ce.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let c=Gq(t,s[s.length-1]);c&&s.push(c)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,l=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new jd(s,Ce.Range.create(a,l))}function Gq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return Qw(t,!1);if(r.type==="text"||r.type==="inline-tag")return Jw(t);jq(r,e),t.index++}function jq(t,e){if(e){let r=new Kd("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function Jw(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Kq(t)),n=e,e=t.tokens[t.index];return new Xl(i,Ce.Range.create(r.range.start,n.range.end))}function Kq(t){return t.tokens[t.index].type==="inline-tag"?Qw(t,!0):Zw(t)}function Qw(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=Zw(t);return new Vl(n,new Xl([o],o.range),e,Ce.Range.create(r.range.start,o.range.end))}else{let o=Jw(t);return new Vl(n,o,e,Ce.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Vl(n,new Xl([],o),e,o)}}function Zw(t){let e=t.tokens[t.index++];return new Kd(e.content,e.range)}function Oy(t){if(!t)return Oy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:Iy(e,!0),end:Iy(r,!1),line:Iy(n,!0)}}function Iy(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?si(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var jd=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=zw(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=zw(r)+i}return r.trim()}},Vl=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=Hq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Hq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let l=Dy(e,o);s=e.substring(l),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:Bq(e,s)}}function Bq(t,e){try{return Qt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Xl=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Kd=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function zw(t){return t.endsWith(`
`)?`
`:`

`}var Hd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&Xw(r))return Vw(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,l=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${l.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ie(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(l=>l.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Bd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return qw(e)?e.$comment:(r=YT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function vl(t){return{documentation:{CommentProvider:e=>new Bd(e),DocumentationProvider:e=>new Hd(e)},parser:{GrammarConfig:e=>mR(e),LangiumParser:e=>Mw(e),CompletionParser:e=>Lw(e),ValueConverter:()=>new Nd,TokenBuilder:()=>new $d,Lexer:e=>new Gd(e),ParserErrorMessageProvider:()=>new Wl},lsp:{CompletionProvider:e=>new Es(e),DocumentSymbolProvider:e=>new Ku(e),HoverProvider:e=>new Wu(e),FoldingRangeProvider:e=>new Ns(e),ReferencesProvider:e=>new Qu(e),DefinitionProvider:e=>new Is(e),DocumentHighlightProvider:e=>new ju(e),RenameProvider:e=>new Zu(e)},workspace:{AstNodeLocator:()=>new Ld,AstNodeDescriptionProvider:e=>new Dd(e),ReferenceDescriptionProvider:e=>new Od(e)},references:{Linker:e=>new _d(e),NameProvider:()=>new ms,ScopeProvider:e=>new Ss(e),ScopeComputation:e=>new ws(e),References:e=>new _s(e)},serializer:{JsonSerializer:e=>new Pd(e)},validation:{DocumentValidator:e=>new ku(e),ValidationRegistry:e=>new Tu(e)},shared:()=>t.shared}}function xl(t){return{ServiceRegistry:()=>new Id,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Xu(e),WorkspaceSymbolProvider:e=>new ef(e),NodeKindProvider:()=>new Yu,FuzzyMatcher:()=>new Bu},workspace:{LangiumDocuments:e=>new Vu(e),LangiumDocumentFactory:e=>new zu(e),DocumentBuilder:e=>new Fd(e),TextDocuments:()=>new eS.TextDocuments(rs),IndexManager:e=>new Ud(e),WorkspaceManager:e=>new qd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new gu,ConfigurationProvider:e=>new Md(e)}}}var Aa=me(rS(),1);var Wq="Instruction";var zq="Type";var nS="Block";var iS="Command";var Vq="DeclarationVariable";var oS="ExpressionBase";var Xq="BooleanType";var sS="Distance";var Yq="NumberType";var Jq="Time";var Qq="IF";var Zq="LOOP";var eG="DirectionCommand";var aS="ReadSensorCommand";var tG="RotateCommand";var rG="SpeedCommand";var nG="Affectation";var lS="Call";var cS="Expression";var iG="CM";var oG="Mm";var sG="DistanceSensorCommand";var aG="TimeSensorCommand";var lG="CallFunction";var cG="CallVariable";var uG="And";var fG="BooleanExp";var dG="ComparaisonAri";var pG="ComparaisonDistance";var mG="ComparaisonTime";var hG="Equals";var yG="MultDiv";var gG="MultDivDistance";var TG="MultDivTime";var vG="Not";var xG="Or";var RG="PlusMinus";var bG="PlusMinusDistance";var CG="PlusMinusTime";var AG="PrimaryExprAri";var wG="PrimaryExprBool";var SG="PrimaryExprDistance";var kG="PrimaryExprTime";var Yl=class extends po{getAllTypes(){return["Affectation","And","Block","BooleanExp","BooleanType","CM","Call","CallFunction","CallVariable","Command","ComparaisonAri","ComparaisonDistance","ComparaisonTime","DeclarationVariable","DirectionCommand","Distance","DistanceExpression","DistanceSensorCommand","Equals","Expression","ExpressionBase","FunctionN","IF","Instruction","LOOP","Mm","MultDiv","MultDivDistance","MultDivTime","Not","NumberType","Or","Parameter","PlusMinus","PlusMinusDistance","PlusMinusTime","PrimaryExprAri","PrimaryExprBool","PrimaryExprDistance","PrimaryExprTime","ReadSensorCommand","Robot","RotateCommand","SpeedCommand","Time","TimeExpression","TimeSensorCommand","Type","TypeClass"]}computeIsSubtype(e,r){switch(e){case nG:case lS:case cS:return this.isSubtype(oS,r);case uG:case fG:case dG:case pG:case mG:case hG:case yG:case gG:case TG:case vG:case xG:case RG:case bG:case CG:case AG:case wG:case SG:case kG:return this.isSubtype(cS,r);case nS:case iS:case Vq:case oS:return this.isSubtype(Wq,r);case Xq:case sS:case Yq:case Jq:return this.isSubtype(zq,r);case lG:case cG:return this.isSubtype(lS,r);case iG:case oG:return this.isSubtype(sS,r);case eG:case aS:case tG:case rG:return this.isSubtype(iS,r);case sG:case aG:return this.isSubtype(aS,r);case Qq:case Zq:return this.isSubtype(nS,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"FunctionN":return{name:"FunctionN",mandatory:[{name:"instruction",type:"array"},{name:"parameters",type:"array"}]};case"Robot":return{name:"Robot",mandatory:[{name:"functions",type:"array"}]};case"Block":return{name:"Block",mandatory:[{name:"instruction",type:"array"},{name:"instructionElse",type:"array"}]};case"BooleanType":return{name:"BooleanType",mandatory:[{name:"value",type:"boolean"}]};case"CallFunction":return{name:"CallFunction",mandatory:[{name:"parameters",type:"array"}]};default:return{name:e,mandatory:[]}}}},jle=new Yl;var Wd,uS=()=>Wd??(Wd=yu(`{
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
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
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
              "$ref": "#/rules@41"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
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
                "$ref": "#/rules@38"
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
                "$ref": "#/rules@38"
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
                "$ref": "#/rules@39"
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
                "$ref": "#/rules@39"
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
        "$ref": "#/interfaces@16"
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
        "$ref": "#/interfaces@16"
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
        "$ref": "#/interfaces@16"
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
        "$ref": "#/interfaces@16"
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
                "$ref": "#/rules@45"
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
                "$ref": "#/rules@39"
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
                "$ref": "#/rules@38"
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
              "$type": "Alternatives",
              "elements": [
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
                    "$ref": "#/rules@34"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@35"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@36"
                  },
                  "arguments": []
                }
              ]
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
              "$type": "Alternatives",
              "elements": [
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
                    "$ref": "#/rules@34"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@35"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@36"
                  },
                  "arguments": []
                }
              ]
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
                    "feature": "instructionElse",
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
                    "feature": "instructionElse",
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
                "$ref": "#/rules@38"
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
                "$ref": "#/rules@38"
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
                "$ref": "#/rules@44"
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
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "AND"
                }
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
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "OR"
                }
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
                "$type": "Assignment",
                "feature": "operateur",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "NOT"
                }
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
        "$ref": "#/interfaces@16"
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
      "name": "ComparaisonAri",
      "returnType": {
        "$ref": "#/interfaces@16"
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
                "$ref": "#/rules@17"
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
                  "value": "<"
                },
                {
                  "$type": "Keyword",
                  "value": ">"
                },
                {
                  "$type": "Keyword",
                  "value": "<="
                },
                {
                  "$type": "Keyword",
                  "value": ">="
                },
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
                "$ref": "#/rules@17"
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
      "name": "ComparaisonDistance",
      "returnType": {
        "$ref": "#/interfaces@16"
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
                "$ref": "#/rules@19"
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
                  "value": "<"
                },
                {
                  "$type": "Keyword",
                  "value": ">"
                },
                {
                  "$type": "Keyword",
                  "value": "<="
                },
                {
                  "$type": "Keyword",
                  "value": ">="
                },
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
                "$ref": "#/rules@19"
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
      "name": "ComparaisonTime",
      "returnType": {
        "$ref": "#/interfaces@16"
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
                "$ref": "#/rules@41"
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
                  "value": "<"
                },
                {
                  "$type": "Keyword",
                  "value": ">"
                },
                {
                  "$type": "Keyword",
                  "value": "<="
                },
                {
                  "$type": "Keyword",
                  "value": ">="
                },
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
                "$ref": "#/rules@41"
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
              "$ref": "#/rules@48"
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
              "$ref": "#/rules@48"
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
                  "$ref": "#/rules@48"
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
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
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
                "$ref": "#/rules@45"
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
                "$ref": "#/rules@45"
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
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
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
                    "$ref": "#/rules@42"
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
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
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
                    "$ref": "#/rules@43"
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
                "$ref": "#/rules@40"
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
        "$ref": "#/interfaces@47"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@46"
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
        "$ref": "#/interfaces@48"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@37"
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
              "$ref": "#/interfaces@48"
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
              "$ref": "#/interfaces@48"
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
                  "$ref": "#/interfaces@48"
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
        },
        {
          "$type": "TypeAttribute",
          "name": "instructionElse",
          "isOptional": true,
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          }
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
                  "$ref": "#/interfaces@47"
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
      "name": "ComparaisonAri",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "ComparaisonDistance",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "ComparaisonTime",
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
}`));var EG={languageId:"robot",fileExtensions:[".rob"],caseInsensitive:!1},fS={AstReflection:()=>new Yl},dS={Grammar:()=>uS(),LanguageMetaData:()=>EG,parser:{}};function pS(t){let e=t.validation.ValidationRegistry,r=t.validation.RobotValidator,n={Robot:r.checkRobot};e.register(n,r)}var zd=class{constructor(){this.functionVariableMap=new Map}checkRobot(e,r){this.traverseFunctionDeclarations(e,r),this.traverseFunctionCalls(e,r),this.checkReturn(e,r)}traverseFunctionDeclarations(e,r){e.functions.forEach(n=>{let i=new Set;n.parameters.forEach(o=>{i.has(o.nom)?r("error","Parameters' name should be different.",{node:o,property:"nom"}):i.add(o.nom)}),this.functionVariableMap.set(n.name,i)})}checkCall(e,r,n){switch(e.$type){case"CallVariable":let i=e;r.has(i.nom)||n("error","Variable not declared.",{node:i,property:"nom"});break;case"CallFunction":let o=e;this.functionVariableMap.has(o.nom)?o.parameters.forEach(a=>{this.checkCall(a,r,n)}):n("error","Function not declared.",{node:o,property:"nom"});break;case"Expression":let s=e;this.checkExpression(s,r,n);break}}traverseFunctionCalls(e,r){e.functions.forEach(n=>{n.instruction.forEach(i=>{let o=this.functionVariableMap.get(n.name);o===void 0?r("error","Function not declared.",{node:n,property:"name"}):this.traverseInstructions(i,o,r)})})}traverseInstructions(e,r,n){switch(e.$type){case"DeclarationVariable":let i=e;r.has(i.nom)?n("error","Variable already declared.",{node:i,property:"nom"}):(this.checkCall(i.expressionbase,r,n),r.add(i.nom));break;case"Affectation":let o=e;r.has(o.callvariable.nom)||n("error","Variable not declared.",{node:o}),this.checkCall(o.expressionbase,r,n);break;case"LOOP":let s=e;this.checkCall(s.expression,r,n),s.instruction.forEach(l=>{this.traverseInstructions(l,r,n)});break;case"IF":let a=e;this.checkCall(a.expression,r,n),a.instruction.forEach(l=>{this.traverseInstructions(l,r,n)});break}}checkReturn(e,r){e.functions.forEach(n=>{let i=n.returnType!==void 0,o=n.returnedValue!==void 0;i!==o?i?r("error","Function should have a return value.",{node:n,property:"name"}):r("error","Function should not have a return value.",{node:n,property:"name"}):i&&this.checkCall(n.returnedValue,this.functionVariableMap.get(n.name),r)})}checkExpression(e,r,n){switch(e.$type){case"Expression":let i=e;this.checkExpression(i.expr1,r,n),this.checkExpression(i.expr2,r,n);break;case"And":let o=e;this.checkExpression(o.expr1,r,n),this.checkExpression(o.expr2,r,n);break;case"Or":let s=e;this.checkExpression(s.expr1,r,n),this.checkExpression(s.expr2,r,n);break;case"Equals":let a=e;this.checkExpression(a.expr1,r,n),this.checkExpression(a.expr2,r,n);break;case"ComparaisonAri":let l=e;this.checkExpression(l.expr1,r,n),this.checkExpression(l.expr2,r,n);break;case"ComparaisonDistance":let c=e;this.checkExpression(c.expr1,r,n),this.checkExpression(c.expr2,r,n);break;case"ComparaisonTime":let u=e;this.checkExpression(u.expr1,r,n),this.checkExpression(u.expr2,r,n);break;case"PrimaryExprBool":let f=e;switch(f.expr.$type){case"CallVariable":let D=f.expr;r.has(D.nom)||n("error","Variable not declared.",{node:D,property:"nom"});break;case"CallFunction":let K=f.expr;this.functionVariableMap.has(K.nom)?K.parameters.forEach(se=>{this.checkCall(se,r,n)}):n("error","Function not declared.",{node:K,property:"nom"});break}break;case"PlusMinus":let m=e;this.checkExpression(m.expr1,r,n),this.checkExpression(m.expr2,r,n);break;case"MultDiv":let T=e;this.checkExpression(T.expr1,r,n),this.checkExpression(T.expr1,r,n);break;case"PlusMinusDistance":let C=e;this.checkExpression(C.expr1,r,n),this.checkExpression(C.expr2,r,n);break;case"MultDivDistance":let A=e;this.checkExpression(A.expr1,r,n),this.checkExpression(A.expr2,r,n);break;case"PlusMinusTime":let N=e;this.checkExpression(N.expr1,r,n),this.checkExpression(N.expr2,r,n);break;case"MultDivTime":let w=e;this.checkExpression(w.expr1,r,n),this.checkExpression(w.expr2,r,n);break;case"PrimaryExprTime":let v=e;switch(v.expr.$type){case"CallVariable":let D=v.expr;r.has(D.nom)||n("error","Variable not declared.",{node:D,property:"nom"});break;case"CallFunction":let K=v.expr;this.functionVariableMap.has(K.nom)?K.parameters.forEach(se=>{this.checkCall(se,r,n)}):n("error","Function not declared.",{node:K,property:"nom"});break}break;case"PrimaryExprDistance":let g=e;switch(g.expr.$type){case"CallVariable":let D=g.expr;r.has(D.nom)||n("error","Variable not declared.",{node:D,property:"nom"});break;case"CallFunction":let K=g.expr;this.functionVariableMap.has(K.nom)?K.parameters.forEach(se=>{this.checkCall(se,r,n)}):n("error","Function not declared.",{node:K,property:"nom"});break}break;case"PrimaryExprAri":let $=e;switch($.expr.$type){case"CallVariable":let D=$.expr;r.has(D.nom)||n("error","Variable not declared.",{node:D,property:"nom"});break;case"CallFunction":let K=$.expr;this.functionVariableMap.has(K.nom)?K.parameters.forEach(se=>{this.checkCall(se,r,n)}):n("error","Function not declared.",{node:K,property:"nom"});break}break}}};function Y(t,e){switch(t.$type){case"FunctionN":return t.accept(e);case"Instruction":return console.log("instruction"),t.accept(e);case"DirectionCommand":return console.log("direction"),t.accept(e);case"DistanceExpression":return console.log("distanceEXP"),t.accept(e);case"Distance":return console.log("distance"),t.accept(e);case"NumberType":return console.log("number"),t.accept(e);case"RotateCommand":return console.log("rotate"),t.accept(e);case"SpeedCommand":return console.log("speed"),t.accept(e);case"Time":return console.log("time"),t.accept(e);case"TimeExpression":return console.log("timeEXP"),t.accept(e);case"DistanceSensorCommand":return console.log("distSensor"),t.accept(e);case"TimeSensorCommand":return console.log("timeSensor"),t.accept(e);case"CallFunction":return console.log("callFunction"),t.accept(e);case"CallVariable":return console.log("callVariable"),t.accept(e);case"Affectation":return console.log("affectation"),t.accept(e);case"PrimaryExprBool":return console.log("primaryExprBool"),t.accept(e);case"PrimaryExprAri":return console.log("primaryExprAri"),t.accept(e);case"PrimaryExprDistance":return console.log("primaryExprDistance"),t.accept(e);case"MultDiv":return console.log("multDiv"),t.accept(e);case"PlusMinus":return console.log("plusMinus"),t.accept(e);case"MultDivDistance":return console.log("multDivDistance"),t.accept(e);case"PlusMinusDistance":return console.log("plusMinusDistance"),t.accept(e);case"MultDivTime":return console.log("multDivTime"),t.accept(e);case"PlusMinusTime":return console.log("plusMinusTime"),t.accept(e);case"Equals":return console.log("equals"),t.accept(e);case"Or":return console.log("or"),t.accept(e);case"And":return console.log("and"),t.accept(e);case"Not":return console.log("not"),t.accept(e);case"Block":return console.log("block"),t.accept(e);case"DeclarationVariable":return console.log("declarationVariable"),t.accept(e);case"IF":return console.log("if"),t.accept(e);case"LOOP":return console.log("loop"),t.accept(e);case"Parameter":return console.log("parameter"),t.accept(e);case"BooleanType":return console.log("booleanType"),t.accept(e);case"TypeClass":return console.log("typeClass"),t.accept(e);case"ExpressionBase":return console.log("expressionBase"),t.accept(e);case"Expression":return console.log("expression"),t.accept(e);default:throw new Error(`Unknown node typee ${t.$type}`)}}var Rn=class t{static fromAngle(e,r){return new t(Math.cos(e)*r,Math.sin(e)*r)}static null(){return new t(0,0)}constructor(e,r){this.x=e,this.y=r}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}scale(e){return new t(this.x*e,this.y*e)}projX(){return new t(this.x,0)}projY(){return new t(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}distanceTo(e){let r=this.x-e.x,n=this.y-e.y;return Math.sqrt(r*r+n*n)}},Vd=class{constructor(e,r){this.origin=e,this.vector=r}intersect(e){let r=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),r=r.concat(o)}return this.findClosestIntersection(r)}findClosestIntersection(e){let r=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,r=i)}return e[r]}else return}getPoiFinder(){return(e,r)=>{let n=e.minus(r),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,l=n.x*s.y-s.x*n.y,c=a/o,u=-l/o;if(c>0&&c<1&&u>0)return e.plus(n.scale(-c))}}}};var Jl=class{constructor(e,r,n,i,o){this.type="Robot",this.pos=e,this.size=r,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){return[]}turn(e){this.rad+=e*Math.PI/180;let r=e/this.speed*250;this.scene.time+=r,this.scene.timestamps.push(new Fo(this.scene.time,this))}move(e){this.pos.x+=Math.cos(this.rad)*e,this.pos.y+=Math.sin(this.rad)*e;let r=Math.abs(e)/this.speed*250;this.scene.time+=r,this.scene.timestamps.push(new Fo(this.scene.time,this))}side(e){let r=this.rad-Math.PI/2;this.pos.x+=Math.cos(r)*e,this.pos.y+=Math.sin(r)*e;let n=Math.abs(e)/this.speed*250;this.scene.time+=n,this.scene.timestamps.push(new Fo(this.scene.time,this))}getRay(){return new Vd(this.pos,Rn.fromAngle(this.rad,1e4).scale(-1))}},Fo=class extends Jl{constructor(e,r){super(r.pos.scale(1),r.size.scale(1),r.rad,r.speed,r.scene),this.rad=r.rad,this.time=e}};var Uo=class{constructor(e,r){this.type="Wall",this.pos=e,this.size=r}intersect(e){let r=e.getPoiFinder()(this.pos,this.size);return r?[r]:[]}};var Xd=class{constructor(e=new Rn(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new Jl(this.size.scale(.5),new Rn(250,250),0,30,this),this.entities.push(new Uo(Rn.null(),this.size.projX())),this.entities.push(new Uo(Rn.null(),this.size.projY())),this.entities.push(new Uo(this.size,this.size.projY())),this.entities.push(new Uo(this.size,this.size.projX())),this.timestamps.push(new Fo(0,this.robot))}};var Yd=class{constructor(e,r){this.scene=new Xd(new Rn(e*10,r*10)),this.robot=this.scene.robot,this.variables=Array(),this.niveau=0,this.variables[this.niveau]=new Map,this.functions=Array()}visitComparaisonAri(e){throw new Error("Method not implemented.")}visitComparaisonDistance(e){throw new Error("Method not implemented.")}visitComparaisonTime(e){throw new Error("Method not implemented.")}visitRobot(e){let r;for(let n of e.functions)n.returnType?this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:Y(n.returnType,this)}):this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:void 0}),n.name==="main"&&(r=n);return Y(r,this),this.scene}visitExpression(e){if(e.operateur==="+")return Number(Y(e.expr1,this))+Number(Y(e.expr2,this));if(e.operateur==="-")return Number(Y(e.expr1,this))-Number(Y(e.expr2,this));if(e.operateur==="*")return Number(Y(e.expr1,this))*Number(Y(e.expr2,this));if(e.operateur==="/")return Number(Y(e.expr1,this))/Number(Y(e.expr2,this));if(e.operateur==="AND")return!!Y(e.expr1,this)&&!!Y(e.expr2,this);if(e.operateur==="OR")return!!Y(e.expr1,this)||!!Y(e.expr2,this);if(e.operateur==="NOT")return!Y(e.expr1,this);if(e.operateur==="==")return Y(e.expr1,this)===Y(e.expr2,this);if(e.operateur==="!=")return Y(e.expr1,this)!==Y(e.expr2,this);if(e.operateur==="<")return Number(Y(e.expr1,this))<Number(Y(e.expr2,this));if(e.operateur===">")return Number(Y(e.expr1,this))>Number(Y(e.expr2,this));if(e.operateur==="<=")return Number(Y(e.expr1,this))<=Number(Y(e.expr2,this));if(e.operateur===">=")return Number(Y(e.expr1,this))>=Number(Y(e.expr2,this))}visitInstruction(e){Y(e,this)}visitFunctionN(e){for(let r of e.instruction)Y(r,this);if(e.returnType&&e.returnedValue)return Y(e.returnedValue,this)}visitExpressionBase(e){let r=e;if(r.$type==="Expression")return this.visitExpression(r)}visitDistanceExpression(e){let r=Y(e.unit,this),n=Y(e.number,this);return r==="cm"&&(n=n*10),n}visitTimeExpression(e){return Y(e.number,this)}visitDistance(e){return e.typeD}visitTime(e){}visitDirectionCommand(e){if(e.operateur==="FORWARD"){let r=Y(e.distance,this);this.robot.move(r)}else e.operateur==="BACKWARD"?this.robot.move(-Y(e.distance,this)):e.operateur==="LEFT"?this.robot.side(Y(e.distance,this)):e.operateur==="RIGHT"&&this.robot.side(-Y(e.distance,this))}visitSpeedCommand(e){let r=Y(e.speed,this);this.robot.speed=r}visitDistanceSensorCommand(e){let r=this.robot.getRay().intersect(this.scene.entities);return r?this.robot.pos.minus(r).norm():-1}visitTimeSensorCommand(e){return this.scene.time}visitRotateCommand(e){this.robot.turn(e.angle)}visitCallVariable(e){var r;let n=e.nom,i=this.niveau,o;for(;i>=0;){if(this.variables[i].has(n)){o=(r=this.variables[i].get(n))===null||r===void 0?void 0:r.value;break}i--}return o}visitCallFunction(e){let r=e.nom,n=this.functions.find(o=>o.name===r);this.niveau++,this.variables[this.niveau]=new Map;let i;if(n&&n.parameters&&n.parameters.length>0){let o=0;for(let s of n.parameters)this.variables[this.niveau].set(s.nom,{name:s.nom,type:Y(s.typeP,this),value:Y(e.parameters[o],this),niveau:this.niveau}),o++}return n&&(i=Y(n.func,this)),this.variables[this.niveau].clear(),this.niveau--,i}visitAffectation(e){let r=e.callvariable.nom,n=this.niveau;for(;n>=0;){if(this.variables[n].has(r)){let i=this.variables[n].get(r);i&&(i.value=Y(e.expressionbase,this));break}n--}}visitBooleanType(e){return e.value==="true"}visitNumberType(e){return Number(e.value)}visitPlusMinus(e){throw new Error("Method not implemented.")}visitMultDiv(e){throw new Error("Method not implemented.")}visitPlusMinusDistance(e){throw new Error("Method not implemented.")}visitMultDivDistance(e){throw new Error("Method not implemented.")}visitPlusMinusTime(e){throw new Error("Method not implemented.")}visitMultDivTime(e){throw new Error("Method not implemented.")}visitDeclarationVariable(e){this.variables[this.niveau].set(e.nom,{name:e.nom,type:Y(e.type,this),value:Y(e.expressionbase,this),niveau:this.niveau})}visitPrimaryExprAri(e){return Y(e.expr,this)}visitPrimaryExprBool(e){return Y(e.expr,this)}visitPrimaryExprDistance(e){throw new Error("Method not implemented.")}visitBlock(e){throw new Error("Method not implemented.")}visitIF(e){if(Y(e.expression,this)){this.niveau++,this.variables[this.niveau]=new Map;for(let r of e.instruction)Y(r,this)}else if(this.niveau++,this.variables[this.niveau]=new Map,e.instructionElse!=null&&e.instructionElse.length>0)for(let r of e.instructionElse)Y(r,this);this.variables[this.niveau].clear(),this.niveau--}visitLOOP(e){for(this.niveau++,this.variables[this.niveau]=new Map;!Y(e.expression,this);){console.log("LOOP");for(let r of e.instruction)console.log("instruction"),Y(r,this)}this.variables[this.niveau].clear(),this.niveau--}visitAnd(e){throw new Error("Method not implemented.")}visitOr(e){throw new Error("Method not implemented.")}visitNot(e){throw new Error("Method not implemented.")}visitEquals(e){throw new Error("Method not implemented.")}visitParameter(e){}visitTypeClass(e){return e.typeT}visitBooleanExp(e){throw new Error("Method not implemented.")}visitPrimaryExprTime(e){throw new Error("Method not implemented.")}};function mS(t,e,r){let n=new Yd(e,r);return t.accept(n)}var hS=(t=0)=>e=>`\x1B[${e+t}m`,yS=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,gS=(t=0)=>(e,r,n)=>`\x1B[${38+t};2;${e};${r};${n}m`,it={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},ace=Object.keys(it.modifier),NG=Object.keys(it.color),_G=Object.keys(it.bgColor),lce=[...NG,..._G];function PG(){let t=new Map;for(let[e,r]of Object.entries(it)){for(let[n,i]of Object.entries(r))it[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[n]=it[n],t.set(i[0],i[1]);Object.defineProperty(it,e,{value:r,enumerable:!1})}return Object.defineProperty(it,"codes",{value:t,enumerable:!1}),it.color.close="\x1B[39m",it.bgColor.close="\x1B[49m",it.color.ansi=hS(),it.color.ansi256=yS(),it.color.ansi16m=gS(),it.bgColor.ansi=hS(10),it.bgColor.ansi256=yS(10),it.bgColor.ansi16m=gS(10),Object.defineProperties(it,{rgbToAnsi256:{value(e,r,n){return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(e){let r=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!r)return[0,0,0];let[n]=r;n.length===3&&(n=[...n].map(o=>o+o).join(""));let i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:e=>it.rgbToAnsi256(...it.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let r,n,i;if(e>=232)r=((e-232)*10+8)/255,n=r,i=r;else{e-=16;let a=e%36;r=Math.floor(e/36)/5,n=Math.floor(a/6)/5,i=a%6/5}let o=Math.max(r,n,i)*2;if(o===0)return 30;let s=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(r));return o===2&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,r,n)=>it.ansi256ToAnsi(it.rgbToAnsi256(e,r,n)),enumerable:!1},hexToAnsi:{value:e=>it.ansi256ToAnsi(it.hexToAnsi256(e)),enumerable:!1}}),it}var IG=PG(),bn=IG;var Jd=(()=>{if(navigator.userAgentData){let t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),TS=Jd!==0&&{level:Jd,hasBasic:!0,has256:Jd>=2,has16m:Jd>=3},DG={stdout:TS,stderr:TS},vS=DG;function xS(t,e,r){let n=t.indexOf(e);if(n===-1)return t;let i=e.length,o=0,s="";do s+=t.slice(o,n)+e+r,o=n+i,n=t.indexOf(e,o);while(n!==-1);return s+=t.slice(o),s}function RS(t,e,r,n){let i=0,o="";do{let s=t[n-1]==="\r";o+=t.slice(i,s?n-1:n)+e+(s?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return o+=t.slice(i),o}var{stdout:bS,stderr:CS}=vS,Ly=Symbol("GENERATOR"),ba=Symbol("STYLER"),Ql=Symbol("IS_EMPTY"),AS=["ansi","ansi","ansi256","ansi16m"],Ca=Object.create(null),OG=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=bS?bS.level:0;t.level=e.level===void 0?r:e.level};var LG=t=>{let e=(...r)=>r.join(" ");return OG(e,t),Object.setPrototypeOf(e,Zl.prototype),e};function Zl(t){return LG(t)}Object.setPrototypeOf(Zl.prototype,Function.prototype);for(let[t,e]of Object.entries(bn))Ca[t]={get(){let r=Qd(this,Fy(e.open,e.close,this[ba]),this[Ql]);return Object.defineProperty(this,t,{value:r}),r}};Ca.visible={get(){let t=Qd(this,this[ba],!0);return Object.defineProperty(this,"visible",{value:t}),t}};var My=(t,e,r,...n)=>t==="rgb"?e==="ansi16m"?bn[r].ansi16m(...n):e==="ansi256"?bn[r].ansi256(bn.rgbToAnsi256(...n)):bn[r].ansi(bn.rgbToAnsi(...n)):t==="hex"?My("rgb",e,r,...bn.hexToRgb(...n)):bn[r][t](...n),MG=["rgb","hex","ansi256"];for(let t of MG){Ca[t]={get(){let{level:r}=this;return function(...n){let i=Fy(My(t,AS[r],"color",...n),bn.color.close,this[ba]);return Qd(this,i,this[Ql])}}};let e="bg"+t[0].toUpperCase()+t.slice(1);Ca[e]={get(){let{level:r}=this;return function(...n){let i=Fy(My(t,AS[r],"bgColor",...n),bn.bgColor.close,this[ba]);return Qd(this,i,this[Ql])}}}}var FG=Object.defineProperties(()=>{},{...Ca,level:{enumerable:!0,get(){return this[Ly].level},set(t){this[Ly].level=t}}}),Fy=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Qd=(t,e,r)=>{let n=(...i)=>UG(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,FG),n[Ly]=t,n[ba]=e,n[Ql]=r,n},UG=(t,e)=>{if(t.level<=0||!e)return t[Ql]?"":e;let r=t[ba];if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.includes("\x1B"))for(;r!==void 0;)e=xS(e,r.close,r.open),r=r.parent;let o=e.indexOf(`
`);return o!==-1&&(e=RS(e,i,n,o)),n+e+i};Object.defineProperties(Zl.prototype,Ca);var qG=Zl(),hce=Zl({level:CS?CS.level:0});var ec=qG;async function GG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,mu.parse("memory://robot.document"));return await e.shared.workspace.DocumentBuilder.build([n],{validation:!0}),(r=n.parseResult)===null||r===void 0?void 0:r.value}async function jG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,mu.parse("memory://minilogo.document"));await e.shared.workspace.DocumentBuilder.build([n],{validation:!0});let i=((r=n.diagnostics)!==null&&r!==void 0?r:[]).filter(o=>o.severity===1);if(i.length>0){let o=i.map(s=>`line ${s.range.start.line+1}: ${s.message} [${n.textDocument.getText(s.range)}]`);throw console.error(ec.red("There are validation errors:")),o.forEach(s=>console.error(ec.red(s))),new Error(o.join(`
`))}return n}async function wS(t){let e=t[0],r=t[1],n=t[2],i=tc(ko).Robot,o=await GG(e,i),s=mS(o,r,n);return Promise.resolve(s)}async function SS(t){let e=tc(ko).Robot,n=(await jG(t,e)).parseResult;if(n.lexerErrors.length===0&&n.parserErrors.length===0)return console.log(ec.green("validated successfully")),[];{let i=[];if(n.lexerErrors.length>0){let o=n.lexerErrors.map(s=>`${s.line?"line "+s.line+1:""}: ${s.message}`);i=i.concat(o)}if(n.parserErrors.length>0){let o=n.parserErrors.map(s=>`${s.message}`);i=i.concat(o)}return console.log(ec.red("Failed to parse and validate!")),i}}function kS(t){let e=t.validation.ValidationRegistry,r=t.validation.RoboMlAcceptWeaver;e.register(r.checks,r)}var Zd=class{constructor(){this.checks={Robot:this.weaveRobot,PrimaryExprTime:this.weavePrimaryExprTime,BooleanExp:this.weaveBooleanExp,TypeClass:this.weaveTypeClass,Expression:this.weaveExpression,Instruction:this.weaveInstruction,FunctionN:this.weaveFunctionN,ExpressionBase:this.weaveExpressionBase,DistanceExpression:this.weaveDistanceExpression,TimeExpression:this.weaveTimeExpression,Distance:this.weaveDistance,Time:this.weaveTime,DirectionCommand:this.weaveDirectionCommand,SpeedCommand:this.weaveSpeedCommand,DistanceSensorCommand:this.weaveDistanceSensorCommand,TimeSensorCommand:this.weaveTimeSensorCommand,RotateCommand:this.weaveRotateCommand,CallVariable:this.weaveCallVariable,CallFunction:this.weaveCallFunction,Affectation:this.weaveAffectation,BooleanType:this.weaveBooleanType,NumberType:this.weaveNumberType,PlusMinus:this.weavePlusMinus,MultDiv:this.weaveMultDiv,PlusMinusDistance:this.weavePlusMinusDistance,MultDivDistance:this.weaveMultDivDistance,PlusMinusTime:this.weavePlusMinusTime,MultDivTime:this.weaveMultDivTime,DeclarationVariable:this.weaveDeclarationVariable,PrimaryExprAri:this.weavePrimaryExprAri,PrimaryExprBool:this.weavePrimaryExprBool,PrimaryExprDistance:this.weavePrimaryExprDistance,Block:this.weaveBlock,IF:this.weaveIF,LOOP:this.weaveLOOP,And:this.weaveAnd,Or:this.weaveOr,Not:this.weaveNot,Equals:this.weaveEquals,ComparaisonAri:this.weaveComparaisonAri,ComparaisonTime:this.weaveComparaisonTime,ComparaisonDistance:this.weaveComparaisonDistance}}weaveRobot(e,r){e.accept=n=>n.visitRobot(e)}weaveInstruction(e,r){e.accept=n=>n.visitInstruction(e)}weaveFunctionN(e,r){e.accept=n=>n.visitFunctionN(e)}weaveExpressionBase(e,r){e.accept=n=>n.visitExpressionBase(e)}weaveDistanceExpression(e,r){e.accept=n=>n.visitDistanceExpression(e)}weaveTimeExpression(e,r){e.accept=n=>n.visitTimeExpression(e)}weaveDistance(e,r){e.accept=n=>n.visitDistance(e)}weaveTime(e,r){e.accept=n=>n.visitTime(e)}weaveDirectionCommand(e,r){e.accept=n=>n.visitDirectionCommand(e)}weaveSpeedCommand(e,r){e.accept=n=>n.visitSpeedCommand(e)}weaveDistanceSensorCommand(e,r){e.accept=n=>n.visitDistanceSensorCommand(e)}weaveTimeSensorCommand(e,r){e.accept=n=>n.visitTimeSensorCommand(e)}weaveRotateCommand(e,r){e.accept=n=>n.visitRotateCommand(e)}weaveCallVariable(e,r){e.accept=n=>n.visitCallVariable(e)}weaveCallFunction(e,r){e.accept=n=>n.visitCallFunction(e)}weaveAffectation(e,r){e.accept=n=>n.visitAffectation(e)}weaveBooleanType(e,r){e.accept=n=>n.visitBooleanType(e)}weaveNumberType(e,r){e.accept=n=>n.visitNumberType(e)}weavePlusMinus(e,r){e.accept=n=>n.visitPlusMinus(e)}weaveMultDiv(e,r){e.accept=n=>n.visitMultDiv(e)}weavePlusMinusDistance(e,r){e.accept=n=>n.visitPlusMinusDistance(e)}weaveMultDivDistance(e,r){e.accept=n=>n.visitMultDivDistance(e)}weavePlusMinusTime(e,r){e.accept=n=>n.visitPlusMinusTime(e)}weaveMultDivTime(e,r){e.accept=n=>n.visitMultDivTime(e)}weaveDeclarationVariable(e,r){e.accept=n=>n.visitDeclarationVariable(e)}weavePrimaryExprAri(e,r){e.accept=n=>n.visitPrimaryExprAri(e)}weavePrimaryExprBool(e,r){e.accept=n=>n.visitPrimaryExprBool(e)}weavePrimaryExprDistance(e,r){e.accept=n=>n.visitPrimaryExprDistance(e)}weaveBlock(e,r){e.accept=n=>n.visitBlock(e)}weaveIF(e,r){e.accept=n=>n.visitIF(e)}weaveLOOP(e,r){e.accept=n=>n.visitLOOP(e)}weaveAnd(e,r){e.accept=n=>n.visitAnd(e)}weaveOr(e,r){e.accept=n=>n.visitOr(e)}weaveNot(e,r){e.accept=n=>n.visitNot(e)}weaveEquals(e,r){e.accept=n=>n.visitEquals(e)}weaveExpression(e,r){e.accept=n=>n.visitExpression(e)}weaveTypeClass(e,r){e.accept=n=>n.visitTypeClass(e)}weaveBooleanExp(e,r){e.accept=n=>n.visitBooleanExp(e)}weavePrimaryExprTime(e,r){e.accept=n=>n.visitPrimaryExprTime(e)}weaveComparaisonAri(e,r){e.accept=n=>n.visitComparaisonAri(e)}weaveComparaisonTime(e,r){e.accept=n=>n.visitComparaisonTime(e)}weaveComparaisonDistance(e,r){e.accept=n=>n.visitComparaisonDistance(e)}};var Uy=class extends Hu{registerCommands(e){e("parseAndGenerate",r=>wS(r[0])),e("parseAndValidate",r=>SS(r[0]))}},KG={validation:{RobotValidator:()=>new zd,RoboMlAcceptWeaver:()=>new Zd}};function tc(t){let e=ho(xl(t),fS),r=ho(vl({shared:e}),dS,KG);return e.lsp.ExecuteCommandHandler=new Uy,e.ServiceRegistry.register(r),pS(r),kS(r),{shared:e,Robot:r}}var HG=new Aa.BrowserMessageReader(self),BG=new Aa.BrowserMessageWriter(self),WG=(0,Aa.createConnection)(HG,BG),{shared:zG}=tc(Object.assign({connection:WG},ko));eR(zG);})();
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
