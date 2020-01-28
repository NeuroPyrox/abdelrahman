const React = require("react");
const ReactDOM = require("react-dom");

module.exports = class PriceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: []
    };
    
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Orders</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.state.prices.map(function({ orders, price }) {
            return (
              <tr key={orders}>
                <td>{orders}</td>
                <td>{price}</td>
              </tr>
            );
          })}
          <tr>
            <td>
              <input type="number" min="1" />
            </td>
            <td>
              <input type="number" min="1" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
};
