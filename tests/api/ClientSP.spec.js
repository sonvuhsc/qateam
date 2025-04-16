import { test, expect, request } from '@playwright/test';
const { apiRoutes } = require('../config/apiRoutes');
const { env } = require('../config/env');


test.describe('API Regression - Client Sale platform Flow', () => {
    let apiContext;
    let token;

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: env.baseURL
        });
    });

    test('GET subscription list returns valid data', async () => {

        const response = await apiContext.get(apiRoutes.subscription.list);
        expect(response.status()).toBe(200);
        const body = await response.json();
        // Verify top-level fields
        expect(body.statusCode).toBe(200);
        expect(body.message).toBe('Success');
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body.data.length).toBeGreaterThan(0);

        for (const item of body.data) {
            expect(item.id).toBeDefined();
            expect(item.fixedId).toBeDefined();
            expect(Array.isArray(item.prices)).toBeTruthy();

            for (const price of item.prices) {
                expect([1, 3, 6, 12]).toContain(price.period);
            }
        }
    });


    // test('Login with valid credentials should return success', async () => {
    //     const payload = {
    //       username: '011C862206',
    //     //   password: 'DKq3+cnVJ8+UU3EtWrk6hjZjHxPpMYGHWzf3RiAPoXzFRvQaa7cwKcsYhnDfbqZGe7ERrLyEB3x7XQMZ90hLCw=='
    //       password: '123456'
    //     };
    
    //     const response = await apiContext.post('/api/account/user/login', {
    //       data: payload
    //     });
    
    //     // Kiểm tra status HTTP
    //     expect(response.status()).toBe(200);
    
    //     const body = await response.json();
    //     console.log('Login response:', body);
    
    //     expect(body).toHaveProperty('statusCode', 200);
    //     expect(body).toHaveProperty('message', 'Success');
    
    //     //  API trả về token / user info, kiểm tra thêm
    //     // expect(body.data.token).toBeDefined();
    //     // expect(body.data.username).toBe('0142342');
    //   });


    //   test('Login returns token', async () => {
    //     const res = await apiContext.post('/auth/login', {
    //       data: { username: 'demo', password: 'secret' }
    //     });

    //     expect(res.status()).toBe(200);
    //     const body = await res.json();
    //     expect(body.token).toBeDefined();
    //     token = body.token;
    //   });

    //   test('Get user profile with token', async () => {
    //     const res = await apiContext.get('/user/profile', {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });

    //     expect(res.ok()).toBeTruthy();
    //     const data = await res.json();
    //     expect(data.username).toBe('demo');
    //   });
});