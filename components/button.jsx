"use strict";

const React = require("react");

// This custom button component prevents the button's children from moving when it's clicked
// and fixes an issue with css :active
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicking: false,
      hovering: false,
    }
  }
  
  getStyle() {
    // The clicking variable fixes an issue where :active wouldn't turn off after you drag an image
    if (this.state.clicking) {
      return this.props.clickStyle
    }
    // Use this instead of :hover to make the code more explicit by avoiding using weird specificity rules
    if (this.state.hovering) {
      return this.props.hoverStyle
    }
    return this.props.defaultStyle
  }
  
  render() {
    return (
      <div
        className={this.getStyle()}
        onMouseDown={() => this.setState({clicking: true})}
        onMouseUp={() => this.setState({clicking: false})}
        onMouseEnter={() => this.setState({hovering: true})}
        onMouseLeave={() => this.setState({hovering: false, clicking: false})}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

module.exports = Button;
