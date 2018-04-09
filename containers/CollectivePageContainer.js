import React, {Component} from 'react';
import {connect} from 'react-redux'
import PageCollectivesClients from '../components/PageCollectivesClients';
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import CreationClient from "./GridContainer";
import PageClient from "./PageClient";
import {changeViewDashboard} from "../actions/crmDashboard";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";

class CollectivePageContainer extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		this.props.changeViewCollective(event.currentTarget.className);
	}

	handleClick2(event) {
		event.preventDefault();
		this.props.changeViewDashboard(event.target.className);
		this.props.changeViewSuppliers("");
	}

	render() {
		let {view} = this.props.crmCollectiveContainer;
		return (
			<div className="text-center">
				{
					view === "" && <h1>Assurances collectives</h1>
				}
				{
					view === "" && <button onClick={this.handleClick} className="customers">Clients</button>
				}
				{
					view === "" && <button onClick={this.handleClick2} className="suppliers">Fournisseurs</button>
				}
				{
					view === "customers" &&
					<PageCollectivesClients handleClick={this.handleClick}/>
				}
				{
					view === "newCustomer" && <CreationClient view="newCustomer"/>
				}
				{
					view === "customerFile" && <CreationClient view="customerFile"/>
				}
				{
					view==="customer" && <PageClient handleClick={this.props.changeViewCollective}/>
				}
			</div>

		);
	}
}

function mapStateToProps(state) {

	return {
		crmCollectiveContainer: state.crmCollectiveContainer
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewCollective: (newView) => {
			dispatch(changeViewCollective(newView))
		},
		changeViewDashboard: (newView) => {
			dispatch(changeViewDashboard(newView))
		},
		changeViewSuppliers: (newView) => {
			dispatch(changeViewSuppliers(newView))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectivePageContainer)
