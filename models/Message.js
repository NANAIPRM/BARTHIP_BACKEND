module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    },
    {
      timestamps: true,
      underscored: true,
    }

  );
  Message.associate = (db) => {
    Message.belongsTo(db.User, {
      foreignKey: "userId",
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }),

      Message.belongsTo(db.Room, {
        foreignKey: "roomId",
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })


  }





  return Message
}