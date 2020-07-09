const STATUS = require('../utils/statusDict');
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Identities', [{
      customer_id: 1,
      pid: '111111111',
      create_date: new Date(),
      location: 'Ho Chi Minh',
      front_image: 'https://www.takethis.org/wp-content/uploads/2016/04/triggered-meme.jpg',
      back_image: 'https://www.takethis.org/wp-content/uploads/2016/04/triggered-meme.jpg',
      status: STATUS.VERIFIED,
    }, {
      customer_id: 2,
      pid: '222222222',
      create_date: new Date(),
      location: 'Ho Chi Minh',
      front_image: 'https://www.takethis.org/wp-content/uploads/2016/04/triggered-meme.jpg',
      back_image: 'https://www.takethis.org/wp-content/uploads/2016/04/triggered-meme.jpg',
      status: STATUS.VERIFIED,
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Identities', null, {});
  },
};
