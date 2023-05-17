import './TodoItem.scss'
import { BsFillTrashFill } from 'react-icons/bs'
import TrashButton from '../TrashButton/TrashButton'
import CheckBox from '../CheckBox/CheckBox'
import clsx from 'clsx'
import { useState } from 'react'
const TodoItem = ({ data, del, className }) => {
	const [complete, setComplete] = useState(data.complete)
	function toggleTodo() {
		if (complete) {
			setComplete(false)
			fetch(`/unset/${data._id}`).then(response => {
				if (!response.ok) {
					setComplete(true)
				}
			})
		} else {
			setComplete(true)
			fetch(`/complete/${data._id}`).then(response => {
				if (!response.ok) {
					setComplete(false)
				}
			})
		}
	}
	return (
		<li className={clsx('todo-item', className)}>
			<CheckBox
				onClick={toggleTodo}
				state={complete}
				className={'todo-item__checkbox'}
			/>
			<p
				className={clsx('todo-item__text', {
					['todo-item__text_active']: complete
				})}
			>
				{data.name}
			</p>
			<div className={'todo-item__buttons'}>
				<TrashButton
					onClick={() => {
						del(data._id)
					}}
				>
					<BsFillTrashFill />
				</TrashButton>
			</div>
		</li>
	)
}
export default TodoItem
