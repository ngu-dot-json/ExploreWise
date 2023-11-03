/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { useContext, useState } from 'react';
import { AppContext } from '../../src/context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import styles from "./AddExpenseForm.module.css";


const AddExpenseForm = (props) => {
	const { dispatch } = useContext(AppContext);

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		const expense = {
			id: uuidv4(),
			name,
			cost: parseFloat(cost),
			date: date,
			description,
		};

		dispatch({
			type: 'ADD_EXPENSE',
			payload: expense,
		});

		setName('');
		setCost('');
		setDate('');
		setDescription('');
	};

	return (
		<div className={styles.outerBox}>

		<h3 className='mt-3'>Add Expense</h3>

		<form onSubmit={onSubmit} >

			<div class='col-lg'>
				<label for='name'>Title</label>
				<input
					required='required'
					type='text'
					class='form-control'
					id='name'
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
			</div>

			<div class='row'>

				<div class='col-sm col-lg-6'>
					<label for='date'>Date</label>
					<input
						required='required'
						type='date'
						class='form-control'
						id='date'
						value={date}
						onChange={(event) => setDate(event.target.value)}
					/>
				</div>

				<div class='col-sm col-lg-6'>
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

			<div class='col-lg'>
				<label for='description'>Description</label>
				<textarea
					//required='required'
					type='text'
					class='form-control'
					id='description'
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</div>

			<div class='row mt-3'>
				<div class='col-sm text-center'>
					<button type='submit' class='btn btn-primary mx-auto'>
						ADD
					</button>
				</div>
			</div>

		</form>

		</div>
	);
};

export default AddExpenseForm;