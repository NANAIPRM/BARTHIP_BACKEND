const { sequelize, User, Message, Room } = require("./models");
const bcrypt = require('bcryptjs')

const hashed = bcrypt.hashSync("1234")


sequelize
  .sync({ force: true })
  .then(() => {
    return User.bulkCreate([
      { username: "one", password: hashed },
      { username: "two", password: hashed },
      { username: "three", password: hashed },
      { username: "four", password: hashed },
      { username: "five", password: hashed },
      { username: "six", password: hashed },
   
    ]);
  })
  .then(() => {
    return Room.bulkCreate([
      {number: "1"},
      {number: "2"},
      {number: "3"},
      {number: "4"}
    ]);
  })
  .then(() => {
    return Message.bulkCreate([
      {message: "ควย1", userId: 3, roomId:"1"},
      {message: "ควย2", userId: 6, roomId:"2"},
      {message: "ควย3", userId: 2, roomId:"2"},
      {message: "ควย4", userId: 4, roomId:"2"},
      {message: "ควย5", userId: 1, roomId:"2"},

    ]);
  })
 

  .then(() => process.exit(0))
  .catch((err) => console.log(err.message));
