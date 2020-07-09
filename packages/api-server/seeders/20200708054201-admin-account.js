
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Admins', [{
      fullname: 'admin',
      birthday: new Date,
      phone_number: 'admin',
      password: 'abcdef',
      email: 'admin',
      removed: false,
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Admins', null, {});
  },
};
