"use strict";

const React = require("react");
const QuantityInput = require("./QuantityInput.jsx")

class Dish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicking: false,
      hovering: false
    };
  }
  
  // I hate to put the style logic here instead keeping it 100% in css,
  // but this is the least confusing way I found to
  // fix the .dish:active issue while keeping the hover style mutually exclusive with .dishSelected and .dishUnselected
  getStyle() {
    // The clicking variable fixes an issue where .dish:active wouldn't turn off when you drag an image
    if (this.state.clicking) {
      return "dish dishSelected"
    }
    // Use this instead of .dish:hover to make the code more explicit by avoiding using weird specificity rules
    if (this.state.hovering) {
      return "dish dishHalfSelected"
    }
    if (this.props.selected) {
      return "dish dishSelected"
    }
    return "dish dishUnselected"
  }

  render() {
    return (
      <div
        className={this.getStyle()}
        onMouseDown={() => this.setState({clicking: true})}
        onMouseUp={() => this.setState({clicking: false})}
        onMouseEnter={() => {this.setState({hovering: true})}}
        onMouseLeave={() => this.setState({hovering: false, clicking: false})}
        onClick={this.props.onClick}
      >
        <div>
          <img src={this.props.image} />
        </div>
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

module.exports = Dish;
