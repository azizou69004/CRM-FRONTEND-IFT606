import React, {Component} from 'react';
import RechercheComponent from "./RechercheComponent";
import {connect} from 'react-redux';
import {
	changeFormColl, searchRequestColl,
	sendingRequestColl
} from '../actions/crmRechercheCollective';
import ClientListContainer from "../containers/ClientListContainer";
import {changeLoading} from "../actions/crmDashboard";
import LoadingAnimation from "./LoadingAnimation";


class PageCollectivesClients extends Component {

	constructor(props) {
		super(props);
		this.props.sendingRequestColl();
	}

	render() {
		let {formState, dossiersState} = this.props.crmRechercheCollective;
		let {loading} = this.props.crmDashboard;
		return (
			<div className="container-fluid text-center">
				<h1>Assurances collectives</h1>
				<h2>Clients</h2>
				{
					loading && <LoadingAnimation/>

				}
				{
					!loading &&
					<div>
						<ClientListContainer dossiersState={dossiersState} changeLoading={this.props.changeLoading}
											 handleClick={this.props.handleClick}/>
						<RechercheComponent
							onSubmit={this.props.searchRequestColl}
							formState={formState}
							changeFormColl={this.props.changeFormColl}/>
						<button onClick={this.props.handleClick} className="newCustomer" id="createNewCx">Créer une fiche client</button>
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmRechercheCollective: state.crmRechercheCollective,
		crmDashboard: state.crmDashboard
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {

	return {
		searchRequestColl: (formData) => {
			dispatch(searchRequestColl(formData))
		},
		changeFormColl: (newFormState) => {
			dispatch(changeFormColl(newFormState))
		},
		sendingRequestColl: () => {
			dispatch(sendingRequestColl())
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading))
		}
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(PageCollectivesClients);
