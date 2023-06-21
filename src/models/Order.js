module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {}, { underscored: true })

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        Order.belongsTo(models.Payment, {
            foreignKey: {
                name: 'paymentId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        Order.belongsTo(models.Avatar, {
            foreignKey: {
                name: 'avatarId',
            },
            onDelete: 'RESTRICT',
        })

        Order.belongsTo(models.Hat, {
            foreignKey: {
                name: 'hatId',
            },
            onDelete: 'RESTRICT',
        })

        Order.belongsTo(models.Drink, {
            foreignKey: {
                name: 'drinkId',
            },
            onDelete: 'RESTRICT',
        })
    }
    return Order
}
