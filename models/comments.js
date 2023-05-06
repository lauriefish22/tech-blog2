const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comments extends Model { }

Comments.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        PrimaryKey: true,
        autoIncrement: true,
    },

    comment_body: {
        type: DataTypes.STRING,


    },
    user_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: 'user',
            key: 'id',
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: 'post',
            key: 'id',
        },
    },
},
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'painting',
    }
);
module.exports = Comments;