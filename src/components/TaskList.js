import React, {Component} from 'react';
import DraggableList from 'react-draggable-list';
import '../assets/styles/TaskList.css'
import TaskCard from './TaskCard';
import ListAlert  from './ListErrorComponent';
import Alert from './AlertComponent';
import apiService from '../services/api-service';
import alertConstants from '../constants/alert-constants';
import {generateRandomId} from '../services/helper-service';
import {buildTaskListForSave} from '../services/task-list-vo';


class TaskList extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [],
			showAlert: false,
			disableSaveButton: true,
			alertOptions: {}
		};

		this.addNewTask = this._addNewTask.bind(this);
		this.saveTaskList = this._saveTaskList.bind(this);
		this.commonTaskProps = {
			handleDeleteTask: this._handleDeleteTask.bind(this),
			handleUpdateTask: this._handleTaskUpdate.bind(this)
		};
		this.handleListChange = this._onListChange.bind(this);
	}

	timeouts = [];

	componentDidMount() {
		this._fetchTasks();
	}

	componentWillUnmount() {
		this.timeouts.forEach((timeout)=> {
			clearTimeout(timeout);
		});
	}

	_fetchTasks() {
		apiService.fetchTasks()
			.then((tasks)=> {
				this.setState({
					tasks: tasks
				})
			})
			.catch(()=> {
				this.setState({
					tasks: []
				});
				this._fetchTasks();
			});
	}
	
	_saveTaskList() {
		const {tasks} = this.state;
		this._disableSaveButton(true);
		apiService.saveTasks(buildTaskListForSave(tasks))
			.then(()=> {
				this._handleAlert(alertConstants.success);
			})
			.catch(()=> {
				this._handleAlert(alertConstants.error);
				this.timeouts.push(setTimeout(()=> {
					this._disableSaveButton(false);
				}, 5000));
			});
	}

	_addNewTask() {
		const newTask = {label: '', id: generateRandomId(), isNew: true};
		this.setState({
			tasks: [newTask].concat(this.state.tasks)
		});
		this._disableSaveButton(false);
	}

	_handleTaskUpdate(id, updatedTask) {
		this.setState({
			tasks: this.state.tasks.map((task)=> {
				return task.id === id ? Object.assign({}, {id: id}, updatedTask) : task;
			})
		});
		this._disableSaveButton(false);
	}

	_handleDeleteTask(id) {
		this.setState({
			tasks: this.state.tasks.filter((task)=> {
				return task.id !== id;
			})
		});
		this._disableSaveButton(false);
	}

	_onListChange(newTaskList) {
		this.setState({tasks: newTaskList});
		this._disableSaveButton(false);
	}

	_handleAlert(alertOptions) {
		this.setState({
			alertOptions: alertOptions,
			showAlert: true
		});
		this.timeouts.push(setTimeout(()=> {
			this.setState({
				showAlert: false
			});
		}, 5000));
	}

	_disableSaveButton(newButtonState) {
		this.setState({
			disableSaveButton: newButtonState
		});
	}

	render() {
		const {tasks, showAlert, alertOptions, disableSaveButton} = this.state;
		return (
			<div className="task-list">
				{showAlert ?
					<Alert alertOptions={alertOptions} /> : null }
				<div className="task-list__header">
					<div className="task-list__title">Tasks</div>
					<div className="task-list__button-group">
						<input type="button"
							   className="button margin-right-small"
							   value="Add Task"
							   onClick={this.addNewTask} />
						<input type="button"
							   disabled={disableSaveButton}
							   className="button button-save"
							   value="Save"
							   onClick={this.saveTaskList} />
					</div>
				</div>
				<div id="task-list-container" className="task-list__container">
					{this.state.tasks.length ?
						<DraggableList
							itemKey={"id"}
							template={TaskCard}
							list={tasks}
							padding={20}
							onMoveEnd={newList => this.handleListChange(newList)}
							commonProps={this.commonTaskProps}
							container={()=> document.body}
						/> : <ListAlert /> }

				</div>
			</div>
		)
	}
}

export default TaskList;
