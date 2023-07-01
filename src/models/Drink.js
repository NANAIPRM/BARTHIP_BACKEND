module.exports = (sequelize, DataTypes) => {
    const Drink = sequelize.define(
        'Drink',
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            image: DataTypes.STRING,
            price: DataTypes.INTEGER,
        },
        {
            underscored: true,
        }
    )

    Drink.associate = (models) => {
        Drink.hasMany(models.UserDrink, {
            foreignKey: {
                name: 'drinkId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        Drink.hasMany(models.Order, {
            foreignKey: {
                name: 'drinkId',
            },
            onDelete: 'RESTRICT',
        })
        Drink.hasMany(models.User, {
            foreignKey: {
                name: 'drinkId',
                allowNull: true,
            },
            onDelete: 'RESTRICT',
        })
    }
    return Drink
}
