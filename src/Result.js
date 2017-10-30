import React, { Component } from 'react';
import { Label, Tab, Grid } from 'semantic-ui-react'

const panes = [
  { menuItem: 'CN22', pane: { key: 'tab1', content: 'This is massive tab', size: 'massive' } },
  { menuItem: 'CN23', pane: { key: 'tab2', content: 'This tab has a center aligned text', textAlign: 'center' } },
  { menuItem: 'Label', pane: { key: 'tab3', content: <div>This tab contains an <Label>JSX</Label> element</div> } },
];

class Result extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={14}>
            <Tab panes={panes} renderActiveOnly={false} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Result;
