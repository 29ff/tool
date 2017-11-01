import React, { Component } from 'react';
import { Divider, Select, Button, Message } from 'semantic-ui-react'

class Result extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disableButton: true,
      docData: '',
      error: '',
      selectedItem: ''
    }

    this.viewDocumentation = this.viewDocumentation.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  viewDocumentation() {
    this.setState({
      error: ''
    })
    if (this.state.docData) {
      const newWindow = window.open();
      newWindow.document.write('<iframe src="data:application/pdf;base64,' + encodeURI(this.state.docData) + '" style="border: 0; position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%"></iframe>');
      newWindow.document.title = this.state.selectedItem;
      newWindow.focus();
    } else {
      this.setState({
        error: 'Không có data để hiển thị'
      })
    }
  }

  handleSelectChange(id, e) {
    const { dataBase64 } = this.props;
    let data = '';
    for (let i = 0, len = dataBase64.length; i < len; i++) {
      if (dataBase64[i].type === e.value) {
        data = dataBase64[i].data;
      }
    }
    this.setState({
      disableButton: false,
      docData: data,
      selectedItem: (e.value === 'packageLabels') ? 'Label' : e.value.toUpperCase()
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
                disabled={this.state.disableButton}>View</Button>
        <a download={this.state.selectedItem + ".pdf"} href={"data:application/pdf;base64," + encodeURI(this.state.docData)}>
          <Button style={{ backgroundColor: this.props.temandoColor, color: "#fff" }}
        disabled={this.state.disableButton}>Download</Button></a>
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
