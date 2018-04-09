//import MyInput from './../components/Input';
import React, { Component } from 'react';
import  logo from '../style/images/logo.png';
import  signalImage from '../style/images/signal.png';
import  '../style/css/style.css';
//import {store} from '../store';
//import {push} from 'react-router-redux';

class ErrorPage extends Component   {
	/*constructor(props) {
		super(props);


	}*/

	render() {

		return (
				<div id="404">
				<div className="wrap" >
				<div className="content">
				<div className="logo">
				<h1><a><img src={logo} alt="404"/></a></h1>
				<span><img src={signalImage} alt="Oops! la page demandée est en construction"/>
					Oops! la page demandée est en construction
				</span>
				</div>
				</div>
				</div>
				</div>

		);
	}
}

export default (ErrorPage);
