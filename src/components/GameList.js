import React from 'react';
import ReactDOM from 'react-dom';
import GameDetail from './GameDetail.js';

var GameList = React.createClass({
	getInitialState: function() {
		return {
			gameUrl: '',
			isLoaded: false
		};
	},
	handleClick: function(gameUrl, i) {
		// console.log('clicked: ' + JSON.stringify(this.props.data[i]));
		this.setState({
			gameUrl: gameUrl,
			// isLoaded: !this.state.isLoaded
			isLoaded: true
		});
	},
	render: function() {
		// Create list view from data passed from GameTable.js
		// Sort the list first with anything with Blue Jays in the home/away team being first
		var list = this.props.data.some(function(game) {
			return (game.home_team_name == "Blue Jays")
		});
		// console.log('Home Team is Blue Jays: ' + list);
		var gameList = this.props.data.
		sort(function(game1, game2) {
			var matchGame1 = game1.home_team_name === 'Blue Jays' || game1.away_team_name === 'Blue Jays';
			var matchGame2 = game2.home_team_name === 'Blue Jays' || game2.away_team_name === 'Blue Jays';
			return (matchGame2 ? 1 : 0) - (matchGame1 ? 1 : 0);
		}).map(function(game, i) {
			// console.log('home team: ' + game.home_team_name + ' away team: ' + game.away_team_name);
			var homeTeamName = game.home_team_name;
			var homeTeamScore = game.linescore.r.home;
			var awayTeamName = game.away_team_name;
			var awayTeamScore = game.linescore.r.away;
			var gameStatus = game.status.status;

			var gameUrlFull = 'http://gd2.mlb.com'+game.game_data_directory+'/boxscore.json';
			var gameUrl = game.game_data_directory;
			var blueJays = homeTeamName || awayTeamName == "Blue Jays" ? '':'';
			var click = this.handleClick.bind(this, gameUrl, i);
			return (
				<li key={i} className="list-group-item" onClick={click}>
						<span className={parseInt(homeTeamScore, 10) > parseInt(awayTeamScore, 10) ? 'highlight':''}>
							{homeTeamName}
							<span className={'pull-right'}>{homeTeamScore}</span> <br />
						</span>
						<span className={parseInt(homeTeamScore, 10) < parseInt(awayTeamScore, 10) ? 'highlight':''}>
							{awayTeamName}
							<span className={'pull-right'}>{awayTeamScore}</span> <br />
						</span>
						{gameStatus}
				</li>
			);
		},(this));
		return (
			<div>
				<ul className="list-group">
					{gameList}
				</ul>
				{this.state.isLoaded ? <GameDetail url={this.state.gameUrl} isLoaded={this.state.isLoaded} /> : null }
			</div>
		);
	}
});

module.exports = GameList;