const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../model/dbUtils');
const webapp = require('../src/controller/server');

const{ testUser } = require('./testUtils');

describe(' POST /login endpoint tests', () => {
    let mongo; 
    let response; 

    beforeAll(async () =>  {
        mongo = await connect(); 

        response = await request(webapp).post('/login').send(`username=${testUser.username}&password=${testUser.password}`);
        console.log('response: ', response.text);
    });

    afterAll(async () => {
        try {
            await mongo.close(); 
            await closeMongoDBConnection();
            await closeMongoDBConnection();
        } catch (e) {
            return e; 
        }
    });

    test('status: 201 and response type: application/json', () => {
        expect(response.status).toBe(201);
        expect(response.type).toBe('application/json');
    });

    test('JWT in response', () => {
        console.log('returned data id', response.text);
        expect(JSON.parse(response.text).apptoken).not.toBe(undefined);
    });

    test('missing password', async () => {
        const res = await request(webapp).post('/login/').send('username=testuser');
        expect(res.status).toEqual(401);
    });

    test('missing username', async () => {
        const res = await request(webapp).post('/login/').send('password=cis3500');
        expect(res.status).toEqual(401);
    });

    test('incorrect username', async () => {
        const res = await request(webapp).post('/login/').send(`username=lol&password=${testUser.password}`);
        expect(res.status).toEqual(401);
    })

    test('incorrect password', async () => {
        const res = await request(webapp).post('/login/').send(`username=${testUser.username}&password=lol`);
        expect(res.status).toEqual(401);
    });


});