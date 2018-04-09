import React from 'react';
import TitreValeur from "../components/TitreValeur";
import {Responsive, WidthProvider} from 'react-grid-layout';
import LoadingAnimation from "./LoadingAnimation";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class SupplierFile extends React.Component {
	constructor(props) {
		super(props);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this.dropDownClient = this.dropDownClient.bind(this);
		this.props.changeLoading(true);
	}

	componentWillMount() {
		this.setContactsState();
	}


	dropDownClient(event){
		var x = document.getElementById("wrapperClient");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperClient").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperClient").style.display = "none";
		}

	}

	dropDownContacts(event){
		var x = document.getElementById("wrapperContacts");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperContacts").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperContacts").style.display = "none";
		}

	}
	// appelé avant de monter l'élément. Crée l'array state pour savoir quels contacts doivent etre cachés
	// si 4 contacts, ca va créer un array de length 4 [true,true,true,true] --> on cache tout au début
	setContactsState() {
		/*var nbContacts = this.props.client.contacts.length;
		for (var i = 0; i < nbContacts - 1; i++) {
			var initial = this.state.contactHidden;
			var newArray = update(initial, {$push: [true]});
			this.setState({contactHidden: newArray});
		}*/
	}

	// pour trouver la position de l'élément (contact) dans l'array client.contacts.
	// important pour savoir ce qui doit être caché (quel contact s'affiche en fonction de où on clique)
	getPosition(id) {
		/*var position;
		for (var i = 0; i < this.props.client.contacts.length; i++) {
			if (this.props.client.contacts[i].id === id) {
				position = i;
			}
		}
		return position;*/
	}

	//ici l'argument qu'on donne est la position du client cliqué dans l'array props.client.contacts
	showContact(position) {
		/*var etat = this.state.contactHidden[position];
		var nouveauState = this.state.contactHidden.splice(position, 1, !etat);
		//on force l'update pour que le component re-render et affiche le contact sur lequel on a cliqué
		this.forceUpdate();*/
	}

	_handleModify(event) {
		this.props.changeView("updateSupplier");
		//this.props.changeIdDisplay(event.target.value);
	}

	render() {
		let supplier = this.props.requiredFields;
		return (
			<div className="container">
				<h1>Fiche fournisseur</h1>
				{
					this.props.loading && <LoadingAnimation/>
				}
				{
					!this.props.loading &&
						<div>
							<button  className="grandTitreClient" id="nomGroupe"  onClick={this.dropDownClient}  >
								<TitreValeur titre="Nom du groupe" valeur={supplier.nomEntreprise} /></button>
							<div id="wrapperClient"  className=" wrapper show  " >
								<div className="unePartie w3-animate-zoom" >
									<TitreValeur titre="Code" valeur={supplier.code}/>
									<TitreValeur titre="Téléphone principal" valeur={supplier.telephone}/>
									<TitreValeur titre="Extension" valeur={supplier.extension}/>
								</div>
								<div className="unePartie w3-animate-zoom">
									<TitreValeur titre="Rue" valeur={supplier.rue}/>
									<TitreValeur titre="Ville" valeur={supplier.ville}/>
									<TitreValeur titre="Province" valeur={supplier.province}/>
									<TitreValeur titre="Code postal" valeur={supplier.codePostal}/>
								</div>
								<div className="unePartie w3-animate-zoom">
									{
										supplier.lilGroup && <TitreValeur titre="Petits groupes" valeur="Oui"/>
									}
									{
										!supplier.lilGroup && <TitreValeur titre="Petits groupes" valeur="Non"/>
									}
									<TitreValeur titre="Nombre d'employés petits groupes" valeur={supplier.employesLilGroup}/>
									{
										supplier.bigGroup && <TitreValeur titre="Grands groupes" valeur="Oui"/>
									}
									{
										!supplier.bigGroup && <TitreValeur titre="Grands groupes" valeur="Non"/>
									}
									<TitreValeur titre="Nombre d'employés grands groupes" valeur={supplier.employesBigGroup}/>
								</div>
								{
									<ResponsiveReactGridLayout className="layout w3-animate-zoom" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
															   breakpoints={{lg: 800, md: 600, sm: 468, xs: 380, xxs: 0}} autoSize={true}
															   compactType={null}>
										{
											this.props.optionnalFields.map(element => {
												return (
													<div key={element.idattrfournisseur} className="form-group">
														<TitreValeur key={element.idattrfournisseur} titre={element.label} valeur={element.value}/>
													</div>
												);
											})
										}

									</ResponsiveReactGridLayout>
								}
							</div>


							<div className="grandTitre">
								<button  className="grandTitreContacts"   onClick={this.dropDownContacts}  >
									<TitreValeur valeur="Contacts"  /> </button>
								<div id="wrapperContacts"  className=" wrapper show  " >

									{
										this.props.contacts.map(contact => {
											let decideur;
											if(contact.estdecideur) {
												decideur = <TitreValeur titre="Décideur" valeur="Oui"/>
											}
											else {
												decideur = <TitreValeur titre="Décideur" valeur="Non"/>
											}                      return (
												<div key={contact.idpersonne}>
													<div className="unePartie w3-animate-zoom">
														<TitreValeur titre="Titre" valeur={contact.libelletitre}/>
														<TitreValeur titre="Prénom" valeur={contact.prenom}/>
														<TitreValeur titre="Nom" valeur={contact.nom}/>
														<TitreValeur titre="Poste" valeur={contact.libelleposte}/>
													</div>                            <div className="unePartie w3-animate-zoom">
													<TitreValeur titre="N° de Téléphone" valeur={contact.num_tel_principal}/>
													<TitreValeur titre="Extension" valeur={contact.ext_tel_principal}/>
													<TitreValeur titre="Mail" valeur={contact.mail}/>
													{decideur}
												</div>
												</div>
											);
										})
									}
								</div>
								<div className="unePartie">
								</div>
							</div>

							<div className="grandTitre">
								<TitreValeur valeur = "Clients"/>
							</div>
							<div className="unePartie">
							</div>
							<div className="grandTitre">
								<TitreValeur valeur="Divers"/>
							</div>
							<div className="form-group">
								<button type="button" className="btn btn-primary"
										onClick={this._handleModify} value={this.props.requiredFields.id}>
									Modifier la fiche fournisseur
								</button>
							</div>
						</div>
				}
			</div>
		)

	}
}

export default (SupplierFile);
