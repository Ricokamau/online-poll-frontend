import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolls, voteOnPoll, fetchResults } from '../redux/actions/pollsActions';

const PollList = () => {
  const dispatch = useDispatch();
  const polls = useSelector((state: any) => state.polls.list);

  useEffect(() => {
    dispatch(fetchPolls() as any);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      polls.forEach((poll: any) => dispatch(fetchResults(poll.id) as any));
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [polls, dispatch]);

  return (
    <div>
      <h2>Active Polls</h2>
      {polls.map((poll: any) => (
        <div key={poll.id}>
          <h3>{poll.question}</h3>
          {poll.options.map((opt: string) => (
            <button key={opt} onClick={() => dispatch(voteOnPoll(poll.id, opt) as any)}>
              Vote for {opt}
            </button>
          ))}
          {poll.results && (
            <div>
              <h4>Results:</h4>
              {Object.entries(poll.results).map(([opt, count]) => (
                <p key={opt}>{opt}: {count}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PollList;