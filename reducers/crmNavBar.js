import {
	ADD_SUBCONTRACT_NAV,
	ADD_SUBCUSTOMER_NAV, ADD_SUBSUPPLIER_NAV,
	ADD_SUBUSER_NAV, DISPLAY_SUBCONTRACT_NAV, DISPLAY_SUBCUSTOMER_NAV, DISPLAY_SUBSUPPLIER_NAV,
	DISPLAY_SUBUSER_NAV
} from '../actions/crmNavBar';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
	displaySubCustomer : false,
	linksSubCustomer: [],
	displaySubSupplier : false,
	linksSubSupplier: [],
	displaySubUser : false,
	linksSubUser: [],
	displaySubContract: false,
	linksSubContract: [],
	errors: '',
};

export default function reducer (state = initialState, action ){

	switch (action.type){

		case ADD_SUBUSER_NAV:
			return {...state ,linksSubUser: action.newSubUser , error:''};
		case DISPLAY_SUBUSER_NAV:
			return {...state ,displaySubUser: action.display , error:''};
		case ADD_SUBCUSTOMER_NAV:
			return {...state ,linksSubCustomer: action.newSubCustomer , error:''};
		case DISPLAY_SUBCUSTOMER_NAV:
			return {...state ,displaySubCustomer: action.display , error:''};
		case ADD_SUBSUPPLIER_NAV:
			return {...state ,linksSubSupplier: action.newSubSupplier , error:''};
		case DISPLAY_SUBSUPPLIER_NAV:
			return {...state ,displaySubSupplier: action.display , error:''};
		case ADD_SUBCONTRACT_NAV:
			return {...state ,linksSubContract: action.newSubContract , error:''};
		case DISPLAY_SUBCONTRACT_NAV:
			return {...state ,displaySubContract: action.display , error:''};
		default:
			return state

	}

}
