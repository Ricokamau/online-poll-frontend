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
    // We'll add cases later
    default:
      return state;
  }
};

export default pollsReducer;