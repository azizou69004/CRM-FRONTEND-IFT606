import {
	CHANGE_LOADING,
	CHANGE_VIEW_DASH
} from '../actions/crmDashboard';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
    view: 'Home',
	loading: false,
    errors: '',
};

export default function reducer (state = initialState, action ){

    switch (action.type){

        case CHANGE_VIEW_DASH:
            return {...state ,view: action.newView , error:''};
		case CHANGE_LOADING:
			return {...state ,loading: action.newLoading , error:''};
        default:
            return state

    }

}
