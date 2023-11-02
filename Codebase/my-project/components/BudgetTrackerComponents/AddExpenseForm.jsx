import React, { useContext, useState } from 'react';
import { AppContext } from '../../src/context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import styles from "./AddExpenseForm.module.css";


const AddExpenseForm = (props) => {
	const { dispatch } = useContext(AppContext);

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		const expense = {
			id: uuidv4(),
			name,
			cost: parseInt(cost),
		};

		dispatch({
			type: 'ADD_EXPENSE',
			payload: expense,
		});

		setName('');
		setCost('');
	};

	return (
		<div className={styles.OuterBox} id={styles.ExpenseForm}>

		<h3 className='mt-3'>Add Expense</h3>

		<form onSubmit={onSubmit} >
			<div class='row'>
				<div class='col-sm col-lg-4'>
					<label for='name'>Name</label>
					<input
						required='required'
						type='text'
						class='form-control'
						id='name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div class='col-sm col-lg-4'>
					<label for='cost'>Cost</label>
					<input
						required='required'
						type='number'
						class='form-control'
						id='cost'
						value={cost}
						onChange={(event) => setCost(event.target.value)}
					/>
				</div>
			</div>
			<div class='row mt-3'>
				<div class='col-sm'>
					<button type='submit' class='btn btn-primary'>
						Save
					</button>
				</div>
			</div>
		</form>

		</div>
	);
};

export default AddExpenseForm;