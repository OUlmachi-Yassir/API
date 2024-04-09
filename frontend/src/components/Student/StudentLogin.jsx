

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { axiosClient } from "../../Api/axios.js";
import { useNavigate } from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from "../../router/index.jsx";
import { Loader2 } from 'lucide-react';
import { useUserContext } from "../../context/UserContext.jsx";
const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(30),
})

export default function StudentLogin() {

    const { login, setAuthenticated } = useUserContext()

    const Navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "ytoop66@gmail.com",
            password: "123456789",
        },

    })
    const { setError, formState: { isSubmitting } } = form
    // 2. Define a submit handler.
    const onSubmit = async values => {
        try {
            const response = await login(values.email, values.password);
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            setAuthenticated(true);
            Navigate(STUDENT_DASHBOARD_ROUTE);
        } catch (error) {
            if (error.response) {
                setError('email', {
                    message: error.response.data.message || 'An error occurred',
                });
            } else if (error.request) {
                setError('email', {
                    message: 'Network error. Please try again later.',
                });
            } else {
                setError('email', {
                    message: 'An error occurred. Please try again later.',
                });
            }
        }
    };
    



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormDescription>
                                .
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input type={'password'} placeholder="Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && <Loader2 className={'mx-2 my-2 animate-spin'} />}
                    Submit

                </Button>
            </form>
        </Form>
    )


}
