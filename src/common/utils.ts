import store from "../store/store";

const token: any = store.getState()?.login?.token;
const users: any = store.getState()?.users?.userList;

const FIVE_MINUTES = 5 * 60 * 1000;
export const [loggedUserId, timestamp] = token?.split('.') || [];
export const checkSession = (token: string) => {
  if (!token) return false;
  const currentTime = Date.now();
  const loginTime = parseInt(timestamp, 10);

  // Check if more than 5 minutes have passed
  if (currentTime - loginTime > FIVE_MINUTES) {
    return false; // Session expired
  }

  return true; // Session is still valid
};

export const getLoggedUserDetails = () => {
    console.log(users, loggedUserId)
    return users.find((user: any) => user.userId === loggedUserId);
}