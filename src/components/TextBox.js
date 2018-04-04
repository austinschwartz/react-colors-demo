import React, { Component } from 'react';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({code: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Code submitted: ' + this.state.code);
    this.props.handler(this.state.code);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea value={this.state.code} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TextBox;
