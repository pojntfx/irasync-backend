# Irasync Backend

An Irasync GraphQL API backend implemented using Apollo Server for Express and MySQL wrapped by Prisma.
Irasync is still evaluating and testing different stacks! Check out the different branches of this repo to try out the experiments.
Node >= 9, npm, docker and docker-compose should be installed using your OS's package manager before continuing.

## Demo

> TODO: Add demo

## Usage

```bash
# Install dependencies
npm install
# Build and serve development version
sudo npm run start:db && npm run start:api && npm run deploy:db
# Start GraphiQl
npm run start:graphiql
```

1. Signup with the following mutation:
   ```js
   mutation {
     signup(name: "yourname", email: "test@example.com", password: "yourpassword") {
       token
     }
   }
   ```
2. Login with following mutation:
   ```js
   mutation {
     login(email: "test@example.com", password: "yourpassword") {
       token
     }
   }
   ```
3. Authorize by adding the token from the mutation above to the HTTP Headers (on the bottom of GraphiQl):
   ```js
   {
     "Authorization": "Bearer yourtokenfromthemutationabovehere"
   }
   ```
4. Test if authorization works by querying your private drafts (should return an empty array by default):
   ```js
   query {
     drafts {
       id
     }
   }
   ```
5. Commit other queries, mutations, subscriptions etc. in GraphiQl or startup your local instance of an [Irasync Frontend](https://github.com/irasync/irasync-frontend-web)! The default frontend endpoint is ```http://localhost:3000``` as specified in the ```.env``` file.

> If you want to use this in production, set the correct options (secrets etc.) in the .env file for security.

## Screenshots

> TODO: Add screenshots

## Documentation

> TODO: Add documentation

## Deployment

> TODO: Add deployment

## License

Irasync Backend
Copyright (C) 2018 Felix Pojtinger

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
