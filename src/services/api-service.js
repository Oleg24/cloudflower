import axios from 'axios';

const myName = 'yanchinskiy';
const url = 'http://cfassignment.herokuapp.com/' + myName + '/tasks';



const apiService = {
	fetchTasks(){
		return axios.get(url)
			.then((response)=> {
				console.log('api GET response', response);
				return response.tasks;
			});
	},

	postTasks(tasks){
		return axios.post(url, {tasks: tasks})
			.then((response)=>{
				console.log('api POST response', response);
		});

	}
};

export default apiService;

