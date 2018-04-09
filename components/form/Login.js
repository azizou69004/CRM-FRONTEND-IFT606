//import MyInput from './../components/Input';
import React, { Component } from 'react';
import '../../style/Login.css';
import  logoCo from '../../style/images/logoCompany.png';
//import  '../../style/logoCo.css';
import  '../../style/footer.css';
//import { connect  } from 'react-redux';
import {store} from '../../store';
import {push} from 'react-router-redux';
//import Img from 'react-image';

class Login extends Component   {
	constructor(props) {
		super(props);

		this._changeUsername = this._changeUsername.bind(this);

		this._changePassword = this._changePassword.bind(this);

		this._emitChange = this._emitChange.bind(this);

		this._login = this._login.bind(this);
	}



	_login(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);

	}

	_changeUsername (event){
		this._emitChange({...this.props.formState , username: event.target.value});
	}

	_changePassword (event){
		this._emitChange({...this.props.formState , password: event.target.value});
	}

	_emitChange (newFormState){
		this.props.changeForm(newFormState);
	}

	_forgotten(e) {
		store.dispatch(push('/Reset'));
	}

	render() {

		return (
				<div className="container-fluid">
					<div id ="logoCo" className="row">
						<div className="col text-center">
							<img src={logoCo} alt="logoCompany" width="300" height="200" />
						</div>
					</div>

					<div className="row" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
						<div className="col text-center">
							<div className="loginmodal-container">
								<h1> Connexion </h1><br/>
								<form method="POST" onSubmit = {this._login} id="login-form"  >
									<input className= "form-control" type='text' name="username" id="usernameLogin" placeholder="Nom d'utilisateur" onChange={this._changeUsername} value={this.props.formState.username} required />
									<input className= "form-control" type='password' name="password" id="passwordLogin" placeholder="Mot de passe" onChange={this._changePassword} value={this.props.formState.password}  required />
									<div className="form-group">
										<button type= "submit" className="btn btn-primary btn-lg" id="loginButton" disabled={this.props.isloading ? true : false }>
											{
												this.props.loadingLogin&&
												<i className="fa fa-refresh fa-spin"/>
											}
											Login
										</button>
									</div>
								</form>
								<div className="login-help">
									<br/>
									<button className="btn btn-primary btn-lg" onClick = {this._forgotten} id="loginButton" > Mot de passe oublié?</button>
								</div>
								<div id="errorPassword" className=" w3-container w3-panel w3-red "   style={{display: 'none'}}>
							    <h3>Nom d'utilisateur ou mot de passe erroné</h3>
							    <p>En cas de problemes, utilisez "Mots de passe oublié?".</p>
							  </div>

							</div>
						</div>
					</div>

					<footer className="footer-distributed row">
						<div className="col text-center">
							<div className="footer-left">
								<div>
									<i className="fa fa-map-marker" ></i>
									<p><span >
									4645 Boul Bourque </span> Sherbrooke, QC J1N 2G6</p>
								</div>
								<br/><br/>
								<a  className="material-icons"> &#xe52e;</a><a href = "http://maps.google.com/?q= 4645 Boul Bourque Sherbrooke, QC J1N 2G6"> Obtenir un intineraire</a>
							</div>

							<div className="footer-center">
								<div>
									<i className="fa fa-phone"></i>
									<p><a href="tel:5149691087">+1 (819) 823-1443</a></p>
								</div>
							</div>

							<div className="footer-right">
								<div>
									<i className="fa fa-envelope"></i>
									<p><a href="mailto:crm.udes@gmail.com">crm.udes@gmail.com</a></p>
								</div>
								<div className="footer-icons">
									<a href="https://ca.linkedin.com/in/alainproulx"><i className="fa fa-linkedin"></i></a>
									<a href="https://github.com/azizou69004/CRM-UDES-2017"><i className="fa fa-github"></i></a>
								</div>
							</div>
							<p className="footer-copyright">  © 2017 CRM Application UDES. All rights reserved </p>
						</div>
					</footer>
				</div>

		);
	}
}

export default (Login);
