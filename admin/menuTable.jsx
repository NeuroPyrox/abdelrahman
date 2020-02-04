"use strict";

const React = require("react");
const XButton = require("../components/xButton.jsx");
const PlusButton = require("../components/plusButton.jsx");

class MenuTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          key: 1,
          dish: "Sweet 'n Sour Chicken",
          spicy: false,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweetsourchickensoaked.jpg/220px-Sweetsourchickensoaked.jpg"
        },
        {
          key: 2,
          dish: "Butter Chicken",
          spicy: true,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/220px-Chicken_makhani.jpg"
        }
      ]
    };
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Dish</th>
            <th>Spicy</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {this.state.rows.map(({ key, dish, spicy, imageUrl }) => (
            <tr key={key}>
              <td>
                <input value={dish} />
              </td>
              <td>
                <input type="checkbox" checked={spicy} />
              </td>
              <td>
                <input value={imageUrl} />
              </td>
              <td>
                <XButton />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><PlusButton /></td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

module.exports = MenuTable;
