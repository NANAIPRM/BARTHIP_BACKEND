module.exports = (sequelize, DataTypes) => {
    const Hat = sequelize.define(
        'Hat',
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

    Hat.associate = (models) => {
        Hat.hasMany(models.UserHat, {
            foreignKey: {
                name: 'hatId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })

        Hat.hasMany(models.Order, {
            foreignKey: {
                name: 'hatId',
            },
            onDelete: 'RESTRICT',
        })
    }
    return Hat
}
