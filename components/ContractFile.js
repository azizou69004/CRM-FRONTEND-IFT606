import React from 'react';
import TitreValeur from "../components/TitreValeur";
import {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ContractFile extends React.Component {
	constructor(props) {
		super(props);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this.dropDownClient = this.dropDownClient.bind(this);
		this.dropDownTaux = this.dropDownTaux.bind(this);
		this.dropDownSouscriptions = this.dropDownSouscriptions.bind(this);
		this._handleClient = this._handleClient.bind(this);
		this._handleAssureur = this._handleAssureur.bind(this);
	}

	componentWillMount() {
		this.setContactsState();
	}

	_handleClient(contract, event) {
		event.preventDefault();
		this.props.displaySubCustomerNav(true);
		let links = this.props.linksSubCustomer;
		let check = true;
		links.forEach(link => {
			if (link.idCustomer === contract.idfournisseur) {
				check = false;
			}
		});
		if (check) {
			links.push({name: contract.nomclient, view: 'customer', idCustomer: contract.idclient});
			this.props.addSubCustomerNav(links);
		}
		this.props.changeViewCollective("customer");
		this.props.changeViewDashboard("collIns");
		this.props.changeLoading(true);
		this.props.getClientRequest(contract.idclient);
	}

	_handleAssureur(contract, event) {
		event.preventDefault();
		this.props.displaySubSupplierNav(true);
		let links = this.props.linksSubSupplier;
		let check = true;
		links.forEach(link => {
			if (link.idSupplier === contract.idfournisseur) {
				check = false;
			}
		});
		if (check) {
			links.push({name: contract.nomfournisseur, view: 'supplierFile', idSupplier: contract.idfournisseur});
			this.props.addSubSupplierNav(links);
		}
		this.props.changeViewSuppliers("supplierFile");
		this.props.changeViewDashboard("suppliers");
		this.props.changeLoading(true);
		this.props.getSupplier(contract.idfournisseur);
	}

	dropDownClient() {
		let x = document.getElementById("wrapperClient");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperClient").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperClient").style.display = "none";
		}

	}

	dropDownContacts() {
		let x = document.getElementById("wrapperContacts");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperContacts").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperContacts").style.display = "none";
		}

	}

	dropDownTaux() {
		let x = document.getElementById("wrapperTaux");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperTaux").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperTaux").style.display = "none";
		}
	}

	dropDownSouscriptions() {
		let x = document.getElementById("wrapperSouscriptions");
		if (x.className.indexOf("show") === -1) {
			x.className += "show";
			document.getElementById("wrapperSouscriptions").style.display = "";

		} else {
			x.className = x.className.replace("show", "");
			document.getElementById("wrapperSouscriptions").style.display = "none";
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
		let contract = this.props.contract;
		this.props.clients.forEach(client => {
			if(client.id === contract.idclient) {
				let fromClient =
					{
						idClient: client.id,
						name: client.nom_groupe,
						sousGroupe: '',
						nombreEmployes: '',
						update: true
					};
				this.props.setFromClient(fromClient);
			}
		});
		this.props.changeViewContract("updatecontract");
		//this.props.changeIdDisplay(event.target.value);
	}

	render() {
		let contract = this.props.contract;
		let layout = this.props.lilLayout;
		let layouts = {lg: layout, md: layout, sm: layout, xs: layout, xxs: layout};
		console.log(layout);
		return (
			<div className="container">
				<h1>Contrat</h1>
				<div>
					<button className="grandTitreClient" id="nomGroupe" onClick={this.dropDownClient}>
						<TitreValeur titre="N° Police" valeur={contract.police}/></button>
					<div id="wrapperClient" className=" wrapper show  ">
						<div className="unePartie w3-animate-zoom">
							<a onClick={this._handleClient.bind(this, contract)}
							   style={{cursor: 'pointer'}}><TitreValeur titre="Client "
																		valeur={contract.nomclient}/></a>
							<a onClick={this._handleAssureur.bind(this, contract)}
							   style={{cursor: 'pointer'}}><TitreValeur titre="Assureur"
																		valeur={contract.nomfournisseur}/></a>
							<TitreValeur titre="Représentant"
										 valeur={contract.prenomrepresentant + " " + contract.nomrepresentant}/>
						</div>
						<div className="unePartie w3-animate-zoom">
							<TitreValeur titre="AGA" valeur={contract.libellechambrecommerce}/>
							<TitreValeur titre="Date de signature" valeur={contract.date_signature}/>
							<TitreValeur titre="Mois de renouvellement" valeur={contract.mois_renouvellement}/>
						</div>
						<div className="unePartie w3-animate-zoom">
							<TitreValeur titre="Notes" valeur={contract.notes}/>
						</div>
						<ResponsiveReactGridLayout className="layout w3-animate-zoom" layouts={layouts}
												   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
												   rowHeight={20}
												   breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
						>
							{
								contract.facultatif.map(element => {
									return (
										<div key={element.idRow} className="form-group">
											<TitreValeur key={element.idRow} titre={element.nom}
														 valeur={element.valeur}/>
										</div>
									);
								})
							}

						</ResponsiveReactGridLayout>
					</div>


					<div className="grandTitre">
						<button className="grandTitreContacts" onClick={this.dropDownContacts}>
							<TitreValeur valeur="Historique des taux"/></button>
						<div id="wrapperContacts" className=" wrapper show  ">
							{
								contract.historique_taux.map((element, index) => {
									return <div className="w3-animate-zoom" key={index}>
										<div className="unePartie">
											<TitreValeur titre="Année de début" valeur={element.annee_dep}/>
											<TitreValeur titre="Année de fin" valeur={element.annee_fin}/>
											<TitreValeur titre="Nombre d'employés" valeur={element.nombre_employés}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="Différence" valeur={element.différence}/>
											<TitreValeur titre="Assurance vie" valeur={element.vie}/>
											<TitreValeur titre="DMA" valeur={element.dma}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="PAC" valeur={element.pac}/>
											<TitreValeur titre="CT" valeur={element.ct}/>
											<TitreValeur titre="LT" valeur={element.lt}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="AMC individuel" valeur={element.amc_ind}/>
											<TitreValeur titre="AMC mono" valeur={element.amc_mono}/>
											<TitreValeur titre="AMC couple" valeur={element.amc_couple}/>
											<TitreValeur titre="AMC famille" valeur={element.amc_fam}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="Dentaire individuel" valeur={element.dentaire_ind}/>
											<TitreValeur titre="Dentaire mono" valeur={element.dentaire_mono}/>
											<TitreValeur titre="Dentaire couple" valeur={element.dentaire_couple}/>
											<TitreValeur titre="Dentaire famille" valeur={element.dentaire_fam}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="MG individuel" valeur={element.mg_ind}/>
											<TitreValeur titre="MG mono" valeur={element.mg_mono}/>
											<TitreValeur titre="MG couple" valeur={element.mg_couple}/>
											<TitreValeur titre="MG famille" valeur={element.mg_fam}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="PAE" valeur={element.pae}/>
											<TitreValeur titre="Prime mensuelle" valeur={element.prime_mensuelle}/>
											<TitreValeur titre="Prime annuelle" valeur={element.prime_annuelle}/>
										</div>
										<hr/>
									</div>
								})
							}
						</div>
					</div>

					<div className="grandTitre">
						<button className="grandTitreContacts" onClick={this.dropDownTaux}>
							<TitreValeur valeur="Rémunérations"/></button>
						<div id="wrapperTaux" className=" wrapper show  " style={{backgroundColor: 'white'}}>
							{
								contract.historique_taux.map((element, index) => {
									return <div className="w3-animate-zoom" key={index}>
										<div className="unePartie">
											<TitreValeur titre="Année de début" valeur={element.annee_dep}/>
											<TitreValeur titre="Année de fin" valeur={element.annee_fin}/>
											<TitreValeur titre="Vie DMA PAC" valeur={element.vie_dma_pac}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="CT" valeur={element.ct}/>
											<TitreValeur titre="LT" valeur={element.lt}/>
											<TitreValeur titre="AMC" valeur={element.amc}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="Dentaire" valeur={element.dentaire}/>
											<TitreValeur titre="MG" valeur={element.mg}/>
											<TitreValeur titre="PAE" valeur={element.pae}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="Date payé base" valeur={element.date_payée_base}/>
											<TitreValeur titre="Montant payé base" valeur={element.montant_payé_base}/>
											<TitreValeur titre="Montant payé boni" valeur={element.montant_payé_boni}/>
											<TitreValeur titre="Pourcentage payable en pourcent"
														 valeur={element.pourcentage_payable_en_pourcent}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="Montant dû" valeur={element.montant_dû}/>
											<TitreValeur titre="Montant payé" valeur={element.montant_payé}/>
											<TitreValeur titre="Rémunération totale"
														 valeur={element.rémunération_totale}/>
											<TitreValeur titre="Date payée" valeur={element.date_payée}/>
										</div>
										<div className="unePartie">
											<TitreValeur titre="Notes" valeur={element.notes}/>
											<TitreValeur titre="Solde" valeur={element.solde}/>
											<TitreValeur titre="Conseiller n°" valeur={element.idconseiller}/>
											<TitreValeur titre="Nom conseiller" valeur={element.nomconseiller}/>
											<TitreValeur titre="Prénom conseiller" valeur={element.prenomconseiller}/>
										</div>
										<hr/>
									</div>
								})
							}
						</div>
					</div>

					<div className="grandTitre">
						<button className="grandTitreContacts" onClick={this.dropDownSouscriptions}>
							<TitreValeur valeur="Souscriptions"/></button>
						<div id="wrapperSouscriptions" className=" wrapper show  " style={{backgroundColor: 'white'}}>
							{
								contract.souscriptions.map((element, index) => {
									return <div className="w3-animate-zoom" key={index}>
										<div className="unePartie">
											<TitreValeur titre="Module" valeur={element.libelle}/>
											<TitreValeur titre="Notes du module" valeur={element.module_notes}/>
										</div>
										{
											element.subscriptions.map((element2, index2) => {
												return <div className="unePartie" key={index2}>
													<TitreValeur titre="Souscription" valeur={element2.libelle}/>
													<TitreValeur titre="Notes de la souscription"
																 valeur={element2.souscription_notes}/>
													<TitreValeur titre="description" valeur={element2.description}/>
													<TitreValeur titre="Ext" valeur={element2.ext}/>
													<TitreValeur titre="Valeur" valeur={element2.valeur}/>
												</div>

											})
										}
										<hr/>
									</div>
								})
							}
						</div>
					</div>

					<div className="form-group">
						<button type="button" className="btn btn-primary"
								onClick={this._handleModify} value={contract.idcontrat}>
							Modifier le contrat
						</button>
					</div>
				</div>
			</div>
		)

	}
}

export default (ContractFile);
