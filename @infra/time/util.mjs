export function asyncTimeout(ms){
	return new Promise((resolve) => {
		const timer_id = setTimeout(() => resolve(timer_id), ms);
	});
}


export function clearTimeout(timer_id){
	clearTimeout(timer_id);
}


export function asyncInterval(ms){
	return new Promise((resolve) => {
		const timer_id = setInterval(() => resolve(timer_id), ms);
	});
}


export function clearInterval(timer_id){
	clearInterval(timer_id);
}