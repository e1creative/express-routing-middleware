process.env.NODE_ENV = "test";

const request = require('supertest')

const app = require('./app');
let items = require('./fakeDb')

let newItem1 = { name: "coffee", price: 4.95 }
let newItem2 = { name: "juice", price: 2.95 }
let newItem3 = { name: "danish", price: 2.95 }

beforeEach(function() {
    // add our new item to our items fakeDB list
    items.push(newItem1)
    items.push(newItem2)
    items.push(newItem3)
})

afterEach(function(){
    // make sure we mutate items, and NOT REDEFINE items
    items.length = 0;
})


describe('GET route for /items', () => {
    test('Getting all items', async () => {
        const res = await request(app).get('/items')
        
        expect(res.status).toBe(200)
        expect(res.body).toEqual({items: items})
         
    })
})


describe('POST route for /items/', () => {
    test('Creating an item', async () => {
        const newItem = { name: "water", price: 1.95 }
        const res = await request(app).post('/items').send(newItem)

        expect(res.status).toBe(201)
        expect(res.body).toEqual({added: newItem})
    })
})


describe('GET route for /items/:name', () => {
    test('Get a single item', async () => {
        const res = await request(app).get('/items/coffee')

        expect(res.status).toBe(200)
        expect(res.body).toEqual({item: {name: "coffee", price: 4.95}})
    })
})

describe('PATCH route for /items/:name', () => {
    test('Update a single item', async () => {
        const res = await request(app).patch('/items/juice').send({name: "juice", price: 3.95})

        expect(res.status).toBe(201)
        expect(res.body).toEqual({updated: {name: "juice", price: 3.95}})
    })
})

describe('DELETE route for /items/:name', () => {
    test('Delete a single item', async () => {
        const res = await request(app).delete('/items/coffee')

        expect(res.status).toBe(200)
        expect(res.body).toEqual({"message": "Deleted"})


    })
})