<h1 align="center">Bank API</h1>

**Bank API** supports those who use [Casso API](https://casso.vn/) in order to interact with bank account in faster and easier way.

## Table of Contents

1. [Requirement](#⚙️-requirement)
2. [Installation](#💾-installation)
3. [Getting started](#🔨-quick-start)
4. [Documentation](#📖-documentation)
5. [Contacts](#💁‍♂️-contacts)
6. [Issue](#support-by-creating-issue)

## ⚙️ Requirement
This api may target commonJs/ES app. You have to create an account on [Casso](https://casso.vn/) and link your bank account to its application.

- **Require** [NodeJs](https://nodejs.org/en/download) above v18
- **Require** [Casso](https://casso.vn/) Api Key

## 💾 Installation
### Using npm
```terminal
    npm install @iampierrot/bankapi
```

## 🔨 Quick Start

### CommonJs

```js
const { BankApi } = require('@iampierrot/bankapi');

async function main() {

    /**
     * @property Api Key may a "Apikey 'token' " or just 'token'.
     */
    const bankClient = new BankApi("Your api key here");

    const transaction = bankClient.getTransaction();

    console.log(transaction);
}
```

### ES Mode

```js
import { BankApi } from "@iampierrot/bankapi";

async function main() {
     /**
     * @property Api Key may a "Apikey 'token' " or just 'token'.
     */
    const bankClient = new BankApi("Your api key here");

    const transaction = bankClient.getTransaction();

    console.log(transaction);
}
```
> [!NOTE]
> Module and ES have the same syntax.

## 📖 Documentation
> Read source code please I am very lazy to write documentation

Docs will be updated in near future.

## 💁‍♂️ Contacts
If you have any questions about package or something else, feel free to <a href="mailto:phatnguyentan836@gmail.com">contact me through email</a>.

## Contributing

Bank API is developed in the open on Github, and I am welcome to the community for contributing bugfixes and innovations in near future.

Read below to know how you can participate in improving Bank API.

### Support by creating issue
You can create an [issue](https://github.com/IamPierrot/bank-api/issues) on this respositories for bugfixes and improvements as well.

### License
This package using **[MIT LICENSE](./LICENSE)**

> Thank you for using my package.

> Peace and love <3