import{a as x,S as h,i as w}from"./assets/vendor-b2578120.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();async function p(r,t){const n="https://pixabay.com/api/",a={key:"43152817-de47b6f1b37f4fad093212301",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15};return(await x.get(n,{params:a})).data}function y(r){return r.map(({webformatURL:t,largeImageURL:n,tags:a,likes:e,views:s,comments:i,downloads:L})=>`    
    <li class="retrieved-search-element">
      <a href="${n}"><img class="img-element" src="${t}" alt="${a}" loading="lazy"></a>
      <ul class="menu">
        <li class="menu-item">
          <h4 class="menu-item-text-bold">Likes</h4>
          <p class="menu-item-text">${e}</p>
        </li>
        <li class="menu-item">
          <h4 class="menu-item-text-bold">Views</h4>
          <p class="menu-item-text">${s}</p>
        </li>
        <li class="menu-item">
          <h4 class="menu-item-text-bold">Comments</h4>
          <p class="menu-item-text">${i}</p>
        </li>
        <li class="menu-item">
          <h4 class="menu-item-text-bold">Downloads</h4>
          <p class="menu-item-text">${L}</p>
        </li>
      </ul>
    </li>`).join("")}const o={form:document.querySelector(".search-form"),ul:document.querySelector(".flex-container"),load:document.querySelector(".loader"),btn:document.querySelector(".btn-load-more")};let u,l=1,g=0;const S=15;o.form.addEventListener("submit",v);o.btn.addEventListener("click",q);async function v(r){if(r.preventDefault(),u=r.target.query.value.trim(),u){try{l=1,o.ul.innerHTML="",b(),f();const t=await p(u,l);if(t.hits.length!==0){g=Math.ceil(t.totalHits/S);const n=y(t.hits);o.ul.insertAdjacentHTML("beforeend",n),new h(".flex-container a",{captionsData:"alt",captionDelay:250}).refresh()}else return c("Sorry, there are no images matching your search query. Please try again!"),d(),o.form.reset()}catch(t){c(`${t}`)}return d(),m(),o.form.reset()}else return c("Please enter the text"),o.form.reset()}async function q(){l+=1,f(),b();try{const r=await p(u,l),t=y(r.hits);o.ul.insertAdjacentHTML("beforeend",t),new h(".flex-container a",{captionsData:"alt",captionDelay:250}).refresh()}catch(r){c(`${r}`)}M(),d(),m(),$()}function c(r){return w.show({backgroundColor:"#ef4040",messageColor:"white",messageSize:"16px",position:"topRight",message:r,close:!1})}function $(){l>=g?(f(),c("We're sorry, but you've reached the end of search results.")):m()}function b(){o.load.classList.remove("hidden")}function d(){o.load.classList.add("hidden")}function m(){o.btn.classList.remove("hidden")}function f(){o.btn.classList.add("hidden")}function M(){const t=o.ul.querySelector(".retrieved-search-element").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
