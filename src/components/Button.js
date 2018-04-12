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
	let i = Math.floor(Math.random()*16777215) % colors.length;
	return shuffle(colors[i]);
}

var defaultCode = function() {
	return `
import java.util.*;

public class OneAway {
  public static boolean oneReplace(String a, String b) {
    int differences = 0;
    for (int i = 0; i < a.length(); i++) {
      if (a.charAt(i) != b.charAt(i))
        differences++;
      if (differences > 1)
        return false;
    }
    return true;
  }

  public static boolean oneInsert(String a, String b) {
    // a.length() < b.length()
    int i, j = 0;
    int differences = 0;
    for (i = 0; i < a.length(); i++) {
      if (a.charAt(i) != b.charAt(j)) {
        j++;
        differences++;
      }
      if (differences > 1)
        return false;
      j++;
    }
    return true;
  }

  public static boolean oneAway(String a, String b) {
    if (a.length() < b.length())
      return oneInsert(a, b);
    else if (a.length() > b.length())
      return oneInsert(b, a);
    else
      return oneReplace(a, b);
  }

  public static void main(String[] args) {
    System.out.println(oneAway("pale",  "ple") ? "true" : "false"); 
    System.out.println(oneAway("pales", "pale") ? "true" : "false"); 
    System.out.println(oneAway("pale",  "bale") ? "true" : "false"); 
    System.out.println(oneAway("ale",   "bale") ? "true" : "false"); 
    System.out.println(oneAway("xale",  "xal") ? "true" : "false"); 
    System.out.println(oneAway("pale",  "bake") ? "true" : "false"); 
  }
}`;
}

class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: randomColors(),
			background: "#f6f8fa",
      code: defaultCode(),
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleShuffle = this.handleShuffle.bind(this);
		this.backgroundClick = this.backgroundClick.bind(this);
    this.handler = this.handler.bind(this);
	} 

	handleShuffle() {
		this.setState({
			colors: shuffle(this.state.colors),
		}, function () {
        console.log("new colors: " + this.state.colors);
    });
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
					<button className="btn btn-primary" onClick={this.handleShuffle}>shuffle</button>
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
                language={"java"}></Code>
          <TextBox code={this.state.code} handler = {this.handler}/>
				</div>
			</div>
		);
	}
}

export default Button;
