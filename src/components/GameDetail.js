import React from 'react';
import ReactDOM from 'react-dom';

var GameDetailPlayers = React.createClass({
	getInitialState: function() {
		return {
			batters: []
		};
	},
	componentWillReceiveProps: function(nextProps) {
		// Get the batters data from GameDetail component then setState to batters[];
	},
	render: function() {
		return (
			<div>
				{this.state.batters}
			</div>
		);
	}
});

var GameDetail = React.createClass({
	getInitialState: function() {
		return {
			isLoading: true,
			data: [],
			batters: [],
			flag: '',

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
		  	console.log('Inning Data: '+ data.data.boxscore.linescore.inning_line_score);
		  	console.log('Batting Data: '+ data.data.boxscore.batting);
		    this.setState({
		    	data: data.data.boxscore.linescore.inning_line_score,
		    	batters: data.data.boxscore.batting,
		    	// Data is loaded (true) therefore is NOT loading (false) 
		    	isLoading: !nextProps.isLoaded,

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
	handleClick: function(teamFlag) {
		// setState of batters to whichever team is clicked (home, away)
		// this.setState({ batters: this.state.batters.teamFlag})???
		this.setState({ flag: teamFlag });
		console.log('Team: ' + teamFlag);
	},
	render: function() {
		// Get the home, away and inning values of each game 
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

		// Store variables with state of each value from ajax call in componentWillReceiveProps method
		var homeTeamRuns = this.state.homeTeamRuns ? this.state.homeTeamRuns : '';
		var homeTeamHits = this.state.homeTeamHits ? this.state.homeTeamHits : '';
		var homeTeamErrors = this.state.homeTeamErrors ? this.state.homeTeamErrors : '';
		var homeTeamCode = this.state.homeTeamCode ? this.state.homeTeamCode.toUpperCase() : '';
		var homeTeamName = this.state.homeTeamName ? this.state.homeTeamName : '';
		
		var awayTeamRuns = this.state.awayTeamRuns ? this.state.awayTeamRuns : '';
		var awayTeamHits = this.state.awayTeamHits ? this.state.awayTeamHits : '';
		var awayTeamErrors = this.state.awayTeamErrors ? this.state.awayTeamErrors : '';
		var awayTeamCode = this.state.awayTeamCode ? this.state.awayTeamCode.toUpperCase() : '';
		var awayTeamName = this.state.awayTeamName ? this.state.awayTeamName : '';

		// Get array of batters
		var selectedFlag = this.state.flag;
		var batters = this.state.batters.some(function(batting) {
			return batting.team_flag === selectedFlag;
		});
		console.log('batters: '+batters);

		return (
			<div className="row">
				{!this.state.isLoading ? 
				<div className="col-md-2 col-md-offset-2">
					<br />
					{homeTeamCode} <br />
					{awayTeamCode}
				</div>
				:null
				}
				{!this.state.isLoading ?
				<div className="col-md-8">
					<ul className="list-inline">
						{gameDetails}
						<li className="list-group-item">
							R <br />
							{homeTeamRuns} <br />
							{awayTeamRuns}
						</li>
						<li className="list-group-item">
							H <br />
							{homeTeamHits} <br />
							{awayTeamHits} 
						</li>
						<li className="list-group-item">
							E <br />
							{homeTeamErrors} <br />
							{awayTeamErrors}
						</li>
					</ul>
				</div>
				:null
				}
				{!this.state.isLoading ?
				<div className="row">
					<button className="btn" onClick={this.handleClick.bind(this, 'home')}>{homeTeamName}</button>
					<button className='btn pull-right' onClick={this.handleClick.bind(this, 'away')}>{awayTeamName}</button>
				</div>
				:null
				}
				<GameDetailPlayers batters={batters} />
			</div>
		);
	}
});

module.exports = GameDetail;