const axios = require('axios');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const response = await axios('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data.map(({ title, body, userId }) => ({ title, body, userId }));
    await queryInterface.bulkInsert('Posts', posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
