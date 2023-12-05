/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { useContext, useState, useEffect, useRef } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../../src/context/AppContext';
import styles from "./ExpenseList.module.css";
import { RiEdit2Fill } from "react-icons/ri";
import {v4 as uuidv4} from 'uuid';



const ExpenseList = () => {
	const { expenses } = useContext(AppContext);

	const [deleteSelected, setDeleteSelected] = useState(false);

	const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);
	const toDate = (dateString) => new Date(dateString); //Ordering expenses when page is first loaded by latest to earliest
	const orderedExpensesByDate = expenses.sort((a, b) => toDate(b.date) - toDate(a.date)); //Ordering expenses when page is first loaded by latest to earliest

	useEffect(() => {
		const toDate = (dateString) => new Date(dateString); //Ordering expenses by latest to earliest
		const orderedExpensesByDate = expenses.sort((a, b) => toDate(b.date) - toDate(a.date)); //Ordering expenses by latest to earliest
		setfilteredExpenses(orderedExpensesByDate);
	}, [expenses]);

	const handleChange = (event) => {
		const searchResults = expenses.filter((filteredExpense) =>
			filteredExpense.name.toLowerCase().includes(event.target.value)
		);
		setfilteredExpenses(searchResults);
	};



	//Edit
	const { dispatch } = useContext(AppContext);

	const [editingExpenseId, setEditingExpenseId] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const [name, setName] = useState('');
	const nameRef = useRef(null);
	const [nameEdited, setNameEdited] = useState(false);

	const [cost, setCost] = useState('');
	const costRef = useRef(null);
	const [costEdited, setCostEdited] = useState(false);

	const [date, setDate] = useState('');
	const dateRef = useRef(null);
	const [dateEdited, setDateEdited] = useState(false);

	const [description, setDescription] = useState('');
	const descriptionRef = useRef(null);
	const [descriptionEdited, setDescriptionEdited] = useState(false);

	const handleNameChange = (event) => {
		setNameEdited(true);
		setName(event.target.values);
	}

	const handleDateChange = (event) => {
		setDateEdited(true);
		setDate(event.target.values);
	}

	const handleCostChange = (event) => {
		setCostEdited(true);
		setCost(event.target.values);
	}

	const handleDescriptionChange = (event) => {
		setDescriptionEdited(true);
		setDescription(event.target.values);
	}


	const handleEditClick = (expenseId) => {
		setEditingExpenseId(expenseId);
	  };


	const handleSaveClick = (id) => {
		//event.preventDefault();
		// if (nameEdited === false){
		// 	setName(nameRef.current.value)
		// };

		// if (dateEdited === false){
		// 	setDate(dateRef.current.value)
		// };

		// if (costEdited === false){
		// 	setCost(costRef.current.value)
		// };

		// if (descriptionEdited === false){
		// 	setDescription(descriptionRef.current.value)
		// };

		// setName(nameRef.current.value);
		// setDate(dateRef.current.value);
		// setCost(costRef.current.value);
		// setDescription(descriptionRef.current.value);

		// setNameEdited(false);
		// setCostEdited(false);
		// setDescription(false);
		// setDateEdited(false);

		//const namess = (nameRef.current.value);

		const expense = {
			id: id,
			name,
			cost: parseFloat(cost),
			date: date,
			description,
		};

		dispatch({
			type: 'EDIT_EXPENSE',
			payload: expense,
		});

		setEditingExpenseId(null);

		// setName('');
		// setCost('');
		// setDate('');
		// setDescription('');

		setShowConfirmation(true);
		const timeout = setTimeout(() => {
			setShowConfirmation(false);
			}, 3000);

		return () => clearTimeout(timeout);
	};

	// useEffect(() => {
	// 	handleSaveClick();
	// }, [date, name, description, cost]);
	  



	return (

		
        <div className={styles.outerBox}>

			{showConfirmation && (
				<div className="fixed top-10 right-0 m-4 p-4 bg-green-500 text-white rounded shadow">
					Edited expense saved succssfully!
				</div>
			)}

			<div class='row'>
				<div class='col-sm col-lg-4'>
					<h3 className='mt-3'>Expenses List</h3>
				</div>

				<div class='col-sm col-lg-5'>

				</div>

				<div class='col-sm col-lg-3'>
					{deleteSelected ? (
						<button
							type='button'
							class='btn btn-secondary btn-sm mt-3'
							onClick={() => {setDeleteSelected(false)}} //For cancel, the operations are the same as save, except the original budget value is passed in as new budget value.
						>
							Exit deleting mode
						</button>
					) : (
						<button
							type='button'
							class='btn btn-danger btn-sm mt-3'
							onClick={() => {setDeleteSelected(true)}} //For cancel, the operations are the same as save, except the original budget value is passed in as new budget value.
						>
							Enter deleting mode
						</button>
					)}
				</div>

			</div>

		<>
			<input
				type='text'
				class='form-control mb-2 mr-sm-2'
				placeholder='Type to search...'
				onChange={handleChange}
			/>

			{/* <ul class='list-group mt-3 mb-3'>
				{filteredExpenses.map((expense) => (
					<ExpenseItem
						id={expense.id}
                        date={expense.date}
						name={expense.name}
						cost={expense.cost}
					/>
				))}
			</ul> */}

            <div id={styles.expenseListSection}>
				{filteredExpenses.map((expense) => (


                    <div className={styles.expenseBox}>
						{editingExpenseId === expense.id ? (
 							<div>
								<div class='row'>

									<div class='col-sm col-lg-2' id={styles.editBox}>
										<input
											required='required'
											type='date'
											ref={dateRef}
											class='form-control'
											id='date'
											placeholder={expense.date}
											defaultValue={expense.date}
											onChange={(event)=> {setDate(event.target.value)}}
											style={{ fontSize: '12px'}}

										/>
									</div>

									<div class='col-sm col-lg-3' id={styles.dateText}>
										<input
											required='required'
											type='text'
											ref={nameRef}
											class='form-control'
											id='name'
											placeholder={expense.name}
											defaultValue={expense.name}
											onChange={(event)=> {setName(event.target.value)}}
										/>
									</div>
			
									<div class='col-sm col-lg-4'>
										<textarea 
											//required='required'
											type='text'
											ref={descriptionRef}
											class='form-control'
											id='description'
											placeholder={expense.description}
											defaultValue={expense.description}
											onChange={(event)=> {setDescription(event.target.value)}}
											rows={Math.max(1, 3)}
											style={{ fontSize: '12px'}}
											/>
									</div>
			
									<div class='col-sm col-lg-2'>
										<input
											required='required'
											type='number'
											ref={costRef}
											step='0.01'
											min='0'
											pattern='^\d+(\.\d{1,2})?$'
											class='form-control'
											id='cost'
											placeholder={expense.cost}
											defaultValue={expense.cost}
											onChange={(event)=> {setCost(event.target.value)}}
										/>
									</div>
			

									<div class='col-sm col-lg-1' id={styles.saveButton}>
										<button
											type='button'
											class='btn btn-success btn-sm'
											onClick={() => {
												// if (
												// 	dateRef.current.value !== expense.date ||
												// 	nameRef.current.value !== expense.name ||
												// 	descriptionRef.current.value !== expense.description ||
												// 	costRef.current.value !== expense.cost
												//   ) {
													// There are changes, call handleSaveClick with the new values
													handleSaveClick(event, expense.id);
												  //} else {
													// No changes, set input values to their default values
													// setDate(expense.date);
													// setName(expense.name);
													// setDescription(expense.description);
													// setCost(expense.cost);
													//handleSaveClick(event, expense.id);
												  //}

												}}
										>
											SAVE
			            				</button>
									</div>
						
								</div>
							</div>
						) : (
							<div class='row'>

								<div class='col-sm col-lg-2' id={styles.dateText}>
									<label for='date' class={styles.dateBox}>{expense.date}</label>
								</div>
			
								<div class='col-sm col-lg-3'>
									<label for='name' class={styles.nameBox}>{expense.name}</label>
								</div>
		
								<div class='col-sm col-lg-4'>
									<label for='description' class={styles.descriptionBox}>{expense.description}</label>
								</div>
		
								<div class='col-sm col-lg-1'>
									<label for='cost' class={styles.costBox}>${Number(expense.cost).toFixed(2)}</label>
								</div>

								{deleteSelected ? (
									<>
										<div class='col-sm col-lg-1' id={styles.editIcon}>
											<RiEdit2Fill onClick={() => {handleEditClick(expense.id)}}/>
										</div>
			
										<div class='col-sm col-lg-1'>
											<ExpenseItem id={expense.id}/>
										</div>
									</>
								) : (
									<div class='col-sm col-lg-1' id={styles.editIcon}>
									<	RiEdit2Fill onClick={() => {handleEditClick(expense.id)}}/>
									</div>
								)}


	
						
							</div>
						)}
                    


                </div>

				))}
			</div>


            
		</>

        </div>
	);
};

export default ExpenseList;