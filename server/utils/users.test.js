const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {

  let users;
  users = new Users();

  users.users = [
    {
      id: "1",
      name: "a",
      room: 'node course'
    },
    {
      id: "2",
      name: "b",
      room: 'react course'
    },
    {
      id: "3",
      name: "c",
      room: 'node course'
    }
  ]

  it("Should add new user", () => {
    let users = new Users();
    let user = {
      id: 123,
      name: "Vinz",
      room: "The_office"
    };
    const result = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    const usersWithout = users.removeUser('1');
    
    expect(usersWithout).toEqual(["b", "c"])
  })

  it("should not remove user", () => {
    const usersWithout = users.removeUser('0');
    expect(usersWithout).toEqual(["a", "b", "c"])
  })

  it("should find a user", () => {
    const userId = '2';
    const userFinded = users.getUser(userId);
    expect(userFinded.id).toBe(userId);
  })

  it("should not find a user", () => {
    const userId = "245"
    const userFinded = users.getUser(userId);
    expect(userFinded).toNotExist()
  })

  it("should return names for node course", () => {
    const userList = users.getUsersList('node course');
    expect(userList).toEqual(['a', 'c']);
  })
});
