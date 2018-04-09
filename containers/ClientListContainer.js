import React, {Component} from 'react';
import DossiersComponent from "../components/DossiersComponent";
import {getClientRequest} from "../actions/crmClientList";
import '../style/PageAccueil.css';
import {connect} from "react-redux";
import {addSubCustomerNav, displaySubCustomerNav} from "../actions/crmNavBar";
import {changeLoading} from "../actions/crmDashboard";

class ClientListContainer extends Component {

	constructor(props) {
		super(props);

		this.handleClick0 = this.handleClick0.bind(this);
		this.handleClick1 = this.handleClick1.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.handleClick3 = this.handleClick3.bind(this);
		this.handleClick4 = this.handleClick4.bind(this);
		this.handleClick5 = this.handleClick5.bind(this);
		this.handleClick6 = this.handleClick6.bind(this);
		this._handleClientClick = this._handleClientClick.bind(this);
		//this.props.changeLoading(true);
	}

	_handleClientClick(client, event) {
		this.props.getClientRequest(client.id);
		this.props.handleClick(event);
	}

	handleClick0() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this._handleClick(0, table);
	}

	handleClick1() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this._handleClick(1, table);
	}

	handleClick2() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this._handleClick(2, table);
	}

	handleClick3() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this._handleClick(3, table);
	}

	handleClick4() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this._handleClick(4, table);
	}

	handleClick5() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this._handleClick(5, table);
	}

	handleClick6() {
		var table = document.getElementById("PageCollectivesClientsTable");
		this._handleClick(6, table);
	}

	_handleClick(n, table) {
		var /*table, */rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//    	  table = document.getElementById("PageCollectivesClientsTable");
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName("TR");
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("TD")[n];
				y = rows[i + 1].getElementsByTagName("TD")[n];
				if (dir === "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (dir === "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount === 0 && dir === "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}

	render() {
		let {linksSubCustomer} = this.props.crmNavBar;
		this.table = (
			<div id="print-content" style={{overflow: 'auto', height: '450px', width: 'auto'}}>
				<table id="PageCollectivesClientsTable" className="table"  >
					<thead >
					<tr >
						<th onClick={this.handleClick0} style={{width: 'auto'}}>Nom du groupe</th>
						<th onClick={this.handleClick1} style={{width: 'auto'}}>Décideur</th>
						<th onClick={this.handleClick2} style={{width: 'auto'}}>Statut</th>
						<th onClick={this.handleClick3} style={{width: 'auto'}} >Prospect</th>
						<th onClick={this.handleClick4} style={{width: 'auto'}}>Mois de renouvellement</th>
						<th onClick={this.handleClick5} style={{width: 'auto'}}>No police</th>
						<th onClick={this.handleClick6} style={{width: 'auto'}}>Assureur</th>
					</tr>
					</thead>
					<DossiersComponent collective={this.props.dossiersState}
									   handleClick={this._handleClientClick}
									   displaySub={this.props.displaySubCustomerNav}
									   addSub={this.props.addSubCustomerNav}
									   links={linksSubCustomer}
									   changeLoading={this.props.changeLoading}/>
				</table>
			</div>
		);
		return this.table;
	}
}

function mapStateToProps(state) {

	return {
		crmClientList: state.crmClientList,
		crmNavBar: state.crmNavBar
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getClientRequest: (idClient) => {
			dispatch(getClientRequest(idClient));
		},
		displaySubCustomerNav: (display) => {
			dispatch(displaySubCustomerNav(display));
		},
		addSubCustomerNav: (newSubCustomer) => {
			dispatch(addSubCustomerNav(newSubCustomer))
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientListContainer)
