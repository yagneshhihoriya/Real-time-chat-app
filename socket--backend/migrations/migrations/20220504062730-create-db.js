module.exports = {
  async up(db, client) {
    return db.collection("users").update(
      { admin: true },
      {
        $set: {
          name: "admin",
          admin: true,
          password: "admin",
          contact: "",
          email: "admin@nowhere.com",
        },
      },
      { upsert: true }
    );
  },
  async down(db, client) {
    return db.collection("users").deleteMany({});
  },
};
