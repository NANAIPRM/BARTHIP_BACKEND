module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            hatId:
            {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            drinkId:
            {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            avatarId:
            {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        },
        {
            underscored: true
        }
    )

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


    }
    return Order
}
