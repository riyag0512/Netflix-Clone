import React, {useState, useEffect} from 'react'
import axios from "./axios";
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


const base_url ="https://image.tmdb.org/t/p/original/";
function Row({title, fetchUrl ,isLargeRow}) {

    const [movies, SetMovies] =  useState([]);
     const [trailerUrl,setTrailerUrl] =useState("");

    useEffect(() => {
     async function fetchData()
     {
         const request = await axios.get(fetchUrl);
       
         
        
        SetMovies(request.data.results);
         return request;
     }
     fetchData();
    },[fetchUrl]);

    const opts ={
        height: "390",
        width: "100%",
        playerVars: {
         autoplay:1,
        },
    };

    const handleClick = (movie) => {
    if(trailerUrl)
    {
        setTrailerUrl("");
    }
    else{
        movieTrailer(movie?.name ||movie?.original_name || movie?.title || movie?.original_title||"")
        .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            console.log("trailer is ",urlParams);
            setTrailerUrl(urlParams.get('v'));
            console.log("trailer is ",trailerUrl);
        }).catch(error => console.log("error is...........",error));

    }

    }
    console.log(movies);
    return(
        <div className='row'>
            {/*title*/}
          <h2>{title}</h2>
<div className="row_posters">
            {/*container  posters*/}

           { movies.map((movie) => (
           
            <img  
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
           ))}
            </div>
         {trailerUrl &&   <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
    } 

export default Row
