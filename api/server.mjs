import path    from 'path'
import express from 'express'
import dotenv  from 'dotenv'
import 'express-async-errors'
import * as web from './web'



// *Getting the environment variables:
const file_extension = !process.env.NODE_ENV || process.env.NODE_ENV == 'production' ? '' : `.${process.env.NODE_ENV}`;
dotenv.config({ path: path.join(process.cwd(), `./.env.config${file_extension}`) });
dotenv.config({ path: path.join(process.cwd(), `./.env${file_extension}`) });



let server = null;



export async function stop(){
	// server.stop
}



export async function start(){

	const app = express();

	app.use('/', await web.setup());

	const port = process.env.PORT || 1234;

	server = app.listen(port, () => {
		console.log(`Server started @ http://localhost:${port}/`);
	});

	return server;

}


