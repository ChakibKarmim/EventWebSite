import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import loginsvg from '../../public/Illustration/login.svg';
import svgList from '../../public/Illustration/list.svg';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default
class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
                events: [],
                persons: [],
                manche: [],
                name: "Saisir un nom",
                date: "Saisir une date"
        }
    }

    componentDidMount() {
        this.loadEvents()
        this.loadPersons()
        this.loadManche()
    }

    loadEvents = () => {
        fetch('/api/events')
            .then((res) => res.json())
            .then((eventsReponse) => {
                this.setState({events: eventsReponse})
            })
    }

    loadPersons = () =>
    {
        fetch('/api/persons')
            .then((res) => res.json())
            .then((persosnsReponse) => {
                this.setState({persons: persosnsReponse})
            })
    }

    loadManche = () =>
    {
        fetch('/api/manche')
            .then((res) => res.json())
            .then((mancheReponse) => {
                this.setState({manche: mancheReponse})
            })
    }

    deleteEvent(id){
        this.setState({loading: true});
        fetch("/api/events/" + id, {method : "DELETE"})
            .then((response) => response.json())
            .then((events)=>{
                this.setState({loading: false, events: events});
            });
    }

    valider = (e) => {
        e.preventDefault();
        let body = JSON.stringify({name: this.state.name, date: this.state.date});
        fetch('api/events', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then((res) => res.json())
            .then((eventsReponse) => {
                this.setState({events: eventsReponse})
                alert.success("event added !");
            })
    }

    render()
    {
        const {loading, events , persons , manche} = this.state;
        return (
            <Router>
                <div className='container_login'>
                    <div className='home_title'>
                        <h1>admin</h1>
                    </div>
                    <div className='planning_table'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <td>name</td>
                                    <td>date</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                events && events
                                    .map((event,index) => {
                                        return <tr key={index}>
                                            <td>{event.name}</td>
                                            <td>{event.planning_date}</td>
                                            <td>
                                                <button type='submit' className='btn btn-danger' onClick={() => this.deleteEvent(event.id)}>
                                                    delete</button>
                                            </td>
                                        </tr>
                                    })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className='form_plannig'>
                        <form onSubmit={this.valider}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="name"
                                           placeholder={this.state.name}
                                           onChange={(e) => this.setState({name: e.currentTarget.value})}
                                           required={true}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Date</label>
                                <div className="col-sm-10">
                                    <input type="date" className="form-control" id="date"
                                           placeholder={this.state.date}
                                           onChange={(e) => this.setState({date: e.currentTarget.value})}
                                           required={true}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <button className='btn btn-primary'
                                >Add planning</button>
                            </div>
                        </form>
                    </div>
                    <div className="form_inscription">
                        <form>
                            <div className="form-group row">
                                <select className="custom-select custom-select-sm">
                                    {
                                        persons && persons
                                            .map((event,index) => {
                                                return
                                                <option value={index}>{event.name}</option>
                                            })
                                    }
                                </select>
                                <select className="custom-select custom-select-sm">
                                    {
                                        events && events
                                            .map((event,index) => {
                                                return
                                                <option value={index}>{event.name}</option>
                                            })
                                    }
                                </select>
                                <select className="custom-select custom-select-sm">
                                    {
                                        // normalement il faut faire un filter on utilisont le uuid du planning selectionner
                                        manche && manche
                                            .map((mnch,index) => {
                                                return
                                                <option value={index}>{mnch.name}</option>
                                            })
                                    }
                                </select>
                                <div className="form-group row">
                                    <button className='btn btn-primary'
                                    >Add inscription</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </Router>
        )
    }

}

