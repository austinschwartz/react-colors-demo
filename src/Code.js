import React, { Component } from 'react';

var build = function(colorCodes, background) {
	var cssColors = new defaultDict();
  let c1 = ["hll","s","sa","sb","sc","dl","sd","s2","se","sh","si","sx","sr","s1", "ss"];
  let c2 = ["err","g","l","x","p","ge","gr","gh","gi","gp","gs","gu","gt","ld","no","nd","ni","ne","nn","nx","py","w","bp"];
  let c3 = ["kd","kt","nb","nl","nv","vc","vg","vi","vm", "mi"];
  let c4 = ["kd", "nb", "nl", "nv", "vc", "vg", "vi", "vm"];
	let c5 = ["o", "cp", "kn", "kp", "kr", "nt", "ow", "k"];
	if (background === '#f6f8fa')
		cssColors["n"] = "#000";
	else
		cssColors["n"] = "#fff";

  var i = 0;
  // Mostly names
  for (i = 0; i < c2.length; i++) {
    cssColors[c2[i]] = colorCodes[4];
  }

  for (i = 0; i < c3.length; i++) {
    cssColors[c3[i]] = colorCodes[3];
  }
  for (i = 0; i < c4.length; i++) {
    cssColors[c4[i]] = colorCodes[2];
  }
  for (i = 0; i < c1.length; i++) {
    cssColors[c1[i]] = colorCodes[1];
  }

  for (i = 0; i < c5.length; i++) {
    cssColors[c5[i]] = colorCodes[0];
  }
	return cssColors;
}

function defaultDict() {
	this.get = function (key) {
		if (this.hasOwnProperty(key)) {
			return this[key];
		} else {
			return "#000";
		}
	}
}

function code() {
  return `setTextColor(hexcode) {
    /* Determine whether to use light or dark text */
    let color = 5;
    let r = parseInt(color[1], 16),
        g = parseInt(color[2], 16),
        b = parseInt(color[3], 16);
    return ((r*0.299 + g*0.587 + b*0.114) > 186 ? '#898F98' : '#D9DEE5');
}`;
}



function highlightCode(code, lang=undefined) {
	var formData = new FormData();
	if (lang)
		formData.append("lang", lang);
	formData.append("code", code)
	fetch('http://austinschwartz.com:6547', {
		method: 'POST',
		accept: 'application/json',
    body: formData
	})
	.then(function(response) {
		return response.text()
	}).then(function(html) {
		console.log(html);
	});
	return "";
}

function buildStyles(colors) {
  return `.highlight{color:${colors[0]}}
  .highlight .hll,
  .highlight .s,
  .highlight .sa,
  .highlight .sb,
  .highlight .sc,
  .highlight .dl,
  .highlight .sd,
  .highlight .s2,
  .highlight .se,
  .highlight .sh,
  .highlight .si,
  .highlight .sx,
  .highlight .sr,
  .highlight .s1,
  .highlight .ss{color:${colors[1]}}
  .highlight .go{color:#44475a}
  .highlight .err,
  .highlight .g,
  .highlight .l,
  .highlight .n,
  .highlight .x,
  .highlight .p,
  .highlight .ge,
  .highlight .gr,
  .highlight .gh,
  .highlight .gi,
  .highlight .gp,
  .highlight .gs,
  .highlight .gu,
  .highlight .gt,
  .highlight .ld,
  .highlight .no,
  .highlight .nd,
  .highlight .ni,
  .highlight .ne,
  .highlight .nn,
  .highlight .nx,
  .highlight .py,
  .highlight .w,
  .highlight .bp{color:${colors[0]}}
  .highlight .gh,
  .highlight .gi,
  .highlight .gu{font-weight:bold}
  .highlight .ge{text-decoration:underline}
  .highlight .bp{font-style:italic}
  .highlight .c,
  .highlight .ch,
  .highlight .cm,
  .highlight .cpf,
  .highlight .c1,
  .highlight .cs{color:${colors[3]}}
  .highlight .kd,
  .highlight .kt,
  .highlight .nb,
  .highlight .nl,
  .highlight .nv,
  .highlight .vc,
  .highlight .vg,
  .highlight .vi,
  .highlight .vm{color:${colors[4]}}
  .highlight .kd,
  .highlight .nb,
  .highlight .nl,
  .highlight .nv,
  .highlight .vc,
  .highlight .vg,
  .highlight .vi,
  .highlight .vm{font-style:italic}
  .highlight .na,
  .highlight .nc,
  .highlight .nf,
  .highlight .fm{color:#6f42c1}
  .highlight .kc{color:${colors[2]}}
  .highlight .k{color:#d73a49}
  .highlight .o,
  .highlight .cp,
  .highlight .kn,
  .highlight .kp,
  .highlight .kr,
  .highlight .nt,
  .highlight .ow{color:#d73a49}
  .highlight .m,
  .highlight .mb,
  .highlight .mf,
  .highlight .mh,
  .highlight .mi,
  .highlight .mo,
  .highlight .il{color:${colors[2]}}
  .highlight .gd{color:#f55}`;
}

class Code extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cssColors: build(this.props.colors, this.props.background),
			background: (this.props.background ? this.props.background : "#f6f8fa"),
			highlightedCode: highlightCode(code()),
    };
	}

	render() {
    return (
    <div className="highlight">
      <style dangerouslySetInnerHTML={{__html: buildStyles(this.props.colors)}} />
      <pre style={{backgroundColor: this.state.background}} className="highlight" dangerouslySetInnerHTML={{__html: this.state.highlightedCode}}></pre>
    </div>
    
    );
  }
}

export default Code;
