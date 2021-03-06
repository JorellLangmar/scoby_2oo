import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import UserContext from "../Auth/UserContext";

class FormItem extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    description: "",
    image: "",
    quantity: "",
    category: "",
    address: "",
    contact: "",
    location: "",
    id_user: "",
  };

  componentDidMount = () => {
    console.log(this.props.action);
    if (this.props.action === "edit") {
      apiHandler
        .getOne(`/api/items/${this.props.id}`)
        .then((items) => {
          console.log(items.image, "get items data :)");
          this.setState({
            name: items.name,
            description: items.description,
            quantity: items.quantity,
            category: items.category,
            address: items.address,
            contact: items.contact,
            location: items.location,
            id_user: items.id_user,
            image: items.image,
          });
        })
        .catch((err) => console.log(err));
    }
  };


  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };


  updateItem = () => {

    function buildFormData(formData, data, parentKey) {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach((key) => {
          buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        });
      } else {
        const value = data == null ? "" : data;

        formData.append(parentKey, value);
      }
    }

    function jsonToFormData(data) {
      const formData = new FormData();

      buildFormData(formData, data);
      return formData;
    }

    let fd = jsonToFormData(this.state);


    apiHandler
      .updateItem(`/api/items/${this.props.id}`, this.state)
      .then(() => {
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createItem() {
    function buildFormData(formData, data, parentKey) {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach((key) => {
          buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        });
      } else {
        const value = data == null ? "" : data;

        formData.append(parentKey, value);
      }
    }

    function jsonToFormData(data) {
      const formData = new FormData();

      buildFormData(formData, data);
      return formData;
    }

    let fd = jsonToFormData(this.state);

    apiHandler
      .createItem("/api/items", fd)
      .then((apiRes) => {
        // console.log(apiRes);
        this.props.history.push("/");
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.action === "edit") {
      this.updateItem();
    } else {
      this.createItem();
    }
  };

  handlePlace = (place) => {
    const { user } = this.props.authContext;
    let newLoc = { coordinates: [place.center[0], place.center[1]] };

    this.setState({
      address: place.place_name,
      location: newLoc,
      id_user: user._id,
    });
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="What are you giving away ?"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              defaultValue="-1"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            >
              <option value={this.state.category} disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input"
              id="quantity"
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete
              value={this.state.address}
              onSelect={this.handlePlace}
              name="address"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input
              className="input"
              id="image"
              type="file"
              name="image"
              onChange={this.handleChange}
            />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input
                type="radio"
                name="contact"
                value="email"
                onChange={this.handleChange}
              />
              user email
            </div>
            <input
              type="radio"
              name="contact"
              value="phone"
              onChange={this.handleChange}
            />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default withUser(FormItem);
