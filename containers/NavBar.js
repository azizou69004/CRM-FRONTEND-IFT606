import React, {Component} from 'react';
import {changeLoading, changeViewDashboard} from "../actions/crmDashboard";
import {connect} from "react-redux";
import NavBarLink from "../components/NavBarLink";
import {logout} from "../actions/crmLogin";
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {changeViewUserManagement, requestUserById} from "../actions/crmUserManagement";
import {changeViewContract, getContract, setFromClient} from "../actions/crmContract";
import '../style/NavBar.css';
import {addSubContractNav, addSubCustomerNav, addSubSupplierNav, addSubUserNav} from "../actions/crmNavBar";
import {getClientRequest} from "../actions/crmClientList";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";
import {getSupplier} from "../actions/crmGridLayoutSuppliers";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this._deleteSubUser = this._deleteSubUser.bind(this);
		this._deleteSubCustomer = this._deleteSubCustomer.bind(this);
		this._deleteSubSupplier = this._deleteSubSupplier.bind(this);
		this._deleteSubContract = this._deleteSubContract.bind(this);
	}

	_deleteSubUser(idUser) {
		let links = this.props.crmNavBar.linksSubUser.filter(link => {
			return link.idUser !== idUser;
		});
		this.props.deleteSubUserNav(links, "");
	}

	_deleteSubCustomer(idCustomer) {
		let links = this.props.crmNavBar.linksSubCustomer.filter(link => {
			return link.idCustomer !== idCustomer;
		});
		this.props.deleteSubCustomerNav(links, "customers");
	}

	_deleteSubSupplier(idSupplier) {
		let links = this.props.crmNavBar.linksSubSupplier.filter(link => {
			return link.idSupplier !== idSupplier;
		});
		this.props.deleteSubSupplierNav(links, "");
	}

	_deleteSubContract(idContract) {
		let links = this.props.crmNavBar.linksSubContract.filter(link => {
			return link.idContract !== idContract;
		});
		this.props.deleteSubContractNav(links, "collContract");
	}

	render() {
		return (
			<div>
				<div className="nav-side-menu">
					<div className="brand">AFC inc.</div>
					<i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"/>
					<div className="menu-list">
						<ul id="menu-content" className="menu-content collapse out">
							<li>
								<NavBarLink name="Accueil" id="Home" handleClick={this.props.changeViewDashboard}
											view={this.props.view}/>
							</li>
							<li>
								<NavBarLink name="Assurances Individuelles" id="indIns"
											handleClick={this.props.changeViewDashboard} view={this.props.view}/>
							</li>
							<li>
								<NavBarLink name="Assurances Collectives" id="collIns"
											handleClick={this.props.changeViewDashboard} view={this.props.view}
											resetView={this.props.changeViewCollective} reset=""/>
							</li>
							{
								this.props.crmNavBar.displaySubCustomer === true
								&& this.props.crmNavBar.linksSubCustomer.map(link => {
									return <ul id="subCustomer" key={"subCustomerMenu" + link.idCustomer}>
										<li><NavBarLink name={link.name} id="collIns"
														handleClick={this.props.changeViewDashboard}
														view={this.props.view}
														resetView={this.props.changeViewCollective}
														reset={link.view} displayUser={this.props.getClientRequest}
														changeLoading={this.props.changeLoading}
														idCustomer={link.idCustomer} menu="subMenu"
														deleteSub={this._deleteSubCustomer}/>
										</li>
									</ul>
								})
							}
							<li>
								<NavBarLink name="Contrats" id="contracts"
											handleClick={this.props.changeViewDashboard} view={this.props.view}
											resetView={this.props.changeViewContract} reset=""
											resetState={this.props.setFromClient} resetFor="contract"
								/>
							</li>
							{
								this.props.crmNavBar.displaySubContract === true
								&& this.props.crmNavBar.linksSubContract.map(link => {
									return <ul id="subContract" key={"subContractMenu" + link.idContract}>
										<li><NavBarLink name={link.name} id="contracts"
														handleClick={this.props.changeViewDashboard}
														view={this.props.view}
														resetView={this.props.changeViewContract}
														reset={link.view} displayUser={this.props.getContract}
														changeLoading={this.props.changeLoading}
														idContract={link.idContract} menu="subMenu"
														deleteSub={this._deleteSubContract}/>
										</li>
									</ul>
								})
							}
							<li>
								<NavBarLink name="Placements" id="placements"
											handleClick={this.props.changeViewDashboard} view={this.props.view}/>
							</li>
							<li>
								<NavBarLink name="Fournisseurs" id="suppliers"
											handleClick={this.props.changeViewDashboard} view={this.props.view}
											resetView={this.props.changeViewSuppliers} reset=''/>
							</li>
							{
								this.props.crmNavBar.displaySubSupplier === true
								&& this.props.crmNavBar.linksSubSupplier.map(link => {
									return <ul id="subSupplier" key={"subSupplierMenu" + link.idSupplier}>
										<li><NavBarLink name={link.name} id="suppliers"
														handleClick={this.props.changeViewDashboard}
														view={this.props.view}
														resetView={this.props.changeViewSuppliers}
														reset={link.view} displayUser={this.props.getSupplier}
														changeLoading={this.props.changeLoading}
														idSupplier={link.idSupplier} menu="subMenu"
														deleteSub={this._deleteSubSupplier}/>
										</li>
									</ul>
								})
							}

							{
								this.props.crmLogin.isAdmin === true
								&& <li><NavBarLink name="Gestion des utilisateurs" id="usersManagement"
												   handleClick={this.props.changeViewDashboard} view={this.props.view}
												   resetView={this.props.changeViewUserManagement} reset=""/></li>
							}

							{
								this.props.crmLogin.isAdmin === true
								&& this.props.crmNavBar.displaySubUser === true
								&& this.props.crmNavBar.linksSubUser.map(link => {
									return <ul id="subUser" key={"subUserMenu" + link.idUser}>
										<li><NavBarLink name={link.name} id="usersManagement"
														handleClick={this.props.changeViewDashboard}
														view={this.props.view}
														resetView={this.props.changeViewUserManagement}
														reset={link.view} displayUser={this.props.requestUserById}
														changeLoading={this.props.changeLoading}
														idUser={link.idUser} menu="subMenu"
														deleteSub={this._deleteSubUser}/>
										</li>
									</ul>
								})
							}

							<li>
								<div id="logout" onClick={this.props.logout} className="link text-center">Déconnexion
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmLogin: state.crmLogin,
		crmNavBar: state.crmNavBar
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		changeViewContract: (newView) => {
			dispatch(changeViewContract(newView));
		},
		changeViewDashboard: (newView) => {
			dispatch(changeViewDashboard(newView));
		},
		logout: () => {
			dispatch(logout());
		},
		changeViewCollective: (newView) => {
			dispatch(changeViewCollective(newView));
		},
		changeViewUserManagement: (newView) => {
			dispatch(changeViewUserManagement(newView));
		},
		requestUserById: (id) => {
			dispatch(requestUserById(id));
		},
		addSubUserNav: (newSubUser) => {
			dispatch(addSubUserNav(newSubUser));
		},
		deleteSubUserNav: (newSubUser, newView) => {
			dispatch(addSubUserNav(newSubUser));
			dispatch(changeViewUserManagement(newView));
		},
		getClientRequest: (idClient) => {
			dispatch(getClientRequest(idClient));
		},
		addSubCustomerNav: (newSubCustomer) => {
			dispatch(addSubCustomerNav(newSubCustomer));
		},
		deleteSubCustomerNav: (newSubCustomer, newView) => {
			dispatch(addSubCustomerNav(newSubCustomer));
			dispatch(changeViewCollective(newView));
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading));
		},
		changeViewSuppliers: (newView) => {
			dispatch(changeViewSuppliers(newView));
		},
		deleteSubSupplierNav: (newSubSupplier, newView) => {
			dispatch(addSubSupplierNav(newSubSupplier));
			dispatch(changeViewSuppliers(newView));
		},
		getSupplier: (id) => {
			dispatch(getSupplier(id));
			dispatch(changeViewSuppliers("supplierFile"));
		},
		setFromClient: (fromClient) => {
			dispatch(setFromClient(fromClient));
		},
		getContract: (id) => {
			dispatch(getContract(id));
		},
		deleteSubContractNav: (newSubContract, newView) => {
			dispatch(addSubContractNav(newSubContract));
			dispatch(changeViewContract(newView));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
