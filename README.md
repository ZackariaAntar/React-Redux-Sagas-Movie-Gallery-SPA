# ReactJS Movie Gallery SPA with MUI

## Description

A very simple ReactJS [Single Page Application](https://www.bloomreach.com/en/blog/2018/what-is-a-single-page-application) that displays a gallery of movies and allows a user to click on a movie's poster to learn more about it.

### Prerequisites
* [NODE.js](https://nodejs.org/en)
* [Postgres](https://www.postgresql.org/)
    * a [Postgres Client](https://wiki.postgresql.org/wiki/PostgreSQL_Clients) like [Postico](https://eggerapps.at/postico/v1.php) _(optional but helpful for continuity)_.
* [Nodemon](https://www.npmjs.com/package/nodemon)

## Installation
1. Create a database named `saga_movies_weekend`
    * Use the 3 `CREATE TABLE` queries _(lines: 4-9 | 12-15 | 21-25)_ and the 3 `INSERT INTO` queries _(lines 30-45 | 48-62 | 66-81)_ from the database.sql file from this project. The project is built using [PostgresSQL](https://www.postgresql.org/download/), so make sure to have that installed and running. I used [Postico](https://eggerapps.at/postico/v1.php) to populate the database with the inital queries mentioned above.
2. From your terminal run `npm install` in this project's root directory.
    - **2a.** Ensure you have at least **two** terminal tabs open.
        - In one tab, run `npm run server` to start your server.
        - In the other, run `npm run client` to start the client for this project.
        - If a browser window is not automatically opened after `npm run client`, you can access this project from your browser at **http://localhost:3000**
### Usage
1. Open a web browser and enter **http://localhost:3000** in the address bar.
2. Browse through the gallery of available movies.
3. Click on a movie's poster to see more details for that movie.
4. Click the `BACK` button to return to the gallery.


## Acknowledgement
* Huge thanks to [Liz Kerber](https://github.com/emkerber) for sharing their knowledge and preparing me to make this application a reality, and to the community of staff, partners, students, alumni, and mentors from [Prime Digital Academy](www.primeacademy.io) who have made my learning experience possible.

* To my fellow [Diamond Cohort](https://github.com/orgs/PrimeAcademy/teams/diamond) members for their support, camaraderie, and daily commitment to growth.
    * Special thanks to [Steven Petersen](https://github.com/pete5315) for helping me troubleshoot sync/async process resolution when navigating to the details page from the main page.