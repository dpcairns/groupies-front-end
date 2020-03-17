import React, { Component } from 'react';
import ConcertData from "./ConcertData.js";
import SearchBar from './SearchBar.js';
import Header from './Header.js'
import { getConcerts,
         getSaved,
         addSaved,
         deleteSaved } from './api.js';
import './loading.css';
import './CList.css';

const isLoggedIn = () => JSON.parse(localStorage.getItem('user')); 

export default class ConcertList extends Component {
    state = {
        searchQuery: '',
        searchCity: '',
        concerts: [],
        saved: [],
        // userNotLoggedIn: false 
        loadingFav: false,
        loadingSearch: false,
        user: isLoggedIn()
    }
    async componentDidMount() {
        let concertData;
        if (this.state.user) {
            concertData = await getConcerts('', this.state.user.city_name);
            if(this.state.searchCity === '') {
                this.setState({searchCity: this.state.user.city_name})
            }
        } else {
            concertData = await getConcerts('', );
        }
            if(concertData.body._embedded) {
                this.setState({
                        concerts: JSON.parse(concertData.text)._embedded.events,
                    })
                } else {
                    this.setState({ concerts: [] })
                }
            if (this.state.user) {
                this.setState({searchCity: this.state.user.city_name})
                const data = await getSaved();

                this.setState({ saved: data.body || [] })
            } 
    }
    handleSearch = async (e) => {
        e.preventDefault();
        const data = await getConcerts(this.state.searchQuery, this.state.searchCity);

        this.setState({ 
            concerts: data.body._embedded 
                ? JSON.parse(data.text)._embedded.events 
                : [] 
        })
    }
    handleChange = (e) => this.setState({ searchQuery: e.target.value })

    handleCity = (e) => this.setState({ searchCity: e.target.value })

    handleLogout = (e) => {
        localStorage.clear();
        this.props.history.push('/');
    }

    handleSaved = async(concert, saved_id, e) => {
        
        if(!this.state.loadingFav){
    
            this.setState({loadingFav: true})
            const button = e.target;
            // this dom manipulation should be done declaratively through react and state, not imperatively
            button.classList.add('lds-ellipsis');
            console.log(saved_id);
            
            const saved = {
                tm_id: concert.id,
                name: concert.name,
                images: concert.images[1].url,
                genre: concert.genre && concert.classifications[0].genre.name,
                start_date: concert.dates.start.localDate,
                tickets_url: concert.url,
                city: concert._embedded.venues[0].city.name,
                state: concert._embedded.venues[0].state.name,
                price_min: concert.priceRanges && concert.priceRanges[0].min ? concert.priceRanges[0].min : null,
                price_max: concert.priceRanges && concert.priceRanges[0].max ? concert.priceRanges[0].max : null,
                long: concert._embedded.venues[0].location.longitude ? concert._embedded.venues[0].location.longitude : null,
                lat: concert._embedded.venues[0].location.latitude ? concert._embedded.venues[0].location.latitude : null,
            }
            if (isLoggedIn()) {

                const savedConcert = saved_id === -1 
                    ? await addSaved(saved)
                    : await deleteSaved(this.state.saved[saved_id].id);

                console.log(savedConcert);
                const data = await getSaved(); if(data.body) {
                    this.setState({
                        saved: data.body,
                    })
                } else {
                    this.setState({ saved: [] })
                }
            }
        // this dom manipulation should be done declaratively through react and state, not imperatively
        button.classList.remove('lds-ellipsis');
        this.setState({loadingFav: false})
    }
    }
    render() {

        return (
            <div id="concert-list-container">
                <div id='sidebar'>
                    <div className='links'>
                        <a className='savedlink linkbutton' href="/saved">Saved Concerts</a>
                        <button className='logoutlink linkbutton' onClick={this.handleLogout}>Logout</button>
                    </div>
                    <SearchBar
                    searchQuery={this.state.searchQuery}
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    handleCity={this.handleCity}
                    searchCity={this.state.searchCity}
                    />
                </div>
                <ul id='concert-list'>
                { this.state.concerts &&
                        this.state.concerts.map(concert =>
                        <ConcertData saved={ this.state.saved } key={concert.id} handleSaved={ this.handleSaved } concert={concert} />
                        )
                }
                </ul>
            </div>
        )
}};