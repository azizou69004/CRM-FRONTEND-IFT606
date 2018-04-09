import React, { Component } from 'react';
import { connect  } from 'react-redux';
import {
	addArrayContacts, changeFormState, deleteContact, getContacts, getPostesContacts,
	getPostesContactsSup
} from "../actions/crmContacts";
import ContactsComponent from "../components/form/ContactsComponent";

class ContactsContainer extends Component   {
	constructor(props) {
		super(props);
		let {view} = this.props.crmDashboard;
		if(view ==='collIns') {
			this.props.getPostesContact();
		}
		else if (view === 'suppliers') {
			this.props.getPostesContactSup();
		}
		if(this.props.crmCollectiveContainer.view === 'newCustomer' ||
			this.props.crmSuppliersContainer.view === 'newSupplier') {
			this.props.addArrayContacts([
				{
					prenom: '',
					nom: '',
					idposte: 1,
					titre: 'Mr',
					num_tel_principal: '',
					ext_tel_principal: '',
					mail: '',
					estdecideur: false
				}
			]);
		}
		else if(this.props.crmCollectiveContainer.view === 'customerFile') {
			this.props.getContacts(this.props.crmGridLayout.idToDisplay);
		}
		this._addContact = this._addContact.bind(this);
	}

	_addContact() {
		let {arrayContacts} = this.props.crmContacts;
		arrayContacts.push(
			{
				prenom: '',
				nom: '',
				idposte: 1,
				titre: 'Mr',
				num_tel_principal: '',
				ext_tel_principal: '',
				mail: '',
				estdecideur: false
			}
		);
		this.props.addArrayContacts(arrayContacts);
	}

	render() {
		let {postes, arrayContacts, delcontacts} = this.props.crmContacts;
		let {view} = this.props.crmDashboard;
		return(
			<div>
				<h3>Contacts <span className="fa fa-plus-square" onClick={this._addContact}/></h3>
				{
					arrayContacts.map((contact, index) => {
						return <ContactsComponent postes={postes}
												  key={index}
												  formState={contact}
												  contacts={arrayContacts}
												  delcontacts={delcontacts}
												  idContact={index}
												  view={view}
												  changeForm={this.props.changeFormState}
												  deleteContact={this.props.deleteContact}
						/>
					})
				}
			</div>
		)
	}
}

// les fonctions redux
//valeurs
function mapStateToProps (state) {

	return{
		crmContacts: state.crmContacts,
		crmCollectiveContainer: state.crmCollectiveContainer,
		crmGridLayout: state.crmGridLayout,
		crmDashboard: state.crmDashboard,
		crmSuppliersContainer: state.crmSuppliersContainer,
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

	return{
		getPostesContact: () => {
			dispatch(getPostesContacts());
		},
		changeFormState: (newFormState) => {
			dispatch(changeFormState(newFormState));
		},
		addArrayContacts: (newArray) => {
			dispatch(addArrayContacts(newArray));
		},
		getContacts: (idClient) => {
			dispatch(getContacts(idClient));
		},
		deleteContact: (newFormState, deletedContacts) => {
			dispatch(deleteContact(newFormState, deletedContacts));
		},
		getPostesContactSup: () => {
			dispatch(getPostesContactsSup());
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ContactsContainer)
