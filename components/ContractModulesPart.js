import React from 'react';
import ModuleCreation from './ModuleCreation';

class ContractModulesPart extends React.Component{
	constructor(props){
		super(props);
		this._handleClickPlus=this._handleClickPlus.bind(this);
		this._modulesToReturn=this._modulesToReturn.bind(this);
	}



	//Si le state contrat a sélectionné un module, affichage d'un module
	// Si le state contrat a déjà des modules, loop dedans pour les afficher
	_handleClickPlus(event){

		let newInt = parseInt(JSON.parse(JSON.stringify(this.props.formState.intModulesToDisplay)), 10) + 1 ;
		this.props.changeForm({...this.props.formState, intModulesToDisplay:newInt});
	}


	_modulesToReturn(){
		let array = [];
		for(let i = 0; i < this.props.formState.intModulesToDisplay; i++){
			array[i] = i;
		}
		let toReturn = array.map(element=>{
			if(element!==0){
				return (

						<ModuleCreation id={"module"+element} key = {element} idComponent = {element}
										formState = {this.props.formState}
										view={this.props.view}
										changeForm = {this.props.changeForm}/>


				)
			}
			else {
				return "";
			}
		});
		return toReturn;
	}



	render(){
		let toReturn = this._modulesToReturn();
		return <div>
			<ModuleCreation idComponent = {0} formState = {this.props.formState}
							view={this.props.view}
							changeForm = {this.props.changeForm}/>

			{
				toReturn
			}
			{
				parseInt(this.props.formState.intModulesToDisplay,10) === this.props.formState.modulesToDisplay.length &&
				<button id="ajouter" onClick={this._handleClickPlus}>Ajouter un module</button>
			}

		</div>;
	}
}

export default (ContractModulesPart);
