import React from "react";

interface MovieItem {
    id: number;
    title: string ;
    year:number;
    summary:string;
    medium_cover_image : string;
    genres : string
}

export default MovieItem;