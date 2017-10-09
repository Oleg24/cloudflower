import React, {Component} from 'react';
import {trash} from 'font-awesome/css/font-awesome.css';
import '../assets/styles/TaskCard.css';


class Task extends Component {
	constructor(props) {
		super(props);
		this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
	}

	componentDidMount() {
		const isNew = this.props.item.isNew;
		if (isNew) {
			this.labelInput.focus();
		}
	}

	handleTaskUpdate(e) {
		const taskLabel = e.target.value,
			{id} = this.props.item,
			{handleUpdateTask} = this.props.commonProps;

		handleUpdateTask(id, {label: taskLabel});
	}

	handleTaskDelete() {
		const {id} = this.props.item,
			{handleDeleteTask} = this.props.commonProps;

		handleDeleteTask(id);
	}

	render() {
		const {item, dragHandle} = this.props;

		return (
			<div className="task-card">
				{dragHandle(<div className="drag-handle" />)}
				<div className="task-header">
					<input className="task-label"
						   ref={(input) => { this.labelInput = input; }}
						   placeholder="Task"
						   onChange={this.handleTaskUpdate}
						   value={item.label} />
					<span className="icon" onClick={this.handleTaskDelete}>
						<i className="fa fa-trash" />
					</span>
				</div>
				<div className="task-body">
				</div>
			</div>
		)
	}
}


export default Task;