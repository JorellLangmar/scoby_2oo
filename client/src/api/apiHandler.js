import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/api/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItemsTwo(endPoint) {
    return service
      .get(endPoint)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOne(endPoint) {
    return service
      .get(endPoint)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  updateUser(data){
    
    return service.patch("/api/users/me", data);
  },


  createItem(endPoint, data) {
    return service.post(endPoint, data);
  },

  updateItem(endPoint, data) {
    return service.patch(endPoint, data);
  },

  deleteItem(endPoint, id) {
    return service.delete(endPoint+id);
  }

};
