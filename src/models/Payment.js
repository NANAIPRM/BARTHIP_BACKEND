module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        'Payment',
        {
            transactionId: DataTypes.INTEGER,
            paymentAt: DataTypes.STRING,
            totalPrice: DataTypes.INTEGER,
        },
        {
            underscored: true,
        }
    )

    Payment.associate = (models) => {
        Payment.hasOne(models.Order, {
            foreignKey: {
                name: 'paymentId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })
    }
    return Payment
}
