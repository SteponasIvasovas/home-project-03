import React, { Component } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Route, withRouter } from "react-router-dom";
import { authCheck } from "./../../store/actions/index.js";
import asyncComponent from "./../../hoc/asyncComponent.js";
const LoginScreen = asyncComponent(() => import("./../LoginScreen/LoginScreen.js"));
const MainScreen = asyncComponent(() => import("./../MainScreen/MainScreen.js"));

class App extends Component {
	state = {
		mounted: false,
	};
	componentDidMount() {
		this.props.checkIfLoggedIn();
		this.setState({
			mounted: true,
		});
	}
	render() {
		//papildomas checkas galimam memmory leakui sutvarkyti
		if (!this.state.mounted) return null;
		let pageUI;

		if (this.props.isLoggedIn) {
			pageUI = <Route path="/" component={MainScreen} />;
		} else {
			pageUI = <Route path="/" component={LoginScreen} />;
		}

		return pageUI;
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
	checkIfLoggedIn: () => dispatch(authCheck()),
});

export default hot(module)(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
