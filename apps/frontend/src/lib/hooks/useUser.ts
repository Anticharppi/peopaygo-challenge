import {
  AggregatedUpdateUserInfo,
  CustomFetchBaseQueryError,
} from '@ocmi/frontend/types';
import { useUpdateUserMutation } from '../features/users';
import { useMessage } from './useMessage';
import { useAppDispatch } from './useDispatch';
import { updateUserReducer } from '../features/auth';

export const useUser = () => {
  const [updateUserTrigger] = useUpdateUserMutation();
  const { showErrorMessage, showSuccessMessage } = useMessage();
  const dispatch = useAppDispatch();

  const updateUser = (user: AggregatedUpdateUserInfo) => {
    updateUserTrigger(user)
      .unwrap()
      .then((data) => {
        delete user.newPassword;
        delete user.currentPassword;
        dispatch(updateUserReducer(data));
        localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
        showSuccessMessage('User updated');
      })
      .catch((err: CustomFetchBaseQueryError) =>
        showErrorMessage(err.data.message),
      );
  };

  return {
    updateUser,
  };
};
