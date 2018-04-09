import React from 'react';
import '../style/FicheClient.css';

class TitreValeur extends React.Component {
	constructor(props) {
		super(props);
		this.isGonnaRender = this.isGonnaRender.bind(this);
	}

	isGonnaRender() {
		//let nomClasse
		if (!!this.props.titre && this.props.titre === null && this.props.valeur !== null) {
			//nomClasse = "titre";
			return <div className="titre">{this.props.valeur}</div>;
		} else if (this.props.valeur !== "" && this.props.valeur !== null) {//A voir s'il faut que ce soit une chaîne ville ou null
			// nomClasse = "titreValeur";
			let value;
			let regexMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
			let regexPhone = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

			if (regexMail.test(this.props.valeur)) {
				value = <a href={"mailto:" + this.props.valeur}>{this.props.valeur}</a>;
			} else if (regexPhone.test(this.props.valeur)) {
				value = <a href={"tel:" + this.props.valeur}>{this.props.valeur}</a>;
			} else {
				value = this.props.valeur;
			}

			return <div className="titreValeur">
				<p className="titre">{this.props.titre}:</p>
				<p className="valeur">
					{
						value
					}
				</p>
			</div>;
		}
	}

	render() {
		return <div>{this.isGonnaRender()}</div>;
	}
}

export default (TitreValeur)
