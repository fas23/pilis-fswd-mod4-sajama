# API NodeJs Express Typescript TypeOrm Mysql

Proyecto Final Taller FSWD Reserva de Tickets , ...

## Manual Instalación

```bash
npm init
```

Instalación de dependecias:

```bash
npm install express         npm i @types/morgan @types/cors -D
npm i typescript -D         npm install typeorm --save
npx tsc --init              npm install reflect-metadata --save
npm i ts-node-dev -D        npm install @types/node --save-dev
npm i morgan cors           npm install mysql --save
npm i @types/express
```

## Comandos

Ejecución en desarrollo:

```bash
npm run dev
```

## Estructura del proyecto

```
src\
 |--controllers\    # Controllers
 |--middlewares\    # Custom express middlewares
 |--entity\         # models
 |--routes\         # Routes
 |--index.ts        # App entry point
```

### API Endpoints

**User**:\
`POST api/user` - Create a user\
`GET api/users` - Get all users\
`GET api/user/:id` - Get user\
`PUT api/user/:id` - Update user\
`DELETE api/user/:id` - Delete user

**Event**:\
`POST api/event` - Create a event\
`GET api/events` - Get all event\
`GET api/event/:id` - Get event\
`PUT api/event/:id` - Update event\
`DELETE api/event/:id` - Delete event

**Booking**:\
`POST api/booking` - Create a booking\
`GET api/bookings` - Get all booking\
`GET api/booking/:id` - Get booking\
`DELETE api/booking/:id` - Delete booking
