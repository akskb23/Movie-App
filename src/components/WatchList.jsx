import { useEffect, useState, useContext } from "react";
import genreids from "../constants/genreIds";
import { WatchListContext } from "../context/WatchListContext";


const WatchList = () => {

  const { watchList, setWatchList, removeFromWatchList } = useContext(WatchListContext);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres", "Action", "Comedy"]);
  const [currGenre, setCurrGenre] = useState("All Genres")


  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  }

  useEffect(() => {
    const moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"));
    if (moviesFromLocalStorage) {
      setWatchList(moviesFromLocalStorage);
    }
  }, [])


  useEffect(() => {
    // there can be 10 movies belonging to thriller, action and comedy
    let temp = watchList.map((movie) => {
      return genreids[movie.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
  }, [watchList]);

  const genre = (genre_id) => {
    return genreids[genre_id];
  }

  const handleAscendingRatings = () => {
    const sortAscending = watchList.sort((movieObjA, movieObjB) => {
      return movieObjA.vote_average - movieObjB.vote_average;
    });
    setWatchList([...sortAscending]);
  };

  const handleDescendingRatings = () => {
    const sortDescending = watchList.sort((movieObjA, movieObjB) => {
      return movieObjB.vote_average - movieObjA.vote_average;
    });
    setWatchList([...sortDescending]);
  };
  // always use return when using {} in a function in () return is not needed.
  const Genre = () => {
    return <div className="flex justify-center m-4">
      {genreList.map((genre) => {
        const isActive = currGenre === genre;
        const baseStyles = "flex justify-center items-center h-[3rem] w-[8rem] rounded-lg text-white font-bold mx-4 hover:cursor-pointer";
        const bgColor = isActive ? "bg-blue-400" : "bg-gray-400/50";
        return (
          
          <div
            
            onClick={() => handleFilter(genre)}
            className={`${baseStyles} ${bgColor}`}>
            {genre}
          </div>
        )
      })}

    </div>
  }

  const filteredMovies = () => {
    return watchList
      .filter((movie) => {
        if (currGenre === "All Genres") {
          return true;
        } else {
          return genreids[movie.genre_ids[0]] == currGenre;
        }
      })
      .filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase());
      });

  }

  return (
    <>
      <Genre />
      <div className="flex justify-center my-10">
        <input
          placeholder="Search Movie"
          className="h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border border-gray-300"
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th>
                <div className="flex">
                  <div>
                    <i
                      onClick={handleAscendingRatings}
                      className="fa-solid fa-arrow-up mx-1 hover:cursor-pointer"
                    ></i>
                    Ratings
                    <i
                      onClick={handleDescendingRatings}
                      className="fa-solid fa-arrow-down mx-1 hover:cursor-pointer"
                    ></i>

                  </div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Popularity</div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Genre</div>
                </div>
                </th>
                <th>
                <div className="flex">
                <div>Remove</div>
                </div>
                </th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredMovies()
              .map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50" >
                  <td className="flex items-center px-6 py-4 font-normal text-gray-900 gap-4">
                    <img
                      className="h-[6rem] w-[10rem] object-fit rounded-r-lg object-cover"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt=""
                    />
                    <div className="font-medium text-gray-700 text-sm">
                      {movie.title}
                    </div>
                    
                  </td>
                  <td className="pl-6 py-4">{movie.vote_average}</td>
                  <td className="pl-6 py-4">{movie.popularity}</td>
                  <td className="pl-2 py-4">{genre(movie.genre_ids[0])}</td>
                  <td className="pl-2 py-4"> <div onClick={() => removeFromWatchList(movie)} className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-red-900/60 cursor-pointer">❌</div></td>
                </tr>
                
              ))}


          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
