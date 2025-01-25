'use strict';

const request = require('supertest');

jest.mock('../server/server', () => {
  const loopback = require('loopback');
  const app = loopback();

  const ds = app.dataSource('db', { connector: 'memory' });

  const Member = app.registry.createModel({
    name: 'Member',
    properties: {
      id: { type: 'number', id: true },
      name: { type: 'string' },
      role: { type: 'string' },
    },
  });

  app.model(Member, { dataSource: ds });

  app.use('/api', loopback.rest());

  return app;
});

const app = require('../server/server');
const loopback = require('loopback');

describe('Members API', () => {
  it('should get all members', async () => {
    const res = await request(app).get('/api/members');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new member', async () => {
    const newMember = { name: 'New Member', role: 'Developer' };
    const res = await request(app).post('/api/members').send(newMember);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(newMember.name);
  });

  it('should get a member by id', async () => {
    const memberId = 1;
    const res = await request(app).get(`/api/members/${memberId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a member by id', async () => {
    const memberId = 1;
    const updatedMember = { name: 'Updated Member', role: 'Manager' };
    const res = await request(app).put(`/api/members/${memberId}`).send(updatedMember);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedMember.name);
  });

  it('should delete a member by id', async () => {
    const memberId = 1;
    const res = await request(app).delete(`/api/members/${memberId}`);
    expect(res.statusCode).toEqual(200);
  });
});
