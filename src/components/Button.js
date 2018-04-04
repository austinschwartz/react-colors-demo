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
	return `public static String boardListToString(List<List<Short>> boards) {
  StringJoiner ret = new StringJoiner("\\n");
  for (List<Short> board : boards) {
    StringJoiner sj = new StringJoiner("\\n");
    for (short line : board)
      sj.add(lineToString(line));
    ret.add(sj.toString() + "\\n");
  }
  return ret.toString();
}

public static boolean conflicts(List<Short> board, short line) {
  if (board == null || board.size() == 0)
    return false;

  short lastRow = board.get(board.size() - 1);
  if (hasJumps(lastRow) && hasJumps(line))
    return true;

  return false;
}

public static boolean hasJumps(short line) {
  return Integer.bitCount(line) > 1;
}

public static List<List<Short>> genBoardsOfLength(int n) {
  List<List<Short>> ret = new ArrayList<>();
  if (n == 0) {
    return ret;
  } else if (n == 1) {
    for (short line: genRows()) {
      List<Short> board = new ArrayList<Short>();
      board.add(line);
      ret.add(board);
    }
    return ret;
  } else {
    List<List<Short>> prevBoards = genBoardsOfLength(n - 1);
    for (List<Short> board : prevBoards) {
      for (short line : genRows()) {
        if (conflicts(board, line))
          continue;
        List<Short> newBoard = new ArrayList<Short>(board);
        newBoard.add(line);
        ret.add(newBoard);
      }
    }
  }
  return ret;
}


public static String lineToString(short line) {
  StringBuilder sb = new StringBuilder();
  int count = Integer.bitCount(line);
  sb.append((line & 1) > 0 ? '<' : '.');
  sb.append((line & 2) > 0 ? '^' : '.');
  sb.append((line & 4) > 0 ? 'v' : '.');
  sb.append((line & 8) > 0 ? '>' : '.');
  return sb.toString();
}

public static List<Short> genRows() {
  List<Short> ret = new ArrayList<>();
  for (short i = 0; i < (short)Math.pow(2, 4); i++)
    if (Integer.bitCount(i) <= 2)
      ret.add(i);
  return ret;
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
                language={"java"}></Code>
          <TextBox code={this.state.code} handler = {this.handler}/>
				</div>
			</div>
		);
	}
}

export default Button;
