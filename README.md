# irasync-backend

> An Irasync GraphQL API backend implemented using Apollo Server for Express and PostgreSQL.
> Irasync is still evaluating and testing different stacks! Check out the different branches of this repo to try out the experiments.
> Node >= 9, yarn and docker should be installed using your OS's package manager before continuing

## Build Setup

``` bash
# install dependencies with npm:
npm install

# set the database credentials in src/index.ts
# read the "psql" manpage for more info
const irasyncBackend = new IrasyncBackend({
  dbName: "yourdbname",
  dbPassword: "yourdbuserpassword",
  dbUserName: "yourdbusername",
});

# serve the API server at localhost:3000 with hot reloading (use /graphiql for testing)
npm start

# serve the docs at localhost:8080
npm run docs:serve

# update the docs
npm run docs:update

# lint the code (refer to the tslint docs if you want to use this in your IDE)
npm run lint
```

## Build Setup (After migration to prisma)

```bash
# install dependencies
yarn install

# start your local development docker container
yarn start:db

# start the API server
yarn start:api

# log information about the API server to console
yarn info

# serve the docs at localhost:8080
yarn docs:serve

# update the docs after changes
yarn docs:update

# lint the code (refer to the tslint docs if you want to use this in your IDE)
yarn lint
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