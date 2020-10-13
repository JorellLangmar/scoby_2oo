import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormProfile extends Component {
    static contextType = UserContext;
    
    state = {
      firstName: "",
      lastName: "",
      profileImg: "",
      email: "",
      phoneNumber: "",
      password: ""
    };


 getderivedstate


  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    this.setState({
      [key]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();

    for (const key in this.state) {
        if(this.state[key]){
            fd.append(key, this.state[key]);
        }
      
    }

    apiHandler
      .updateUser(fd)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { user } = this.props.authContext;

    console.log(user);

    if (!user) return <div>Loading...</div>;
    return (
      <section className="form-section">
        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h1 className="header">Edit profile</h1>

          <div>
            <img src={user.profileImg} alt={user.firstName} />

            {/* <input
            type="file"
            name="profileImg"
            id="profileImg"
            onChange={this.handleChange}
            /> */}

            <label htmlFor="profileImg" className="btn"></label>
            <input id="profileImg" type="file" />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              defaultValue={user.firstName}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              defaultValue={user.lastName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              defaultValue={user.email}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              defaultValue={user.password}
            />
          </div>

          <button className="btn-submit">Submit</button>
        </form>
      </section>
    );
  }
}

export default withUser(FormProfile);
