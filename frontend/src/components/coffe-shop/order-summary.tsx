import { memo } from 'react';
import { Box, VStack, HStack, Text, Button, Badge } from '@chakra-ui/react';
import { OrderInput } from '../../types/order.type';

interface OrderSummaryProps {
  selectedItems: OrderInput[];
  removeOrder: (index: number) => void;
}

export const OrderSummary = memo(({ selectedItems, removeOrder }: OrderSummaryProps) => {
  return (
    <Box>
      <Text fontSize="xl" mb={2}>Order Summary</Text>
      {selectedItems.map((order, index) => (
        <Box key={index} borderWidth="1px" borderRadius="lg" p={4} w="100%" bg="gray.50" mb={2}>
          <HStack justifyContent="space-between">
            <Text>Item {index + 1}</Text>
            <Button colorScheme="red" onClick={() => removeOrder(index)} data-cy={`remove-order-${index + 1}`}>
              Remove
            </Button>
          </HStack>
          <Text>Coffee Type: {order.coffeeType}</Text>
          <Text>Size: {order.size}</Text>
          <Text>Quantity: {order.quantity}</Text>
          <Text>Customizations:</Text>
          <VStack gap={0} ml={4} align="start">
            {order.customizations.map((customization, i) => (
              <Text key={i}>
                {customization.name}: {customization.quantity}
              </Text>
            ))}
          </VStack>
        </Box>
      ))}
      <Text>Items in Order: <Badge colorScheme="teal">{selectedItems.length}</Badge></Text>
    </Box>
  );
});
