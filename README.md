# COM617 group 10
In this project, the team is tasked with creating an application for a high-end travel agent specialising in winter sports. The target audience is the 35-60 age bracket. The application aims to increase inbound website traffic by building a Progressive Web Application, allowing users to see historical snowfall and receive alerts for new snowfall for a selected resort.

Access the [Snowcore App](https://snowcore.herokuapp.com/).

## Running the app locally
1. `npm install`
2. `npm run seed` if the database has not been seeded already.
3. Remove leading empty space from hashed passwords in database. This ensures that only the database owner can access the SuperAdmin account after seeding.
4. Rename [.env.example](.env.example) to `.env`. 
5. Provide `.env` with an OpenWeatherMap API key, details for an Email account, and a valid MongoDB URI to run the application locally.
5. `npm run dev`

### Seeding the database
Database is seeded with `seeder.js` using data from the [data](/data) folder.


