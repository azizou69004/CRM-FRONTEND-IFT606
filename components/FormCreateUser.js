import React from 'react';

export class FormCreateUser extends React.Component {

	constructor(props) {
		super(props);
		this.whatToRender = this.whatToRender.bind(this);
		this.onChangeRole = this.onChangeRole.bind(this);
		this.onChangeNom = this.onChangeNom.bind(this);
		this.onChangePrenom = this.onChangePrenom.bind(this);
		this.onChangeLogin = this.onChangeLogin.bind(this);
		this.onChangeMdp = this.onChangeMdp.bind(this);
		this.onChangeMail = this.onChangeMail.bind(this);
		this.onChangeTitre = this.onChangeTitre.bind(this);
	}

	componentDidMount(){
		if(this.props.view==="UpdateUser"){
			document.getElementById("login").disabled = true;
		}
	}

	componentDidUpdate(){
		if(this.props.formState.titre==="Mr"){
			document.getElementById("titreMr").checked = true;
		}
		else if(this.props.formState.titre === "Mme"){
			document.getElementById("titreMme").checked = true;
		}
	}

	onChangeTitre(event){
		let titre = event.target.value;
		this.props.changeForm({...this.props.formState, titre: titre});
	}

	onChangeRole(event) {
		let role = event.target.value;
		//quand on change le rôle, les permissions par défaut du rôle sélectionné s'attribuent aux userPerms
		let idRole;//id du role sélectionné dans la table des permissions par défaut
		for (let i = 0; i < this.props.formState.defaultPerms.length; i++) {
			if (role === this.props.formState.defaultPerms[i].role) {
				idRole = i;
			}
		}
		let defaultPerms = JSON.parse(JSON.stringify(this.props.formState.defaultPerms[idRole].droits));
		this.props.changeForm({...this.props.formState, role: role, userPerms: defaultPerms});
	}

	onChangeNom(event) {
		this.props.changeForm({...this.props.formState, nom: event.target.value});
	}

	onChangePrenom(event) {
		this.props.changeForm({...this.props.formState, prenom: event.target.value});
	}

	onChangeLogin(event) {
		this.props.changeForm({...this.props.formState, login: event.target.value});
	}

	onChangeMdp(event) {
		this.props.changeForm({...this.props.formState, mdpProv: event.target.value});
	}

	onChangeMail(event) {
		this.props.changeForm({...this.props.formState, mail: event.target.value});
	}

	whatToRender() {
		let mdp;

		if(this.props.view === "CreateUser"){
			mdp=(<div className="form-group row">
				<label id="mdpLabel" className="col-sm-3 col-form-label control-label">Mot de passe provisoire : </label>
				<div className="col-sm-9">
					<input
						id="mdp"
						type="textField"
						className="form-control"
						placeholder="Mot de passe provisoire que l'utilisateur changera"
						onChange={this.onChangeMdp}
						value={this.props.formState.mdpProv}/>
					<p id="mdpHelp" className="help-block text-danger">Veuillez assigner un mot de passe provisoire.<br />
					L'utilisateur le changera par la suite</p>
				</div>

			</div>)
		}
		return <div>
			<div className="form-group row"><label id="titreLabel" className="col-sm-3 col-form-label">Titre : </label>
					<label className="radio-inline col-sm-3"><input id="titreMr" type="radio" name="titre" onClick={this.onChangeTitre} value="Mr"/> Monsieur</label>
					<label className="radio-inline col-sm-3"><input id="titreMme" type="radio" name="titre" onClick={this.onChangeTitre} value="Mme"/> Madame </label>
				<p id="titreHelp" className="help-block text-danger">Sélectionner un titre</p>
			</div>
			<div className="form-group row"><label id="lastNameLabel" className="col-sm-3 col-form-label">Nom : </label>
				<div className="col-sm-3"><input
					id="lastName"
					type="textField"
					className="form-control"
					placeholder="Nom"
					onChange={this.onChangeNom}
					value={this.props.formState.nom}/>
					<p id="lastNameHelp" className="help-block text-danger">Veuillez rentrer le nom de l'utilisateur</p>
				</div>
				<label id="nameLabel" className="col-sm-2 col-form-label">Prénom : </label>
				<div className="col-sm-4"><input
					id="name"
					type="textField"
					className="form-control"
					placeholder="Prénom"
					onChange={this.onChangePrenom}
					value={this.props.formState.prenom}/>
					<p id="nameHelp" className="help-block text-danger">Veuillez rentrer le prénom de l'utilisateur</p>

				</div>
			</div>
			<br/>
			<div className="form-group row">
				<label id="loginLabel" className="col-sm-3 col-form-label">Login : </label>
				<div className="col-sm-9">
					<input
						type="textField"
						className="form-control"
						placeholder="Login"
						id="login"
						onChange={this.onChangeLogin}
						value={this.props.formState.login}/>
					<p id="loginHelp" className="help-block text-danger">Veuillez rentrer le login de l'utilisateur</p>
					<p id="loginInvalid" className="help-block text-danger">Veuillez rentrer un login valide (pas de caractères spéciaux)</p>

				</div>

			</div>
			{
				this.props.view === "CreateUser" && mdp
			}
			<br/>
			<div className="form-group row">
				<label id="mailLabel" className="col-sm-3 col-form-label">Adresse e-mail : </label>
				<div className="col-sm-9">
					<input
						id="mail"
						type="email"
						className="form-control"
						placeholder="adressemail@email.ca"
						onChange={this.onChangeMail}
						value={this.props.formState.mail}/>
					<p id="mailHelp" className="help-block text-danger">
						Veuillez rentrer l'adresse e-mail de l'utilisateur
					</p>
					<p id="mailInvalid" className="help-block text-danger">
						Veuillez rentrer une adresse mail valide (forme xxx@xxx.xxx)
					</p>

				</div>

			</div>
			<br/>
		</div>;
	}

	render() {
		let fields = this.whatToRender();
		return <div>
			<form className="container">
				<div className="form-group row">
					<label id="roleLabel" className="col-sm-3 col-form-label">Rôle :</label>
					<div className="col-sm-9">
						<select
							id="role"
							name="role"
							className="form-control"
							onChange={this.onChangeRole}
							value={this.props.formState.role}>
							<option disabled value=""> -- select an option -- </option>
							{
								this.props.formState.roles.map((element) => {
										return (<option
											key={element.description}
											value={element.description}
											>
											{
												element.description
											}
										</option>);

								})}
						</select>
						<p id="roleHelp" className="help-block text-danger">Veuillez sélectionner un rôle</p>

					</div>
				</div>
				{fields}
			</form>
		</div>;
	}
}
