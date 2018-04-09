import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../style/NavBar.css';
import PageCollectives from "./PageCollectives";
import PageFournisseurs from "./PageFournisseurs";
import PageCollectivesClients from "./PageCollectivesClients";
import {
	Route
} from 'react-router-dom';
import {PageClient} from "../containers/PageClient";
import {CreationClient} from "../containers/GridContainer";
import {gestionUser} from "../containers/gestionUser";
import createUser from "../containers/createUser";

export class BarreNav extends Component {
	constructor(props) {
		super(props);
		this.state = {prevPath: ''};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location !== this.props.location) {
			this.setState({prevPath: this.props.location});
		}
	}

	render() {
		let liens = [{path: '/PageAccueil', nom: 'Accueil'},
			{path: '/PageAccueil/assu-ind', nom: 'Assurances individuelles'},
			{path: '/PageAccueil/assu-col', nom: 'Assurances collectives'},
			{path: '/PageAccueil/placements', nom: 'Placements'},
			{path: '/PageAccueil/fournisseurs', nom: 'Fournisseurs'},
			{path: '/PageAccueil/admin', nom: 'Gestion des utilisateurs'},
			{path: '/', nom: 'Déconnexion'},
			{path: '/', nom: 'Retour'}];

		switch (this.props.location.pathname) {
			case "/PageAccueil/assu-ind":
				liens[1].active = true;
				break;
			case "/PageAccueil/assu-col":
				liens[2].active = true;
				break;
			case "/PageAccueil/placements":
				liens[3].active = true;
				break;
			case "/PageAccueil/fournisseurs":
				liens[4].active = true;
				break;
			case "/PageAccueil/admin":
				liens[5].active = true;
				break;
			case "/PageAccueil/assu-col/clients":
				liens[2].active = true;
				break;
		}
		return (
			<div id="pageNavBar">
				<div id="navBar">
					<h2>AFC inc.</h2>
					<ul>
						{
							liens.map(element => {
								if (element.active) {
									return (
										<Link to={element.path} style={{textDecoration: 'none'}}>
											<li className='active'>{element.nom}</li>
										</Link>
									);
								} else if (element.nom === 'Retour') {
									return (
										<Link to={this.state.prevPath} style={{textDecoration: 'none'}}>
											<li>{element.nom}</li>
										</Link>
									);
								} else {
									return (
										<Link to={element.path} style={{textDecoration: 'none'}}>
											<li>{element.nom}</li>
										</Link>
									);
								}
							})
						}
					</ul>
				</div>
				<div id="main">
					<Route exact path='/PageAccueil/assu-col' component={PageCollectives}/>
					<Route exact path='/PageAccueil/fournisseurs' component={PageFournisseurs}/>
					<Route exact path="/PageAccueil/assu-col/clients" render={() => (
						<PageCollectivesClients history={this.props.history}/>
					)}/>
					<Route path="/PageAccueil/assu-col/clients/client_1" component={PageClient}/>
					<Route path="/PageAccueil/assu-col/clients/NouveauClient" component={CreationClient}/>
					<Route exact path='/PageAccueil/admin' component={gestionUser}/>
					<Route path="/PageAccueil/admin/createUser" component={createUser}/>
				</div>
			</div>
		);
	}
}
