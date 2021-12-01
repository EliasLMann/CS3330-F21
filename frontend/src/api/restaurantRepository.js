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

  getFeatItems(restaurantID) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/featItems`, { params: { restaurantID: restaurantID } })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  getRestID() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/restaurantId`)
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  async addRestaurant(restInfo) {
    const errors = {success : false};

    const {data, status} = await axios.post(`${this.url}/addRestaurant`,
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
        });

        if (status <= 201) {
          errors.success = true;
          sessionStorage.setItem(
            'rest',
            JSON.stringify({
              restaurantID: data.insertId,
              status: 0
            })
          );
        }

        return errors;
  }

  getSponsoredRestaurants() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/restaurants/sponsored`)
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  getRestaurantReviews(restaurantID) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/Restaurantreviews`, {params : {restaurantID : restaurantID}})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  getRestaurantByCuisineType(query){
    console.log(query);
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/restaurants/byCuisineType`, {cuisineType: query})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }


}