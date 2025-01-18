'use strict';

module.exports = function(app) {
  const Member = app.models.members;

  app.get('/members', (req, res) => {
    Member.find({include: 'teams'}, (err, members) => {
      if (err) return res.status(500).send(err);
      res.send(members);
    });
  });
};
