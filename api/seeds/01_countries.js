exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("countries")
    .del()
    .then(function() {
      // Inserts seed entries
      return Promise.all([
        knex("countries").insert([
          {
            id: 1,
            name: "Austria",
            code: "AT"
          },
          {
            id: 2,
            name: "Belgium",
            code: "BE"
          },
          {
            id: 3,
            name: "Canada",
            code: "CA"
          },
          {
            id: 4,
            name: "Czech Republic",
            code: "CZ"
          },
          {
            id: 5,
            name: "England",
            code: "UK"
          },
          {
            id: 6,
            name: "Germany",
            code: "DE"
          },
          {
            id: 7,
            name: "United Kingdom",
            code: "UK"
          },
          {
            id: 8,
            name: "United States",
            code: "US"
          },
          {
            id: 9,
            name: "Ukraine",
            code: "UA"
          },
          {
            id: 10,
            name: "Slovenia",
            code: "SI"
          },
          {
            id: 11,
            name: "New Zealand",
            code: "NZ"
          },
          {
            id: 12,
            name: "Poland",
            code: "PL"
          },
          {
            id: 13,
            name: "Japan",
            code: "JP"
          },
          {
            id: 14,
            name: "France",
            code: "FR"
          },
          {
            id: 0,
            name: "N/A",
            code: ""
          }
        ])
      ]).catch(err => console.log("Error seeding countries", err));
    });
};
