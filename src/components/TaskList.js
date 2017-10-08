import React, {Component} from 'react';
import DraggableList from 'react-draggable-list';
import '../assets/styles/TaskList.css'
import TaskCard from './TaskCard';
import apiService from '../services/api-service';
import {generateRandomId} from '../services/helper-service';

class TaskList extends Component {
	constructor() {
		super();
		this.state = {
			tasks: []
		};
		this.addNewTask = this._addNewTask.bind(this);
		this.saveTaskList = this._saveTaskList.bind(this);
		this.commonProps = {
			handleDeleteTask: this._handleDeleteTask.bind(this),
			handleUpdateTask: this._handleTaskUpdate.bind(this)
		};
		this.handleListChange = this._onListChange.bind(this);
	}

	componentDidMount() {
		apiService.fetchTasks()
			.then((tasks)=> {
				console.log('tasks from api', tasks);
				this.setState({
					tasks: tasks
				})
			})
			.catch(()=> {
				console.log('error from api');
				this.setState({
					tasks: []
				})
			});
	}


	_addNewTask() {
		this.setState({
			tasks: [{label: 'Task', id: generateRandomId()}].concat(this.state.tasks)
		});
	}

	_saveTaskList() {
		const {tasks} = this.state;
		apiService.saveTasks(tasks)
			.then((tasks)=> {
				console.log('successfully updated tasks');
			})
			.catch(()=> {
				console.log('an error occured updating tasks');
			});
	}

	_handleTaskUpdate(id, updatedTask) {
		this.setState({
			tasks: this.state.tasks.map((task)=> {
				return task.id === id ? Object.assign({}, {id: id}, updatedTask) : task;
			})
		});
	}

	_handleDeleteTask(id) {
		this.setState({
			tasks: this.state.tasks.filter((task)=> {
				return task.id !== id;
			})
		});
	}

	_onListChange(newTaskList) {
		this.setState({tasks: newTaskList});
	}

	render() {
		const {tasks} = this.state;
		const {useContainer} = this.state;
		return (
			<div className="task-list">
				<div className="task-list__header">
					<div className="task-list__title">Tasks</div>
					<div className="task-list__button-group">
						<input type="button"
							   className="button margin-right-small"
							   value="Add Task"
							   onClick={this.addNewTask} />
						<input type="button"
							   className="button button-save"
							   value="Save"
							   onClick={this.saveTaskList} />
					</div>
				</div>
				<div id="task-list-container" className="task-list__container">
					<DraggableList
						itemKey={"id"}
						template={TaskCard}
						list={tasks}
						onMoveEnd={newList => this.handleListChange(newList)}
						onTaskDelete={this.handleDeleteTask}
						onTaskUpdate={this.handleTaskUpdate}
						commonProps={this.commonProps}
						container={()=> useContainer ? this.container : document.body}
					/>
				</div>
			</div>
		)
	}
}

export default TaskList;
