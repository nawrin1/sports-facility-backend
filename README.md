```
Project Name:Sports Facility Booking Platform
```

# Project Summary:

This Sports Facility Booking platform project is built with Node JS, Express.js, Mongoose, Typescript. A user can signup and login using email and password. Admin can create facilities according to his choices. Moreover, admin also has the access to delete a facility, or update a facility. User can book those facilities. Besides user can view his booking list and can delete a booking also. Admin can view all the booking list. All the facilities can be retrieved by any user. Another additional feature is anyone can check the availibile slots of any facility of a partivular date if they want. If they dont use any desired date then a present default date will be considered. This project is basically focused on the backend side.


** First of all clone the git repository of the project. Then use npm install to install necessary packages. If not all dependencies are installed you need to install these
```
        "bcrypt": "^5.1.1",
        "cors": "^2.8.5",
        "date-fns": "^3.6.0",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "http-status": "^1.7.4",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.4.1",
        "zod": "^3.23.8"
```
** For installing eslint and prettier for the project use the following command:
```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

```
```
npm install --save-dev prettier

```
```
npm install --save-dev eslint-config-prettier

```



** You may need to install all the devDependencies.Your dependencies need to look like this.
```
    "@eslint/js": "^9.3.0",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.12.12",
    "@typescript-eslint/eslint-plugin": "^7.10.0",
    "@typescript-eslint/parser": "^7.10.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "globals": "^15.3.0",
    "prettier": "^3.2.5",
    "typescript": "^5.4.5",
    "typescript-eslint": "^7.10.0"
```
** You have to create a .env file and attach the port and your mongodb uri  to connect with database,saltrounds for hashing password,declaring the environment,secret and expiration time of secret .
** To compile you may use the command
```
npm run build
```
** To start server you need to use
```
npm run start:dev
```
** You may use these command using npm run 'your desired command' to get your desired functionality.These are all available in package.json file
```
 "start:prod": "node ./dist/server.js",
    "start:dev": " ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
```

