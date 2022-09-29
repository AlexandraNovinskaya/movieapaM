import React, {Component, ReactNode, useState} from 'react';
import axios from "axios";
import Movies from "../Movies/Movies";
import MovieItem from "../Movies/MovieItem";
import Spinner from "../spinner/spinner";
import {Pagination} from "antd";
import Search from "../Search/Search";

class App extends Component <any, any> {

    state = {
        isLoading: true,
        movies: [],
        totalMovies: 0,
        elementsPerPage : 6

    }

    setTotalMovies = async () => {
        let result = await axios.get("https://yts.mx/api/v2/list_movies.json");
        this.setState({
            totalMovies: Math.ceil(result.data.data.movie_count / this.state.elementsPerPage)
        })
    }

    getMovies = async (page: number, limit:number) => {
        let result = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}`);
        this.setState({
            movies: result.data.data.movies,
            isLoading: false
        })
    }

    componentDidMount() {
        this.getMovies(1,this.state.elementsPerPage)
        this.setTotalMovies()
    }

    handlePageClick = (pageNumber: number) => {
        this.getMovies(pageNumber,this.state.elementsPerPage)
    }

    render() {
        const {movies, isLoading} = this.state
        const {totalMovies, elementsPerPage} = this.state;

        return (

            <div className='container'>

                {isLoading ? <div className="loader">
                    <span className="loader__text"><Spinner></Spinner></span>
                </div> : (movies as MovieItem[]).map(movie =>
                    <div key={movie.id} className="movies">
                        <Movies key={movie.id}
                                id={movie.id}
                                year={movie.year}
                                summary={movie.summary}
                                poster={movie.medium_cover_image}
                                title={movie.title}
                                genres={movie.genres}
                        />
                    </div>
                )}
                <Pagination
                    defaultCurrent={1}
                    onChange={this.handlePageClick}
                    size="small"
                    total={totalMovies}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    pageSize={elementsPerPage}
                    showSizeChanger={false}
                />
            </div>
        )
    }

}

export default App;
