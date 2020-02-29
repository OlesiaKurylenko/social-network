module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('friend', {
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
    tableName: 'friend',
  }),

  down: queryInterface => queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS "friend" CASCADE
  `)
}
