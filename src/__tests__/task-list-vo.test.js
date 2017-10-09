import {buildTaskListForSave} from '../services/task-list-vo';

it('properly maps the task list', ()=> {
	const tasks = [{
		id: 'abc123',
		label: 'T1',
		isNew: true
	}, {
		id: 'abc456',
		label: 'T2'
	}, {
		id: 'abc789',
		label: 'T3'
	}];
	expect(buildTaskListForSave(tasks)).toEqual([{
		id: 'abc123',
		label: 'T1'
	}, {
		id: 'abc456',
		label: 'T2'
	}, {
		id: 'abc789',
		label: 'T3'
	}]);
});