import React, { Component } from 'react';

async function highlightCode(code, lang=null) {
	var formData = new FormData();
	if (lang)
		formData.append("lang", lang);
	formData.append("code", code);
	return fetch('https://infinite-lake-58284.herokuapp.com/', {
      method: 'POST',
      accept: 'application/json',
      body: formData
    })
    .then(function(response) {
      return response.text()
    });
}

function buildStyles(colors, background) {
	var fixed = background === "#000" ? "#fff" : "#24292e";
  return `.highlight pre{background-color:${background}}
  .highlight{color:${colors[0]}}
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
  .highlight .go{color:${colors[2]}}
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
  .highlight .bp{color:${fixed}}
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
  .highlight .fm{color:${colors[1]}}
  .highlight .kc{color:${colors[2]}}
  .highlight .k{color:${colors[0]}}
  .highlight .o,
  .highlight .cp,
  .highlight .kn,
  .highlight .kp,
  .highlight .kr,
  .highlight .nt,
  .highlight .ow{color:${colors[1]}}
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
      background: this.props.background,
			highlightedCode: "",
    };
    highlightCode(
      this.props.code, 
      this.props.language).then(html =>
        this.setState({highlightedCode: html})
      );
  }

componentWillReceiveProps(nextProps) {
  if (nextProps.code !== this.state.code) {
    this.setState({
			code: nextProps.code
		}, function() {
      console.log("Code component got new code: " + this.state.code);
			highlightCode(
				nextProps.code, 
				this.props.language).then(html =>
					this.setState({highlightedCode: html})
				);
			});
  }
}

	render() {
    return (
      <div>
        <pre className="highlight">
          <style 
            dangerouslySetInnerHTML=
                {{__html: buildStyles(this.props.colors,this.props.background)}} />
              <div 
              dangerouslySetInnerHTML=
                {{__html: this.state.highlightedCode}}/>
        </pre>
      </div>
    );
  }
}

export default Code;
