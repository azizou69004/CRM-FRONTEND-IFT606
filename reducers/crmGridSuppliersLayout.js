import {
	CHANGE_GRID_FOUR, CHANGE_ID_DISPLAY_SUP, CHANGE_LAYOUT_FOUR, CHANGE_NEW_FIELD_SUP, CHANGE_REQUIRED_SUP,
	CHANGE_UPDATE_FIELD_SUP,
	UPDATE_CHAMP_TYPES_SUP
} from '../actions/crmGridLayoutSuppliers';
//ajouter le reste dans l'import

let initialState = {
	grid: [],
	layouts: {},
	champTypes: [],
	requiredFields: {
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
		employesLilGroup: '',
	},
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
		case UPDATE_CHAMP_TYPES_SUP:
			return {...state,champTypes: action.champTypes, error:''};
		case CHANGE_LAYOUT_FOUR:
			return {...state ,layouts: action.newLayout , error:''};
		case CHANGE_GRID_FOUR:
			return {...state ,grid: action.newGrid , error:''};
		case CHANGE_REQUIRED_SUP:
			return {...state ,requiredFields: action.newRequiredFields , error:''};
		case CHANGE_NEW_FIELD_SUP:
			return {...state ,formNewField: action.newField , error:''};
		case CHANGE_UPDATE_FIELD_SUP:
			return {...state ,formUpdateField: action.newUpdateField , error:''};
		case CHANGE_ID_DISPLAY_SUP:
			return {...state ,idToDisplay: action.newId , error:''};
		default:
			return state

	}

}
