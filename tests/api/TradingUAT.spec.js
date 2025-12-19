import { test, expect, request } from '@playwright/test';
const { apiRoutes } = require('../config/apiRoutes');
const { env } = require('../config/env');

test.describe('API Regression - Trading UAT', () => {
    let apiContext;
    let token;

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: env.baseURL // API ONE base URL
        });

        // Login and get token
        const payload = {
            clientId: '011C078679',
            clientSecret: 'ifQjeYwlREkGc72lFQ3NZKwiCWeqja1b'
        };

        const response = await apiContext.post(apiRoutes.auth.login, {
            data: payload,
            headers: {
                Cookie: 'JSESSIONID=CE5C4C13B699B9D6AD8CCE8269EA573E'
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        token = body.data.access_token;
        console.log('Login token:', token);
    });

    test('Get user account', async () => {
        const res = await apiContext.get(apiRoutes.equity.get_account, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const body = await res.json();
        console.log('User account response:', body);
        expect(res.status()).toBe(200);
        expect(body.account).toBeDefined();

        // Verify some key fields
        expect(body.account.openBal).toBeGreaterThan(0);
        expect(body.account.marginStatus).toBe('normal');
        expect(body.account.marginContractNo).toBeDefined();
        expect(body.account.cashBal).toBeGreaterThan(0);
    });

});