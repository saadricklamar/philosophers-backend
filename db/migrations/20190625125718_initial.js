exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('philosophers', table => {
          table.increments('id').primary();
          table.string('name');
          table.integer('born');
          table.integer('died');

          table.timestamps(true,true);
      }),

      knex.schema.createTable('works', table => {
          table.increments('id').primary();
          table.string('work');
          table.integer('philosopher_id').unsigned();
          table.foreign('philosopher_id')
            .references('philosophers.id');
        
          table.timestamps(true,true);
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('works'),
      knex.schema.dropTable('philosophers')
  ]);
};
