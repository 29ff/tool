import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Form, TextArea, Grid } from 'semantic-ui-react'
import get from 'lodash.get';

class Textbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temandoColor: '#f2612c',
      textFocus: true
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.haveOwnDeepProperty = this.haveOwnDeepProperty.bind(this);
  }

  haveOwnDeepProperty(obj, prop) {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.hasOwnProperty(prop)) {
        return true;
      }
      for (var ele in obj) {
        if (typeof ele === 'object' && ele !== null && haveOwnDeepProperty(ele, prop)) {
          return true;
        }
      }
    }
    return false;
  }

  handleButtonClick() {
    const textValue = JSON.parse(findDOMNode(this.refs.text).value);
    console.log(this.haveOwnDeepProperty(textValue, 'documentation'));
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={14}>
            <Form>
              <TextArea placeholder="Input data here..."
                        rows={12}
                        onChange={this.handleTextChange}
                        autoFocus
                        ref="text"
              />
              <Button fluid disabled={false} style={{ backgroundColor: this.state.temandoColor, color: "#fff" }} onClick={this.handleButtonClick}>Submit</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Textbox;
