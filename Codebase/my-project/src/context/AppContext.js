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
		{ id: uuidv4(), name: 'Night of Flamemco', cost: 19.99, date: "2023-11-04", description: "Ticket for Night of Flamenco, an experience of explosive mix of sound, movement and emotion."},
		{ id: uuidv4(), name: 'THAT PARTY LAST NIGHT VOL. 6', cost: 18.99, date: "2023-11-04", description: "Ticket to music showcase series aimed to highlight exciting talent in Canada."},
		{ id: uuidv4(), name: 'Pizza Cooking Class', cost: 70.00, date: "2023-10-29", description: "Sign up fee for cooking class with Pizzaiolo Scott creating Neapolitan-style pizza. Included wine, charcuterie board, pizza ingredients, and dessert."},
		{ id: uuidv4(), name: 'Calgary Creative Experience at Studio Bell', cost: 18.18, date: "2023-10-18", description: "Ticket to Studio Bell event for a screening of \"Along the Way\", a short film, and other unique creative opportunities."},
		{ id: uuidv4(), name: 'Calgary Clue Solving Adventure - Sculpted in Time', cost: 86.90, date: "2023-10-30", description: "General admission for event to explore Calgary downtown and surrounding areas while uncovering clues."},
		{ id: uuidv4(), name: 'Calgary Flames Game', cost: 43.05, date: "2023-10-26", description: "Ticket to Calgary Flames vs. New Jersey Devils game at the Scotiabank Saddledome."},
		{ id: uuidv4(), name: 'Beauty and the Beast', cost: 37.56, date: "2023-10-26", description: "Ticket for Beauty and the Beast at the Calgary Opera."},
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