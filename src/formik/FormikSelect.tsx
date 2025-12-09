import { Select, Text, VStack, createListCollection } from "@chakra-ui/react";
import { useField } from "formik";

type OptionValue = string | number;

type FormikSelectOption = {
    label: string;
    value: OptionValue;
};

type FormikSelectProps = {
    name: string;
    options: FormikSelectOption[];
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    subtitle?: string;
};

const FormikSelect = (props: FormikSelectProps) => {
    const { name, options, placeholder, disabled = false, label, subtitle } = props;
    const [field, meta, helpers] = useField(name);

    const items = options.map((option) => ({
        ...option,
        value: String(option.value),
    }));

    const collection = createListCollection({
        items,
    });

    const selectValue = field.value ? [String(field.value)] : [];

    return (
        <VStack align="start" flex={1} width="100%">
            {label && (
                <Text fontSize="sm" fontWeight="medium">
                    {label}
                </Text>
            )}

            <Select.Root
                name={field.name}
                value={selectValue}
                disabled={disabled}
                invalid={!!meta.touched && !!meta.error}
                collection={collection}
                onValueChange={(details) => {
                    const nextValue = Array.isArray(details.value) ? details.value[0] : details.value;
                    helpers.setValue(nextValue ?? "");
                }}
            >
                <Select.Trigger>
                    <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.Positioner>
                    <Select.Content>
                        {items.map((item) => (
                            <Select.Item key={item.value} item={item}>
                                {item.label}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>

            {meta.touched && meta.error && (
                <Text color="red.500" fontSize="sm">
                    {meta.error}
                </Text>
            )}

            {subtitle && (
                <Text fontSize="xs" fontWeight="medium" color="gray.500">
                    {subtitle}
                </Text>
            )}
        </VStack>
    );
};

export default FormikSelect;
