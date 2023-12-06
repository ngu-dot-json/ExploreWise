# ExploreWise

ExploreWise is a hypothetical Calgary-based travel startup company that provides the best and most up-to-date travel recommendations and information for its clients. 
This includes assistance in choosing a travel location, finding interesting events around an area, itinerary management, budget tracking, and more. 
Clients seek out these services well before their trip in their initial planning phase where they work out the logistics of their trip. 

ExploreWise is looking to expand its services provided to clients by taking advantage of increased ownership of personal devices 
and how travelers are opting to use online tools to create their personalized travel itineraries instead of using the likes of travel books or brochures. 
Therefore, ExploreWise wants to expand its services provided to clients by creating an online travel planner website that can be used before, during, and after a trip. 


## Getting Started

This is a [Next.js](https://nextjs.org/) project, written in JavaScript and using the React framework. Next.js is a React framework that enables server-side rendering and other 
optimizations for React applications.

First, ensure you are in the /Codebase/my-project directory. Then, install any missing dependencies
```bash
npm install
```
Then, run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/index.tsx`. The page auto-updates as you edit the file.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Folder Structure (TODO)

Our main project can be found inside /Codebase/my-project

Under my-project, there are four main folders, 'components', 'constants', 'public' and 'src'

- components folder (TODO)  
- constants folder (TODO)

- public folder 
  - Contains the pictures we use on our website

- src folder 
  Contains subfolders 'context', 'pages', and 'styles'
    pages folder
    -  contains every single page used in our website which is linked by next.js
    styles folder
    -   contains the css styling of every page
 
## Functionalities implemented
- Register
- Login
- Account recovery
- Scroll through itinerary in full view
- View map with drop pins
- View drop pins containing event information
- Scroll through small sized itinerary
- Sort events by price (low-high, high-low) and date (oldest-newest, newest-oldest)
- Sort events by genre
- Favourite event
- View favourited events
- View user recommended events
- Add events to itinerary
- Delete events from itinerary
- Add new expenses
- View all expenses
- Edit expenses
- Delete expenses
- Search for expenses
- Set total budget
- Upload account picture
- Sign out
- Change account username
- Change account password
- Change account email

## Walk-Through

At the very beginning of running our website, the user will see our landing page, where they can Sign in or Register. 
If this is their first time using our website, the user will Register by creating a new username and password. 

Next, they'll be prompted to the Events page of our website, which uses their location to display all the available events to choose from. 

Afterwards, the user can:
- Sort the events based on 4 different filter options
- Select genre depending on their mood
- Mark interesting events as Favorites by clicking on the 'Heart' icon on each of the events, which can be accessed via the Favourites button on the left
- Check out most popular events by clicking on the 'User Recommended' button

The user can then select the events by clicking 'Add Event' to add it to their itinerary. If they want to delete any event, they will simply click on the event, and the system will ask to verify their action, and then the event will be removed. 

Next, the user can go to the 'My Budget' tab. User can:
- Clicking 'Create New Budget' and 'Switch to Another Budget' buttons. An alert will pop on the the top right corner that the those functionalies are under development.
- Click 'Edit' button under total budget. Set a new budget to $350. When 'Save' is clicked, alert will pop up that new total budget is saved successfully. Also, 'Remaining' box will turn YELLOW becuase you are less than $100 away from reaching the budget.
- Under 'Add Expense', try leaving 'Title', 'Date', or 'Cost' blank and click 'Add' to get error feedback. Try entering more than 2 decimal places for 'Cost' and press'Add' to get error feedback.
- Search 'bell' in the search bar and see the 'Calgary Creative Experience at Studio Bell' expense pop up. Delete what you typed in the search bar to get all the expenses back.
- Click 'Enter deleting mode' button and see an x icon appear next to each expense. Delete the 'Pizza Cooking Class' expense. An alert saying expense deleted successfully will pop up. Also,'Remaining' box will turn back green because you now have more than $100 of your budget remaining.
- Click the pencil icon next to an expense in order to edit an expense. 

On the Map tab, the user can see how far the events are from their location as well as the details of all the events. The colored pins are the ones in their itinerary. 

On the Itinerary tab, the user can have a max view of their schedule and move around to see how busy or free their timings are. 

Lastly, on the Account tab, the user can make changes or update their username, email and password. 

## Acknowledgments (TODO)
Give credit to any resources, libraries, or contributors that have inspired or helped your project.

  Blakely, C. [Chris @ CodeCoyotes]. (2021, March 11). React Budget App Tutorial | Learn how to use the Context API [Video].
YouTube. https://www.youtube.com/watch?v=aeYxBd1it7I



## Authors
Jeongah Lee | jeongah.lee@ucalgary.ca  
Jason Ngu | jason.ngu1@ucalgary.ca  
Anmol Rana | anmol.rana@ucalgary.ca  
Mahira Zabin | mahira.zabin1@ucalgary.ca




