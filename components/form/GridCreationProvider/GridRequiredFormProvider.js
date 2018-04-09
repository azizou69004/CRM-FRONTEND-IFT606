import React, { Component } from 'react';
import ContactsContainer from "../../../containers/ContactsContainer";

class GridRequiredFormProvider extends Component {
	constructor(props) {
		super(props);
		this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
		this._changeRue = this._changeRue.bind(this);
		this._changeVille = this._changeVille.bind(this);
		this._changeProvince = this._changeProvince.bind(this);
		this._changeCodePostal = this._changeCodePostal.bind(this);
		this._changeTel = this._changeTel.bind(this);
		this._changeExtension = this._changeExtension.bind(this);
		this._changeCode = this._changeCode.bind(this);
		this._changeLilGroup = this._changeLilGroup.bind(this);
		this._changeBilGroup = this._changeBilGroup.bind(this);
		this._changeEmployesLilGroup = this._changeEmployesLilGroup.bind(this);
		this._changeEmployesBigGroup = this._changeEmployesBigGroup.bind(this);
	}

	_changeNomEntreprise(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , nomEntreprise: event.target.value});
	}

	_changeRue(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , rue: event.target.value});
	}

	_changeVille(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , ville: event.target.value});
	}

	_changeProvince(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , province: event.target.value});
	}

	_changeCodePostal(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , codePostal: event.target.value});
	}

	_changeTel(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , telephone: event.target.value});
	}

	_changeExtension(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , extension: event.target.value});
	}

	_changeCode(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , code: event.target.value});
	}

	_changeLilGroup(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , lilGroup: event.target.value});
	}

	_changeBilGroup(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , bilGroup: event.target.value});
	}

	_changeEmployesLilGroup(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , employesLilGroup: event.target.value});
	}

	_changeEmployesBigGroup(event) {
		this.props.changeRequiredSup({...this.props.requiredFields , employesBigGroup: event.target.value});
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
				<div className="form-group row">
					<div className="col-6">
						<label htmlFor="code" className="control-label">Code</label>
						<input type="text" className="form-control" id="code"
							   name="code" onChange={this._changeCode} value={this.props.requiredFields.code} required/>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-6">
						<label htmlFor="lilGroup" className="control-label">Petits groupes</label>
						<select className="form-control" id="lilGroup" name="lilGroup"
								value={this.props.requiredFields.lilGroup} onChange={this._changeLilGroup} required>
							<option value={true}>Oui</option>
							<option value={false}>Non</option>
						</select>
					</div>
					<div className="col-6">
						<label htmlFor="employesLilGroup" className="control-label">Nombre d'employés pour petits groupes</label>
						<input type="text" className="form-control" id="employesLilGroup"
							   name="employesLilGroup" value={this.props.requiredFields.employesLilGroup} onChange={this._changeEmployesLilGroup} required/>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-6">
						<label htmlFor="bigGroup" className="control-label">Grands groupes</label>
						<select className="form-control" id="bigGroup" name="bigGroup"
								required value={this.props.requiredFields.bigGroup} onChange={this._changeBilGroup}>
							<option value={true}>Oui</option>
							<option value={false}>Non</option>
						</select>
					</div>
					<div className="col-6">
						<label htmlFor="employesBigGroup" className="control-label">Nombre d'employés pour grands groupes</label>
						<input type="text" className="form-control" id="employesBigGroup"
							   name="employesBigGroup" value={this.props.requiredFields.employesBigGroup} onChange={this._changeEmployesBigGroup} required/>
					</div>
				</div>
				<ContactsContainer/>
			</div>
		);
	}
}

export default GridRequiredFormProvider;
