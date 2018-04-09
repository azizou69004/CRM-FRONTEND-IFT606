import React from 'react';
import '../style/CreationUser.css';
import LoadingAnimation from "../components/LoadingAnimation";

class DisplayUser extends React.Component{

	constructor(props){
		super(props);
		this.props.getOperations();
		this._getPermission=this._getPermission.bind(this);
		this._handleClickDelete=this._handleClickDelete.bind(this);
	}

	_getPermission(level){
		let label='';
		this.props.formState.operations.forEach(element=>{
			if(level===element.value){
				label = element.label;
			}
		});
		return label;
	}

	_handleClickDelete(){
		this.props.deleteUser(this.props.user.id);
		this.props.changeView("");
	}

	render(){

		return (
			<div>
				{
					this.props.loading && <LoadingAnimation/>
				}
				{
					!this.props.loading &&
					<div className="container">
						<div className="page-header" style={{paddingBottom:20}}>
							<h1>Consultation de l'utilisateur {this.props.user.titre} {this.props.user.name} {this.props.user.lastname}</h1></div>
						<div className="row" style={{textAlign:"left", paddingBottom:10}}>
							<div className="col-sm">
								<span className="titre">Nom :</span>
								<span className="valeur"> {this.props.user.lastname}</span>
							</div>
							<div className="col-sm">
								<span className="titre">Prénom :</span>
								<span className="valeur"> {this.props.user.name}</span>
							</div>
						</div>
						<div className="row" style={{textAlign:"left", paddingBottom:10}}>
							<div className="col-sm">
								<span className="titre">Rôle :</span>
								<span className="valeur">{this.props.user.role}</span>
							</div>
							<div className="col-sm">
								<span className="titre">Login:</span>
								<span className="valeur">{this.props.user.login}</span>
							</div>
						</div>
						<div className="row" style={{textAlign:"left", paddingBottom:10}}>
							<div className="col-sm">
								<span className="titre">Adresse e-mail:</span>
								<span className="valeur">{this.props.user.mail}</span>
							</div>
						</div>
						<div className="row" style={{textAlign:"left", paddingBottom:10}}>
							<div className="col-sm"><span className="titre">Permissions :</span></div>
						</div>
						<ul>
							{

								this.props.user.userPerms.map(element=>{
									return(<div className="row col-sm " style={{textAlign:"left"}} key={element.id}><li><span className="valeur">Droit de {this._getPermission(element.level)} sur la partie {element.group}</span></li></div>);

								})}
						</ul>
						<div className="row">
							<div className="col-sm" style={{textAlign:"left"}}><button onClick={()=>this.props.changeView("UpdateUser")}>Modifier </button></div>
							<div className="col-sm" style={{textAlign:"left"}}><button className="delete" onClick={this._handleClickDelete}>Supprimer</button></div>
						</div>

					</div>
				}

			</div>
		);
	}
}

export default (DisplayUser);
