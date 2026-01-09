"use client";

import { useState, useEffect, useRef } from "react";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent, pushFormSuccessToDataLayer } from "@/lib/tracking";
import { useRouter } from "next/navigation";

const QUESTIONS = [
    { id: "name", text: "What is your name?", type: "text" },
    { id: "role", text: "What is your job title?", type: "text" },
    { id: "company", text: "Which company do you work for?", type: "text" },
];

export function TypeformComponent() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();

        // Track form start
        if (currentStep === 0 && Object.keys(answers).length === 0) {
            trackEvent("custom_event", {
                category: "form_lifecycle",
                action: "form_start",
                label: "customer_survey"
            });
        }
    }, [currentStep]);

    const handleNext = () => {
        const currentQ = QUESTIONS[currentStep];
        setAnswers(prev => ({ ...prev, [currentQ.id]: inputValue }));

        trackEvent("custom_event", {
            category: "form_lifecycle",
            action: "form_progress",
            label: "customer_survey",
            step: currentStep + 1,
            step_name: currentQ.id
        });

        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
            setInputValue("");
        } else {
            // Submit
            trackEvent("generate_lead", {
                form_name: "customer_survey",
                value: 0,
            });
            pushFormSuccessToDataLayer({
                form_id: 'customer_survey',
                form_name: 'Customer Survey',
                name: answers.name,
                description: `${answers.company || ''} - ${answers.role || ''}`
            });
            router.push("/thank-you?type=contract&id=SURVEY-" + Math.random().toString().slice(2, 8));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleNext();
    };

    return (
        <div className="max-w-xl mx-auto min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl md:text-3xl font-mono text-primary">
                        <span className="text-muted-foreground mr-4">0{currentStep + 1} //</span>
                        {QUESTIONS[currentStep].text}
                    </h2>

                    <div className="relative">
                        <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-0 border-b-2 border-primary/50 text-2xl font-mono focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 h-16 placeholder:text-muted-foreground/30"
                            placeholder="Type your answer..."
                        />
                    </div>

                    <div className="flex justify-end pt-8">
                        <NeonButton onClick={handleNext} size="lg">
                            {currentStep === QUESTIONS.length - 1 ? "TRANSMIT PROFLIE" : "NEXT_Step >"}
                        </NeonButton>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-800">
                <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
                />
            </div>
        </div>
    );
}
