import axios from 'axios';

const myName = 'yanchinskiy';
const url = 'http://cfassignment.herokuapp.com/' + myName + '/tasks';



const apiService = {
	fetchTasks(){
		return axios.get(url)
			.then((response)=> {
				return response.data.tasks.map((task, idx)=> {
					task.id = task.label + idx;
					return task;
				});
			});
	},

	saveTasks(tasks){
		return axios.post(url, {tasks: tasks})
			.then((response)=> {
				console.log('api POST response', response);
			});
	}
};

export default apiService;

