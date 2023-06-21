module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        'Admin',
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
            mobile: {
                type: DataTypes.STRING,
                validate: {
                    is: /^[0-9]{10}$/,
                },
            },
        },
        {
            underscored: true,
        }
    )
    return Admin
}
