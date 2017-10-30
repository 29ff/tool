import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'



class Result extends Component {
  render() {
    return (
      <Tab panes={this.props.panes} renderActiveOnly={false} />
    )
  }
}

export default Result;
