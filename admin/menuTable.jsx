"use strict";

const React = require("react");
const XButton = require("../components/xButton.jsx");
const PlusButton = require("../components/plusButton.jsx");

// The immutable equivalent of object[key] = value
const replaceField = (object, key, value) => {
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
};

// The immutable equivalent of array[i] = value
const replaceIndex = (array, i, value) => {
  const copy = array.slice();
  copy[i] = value;
  return copy;
};

const Row = props => (
  <tr>
    <td>
      <input
        value={props.dish.name}
        onChange={e =>
          props.onChange(replaceField(props.dish, "name", e.target.value))
        }
      />
    </td>
    <td>
      <input
        type="checkbox"
        checked={props.dish.spicy}
        onChange={e =>
          props.onChange(replaceField(props.dish, "spicy", e.target.checked))
        }
      />
    </td>
    <td>
      <input
        value={props.dish.imageUrl}
        onChange={e =>
          props.onChange(replaceField(props.dish, "imageUrl", e.target.value))
        }
      />
    </td>
    <td>
      <XButton />
    </td>
  </tr>
);

class MenuTable extends React.Component {
  constructor(props) {
    super(props);
    // TODO get this data from the server instead
    this.state = {
      rows: [
        {
          key: 1,
          dish: {
            name: "Sweet 'n Sour Chicken",
            spicy: false,
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweetsourchickensoaked.jpg/220px-Sweetsourchickensoaked.jpg"
          }
        },
        {
          key: 2,
          dish: {
            name: "Butter Chicken",
            spicy: true,
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/220px-Chicken_makhani.jpg"
          }
        }
      ]
    };
  }

  replaceRow(i, newDish) {
    const newRow = { key: this.state.rows[i].key, dish: newDish };
    this.setState({ rows: replaceIndex(this.state.rows, i, newRow) });
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
          {this.state.rows.map(({ key, dish }, i) => (
            <Row
              key={key}
              dish={dish}
              onChange={newDish => this.replaceRow(i, newDish)}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <PlusButton />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

module.exports = MenuTable;
