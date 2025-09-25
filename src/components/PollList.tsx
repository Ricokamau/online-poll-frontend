import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolls, voteOnPoll } from '../redux/actions/pollsActions';

const PollList = () => {
  const dispatch = useDispatch();
  const polls = useSelector((state: any) => state.polls.list);

  useEffect(() => {
    dispatch(fetchPolls() as any);
  }, [dispatch]);

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
        </div>
      ))}
    </div>
  );
};

export default PollList;