import {
    CHANGE_FORM_FOUR,
    GET_REQUEST_FOUR,
    SEARCH_FOUR
}  from '../actions/crmRechercheFournisseur';

//ajouter le reste dans l'import

//pour le register e mail
let initialState = {
    formState:{
        nomEntreprise:'',
        employesLilGroup: '',
		employesBigGroup: '',
        nomContact: '',
        code: ''
    },
    dossiersState: [],
    searchList: [],
    errors: '',
};

export default function reducer (state = initialState, action ){

    switch (action.type){

        case CHANGE_FORM_FOUR:
            return {...state ,formState: action.newFormState , error:''};
        case GET_REQUEST_FOUR:
            return {...state, dossiersState: action.newDossiersState, error:''};
        case SEARCH_FOUR:
            return {...state, searchList: action.newSearchList, error:''};
        default:
            return state

    }

}
