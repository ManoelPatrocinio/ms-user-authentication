
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import {routes} from './routes/routesOrder';

const app = express();
const PORT = process.env.PORT_LOCAL_HOST;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes);

app.listen(PORT, () => {
  console.log(` Server running at port: ${PORT}`);
});
