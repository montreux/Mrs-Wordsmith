# Mrs Wordsmith Technical Test

## 1. Memoizer

> Write a memoization function, which takes one function as a parameter and returns a memoized version of it. The type signature of the memoized function should match that of the input function. The memoized function should be able to cache its return values internally and return the cached values in case it has been called with parameters previously used saving processing time.

Located:

- `techTest/src/memoizer.ts`
- `techTest/src/memoizer.test.ts`

## 2. Number Conversion

> Write a function which can convert arabic numbers to roman numerals. The function should take one argument of a positive whole number (N, N >= 1) and return a roman numeral string.

Located:

- `techTest/src/romanConverter.ts`
- `techTest/src/romanConverter.test.ts`

## 3. Simple account management API

> Write a simple REST API project for account management. The data storage does not matter, you can stub out the data persistence layer within memory storage if this is easier. You are free to use any frameworks you’d like. You do not need to consider authentication or encryption (either in transit or at rest). The API should allow users to create new accounts, update existing ones, delete accounts and get account information for an account entity. What data you store for an account is up to you. We recommend the usual like name, address, phone, email, etc....

Located:

- `mrswordsmith-technical-test-api/account-api/accountApiHandler.ts`

Deployed using AWS SAM.

To build and test locally:

1. `cd mrswordsmith-technical-test-api`
2. `sam build`
3. `sam local invoke AccountCreateFunction --event events/create_account.json`
