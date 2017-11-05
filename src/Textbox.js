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
      docId: [],
      docs: [],
      documentation: [],
      dataBase64: [],
      doc: [],
      hide: true,
      loading: false
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.haveOwnDeepProperty = this.haveOwnDeepProperty.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  haveOwnDeepProperty(obj, prop) {
    if (obj.hasOwnProperty(prop)) {
      for (let i in obj[prop]) {
        this.state.documentation.push(obj[prop][i]);
      }
    } else {
      for (let x in obj) {
        if (typeof obj[x] === 'object') {
          if (Array.isArray(obj[x])) {
            for (let y in obj[x]) {
              this.haveOwnDeepProperty(obj[x][y], prop);
            }
          } else {
            if (obj[x].hasOwnProperty(prop) && Array.isArray(obj[x][prop]) && obj[x][prop] !== null) {
              for (let i in obj[x][prop]) {
                this.state.documentation.push(obj[x][prop][i]);
              }
            } else {
              this.haveOwnDeepProperty(obj[x], prop);
            }
          }
        }
      }
    }
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

  isExists(docs, value) {
    let count = 0;
    for (let i in docs) {
      if (docs[i].value.includes(value)) {
        count += 1;
      }
    }
    return (count > 0) ? count : false;
  }

  getDocs(documentation) {
    const docs = [];
    const dataBase64 = [];
    for (let i = 0, len = documentation.length; i < len; i++) {
      const type = documentation[i].type;
      const data = documentation[i].data;
      if (!documentation[i].hasOwnProperty('type') || !documentation[i].hasOwnProperty('data')) {
        this.setState({
          error: 'Trường "documentation" phải có "type" và "data"'
        })
        return false;
      } else if (type === '' || data === '') {
        this.setState({
          error: '"type" và "data" không được rỗng'
        })
        return false;
      } else {
        
        let doc = {};
        if (type === 'packageLabels') {
          const count = this.isExists(docs, 'packageLabels');
          if (docs.length > 0 && count) {
            doc = { key: `packageLabels ${count}`, value: `packageLabels ${count}`, text: `Label ${count}` };
            dataBase64.push({ type: `${type} ${count}`, data: data });
            docs.push(doc);
          } else {
            doc = { key: 'packageLabels', value: 'packageLabels', text: 'Label' };
            dataBase64.push({ type: type, data: data });
            docs.push(doc);
          }
        } else {
          const count = this.isExists(docs, type);
          if (docs.length > 0 && count) {
            doc = { key: `${type} ${count}`, value: `${type} ${count}`, text: `${type.toUpperCase()} ${count}` };
            dataBase64.push({ type: `${type} ${count}`, data: data });
            docs.push(doc);
          } else {
            doc = { key: type, value: type, text: type.toUpperCase() };
            dataBase64.push({ type: type, data: data });
            docs.push(doc);
          }
        }
      }
    }
    return [docs, dataBase64];
  }

  handleButtonClick() {
    let textValue = '';
    this.setState({
      hide: true,
      error: '',
      loading: true
    })
    try {
      textValue = JSON.parse(findDOMNode(this.refs.text).value);
    } catch (error) {
      setTimeout(() => {
        this.setState({
          error: 'Nhập không đúng định dạng',
          loading: false
        })
      }, 300)
      return;
    }
    this.haveOwnDeepProperty(textValue, 'documentation');
    if (this.state.documentation && this.state.documentation.length > 0) {
      const data = this.getDocs(this.state.documentation);
      this.setState({
        documentation: []
      })
      if (data) {
        setTimeout(() => {
          this.setState({
            hide: false,
            docs: data[0],
            dataBase64: data[1],
            loading: false
          })
        }, 300)
      } else {
        return;
      }
    } else {
      setTimeout(() => {
        this.setState({
          error: 'Không thể định dạng hoặc "documentation" không có phần tử hợp lệ',
          loading: false
        })
      }, 300)
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
              <Button ref="button" fluid disabled={this.state.disableButton} loading={this.state.loading} style={{ backgroundColor: this.state.temandoColor, color: "#fff" }} onClick={this.handleButtonClick}>Submit</Button>
              {
                (this.state.error !== '') ? <Message error content={this.state.error} /> : ''
              }
            </Form>
          </Grid.Column>
        </Grid.Row>
        {
          (!this.state.hide) ?
          <Grid.Row centered>
            <Grid.Column width={14}>
              <Result docs={this.state.docs} temandoColor={this.state.temandoColor} dataBase64={this.state.dataBase64} />
            </Grid.Column>
          </Grid.Row>
          : null
        }
      </Grid>
    )
  }
}

export default Textbox;
