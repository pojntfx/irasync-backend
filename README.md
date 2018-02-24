# irasync-backend

> An Irasync GraphQL API backend implemented using Apollo Server for Express and MySQL wrapped by Prisma.
> Irasync is still evaluating and testing different stacks! Check out the different branches of this repo to try out the experiments.
> Node >= 9, npm, yarn and docker should be installed using your OS's package manager before continuing.

## Usage

1. Install the dependencies noted above
2. Start the Docker container with ```yarn start:db``` (run as root) **AND** API server with ```yarn start:api``` **AND** deploy the DB migrations using ```yarn deploy:db```
3. Start GraphiQl with ```yarn start:graphiql``` to open up a new browser window (To skip the two steps above, you may also use the shorthand ```yarn start:dev```)
4. Signup with the following mutation:
   ```js
   mutation {
     signup(name: "yourname", email: "test@example.com", password: "yourpassword") {
       token
     }
   }
   ```
5. Login with following mutation:
   ```js
   mutation {
     login(email: "test@example.com", password: "yourpassword") {
       token
     }
   }
   ```
6. Authorize by adding the token from the mutation above to the HTTP Headers (on the bottom of GraphiQl):
   ```js
   {
     "Authorization": "Bearer yourtokenfromthemutationabovehere"
   }
   ```
7. Test if authorization works by querying your private drafts (should return an empty array by default):
   ```js
   query {
     drafts {
       id
     }
   }
   ```
8. Commit other queries, mutations, subscriptions etc. in GraphiQl or startup your local instance of an [Irasync Frontend](https://github.com/irasync/irasync-frontend-web)! The default frontend endpoint is ```http://localhost:4200``` as specified in the ```.env``` file.

> If you want to use this in production, set the correct options (secrets etc.) in the .env file for security.

## Build Setup

```bash
# install dependencies
yarn install

# start your local development docker container (this can take some time) (run as root)
yarn start:db

# apply migrations to the db (this has to be run at least once after installation)
yarn deploy:db

# (this is what you'll use most of the time) (remember to start the docker container first) start the API server, deploy the migrations and open up graphiql
yarn start:dev

# start the API server
yarn start:api

# start GraphiQL for testing
yarn start:graphiql

# start the API server
yarn start:api

# log information on the API server (endpoints etc.) to the console
yarn about:status

# lint the code (refer to the tslint docs if you want to use this in your IDE)
yarn lint

# debug the code
yarn debug

# compile typescript
yarn build

# serve the docs at localhost:8080
yarn docs:serve

# update the docs after changes
yarn docs:update
```

## License

Irasync Backend Reference Implementation
Copyright (C) 2018 Felix Pojtinger

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.