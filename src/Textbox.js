import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Form, TextArea, Grid, Message } from 'semantic-ui-react'

class Textbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temandoColor: '#f2612c',
      error: '',
      buttonDisable: true
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.haveOwnDeepProperty = this.haveOwnDeepProperty.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  haveOwnDeepProperty(obj, prop) {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.hasOwnProperty(prop)) {
        if (Array.isArray(obj[prop])) {
          return obj[prop];
        }
      }
      for (var ele in obj) {
        console.log(ele);
        if (typeof obj[ele] === 'object' && obj[ele] !== null && this.haveOwnDeepProperty(obj[ele], prop)) {
          if (Array.isArray(obj[ele][prop])) {
            return obj[ele][prop];
          }
        }
      }
    }
    return false;
  }

  handleTextChange() {
    if (findDOMNode(this.refs.text).value) {
      this.setState({
        buttonDisable: false
      })
    } else {
      this.setState({
        buttonDisable: true
      })
    }
  }

  handleButtonClick() {
    let textValue = '';
    try {
      textValue = JSON.parse(findDOMNode(this.refs.text).value);
    } catch (error) {
      this.setState({
        error: 'Nhập không đúng định dạng'
      })
    }
    console.log(this.haveOwnDeepProperty(textValue, 'documentation'));
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={14}>
            <Form error>
              <TextArea placeholder="Input data here..."
                        rows={12}
                        onChange={this.handleTextChange}
                        autoFocus
                        ref="text"
              />
              <Button ref="button" fluid disabled={this.state.buttonDisable} style={{ backgroundColor: this.state.temandoColor, color: "#fff" }} onClick={this.handleButtonClick}>Submit</Button>
              {
                (this.state.error !== '') ? <Message error content={this.state.error} /> : ''
              }
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Textbox;
