import React, {Component} from "react";

export default class Movies extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }
    render(){
        return <div className="movie">
            <img src={this.props.poster}></img>
            <div className="movie__column">
                <h3 className="movie__title">{this.props.title}</h3>
                <h5 className="movie__year">{this.props.year}</h5>
                <ul className="movie__genres">
                    {this.props.genres.map((genre:string,index:number)=>{return <li className="genres" key={index}>{genre}</li>})}
                </ul>
                <p className="movie__summary">{this.props.summary.slice(0,180)}...</p>
            </div>

        </div>
    }
}
