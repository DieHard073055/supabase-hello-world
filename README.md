
# Supabase Hello World

This project serves as a simple 'Hello World' example to illustrate how to connect to a Supabase database, perform an upsert operation to insert default data, and execute a select operation to retrieve all the data.

## Usage Instructions

### Installation

Install `supabase` using npm. 
This is available via [NPM](https://www.npmjs.com) as dev dependency.

```bash
npm i supabase --save-dev
```

Alternatively, if you're using macOS, supabase is available via Homebrew.
```bash
brew install supabase/tap/supabase```

### To run:

```bash
npx supabase -h
```
### To upgrade:

```bash
brew upgrade supabase
```
### Starting Supabase
Start supabase using the following command:
```bash
supabase start
```
This command will start the Docker containers for the supabase stack. Once you are done pulling the containers and have seen the container IP addresses, you can proceed to the next step.

Access the Supabase studio via the URL shown on the screen when you start the container.

Make sure you record down the SUPABASE_URL and SUPABASE_ANON_KEY into your .env file. These will be used by the application to connect to the Supabase client.


## Code Explanation
### Importing modules
The `connection.js` file contains the main logic of the application. Here's a breakdown of its content:

First, we import the necessary modules and initialize a new Supabase client with the environment variables for the Supabase URL and ANON Key.

```javascript
const { createClient } = require('@supabase/supabase-js')

require('dotenv').config()
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const table_name = "countries"
```
### Inserting
The `insert_default_data` function is responsible for inserting default data to our table using the 'upsert' method. In case of any errors during this operation, it logs the error to the console. On successful operation, it logs the inserted data.

```javascript
const insert_default_data = async () => {
  const { data, error } = await supabase
    .from(table_name)
    .upsert(
      [
        { name: "UK" },
        { name: "US" },
        { name: "Africa" },
        { name: "Mexico" },
        { name: "Hungaria" },
        { name: "Zimbabwe" },
        { name: "Norway" },
      ])
  if (error) {
    console.error(error)
  }
  if (data) {
    console.log(data)
  }
}
```

### Selecting
The `select_all_data` function retrieves all the records from the 'countries' table and logs them to the console. Errors, if any, are also logged to the console.

```javascript
const select_all_data = async () => {
  let { data, error } = await supabase
    .from('countries')
    .select('name')

  if (error) {
    console.error(error)
  }
  if (data) {
    console.log(data)
  }
}
```
### Start using your application
Finally, we call the `select_all_data` function inside the main function to start the application.

```javascript
const main = async () => {
  await select_all_data()
}

main().then(console.log).catch(console.error)
```

logs from the code above
```
[
  { name: 'UK' },
  { name: 'US' },
  { name: 'Africa' },
  { name: 'Mexico' },
  { name: 'Hungaria' },
  { name: 'Zimbabwe' },
  { name: 'Norway' }
]
```
Project Structure
Here's the directory structure of the project:

```
.
├── LICENSE
├── README.md
├── connection.js
├── package-lock.json
├── package.json
└── supabase
    ├── config.toml
    ├── functions
    ├── migrations
    └── seed.sql
```
## License
This project is licensed under the terms of the MIT license. For more information, see the LICENSE file.

## Contributions
Contributions are welcome! Feel free to open a pull request.

## Questions
If you have any questions or run into any issues, please open an issue in this repository.


