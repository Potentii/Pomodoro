import express from 'express';
import path    from 'path';



export function setup(){
	const router = express.Router();


	const app_folder = process.env.APP_DIR;

	router.use('/',  express.static(path.join(process.cwd(), app_folder)));
	router.use('/*', express.static(path.join(process.cwd(), app_folder, '/index.html')));

	console.log(path.join(process.cwd(), app_folder));
	console.log(path.join(process.cwd(), app_folder, '/index.html'));


	return router;
}