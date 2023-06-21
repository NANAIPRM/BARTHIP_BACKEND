module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            message: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    )

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        Message.belongsTo(models.ChatRoom, {
            foreignKey: {
                name: 'chatroomId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })
    }
    return Message
}
