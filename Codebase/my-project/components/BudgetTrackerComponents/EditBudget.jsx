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
                            class='btn btn-success btn-sm'
                            onClick={() => props.handleSaveClick(value, oldValue.current)}
                        >
                            SAVE
			            </button>
                    </div>
                    <div class='col-sm-6'>
                        <button
                            type='button'
                            class='btn btn-danger btn-sm'
                            oldOldValue={oldValue.current}
                            onClick={() => props.handleSaveClick(oldValue.current, oldValue.current)} //For cancel, the operations are the same as save, except the original budget value is passed in as new budget value.
                        >
                            CANCEL
			            </button>
                    </div>
                </div>
            </div>


		</>
	);
};

export default EditBudget;