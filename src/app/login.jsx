import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import loginsvg from '../../public/Illustration/login.svg';
import svgList from '../../public/Illustration/list.svg';
import Planning from './planning'
import Admin from './admin'
import Signup from './signup'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default
class Login extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render()
    {
        return (
            <Router>
                <div className='container_login'>
                    <div className='title'>
                        <h1>Login <span className="material-symbols-outlined">login</span> </h1>
                    </div>
                    <div className='illustration'>
                        <img src={loginsvg} alt='login svg'/>
                    </div>
                    <div className='login_form'>
                        <form>
                            <div className='col'>
                                <div className='row'>
                                    <label htmlFor='exampleInputEmail1'>Full name</label>
                                    <input type='text' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp'/>
                                </div>
                                <div className='row'>
                                    <label htmlFor='exampleInputPassword1'>Password</label>
                                    <input type='password' className='form-control' id='exampleInputPassword1'/>
                                </div>
                                <div className='row'>
                                    <Link to="/planning">
                                        <button type='submit' className='btn btn-primary' >Submit</button>
                                    </Link>
                                </div>
                                <h6> Good to have you back 😊 </h6>
                            </div>
                        </form>
                    </div>
                </div>
                <Switch>
                    <Route path="/planning">
                        <Planning/>
                    </Route>
                </Switch>
            </Router>
        )
    }

}

