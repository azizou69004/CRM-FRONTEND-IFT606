import {AuthFlow} from './LoginSaga';
import {ResetEmailFlow} from './ResetSaga';
import {ResetPasswordFlow} from './ResetPasswordSaga';
import {SearchCollectiveFlow} from './CollectiveSaga';
import {all} from 'redux-saga/effects';
import {FournisseursFlow} from "./FournisseurSaga";
import{gestionUserFlow} from "./GestionUserSaga";
import {GridFlow} from './GridLayoutSaga'
import {ClientListFlow} from "./ClientListSaga";
import {ContactsFlow} from "./ContactsSaga";
import {GridFlowSup} from "./GridLayoutSuppliersSaga";
import {ContractsFlow} from "./ContractSaga";


export default function * root(){

	yield all ([AuthFlow(), ResetEmailFlow(), SearchCollectiveFlow(),
		FournisseursFlow(), ResetPasswordFlow(), gestionUserFlow(),
		GridFlow(), GridFlowSup(), ClientListFlow(),
		ContactsFlow(), ContractsFlow()])
}
