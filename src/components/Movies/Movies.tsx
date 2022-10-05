import React, {Component} from "react";

export default class Movies extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }
  /*rateClass = () =>{
        if(this.props.rate<=3){

        }
    }*/

/*this.props.rate <= 3?"movie__circle-rating":'movie__circle-rating_red'*/
    render(){
        let className=''
        if(this.props.rate <= 3){
            className+="movie__circle-rating_red"
        } else if (this.props.rate <= 5 && this.props.rate >= 3){
            className+="movie__circle-rating_yellow"
        } else if (this.props.rate <= 7 && this.props.rate >= 5){
            className+="movie__circle-rating_orange"
        } else if (this.props.rate > 7){
            className+="movie__circle-rating_green"
        }


        return <div className="movie">
            <img src={this.props.poster} alt=""></img>
            <div className="movie__column">
                <h3 className="movie__title">{this.props.title}</h3>
                <h3 className={className}>{this.props.rate}</h3>
                <h5 className="movie__year">{this.props.year}</h5>
                <ul className="movie__genres">
                    {this.props.genres.map((genre:string,index:number)=>{return <li className="genres" key={index}>{genre}</li>})}
                </ul>
                <p className="movie__summary">{this.props.summary.slice(0,180)}...</p>
            </div>

        </div>
    }
}
