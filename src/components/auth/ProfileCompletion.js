import React,{useRef} from "react";
import { useSelector,useDispatch } from "react-redux";
//import { authActions } from "../store/AuthSlice";

const ProfileCompletion = ()=> {
  const token = useSelector((state)=> state.auth.token); 
//  const dispatch = useDispatch(); 
  const displayNameRef = useRef();
  const photoUrlRef = useRef();

    const submitHandler = async (e)=> {
      const userIdd = displayNameRef.current.value;
      const photoUrl = photoUrlRef.current.value;
      e.preventDefault();
      const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: userIdd,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Profile update failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      // Handle successful update, if needed
      console.log("Profile updated successfully:");
      //dispatch(authActions.profileUpdate({userId:data.displayName}));
    
    } catch (error) {
      // Handle error, display a message, or redirect the user
      console.error("Profile update error:", error.message);
    }

    }; 

   


  return (
       <>
       
       <div>
      <div>
        <h1>Complete Your Profile</h1>
      </div>

      <form onSubmit={submitHandler}>
        <h2>Contact Details</h2>
        <label>Choose Your User Id Wisely </label>
        <input type="userId"  required ref={displayNameRef} />
        <label>Profile Photo URL</label>
        <input type="url"  required ref={photoUrlRef} />
        <button type="submit">Update</button>
      </form>
      </div>
       
      </>
       
    );
}
export default ProfileCompletion;