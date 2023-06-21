module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            googleToken: DataTypes.STRING,
            nickname: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    )

    User.associate = (models) => {
        User.hasMany(models.UserAvatar, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        User.hasMany(models.UserHat, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        User.hasMany(models.UserDrink, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        User.hasMany(models.Message, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        User.hasMany(models.Order, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })
    }
    return User
}