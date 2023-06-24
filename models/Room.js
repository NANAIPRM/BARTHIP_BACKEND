module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
        "Room",
        {
          number: {
            type: DataTypes.STRING,
            allowNull: true,
          }
        },
        {
          timestamps: true,
          underscored: true,
        }

      );
      Room.associate = (db) =>{
        Room.hasMany(db.Message,{
            foreignKey: "roomId",
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        })
        
      }

      

      return Room
    }