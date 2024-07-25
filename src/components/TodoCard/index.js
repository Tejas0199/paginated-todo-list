import Button from '../Button';
import './styles.css';

const TodoCard = ({
	title = '',
	id,
	isSelected,
	onSelect,
	onEdit
}) => {
	return <div className="todo-card">
		<div><input type="checkbox" onChange={onSelect} checked={isSelected} />
		<p>{title}</p></div>
		<Button onClick={onEdit} text='Edit'/>
	</div>
}


export default TodoCard;