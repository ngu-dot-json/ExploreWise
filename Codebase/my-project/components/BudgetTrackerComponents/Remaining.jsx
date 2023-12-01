/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { useContext } from 'react';
import { AppContext } from '../../src/context/AppContext';

const RemainingBudget = () => {
	const { expenses, budget } = useContext(AppContext);

	const totalExpenses = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	const alertType = totalExpenses > budget ? 'alert-danger' : (budget - totalExpenses < 100) ? 'alert-warning' : 'alert-success';

	return (
		<div class={`alert p-4 ${alertType}`}>
            <h4 class='my-0'>Remaining:</h4>
			<h3 class='my-0'>${(budget - totalExpenses.toFixed(2))}</h3>
		</div>
	);
};

export default RemainingBudget;