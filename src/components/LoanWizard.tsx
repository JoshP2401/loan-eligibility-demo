import { Button, Flex, VStack, Text } from "@chakra-ui/react";
import { Form, Formik, type FormikValues } from "formik";
import { useState } from "react";
import type { AnySchema } from "yup";
import ProgressStepper from "./ProgressStepper";
import StepContainer from "./StepContainer";
import Title from "./Title";

type WizardStep = {
    component: (formik: FormikValues) => React.ReactNode;
    validationSchema?: AnySchema;
    title: string;
};

type WizardProps = {
    steps: WizardStep[];
    initialValues: FormikValues;
    onSubmit: (values: FormikValues) => void;
};

const FormWizard = (props: WizardProps) => {
    const { steps, initialValues, onSubmit } = props;
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const isLastStep = currentStepIndex === steps.length - 1;
    const currentStep = steps[currentStepIndex];

    const stepNames = steps.map(s => s.title);

    return (
        <VStack width="100%" height="100%" align="flex-start" gap="2">
            <ProgressStepper currentStep={currentStepIndex} steps={stepNames} />

            <Formik
                initialValues={initialValues}
                validationSchema={currentStep.validationSchema}
                onSubmit={async values => {
                    if (isLastStep) {
                        onSubmit(values);
                    } else {
                        setCurrentStepIndex(i => i + 1);
                    }
                }}
            >
                {formik => (
                    <Form
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <VStack flex="1" width="100%" alignItems="flex-start">
                            <StepContainer>
                                <Text color="gray.500">
                                    STEP {currentStepIndex + 1} OF {steps.length}
                                </Text>
                                <Title title={currentStep.title} />
                                {currentStep.component(formik)}
                            </StepContainer>
                        </VStack>

                        <Flex justify="space-between" marginTop="auto" paddingTop="2rem" marginBottom="2rem">
                            {currentStepIndex > 0 && (
                                <Button variant="outline" onClick={() => setCurrentStepIndex(i => i - 1)}>
                                    Back
                                </Button>
                            )}
                            <Button color="white" bgColor="orange.500" type="submit" marginLeft="auto">
                                {isLastStep ? "Submit Application" : "Next"}
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </VStack>
    );
};

export default FormWizard;
