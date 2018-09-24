class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const users = this.users.filter((user) => user.id !== id);
    const namesArray = users.map((user)=> user.name);
    return namesArray; 
  }

  getUser(id) {
    const findUser = this.users.filter((user) => user.id === id);
    return findUser[0];
  }

  getUsersList(room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = { Users };
