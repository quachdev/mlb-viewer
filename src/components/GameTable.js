import React from 'react';
import ReactDOM from 'react-dom';
import GameDate from './GameDate.js';
import GameList from './GameList.js';

var GameTable = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			day: '',
			month: '',
			year: '',
		};
	},
	componentDidMount: function() {
		$.ajax({
		  url: this.props.url,
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({
		    	data: data.data.games.game,
		    	day: data.data.games.day,
		    	month: data.data.games.month,
		    	year: data.data.games.year,
		    });
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<GameDate month={this.state.month} day={this.state.day} year={this.state.year} />
					<GameList data={this.state.data} />
				</div>
			</div>
		);
	}

});

module.exports = GameTable;