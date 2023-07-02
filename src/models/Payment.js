module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        'Payment',
        {
            emailUser: DataTypes.STRING,
            paymentStatus: DataTypes.STRING,
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
