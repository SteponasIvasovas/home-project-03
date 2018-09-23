import React, { Component, Fragment } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { fetchServerList } from "./../../store/actions";
import DataTable from "./../../components/DataTable/DataTable.js";
import Navbar from "./../../components/Navbar/Navbar.js";
import classes from "./MainScreen.scss";

const DATA_TABLE_HEADERS = ["Server", "Distance"];

class MainScreen extends Component {
	componentDidMount() {
		this.props.getServerList();
	}
	render() {
		return (
			<Fragment>
				<Navbar />
				<DataTable headers={DATA_TABLE_HEADERS} allData={this.props.serverList} />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	serverList: state.serverList,
});

const mapDispatchToProps = dispatch => ({
	getServerList: () => dispatch(fetchServerList()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainScreen);
