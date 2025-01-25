'use strict';

const request = require('supertest');

jest.mock('../server/server', () => {
  const loopback = require('loopback');
  const app = loopback();

  const ds = app.dataSource('db', { connector: 'memory' });

  const Team = app.registry.createModel({
    name: 'Team',
    properties: {
      id: { type: 'number', id: true },
      name: { type: 'string' },
      description: { type: 'string' },
    },
  });

  app.model(Team, { dataSource: ds });

  app.use('/api', loopback.rest());

  return app;
});

const app = require('../server/server');

describe('Teams API', () => {
  it('should get all teams', async () => {
    const res = await request(app).get('/api/teams');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new team', async () => {
    const newTeam = { name: 'New Team', description: 'Development team' };
    const res = await request(app).post('/api/teams').send(newTeam);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(newTeam.name);
  });

  it('should get a team by id', async () => {
    const teamId = 1;
    const res = await request(app).get(`/api/teams/${teamId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a team by id', async () => {
    const teamId = 1;
    const updatedTeam = { name: 'Updated Team', description: 'Updated description' };
    const res = await request(app).put(`/api/teams/${teamId}`).send(updatedTeam);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedTeam.name);
  });

  it('should delete a team by id', async () => {
    const teamId = 1;
    const res = await request(app).delete(`/api/teams/${teamId}`);
    expect(res.statusCode).toEqual(200);
  });
});
