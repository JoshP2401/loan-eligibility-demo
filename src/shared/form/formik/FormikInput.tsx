import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { useField } from "formik";

type FormikInputProps = {
    name: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    label?: string;
    subtitle?: string;
    prefix?: string;
};

const FormikInput = (props: FormikInputProps) => {
    const { name, placeholder, type = "text", disabled = false, label, subtitle, prefix } = props;
    const [field, meta] = useField(name);

    const showError = meta.touched && !!meta.error;

    return (
        <VStack align="start" flex={1} width="100%">
            {label && (
                <Text fontSize="sm" fontWeight="medium">
                    {label}
                </Text>
            )}

            <Box position="relative" width="100%">
                {prefix && (
                    <Text
                        position="absolute"
                        left="0.75rem"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.600"
                        fontSize="sm"
                        pointerEvents="none"
                    >
                        {prefix}
                    </Text>
                )}
                <Input
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    disabled={disabled}
                    paddingLeft={prefix ? "2.25rem" : undefined}
                />
            </Box>

            <Text color="red.500" fontSize="sm" minH="1.25rem">
                {showError ? meta.error : " "}
            </Text>
            {subtitle && (
                <Text fontSize="xs" fontWeight="medium" color="gray.500">
                    {subtitle}
                </Text>
            )}
        </VStack>
    );
};

export default FormikInput;
