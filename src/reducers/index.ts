import { combineReducers } from 'redux';
import pollsReducer from './pollsReducer'; // We'll create this

const rootReducer = combineReducers({
  polls: pollsReducer,
});

export default rootReducer;