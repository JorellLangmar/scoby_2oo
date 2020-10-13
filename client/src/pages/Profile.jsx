import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import apiHandler from "../api/apiHandler";

class Profile extends Component {
  state = {
    phoneNumber: "",
    items: [],
  };

  componentDidMount = () => {
    apiHandler
      .getItemsTwo("/api/items/profile")
      .then((items) => {
        console.log(items, "get items data :)");
        this.setState({ items: items });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (evt) => {
    const name = evt.target.name;
    const value= evt.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    apiHandler
    .updateUser(this.state)
    .then(apiRes => {
      console.log("profile - apiRes: ",apiRes);
      //
    })
    .catch(apiErr => {
      console.log("profile - apiErr: ",apiErr);
    })
  }


  render() {
    const { authContext } = this.props;
    const { user } = authContext;
    console.log(this.state);
    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a>

        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>
          {!user.phoneNumber && (
              <>
          <div className="user-contact">
            <h4>Add a phone number</h4>

            <form className="form" onSubmit={this.handleSubmit}>

            
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
             
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                   value={this.state.phoneNumber || user.phoneNumber}
                   onChange={this.handleChange}
                />
              </div>
              
              <button className="form__button">Add phone number</button>
            </form>
          </div>
              </>
          )}

          {/* Break whatever is belo  */}
          {!this.state.items &&
          <div className="CardItem">
            <div className="item-empty">
              <div className="round-image">
                <img src="/media/personal-page-empty-state.svg" alt="" />
              </div>
              <p>You don't have any items :(</p>
            </div>
          </div>}

          <div className="CardItem">
            <h3>Your items</h3>
            <div className="item">
              <div className="round-image">
                <img
                  src="https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100"
                  alt="item"
                />
              </div>

              <div className="description">
                {this.state.items &&
                  this.state.items.map((item, i) => (
                    < React.Fragment key={i}>
                      <h2>{item.name}</h2>
                      <h4>Quantity: {item.quantity} </h4>
                      <p>{item.description}</p>
                      <div className="buttons">
                        <button
                          className="btn-secondary"
                          // onClick={delete item._id}
                        >
                          Delete
                        </button>

                        <Link to={`/items/${item._id}`}>
                          <button className="btn-primary">Edit</button>
                        </Link>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
