if(!self.define){let o,e={};const r=(r,s)=>(r=new URL(r+".js",s).href,e[r]||new Promise((e=>{if("document"in self){const o=document.createElement("script");o.src=r,o.onload=e,document.head.appendChild(o)}else o=r,importScripts(r),e()})).then((()=>{let o=e[r];if(!o)throw new Error(`Module ${r} didn’t register its module`);return o})));self.define=(s,i)=>{const n=o||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const c=o=>r(o,n),d={module:{uri:n},exports:u,require:c};e[n]=Promise.all(s.map((o=>d[o]||c(o)))).then((o=>(i(...o),u)))}}define(["./workbox-2d118ab0"],(function(o){"use strict";o.setCacheNameDetails({prefix:"pomodoro-ketchup"}),self.addEventListener("message",(o=>{o.data&&"SKIP_WAITING"===o.data.type&&self.skipWaiting()})),o.precacheAndRoute([{url:"/pomodoro-ketchup/css/app.bfe62bcc.css",revision:null},{url:"/pomodoro-ketchup/index.html",revision:"e226305fdd9adac2d03a30f9d12d596c"},{url:"/pomodoro-ketchup/js/app.5304b374.js",revision:null},{url:"/pomodoro-ketchup/js/chunk-vendors.7df3eb72.js",revision:null},{url:"/pomodoro-ketchup/manifest.json",revision:"eb9bdaaa81a155c455425e4f5794f174"},{url:"/pomodoro-ketchup/media/sound1.92656ee5.mp3",revision:null},{url:"/pomodoro-ketchup/media/sound2.5c23194c.mp3",revision:null},{url:"/pomodoro-ketchup/media/sound3.4eb18057.mp3",revision:null},{url:"/pomodoro-ketchup/media/sound4.71bcc836.mp3",revision:null},{url:"/pomodoro-ketchup/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
