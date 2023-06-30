module.exports = (sequelize, DataTypes) => {
    const Avatar = sequelize.define(
        'Avatar',
        {
            name: DataTypes.STRING,
            desciption: DataTypes.STRING,
            image: DataTypes.STRING,
            price: DataTypes.INTEGER,
            apiId: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    )

    Avatar.associate = (models) => {
        Avatar.hasMany(models.UserAvatar, {
            foreignKey: {
                name: 'avatarId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        Avatar.hasMany(models.Order, {
            foreignKey: {
                name: 'avatarId',
            },
            onDelete: 'RESTRICT',
        })
    }
    return Avatar
}
