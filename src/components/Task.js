import React, {Component} from 'react';
import '../assets/styles/Task.css';


class Task extends Component {
	constructor(props) {
		super(props);
		this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
	}

	handleTaskUpdate(e) {
		const taskLabel = e.target.value,
			key = this.props.id;

		this.props.onChange(key, {label: taskLabel});
	}

	handleTaskDelete() {
		const key = this.props.id;
		this.props.onDelete(key);
	}

	render() {
		return (
			<div className="task">
				<div className="task-header">
					<input className="task-label"
						   onChange={this.handleTaskUpdate}
						   value={this.props.label} />
					<div onClick={this.handleTaskDelete}>Delete</div>
				</div>
				<div className="task-body">
				</div>
			</div>
		)
	}
}


export default Task;