import { oneadInfo } from "../api/odmApi";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/userSlice";

export default () => {
  const [user, setUser] = useState({})
  const dispatch = useDispatch()
  useEffect(() =>{
    console.log(user)
    dispatch(userLogin(user))
  }, [user])
  const login = async (email:string, password:string) => {
    // const url = 'sessions/sign_in'
    // try {
    //   const { data } = await oneadInfo.post(url, {
    //     session: {
    //       email,
    //       password
    //     }
    //   })
    //   setUser(data)
    // } catch (error) {
    //   console.log(error)
    // }
    return {email, password}
  }
  return [login]
}