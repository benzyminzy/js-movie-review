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
const createHeader = () => {
  const header = document.createElement("header");
  header.innerHTML = /*html*/
  `
    <div class="background-container">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      <h1 class="logo">
        <img src="./images/logo.png" alt="MovieList" />
      </h1>
      <div class="top-rated-movie">
        <div class="rate">
          <img src="./images/star_empty.png" class="star" />
          <span class="rate-value">9.5</span>
        </div>
        <div class="title">인사이드 아웃2</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
  `;
  return header;
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
const createMovieListItem = (movie) => {
  const movieListItem = document.createElement("li");
  movieListItem.classList.add("item");
  movieListItem.innerHTML = /*html*/
  `
    <img
    class="thumbnail"
    src="${"https://media.themoviedb.org/t/p/w440_and_h660_face"}/${movie.poster_path}"
    alt="${movie.title}"
    />
    <div class="item-desc">
      <p class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span>${movie.vote_average.toFixed(1)}</span>
      </p>
      <strong class="item-title">${movie.title}</strong>
    </div>
  `;
  return movieListItem;
};
const createMovieList = (movies) => {
  const movieList = document.createElement("ul");
  movieList.classList.add("thumbnail-list");
  movies.forEach((movie) => {
    movieList.appendChild(createMovieListItem(movie));
  });
  return movieList;
};
const createMovieListLoadButton = (onClick) => {
  const button = document.createElement("button");
  button.classList.add("load-button");
  button.textContent = "더보기";
  button.addEventListener("click", onClick);
  return button;
};
const hiddenMovieListLoadButton = () => {
  const loadButton = document.querySelector(".load-button");
  if (loadButton) loadButton.style.display = "none";
};
const createMovieLayout = () => {
  const layoutContainer = document.createElement("main");
  const layoutSection = document.createElement("section");
  const layoutTitle = document.createElement("h2");
  layoutTitle.textContent = "지금 인기 있는 영화";
  layoutSection.appendChild(layoutTitle);
  layoutContainer.appendChild(layoutSection);
  return layoutContainer;
};
const createMovieContainer = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  return container;
};
const createSkeletonMovieListItem = () => {
  const movieListItem = document.createElement("li");
  movieListItem.classList.add("item", "skeleton");
  movieListItem.innerHTML = /*html*/
  `
    <div class="thumbnail"></div>
    <div>
      <div class="rate"></div>
      <div class="title"></div>
    </div>
  `;
  return movieListItem;
};
const createSkeletonMovieList = (length = 20) => {
  return Array.from({ length }, () => createSkeletonMovieListItem());
};
const hiddenSkeletonMovieListItem = () => {
  const movieListItem = document.querySelectorAll(".skeleton");
  if (movieListItem) movieListItem.forEach((item) => item.remove());
};
const createSvgIcon = (svgString) => {
  return new DOMParser().parseFromString(svgString, "image/svg+xml").documentElement;
};
const createRefreshIcon = (width = 24, height = 24) => {
  const refreshIcon = (
    /*html*/
    `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="${width}"
      height="${height}"
      viewBox="0 0 256 256"
      xml:space="preserve"
      > 
        <defs></defs>
        <g
          style="stroke: none; stroke-widdth: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
        <path
          d="M 81.521 31.109 c -0.86 -1.73 -2.959 -2.438 -4.692 -1.575 c -1.73 0.86 -2.436 2.961 -1.575 4.692 c 2.329 4.685 3.51 9.734 3.51 15.01 C 78.764 67.854 63.617 83 45 83 S 11.236 67.854 11.236 49.236 c 0 -16.222 11.501 -29.805 26.776 -33.033 l -3.129 4.739 c -1.065 1.613 -0.62 3.784 0.992 4.85 c 0.594 0.392 1.264 0.579 1.926 0.579 c 1.136 0 2.251 -0.553 2.924 -1.571 l 7.176 -10.87 c 0.001 -0.001 0.001 -0.002 0.002 -0.003 l 0.018 -0.027 c 0.063 -0.096 0.106 -0.199 0.159 -0.299 c 0.049 -0.093 0.108 -0.181 0.149 -0.279 c 0.087 -0.207 0.152 -0.419 0.197 -0.634 c 0.009 -0.041 0.008 -0.085 0.015 -0.126 c 0.031 -0.182 0.053 -0.364 0.055 -0.547 c 0 -0.014 0.004 -0.028 0.004 -0.042 c 0 -0.066 -0.016 -0.128 -0.019 -0.193 c -0.008 -0.145 -0.018 -0.288 -0.043 -0.431 c -0.018 -0.097 -0.045 -0.189 -0.071 -0.283 c -0.032 -0.118 -0.065 -0.236 -0.109 -0.35 c -0.037 -0.095 -0.081 -0.185 -0.125 -0.276 c -0.052 -0.107 -0.107 -0.211 -0.17 -0.313 c -0.054 -0.087 -0.114 -0.168 -0.175 -0.25 c -0.07 -0.093 -0.143 -0.183 -0.223 -0.27 c -0.074 -0.08 -0.153 -0.155 -0.234 -0.228 c -0.047 -0.042 -0.085 -0.092 -0.135 -0.132 L 36.679 0.775 c -1.503 -1.213 -3.708 -0.977 -4.921 0.53 c -1.213 1.505 -0.976 3.709 0.53 4.921 l 3.972 3.2 C 17.97 13.438 4.236 29.759 4.236 49.236 C 4.236 71.714 22.522 90 45 90 s 40.764 -18.286 40.764 -40.764 C 85.764 42.87 84.337 36.772 81.521 31.109 z"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        </g>
    </svg>
  `
  );
  return createSvgIcon(refreshIcon);
};
const createFallbackButton = (onRetry) => {
  const fallbackButton = document.createElement("button");
  fallbackButton.classList.add("fallback-button");
  const refreshIcon = createRefreshIcon(40, 40);
  fallbackButton.appendChild(refreshIcon);
  fallbackButton.addEventListener("click", onRetry);
  return fallbackButton;
};
const createFallbackMessage = (message) => {
  const fallbackMessage = document.createElement("p");
  fallbackMessage.classList.add("fallback-message");
  fallbackMessage.textContent = message;
  return fallbackMessage;
};
const createFallbackContainer = () => {
  const fallbackContainer = document.createElement("div");
  fallbackContainer.classList.add("fallback");
  return fallbackContainer;
};
const createFallback = ({
  onRetry,
  message = "데이터를 불러오는데 실패했습니다."
}) => {
  const fallback = createFallbackContainer();
  const fallbackButton = createFallbackButton(onRetry);
  const fallbackMessage = createFallbackMessage(message);
  fallback.append(fallbackButton, fallbackMessage);
  return fallback;
};
const createFallbackView = ({ onRetry, message }) => {
  const existingFallback = document.querySelector(".fallback");
  if (existingFallback) {
    existingFallback.remove();
  }
  const fallback = createFallback({ onRetry, message });
  return fallback;
};
const updateMovieList = (movies) => {
  const movieList = document.querySelector(".thumbnail-list");
  movies.forEach((movie) => {
    movieList.appendChild(createMovieListItem(movie));
  });
};
const onClickLoadButton = async (onLoadMore) => {
  const movieList = document.querySelector(".thumbnail-list");
  try {
    const skeletonMovieListItem = createSkeletonMovieList();
    movieList.append(...skeletonMovieListItem);
    await onLoadMore();
  } catch (error) {
    const fallback = createFallbackView({
      onRetry: () => onClickLoadButton(onLoadMore)
    });
    movieList.parentNode.insertBefore(fallback, movieList.nextSibling);
  } finally {
    hiddenSkeletonMovieListItem();
  }
};
const createMovieListSection = ({ movies = [], onLoadMore }) => {
  const container = createMovieContainer();
  const layout = createMovieLayout();
  const movieList = createMovieList(movies);
  const loadButton = createMovieListLoadButton(
    () => onClickLoadButton(onLoadMore)
  );
  container.appendChild(layout);
  layout.appendChild(movieList);
  layout.appendChild(loadButton);
  return container;
};
class CustomFetchError extends Error {
  constructor(errorMessage, status) {
    super("데이터를 불러오는데 실패했습니다.");
    this.errorMessage = errorMessage;
    this.status = status;
  }
}
const defaultHeaders = {
  Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODFlMzdjMzM1ZmY3Y2NiNmRhODVjYTNjN2JkMmM4YSIsIm5iZiI6MTc0MDkxMTk4NS40NTUwMDAyLCJzdWIiOiI2N2M0MzU3MTNkZTdjOWM4NzU0YjEzYWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yXzRpxn27huI8evmmov6jq0TQOXOAcDxa4nScQ2pVyI"}`,
  "Content-Type": "application/json"
};
const fetchApi = async (url, headers = defaultHeaders) => {
  try {
    const response = await fetch(
      `${"https://api.themoviedb.org/3"}${url}`,
      { headers }
    );
    const data = await response.json();
    return data;
  } catch ({ message, status }) {
    throw new CustomFetchError(message, status);
  }
};
const fetchApiWithPagination = async (url, {
  headers = defaultHeaders,
  defaultPage = 1,
  getItems = (response) => response
} = {}) => {
  let currentPage = defaultPage;
  let totalItems = [];
  const fetchNextPage = async () => {
    const response = await fetchApi(`${url}&page=${currentPage}`, headers);
    currentPage += 1;
    const newItems = getItems(response);
    totalItems = [...totalItems, ...newItems];
    return { data: response, totalItems };
  };
  const { data: initialData } = await fetchNextPage();
  return {
    initialData,
    fetchNextPage
  };
};
const MAX_PAGE = 500;
const fetchPopularMovies = async () => {
  try {
    return await fetchApiWithPagination("/movie/popular?language=ko-KO", {
      getItems: (response) => response.results
    });
  } catch (error) {
    return null;
  }
};
const handleLoadMore = async (fetchNextPage) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);
  if (data.page === MAX_PAGE) {
    hiddenMovieListLoadButton();
  }
};
addEventListener("load", async () => {
  var _a;
  const app = document.querySelector("#app");
  const header = createHeader();
  const footer = createFooter();
  const response = await fetchPopularMovies();
  const movieList = createMovieListSection({
    movies: (_a = response == null ? void 0 : response.initialData) == null ? void 0 : _a.results,
    onLoadMore: () => handleLoadMore(response == null ? void 0 : response.fetchNextPage)
  });
  app.append(header, movieList, footer);
});
