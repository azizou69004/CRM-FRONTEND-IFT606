import React, {Component} from 'react';
import {connect} from "react-redux";
import AccueilPageContainer from "./AccueilPageContainer";
import NavBar from "./NavBar";
import SuppliersPageContainer from "./SuppliersPageContainer";
import ErrorPage from "../components/ErrorPage";
import GestionUser from './GestionUser';
import ContractsContainer from "./ContractsContainer";
import '../style/Dashboard.css'
import CollectivePageContainer from "./CollectivePageContainer";

class DashboardContainer extends Component {

	render() {
		let {view} = this.props.crmDashboard;
		let {isAdmin} = this.props.crmLogin;

		return (
			<div id="Dashboard">

				<NavBar view={view}/>
				<div className="view container" id="main">
					{
						view === "Home" && <AccueilPageContainer/>
					}
					{
						view === "collIns" && <CollectivePageContainer/>
					}
					{
                        view === "suppliers" && <SuppliersPageContainer />
					}
					{
						view === "usersManagement" && isAdmin === true &&
						<GestionUser/>
					}
					{
						view === "contracts" && <ContractsContainer />
					}
					{
						view === "indIns" && <ErrorPage/>
					}
					{
						view === "placements" && <ErrorPage/>
					}

				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmDashboard: state.crmDashboard,
		crmLogin: state.crmLogin
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
