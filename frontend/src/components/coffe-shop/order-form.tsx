import { memo } from 'react';
import {
  Box,
  Text,
  Button,
  Divider,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { OrderSelection } from './order-selection';
import { OrderSummary } from './order-summary';
import { useOrderHandlers } from './use-order-handlers';

export const OrderForm = memo(() => {
 const { 
    coffeeLoading, 
    customLoading, 
    coffeeError, 
    customError, 
    scrollStyles, 
    coffeeData, 
    customData, 
    expandedCoffeeType, 
    order, 
    toggleCoffeeType, 
    handleInputChange, 
    handleCustomizationChange, 
    addOrder, 
    selectedItems, 
    removeOrder, 
    handleOrders 
  } = useOrderHandlers();

  if (coffeeLoading || customLoading) return <Text>Loading...</Text>;
  if (coffeeError || customError) return <Text>Error loading data</Text>;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" h="100vh" display="flex" flexDirection="column">
      <Heading as="h1" size="lg" mb={4} textAlign='center'>Coffee Shop</Heading>
      <Flex direction="column" flex="1" overflow="hidden">
        <Box flex="1" overflowY="auto" mb={4} sx={scrollStyles}>
        <OrderSelection
            coffeeTypes={coffeeData?.getCoffeeTypes || []}
            customizations={customData?.getCustomizations || []}
            expandedCoffeeType={expandedCoffeeType}
            order={order}
            toggleCoffeeType={toggleCoffeeType}
            handleInputChange={handleInputChange}
            handleCustomizationChange={handleCustomizationChange}
            addOrder={addOrder}
          />
          <Divider my={4} />
          <OrderSummary
            selectedItems={selectedItems}
            removeOrder={removeOrder}
          />
        </Box>
        <Button type="submit" colorScheme="teal" onClick={handleOrders} isDisabled={selectedItems.length === 0} data-cy="place-order">
          Place Order
        </Button>
      </Flex>
    </Box>
  );
});

