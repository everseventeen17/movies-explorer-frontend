import { useEffect,useState} from "react";

export function filterMoviesByName(movies, searchInputValue) {
  const normalizeSearchQuery = searchInputValue.toLowerCase().trim();
  const result = movies.filter((movie) => {
    const normalizeNameRu = movie.nameRU.toLowerCase().trim();
    const normalizeNameEn = movie.nameEN.toLowerCase().trim();
    return (
      normalizeNameRu.includes(normalizeSearchQuery) || normalizeNameEn.includes(normalizeSearchQuery)
    );
  });

  return result;
}

export function filterMoviesByDuration(movies) {
  return movies.filter((item) => {
    return item.duration <= 40
  })
}


export function useWindowSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth
  });

  useEffect(() => {
    let timeout = null;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSize({
          width: document.documentElement.clientWidth
        });
      }, 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return size;
}

