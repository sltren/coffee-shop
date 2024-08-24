import { memo } from 'react';
import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
  NumberInput,
  NumberInputField,
  Checkbox,
} from '@chakra-ui/react';
import { CoffeeType } from '../../types/coffee.type';
import { Customization } from '../../types/customization.type';
import { OrderInput } from '../../types/order.type';

interface OrderSelectionProps {
  coffeeTypes: CoffeeType[];
  customizations: Customization[];
  expandedCoffeeType: string | null;
  order: OrderInput;
  toggleCoffeeType: (coffeeType: string) => void;
  handleInputChange: (name: string, value: string | number) => void;
  handleCustomizationChange: (name: string, quantity: number) => void;
  addOrder: () => void;
}

export const OrderSelection = memo(({
  coffeeTypes,
  customizations,
  expandedCoffeeType,
  order,
  toggleCoffeeType,
  handleInputChange,
  handleCustomizationChange,
  addOrder,
}: OrderSelectionProps) => {
  return (
    <Box>
      {coffeeTypes.map((type) => (
        <Box key={type.name} w="100%">
          <Button
            w="100%"
            onClick={() => toggleCoffeeType(type.name)}
            colorScheme={expandedCoffeeType === type.name ? "teal" : "gray"}
            mb={2}
            data-cy={`button-${type.name}`}
          >
            {type.name}
          </Button>
          {expandedCoffeeType === type.name && (
            <VStack spacing={4} mb={2} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
              <FormControl>
                <FormLabel>Size</FormLabel>
                <RadioGroup name="size" value={order.size} onChange={(value) => handleInputChange('size', value)}>
                  <HStack spacing={4} justifyContent='space-between'>
                    <Radio value="small" data-cy="small">small</Radio>
                    <Radio value="medium" data-cy="medium">medium</Radio>
                    <Radio value="large" data-cy="large">large</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  min={1}
                  value={order.quantity}
                  onChange={(value) => handleInputChange('quantity', parseInt(value))}
                >
                  <NumberInputField h={6} data-cy="quantity" />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Customizations</FormLabel>
                {customizations.map((customization) => (
                  <HStack key={customization.name} spacing={4} mt={2} justifyContent='space-between'>
                    <Checkbox
                      isChecked={order.customizations.some(c => c.name === customization.name)}
                      onChange={(e) =>
                        handleCustomizationChange(customization.name, e.target.checked ? 1 : 0)
                      }
                      data-cy={`checkbox-${customization.name}`}
                    >
                      {customization.name}
                    </Checkbox>
                    {order.customizations.some(c => c.name === customization.name) && (
                      <NumberInput
                        min={0}
                        value={
                          order.customizations.find((c) => c.name === customization.name)?.quantity || 0
                        }
                        onChange={(value) =>
                          handleCustomizationChange(customization.name, parseInt(value))
                        }
                      >
                        <NumberInputField h={6} data-cy={`quantity-${customization.name}`}/>
                      </NumberInput>
                    )}
                  </HStack>
                ))}
              </FormControl>
              <Button colorScheme="teal" onClick={addOrder} data-cy="add-order" >
                Add to Order
              </Button>
            </VStack>
          )}
        </Box>
      ))}
    </Box>
  );
});
