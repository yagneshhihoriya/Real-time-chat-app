module.exports = {
  async up(db, client) {
    return db.collection('users').update(
      { admin: true },
      {
        $set: {
          name: 'admin',
          admin: true,
          password: 'admin',
          contact: '9924171740',
          email: 'admin@gmail.com',
        },
      },
      { upsert: true },
    );
  },
  async down(db, client) {
    return db.collection('users').deleteMany({});
  },
};
