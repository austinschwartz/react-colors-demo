import React, { Component } from 'react';

async function highlightCode(code, lang=null) {
  lang = "java";
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
  .highlight{color:${fixed}} 

  .highlight .kn,
  .highlight .kd,
  .highlight .kt,
  .highlight .o,
  .highlight .k{color:${colors[0]}}

  .highlight .nc,
  .highlight .nf{color:${colors[1]}}

  .highlight .mi,
  .highlight .kc{color:${colors[2]}}

  //.highlight .n{color:${colors[3]}}

  .highlight .s{color:${colors[4]}}
`;
}

class Code extends Component {
	constructor(props) {
		super(props);
		this.state = {
      background: this.props.background,
			highlightedCode: "",
    };
    console.log("language: " + this.props.language);
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
