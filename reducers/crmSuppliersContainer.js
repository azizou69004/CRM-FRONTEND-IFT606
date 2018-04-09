import {
	CHANGE_VIEW_SUPP
}  from '../actions/crmSuppliersContainer';


let initialState = {
    view: '',
    errors: '',
};

export default function reducer (state = initialState, action ){

    switch (action.type){

        case CHANGE_VIEW_SUPP:
            return {...state ,view: action.newView , error:''};
        default:
            return state

    }

}
