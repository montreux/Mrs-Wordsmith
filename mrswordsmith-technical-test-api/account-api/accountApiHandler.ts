import { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const AccountSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
});

type Account = z.infer<typeof AccountSchema>;

const AccountParamsSchema = z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
});

// type AccountParams = z.infer<typeof AccountParamsSchema>;

const accounts: Map<string, Account> = new Map();

export async function create(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    const result = AccountParamsSchema.safeParse(JSON.parse(event.body || ''));

    if (!result.success) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: result.error.formErrors }),
        };
    }

    const account: Account = {
        id: uuidv4(),
        ...result.data,
    };

    accounts.set(account.id, account);

    return {
        statusCode: 201,
        body: JSON.stringify(account),
    };
}

export async function update(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    const id = event.pathParameters?.id || '';
    const result = AccountParamsSchema.safeParse(JSON.parse(event.body || ''));

    if (!result.success) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: result.error.formErrors }),
        };
    }

    if (!accounts.has(id)) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Account not found' }),
        };
    }

    const account = accounts.get(id) as Account;
    const updatedAccount = {
        ...account,
        ...result.data,
    };

    accounts.set(updatedAccount.id, updatedAccount);

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAccount),
    };
}

export async function remove(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    const id = event.pathParameters?.id || '';

    if (!accounts.has(id)) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Account not found' }),
        };
    }

    accounts.delete(id);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Account deleted' }),
    };
}

export async function get(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    const id = event.pathParameters?.id || '';

    if (!accounts.has(id)) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Account not found' }),
        };
    }

    const account = accounts.get(id);

    return {
        statusCode: 200,
        body: JSON.stringify(account),
    };
}
