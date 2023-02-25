import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { auth } from "../../config";
import { authSlice } from "./authReducer";


console.log(auth)  


export const authSignInUser = (email, password) => async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        console.log("userCredentials", user)
        }
    catch (error) {
            console.log("error", error)
        }
}

export const authSignUpUser = ({ name, email, password }) => async (dispatch, getState) => {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);

        

        await updateProfile(user, {
            displayName: name
        })

        const updateUserSuccess = auth.currentUser;

        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickName: updateUserSuccess.displayName,
          })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        console.log(user);
    } catch (error) {
      console.log("error", error);
    }
 };

export const authSignOutUser = () => async (dispatch, getState) => {
    try {
        await signOut(auth)
        dispatch(authSlice.actions.authSignOut())
} catch (error) {
  console.log("error", error);
    }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              
                const userUpdateProfile = {
                  nickName: user.displayName,
                  userId: user.uid,
                  stateChange: true
                };

            dispatch(authSlice.actions.authStateChange({ stateChange: true }));
                dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
            }
        });
}
