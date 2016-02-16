import React from 'react';
import ReactDOM from 'react-dom';
import GameTable from './components/GameTable.js';

ReactDOM.render(
  <GameTable url = "http://gd2.mlb.com/components/game/mlb/year_2015/month_07/day_28/master_scoreboard.json"/>,
  document.getElementById('app')
);