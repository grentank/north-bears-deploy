// import fs from 'fs/promises';
// import bcrypt from 'bcrypt';
const fs = require('fs/promises');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const students = await fs.readFile('./db/seeders/students.txt', 'utf8');
    const hashpass = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert(
      'Users',
      students.split('\n').map((str) => {
        const data = str.split(',');
        return {
          username: data[0],
          email: data[1],
          avatar: `${data[2]}.png`,
          hashpass,
        };
      }),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
