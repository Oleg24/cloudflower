import React, {Component} from 'react';
import '../assets/styles/TaskList.css'
import TaskCard from './TaskCard';
import DraggableList from 'react-draggable-list';

class TaskList extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [{
				label: 'Task 1',
				id: 0
			}, {
				label: 'Task 2',
				id: 1
			}, {
				label: '',
				id: 2
			}]
		};
		this.addNewTask = this.addNewTask.bind(this);
		this.commonProps = {
			handleDeleteTask: this.handleDeleteTask.bind(this),
			handleUpdateTask: this.handleTaskUpdate.bind(this)
		};
		this.handleListChange = this.onListChange.bind(this);
	}


	addNewTask() {
		this.setState({
			tasks: [{label: '', id: this.state.tasks.length}].concat(this.state.tasks)
		});
	}

	handleTaskUpdate(id, updatedTask) {
		this.setState({
			tasks: this.state.tasks.map((task)=> {
				return task.id === id ? Object.assign({}, {id: id}, updatedTask) : task;
			})
		});
	}

	handleDeleteTask(id) {
		this.setState({
			tasks: this.state.tasks.filter((task)=> {
				return task.id !== id;
			})
		});
	}

	onListChange(newTaskList) {
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
							   value="Add Task"
							   onClick={this.addNewTask} />
						<input type="button"
							   value="Save" />
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
