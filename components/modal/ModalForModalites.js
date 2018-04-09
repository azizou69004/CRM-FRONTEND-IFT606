import React from 'react';
import {connect} from "react-redux";
import {changeFormContract} from "../../actions/crmContract";

class ModalForModalites extends React.Component {

	_handleChangeNotes(mod, event) {
		let modules = this.props.crmContract.formState.contrat.modulesChoisis;
		let formState = this.props.crmContract.formState;
		modules.forEach((module, index) => {
			module.modalites.forEach((modalite, index2) => {
				if(mod.idModalite === modalite.idModalite) {
					formState.contrat.modulesChoisis[index].modalites[index2].souscription_notes = event.target.value;
				}
			});
		});
		this.props.changeFormContract(formState);

	}

	render() {
		let modules = this.props.crmContract.formState.contrat.modulesChoisis;
		return (
			<div>
				{
					modules.map(module => {
						return module.modalites.map(modalite => {
							return <div className="modal fade" id={modalite.idModalite + "modalite"}
										key={modalite.idModalite + "modalite"}
										tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title" id="myModalLabel">Notes de la modalité</h4>
											<button type="button" className="close" data-dismiss="modal"
													aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<div className="form-group">
												<textarea className="form-control"
														  value={modalite.souscription_notes}
														  onChange={this._handleChangeNotes.bind(this, modalite)}/>
											</div>
										</div>
									</div>
								</div>
							</div>
						})
					})
				}
			</div>

		);
	}
}

function mapStateToProps(state) {

	return {
		crmContract: state.crmContract,
		crmRechercheCollective: state.crmRechercheCollective,
		crmClientList: state.crmClientList,
		crmLogin: state.crmLogin
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeFormContract: (newForm) => {
			dispatch(changeFormContract(newForm));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalForModalites);
