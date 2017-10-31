import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Form, TextArea, Grid, Message } from 'semantic-ui-react'
import Result from './Result';

class Textbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temandoColor: '#f2612c',
      error: '',
      disableButton: true,
      docs: [],
      dataBase64: [],
      hide: true
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
        disableButton: false
      })
    } else {
      this.setState({
        disableButton: true
      })
    }
  }

  getDocs(documentation) {
    const docs = [];
    const dataBase64 = [];
    for (let i = 0, len = documentation.length; i < len; i++) {
      if (!documentation[i].hasOwnProperty('type') || !documentation[i].hasOwnProperty('data')) {
        this.setState({
          error: 'Trường "documentation" phải có "type" và "data"'
        })
        return false;
      } else if (documentation[i].type === '' || documentation[i].data === '') {
        this.setState({
          error: '"type" và "data" không được rỗng'
        })
        return false;
      } else {
        const type = documentation[i].type;
        let doc = {};
        dataBase64.push({ type: documentation[i].type, data: documentation[i].data });
        if (type === 'packageLabels') {
          doc = { key: 'packageLabels', value: 'packageLabels', text: 'Label' };
          docs.push(doc);
        } else {
          doc = { key: documentation[i].type, value: documentation[i].type, text: documentation[i].type.toUpperCase() };
          docs.push(doc);
        }
      }
    }
    return [docs, dataBase64];
  }

  handleButtonClick() {
    let textValue = '';
    this.setState({
      hide: true,
      error: ''
    })
    try {
      textValue = JSON.parse(findDOMNode(this.refs.text).value);
    } catch (error) {
      this.setState({
        error: 'Nhập không đúng định dạng'
      })
      return;
    }
    const documentation = this.haveOwnDeepProperty(textValue, 'documentation');
    if (documentation && documentation.length > 0) {
      const data = this.getDocs(documentation);
      if (data) {
        this.setState({
          hide: false,
          docs: data[0],
          dataBase64: data[1]
        })
      } else {
        return;
      }
    } else {
      this.setState({
        error: 'Không thể định dạng hoặc "documentation" không có phần tử hợp lệ'
      })
    }
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
              <Button ref="button" fluid disabled={this.state.disableButton} style={{ backgroundColor: this.state.temandoColor, color: "#fff" }} onClick={this.handleButtonClick}>Submit</Button>
              {
                (this.state.error !== '') ? <Message error content={this.state.error} /> : ''
              }
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered className={(this.state.hide) ? 'hide' : ''}>
          <Grid.Column width={14}>
            <Result docs={this.state.docs} temandoColor={this.state.temandoColor} dataBase64={this.state.dataBase64} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Textbox;
