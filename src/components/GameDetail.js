import React from 'react';
import ReactDOM from 'react-dom';

var GameDetailPlayers = React.createClass({
	getInitialState: function() {
		return {
			batters: [],
		};
	},
	componentDidMount: function() {
		// Get the batters data from GameDetail component then setState to batters[];
		this.setState({
			batters: this.props.batters,
		});
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			batters: nextProps.batters
		});
	},
	render: function() {
		var batters = this.state.batters ? this.state.batters : null;
		var batter = batters ? batters.map(function(batter, i) {
			var name = batter.name;
			var ab = batter.ab;
			var r = batter.r;
			var h = batter.h;
			var rbi = batter.rbi;
			var bb = batter.bb;
			var so = batter.so;
			var avg = batter.avg;

			return(
				<tr key={i}>
					<td>{name}</td>
					<td>{ab}</td>
					<td>{r}</td>
					<td>{h}</td>
					<td>{rbi}</td>
					<td>{bb}</td>
					<td>{so}</td>
					<td>{avg}</td>
				</tr>
			);
		}) 
		:null;
		return (
			<div className="row">
				<div className="text-center">
					<h4>Batters for {this.props.teamPlaying}</h4>
				</div>
				<table className="table table-responsive table-striped">
				<tbody>
					<tr>
						<th>Name</th>
						<th>AB</th>
						<th>R</th>
						<th>H</th>
						<th>RBI</th>
						<th>BB</th>
						<th>SO</th>
						<th>AVG</th>
					</tr>
					{batter}
				</tbody>
				</table>
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
	componentDidMount: function() {
		var url = this.props.url ? 'http://gd2.mlb.com'+this.props.url+'/boxscore.json' : null; 
		this.loadData(url);
	},
	componentWillReceiveProps: function(nextProps) {
		var url = nextProps.url ? 'http://gd2.mlb.com'+nextProps.url+'/boxscore.json' : null; 
		this.loadData(url);
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
		    	data: data.data.boxscore.linescore.inning_line_score,
		    	batters: data.data.boxscore.batting,
		    	// Data is loaded (true) therefore is NOT loading (false) 
		    	isLoading: !this.props.isLoaded,

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
	handleClick: function(teamFlag, teamPlaying) {
		this.setState({ 
			flag: teamFlag,
			teamPlaying: teamPlaying
		});
	},
	render: function() {
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

		// Get array of batters
		var selectedFlag = this.state.flag;
		// Gets batter array that corresponds to whichever team (home or away) selected
		var getBatters = this.state.batters ? 
			this.state.batters.find(function(batting) {
				return batting.team_flag === selectedFlag;
			})
			: null
		;
		// Check if batter array exists
		// Exists after user clicks on one of the teams
		var batters = getBatters ? getBatters.batter : null;

		// Render the details view
		return (
			<div className="row">
				{!this.state.isLoading ? 
				<div className="col-md-2 col-md-offset-2 highlight">
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
					<button className={'btn btn-primary ' + (selectedFlag == 'home' ? 'active':'')} onClick={this.handleClick.bind(this, 'home', homeTeamName)}>{homeTeamName}</button>
					<button className={'btn btn-primary pull-right ' + (selectedFlag == 'away' ? 'active':'')} onClick={this.handleClick.bind(this, 'away', awayTeamName)}>{awayTeamName}</button>
				</div>
				:null
				}
				{batters ? <GameDetailPlayers batters={batters} teamPlaying={this.state.teamPlaying}/> : null }
			</div>
		);
	}
});

module.exports = GameDetail;