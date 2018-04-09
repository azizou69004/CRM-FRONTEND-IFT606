import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {CLEAR_SESSION} from '../actions/crmLogin';
import crmLogin from './crmLogin';
import crmReset from './crmReset';
import crmResetPassword from './crmResetPassword';
import crmRechercheCollective from './crmRechercheCollective';
import crmRechercheFournisseur from './crmRechercheFournisseur';
import crmCreateUser from './crmCreateUser';
import crmDashboard from "./crmDashboard";
import crmCollectiveContainer from './crmCollectiveContainer';
import crmUserManagement from './crmUserManagement';
import crmGridLayout from './crmGridLayout';
import crmClientList from './crmClientList'
import crmNavBar from './crmNavBar';
import crmSuppliersContainer from './crmSuppliersContainer';
import crmGridSuppliersLayout from './crmGridSuppliersLayout';
import crmContract from './crmContract';
import crmContacts from './crmContacts';
// TODO les autres reducers a rajouter ici


const appReducer = combineReducers({
	routerReducer,
	crmLogin,
	crmReset,
	crmRechercheCollective,
	crmRechercheFournisseur,
	crmCreateUser,
	crmResetPassword,
	crmDashboard,
	crmCollectiveContainer,
	crmUserManagement,
	crmGridLayout,
	crmClientList,
	crmNavBar,
	crmSuppliersContainer,
	crmGridSuppliersLayout,
	crmContract,
	crmContacts
});

const rootReducer = (state, action) => {
	switch (action.type) {
		case CLEAR_SESSION:
			const {routerReducer, crmLogin} = state;
			state = {routerReducer, crmLogin};
			break;
		default:
			break;
	}
	return appReducer(state, action);
};

export default rootReducer;
