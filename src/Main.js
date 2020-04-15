import React, { Component } from 'react';
import axios from 'axios';
import {
    withRouter,
} from 'react-router-dom'

class Main extends Component {
    constructor(props){
        super(props)
        this.state= {
            country: ""
        }
    }

    enterCountry = (e) => {
        let country = e.target.value;
        this.setState({country});
    }

    onSubmit = () => {
        console.log(this.state.country);
        axios.get(`https://restcountries.eu/rest/v2/name/${this.state.country}`)
        .then((res) => {
            console.log(res);
            if(res.data) {
                this.props.history.push({
                    pathname: '/info',
                    state: { detail: res.data }
                });
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className="main">
                <input className="countryInput" placeholder="Enter Country" onChange={(e) => this.enterCountry(e)}/>
                <button className="submit" disabled={this.state.country === ""} onClick={() => this.onSubmit()}>Submit</button>
            </div>
        )
    }
}

export default withRouter(Main)