import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';

import {changeFormCreateUser, submitUser, getRoles, getOperations, getDefaultPerms, updateUserPerms, updateUser} from "../actions/crmCreateUser";
import CreateUserPermissions from './CreateUserPermissions';


class CreateUser extends React.Component{

    constructor(props){
        super(props);
        this.props.getOperations();
        this.props.getDefaultPerms();
        this.props.getRoles();
        this._handleClick = this._handleClick.bind(this);
        this._validateForm = this._validateForm.bind(this);
        this._resetStyle=this._resetStyle.bind(this);
		if(this.props.view === "UpdateUser"){
			let newRole = JSON.parse(JSON.stringify(this.props.user.role));
			let newName = JSON.parse(JSON.stringify(this.props.user.lastname));
			let newLastName = JSON.parse(JSON.stringify(this.props.user.name));
			let newLogin = JSON.parse(JSON.stringify(this.props.user.login));
			let newMail = JSON.parse(JSON.stringify(this.props.user.mail));
			let newUserPerms = JSON.parse(JSON.stringify(this.props.user.userPerms));
			let userID=JSON.parse(JSON.stringify(this.props.user.id));
			let userTitre = JSON.parse(JSON.stringify(this.props.user.titre));
			this.props.changeForm({
				id:userID,
				titre:userTitre,
				role: newRole,
				nom: newName,
				prenom:newLastName,
				login: newLogin,
				mail: newMail,
				userPerms: newUserPerms,
				roles:[],
				operations:[],
				mdpProv:''
			});
		}
		else{
			this.props.changeForm({...this.props.formState,
				role: '',
				titre: '',
				nom: '',
				prenom:'',
				login: '',
				mail: '',
				mdpProv: '',
				userPerms: [],
				roles:[],
				operations:[],
			});
		}


    }

    componentDidMount(){
		document.getElementById("nameHelp").style.display = "none";
		document.getElementById("roleHelp").style.display = "none";
		document.getElementById("nameHelp").style.display = "none";
		document.getElementById("lastNameHelp").style.display = "none";
		document.getElementById("loginHelp").style.display = "none";
		if(this.props.view==="CreateUser"){
			document.getElementById("mdpHelp").style.display = "none";
		}
		document.getElementById("titreHelp").style.display="none";
		document.getElementById("mailHelp").style.display = "none";
		document.getElementById("mailInvalid").style.display = "none";
		document.getElementById("loginInvalid").style.display = "none";


	}



	_handleClick(event){
		let {formState} = this.props.crmCreateUser;
		let isValid = this._validateForm();
		if(isValid){
			if(this.props.view === "CreateUser"){
				this.props.submitUser(formState);
			}
			else{//Cas où on est en modification de l'utilisateur
				this.props.updateUser(formState);
			}
			this.props.changeView("");
		}
	}

