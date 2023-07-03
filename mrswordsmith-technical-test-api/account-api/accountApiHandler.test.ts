import { create, update, remove, get } from './accountApiHandler';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

const validAccount = {
    name: 'John Doe',
    address: '123 Street, City, Country',
    phone: '1234567890',
    email: 'johndoe@example.com',
};

const updatedAccount = {
    name: 'Jane Doe',
    address: '123 Street, City, Country',
    phone: '1234567890',
    email: 'janedoe@example.com',
};

const invalidAccount = {
    name: 123,
    address: '123 Street, City, Country',
    phone: '1234567890',
    email: 'johndoe@example.com',
};

const event = (body: unknown, pathParameters = {}): APIGatewayProxyEventV2 => ({
    body: JSON.stringify(body),
    pathParameters,
    routeKey: '',
    rawPath: '',
    rawQueryString: '',
    version: '',
    headers: {},
    requestContext: {
        accountId: '',
        apiId: '',
        domainName: '',
        domainPrefix: '',
        http: {
            method: '',
            path: '',
            protocol: '',
            sourceIp: '',
            userAgent: '',
        },
        requestId: '',
        routeKey: '',
        stage: '',
        time: '',
        timeEpoch: 0,
    },
    isBase64Encoded: false,
    cookies: [],
});

describe('lambda functions', () => {
    let createdAccountId: string;

    it('creates an account successfully', async () => {
        const result = await create(event(validAccount));
        expect(result.statusCode).toBe(201);
        const createdAccount = JSON.parse(result.body);
        createdAccountId = createdAccount.id;
        expect(createdAccount).toEqual(expect.objectContaining(validAccount));
    });

    it('throws error on creating an account with invalid data', async () => {
        const result = await create(event(invalidAccount));
        expect(result.statusCode).toBe(400);
    });

    it('updates an account successfully', async () => {
        const result = await update(event(updatedAccount, { id: createdAccountId }));
        expect(result.statusCode).toBe(200);
        const updatedAccountResult = JSON.parse(result.body);
        expect(updatedAccountResult).toEqual(expect.objectContaining(updatedAccount));
    });

    it('throws error on updating an account with invalid data', async () => {
        const result = await update(event(invalidAccount, { id: createdAccountId }));
        expect(result.statusCode).toBe(400);
    });

    it('throws error on updating a non-existent account', async () => {
        const result = await update(event(updatedAccount, { id: 'non-existent-id' }));
        expect(result.statusCode).toBe(404);
    });

    it('gets an account successfully', async () => {
        const result = await get(event({}, { id: createdAccountId }));
        expect(result.statusCode).toBe(200);
        const fetchedAccount = JSON.parse(result.body);
        expect(fetchedAccount).toEqual(expect.objectContaining(updatedAccount));
    });

    it('throws error on getting a non-existent account', async () => {
        const result = await get(event({}, { id: 'non-existent-id' }));
        expect(result.statusCode).toBe(404);
    });

    it('removes an account successfully', async () => {
        const result = await remove(event({}, { id: createdAccountId }));
        expect(result.statusCode).toBe(200);
    });

    it('throws error on removing a non-existent account', async () => {
        const result = await remove(event({}, { id: 'non-existent-id' }));
        expect(result.statusCode).toBe(404);
    });
});
