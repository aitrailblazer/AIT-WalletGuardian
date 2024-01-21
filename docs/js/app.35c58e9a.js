(function(){"use strict";var e={8715:function(e,n,t){var r=t(4559),o=t(9563),s=t(6685);const a={id:"app"},i=(0,o._)("h1",null,"AIT-WalletGuardian",-1),c=["disabled"],l={key:0,class:"error-message"},u={key:1},d=(0,o._)("h2",null,"Request Options:",-1),h={key:2},p=(0,o._)("h2",null,"Create User Response:",-1),f={key:3},y=(0,o._)("h2",null,"Session Token:",-1),g={key:4},x=(0,o._)("h2",null,"User Token:",-1);function k(e,n,t,k,w,T){return(0,o.wg)(),(0,o.iD)("div",a,[i,(0,o.wy)((0,o._)("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=e=>w.userId=e),placeholder:"Enter User ID"},null,512),[[r.nr,w.userId]]),(0,o._)("button",{onClick:n[1]||(n[1]=(...e)=>T.createUser&&T.createUser(...e)),disabled:!w.userId},"Create New User",8,c),w.createUserError?((0,o.wg)(),(0,o.iD)("div",l,(0,s.zw)(w.createUserError),1)):(0,o.kq)("",!0),w.requestOptions?((0,o.wg)(),(0,o.iD)("div",u,[d,(0,o._)("pre",null,(0,s.zw)(w.requestOptions),1)])):(0,o.kq)("",!0),w.createUserResponse?((0,o.wg)(),(0,o.iD)("div",h,[p,(0,o._)("pre",null,(0,s.zw)(w.createUserResponse),1)])):(0,o.kq)("",!0),w.sessionToken?((0,o.wg)(),(0,o.iD)("div",f,[y,(0,o._)("p",null,(0,s.zw)(w.sessionToken),1)])):(0,o.kq)("",!0),w.userToken?((0,o.wg)(),(0,o.iD)("div",g,[x,(0,o._)("p",null,(0,s.zw)(w.userToken),1)])):(0,o.kq)("",!0)])}var w=t(7725),T={name:"UserWallet",data(){return{sessionToken:null,userToken:null,encryptionKey:null,requestOptions:"",createUserResponse:null,userId:"",createUserError:null,challengeId:null}},methods:{generateIdempotencyKey(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var n=16*Math.random()|0,t="x"==e?n:3&n|8;return t.toString(16)}))},async handleUserCreation(){const e="https://api.circle.com/v1/w3s/users/token",n={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer TEST_API_KEY:7538a24acae72825c362a99c0ca519ee:8875b63049320faa7ed7f3d24f460de7"},body:JSON.stringify({userId:this.userId})};this.requestOptions=e+": "+JSON.stringify(n,null,2);try{const t=await fetch(e,n),r=await t.json();this.sessionToken=r,console.log("Session Token:",r),this.userToken=r.data.userToken,this.encryptionKey=r.data.encryptionKey,await this.initializeUserAccount()}catch(t){console.error("Error:",t)}},async initializeUserAccount(){const e=this.generateIdempotencyKey();console.log("this.userToken:",this.userToken);const n="https://api.circle.com/v1/w3s/user/initialize",t={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer TEST_API_KEY:7538a24acae72825c362a99c0ca519ee:8875b63049320faa7ed7f3d24f460de7","X-User-Token":this.userToken},body:JSON.stringify({blockchains:["ETH-GOERLI"],idempotencyKey:e})};this.requestOptions=n+": "+JSON.stringify(t,null,2),console.log("Request Options:",JSON.stringify(t,null,2));try{const e=await fetch(n,t),r=await e.json();console.log(r),r&&r.data&&r.data.challengeId&&(this.challengeId=r.data.challengeId,console.log("Challenge ID:",this.challengeId),await this.executeChallenge())}catch(r){console.error("Error:",r)}},async createUser(){const e="https://api.circle.com/v1/w3s/users";this.createUserError="";const n={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer TEST_API_KEY:7538a24acae72825c362a99c0ca519ee:8875b63049320faa7ed7f3d24f460de7"},body:JSON.stringify({userId:this.userId})};this.requestOptions=e+": "+JSON.stringify(n,null,2);try{const t=await fetch(e,n),r=await t.json();t.ok?(console.log("Create User Response:",r),this.createUserResponse=r,await this.handleUserCreation()):155101===r.code?this.createUserError="A user with this ID already exists. Please use a different ID.":this.createUserError=`Error: ${r.message}`}catch(t){console.error("Network or other error:",t)}},async executeChallenge(){const e=new w.n;e.setAppSettings({appId:"21724116-74ad-562e-b75e-55d85528e064"}),e.setAuthentication({userToken:this.userToken,encryptionKey:this.encryptionKey}),e.execute(this.challengeId,((e,n)=>{e?console.error(`${e?.code?.toString()||"Unknown code"}: ${e?.message??"Error!"}`):(console.log(`Challenge: ${n.type}`),console.log(`status: ${n.status}`),n.data&&console.log(`signature: ${n.data?.signature}`))}))}}},v=t(6100);const O=(0,v.Z)(T,[["render",k]]);var I=O;(0,r.ri)(I).mount("#app")}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var s=n[r]={exports:{}};return e[r].call(s.exports,s,s.exports,t),s.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,s){if(!r){var a=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],s=e[u][2];for(var i=!0,c=0;c<r.length;c++)(!1&s||a>=s)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(i=!1,s<a&&(a=s));if(i){e.splice(u--,1);var l=o();void 0!==l&&(n=l)}}return n}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[r,o,s]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,s,a=r[0],i=r[1],c=r[2],l=0;if(a.some((function(n){return 0!==e[n]}))){for(o in i)t.o(i,o)&&(t.m[o]=i[o]);if(c)var u=c(t)}for(n&&n(r);l<a.length;l++)s=a[l],t.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return t.O(u)},r=self["webpackChunkait_walletguardian"]=self["webpackChunkait_walletguardian"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(8715)}));r=t.O(r)})();
//# sourceMappingURL=app.35c58e9a.js.map