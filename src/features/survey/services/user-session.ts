import { cookies } from 'next/headers';
import { getUser } from './user-storage';

export const getUserByCookies = async () => {
  const cookiesStore = await cookies();
  const userSession = cookiesStore.get('user-id');
  if (!userSession) {
    return null;
  }

  const user = await getUser(userSession.value);
  if (!user) {
    return null;
  }
  return user;
};
