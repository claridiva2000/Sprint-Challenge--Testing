exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('games').insert([
        { title: 'Sonic2', genre: 'Sega', releaseYear: 1990 },
        { title: 'Ms. Pacman', genre: 'Arcade', releaseYear: 1980 },
        { title: 'Fallout 3', genre: 'PC', releaseYear: 2010 }
      ]);
    });
};
