import React, { Component } from 'react'
import './Saved.css'
import {Link} from 'react-router-dom'
import request from 'superagent'
// import * as moment from 'moment';

export default class SavedItem extends Component {

    render() {
        
        return (
            <div id="saved-list-container">
                <a href={`/concert/${this.props.concert.tm_id}`}>
                
                <div className="saved-list">
                <h1>{this.props.concert.name}</h1>
                // why not manage these styles in the css?
                <img src={this.props.concert.images} style={{width: "125px", height:"100px"}} alt="" className="concert-images"/>
                <h3>{this.props.concert.city}, {this.props.concert.state}</h3>
                </div>
                </a>
                <button id="remove-from-saves-button" onClick={() => this.props.handleDelete(this.props.concert)}>Remove from saved</button>
                
            </div>
        )
    }
}
