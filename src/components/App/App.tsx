import React, {Component, ReactNode, useCallback, useState} from 'react';
import axios from "axios";
import Movies from "../Movies/Movies";
import MovieItem from "../Movies/MovieItem";
import Spinner from "../spinner/spinner";
import {Pagination,Rate,Tabs} from "antd";
import Search from "../Search/Search";
import _ from "lodash";

class App extends Component <any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
            totalMovies: 0,
            elementsPerPage: 6,
            searchTerm: '',

        };
    }


    setTotalMovies = async () => {
        let result = await axios.get("https://yts.mx/api/v2/list_movies.json");
        this.setState({
            totalMovies: Math.ceil(result.data.data.movie_count / this.state.elementsPerPage)
        })
    }

    getMovies = async (page: number, limit: number) => {
        let result = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}`);
        this.setState({
            movies: result.data.data.movies,
            isLoading: false
        })
    }

    componentDidMount() {
        this.getMovies(1, this.state.elementsPerPage)
        this.setTotalMovies()
    }

    handlePageClick = (pageNumber: number) => {
        this.getMovies(pageNumber, this.state.elementsPerPage)
    }

    handleChange = _.debounce(async (str:string) => {
        console.log("submit result: " + str)
        let result = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=6&page=1&query_term=${str}`);
        let count = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${str}`);
        let c = count.data.data.movie_count
        if (c == 0){
            return alert("Request not found")
        }

        this.setState({
            movies: result.data.data.movies,
            isLoading: false,
            totalMovies: Math.ceil(count.data.data.movie_count / this.state.elementsPerPage)
        })
    }, 1000)
    rateMovie = async(movieId: number, value: number) => {
        let guestSessionId = localStorage.getItem("name");
        let res = await axios.get(
            `https://yts.mx/api/v2/list_movies.json`)
        let resRes = res.data.data.movies.id
        console.log(movieId,value)
    }

    render() {
        const {movies, isLoading} = this.state
        const {totalMovies, elementsPerPage} = this.state;

        return (
            <div>
                <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Search" key="1">
                <Search handleChange={this.handleChange}></Search>
                <div className='container'>
                    {isLoading ?
                        <div className="loader">
                    <span className="loader__text"><Spinner></Spinner>
                    </span>
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
                                <Rate count={10} onChange={(value) => {
                                    this.rateMovie(movie.id, value)
                                }}
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
                </Tabs.TabPane>
                    <Tabs.TabPane tab="Rate" key="2">
                        <div>

                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

}

export default App;
