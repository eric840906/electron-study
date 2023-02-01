import { oneadInfo } from "../api/odmApi";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/userSlice";

export default () => {
  const [user, setUser] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(userLogin(user))
  }, [user])
  useEffect(() => {
    if(success === true){
      setTimeout(() => setSuccess(false), 5000)
    }
  }, [success])
  const login = async (email:string, password:string) => {
    const url = 'sessions/sign_in'
    try {
      setLoading(true)
      const { data } = await oneadInfo.post(url, {
        session: {
          email,
          password
        }
      })
      setSuccess(data.success)
      setLoading(false)
      setUser(data)
    } catch (error) {
      console.log(error)
      setSuccess(false)
      setLoading(false)
    }
    return {email, password}
  }
  return {login, loading, success}
}