
/** Imports **/
import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {store} from '../../store';
/** Styles **/
import '../../style/Reset.css';

class ResetPagePassword extends Component {

	constructor(props) {
		super(props);
		this._changeNewPassword = this._changeNewPassword.bind(this);
		this._changeConfirmPassword = this._changeConfirmPassword.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._submit = this._submit.bind(this);
	}

	_submit(e) {
		e.preventDefault();
		this.props.onSubmit(this.props.formState, this.props.token);
	}

	_back(e) {
		e.preventDefault();
		store.dispatch(push('/'));
	}

	_changeNewPassword(event) {
		this._emitChange({...this.props.formState, newPassword: event.target.value});
	}

	_changeConfirmPassword(event) {
		this._emitChange({...this.props.formState, confirmPassword: event.target.value});
	}

	_emitChange(newFormState) {
		this.props.changeForm(newFormState);
	}

	render() {
		return (
			<div className="reset container-fluid">
				<div className="elelment row">
					<div className="element-main">
						<h1>
							{"Mot de passe oublié"}
						</h1>
						<p>
							{"Entrez votre nouveau mot de passe"}
						</p>
						<form onSubmit={this._submit}>

							<input pattern=".{5,10}"
								   type="password"
								   placeholder="Votre nouveau mot de passe"
								   onChange={this._changeNewPassword}
								   value={this.props.formState.newPassword}
								   required
							/>
							<p> Confirmation du mot de passe </p>
							<input type="password"
								   pattern=".{5,10}"
								   placeholder="Confirmation du mot de passe"
								   onChange={this._changeConfirmPassword}
								   value={this.props.formState.confirmPassword}
								   required
							/>

							<div className="form-group">
								<button className="btn btn-primary btn-lg"
										id="reset"
										disabled={this.props.isLoading}>Changer
								</button>
							</div>
							<div className="form-group" onClick={this._back}>
								<button className="btn btn-primary btn-lg"
										id="reset"
								>
									Quitter
								</button>
							</div>
						</form>

					</div>
				</div>
				<div className="copy-right row">
					<p className="col text-center">
						{"© 2017 CRM Application UDES. All rights reserved"}
					</p>
				</div>
			</div>
		);
	}
}

export default (ResetPagePassword);
