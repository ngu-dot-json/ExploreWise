// import Head from 'next/head'
// import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
// import Schedule from '../../components/TLScheduler'

// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <>
//     <Navbar />
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     <h1>BUDGET TRACKER</h1>
//     </>
//   )
// }

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from '../context/AppContext';
// import Budget from './components/Budget';
// import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from '../../components/BudgetTrackerComponents/ExpenseList';
import AddExpenseForm from '../../components/BudgetTrackerComponents/AddExpenseForm';
//import RemainingBudget from './components/Remaining';
import styles from "./budgettracker.module.css";

const App = () => {
	return (
    
		<AppProvider>

      <div className='row mt-3'>
					<div className='col-sm'>
          <Navbar />
					</div>
			</div>
      
      
			<div className='container'>
				<h1 className='mt-3'>My Budget Planner</h1>

      
				<div className='row '>
					<div className='col-sm'>
						<ExpenseList />
					</div>
				</div>


				
				<div className='row mt-3'>
					<div className='col-sm'>
						<AddExpenseForm />
					</div>
				</div>
			</div>
		</AppProvider>
	);
};

export default App;