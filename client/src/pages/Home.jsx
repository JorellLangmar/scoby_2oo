import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends Component {
  state = {
    items: null,
  };

  componentDidMount = () => {
    apiHandler
      .getItems("/api/items")
      .then((items) => {
        console.log(items, "get items data :)");
        this.setState({ items: items });
      })
      .catch((err) => console.log(err));
  };

  // Implement react map box here.
  render() {
    return (
      <div>
        <Map
          center={[2.3488, 48.8534]}
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >
          {!this.state.items || this.state.items.length === 0
            ? null
            :this.state.items.map((item, i) => <Marker key={i} coordinates={item.location.coordinates} anchor="bottom">
            <img style={{width:"2vw"}} src={item.image} alt={item.name} />
          </Marker>)}
          
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
        <p>On home /</p>
      </div>
    );
  }
}

export default Home;
