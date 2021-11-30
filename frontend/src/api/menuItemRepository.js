import axios from 'axios';



export class MenuItemRepository {
  url = "http://localhost:8000";

  incrementLikes(ID) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/incrementlikes`, {}, {params:{itemID : ID}})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  incrementDislikes(ID) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/incrementdislikes`, {}, {params:{itemID : ID}})
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

}
