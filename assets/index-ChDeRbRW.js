import { s as safeFetchWithPagination, c as createMovieListSection, u as updateMovieList, h as hiddenMovieListLoadButton } from "./lib-DKrVVXbx.js";
const MAX_PAGE = 500;
const fetchPopularMovies = async () => {
  return await safeFetchWithPagination({
    url: "/movie/popular?language=ko-KO"
  });
};
const handleLoadMore = async (fetchNextPage) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);
  if (data.page === MAX_PAGE) {
    hiddenMovieListLoadButton();
  }
};
const popularMovies = async () => {
  var _a;
  const response = await fetchPopularMovies();
  const movieList = createMovieListSection({
    movies: (_a = response == null ? void 0 : response.initialData) == null ? void 0 : _a.results,
    onLoadMore: () => handleLoadMore(response == null ? void 0 : response.fetchNextPage),
    title: "지금 인기 있는 영화"
  });
  return movieList;
};
export {
  popularMovies
};
