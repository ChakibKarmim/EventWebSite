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
class Planning extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bool_test : false
        }
    }

    button_fun_test(bl)
    {
        if (bl == true)
        {
            return <button className='add'>add</button>
        }
        else
            return <button className='remove'>remove</button>

    }


    render()
    {
        return (
                <div className='container_login'>
                    <div className='home_title'>
                        <h1>Planning</h1>
                    </div>
                    <div className='list_illustration'>
                        <img src={svgList} alt='planning list svg'/>
                    </div>
                    <div className='btn_group'>
                            <button type="button" className="btn btn-danger">logout</button>
                    </div>
                    <div className='planning_list' >
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Events</th>
                                <th>name</th>
                                <th>date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>index</td>
                                <td>test_1</td>
                                <td>2022-05-05</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Manches</th>
                                            <th>order</th>
                                            <th>name</th>
                                            <th>status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='btm_none'></td>
                                                <td>1</td>
                                                <td>first</td>
                                                <td> {this.button_fun_test(true)} </td>
                                            </tr>
                                            <tr>
                                                <td className='btm_none'></td>
                                                <td>1</td>
                                                <td>first</td>
                                                <td> {this.button_fun_test(false)} </td>
                                            </tr>
                                            <tr>
                                                <td className='btm_none'></td>
                                                <td>1</td>
                                                <td>first</td>
                                                <td> {this.button_fun_test(true)} </td>
                                            </tr>
                                            <tr>
                                                <td className='btm_none'></td>
                                                <td>1</td>
                                                <td>first</td>
                                                <td> {this.button_fun_test(false)} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }



}

