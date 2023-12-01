/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { useContext, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../../src/context/AppContext';

const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);

	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});

		setShowConfirmation(true);
		const timeout = setTimeout(() => {
			setShowConfirmation(false);
		  }, 3000);

	  	return () => clearTimeout(timeout);
	};

	return (
		<>

			{showConfirmation && (
				<div className="fixed top-10 right-0 m-4 p-4 bg-green-500 text-white rounded shadow">
					Expense deleted succssfully!
				</div>
			)}

			<li class='list-group-item d-flex justify-content-between align-items-center'>
				{props.name}
				<div>
					<span class='badge badge-primary badge-pill mr-3'></span>
					<TiDelete size='1.5em' onClick={handleDeleteExpense} />
				</div>
			</li>

		</>
	);
};

export default ExpenseItem;