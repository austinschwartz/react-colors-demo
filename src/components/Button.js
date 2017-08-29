import React, { Component } from 'react';
import './Button.css';
import colors from './colors.js';
import Code from './Code.js';
import TextBox from './TextBox.js';

function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

var randomColors = function() {
	let i = Math.floor(Math.random()*16777215) % 8;
	return shuffle(colors[i]);
}

class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: randomColors(),
			background: "#f6f8fa",
      code: '',
		};

		this.handleClick = this.handleClick.bind(this);
		this.backgroundClick = this.backgroundClick.bind(this);
    this.handler = this.handler.bind(this);
	} 

	handleClick() {
		this.setState({
			colors: randomColors(),
		}, function () {
        console.log("new colors: " + this.state.colors);
    });

	}

	backgroundClick() {
		this.setState({
			background: this.state.background === "#f6f8fa" ? "#000" : "#f6f8fa",
		});
	}

  handler(code) {
    this.setState({
      code: code,
    }, function() {
      console.log("new code: " + this.state.code);
    });
    this.forceUpdate();
  }

	render() {
		let colors = this.state.colors;
		let background = this.state.background;
		return (
			<div className="customContainer">
				<div className="colorsButton">
					<button className="btn btn-primary" onClick={this.handleClick}>color</button>
					<button className="btn btn-primary" onClick={this.backgroundClick}>background</button>
				</div>
				<div className="sample">
					<span style={{backgroundColor: colors[0]}} />
					<span style={{backgroundColor: colors[1]}} />
					<span style={{backgroundColor: colors[2]}} />
					<span style={{backgroundColor: colors[3]}} />
					<span style={{backgroundColor: colors[4]}} />
				</div>
				<div className="colors">
          <Code code={this.state.code} 
                colors={colors} 
                background={background}
                language={"javascript"}></Code>
          <TextBox handler = {this.handler}/>
				</div>
			</div>
		);
	}
}

export default Button;
