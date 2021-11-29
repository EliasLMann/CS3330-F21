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
}