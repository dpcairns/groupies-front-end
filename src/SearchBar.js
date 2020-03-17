import React, { Component } from 'react'
import './SearchBar.css'
export default class SearchBar extends Component {
    render() {
        return (
            <div id="search-bar-container">
                <form onSubmit={this.props.handleSearch}>
                    <input
                        placeholder="Search"
                        value={this.props.searchQuery}
                        onChange={this.props.handleChange}
                        onFocus={e => e.target.select()} 
                    /><br />
                    <input
                        placeholder="City"
                        value={this.props.searchCity}
                        onChange={this.props.handleCity}
                        onFocus={e => e.target.select()} // is this necessary?
                    /><br />
                    <button id="search-bar-button">Search</button>
                    
                </form>
            </div>
        )
    }
}