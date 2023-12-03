/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { createContext, useReducer, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 5. The reduceer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
	switch (action.type) {
		case 'SET_INITIAL_STATE':
			return action.payload;

		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
			};
			
		case 'EDIT_EXPENSE':
			return {
				...state,
				expenses: state.expenses.map((expense) => {
				if (expense.id === action.payload.id) {

					return {
					//...expense,
					name: action.payload.name,
					date: action.payload.date,
					description: action.payload.description,
					cost: action.payload.cost,
					};
				}
				return expense; // Return unchanged expense if id doesn't match
				}),
			};
			
		case 'DELETE_EXPENSE':
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload
				),
			};
		case 'SET_BUDGET':
			return {
				...state,
				budget: action.payload,
			};

		default:
			return state;
	}
};

// 1. Sets the initial state when the app loads
const initialState = {
	budget: 2000,
	expenses: [
		{ id: uuidv4(), name: 'Book', cost: 19.89, date: "2023-10-09", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
		{ id: uuidv4(), name: 'Shopping', cost: 50, date: "2023-10-09", description: "When shopping for pants and shoes."},
		{ id: uuidv4(), name: 'Holiday', cost: 300, date: "2023-10-11", description: "Went to the christmas market." },
		{ id: uuidv4(), name: 'Transportation', cost: 70, date: "2023-10-12", description: "Took the bus." },
		{ id: uuidv4(), name: 'Fuel', cost: 40, date: "2023-10-13", description: "Gas for mini van." },
		{ id: uuidv4(), name: 'Child Care', cost: 500, date: "2023-10-14", description: "Babysitter while on dinner date."},
	],
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
	// 4. Sets up the app state. takes a reducer, and an initial state
	// const [state, dispatch] = useReducer(AppReducer, initialState);

	// useEffect(() => {
	// 	console.log('Loading from localStorage');
	// 	// Load state from localStorage when component mounts
	// 	const storedData = localStorage.getItem('budgetAppData');
	// 	console.log(storedData);
	// 	if (storedData) {
	// 	  dispatch({ type: 'SET_INITIAL_STATE', payload: JSON.parse(storedData) });
	// 	  console.log("I made it here");
	// 	}
	// }, []);



	// useEffect(() => {
	// 	console.log('Saving to localStorage');
	// 	// Save state to localStorage
	// 	localStorage.setItem('budgetAppData', JSON.stringify(state));
	//   }, [state]);
	
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Add a flag to check if the initial state is already set
	const isInitialStateSet = useRef(false);


	// useEffect(() => {
	// 	if (typeof window !== 'undefined') {
	// 	  // Check if localStorage is available
	// 	  const budgetAppData = localStorage.getItem('budgetAppData');
	// 	  console.log('budgetAppData:', budgetAppData);
	  
	// 	  if (budgetAppData) {
	// 		localStorage.removeItem('budgetAppData');
	// 	  }
	// 	}
	//   }, []);

	useEffect(() => {
		// Load state from localStorage when component mounts
		const storedData = localStorage.getItem('budgetAppData');
		//console.log(storedData);
		if (storedData && !isInitialStateSet.current) {
			dispatch({ type: 'SET_INITIAL_STATE', payload: JSON.parse(storedData) });
			isInitialStateSet.current = true;
		}
	}, []);

	useEffect(() => {
		// Save state to localStorage
		localStorage.setItem('budgetAppData', JSON.stringify(state));
	}, [state]);

	// // Cleanup effect to reset the flag when the component unmounts
	// useEffect(() => {
	// 	//return () => {
	// 	isInitialStateSet.current = false;
	// 	//};
	// }, []);



	// 5. Returns our context. Pass in the values we want to expose
	return (
		<AppContext.Provider
			value={{
				expenses: state.expenses,
				budget: state.budget,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};