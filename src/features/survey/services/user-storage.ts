import { randomUUID } from 'crypto';
import { connectRedis, disconnectRedis } from '../../shared/services/redis';

export const createUser = async (userId = randomUUID()) => {
  const redis = await connectRedis();
  const userData = { id: userId, surveys: {} } as User;
  await redis.set(`user_session:${userId}`, JSON.stringify(userData));
  disconnectRedis();

  return userData;
};

export const getUser = async (userId: string) => {
  const redis = await connectRedis();
  const sessionKey = `user_session:${userId}`;
  const userData = await redis.get(sessionKey);
  disconnectRedis();

  if (!userData) {
    return null;
  }

  return JSON.parse(userData) as User;
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const redis = await connectRedis();
  const sessionKey = `user_session:${userId}`;
  const userData = await redis.get(sessionKey);

  if (!userData) {
    disconnectRedis();
    return null;
  }

  const user = JSON.parse(userData) as User;
  const updatedUser = { ...user, ...updates };
  await redis.set(sessionKey, JSON.stringify(updatedUser));
  disconnectRedis();

  return updatedUser;
};

export const updateUserSurvey = async (
  userId: string,
  surveyData: User['surveys'][string],
) => {
  const redis = await connectRedis();
  const sessionKey = `user_session:${userId}`;
  const userData = await redis.get(sessionKey);

  if (!userData) {
    disconnectRedis();
    return null;
  }

  const user = JSON.parse(userData) as User;
  user.surveys[surveyData.surveyId] = surveyData;
  await redis.set(sessionKey, JSON.stringify(user));
  disconnectRedis();

  return user;
};

export const getAllUsers = async () => {
  const redis = await connectRedis();
  const keys = await redis.keys('user_session:*');
  const users: User[] = [];

  for (const key of keys) {
    const userData = await redis.get(key);
    if (userData) {
      users.push(JSON.parse(userData) as User);
    }
  }

  disconnectRedis();
  return users;
};
