module.exports = function(app) {
  const ds = app.dataSources.db;

  ds.automigrate('ACL', (err) => {
    if (err) throw err;
    console.log('ACL table created.');
  });

  ds.automigrate('teams', function(err) {
    if (err) throw err;
    console.log('Model teams migrated to PostgreSQL!');
  });
};
