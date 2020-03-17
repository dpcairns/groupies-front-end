import React, { Component } from 'react'
import request from 'superagent'
import { getSaved, addSaved, deleteSaved } from './api.js'
import SavedItem from './SavedItem'
import Footer from './Footer'

export default class Saved extends Component {
    state = {
        saved: []
    }
    
    async componentDidMount() {

        await this.loadData()

    }
    async loadData(){
        const data = await getSaved();

        this.setState({
            saved: data.body
        });  
    }
    handleFavorite = async () => {
        this.setState({saved: this.state.saved })
    }

    handleDelete = async(concert) => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(concert)
        // this call should probably live in api.js
        const data = await request.delete(`https://vast-ravine-67223.herokuapp.com/api/me/saved/${concert.id}`).set('Authorization', user.token)
        await this.loadData()
    }


    render() {

        return (
            <div> {
                this.state.saved.map(concert => <SavedItem concert={ concert } key={ concert.id } handleDelete={this.handleDelete} />)}
        
            </div>
                )
        }
}