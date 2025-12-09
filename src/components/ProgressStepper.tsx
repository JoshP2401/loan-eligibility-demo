import { Box, Circle, HStack, Progress, Text, VStack } from "@chakra-ui/react";

const ProgressStepper = ({ currentStep, steps }: { currentStep: number; steps: string[] }) => {
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    return (
        <VStack width="100%">
            <HStack width="100%" justify="space-between" marginBottom="1rem" mt="2rem">
                {steps.map((step, index) => (
                    <VStack key={index} flex={1} align="center" gap="0.5rem" justify="center">
                        <Circle
                            size="40px"
                            bg={index <= currentStep ? "orange.500" : "gray.200"}
                            color={index <= currentStep ? "white" : "gray.500"}
                            fontWeight="bold"
                        >
                            {index + 1}
                        </Circle>
                        <Text textAlign="center" fontSize="xs" color={index <= currentStep ? "orange.500" : "gray.500"}>
                            {step}
                        </Text>
                    </VStack>
                ))}
            </HStack>
            <Box width="100%">
                <Progress.Root value={progressPercentage} width="100%" colorScheme="orange">
                    <Progress.Track bg="gray.200">
                        <Progress.Range bg="orange.500" />
                    </Progress.Track>
                </Progress.Root>
            </Box>
        </VStack>
    );
};

export default ProgressStepper;
