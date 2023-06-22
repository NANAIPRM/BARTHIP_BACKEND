const { sequelize, User, Message, Room } = require("./models");
const bcrypt = require('bcryptjs')

const hashed = bcrypt.hashSync("1234")


sequelize
  .sync({ force: true })
  .then(() => {
    return User.bulkCreate([
      { username: "Tong", password: hashed },
      { username: "Nai", password: hashed },
      { username: "Tae", password: hashed },
    ]);
  })
  .then(() => {
    return Room.bulkCreate([
      {number: "1"},
      {number: "2"}
    ]);
  })
  .then(() => {
    return Message.bulkCreate([
      {message: "ควย", userId: 1, roomId:"1"},
      {message: "ควย", userId: 1, roomId:"1"},
      {message: "ควย", userId: 1, roomId:"2"},

    ]);
  })
 

  .then(() => process.exit(0))
  .catch((err) => console.log(err.message));
