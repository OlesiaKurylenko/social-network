module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('request', {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    friend_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    status: {
     type: Sequelize.ENUM('PANDING', 'APROVED'),
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }, {
    underscored: true,
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'request',
  }),

  down: queryInterface => queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS "request" CASCADE
  `)
}
