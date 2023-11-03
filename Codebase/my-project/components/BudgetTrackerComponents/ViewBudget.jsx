/**
 * The following code is modified from:
 *      Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video]. 
 *      YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I
 */

import React from 'react';

const ViewBudget = (props) => {
	return (
		<>
            <div class="container">
                <div class='row'>
                    <div class='col-lg-12'>
			            <h5 class='my-0'>Total Budget: ${props.budget}</h5>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-lg-12 ny-0'>
                        <button type='button' class='btn btn-primary btn-sm' onClick={props.handleEditClick}>
				        EDIT
			            </button>
                    </div>
                </div>
            </div>
		</>
	);
};

export default ViewBudget;