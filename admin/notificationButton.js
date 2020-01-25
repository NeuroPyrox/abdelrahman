const React = require("react");
const ReactDOM = require("react-dom");
const push = require("./push.js");
const { foundBug } = require("./helper.js");

// TODO listen for outside subscription changes

const formatAction = {
  loading: "Loading...",
  subscribe: "Turn on notifications",
  unsubscribe: "Turn off notifications"
};

module.exports = class notificationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "loading"
    };
    push
      .isSubscribed()
      .then(subscribed => {
        if (subscribed) {
          this.setState({ action: "unsubscribe" });
        } else {
          this.setState({ action: "subscribe" });
        }
      })
      .catch(foundBug);
  }

  render() {
    return (
      <button onClick={() => this.handleClick().catch(foundBug)}>
        {formatAction[this.state.action]}
      </button>
    );
  }

  async handleClick() {
    switch (this.state.action) {
      case "subscribe":
        await this.clickSubscribe();
        break;
      case "unsubscribe":
        await this.clickUnsubscribe();
        break;
      case "loading":
        break;
    }
  }

  async clickSubscribe() {
    this.setState({ action: "loading" });
    await push.subscribe();
    this.setState({ action: "unsubscribe" });
  }

  async clickUnsubscribe() {
    this.setState({ action: "loading" });
    await push.unsubscribe();
    this.setState({ action: "subscribe" });
  }
};
