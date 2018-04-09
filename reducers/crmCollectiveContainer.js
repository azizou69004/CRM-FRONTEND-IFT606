import {
    CHANGE_VIEW_COLL
}  from '../actions/crmCollectiveContainer';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
    view: '',
    errors: '',
};

export default function reducer (state = initialState, action ){

    switch (action.type){

        case CHANGE_VIEW_COLL:
            return {...state ,view: action.newView , error:''};
        default:
            return state

    }

}