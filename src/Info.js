import React, { Component } from 'react';
import {
    withRouter
} from 'react-router-dom';
import axios from 'axios';

class Info extends Component {
    constructor(props){
        super(props)
        this.state= {
            data: [],
            weather: "",
            capital: "",
            loading: false
        };
    }

    componentDidMount() {
        console.log(this.props.location.state.detail);
        this.setState({data: this.props.location.state.detail})
    }

    showWeather = (capital) => {
        this.setState({loading: true, capital, weather: ""});
        const accessKey = 'c9174f3926674a00d33e7aef98a30fe0';
        axios(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${capital}`)
        .then(res => {
            this.setState({weather: res.data.current, loading: false})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return(
            <div style={{content:'', display: 'table', clear: 'both'}}>
                <h2>Country Informations</h2>
                {this.state.data.map(item => {
                    return(
                        <div key={item.name} style={{flexDirection:'row', height:200, width:500, textAlign:"left", float:'left', display: 'table', clear: 'both'}}>
                            <div style={{}}>
                                <img src={item.flag} alt="flag" style={{height:50, width:80, float:'left'}}/>
                                <ul style={{listStyleType:"none", float:'left'}}>
                                    <li>Capital: {item.capital}</li>
                                    <li>Population: {item.population}</li>
                                    <li>Latitude: {item.latlng[0]},  Longitude: {item.latlng[1]}</li>
                                </ul>
                                <button style={{float:'left', height: 30}} disabled={this.state.loading} onClick={() => this.showWeather(item.capital)}>Capital Weather</button>
                            </div>
                            {this.state.weather && this.state.capital === item.capital && 
                                <div style={{float:'left'}}>
                                    <h3>Weather Information</h3>
                                    <ul style={{listStyleType:"none", textAlign: 'left'}}>
                                        <li>Temperature: {this.state.weather.temperature}</li>
                                        <li>Wind Speed: {this.state.weather.wind_speed}</li>
                                        <li>Precip: {this.state.weather.precip}</li>
                                        <li>{this.state.weather.weather_icons.map(item => {
                                            return (
                                                <div key={item}>
                                                    <img src={item} alt="weather" style={{height:40, width:40}}/>
                                                </div>
                                            )
                                        })}</li>
                                    </ul>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(Info);