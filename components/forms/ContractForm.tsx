"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { pushFormSuccessToDataLayer } from "@/lib/tracking";

const formSchema = z.object({
    codename: z.string().min(2, { message: "Alias required." }),
    target: z.string().min(2, { message: "Target description required." }),
    bounty: z.string().min(1, { message: "Offer required." }),
});

export function ContractForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            codename: "",
            target: "",
            bounty: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Redirect to Thank You page with query params to simulate processing
        const contractId = "CNT-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        pushFormSuccessToDataLayer({
            form_id: 'contract_request',
            form_name: 'Contract Request'
        });
        router.push(`/thank-you?type=contract&id=${contractId}`);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                <FormField
                    control={form.control}
                    name="codename"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-secondary font-mono uppercase tracking-widest">Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jane Doe" {...field} className="bg-background/50 border-secondary/30 focus:border-secondary text-foreground" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary font-mono uppercase tracking-widest">Project Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="I need a new e-commerce website..." {...field} className="bg-background/50 border-primary/30 focus:border-primary text-foreground" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bounty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-accent font-mono uppercase tracking-widest">Estimated Budget ($)</FormLabel>
                            <FormControl>
                                <Input placeholder="5000" {...field} className="bg-background/50 border-accent/30 focus:border-accent text-foreground" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <NeonButton type="submit" className="w-full" glowColor="primary">
                    Submit Request
                </NeonButton>
            </form>
        </Form>
    );
}
