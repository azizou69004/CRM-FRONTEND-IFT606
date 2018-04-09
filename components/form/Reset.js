//import MyInput from './../components/Input';
import React, { Component } from 'react';
import '../../style/Reset.css';


class Reset extends Component   {
	constructor() {
		super();
		this.state = {error: false};
		this._changeEmail = this._changeEmail.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._submit = this._submit.bind(this);
	}

	_submit(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState);
	}
	_back(e) {
		e.preventDefault();
		window.location.href='/';
	}

	_changeEmail (event){
		this._emitChange({...this.props.formState , email: event.target.value});
	}

	_emitChange (newFormState){
		this.props.changeForm(newFormState);
	}


	render() {
		return (

				<div className ="reset container-fluid">
					<div className="elelment row">
						<h2> </h2>
						<div className="element-main">
							<h1>Mot de passe oublié</h1>
							<p> Entrez le courriel courrespondant a votre dossier</p>
							<form method="POST" onSubmit = {this._submit}>
								<input  id="courriel" type="email" placeholder="Votre adresse courriel"  onChange={this._changeEmail} value={this.props.formState.email} required/>
								<div className="form-group" ><button className="btn btn-primary btn-lg" id ="reset" disabled={this.props.isloading ? true : false }>Valider</button></div>
								<div className="form-group" onClick = {this._back} ><button className="btn btn-primary btn-lg"  id ="reset" >Retour</button>
								</div>
							</form>
							<div id="resetPasswordMsg" className=" w3-container w3-panel w3-green "   style={{display: 'none'}}>
						    <h3>Veuillez consulter vos courriels</h3>
						    <p>un lien de réinitialisation vous a été envoyé.</p>
						  </div>
						  <div id="resetPasswordMsgFail" className=" w3-container w3-panel w3-red "   style={{display: 'none'}}>
						    <h3>Le courriel entré est introuvable dans nos dossiers</h3>
						    <p>Veuillez réessayer ou contacter votre administrateur.</p>
						  </div>
						</div>
					</div>
					<div className="copy-right row ">
						<p className="col text-center">© 2017 CRM Application UDES. All rights reserved </p>
					</div>
				</div>
		);
	}
}


export default (Reset);
