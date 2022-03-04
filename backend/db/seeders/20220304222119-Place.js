'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Places', [
     {
      userId: 1,
      address: "123 Baker Street",
      city: "Chicago",
      state: "Illinois",
      country: "USA",
      name: "Ferris Buellers Tree",
      price: 245,
      imageUrl: "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dHJlZWhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
     },
     {
      userId: 1,
      address: "Amazing Island Ave",
      city: "Bali",
      state: "Bali",
      country: "Indonesia",
      name: "Island Tree with a View",
      price: 300,
      imageUrl: "https://images.unsplash.com/photo-1582880421648-a7154a8c99c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dHJlZWhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
      userId: 1,
      address: "904 Chateau Court",
      city: "Dallas",
      state: "TX",
      country: "USA",
      name: "Big Texas Tree",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1550934482-7904d33d1b54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJlZWhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
      userId: 2,
      address: "9870 Elizabeth Street",
      city: "Salt Lake City",
      state: "UT",
      country: "USA",
      name: "Mountain Tree",
      price: 480,
      imageUrl: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJlZWhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
    {
      userId: 2,
      address: "224 State Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      name: "Redwood",
      price: 800,
      imageUrl: "https://images.unsplash.com/photo-1601164709920-08578d86d2f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJlZSUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
    {
      userId: 3,
      address: "429 Bourbon Street",
      city: "New Orleans",
      state: "LA",
      country: "USA",
      name: "Happy Tree",
      price: 1000,
      imageUrl: "https://images.unsplash.com/photo-1513517147916-e77dd158b0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHRyZWVob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Places', null, {});
  }
};
