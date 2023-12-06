/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import Navbar from '../../components/Navbar'
import React, { useState } from 'react';
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
import styless from "../styles/account.module.css"
//import "/src/styles/budget.module.css";

const styles = {
  heading:{
    marginTop: "60px", //Shifting the heading down so it is not covered by the navigation bar
    color: "#f87144",
    fontWeight: "700",
  }
}

function budget (){

  const [showUnderDevMes, setShowUnderDevMes] = useState(false);

  const onClick = () => {
    setShowUnderDevMes(true);
		const timeout = setTimeout(() => {
			setShowUnderDevMes(false);
		  }, 3000);

	  	return () => clearTimeout(timeout);
  }
  
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
      {/* background image container */}

      <main className="flex flex-col items-center justify-between">
        <div className='relative w-full'>

          <div className='container'>
            <h1 style={styles.heading}>My Budget Planner</h1>


            {showUnderDevMes && (
              <div className="fixed top-10 right-0 m-4 p-4 bg-yellow-500 text-white rounded shadow">
                Feature under development
              </div>
      	    )}
            
            <div class='container'>
              <div className='row mt-3'>
                <div className='col-lg-6'>
                  <div class="alert alert-info" role="alert">
                    Set your total budget for the trip, then start adding expenses!
                  </div> 
                </div>
                <div className='col-lg-2'>
                </div>
                <div className='col-lg-2'>
                  <button 
                    type='button' 
                    class='appearance-none items-center group bg-green-600 hover:bg-green-700 text-white font-bold w-full py-3 rounded text-sm'
                    onClick={onClick}>
                    Create New Budget
                  </button>
                </div>
                <div className='col-lg-2'>
                  <button 
                      type='button' 
                      class='appearance-none items-center group bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-3 rounded text-sm'
                      onClick={onClick}>
                      Switch to Another Budget
                    </button>
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


    <div class={styless.container}>
            <div class={styless.rowE}>
                <div class={styless.leftC}>
                    <h1 class={styless.subT}>Support</h1>
                      <p>Contact us</p>
                      <p>FAQ</p>

                </div>
                <div class={styless.rightC}>
                  <h1 class="sub-title">Terms and settings</h1>
                      <p>Privacy Settings</p>
                      <p>Terms and Conditions</p>
                </div>
            </div>
        </div>
    </>
	);
}

export default budget;
