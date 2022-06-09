import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import loginsvg from '../../public/Illustration/login.svg';
import svgList from '../../public/Illustration/list.svg';
import Login from './login'
import Signup from './signup'
import Admin from './admin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default 
class Acceuil extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            name: "Saisir un nom",
            date: "Saisir une date"
        }
    }

    componentDidMount() {
        this.loadEvents();
    }

    loadEvents = () => {
        fetch('/api/events')
            .then((res) => res.json())
            .then((eventsReponse) => {
                // on met à jour l'état de notre composant
                // ce qui forcera son rendu, donc l'appel à la méthode render
                this.setState({events: eventsReponse})
            })
    }

    render()
    {
        const {loading, events} = this.state;
        return (
            <Router>
                <div className='container_login'>
                    <div className='home_title'>
                        <h1>Home</h1>
                    </div>
                    <div className='list_illustration'>
                        <img src={svgList} alt='planning list svg'/>
                    </div>
                    <div className='btn_group'>
                        <Link to="/login">
                        <button type="button" className="btn btn-primary">login</button>
                        </Link>
                        <Link to="/signup">
                        <button type="button" className="btn btn-primary">signup</button>
                        </Link>
                        <Link to="/admin">
                            <button type="button" className="btn btn-primary">⚙️</button>
                        </Link>
                    </div>
                    <div className='planning_list' >
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                events && events
                                    .map((event,index) => {
                                        return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{event.name}</td>
                                            <td>{event.planning_date}</td>
                                        </tr>
                                    })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/signup">
                        <Signup/>
                    </Route>
                    <Route path="/admin">
                        <Admin/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <Acceuil/>,
    document.getElementById("main")
);