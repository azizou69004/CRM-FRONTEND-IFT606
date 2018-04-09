import React from 'react';
import SuggestionClients from "./SuggestionClients";

class ContractClientPart extends React.Component {
	constructor(props) {
		super(props);
		this._onChangeRepresentant = this._onChangeRepresentant.bind(this);
		this._sousGroupe = this._sousGroupe.bind(this);
		this._nombreEmployes = this._nombreEmployes.bind(this);
		this._filterClients = this._filterClients.bind(this);

		if(this.props.fromClient.idClient && !this.props.fromClient.update) {
			this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, idClient:this.props.fromClient.idClient}});
		}
	}

	_onChangeRepresentant(event) {
		this.props.changeForm({
			...this.props.formState,
			contrat: {...this.props.formState.contrat, idRepresentant: event.target.value}
		});
	}

	_sousGroupe() {
		let duplicate = false;
		if (this.props.client.facultatif.length === 0) {
			return <input
				type="textField"
				className="form-control col-sm-8"
				placeholder="Sous groupe"
				id="sousGroupe"
				disabled
			/>
		}
		else {
			let input = '';
			this.props.client.facultatif.forEach(champ => {
				if (champ.nom === 'Sous-groupe' && champ.valeur !== '' && !duplicate) {
					duplicate = true;
					input =  <input key={champ.idRow}
								  type="textField"
								  className="form-control col-sm-8"
								  value={champ.valeur}
								  id="sousGroupe"
								  disabled
					/>
				}
				else if (champ.nom === 'Sous-groupe' && champ.valeur === '' && !duplicate) {
					duplicate = true;
					input = <input key={champ.idRow}
								  type="textField"
								  className="form-control col-sm-8"
								  value="Le client n'a pas de sous-groupe"
								  id="sousGroupe"
								  disabled
					/>
				}
			});
			return input;
		}

	}

	_nombreEmployes() {
		let duplicate = false;
		if (this.props.client.facultatif.length === 0) {
			return <input
				type="textField"
				className="form-control col-sm-8"
				placeholder="Nombre d'employés"
				id="nbEmployes"
				disabled
			/>
		}
		else {
			let input = '';
			this.props.client.facultatif.forEach(champ => {
				if (champ.nom === 'Nombre d\'employés' && champ.valeur !== '' && !duplicate) {
					duplicate = true;
					return <input key={champ.idRow}
								  type="textField"
								  className="form-control col-sm-8"
								  value={champ.valeur}
								  id="nbEmployes"
								  disabled
					/>
				}
				else if (champ.nom === 'Nombre d\'employés' && champ.valeur === '' && !duplicate) {
					duplicate = true;
					return <input key={champ.idRow}
								  type="textField"
								  className="form-control col-sm-8"
								  value="Le nombre d'employés n'est pas précisé"
								  id="nbEmployes"
								  disabled
					/>
				}
			});
			return input;
		}

	}

	_filterClients() {
		return this.props.clients.filter( (element, index) => {
			let duplicate = false;
			this.props.clients.forEach((element2, index2)=> {
				if(element.id === element2.id && index > index2) {
					duplicate = true;
				}
			});
			return !duplicate;
		});
	}

	render() {
		return <div>
			<h4>Informations sur le client</h4>
			<div className="form-group row">
				<label id="nomClientLabel" className="col-sm-3 col-form-label">Nom client</label>
				{
					!this.props.fromClient.idClient &&
					<SuggestionClients clients={this._filterClients()}
									   getClient={this.props.getClient}
									   changeForm={this.props.changeForm}
									   formState={this.props.formState}
					/>
				}
				{
					this.props.fromClient.idClient && this.props.fromClient.update &&
					<SuggestionClients clients={this._filterClients()}
									   getClient={this.props.getClient}
									   client={this.props.fromClient}
									   changeForm={this.props.changeForm}
									   formState={this.props.formState}
					/>
				}
				{
					this.props.fromClient.idClient && !this.props.fromClient.update &&
					<input type="textField"
						   className="form-control col-sm-8"
						   value={this.props.fromClient.name}
						   id="nomClient"
						   disabled
					/>
				}

			</div>
			<div className="form-group row">
				<label id="sousGroupeLabel" className="col-sm-3 col-form-label">Sous groupe</label>
				{
					!this.props.fromClient.idClient && this._sousGroupe()
				}
				{
					this.props.fromClient.idClient && this.props.fromClient.update && this._sousGroupe()
				}
				{
					this.props.fromClient.idClient && !this.props.fromClient.update &&
					<input type="textField"
						   className="form-control col-sm-8"
						   value={this.props.fromClient.sousGroupe}
						   id="sousGroupe"
						   disabled
					/>
				}
			</div>
			<div className="form-group row">
				<label id="nbEmployesLabel" className="col-sm-3 col-form-label">Nombre d'employés</label>
				{
					!this.props.fromClient.idClient && this._nombreEmployes()
				}
				{
					this.props.fromClient.idClient && this.props.fromClient.update && this._nombreEmployes()
				}
				{
					this.props.fromClient.idClient && !this.props.fromClient.update &&
					<input type="textField"
						   className="form-control col-sm-8"
						   value={this.props.fromClient.nombreEmployes}
						   id="nbEmployes"
						   disabled
					/>
				}
			</div>
			<div className="form-group row">
				<label id="representantLabel" className="col-sm-3 col-form-label">Représentant (chez AFC)</label>
				<select
					id="representant"
					name="representant"
					className="form-control col-sm-8"
					value={this.props.formState.contrat.idRepresentant}
					onChange={this._onChangeRepresentant}
				>
					<option disabled value=""> -- Veuillez sélectionner une valeur --</option>
					{
						this.props.formState.employesAFC.map((employe, index) => {
							return <option key={index} value={employe.idemploye}>{employe.prenom} {employe.nom}</option>
						})
					}
				</select>
			</div>
		</div>;
	}
}

export default (ContractClientPart);
