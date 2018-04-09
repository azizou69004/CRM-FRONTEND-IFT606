import React from 'react';

// A FAIRE !!!!! Quand il essaye de valider et que un "Autres" est sélectionné mais n'a pas rempli le textfield, pas le laisser


class DisplayOneModalite extends React.Component {
	constructor(props) {
		super(props);
		this._toDisplay = this._toDisplay.bind(this);
		this._onChangeSelectValue = this._onChangeSelectValue.bind(this);
		this._onChangeTextField = this._onChangeTextField.bind(this);
		this.value = "";

	}

	componentDidMount() {
		if (this.props.view === "updatecontract") {
			//on get l'index du module choisi dans modulesChoisis et on cherche la valeur associée si elle existe...
			let idModuleDansContrat;
			for (let i = 0; i < this.props.formState.contrat.modulesChoisis.length; i++) {
				if (parseInt(this.props.formState.contrat.modulesChoisis[i].idModule, 10) === parseInt(this.props.idModule, 10)) {
					idModuleDansContrat = i;
				}
			}
			let contains = false;
			let idValue;
			let value;
			let idModaliteDsModule;
			this.props.formState.contrat.modulesChoisis[idModuleDansContrat].modalites.forEach((element, index) => {

				if (element.idModalite === parseInt(this.props.modalite.idModalite, 10)) {
					contains = true;
					idValue = element.idValeur;
					value = element.valeur;
					idModaliteDsModule = index;
				}
			});
			if (contains) {
				this.idValue = idValue;
				this.value = value;
				this.label = this.value;
				console.log("idValue" + this.idValue);
				console.log(this.idValue === 1);
				if (this.idValue === 1) {
					this.label = "Autres";
					console.log(this.label);
				}

				//si on est sur du "autres" et que on a une valeur "spéciale", on display le textfield avec sa valeur
				if (parseInt(this.idValue, 10) === 1 && this.props.formState.contrat.modulesChoisis[idModuleDansContrat].modalites[idModaliteDsModule].valeur !== "Autres") {
					document.getElementById("valeur" + this.props.modalite.idModalite + this.props.idModule).style.display = "block";

				}
			}

		}
	}

