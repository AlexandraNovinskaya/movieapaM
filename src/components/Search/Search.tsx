import React, {Component} from "react";
import {debounce} from 'lodash';

export default class Search extends Component<any, any> {

    constructor(props:any) {
        super(props)
    }


    onSubmit = (e:any) => {
        e.preventDefault()
        this.props.handleChange(e.target.value)
    }

    render() {
        return (
            <div className="search">
                <form >
                    <label>
                        <input className="searcher" placeholder="search here"
                               onChange={this.onSubmit}

                        >
                        </input>

                    </label>
                </form>
            </div>
        )
    }
}


