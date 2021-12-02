import axios from 'axios';

const url = "http://ec2-3-15-138-60.us-east-2.compute.amazonaws.com:8000"
export class UserRepository {

  url = "http://ec2-3-15-138-60.us-east-2.compute.amazonaws.com:8000"

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

  //GET userReviews by ID
  getUserReviews(userID){
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/userReviews`, { params: { userID: userID } })
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
    console.log(userID + " " + restID)
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/assignRestaurant`, {userID: userID, newRestID: restID})
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

  async updateSession(userName) {
    const errors = { success: false };
    const { data, status } = await axios.get(url + '/user', {
      params: { userName: userName }
    });

    if (status >= 201) errors.request = 'Bad Request';
    else {
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          ...this.currentUser(),
          userID: data.data[0].userID,
          restaurantID: data.data[0].restaurantID
        })
      );
      errors.success = true;
    }
    return errors;
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
            restaurantID: data.restaurantID,
            status: 0
          })
        );
        errors.success = true;
        break;
    }
    return errors;
  }

  addUser(userName, password) {
    return new Promise((resolve, reject) => {

      axios.post(`${this.url}/register`, { userName: userName, password: password })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  addReview(reviewInfo) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/addReview`,
        {
          reviewID: reviewInfo[0],
          restaurantID: reviewInfo[1],
          userID: reviewInfo[2],
          body: reviewInfo[3],
          date: reviewInfo[4],
          isSponsored: reviewInfo[5],
          rating: reviewInfo[6],
        })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  getMoreInfo(userName) {
    return new Promise((resolve, reject) => {

      axios.get(`${this.url}/user`, {params: {userName : userName}})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }



  async register(userName, password) {
    const errors = {success : false};

    const {data, status} = await axios.post(url + '/register', {userName, password});

    if (data.status && data.status === 1) errors.email = 'Email already used';

    if (status <= 201) {
      errors.success = true;
      console.log(data);
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          username: userName,
          password: password,
          userID: data.userID,
          restaurantID: data.restaurantID,
          status: 0
        })
      );
    }

    return errors

  }

}