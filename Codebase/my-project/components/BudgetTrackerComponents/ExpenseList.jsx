import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../../src/context/AppContext';
import styles from "./ExpenseList.module.css";


const ExpenseList = () => {
	const { expenses } = useContext(AppContext);

	const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

	useEffect(() => {
		setfilteredExpenses(expenses);
	}, [expenses]);

	const handleChange = (event) => {
		const searchResults = expenses.filter((filteredExpense) =>
			filteredExpense.name.toLowerCase().includes(event.target.value)
		);
		setfilteredExpenses(searchResults);
	};

	return (
        <div className={styles.outerBox}>
        <h3 className='mt-3'>Expenses List</h3>
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
                    
                        <div class='row'>

                            <div class='col-sm col-lg-2' id={styles.dateText}>
                                <label for='date' class={styles.dateBox}>{expense.date}</label>
                            </div>
        
                            <div class='col-sm col-lg-3'>
                                <label for='name' class={styles.nameBox}>{expense.name}</label>
                            </div>

                            <div class='col-sm col-lg-5'>
                                <label for='description' class={styles.descriptionBox}>{expense.description}</label>
                            </div>

                            <div class='col-sm col-lg-1'>
                                <label for='cost' class={styles.costBox}>${expense.cost}</label>
                            </div>

                            <div class='col-sm col-lg-1'>
                                <ExpenseItem id={expense.id}/>
                            </div>

                    </div>

                </div>

				))}
			</div>


            
		</>

        </div>
	);
};

export default ExpenseList;