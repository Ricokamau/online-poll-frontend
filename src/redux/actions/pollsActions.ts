import axios from 'axios';
import { Dispatch } from 'redux';

const API_BASE = 'http://localhost:8000/api'; // Adjust to your backend URL

export const fetchPolls = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_POLLS_REQUEST' });
  try {
    const res = await axios.get(`${API_BASE}/polls`);
    dispatch({ type: 'FETCH_POLLS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'FETCH_POLLS_FAILURE', payload: (err as any).message });
  }
};

export const createPoll = (poll: { question: string; options: string[] }) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(`${API_BASE}/polls`, poll);
    dispatch({ type: 'CREATE_POLL_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'CREATE_POLL_FAILURE', payload: (err as any).message });
  }
};

export const voteOnPoll = (id: string, option: string) => async (dispatch: Dispatch) => {
  try {
    await axios.post(`${API_BASE}/polls/${id}/vote`, { option });
    dispatch({ type: 'VOTE_SUCCESS' });
    // Refetch polls or results after vote
    dispatch(fetchPolls() as any);
  } catch (err) {
    dispatch({ type: 'VOTE_FAILURE', payload: (err as any).message });
  }
};

export const fetchResults = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${API_BASE}/polls/${id}/results`);
    dispatch({ type: 'FETCH_RESULTS_SUCCESS', payload: { id, results: res.data } });
  } catch (err) {
    dispatch({ type: 'FETCH_RESULTS_FAILURE', payload: (err as any).message });
  }
};