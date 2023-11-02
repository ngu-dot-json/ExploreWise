import React, { useContext } from 'react';
import { AppContext } from '../../src/context/AppContext';

const RemainingBudget = () => {
	const { expenses, budget } = useContext(AppContext);

	const totalExpenses = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

	return (
		<div class={`alert p-4 ${alertType}`}>
            <h4>Remaining:</h4>
			<h3>${budget - totalExpenses}</h3>
		</div>
	);
};

export default RemainingBudget;