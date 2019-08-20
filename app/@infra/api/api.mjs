import axios from 'axios'



export default class API{

	/**
	 *
	 * @returns {AxiosInstance}
	 */
	static create(){
		return axios.create({
			baseURL: '/api/v1'
		});
	}


	/**
	 *
	 * @returns {AxiosInstance}
	 */
	static createAuth(){
		return axios.create({
			baseURL: '/api/v1'
		});
	}

}