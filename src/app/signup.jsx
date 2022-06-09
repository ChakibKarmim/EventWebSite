import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import loginsvg from '../../public/Illustration/login.svg';
import svgList from '../../public/Illustration/list.svg';
import Login from './login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default
class Signup extends React.Component{
    constructor() {
        super();
        this.state = {
            persons : [],
            first_name : "",
            last_name : "",
            password : ""
        }
    }


    valider = (e) => {
        e.preventDefault();
        let body = JSON.stringify({first_name: this.state.first_name, last_name: this.state.last_name , password: this.state.password});
        fetch('api/persons', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then((res) => res.json())
            .then((personReponse) => {
                this.setState({persons: personReponse})
                alert.success("user added !");
            })
    }
    
    render()
    {
        const {persons} = this.state;
        return (
        <Router>
            <div className='container_login'>
                <div className='title'>
                    <h1>Signup.</h1>
                </div>
                <div className='illustration'>
                    <img src={loginsvg} alt='login svg'/>
                </div>
                <div className='login_form'>
                    <form onSubmit={this.valider}>
                        <div className='col'>
                            <div className='row'>
                                <label htmlFor='exampleInputEmail1'>First name</label>
                                <input type='text' className='form-control' id='exampleInputEmail1'
                                       aria-describedby='emailHelp'
                                       placeholder={this.state.first_name}
                                       onChange={(e) => this.setState({first_name: e.currentTarget.value})}
                                       required={true}
                                />
                            </div>
                            <div className='row'>
                                <label htmlFor='exampleInputEmail1'>Last name</label>
                                <input type='text' className='form-control' id='exampleInputEmail1'
                                       aria-describedby='emailHelp'
                                       placeholder={this.state.last_name}
                                       onChange={(e) => this.setState({last_name: e.currentTarget.value})}
                                       required={true}
                                />
                            </div>
                            <div className='row'>
                                <label htmlFor='exampleInputPassword1'>Password</label>
                                <input type='password' className='form-control' id='exampleInputPassword1'
                                       placeholder={this.state.password}
                                       onChange={(e) => this.setState({password: e.currentTarget.value})}
                                       required={true}
                                />
                            </div>
                            <div className='row'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                            <h6> already have an account ? <Link to="/login">login ➡</Link> </h6>
                        </div>
                    </form>
                </div>
            </div>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </Router>
        )
    }
    
}

