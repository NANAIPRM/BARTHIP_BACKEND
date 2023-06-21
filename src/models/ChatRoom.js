module.exports = (sequelize, DataTypes) => {
    const ChatRoom = sequelize.define(
        'ChatRoom',
        {
            roomNumber: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    )

    ChatRoom.associate = (models) => {
        ChatRoom.belongsTo(models.Theme, {
            foreignKey: {
                name: 'themeId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        ChatRoom.hasMany(models.Message, {
            foreignKey: {
                name: 'chatroomId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })
    }
    return ChatRoom
}
