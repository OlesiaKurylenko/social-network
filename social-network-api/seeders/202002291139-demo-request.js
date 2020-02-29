'use strict'

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('request', [{
    user_id:5,
    friend_id:7,
    status: 'PANDING',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
    {
    user_id:7,
    friend_id:8,
    status: 'PANDING',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    },
    {
    user_id:7,
    friend_id:2,
    status: 'PANDING',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    },
    {
    user_id:7,
    friend_id:1,
    status: 'APROVED',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  ]),

  down: queryInterface => queryInterface.bulkDelete('request', null, {})
}