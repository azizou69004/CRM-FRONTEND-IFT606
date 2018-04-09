import React, { Component } from 'react';

class GridMethodOnFieldProvider extends Component {
	constructor(props) {
		super(props);
		this._changeDescription = this._changeDescription.bind(this);
		this._changeLabel = this._changeLabel.bind(this);
		this._changeType = this._changeType.bind(this);
		this._deleteField = this._deleteField.bind(this);
		this._changeNameModifyField = this._changeNameModifyField.bind(this);
		this._changeDescModifyField = this._changeDescModifyField.bind(this);
		this._changeIdModifyField = this._changeIdModifyField.bind(this);
	}

	_changeNameModifyField(event) {
		this.props.changeUpdateField({...this.props.formUpdateField , nameField: event.target.value});
	}

	_changeDescModifyField(event) {
		this.props.changeUpdateField({...this.props.formUpdateField , descField: event.target.value});
	}

	_changeIdModifyField(event) {
		this.props.changeUpdateField({...this.props.formUpdateField , id: event.target.value});
	}

	_changeDescription(event) {
		this.props.changeNewField({...this.props.formNewField , description: event.target.value});
	}

	_changeLabel(event) {
		this.props.changeNewField({...this.props.formNewField , label: event.target.value});
	}

	_changeType(event) {
		this.props.changeNewField({...this.props.formNewField , type: event.target.value});
	}

	_deleteField(event) {
		this.props.deleteField(event.target.value);
	}

	render() {
		return (
			<div>
				{
					this.props.grid.map(element => {
						return (
							<div className="modal fade" id={element.idattrfournisseur+"modal"} key={element.idattrfournisseur+"modal"}
								 tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title" id="myModalLabel">Modification du champ : {element.label}</h4>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<form onSubmit={this.props.handleModifyField}>
												<div className="form-group">
													<label htmlFor="modificationNomChamp" className="control-label">Nouveau titre du champ</label>
													<input type="text" className="form-control" id="modificationNomChamp"
														   name="modificationNomChamp" onChange={this._changeNameModifyField}
														   value={this.props.formUpdateField.nameField} required/>
												</div>
												<div className="form-group">
													<label htmlFor="modificationDescChamp" className="control-label">Nouvelle description du champ</label>
													<input type="text" className="form-control" id="modificationDescChamp"
														   name="modificationDescChamp" onChange={this._changeDescModifyField}
														   value={this.props.formUpdateField.descField} required/>
												</div>
												<button type="button" className="btn btn-danger" data-dismiss="modal"
														value={element.idattrfournisseur} onClick={this._deleteField}>Supprimer le champ</button>
												<button type="submit" className="btn btn-primary"
														value={element.idattrfournisseur} onClick={this._changeIdModifyField}>Modifier le champ</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						);
					})
				}
				<div className="form-group">
					<button onClick={this.props.handleStatic}>Ancrer les champs</button>
					<button onClick={this.props.handleNonStatic}>Changer la position des boutons</button>
				</div>

				<hr/>
				<form onSubmit={this.props.handleSubmitChamp} className="col-4 offset-4">
					<div className="form-group">
						<label htmlFor="champNom" style={{fontSize: 13}} className="control-label">Nom du nouveau champ </label>
						<input type="text" name="champNom" id="champNom"
							   className="form-control" onChange={this._changeLabel}
							   value={this.props.formNewField.label} required/>
					</div>
					<div className="form-group">
						<label htmlFor="champDescription" style={{fontSize: 13}} className="control-label">Description du nouveau champ </label>
						<input type="text" name="champDescription" id="champDescription"
							   className="form-control" onChange={this._changeDescription}
							   value={this.props.formNewField.description} required/>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="champType">Type du nouveau champ</label>
						<select className="form-control" id="champType" name="champType"
								onChange={this._changeType} value={this.props.formNewField.type} required>
							{
								this.props.champTypes.map(type => {
									return <option key={type.idtype} value={type.idtype}>{type.libelletype}</option>
								})
							}
						</select>
					</div>
					<div className="form-group">
						<input type="submit" value="Créer un nouveau champ" className="btn btn-primary"/>
					</div>
				</form>
			</div>
		);
	}
}

export default GridMethodOnFieldProvider;
