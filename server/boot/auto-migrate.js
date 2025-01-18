'use strict';

module.exports = function(app) {
  const ds = app.dataSources.db;

  // List all models
  const models = ['ACL', 'teams', 'members'];

  models.forEach(model => {
    ds.isActual(model, (err, actual) => {
      if (err) throw err;

      if (!actual) {
        ds.autoupdate(model, (err) => {
          if (err) throw err;
          console.log(`Model ${model} updated in the database!`);

          // Check for relations and add foreign keys
          const relations = app.models[model].definition.settings.relations;
          if (relations) {
            Object.keys(relations).forEach(relationName => {
              const relation = relations[relationName];
              if (relation.type === 'belongsTo' && relation.foreignKey) {
                const sql = `
                  ALTER TABLE ${model}
                  ADD CONSTRAINT fk_${relation.foreignKey}
                  FOREIGN KEY (${relation.foreignKey})
                  REFERENCES ${relation.model}(id)
                `;
                ds.connector.execute(sql, [], function(err) {
                  if (err && err.code !== '42P07') throw err; // Ignore error if constraint already exists
                  // eslint-disable-next-line max-len
                  console.log(`Foreign key constraint added to ${relation.foreignKey} in ${model} table.`);
                });
              }
            });
          }
        });
      } else {
        console.log(`Model ${model} is already up-to-date.`);
      }
    });
  });
};
