"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    StepIndicator,
    Step1Form,
    Step2Form,
    Step3IndividualForm,
    Step3BusinessForm,
    Step4Form,
    FormData,
    Step1Data,
    Step2Data,
    Step3IndividualData,
    Step3BusinessData,
    Step4Data,
} from "@/components/register";
import { steps } from "@/components/register/step";

const PageRegister = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({});

    const onStep1Submit = (data: Step1Data) => {
        setFormData(prev => ({ ...prev, step1: data }));
        setCurrentStep(2);
    };

    const onStep2Submit = (data: Step2Data) => {
        setFormData(prev => ({ ...prev, step2: data }));
        setCurrentStep(3);
    };

    const onStep3Submit = (data: Step3IndividualData | Step3BusinessData) => {
        setFormData(prev => ({ ...prev, step3: data }));
        setCurrentStep(4);
    };

    const onStep4Submit = (data: Step4Data) => {
        setFormData(prev => ({ ...prev, step4: data }));
        // Handle final form submission
        console.log("Complete form data:", { ...formData, step4: data });
        alert("Registration completed successfully!");
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getStep = (step: number) => {
        return steps.find(s => s.number === step);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h3 className="py-6 text-center mb-6">
                    <span className="text-3xl font-bold text-gray-800">Register account</span>
                </h3>
                {/* Progress Steps */}
                <StepIndicator currentStep={currentStep} />

                {/* Step Content */}
                <Card className="shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Step {currentStep}: {getStep(currentStep)?.title}
                        </CardTitle>
                        <CardDescription>{getStep(currentStep)?.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <Step1Form onSubmit={onStep1Submit} initialValues={formData.step1} />
                        )}

                        {/* Step 2: User Role */}
                        {currentStep === 2 && formData.step1 && (
                            <Step2Form
                                onSubmit={onStep2Submit}
                                onBack={goBack}
                                accountType={formData.step1.accountType}
                                initialValues={formData.step2}
                            />
                        )}

                        {/* Step 3: General Information */}
                        {currentStep === 3 && formData.step1 && (
                            <>
                                {formData.step1.accountType === "individual" ? (
                                    <Step3IndividualForm
                                        onSubmit={onStep3Submit}
                                        onBack={goBack}
                                        initialValues={formData.step3 as Step3IndividualData}
                                    />
                                ) : (
                                    <Step3BusinessForm
                                        onSubmit={onStep3Submit}
                                        onBack={goBack}
                                        initialValues={formData.step3 as Step3BusinessData}
                                    />
                                )}
                            </>
                        )}

                        {/* Step 4: Completion */}
                        {currentStep === 4 && (
                            <Step4Form
                                onSubmit={onStep4Submit}
                                onBack={goBack}
                                formData={formData}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PageRegister;
