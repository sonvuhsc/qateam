// import { test, expect, request } from '@playwright/test';
import { test, expect, request } from '@playwright/test';
const { apiRoutes } = require('../config/apiRoutes');
const { env } = require('../config/env');

test.describe('API Regression - Client Sale platform Flow', () => {
    let apiContext;
    let apiContextSP;
    let token;

    // test.beforeAll(async () => {
    //     apiContext = await request.newContext({
    //         baseURL: env.baseURL // API ONE base URL
    //     });
    //     apiContextSP = await request.newContext({
    //         baseURL: env.baseURL_SP // SP API base URL
    //     });

    //     // Login and get token
    //     const payload = {
    //         clientId: '011C078679',
    //         clientSecret: 'ifQjeYwlREkGc72lFQ3NZKwiCWeqja1b'
    //     };

    //     const response = await apiContext.post(apiRoutes.auth.login, {
    //         data: payload,
    //         headers: {
    //             Cookie: 'JSESSIONID=CE5C4C13B699B9D6AD8CCE8269EA573E'
    //         }
    //     });

    //     expect(response.status()).toBe(200);
    //     const body = await response.json();
    //     token = body.data.access_token;
    //     console.log('Login token:', token);
    // });

    // test('Get user profile SP', async () => {
    //     const res = await apiContextSP.get(apiRoutes.subscription.user_info, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     });
    //     const body = await res.json();
    //             console.log('User info response:', body);

    //     // expect(body.statusCode).toBe(200);
    //     expect(body.message).toBe('Success');
    //     expect(body.data).toBeDefined();

    //     // Verify subscriptionName and status
    //     expect(body.data.subscriptionName).toBeDefined();
    //     expect(body.data.status).toBeDefined();

    //     // Store values
    //     const subscriptionName = body.data.subscriptionName;
    //     const status = body.data.status;

    //     console.log('subscriptionName:', subscriptionName);
    //     console.log('status:', status);

    //     // You can use these variables for further tests if needed
    // });


    // test('GET subscription list returns valid data', async () => {

    //     const response = await apiContext.get(apiRoutes.subscription.list);
    //     expect(response.status()).toBe(200);
    //     const body = await response.json();
    //     // Verify top-level fields
    //     expect(body.statusCode).toBe(200);
    //     expect(body.message).toBe('Success');
    //     expect(Array.isArray(body.data)).toBeTruthy();
    //     expect(body.data.length).toBeGreaterThan(0);

    //     for (const item of body.data) {
    //         expect(item.id).toBeDefined();
    //         expect(item.fixedId).toBeDefined();
    //         expect(Array.isArray(item.prices)).toBeTruthy();

    //         for (const price of item.prices) {
    //             expect([1, 3, 6, 12]).toContain(price.period);
    //         }
    //     }
    // });

    // test('Login with valid credentials should return success', async () => {
    //     const payload = {
    //         "clientId": "011C078679",
    //         "clientSecret": "ifQjeYwlREkGc72lFQ3NZKwiCWeqja1b",
    //     };

    //     const response = await apiContext.post('https://trading-api-uat.hsc.com.vn/iam/trading-api/v0.1/auth/token', {
    //         data: payload
    //     });
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
    // });


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