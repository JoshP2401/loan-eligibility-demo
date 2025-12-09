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
        <VStack
            width="100%"
            height="100%"
            align={{ base: "stretch", md: "flex-start" }}
            gap={4}
        >
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
                        <VStack flex="1" width="100%" alignItems={{ base: "stretch", md: "flex-start" }}>
                            <StepContainer>
                                <Text color="gray.500">
                                    STEP {currentStepIndex + 1} OF {steps.length}
                                </Text>
                                <Title title={currentStep.title} />
                                {currentStep.component(formik)}
                            </StepContainer>
                        </VStack>

                        <Flex
                            justify={{ base: "center", md: "space-between" }}
                            align="center"
                            marginTop="auto"
                            paddingTop={{ base: "1.5rem", md: "2rem" }}
                            marginBottom={{ base: "1.5rem", md: "2rem" }}
                            gap={{ base: "0.75rem", md: "1rem" }}
                            direction={{ base: "column-reverse", md: "row" }}
                            width="100%"
                        >
                            {currentStepIndex > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStepIndex(i => i - 1)}
                                    width={{ base: "100%", md: "auto" }}
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                color="white"
                                bgColor="orange.500"
                                type="submit"
                                marginLeft={{ base: 0, md: "auto" }}
                                width={{ base: "100%", md: "auto" }}
                            >
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
