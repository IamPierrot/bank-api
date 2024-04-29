<h1 align="center">Bank API</h1>


## ⚙️ Requirement
This api may target commonJs/ES app. You have to create an account on [Casso](https://casso.vn/) and link your bank account to its application.

- **Require** [NodeJs](https://nodejs.org/en/download) above v18
- **Require** [Casso](https://casso.vn/) Api Key

## 💾 Installation
### Using npm
```terminal
    npm install @iampierrot/bankapi
```


## 🔨 How to use Package

### Commonjs

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

## 💁‍♂️ Contacts
If you have any questions about package or something else, feel free to <a href="mailto:phatnguyentan836@gmail.com">contact me through email</a>.

You can create an [issue](https://github.com/IamPierrot/bank-api/issues) on this respositories.
