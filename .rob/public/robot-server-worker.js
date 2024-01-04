"use strict";(()=>{var Ew=Object.create;var np=Object.defineProperty;var $w=Object.getOwnPropertyDescriptor;var Nw=Object.getOwnPropertyNames;var _w=Object.getPrototypeOf,Pw=Object.prototype.hasOwnProperty;var Gy=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Iw=(t,e)=>{for(var r in e)np(t,r,{get:e[r],enumerable:!0})},Dw=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Nw(e))!Pw.call(t,i)&&i!==r&&np(t,i,{get:()=>e[i],enumerable:!(n=$w(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?Ew(_w(t)):{},Dw(e||!t||!t.__esModule?np(r,"default",{value:t,enumerable:!0}):r,t));var Vn=H(sp=>{"use strict";Object.defineProperty(sp,"__esModule",{value:!0});var ip;function op(){if(ip===void 0)throw new Error("No runtime abstraction layer installed");return ip}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");ip=r}t.install=e})(op||(op={}));sp.default=op});var ap=H(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.Disposable=void 0;var Ow;(function(t){function e(r){return{dispose:r}}t.create=e})(Ow=ka.Disposable||(ka.Disposable={}))});var oo=H(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.Emitter=io.Event=void 0;var Lw=Vn(),Mw;(function(t){let e={dispose(){}};t.None=function(){return e}})(Mw=io.Event||(io.Event={}));var cp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,Lw.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},ol=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new cp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};io.Emitter=ol;ol._noop=function(){}});var jy=H(sl=>{"use strict";Object.defineProperty(sl,"__esModule",{value:!0});sl.AbstractMessageBuffer=void 0;var Fw=13,Uw=10,qw=`\r
`,lp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let c=this._chunks[r];for(n=0;n<c.length;){switch(c[n]){case Fw:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case Uw:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(qw);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let l=a[c],u=l.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,u),m=l.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};sl.AbstractMessageBuffer=lp});var By=H(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});var Hy=Vn(),Ho=ap(),Gw=oo(),jw=jy(),al=class t extends jw.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};al.emptyBuffer=new Uint8Array(0);var up=class{constructor(e){this.socket=e,this._onData=new Gw.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Hy.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Ho.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ho.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ho.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},fp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Ho.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ho.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ho.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},Hw=new TextEncoder,Ky=Object.freeze({messageBuffer:Object.freeze({create:t=>new al(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(Hw.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new up(t),asWritableStream:t=>new fp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function dp(){return Ky}(function(t){function e(){Hy.default.install(Ky)}t.install=e})(dp||(dp={}));pp.default=dp});var Ko=H(nr=>{"use strict";Object.defineProperty(nr,"__esModule",{value:!0});nr.stringArray=nr.array=nr.func=nr.error=nr.number=nr.string=nr.boolean=void 0;function Kw(t){return t===!0||t===!1}nr.boolean=Kw;function Wy(t){return typeof t=="string"||t instanceof String}nr.string=Wy;function Bw(t){return typeof t=="number"||t instanceof Number}nr.number=Bw;function Ww(t){return t instanceof Error}nr.error=Ww;function zw(t){return typeof t=="function"}nr.func=zw;function zy(t){return Array.isArray(t)}nr.array=zy;function Vw(t){return zy(t)&&t.every(e=>Wy(e))}nr.stringArray=Vw});var Mp=H(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var so=Ko(),Vy;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Vy=V.ErrorCodes||(V.ErrorCodes={}));var mp=class t extends Error{constructor(e,r,n){super(r),this.code=so.number(e)?e:Vy.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=mp;var br=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=br;br.auto=new br("auto");br.byPosition=new br("byPosition");br.byName=new br("byName");var Xe=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return br.auto}};V.AbstractMessageSignature=Xe;var hp=class extends Xe{constructor(e){super(e,0)}};V.RequestType0=hp;var yp=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=yp;var gp=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=gp;var Tp=class extends Xe{constructor(e){super(e,2)}};V.RequestType2=Tp;var vp=class extends Xe{constructor(e){super(e,3)}};V.RequestType3=vp;var xp=class extends Xe{constructor(e){super(e,4)}};V.RequestType4=xp;var Rp=class extends Xe{constructor(e){super(e,5)}};V.RequestType5=Rp;var bp=class extends Xe{constructor(e){super(e,6)}};V.RequestType6=bp;var Ap=class extends Xe{constructor(e){super(e,7)}};V.RequestType7=Ap;var Cp=class extends Xe{constructor(e){super(e,8)}};V.RequestType8=Cp;var Sp=class extends Xe{constructor(e){super(e,9)}};V.RequestType9=Sp;var wp=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=wp;var kp=class extends Xe{constructor(e){super(e,0)}};V.NotificationType0=kp;var Ep=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=Ep;var $p=class extends Xe{constructor(e){super(e,2)}};V.NotificationType2=$p;var Np=class extends Xe{constructor(e){super(e,3)}};V.NotificationType3=Np;var _p=class extends Xe{constructor(e){super(e,4)}};V.NotificationType4=_p;var Pp=class extends Xe{constructor(e){super(e,5)}};V.NotificationType5=Pp;var Ip=class extends Xe{constructor(e){super(e,6)}};V.NotificationType6=Ip;var Dp=class extends Xe{constructor(e){super(e,7)}};V.NotificationType7=Dp;var Op=class extends Xe{constructor(e){super(e,8)}};V.NotificationType8=Op;var Lp=class extends Xe{constructor(e){super(e,9)}};V.NotificationType9=Lp;var Xw;(function(t){function e(i){let o=i;return o&&so.string(o.method)&&(so.string(o.id)||so.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&so.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(so.string(o.id)||so.number(o.id)||o.id===null)}t.isResponse=n})(Xw=V.Message||(V.Message={}))});var Up=H(Xn=>{"use strict";var Xy;Object.defineProperty(Xn,"__esModule",{value:!0});Xn.LRUCache=Xn.LinkedMap=Xn.Touch=void 0;var dr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(dr=Xn.Touch||(Xn.Touch={}));var cl=class{constructor(){this[Xy]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=dr.None){let n=this._map.get(e);if(n)return r!==dr.None&&this.touch(n,r),n.value}set(e,r,n=dr.None){let i=this._map.get(e);if(i)i.value=r,n!==dr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case dr.None:this.addItemLast(i);break;case dr.First:this.addItemFirst(i);break;case dr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(Xy=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==dr.First&&r!==dr.Last)){if(r===dr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===dr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Xn.LinkedMap=cl;var Fp=class extends cl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=dr.AsNew){return super.get(e,r)}peek(e){return super.get(e,dr.None)}set(e,r){return super.set(e,r,dr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Xn.LRUCache=Fp});var Hp=H(ao=>{"use strict";Object.defineProperty(ao,"__esModule",{value:!0});ao.CancellationTokenSource=ao.CancellationToken=void 0;var Yw=Vn(),Jw=Ko(),qp=oo(),Gp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:qp.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:qp.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||Jw.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Gp=ao.CancellationToken||(ao.CancellationToken={}));var Qw=Object.freeze(function(t,e){let r=(0,Yw.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),ll=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?Qw:(this._emitter||(this._emitter=new qp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},jp=class{get token(){return this._token||(this._token=new ll),this._token}cancel(){this._token?this._token.cancel():this._token=Gp.Cancelled}dispose(){this._token?this._token instanceof ll&&this._token.dispose():this._token=Gp.None}};ao.CancellationTokenSource=jp});var Yy=H(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.ReadableStreamMessageReader=Yn.AbstractMessageReader=Yn.MessageReader=void 0;var Bp=Vn(),Bo=Ko(),Kp=oo(),Zw;(function(t){function e(r){let n=r;return n&&Bo.func(n.listen)&&Bo.func(n.dispose)&&Bo.func(n.onError)&&Bo.func(n.onClose)&&Bo.func(n.onPartialMessage)}t.is=e})(Zw=Yn.MessageReader||(Yn.MessageReader={}));var ul=class{constructor(){this.errorEmitter=new Kp.Emitter,this.closeEmitter=new Kp.Emitter,this.partialMessageEmitter=new Kp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Bo.string(e.message)?e.message:"unknown"}`)}};Yn.AbstractMessageReader=ul;var Wp;(function(t){function e(r){let n,i,o,s=new Map,a,c=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)s.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,c.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)c.set(l.name,l)}return a===void 0&&(a=(0,Bp.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}t.fromOptions=e})(Wp||(Wp={}));var zp=class extends ul{constructor(e,r){super(),this.readable=e,this.options=Wp.fromOptions(r),this.buffer=(0,Bp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Bp.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Yn.ReadableStreamMessageReader=zp});var Jy=H(fl=>{"use strict";Object.defineProperty(fl,"__esModule",{value:!0});fl.Semaphore=void 0;var ek=Vn(),Vp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,ek.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};fl.Semaphore=Vp});var tg=H(Jn=>{"use strict";Object.defineProperty(Jn,"__esModule",{value:!0});Jn.WriteableStreamMessageWriter=Jn.AbstractMessageWriter=Jn.MessageWriter=void 0;var Qy=Vn(),Ea=Ko(),tk=Jy(),Zy=oo(),rk="Content-Length: ",eg=`\r
`,nk;(function(t){function e(r){let n=r;return n&&Ea.func(n.dispose)&&Ea.func(n.onClose)&&Ea.func(n.onError)&&Ea.func(n.write)}t.is=e})(nk=Jn.MessageWriter||(Jn.MessageWriter={}));var dl=class{constructor(){this.errorEmitter=new Zy.Emitter,this.closeEmitter=new Zy.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Ea.string(e.message)?e.message:"unknown"}`)}};Jn.AbstractMessageWriter=dl;var Xp;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Qy.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Qy.default)().applicationJson.encoder}}t.fromOptions=e})(Xp||(Xp={}));var Yp=class extends dl{constructor(e,r){super(),this.writable=e,this.options=Xp.fromOptions(r),this.errorCount=0,this.writeSemaphore=new tk.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(rk,n.byteLength.toString(),eg),i.push(eg),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Jn.WriteableStreamMessageWriter=Yp});var ag=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var rg=Vn(),It=Ko(),Z=Mp(),ng=Up(),$a=oo(),Jp=Hp(),_a;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(_a||(_a={}));var ig;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(ig=Y.ProgressToken||(Y.ProgressToken={}));var Na;(function(t){t.type=new Z.NotificationType("$/progress")})(Na||(Na={}));var Qp=class{constructor(){}};Y.ProgressType=Qp;var Zp;(function(t){function e(r){return It.func(r)}t.is=e})(Zp||(Zp={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var ik;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(ik=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!It.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})($e=Y.Trace||(Y.Trace={}));var on;(function(t){t.Text="text",t.JSON="json"})(on=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return It.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(on=Y.TraceFormat||(Y.TraceFormat={}));var og;(function(t){t.type=new Z.NotificationType("$/setTrace")})(og=Y.SetTraceNotification||(Y.SetTraceNotification={}));var em;(function(t){t.type=new Z.NotificationType("$/logTrace")})(em=Y.LogTraceNotification||(Y.LogTraceNotification={}));var pl;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(pl=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Wo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=Wo;var sg;(function(t){function e(r){let n=r;return n&&It.func(n.cancelUndispatched)}t.is=e})(sg=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var tm;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Jp.CancellationTokenSource}});function e(r){let n=r;return n&&It.func(n.createCancellationTokenSource)}t.is=e})(tm=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var rm;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(_a.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}t.is=e})(rm=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var nm;(function(t){t.Message=Object.freeze({receiver:tm.Message,sender:rm.Message});function e(r){let n=r;return n&&tm.is(n.receiver)&&rm.is(n.sender)}t.is=e})(nm=Y.CancellationStrategy||(Y.CancellationStrategy={}));var ok;(function(t){function e(r){let n=r;return n&&(nm.is(n.cancellationStrategy)||sg.is(n.connectionStrategy))}t.is=e})(ok=Y.ConnectionOptions||(Y.ConnectionOptions={}));var sn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(sn||(sn={}));function sk(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,c="2.0",l,u=new Map,f,m=new Map,v=new Map,A,C=new ng.LinkedMap,N=new Map,S=new Set,T=new Map,y=$e.Off,$=on.Text,D,X=sn.New,ge=new $a.Emitter,Ee=new $a.Emitter,Kt=new $a.Emitter,Rt=new $a.Emitter,M=new $a.Emitter,w=n&&n.cancellationStrategy?n.cancellationStrategy:nm.Message;function q(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function ee(x,I){Z.Message.isRequest(I)?x.set(q(I.id),I):Z.Message.isResponse(I)?x.set(j(I.id),I):x.set(ce(),I)}function Q(x){}function bt(){return X===sn.Listening}function ut(){return X===sn.Closed}function me(){return X===sn.Disposed}function Nr(){(X===sn.New||X===sn.Listening)&&(X=sn.Closed,Ee.fire(void 0))}function Bn(x){ge.fire([x,void 0,void 0])}function Sa(x){ge.fire(x)}t.onClose(Nr),t.onError(Bn),e.onClose(Nr),e.onError(Sa);function eo(){A||C.size===0||(A=(0,rg.default)().timer.setImmediate(()=>{A=void 0,fr()}))}function fr(){if(C.size===0)return;let x=C.shift();try{Z.Message.isRequest(x)?At(x):Z.Message.isNotification(x)?An(x):Z.Message.isResponse(x)?tr(x):Bt(x)}finally{eo()}}let qo=x=>{try{if(Z.Message.isNotification(x)&&x.method===_a.type.method){let I=x.params.id,F=q(I),W=C.get(F);if(Z.Message.isRequest(W)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(W,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){C.delete(F),T.delete(I),Je.id=W.id,Rr(Je,x.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=T.get(I);if(De!==void 0){De.cancel(),bi(x);return}else S.add(I)}ee(C,x)}finally{eo()}};function At(x){if(me())return;function I(ue,Ue,Te){let yt={jsonrpc:c,id:x.id};ue instanceof Z.ResponseError?yt.error=ue.toJson():yt.result=ue===void 0?null:ue,Rr(yt,Ue,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function F(ue,Ue,Te){let yt={jsonrpc:c,id:x.id,error:ue.toJson()};Rr(yt,Ue,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function W(ue,Ue,Te){ue===void 0&&(ue=null);let yt={jsonrpc:c,id:x.id,result:ue};Rr(yt,Ue,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}to(x);let De=u.get(x.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let Ct=Date.now();if(Je||l){let ue=x.id??String(Date.now()),Ue=w.receiver.createCancellationTokenSource(ue);x.id!==null&&S.has(x.id)&&Ue.cancel(),x.id!==null&&T.set(ue,Ue);try{let Te;if(Je)if(x.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Oe.numberOfParams} params but received none.`),x.method,Ct);return}Te=Je(Ue.token)}else if(Array.isArray(x.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,Ct);return}Te=Je(...x.params,Ue.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,Ct);return}Te=Je(x.params,Ue.token)}else l&&(Te=l(x.method,x.params,Ue.token));let yt=Te;Te?yt.then?yt.then(rr=>{T.delete(ue),I(rr,x.method,Ct)},rr=>{T.delete(ue),rr instanceof Z.ResponseError?F(rr,x.method,Ct):rr&&It.string(rr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${rr.message}`),x.method,Ct):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,Ct)}):(T.delete(ue),I(Te,x.method,Ct)):(T.delete(ue),W(Te,x.method,Ct))}catch(Te){T.delete(ue),Te instanceof Z.ResponseError?I(Te,x.method,Ct):Te&&It.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${Te.message}`),x.method,Ct):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,Ct)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,Ct)}function tr(x){if(!me())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let I=x.id,F=N.get(I);if(ep(x,F),F!==void 0){N.delete(I);try{if(x.error){let W=x.error;F.reject(new Z.ResponseError(W.code,W.message,W.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(W){W.message?i.error(`Response handler '${F.method}' failed with message: ${W.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function An(x){if(me())return;let I,F;if(x.method===_a.type.method){let W=x.params.id;S.delete(W),bi(x);return}else{let W=m.get(x.method);W&&(F=W.handler,I=W.type)}if(F||f)try{if(bi(x),F)if(x.params===void 0)I!==void 0&&I.numberOfParams!==0&&I.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let W=x.params;x.method===Na.type.method&&W.length===2&&ig.is(W[0])?F({token:W[0],value:W[1]}):(I!==void 0&&(I.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),I.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${I.numberOfParams} params but received ${W.length} arguments`)),F(...W))}else I!==void 0&&I.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(W){W.message?i.error(`Notification handler '${x.method}' failed with message: ${W.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Kt.fire(x)}function Bt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let I=x;if(It.string(I.id)||It.number(I.id)){let F=I.id,W=N.get(F);W&&W.reject(new Error("The received response has neither a result nor an error property."))}}function ft(x){if(x!=null)switch(y){case $e.Verbose:return JSON.stringify(x,null,4);case $e.Compact:return JSON.stringify(x);default:return}}function Hr(x){if(!(y===$e.Off||!D))if($===on.Text){let I;(y===$e.Verbose||y===$e.Compact)&&x.params&&(I=`Params: ${ft(x.params)}

`),D.log(`Sending request '${x.method} - (${x.id})'.`,I)}else Ai("send-request",x)}function _r(x){if(!(y===$e.Off||!D))if($===on.Text){let I;(y===$e.Verbose||y===$e.Compact)&&(x.params?I=`Params: ${ft(x.params)}

`:I=`No parameters provided.

`),D.log(`Sending notification '${x.method}'.`,I)}else Ai("send-notification",x)}function Rr(x,I,F){if(!(y===$e.Off||!D))if($===on.Text){let W;(y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?W=`Error data: ${ft(x.error.data)}

`:x.result?W=`Result: ${ft(x.result)}

`:x.error===void 0&&(W=`No result returned.

`)),D.log(`Sending response '${I} - (${x.id})'. Processing request took ${Date.now()-F}ms`,W)}else Ai("send-response",x)}function to(x){if(!(y===$e.Off||!D))if($===on.Text){let I;(y===$e.Verbose||y===$e.Compact)&&x.params&&(I=`Params: ${ft(x.params)}

`),D.log(`Received request '${x.method} - (${x.id})'.`,I)}else Ai("receive-request",x)}function bi(x){if(!(y===$e.Off||!D||x.method===em.type.method))if($===on.Text){let I;(y===$e.Verbose||y===$e.Compact)&&(x.params?I=`Params: ${ft(x.params)}

`:I=`No parameters provided.

`),D.log(`Received notification '${x.method}'.`,I)}else Ai("receive-notification",x)}function ep(x,I){if(!(y===$e.Off||!D))if($===on.Text){let F;if((y===$e.Verbose||y===$e.Compact)&&(x.error&&x.error.data?F=`Error data: ${ft(x.error.data)}

`:x.result?F=`Result: ${ft(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),I){let W=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";D.log(`Received response '${I.method} - (${x.id})' in ${Date.now()-I.timerStart}ms.${W}`,F)}else D.log(`Received response ${x.id} without active response promise.`,F)}else Ai("receive-response",x)}function Ai(x,I){if(!D||y===$e.Off)return;let F={isLSPMessage:!0,type:x,message:I,timestamp:Date.now()};D.log(F)}function ro(){if(ut())throw new Wo(pl.Closed,"Connection is closed.");if(me())throw new Wo(pl.Disposed,"Connection is disposed.")}function tp(){if(bt())throw new Wo(pl.AlreadyListening,"Connection is already listening")}function rp(){if(!bt())throw new Error("Call listen() first.")}function no(x){return x===void 0?null:x}function Go(x){if(x!==null)return x}function rl(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function wa(x,I){switch(x){case Z.ParameterStructures.auto:return rl(I)?Go(I):[no(I)];case Z.ParameterStructures.byName:if(!rl(I))throw new Error("Received parameters by name but param is not an object literal.");return Go(I);case Z.ParameterStructures.byPosition:return[no(I)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function nl(x,I){let F,W=x.numberOfParams;switch(W){case 0:F=void 0;break;case 1:F=wa(x.parameterStructures,I[0]);break;default:F=[];for(let De=0;De<I.length&&De<W;De++)F.push(no(I[De]));if(I.length<W)for(let De=I.length;De<W;De++)F.push(null);break}return F}let Ci={sendNotification:(x,...I)=>{ro();let F,W;if(It.string(x)){F=x;let Oe=I[0],Je=0,Ct=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,Ct=Oe);let ue=I.length,Ue=ue-Je;switch(Ue){case 0:W=void 0;break;case 1:W=wa(Ct,I[Je]);break;default:if(Ct===Z.ParameterStructures.byName)throw new Error(`Received ${Ue} parameters for 'by Name' notification parameter structure.`);W=I.slice(Je,ue).map(Te=>no(Te));break}}else{let Oe=I;F=x.method,W=nl(x,Oe)}let De={jsonrpc:c,method:F,params:W};return _r(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(x,I)=>{ro();let F;return It.func(x)?f=x:I&&(It.string(x)?(F=x,m.set(x,{type:void 0,handler:I})):(F=x.method,m.set(x.method,{type:x,handler:I}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,I,F)=>{if(v.has(I))throw new Error(`Progress handler for token ${I} already registered`);return v.set(I,F),{dispose:()=>{v.delete(I)}}},sendProgress:(x,I,F)=>Ci.sendNotification(Na.type,{token:I,value:F}),onUnhandledProgress:Rt.event,sendRequest:(x,...I)=>{ro(),rp();let F,W,De;if(It.string(x)){F=x;let ue=I[0],Ue=I[I.length-1],Te=0,yt=Z.ParameterStructures.auto;Z.ParameterStructures.is(ue)&&(Te=1,yt=ue);let rr=I.length;Jp.CancellationToken.is(Ue)&&(rr=rr-1,De=Ue);let Wn=rr-Te;switch(Wn){case 0:W=void 0;break;case 1:W=wa(yt,I[Te]);break;default:if(yt===Z.ParameterStructures.byName)throw new Error(`Received ${Wn} parameters for 'by Name' request parameter structure.`);W=I.slice(Te,rr).map(Cn=>no(Cn));break}}else{let ue=I;F=x.method,W=nl(x,ue);let Ue=x.numberOfParams;De=Jp.CancellationToken.is(ue[Ue])?ue[Ue]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ue=w.sender.sendCancellation(Ci,Oe);return ue===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ue.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ue,Ue)=>{let Te={jsonrpc:c,id:Oe,method:F,params:W},yt=Cn=>{ue(Cn),w.sender.cleanup(Oe),Je?.dispose()},rr=Cn=>{Ue(Cn),w.sender.cleanup(Oe),Je?.dispose()},Wn={method:F,timerStart:Date.now(),resolve:yt,reject:rr};Hr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(Cn){Wn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,Cn.message?Cn.message:"Unknown reason")),Wn=null}Wn&&N.set(Oe,Wn)})},onRequest:(x,I)=>{ro();let F=null;return Zp.is(x)?(F=void 0,l=x):It.string(x)?(F=null,I!==void 0&&(F=x,u.set(x,{handler:I,type:void 0}))):I!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:I})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):l=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,I,F)=>{let W=!1,De=on.Text;F!==void 0&&(It.boolean(F)?W=F:(W=F.sendNotification||!1,De=F.traceFormat||on.Text)),y=x,$=De,y===$e.Off?D=void 0:D=I,W&&!ut()&&!me()&&await Ci.sendNotification(og.type,{value:$e.toString(x)})},onError:ge.event,onClose:Ee.event,onUnhandledNotification:Kt.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=sn.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let I of N.values())I.reject(x);N=new Map,T=new Map,S=new Set,C=new ng.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(t.dispose)&&t.dispose()},listen:()=>{ro(),tp(),X=sn.Listening,t.listen(qo)},inspect:()=>{(0,rg.default)().console.log("inspect")}};return Ci.onNotification(em.type,x=>{if(y===$e.Off||!D)return;let I=y===$e.Verbose||y===$e.Compact;D.log(x.message,I?x.verbose:void 0)}),Ci.onNotification(Na.type,x=>{let I=v.get(x.token);I?I(x.value):Rt.fire(x)}),Ci}Y.createMessageConnection=sk});var am=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var Ge=Mp();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var im=Up();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return im.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return im.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return im.Touch}});var ak=ap();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return ak.Disposable}});var cg=oo();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return cg.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return cg.Emitter}});var lg=Hp();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return lg.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return lg.CancellationToken}});var om=Yy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return om.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return om.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return om.ReadableStreamMessageReader}});var sm=tg();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return sm.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return sm.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return sm.WriteableStreamMessageWriter}});var ir=ag();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return ir.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return ir.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return ir.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return ir.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return ir.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return ir.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return ir.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return ir.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return ir.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return ir.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return ir.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return ir.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return ir.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return ir.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return ir.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return ir.CancellationStrategy}});var ck=Vn();_.RAL=ck.default});var Qn=H(Pr=>{"use strict";var lk=Pr&&Pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),uk=Pr&&Pr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&lk(e,t,r)};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.createMessageConnection=Pr.BrowserMessageWriter=Pr.BrowserMessageReader=void 0;var fk=By();fk.default.install();var zo=am();uk(am(),Pr);var cm=class extends zo.AbstractMessageReader{constructor(e){super(),this._onData=new zo.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Pr.BrowserMessageReader=cm;var lm=class extends zo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Pr.BrowserMessageWriter=lm;function dk(t,e,r,n){return r===void 0&&(r=zo.NullLogger),zo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,zo.createMessageConnection)(t,e,r,n)}Pr.createMessageConnection=dk});var um=H((aj,ug)=>{"use strict";ug.exports=Qn()});var co=H((fg,ml)=>{(function(t){if(typeof ml=="object"&&typeof ml.exports=="object"){var e=t(Gy,fg);e!==void 0&&(ml.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(g,d){return g===Number.MAX_VALUE&&(g=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:g,character:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(g,d,E,P){if(k.uinteger(g)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(P))return{start:s.create(g,d),end:s.create(E,P)};if(s.is(g)&&s.is(d))return{start:g,end:d};throw new Error("Range#create called with invalid arguments[".concat(g,", ").concat(d,", ").concat(E,", ").concat(P,"]"))}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function R(g,d){return{uri:g,range:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var l;(function(p){function R(g,d,E,P){return{targetUri:g,targetRange:d,targetSelectionRange:E,originSelectionRange:P}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(g,d,E,P){return{red:g,green:d,blue:E,alpha:P}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(g,d){return{range:g,color:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(g,d,E){return{label:g,textEdit:d,additionalTextEdits:E}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var A;(function(p){function R(g,d,E,P,re,dt){var qe={startLine:g,endLine:d};return k.defined(E)&&(qe.startCharacter=E),k.defined(P)&&(qe.endCharacter=P),k.defined(re)&&(qe.kind=re),k.defined(dt)&&(qe.collapsedText=dt),qe}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(A=e.FoldingRange||(e.FoldingRange={}));var C;(function(p){function R(g,d){return{location:g,message:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&c.is(d.location)&&k.string(d.message)}p.is=b})(C=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var S;(function(p){p.Unnecessary=1,p.Deprecated=2})(S=e.DiagnosticTag||(e.DiagnosticTag={}));var T;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&k.string(g.href)}p.is=R})(T=e.CodeDescription||(e.CodeDescription={}));var y;(function(p){function R(g,d,E,P,re,dt){var qe={range:g,message:d};return k.defined(E)&&(qe.severity=E),k.defined(P)&&(qe.code=P),k.defined(re)&&(qe.source=re),k.defined(dt)&&(qe.relatedInformation=dt),qe}p.create=R;function b(g){var d,E=g;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,C.is))}p.is=b})(y=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(g,d){for(var E=[],P=2;P<arguments.length;P++)E[P-2]=arguments[P];var re={title:g,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var D;(function(p){function R(E,P){return{range:E,newText:P}}p.replace=R;function b(E,P){return{range:{start:E,end:E},newText:P}}p.insert=b;function g(E){return{range:E,newText:""}}p.del=g;function d(E){var P=E;return k.objectLiteral(P)&&k.string(P.newText)&&a.is(P.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(g,d,E){var P={label:g};return d!==void 0&&(P.needsConfirmation=d),E!==void 0&&(P.description=E),P}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ge;(function(p){function R(b){var g=b;return k.string(g)}p.is=R})(ge=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function R(E,P,re){return{range:E,newText:P,annotationId:re}}p.replace=R;function b(E,P,re){return{range:{start:E,end:E},newText:P,annotationId:re}}p.insert=b;function g(E,P){return{range:E,newText:"",annotationId:P}}p.del=g;function d(E){var P=E;return D.is(P)&&(X.is(P.annotationId)||ge.is(P.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Kt;(function(p){function R(g,d){return{textDocument:g,edits:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&ut.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Kt=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Rt;(function(p){function R(g,d,E){var P={kind:"create",uri:g};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=R;function b(g){var d=g;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(Rt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(g,d,E,P){var re={kind:"rename",oldUri:g,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),P!==void 0&&(re.annotationId=P),re}p.create=R;function b(g){var d=g;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var w;(function(p){function R(g,d,E){var P={kind:"delete",uri:g};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=R;function b(g){var d=g;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(w=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function R(b){var g=b;return g&&(g.changes!==void 0||g.documentChanges!==void 0)&&(g.documentChanges===void 0||g.documentChanges.every(function(d){return k.string(d.kind)?Rt.is(d)||M.is(d)||w.is(d):Kt.is(d)}))}p.is=R})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,g){var d,E;if(g===void 0?d=D.insert(R,b):ge.is(g)?(E=g,d=Ee.insert(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,g){var d,E;if(g===void 0?d=D.replace(R,b):ge.is(g)?(E=g,d=Ee.replace(R,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var g,d;if(b===void 0?g=D.del(R):ge.is(b)?(d=b,g=Ee.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),g=Ee.del(R,d)),this.edits.push(g),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var g;if(ge.is(R)?g=R:(g=this.nextId(),b=R),this._annotations[g]!==void 0)throw new Error("Id ".concat(g," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(g));return this._annotations[g]=b,this._size++,g},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(g){if(Kt.is(g)){var d=new j(g.edits,b._changeAnnotations);b._textEditChanges[g.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(g){var d=new j(R.changes[g]);b._textEditChanges[g]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ut.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},g=this._textEditChanges[b.uri];if(!g){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),g=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=g}return g}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var g=this._textEditChanges[R];if(!g){var d=[];this._workspaceEdit.changes[R]=d,g=new j(d),this._textEditChanges[R]=g}return g}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:g=b;var E,P;if(d===void 0?E=Rt.create(R,g):(P=ge.is(d)?d:this._changeAnnotations.manage(d),E=Rt.create(R,g,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p.prototype.renameFile=function(R,b,g,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(g)||ge.is(g)?E=g:d=g;var P,re;if(E===void 0?P=M.create(R,b,d):(re=ge.is(E)?E:this._changeAnnotations.manage(E),P=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(P),re!==void 0)return re},p.prototype.deleteFile=function(R,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:g=b;var E,P;if(d===void 0?E=w.create(R,g):(P=ge.is(d)?d:this._changeAnnotations.manage(d),E=w.create(R,g,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(g){return{uri:g}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var bt;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(bt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ut;(function(p){function R(g,d){return{uri:g,version:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(ut=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function R(g,d,E,P){return{uri:g,languageId:d,version:E,text:P}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var Nr;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var g=b;return g===p.PlainText||g===p.Markdown}p.is=R})(Nr=e.MarkupKind||(e.MarkupKind={}));var Bn;(function(p){function R(b){var g=b;return k.objectLiteral(b)&&Nr.is(g.kind)&&k.string(g.value)}p.is=R})(Bn=e.MarkupContent||(e.MarkupContent={}));var Sa;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(Sa=e.CompletionItemKind||(e.CompletionItemKind={}));var eo;(function(p){p.PlainText=1,p.Snippet=2})(eo=e.InsertTextFormat||(e.InsertTextFormat={}));var fr;(function(p){p.Deprecated=1})(fr=e.CompletionItemTag||(e.CompletionItemTag={}));var qo;(function(p){function R(g,d,E){return{newText:g,insert:d,replace:E}}p.create=R;function b(g){var d=g;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(qo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var At;(function(p){p.asIs=1,p.adjustIndentation=2})(At=e.InsertTextMode||(e.InsertTextMode={}));var tr;(function(p){function R(b){var g=b;return g&&(k.string(g.detail)||g.detail===void 0)&&(k.string(g.description)||g.description===void 0)}p.is=R})(tr=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var An;(function(p){function R(b){return{label:b}}p.create=R})(An=e.CompletionItem||(e.CompletionItem={}));var Bt;(function(p){function R(b,g){return{items:b||[],isIncomplete:!!g}}p.create=R})(Bt=e.CompletionList||(e.CompletionList={}));var ft;(function(p){function R(g){return g.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(g){var d=g;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(ft=e.MarkedString||(e.MarkedString={}));var Hr;(function(p){function R(b){var g=b;return!!g&&k.objectLiteral(g)&&(Bn.is(g.contents)||ft.is(g.contents)||k.typedArray(g.contents,ft.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(Hr=e.Hover||(e.Hover={}));var _r;(function(p){function R(b,g){return g?{label:b,documentation:g}:{label:b}}p.create=R})(_r=e.ParameterInformation||(e.ParameterInformation={}));var Rr;(function(p){function R(b,g){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var P={label:b};return k.defined(g)&&(P.documentation=g),k.defined(d)?P.parameters=d:P.parameters=[],P}p.create=R})(Rr=e.SignatureInformation||(e.SignatureInformation={}));var to;(function(p){p.Text=1,p.Read=2,p.Write=3})(to=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var bi;(function(p){function R(b,g){var d={range:b};return k.number(g)&&(d.kind=g),d}p.create=R})(bi=e.DocumentHighlight||(e.DocumentHighlight={}));var ep;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(ep=e.SymbolKind||(e.SymbolKind={}));var Ai;(function(p){p.Deprecated=1})(Ai=e.SymbolTag||(e.SymbolTag={}));var ro;(function(p){function R(b,g,d,E,P){var re={name:b,kind:g,location:{uri:E,range:d}};return P&&(re.containerName=P),re}p.create=R})(ro=e.SymbolInformation||(e.SymbolInformation={}));var tp;(function(p){function R(b,g,d,E){return E!==void 0?{name:b,kind:g,location:{uri:d,range:E}}:{name:b,kind:g,location:{uri:d}}}p.create=R})(tp=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var rp;(function(p){function R(g,d,E,P,re,dt){var qe={name:g,detail:d,kind:E,range:P,selectionRange:re};return dt!==void 0&&(qe.children=dt),qe}p.create=R;function b(g){var d=g;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(rp=e.DocumentSymbol||(e.DocumentSymbol={}));var no;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(no=e.CodeActionKind||(e.CodeActionKind={}));var Go;(function(p){p.Invoked=1,p.Automatic=2})(Go=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var rl;(function(p){function R(g,d,E){var P={diagnostics:g};return d!=null&&(P.only=d),E!=null&&(P.triggerKind=E),P}p.create=R;function b(g){var d=g;return k.defined(d)&&k.typedArray(d.diagnostics,y.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Go.Invoked||d.triggerKind===Go.Automatic)}p.is=b})(rl=e.CodeActionContext||(e.CodeActionContext={}));var wa;(function(p){function R(g,d,E){var P={title:g},re=!0;return typeof d=="string"?(re=!1,P.kind=d):$.is(d)?P.command=d:P.edit=d,re&&E!==void 0&&(P.kind=E),P}p.create=R;function b(g){var d=g;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,y.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(wa=e.CodeAction||(e.CodeAction={}));var nl;(function(p){function R(g,d){var E={range:g};return k.defined(d)&&(E.data=d),E}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=b})(nl=e.CodeLens||(e.CodeLens={}));var Ci;(function(p){function R(g,d){return{tabSize:g,insertSpaces:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(Ci=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(g,d,E){return{range:g,target:d,data:E}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var I;(function(p){function R(g,d){return{range:g,parent:d}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(I=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var W;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(W=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&(g.resultId===void 0||typeof g.resultId=="string")&&Array.isArray(g.data)&&(g.data.length===0||typeof g.data[0]=="number")}p.is=R})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function R(g,d){return{range:g,text:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function R(g,d,E){return{range:g,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var Ct;(function(p){function R(g,d){return{range:g,expression:d}}p.create=R;function b(g){var d=g;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(Ct=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ue;(function(p){function R(g,d){return{frameId:g,stoppedLocation:d}}p.create=R;function b(g){var d=g;return k.defined(d)&&a.is(g.stoppedLocation)}p.is=b})(ue=e.InlineValueContext||(e.InlineValueContext={}));var Ue;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(Ue=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function R(g){return{value:g}}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var yt;(function(p){function R(g,d,E){var P={position:g,label:d};return E!==void 0&&(P.kind=E),P}p.create=R;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||Ue.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(yt=e.InlayHint||(e.InlayHint={}));var rr;(function(p){function R(b){var g=b;return k.objectLiteral(g)&&n.is(g.uri)&&k.string(g.name)}p.is=R})(rr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Wn;(function(p){function R(E,P,re,dt){return new Cn(E,P,re,dt)}p.create=R;function b(E){var P=E;return!!(k.defined(P)&&k.string(P.uri)&&(k.undefined(P.languageId)||k.string(P.languageId))&&k.uinteger(P.lineCount)&&k.func(P.getText)&&k.func(P.positionAt)&&k.func(P.offsetAt))}p.is=b;function g(E,P){for(var re=E.getText(),dt=d(P,function(jo,il){var qy=jo.range.start.line-il.range.start.line;return qy===0?jo.range.start.character-il.range.start.character:qy}),qe=re.length,rn=dt.length-1;rn>=0;rn--){var nn=dt[rn],zn=E.offsetAt(nn.range.start),fe=E.offsetAt(nn.range.end);if(fe<=qe)re=re.substring(0,zn)+nn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");qe=zn}return re}p.applyEdits=g;function d(E,P){if(E.length<=1)return E;var re=E.length/2|0,dt=E.slice(0,re),qe=E.slice(re);d(dt,P),d(qe,P);for(var rn=0,nn=0,zn=0;rn<dt.length&&nn<qe.length;){var fe=P(dt[rn],qe[nn]);fe<=0?E[zn++]=dt[rn++]:E[zn++]=qe[nn++]}for(;rn<dt.length;)E[zn++]=dt[rn++];for(;nn<qe.length;)E[zn++]=qe[nn++];return E}})(Wn=e.TextDocument||(e.TextDocument={}));var Cn=function(){function p(R,b,g,d){this._uri=R,this._languageId=b,this._version=g,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),g=this.offsetAt(R.end);return this._content.substring(b,g)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,g=!0,d=0;d<b.length;d++){g&&(R.push(d),g=!1);var E=b.charAt(d);g=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}g&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),g=0,d=b.length;if(d===0)return s.create(0,R);for(;g<d;){var E=Math.floor((g+d)/2);b[E]>R?d=E:g=E+1}var P=g-1;return s.create(P,R-b[P])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var g=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(g+R.character,d),g)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function g(fe){return typeof fe>"u"}p.undefined=g;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return R.call(fe)==="[object String]"}p.string=E;function P(fe){return R.call(fe)==="[object Number]"}p.number=P;function re(fe,jo,il){return R.call(fe)==="[object Number]"&&jo<=fe&&fe<=il}p.numberRange=re;function dt(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=dt;function qe(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=qe;function rn(fe){return R.call(fe)==="[object Function]"}p.func=rn;function nn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=nn;function zn(fe,jo){return Array.isArray(fe)&&fe.every(jo)}p.typedArray=zn})(k||(k={}))})});var it=H(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.ProtocolNotificationType=pr.ProtocolNotificationType0=pr.ProtocolRequestType=pr.ProtocolRequestType0=pr.RegistrationType=pr.MessageDirection=void 0;var Vo=Qn(),pk;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(pk=pr.MessageDirection||(pr.MessageDirection={}));var fm=class{constructor(e){this.method=e}};pr.RegistrationType=fm;var dm=class extends Vo.RequestType0{constructor(e){super(e)}};pr.ProtocolRequestType0=dm;var pm=class extends Vo.RequestType{constructor(e){super(e,Vo.ParameterStructures.byName)}};pr.ProtocolRequestType=pm;var mm=class extends Vo.NotificationType0{constructor(e){super(e)}};pr.ProtocolNotificationType0=mm;var hm=class extends Vo.NotificationType{constructor(e){super(e,Vo.ParameterStructures.byName)}};pr.ProtocolNotificationType=hm});var hl=H(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.objectLiteral=St.typedArray=St.stringArray=St.array=St.func=St.error=St.number=St.string=St.boolean=void 0;function mk(t){return t===!0||t===!1}St.boolean=mk;function dg(t){return typeof t=="string"||t instanceof String}St.string=dg;function hk(t){return typeof t=="number"||t instanceof Number}St.number=hk;function yk(t){return t instanceof Error}St.error=yk;function gk(t){return typeof t=="function"}St.func=gk;function pg(t){return Array.isArray(t)}St.array=pg;function Tk(t){return pg(t)&&t.every(e=>dg(e))}St.stringArray=Tk;function vk(t,e){return Array.isArray(t)&&t.every(e)}St.typedArray=vk;function xk(t){return t!==null&&typeof t=="object"}St.objectLiteral=xk});var hg=H(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.ImplementationRequest=void 0;var mg=it(),Rk;(function(t){t.method="textDocument/implementation",t.messageDirection=mg.MessageDirection.clientToServer,t.type=new mg.ProtocolRequestType(t.method)})(Rk=Pa.ImplementationRequest||(Pa.ImplementationRequest={}))});var gg=H(Ia=>{"use strict";Object.defineProperty(Ia,"__esModule",{value:!0});Ia.TypeDefinitionRequest=void 0;var yg=it(),bk;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=yg.MessageDirection.clientToServer,t.type=new yg.ProtocolRequestType(t.method)})(bk=Ia.TypeDefinitionRequest||(Ia.TypeDefinitionRequest={}))});var Tg=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.DidChangeWorkspaceFoldersNotification=Si.WorkspaceFoldersRequest=void 0;var yl=it(),Ak;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=yl.MessageDirection.serverToClient,t.type=new yl.ProtocolRequestType0(t.method)})(Ak=Si.WorkspaceFoldersRequest||(Si.WorkspaceFoldersRequest={}));var Ck;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=yl.MessageDirection.clientToServer,t.type=new yl.ProtocolNotificationType(t.method)})(Ck=Si.DidChangeWorkspaceFoldersNotification||(Si.DidChangeWorkspaceFoldersNotification={}))});var xg=H(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.ConfigurationRequest=void 0;var vg=it(),Sk;(function(t){t.method="workspace/configuration",t.messageDirection=vg.MessageDirection.serverToClient,t.type=new vg.ProtocolRequestType(t.method)})(Sk=Da.ConfigurationRequest||(Da.ConfigurationRequest={}))});var Rg=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.ColorPresentationRequest=wi.DocumentColorRequest=void 0;var gl=it(),wk;(function(t){t.method="textDocument/documentColor",t.messageDirection=gl.MessageDirection.clientToServer,t.type=new gl.ProtocolRequestType(t.method)})(wk=wi.DocumentColorRequest||(wi.DocumentColorRequest={}));var kk;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=gl.MessageDirection.clientToServer,t.type=new gl.ProtocolRequestType(t.method)})(kk=wi.ColorPresentationRequest||(wi.ColorPresentationRequest={}))});var Ag=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.FoldingRangeRequest=void 0;var bg=it(),Ek;(function(t){t.method="textDocument/foldingRange",t.messageDirection=bg.MessageDirection.clientToServer,t.type=new bg.ProtocolRequestType(t.method)})(Ek=Oa.FoldingRangeRequest||(Oa.FoldingRangeRequest={}))});var Sg=H(La=>{"use strict";Object.defineProperty(La,"__esModule",{value:!0});La.DeclarationRequest=void 0;var Cg=it(),$k;(function(t){t.method="textDocument/declaration",t.messageDirection=Cg.MessageDirection.clientToServer,t.type=new Cg.ProtocolRequestType(t.method)})($k=La.DeclarationRequest||(La.DeclarationRequest={}))});var kg=H(Ma=>{"use strict";Object.defineProperty(Ma,"__esModule",{value:!0});Ma.SelectionRangeRequest=void 0;var wg=it(),Nk;(function(t){t.method="textDocument/selectionRange",t.messageDirection=wg.MessageDirection.clientToServer,t.type=new wg.ProtocolRequestType(t.method)})(Nk=Ma.SelectionRangeRequest||(Ma.SelectionRangeRequest={}))});var Eg=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.WorkDoneProgressCancelNotification=an.WorkDoneProgressCreateRequest=an.WorkDoneProgress=void 0;var _k=Qn(),Tl=it(),Pk;(function(t){t.type=new _k.ProgressType;function e(r){return r===t.type}t.is=e})(Pk=an.WorkDoneProgress||(an.WorkDoneProgress={}));var Ik;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Tl.MessageDirection.serverToClient,t.type=new Tl.ProtocolRequestType(t.method)})(Ik=an.WorkDoneProgressCreateRequest||(an.WorkDoneProgressCreateRequest={}));var Dk;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Tl.MessageDirection.clientToServer,t.type=new Tl.ProtocolNotificationType(t.method)})(Dk=an.WorkDoneProgressCancelNotification||(an.WorkDoneProgressCancelNotification={}))});var $g=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.CallHierarchyOutgoingCallsRequest=cn.CallHierarchyIncomingCallsRequest=cn.CallHierarchyPrepareRequest=void 0;var Xo=it(),Ok;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(Ok=cn.CallHierarchyPrepareRequest||(cn.CallHierarchyPrepareRequest={}));var Lk;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(Lk=cn.CallHierarchyIncomingCallsRequest||(cn.CallHierarchyIncomingCallsRequest={}));var Mk;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(Mk=cn.CallHierarchyOutgoingCallsRequest||(cn.CallHierarchyOutgoingCallsRequest={}))});var Ng=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.SemanticTokensRefreshRequest=wt.SemanticTokensRangeRequest=wt.SemanticTokensDeltaRequest=wt.SemanticTokensRequest=wt.SemanticTokensRegistrationType=wt.TokenFormat=void 0;var Zn=it(),Fk;(function(t){t.Relative="relative"})(Fk=wt.TokenFormat||(wt.TokenFormat={}));var vl;(function(t){t.method="textDocument/semanticTokens",t.type=new Zn.RegistrationType(t.method)})(vl=wt.SemanticTokensRegistrationType||(wt.SemanticTokensRegistrationType={}));var Uk;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=vl.method})(Uk=wt.SemanticTokensRequest||(wt.SemanticTokensRequest={}));var qk;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=vl.method})(qk=wt.SemanticTokensDeltaRequest||(wt.SemanticTokensDeltaRequest={}));var Gk;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=vl.method})(Gk=wt.SemanticTokensRangeRequest||(wt.SemanticTokensRangeRequest={}));var jk;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType0(t.method)})(jk=wt.SemanticTokensRefreshRequest||(wt.SemanticTokensRefreshRequest={}))});var Pg=H(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.ShowDocumentRequest=void 0;var _g=it(),Hk;(function(t){t.method="window/showDocument",t.messageDirection=_g.MessageDirection.serverToClient,t.type=new _g.ProtocolRequestType(t.method)})(Hk=Fa.ShowDocumentRequest||(Fa.ShowDocumentRequest={}))});var Dg=H(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.LinkedEditingRangeRequest=void 0;var Ig=it(),Kk;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Ig.MessageDirection.clientToServer,t.type=new Ig.ProtocolRequestType(t.method)})(Kk=Ua.LinkedEditingRangeRequest||(Ua.LinkedEditingRangeRequest={}))});var Og=H(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var Kr=it(),Bk;(function(t){t.file="file",t.folder="folder"})(Bk=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var Wk;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(Wk=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var zk;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(zk=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var Vk;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(Vk=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var Xk;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(Xk=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var Yk;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(Yk=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var Jk;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(Jk=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var Mg=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.MonikerRequest=ln.MonikerKind=ln.UniquenessLevel=void 0;var Lg=it(),Qk;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(Qk=ln.UniquenessLevel||(ln.UniquenessLevel={}));var Zk;(function(t){t.$import="import",t.$export="export",t.local="local"})(Zk=ln.MonikerKind||(ln.MonikerKind={}));var eE;(function(t){t.method="textDocument/moniker",t.messageDirection=Lg.MessageDirection.clientToServer,t.type=new Lg.ProtocolRequestType(t.method)})(eE=ln.MonikerRequest||(ln.MonikerRequest={}))});var Fg=H(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.TypeHierarchySubtypesRequest=un.TypeHierarchySupertypesRequest=un.TypeHierarchyPrepareRequest=void 0;var Yo=it(),tE;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(tE=un.TypeHierarchyPrepareRequest||(un.TypeHierarchyPrepareRequest={}));var rE;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(rE=un.TypeHierarchySupertypesRequest||(un.TypeHierarchySupertypesRequest={}));var nE;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(nE=un.TypeHierarchySubtypesRequest||(un.TypeHierarchySubtypesRequest={}))});var Ug=H(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.InlineValueRefreshRequest=ki.InlineValueRequest=void 0;var xl=it(),iE;(function(t){t.method="textDocument/inlineValue",t.messageDirection=xl.MessageDirection.clientToServer,t.type=new xl.ProtocolRequestType(t.method)})(iE=ki.InlineValueRequest||(ki.InlineValueRequest={}));var oE;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=xl.MessageDirection.clientToServer,t.type=new xl.ProtocolRequestType0(t.method)})(oE=ki.InlineValueRefreshRequest||(ki.InlineValueRefreshRequest={}))});var qg=H(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.InlayHintRefreshRequest=fn.InlayHintResolveRequest=fn.InlayHintRequest=void 0;var Jo=it(),sE;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(sE=fn.InlayHintRequest||(fn.InlayHintRequest={}));var aE;(function(t){t.method="inlayHint/resolve",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(aE=fn.InlayHintResolveRequest||(fn.InlayHintResolveRequest={}));var cE;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType0(t.method)})(cE=fn.InlayHintRefreshRequest||(fn.InlayHintRefreshRequest={}))});var jg=H(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var Gg=Qn(),lE=hl(),Qo=it(),uE;(function(t){function e(r){let n=r;return n&&lE.boolean(n.retriggerRequest)}t.is=e})(uE=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var fE;(function(t){t.Full="full",t.Unchanged="unchanged"})(fE=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var dE;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method),t.partialResult=new Gg.ProgressType})(dE=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var pE;(function(t){t.method="workspace/diagnostic",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method),t.partialResult=new Gg.ProgressType})(pE=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var mE;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType0(t.method)})(mE=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var Bg=H(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.DidCloseNotebookDocumentNotification=xe.DidSaveNotebookDocumentNotification=xe.DidChangeNotebookDocumentNotification=xe.NotebookCellArrayChange=xe.DidOpenNotebookDocumentNotification=xe.NotebookDocumentSyncRegistrationType=xe.NotebookDocument=xe.NotebookCell=xe.ExecutionSummary=xe.NotebookCellKind=void 0;var qa=co(),dn=hl(),Sn=it(),Hg;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Hg=xe.NotebookCellKind||(xe.NotebookCellKind={}));var Kg;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return dn.objectLiteral(o)&&qa.uinteger.is(o.executionOrder)&&(o.success===void 0||dn.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Kg=xe.ExecutionSummary||(xe.ExecutionSummary={}));var ym;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return dn.objectLiteral(s)&&Hg.is(s.kind)&&qa.DocumentUri.is(s.document)&&(s.metadata===void 0||dn.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Kg.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(dn.objectLiteral(o)&&dn.objectLiteral(s)){let l=Object.keys(o),u=Object.keys(s);if(l.length!==u.length||(l.sort(),u.sort(),!i(l,u)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(ym=xe.NotebookCell||(xe.NotebookCell={}));var hE;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return dn.objectLiteral(i)&&dn.string(i.uri)&&qa.integer.is(i.version)&&dn.typedArray(i.cells,ym.is)}t.is=r})(hE=xe.NotebookDocument||(xe.NotebookDocument={}));var Ga;(function(t){t.method="notebookDocument/sync",t.messageDirection=Sn.MessageDirection.clientToServer,t.type=new Sn.RegistrationType(t.method)})(Ga=xe.NotebookDocumentSyncRegistrationType||(xe.NotebookDocumentSyncRegistrationType={}));var yE;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Sn.MessageDirection.clientToServer,t.type=new Sn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(yE=xe.DidOpenNotebookDocumentNotification||(xe.DidOpenNotebookDocumentNotification={}));var gE;(function(t){function e(n){let i=n;return dn.objectLiteral(i)&&qa.uinteger.is(i.start)&&qa.uinteger.is(i.deleteCount)&&(i.cells===void 0||dn.typedArray(i.cells,ym.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(gE=xe.NotebookCellArrayChange||(xe.NotebookCellArrayChange={}));var TE;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Sn.MessageDirection.clientToServer,t.type=new Sn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(TE=xe.DidChangeNotebookDocumentNotification||(xe.DidChangeNotebookDocumentNotification={}));var vE;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Sn.MessageDirection.clientToServer,t.type=new Sn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(vE=xe.DidSaveNotebookDocumentNotification||(xe.DidSaveNotebookDocumentNotification={}));var xE;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Sn.MessageDirection.clientToServer,t.type=new Sn.ProtocolNotificationType(t.method),t.registrationMethod=Ga.method})(xE=xe.DidCloseNotebookDocumentNotification||(xe.DidCloseNotebookDocumentNotification={}))});var eT=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=it(),Wg=co(),zt=hl(),RE=hg();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return RE.ImplementationRequest}});var bE=gg();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return bE.TypeDefinitionRequest}});var zg=Tg();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return zg.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return zg.DidChangeWorkspaceFoldersNotification}});var AE=xg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return AE.ConfigurationRequest}});var Vg=Rg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Vg.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Vg.ColorPresentationRequest}});var CE=Ag();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return CE.FoldingRangeRequest}});var SE=Sg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return SE.DeclarationRequest}});var wE=kg();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return wE.SelectionRangeRequest}});var gm=Eg();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return gm.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return gm.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return gm.WorkDoneProgressCancelNotification}});var Tm=$g();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyPrepareRequest}});var Zo=Ng();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Zo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Zo.SemanticTokensRegistrationType}});var kE=Pg();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return kE.ShowDocumentRequest}});var EE=Dg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return EE.LinkedEditingRangeRequest}});var lo=Og();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return lo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return lo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return lo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return lo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return lo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return lo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return lo.WillDeleteFilesRequest}});var vm=Mg();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return vm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return vm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return vm.MonikerRequest}});var xm=Fg();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return xm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySupertypesRequest}});var Xg=Ug();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Xg.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Xg.InlineValueRefreshRequest}});var Rm=qg();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return Rm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Rm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Rm.InlayHintRefreshRequest}});var ja=jg();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return ja.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return ja.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return ja.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return ja.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return ja.DiagnosticRefreshRequest}});var wn=Bg();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return wn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return wn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return wn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return wn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return wn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return wn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidCloseNotebookDocumentNotification}});var Yg;(function(t){function e(r){let n=r;return zt.string(n.language)||zt.string(n.scheme)||zt.string(n.pattern)}t.is=e})(Yg=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Jg;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebookType)||zt.string(n.scheme)||zt.string(n.pattern))}t.is=e})(Jg=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Qg;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebook)||Jg.is(n.notebook))&&(n.language===void 0||zt.string(n.language))}t.is=e})(Qg=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var Zg;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!zt.string(n)&&!Yg.is(n)&&!Qg.is(n))return!1;return!0}t.is=e})(Zg=h.DocumentSelector||(h.DocumentSelector={}));var $E;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})($E=h.RegistrationRequest||(h.RegistrationRequest={}));var NE;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(NE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var _E;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(_E=h.ResourceOperationKind||(h.ResourceOperationKind={}));var PE;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(PE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var IE;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(IE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var DE;(function(t){function e(r){let n=r;return n&&zt.string(n.id)&&n.id.length>0}t.hasId=e})(DE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var OE;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||Zg.is(n.documentSelector))}t.is=e})(OE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var LE;(function(t){function e(n){let i=n;return zt.objectLiteral(i)&&(i.workDoneProgress===void 0||zt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&zt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(LE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var ME;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(ME=h.InitializeRequest||(h.InitializeRequest={}));var FE;(function(t){t.unknownProtocolVersion=1})(FE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var UE;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(UE=h.InitializedNotification||(h.InitializedNotification={}));var qE;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(qE=h.ShutdownRequest||(h.ShutdownRequest={}));var GE;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(GE=h.ExitNotification||(h.ExitNotification={}));var jE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(jE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var HE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(HE=h.MessageType||(h.MessageType={}));var KE;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(KE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var BE;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(BE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var WE;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(WE=h.LogMessageNotification||(h.LogMessageNotification={}));var zE;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(zE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var VE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(VE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var XE;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(XE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var YE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(YE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var JE;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(JE=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var QE;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(QE=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var ZE;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(ZE=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var e$;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(e$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var t$;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(t$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var r$;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(r$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var n$;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(n$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var i$;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(i$=h.FileChangeType||(h.FileChangeType={}));var o$;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(Wg.URI.is(n.baseUri)||Wg.WorkspaceFolder.is(n.baseUri))&&zt.string(n.pattern)}t.is=e})(o$=h.RelativePattern||(h.RelativePattern={}));var s$;(function(t){t.Create=1,t.Change=2,t.Delete=4})(s$=h.WatchKind||(h.WatchKind={}));var a$;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(a$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var c$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(c$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var l$;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(l$=h.CompletionRequest||(h.CompletionRequest={}));var u$;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(u$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var f$;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(f$=h.HoverRequest||(h.HoverRequest={}));var d$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(d$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var p$;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(p$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var m$;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(m$=h.DefinitionRequest||(h.DefinitionRequest={}));var h$;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(h$=h.ReferencesRequest||(h.ReferencesRequest={}));var y$;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(y$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var g$;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(g$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var T$;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(T$=h.CodeActionRequest||(h.CodeActionRequest={}));var v$;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(v$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var x$;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(x$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var R$;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(R$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var b$;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(b$=h.CodeLensRequest||(h.CodeLensRequest={}));var A$;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(A$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var C$;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(C$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var S$;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(S$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var w$;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(w$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var k$;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(k$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var E$;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(E$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var $$;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})($$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var N$;(function(t){t.Identifier=1})(N$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var _$;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(_$=h.RenameRequest||(h.RenameRequest={}));var P$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(P$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var I$;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(I$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var D$;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(D$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var rT=H(Rl=>{"use strict";Object.defineProperty(Rl,"__esModule",{value:!0});Rl.createProtocolConnection=void 0;var tT=Qn();function O$(t,e,r,n){return tT.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,tT.createMessageConnection)(t,e,r,n)}Rl.createProtocolConnection=O$});var nT=H(mr=>{"use strict";var L$=mr&&mr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),bl=mr&&mr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&L$(e,t,r)};Object.defineProperty(mr,"__esModule",{value:!0});mr.LSPErrorCodes=mr.createProtocolConnection=void 0;bl(Qn(),mr);bl(co(),mr);bl(it(),mr);bl(eT(),mr);var M$=rT();Object.defineProperty(mr,"createProtocolConnection",{enumerable:!0,get:function(){return M$.createProtocolConnection}});var F$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(F$=mr.LSPErrorCodes||(mr.LSPErrorCodes={}))});var kt=H(kn=>{"use strict";var U$=kn&&kn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),iT=kn&&kn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&U$(e,t,r)};Object.defineProperty(kn,"__esModule",{value:!0});kn.createProtocolConnection=void 0;var q$=um();iT(um(),kn);iT(nT(),kn);function G$(t,e,r,n){return(0,q$.createMessageConnection)(t,e,r,n)}kn.createProtocolConnection=G$});var Am=H(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.SemanticTokensBuilder=Ei.SemanticTokensDiff=Ei.SemanticTokensFeature=void 0;var Al=kt(),j$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Al.SemanticTokensRefreshRequest.type),on:e=>{let r=Al.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Al.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Al.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ei.SemanticTokensFeature=j$;var Cl=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ei.SemanticTokensDiff=Cl;var bm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Cl(this._prevData,this._data).computeDiff()}:this.build()}};Ei.SemanticTokensBuilder=bm});var Sm=H(Sl=>{"use strict";Object.defineProperty(Sl,"__esModule",{value:!0});Sl.TextDocuments=void 0;var uo=kt(),Cm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new uo.Emitter,this._onDidOpen=new uo.Emitter,this._onDidClose=new uo.Emitter,this._onDidSave=new uo.Emitter,this._onWillSave=new uo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=uo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),uo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Sl.TextDocuments=Cm});var km=H(es=>{"use strict";Object.defineProperty(es,"__esModule",{value:!0});es.NotebookDocuments=es.NotebookSyncFeature=void 0;var Br=kt(),oT=Sm(),H$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Br.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Br.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Br.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Br.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};es.NotebookSyncFeature=H$;var wl=class t{onDidOpenTextDocument(e){return this.openHandler=e,Br.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Br.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Br.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};wl.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var wm=class{constructor(e){e instanceof oT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new oT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Br.Emitter,this._onDidChange=new Br.Emitter,this._onDidSave=new Br.Emitter,this._onDidClose=new Br.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new wl,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let l=[],u=[],f=[],m=[];if(c.cells!==void 0){let S=c.cells;if(S.structure!==void 0){let T=S.structure.array;if(o.cells.splice(T.start,T.deleteCount,...T.cells!==void 0?T.cells:[]),S.structure.didOpen!==void 0)for(let y of S.structure.didOpen)r.openTextDocument({textDocument:y}),l.push(y.uri);if(S.structure.didClose)for(let y of S.structure.didClose)r.closeTextDocument({textDocument:y}),u.push(y.uri)}if(S.data!==void 0){let T=new Map(S.data.map(y=>[y.document,y]));for(let y=0;y<=o.cells.length;y++){let $=T.get(o.cells[y].document);if($!==void 0){let D=o.cells.splice(y,1,$);if(f.push({old:D[0],new:$}),T.delete($.document),T.size===0)break}}}if(S.textContent!==void 0)for(let T of S.textContent)r.changeTextDocument({textDocument:T.document,contentChanges:T.changes}),m.push(T.document.uri)}this.updateCellMap(o);let v={notebookDocument:o};a&&(v.metadata={old:s,new:o.metadata});let A=[];for(let S of l)A.push(this.getNotebookCell(S));let C=[];for(let S of u)C.push(this.getNotebookCell(S));let N=[];for(let S of m)N.push(this.getNotebookCell(S));(A.length>0||C.length>0||f.length>0||N.length>0)&&(v.cells={added:A,removed:C,changed:{data:f,textContent:N}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Br.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};es.NotebookDocuments=wm});var Em=H(Et=>{"use strict";Object.defineProperty(Et,"__esModule",{value:!0});Et.thenable=Et.typedArray=Et.stringArray=Et.array=Et.func=Et.error=Et.number=Et.string=Et.boolean=void 0;function K$(t){return t===!0||t===!1}Et.boolean=K$;function sT(t){return typeof t=="string"||t instanceof String}Et.string=sT;function B$(t){return typeof t=="number"||t instanceof Number}Et.number=B$;function W$(t){return t instanceof Error}Et.error=W$;function aT(t){return typeof t=="function"}Et.func=aT;function cT(t){return Array.isArray(t)}Et.array=cT;function z$(t){return cT(t)&&t.every(e=>sT(e))}Et.stringArray=z$;function V$(t,e){return Array.isArray(t)&&t.every(e)}Et.typedArray=V$;function X$(t){return t&&aT(t.then)}Et.thenable=X$});var $m=H(Wr=>{"use strict";Object.defineProperty(Wr,"__esModule",{value:!0});Wr.generateUuid=Wr.parse=Wr.isUUID=Wr.v4=Wr.empty=void 0;var Ha=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Ka=class t extends Ha{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Ka._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Ka._timeHighBits=["8","9","a","b"];Wr.empty=new Ha("00000000-0000-0000-0000-000000000000");function lT(){return new Ka}Wr.v4=lT;var Y$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function uT(t){return Y$.test(t)}Wr.isUUID=uT;function J$(t){if(!uT(t))throw new Error("invalid uuid");return new Ha(t)}Wr.parse=J$;function Q$(){return lT().asHex()}Wr.generateUuid=Q$});var fT=H(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.attachPartialResult=Ni.ProgressFeature=Ni.attachWorkDone=void 0;var $i=kt(),Z$=$m(),fo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress($i.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress($i.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress($i.WorkDoneProgress.type,this._token,{kind:"end"})}};fo.Instances=new Map;var kl=class extends fo{constructor(e,r){super(e,r),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ba=class{constructor(){}begin(){}report(){}done(){}},El=class extends Ba{constructor(){super(),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function eN(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ba;let r=e.workDoneToken;return delete e.workDoneToken,new fo(t,r)}Ni.attachWorkDone=eN;var tN=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification($i.WorkDoneProgressCancelNotification.type,r=>{let n=fo.Instances.get(r.token);(n instanceof kl||n instanceof El)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ba:new fo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,Z$.generateUuid)();return this.connection.sendRequest($i.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new kl(this.connection,e))}else return Promise.resolve(new El)}};Ni.ProgressFeature=tN;var Nm;(function(t){t.type=new $i.ProgressType})(Nm||(Nm={}));var _m=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Nm.type,this._token,e)}};function rN(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new _m(t,r)}Ni.attachPartialResult=rN});var dT=H($l=>{"use strict";Object.defineProperty($l,"__esModule",{value:!0});$l.ConfigurationFeature=void 0;var nN=kt(),iN=Em(),oN=t=>class extends t{getConfiguration(e){return e?iN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(nN.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};$l.ConfigurationFeature=oN});var pT=H(_l=>{"use strict";Object.defineProperty(_l,"__esModule",{value:!0});_l.WorkspaceFoldersFeature=void 0;var Nl=kt(),sN=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Nl.Emitter,this.connection.onNotification(Nl.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Nl.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Nl.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};_l.WorkspaceFoldersFeature=sN});var mT=H(Pl=>{"use strict";Object.defineProperty(Pl,"__esModule",{value:!0});Pl.CallHierarchyFeature=void 0;var Pm=kt(),aN=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Pm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Pm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Pm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Pl.CallHierarchyFeature=aN});var hT=H(Il=>{"use strict";Object.defineProperty(Il,"__esModule",{value:!0});Il.ShowDocumentFeature=void 0;var cN=kt(),lN=t=>class extends t{showDocument(e){return this.connection.sendRequest(cN.ShowDocumentRequest.type,e)}};Il.ShowDocumentFeature=lN});var yT=H(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.FileOperationsFeature=void 0;var ts=kt(),uN=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(ts.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(ts.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(ts.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(ts.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(ts.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(ts.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Dl.FileOperationsFeature=uN});var gT=H(Ol=>{"use strict";Object.defineProperty(Ol,"__esModule",{value:!0});Ol.LinkedEditingRangeFeature=void 0;var fN=kt(),dN=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(fN.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Ol.LinkedEditingRangeFeature=dN});var TT=H(Ll=>{"use strict";Object.defineProperty(Ll,"__esModule",{value:!0});Ll.TypeHierarchyFeature=void 0;var Im=kt(),pN=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Im.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Im.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Im.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ll.TypeHierarchyFeature=pN});var xT=H(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.InlineValueFeature=void 0;var vT=kt(),mN=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(vT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(vT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Ml.InlineValueFeature=mN});var RT=H(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.InlayHintFeature=void 0;var Dm=kt(),hN=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Dm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Dm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Dm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Fl.InlayHintFeature=hN});var bT=H(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.DiagnosticFeature=void 0;var Wa=kt(),yN=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Wa.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Wa.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Wa.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Wa.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Wa.WorkspaceDiagnosticRequest.partialResult,r)))}}};Ul.DiagnosticFeature=yN});var AT=H(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.MonikerFeature=void 0;var gN=kt(),TN=t=>class extends t{get moniker(){return{on:e=>{let r=gN.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};ql.MonikerFeature=TN});var LT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var U=kt(),zr=Em(),Lm=$m(),te=fT(),vN=dT(),xN=pT(),RN=mT(),bN=Am(),AN=hT(),CN=yT(),SN=gT(),wN=TT(),kN=xT(),EN=RT(),$N=bT(),NN=km(),_N=AT();function Om(t){if(t!==null)return t}var Mm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=Mm;var Gl=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},Fm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Om)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Om)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Om)}},CT=(0,AN.ShowDocumentFeature)((0,te.ProgressFeature)(Fm)),PN;(function(t){function e(){return new jl}t.create=e})(PN=he.BulkRegistration||(he.BulkRegistration={}));var jl=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=zr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Lm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},IN;(function(t){function e(){return new za(void 0,[])}t.create=e})(IN=he.BulkUnregistration||(he.BulkUnregistration={}));var za=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=zr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Hl=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof jl?this.registerMany(e):e instanceof za?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=zr.string(r)?r:r.method,o=Lm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=zr.string(e)?e:e.method,i=Lm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new za(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Um=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},ST=(0,CN.FileOperationsFeature)((0,xN.WorkspaceFoldersFeature)((0,vN.ConfigurationFeature)(Um))),Kl=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Bl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Wl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Wl;var wT=(0,_N.MonikerFeature)((0,$N.DiagnosticFeature)((0,EN.InlayHintFeature)((0,kN.InlineValueFeature)((0,wN.TypeHierarchyFeature)((0,SN.LinkedEditingRangeFeature)((0,bN.SemanticTokensFeature)((0,RN.CallHierarchyFeature)(Wl)))))))),zl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=zl;var kT=(0,NN.NotebookSyncFeature)(zl);function ET(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=ET;function $T(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=$T;function NT(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=NT;function _T(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=_T;function PT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=PT;function IT(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=IT;function DT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=DT;function OT(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=OT;function DN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,ET),tracer:r(t.tracer,e.tracer,NT),telemetry:r(t.telemetry,e.telemetry,$T),client:r(t.client,e.client,_T),window:r(t.window,e.window,PT),workspace:r(t.workspace,e.workspace,IT),languages:r(t.languages,e.languages,DT),notebooks:r(t.notebooks,e.notebooks,OT)}}he.combineFeatures=DN;function ON(t,e,r){let n=r&&r.console?new(r.console(Gl)):new Gl,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Kl)):new Kl,s=r&&r.telemetry?new(r.telemetry(Bl)):new Bl,a=r&&r.client?new(r.client(Hl)):new Hl,c=r&&r.window?new(r.window(CT)):new CT,l=r&&r.workspace?new(r.workspace(ST)):new ST,u=r&&r.languages?new(r.languages(wT)):new wT,f=r&&r.notebooks?new(r.notebooks(kT)):new kT,m=[n,o,s,a,c,l,u,f];function v(T){return T instanceof Promise?T:zr.thenable(T)?new Promise((y,$)=>{T.then(D=>y(D),D=>$(D))}):Promise.resolve(T)}let A,C,N,S={listen:()=>i.listen(),sendRequest:(T,...y)=>i.sendRequest(zr.string(T)?T:T.method,...y),onRequest:(T,y)=>i.onRequest(T,y),sendNotification:(T,y)=>{let $=zr.string(T)?T:T.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,y)},onNotification:(T,y)=>i.onNotification(T,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:T=>(C=T,{dispose:()=>{C=void 0}}),onInitialized:T=>i.onNotification(U.InitializedNotification.type,T),onShutdown:T=>(A=T,{dispose:()=>{A=void 0}}),onExit:T=>(N=T,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return l},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:T=>i.onNotification(U.DidChangeConfigurationNotification.type,T),onDidChangeWatchedFiles:T=>i.onNotification(U.DidChangeWatchedFilesNotification.type,T),__textDocumentSync:void 0,onDidOpenTextDocument:T=>i.onNotification(U.DidOpenTextDocumentNotification.type,T),onDidChangeTextDocument:T=>i.onNotification(U.DidChangeTextDocumentNotification.type,T),onDidCloseTextDocument:T=>i.onNotification(U.DidCloseTextDocumentNotification.type,T),onWillSaveTextDocument:T=>i.onNotification(U.WillSaveTextDocumentNotification.type,T),onWillSaveTextDocumentWaitUntil:T=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,T),onDidSaveTextDocument:T=>i.onNotification(U.DidSaveTextDocumentNotification.type,T),sendDiagnostics:T=>i.sendNotification(U.PublishDiagnosticsNotification.type,T),onHover:T=>i.onRequest(U.HoverRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onCompletion:T=>i.onRequest(U.CompletionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCompletionResolve:T=>i.onRequest(U.CompletionResolveRequest.type,T),onSignatureHelp:T=>i.onRequest(U.SignatureHelpRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDeclaration:T=>i.onRequest(U.DeclarationRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDefinition:T=>i.onRequest(U.DefinitionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onTypeDefinition:T=>i.onRequest(U.TypeDefinitionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onImplementation:T=>i.onRequest(U.ImplementationRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onReferences:T=>i.onRequest(U.ReferencesRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentHighlight:T=>i.onRequest(U.DocumentHighlightRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentSymbol:T=>i.onRequest(U.DocumentSymbolRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbol:T=>i.onRequest(U.WorkspaceSymbolRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:T=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,T),onCodeAction:T=>i.onRequest(U.CodeActionRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeActionResolve:T=>i.onRequest(U.CodeActionResolveRequest.type,(y,$)=>T(y,$)),onCodeLens:T=>i.onRequest(U.CodeLensRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeLensResolve:T=>i.onRequest(U.CodeLensResolveRequest.type,(y,$)=>T(y,$)),onDocumentFormatting:T=>i.onRequest(U.DocumentFormattingRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:T=>i.onRequest(U.DocumentRangeFormattingRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:T=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(y,$)=>T(y,$)),onRenameRequest:T=>i.onRequest(U.RenameRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),onPrepareRename:T=>i.onRequest(U.PrepareRenameRequest.type,(y,$)=>T(y,$)),onDocumentLinks:T=>i.onRequest(U.DocumentLinkRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentLinkResolve:T=>i.onRequest(U.DocumentLinkResolveRequest.type,(y,$)=>T(y,$)),onDocumentColor:T=>i.onRequest(U.DocumentColorRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onColorPresentation:T=>i.onRequest(U.ColorPresentationRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onFoldingRanges:T=>i.onRequest(U.FoldingRangeRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onSelectionRanges:T=>i.onRequest(U.SelectionRangeRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onExecuteCommand:T=>i.onRequest(U.ExecuteCommandRequest.type,(y,$)=>T(y,$,(0,te.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let T of m)T.attach(S);return i.onRequest(U.InitializeRequest.type,T=>{e.initialize(T),zr.string(T.trace)&&(o.trace=U.Trace.fromString(T.trace));for(let y of m)y.initialize(T.capabilities);if(C){let y=C(T,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,T),void 0);return v(y).then($=>{if($ instanceof U.ResponseError)return $;let D=$;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=zr.number(S.__textDocumentSync)?S.__textDocumentSync:U.TextDocumentSyncKind.None:!zr.number(X.textDocumentSync)&&!zr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=zr.number(S.__textDocumentSync)?S.__textDocumentSync:U.TextDocumentSyncKind.None);for(let ge of m)ge.fillServerCapabilities(X);return D})}else{let y={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,A)return A(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,T=>{o.trace=U.Trace.fromString(T.value)}),S}he.createConnection=ON});var qm=H(Vt=>{"use strict";var LN=Vt&&Vt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),MT=Vt&&Vt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&LN(e,t,r)};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.ProposedFeatures=Vt.NotebookDocuments=Vt.TextDocuments=Vt.SemanticTokensBuilder=void 0;var MN=Am();Object.defineProperty(Vt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return MN.SemanticTokensBuilder}});MT(kt(),Vt);var FN=Sm();Object.defineProperty(Vt,"TextDocuments",{enumerable:!0,get:function(){return FN.TextDocuments}});var UN=km();Object.defineProperty(Vt,"NotebookDocuments",{enumerable:!0,get:function(){return UN.NotebookDocuments}});MT(LT(),Vt);var qN;(function(t){t.all={__brand:"features"}})(qN=Vt.ProposedFeatures||(Vt.ProposedFeatures={}))});var UT=H((mH,FT)=>{"use strict";FT.exports=kt()});var Ae=H(En=>{"use strict";var GN=En&&En.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),GT=En&&En.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&GN(e,t,r)};Object.defineProperty(En,"__esModule",{value:!0});En.createConnection=void 0;var Vl=qm();GT(UT(),En);GT(qm(),En);var qT=!1,jN={initialize:t=>{},get shutdownReceived(){return qT},set shutdownReceived(t){qT=t},exit:t=>{}};function HN(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Vl.ConnectionStrategy.is(t)||Vl.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let c=l=>(0,Vl.createProtocolConnection)(o,s,l,a);return(0,Vl.createConnection)(c,jN,i)}En.createConnection=HN});var rw=H((Mce,tw)=>{"use strict";tw.exports=Ae()});var ew=de(Ae(),1);var Xl=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=HT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),l=this._lineOffsets,u=jT(n.text,!1,o);if(c-a===u.length)for(let m=0,v=u.length;m<v;m++)l[m+a+1]=u[m];else u.length<1e4?l.splice(a+1,c-a,...u):this._lineOffsets=l=l.slice(0,a+1).concat(u,l.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,v=l.length;m<v;m++)l[m]=l[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=jT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},rs;(function(t){function e(i,o,s,a){return new Xl(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Xl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=Gm(o.map(KN),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),c=0,l=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&l.push(s.substring(c,f)),u.newText.length&&l.push(u.newText),c=i.offsetAt(u.range.end)}return l.push(s.substr(c)),l.join("")}t.applyEdits=n})(rs||(rs={}));function Gm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);Gm(n,e),Gm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function jT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function HT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function KN(t){let e=HT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function $t(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function ei(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function KT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function ns(t){return typeof t=="object"&&t!==null&&$t(t.container)&&ei(t.reference)&&typeof t.message=="string"}var po=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return $t(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function $n(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function mo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function BT(t){return $n(t)&&typeof t.fullText=="string"}var Ir=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return hr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=BN(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?hr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return hr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(Yl(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return hr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(Yl(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return hr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?hr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function BN(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Yl(t){return!!t&&typeof t[Symbol.iterator]=="function"}var is=new Ir(()=>{},()=>hr),hr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Ir)return e;if(Yl(e))return new Ir(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Ir(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:hr)}return t.length>1?new Ir(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Yl(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return hr}):is}var Vr=class extends Ir{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return hr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Va;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Va=Va||(Va={}));function jm(t){return new Vr(t,e=>$n(e)?e.content:[],{includeRoot:!0})}function VT(t){return jm(t).filter(mo)}function XT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Xa(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function or(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var ti;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(ti=ti||(ti={}));function WN(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return ti.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return ti.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?ti.Inside:r?ti.OverlapBack:ti.OverlapFront}function Jl(t,e){return WN(t,e)>ti.After}var Hm=/^[\w\p{L}]$/u;function Dt(t,e,r=Hm){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Ar(t,e)}}function YT(t,e){if(t){let r=zN(t,!0);if(r&&WT(r,e))return r;if(BT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(WT(o,e))return o}}}}function WT(t,e){return mo(t)&&e.includes(t.tokenType.name)}function Ar(t,e){if(mo(t))return t;if($n(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return Ar(o,e)}if(r===n)return Ar(t.content[r],e)}}function zN(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function JT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function QT(t,e){let r=VN(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function VN(t,e){let r=zT(t),n=zT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function zT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function ho(t,e,r,n){let i=[t,e,r,n].reduce(rv,{});return tv(i)}var Km=Symbol("isProxy");function Ql(t){if(t&&t[Km])for(let e of Object.values(t))Ql(e);return t}function tv(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>ev(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(ev(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Km]});return r[Km]=!0,r}var ZT=Symbol();function ev(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===ZT)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=ZT;try{t[e]=typeof i=="function"?i(n):tv(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function rv(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=rv(i,n):t[r]=n}}return t}var Le=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Va.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Bm="AbstractRule";var yo="AbstractType";var XN="Condition";var YN="TypeDefinition";var Wm="AbstractElement";function os(t){return le.isInstance(t,Wm)}var nv="ArrayType";function go(t){return le.isInstance(t,nv)}var iv="Conjunction";function ov(t){return le.isInstance(t,iv)}var sv="Disjunction";function av(t){return le.isInstance(t,sv)}var cv="Grammar";function ss(t){return le.isInstance(t,cv)}var JN="GrammarImport";function Zl(t){return le.isInstance(t,JN)}var QN="InferredType";function as(t){return le.isInstance(t,QN)}var Ja="Interface";function Cr(t){return le.isInstance(t,Ja)}var lv="LiteralCondition";function uv(t){return le.isInstance(t,lv)}var fv="Negation";function dv(t){return le.isInstance(t,fv)}var pv="Parameter";function mv(t){return le.isInstance(t,pv)}var hv="ParameterReference";function cs(t){return le.isInstance(t,hv)}var yv="ParserRule";function K(t){return le.isInstance(t,yv)}var gv="ReferenceType";function To(t){return le.isInstance(t,gv)}var ZN="ReturnType";function ls(t){return le.isInstance(t,ZN)}var Tv="SimpleType";function sr(t){return le.isInstance(t,Tv)}var zm="TerminalRule";function Ce(t){return le.isInstance(t,zm)}var Qa="Type";function Ft(t){return le.isInstance(t,Qa)}var e_="TypeAttribute";function eu(t){return le.isInstance(t,e_)}var vv="UnionType";function Xr(t){return le.isInstance(t,vv)}var xv="Action";function Ne(t){return le.isInstance(t,xv)}var Rv="Alternatives";function Dr(t){return le.isInstance(t,Rv)}var bv="Assignment";function Re(t){return le.isInstance(t,bv)}var Av="CharacterRange";function tu(t){return le.isInstance(t,Av)}var Cv="CrossReference";function Xt(t){return le.isInstance(t,Cv)}var Sv="Group";function Ut(t){return le.isInstance(t,Sv)}var wv="Keyword";function pt(t){return le.isInstance(t,wv)}var kv="NegatedToken";function Ev(t){return le.isInstance(t,kv)}var $v="RegexToken";function Nv(t){return le.isInstance(t,$v)}var _v="RuleCall";function _e(t){return le.isInstance(t,_v)}var Pv="TerminalAlternatives";function Iv(t){return le.isInstance(t,Pv)}var Dv="TerminalGroup";function Ov(t){return le.isInstance(t,Dv)}var Lv="TerminalRuleCall";function ru(t){return le.isInstance(t,Lv)}var Mv="UnorderedGroup";function Or(t){return le.isInstance(t,Mv)}var Fv="UntilToken";function Uv(t){return le.isInstance(t,Fv)}var qv="Wildcard";function Gv(t){return le.isInstance(t,qv)}var Ya=class extends po{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case xv:return this.isSubtype(Wm,r)||this.isSubtype(yo,r);case Rv:case bv:case Av:case Cv:case Sv:case wv:case kv:case $v:case _v:case Pv:case Dv:case Lv:case Mv:case Fv:case qv:return this.isSubtype(Wm,r);case nv:case gv:case Tv:case vv:return this.isSubtype(YN,r);case iv:case sv:case lv:case fv:case hv:return this.isSubtype(XN,r);case Ja:case Qa:return this.isSubtype(yo,r);case yv:return this.isSubtype(Bm,r)||this.isSubtype(yo,r);case zm:return this.isSubtype(Bm,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return yo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Bm;case"Grammar:usedGrammars":return cv;case"NamedArgument:parameter":case"ParameterReference:parameter":return pv;case"TerminalRuleCall:rule":return zm;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Ya;function jv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{$t(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):$t(r)&&(r.$container=t,r.$containerProperty=e))}function Pe(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=nu(t).$document;if(!r)throw new Error("AST node has no document.");return r}function nu(t){for(;t.$container;)t=t.$container;return t}function _i(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Ir(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if($t(o)){if(n.keyIndex++,Vm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if($t(a)&&Vm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return hr})}function Qe(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Vr(t,r=>_i(r,e))}function ni(t,e){if(t){if(e?.range&&!Vm(t,e.range))return new Vr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Vr(t,r=>_i(r,e),{includeRoot:!0})}function Vm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Jl(n,e):!1}function iu(t){return new Ir(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(ei(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(ei(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return hr})}function Hv(t){var e,r;if(t){if("astNode"in t)return n_(t);if(Array.isArray(t))return t.reduce(Kv,void 0);{let n=t,i=t_(n)?r_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return us(n,i)}}else return}function t_(t){return typeof t<"u"&&"element"in t&&"text"in t}function r_(t){try{return ne(t).uri.toString()}catch{return}}function n_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return us(s,Xm(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(Kv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let c=a(s.assignments[i]);return c&&us(c,Xm(n))}else if(n.$cstNode){let c=a(Pi(n.$cstNode,i));return c&&us(c,Xm(n))}else return}}}function Xm(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Vr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function us(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Kv(t,e){var r,n;if(t){if(!e)return t&&us(t)}else return e&&us(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),c=a-s,l={offset:s,end:a,length:c};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let u=t.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;l.fileURI=m}return l}var Ym=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=i_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function i_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function Bv(t,e){let r=new Ym(e),n=r.pushTraceRegion(void 0);Wv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Wv(t,e){typeof t=="string"?o_(t,e):t instanceof fs?s_(t,e):t instanceof Yt?Xv(t,e):t instanceof Ii&&a_(t,e)}function zv(t,e){return typeof t=="string"?t.length!==0:t instanceof Yt?t.contents.some(r=>zv(r,e)):t instanceof Ii?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function o_(t,e){t&&(e.pendingIndent&&Vv(e,!1),e.append(t))}function Vv(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Xv(t,e){let r,n=Hv(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Wv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function s_(t,e){var r;if(zv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Xv(t,e)}finally{e.decreaseIndent()}}}function a_(t,e){t.ifNotEmpty&&!c_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Vv(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function c_(t){return t.trimStart()!==""}var FH=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Za=/\r?\n/g,l_=/\S|$/;function Yv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(l_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function Qm(t,...e){let r=u_(t),n=f_(t,e,r);return p_(n)}function Zv(t,e,r){return(n,...i)=>Zm(t,e,r)(Qm(n,...i))}function u_(t){let e=t.join("_").split(Za),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Yv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function f_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((l,u)=>{s.push(...l.split(Za).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(u===0?(f,m,v)=>v===0?n?[]:[m]:v===1&&f.length===0?[m]:f.concat(ou,m):(f,m,v)=>v===0?[m]:f.concat(ou,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(ec(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?ex:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===ou?s.slice(0,a-2):s.slice(0,a-1):s}var ou={isNewLine:!0},ex={isUndefinedSegment:!0},Qv=t=>t===ou,Jm=t=>t===ex,d_=t=>t.content!==void 0;function p_(t){return t.reduce((r,n,i)=>Jm(n)?r:Qv(n)?{node:i!==0&&(Jm(t[i-1])||ec(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Jm(t[i-2])||ec(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||Qv(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=d_(n)?n.content:n,c;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>c=l.append(a)}):r.node.append(a),indented:c??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Yt}).node}var Jv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function ec(t){return t instanceof Yt||t instanceof fs||t instanceof Ii}function ds(t,e){return ec(t)?Bv(t,e).text:String(t)}var Yt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if($t(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(st)}appendNewLineIf(e){return e?this.append(st):this}appendNewLineIfNotEmpty(){return this.append(m_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(Qm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new fs(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(Zv(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function Zm(t,e,r){return n=>n instanceof Yt&&n.tracedSource===void 0?n.trace(t,e,r):new Yt().trace(t,e,r).append(n)}var fs=class extends Yt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},Ii=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Jv,this.ifNotEmpty=r}},st=new Ii,m_=new Ii(void 0,!0);function ii(t){return"referenceType"in t}function oi(t){return"elementType"in t}function Ot(t){return"types"in t}function rh(t){if(Ot(t)){let e=[];for(let r of t.types)e.push(...rh(r));return e}else return[t]}function Lr(t){return"value"in t}function Mr(t){return"primitive"in t}function Nn(t){return"string"in t}function pn(t){return t&&"type"in t}function hn(t){return t&&"properties"in t}var au=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Yt;return r.append(`export type ${this.name} = ${mn(this.type,"AstType")};`,st),e&&(r.append(st),nx(r,this.name)),this.dataType&&h_(r,this),ds(r)}toDeclaredTypesString(e){let r=new Yt;return r.append(`type ${nh(this.name,e)} = ${mn(this.type,"DeclaredType")};`,st),ds(r)}},ps=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=hn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Yt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?vo([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,st),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${vo([...this.containerTypes].map(s=>s.name)).join(" | ")};`,st),this.typeNames.size>0&&o.append(`readonly $type: ${vo([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,st),tx(o,this.properties,"AstType")}),r.append("}",st),e&&(r.append(st),nx(r,this.name)),ds(r)}toDeclaredTypesString(e){let r=new Yt,n=nh(this.name,e),i=vo(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,st),r.indent(o=>tx(o,this.properties,"DeclaredType",e)),r.append("}",st),ds(r)}},cu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function rc(t,e){return Di(t,e,new Map)}function Di(t,e,r){let n=`${tc(t)}\xBB${tc(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Ot(t)?i=t.types.every(o=>Di(o,e,r)):Ot(e)?i=e.types.some(o=>Di(t,o,r)):Lr(e)&&pn(e.value)?Lr(t)&&pn(t.value)&&e.value.name===t.value.name?i=!0:i=Di(t,e.value.type,r):ii(t)?i=ii(e)&&Di(t.referenceType,e.referenceType,r):oi(t)?i=oi(e)&&Di(t.elementType,e.elementType,r):Lr(t)?pn(t.value)?i=Di(t.value.type,e,r):Lr(e)?pn(e.value)?i=Di(t,e.value.type,r):i=rx(t.value,e.value,new Set):i=!1:Mr(t)?i=Mr(e)&&t.primitive===e.primitive:Nn(t)&&(i=Mr(e)&&e.primitive==="string"||Nn(e)&&e.string===t.string),i&&r.set(n,i)),i}function rx(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(hn(i)&&rx(i,e,r))return!0;return!1}function tc(t){if(ii(t))return`@(${tc(t.referenceType)})}`;if(oi(t))return`(${tc(t.elementType)})[]`;if(Ot(t)){let e=t.types.map(r=>tc(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Lr(t))return`Value<${t.value.name}>`;if(Mr(t))return t.primitive;if(Nn(t))return`'${t.string}'`}throw new Error("Invalid type")}function mn(t,e="AstType"){if(ii(t)){let r=mn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${eh(t.referenceType,r)}`}else if(oi(t)){let r=mn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${eh(t.elementType,r)}[]`}else if(Ot(t)){let r=t.types.map(n=>eh(n,mn(n,e)));return vo(r).join(" | ")}else{if(Lr(t))return t.value.name;if(Mr(t))return t.primitive;if(Nn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function eh(t,e){return Ot(t)&&(e=`(${e})`),e}function tx(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:nh(o.name,n),a=o.optional&&!lu(o.type),c=mn(o.type,r);return`${s}${a?"?":""}: ${c}`}vo(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),st))}function lu(t){return oi(t)?!0:ii(t)?!1:Ot(t)?t.types.every(e=>lu(e)):Mr(t)?t.primitive==="boolean":!1}function nx(t,e){t.append(`export const ${e} = '${e}';`,st),t.append(st),t.append(`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,st)),t.append("}",st)}function h_(t,e){switch(e.dataType){case"string":if(th(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=ix(e.type),i=ox(e.type);if(r.length===0&&n.length===0&&i.length===0)su(t,e.name,`typeof item === '${e.dataType}'`);else{let o=y_(r,n,i);su(t,e.name,o)}}break;case"number":case"boolean":case"bigint":su(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":su(t,e.name,"item instanceof Date");break;default:return}}function th(t){let e=!0;if(Mr(t))return t.primitive==="string";if(Nn(t))return!0;if(Ot(t)){for(let r of t.types)if(Lr(r))if(pn(r.value)){if(!th(r.value.type))return!1}else return!1;else if(Mr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Ot(r))e=th(r);else if(!Nn(r))return!1}else return!1;return e}function y_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function nh(t,e){return e.has(t)?`^${t}`:t}function ix(t){let e=[];if(Nn(t))return[t.string];if(Ot(t))for(let r of t.types)Nn(r)?e.push(r.string):Ot(r)&&e.push(...ix(r));return e}function ox(t){let e=[];if(Mr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Ot(t))for(let r of t.types)Mr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Ot(r)&&e.push(...ox(r));return e}function su(t,e,r){t.append(st,`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(n=>n.append(`return ${r};`,st)),t.append("}",st)}function vo(t,e){return Array.from(new Set(t)).sort(e)}function ih(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);Cr(c)?(i.add(c),ih(c,e,r,n).forEach(u=>i.add(u))):c&&Ft(c.$container)&&i.add(c.$container)}),i}function nc(t){let e=new Set;if(Cr(t))e.add(t),t.superTypes.forEach(r=>{if(Cr(r.ref)){e.add(r.ref);let n=nc(r.ref);for(let i of n)e.add(i)}});else if(Ft(t)){let r=sx(t.type);for(let n of r){let i=nc(n);for(let o of i)e.add(o)}}return e}function sx(t){var e;if(Xr(t))return t.types.flatMap(r=>sx(r));if(sr(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Ft(r)||Cr(r))return[r]}return[]}function oh(t,e){return t.interfaces.concat(e.interfaces)}function fu(t){return t.interfaces.concat(t.unions)}function ax(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function cx(t){return uu(t,new Set)}function uu(t,e){if(e.has(t))return[];if(e.add(t),Ot(t))return t.types.flatMap(r=>uu(r,e));if(Lr(t)){let r=t.value;return"type"in r?uu(r.type,e):[r.name]}else if(oi(t))return uu(t.elementType,e);return[]}function ic(t){return typeof t.name=="string"}var ms=class{getName(e){if(ic(e))return e.name}getNameNode(e){return Jt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function du(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function hs(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function xo(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function oc(){throw Error("Internal Error - Should never get here!")}function sh(t){return t.type==="Character"}var sc=[];for(let t=J("0");t<=J("9");t++)sc.push(t);var ac=[J("_")].concat(sc);for(let t=J("a");t<=J("z");t++)ac.push(t);for(let t=J("A");t<=J("Z");t++)ac.push(t);var ah=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var g_=/[0-9a-fA-F]/,pu=/[0-9]/,T_=/[1-9]/,Ro=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":hs(n,"global");break;case"i":hs(n,"ignoreCase");break;case"m":hs(n,"multiLine");break;case"u":hs(n,"unicode");break;case"y":hs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}xo(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return oc()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;xo(r);break}if(!(e===!0&&r===void 0)&&xo(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),xo(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):oc()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=sc;break;case"D":e=sc,r=!0;break;case"s":e=ah;break;case"S":e=ah,r=!0;break;case"w":e=ac;break;case"W":e=ac,r=!0;break}return xo(e)?{type:"Set",value:e,complement:r}:oc()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return xo(e)?{type:"Character",value:e}:oc()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(sh(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(sh(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else du(n.value,e),e.push(J("-")),du(o.value,e)}else du(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(T_.test(e)===!1)throw Error("Expecting a positive integer");for(;pu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(pu.test(e)===!1)throw Error("Expecting an integer");for(;pu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return pu.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(g_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var _n=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var v_=new Ro,lh=class extends _n{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=si(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},ch=new lh;function lx(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),ch.reset(t),ch.visit(v_.pattern(t)),ch.multiline}catch{return!1}}function uh(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function si(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ux(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:si(e)).join("")}function fx(t,e){let r=x_(t),n=e.match(r);return!!n&&n[0].length>0}function x_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(l){o+=r.substr(n,l),n+=l}function c(l){o+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?r[n+2]==="{"?c(r.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(r.indexOf("}",n)-n+1):c(2);break;case"k":c(r.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):c(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),t.flags)}var fh={};Iw(fh,{URI:()=>mu,Utils:()=>R_});var dx;(()=>{"use strict";var t={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,l){for(var u,f="",m=0,v=-1,A=0,C=0;C<=c.length;++C){if(C<c.length)u=c.charCodeAt(C);else{if(u===47)break;u=47}if(u===47){if(!(v===C-1||A===1))if(v!==C-1&&A===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),v=C,A=0;continue}}else if(f.length===2||f.length===1){f="",m=0,v=C,A=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(v+1,C):f=c.slice(v+1,C),m=C-v-1;v=C,A=0}else u===46&&A!==-1?++A:A=-1}return f}var a={resolve:function(){for(var c,l="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(l=m+"/"+l,u=m.charCodeAt(0)===47)}return l=s(l,!u),u?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(c){if(o(c),c.length===0)return".";var l=c.charCodeAt(0)===47,u=c.charCodeAt(c.length-1)===47;return(c=s(c,!l)).length!==0||l||(c="."),c.length>0&&u&&(c+="/"),l?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,l=0;l<arguments.length;++l){var u=arguments[l];o(u),u.length>0&&(c===void 0?c=u:c+="/"+u)}return c===void 0?".":a.normalize(c)},relative:function(c,l){if(o(c),o(l),c===l||(c=a.resolve(c))===(l=a.resolve(l)))return"";for(var u=1;u<c.length&&c.charCodeAt(u)===47;++u);for(var f=c.length,m=f-u,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var A=l.length-v,C=m<A?m:A,N=-1,S=0;S<=C;++S){if(S===C){if(A>C){if(l.charCodeAt(v+S)===47)return l.slice(v+S+1);if(S===0)return l.slice(v+S)}else m>C&&(c.charCodeAt(u+S)===47?N=S:S===0&&(N=0));break}var T=c.charCodeAt(u+S);if(T!==l.charCodeAt(v+S))break;T===47&&(N=S)}var y="";for(S=u+N+1;S<=f;++S)S!==f&&c.charCodeAt(S)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+l.slice(v+N):(v+=N,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var l=c.charCodeAt(0),u=l===47,f=-1,m=!0,v=c.length-1;v>=1;--v)if((l=c.charCodeAt(v))===47){if(!m){f=v;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":c.slice(0,f)},basename:function(c,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(c);var u,f=0,m=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=c.length){if(l.length===c.length&&l===c)return"";var A=l.length-1,C=-1;for(u=c.length-1;u>=0;--u){var N=c.charCodeAt(u);if(N===47){if(!v){f=u+1;break}}else C===-1&&(v=!1,C=u+1),A>=0&&(N===l.charCodeAt(A)?--A==-1&&(m=u):(A=-1,m=C))}return f===m?m=C:m===-1&&(m=c.length),c.slice(f,m)}for(u=c.length-1;u>=0;--u)if(c.charCodeAt(u)===47){if(!v){f=u+1;break}}else m===-1&&(v=!1,m=u+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var l=-1,u=0,f=-1,m=!0,v=0,A=c.length-1;A>=0;--A){var C=c.charCodeAt(A);if(C!==47)f===-1&&(m=!1,f=A+1),C===46?l===-1?l=A:v!==1&&(v=1):l!==-1&&(v=-1);else if(!m){u=A+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===u+1?"":c.slice(l,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(l,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var l={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return l;var u,f=c.charCodeAt(0),m=f===47;m?(l.root="/",u=1):u=0;for(var v=-1,A=0,C=-1,N=!0,S=c.length-1,T=0;S>=u;--S)if((f=c.charCodeAt(S))!==47)C===-1&&(N=!1,C=S+1),f===46?v===-1?v=S:T!==1&&(T=1):v!==-1&&(T=-1);else if(!N){A=S+1;break}return v===-1||C===-1||T===0||T===1&&v===C-1&&v===A+1?C!==-1&&(l.base=l.name=A===0&&m?c.slice(1,C):c.slice(A,C)):(A===0&&m?(l.name=c.slice(1,v),l.base=c.slice(1,C)):(l.name=c.slice(A,v),l.base=c.slice(A,C)),l.ext=c.slice(v,C)),A>0?l.dir=c.slice(0,A-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>Rt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,w){if(!M.scheme&&w)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(w){return w instanceof m||!!w&&typeof w.authority=="string"&&typeof w.fragment=="string"&&typeof w.path=="string"&&typeof w.query=="string"&&typeof w.scheme=="string"&&typeof w.fsPath=="string"&&typeof w.with=="function"&&typeof w.toString=="function"}scheme;authority;path;query;fragment;constructor(w,q,j,ce,ee,Q=!1){typeof w=="object"?(this.scheme=w.scheme||l,this.authority=w.authority||l,this.path=w.path||l,this.query=w.query||l,this.fragment=w.fragment||l):(this.scheme=function(bt,ut){return bt||ut?bt:"file"}(w,Q),this.authority=q||l,this.path=function(bt,ut){switch(bt){case"https":case"http":case"file":ut?ut[0]!==u&&(ut=u+ut):ut=u}return ut}(this.scheme,j||l),this.query=ce||l,this.fragment=ee||l,c(this,Q))}get fsPath(){return T(this,!1)}with(w){if(!w)return this;let{scheme:q,authority:j,path:ce,query:ee,fragment:Q}=w;return q===void 0?q=this.scheme:q===null&&(q=l),j===void 0?j=this.authority:j===null&&(j=l),ce===void 0?ce=this.path:ce===null&&(ce=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),q===this.scheme&&j===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new A(q,j,ce,ee,Q)}static parse(w,q=!1){let j=f.exec(w);return j?new A(j[2]||l,X(j[4]||l),X(j[5]||l),X(j[7]||l),X(j[9]||l),q):new A(l,l,l,l,l)}static file(w){let q=l;if(i&&(w=w.replace(/\\/g,u)),w[0]===u&&w[1]===u){let j=w.indexOf(u,2);j===-1?(q=w.substring(2),w=u):(q=w.substring(2,j),w=w.substring(j)||u)}return new A("file",q,w,l,l)}static from(w){let q=new A(w.scheme,w.authority,w.path,w.query,w.fragment);return c(q,!0),q}toString(w=!1){return y(this,w)}toJSON(){return this}static revive(w){if(w){if(w instanceof m)return w;{let q=new A(w);return q._formatted=w.external,q._fsPath=w._sep===v?w.fsPath:null,q}}return w}}let v=i?1:void 0;class A extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=T(this,!1)),this._fsPath}toString(w=!1){return w?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let w={$mid:1};return this._fsPath&&(w.fsPath=this._fsPath,w._sep=v),this._formatted&&(w.external=this._formatted),this.path&&(w.path=this.path),this.scheme&&(w.scheme=this.scheme),this.authority&&(w.authority=this.authority),this.query&&(w.query=this.query),this.fragment&&(w.fragment=this.fragment),w}}let C={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,w,q){let j,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||w&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let bt=C[Q];bt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j+=bt):ce===-1&&(ce=ee)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function S(M){let w;for(let q=0;q<M.length;q++){let j=M.charCodeAt(q);j===35||j===63?(w===void 0&&(w=M.substr(0,q)),w+=C[j]):w!==void 0&&(w+=M[q])}return w!==void 0?w:M}function T(M,w){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?w?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function y(M,w){let q=w?S:N,j="",{scheme:ce,authority:ee,path:Q,query:bt,fragment:ut}=M;if(ce&&(j+=ce,j+=":"),(ee||ce==="file")&&(j+=u,j+=u),ee){let me=ee.indexOf("@");if(me!==-1){let Nr=ee.substr(0,me);ee=ee.substr(me+1),me=Nr.lastIndexOf(":"),me===-1?j+=q(Nr,!1,!1):(j+=q(Nr.substr(0,me),!1,!1),j+=":",j+=q(Nr.substr(me+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?j+=q(ee,!1,!0):(j+=q(ee.substr(0,me),!1,!0),j+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}j+=q(Q,!0,!1)}return bt&&(j+="?",j+=q(bt,!1,!1)),ut&&(j+="#",j+=w?ut:N(ut,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,w=>$(w)):M}var ge=r(470);let Ee=ge.posix||ge,Kt="/";var Rt;(function(M){M.joinPath=function(w,...q){return w.with({path:Ee.join(w.path,...q)})},M.resolvePath=function(w,...q){let j=w.path,ce=!1;j[0]!==Kt&&(j=Kt+j,ce=!0);let ee=Ee.resolve(j,...q);return ce&&ee[0]===Kt&&!w.authority&&(ee=ee.substring(1)),w.with({path:ee})},M.dirname=function(w){if(w.path.length===0||w.path===Kt)return w;let q=Ee.dirname(w.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),w.with({path:q})},M.basename=function(w){return Ee.basename(w.path)},M.extname=function(w){return Ee.extname(w.path)}})(Rt||(Rt={}))})(),dx=n})();var{URI:mu,Utils:R_}=dx;var ai=fh;"default"in ai&&(ai=ai.default);var Qt=ai.URI;var ve;(function(t){t.basename=ai.Utils.basename,t.dirname=ai.Utils.dirname,t.extname=ai.Utils.extname,t.joinPath=ai.Utils.joinPath,t.resolvePath=ai.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===c[l];l++);let u="../".repeat(a.length-l),f=c.slice(l).join("/");return u+f}t.relative=r})(ve=ve||(ve={}));var mK=ve.equals,hK=ve.relative;var hu,px=()=>hu??(hu=yu(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var vu=de(co(),1);var cc=de(Qn(),1);function b_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var mx=0,A_=10;var hx=Symbol("OperationCancelled");function bo(t){return t===hx}async function Ze(t){if(t===cc.CancellationToken.None)return;let e=Date.now();if(e-mx>=A_&&(mx=e,await b_()),t.isCancellationRequested)throw hx}var gu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new cc.CancellationTokenSource}lock(e){this.cancel();let r=new cc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{bo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Fr(t){return{code:t}}var ys;(function(t){t.all=["fast","slow","built-in"]})(ys=ys||(ys={}));var Tu=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function yx(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:Ao(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(yn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:Ao(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function Ao(t){if(go(t))return{elementType:Ao(t.elementType)};if(To(t))return{referenceType:Ao(t.referenceType)};if(Xr(t))return{types:t.types.map(Ao)};if(sr(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=Pn(r);if(n)return gs(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function Ts(t){return"referenceType"in t}function dh(t){return"elementType"in t}function gx(t){return"types"in t}function ph(t){return"value"in t}function C_(t){return"primitive"in t}function S_(t){return"string"in t}function Tx(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ps(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new au(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=w_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=lc(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function w_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:lc(t.type,void 0,e,r)}}function lc(t,e,r,n){if(dh(t))return{elementType:lc(t.elementType,e,r,n)};if(Ts(t))return{referenceType:lc(t.referenceType,void 0,r,n)};if(gx(t))return{types:t.types.map(i=>lc(i,e,r,n))};if(S_(t))return{string:t.string};if(C_(t))return{primitive:t.primitive,regex:t.regex};if(ph(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function hh(t,e){let r=uc(t),n=uc(e);for(let i of n)k_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function k_(t,e){return t.some(r=>mh(r,e))}function mh(t,e){return dh(t)&&dh(e)?mh(t.elementType,e.elementType):Ts(t)&&Ts(e)?mh(t.referenceType,e.referenceType):ph(t)&&ph(e)?t.value===e.value:!1}function uc(t){return gx(t)?t.types.flatMap(e=>uc(e)):[t]}function vx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Se;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Se=Se||(Se={}));var xu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Fr(Se.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>K(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>K(o)&&!Ur(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Fr(Se.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Ur(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!fc(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Le;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=dc(this.documents,e);for(let c of a)n(c).forEach(l=>s.add(l.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(u=>{r("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Le;for(let i of e.imports){let o=ci(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[vu.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=dc(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),l=this.getDuplicateExportedRules(s,c);for(let u of l)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let l of o){let u=l.name;c===u&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of dc(this.documents,e))c.types.forEach(l=>s.add(l.name)),c.interfaces.forEach(l=>s.add(l.name));for(let c of e.rules.filter(K)){if(fc(c))continue;let l=Ur(c),u=!c.returnType&&!c.dataType,f=Pn(c);if(!l&&f&&s.has(f)===u){if((u||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)r("error",a(f,u),{node:c,property:"name",data:Fr(Se.MissingReturns)});else if(u||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Yr(c.inferredType.$cstNode,"infers");r("error",a(f,u),{node:c.inferredType,property:"name",data:{code:Se.InvalidInfers,actionSegment:or(m)}})}}else if(l&&u){let m=Yr(c.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:Se.InvalidInfers,actionSegment:or(m)}})}}for(let c of Qe(e).filter(Ne)){let l=this.getActionType(c);if(l){let u=!!c.inferredType,f=Pn(c);if(c.type&&f&&s.has(f)===u){let m=u?Yr(c.$cstNode,"infer"):Yr(c.$cstNode,"{");r("error",a(f,u),{node:c,property:"type",data:{code:u?Se.SuperfluousInfer:Se.MissingInfer,actionSegment:or(m)}})}else if(l&&f&&s.has(f)&&u&&c.$cstNode){let m=Jt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),v=Yr(c.$cstNode,"{");m&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:Se.SuperfluousInfer,actionRange:{start:v.range.end,end:m.range.start}}})}}}function a(c,l){return l?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Fr(Se.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Qr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",l=new Set,u=new Set;for(let m=0;m<o.length;m++){let v=o.charAt(m);c.includes(v)?s.includes(v)&&u.add(v):l.add(v)}let f=this.getFlagRange(e);f&&(l.size>0?r("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&r("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!Ce(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Jt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Pe(e,i=>Ce(i)||K(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ce(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ce(n)&&n.fragment&&Pe(e,K)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Fr(Se.CrossRefTokenSyntax)})}checkPackageImport(e,r){ci(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Fr(Se.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Fr(Se.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=vs(e,!0);for(let i of e.rules)Ce(i)&&i.hidden||fc(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[vu.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Le,i=new Set;for(let l of e.rules)Ce(l)&&l.name&&n.add(l.name,l),K(l)&&Qe(l).filter(pt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let l of e.imports){let u=dc(this.documents,l);for(let f of u)for(let m of f.rules)Ce(m)&&m.name?o.add(m.name,l):K(m)&&m.name&&Qe(m).filter(pt).forEach(A=>s.add(A.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let u=s.get(l.name);r("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:l,property:"name"})}let a=new Le;for(let l of i)for(let u of o.get(l))a.add(u,l);for(let[l,u]of a.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let c=new Le;for(let[l,u]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>c.add(m,l))}for(let[l,u]of c.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!fc(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Fr(Se.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&E_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Pe(e,K)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Jr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Fr(Se.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(cs);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[vu.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(fc(e))return;let n=Rx(e),i=Ur(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&_e(e.terminal)&&K(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>Xt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=Ao(n.type),o=uc(i),s=!1,a=!1;for(let c of o)Ts(c)?s=!0:Ts(c)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!gs(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(K(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else Ce(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!pc(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(_e(i)){let o=i.rule.ref;K(o)&&!Ur(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):K(o)&&!bx(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):Ce(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Ft(e.type.ref)&&Xr(e.type.ref.type)){let n=xx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;K((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){sr(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&K(e.ref)&&!Ur(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=Pn(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Xt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function fc(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var E_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function xx(t){let e=[];return t.types.forEach(r=>{var n;sr(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Ft(r.typeRef.ref)&&(Xr(r.typeRef.ref.type)?e.push(...xx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Jr(t,e){return t==="?"||t==="*"||Ut(e)&&!!e.guardCondition}function Ax(t){return t==="*"||t==="+"}function Ur(t){return Cx(t,new Set)}function Cx(t,e){if(e.has(t))return!0;e.add(t);for(let r of Qe(t))if(_e(r)){if(!r.rule.ref||K(r.rule.ref)&&!Cx(r.rule.ref,e))return!1}else{if(Re(r))return!1;if(Ne(r))return!1}return!!t.definition}function Rx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Ft(r)&&$_(r)}function $_(t){return gh(t.type,new Set)}function gh(t,e){if(e.has(t))return!0;if(e.add(t),go(t))return!1;if(To(t))return!1;if(Xr(t))return t.types.every(r=>gh(r,e));if(sr(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Ft(r)?gh(r.type,e):!1}else return!1}else return!1}function bx(t){return mc(t,new Set)}function mc(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),K(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return mc(t.returnType.ref,e)}else{if(Ft(t))return mc(t.type,e);if(go(t))return!1;if(To(t))return!1;if(Xr(t))return t.types.every(i=>mc(i,e));if(sr(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return mc(t.typeRef.ref,e)}}return!1}function vh(t){let e=t.$container;if(Ut(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(Ne(o))return o;{let s=Qe(r[i]).find(Ne);if(s)return s}}}if(os(e))return vh(e)}function yn(t){var e;if(K(t))return Ur(t)?t.name:(e=Rs(t))!==null&&e!==void 0?e:t.name;if(Cr(t)||Ft(t)||ls(t))return t.name;if(Ne(t)){let r=bs(t);if(r)return r}else if(as(t))return t.name;throw new cu("Cannot get name of Unknown Type",t.$cstNode)}function Pn(t){if(t)try{return yn(t)}catch{return}}function Rs(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(K(e))return e.name;if(Cr(e)||Ft(e))return e.name}}}function bs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return yn(t.type.ref)}function Co(t){var e,r,n;return Ce(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Ur(t)?t.name:(n=Rs(t))!==null&&n!==void 0?n:t.name}function Qr(t){let e={s:!1,i:!1,u:!1},r=As(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var xh=/[\s\S]/.source;function As(t,e){if(Iv(t))return N_(t);if(Ov(t))return __(t);if(tu(t))return D_(t);if(ru(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return li(As(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(Ev(t))return I_(t);if(Uv(t))return P_(t);if(Nv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),li(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Gv(t))return li(xh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function N_(t){return li(t.elements.map(e=>As(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function __(t){return li(t.elements.map(e=>As(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function P_(t){return li(`${xh}*?${As(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function I_(t){return li(`(?!${As(t.terminal)})${xh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function D_(t){return t.right?li(`[${yh(t.left)}-${yh(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):li(yh(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function yh(t){return si(t.value)}function li(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function Rh(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function ci(t,e){let r=Rh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ss(i))return i}}catch{}}function dc(t,e){if(Zl(e)){let r=ci(t,e);if(r){let n=Th(t,r);return n.push(r),n}return[]}else return Th(t,e)}function Th(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ci(t,s);a&&Th(t,a,r,n,i)}}return Array.from(i)}function xs(t){return Re(t)?[t]:Dr(t)||Ut(t)||Or(t)?t.elements.flatMap(e=>xs(e)):_e(t)&&t.rule.ref?xs(t.rule.ref.definition):[]}var O_=["string","number","boolean","Date","bigint"];function gs(t){return O_.includes(t)}var bh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:Sx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(l=>l!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return Nx(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(Sx(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=So();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function L_(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(wx)}}function Sx(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>wx(e))}}function wx(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function kx(t,e,r){let n=[],i={fragments:new Map};for(let c of t)n.push(...Ex(i,c));let o=j_(n),s=H_(o),a=K_(o,s,r);for(let c of e){let l=M_(c);a.unions.push({name:c.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function M_(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=Ah(t.definition,r);return e?{primitive:"string"}:n}function Ah(t,e){var r,n,i;if(t.cardinality)return e();if(Dr(t))return{types:t.elements.map(o=>Ah(o,e))};if(Ut(t)||Or(t))return t.elements.length!==1?e():Ah(t.elements[0],e);if(_e(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?Ce(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Qr(o).toString()}:{value:o.name}:e()}else if(pt(t))return{string:t.value};return e()}function Ex(t,e){let r=So(e),n=new bh(t,r);return e.definition&&Ch(n,n.root,e.definition),n.getTypes()}function So(t){return{name:K(t)||Ne(t)?Pn(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Ch(t,e,r){let n=Jr(r.cardinality,r);if(Dr(r)){let i=[];n&&i.push(t.connect(e,So()));for(let o of r.elements){let s=t.connect(e,So());i.push(Ch(t,s,o))}return t.merge(...i)}else if(Ut(r)||Or(r)){let i=t.connect(e,So()),o;n&&(o=t.connect(e,So()));for(let s of r.elements)i=Ch(t,i,s);return o?t.merge(o,i):i}else{if(Ne(r))return F_(t,e,r);Re(r)?U_(e,r):_e(r)&&q_(t,e,r)}return e}function F_(t,e,r){var n;if(!t.hasLeafNode(e)){let o=L_(e);t.connect(e,o)}let i=t.connect(e,So(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&ic(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:wo(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function U_(t,e){let r={types:new Set,reference:!1};$x(e.terminal,r);let n=wo(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Jr(e.cardinality),type:n,astNodes:new Set([e])})}function $x(t,e){if(Dr(t)||Or(t)||Ut(t))for(let r of t.elements)$x(r,e);else if(pt(t))e.types.add(`'${t.value}'`);else if(_e(t)&&t.rule.ref)e.types.add(Co(t.rule.ref));else if(Xt(t)&&t.type.ref){let r=Pn(t.type.ref);r&&e.types.add(r),e.reference=!0}}function q_(t,e,r){let n=r.rule.ref;if(K(n)&&n.fragment){let i=G_(n,t.context);Jr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else K(n)&&e.ruleCalls.push(Co(n))}function G_(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=Pn(t),o=Ex(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function j_(t){let e=new Map,r=[],n=Nx(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function Nx(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Le),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let l=c.alt;a.alt.super.push(...l.super),a.next.push(...c.next);let u=l.properties;for(let f of u){let m=o.find(v=>v.name===f.name);m?(m.type=hh(m.type,f.type),f.astNodes.forEach(v=>m.astNodes.add(v))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let l=c.alt;if(l.ruleCalls.length===0)for(let u of o)l.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function H_(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Le;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:wo(!1,!1,o)};r.push(s)}return r}function K_(t,e,r){let n=new Le;for(let a of t)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=wo(!1,!1,Array.from(c)),u=s.get(a.name);if(u)u.type=hh(u.type,l);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function wo(t,e,r){if(t)return{elementType:wo(!1,e,r)};if(e)return{referenceType:wo(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:gs(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>wo(!1,!1,[n]))}}function _x(t,e){let r=Px(t,e),n=yx(r.interfaces,r.types),i=kx(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function Px(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)K(s)&&!s.fragment&&(Ur(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ci(e,a)).filter(a=>a!==void 0);Px(s,e,r,n)}}}return n}function Ox(t,e){let{inferred:r,declared:n,astResources:i}=_x(t,e);return{astResources:i,inferred:Ix(n,r),declared:Ix(r,n)}}function Ix(t,e){var r,n;let i={interfaces:ax(Dx(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:Dx(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=Tx(i);return B_(o),o}function Dx(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function B_(t){let e=z_(t),r=Array.from(e.values());V_(r),X_(t.interfaces),W_(r)}function W_(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function z_({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,Sh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function Sh(t,e){if(e.has(t))return!0;if(e.add(t),Ot(t))return t.types.every(r=>Sh(r,e));if(Lr(t)){let r=t.value;return pn(r)?Sh(r.type,e):!1}else return Mr(t)||Nn(t)}function V_(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function X_(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(c=>cx(c.type));for(let c of a)(e=r.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)hn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var Y_={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},J_={maxLookahead:3},Lx={AstReflection:()=>new Ya},Mx={Grammar:()=>px(),LanguageMetaData:()=>Y_,parser:{ParserConfig:()=>J_}};var hc=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},Cs=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},Fx={getElement(){},getAllElements(){return is}};var Ru=de(Qn(),1);var Ss=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=Ru.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=_i,i=Ru.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ze(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=Ru.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var bu=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},wh=class extends bu{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},Au=class extends bu{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var Cu=class extends wh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var ws=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new Cu(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new hc(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new hc(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new Cs(this.indexManager.allElements(e)))}};var Su=class extends ws{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===yo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=nu(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===Ja||c.type===Qa))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Pe(r.container,ss);if(!n)return Fx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===yo&&(o=o.filter(s=>s.type===Ja||s.type===Qa)),new Cs(o)}gatherImports(e,r){for(let n of e.imports){let i=Rh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ss(s)&&this.gatherImports(s,r)}}}},wu=class extends Ss{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),K(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(Ne(o)&&o.inferredType){let s=bs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){ls(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&K(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=nu(e);if(i&&Ne(e)&&e.inferredType){let o=bs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=or((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:or(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var qr=de(Ae(),1);var ar=de(Ae(),1);var ku=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=ar.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===gn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===gn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===gn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:ar.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Fr(gn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=ar.Range.create(0,0,0,0);else{let a=ar.Position.create(s.endLine-1,s.endColumn);o=ar.Range.create(a,a)}}}else o=Xa(i.token);if(o){let s={severity:ar.DiagnosticSeverity.Error,range:o,message:i.message,data:Fr(gn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:gn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=ar.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(ni(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:Q_(n),severity:Z_(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function Q_(t){if(ar.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Jt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Yr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function Z_(t){switch(t){case"error":return ar.DiagnosticSeverity.Error;case"warning":return ar.DiagnosticSeverity.Warning;case"info":return ar.DiagnosticSeverity.Information;case"hint":return ar.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var gn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(gn=gn||(gn={}));var Eu=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Se.GrammarNameUppercase:case Se.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Se.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Se.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Se.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Se.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Se.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Se.MissingReturns:n(this.fixMissingReturns(e,r));break;case Se.InvalidInfers:case Se.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Se.MissingInfer:n(this.fixMissingInfer(e,r));break;case Se.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case gn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=Ar(i,n),s=Pe(o?.astNode,tu);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${si(a)}-${si(c)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Jt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,l=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(l)}})}for(let a of i){let c=a.ref;if(c&&Ce(c)&&!c.hidden&&c.$cstNode){let l=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=Ar(o,i),a=Pe(s?.astNode,K);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===r.refText),l=[],u=-1,f=-1;for(let m of c){if(ve.equals(m.documentUri,n.uri))continue;let v=eP(n.uri,m.documentUri),A,C="",N=n.parseResult.value,S=N.imports.find(T=>T.path&&v<T.path);if(S)A=(i=S.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let T=N.imports[N.imports.length-1].$cstNode.range.end;T&&(A={line:T.line+1,character:0})}else N.rules.length>0&&(A=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,C=`
`);A&&((u<0||v.length<f)&&(u=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:A,end:A},newText:`import '${v}'
${C}`}]}}}))}return u>=0&&(l[u].isPreferred=!0),l}};function eP(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var jx=de(co(),1);var $s=de(Ae(),1);function kh(t,e){let r={stacks:t,tokens:e};return tP(r),r.stacks.flat().forEach(i=>{i.property=void 0}),qx(r.stacks).map(i=>i[i.length-1])}function Eh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(Ut(c.$container)){a=c.$container;break}else if(os(c.$container))c=c.$container;else break;if(Ax(c.cardinality)){let l=ks({next:{feature:c,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let u of l)i.add(u.feature);o.push(...l)}if(a){let l=a.elements.indexOf(c);l!==void 0&&l<a.elements.length-1&&o.push(...Ux({feature:a,type:e.type,new:!1},l+1,r,n,i)),o.every(u=>Jr(u.feature.cardinality,u.feature)||Jr(r.get(u.feature))||i.has(u.feature))&&o.push(...Eh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function yc(t){return $t(t)&&(t={feature:t}),ks({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function ks(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:c,type:l}=i;if(Ut(c)){if(s.has(c))return[];s.add(c)}if(Ut(c))return Ux(i,0,o,s,a).map(u=>$u(u,c.cardinality,o));if(Dr(c)||Or(c))return c.elements.flatMap(u=>ks({next:{feature:u,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(u=>$u(u,c.cardinality,o));if(Re(c)){let u={feature:c.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return ks({next:u,cardinalities:o,visited:s,plus:a}).map(f=>$u(f,c.cardinality,o))}else{if(Ne(c))return Eh({next:{feature:c,new:!0,type:yn(c),property:(r=i.property)!==null&&r!==void 0?r:c.feature},cardinalities:o,visited:s,plus:a});if(_e(c)&&K(c.rule.ref)){let u=c.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=Rs(u))!==null&&n!==void 0?n:u.name,property:i.property};return ks({next:f,cardinalities:o,visited:s,plus:a}).map(m=>$u(m,c.cardinality,o))}else return[i]}}function $u(t,e,r){return r.set(t.feature,e),t}function Ux(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...ks({next:a,cardinalities:r,visited:n,plus:i})),!!Jr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function tP(t){for(let e of t.tokens){let r=qx(t.stacks,e);t.stacks=r}}function qx(t,e){let r=[];for(let n of t)r.push(...rP(n,e));return r}function rP(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(nP)),i=[];for(;t.length>0;){let o=t.pop(),s=Eh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?$h(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Jr(a.feature.cardinality,a.feature)||Jr(r.get(a.feature))))break}return i}function nP(t){if(t.cardinality==="+")return!0;let e=Pe(t,Re);return!!(e&&e.cardinality==="+")}function $h(t,e){if(pt(t))return t.value===e.image;if(_e(t))return iP(t.rule.ref,e);if(Xt(t)){let r=Nu(t);if(r)return $h(r,e)}return!1}function iP(t,e){return K(t)?yc(t.definition).some(n=>$h(n.feature,e)):Ce(t)?Qr(t).test(e.image):!1}function Gx(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Es=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(c,l)=>{let u=this.fillCompletionItem(c,l);u&&n.push(u)},s=c=>pt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(l=>this.completionFor(c,l,o))),a.push(...c.features),!this.continueCompletion(n))break;return $s.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:$s.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=_u(this.grammar),l=yc({feature:c.definition,new:!0,type:Rs(c)});return o.length>0?(o.shift(),kh(l.map(u=>[u]),o)):l}let s=[...o].splice(i.tokenIndex);return kh([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,r){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let l=e.textDocument,u=l.getText(),f=l.offsetAt(r),m={document:e,textDocument:l,offset:f,position:r},v=this.findDataTypeRuleStart(c,f);if(v){let[y,$]=v,D=(n=Ar(c,y))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,y);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:y,tokenEndOffset:$,features:X})}let{nextTokenStart:A,nextTokenEnd:C,previousTokenStart:N,previousTokenEnd:S}=this.backtrackToAnyToken(u,f),T;if(N!==void 0&&S!==void 0&&S===f){T=(i=Ar(c,N))===null||i===void 0?void 0:i.astNode;let y=this.findFeaturesAt(l,N);yield Object.assign(Object.assign({},m),{node:T,tokenOffset:N,tokenEndOffset:S,features:y})}if(T=(s=(o=Ar(c,A))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=Ar(c,N))===null||a===void 0?void 0:a.astNode,T){let y=this.findFeaturesAt(l,A);yield Object.assign(Object.assign({},m),{node:T,tokenOffset:A,tokenEndOffset:C,features:y})}else{let y=_u(this.grammar),$=yc(y.definition);yield Object.assign(Object.assign({},m),{tokenOffset:A,tokenEndOffset:C,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=Dt(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Pe(o?.grammarSource,K))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Pe(o?.grammarSource,K))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(K(r)){let i=yc(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(pt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Xt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Pe(r.feature,Re),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(l=>{!c.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),c.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:$s.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let l=this.nameProvider.getName(r.node);if(!l)return;o=l}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Pu=class extends Es{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Pe(r.feature,Re);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:l}}for(let a of o){let c=i.length>0?"":'"',l=`${c}${a}${c}`;r(e,{label:a,textEdit:{newText:l,range:s},kind:jx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-ve.extname(s.uri).length),l=ve.relative(i,c);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var gc=de(Ae(),1);var Ns=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of VT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,gc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),gc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===gc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Iu=class extends Ns{shouldProcessContent(e){return!K(e)}};var Du=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Nh(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,c,l)=>{var u,f;let m=this.nodeModeToKey(a,c),v=i.get(m),A=(u=l.options.priority)!==null&&u!==void 0?u:0,C=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||C<=A)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),l,u;do if(u=c.next(),!u.done){let f=u.value,m=mo(f),v=this.nodeModeToKey(f,"prepend"),A=r.get(v);if(r.delete(v),A){let S=this.createTextEdit(l,f,A,o);for(let T of S)T&&this.insideRange(T.range,i)&&this.isNecessary(T,e.textDocument)&&s.push(T)}let C=this.nodeModeToKey(f,"append"),N=r.get(C);if(r.delete(C),N){let S=JT(f);if(S){let T=this.createTextEdit(f,S,N,o);for(let y of T)y&&this.insideRange(y.range,i)&&this.isNecessary(y,e.textDocument)&&s.push(y)}}if(!A&&f.hidden){let S=this.createHiddenTextEdits(l,f,void 0,o);for(let T of S)T&&this.insideRange(T.range,i)&&this.isNecessary(T,e.textDocument)&&s.push(T)}m&&(l=f)}while(!u.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:r.range.start},l=i.document.getText(c),u=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,u)-f;if(v===0)return[];let A="";v>0&&(A=(i.options.insertSpaces?" ":"	").repeat(v));let C=r.text.split(`
`);C[0]=l+C[0];for(let N=0;N<C.length;N++){let S=s+N,T={character:0,line:S};if(v>0)a.push({newText:A,range:{start:T,end:T}});else{let y=C[N],$=0;for(;$<y.length;$++){let D=y.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:T,end:{line:S,character:Math.min($,Math.abs(v))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,l=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),mo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Vr(i,o=>this.iterateCst(o,r)):is}iterateCst(e,r){if(!$n(e))return is;let n=r.indentation;return new Ir(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,hr))}},Nh=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new Tn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new Tn(r,this.collector)}property(e,r){let n=Jt(this.astNode.$cstNode,e,r);return new Tn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Pi(this.astNode.$cstNode,n);r.push(...i)}return new Tn(r,this.collector)}keyword(e,r){let n=Yr(this.astNode.$cstNode,e,r);return new Tn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Ou(this.astNode.$cstNode,n);r.push(...i)}return new Tn(r,this.collector)}cst(e){return new Tn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new Tn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new Tn(QT(o,s),this.collector)}},Tn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ye;(function(t){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(u){return i(0,u)}t.noSpace=r;function n(u){return i(1,u)}t.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}t.spaces=i;function o(u){return s(1,u)}t.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}t.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function c(u){return{options:u??{},moves:[{tabs:0}]}}t.noIndent=c;function l(u,f){var m,v,A,C,N,S;let T=(m=u.lines)!==null&&m!==void 0?m:0,y=(v=f.lines)!==null&&v!==void 0?v:0,$=(A=u.tabs)!==null&&A!==void 0?A:0,D=(C=f.tabs)!==null&&C!==void 0?C:0,X=(N=u.characters)!==null&&N!==void 0?N:0,ge=(S=f.characters)!==null&&S!==void 0?S:0;return T<y?-1:T>y?1:$<D?-1:$>D?1:X<ge?-1:X>ge?1:0}})(ye=ye||(ye={}));var Lu=class extends Du{format(e){if(Xt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ye.noSpace());else if(K(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ye.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ye.oneSpace()):r.property("name").append(ye.noSpace()),r.properties("parameters").append(ye.noSpace()),r.keywords(",").append(ye.oneSpace()),r.keywords("<").append(ye.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ye.noSpace()),r.interior(i,n).prepend(ye.indent()),n.prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(Ce(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ye.oneSpace()),r.keyword("returns").append(ye.oneSpace())),r.keywords("hidden","terminal","fragment").append(ye.oneSpace()),r.keyword(":").prepend(ye.noSpace()),r.keyword(";").prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(Ne(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ye.noSpace()),r.keywords(".","+=","=").surround(ye.noSpace()),r.keyword("}").prepend(ye.noSpace())}else if(as(e))this.getNodeFormatter(e).keywords("infer","infers").append(ye.oneSpace());else if(Re(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ye.noSpace());else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ye.noSpace()),r.keyword(",").append(ye.oneSpace()),r.properties("arguments").append(ye.noSpace())}os(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ye.noSpace())}};var ui=de(Ae(),1);var oe=de(Ae(),1);var Ih={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},Hx={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},Kx={legend:{tokenTypes:Object.keys(Ih),tokenModifiers:Object.keys(Hx)},full:{delta:!0},range:!0},Ph=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Mu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Ph;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=ni(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Jl(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Ih[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=Hx[u];a|=f}}let c=n.start.line,l=n.end.line;if(c===l){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(c,u,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=c+1;m<l;m++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-v-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Jt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Pi(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=Yr(r.$cstNode,n,o);c&&a.push(c)}else a.push(...Ou(r.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},_h;(function(t){function e(n,i){let o=new Map;Object.entries(Ih).forEach(([c,l])=>o.set(l,c));let s=0,a=0;return r(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let l=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(_h=_h||(_h={}));var Fu=class extends Mu{highlightElement(e,r){var n;Re(e)?r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):Ne(e)?e.feature&&r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):ls(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.type}):sr(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ui.SemanticTokenTypes.type}):mv(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.parameter}):cs(e)?r({node:e,property:"parameter",type:ui.SemanticTokenTypes.parameter}):_e(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ui.SemanticTokenTypes.type}):eu(e)&&r({node:e,property:"name",type:ui.SemanticTokenTypes.property})}};var Uu=class extends ms{getName(e){return Re(e)?e.feature:super.getName(e)}getNameNode(e){return Re(e)?Jt(e.$cstNode,"feature"):super.getNameNode(e)}};var _s=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Ps(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(ei(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(ei(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||XT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:or(r),local:!0}}}};var qu=class extends _s{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Ps(e);if(n&&n.feature==="feature"){if(Re(r))return this.findAssignmentDeclaration(r);if(Ne(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return eu(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Pe(e,Cr);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=ih(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(K(e)){let i=xs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:or(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Jt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:or(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Pe(e,K);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Pe(e,K),i=vh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Cr(n.returnType.ref)||Ft(n.returnType.ref))){let o=nc(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=nc(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(K(s)||Ne(s))&&r.push(s)}),r}};var Tc=de(Ae(),1);var Bx=de(Ae(),1);var Gu=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=Dt(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:Bx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=r.parseResult.value,i=Dt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=r.parseResult.value,i=Dt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var Wx=de(Ae(),1);var Is=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Dt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Wx.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var zx=de(Ae(),1);var ju=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Dt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return zx.DocumentHighlight.create(e.segment.range)}};var Hu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of _i(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Vx=de(Ae(),1),Ku=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=Vx.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};var Bu=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let c=r.charCodeAt(a),l=e.charCodeAt(o);if((c===l||this.toUpperCharCode(c)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,r){return Xx<=e&&e<=Yx&&oP<=r&&r<=sP||e===Jx&&r!==Jx}toUpperCharCode(e){return Xx<=e&&e<=Yx?e-32:e}},Xx="a".charCodeAt(0),Yx="z".charCodeAt(0),oP="A".charCodeAt(0),sP="Z".charCodeAt(0),Jx="_".charCodeAt(0);var Dh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Dt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},Wu=class extends Dh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var aP=de(Ae(),1);var cP=de(Ae(),1);var Zr=de(Ae(),1);var je;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(je=je||(je={}));var zu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Qt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:je.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:je.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=rs.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Vu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,this.documentMap.delete(r)),n}};var lP=de(Ae(),1);function Qx(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Xu=class{constructor(e){this.onInitializeEmitter=new Zr.Emitter,this.onInitializedEmitter=new Zr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Ql(this.services),this.services.ServiceRegistry.all.forEach(e=>Ql(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(w=>w.lsp.Formatter),o=n.map(w=>{var q;return(q=w.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(w=>!!w),s=this.hasService(w=>w.lsp.CodeActionProvider),a=this.hasService(w=>w.lsp.SemanticTokenProvider),c=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.hasService(w=>w.lsp.DocumentLinkProvider),u=Qx(n.map(w=>{var q;return(q=w.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(w=>w.lsp.TypeProvider),m=this.hasService(w=>w.lsp.ImplementationProvider),v=this.hasService(w=>w.lsp.CompletionProvider),A=Gx(n.map(w=>{var q;return(q=w.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),C=this.hasService(w=>w.lsp.ReferencesProvider),N=this.hasService(w=>w.lsp.DocumentSymbolProvider),S=this.hasService(w=>w.lsp.DefinitionProvider),T=this.hasService(w=>w.lsp.DocumentHighlightProvider),y=this.hasService(w=>w.lsp.FoldingRangeProvider),$=this.hasService(w=>w.lsp.HoverProvider),D=this.hasService(w=>w.lsp.RenameProvider),X=this.hasService(w=>w.lsp.CallHierarchyProvider),ge=this.hasService(w=>w.lsp.CodeLensProvider),Ee=this.hasService(w=>w.lsp.DeclarationProvider),Kt=this.hasService(w=>w.lsp.InlayHintProvider),Rt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Zr.TextDocumentSyncKind.Incremental,completionProvider:v?A:void 0,referencesProvider:C,documentSymbolProvider:N,definitionProvider:S,typeDefinitionProvider:f,documentHighlightProvider:T,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:y,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Kx:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:ge?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Kt?{resolveProvider:!1}:void 0,workspaceSymbolProvider:Rt?{resolveProvider:!!Rt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function eR(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");uP(e,t),fP(e,t),dP(e,t),pP(e,t),hP(e,t),yP(e,t),gP(e,t),TP(e,t),xP(e,t),bP(e,t),AP(e,t),mP(e,t),CP(e,t),RP(e,t),SP(e,t),wP(e,t),EP(e,t),NP(e,t),IP(e,t),_P(e,t),$P(e,t),kP(e,t),vP(e,t),PP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function uP(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>r.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Qt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let l of s.changes){let u=Qt.parse(l.uri);l.type===Zr.FileChangeType.Deleted?c.push(u):a.push(u)}i(a,c)})}function fP(t,e){e.workspace.DocumentBuilder.onBuildPhase(je.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function dP(t,e){t.onCompletion(cr((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function pP(t,e){t.onReferences(cr((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function mP(t,e){t.onCodeAction(cr((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function hP(t,e){t.onDocumentSymbol(cr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function yP(t,e){t.onDefinition(cr((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function gP(t,e){t.onTypeDefinition(cr((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function TP(t,e){t.onImplementation(cr((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function vP(t,e){t.onDeclaration(cr((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function xP(t,e){t.onDocumentHighlight(cr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function RP(t,e){t.onHover(cr((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function bP(t,e){t.onFoldingRanges(cr((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function AP(t,e){t.onDocumentFormatting(cr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(cr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(cr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function CP(t,e){t.onRenameRequest(cr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(cr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function SP(t,e){t.languages.inlayHint.on(Oi((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function wP(t,e){let r={data:[]};t.languages.semanticTokens.on(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Oi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function kP(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function EP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Ds(s)}})}function $P(t,e){t.onDocumentLinks(Oi((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function NP(t,e){t.onSignatureHelp(Oi((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function _P(t,e){t.onCodeLens(Oi((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function PP(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Ds(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Ds(a)}})}}function IP(t,e){t.languages.callHierarchy.onPrepare(Oi((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(Zx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(Zx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function Zx(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Qt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return Ds(a)}}}function Oi(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=r.getOrCreateDocument(s);if(!c)throw new Error;try{return await t(a,c,i,o)}catch(l){return Ds(l)}}}function cr(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=r.getOrCreateDocument(s);if(!c)return null;try{return await t(a,c,i,o)}catch(l){return Ds(l)}}}function Ds(t){if(bo(t))return new Zr.ResponseError(Zr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Zr.ResponseError)return t;throw t}var Ju=de(Ae(),1),Yu=class{getSymbolKind(){return Ju.SymbolKind.Field}getCompletionItemKind(){return Ju.CompletionItemKind.Reference}};var tR=de(Ae(),1);var Qu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Dt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(tR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var rR=de(Ae(),1);var Zu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=Dt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(u=>{let f=rR.TextEdit.replace(u.segment.range,r.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Dt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&ic(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var DP=de(Ae(),1);var nR=de(Ae(),1);var ef=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=nR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var tf=class extends Is{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,c;let l="path";if(Zl(e.astNode)&&((n=Ps(e))===null||n===void 0?void 0:n.feature)===l){let u=ci(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:Tc.Range.create(0,0,0,0),v=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:Tc.Range.create(0,0,0,0);return[Tc.LocationLink.create(u.$document.uri.toString(),v,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:_i(e).head()}};var Oh=de(Ae(),1);var rf=class extends Gu{getIncomingCalls(e,r){if(!K(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=Ar(s.$cstNode,i.segment.offset);if(!a)return;let c=Pe(a.astNode,K);if(!c||!c.$cstNode)return;let l=this.nameProvider.getNameNode(c);if(!l)return;let u=i.sourceUri.toString(),f=u+"@"+l.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:Oh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!K(e))return;let r=Qe(e).filter(_e).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let l=ne(a.astNode).uri.toString(),u=l+"@"+c.text;n.has(u)?n.set(u,{refCstNode:a,to:c,from:[...n.get(u).from,s.range],docUri:l}):n.set(u,{refCstNode:a,to:c,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:Oh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var nf=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=Ox(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=OP(e);for(let a of fu(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of fu(n)){let c=s.get(a.name);if(c){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=oh(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of oh(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function OP({parserRules:t,datatypeRules:e}){let r=new Le;ie(t).concat(e).forEach(i=>r.add(Co(i),i));function n(i){if(Ne(i)){let o=bs(i);o&&r.add(o,i)}(Dr(i)||Ut(i)||Or(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function iR(t){return t&&"declared"in t}function oR(t){return t&&"inferred"in t}function sR(t){return t&&"inferred"in t&&"declared"in t}function cR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var of=class{checkCyclicType(e,r){Li(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Li(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(iR(o)&&hn(o.declared)&&Cr(o.declaredNode)){let s=o;MP(s,r),FP(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())oR(o)&&o.inferred instanceof ps&&LP(o.inferred,r),sR(o)&&GP(o,i,r)}checkActionIsNotUnionType(e,r){Ft(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Li(t,e){var r;if(e.has(t))return!0;if(e.add(t),Ft(t))return Li(t.type,e);if(Cr(t))return t.superTypes.some(n=>n.ref&&Li(n.ref,new Set(e)));if(sr(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Li(t.typeRef.ref,e)}else{if(To(t))return Li(t.referenceType,e);if(go(t))return Li(t.elementType,e);if(Xr(t))return t.types.some(n=>Li(n,new Set(e)))}return!1}function LP(t,e){t.properties.forEach(r=>{var n;let i=rh(r.type);if(i.length>1){let o=a=>ii(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function MP({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(pn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function FP({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],l=i[a],u=hn(c)?c.superProperties:[],f=hn(l)?l.superProperties:[],m=UP(u,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${c}' and '${l}'. Their ${m.map(v=>"'"+v+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=hn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function UP(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!qP(n,i)&&r.push(n.name)}return r}function qP(t,e){return rc(t.type,e.type)&&rc(e.type,t.type)}function GP(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,c=f=>m=>s.forEach(v=>r("error",`${m}${f?` ${f}`:""}.`,v?.inferredType?{node:v?.inferredType,property:"name"}:{node:v,property:Ne(v)?"type":"name"})),l=(f,m)=>f.forEach(v=>r("error",m,{node:v,property:Re(v)||Ne(v)?"feature":"name"})),u=f=>{s.forEach(m=>{K(m)&&xs(m.definition).find(A=>A.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(pn(n)&&pn(i))jP(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(hn(n)&&hn(i))HP(n,i,e,c(`in a rule that returns type '${a}'`),l,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),r("error",f,{node:o,property:"name"})}}function jP(t,e,r){rc(t,e)||r(`Cannot assign type '${mn(t,"DeclaredType")}' to '${mn(e,"DeclaredType")}'`)}function aR(t){return t.optional||lu(t.type)}function HP(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Ot(f))return{types:f.types.map(m=>l(m))};if(ii(f))return{referenceType:l(f.referenceType)};if(oi(f))return{elementType:l(f.elementType)};if(Lr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let v=c.get(f);if(v){let A=mn(m.type,"DeclaredType"),C=mn(v.type,"DeclaredType");if(!rc(l(m.type),v.type)&&C!=="unknown"){let S=`The assigned type '${A}' is not compatible with the declared property '${f}' of type '${C}'.`;i(m.astNodes,S)}m.optional&&!aR(v)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of c.entries())!a.get(f)&&!aR(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",v=Array.from(u).map(A=>`'${A}'`).sort().join(", ");n(`${f} ${v} ${m}.`)}}var KP={validation:{LangiumGrammarValidator:t=>new xu(t),ValidationResourcesCollector:t=>new nf(t),LangiumGrammarTypesValidator:()=>new of},lsp:{FoldingRangeProvider:t=>new Iu(t),CodeActionProvider:t=>new Eu(t),SemanticTokenProvider:t=>new Fu(t),Formatter:()=>new Lu,DefinitionProvider:t=>new tf(t),CallHierarchyProvider:t=>new rf(t),CompletionProvider:t=>new Pu(t)},references:{ScopeComputation:t=>new wu(t),ScopeProvider:t=>new Su(t),References:t=>new qu(t),NameProvider:()=>new Uu}};function lR(t,e){let r=ho(xc(t),Lx,e),n=ho(vc({shared:r}),Mx,KP);return BP(r,n),r.ServiceRegistry.register(n),vx(n),cR(n),{shared:r,grammar:n}}function BP(t,e){t.workspace.DocumentBuilder.onBuildPhase(je.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Lh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},ko={fileSystemProvider:()=>new Lh};function _u(t){return t.rules.find(e=>K(e)&&e.entry)}function WP(t){return t.rules.filter(e=>Ce(e)&&e.hidden)}function vs(t,e){let r=new Set,n=_u(t);if(!n)return new Set(t.rules);let i=[n].concat(WP(t));for(let s of i)uR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||Ce(s)&&s.hidden)&&o.add(s);return o}function uR(t,e,r){e.add(t.name),Qe(t).forEach(n=>{if(_e(n)||r&&ru(n)){let i=n.rule.ref;i&&!e.has(i.name)&&uR(i,e,r)}})}function Nu(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=pc(t.type.ref);return e?.terminal}}function fR(t){return t.hidden&&!Qr(t).test(" ")}function Pi(t,e){return!t||!e?[]:Mh(t,e,t.astNode,!0)}function Jt(t,e,r){if(!t||!e)return;let n=Mh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Mh(t,e,r,n){if(!n){let i=Pe(t.grammarSource,Re);if(i&&i.feature===e)return[t]}return $n(t)&&t.astNode===r?t.content.flatMap(i=>Mh(i,e,r,!1)):[]}function Ou(t,e){return t?dR(t,e,t?.astNode):[]}function Yr(t,e,r){if(!t)return;let n=dR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function dR(t,e,r){if(t.astNode!==r)return[];if(pt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=jm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?pt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Ps(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Pe(t.grammarSource,Re);if(n)return n;t=t.container}}function pc(t){return as(t)&&(t=t.$container),pR(t,new Map)}function pR(t,e){var r;function n(i,o){let s;return Pe(i,Re)||(s=pR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Qe(t)){if(Re(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(_e(i)&&K(i.rule.ref))return n(i,i.rule.ref);if(sr(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function yu(t){var e;let r=lR(ko).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Qt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function mR(t){let e=[],r=t.Grammar;for(let n of r.rules)Ce(n)&&fR(n)&&lx(Qr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Hm}}var zP=typeof global=="object"&&global&&global.Object===Object&&global,sf=zP;var VP=typeof self=="object"&&self&&self.Object===Object&&self,XP=sf||VP||Function("return this")(),Nt=XP;var YP=Nt.Symbol,qt=YP;var hR=Object.prototype,JP=hR.hasOwnProperty,QP=hR.toString,Rc=qt?qt.toStringTag:void 0;function ZP(t){var e=JP.call(t,Rc),r=t[Rc];try{t[Rc]=void 0;var n=!0}catch{}var i=QP.call(t);return n&&(e?t[Rc]=r:delete t[Rc]),i}var yR=ZP;var eI=Object.prototype,tI=eI.toString;function rI(t){return tI.call(t)}var gR=rI;var nI="[object Null]",iI="[object Undefined]",TR=qt?qt.toStringTag:void 0;function oI(t){return t==null?t===void 0?iI:nI:TR&&TR in Object(t)?yR(t):gR(t)}var yr=oI;function sI(t){return t!=null&&typeof t=="object"}var gt=sI;var aI="[object Symbol]";function cI(t){return typeof t=="symbol"||gt(t)&&yr(t)==aI}var In=cI;function lI(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var Dn=lI;var uI=Array.isArray,z=uI;var fI=1/0,vR=qt?qt.prototype:void 0,xR=vR?vR.toString:void 0;function RR(t){if(typeof t=="string")return t;if(z(t))return Dn(t,RR)+"";if(In(t))return xR?xR.call(t):"";var e=t+"";return e=="0"&&1/t==-fI?"-0":e}var bR=RR;var dI=/\s/;function pI(t){for(var e=t.length;e--&&dI.test(t.charAt(e)););return e}var AR=pI;var mI=/^\s+/;function hI(t){return t&&t.slice(0,AR(t)+1).replace(mI,"")}var CR=hI;function yI(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var at=yI;var SR=0/0,gI=/^[-+]0x[0-9a-f]+$/i,TI=/^0b[01]+$/i,vI=/^0o[0-7]+$/i,xI=parseInt;function RI(t){if(typeof t=="number")return t;if(In(t))return SR;if(at(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=at(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=CR(t);var r=TI.test(t);return r||vI.test(t)?xI(t.slice(2),r?2:8):gI.test(t)?SR:+t}var wR=RI;var kR=1/0,bI=17976931348623157e292;function AI(t){if(!t)return t===0?t:0;if(t=wR(t),t===kR||t===-kR){var e=t<0?-1:1;return e*bI}return t===t?t:0}var ER=AI;function CI(t){var e=ER(t),r=e%1;return e===e?r?e-r:e:0}var On=CI;function SI(t){return t}var Sr=SI;var wI="[object AsyncFunction]",kI="[object Function]",EI="[object GeneratorFunction]",$I="[object Proxy]";function NI(t){if(!at(t))return!1;var e=yr(t);return e==kI||e==EI||e==wI||e==$I}var gr=NI;var _I=Nt["__core-js_shared__"],af=_I;var $R=function(){var t=/[^.]+$/.exec(af&&af.keys&&af.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function PI(t){return!!$R&&$R in t}var NR=PI;var II=Function.prototype,DI=II.toString;function OI(t){if(t!=null){try{return DI.call(t)}catch{}try{return t+""}catch{}}return""}var fi=OI;var LI=/[\\^$.*+?()[\]{}|]/g,MI=/^\[object .+?Constructor\]$/,FI=Function.prototype,UI=Object.prototype,qI=FI.toString,GI=UI.hasOwnProperty,jI=RegExp("^"+qI.call(GI).replace(LI,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function HI(t){if(!at(t)||NR(t))return!1;var e=gr(t)?jI:MI;return e.test(fi(t))}var _R=HI;function KI(t,e){return t?.[e]}var PR=KI;function BI(t,e){var r=PR(t,e);return _R(r)?r:void 0}var wr=BI;var WI=wr(Nt,"WeakMap"),cf=WI;var IR=Object.create,zI=function(){function t(){}return function(e){if(!at(e))return{};if(IR)return IR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),DR=zI;function VI(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var OR=VI;function XI(){}var ct=XI;function YI(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var LR=YI;var JI=800,QI=16,ZI=Date.now;function eD(t){var e=0,r=0;return function(){var n=ZI(),i=QI-(n-r);if(r=n,i>0){if(++e>=JI)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var MR=eD;function tD(t){return function(){return t}}var FR=tD;var rD=function(){try{var t=wr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Os=rD;var nD=Os?function(t,e){return Os(t,"toString",{configurable:!0,enumerable:!1,value:FR(e),writable:!0})}:Sr,UR=nD;var iD=MR(UR),qR=iD;function oD(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var lf=oD;function sD(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var uf=sD;function aD(t){return t!==t}var GR=aD;function cD(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var jR=cD;function lD(t,e,r){return e===e?jR(t,e,r):uf(t,GR,r)}var Ls=lD;function uD(t,e){var r=t==null?0:t.length;return!!r&&Ls(t,e,0)>-1}var ff=uD;var fD=9007199254740991,dD=/^(?:0|[1-9]\d*)$/;function pD(t,e){var r=typeof t;return e=e??fD,!!e&&(r=="number"||r!="symbol"&&dD.test(t))&&t>-1&&t%1==0&&t<e}var Mi=pD;function mD(t,e,r){e=="__proto__"&&Os?Os(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Ms=mD;function hD(t,e){return t===e||t!==t&&e!==e}var Ln=hD;var yD=Object.prototype,gD=yD.hasOwnProperty;function TD(t,e,r){var n=t[e];(!(gD.call(t,e)&&Ln(n,r))||r===void 0&&!(e in t))&&Ms(t,e,r)}var Fi=TD;function vD(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;c===void 0&&(c=t[a]),i?Ms(r,a,c):Fi(r,a,c)}return r}var Mn=vD;var HR=Math.max;function xD(t,e,r){return e=HR(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=HR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),OR(t,this,a)}}var KR=xD;function RD(t,e){return qR(KR(t,e,Sr),t+"")}var Fs=RD;var bD=9007199254740991;function AD(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=bD}var Us=AD;function CD(t){return t!=null&&Us(t.length)&&!gr(t)}var _t=CD;function SD(t,e,r){if(!at(r))return!1;var n=typeof e;return(n=="number"?_t(r)&&Mi(e,r.length):n=="string"&&e in r)?Ln(r[e],t):!1}var Ui=SD;function wD(t){return Fs(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Ui(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var BR=wD;var kD=Object.prototype;function ED(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||kD;return t===r}var Fn=ED;function $D(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var WR=$D;var ND="[object Arguments]";function _D(t){return gt(t)&&yr(t)==ND}var Fh=_D;var zR=Object.prototype,PD=zR.hasOwnProperty,ID=zR.propertyIsEnumerable,DD=Fh(function(){return arguments}())?Fh:function(t){return gt(t)&&PD.call(t,"callee")&&!ID.call(t,"callee")},qi=DD;function OD(){return!1}var VR=OD;var JR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,XR=JR&&typeof module=="object"&&module&&!module.nodeType&&module,LD=XR&&XR.exports===JR,YR=LD?Nt.Buffer:void 0,MD=YR?YR.isBuffer:void 0,FD=MD||VR,di=FD;var UD="[object Arguments]",qD="[object Array]",GD="[object Boolean]",jD="[object Date]",HD="[object Error]",KD="[object Function]",BD="[object Map]",WD="[object Number]",zD="[object Object]",VD="[object RegExp]",XD="[object Set]",YD="[object String]",JD="[object WeakMap]",QD="[object ArrayBuffer]",ZD="[object DataView]",e0="[object Float32Array]",t0="[object Float64Array]",r0="[object Int8Array]",n0="[object Int16Array]",i0="[object Int32Array]",o0="[object Uint8Array]",s0="[object Uint8ClampedArray]",a0="[object Uint16Array]",c0="[object Uint32Array]",Ye={};Ye[e0]=Ye[t0]=Ye[r0]=Ye[n0]=Ye[i0]=Ye[o0]=Ye[s0]=Ye[a0]=Ye[c0]=!0;Ye[UD]=Ye[qD]=Ye[QD]=Ye[GD]=Ye[ZD]=Ye[jD]=Ye[HD]=Ye[KD]=Ye[BD]=Ye[WD]=Ye[zD]=Ye[VD]=Ye[XD]=Ye[YD]=Ye[JD]=!1;function l0(t){return gt(t)&&Us(t.length)&&!!Ye[yr(t)]}var QR=l0;function u0(t){return function(e){return t(e)}}var Un=u0;var ZR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,bc=ZR&&typeof module=="object"&&module&&!module.nodeType&&module,f0=bc&&bc.exports===ZR,Uh=f0&&sf.process,d0=function(){try{var t=bc&&bc.require&&bc.require("util").types;return t||Uh&&Uh.binding&&Uh.binding("util")}catch{}}(),en=d0;var eb=en&&en.isTypedArray,p0=eb?Un(eb):QR,qs=p0;var m0=Object.prototype,h0=m0.hasOwnProperty;function y0(t,e){var r=z(t),n=!r&&qi(t),i=!r&&!n&&di(t),o=!r&&!n&&!i&&qs(t),s=r||n||i||o,a=s?WR(t.length,String):[],c=a.length;for(var l in t)(e||h0.call(t,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Mi(l,c)))&&a.push(l);return a}var df=y0;function g0(t,e){return function(r){return t(e(r))}}var pf=g0;var T0=pf(Object.keys,Object),tb=T0;var v0=Object.prototype,x0=v0.hasOwnProperty;function R0(t){if(!Fn(t))return tb(t);var e=[];for(var r in Object(t))x0.call(t,r)&&r!="constructor"&&e.push(r);return e}var mf=R0;function b0(t){return _t(t)?df(t):mf(t)}var He=b0;var A0=Object.prototype,C0=A0.hasOwnProperty,S0=BR(function(t,e){if(Fn(e)||_t(e)){Mn(e,He(e),t);return}for(var r in e)C0.call(e,r)&&Fi(t,r,e[r])}),Zt=S0;function w0(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var rb=w0;var k0=Object.prototype,E0=k0.hasOwnProperty;function $0(t){if(!at(t))return rb(t);var e=Fn(t),r=[];for(var n in t)n=="constructor"&&(e||!E0.call(t,n))||r.push(n);return r}var nb=$0;function N0(t){return _t(t)?df(t,!0):nb(t)}var Gi=N0;var _0=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,P0=/^\w*$/;function I0(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||In(t)?!0:P0.test(t)||!_0.test(t)||e!=null&&t in Object(e)}var Gs=I0;var D0=wr(Object,"create"),pi=D0;function O0(){this.__data__=pi?pi(null):{},this.size=0}var ib=O0;function L0(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var ob=L0;var M0="__lodash_hash_undefined__",F0=Object.prototype,U0=F0.hasOwnProperty;function q0(t){var e=this.__data__;if(pi){var r=e[t];return r===M0?void 0:r}return U0.call(e,t)?e[t]:void 0}var sb=q0;var G0=Object.prototype,j0=G0.hasOwnProperty;function H0(t){var e=this.__data__;return pi?e[t]!==void 0:j0.call(e,t)}var ab=H0;var K0="__lodash_hash_undefined__";function B0(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=pi&&e===void 0?K0:e,this}var cb=B0;function js(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}js.prototype.clear=ib;js.prototype.delete=ob;js.prototype.get=sb;js.prototype.has=ab;js.prototype.set=cb;var qh=js;function W0(){this.__data__=[],this.size=0}var lb=W0;function z0(t,e){for(var r=t.length;r--;)if(Ln(t[r][0],e))return r;return-1}var ji=z0;var V0=Array.prototype,X0=V0.splice;function Y0(t){var e=this.__data__,r=ji(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():X0.call(e,r,1),--this.size,!0}var ub=Y0;function J0(t){var e=this.__data__,r=ji(e,t);return r<0?void 0:e[r][1]}var fb=J0;function Q0(t){return ji(this.__data__,t)>-1}var db=Q0;function Z0(t,e){var r=this.__data__,n=ji(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var pb=Z0;function Hs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Hs.prototype.clear=lb;Hs.prototype.delete=ub;Hs.prototype.get=fb;Hs.prototype.has=db;Hs.prototype.set=pb;var Hi=Hs;var eO=wr(Nt,"Map"),Ki=eO;function tO(){this.size=0,this.__data__={hash:new qh,map:new(Ki||Hi),string:new qh}}var mb=tO;function rO(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var hb=rO;function nO(t,e){var r=t.__data__;return hb(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Bi=nO;function iO(t){var e=Bi(this,t).delete(t);return this.size-=e?1:0,e}var yb=iO;function oO(t){return Bi(this,t).get(t)}var gb=oO;function sO(t){return Bi(this,t).has(t)}var Tb=sO;function aO(t,e){var r=Bi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var vb=aO;function Ks(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ks.prototype.clear=mb;Ks.prototype.delete=yb;Ks.prototype.get=gb;Ks.prototype.has=Tb;Ks.prototype.set=vb;var Eo=Ks;var cO="Expected a function";function Gh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(cO);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(Gh.Cache||Eo),r}Gh.Cache=Eo;var xb=Gh;var lO=500;function uO(t){var e=xb(t,function(n){return r.size===lO&&r.clear(),n}),r=e.cache;return e}var Rb=uO;var fO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,dO=/\\(\\)?/g,pO=Rb(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(fO,function(r,n,i,o){e.push(i?o.replace(dO,"$1"):n||r)}),e}),bb=pO;function mO(t){return t==null?"":bR(t)}var Ab=mO;function hO(t,e){return z(t)?t:Gs(t,e)?[t]:bb(Ab(t))}var Wi=hO;var yO=1/0;function gO(t){if(typeof t=="string"||In(t))return t;var e=t+"";return e=="0"&&1/t==-yO?"-0":e}var qn=gO;function TO(t,e){e=Wi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[qn(e[r++])];return r&&r==n?t:void 0}var Bs=TO;function vO(t,e,r){var n=t==null?void 0:Bs(t,e);return n===void 0?r:n}var Cb=vO;function xO(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Ws=xO;var Sb=qt?qt.isConcatSpreadable:void 0;function RO(t){return z(t)||qi(t)||!!(Sb&&t&&t[Sb])}var wb=RO;function kb(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=wb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?kb(a,e-1,r,n,i):Ws(i,a):n||(i[i.length]=a)}return i}var zs=kb;function bO(t){var e=t==null?0:t.length;return e?zs(t,1):[]}var Tt=bO;var AO=pf(Object.getPrototypeOf,Object),hf=AO;function CO(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var yf=CO;function SO(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var Eb=SO;function wO(){this.__data__=new Hi,this.size=0}var $b=wO;function kO(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var Nb=kO;function EO(t){return this.__data__.get(t)}var _b=EO;function $O(t){return this.__data__.has(t)}var Pb=$O;var NO=200;function _O(t,e){var r=this.__data__;if(r instanceof Hi){var n=r.__data__;if(!Ki||n.length<NO-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Eo(n)}return r.set(t,e),this.size=r.size,this}var Ib=_O;function Vs(t){var e=this.__data__=new Hi(t);this.size=e.size}Vs.prototype.clear=$b;Vs.prototype.delete=Nb;Vs.prototype.get=_b;Vs.prototype.has=Pb;Vs.prototype.set=Ib;var zi=Vs;function PO(t,e){return t&&Mn(e,He(e),t)}var Db=PO;function IO(t,e){return t&&Mn(e,Gi(e),t)}var Ob=IO;var Ub=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Lb=Ub&&typeof module=="object"&&module&&!module.nodeType&&module,DO=Lb&&Lb.exports===Ub,Mb=DO?Nt.Buffer:void 0,Fb=Mb?Mb.allocUnsafe:void 0;function OO(t,e){if(e)return t.slice();var r=t.length,n=Fb?Fb(r):new t.constructor(r);return t.copy(n),n}var qb=OO;function LO(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Xs=LO;function MO(){return[]}var gf=MO;var FO=Object.prototype,UO=FO.propertyIsEnumerable,Gb=Object.getOwnPropertySymbols,qO=Gb?function(t){return t==null?[]:(t=Object(t),Xs(Gb(t),function(e){return UO.call(t,e)}))}:gf,Ys=qO;function GO(t,e){return Mn(t,Ys(t),e)}var jb=GO;var jO=Object.getOwnPropertySymbols,HO=jO?function(t){for(var e=[];t;)Ws(e,Ys(t)),t=hf(t);return e}:gf,Tf=HO;function KO(t,e){return Mn(t,Tf(t),e)}var Hb=KO;function BO(t,e,r){var n=e(t);return z(t)?n:Ws(n,r(t))}var vf=BO;function WO(t){return vf(t,He,Ys)}var Ac=WO;function zO(t){return vf(t,Gi,Tf)}var xf=zO;var VO=wr(Nt,"DataView"),Rf=VO;var XO=wr(Nt,"Promise"),bf=XO;var YO=wr(Nt,"Set"),Vi=YO;var Kb="[object Map]",JO="[object Object]",Bb="[object Promise]",Wb="[object Set]",zb="[object WeakMap]",Vb="[object DataView]",QO=fi(Rf),ZO=fi(Ki),eL=fi(bf),tL=fi(Vi),rL=fi(cf),$o=yr;(Rf&&$o(new Rf(new ArrayBuffer(1)))!=Vb||Ki&&$o(new Ki)!=Kb||bf&&$o(bf.resolve())!=Bb||Vi&&$o(new Vi)!=Wb||cf&&$o(new cf)!=zb)&&($o=function(t){var e=yr(t),r=e==JO?t.constructor:void 0,n=r?fi(r):"";if(n)switch(n){case QO:return Vb;case ZO:return Kb;case eL:return Bb;case tL:return Wb;case rL:return zb}return e});var vn=$o;var nL=Object.prototype,iL=nL.hasOwnProperty;function oL(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&iL.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Xb=oL;var sL=Nt.Uint8Array,Js=sL;function aL(t){var e=new t.constructor(t.byteLength);return new Js(e).set(new Js(t)),e}var Qs=aL;function cL(t,e){var r=e?Qs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Yb=cL;var lL=/\w*$/;function uL(t){var e=new t.constructor(t.source,lL.exec(t));return e.lastIndex=t.lastIndex,e}var Jb=uL;var Qb=qt?qt.prototype:void 0,Zb=Qb?Qb.valueOf:void 0;function fL(t){return Zb?Object(Zb.call(t)):{}}var eA=fL;function dL(t,e){var r=e?Qs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var tA=dL;var pL="[object Boolean]",mL="[object Date]",hL="[object Map]",yL="[object Number]",gL="[object RegExp]",TL="[object Set]",vL="[object String]",xL="[object Symbol]",RL="[object ArrayBuffer]",bL="[object DataView]",AL="[object Float32Array]",CL="[object Float64Array]",SL="[object Int8Array]",wL="[object Int16Array]",kL="[object Int32Array]",EL="[object Uint8Array]",$L="[object Uint8ClampedArray]",NL="[object Uint16Array]",_L="[object Uint32Array]";function PL(t,e,r){var n=t.constructor;switch(e){case RL:return Qs(t);case pL:case mL:return new n(+t);case bL:return Yb(t,r);case AL:case CL:case SL:case wL:case kL:case EL:case $L:case NL:case _L:return tA(t,r);case hL:return new n;case yL:case vL:return new n(t);case gL:return Jb(t);case TL:return new n;case xL:return eA(t)}}var rA=PL;function IL(t){return typeof t.constructor=="function"&&!Fn(t)?DR(hf(t)):{}}var nA=IL;var DL="[object Map]";function OL(t){return gt(t)&&vn(t)==DL}var iA=OL;var oA=en&&en.isMap,LL=oA?Un(oA):iA,sA=LL;var ML="[object Set]";function FL(t){return gt(t)&&vn(t)==ML}var aA=FL;var cA=en&&en.isSet,UL=cA?Un(cA):aA,lA=UL;var qL=1,GL=2,jL=4,uA="[object Arguments]",HL="[object Array]",KL="[object Boolean]",BL="[object Date]",WL="[object Error]",fA="[object Function]",zL="[object GeneratorFunction]",VL="[object Map]",XL="[object Number]",dA="[object Object]",YL="[object RegExp]",JL="[object Set]",QL="[object String]",ZL="[object Symbol]",eM="[object WeakMap]",tM="[object ArrayBuffer]",rM="[object DataView]",nM="[object Float32Array]",iM="[object Float64Array]",oM="[object Int8Array]",sM="[object Int16Array]",aM="[object Int32Array]",cM="[object Uint8Array]",lM="[object Uint8ClampedArray]",uM="[object Uint16Array]",fM="[object Uint32Array]",Ke={};Ke[uA]=Ke[HL]=Ke[tM]=Ke[rM]=Ke[KL]=Ke[BL]=Ke[nM]=Ke[iM]=Ke[oM]=Ke[sM]=Ke[aM]=Ke[VL]=Ke[XL]=Ke[dA]=Ke[YL]=Ke[JL]=Ke[QL]=Ke[ZL]=Ke[cM]=Ke[lM]=Ke[uM]=Ke[fM]=!0;Ke[WL]=Ke[fA]=Ke[eM]=!1;function Af(t,e,r,n,i,o){var s,a=e&qL,c=e&GL,l=e&jL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!at(t))return t;var u=z(t);if(u){if(s=Xb(t),!a)return LR(t,s)}else{var f=vn(t),m=f==fA||f==zL;if(di(t))return qb(t,a);if(f==dA||f==uA||m&&!i){if(s=c||m?{}:nA(t),!a)return c?Hb(t,Ob(s,t)):jb(t,Db(s,t))}else{if(!Ke[f])return i?t:{};s=rA(t,f,a)}}o||(o=new zi);var v=o.get(t);if(v)return v;o.set(t,s),lA(t)?t.forEach(function(N){s.add(Af(N,e,r,N,t,o))}):sA(t)&&t.forEach(function(N,S){s.set(S,Af(N,e,r,S,t,o))});var A=l?c?xf:Ac:c?Gi:He,C=u?void 0:A(t);return lf(C||t,function(N,S){C&&(S=N,N=t[S]),Fi(s,S,Af(N,e,r,S,t,o))}),s}var pA=Af;var dM=4;function pM(t){return pA(t,dM)}var Be=pM;function mM(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Gn=mM;var hM="__lodash_hash_undefined__";function yM(t){return this.__data__.set(t,hM),this}var mA=yM;function gM(t){return this.__data__.has(t)}var hA=gM;function Cf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Eo;++e<r;)this.add(t[e])}Cf.prototype.add=Cf.prototype.push=mA;Cf.prototype.has=hA;var Zs=Cf;function TM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var Sf=TM;function vM(t,e){return t.has(e)}var ea=vM;var xM=1,RM=2;function bM(t,e,r,n,i,o){var s=r&xM,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=o.get(t),u=o.get(e);if(l&&u)return l==e&&u==t;var f=-1,m=!0,v=r&RM?new Zs:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var A=t[f],C=e[f];if(n)var N=s?n(C,A,f,e,t,o):n(A,C,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(v){if(!Sf(e,function(S,T){if(!ea(v,T)&&(A===S||i(A,S,r,n,o)))return v.push(T)})){m=!1;break}}else if(!(A===C||i(A,C,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var wf=bM;function AM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var yA=AM;function CM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var ta=CM;var SM=1,wM=2,kM="[object Boolean]",EM="[object Date]",$M="[object Error]",NM="[object Map]",_M="[object Number]",PM="[object RegExp]",IM="[object Set]",DM="[object String]",OM="[object Symbol]",LM="[object ArrayBuffer]",MM="[object DataView]",gA=qt?qt.prototype:void 0,jh=gA?gA.valueOf:void 0;function FM(t,e,r,n,i,o,s){switch(r){case MM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case LM:return!(t.byteLength!=e.byteLength||!o(new Js(t),new Js(e)));case kM:case EM:case _M:return Ln(+t,+e);case $M:return t.name==e.name&&t.message==e.message;case PM:case DM:return t==e+"";case NM:var a=yA;case IM:var c=n&SM;if(a||(a=ta),t.size!=e.size&&!c)return!1;var l=s.get(t);if(l)return l==e;n|=wM,s.set(t,e);var u=wf(a(t),a(e),n,i,o,s);return s.delete(t),u;case OM:if(jh)return jh.call(t)==jh.call(e)}return!1}var TA=FM;var UM=1,qM=Object.prototype,GM=qM.hasOwnProperty;function jM(t,e,r,n,i,o){var s=r&UM,a=Ac(t),c=a.length,l=Ac(e),u=l.length;if(c!=u&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:GM.call(e,m)))return!1}var v=o.get(t),A=o.get(e);if(v&&A)return v==e&&A==t;var C=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<c;){m=a[f];var S=t[m],T=e[m];if(n)var y=s?n(T,S,m,e,t,o):n(S,T,m,t,e,o);if(!(y===void 0?S===T||i(S,T,r,n,o):y)){C=!1;break}N||(N=m=="constructor")}if(C&&!N){var $=t.constructor,D=e.constructor;$!=D&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(C=!1)}return o.delete(t),o.delete(e),C}var vA=jM;var HM=1,xA="[object Arguments]",RA="[object Array]",kf="[object Object]",KM=Object.prototype,bA=KM.hasOwnProperty;function BM(t,e,r,n,i,o){var s=z(t),a=z(e),c=s?RA:vn(t),l=a?RA:vn(e);c=c==xA?kf:c,l=l==xA?kf:l;var u=c==kf,f=l==kf,m=c==l;if(m&&di(t)){if(!di(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new zi),s||qs(t)?wf(t,e,r,n,i,o):TA(t,e,c,r,n,i,o);if(!(r&HM)){var v=u&&bA.call(t,"__wrapped__"),A=f&&bA.call(e,"__wrapped__");if(v||A){var C=v?t.value():t,N=A?e.value():e;return o||(o=new zi),i(C,N,r,n,o)}}return m?(o||(o=new zi),vA(t,e,r,n,i,o)):!1}var AA=BM;function CA(t,e,r,n,i){return t===e?!0:t==null||e==null||!gt(t)&&!gt(e)?t!==t&&e!==e:AA(t,e,r,n,CA,i)}var Ef=CA;var WM=1,zM=2;function VM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var c=a[0],l=t[c],u=a[1];if(s&&a[2]){if(l===void 0&&!(c in t))return!1}else{var f=new zi;if(n)var m=n(l,u,c,t,e,f);if(!(m===void 0?Ef(u,l,WM|zM,n,f):m))return!1}}return!0}var SA=VM;function XM(t){return t===t&&!at(t)}var $f=XM;function YM(t){for(var e=He(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,$f(i)]}return e}var wA=YM;function JM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Nf=JM;function QM(t){var e=wA(t);return e.length==1&&e[0][2]?Nf(e[0][0],e[0][1]):function(r){return r===t||SA(r,t,e)}}var kA=QM;function ZM(t,e){return t!=null&&e in Object(t)}var EA=ZM;function e1(t,e,r){e=Wi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=qn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Us(i)&&Mi(s,i)&&(z(t)||qi(t)))}var _f=e1;function t1(t,e){return t!=null&&_f(t,e,EA)}var $A=t1;var r1=1,n1=2;function i1(t,e){return Gs(t)&&$f(e)?Nf(qn(t),e):function(r){var n=Cb(r,t);return n===void 0&&n===e?$A(r,t):Ef(e,n,r1|n1)}}var NA=i1;function o1(t){return function(e){return e?.[t]}}var _A=o1;function s1(t){return function(e){return Bs(e,t)}}var PA=s1;function a1(t){return Gs(t)?_A(qn(t)):PA(t)}var IA=a1;function c1(t){return typeof t=="function"?t:t==null?Sr:typeof t=="object"?z(t)?NA(t[0],t[1]):kA(t):IA(t)}var mt=c1;function l1(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var DA=l1;function u1(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[t?a:++i];if(r(o[c],c,o)===!1)break}return e}}var OA=u1;var f1=OA(),LA=f1;function d1(t,e){return t&&LA(t,e,He)}var MA=d1;function p1(t,e){return function(r,n){if(r==null)return r;if(!_t(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var FA=p1;var m1=FA(MA),kr=m1;function h1(t,e,r,n){return kr(t,function(i,o,s){e(n,i,r(i),s)}),n}var UA=h1;function y1(t,e){return function(r,n){var i=z(r)?DA:UA,o=e?e():{};return i(r,t,mt(n,2),o)}}var qA=y1;var GA=Object.prototype,g1=GA.hasOwnProperty,T1=Fs(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Ui(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Gi(o),a=-1,c=s.length;++a<c;){var l=s[a],u=t[l];(u===void 0||Ln(u,GA[l])&&!g1.call(t,l))&&(t[l]=o[l])}return t}),ra=T1;function v1(t){return gt(t)&&_t(t)}var Hh=v1;function x1(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Pf=x1;var R1=200;function b1(t,e,r,n){var i=-1,o=ff,s=!0,a=t.length,c=[],l=e.length;if(!a)return c;r&&(e=Dn(e,Un(r))),n?(o=Pf,s=!1):e.length>=R1&&(o=ea,s=!1,e=new Zs(e));e:for(;++i<a;){var u=t[i],f=r==null?u:r(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;c.push(u)}else o(e,f,n)||c.push(u)}return c}var jA=b1;var A1=Fs(function(t,e){return Hh(t)?jA(t,zs(e,1,Hh,!0)):[]}),Xi=A1;function C1(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var jn=C1;function S1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:On(e),yf(t,e<0?0:e,n)):[]}var vt=S1;function w1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:On(e),e=n-e,yf(t,0,e<0?0:e)):[]}var mi=w1;function k1(t){return typeof t=="function"?t:Sr}var HA=k1;function E1(t,e){var r=z(t)?lf:kr;return r(t,HA(e))}var G=E1;function $1(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var KA=$1;function N1(t,e){var r=!0;return kr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var BA=N1;function _1(t,e,r){var n=z(t)?KA:BA;return r&&Ui(t,e,r)&&(e=void 0),n(t,mt(e,3))}var lr=_1;function P1(t,e){var r=[];return kr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var If=P1;function I1(t,e){var r=z(t)?Xs:If;return r(t,mt(e,3))}var Gt=I1;function D1(t){return function(e,r,n){var i=Object(e);if(!_t(e)){var o=mt(r,3);e=He(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var WA=D1;var O1=Math.max;function L1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:On(r);return i<0&&(i=O1(n+i,0)),uf(t,mt(e,3),i)}var zA=L1;var M1=WA(zA),Hn=M1;function F1(t){return t&&t.length?t[0]:void 0}var jt=F1;function U1(t,e){var r=-1,n=_t(t)?Array(t.length):[];return kr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var VA=U1;function q1(t,e){var r=z(t)?Dn:VA;return r(t,mt(e,3))}var L=q1;function G1(t,e){return zs(L(t,e),1)}var er=G1;var j1=Object.prototype,H1=j1.hasOwnProperty,K1=qA(function(t,e,r){H1.call(t,r)?t[r].push(e):Ms(t,r,[e])}),Kh=K1;var B1=Object.prototype,W1=B1.hasOwnProperty;function z1(t,e){return t!=null&&W1.call(t,e)}var XA=z1;function V1(t,e){return t!=null&&_f(t,e,XA)}var B=V1;var X1="[object String]";function Y1(t){return typeof t=="string"||!z(t)&&gt(t)&&yr(t)==X1}var Lt=Y1;function J1(t,e){return Dn(e,function(r){return t[r]})}var YA=J1;function Q1(t){return t==null?[]:YA(t,He(t))}var Ie=Q1;var Z1=Math.max;function eF(t,e,r,n){t=_t(t)?t:Ie(t),r=r&&!n?On(r):0;var i=t.length;return r<0&&(r=Z1(i+r,0)),Lt(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ls(t,e,r)>-1}var et=eF;var tF=Math.max;function rF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:On(r);return i<0&&(i=tF(n+i,0)),Ls(t,e,i)}var Df=rF;var nF="[object Map]",iF="[object Set]",oF=Object.prototype,sF=oF.hasOwnProperty;function aF(t){if(t==null)return!0;if(_t(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||di(t)||qs(t)||qi(t)))return!t.length;var e=vn(t);if(e==nF||e==iF)return!t.size;if(Fn(t))return!mf(t).length;for(var r in t)if(sF.call(t,r))return!1;return!0}var se=aF;var cF="[object RegExp]";function lF(t){return gt(t)&&yr(t)==cF}var JA=lF;var QA=en&&en.isRegExp,uF=QA?Un(QA):JA,tn=uF;function fF(t){return t===void 0}var ur=fF;function dF(t,e){return t<e}var ZA=dF;function pF(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!In(s):r(s,a)))var a=s,c=o}return c}var eC=pF;function mF(t){return t&&t.length?eC(t,Sr,ZA):void 0}var tC=mF;var hF="Expected a function";function yF(t){if(typeof t!="function")throw new TypeError(hF);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var rC=yF;function gF(t,e,r,n){if(!at(t))return t;e=Wi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var c=qn(e[i]),l=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=s){var u=a[c];l=n?n(u,c,a):void 0,l===void 0&&(l=at(u)?u:Mi(e[i+1])?[]:{})}Fi(a,c,l),a=a[c]}return t}var nC=gF;function TF(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Bs(t,s);r(a,s)&&nC(o,Wi(s,t),a)}return o}var iC=TF;function vF(t,e){if(t==null)return{};var r=Dn(xf(t),function(n){return[n]});return e=mt(e),iC(t,r,function(n,i){return e(n,i[0])})}var Er=vF;function xF(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var oC=xF;function RF(t,e,r){var n=z(t)?Eb:oC,i=arguments.length<3;return n(t,mt(e,4),r,i,kr)}var lt=RF;function bF(t,e){var r=z(t)?Xs:If;return r(t,rC(mt(e,3)))}var Yi=bF;function AF(t,e){var r;return kr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var sC=AF;function CF(t,e,r){var n=z(t)?Sf:sC;return r&&Ui(t,e,r)&&(e=void 0),n(t,mt(e,3))}var Cc=CF;var SF=1/0,wF=Vi&&1/ta(new Vi([,-0]))[1]==SF?function(t){return new Vi(t)}:ct,aC=wF;var kF=200;function EF(t,e,r){var n=-1,i=ff,o=t.length,s=!0,a=[],c=a;if(r)s=!1,i=Pf;else if(o>=kF){var l=e?null:aC(t);if(l)return ta(l);s=!1,i=ea,c=new Zs}else c=e?[]:a;e:for(;++n<o;){var u=t[n],f=e?e(u):u;if(u=r||u!==0?u:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(u)}else i(c,f,r)||(c!==a&&c.push(f),a.push(u))}return a}var Of=EF;function $F(t){return t&&t.length?Of(t):[]}var na=$F;function NF(t,e){return t&&t.length?Of(t,mt(e,2)):[]}var cC=NF;function ia(t){console&&console.error&&console.error(`Error: ${t}`)}function Sc(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function wc(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function kc(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function _F(t){return PF(t)?t.LABEL:t.name}function PF(t){return Lt(t.LABEL)&&t.LABEL!==""}var Gr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},we=class extends Gr{constructor(e){super([]),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},Tr=class extends Gr{constructor(e){super(e.definition),this.orgText="",Zt(this,Er(e,r=>r!==void 0))}},We=class extends Gr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Zt(this,Er(e,r=>r!==void 0))}},ke=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},ze=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Ve=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},pe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Me=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Fe=class extends Gr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Zt(this,Er(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Zt(this,Er(e,r=>r!==void 0))}accept(e){e.visit(this)}};function Lf(t){return L(t,oa)}function oa(t){function e(r){return L(r,oa)}if(t instanceof we){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Lt(t.label)&&(r.label=t.label),r}else{if(t instanceof We)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof ze)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:oa(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Me)return{type:"RepetitionWithSeparator",idx:t.idx,separator:oa(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Fe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:_F(t.terminalType),idx:t.idx};Lt(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=tn(n)?n.source:n),r}else{if(t instanceof Tr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var vr=class{visit(e){let r=e;switch(r.constructor){case we:return this.visitNonTerminal(r);case We:return this.visitAlternative(r);case ke:return this.visitOption(r);case ze:return this.visitRepetitionMandatory(r);case Ve:return this.visitRepetitionMandatoryWithSeparator(r);case Me:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Fe:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case Tr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Bh(t){return t instanceof We||t instanceof ke||t instanceof pe||t instanceof ze||t instanceof Ve||t instanceof Me||t instanceof ae||t instanceof Tr}function No(t,e=[]){return t instanceof ke||t instanceof pe||t instanceof Me?!0:t instanceof Fe?Cc(t.definition,n=>No(n,e)):t instanceof we&&et(e,t)?!1:t instanceof Gr?(t instanceof we&&e.push(t),lr(t.definition,n=>No(n,e))):!1}function Wh(t){return t instanceof Fe}function $r(t){if(t instanceof we)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var hi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=vt(e.definition,i+1);if(n instanceof we)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof We)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof ze)this.walkAtLeastOne(n,o,r);else if(n instanceof Ve)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Me)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Fe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=lC(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=lC(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new We({definition:[o]});this.walk(s,i)})}};function lC(t,e,r){return[new ke({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function _o(t){if(t instanceof we)return _o(t.referencedRule);if(t instanceof ae)return OF(t);if(Bh(t))return IF(t);if(Wh(t))return DF(t);throw Error("non exhaustive match")}function IF(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=No(o),e=e.concat(_o(o)),n=n+1,i=r.length>n;return na(e)}function DF(t){let e=L(t.definition,r=>_o(r));return na(Tt(e))}function OF(t){return[t.terminalType]}var Mf="_~IN~_";var zh=class extends hi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=LF(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new We({definition:o}),a=_o(s);this.follows[i]=a}};function uC(t){let e={};return G(t,r=>{let n=new zh(r).startWalking();Zt(e,n)}),e}function LF(t,e){return t.name+e+Mf}var Ff={},MF=new Ro;function sa(t){let e=t.toString();if(Ff.hasOwnProperty(e))return Ff[e];{let r=MF.pattern(e);return Ff[e]=r,r}}function fC(){Ff={}}var pC="Complement Sets are not supported for first char optimization",Ec=`Unable to use "first char" lexer optimizations:
`;function mC(t,e=!1){try{let r=sa(t);return Vh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===pC)e&&Sc(`${Ec}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ia(`${Ec}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Vh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Vh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Uf(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(pC);G(s.value,c=>{if(typeof c=="number")Uf(c,e,r);else{let l=c;if(r===!0)for(let u=l.from;u<=l.to;u++)Uf(u,e,r);else{for(let u=l.from;u<=l.to&&u<aa;u++)Uf(u,e,r);if(l.to>=aa){let u=l.from>=aa?l.from:aa,f=l.to,m=Kn(u),v=Kn(f);for(let A=m;A<=v;A++)e[A]=A}}}});break;case"Group":Vh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&Xh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Ie(e)}function Uf(t,e,r){let n=Kn(t);e[n]=n,r===!0&&FF(t,e)}function FF(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=Kn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=Kn(i.charCodeAt(0));e[o]=o}}}function dC(t,e){return Hn(t.value,r=>{if(typeof r=="number")return et(e,r);{let n=r;return Hn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function Xh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?lr(t.value,Xh):Xh(t.value):!1}var Yh=class extends _n{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?dC(e,this.targetCharCodes)===void 0&&(this.found=!0):dC(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function qf(t,e){if(e instanceof RegExp){let r=sa(e),n=new Yh(t);return n.visit(r),n.found}else return Hn(e,r=>et(t,r.charCodeAt(0)))!==void 0}var Po="PATTERN",ca="defaultMode",Gf="modes",Qh=typeof new RegExp("(?:)").sticky=="boolean";function gC(t,e){e=ra(e,{useSticky:Qh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(T,y)=>y()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{rU()});let n;r("Reject Lexer.NA",()=>{n=Yi(t,T=>T[Po]===ht.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,T=>{let y=T[Po];if(tn(y)){let $=y.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!y.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?yC(y):hC(y)}else{if(gr(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{let $=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?yC(D):hC(D)}}else throw Error("non exhaustive match")}})});let s,a,c,l,u;r("misc mapping",()=>{s=L(n,T=>T.tokenTypeIdx),a=L(n,T=>{let y=T.GROUP;if(y!==ht.SKIPPED){if(Lt(y))return y;if(ur(y))return!1;throw Error("non exhaustive match")}}),c=L(n,T=>{let y=T.LONGER_ALT;if(y)return z(y)?L(y,D=>Df(n,D)):[Df(n,y)]}),l=L(n,T=>T.PUSH_MODE),u=L(n,T=>B(T,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let T=SC(e.lineTerminatorCharacters);f=L(n,y=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,y=>B(y,"LINE_BREAKS")?!!y.LINE_BREAKS:CC(y,T)===!1&&qf(T,y.PATTERN)))});let m,v,A,C;r("Misc Mapping #2",()=>{m=L(n,bC),v=L(o,eU),A=lt(n,(T,y)=>{let $=y.GROUP;return Lt($)&&$!==ht.SKIPPED&&(T[$]=[]),T},{}),C=L(o,(T,y)=>({pattern:o[y],longerAlt:c[y],canLineTerminator:f[y],isCustom:m[y],short:v[y],group:a[y],push:l[y],pop:u[y],tokenTypeIdx:s[y],tokenType:n[y]}))});let N=!0,S=[];return e.safeMode||r("First Char Optimization",()=>{S=lt(n,(T,y,$)=>{if(typeof y.PATTERN=="string"){let D=y.PATTERN.charCodeAt(0),X=Kn(D);Jh(T,X,C[$])}else if(z(y.START_CHARS_HINT)){let D;G(y.START_CHARS_HINT,X=>{let ge=typeof X=="string"?X.charCodeAt(0):X,Ee=Kn(ge);D!==Ee&&(D=Ee,Jh(T,Ee,C[$]))})}else if(tn(y.PATTERN))if(y.PATTERN.unicode)N=!1,e.ensureOptimizations&&ia(`${Ec}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=mC(y.PATTERN,e.ensureOptimizations);se(D)&&(N=!1),G(D,X=>{Jh(T,X,C[$])})}else e.ensureOptimizations&&ia(`${Ec}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return T},[])}),{emptyGroups:A,patternIdxToConfig:C,charCodeToPatternIdxToConfig:S,hasCustom:i,canBeOptimized:N}}function TC(t,e){let r=[],n=qF(t);r=r.concat(n.errors);let i=GF(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(UF(o)),r=r.concat(XF(o)),r=r.concat(YF(o,e)),r=r.concat(JF(o)),r}function UF(t){let e=[],r=Gt(t,n=>tn(n[Po]));return e=e.concat(HF(r)),e=e.concat(WF(r)),e=e.concat(zF(r)),e=e.concat(VF(r)),e=e.concat(KF(r)),e}function qF(t){let e=Gt(t,i=>!B(i,Po)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}function GF(t){let e=Gt(t,i=>{let o=i[Po];return!tn(o)&&!gr(o)&&!B(o,"exec")&&!Lt(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}var jF=/[^\\][$]/;function HF(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=Gt(t,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return jF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function KF(t){let e=Gt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var BF=/[^\\[][\^]|^\^/;function WF(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=Gt(t,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return BF.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function zF(t){let e=Gt(t,n=>{let i=n[Po];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function VF(t){let e=[],r=L(t,o=>lt(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==ht.NA&&(e.push(a),s.push(a)),s),[]));r=Gn(r);let n=Gt(r,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${jt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function XF(t){let e=Gt(t,n=>{if(!B(n,"GROUP"))return!1;let i=n.GROUP;return i!==ht.SKIPPED&&i!==ht.NA&&!Lt(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function YF(t,e){let r=Gt(t,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function JF(t){let e=[],r=lt(t,(n,i,o)=>{let s=i.PATTERN;return s===ht.NA||(Lt(s)?n.push({str:s,idx:o,tokenType:i}):tn(s)&&ZF(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&QF(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function QF(t,e){if(tn(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(gr(e))return e(t,0,[],{});if(B(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function ZF(t){return Hn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function hC(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function yC(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function vC(t,e,r){let n=[];return B(t,ca)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+ca+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),B(t,Gf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Gf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),B(t,Gf)&&B(t,ca)&&!B(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${ca}: <${t.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),B(t,Gf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(ur(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(B(s,"LONGER_ALT")){let c=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,l=>{!ur(l)&&!et(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function xC(t,e,r){let n=[],i=!1,o=Gn(Tt(Ie(t.modes))),s=Yi(o,c=>c[Po]===ht.NA),a=SC(r);return e&&G(s,c=>{let l=CC(c,a);if(l!==!1){let f={message:tU(c,l),type:l.issue,tokenType:c};n.push(f)}else B(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):qf(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function RC(t){let e={},r=He(t);return G(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function bC(t){let e=t.PATTERN;if(tn(e))return!1;if(gr(e))return!0;if(B(e,"exec"))return!0;if(Lt(e))return!1;throw Error("non exhaustive match")}function eU(t){return Lt(t)&&t.length===1?t.charCodeAt(0):!1}var AC={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function CC(t,e){if(B(t,"LINE_BREAKS"))return!1;if(tn(t.PATTERN)){try{qf(e,t.PATTERN)}catch(r){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Lt(t.PATTERN))return!1;if(bC(t))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function tU(t,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function SC(t){return L(t,r=>Lt(r)?r.charCodeAt(0):r)}function Jh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var aa=256,jf=[];function Kn(t){return t<aa?t:jf[t]}function rU(){if(se(jf)){jf=new Array(65536);for(let t=0;t<65536;t++)jf[t]=t>255?255+~~(t/255):t}}function yi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function la(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var wC=1,EC={};function gi(t){let e=nU(t);iU(e),sU(e),oU(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function nU(t){let e=Be(t),r=t,n=!0;for(;n;){r=Gn(Tt(L(r,o=>o.CATEGORIES)));let i=Xi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function iU(t){G(t,e=>{Zh(e)||(EC[wC]=e,e.tokenTypeIdx=wC++),kC(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),kC(e)||(e.CATEGORIES=[]),aU(e)||(e.categoryMatches=[]),cU(e)||(e.categoryMatchesMap={})})}function oU(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(EC[n].tokenTypeIdx)})})}function sU(t){G(t,e=>{$C([],e)})}function $C(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);et(n,r)||$C(n,r)})}function Zh(t){return B(t,"tokenTypeIdx")}function kC(t){return B(t,"CATEGORIES")}function aU(t){return B(t,"categoryMatches")}function cU(t){return B(t,"categoryMatchesMap")}function NC(t){return B(t,"tokenTypeIdx")}var ey={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var tt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var $c={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:ey,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze($c);var ht=class{constructor(e,r=$c){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=wc(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Zt({},$c,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===$c.lineTerminatorsPattern)this.config.lineTerminatorsPattern=AC;else if(this.config.lineTerminatorCharacters===$c.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:Be(e)},defaultMode:ca}:(o=!1,i=Be(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(vC(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(xC(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=Yi(a,l=>ur(l))});let s=He(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(TC(a,s))}),se(this.lexerDefinitionErrors)){gi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=gC(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Zt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{Sc(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Qh?(this.chopInput=Sr,this.match=this.matchWithTest):(this.updateLastIndex=ct,this.match=this.matchWithExec),o&&(this.handleModes=ct),this.trackStartLines===!1&&(this.computeNewColumn=Sr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=ct),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=lt(this.canModeBeOptimized,(c,l,u)=>(l===!1&&c.push(u),c),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{fC()}),this.TRACE_INIT("toFastProperties",()=>{kc(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,c,l,u,f,m,v,A,C,N,S,T,y=e,$=y.length,D=0,X=0,ge=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ge),Kt=[],Rt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,w=RC(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],bt=[],ut=[];Object.freeze(ut);let me;function Nr(){return ee}function Bn(At){let tr=Kn(At),An=Q[tr];return An===void 0?ut:An}let Sa=At=>{if(bt.length===1&&At.tokenType.PUSH_MODE===void 0){let tr=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(At);Kt.push({offset:At.startOffset,line:At.startLine,column:At.startColumn,length:At.image.length,message:tr})}else{bt.pop();let tr=jn(bt);ee=this.patternIdxToConfig[tr],Q=this.charCodeToPatternIdxToConfig[tr],ce=ee.length;let An=this.canModeBeOptimized[tr]&&this.config.safeMode===!1;Q&&An?me=Bn:me=Nr}};function eo(At){bt.push(At),Q=this.charCodeToPatternIdxToConfig[At],ee=this.patternIdxToConfig[At],ce=ee.length,ce=ee.length;let tr=this.canModeBeOptimized[At]&&this.config.safeMode===!1;Q&&tr?me=Bn:me=Nr}eo.call(this,r);let fr,qo=this.config.recoveryEnabled;for(;D<$;){c=null;let At=y.charCodeAt(D),tr=me(At),An=tr.length;for(n=0;n<An;n++){fr=tr[n];let Bt=fr.pattern;l=null;let ft=fr.short;if(ft!==!1?At===ft&&(c=Bt):fr.isCustom===!0?(T=Bt.exec(y,D,Ee,w),T!==null?(c=T[0],T.payload!==void 0&&(l=T.payload)):c=null):(this.updateLastIndex(Bt,D),c=this.match(Bt,e,D)),c!==null){if(a=fr.longerAlt,a!==void 0){let Hr=a.length;for(o=0;o<Hr;o++){let _r=ee[a[o]],Rr=_r.pattern;if(u=null,_r.isCustom===!0?(T=Rr.exec(y,D,Ee,w),T!==null?(s=T[0],T.payload!==void 0&&(u=T.payload)):s=null):(this.updateLastIndex(Rr,D),s=this.match(Rr,e,D)),s&&s.length>c.length){c=s,l=u,fr=_r;break}}}break}}if(c!==null){if(f=c.length,m=fr.group,m!==void 0&&(v=fr.tokenTypeIdx,A=this.createTokenInstance(c,D,v,fr.tokenType,Rt,M,f),this.handlePayload(A,l),m===!1?X=this.addToken(Ee,X,A):w[m].push(A)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&fr.canLineTerminator===!0){let Bt=0,ft,Hr;j.lastIndex=0;do ft=j.test(c),ft===!0&&(Hr=j.lastIndex-1,Bt++);while(ft===!0);Bt!==0&&(Rt=Rt+Bt,M=f-Hr,this.updateTokenEndLineColumnLocation(A,m,Hr,Bt,Rt,M,f))}this.handleModes(fr,Sa,eo,A)}else{let Bt=D,ft=Rt,Hr=M,_r=qo===!1;for(;_r===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<ce;i++){let Rr=ee[i],to=Rr.pattern,bi=Rr.short;if(bi!==!1?y.charCodeAt(D)===bi&&(_r=!0):Rr.isCustom===!0?_r=to.exec(y,D,Ee,w)!==null:(this.updateLastIndex(to,D),_r=to.exec(e)!==null),_r===!0)break}if(C=D-Bt,M=this.computeNewColumn(M,C),S=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y,Bt,C,ft,Hr),Kt.push({offset:Bt,line:ft,column:Hr,length:C,message:S}),qo===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:w,errors:Kt}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let c,l;r!==void 0&&(c=n===a-1,l=c?-1:0,i===1&&c===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};ht.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";ht.NA=/NOT_APPLICABLE/;function Ti(t){return ty(t)?t.LABEL:t.name}function ty(t){return Lt(t.LABEL)&&t.LABEL!==""}var lU="parent",_C="categories",PC="label",IC="group",DC="push_mode",OC="pop_mode",LC="longer_alt",MC="line_breaks",FC="start_chars_hint";function Hf(t){return uU(t)}function uU(t){let e=t.pattern,r={};if(r.name=t.name,ur(e)||(r.PATTERN=e),B(t,lU))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return B(t,_C)&&(r.CATEGORIES=t[_C]),gi([r]),B(t,PC)&&(r.LABEL=t[PC]),B(t,IC)&&(r.GROUP=t[IC]),B(t,OC)&&(r.POP_MODE=t[OC]),B(t,DC)&&(r.PUSH_MODE=t[DC]),B(t,LC)&&(r.LONGER_ALT=t[LC]),B(t,MC)&&(r.LINE_BREAKS=t[MC]),B(t,FC)&&(r.START_CHARS_HINT=t[FC]),r}var xn=Hf({name:"EOF",pattern:ht.NA});gi([xn]);function Io(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function Nc(t,e){return yi(t,e)}var vi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${ty(t)?`--> ${Ti(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+jt(e).image+"'";if(n)return o+n+a;{let c=lt(t,(m,v)=>m.concat(v),[]),l=L(c,m=>`[${L(m,v=>Ti(v)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,v)=>`  ${v+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+jt(e).image+"'";if(r)return i+r+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,l=>`[${L(l,u=>Ti(u)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(vi);var UC={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},Rn={buildDuplicateFoundError(t,e){function r(u){return u instanceof ae?u.terminalType.name:u instanceof we?u.nonTerminalName:""}let n=t.name,i=jt(e),o=i.idx,s=$r(i),a=r(i),c=o>0,l=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
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
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof Tr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function qC(t,e){let r=new ry(t,e);return r.resolveRefs(),r.errors}var ry=class extends vr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(Ie(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Mt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var ny=class extends hi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Be(this.path.ruleStack).reverse(),this.occurrenceStack=Be(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Kf=class extends ny{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new We({definition:i});this.possibleTokTypes=_o(o),this.found=!0}}},ua=class extends hi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Bf=class extends ua{walkMany(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},_c=class extends ua{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Wf=class extends ua{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Pc=class extends ua{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function zf(t,e,r=[]){r=Be(r);let n=[],i=0;function o(a){return a.concat(vt(t,i+1))}function s(a){let c=zf(o(a),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof We)return s(a.definition);if(a instanceof we)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof ze){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof Ve){let c=[new We({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Me){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Fe)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:vt(t,i)}),n}function Vf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,l=c-n-1,u=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&jn(f).idx<=l&&f.pop();continue}let v=m.def,A=m.idx,C=m.ruleStack,N=m.occurrenceStack;if(se(v))continue;let S=v[0];if(S===i){let T={idx:A,def:vt(v),ruleStack:mi(C),occurrenceStack:mi(N)};f.push(T)}else if(S instanceof ae)if(A<c-1){let T=A+1,y=e[T];if(r(y,S.terminalType)){let $={idx:T,def:vt(v),ruleStack:C,occurrenceStack:N};f.push($)}}else if(A===c-1)u.push({nextTokenType:S.terminalType,nextTokenOccurrence:S.idx,ruleStack:C,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(S instanceof we){let T=Be(C);T.push(S.nonTerminalName);let y=Be(N);y.push(S.idx);let $={idx:A,def:S.definition.concat(o,vt(v)),ruleStack:T,occurrenceStack:y};f.push($)}else if(S instanceof ke){let T={idx:A,def:vt(v),ruleStack:C,occurrenceStack:N};f.push(T),f.push(s);let y={idx:A,def:S.definition.concat(vt(v)),ruleStack:C,occurrenceStack:N};f.push(y)}else if(S instanceof ze){let T=new pe({definition:S.definition,idx:S.idx}),y=S.definition.concat([T],vt(v)),$={idx:A,def:y,ruleStack:C,occurrenceStack:N};f.push($)}else if(S instanceof Ve){let T=new ae({terminalType:S.separator}),y=new pe({definition:[T].concat(S.definition),idx:S.idx}),$=S.definition.concat([y],vt(v)),D={idx:A,def:$,ruleStack:C,occurrenceStack:N};f.push(D)}else if(S instanceof Me){let T={idx:A,def:vt(v),ruleStack:C,occurrenceStack:N};f.push(T),f.push(s);let y=new ae({terminalType:S.separator}),$=new pe({definition:[y].concat(S.definition),idx:S.idx}),D=S.definition.concat([$],vt(v)),X={idx:A,def:D,ruleStack:C,occurrenceStack:N};f.push(X)}else if(S instanceof pe){let T={idx:A,def:vt(v),ruleStack:C,occurrenceStack:N};f.push(T),f.push(s);let y=new pe({definition:S.definition,idx:S.idx}),$=S.definition.concat([y],vt(v)),D={idx:A,def:$,ruleStack:C,occurrenceStack:N};f.push(D)}else if(S instanceof Fe)for(let T=S.definition.length-1;T>=0;T--){let y=S.definition[T],$={idx:A,def:y.definition.concat(vt(v)),ruleStack:C,occurrenceStack:N};f.push($),f.push(s)}else if(S instanceof We)f.push({idx:A,def:S.definition.concat(vt(v)),ruleStack:C,occurrenceStack:N});else if(S instanceof Tr)f.push(fU(S,A,C,N));else throw Error("non exhaustive match")}return u}function fU(t,e,r,n){let i=Be(r);i.push(t.name);let o=Be(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function Ic(t){if(t instanceof ke||t==="Option")return rt.OPTION;if(t instanceof pe||t==="Repetition")return rt.REPETITION;if(t instanceof ze||t==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(t instanceof Ve||t==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Me||t==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(t instanceof Fe||t==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Yf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Ic(n);return o===rt.ALTERNATION?fa(e,r,i):da(e,r,o,i)}function jC(t,e,r,n,i,o){let s=fa(t,e,r),a=VC(s)?la:yi;return o(s,n,a,i)}function HC(t,e,r,n,i,o){let s=da(t,e,i,r),a=VC(s)?la:yi;return o(s[0],a,n)}function KC(t,e,r,n){let i=t.length,o=lr(t,s=>lr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let l=t[c],u=l.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let v=l[m],A=v.length;for(let C=0;C<A;C++){let N=this.LA(C+1);if(r(N,v[C])===!1)continue e}return c}}};if(o&&!n){let s=L(t,c=>Tt(c)),a=lt(s,(c,l,u)=>(G(l,f=>{B(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{B(c,m)||(c[m]=u)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],c=a.length;e:for(let l=0;l<c;l++){let u=a[l],f=u.length;for(let m=0;m<f;m++){let v=this.LA(m+1);if(r(v,u[m])===!1)continue e}return s}}}}function BC(t,e,r){let n=lr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=Tt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=lt(o,(a,c,l)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let c=0;c<a;c++){let l=this.LA(c+1);if(e(l,s[c])===!1)continue e}return!0}return!1}}var oy=class extends hi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,rt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,rt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},Xf=class extends vr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function GC(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function iy(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function dU(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function WC(t,e){let r=L(t,s=>zf([s],1)),n=GC(r.length),i=L(r,s=>{let a={};return G(s,c=>{let l=iy(c.partialPath);G(l,u=>{a[u]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=GC(a.length);for(let c=0;c<a.length;c++){let l=a[c];for(let u=0;u<l.length;u++){let f=l[u].partialPath,m=l[u].suffixDef,v=iy(f);if(dU(i,v,c)||se(m)||f.length===e){let C=n[c];if(Jf(C,f)===!1){C.push(f);for(let N=0;N<v.length;N++){let S=v[N];i[c][S]=!0}}}else{let C=zf(m,s+1,f);o[c]=o[c].concat(C),G(C,N=>{let S=iy(N.partialPath);G(S,T=>{i[c][T]=!0})})}}}}return n}function fa(t,e,r,n){let i=new Xf(t,rt.ALTERNATION,n);return e.accept(i),WC(i.result,r)}function da(t,e,r,n){let i=new Xf(t,r);e.accept(i);let o=i.result,a=new oy(e,t,r).startWalking(),c=new We({definition:o}),l=new We({definition:a});return WC([c,l],n)}function Jf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function zC(t,e){return t.length<e.length&&lr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function VC(t){return lr(t,e=>lr(e,r=>lr(r,n=>se(n.categoryMatches))))}function XC(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Mt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function YC(t,e,r,n){let i=er(t,c=>pU(c,r)),o=vU(t,e,r),s=er(t,c=>yU(c,r)),a=er(t,c=>hU(c,t,n,r));return i.concat(o,s,a)}function pU(t,e){let r=new sy;t.accept(r);let n=r.allProductions,i=Kh(n,mU),o=Er(i,a=>a.length>1);return L(Ie(o),a=>{let c=jt(a),l=e.buildDuplicateFoundError(t,a),u=$r(c),f={message:l,type:Mt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:u,occurrence:c.idx},m=JC(c);return m&&(f.parameter=m),f})}function mU(t){return`${$r(t)}_#_${t.idx}_#_${JC(t)}`}function JC(t){return t instanceof ae?t.terminalType.name:t instanceof we?t.nonTerminalName:""}var sy=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function hU(t,e,r,n){let i=[];if(lt(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Mt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function QC(t,e,r){let n=[],i;return et(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Mt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function cy(t,e,r,n=[]){let i=[],o=Qf(e.definition);if(se(o))return[];{let s=t.name;et(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Mt.LEFT_RECURSION,ruleName:s});let c=Xi(o,n.concat([t])),l=er(c,u=>{let f=Be(n);return f.push(u),cy(t,u,r,f)});return i.concat(l)}}function Qf(t){let e=[];if(se(t))return e;let r=jt(t);if(r instanceof we)e.push(r.referencedRule);else if(r instanceof We||r instanceof ke||r instanceof ze||r instanceof Ve||r instanceof Me||r instanceof pe)e=e.concat(Qf(r.definition));else if(r instanceof Fe)e=Tt(L(r.definition,o=>Qf(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=No(r),i=t.length>1;if(n&&i){let o=vt(t);return e.concat(Qf(o))}else return e}var Dc=class extends vr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function ZC(t,e){let r=new Dc;t.accept(r);let n=r.alternations;return er(n,o=>{let s=mi(o.definition);return er(s,(a,c)=>{let l=Vf([a],[],yi,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:c}),type:Mt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:c+1}]:[]})})}function eS(t,e,r){let n=new Dc;t.accept(n);let i=n.alternations;return i=Yi(i,s=>s.ignoreAmbiguities===!0),er(i,s=>{let a=s.idx,c=s.maxLookahead||e,l=fa(a,t,c,s),u=gU(l,s,t,r),f=TU(l,s,t,r);return u.concat(f)})}var ay=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function yU(t,e){let r=new Dc;t.accept(r);let n=r.alternations;return er(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Mt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function tS(t,e,r){let n=[];return G(t,i=>{let o=new ay;i.accept(o);let s=o.allProductions;G(s,a=>{let c=Ic(a),l=a.maxLookahead||e,u=a.idx,m=da(u,i,c,l)[0];if(se(Tt(m))){let v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:v,type:Mt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function gU(t,e,r,n){let i=[],o=lt(t,(a,c,l)=>(e.definition[l].ignoreAmbiguities===!0||G(c,u=>{let f=[l];G(t,(m,v)=>{l!==v&&Jf(m,u)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!Jf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let c=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Mt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function TU(t,e,r,n){let i=lt(t,(s,a,c)=>{let l=L(a,u=>({idx:c,path:u}));return s.concat(l)},[]);return Gn(er(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,l=s.path,u=Gt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&zC(m.path,l));return L(u,m=>{let v=[m.idx+1,c+1],A=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:m.path}),type:Mt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:A,alternatives:v}})}))}function vU(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(et(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Mt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function rS(t){let e=ra(t,{errMsgProvider:UC}),r={};return G(t.rules,n=>{r[n.name]=n}),qC(r,e.errMsgProvider)}function nS(t){return t=ra(t,{errMsgProvider:Rn}),YC(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var iS="MismatchedTokenException",oS="NoViableAltException",sS="EarlyExitException",aS="NotAllInputParsedException",cS=[iS,oS,sS,aS];Object.freeze(cS);function Ji(t){return et(cS,t.name)}var pa=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Do=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=iS}},Oc=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=oS}},Lc=class extends pa{constructor(e,r){super(e,r),this.name=aS}},Mc=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=sS}};var ly={},fy="InRuleRecoveryException",uy=class extends Error{constructor(e){super(e),this.name=fy}},Zf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=B(e,"recoveryEnabled")?e.recoveryEnabled:xr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=xU)}getTokenToInsert(e){let r=Io(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,l=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),v=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),A=new Do(v,l,this.LA(0));A.resyncedTokens=mi(a),this.SAVE_ERROR(A)};for(;!c;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(u,o)?c=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new uy("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Hn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Hn(e,o=>Nc(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return ly;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?ly:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return Tt(e)}getFollowSetFromFollowKey(e){if(e===ly)return[xn];let r=e.ruleName+e.idxInCallingRule+Mf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,xn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return mi(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=Be(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function xU(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),v=this.getGAstProductions()[m];c=new o(v,i).startWalking(),this.firstAfterRepMap[a]=c}let l=c.token,u=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=xn,u=1),!(l===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,u,s)&&this.tryInRepetitionRecovery(t,e,r,l)}function ed(t,e,r){return r|e|t}var Ire=32-8;var xi=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:xr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return er(e,r=>cy(r,r,Rn))}validateEmptyOrAlternatives(e){return er(e,r=>ZC(r,Rn))}validateAmbiguousAlternationAlternatives(e,r){return er(e,n=>eS(n,r,Rn))}validateSomeNonEmptyLookaheadPath(e,r){return tS(e,r,Rn)}buildLookaheadForAlternation(e){return jC(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,KC)}buildLookaheadForOptional(e){return HC(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Ic(e.prodType),BC)}};var rd=class{initLooksAhead(e){this.dynamicTokensEnabled=B(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:xr.dynamicTokensEnabled,this.maxLookahead=B(e,"maxLookahead")?e.maxLookahead:xr.maxLookahead,this.lookaheadStrategy=B(e,"lookaheadStrategy")?e.lookaheadStrategy:new xi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=RU(r);G(n,l=>{let u=l.idx===0?"":l.idx;this.TRACE_INIT(`${$r(l)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:r,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=ed(this.fullRuleNameToShort[r.name],256,l.idx);this.setLaFuncCache(m,f)})}),G(i,l=>{this.computeLookaheadFunc(r,l.idx,768,"Repetition",l.maxLookahead,$r(l))}),G(o,l=>{this.computeLookaheadFunc(r,l.idx,512,"Option",l.maxLookahead,$r(l))}),G(s,l=>{this.computeLookaheadFunc(r,l.idx,1024,"RepetitionMandatory",l.maxLookahead,$r(l))}),G(a,l=>{this.computeLookaheadFunc(r,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,$r(l))}),G(c,l=>{this.computeLookaheadFunc(r,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,$r(l))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=ed(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return ed(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},dy=class extends vr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},td=new dy;function RU(t){td.reset(),t.accept(td);let e=td.dslMethods;return td.reset(),e}function hy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function yy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function lS(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function uS(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var bU="name";function gy(t,e){Object.defineProperty(t,bU,{enumerable:!1,configurable:!0,writable:!1,value:e})}function AU(t,e){let r=He(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let c=0;c<a;c++){let l=s[c];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function fS(t,e){let r=function(){};gy(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!ur(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=CU(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function dS(t,e,r){let n=function(){};gy(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=AU}),n.prototype=i,n.prototype.constructor=n,n}var Ty;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Ty||(Ty={}));function CU(t,e){return SU(t,e)}function SU(t,e){let r=Gt(e,i=>gr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:Ty.MISSING_METHOD,methodName:i}));return Gn(n)}var sd=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=B(e,"nodeLocationTracking")?e.nodeLocationTracking:xr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=ct,this.cstFinallyStateUpdate=ct,this.cstPostTerminal=ct,this.cstPostNonTerminal=ct,this.cstPostRule=ct;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=yy,this.setNodeLocationFromNode=yy,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=hy,this.setNodeLocationFromNode=hy,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=ct,this.setInitialNodeLocation=ct;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];lS(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];uS(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(ur(this.baseCstVisitorConstructor)){let e=fS(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(ur(this.baseCstVisitorWithDefaultsConstructor)){let e=dS(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var ad=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ma}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?ma:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var cd=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=ha){if(et(this.definedRulesNames,e)){let s={message:Rn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Mt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=ha){let i=QC(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Ji(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Lf(Ie(this.gastProductionsCache))}};var ld=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=la,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},B(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=lt(e,(o,s)=>(o[s.name]=s,o),{});else if(B(e,"modes")&&lr(Tt(Ie(e.modes)),NC)){let o=Tt(Ie(e.modes)),s=na(o);this.tokensMap=lt(s,(a,c)=>(a[c.name]=c,a),{})}else if(at(e))this.tokensMap=Be(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=xn;let n=B(e,"modes")?Tt(Ie(e.modes)):Ie(e),i=lr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?la:yi,gi(Ie(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=B(n,"resyncEnabled")?n.resyncEnabled:ha.resyncEnabled,o=B(n,"recoveryValueFunc")?n.recoveryValueFunc:ha.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Ji(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Wf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Pc],a,1536,e,Pc)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Bf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,_c],a,1280,e,_c)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Lc(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Ji(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Do(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===fy?n:o}}else throw n}saveRecogState(){let e=this.errors,r=Be(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),xn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var ud=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=B(e,"errorMessageProvider")?e.errorMessageProvider:xr.errorMessageProvider}SAVE_ERROR(e){if(Ji(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Be(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Be(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=da(e,o,r,this.maxLookahead)[0],c=[];for(let u=1;u<=this.maxLookahead;u++)c.push(this.LA(u));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Mc(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=fa(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Oc(c,this.LA(1),a))}};var fd=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(ur(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Vf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=jt(e.ruleStack),i=this.getGAstProductions()[r];return new Kf(i,e).startWalking()}};var md={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(md);var pS=!0,mS=Math.pow(2,8)-1,yS=Hf({name:"RECORDING_PHASE_TOKEN",pattern:ht.NA});gi([yS]);var gS=Io(yS,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(gS);var kU={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},dd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return ma}topLevelRuleRecord(e,r){try{let n=new Tr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Uc.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){Uc.call(this,ze,r,e)}atLeastOneSepFirstInternalRecord(e,r){Uc.call(this,Ve,r,e,pS)}manyInternalRecord(e,r){Uc.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){Uc.call(this,Me,r,e,pS)}orInternalRecord(e,r){return EU.call(this,e,r)}subruleInternalRecord(e,r,n){if(pd(r),!e||B(e,"ruleName")===!1){let a=new Error(`<SUBRULE${hS(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=jn(this.recordingProdStack),o=e.ruleName,s=new we({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?kU:md}consumeInternalRecord(e,r,n){if(pd(r),!Zh(e)){let s=new Error(`<CONSUME${hS(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=jn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),gS}};function Uc(t,e,r,n=!1){pd(r);let i=jn(this.recordingProdStack),o=gr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),B(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),md}function EU(t,e){pd(e);let r=jn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});B(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=Cc(i,a=>gr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let c=new We({definition:[]});o.definition.push(c),B(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:B(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),md}function hS(t){return t===0?"":`${t}`}function pd(t){if(t<0||t>mS){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${mS+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var hd=class{initPerformanceTracer(e){if(B(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=xr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=wc(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function TS(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var ma=Io(xn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ma);var xr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:vi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ha=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Mt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Mt||(Mt={}));function yd(t=void 0){return function(){return t}}var qc=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{kc(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=rS({rules:Ie(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=nS({rules:Ie(this.gastProductionsCache),tokenTypes:Ie(this.tokensMap),errMsgProvider:Rn,grammarName:r}),o=XC({lookaheadStrategy:this.lookaheadStrategy,rules:Ie(this.gastProductionsCache),tokenTypes:Ie(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=uC(Ie(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Ie(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Ie(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),B(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=B(r,"skipValidations")?r.skipValidations:xr.skipValidations}};qc.DEFER_DEFINITION_ERRORS_HANDLING=!1;TS(qc,[Zf,rd,sd,ad,ld,cd,ud,fd,dd,hd]);var Gc=class extends qc{constructor(e,r=xr){let n=Be(r);n.outputCst=!1,super(e,n)}};function Oo(t,e,r){return`${t.name}_${e}_${r}`}var Qi=1,NU=2,vS=4,xS=5;var Ta=7,_U=8,PU=9,IU=10,DU=11,RS=12,jc=class{constructor(e){this.target=e}isEpsilon(){return!1}},ya=class extends jc{constructor(e,r){super(e),this.tokenType=r}},Hc=class extends jc{constructor(e){super(e)}isEpsilon(){return!0}},ga=class extends jc{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function bS(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};OU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Lo(e,i,i);o!==void 0&&WU(e,i,o)}return e}function OU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Ht(t,i,void 0,{type:NU}),s=Ht(t,i,void 0,{type:Ta});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function AS(t,e,r){return r instanceof ae?xy(t,e,r.terminalType,r):r instanceof we?BU(t,e,r):r instanceof Fe?qU(t,e,r):r instanceof ke?GU(t,e,r):r instanceof pe?LU(t,e,r):r instanceof Me?MU(t,e,r):r instanceof ze?FU(t,e,r):r instanceof Ve?UU(t,e,r):Lo(t,e,r)}function LU(t,e,r){let n=Ht(t,e,r,{type:xS});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return SS(t,e,r,i)}function MU(t,e,r){let n=Ht(t,e,r,{type:xS});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r)),o=xy(t,e,r.separator,r);return SS(t,e,r,i,o)}function FU(t,e,r){let n=Ht(t,e,r,{type:vS});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return CS(t,e,r,i)}function UU(t,e,r){let n=Ht(t,e,r,{type:vS});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r)),o=xy(t,e,r.separator,r);return CS(t,e,r,i,o)}function qU(t,e,r){let n=Ht(t,e,r,{type:Qi});Zi(t,n);let i=L(r.definition,s=>AS(t,e,s));return va(t,e,n,r,...i)}function GU(t,e,r){let n=Ht(t,e,r,{type:Qi});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return jU(t,e,r,i)}function Lo(t,e,r){let n=Gt(L(r.definition,i=>AS(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:KU(t,n)}function CS(t,e,r,n,i){let o=n.left,s=n.right,a=Ht(t,e,r,{type:DU});Zi(t,a);let c=Ht(t,e,r,{type:RS});return o.loopback=a,c.loopback=a,t.decisionMap[Oo(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,Pt(s,a),i===void 0?(Pt(a,o),Pt(a,c)):(Pt(a,c),Pt(a,i.left),Pt(i.right,o)),{left:o,right:c}}function SS(t,e,r,n,i){let o=n.left,s=n.right,a=Ht(t,e,r,{type:IU});Zi(t,a);let c=Ht(t,e,r,{type:RS}),l=Ht(t,e,r,{type:PU});return a.loopback=l,c.loopback=l,Pt(a,o),Pt(a,c),Pt(s,l),i!==void 0?(Pt(l,c),Pt(l,i.left),Pt(i.right,o)):Pt(l,a),t.decisionMap[Oo(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:c}}function jU(t,e,r,n){let i=n.left,o=n.right;return Pt(i,o),t.decisionMap[Oo(e,"Option",r.idx)]=i,n}function Zi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function va(t,e,r,n,...i){let o=Ht(t,e,n,{type:_U,start:r});r.end=o;for(let a of i)a!==void 0?(Pt(r,a.left),Pt(a.right,o)):Pt(r,o);let s={left:r,right:o};return t.decisionMap[Oo(e,HU(n),n.idx)]=r,s}function HU(t){if(t instanceof Fe)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Me)return"RepetitionWithSeparator";if(t instanceof ze)return"RepetitionMandatory";if(t instanceof Ve)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function KU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof ga,l=a,u=e[o+1].left;s.left.type===Qi&&s.right.type===Qi&&a!==void 0&&(c&&l.followState===s.right||a.target===s.right)?(c?l.followState=u:a.target=u,zU(t,s.right)):Pt(s.right,u)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function xy(t,e,r,n){let i=Ht(t,e,n,{type:Qi}),o=Ht(t,e,n,{type:Qi});return Ry(i,new ya(o,r)),{left:i,right:o}}function BU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Ht(t,e,r,{type:Qi}),s=Ht(t,e,r,{type:Qi}),a=new ga(i,n,s);return Ry(o,a),{left:o,right:s}}function WU(t,e,r){let n=t.ruleToStartState.get(e);Pt(n,r.left);let i=t.ruleToStopState.get(e);return Pt(r.right,i),{left:n,right:i}}function Pt(t,e){let r=new Hc(e);Ry(t,r)}function Ht(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function Ry(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function zU(t,e){t.states.splice(t.states.indexOf(e),1)}var Kc={},xa=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=by(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function by(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function VU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var gd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},wS=new gd,Bc=class extends xi{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=bS(e.rules),this.dfas=XU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Oo(n,"Alternation",r),u=this.atn.decisionMap[c].decision,f=L(Yf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,v=>v[0]));if(kS(f,!1)&&!o){let m=lt(f,(v,A,C)=>(G(A,N=>{N&&(v[N.tokenTypeIdx]=C,G(N.categoryMatches,S=>{v[S]=C}))}),v),{});return i?function(v){var A;let C=this.LA(1),N=m[C.tokenTypeIdx];if(v!==void 0&&N!==void 0){let S=(A=v[N])===null||A===void 0?void 0:A.GATE;if(S!==void 0&&S.call(this)===!1)return}return N}:function(){let v=this.LA(1);return m[v.tokenTypeIdx]}}else return i?function(m){let v=new gd,A=m===void 0?0:m.length;for(let N=0;N<A;N++){let S=m?.[N].GATE;v.set(N,S===void 0||S.call(this))}let C=Ay.call(this,s,u,v,a);return typeof C=="number"?C:void 0}:function(){let m=Ay.call(this,s,u,wS,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Oo(n,i,r),u=this.atn.decisionMap[c].decision,f=L(Yf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,v=>v[0]));if(kS(f)&&f[0][0]&&!o){let m=f[0],v=Tt(m);if(v.length===1&&se(v[0].categoryMatches)){let C=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===C}}else{let A=lt(v,(C,N)=>(N!==void 0&&(C[N.tokenTypeIdx]=!0,G(N.categoryMatches,S=>{C[S]=!0})),C),{});return function(){let C=this.LA(1);return A[C.tokenTypeIdx]===!0}}}return function(){let m=Ay.call(this,s,u,wS,a);return typeof m=="object"?!1:m===0}}};function kS(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function XU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=VU(t.decisionStates[n],n);return r}function Ay(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=sq(i.atnStartState);o=NS(i,$S(a)),i.start=o}return YU.apply(this,[i,o,r,n])}function YU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=rq(i,a);if(c===void 0&&(c=JU.apply(this,[t,i,a,o,r,n])),c===Kc)return tq(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function JU(t,e,r,n,i,o){let s=nq(e.configs,r,i);if(s.size===0)return ES(t,e,r,Kc),Kc;let a=$S(s),c=oq(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(uq(s)){let l=tC(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,QU.apply(this,[t,n,s.alts,o])}return a=ES(t,e,r,a),a}function QU(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,c=ZU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(c)}function ZU(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${eq(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function eq(t){if(t instanceof we)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function tq(t,e,r){let n=er(e.configs.elements,o=>o.state.transitions),i=cC(n.filter(o=>o instanceof ya).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function rq(t,e){return t.edges[e.tokenTypeIdx]}function nq(t,e,r){let n=new xa,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===Ta){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let l=s.state.transitions[c],u=iq(l,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new xa;for(let s of n.elements)Td(s,o)}if(i.length>0&&!cq(o))for(let s of i)o.add(s);return o}function iq(t,e){if(t instanceof ya&&Nc(e,t.tokenType))return t.target}function oq(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function $S(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function ES(t,e,r,n){return n=NS(t,n),e.edges[r.tokenTypeIdx]=n,n}function NS(t,e){if(e===Kc)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function sq(t){let e=new xa,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};Td(o,e)}return e}function Td(t,e){let r=t.state;if(r.type===Ta){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};Td(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=aq(t,o);s!==void 0&&Td(s,e)}}function aq(t,e){if(e instanceof Hc)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ga){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function cq(t){for(let e of t.elements)if(e.state.type===Ta)return!0;return!1}function lq(t){for(let e of t.elements)if(e.state.type!==Ta)return!1;return!0}function uq(t){if(lq(t))return!0;let e=fq(t.elements);return dq(e)&&!pq(e)}function fq(t){let e=new Map;for(let r of t){let n=by(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function dq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function pq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var Cy=de(co(),1);var vd=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new wy(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new bd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Rd(e.startOffset,e.image.length,Xa(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Rd(r.startOffset,r.image.length,Xa(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if($n(s)&&n>a&&i<c){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},xd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},Rd=class extends xd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},bd=class extends xd{constructor(){super(...arguments),this.content=new Sy(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:Cy.Position.create(0,0),end:Cy.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},Sy=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},wy=class extends bd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Ey=Symbol("Datatype");function ky(t){return t.$type===Ey}var _S="\u200B",PS=t=>t.endsWith(_S)?t:t+_S,Ad=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Ny(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},Cd=class extends Ad{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new vd,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Ur(e)?Ey:yn(e),i=this.wrapper.DEFINE_RULE(PS(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===Ey&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let l=pt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(ky(c)){let l=i.image;pt(n)||(l=this.converter.convert(l,o).toString()),c.value+=l}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(ky(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let l=c;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return jv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),ky(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Pe(e,Re);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Xt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},$y=class{buildMismatchTokenMessage(e){return vi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return vi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return vi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return vi.buildEarlyExitMessage(e)}},Wc=class extends $y{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},Sd=class extends Ad{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(PS(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},mq={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Wc},Ny=class extends Gc{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},mq),{lookaheadStrategy:n?new xi({maxLookahead:r.maxLookahead}):new Bc}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var zc=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function wd(t){throw new Error("Error! The input value was not handled.")}function Ed(t,e,r){return hq({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function hq(t,e){let r=vs(e,!1),n=ie(e.rules).filter(K).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Mo(o,i.definition)))}}function Mo(t,e,r=!1){let n;if(pt(e))n=bq(t,e);else if(Ne(e))n=yq(t,e);else if(Re(e))n=Mo(t,e.terminal);else if(Xt(e))n=IS(t,e);else if(_e(e))n=gq(t,e);else if(Dr(e))n=vq(t,e);else if(Or(e))n=xq(t,e);else if(Ut(e))n=Rq(t,e);else throw new zc(e.$cstNode,`Unexpected element type: ${e.$type}`);return DS(t,r?void 0:kd(e),n,e.cardinality)}function yq(t,e){let r=yn(e);return()=>t.parser.action(r,e)}function gq(t,e){let r=e.rule.ref;if(K(r)){let n=t.subrule++,i=e.arguments.length>0?Tq(r,e.arguments):()=>({});return o=>t.parser.subrule(n,OS(t,r),e,i(o))}else if(Ce(r)){let n=t.consume++,i=_y(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)wd(r);else throw new zc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function Tq(t,e){let r=e.map(n=>Ri(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function Ri(t){if(av(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)||r(n)}else if(ov(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)&&r(n)}else if(dv(t)){let e=Ri(t.value);return r=>!e(r)}else if(cs(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(uv(t)){let e=!!t.true;return()=>e}wd(t)}function vq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Mo(t,i,!0)},s=kd(i);s&&(o.GATE=Ri(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function xq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);let r=[];for(let a of e.elements){let c={ALT:Mo(t,a,!0)},l=kd(a);l&&(c.GATE=Ri(l)),r.push(c)}let n=t.or++,i=(a,c)=>{let l=c.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>t.parser.alternatives(n,r.map((c,l)=>{let u={ALT:()=>!0},f=t.parser;u.ALT=()=>{if(c.ALT(a),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let A=f.unorderedGroups.get(v);typeof A?.[l]>"u"&&(A[l]=!0)}};let m=c.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},u})),s=DS(t,kd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function Rq(t,e){let r=e.elements.map(n=>Mo(t,n));return n=>r.forEach(i=>i(n))}function kd(t){if(Ut(t))return t.guardCondition}function IS(t,e,r=e.terminal){if(r)if(_e(r)&&K(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,OS(t,r.rule.ref),e,i)}else if(_e(r)&&Ce(r.rule.ref)){let n=t.consume++,i=_y(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(pt(r)){let n=t.consume++,i=_y(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=pc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+yn(e.type.ref));return IS(t,e,i)}}function bq(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function DS(t,e,r,n){let i=e&&Ri(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:yd(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:yd(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else wd(n)}function OS(t,e){let r=Aq(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Aq(t,e){if(K(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!K(n);)(Ut(n)||Dr(n)||Or(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function _y(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function LS(t){let e=t.Grammar,r=t.parser.Lexer,n=new Sd(t);return Ed(e,n,r.definition),n.finalize(),n}function MS(t){let e=Cq(t);return e.finalize(),e}function Cq(t){let e=t.Grammar,r=t.parser.Lexer,n=new Cd(t);return Ed(e,n,r.definition)}var $d=class{buildTokens(e,r){let n=ie(vs(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&uh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(Ce).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Qr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=uh(r)?ht.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(K).flatMap(i=>Qe(i).filter(pt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(ux(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&fx("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Nd=class{convert(e,r){let n=r.grammarSource;if(Xt(n)&&(n=Nu(n)),_e(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return Eq(r);case"STRING":return Sq(r);case"ID":return kq(r)}switch((i=Co(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return _q(r);case"boolean":return Pq(r);case"bigint":return $q(r);case"date":return Nq(r);default:return r}}};function Sq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=wq(i)}else e+=n}return e}function wq(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function kq(t){return t.charAt(0)==="^"?t.substring(1):t}function Eq(t){return parseInt(t)}function $q(t){return BigInt(t)}function Nq(t){return new Date(t)}function _q(t){return Number(t)}function Pq(t){return t.toLowerCase()==="true"}var FS=de(Ae(),1);var _d=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=FS.CancellationToken.None){for(let n of ni(e.parseResult.value))await Ze(r),iu(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(ns(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if($t(this._ref))return this._ref;if(KT(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:r});if(c.error&&ne(e).state<je.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return $t(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return ns(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(ns(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<je.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function qS(t){return typeof t.$comment=="string"}function US(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Pd=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,l;if(!this.ignoreProperties.has(e))if(ei(r)){let u=r.ref,f=n?r.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(c=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let u;if(o&&$t(r)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&$t(r)&&(u??(u=Object.assign({},r)),u.$sourceText=(l=r.$cstNode)===null||l===void 0?void 0:l.text),s&&$t(r)&&(u??(u=Object.assign({},r)),u.$comment=this.commentProvider.getComment(r)),u??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Pi(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];US(u)?c[l]=this.reviveReference(e,a,r,u):$t(u)&&this.linkNode(u,r,e,a,l)}else US(c)?e[a]=this.reviveReference(e,a,r,c):$t(c)&&this.linkNode(c,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Id=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var GS=de(Ae(),1);var Dd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=or((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:or(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Od=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=GS.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ni(i))await Ze(r),iu(o).filter(s=>!ns(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:or(n),local:ve.equals(r.documentUri,i)}}};var Ld=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),l=i[a];return l?.[c]}return i[o]},e)}};var jS=de(kt(),1),Md=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(jS.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var Ra=de(Ae(),1);var Fd=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Ra.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===je.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=je.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let c=this.buildState.get(a),l=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=r.validation.categories)!==null&&o!==void 0?o:ys.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:c.result}),s.state=je.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=Ra.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,je.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<je.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),Ra.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,je.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,je.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,je.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,je.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,je.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,je.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await Ze(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Ra.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:ys.all;l.result.validationChecks?l.result.validationChecks.push(...u):l.result.validationChecks=[...u]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Py=de(Ae(),1);var Ud=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new Au,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var HS=de(Ae(),1);var qd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=HS.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Qt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var Gd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=KS(r)?Object.values(r):r;this.chevrotainLexer=new ht(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(KS(e))return e;let r=BS(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function Iq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function BS(t){return t&&"modes"in t&&"defaultMode"in t}function KS(t){return!Iq(t)&&!BS(t)}var be=de(Ae(),1);function VS(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=be.Position.create(0,0));let o=YS(t),s=Oy(n),a=Oq({lines:o,position:i,options:s});return qq({index:0,tokens:a,position:i})}function XS(t,e){let r=Oy(e),n=YS(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function YS(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Za)}var WS=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,Dq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Oq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let c=a===0,l=a===t.lines.length-1,u=t.lines[a],f=0;if(c&&t.options.start){let v=(e=t.options.start)===null||e===void 0?void 0:e.exec(u);v&&(f=v.index+v[0].length)}else{let v=(r=t.options.line)===null||r===void 0?void 0:r.exec(u);v&&(f=v.index+v[0].length)}if(l){let v=(n=t.options.end)===null||n===void 0?void 0:n.exec(u);v&&(u=u.substring(0,v.index))}if(u=u.substring(0,Uq(u)),Dy(u,0)>=u.length){if(i.length>0){let v=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(v,v)})}}else{WS.lastIndex=f;let v=WS.exec(u);if(v){let A=v[0],C=v[1],N=be.Position.create(o,s+f),S=be.Position.create(o,s+f+A.length);i.push({type:"tag",content:C,range:be.Range.create(N,S)}),f+=A.length,f=Dy(u,f)}if(f<u.length){let A=u.substring(f),C=Array.from(A.matchAll(Dq));i.push(...Lq(C,A,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Lq(t,e,r,n){let i=[];if(t.length===0){let o=be.Position.create(r,n),s=be.Position.create(r,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of t){let c=a.index,l=e.substring(o,c);l.length>0&&i.push({type:"text",content:e.substring(o,c),range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,c+n))});let u=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,o+n+s.length))})}return i}var Mq=/\S/,Fq=/\s*$/;function Dy(t,e){let r=t.substring(e).match(Mq);return r?e+r.index:t.length}function Uq(t){let e=t.match(Fq);if(e&&typeof e.index=="number")return e.index}function qq(t){var e,r,n,i;let o=be.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new jd([],be.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let l=Gq(t,s[s.length-1]);l&&s.push(l)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new jd(s,be.Range.create(a,c))}function Gq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return QS(t,!1);if(r.type==="text"||r.type==="inline-tag")return JS(t);jq(r,e),t.index++}function jq(t,e){if(e){let r=new Hd("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function JS(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Hq(t)),n=e,e=t.tokens[t.index];return new Xc(i,be.Range.create(r.range.start,n.range.end))}function Hq(t){return t.tokens[t.index].type==="inline-tag"?QS(t,!0):ZS(t)}function QS(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=ZS(t);return new Vc(n,new Xc([o],o.range),e,be.Range.create(r.range.start,o.range.end))}else{let o=JS(t);return new Vc(n,o,e,be.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Vc(n,new Xc([],o),e,o)}}function ZS(t){let e=t.tokens[t.index++];return new Hd(e.content,e.range)}function Oy(t){if(!t)return Oy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:Iy(e,!0),end:Iy(r,!1),line:Iy(n,!0)}}function Iy(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?si(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var jd=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=zS(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=zS(r)+i}return r.trim()}},Vc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=Kq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Kq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=Dy(e,o);s=e.substring(c),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:Bq(e,s)}}function Bq(t,e){try{return Qt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Xc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Hd=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function zS(t){return t.endsWith(`
`)?`
`:`

`}var Kd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&XS(r))return VS(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Bd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return qS(e)?e.$comment:(r=YT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function vc(t){return{documentation:{CommentProvider:e=>new Bd(e),DocumentationProvider:e=>new Kd(e)},parser:{GrammarConfig:e=>mR(e),LangiumParser:e=>MS(e),CompletionParser:e=>LS(e),ValueConverter:()=>new Nd,TokenBuilder:()=>new $d,Lexer:e=>new Gd(e),ParserErrorMessageProvider:()=>new Wc},lsp:{CompletionProvider:e=>new Es(e),DocumentSymbolProvider:e=>new Hu(e),HoverProvider:e=>new Wu(e),FoldingRangeProvider:e=>new Ns(e),ReferencesProvider:e=>new Qu(e),DefinitionProvider:e=>new Is(e),DocumentHighlightProvider:e=>new ju(e),RenameProvider:e=>new Zu(e)},workspace:{AstNodeLocator:()=>new Ld,AstNodeDescriptionProvider:e=>new Dd(e),ReferenceDescriptionProvider:e=>new Od(e)},references:{Linker:e=>new _d(e),NameProvider:()=>new ms,ScopeProvider:e=>new ws(e),ScopeComputation:e=>new Ss(e),References:e=>new _s(e)},serializer:{JsonSerializer:e=>new Pd(e)},validation:{DocumentValidator:e=>new ku(e),ValidationRegistry:e=>new Tu(e)},shared:()=>t.shared}}function xc(t){return{ServiceRegistry:()=>new Id,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Xu(e),WorkspaceSymbolProvider:e=>new ef(e),NodeKindProvider:()=>new Yu,FuzzyMatcher:()=>new Bu},workspace:{LangiumDocuments:e=>new Vu(e),LangiumDocumentFactory:e=>new zu(e),DocumentBuilder:e=>new Fd(e),TextDocuments:()=>new ew.TextDocuments(rs),IndexManager:e=>new Ud(e),WorkspaceManager:e=>new qd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new gu,ConfigurationProvider:e=>new Md(e)}}}var Ca=de(rw(),1);var Wq="Instruction";var zq="Type";var nw="Block";var iw="Command";var Vq="DeclarationVariable";var ow="ExpressionBase";var Xq="BooleanType";var sw="Distance";var Yq="NumberType";var Jq="Time";var Qq="IF";var Zq="LOOP";var eG="DirectionCommand";var aw="ReadSensorCommand";var tG="RotateCommand";var rG="SpeedCommand";var nG="Affectation";var cw="Call";var lw="Expression";var iG="CM";var oG="Mm";var sG="DistanceSensorCommand";var aG="TimeSensorCommand";var cG="CallFunction";var lG="CallVariable";var uG="And";var fG="BooleanExp";var dG="Equals";var pG="MultDiv";var mG="MultDivDistance";var hG="MultDivTime";var yG="Not";var gG="Or";var TG="PlusMinus";var vG="PlusMinusDistance";var xG="PlusMinusTime";var RG="PrimaryExprAri";var bG="PrimaryExprBool";var AG="PrimaryExprDistance";var CG="PrimaryExprTime";var Yc=class extends po{getAllTypes(){return["Affectation","And","Block","BooleanExp","BooleanType","CM","Call","CallFunction","CallVariable","Command","DeclarationVariable","DirectionCommand","Distance","DistanceExpression","DistanceSensorCommand","Equals","Expression","ExpressionBase","FunctionN","IF","Instruction","LOOP","Mm","MultDiv","MultDivDistance","MultDivTime","Not","NumberType","Or","Parameter","PlusMinus","PlusMinusDistance","PlusMinusTime","PrimaryExprAri","PrimaryExprBool","PrimaryExprDistance","PrimaryExprTime","ReadSensorCommand","Robot","RotateCommand","SpeedCommand","Time","TimeExpression","TimeSensorCommand","Type","TypeClass"]}computeIsSubtype(e,r){switch(e){case nG:case cw:case lw:return this.isSubtype(ow,r);case uG:case fG:case dG:case pG:case mG:case hG:case yG:case gG:case TG:case vG:case xG:case RG:case bG:case AG:case CG:return this.isSubtype(lw,r);case nw:case iw:case Vq:case ow:return this.isSubtype(Wq,r);case Xq:case sw:case Yq:case Jq:return this.isSubtype(zq,r);case cG:case lG:return this.isSubtype(cw,r);case iG:case oG:return this.isSubtype(sw,r);case eG:case aw:case tG:case rG:return this.isSubtype(iw,r);case sG:case aG:return this.isSubtype(aw,r);case Qq:case Zq:return this.isSubtype(nw,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"FunctionN":return{name:"FunctionN",mandatory:[{name:"instruction",type:"array"},{name:"parameters",type:"array"}]};case"Robot":return{name:"Robot",mandatory:[{name:"functions",type:"array"}]};case"Block":return{name:"Block",mandatory:[{name:"instruction",type:"array"}]};case"BooleanType":return{name:"BooleanType",mandatory:[{name:"value",type:"boolean"}]};case"CallFunction":return{name:"CallFunction",mandatory:[{name:"parameters",type:"array"}]};default:return{name:e,mandatory:[]}}}},Uce=new Yc;var Wd,uw=()=>Wd??(Wd=yu(`{
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
}`));var SG={languageId:"robot",fileExtensions:[".rob"],caseInsensitive:!1},fw={AstReflection:()=>new Yc},dw={Grammar:()=>uw(),LanguageMetaData:()=>SG,parser:{}};function pw(t){let e=t.validation.ValidationRegistry,r=t.validation.RobotValidator,n={Robot:r.checkRobot};e.register(n,r)}var zd=class{constructor(){this.functionVariableMap=new Map}checkRobot(e,r){this.traverseFunctionDeclarations(e,r),this.traverseFunctionCalls(e,r),this.checkReturn(e,r)}traverseFunctionDeclarations(e,r){e.functions.forEach(n=>{let i=new Set;n.parameters.forEach(o=>{i.has(o.nom)?r("error","Parameters' name should be different.",{node:o,property:"nom"}):i.add(o.nom)}),this.functionVariableMap.set(n.name,i)})}checkCall(e,r,n){switch(e.$type){case"CallVariable":let i=e;r.has(i.nom)||n("error","Variable not declared.",{node:i,property:"nom"});break;case"CallFunction":let o=e;this.functionVariableMap.has(o.nom)?o.parameters.forEach(a=>{this.checkCall(a,r,n)}):n("error","Function not declared.",{node:o,property:"nom"});break;case"Expression":let s=e;this.checkExpression(s,r,n);break}}traverseFunctionCalls(e,r){e.functions.forEach(n=>{n.instruction.forEach(i=>{let o=this.functionVariableMap.get(n.name);o===void 0?r("error","Function not declared.",{node:n,property:"name"}):this.traverseInstructions(i,o,r)})})}traverseInstructions(e,r,n){switch(e.$type){case"DeclarationVariable":let i=e;r.has(i.nom)?n("error","Variable already declared.",{node:i,property:"nom"}):(this.checkCall(i.expressionbase,r,n),r.add(i.nom));break;case"Affectation":let o=e;r.has(o.callvariable.nom)||n("error","Variable not declared.",{node:o}),this.checkCall(o.expressionbase,r,n);break;case"LOOP":let s=e;this.checkCall(s.expression,r,n),s.instruction.forEach(c=>{this.traverseInstructions(c,r,n)});break;case"IF":let a=e;this.checkCall(a.expression,r,n),a.instruction.forEach(c=>{this.traverseInstructions(c,r,n)});break}}checkReturn(e,r){e.functions.forEach(n=>{let i=n.return!==void 0,o=n.returnedValue!==void 0;i!==o?i?r("error","Function should have a return value.",{node:n,property:"name"}):r("error","Function should not have a return value.",{node:n,property:"name"}):i&&this.checkCall(n.returnedValue,this.functionVariableMap.get(n.name),r)})}checkExpression(e,r,n){switch(e.$type){case"Expression":let i=e;this.checkExpression(i.expr1,r,n),this.checkExpression(i.expr2,r,n);break;case"And":let o=e;this.checkExpression(o.expr1,r,n),this.checkExpression(o.expr2,r,n);break;case"Or":let s=e;this.checkExpression(s.expr1,r,n),this.checkExpression(s.expr2,r,n);break;case"Equals":let a=e;this.checkExpression(a.expr1,r,n),this.checkExpression(a.expr2,r,n);break;case"PrimaryExprBool":let c=e;switch(c.expr.$type){case"CallVariable":let T=c.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=c.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break;case"PlusMinus":let l=e;this.checkExpression(l.expr1,r,n),this.checkExpression(l.expr2,r,n);break;case"MultDiv":let u=e;this.checkExpression(u.expr1,r,n),this.checkExpression(u.expr1,r,n);break;case"PlusMinusDistance":let f=e;this.checkExpression(f.expr1,r,n),this.checkExpression(f.expr2,r,n);break;case"MultDivDistance":let m=e;this.checkExpression(m.expr1,r,n),this.checkExpression(m.expr2,r,n);break;case"PlusMinusTime":let v=e;this.checkExpression(v.expr1,r,n),this.checkExpression(v.expr2,r,n);break;case"MultDivTime":let A=e;this.checkExpression(A.expr1,r,n),this.checkExpression(A.expr2,r,n);break;case"PrimaryExprTime":let C=e;switch(C.expr.$type){case"CallVariable":let T=C.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=C.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break;case"PrimaryExprDistance":let N=e;switch(N.expr.$type){case"CallVariable":let T=N.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=N.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break;case"PrimaryExprAri":let S=e;switch(S.expr.$type){case"CallVariable":let T=S.expr;r.has(T.nom)||n("error","Variable not declared.",{node:T,property:"nom"});break;case"CallFunction":let y=S.expr;this.functionVariableMap.has(y.nom)?y.parameters.forEach($=>{this.checkCall($,r,n)}):n("error","Function not declared.",{node:y,property:"nom"});break}break}}};function xt(t,e){switch(t.$type){case"FunctionN":return t.accept(e);case"Instruction":return console.log("instruction"),t.accept(e);case"DirectionCommand":return console.log("direction"),t.accept(e);case"DistanceExpression":return console.log("distanceEXP"),t.accept(e);case"Distance":return console.log("distance"),t.accept(e);case"NumberType":return console.log("number"),t.accept(e);case"RotateCommand":return console.log("rotate"),t.accept(e);case"SpeedCommand":return console.log("speed"),t.accept(e);case"Time":return console.log("time"),t.accept(e);case"TimeExpression":return console.log("timeEXP"),t.accept(e);case"DistanceSensorCommand":return console.log("distSensor"),t.accept(e);case"TimeSensorCommand":return console.log("timeSensor"),t.accept(e);case"CallFunction":return console.log("callFunction"),t.accept(e);case"CallVariable":return console.log("callVariable"),t.accept(e);case"Affectation":return console.log("affectation"),t.accept(e);case"PrimaryExprBool":return console.log("primaryExprBool"),t.accept(e);case"PrimaryExprAri":return console.log("primaryExprAri"),t.accept(e);case"PrimaryExprDistance":return console.log("primaryExprDistance"),t.accept(e);case"MultDiv":return console.log("multDiv"),t.accept(e);case"PlusMinus":return console.log("plusMinus"),t.accept(e);case"MultDivDistance":return console.log("multDivDistance"),t.accept(e);case"PlusMinusDistance":return console.log("plusMinusDistance"),t.accept(e);case"MultDivTime":return console.log("multDivTime"),t.accept(e);case"PlusMinusTime":return console.log("plusMinusTime"),t.accept(e);case"Equals":return console.log("equals"),t.accept(e);case"Or":return console.log("or"),t.accept(e);case"And":return console.log("and"),t.accept(e);case"Not":return console.log("not"),t.accept(e);case"Block":return console.log("block"),t.accept(e);case"DeclarationVariable":return console.log("declarationVariable"),t.accept(e);case"IF":return console.log("if"),t.accept(e);case"LOOP":return console.log("loop"),t.accept(e);case"Parameter":return console.log("parameter"),t.accept(e);case"BooleanType":return console.log("booleanType"),t.accept(e);case"TypeClass":return console.log("typeClass"),t.accept(e);default:throw new Error(`Unknown node type ${t.$type}`)}}var jr=class t{static fromAngle(e,r){return new t(Math.cos(e)*r,Math.sin(e)*r)}static null(){return new t(0,0)}constructor(e,r){this.x=e,this.y=r}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}scale(e){return new t(this.x*e,this.y*e)}projX(){return new t(this.x,0)}projY(){return new t(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}distanceTo(e){let r=this.x-e.x,n=this.y-e.y;return Math.sqrt(r*r+n*n)}},Vd=class{constructor(e,r){this.origin=e,this.vector=r}intersect(e){let r=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),r=r.concat(o)}return this.findClosestIntersection(r)}findClosestIntersection(e){let r=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,r=i)}return e[r]}else return}getPoiFinder(){return(e,r)=>{let n=e.minus(r),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,c=n.x*s.y-s.x*n.y,l=a/o,u=-c/o;if(l>0&&l<1&&u>0)return e.plus(n.scale(-l))}}}};var Jc=class{constructor(e,r,n,i,o){this.type="Robot",this.pos=e,this.size=r,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){return[]}turn(e){this.rad+=e*Math.PI/180;let r=e/this.speed*250;this.scene.time+=r,this.scene.timestamps.push(new Fo(this.scene.time,this))}move(e){this.pos=this.pos.plus(jr.fromAngle(this.rad,e));let r=e/this.speed*250;this.scene.time+=r,this.scene.timestamps.push(new Fo(this.scene.time,this))}side(e){this.pos=this.pos.plus(jr.fromAngle(this.rad+Math.PI/2,e));let r=e/this.speed*250;this.scene.time+=r,this.scene.timestamps.push(new Fo(this.scene.time,this))}getRay(){return new Vd(this.pos,jr.fromAngle(this.rad,1e4).scale(-1))}},Fo=class extends Jc{constructor(e,r){super(r.pos.scale(1),r.size.scale(1),r.rad,r.speed,r.scene),this.rad=r.rad,this.time=e}};var Uo=class{constructor(e,r){this.type="Wall",this.pos=e,this.size=r}intersect(e){let r=e.getPoiFinder()(this.pos,this.size);return r?[r]:[]}};var Xd=class{constructor(e=new jr(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new Jc(this.size.scale(.5),new jr(250,250),0,30,this),this.entities.push(new Uo(jr.null(),this.size.projX())),this.entities.push(new Uo(jr.null(),this.size.projY())),this.entities.push(new Uo(this.size,this.size.projY())),this.entities.push(new Uo(this.size,this.size.projX())),this.timestamps.push(new Fo(0,this.robot))}};var Yd=class{constructor(e,r){this.scene=new Xd(new jr(e*10,r*10)),this.robot=this.scene.robot,this.variables=Array(),this.wait=!1,this.niveau=0,this.functions=Array()}visitRobot(e){let r;for(let n of e.functions)n.return?this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:xt(n.return,this)}):this.functions.push({name:n.name,func:n,parameters:n.parameters,returnType:void 0}),n.name==="main"&&(r=n);return xt(r,this),this.scene}visitInstruction(e){xt(e,this)}visitFunctionN(e){this.niveau++;for(let r of e.instruction)xt(r,this);if(e.returnType&&e.returnedValue)return xt(e.returnedValue,this)}visitExpressionBase(e){xt(e,this)}visitDistanceExpression(e){let r=xt(e.unit,this),n=xt(e.number,this);return r==="cm"&&(n=n*10),n}visitTimeExpression(e){return xt(e.number,this)}visitDistance(e){return e.typeD}visitTime(e){}visitDirectionCommand(e){if(e.operateur==="FORWARD"){let r=xt(e.distance,this);this.robot.move(r)}else e.operateur==="BACKWARD"?this.robot.move(-xt(e.distance,this)):e.operateur==="LEFT"?this.robot.side(-xt(e.distance,this)):e.operateur==="RIGHT"&&this.robot.side(xt(e.distance,this))}visitSpeedCommand(e){let r=xt(e.speed,this);this.robot.speed=r}visitDistanceSensorCommand(e){let r=this.robot.getRay().intersect(this.scene.entities);return r?this.robot.pos.minus(r).norm():-1}visitTimeSensorCommand(e){return this.scene.time}visitRotateCommand(e){this.robot.turn(e.angle)}visitCallVariable(e){var r;let n=e.nom,i=this.niveau,o;for(;i>=0;){if(this.variables[i].has(n)){o=(r=this.variables[i].get(n))===null||r===void 0?void 0:r.value;break}i--}return o}visitCallFunction(e){let r=e.nom,n=this.functions.find(i=>i.name===r);if(this.niveau++,n&&n.parameters&&n.parameters.length>0){let i=0;this.variables[this.niveau]=new Map;for(let o of n.parameters)this.variables[this.niveau].set(o.nom,{name:o.nom,type:xt(o.typeP,this),value:xt(e.parameters[i],this),niveau:this.niveau}),i++}n&&xt(n.func,this),n&&n.parameters&&n.parameters.length>0&&this.variables[this.niveau].clear(),this.niveau--}visitAffectation(e){let r=e.callvariable.nom,n=this.niveau;for(;n>=0;){if(this.variables[n].has(r)){let i=this.variables[n].get(r);i&&(i.value=xt(e.expressionbase,this));break}n--}}visitBooleanType(e){return e.value}visitNumberType(e){return e.value}visitPlusMinus(e){throw new Error("Method not implemented.")}visitMultDiv(e){throw new Error("Method not implemented.")}visitPlusMinusDistance(e){throw new Error("Method not implemented.")}visitMultDivDistance(e){throw new Error("Method not implemented.")}visitPlusMinusTime(e){throw new Error("Method not implemented.")}visitMultDivTime(e){throw new Error("Method not implemented.")}visitDeclarationVariable(e){this.variables[this.niveau].set(e.nom,{name:e.nom,type:xt(e.type,this),value:xt(e.expressionbase,this),niveau:this.niveau})}visitPrimaryExprAri(e){throw new Error("Method not implemented.")}visitPrimaryExprBool(e){throw new Error("Method not implemented.")}visitPrimaryExprDistance(e){throw new Error("Method not implemented.")}visitBlock(e){throw new Error("Method not implemented.")}visitIF(e){throw new Error("Method not implemented.")}visitLOOP(e){throw new Error("Method not implemented.")}visitAnd(e){throw new Error("Method not implemented.")}visitOr(e){throw new Error("Method not implemented.")}visitNot(e){throw new Error("Method not implemented.")}visitEquals(e){throw new Error("Method not implemented.")}visitParameter(e){}visitTypeClass(e){return e.typeT}};function mw(t,e,r){let n=new Yd(e,r);return t.accept(n)}var hw=(t=0)=>e=>`\x1B[${e+t}m`,yw=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,gw=(t=0)=>(e,r,n)=>`\x1B[${38+t};2;${e};${r};${n}m`,nt={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},ile=Object.keys(nt.modifier),kG=Object.keys(nt.color),EG=Object.keys(nt.bgColor),ole=[...kG,...EG];function $G(){let t=new Map;for(let[e,r]of Object.entries(nt)){for(let[n,i]of Object.entries(r))nt[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[n]=nt[n],t.set(i[0],i[1]);Object.defineProperty(nt,e,{value:r,enumerable:!1})}return Object.defineProperty(nt,"codes",{value:t,enumerable:!1}),nt.color.close="\x1B[39m",nt.bgColor.close="\x1B[49m",nt.color.ansi=hw(),nt.color.ansi256=yw(),nt.color.ansi16m=gw(),nt.bgColor.ansi=hw(10),nt.bgColor.ansi256=yw(10),nt.bgColor.ansi16m=gw(10),Object.defineProperties(nt,{rgbToAnsi256:{value(e,r,n){return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(e){let r=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!r)return[0,0,0];let[n]=r;n.length===3&&(n=[...n].map(o=>o+o).join(""));let i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:e=>nt.rgbToAnsi256(...nt.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let r,n,i;if(e>=232)r=((e-232)*10+8)/255,n=r,i=r;else{e-=16;let a=e%36;r=Math.floor(e/36)/5,n=Math.floor(a/6)/5,i=a%6/5}let o=Math.max(r,n,i)*2;if(o===0)return 30;let s=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(r));return o===2&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,r,n)=>nt.ansi256ToAnsi(nt.rgbToAnsi256(e,r,n)),enumerable:!1},hexToAnsi:{value:e=>nt.ansi256ToAnsi(nt.hexToAnsi256(e)),enumerable:!1}}),nt}var NG=$G(),bn=NG;var Jd=(()=>{if(navigator.userAgentData){let t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),Tw=Jd!==0&&{level:Jd,hasBasic:!0,has256:Jd>=2,has16m:Jd>=3},_G={stdout:Tw,stderr:Tw},vw=_G;function xw(t,e,r){let n=t.indexOf(e);if(n===-1)return t;let i=e.length,o=0,s="";do s+=t.slice(o,n)+e+r,o=n+i,n=t.indexOf(e,o);while(n!==-1);return s+=t.slice(o),s}function Rw(t,e,r,n){let i=0,o="";do{let s=t[n-1]==="\r";o+=t.slice(i,s?n-1:n)+e+(s?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return o+=t.slice(i),o}var{stdout:bw,stderr:Aw}=vw,Ly=Symbol("GENERATOR"),ba=Symbol("STYLER"),Qc=Symbol("IS_EMPTY"),Cw=["ansi","ansi","ansi256","ansi16m"],Aa=Object.create(null),PG=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=bw?bw.level:0;t.level=e.level===void 0?r:e.level};var IG=t=>{let e=(...r)=>r.join(" ");return PG(e,t),Object.setPrototypeOf(e,Zc.prototype),e};function Zc(t){return IG(t)}Object.setPrototypeOf(Zc.prototype,Function.prototype);for(let[t,e]of Object.entries(bn))Aa[t]={get(){let r=Qd(this,Fy(e.open,e.close,this[ba]),this[Qc]);return Object.defineProperty(this,t,{value:r}),r}};Aa.visible={get(){let t=Qd(this,this[ba],!0);return Object.defineProperty(this,"visible",{value:t}),t}};var My=(t,e,r,...n)=>t==="rgb"?e==="ansi16m"?bn[r].ansi16m(...n):e==="ansi256"?bn[r].ansi256(bn.rgbToAnsi256(...n)):bn[r].ansi(bn.rgbToAnsi(...n)):t==="hex"?My("rgb",e,r,...bn.hexToRgb(...n)):bn[r][t](...n),DG=["rgb","hex","ansi256"];for(let t of DG){Aa[t]={get(){let{level:r}=this;return function(...n){let i=Fy(My(t,Cw[r],"color",...n),bn.color.close,this[ba]);return Qd(this,i,this[Qc])}}};let e="bg"+t[0].toUpperCase()+t.slice(1);Aa[e]={get(){let{level:r}=this;return function(...n){let i=Fy(My(t,Cw[r],"bgColor",...n),bn.bgColor.close,this[ba]);return Qd(this,i,this[Qc])}}}}var OG=Object.defineProperties(()=>{},{...Aa,level:{enumerable:!0,get(){return this[Ly].level},set(t){this[Ly].level=t}}}),Fy=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Qd=(t,e,r)=>{let n=(...i)=>LG(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,OG),n[Ly]=t,n[ba]=e,n[Qc]=r,n},LG=(t,e)=>{if(t.level<=0||!e)return t[Qc]?"":e;let r=t[ba];if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.includes("\x1B"))for(;r!==void 0;)e=xw(e,r.close,r.open),r=r.parent;let o=e.indexOf(`
`);return o!==-1&&(e=Rw(e,i,n,o)),n+e+i};Object.defineProperties(Zc.prototype,Aa);var MG=Zc(),dle=Zc({level:Aw?Aw.level:0});var el=MG;async function FG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,mu.parse("memory://robot.document"));return await e.shared.workspace.DocumentBuilder.build([n],{validation:!0}),(r=n.parseResult)===null||r===void 0?void 0:r.value}async function UG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,mu.parse("memory://minilogo.document"));await e.shared.workspace.DocumentBuilder.build([n],{validation:!0});let i=((r=n.diagnostics)!==null&&r!==void 0?r:[]).filter(o=>o.severity===1);if(i.length>0){let o=i.map(s=>`line ${s.range.start.line+1}: ${s.message} [${n.textDocument.getText(s.range)}]`);throw console.error(el.red("There are validation errors:")),o.forEach(s=>console.error(el.red(s))),new Error(o.join(`
`))}return n}async function Sw(t){let e=t[0],r=t[1],n=t[2],i=tl(ko).Robot,o=await FG(e,i),s=mw(o,r,n);return Promise.resolve(s)}async function ww(t){let e=tl(ko).Robot,n=(await UG(t,e)).parseResult;if(n.lexerErrors.length===0&&n.parserErrors.length===0)return console.log(el.green("validated successfully")),[];{let i=[];if(n.lexerErrors.length>0){let o=n.lexerErrors.map(s=>`${s.line?"line "+s.line+1:""}: ${s.message}`);i=i.concat(o)}if(n.parserErrors.length>0){let o=n.parserErrors.map(s=>`${s.message}`);i=i.concat(o)}return console.log(el.red("Failed to parse and validate!")),i}}function kw(t){let e=t.validation.ValidationRegistry,r=t.validation.RoboMlAcceptWeaver;e.register(r.checks,r)}var Zd=class{constructor(){this.checks={Robot:this.weaveRobot,Instruction:this.weaveInstruction,FunctionN:this.weaveFunctionN,ExpressionBase:this.weaveExpressionBase,DistanceExpression:this.weaveDistanceExpression,TimeExpression:this.weaveTimeExpression,Distance:this.weaveDistance,Time:this.weaveTime,DirectionCommand:this.weaveDirectionCommand,SpeedCommand:this.weaveSpeedCommand,DistanceSensorCommand:this.weaveDistanceSensorCommand,TimeSensorCommand:this.weaveTimeSensorCommand,RotateCommand:this.weaveRotateCommand,CallVariable:this.weaveCallVariable,CallFunction:this.weaveCallFunction,Affectation:this.weaveAffectation,BooleanType:this.weaveBooleanType,NumberType:this.weaveNumberType,PlusMinus:this.weavePlusMinus,MultDiv:this.weaveMultDiv,PlusMinusDistance:this.weavePlusMinusDistance,MultDivDistance:this.weaveMultDivDistance,PlusMinusTime:this.weavePlusMinusTime,MultDivTime:this.weaveMultDivTime,DeclarationVariable:this.weaveDeclarationVariable,PrimaryExprAri:this.weavePrimaryExprAri,PrimaryExprBool:this.weavePrimaryExprBool,PrimaryExprDistance:this.weavePrimaryExprDistance,Block:this.weaveBlock,IF:this.weaveIF,LOOP:this.weaveLOOP,And:this.weaveAnd,Or:this.weaveOr,Not:this.weaveNot,Equals:this.weaveEquals}}weaveRobot(e,r){e.accept=n=>n.visitRobot(e)}weaveInstruction(e,r){e.accept=n=>n.visitInstruction(e)}weaveFunctionN(e,r){e.accept=n=>n.visitFunctionN(e)}weaveExpressionBase(e,r){e.accept=n=>n.visitExpressionBase(e)}weaveDistanceExpression(e,r){e.accept=n=>n.visitDistanceExpression(e)}weaveTimeExpression(e,r){e.accept=n=>n.visitTimeExpression(e)}weaveDistance(e,r){e.accept=n=>n.visitDistance(e)}weaveTime(e,r){e.accept=n=>n.visitTime(e)}weaveDirectionCommand(e,r){e.accept=n=>n.visitDirectionCommand(e)}weaveSpeedCommand(e,r){e.accept=n=>n.visitSpeedCommand(e)}weaveDistanceSensorCommand(e,r){e.accept=n=>n.visitDistanceSensorCommand(e)}weaveTimeSensorCommand(e,r){e.accept=n=>n.visitTimeSensorCommand(e)}weaveRotateCommand(e,r){e.accept=n=>n.visitRotateCommand(e)}weaveCallVariable(e,r){e.accept=n=>n.visitCallVariable(e)}weaveCallFunction(e,r){e.accept=n=>n.visitCallFunction(e)}weaveAffectation(e,r){e.accept=n=>n.visitAffectation(e)}weaveBooleanType(e,r){e.accept=n=>n.visitBooleanType(e)}weaveNumberType(e,r){e.accept=n=>n.visitNumberType(e)}weavePlusMinus(e,r){e.accept=n=>n.visitPlusMinus(e)}weaveMultDiv(e,r){e.accept=n=>n.visitMultDiv(e)}weavePlusMinusDistance(e,r){e.accept=n=>n.visitPlusMinusDistance(e)}weaveMultDivDistance(e,r){e.accept=n=>n.visitMultDivDistance(e)}weavePlusMinusTime(e,r){e.accept=n=>n.visitPlusMinusTime(e)}weaveMultDivTime(e,r){e.accept=n=>n.visitMultDivTime(e)}weaveDeclarationVariable(e,r){e.accept=n=>n.visitDeclarationVariable(e)}weavePrimaryExprAri(e,r){e.accept=n=>n.visitPrimaryExprAri(e)}weavePrimaryExprBool(e,r){e.accept=n=>n.visitPrimaryExprBool(e)}weavePrimaryExprDistance(e,r){e.accept=n=>n.visitPrimaryExprDistance(e)}weaveBlock(e,r){e.accept=n=>n.visitBlock(e)}weaveIF(e,r){e.accept=n=>n.visitIF(e)}weaveLOOP(e,r){e.accept=n=>n.visitLOOP(e)}weaveAnd(e,r){e.accept=n=>n.visitAnd(e)}weaveOr(e,r){e.accept=n=>n.visitOr(e)}weaveNot(e,r){e.accept=n=>n.visitNot(e)}weaveEquals(e,r){e.accept=n=>n.visitEquals(e)}};var Uy=class extends Ku{registerCommands(e){e("parseAndGenerate",r=>Sw(r[0])),e("parseAndValidate",r=>ww(r[0]))}},qG={validation:{RobotValidator:()=>new zd,RoboMlAcceptWeaver:()=>new Zd}};function tl(t){let e=ho(xc(t),fw),r=ho(vc({shared:e}),dw,qG);return e.lsp.ExecuteCommandHandler=new Uy,e.ServiceRegistry.register(r),pw(r),kw(r),{shared:e,Robot:r}}var GG=new Ca.BrowserMessageReader(self),jG=new Ca.BrowserMessageWriter(self),HG=(0,Ca.createConnection)(GG,jG),{shared:KG}=tl(Object.assign({connection:HG},ko));eR(KG);})();
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
