import React from 'react';
import ReactDOM from 'react-dom';

var GameDate = React.createClass({
	render: function() {
		return (
			<h1 className="text-center">
				{this.props.month} {this.props.day} {this.props.year}
			</h1>
		);
	}
});

module.exports = GameDate;