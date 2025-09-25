import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk'; // Install redux-thunk: npm install redux-thunk @types/redux-thunk
import rootReducer from './reducers'; // We'll create this next

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;