"use strict";

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        "Transaction",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false
            },

            id_user: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                unique: true,
            },

            id_payment_method: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },

            status: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },

            code: {
                type: DataTypes.STRING,
                allowNull: false
            },

            gross_amount: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },

            expire_time: {
                type: DataTypes.STRING,
                allowNull: false
            },

            platform: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "transactions",
            timestamps: true,
            underscored: true,
            paranoia: true
        }
    );

    return Transaction;
};
