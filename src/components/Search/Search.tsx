import React, {Component} from "react";
import axios from "axios";



export default class Search extends Component<any, any> {

    getMoviesList = async (input:string) => {
        if (input == '') {
            return [];
        }
        let response = await axios.get("https://yts.mx/api/v2/list_movies.json");
        return response.data.data.movies.title

    }

    showResults = async (val:string) => {
        let movie = await this.getMoviesList(val);
        let list = document.createElement("ul");
        for (let i = 0; i < movie.length; i++) {
            let elem = document.createElement("li");
            elem.innerHTML = movie[i].name;
            list.append(elem);

        }

    }

    render() {
        return (
            <div className="search">
                <form>
                    <label>
                        <input className="searcher" placeholder="search here"
                               onChange={(e) => console.log(e.target.value)}>
                        </input>
                        <div id="result" className="result">{this.props.showResults}</div>
                    </label>
                </form>
            </div>
        )
    }
}


