import React from "react";

interface MovieItem {
    id: number;
    title: string ;
    year:number;
    summary:string;
    medium_cover_image : string;
    genres : string,
    stars:number,
    rating : number
}

export default MovieItem;