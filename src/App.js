import React, {Component} from 'react';
import './assets/styles/App.css';
import TaskList from './components/TaskList';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
				</header>
				<TaskList />
			</div>
		);
	}
}

export default App;
