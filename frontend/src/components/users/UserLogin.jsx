import { useForm } from "react-hook-form"
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { USER_DASHBOARD_ROUTE } from "../../router"
import { useUserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"
 
const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(6).max(50) 
  })
  




export default function UserLogin() {
  const {login,setAuthenticated} = useUserContext()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
        email:'ytoop66@gmail.com',
        password:'yasser12',
    }
  })
 


  const  onSubmit = async values =>{
   login(values.email,values.password).then(
    (value)=> {
        if( value.status===200){
          setAuthenticated(true)
        navigate(USER_DASHBOARD_ROUTE)
    }
   }).catch(({response})=>{
    setError('email',
    {message : response.data.error})
   })
   
    
  }
  return <>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={'password'} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </> 
  
}

