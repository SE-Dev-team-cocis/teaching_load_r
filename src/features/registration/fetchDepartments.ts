import axios from "axios"
import { useAppSelector } from "../../store/hooks"
export const fetchDepartments = async () => {
    // const setDepts = useAppSelector((state) => state.)
    const url  = "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/department"

    const response = await axios.get(url)

    const data = response.data?.departments

    return data
}