import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import {
    PiNumberCircleFourFill,
    PiNumberCircleOneFill,
    PiNumberCircleThreeFill,
    PiNumberCircleTwoFill,
} from "react-icons/pi";

type StepProps = {
    subtitle: string;
    icon: React.ElementType;
};

const Step = (props: StepProps) => {
    const { subtitle, icon } = props;

    return (
        <VStack align="start" gap={2} p={4} borderWidth="1px" borderRadius="md" w="100%" justify="center" alignItems="center">
            <Icon fontSize="4xl" as={icon} color="orange.500" />
            <Text fontSize="sm" color="gray.600">
                {subtitle}
            </Text>
        </VStack>
    );
};

const DashboardSteps = () => {
    return (
        <HStack width="100%" align="stretch" mt="2rem" mb="4rem">
            <Step icon={PiNumberCircleOneFill} subtitle="Choose Your Loan Product" />
            <Step icon={PiNumberCircleTwoFill} subtitle="Input Icome and Expenses" />
            <Step icon={PiNumberCircleThreeFill} subtitle="Set Your Loan Amount and Term" />
            <Step icon={PiNumberCircleFourFill} subtitle="Review Your Results" />
        </HStack>
    );
};

export default DashboardSteps;
