import React, { Component } from 'react';
import './Button.css';
import colors from './colors.js';

var randomColors = function() {
	let i = Math.floor(Math.random()*16777215) % 8;
	return colors[i];
}

var build = function(colorCodes) {
	var cssColors = new defaultDict();
	// Function names
	cssColors["nf"] = colorCodes[0];
	cssColors["kd"] = colorCodes[1];
	cssColors["o"] = colorCodes[2];
	cssColors["kt"] = colorCodes[2];
	return cssColors;
}

function defaultDict() {
	this.get = function (key) {
    console.log(key, this);
		if (this.hasOwnProperty(key)) {
      console.log("HAS KEY", key);
			return this[key];
		} else {
			return "#abcdef";
		}
	}
}

class Button extends Component {
	constructor() {
		super();
		let colors = randomColors();
		this.state = {
			colors: colors,
			cssColors: build(colors),
		};
		this.handleClick = this.handleClick.bind(this);
	} 

	handleClick() {
		let newcolors = randomColors();
		this.setState({
			colors: newcolors,
			cssColors: build(newcolors),
		});
	}

	render() {
		let colors = this.state.colors;
		return (
			<div className="customContainer">
				<div className="colorsButton">
					<button className="btn btn-primary" onClick={this.handleClick}>color</button>
				</div>
				<div className="sample">
					<span style={{backgroundColor: colors[0]}} />
					<span style={{backgroundColor: colors[1]}} />
					<span style={{backgroundColor: colors[2]}} />
					<span style={{backgroundColor: colors[3]}} />
					<span style={{backgroundColor: colors[4]}} />
				</div>
				<div className="colors">
					<pre>
						<Code colors={colors}></Code>
					</pre>
				</div>
			</div>
		);
	}
}



class Code extends Component {
	constructor() {
		super();
		this.state = {
		};
	}
	render() {
		let cssColors = build(this.props.colors);
		//return (<div>{"hi " + cssColors.get("o")}</div>);
return (
	<div style={{color: cssColors.get("highlight")}}><pre><span></span><span style={{color: cssColors.get("kd")}}>public</span> <span style={{color: cssColors.get("kd")}}>static</span> <span style={{color: cssColors.get("kt")}}>long</span> <span style={{color: cssColors.get("nf")}}>charts</span><span style={{color: cssColors.get("o")}}>(</span></pre></div>
	);
}
}

export default Button;
