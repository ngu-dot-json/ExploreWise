/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 5. The reduceer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
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
		{ id: uuidv4(), name: 'Shopping', cost: 50, date: "2023-10-09", description: "When shopping for pants and shoes."},
		{ id: uuidv4(), name: 'Holiday', cost: 300, date: "2023-10-11", description: "Went to the christmas market." },
		{ id: uuidv4(), name: 'Transportation', cost: 70, date: "2023-10-12", description: "Took the bus." },
		{ id: uuidv4(), name: 'Fuel', cost: 40, date: "2023-10-13", description: "Gas for mini van." },
		{ id: uuidv4(), name: 'Child Care', cost: 500, date: "2023-10-14", description: "Babysitter while on dinner date."},
		{ id: uuidv4(), name: 'Child Care', cost: 500, date: "2023-10-14", description: "Babysitter while on dinner date."}
	],
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
	// 4. Sets up the app state. takes a reducer, and an initial state
	const [state, dispatch] = useReducer(AppReducer, initialState);

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