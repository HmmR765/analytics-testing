"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/cyberpunk/NeonButton";

import { trackEvent, pushFormSuccessToDataLayer } from "@/lib/tracking";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    phone: z.string().min(10, { message: "Invalid phone number" }),
});

export function LeadForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            phone: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        trackEvent("generate_lead", {
            form_name: "lead_gen_v1",
            value: 50, // Arbitrary lead value
            currency: "USD",
            user_data: {
                email_hash: values.email, // In real app, hash this!
                phone_hash: values.phone
            }
        });
        pushFormSuccessToDataLayer({
            form_id: 'lead_gen_v1',
            form_name: 'Lead Generation'
        });
        alert("Lead Submitted! Check Console or Tracking Debugger.");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary font-mono uppercase tracking-widest">Codename</FormLabel>
                            <FormControl>
                                <Input placeholder="V" {...field} className="bg-background/50 border-primary/30 focus:border-primary text-foreground" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-secondary font-mono uppercase tracking-widest">Net Link</FormLabel>
                            <FormControl>
                                <Input placeholder="netrunner@city.com" {...field} className="bg-background/50 border-secondary/30 focus:border-secondary text-foreground" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-accent font-mono uppercase tracking-widest">Comm ID</FormLabel>
                            <FormControl>
                                <Input placeholder="+1 234 567 890" {...field} className="bg-background/50 border-accent/30 focus:border-accent text-foreground" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <NeonButton type="submit" className="w-full">
                    Transmit Data
                </NeonButton>
            </form>
        </Form>
    );
}
