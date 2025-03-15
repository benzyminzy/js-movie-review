var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
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
const createMovieLayout = (title) => {
  const layoutContainer = document.createElement("main");
  const layoutSection = document.createElement("section");
  const layoutTitle = document.createElement("h2");
  layoutTitle.textContent = title;
  layoutSection.appendChild(layoutTitle);
  layoutContainer.appendChild(layoutSection);
  return layoutContainer;
};
const createMovieContainer = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  return container;
};
const createEmptyMovieList = (message) => {
  const emptyMovieList = document.createElement("div");
  emptyMovieList.classList.add("empty-movie-list");
  emptyMovieList.innerHTML = /*html*/
  `
    <p>${message}</p>
  `;
  return emptyMovieList;
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
const createFallbackView = (message = "데이터를 불러오지 못했습니다. 다시 시도해 주세요.") => {
  const fallback = createFallbackContainer();
  const fallbackMessage = createFallbackMessage(message);
  fallback.append(fallbackMessage);
  return fallback;
};
const hiddenFallbackView = () => {
  const fallback = document.querySelector(".fallback");
  fallback == null ? void 0 : fallback.remove();
};
const updateMovieList = (movies) => {
  const movieList = document.querySelector(".thumbnail-list");
  movies.forEach((movie) => {
    movieList.appendChild(createMovieListItem(movie));
  });
};
const onClickLoadButton = async (onLoadMore) => {
  const movieList = document.querySelector(".thumbnail-list");
  hiddenFallbackView();
  try {
    const skeletonMovieListItem = createSkeletonMovieList();
    movieList.append(...skeletonMovieListItem);
    await onLoadMore();
  } catch (error) {
    const fallback = createFallbackView();
    movieList.parentNode.insertBefore(fallback, movieList.nextSibling);
  } finally {
    hiddenSkeletonMovieListItem();
  }
};
const createMovieListSection = ({
  movies = [],
  showLoadButton = true,
  onLoadMore,
  title = "",
  showEmptyMovieList = false,
  emptyMovieListMessage = "검색 결과가 없습니다 🥲"
}) => {
  const container = createMovieContainer();
  const layout = createMovieLayout(title);
  const movieList = createMovieList(movies);
  const emptyMovieList = createEmptyMovieList(emptyMovieListMessage);
  const loadButton = showLoadButton ? createMovieListLoadButton(() => onClickLoadButton(onLoadMore)) : null;
  container.appendChild(layout);
  layout.appendChild(showEmptyMovieList ? emptyMovieList : movieList);
  if (loadButton) layout.appendChild(loadButton);
  return container;
};
class CustomFetchError extends Error {
  constructor(errorMessage, status) {
    super(errorMessage);
    __publicField(this, "status");
    this.status = status;
  }
}
const defaultHeaders = {
  Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODFlMzdjMzM1ZmY3Y2NiNmRhODVjYTNjN2JkMmM4YSIsIm5iZiI6MTc0MDkxMTk4NS40NTUwMDAyLCJzdWIiOiI2N2M0MzU3MTNkZTdjOWM4NzU0YjEzYWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yXzRpxn27huI8evmmov6jq0TQOXOAcDxa4nScQ2pVyI"}`,
  "Content-Type": "application/json"
};
const fetchApi = async ({
  url,
  headers = defaultHeaders
}) => {
  try {
    const response = await fetch(
      `${"https://api.themoviedb.org/3"}${url}`,
      { headers }
    );
    if (!response.ok) {
      throw new CustomFetchError(response.statusText, response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CustomFetchError) {
      throw error;
    }
    throw new CustomFetchError("알 수 없는 오류가 발생했습니다.", 500);
  }
};
const fetchApiWithPagination = async ({
  url,
  headers,
  options = { defaultPage: 1, fn: fetchApi }
}) => {
  let currentPage = options.defaultPage;
  const fetchNextPage = async () => {
    const response = await options.fn({
      url: `${url}&page=${currentPage}`,
      headers
    });
    currentPage += 1;
    return { data: response };
  };
  const { data: initialData } = await fetchNextPage();
  return {
    initialData,
    fetchNextPage
  };
};
const withErrorHandling = async (fn) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
    alert("알 수 없는 오류가 발생했습니다.");
    throw error;
  }
};
const safeFetch = async ({ url, headers }) => {
  return withErrorHandling(() => fetchApi({ url, headers }));
};
const safeFetchWithPagination = ({
  options = { defaultPage: 1, fn: safeFetch },
  ...rest
}) => {
  return fetchApiWithPagination({ options, ...rest });
};
export {
  createMovieListSection as c,
  hiddenMovieListLoadButton as h,
  safeFetchWithPagination as s,
  updateMovieList as u
};
