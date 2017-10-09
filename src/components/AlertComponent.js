import React, {Component} from 'react'
import AlertContainer from 'react-alert'

export default class App extends Component {

	componentDidMount() {
		this.showAlert();
	}

	alertOptions = {
		offset: 14,
		position: 'top right',
		theme: 'light',
		time: 4000,
		transition: 'scale'
	};

	showAlert = () => {
		const {message, type} = this.props.alertOptions;
		this.msg.show(message, {
			time: 2000,
			type: type
		})
	};

	render() {
		return (
			<div>
				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
			</div>
		)
	}
}