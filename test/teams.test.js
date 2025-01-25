'use strict';

const request = require('supertest');
const app = require('../server/server');

describe('Teams API', () => {
  let teamId;

  beforeAll(async () => {
    const newTeam = {name: 'Test Team', description: 'Testing team'};
    const res = await request(app).post('/api/teams').send(newTeam);
    teamId = res.body.id;
  });

  afterAll(async () => {
    await request(app).delete(`/api/teams/${teamId}`);
  });

  it('should get all teams', async () => {
    const res = await request(app).get('/api/teams');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new team', async () => {
    const newTeam = {name: 'New Team', description: 'Development team'};
    const res = await request(app).post('/api/teams').send(newTeam);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(newTeam.name);
  });

  it('should get a team by id', async () => {
    const res = await request(app).get(`/api/teams/${teamId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a team by id', async () => {
    const updatedTeam = {name: 'Updated Team', description: 'Updated description'};
    const res = await request(app).put(`/api/teams/${teamId}`).send(updatedTeam);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedTeam.name);
  });

  it('should delete a team by id', async () => {
    const res = await request(app).delete(`/api/teams/${teamId}`);
    expect(res.statusCode).toEqual(200);
  });
});
