"use strict";

const React = require("react");
const XButton = require("../components/xButton.jsx");
const PlusButton = require("../components/plusButton.jsx");
const api = require("./api.jsx");
const foundBug = require("./foundBug.jsx");

const replaceField = (object, key, value) => {
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
};

const renameKey = (object, oldKey, newKey) => {
  const copy = Object.assign({}, object);
  const value = copy[oldKey];
  delete copy[oldKey];
  copy[newKey] = value;
  return copy;
};

const replaceIndex = (array, i, value) => {
  const copy = array.slice();
  copy[i] = value;
  return copy;
};

const deleteIndex = (array, i) => {
  const copy = array.slice();
  copy.splice(i, 1);
  return copy;
};

const pushArray = (array, item) => {
  return array.concat([item]);
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
      <XButton onClick={props.onDelete} />
    </td>
  </tr>
);

class MenuTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    api
      .loadMenu()
      .then(menu => this.showMenu(menu))
      .catch(foundBug);
    this.nextKey = 0;
  }

  // TODO remove renameKey from this
  showMenu(menu) {
    const newRows = menu.map((row, i) => ({
      key: this.nextKey + i,
      dish: renameKey(row, "dish", "name")
    }));
    this.nextKey += newRows.length;
    this.setState({ rows: this.state.rows.concat(newRows) });
  }

  replaceRow(i, newDish) {
    const newRow = { key: this.state.rows[i].key, dish: newDish };
    this.setState({ rows: replaceIndex(this.state.rows, i, newRow) });
  }

  deleteRow(i) {
    this.setState({ rows: deleteIndex(this.state.rows, i) });
  }

  addRow() {
    const newRow = {
      key: this.nextKey,
      dish: { name: "", spicy: false, imageUrl: "" }
    };
    this.nextKey += 1;
    this.setState({ rows: pushArray(this.state.rows, newRow) });
  }

  getTable() {
    return this.state.rows
      .map(row => renameKey(row.dish, "name", "dish"))
      .filter(dish => dish.name !== "");
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
              onDelete={() => this.deleteRow(i)}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <PlusButton onClick={() => this.addRow()} />
            </td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() => api.saveMenu(this.getTable()).catch(foundBug)}
              >
                Save Changes
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

module.exports = MenuTable;
