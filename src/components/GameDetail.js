import React from 'react';
import ReactDOM from 'react-dom';

var GameDetailPlayers = React.createClass({
	getInitialState: function() {
		return {
			players: []
		};
	},
	render: function() {
		return (
			<div>
				DetailedPlayers
			</div>
		);
	}

});

var GameDetail = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			homeTeamRuns: '',
			homeTeamHits: '',
			homeTeamErrors: '',
			homeTeamCode: '',
			homeTeamName: '',

			awayTeamRuns: '',
			awayTeamHits: '',
			awayTeamErrors: '',
			awayTeamCode: '',
			awayTeamName: '',
		};
	},
	componentWillReceiveProps: function(nextProps) {
		var url = 'http://gd2.mlb.com'+nextProps.url+'/boxscore.json';
		console.log('received prop url: ' + url);
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
		  	console.log(data.data.boxscore.linescore.inning_line_score);
		    this.setState({
		    	data: data.data.boxscore.linescore.inning_line_score,
		    	homeTeamRuns: data.data.boxscore.linescore.home_team_runs,
		    	homeTeamHits: data.data.boxscore.linescore.home_team_hits,
		    	homeTeamErrors: data.data.boxscore.linescore.home_team_errors,
		    	homeTeamCode: data.data.boxscore.home_team_code,
		    	homeTeamName: data.data.boxscore.home_sname,

		    	awayTeamRuns: data.data.boxscore.linescore.away_team_runs,
		    	awayTeamHits: data.data.boxscore.linescore.away_team_hits,
		    	awayTeamErrors: data.data.boxscore.linescore.away_team_errors,
		    	awayTeamCode: data.data.boxscore.away_team_code,
		    	awayTeamName: data.data.boxscore.away_sname,
		    });
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	render: function() {
		var gameDetails = this.state.data.map(function(linescore, i) {
			var linescoreHome = linescore.home;
			var linescoreAway = linescore.away;
			var linescoreInning = linescore.inning;

			return(
				<li key={i} className="list-group-item">
					{linescoreInning} <br />
					{linescoreHome} <br />
					{linescoreAway} 
				</li>
			);
		}, this);
		var homeTeamRuns = this.state.homeTeamRuns == '' ? '':'Home Team Runs: ' + this.state.homeTeamRuns;
		var homeTeamHits = this.state.homeTeamHits == '' ? '':'Home Team Hits: ' + this.state.homeTeamHits;
		var homeTeamErrors = this.state.homeTeamErrors == '' ? '':'Home Team Errors: ' + this.state.homeTeamErrors;
		var homeTeamCode = this.state.homeTeamCode == '' ? '':'Home Team Code: ' + this.state.homeTeamCode.toUpperCase();
		var homeTeamName = this.state.homeTeamName == '' ? '': this.state.homeTeamName;
		
		var awayTeamRuns = this.state.awayTeamRuns == '' ? '':'Away Team Runs: ' + this.state.awayTeamRuns;
		var awayTeamHits = this.state.awayTeamHits == '' ? '':'Away Team Hits: ' + this.state.awayTeamHits;
		var awayTeamErrors = this.state.awayTeamErrors == '' ? '':'Away Team Errors: ' + this.state.awayTeamErrors;
		var awayTeamCode = this.state.awayTeamCode == '' ? '':'Away Team Code: ' + this.state.awayTeamCode.toUpperCase();
		var awayTeamName = this.state.awayTeamName == '' ? '': this.state.awayTeamName;

		return (
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					{homeTeamCode} <br />
					{awayTeamCode}
					<ul className="list-inline">
						{gameDetails}
					</ul>
					<div>{homeTeamRuns}</div>
					<div>{awayTeamRuns}</div>

					<div>{homeTeamHits}</div>
					<div>{awayTeamHits}</div>

					<div>{homeTeamErrors}</div>
					<div>{awayTeamErrors}</div>

					<button className="btn">{homeTeamName}</button>
					<button className='btn pull-right'>{awayTeamName}</button>
				</div>
			</div>
		);
	}
});

module.exports = GameDetail;