	_onChangeTextField(event) {
		this.value = event.target.value;
		//quand on change un textfield c'est forcément un "autre" donc on FIESTA
		let modaliteModifiee = {
			idModalite: this.props.modalite.idModalite,
			souscription_notes: '',
			valeur: event.target.value,
			idValeur: 1
		};
		let idModuleDansContrat;
		for (let i = 0; i < this.props.formState.contrat.modulesChoisis.length; i++) {
			if (parseInt(this.props.formState.contrat.modulesChoisis[i].idModule, 10) === parseInt(this.props.idModule, 10)) {
				idModuleDansContrat = i;
			}
		}

		let modulesChoisis = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis));
		let modalitesChoisies = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis[idModuleDansContrat].modalites));
		let containsIdModalite;
		modalitesChoisies.forEach(element => {

			if (element.idModalite === parseInt(this.props.modalite.idModalite, 10)) {
				containsIdModalite = true;
			}
		});

		if (modalitesChoisies.length === 0 || !containsIdModalite) {
			modalitesChoisies.push(modaliteModifiee);
		}
		/*else {//on get la place dans l'array
			for(let j = 0; j < modalitesChoisies.length; j++){
				if(modalitesChoisies[j].idModalite === modaliteModifiee.idModalite)
					idModaliteDansLarray = j;
			}
			modalitesChoisies[idModaliteDansLarray].valeur = modaliteModifiee.valeur;
		}*/
		let idModaliteDansLarray;
		for (let j = 0; j < modalitesChoisies.length; j++) {
			if (modalitesChoisies[j].idModalite === modaliteModifiee.idModalite)
				idModaliteDansLarray = j;
		}

		if (event.target.value === "") {
			let idModaliteDansLarray;
			for (let j = 0; j < modalitesChoisies.length; j++) {
				if (modalitesChoisies[j].idModalite === this.props.modalite.idModalite)
					idModaliteDansLarray = j;
			}
			modalitesChoisies.splice(idModaliteDansLarray, 1);

		}
		else {
			modalitesChoisies[idModaliteDansLarray].valeur = modaliteModifiee.valeur;
			document.getElementById("valeur" + this.props.modalite.idModalite + this.props.idModule).setAttribute('value',
				modalitesChoisies[idModaliteDansLarray].valeur);
		}

		modulesChoisis[idModuleDansContrat].modalites = modalitesChoisies;


		this.props.changeForm({
			...this.props.formState, contrat: {
				...this.props.formState.contrat,
				modulesChoisis: modulesChoisis
			}
		});


	}

	_onChangeSelectValue(event) {
		this.idValue = event.target.id;
		this.value = event.target.value;
		this.label = this.value;
		if (event.target.value === "Autres") {
			this.label = "Autres";
			document.getElementById("valeur" + this.props.modalite.idModalite + this.props.idModule).style.display = "block";
		}
		else {
			document.getElementById("valeur" + this.props.modalite.idModalite + this.props.idModule).style.display = "none";
			document.getElementById("valeur" + this.props.modalite.idModalite + this.props.idModule).value = "";
			document.getElementById("valeur" + this.props.modalite.idModalite + this.props.idModule).setAttribute('value', "");

		}

		let idModuleDansContrat;
		for (let i = 0; i < this.props.formState.contrat.modulesChoisis.length; i++) {

			if (this.props.formState.contrat.modulesChoisis[i]) {
				if (parseInt(this.props.formState.contrat.modulesChoisis[i].idModule, 10) === parseInt(this.props.idModule, 10)) {
					idModuleDansContrat = i;
				}
			}
		}
		let modulesChoisis = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis));

		let modalitesChoisies = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis[idModuleDansContrat].modalites));

		//si on passe à "", alors on supprime la ligne de la modalité du tableau
		if (event.target.value === "") {
			let idModaliteDansLarray;
			let contains = false;
			console.log("passenprops" + this.props.modalite.idModalite);


			for(let j = 0; j < modalitesChoisies.length; j++){
				if(parseInt(modalitesChoisies[j].idModalite,10) === parseInt(this.props.modalite.idModalite,10)) {
					console.log("DSARRAY?" + modalitesChoisies[j].idModalite);
					contains = true;
					idModaliteDansLarray = j;
					console.log("idModDsArray" + j);
				}
			}
			if (contains) {
				modalitesChoisies.splice(idModaliteDansLarray, 1);

			}
		}
		else {
			let idValeur;
			this.props.modalite.valeurs.forEach(element => {
				if (element.label === event.target.value) {
					idValeur = element.idValeur;
				}
			});
			let modaliteModifiee = {
				idModalite: this.props.modalite.idModalite,
				souscription_notes: '',
				valeur: event.target.value,
				idValeur: idValeur
			};

			//si le formState.contrat.modulesChoisis[placedeidModuleChoisi].modalites est vide, on push dedans
			//sinon si le module choisi est déjà dans le tableau ou le modifie
			//si l'utilisateur choisi la valeur "", on retire la ligne du tableau

			//d'abord on cherche la place du module choisi dans le tableau


			let containsIdModalite;
			modalitesChoisies.forEach(element => {

				if (element.idModalite === parseInt(this.props.modalite.idModalite, 10)) {
					containsIdModalite = true;
				}
			});

			if (modalitesChoisies.length === 0 || !containsIdModalite) {
				modalitesChoisies.push(modaliteModifiee);
			}

			//else {//on get la place dans l'array
			let idModaliteDansLarray;
			for (let j = 0; j < modalitesChoisies.length; j++) {
				if (modalitesChoisies[j].idModalite === modaliteModifiee.idModalite)
					idModaliteDansLarray = j;
			}
			modalitesChoisies[idModaliteDansLarray] = modaliteModifiee;
			//}
			document.getElementById("modalite" + this.props.modalite.idModalite + this.props.idModule).setAttribute('value', modaliteModifiee.valeur);
			document.getElementById("modalite" + this.props.modalite.idModalite + this.props.idModule).value = modaliteModifiee.valeur;


		}

		modulesChoisis[idModuleDansContrat].modalites = modalitesChoisies;


		this.props.changeForm({
			...this.props.formState, contrat: {
				...this.props.formState.contrat,
				modulesChoisis: modulesChoisis
			}
		});


	}


	_toDisplay() {
		//si la seule valeur de la modalité est "autre", on le display pas, sinon on le display
		if (this.props.modalite.valeurs[0].label === "Autres" && this.props.modalite.valeurs.length === 1) {

			return <input
				id={"valeur" + this.props.modalite.idModalite + this.props.idModule}
				type="textField"
				className="form-control"
				placeholder="test"
				value={this.value}
				onChange={this._onChangeTextField}
			/>
		}
		else {
			return (
				<div><select
					id={"modalite" + this.props.modalite.idModalite + this.props.idModule}
					name="modalite"
					className="form-control"
					value={this.label}
					onChange={this._onChangeSelectValue}
				>
					<option value=""> -- select an option --</option>
					{
						this.props.modalite.valeurs.map((element) => {
							return (<option
								key={element.idValeur}
								id={element.idValeur}
								value={element.valeur}
								label={element.label}

							>
								{
									element.label
								}
							</option>);

						})}
				</select>
					<input
						id={"valeur" + this.props.modalite.idModalite + this.props.idModule}
						type="textField"
						className="form-control"
						placeholder="test"
						value={this.value}
						style={{display: "none"}}
						onChange={this._onChangeTextField}
					/>
				</div>);
		}
	}

	//loop dans formState.modules pour trouver les bonnes modalités

	render() {
		let idModuleDansContrat;
		for (let i = 0; i < this.props.formState.contrat.modulesChoisis.length; i++) {
			if (parseInt(this.props.formState.contrat.modulesChoisis[i].idModule, 10) === parseInt(this.props.idModule, 10)) {
				idModuleDansContrat = i;
			}
		}
		let modalitesChoisies = JSON.parse(JSON.stringify(this.props.formState.contrat.modulesChoisis[idModuleDansContrat].modalites));
		let choosed = false;
		modalitesChoisies.forEach(mod => {
			if(this.props.modalite.idModalite === mod.idModalite) {
				choosed = true;
			}
		});
		return <div>
			<div className="form-group column">
				<label id={this.props.modalite.idModalite} className="col-form-label">{this.props.modalite.nom}</label>
				<div className="tooltipp" style={{cursor: "pointer", position: 'relative', right: '-8px', top: 0}}>
					<span className="fa fa-info"/>
					<span className="tooltipptext">{this.props.modalite.description}</span>
				</div>
				{
					choosed &&
					<span className="fa fa-pencil" style={{
						cursor: "pointer",
						position: 'relative',
						right: '-10px',
						top: 0
					}}
						  data-toggle="modal"
						  data-target={"#" + this.props.modalite.idModalite + "modalite"}/>
				}

				{
					this._toDisplay()
				}

			</div>
		</div>
	}
}

export default (DisplayOneModalite);
