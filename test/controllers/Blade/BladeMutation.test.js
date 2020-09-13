/* eslint-disable no-irregular-whitespace */
const request = require('supertest');

const {
  beforeAction,
  afterAction,
} = require('../../helpers/setup');
const { getAccessToken } = require('../../helpers/getAccessToken');

// const { Blade } = require('../../../src/models');

let api;
let token;

beforeAll(async () => {
  api = await beforeAction();
  token = await getAccessToken();
});

afterAll(() => {
  afterAction();
});

test('Blade | create, update, delete', async () => {
  const createMutation = `
    mutation {
      createBlade(
        value: "blade"
      ) {
        id
        value
      }
    }
  `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: createMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.createBlade.value).toBe('blade');
});

// test('Blade | updateBlade', async () => {
//   const blade = await Blade.create({
//     value: 'update blade44',
//   });
//
//   console.log(blade, 'bang blade updageBlade');
//
//   const updateMutation = `
//     mutation {
//       updateBlade(
//         id: ${blade.id}
//         value: "update blade244"
//       ) {
//         id
//         value
//       }
//     }
//   `;
//
//   const res = await request(src)
//     .post('/graphql')
//     .set('Accept', /json/)
//     .set({
//       Authorization: `Bearer ${token}`,
//     })
//     .send({ query: updateMutation })
//     .expect(200)
//     .expect('Content-Type', /json/);
//
//   expect(res.body.data.updateBlade.value).toBe('update blade244');
// });

test('Blade | updateBlade | Blade does not exist', async () => {
  const updateMutation = `
    mutation {
      updateBlade(
        id: 9999
        value: "blade"
      ) {
        value
      }
    }
  `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: updateMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.updateBlade).toBe(null);
  expect(res.body.errors[0].message).toBe('Blade with id: 9999 not found!');
});

// test('Blade | deleteBlade', async () => {
//   const blade = await Blade.create({
//     value: 'delete blade123',
//   });
//
//   const deleteMutation = `
//     mutation {
//       deleteBlade(
//         id: ${blade.id}
//       ) {
//         value
//       }
//     }
//   `;
//
//   const res = await request(src)
//     .post('/graphql')
//     .set('Accept', /json/)
//     .set({
//       Authorization: `Bearer ${token}`,
//     })
//     .send({ query: deleteMutation })
//     .expect(200)
//     .expect('Content-Type', /json/);
//
//   expect(res.body.data.deleteBlade.value).toBe('delete blade123');
// });

test('Blade | deleteBlade | blade does not exist', async () => {
  const deleteMutation = `
    mutation {
      deleteBlade(
        id: 9999
      ) {
        value
      }
    }
  `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: deleteMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.deleteBlade).toBe(null);
  expect(res.body.errors[0].message).toBe('Blade with id: 9999 not found!');
});
