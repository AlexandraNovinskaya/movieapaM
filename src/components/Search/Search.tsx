import React, {Component} from "react";
import axios from "axios";



export default class Search extends Component<any, any> {

    constructor(props:any) {
        super(props)
        this.state = {
            input: '',
        }
    }

    onLabelChange = (e:any) => {
        this.setState({
            input: e.target.value,
        })
    }

    onSubmit = (e:any) => {
        e.preventDefault()
        this.props.handleChange(this.state.input)
        this.setState({
            input: '',
        })
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.onSubmit}>
                    <label>
                        <input className="searcher" placeholder="search here"
                               onChange={this.onLabelChange}
                               value={this.state.input}>
                        </input>

                    </label>
                </form>
            </div>
        )
    }
}


