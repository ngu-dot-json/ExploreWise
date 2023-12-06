/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import Navbar from '../../components/Navbar'
import React from 'react';
import Head from "next/head";


import { AppProvider } from '../context/AppContext';
import Budget from '../../components/BudgetTrackerComponents/Budget';
import ExpenseTotal from '../../components/BudgetTrackerComponents/ExpenseTotal';
import ExpenseList from '../../components/BudgetTrackerComponents/ExpenseList';
import AddExpenseForm from '../../components/BudgetTrackerComponents/AddExpenseForm';
import RemainingBudget from '../../components/BudgetTrackerComponents/Remaining';
import Image from 'next/image'
import backgrounder from "/public/test.png"
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  heading:{
    marginTop: "60px", //Shifting the heading down so it is not covered by the navigation bar
    color: "#f87144",
    fontWeight: "700",
  }
}

function budget (){
  
	return (
  
    <>
    <Head>
      <title>ExploreWise: My Budget</title>
    </Head>

      <div>
        <Navbar />  
        <br/>
      </div>

      
      <AppProvider>

      <main className="flex flex-col items-center justify-between">
        <div className='relative w-full'>

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

              <div className="bg-white rounded-md border p-2">
              
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
          </div>


        </div>
      </main>    
		</AppProvider>
    </>
	);
}

export default budget;