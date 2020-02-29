"use strict";

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert("friend", [
      {
        user_id: 7,
        friend_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete("friend", null, {})
};
