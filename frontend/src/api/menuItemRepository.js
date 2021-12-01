import axios from 'axios';



export class MenuItemRepository {
  url = "http://localhost:8000";

  incrementLikes(ID) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/incrementlikes`, {}, { params: { itemID: ID } })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  incrementDislikes(ID) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/incrementdislikes`, {}, { params: { itemID: ID } })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

  addMenuItem(itemInfo) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/postmenuitem`,
        {
          restaurantID: itemInfo[0],
          itemName: itemInfo[1],
          price: itemInfo[2],
          itemLink: itemInfo[3],
          mealType: itemInfo[4],
          likes: itemInfo[5],
          dislikes: itemInfo[6],
          featured: itemInfo[7],
          photo: itemInfo[8],
          description: itemInfo[9]
        })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  updateItem(itemInfo) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/updateitem`, {},
        {
          params:
          {
            itemID: itemInfo[0],
            itemName: itemInfo[1],
            price: itemInfo[2],
            itemLink: itemInfo[3],
            mealType: itemInfo[4],
            likes: itemInfo[5],
            dislikes: itemInfo[6],
            featured: itemInfo[7],
            photo: itemInfo[8],
            description: itemInfo[9]
          }
        }
      )
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  deleteItem(itemID) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/deleteitem`, { params: { itemID: itemID } })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    })
  }

  getItem(itemID) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/menuitem`, { params: { itemID: itemID } })
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        })
    });
  }

}
