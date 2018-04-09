import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux';
import {PrivateRoute, PublicRoute} from "./components/CustomRoute";
import ErrorPage from "./components/ErrorPage";
import DashboardContainer from "./containers/DashboardContainer";
import LoginPage from "./containers/LoginPage";
import ResetPage from "./containers/ResetPage";
import ResetPagePassword from "./containers/ResetPagePasswordContainer";
import {history, store} from './store.js';
import './style/App.css';

class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<PublicRoute
							exact
							path="/"
							component={LoginPage}/>
						<PrivateRoute
							exact
							path="/Home"
							component={DashboardContainer}/>
						<PublicRoute
							exact
							path="/Reset"
							component={ResetPage}/>
						<PublicRoute
							exact
							path="/ResetPassword/:token"
							component={ResetPagePassword}/>
						<Route
							component={ErrorPage}/>
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}

}

export default App;
