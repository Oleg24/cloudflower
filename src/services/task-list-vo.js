export function buildTaskListForSave(taskList){
	return taskList.map((task)=>{
		return Object.assign({}, {label: task.label, id: task.id})
	});
}