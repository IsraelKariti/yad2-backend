import express from 'express';
import { usersRouter } from './src/routers/users.router.js';
import { sellListingsRouter } from './src/routers/sellListings.router.js';
import { pageNotFound } from './src/responses/responses.js';
export const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/sell', sellListingsRouter);
app.use('*', (req, res)=>{
    pageNotFound(res, 'page not found!!');
})

