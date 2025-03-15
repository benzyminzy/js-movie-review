const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-ChDeRbRW.js","assets/lib-DKrVVXbx.js","assets/index-Br2g84HS.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const createHeader = ({ title, rate, onclick = () => {
} }) => {
  const header = document.createElement("header");
  header.innerHTML = /*html*/
  `
    <div class="background-container">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      <div class="top-bar">
        <h1 class="logo">
          <img src="./images/logo.png" alt="MovieList" />
        </h1>
      </div>
      <div class="top-rated-movie">
        <div class="rate">
          <img src="./images/star_empty.png" class="star" />
          <span class="rate-value">${rate}</span>
        </div>
        <div class="title">${title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
  `;
  header.querySelector("button.detail").addEventListener("click", onclick);
  return header;
};
const addTopBar = (header, component) => {
  const topBarContainer = header.querySelector(".top-bar");
  topBarContainer.appendChild(component);
};
const createSvgIcon = (svgString) => {
  return new DOMParser().parseFromString(svgString, "image/svg+xml").documentElement;
};
const searchIconTemplate = (width = 24, height = 24) => {
  return (
    /*html*/
    `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${width}" height="${height}">
    <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"></circle>
    <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
  </svg>
`
  );
};
const searchIcon = (width, height) => createSvgIcon(searchIconTemplate(width, height));
const createSearchBar = ({
  placeholder = "검색어를 입력하세요",
  onSubmit = () => {
  }
}) => {
  var _a, _b;
  const searchBar = document.createElement("div");
  searchBar.classList.add("search");
  searchBar.innerHTML = /*html*/
  `
    <form>
      <input type="text" placeholder="${placeholder}" />
      <button type="submit" class="search-button"></button>
    </form>
  `;
  (_a = searchBar.querySelector("form")) == null ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(event);
  });
  (_b = searchBar.querySelector(".search-button")) == null ? void 0 : _b.appendChild(searchIcon(16, 16));
  return searchBar;
};
const createFooter = () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = /*html*/
  `
    <p>&copy; 우아한테크코스 All Rights Reserved.</p>
    <p><img src="./images/woowacourse_logo.png" width="180" /></p>
  `;
  return footer;
};
class AbstractParamsManager {
  constructor(namespace) {
    __publicField(this, "namespace");
    this.namespace = namespace;
  }
  getNamespacedKey(key) {
    return `${this.namespace}_${key}`;
  }
  getParam(key) {
    const url = new URL(window.location.href);
    return url.searchParams.get(this.getNamespacedKey(key));
  }
  setParams(params) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      const namespacedKey = this.getNamespacedKey(key);
      if (value) {
        url.searchParams.set(namespacedKey, value);
      }
    });
    window.history.replaceState({}, "", url);
  }
}
class SearchParamsManager extends AbstractParamsManager {
  constructor() {
    super("search");
    __publicField(this, "PARAMS", {
      KEYWORD: "keyword"
    });
  }
  setKeyword(keyword) {
    this.setParams({
      [this.PARAMS.KEYWORD]: keyword
    });
  }
  getKeyword() {
    return this.getParam(this.PARAMS.KEYWORD);
  }
}
const searchParamsManager = new SearchParamsManager();
const createLayout = ({ onSearch }) => {
  const header = createHeader({ title: "인사이드 아웃2", rate: 9.5 });
  const searchBar = createSearchBar({
    onSubmit: (event) => {
      onSearch();
      if (event.target instanceof HTMLFormElement) {
        const input = event.target.querySelector("input");
        const query = input ? input.value : "";
        searchParamsManager.setKeyword(query);
      }
    }
  });
  addTopBar(header, searchBar);
  const content = document.createElement("div");
  content.classList.add("layout-content");
  const footer = createFooter();
  return [header, content, footer];
};
const updateLayoutContent = (page) => {
  const content = document.querySelector(".layout-content");
  content == null ? void 0 : content.replaceChildren();
  content == null ? void 0 : content.append(page);
};
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/js-movie-review/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const ROUTES = {
  "/": {
    path: "/",
    component: async () => {
      const module = await __vitePreload(() => import("./index-ChDeRbRW.js"), true ? __vite__mapDeps([0,1]) : void 0);
      return await module.popularMovies();
    }
  },
  "/search": {
    path: "/search",
    component: async () => {
      const module = await __vitePreload(() => import("./index-Br2g84HS.js"), true ? __vite__mapDeps([2,1]) : void 0);
      return await module.searchResults();
    }
  }
};
const matchRoute = async () => {
  const baseUrl = "";
  const pathname = window.location.pathname.replace(baseUrl, "");
  const route = Object.keys(ROUTES).find((route2) => route2 === pathname);
  return route ? await ROUTES[route].component() : await ROUTES["/"].component();
};
const navigate = async (path) => {
  const baseUrl = "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  window.history.pushState(null, "", `${baseUrl}${normalizedPath}`);
  return await matchRoute();
};
addEventListener("load", async () => {
  const app = document.querySelector("#app");
  const layout = createLayout({
    onSearch: async () => {
      const page2 = await navigate("/search");
      updateLayoutContent(page2);
    }
  });
  app.append(...layout);
  const page = await matchRoute();
  updateLayoutContent(page);
});
window.addEventListener("popstate", async () => {
  const page = await matchRoute();
  updateLayoutContent(page);
});
export {
  searchParamsManager as s
};
