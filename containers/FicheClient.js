import React from 'react';
import TitreValeur from "../components/TitreValeur";
//import '../style/FicheClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class FicheClient extends React.Component {
	constructor(props) {
		super(props);
		this.showContact = this.showContact.bind(this);
		this.setContactsState = this.setContactsState.bind(this);
		this.getPosition = this.getPosition.bind(this);
		this._handleModify = this._handleModify.bind(this);
		this._handleDelete = this._handleDelete.bind(this);
		this.dropDownClient = this.dropDownClient.bind(this);
		this._handleContract = this._handleContract.bind(this);
	}

	componentWillMount() {
		this.setContactsState();
	}

	_handleContract(event) {
		this.props.changeViewContract("create");
		this.props.changeViewDashboard("contracts");
		let nombreEmployes= 0;
		let sousGroupe = '';
		this.props.optionnalFields.forEach(element => {
			if (element.idRow === 1) {
				nombreEmployes = element.valeur;
			}
			if (element.idRow === 6) {
				sousGroupe = element.valeur;
			}
		});
		this.props.setFromClient({
			idClient: event.target.value,
			name: this.props.client.nom,
			sousGroupe: sousGroupe,
			nombreEmployes: nombreEmployes
		});
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
		this.props.handleClick("customerFile"); 
		this.props.changeIdDisplay(event.target.value); 
	}

	_handleDelete(event) {
		this.props.deleteCustomer(event.target.value);
	}

	render() {
		let client = this.props.client;
		return (
			<div className="container">
				<h1>Assurances collectives</h1>
				<h2>Fiche client</h2>
				<button  className="grandTitreClient" id="nomGroupe"  onClick={this.dropDownClient}  >
					<TitreValeur titre="Nom du groupe" valeur={client.nom} /></button>
			<div id="wrapperClient"  className=" wrapper show  " >
				<div className="unePartie w3-animate-zoom" >
					<TitreValeur titre="Date" valeur={client.date_creation}/>
					<TitreValeur titre="Responsable" valeur={client.responsable}/>
					<TitreValeur titre="Activité" valeur={client.forme_type}/>
					<TitreValeur titre="Etat" valeur={client.etat}/>
					{
						client.prospect && <TitreValeur titre="Est un prospect" valeur="Oui"/>
					}
					{
						!client.prospect && <TitreValeur titre="Est un prospect" valeur="Non"/>
					}
					<TitreValeur titre="Relevés" valeur={client.releve}/>
				</div>
				<div className="unePartie w3-animate-zoom">
					<TitreValeur titre="Téléphone principal" valeur={client.tel_principal}/>
					<TitreValeur titre="Extension" valeur={client.ext_tel_principal}/>
					<TitreValeur titre="Rue" valeur={client.rue}/>
					<TitreValeur titre="Ville" valeur={client.ville}/>
					<TitreValeur titre="Province" valeur={client.province}/>
					<TitreValeur titre="Code postal" valeur={client.codepostal}/>
				</div>
				<div className="unePartie w3-animate-zoom">
					<TitreValeur titre="Notes" valeur={client.notes}/>
				</div>

					<ResponsiveReactGridLayout className="layout w3-animate-zoom" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
											   breakpoints={{lg: 800, md: 600, sm: 468, xs: 380, xxs: 0}} autoSize={true}
											   compactType={null}>
						{
							this.props.optionnalFields.map(element => {
								return (
									<div key={element.idRow} className="form-group">
										<TitreValeur key={element.idRow} titre={element.nom} valeur={element.valeur}/>
									</div>
								);
							})
						}

					</ResponsiveReactGridLayout>
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
					<TitreValeur valeur = "Assureur"/>
				</div>
				<div className="unePartie">
				</div>
				<div className="grandTitre">
					<TitreValeur valeur="Divers"/>
				</div>
				<div className="unePartie">
					<TitreValeur titre="Goodies"/>
					<TitreValeur titre="Provenance client"/>
					<TitreValeur titre="Infos complémentaires"/>
				</div>
				<div className="form-group"> 
					{
						this.props.isAdmin && <button type="button" className="btn btn-danger"
													  onClick={this._handleDelete} value={this.props.client.idclient}>
													Passer la fiche client en annulé
												</button>
					}
					<button type="button" className="btn btn-primary" 
							onClick={this._handleModify} value={this.props.client.idclient}> 
						Modifier la fiche client 
					</button>
					<button type="button" className="btn btn-primary"
							onClick={this._handleContract}
							value={this.props.client.idclient}>
						Créer un contrat avec ce client
					</button>
				</div>
			</div>
		)

	}
}

export default (FicheClient);
