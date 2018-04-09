import {
	CHANGE_GRID, CHANGE_ID_DISPLAY, CHANGE_LAYOUT, CHANGE_NEW_FIELD, CHANGE_REQUIRED_FIELDS, CHANGE_UPDATE_FIELD,
	UPDATE_ACTIVITES,
	UPDATE_CHAMP_TYPES,
	UPDATE_ETATS, UPDATE_PROVENANCES,
	UPDATE_RELEVES
} from '../actions/crmGridLayout';

//ajouter le reste dans l'import

let initialState = {
	releves: [],
	champTypes: [],
	activites: [],
	etats: [],
	provenances: [],
	requiredFields: {
		nomEntreprise: '',
		releve: '1',
		rue: '',
		ville: '',
		province: '',
		codePostal: '',
		telephone: '',
		extension: '',
		activite: '1',
		etat: '1',
		provenance: '1',
		prospect: true,
		notes: ''
	},
	grid: [],
	layouts: {},
	formNewField:  {
		description: '',
		label: '',
		type: "1"
	},
	formUpdateField: {
		nameField: '',
		descField: ''
	},
	idToDisplay: '',
	errors: ''
};

export default function reducer (state = initialState, action ){

	switch (action.type){

		case CHANGE_LAYOUT:
			return {...state ,layouts: action.newLayout , error:''};
		case CHANGE_GRID:
			return {...state ,grid: action.newGrid , error:''};
		case UPDATE_RELEVES:
			return {...state,releves: action.releves, error:''};
		case UPDATE_CHAMP_TYPES:
			return {...state,champTypes: action.champTypes, error:''};
		case UPDATE_ACTIVITES:
			return {...state,activites: action.activites, error:''};
		case UPDATE_ETATS:
			return {...state,etats: action.etats, error:''};
		case UPDATE_PROVENANCES:
			return {...state,provenances: action.provenances, error:''};
		case CHANGE_REQUIRED_FIELDS:
			return {...state ,requiredFields: action.newRequiredFields , error:''};
		case CHANGE_NEW_FIELD:
			return {...state ,formNewField: action.newField , error:''};
		case CHANGE_UPDATE_FIELD:
			return {...state ,formUpdateField: action.newUpdateField , error:''};
		case CHANGE_ID_DISPLAY:
			return {...state ,idToDisplay: action.newId , error:''};
		default:
			return state

	}

}
