var C=Object.defineProperty;var D=(s,e,o)=>e in s?C(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var v=(s,e,o)=>(D(s,typeof e!="symbol"?e+"":e,o),o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();class B{constructor(e){v(this,"log",[]);this.board=e,this.movesCounter=0}findItem(e=0){for(let o=0;o<this.board.length;o++)for(let r=0;r<this.board.length;r++)if(this.board[o][r]===e)return[o,r]}randomize(e){this.movesCounter=0,this.board=[];for(let r=0;r<e;r++){const t=[];for(let n=0;n<e;n++){const a=e*r+n+1;t.push(a===e*e?0:a)}this.board.push(t)}let o=0;for(let r=0;r<1e3;r++){let t=Math.floor(Math.random()*4),n=!1;switch(t){case 0:n=this.up();break;case 1:n=this.left();break;case 2:n=this.down();break;case 3:n=this.right()}if(n&&o++,o===10)return}}up(){const e=this.findItem();return e[0]>0?(this.applyMove({from:e,to:[e[0]-1,e[1]]}),!0):!1}down(){const e=this.findItem();return e[0]<this.board.length-1?(this.applyMove({from:e,to:[e[0]+1,e[1]]}),!0):!1}right(){const e=this.findItem();return e[1]<this.board.length-1?(this.applyMove({from:e,to:[e[0],e[1]+1]}),!0):!1}left(){const e=this.findItem();return e[1]>0?(this.applyMove({from:e,to:[e[0],e[1]-1]}),!0):!1}rollback(){if(this.log.length===0)return null;let e=this.log.pop();const o=this.board[e.to[0]][e.to[1]];let r={from:e.to,to:e.from};return this.applyMove(r),this.movesCounter++,{item:o,movesCount:this.log.length,direction:this.calculateDirection(r.from,r.to)}}isFinished(){const e=this.board.flat();for(let o=0;o<e.length-1;o++)if(o+1!==e[o])return!1;return!0}applyMove(e){const o=e.from[0],r=e.from[1],t=e.to[0],n=e.to[1];let a=this.board[t][n];this.board[t][n]=this.board[o][r],this.board[o][r]=a}calculateDirection(e,o){if(e[0]<o[0])return"down";if(e[0]>o[0])return"up";if(e[1]<o[1])return"right";if(e[1]>o[1])return"left"}move(e){if(this.isFinished())return null;const o=this.findItem(e),r=o[0],t=o[1],n=this.board[r][t];let a={from:[r,t],to:[]};const h=this.board[r][t-1],p=this.board[r][t+1],b=r>0?this.board[r-1][t]:void 0,g=r<this.board.length-1?this.board[r+1][t]:void 0;return h===0&&(a.to=[r,t-1]),p===0&&(a.to=[r,t+1]),b===0&&(a.to=[r-1,t]),g===0&&(a.to=[r+1,t]),b!==0&&g!==0&&p!==0&&h!==0?null:(this.applyMove(a),this.log.push(a),this.movesCounter++,{card:n,finished:this.isFinished(),direction:this.calculateDirection(a.from,a.to)})}}const E={apiKey:"AIzaSyBf87YKzUCb2LJhxV1_SZKFtF9YvKV5YAg",authDomain:"slider-game-database.firebaseapp.com",databaseURL:"https://slider-game-database-default-rtdb.firebaseio.com",projectId:"slider-game-database",storageBucket:"slider-game-database.appspot.com",messagingSenderId:"99994989759",appId:"1:99994989759:web:acb79d25a1d12fefea420a"};firebase.initializeApp(E);const M=firebase.database().ref("usersData"),k=s=>{M.push().set(s)},$=()=>new Promise((s,e)=>{const o=[];firebase.database().ref("usersData").once("value").then(function(t){const n=t.val();for(const a in n)o.push({name:n[a].name,time:n[a].time});s(o)}).catch(t=>{e(t)})}),T=s=>{const e=document.querySelector("#tbody");e.innerHTML="";for(let o=0;o<7&&o<s.length;o++){const r=s[o],t=e.insertRow();t.insertCell(0).textContent=o+1,t.insertCell(1).textContent=r.name,t.insertCell(2).textContent=r.time}},S=()=>{$().then(s=>{const e=s.sort((o,r)=>{const t=y(o.time),n=y(r.time);return t-n});T(e)}).catch(s=>{console.error("Error getting users list:",s)})},y=s=>{const[e,o]=s.split(":").map(Number);return e*60+o},w=document.getElementById("start-game-button"),u=document.getElementById("game-board"),F=document.getElementById("undo-button"),m=document.getElementById("moves-counter"),A=document.querySelectorAll(".js-board-size"),f=document.getElementById("win-dialog"),q=document.getElementById("user-name-form"),I=document.getElementById("user-name-input"),x=document.getElementById("cancel-button"),H=document.getElementById("show-leaderboard"),O=document.getElementById("leaderboard"),c=new B([]),i={};let l=4;A.forEach(s=>{s.addEventListener("change",()=>{s.checked===!0&&(l=s.value)})});const d={name:null,time:null,moves:null},K=s=>{document.querySelector(".timer").textContent=s.time};let L;const N=(s=!1)=>{let e=s?new Date:new Date;const o=()=>{const t=Math.floor((new Date-e)/1e3);d.time=`${Math.floor(t/60)}:${t%60<10?"0":""}${t%60}`,K(d)};clearInterval(L),L=setInterval(o,1e3)};w.addEventListener("click",()=>{N(!0),c.randomize(l),m.innerHTML=c.movesCounter;const s=c.board.flat(),e=`cell-${l}x${l}`;let o=[];w.innerHTML="Заново",s.forEach(r=>{let t=r===0?"":`<img data-item="${r}" src="photo/${l}/${r}.jpg" alt="">`;o.push(`<div class="cell ${e}"><div class="image-wrapper">`+t+"</div></div>"),i[r]=[0,0]}),u.innerHTML=o.join(""),u.querySelectorAll("img").forEach(r=>{r.addEventListener("click",()=>{const t=parseInt(r.dataset.item),n=c.move(t);if(console.log(n),n.finished&&setTimeout(()=>{f.showModal()},700),n!==null){switch(n.direction){case"left":i[t][0]-=100;break;case"right":i[t][0]+=100;break;case"up":i[t][1]-=100;break;case"down":i[t][1]+=100;break}r.style.transform=`translate(${i[t][0]}%,${i[t][1]}%)`,m.innerHTML=c.movesCounter}})})});F.addEventListener("click",()=>{const s=c.rollback();if(s===null)return;const e=s.item;switch(s.direction){case"left":i[e][0]-=100;break;case"right":i[e][0]+=100;break;case"up":i[e][1]-=100;break;case"down":i[e][1]+=100;break}const o=u.querySelector(`[data-item="${e}"]`);o.style.transform=`translate(${i[e][0]}%,${i[e][1]}%)`,m.innerHTML=c.movesCounter});q.addEventListener("submit",s=>{s.preventDefault(),d.name=I.value??"Аноним",k(d),f.close(),I.value=""});x.addEventListener("click",()=>{f.close()});H.addEventListener("click",()=>{S(),O.style.opacity="1"});
