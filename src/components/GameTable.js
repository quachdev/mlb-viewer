import React from 'react';
import ReactDOM from 'react-dom';
import GameDate from './GameDate.js';
import GameList from './GameList.js';

var DateChange = React.createClass({
	render: function() {
		return (
			<div className="col-md-1 col-sm-3">
				<form onSubmit={this.props.handleSubmit} >
					<div className="form-group">
					    <label htmlFor="year">Year</label>
					    <input type="text" name="year" id="year" className="form-control" value={this.props.year} placeholder="yyyy" onChange={this.props.handleYearChange} />
					</div>
					<div className="form-group">
					    <label htmlFor="month">Month</label>
					    <input type="text" name="month" id="month" className="form-control" value={this.props.month} placeholder="mm" onChange={this.props.handleMonthChange} />
					</div>
					<div className="form-group">
					    <label htmlFor="day">Day</label>
					    <input type="text" name="day" id="day" className="form-control" value={this.props.day} placeholder="dd" onChange={this.props.handleDayChange} />
					</div>
					<button type="submit" className="btn btn-default">Change Date</button>
				</form>
			</div>
		);
	}
});

var GameTable = React.createClass({
	getInitialState: function() {
		return {
			url: '',
			data: [],
			day: '',
			month: '',
			year: '',
			isLoading: true,
			ajaxSuccess: true
		};
	},
	componentDidMount: function() {
		this.loadData(this.props.url);
	},
	loadData: function(url) {
		$.ajax({
		  url: url,
		  dataType: 'json',
		  xhrFields: {
		    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		    // This can be used to set the 'withCredentials' property.
		    // Set the value to 'true' if you'd like to pass cookies to the server.
		    // If this is enabled, your server must respond with the header
		    // 'Access-Control-Allow-Credentials: true'.
		    withCredentials: false
		  },
		  cache: false,
		  success: function(data) {
		    this.setState({
		    	data: data.data.games.game,
		    	day: data.data.games.day,
		    	month: data.data.games.month,
		    	year: data.data.games.year,
		    	isLoading: false,
		    	ajaxSuccess: true
		    });
		  }.bind(this),
		  error: function(xhr, status, err) {
		  	this.setState({
		  		ajaxSuccess: false
		  	});
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	handleYearChange: function(e) {
		this.setState({
			year: e.target.value.substr(0, 4)
		});
	},
	handleMonthChange: function(e) {
		this.setState({
			month: e.target.value.substr(0, 2)
		});
	},
	handleDayChange: function(e) {
		this.setState({
			day: e.target.value.substr(0, 2)
		});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		console.log(this.state.year.length);
		var year = this.state.year;
		var month = this.state.month;
		var newMonth = month.length == 1 ? '0'+month : month;
		var day = this.state.day;
		var newDay = day.length == 1 ? '0'+day : day;
		var url = "http://gd2.mlb.com/components/game/mlb/year_"+year+"/month_"+newMonth+"/day_"+newDay+"/master_scoreboard.json";
		this.loadData(url);
	},
	render: function() {
		return (
			<div className="row">
				{this.state.ajaxSuccess ?
				<DateChange year={this.state.year} month={this.state.month} day={this.state.day} handleSubmit={this.handleSubmit} handleYearChange={this.handleYearChange} handleMonthChange={this.handleMonthChange} handleDayChange={this.handleDayChange} />

				:<div>
					<h4>Invalid Date please set the correct date.</h4>
					<DateChange year={this.state.year} month={this.state.month} day={this.state.day} handleSubmit={this.handleSubmit} handleYearChange={this.handleYearChange} handleMonthChange={this.handleMonthChange} handleDayChange={this.handleDayChange} />
				</div>
				}
				{this.state.ajaxSuccess ?
				<div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3">
					{!this.state.isLoading ?
						<GameDate month={this.state.month} day={this.state.day} year={this.state.year} />
						: null
					}
					{!this.state.isLoading ?
						<GameList data={this.state.data} />
						: null 
					}
				</div>
				: ''
				}
			</div>
		);
	}

});

module.exports = GameTable;