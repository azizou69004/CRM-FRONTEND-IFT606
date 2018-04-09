import React, { Component } from 'react';
import { connect  } from 'react-redux';
import PageFournisseurs from "../components/PageFournisseurs";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";
import {changeViewDashboard} from "../actions/crmDashboard";
import CreationFournisseur from "./GridContainerSuppliers";
import SupplierPage from "./SupplierPage";
import {requestGridFour} from "../actions/crmGridLayoutSuppliers";


class suppliersPageContainer extends Component {
	constructor(props){
		super(props);
		window.scrollTo(0,0);
		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.props.requestGridFour();
	}
	handleClick(event) {
		event.preventDefault();
		this.props.changeViewSuppliers(event.target.className);
	}

	handleClick2(event) {
		event.preventDefault();
		this.props.changeViewDashboard(event.target.className);
	}


	render() {
		let {view} = this.props.crmSuppliersContainer;
		return(

				<div className="container-fluid text-center">
				{
					view === "" && <PageFournisseurs handleClick={this.handleClick}/>
				}
				{
					view === "newSupplier" && <CreationFournisseur view="newSupplier"/>
				}
				{
					view === "updateSupplier" && <CreationFournisseur view="updateSupplier"/>
				}
				{
					view === "supplierFile" && <SupplierPage view="supplierFile"/>
				}
				</div>

		);
	}
}

function mapStateToProps (state) {

	return{
		crmSuppliersContainer: state.crmSuppliersContainer
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

	return{
		 changeViewSuppliers : (newView) => {
             dispatch(changeViewSuppliers(newView))
         },
         changeViewDashboard : (newView) => {
             dispatch(changeViewDashboard(newView))
         },
		requestGridFour: () => {
			dispatch(requestGridFour());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (suppliersPageContainer)
