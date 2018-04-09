/** Imports **/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeForm, resetRequest} from '../actions/crmResetPassword'
import ResetPagePassword from '../components/form/ResetPagePassword';

/** Styles **/
import '../style/Reset.css';

/** Container Reset Password **/
class ResetPagePasswordContainer extends Component {
	render() {
		let {formState, isLoading, error} = this.props.crmResetPassword;

		// Get the Token from the URL
		let token = this.props.match.params.token;

		return (
			<ResetPagePassword
				changeForm={this.props.changeForm}
				error={error}
				formState={formState}
				isLoading={!!isLoading}
				onSubmit={this.props.resetRequest}
				token={token}
			/>
		)
	}
}

/** Redux **/
function mapStateToProps(state) {
	return {
		crmResetPassword: state.crmResetPassword
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeForm: (newFormState) => {
			dispatch(changeForm(newFormState))
		},
		resetRequest: (formData, token) => {
			dispatch(resetRequest(formData, token))
		}
	}
};

/** Export **/
export default connect(mapStateToProps, mapDispatchToProps)(ResetPagePasswordContainer)
