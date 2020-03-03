# Social Network

## About
This project - single page aplication and was generated with my custom framework @socialNetwork on Vanila js(seem like Angular).

## Docker Compose Postgres SQL
In terminal : 
`cd ../postgre-docker`
Set settings for connection to Postgres (POSTGRES_USER, POSTGRES_PASSWORD ets)
`docker-compose -f docker-compose.yml up`
Set settings into `.env`

## Start
1. Install packages: `npm i `

2. Run aplication `npm run dev`
   
3. Build aplication `npm build`

4. Migrations data `npm run db:migrate`
5. UNDO migrations `npm run db:migrate:undo:all`

6. Seeders `npm run db:seed:all`
7. UNDO seeders `npm run db:seed:undo:all`

## The application include a <b>BASIC</b>  user authentication 

## Routes

### public: 
1. post `http://localhost:300/login`

### private:
1. get      `http://localhost:300/api/users`
2. get      `http://localhost:300/api/friends/:user_id`
3. put      `http://localhost:300/api/friend`
4. delete   `http://localhost:300/api/friends/:user_id/:friend_id`
5. get      `http://localhost:300/api/requests/pending/:user_id`
6. get      `http://localhost:300/api/requests/incoming/:user_id`
7. put      `http://localhost:300/api/request`
8. put      `http://localhost:300/api/request/approve`
9. put      `http://localhost:300/api/request/skip`

