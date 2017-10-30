import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Form, TextArea, Grid, Message, Tab } from 'semantic-ui-react'
import Result from './Result';

class Textbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temandoColor: '#f2612c',
      error: '',
      buttonDisable: true,
      data: [],
      hide: true,
      panes: [
        { menuItem: 'CN22', pane: { key: 'tab1', content: 'This is massive tab' } },
        { menuItem: 'CN23', pane: { key: 'tab2', content: 'This is massive tab' } },
        { menuItem: 'Label', pane: { key: 'tab3', content: 'This is massive tab' } },
      ]
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
    this.setState({
      error: ''
    })
    try {
      textValue = JSON.parse(findDOMNode(this.refs.text).value);
    } catch (error) {
      this.setState({
        error: 'Nhập không đúng định dạng'
      })
    }
    const data = this.haveOwnDeepProperty(textValue, 'documentation');
    if (data) {
      this.setState({
        data: data,
        hide: false
      })
    }
  }

  buildPanes() {
    const { data } = this.props;
    const menuItems = [];
    data.forEach((ele) => {
      if (ele.type === 'packageLabels') { menuItems.push('Label') }
      menuItems.push(ele.type.toUpperCase());
    })
    console.log(menuItems);
    return menuItems;
  }

  render() {
    return (
      <Grid columns={1}>
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
        <Grid.Row centered className={(this.state.hide) ? 'hide' : ''}>
          <Grid.Column width={14}>
            <Result data={this.state.data} panes={this.state.panes}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Textbox;
