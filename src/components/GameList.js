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
	handleClick: function(gameUrl) {
		this.setState({
			gameUrl: gameUrl,
			// isLoaded: !this.state.isLoaded
		});
	},
	render: function() {
		// Create list view from data passed from GameTable.js
		var gameList = this.props.data.map(function(game) {
			var homeTeamName = game.home_team_name;
			var homeTeamScore = game.linescore.r.home;
			var awayTeamName = game.away_team_name;
			var awayTeamScore = game.linescore.r.away;
			var gameStatus = game.status.status;

			var gameUrlFull = 'http://gd2.mlb.com'+game.game_data_directory+'/boxscore.json';
			var gameUrl = game.game_data_directory;
			var blueJays = homeTeamName || awayTeamName == "Blue Jays" ? '':'';
			var click = this.handleClick.bind(this, gameUrl);
			return (
				<li key={game.location} className="list-group-item" onClick={click}>
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
				<GameDetail url={this.state.gameUrl} isLoaded={!this.state.isLoaded} />
			</div>
		);
	}
});

module.exports = GameList;