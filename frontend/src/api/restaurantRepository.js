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

  addRestaurant(restInfo) {
    console.log(restInfo[1]);
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/addRestaurant`,
        {
            restaurantName: restInfo[0],
            location: restInfo[1],
            hours : restInfo[2],
            description : restInfo[3],
            cuisineType : restInfo[4],
            website : restInfo[5],
            sponsored : restInfo[6],
            socialMediaName : restInfo[7],
            socialMediaURL : restInfo[8]
        })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }


}