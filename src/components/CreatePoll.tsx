import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createPoll } from '../redux/actions/pollsActions';

const schema = yup.object({
  question: yup.string().required('Question is required'),
  options: yup.array().of(yup.string().required()).min(2, 'At least 2 options required'),
});

const CreatePoll = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(createPoll({ question: data.question, options: data.options.split(',') }) as any);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('question')} placeholder="Poll Question" />
      {errors.question && <p>{errors.question.message}</p>}
      <input {...register('options')} placeholder="Options (comma-separated)" />
      {errors.options && <p>{errors.options.message}</p>}
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default CreatePoll;