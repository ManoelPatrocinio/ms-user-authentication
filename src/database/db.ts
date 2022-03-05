import {Pool} from "pg"
import 'dotenv/config'

const connectionString = process.env.BD_URL_CONNECTION
const db = new Pool({connectionString})

export {db}