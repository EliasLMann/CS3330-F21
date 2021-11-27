import axios from 'axios';
const url = "http://localhost:8000"

export class UserRepository {

  url = "http://localhost:8000"

  addUser(userName, password){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/register`, {userName: userName, password: password})
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
    })
  }

  addRestaurant(restaurantData){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/addRestaurant`, {insert: restaurantData})
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
    })
  }


  /*
  return an object of the user that is currently logged
  */
  currentUser() {
    const user = sessionStorage.getItem('user');
    if (!user) return {};
    return JSON.parse(user);
  }

  /*
  Function returns a boolean indicating whether or not a user is logged in
  */
  loggedIn() {
    return Object.keys(this.currentUser()).length !== 0;
  }


  async login(username, password) {
    const errors = {};
    const { data, status } = await axios.get('http://localhost:8000' + '/login', {
      username,
      password
    });

    if (status > 204) errors.request = 'Bad Request';

    switch (data.status) {
      case 1:
        errors.email = 'There is no user with this email';
        errors.success = false;
        break;
      case 2:
        errors.password = 'Incorrect password';
        errors.success = false;
        break;

      default:
        errors.success = true;
        break;
    }
    return errors;
  }

  async getRestaurants() {
    const errors = { success: false };
    const { data, status } = await axios.get('http://localhost:8000/restaurants');
    if (status >= 201) {
      console.log(data);
      errors.reason = 'Bad Request';
    } else errors.success = true;

    return [data, errors];
  }

}