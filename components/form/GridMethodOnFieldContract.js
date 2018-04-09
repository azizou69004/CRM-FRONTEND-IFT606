import React, { Component } from 'react';

class GridMethodOnFieldContract extends Component {
	constructor(props) {
		super(props);
		this._changeDescription = this._changeDescription.bind(this);
		this._changeName = this._changeName.bind(this);
		this._changeType = this._changeType.bind(this);
		this._deleteField = this._deleteField.bind(this);
	}

	_changeDescription(event) {
		this.props.changeNewField({...this.props.newField , description: event.target.value});
	}

	_changeName(event) {
		this.props.changeNewField({...this.props.newField , name: event.target.value});
	}

	_changeType(event) {
		this.props.changeNewField({...this.props.newField , type: event.target.value});
	}

	_deleteField(event) {
		this.props.deleteField(event.target.value);
	}

	render() {
		return (
			<div>
				<hr/>
				<form onSubmit={this.props.handleSubmitChamp} className="col-4 offset-4">
					<div className="form-group">
						<label htmlFor="champNom" style={{fontSize: 13}} className="control-label">Nom du nouveau champ </label>
						<input type="text" name="champNom" id="champNom"
							   className="form-control" onChange={this._changeName}
							   value={this.props.newField.name} required/>
					</div>
					<div className="form-group">
						<label htmlFor="champDescription" style={{fontSize: 13}} className="control-label">Description du nouveau champ </label>
						<input type="text" name="champDescription" id="champDescription"
							   className="form-control" onChange={this._changeDescription}
							   value={this.props.newField.description} required/>
					</div>
					<div className="form-group">
						<label className="control-label " htmlFor="champType">Type du nouveau champ</label>
						<select className="form-control" id="champType" name="champType"
								onChange={this._changeType} value={this.props.newField.type} required>
							{
								this.props.types.map(type => {
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

export default GridMethodOnFieldContract;
