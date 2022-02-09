import { useState, useRef, useEffect } from 'react';
import './App.css';
import { v4 as uuidV4 } from 'uuid';

function App() {
	const [item, setItem] = useState('');
	const [list, setList] = useState([]);
	const toDo = useRef(null);

	function changeToDo(e) {
		if (e.target.value.length <= 127) {
			e.preventDefault();
			setItem(e.target.value);
		}
	}

	function addToList(e) {
		if (e.target.value !== '') {
			if (list.length < 10) {
				e.preventDefault();
				setList([
					...list, {
						id: uuidV4(),
						task: item
					}
				]);
			} else {
				window.alert('You can only add 10 tasks at a time');
			}
			setItem('');
		}
	}

	function removeFromList(e, target) {
		e.preventDefault();
		let new_list = list.filter(item => {
			return item.id !== target;
		});
		setList(new_list);
	}

	useEffect(() => {
		if (toDo) {
			toDo.current.focus();
		}

		return () => {
			return false;
		}
	}, []);

	return (
		<div className="App">
			<div className="App-title">
				To-Do List
			</div>
			<div className='input-box'>
				<input
					name='input'
					type={'text'}
					className='input'
					value={item}
					onChange={(e) => changeToDo(e)}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							addToList(e);
						}
					}}
					ref={toDo}
				/>
				<button
					onClick={(e) => addToList(e)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-plus-circle-fill"
						viewBox="0 0 16 16"
					>
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
					</svg>
				</button>
			</div>
			<ul className='list'>
				{
					list.map((item) => {
						return (
							<li
								key={item.id}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-trash-fill"
									viewBox="0 0 16 16"
									onClick={(e) => removeFromList(e, item.id)}
								>
									<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
								</svg>
								<p>{item.task}</p>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}

export default App;
