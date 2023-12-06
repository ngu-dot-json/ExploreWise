/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React, { useState, useRef } from 'react';

const EditBudget = (props) => {
	const [value, setValue] = useState(props.budget);
    const oldValue = useRef(props.budget); //Keeping track of the orginal budget value for when user clicks 'Cancel'

	return (
		<>
            <div class="container">
                <div class='row mb-1'>
                    <div class='col-lg-12'>
                        <input
                            required='required'
                            type='number'
                            class='form-control mr-3'
                            id='name'
                            placeholder={value}
                            //value={value}
                            onChange={(event) => setValue(event.target.value)}
                        />
                    </div>
                </div>
                <div class='row mt-2'>
                    <div class='col-sm-6'>
                        <button
                            type='button'
                            class='appearance-none items-center bg-green-600 hover:bg-green-700 text-white font-bold w-full py-2 rounded text-xs'
                            onClick={() => props.handleSaveClick(value, oldValue.current)}
                        >
                            Save
			            </button>
                    </div>
                    <div class='col-sm-6'>
                        <button
                            type='button'
                            class='appearance-none items-center bg-red-600 hover:bg-red-700 text-white font-bold w-full py-2 rounded text-xs'
                            oldOldValue={oldValue.current}
                            onClick={() => props.handleSaveClick(oldValue.current, oldValue.current)} //For cancel, the operations are the same as save, except the original budget value is passed in as new budget value.
                        >
                            Cancel
			            </button>
                    </div>
                </div>
            </div>


		</>
	);
};

export default EditBudget;