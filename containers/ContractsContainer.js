import React from 'react';
import {changeSearchContracts, changeViewContract, getContract, getListContracts} from "../actions/crmContract";
import CreateContractContainer from './CreateContractContainer';
import {connect} from "react-redux";
import ListContractsComponent from "../components/ListContractsComponent";
import {changeLoading} from "../actions/crmDashboard";
import ContractPage from "./ContractPage";
import {addSubContractNav, displaySubContractNav} from "../actions/crmNavBar";

class ContractsContainer extends React.Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
		this.props.getListContracts();
	}

	_handleClick(event) {
		this.props.changeViewContract(event.target.value);
	}

	render() {
		let {view, listContracts, searchContracts} = this.props.crmContract;
		let {loading} = this.props.crmDashboard;
		let {linksSubContract} = this.props.crmNavBar;
		return <div className="text-center">
			{
				view === "" && <h1>Contrats</h1>
			}
			{
				view === "" &&
				<button onClick={this._handleClick} className="customers" value="">Contrats individuels</button>
			}
			{
				view === "" && <button onClick={this._handleClick} className="suppliers" value="collContract">Contrats
					collectifs</button>
			}
			{
				view === "collContract" &&
				<ListContractsComponent handleClick={this._handleClick}
										getContract={this.props.getContract}
										listContracts={listContracts}
										searchContracts={searchContracts}
										changeViewContract={this.props.changeViewContract}
										changeSearchContracts={this.props.changeSearchContracts}
										linksSubContract={linksSubContract}
										displaySubContractNav={this.props.displaySubContractNav}
										addSubContractNav={this.props.addSubContractNav}
				/>
			}
			{

				view === "create" &&
				<CreateContractContainer changeLoading={this.props.changeLoading}
										 loading={loading}
										 view={view}
										 titrebouton="Créer le contrat"
				/>
			}
			{
				view === "updatecontract" &&
				<CreateContractContainer changeLoading={this.props.changeLoading}
										 loading={loading}
										 view={view}
										 titrebouton="Modifier le contrat"
				/>
			}
			{
				view === "display" &&
				<ContractPage/>
			}
		</div>;
	}

}

function mapStateToProps(state) {

	return {
		crmContract: state.crmContract,
		crmDashboard: state.crmDashboard,
		crmNavBar: state.crmNavBar
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewContract: (newView) => {
			dispatch(changeViewContract(newView));
		},
		getListContracts: () => {
			dispatch(getListContracts());
		},
		changeSearchContracts: (search) => {
			dispatch(changeSearchContracts(search));
		},
		changeLoading: (loading) => {
			dispatch(changeLoading(loading));
		},
		getContract: (idContract) => {
			dispatch(getContract(idContract));
		},
		displaySubContractNav: (display) => {
			dispatch(displaySubContractNav(display));
		},
		addSubContractNav: (links) => {
			dispatch(addSubContractNav(links));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractsContainer)
