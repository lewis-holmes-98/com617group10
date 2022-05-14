# com617group10
In this project, the team is tasked with creating an application for a high-end travel agent specialising in winter sports. The target audience is the 35-60 age bracket. The application aims to increase inbound website traffic by building a Progressive Web Application, allowing users to see historical snowfall and receive alerts for new snowfall for a selected resort.

## Setup
1. `npm install`
2. If database is not yet seeded: `npm run seed` (use `npm run seedProduction` for production database).
3. Remove leading empty space from hashed passwords in database. This ensures that only the database owner can access the SuperAdmin account after seeding.
4. `npm run dev`

## Seeding the database
Database is seeded with `seeder.js` using data from the [data](/data) folder.


