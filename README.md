# currency-calculator widget

- This is a application which displays converted currency values according to selected currencies
- The exchange rate is set when the user commits their first currency conversion
- Currencies are currently fixed to CAD, USD AND EUR
- Exchanges rates are fetched from http://fixer.io/ 's api

## Usage

``` bash
$ npm i 
$ npm start
```

## Testing 

> TODO : Testing will come in a later interation

## Linting 

``` bash
$npm install -g eslint@3.19.0 
$npm run lint
```

## What's Included

- Server side rendering - Search engines can parse the HTML sent from server. Faster initial loading times.  

- Client State management with redux

- Routing with react router

- ES6 with babel 6

- Add in ability to switch the base from EUR (doesnt really gain us anything in the client side however)

- Styles provided by Lighting Design System @UX Salesforce team

- SASS for styling

- Responsive first mobile views

- linted code

- mimiced client side caching with redux

- redux middleware with thunks

- hot-reloading with webpack dev server on client & nodemon on server 

## TODOs / Roadmap

- Add more breakpoints for responsive deign

- Add morgan for logging

- Find the markup difference from client to server -> has to be the way the redux state is serialized with spaces.

- Make the app production ready -> Do the webpack.prod setup, load urls based off environment, deploy

- Make a visible user facing message when the max input is reached instead of setting the response to 0. Change the input DOM to reflect this as well

- Add timestamp to when the initial currency is fetched -> Will be continued below

- Add noSql integration with mongoose ORM and mongoDB -> Continued below

- Read in the cache bust value from database. Compare the bust time with the timestamp to dynamically set how often we want to grab exchange rates,
if their is high traffic, but low need for to the second exchange rates, we can increase this cache bust time, without having to redeploy.

- Remove coupling of the three currency types to easily extend and swap in new currencies. (not too hard just need to read in initialState from noSQL storage).

- Bind redux state with local state, so we can get a snapshot on page reload of the page. This piece will be tightly coupled with the cache-bust feature so I removed it,
initially it had been implemented.
