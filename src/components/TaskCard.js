import React, {Component} from 'react';
import '../assets/styles/Task.css';


class Task extends Component {
	constructor(props) {
		super(props);
		this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
		this.state = {
			value: 0
		}
	}

	_inc() {
		this.setState({
			value: this.state.value + 1
		});
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
		const {item, itemSelected, dragHandle} = this.props;
		const scale = itemSelected * 0.05 + 1;
		const shadow = itemSelected * 15 + 1;

		return (
			<div className="task"
				 style={{
         			transform: `scale(${scale})`,
          			boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
        		}}
			>
				{dragHandle(<div className="dragHandle" />)}
				<div className="task-header">
					<input className="task-label"
						   onChange={this.handleTaskUpdate}
						   value={item.label} />
					<div onClick={this.handleTaskDelete}>Delete</div>
				</div>
				<div className="task-body">
				</div>
			</div>
		)
	}
}


export default Task;