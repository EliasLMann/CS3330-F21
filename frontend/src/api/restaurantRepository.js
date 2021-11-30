import axios from 'axios';



export class RestaurantRepository {
  url = "http://localhost:8000";

  getRestaurants() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/restaurants`)
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  getRestaurant(restaurantID) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/restaurant`, {params: {restaurantID : restaurantID}})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  getMenuItems(restaurantID) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/menuItems`, {params: {restaurantID : restaurantID}})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  getReviews(restaurantID) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/reviews`, {params: {restaurantID : restaurantID}})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }




}