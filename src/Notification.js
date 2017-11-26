import { Message, Rail, Transition } from "semantic-ui-react";
import React from "react";

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hidden: false
      });
    }, 500);
    setTimeout(() => {
      this.onDismiss();
    }, 5000);
  }

  onDismiss = () => {
    this.setState({
      hidden: true
    });
  };

  render() {
    const { hidden } = this.state;
    return (
      <Rail internal position="left">
        <div style={{ marginTop: "50px" }} />
        <Transition.Group animation="scale" duration="300">
          {!hidden && (
            <Message
              success
              onDismiss={this.onDismiss}
              header="Cập nhật"
              content="Đã cập nhật cho CI và Public API"
              hidden={hidden}
            />
          )}
        </Transition.Group>
      </Rail>
    );
  }
}
