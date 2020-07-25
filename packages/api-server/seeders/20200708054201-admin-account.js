
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Admins', [{
      fullname: 'admin',
      birthday: new Date,
      phone_number: 'admin',
      password: '$2b$10$ttjepFfntDdMAOLV5dz6YO/oaX.DXRkHaZ6MPao6Jzfqm3l.5v99m', //abcdef
      email: 'admin',
      removed: false,
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Admins', null, {});
  },
};
