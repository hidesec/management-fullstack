'use strict';

const request = require('supertest');
const app = require('../server/server');

describe('Members API', () => {
  let memberId;

  beforeAll(async () => {
    const newMember = {name: 'Test Member', role: 'Tester'};
    const res = await request(app).post('/api/members').send(newMember);
    memberId = res.body.id;
  });

  afterAll(async () => {
    await request(app).delete(`/api/members/${memberId}`);
  });

  it('should get all members', async () => {
    const res = await request(app).get('/api/members');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new member', async () => {
    const newMember = {name: 'New Member', role: 'Developer'};
    const res = await request(app).post('/api/members').send(newMember);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(newMember.name);
  });

  it('should get a member by id', async () => {
    const res = await request(app).get(`/api/members/${memberId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a member by id', async () => {
    const updatedMember = {name: 'Updated Member', role: 'Manager'};
    const res = await request(app).put(`/api/members/${memberId}`).send(updatedMember);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedMember.name);
  });

  it('should delete a member by id', async () => {
    const res = await request(app).delete(`/api/members/${memberId}`);
    expect(res.statusCode).toEqual(200);
  });
});
