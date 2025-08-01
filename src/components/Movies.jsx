import { useEffect, useState , useContext} from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from "axios";
import { WatchListContext } from "../context/WatchListContext";


const Movies = () => {
    const [movies, setMovies] = useState([])
    const [pageNo, setPageNo] = useState(1);
    const {watchList,addToWatchList, removeFromWatchList} = useContext(WatchListContext);
    const apiKey = process.env.TMDB_API_KEY;
   
    
    useEffect (() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=${pageNo}`)
        .then((response) => {
            console.log("Films", response.data.results);
            setMovies(response.data.results);
        })
    },[pageNo])

    const handleNext = () => {
        setPageNo(pageNo + 1);
    }
    const handlePrevious = () => {
        if (pageNo == 1) {
            setPageNo(1);
        } else {
            setPageNo(pageNo - 1);
        }
    }
    return (
        <div>
            <div className=" text-2xl font-bold text-center m-5">
                <h1> Trending Movies</h1>
             </div>
             <div className=" flex justify-evenly flex-wrap gap-8">
                {movies.map((movieObj) => {
                    return (
                       <MovieCard  movieObj={movieObj} addToWatchList={addToWatchList} watchList={watchList} removeFromWatchList={removeFromWatchList}/>
                    )
                })}
            </div>
            <Pagination nextPageFn={handleNext} previousPageFn={handlePrevious} pageNumber={pageNo} />
        </div>
    );
}

export default Movies;
