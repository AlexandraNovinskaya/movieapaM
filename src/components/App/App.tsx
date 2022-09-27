import React, {Component, ReactNode, useState} from 'react';
import axios from "axios";
import Movies from "../Movies/Movies";
import MovieItem from "../Movies/MovieItem";
import Spinner from "../spinner/spinner";


class App extends Component <any, any> {

  state = {
    isLoading : true,
    movies : []
  }
    onNetworkState = () => {
        this.setState((prevState:any) => ({ network: !prevState.network }));
    };
  getMovies = async () => {
    let result = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
        this.setState({
                  movies: result.data.data.movies,
                  isLoading : false
                  })
  }

  componentDidMount() {
   this.getMovies()
  }

  render() {
    const {movies,isLoading} = this.state
      console.log(movies)
    return (<div className= 'container'>
        {isLoading ? <div className="loader">
            <span className="loader__text"><Spinner></Spinner></span>
        </div> : (movies as MovieItem[]).map(movie =>
            <div key = {movie.id} className="movies">
                <Movies key = {movie.id}
                id = {movie.id}
                year = {movie.year}
                summary = {movie.summary}
                poster = {movie.medium_cover_image}
                title = {movie.title}
                genres = {movie.genres}
                />
            </div>
        )}
        </div>)
  }

}

export default App;
