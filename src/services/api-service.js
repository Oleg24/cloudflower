import axios from 'axios';

const myName = 'yanchinskiy';
const url = 'http://cfassignment.herokuapp.com/' + myName + '/tasks';



const apiService = {
	fetchTasks(){
		return axios.get(url)
			.then((response)=> {
				return response.data.tasks;
			});
	},

	saveTasks(tasks){
		return axios.post(url, {tasks: tasks});
	}
};

export default apiService;

