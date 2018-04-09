import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";
import ContractFile from "../components/ContractFile";
import {changeLoading, changeViewDashboard} from "../actions/crmDashboard";
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {changeViewContract, setFromClient} from "../actions/crmContract";
import {getClientRequest} from "../actions/crmClientList";
import {getSupplier} from "../actions/crmGridLayoutSuppliers";
import {
	addSubCustomerNav, addSubSupplierNav, displaySubCustomerNav,
	displaySubSupplierNav
} from "../actions/crmNavBar";

class ContractPage extends Component {

	render() {
		let {contractDisplay, lilLayout} = this.props.crmContract;
		let {linksSubSupplier, linksSubCustomer} = this.props.crmNavBar;
		let {dossiersState} = this.props.crmRechercheCollective;
		return (
			<div>
				{
					Object.keys(contractDisplay).length !== 0 &&
					<ContractFile contract={contractDisplay}
								  linksSubSupplier={linksSubSupplier}
								  linksSubCustomer={linksSubCustomer}
								  lilLayout={lilLayout}
								  clients={dossiersState}
								  setFromClient={this.props.setFromClient}
								  changeViewContract={this.props.changeViewContract}
								  changeViewCollective={this.props.changeViewCollective}
								  changeViewDashboard={this.props.changeViewDashboard}
								  changeLoading={this.props.changeLoading}
								  getClientRequest={this.props.getClientRequest}
								  changeViewSuppliers={this.props.changeViewSuppliers}
								  getSupplier={this.props.getSupplier}
								  addSubSupplierNav={this.props.addSubSupplierNav}
								  displaySubSupplierNav={this.props.displaySubSupplierNav}
								  addSubCustomerNav={this.props.addSubCustomerNav}
								  displaySubCustomerNav={this.props.displaySubCustomerNav}
					/>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard,
		crmGridSuppliersLayout: state.crmGridSuppliersLayout,
		crmContacts: state.crmContacts,
		crmContract: state.crmContract,
		crmNavBar: state.crmNavBar,
		crmRechercheCollective: state.crmRechercheCollective
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewContract: (newView) => {
			dispatch(changeViewContract(newView));
		},
		changeViewSuppliers: (newView) => {
			dispatch(changeViewSuppliers(newView));
		},
		changeViewDashboard: (newView) => {
			dispatch(changeViewDashboard(newView));
		},
		changeViewCollective: (newView) => {
			dispatch(changeViewCollective(newView));
		},
		getClientRequest: (id) => {
			dispatch(getClientRequest(id));
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading));
		},
		getSupplier: (id) => {
			dispatch(getSupplier(id));
		},
		addSubSupplierNav: (links) => {
			dispatch(addSubSupplierNav(links));
		},
		displaySubSupplierNav: (display) => {
			dispatch(displaySubSupplierNav(display));
		},
		addSubCustomerNav: (links) => {
			dispatch(addSubCustomerNav(links));
		},
		displaySubCustomerNav: (display) => {
			dispatch(displaySubCustomerNav(display));
		},
		setFromClient(client) {
			dispatch(setFromClient(client));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractPage);
