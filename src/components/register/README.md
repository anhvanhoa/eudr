# Registration Components

This directory contains the refactored registration form components for better maintainability and organization.

## Structure

### Core Files

- `index.ts` - Barrel export file for easy imports
- `schemas.ts` - Zod validation schemas and TypeScript types
- `roleUtils.ts` - Business logic for user roles and icons

### Form Components

- `StepIndicator.tsx` - Progress indicator showing current step
- `Step1Form.tsx` - Account type selection and credentials
- `Step2Form.tsx` - User role selection
- `Step3IndividualForm.tsx` - Individual user information form
- `Step3BusinessForm.tsx` - Business user information form
- `Step4Form.tsx` - Review and confirmation step

## Benefits of Refactoring

1. **Modularity**: Each step is now its own component with focused responsibility
2. **Reusability**: Components can be reused or modified independently
3. **Maintainability**: Easier to debug and update individual steps
4. **Type Safety**: Centralized schemas ensure consistent typing
5. **Separation of Concerns**: Business logic separated from UI components

## Usage

```tsx
import {
    StepIndicator,
    Step1Form,
    Step2Form,
    Step3IndividualForm,
    Step3BusinessForm,
    Step4Form,
    FormData,
    Step1Data,
    // ... other exports
} from "@/components/register";
```

## Component Props

### StepIndicator

- `currentStep: number` - Current active step (1-4)

### Step1Form

- `onSubmit: (data: Step1Data) => void` - Callback when form is submitted

### Step2Form

- `onSubmit: (data: Step2Data) => void` - Callback when form is submitted
- `onBack: () => void` - Callback for back button
- `accountType: "individual" | "business"` - Account type from step 1

### Step3IndividualForm

- `onSubmit: (data: Step3IndividualData) => void` - Callback when form is submitted
- `onBack: () => void` - Callback for back button

### Step3BusinessForm

- `onSubmit: (data: Step3BusinessData) => void` - Callback when form is submitted
- `onBack: () => void` - Callback for back button

### Step4Form

- `onSubmit: (data: Step4Data) => void` - Callback when form is submitted
- `onBack: () => void` - Callback for back button
- `formData: FormData` - All collected form data for review
