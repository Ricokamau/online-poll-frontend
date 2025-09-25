import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolls, voteOnPoll, fetchResults } from '../redux/actions/pollsActions';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

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
        <div key={poll.id} style={{ marginBottom: '20px' }}>
          <h3>{poll.question}</h3>
          {poll.options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => dispatch(voteOnPoll(poll.id, opt) as any)}
              style={{ margin: '5px' }}
            >
              Vote for {opt}
            </button>
          ))}
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href + '/' + poll.id)}
            style={{ margin: '5px' }}
          >
            Share
          </button>
          {poll.results && (
            <div style={{ width: '100%', maxWidth: '400px', marginTop: '10px' }}>
              <h4>Results:</h4>
              {Object.entries(poll.results).map(([opt, count]) => (
                <p key={opt}>{opt}: {count}</p>
              ))}
              <BarChart
                width={400}
                height={300}
                data={Object.entries(poll.results).map(([label, value]) => ({ label, value }))}
                style={{ width: '100%', height: 'auto' }}
              >
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PollList;