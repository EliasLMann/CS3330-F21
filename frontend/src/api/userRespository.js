import axios from 'axios';
import { UserContext } from '../context';

const url = "http://localhost:8000"
export class UserRepository {

  url = "http://localhost:8000"

  getRestaurants(){
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/restaurants`, this.config)
          .then(x => resolve(x.data))
          .catch(x => {
              alert(x);
              reject(x);
          })
    });
  }

  getRestaurant(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.url}/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
    });
  }

  linkUserRestaurant(userID, restID){
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/assignRestaurant`, {userID: userID, restID: restID})
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
    })
  }

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
    let userContext = sessionStorage.getItem('user');
    const user = userContext;
    if (!user) return {};
    return JSON.parse(user);
  }

  /*
  Function returns a boolean indicating whether or not a user is logged in
  */
  loggedIn() {
    return Object.keys(this.currentUser()).length !== 0;
  }

  /*
  Function removes user sessionStorage items
  */
  logout() {
    sessionStorage.removeItem('user');
  }

  async login(user, pass) {
    const errors = {};
    const { data, status } = await axios.get(url + '/login', {
      params: { userName: user, password: pass }
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
        console.log("setting session storage");
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            username: user,
            userId: data.userID,
            password: pass,
            status: data.status ?? 0
          })
        );
        errors.success = true;
        break;
    }
    return errors;
  }


}