import { axiosClient } from "../../../Api/axios"
import { USER_DASHBOARD_ROUTE } from "../../../router";

const userApi ={
    getCsrfToken : async ()=>{

    return  await axiosClient.get('/sanctum/csrf-cookie',{
            baseURL:import.meta.env.VITE_BACKEND_URL
        })
    },
    login : async (email,password)=>{
        return axiosClient.post('/login', {email,password})
        
    },
    getUser : async ()=>{
        return await axiosClient.get('/user')
    },
}
export default userApi 