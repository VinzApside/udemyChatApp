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
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);

    }
    return user;
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
