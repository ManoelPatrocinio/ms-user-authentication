
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import "dotenv/config"
import 'dotenv-safe/config'
import {UserRoutes} from './routes/routesOrder';
import { errorHandler } from './middlewares/error-handler.middlware';
import { authRoute } from './routes/auth';
import jwtAuthenticationMiddleware from './middlewares/jwt-auth.middleware';
import { basicRoutes } from './routes/basicRouters';

const app = express();
const PORT = process.env.PORT || 3333;


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(basicRoutes)
app.use(authRoute)

// all routes below, have must jwt authentication
app.use(jwtAuthenticationMiddleware)
app.use(UserRoutes);

//app.use(errorHandler)

app.listen(PORT, () => {
  console.log(` Server running at port: ${PORT}`);
});
