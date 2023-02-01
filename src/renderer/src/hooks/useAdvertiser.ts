import { useState, useEffect } from "react"
import { oneadOss } from "../api/odmApi"
const useAdvertiser = () => {
  const [advertiser, setAdvertiser] = useState([])
  const getList = async() => {
    const url = '/api/v1/odm/advertisers'
    try {
      const { data } = await oneadOss.get(url)
      setAdvertiser(data)
    } catch (error) {
      console.log(error)
    }
  }
  return { getList, advertiser }
}

export default useAdvertiser