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
      axios.get(`${this.url}/restaurant`, { params: { restaurantID: restaurantID } })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  getMenuItems(restaurantID) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/menuItems`, { params: { restaurantID: restaurantID } })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  addRestaurant(restaurantName, location, hours, description, cuisineType, website, socialMediaName) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/addRestaurant`,
        {
          params: {
            restaurantName: restaurantName,
            location: location,
            hours : hours,
            description : description,
            cuisineType : cuisineType,
            website : website,
            sponsored : 0,
            socialMediaName : socialMediaName,
            socialMediaURL : "socialMediaURL"
          }
        })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }


}