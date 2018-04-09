import React, { Component } from 'react';
import {GridCreationFournisseur} from "../components/form/GridCreationProvider/GridCreationFournisseur";
import {connect} from "react-redux";
import {
	changeGridFour, changeLayoutFour, changeNewFieldSup, changeRequiredSup, changeUpdateFieldSup, createNewFieldSup,
	createSuppliersFile, deleteFieldSup,
	requestGridFour, updateFieldSup,
	updatePositionsSup,
	updateSuppliersFile
} from "../actions/crmGridLayoutSuppliers";
import {changeLoading, changeLoadingValidation} from "../actions/crmDashboard";

class CreationFournisseur extends Component {
    constructor(props) {
        super(props);
		window.scrollTo(0,0);
        this._handleStatic = this._handleStatic.bind(this);
        this._handleSubmitCreate = this._handleSubmitCreate.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);
        this._handleSubmitChamp = this._handleSubmitChamp.bind(this);
        this._handleDrag = this._handleDrag.bind(this);
        this._handleNonStatic = this._handleNonStatic.bind(this);
        this._handleChangeInput = this._handleChangeInput.bind(this);
        this._handleModifyField = this._handleModifyField.bind(this);

		if(this.props.view === 'newSupplier') {
			this.props.requestGridFour();
		}

    }

	//Rends les champs static
    _handleStatic() {
		let {layouts} = this.props.crmGridSuppliersLayout;
		let layout = [];
        for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: true});
        }
		this.props.changeLayoutFour({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    //Change le state: sauvegarde la position des champs
    _handleDrag(newItem) {
		this.props.changeLayoutFour({lg: newItem, md: newItem, sm: newItem, xs: newItem, xxs: newItem});
		this.props.updatePositionsSup({newItem});
    }

    //Rends les champs non-static, on peut les déplacer
    _handleNonStatic() {
		let {layouts} = this.props.crmGridSuppliersLayout;
		let layout = [];
		for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: false});
		}
		this.props.changeLayoutFour({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    //On récupère le grid et le layout pour les envoyer au back-end grâce au middleware (Creation du fournisseur)
    _handleSubmitCreate(event) {
       event.preventDefault();
       this.props.changeLoadingValidation(true);
       let {grid, requiredFields} = this.props.crmGridSuppliersLayout;
       let {arrayContacts} = this.props.crmContacts;
       this._handleStatic();
       this.props.createSuppliersFile({grid, requiredFields, arrayContacts});
       console.log("submit file");
    }

    //On récupère le grid et le layout pour les envoyer au back-end grâce au middleware (Modification du fournisseur)
	_handleSubmitUpdate(event) {
		event.preventDefault();
		this.props.changeLoadingValidation(true);
		let {grid, requiredFields} = this.props.crmGridSuppliersLayout;
		let {arrayContacts, delcontacts, postes} = this.props.crmContacts;
		//On récupère les contacts à modifier
		let updatedContacts = [];
		arrayContacts.forEach(contact => {
			if(contact.libelletitre) {
				let poste = 1;
				postes.forEach(element => {
					if(element.libelleposte === contact.libelleposte) {
						poste = element.idposte;
					}
				});
				updatedContacts.push( {
					...contact,
					idposte: poste,
					titre: contact.libelletitre
				})
			}
		});
		let newcontacts = arrayContacts.filter( contact => {
			return !contact.idpersonne;
		});
		this._handleStatic();
		this.props.updateSuppliersFile({grid, requiredFields, newcontacts, delcontacts, updatedContacts});
		console.log("submit file");
	}

	//Change le state : Sauvegarde la valeur des champs
    _handleChangeInput(event) {
    	let {grid} = this.props.crmGridSuppliersLayout;
    	for (let champ = 0 ; champ < grid.length ; champ++) {
    		if(event.target.id === grid[champ].label) {
    			grid[champ].value = event.target.value;
			}
		}
		this.props.changeGridFour(grid);
	}

	//On crée un nouveau champ !
    _handleSubmitChamp(event) {
        event.preventDefault();
		let {grid, formNewField} = this.props.crmGridSuppliersLayout;
		let x = (grid.length % 4)*3;
		let y = Math.floor(grid.length/4);

		document.getElementById('champNom').value = '';
		document.getElementById('champDescription').value = '';
		document.getElementById('champType').value = '';
		this.props.createNewFieldSup({form: formNewField, posx: x, posy: y});
    }

	_handleModifyField(event) {
		event.preventDefault();
		let {formUpdateField} = this.props.crmGridSuppliersLayout;
		this.props.updateFieldSup(formUpdateField);
	}

    render() {
		let {
			grid, layouts, requiredFields, formNewField,
			formUpdateField, champTypes
		} = this.props.crmGridSuppliersLayout;
		let {isAdmin} = this.props.crmLogin;
		let {loading, loadingValidation} = this.props.crmDashboard;
        return (
        	<div>
				{
					this.props.view === 'newSupplier'
					&& <GridCreationFournisseur handleStatic={this._handleStatic} handleSubmit={this._handleSubmitCreate} layouts={layouts}
												handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
												handleSubmitChamp={this._handleSubmitChamp} grid={grid}
												handleChangeInput={this._handleChangeInput} title="Création d'une fiche fournisseur"
												isAdmin={isAdmin} requiredFields={requiredFields}
												changeRequiredSup={this.props.changeRequiredSup}
												formNewField={formNewField} changeNewField={this.props.changeNewFieldSup}
												formUpdateField={formUpdateField} changeUpdateField={this.props.changeUpdateFieldSup}
												deleteField={this.props.deleteFieldSup} champTypes={champTypes}
												handleModifyField={this._handleModifyField}
												changeLoading={this.props.changeLoading} loading={loading}
												loadingValidation={loadingValidation}
						/>
				}
				{
					this.props.view === 'updateSupplier'
					&& <GridCreationFournisseur handleStatic={this._handleStatic} handleSubmit={this._handleSubmitUpdate} layouts={layouts}
												handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
												handleSubmitChamp={this._handleSubmitChamp} grid={grid}
												handleChangeInput={this._handleChangeInput} title="Modification d'une fiche fournisseur"
												isAdmin={isAdmin} requiredFields={requiredFields}
												changeRequiredSup={this.props.changeRequiredSup}
												formNewField={formNewField} changeNewField={this.props.changeNewFieldSup}
												formUpdateField={formUpdateField} changeUpdateField={this.props.changeUpdateFieldSup}
												deleteField={this.props.deleteFieldSup} champTypes={champTypes}
												handleModifyField={this._handleModifyField}
												changeLoading={this.props.changeLoading} loading={loading}
												loadingValidation={loadingValidation}
					/>
				}
			</div>
        )
    }
}

function mapStateToProps (state) {

	return{
		crmGridSuppliersLayout: state.crmGridSuppliersLayout,
		crmLogin: state.crmLogin,
		crmContacts: state.crmContacts,
		crmDashboard: state.crmDashboard
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
	return{
		changeLayoutFour: (newLayout) => {
			dispatch(changeLayoutFour(newLayout));
		},
		changeGridFour: (newGrid) => {
			dispatch(changeGridFour(newGrid));
		},
		requestGridFour: () => {
			dispatch(requestGridFour());
			dispatch(changeRequiredSup({
				nomEntreprise: '',
				rue: '',
				ville: '',
				province: '',
				codePostal: '',
				telephone: '',
				extension: '',
				code: '',
				bigGroup: true,
				lilGroup: true,
				employesBigGroup: '',
				employesLilGroup: ''
			}));
		},
		createSuppliersFile: (file) => {
			dispatch(createSuppliersFile(file));
		},
		updateSuppliersFile: (file) => {
			dispatch(updateSuppliersFile(file));
		},
		changeRequiredSup: (newRequiredFields) => {
			dispatch(changeRequiredSup(newRequiredFields));
		},
		updatePositionsSup: (positions) => {
			dispatch(updatePositionsSup(positions))
		},
		createNewFieldSup: (newField) => {
			dispatch(createNewFieldSup(newField))
		},
		changeNewFieldSup: (newField) => {
			dispatch(changeNewFieldSup(newField));
		},
		changeUpdateFieldSup: (newUpdateField) => {
			dispatch(changeUpdateFieldSup(newUpdateField));
		},
		deleteFieldSup: (field) => {
			dispatch(deleteFieldSup(field));
		},
		updateFieldSup: (field) => {
			dispatch(updateFieldSup(field))
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading));
		},
		changeLoadingValidation: (newLoading) => {
			dispatch(changeLoadingValidation(newLoading));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (CreationFournisseur)
