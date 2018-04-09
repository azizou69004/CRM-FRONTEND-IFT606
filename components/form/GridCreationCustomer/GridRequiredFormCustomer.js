import React, { Component } from 'react';
import ContactsContainer from "../../../containers/ContactsContainer";

class GridRequiredFormCustomer extends Component {
	constructor(props) {
		super(props);
		this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
		this._changeReleve = this._changeReleve.bind(this);
		this._changeRue = this._changeRue.bind(this);
		this._changeVille = this._changeVille.bind(this);
		this._changeProvince = this._changeProvince.bind(this);
		this._changeCodePostal = this._changeCodePostal.bind(this);
		this._changeTel = this._changeTel.bind(this);
		this._changeExtension = this._changeExtension.bind(this);
		this._changeActivite = this._changeActivite.bind(this);
		this._changeEtat = this._changeEtat.bind(this);
		this._changeProvenance = this._changeProvenance.bind(this);
		this._changeProspect = this._changeProspect.bind(this);
		this._changeNotes = this._changeNotes.bind(this);
	}

	_changeNomEntreprise(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , nomEntreprise: event.target.value});
	}

	_changeReleve(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , releve: event.target.value});
	}

	_changeRue(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , rue: event.target.value});
	}

	_changeVille(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , ville: event.target.value});
	}

	_changeProvince(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , province: event.target.value});
	}

	_changeCodePostal(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , codePostal: event.target.value});
	}

	_changeTel(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , telephone: event.target.value});
	}

	_changeExtension(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , extension: event.target.value});
	}

	_changeActivite(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , activite: event.target.value});
	}

	_changeEtat(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , etat: event.target.value});
	}

	_changeProvenance(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , provenance: event.target.value});
	}

	_changeProspect(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , prospect: event.target.value});
	}

	_changeNotes(event) {
		this.props.changeRequiredFields({...this.props.requiredFields , notes: event.target.value});
	}

	render() {
		return (
			<div>
				<div className="form-group row">
					<div className="col-6">
						<label htmlFor="nomEntreprise" className="control-label">Nom de l'entreprise</label>
						<input type="text" className="form-control" id="nomEntreprise" value={this.props.requiredFields.nomEntreprise}
							   name="nomEntreprise" onChange={this._changeNomEntreprise} required/>
					</div>
					<div className="col-6">
						<label className="control-label " htmlFor="releve">Relevé</label>
						<select className="form-control" id="releve" name="releve"
								onChange={this._changeReleve} value={this.props.requiredFields.releve} required>
							{
								this.props.releves.map(releve => {
									return <option key={releve.idreleve} value={releve.idreleve}>{releve.modeenvoiereleve}</option>
								})
							}
						</select>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-6">
						<label htmlFor="rue" className="control-label">Rue</label>
						<input type="text" className="form-control" id="rue" name="rue"
							   onChange={this._changeRue} value={this.props.requiredFields.rue} required/>
					</div>
					<div className="col-6">
						<label htmlFor="ville" className="control-label">Ville</label>
						<input type="text" className="form-control" id="ville" name="ville"
							   onChange={this._changeVille} value={this.props.requiredFields.ville} required/>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-6">
						<label htmlFor="province" className="control-label">Province</label>
						<input type="text" className="form-control" id="province" name="province"
							   onChange={this._changeProvince} value={this.props.requiredFields.province} required/>
					</div>
					<div className="col-6">
						<label htmlFor="codePostal" className="control-label">Code Postal</label>
						<input type="text" className="form-control" id="codePostal" name="codePostal"
							   onChange={this._changeCodePostal} value={this.props.requiredFields.codePostal} required/>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-6">
						<label htmlFor="telephonePrincipal" className="control-label">Téléphone principal</label>
						<input type="text" className="form-control" id="telephonePrincipal"
							   name="telephonePrincipal" onChange={this._changeTel} value={this.props.requiredFields.telephone} required/>
					</div>
					<div className="col-6">
						<label htmlFor="telephoneExtension" className="control-label">Extension du tél. principal</label>
						<input type="text" className="form-control" id="telephoneExtension"
							   name="telephoneExtension" onChange={this._changeExtension} value={this.props.requiredFields.extension} required/>
					</div>
				</div>


				<div className="form-group">
					<label className="control-label " htmlFor="activite">Activité</label>
					<select className="form-control" id="activite" name="activite"
							onChange={this._changeActivite} value={this.props.requiredFields.activite} required>
						{
							this.props.activites.map(activite => {
								return <option key={activite.idactivite} value={activite.idactivite}>{activite.libelleactivite}</option>
							})
						}
					</select>
				</div>
				<div className="form-group">
					<label className="control-label " htmlFor="etat">Etat</label>
					<select className="form-control" id="etat" name="etat"
							onChange={this._changeEtat} value={this.props.requiredFields.etat} required>
						{
							this.props.etats.map(etat => {
								return <option key={etat.idetat} value={etat.idetat}>{etat.libelleetat}</option>
							})
						}
					</select>
				</div>
				<div className="form-group">
					<label className="control-label " htmlFor="provenance">Provenance</label>
					<select className="form-control" id="provenance" name="provenance"
							onChange={this._changeProvenance} value={this.props.requiredFields.provenance} required>
						{
							this.props.provenances.map(provenance => {
								return <option key={provenance.idprovenance} value={provenance.idprovenance}>{provenance.libelleprovenance}</option>
							})
						}
					</select>
				</div>
				<div className="form-group">
					<label className="control-label " htmlFor="prospect">Prospect</label>
					<select className="form-control" id="prospect" name="prospect"
							onChange={this._changeProspect} value={this.props.requiredFields.prospect} required>
						<option value={true}>Vrai</option>
						<option value={false}>Faux</option>

					</select>
				</div>
				<div className="form-group">
					<label htmlFor="notes" className="control-label">Notes</label>
					<textarea className="form-control" id="notes" name="notes"
							  onChange={this._changeNotes} value={this.props.requiredFields.notes} required/>
				</div>
				<ContactsContainer/>
			</div>
		);
	}
}

export default GridRequiredFormCustomer;
