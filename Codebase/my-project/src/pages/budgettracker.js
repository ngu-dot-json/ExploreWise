/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */



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
import Budget from '../../components/BudgetTrackerComponents/Budget';
import ExpenseTotal from '../../components/BudgetTrackerComponents/ExpenseTotal';
import ExpenseList from '../../components/BudgetTrackerComponents/ExpenseList';
import AddExpenseForm from '../../components/BudgetTrackerComponents/AddExpenseForm';
import RemainingBudget from '../../components/BudgetTrackerComponents/Remaining';


const styles = {
  heading:{
    marginTop: "120px", //Shifting the heading down so it is not covered by the navigation bar
  }
}




const App = () => {
  
	return (
    
		<AppProvider>

      <div className='row mt-3'>
					<div className='col-sm'>
          <Navbar />
					</div>
			</div>
      
      
			<div className='container'>
				<h1 style={styles.heading}>My Budget Planner</h1>




      <div class='container'>
        <div className='row mt-3'>
          <div className='col-lg-12'>
            <div class="alert alert-info" role="alert">
              Set your total budget for the trip, then start adding expenses!
            </div>
          </div>
        </div>


				<div className='row mt-2'>

          <div className='col-lg'>
            <div className='row'>
              <div className='col-lg-6'>
                <Budget />
              </div>
              <div className='col-lg-6'>
                <RemainingBudget />
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <AddExpenseForm />
              </div>
            </div>
          </div>
            
          <div className='col-lg-8'>
          <ExpenseList />
          </div>
				</div>

       </div>

			</div>
		</AppProvider>

	);
};

export default App;