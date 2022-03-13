
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import "dotenv/config"
import 'dotenv-safe/config'
import {routes} from './routes/routesOrder';
import { errorHandler } from './middlewares/error-handler.middlware';
import { authRoute } from './routes/auth';
import jwtAuthenticationMiddleware from './middlewares/jwt-auth.middleware';

const app = express();
const PORT = process.env.PORT_LOCAL_HOST || 3333;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(authRoute)

// all routes below, have must jwt authentication
app.use(jwtAuthenticationMiddleware)
app.use(routes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(` Server running at port: ${PORT}`);
});
