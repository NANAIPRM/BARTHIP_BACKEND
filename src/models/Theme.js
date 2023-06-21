module.exports = (sequelize, DataTypes) => {
    const Theme = sequelize.define(
        'Theme',
        {
            themeRoom: DataTypes.STRING,
            playlistMusicUrl: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    )

    Theme.associate = (models) => {
        Theme.hasMany(models.ChatRoom, {
            foreignKey: {
                name: 'themeId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
        })
    }
    return Theme
}
