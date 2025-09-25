interface Poll {
  id: string;
  question: string;
  options: string[];
  results?: { [option: string]: number }; // For vote counts
}

interface PollsState {
  list: Poll[];
  loading: boolean;
  error: string | null;
}

const initialState: PollsState = {
  list: [],
  loading: false,
  error: null,
};

const pollsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_POLLS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_POLLS_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_POLLS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_POLL_SUCCESS':
      return { ...state, list: [...state.list, action.payload] };
    case 'CREATE_POLL_FAILURE':
      return { ...state, error: action.payload };
    case 'VOTE_SUCCESS':
      return state; // We'll handle refetch in action
    case 'VOTE_FAILURE':
      return { ...state, error: action.payload };
    case 'FETCH_RESULTS_SUCCESS':
      const updatedList = state.list.map(poll =>
        poll.id === action.payload.id ? { ...poll, results: action.payload.results } : poll
      );
      return { ...state, list: updatedList };
    case 'FETCH_RESULTS_FAILURE':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default pollsReducer;