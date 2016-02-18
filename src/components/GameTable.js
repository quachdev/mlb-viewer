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
			isLoading: true
		};
	},
	componentDidMount: function() {
		var url = "http://gd2.mlb.com/components/game/mlb/year_"+this.props.year+"/month_"+this.props.month+"/day_"+this.props.day+"/master_scoreboard.json";
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
		    	isLoading: false
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
					{!this.state.isLoading ?
						<GameDate month={this.state.month} day={this.state.day} year={this.state.year} />
						: null
					}
					{!this.state.isLoading ?
						<GameList data={this.state.data} />
						: null 
					}
				</div>
			</div>
		);
	}

});

module.exports = GameTable;