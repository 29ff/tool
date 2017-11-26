import React, { Component } from 'react';
import { Divider, Select, Button, Message } from 'semantic-ui-react'
import { setTimeout } from 'timers';

class Result extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disableButton: true,
      docData: '',
      error: '',
      selectedItem: '',
      selectedFormat: '',
      loading: false
    }

    this.viewDocumentation = this.viewDocumentation.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  viewDocumentation() {
    this.setState({
      error: ''
    })
    console.log(this.state);
    if (this.state.docData && this.state.selectedFormat) {
      if (this.state.selectedFormat === 'base64') {
        const newWindow = window.open();
        newWindow.document.write('<iframe src="data:application/pdf;base64,' + encodeURI(this.state.docData) + '" style="border: 0; position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%"></iframe>');
        newWindow.document.title = this.state.selectedItem;
        newWindow.focus();
      } else if (this.state.selectedFormat === 'url') {
        window.open(this.state.docData);
      }
    } else {
      this.setState({
        loading: true
      })
      setTimeout(() => {
        this.setState({
          error: 'Không có data để hiển thị hoặc format không đúng',
          loading: false
        })
      }, 300)
    }
  }

  handleSelectChange(id, e) {
    const { docsData } = this.props;
    let data = '';
    let format = '';
    for (let i = 0, len = docsData.length; i < len; i++) {
      if (docsData[i].type === e.value) {
        data = docsData[i].data;
        format = docsData[i].format;
      }
    }
    this.setState({
      disableButton: false,
      docData: data,
      selectedFormat: format,
      selectedItem: e.value
    })
  }

  render() {
    return (
      <div>
        <Divider horizontal>SELECT DOCUMENTATION</Divider>
        <Select placeholder='Select documentation' options={this.props.docs} onChange={this.handleSelectChange}/>
        <span style={{ marginLeft: "15px" }}></span>
        <Button style={{ backgroundColor: this.props.temandoColor, color: "#fff" }}
                onClick={this.viewDocumentation}
                loading={this.state.loading}
                disabled={this.state.disableButton}>View</Button>
        {
          (this.state.selectedFormat === 'base64') ? (
            <a download={(this.state.selectedItem) ? this.state.selectedItem + ".pdf" : null} href={(this.state.selectedItem) ? "data:application/pdf;base64," + encodeURI(this.state.docData) : null}>
            <Button style={{ backgroundColor: this.props.temandoColor, color: "#fff" }}
          disabled={this.state.disableButton}>Download</Button></a>
          ) : null
        }
        <div style={{ marginTop: "20px" }}></div>
        <div>
          {
            (this.state.error !== '') ? <Message error content={this.state.error} /> : ''
          }
        </div>
      </div>
    )
  }
}

export default Result;
