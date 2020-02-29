"use strict";

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert("user", [
      {
        first_name: "John",
        last_name: "Doe",
        login: "john@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        first_name: "J",
        last_name: "Doe",
        login: "j@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        first_name: "Johnny",
        last_name: "Doe",
        login: "johnny@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        first_name: "Johann",
        last_name: "Doe",
        login: "johann@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        first_name: "James",
        last_name: "Smith",
        login: "james@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        first_name: "Jira",
        last_name: "Doe",
        login: "jira@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        first_name: "Jerry",
        last_name: "Doe",
        login: "jerry@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        login: "Jane@gmail.com",
        password: "123123",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete("user", null, {})
};
