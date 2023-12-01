/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { useState, useContext } from 'react';
import ViewBudget from './ViewBudget';
import EditBudget from './EditBudget';
import { AppContext } from '../../src/context/AppContext';

const Budget = () => {
	const { budget, dispatch } = useContext(AppContext);
	const [isEditing, setIsEditing] = useState(false);

	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = (value, oldValue) => {
		dispatch({
			type: 'SET_BUDGET',
			payload: value,
		});
		setIsEditing(false);
		
		if (value!=oldValue){
			setShowConfirmation(true);
			const timeout = setTimeout(() => {
				setShowConfirmation(false);
			  }, 3000);
	
			  return () => clearTimeout(timeout);
		} 
	};

	return (
		<>
		    {showConfirmation && (
                <div className="fixed top-10 right-0 m-4 p-4 bg-green-500 text-white rounded shadow">
                    Total budget updated successfully!
                </div>
            )}

		<div class='alert alert-secondary p-3 d-flex align-items-center justify-content-between'>
			{isEditing ? (
				<EditBudget handleSaveClick={handleSaveClick} budget={budget} />
			) : (
				// For part 1 render component inline rather than create a seperate one
				<ViewBudget handleEditClick={handleEditClick} budget={budget} />
			)}
		</div>


		</>
	);
};

export default Budget;