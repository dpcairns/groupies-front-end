import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as moment from 'moment';
export default class ConcertData extends Component {
    render() {
        let concertdate = this.props.concert.dates.start.localDate;

        concertdate = moment(concertdate, 'YYYY-MM-DD').format('dddd, MMM Do, YYYY');
        
        // console.log(this.props.saved)
        return (
            <li className="concert-list">
                <Link  to={`concert/${this.props.concert.id}`} key={this.props.concert.id}>
                <img src={this.props.concert.images[0].url} style={{width: "125px", height:"100px"}} alt="" className="concert-images"/>
                <div className='list-right'>
                <h2>{this.props.concert.name}</h2>
                {/* <h3>Genre: {this.props.concert.classifications[0].genre.name}</h3> */}
                <h3>{concertdate}</h3>
                {/* <h3>Tickets: {this.props.concert.url}</h3> */}
                {/* <h3>State: {this.props.concert._embedded.venues[0].state.name}</h3> */}
                {/* <h3>Minimum Price: {this.props.concert.priceRanges[0].min}</h3> */}
                {/* <h3>Maximum Price: {this.props.concert.priceRanges[0].max}</h3> */}
                <h3>{this.props.concert._embedded.venues[0].name}</h3>
                <h3>{this.props.concert._embedded.venues[0].city.name}, {this.props.concert._embedded.venues[0].state.name}</h3>
                </div>
                </Link>
                // for readability, this should probably happen above the return statment
                <span className={this.props.saved.findIndex(el => el.tm_id === this.props.concert.id) !== -1 ? 'saved' : ''} 
                    onClick={ (e) => {
                        // this is too much for an inline, anonymous function
                        this.props.handleSaved(
                            this.props.concert, 
                            this.props.saved.findIndex(el => el.tm_id === this.props.concert.id), 
                            e)}}>♫<div></div><div></div><div></div><div></div></span>
                
            </li>
        )
    }
}
