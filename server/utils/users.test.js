const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  it("Should add new user", () => {
    let newUsers = new Users();
    let user = {
      id: 123,
      name: "Vinz",
      room: "The_office"
    };
    const result = newUsers.addUser(user.id, user.name, user.room);
    expect(newUsers.users).toEqual([user]);
  });
});
