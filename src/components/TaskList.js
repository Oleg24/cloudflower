import React, {Component} from 'react';
import '../assets/styles/TaskList.css'
import Task from './Task';

class TaskList extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [{
				label: 'Task 1'
			}, {
				label: 'Task 2'
			}, {
				label: ''
			}]
		};
		this.addNewTask = this.addNewTask.bind(this);
		this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}

	addNewTask() {
		this.setState({
			tasks: [{label: ''}].concat(this.state.tasks)
		});
	}

	handleTaskUpdate(key, updatedTask) {
		this.setState({
			tasks: this.state.tasks.map((task, idx)=> {
				return idx === key ? Object.assign({}, updatedTask) : task;
			})
		});
	}

	handleDeleteTask(key) {
		this.setState({
			tasks: this.state.tasks.filter((task, idx)=> {
				return idx !== key;
			})
		});
	}

	render() {
		
		return (
			<div className="task-list">
				<div className="task-list__header">
					<div className="task-list__title">Tasks</div>
					<div className="task-list__button-group">
						<input type="button"
							   value="Add Task"
							   onClick={this.addNewTask} />
						<input type="button"
							   value="Save" />
					</div>
				</div>
				<div className=" task-list__container">
					{this.state.tasks.map((task, idx)=> {
						return (<Task key={idx} id={idx}
									  label={task.label}
									  onChange={this.handleTaskUpdate}
									  onDelete={this.handleDeleteTask} />)
					})}
				</div>
			</div>
		)
	}
}

export default TaskList;