import React, { Component } from 'react';

class ContactsComponent extends Component   {
	constructor(props) {
		super(props);
		this._changeDecideur = this._changeDecideur.bind(this);
		this._changeExtTel = this._changeExtTel.bind(this);
		this._changeMail = this._changeMail.bind(this);
		this._changeNom = this._changeNom.bind(this);
		this._changeNumTel = this._changeNumTel.bind(this);
		this._changePoste = this._changePoste.bind(this);
		this._changePrenom = this._changePrenom.bind(this);
		this._changeTitre = this._changeTitre.bind(this);
		this._deleteContact = this._deleteContact.bind(this);
	}

	_changeNom(event) {
		let array = this.props.contacts;
		array[this.props.idContact].nom = event.target.value;
		this.props.changeForm(array);
	}

	_changePrenom(event) {
		let array = this.props.contacts;
		array[this.props.idContact].prenom = event.target.value;
		this.props.changeForm(array);	}

	_changeTitre(event) {
		let array = this.props.contacts;
		array[this.props.idContact].titre = event.target.value;
		this.props.changeForm(array);	}

	_changePoste(event) {
		let array = this.props.contacts;
		array[this.props.idContact].idposte = event.target.value;
		this.props.changeForm(array);	}

	_changeDecideur(event) {
		let array = this.props.contacts;
		array[this.props.idContact].estdecideur = event.target.value;
		this.props.changeForm(array);	}

	_changeNumTel(event) {
		let array = this.props.contacts;
		array[this.props.idContact].num_tel_principal = event.target.value;
		this.props.changeForm(array);	}

	_changeExtTel(event) {
		let array = this.props.contacts;
		array[this.props.idContact].ext_tel_principal = event.target.value;
		this.props.changeForm(array);	}

	_changeMail(event) {
		let array = this.props.contacts;
		array[this.props.idContact].mail = event.target.value;
		this.props.changeForm(array);	}

	_deleteContact() {
		let array  = this.props.contacts;
		let deletedContacts = array.splice(this.props.idContact, 1);

		if(deletedContacts[0].idpersonne) {
			let delcontacts = this.props.delcontacts;
			delcontacts.push(deletedContacts[0]);
			this.props.deleteContact(array, delcontacts);
		}
		else {
			this.props.changeForm(array);
		}
	}

	render() {
		return(
			<div>
				<h4>Contact {this.props.idContact + 1} <span className="fa fa-minus-square" onClick={this._deleteContact}/></h4>
				<div className="form-group row">
					<div className="col-4">
						<label htmlFor="prenom" className="control-label">Prénom</label>
						<input type="text" className="form-control" id="prenom"
							   name="prenom" value={this.props.formState.prenom}
							   onChange={this._changePrenom}/>
					</div>
					<div className="col-4">
						<label htmlFor="nom" className="control-label">Nom</label>
						<input type="text" className="form-control" id="nom"
							   name="nom" value={this.props.formState.nom}
							   onChange={this._changeNom}/>
					</div>
					<div className="col-4">
						<label className="control-label " htmlFor="titre">Titre</label>
						<select className="form-control" id="titre" name="titre"
								value={this.props.formState.titre} onChange={this._changeTitre}>
							<option value="Mr">Monsieur</option>
							<option value="Mme">Madame</option>
						</select>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-6">
						<label className="control-label " htmlFor="poste">Poste</label>
						<select className="form-control" id="poste" name="poste"
								value={this.props.formState.idposte} onChange={this._changePoste}>
							{
								this.props.postes.map(poste => {
									return <option key={poste.idposte} value={poste.idposte}>{poste.libelleposte}</option>
								})
							}
						</select>
					</div>
					{
						this.props.view === 'collIns' &&
						<div className="col-6">
							<label className="control-label " htmlFor="decideur">Décideur</label>
							<select className="form-control" id="decideur" name="decideur"
									value={this.props.formState.estdecideur} onChange={this._changeDecideur}>
								<option value={true}>Oui</option>
								<option value={false}>Non</option>
							</select>
						</div>
					}
				</div>
				<div className="form-group row">
					<div className="col-4">
						<label htmlFor="numTel" className="control-label">Numéro de téléphone principal</label>
						<input type="text" className="form-control" id="numTel"
							   name="numTel" value={this.props.formState.num_tel_principal}
							   onChange={this._changeNumTel}/>
					</div>
					<div className="col-4">
						<label htmlFor="extTel" className="control-label">Extension du téléphone</label>
						<input type="text" className="form-control" id="extTel"
							   name="extTel" value={this.props.formState.ext_tel_principal}
							   onChange={this._changeExtTel}/>
					</div>
					<div className="col-4">
						<label htmlFor="mail" className="control-label">Mail</label>
						<input type="text" className="form-control" id="mail"
							   name="mail" value={this.props.formState.mail}
							   onChange={this._changeMail}/>
					</div>
				</div>
			</div>
		)
	}
}

export default (ContactsComponent)
