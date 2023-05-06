
const sequelize = require('../config/connection.js');
//! why const {} require seq. 
const { Model, DataTypes } = require('sequelize');


class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            PrimaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            //! references?
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,

        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'painting',
    }
);

module.exports = Post;