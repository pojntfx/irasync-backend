# irasync-backend

> An Irasync GraphQL API backend implemented using Apollo Server for Express and PostgreSQL.
> Irasync is still evaluating and testing different stacks! Check out the different branches of this repo to try out the experiments.
> Node >= 9, npm, yarn and docker should be installed using your OS's package manager before continuing

## Usage

1. Install dependecies noted above
2. Start the Docker container and API server using the commands below
3. Start GraphiQl with ```yarn start:graphiql``` to open up a new browser window

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
6. Authorize by adding the token to the HTTP Header (On the bottom of GraphiQl)
   ```js
   {
     "Authorization": "Bearer yourtokenfromthemutationabovehere"
   }
   ```
7. Test if authorization worked by querying your drafts
   ```js
   query {
     drafts {
       id
     }
   }
   ```
8. Commit other queries, mutations, subscriptions etc. in GraphiQl or startup your local instance of an [Irasync Frontend](https://github.com/irasync/irasync-frontend-web)!

> If you want to use this in production, set the correct options (secrets etc.) in the .env file for security.

## Build Setup

```bash
# install dependencies
yarn install

# start your local development docker container (this can take some time)
yarn start:db

# start the server and open up graphiql (this is what you'll use most of the time)
yarn start:dev

# start the API server
yarn start:api

# start GraphiQL for tooling
yarn start:graphiql

# log information about the API server (Endpoints etc.) to the console
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
Copyright (C) 2018 Felicitas Pojtinger

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