	_validateForm(){
		this._resetStyle();
		let {formState} = this.props.crmCreateUser;
		let isValid = true;
		if(!formState.role){
			document.getElementById("roleLabel").className += " text-danger";
			document.getElementById("role").className += " is-invalid";
			document.getElementById("roleHelp").style.display = "block";
			isValid = false;
		}
		if(!formState.prenom){
			document.getElementById("nameLabel").className += " text-danger";
			document.getElementById("name").className += " is-invalid";
			document.getElementById("nameHelp").style.display = "block";
			isValid = false;
		}
		if(!formState.nom){
			document.getElementById("lastNameLabel").className += " text-danger";
			document.getElementById("lastName").className += " is-invalid";
			document.getElementById("lastNameHelp").style.display = "block";
			isValid = false;
		}
		if(!formState.login && this.props.view === "CreateUser" ){
			document.getElementById("loginLabel").className += " text-danger";
			document.getElementById("login").className += " is-invalid";
			document.getElementById("loginHelp").style.display = "block";
			isValid = false;
		}
		if(!/^[a-zA-Z0-9]{4,20}$/.test(formState.login)){
			document.getElementById("loginLabel").className += " text-danger";
			document.getElementById("login").className += " is-invalid";
			document.getElementById("loginInvalid").style.display = "block";
			isValid = false;
		}
		if(!formState.mdpProv && this.props.view === "CreateUser"){
			document.getElementById("mdpLabel").className += " text-danger";
			document.getElementById("mdp").className += " is-invalid";
			document.getElementById("mdpHelp").style.display = "block";
			isValid = false;
		}
		if(!formState.mail){
			document.getElementById("mailLabel").className += " text-danger";
			document.getElementById("mail").className += " is-invalid";
			document.getElementById("mailHelp").style.display = "block";
			isValid = false;
		}
		if(!formState.titre){
			document.getElementById("titreLabel").className += " text-danger";
			document.getElementById("titreHelp").style.display = "block";
			isValid = false;
		}
		if(!/[a-zA-Z0-9!#$%&amp;'*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*/.test(formState.mail)){
			document.getElementById("mailLabel").className += " text-danger";
			document.getElementById("mail").className += " is-invalid";
			document.getElementById("mailInvalid").style.display = "block";
			isValid = false;
		}
		return isValid;

	}

	_resetStyle(){
		document.getElementById("roleLabel").className = "col-sm-3 col-form-label";
		document.getElementById("role").className = "form-control";
		document.getElementById("lastNameLabel").className = "col-sm-3 col-form-label";
		document.getElementById("lastName").className = "form-control";
		document.getElementById("nameLabel").className = "col-sm-2 col-form-label";
		document.getElementById("name").className = "form-control";
		document.getElementById("loginLabel").className = "col-sm-3 col-form-label";
		document.getElementById("login").className = "form-control";
		if(this.props.view === "CreateUser"){
			document.getElementById("mdpLabel").className = "col-sm-3 col-form-label";
			document.getElementById("mdp").className = "form-control";
		}
		document.getElementById("mailLabel").className = "col-sm-3 col-form-label";
		document.getElementById("mail").className = "form-control";
		document.getElementById("titreLabel").className = "col-sm-3 col-form-label";

		document.getElementById("nameHelp").style.display = "none";
		document.getElementById("roleHelp").style.display = "none";
		document.getElementById("nameHelp").style.display = "none";
		document.getElementById("lastNameHelp").style.display = "none";
		document.getElementById("loginHelp").style.display = "none";
		document.getElementById("loginInvalid").style.display = "none";
		if(this.props.view==="CreateUser"){
			document.getElementById("mdpHelp").style.display = "none";
		}
		document.getElementById("mailHelp").style.display = "none";
		document.getElementById("mailInvalid").style.display = "none";
		document.getElementById("titreHelp").style.display = "none";


	}

    render() {
        let {formState} = this.props.crmCreateUser;
        return <div><div className="page-header" style={{paddingBottom:20}}><h1>{this.props.title}</h1></div>
            <FormCreateUser formState={formState}
							view={this.props.view}
							user={this.props.user}
                            changeForm={this.props.changeForm}
                            submitUser={this.props.submitUser}/>
            <CreateUserPermissions formState={formState}
								   view={this.props.view}
								   user={this.props.user}
                                   changeForm={this.props.changeForm}
								   updateUserPerms={this.props.updateUserPerms}/>
			<button onClick={this._handleClick}>{this.props.button}</button>
        </div>;
    }
}

function mapStateToProps (state) {
    return{
        crmCreateUser: state.crmCreateUser
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{

        changeForm : (newFormState) => {
            dispatch(changeFormCreateUser(newFormState))
        },
        submitUser : (formData) => {
            dispatch(submitUser(formData))
        },
        getOperations: () =>{
            dispatch(getOperations())
        },
        getDefaultPerms: () => {
            dispatch(getDefaultPerms())
        },
        updateUserPerms: (position, newValue) =>{
            dispatch(updateUserPerms(position, newValue))
        },
        getRoles : () => {
            dispatch(getRoles())
        },
		updateUser: (updatedUser) =>{
			dispatch(updateUser(updatedUser));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (CreateUser);
