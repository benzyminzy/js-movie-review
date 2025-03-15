import { s as safeFetchWithPagination, c as createMovieListSection, u as updateMovieList, h as hiddenMovieListLoadButton } from "./lib-DKrVVXbx.js";
import { s as searchParamsManager } from "./index-DDRmx-kW.js";
const fetchSearchMovies = async ({ query = "" }) => {
  return await safeFetchWithPagination({
    url: `/search/movie?language=ko-KO&query=${query}`
  });
};
const handleLoadMore = async (fetchNextPage) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);
  if (data.page === data.total_pages) {
    hiddenMovieListLoadButton();
  }
};
const searchResults = async () => {
  var _a, _b, _c, _d;
  const query = searchParamsManager.getKeyword() ?? "";
  const response = await fetchSearchMovies({ query });
  const movieList = createMovieListSection({
    movies: (_a = response == null ? void 0 : response.initialData) == null ? void 0 : _a.results,
    showLoadButton: ((_b = response == null ? void 0 : response.initialData) == null ? void 0 : _b.page) !== ((_c = response == null ? void 0 : response.initialData) == null ? void 0 : _c.total_pages),
    onLoadMore: () => handleLoadMore(response == null ? void 0 : response.fetchNextPage),
    title: `"${query}" 검색 결과`,
    showEmptyMovieList: response && ((_d = response == null ? void 0 : response.initialData) == null ? void 0 : _d.results.length) === 0
  });
  return movieList;
};
export {
  searchResults
};
