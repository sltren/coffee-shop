import { memo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Text,
  Button,
  Divider,
  Flex,
  Heading,
  useToast,
  useStyleConfig,
} from '@chakra-ui/react';
import { GET_COFFEE_TYPES, GET_CUSTOMIZATIONS } from '../../graphql/queries';
import { PLACE_ORDERS } from '../../graphql/mutations';
import { CoffeeType } from '../../types/coffee.type';
import { Customization } from '../../types/customization.type';
import { OrderInput, PlaceOrdersData, PlaceOrdersVariables } from '../../types/order.type';
import { OrderSelection } from './order-selection';
import { OrderSummary } from './order-summary';

export const OrderForm = memo(() => {
  const { loading: coffeeLoading, error: coffeeError, data: coffeeData } = useQuery<{ getCoffeeTypes: CoffeeType[] }>(GET_COFFEE_TYPES);
  const { loading: customLoading, error: customError, data: customData } = useQuery<{ getCustomizations: Customization[] }>(GET_CUSTOMIZATIONS);
  const [placeOrders] = useMutation<PlaceOrdersData, PlaceOrdersVariables>(PLACE_ORDERS);
  
  const [selectedItems, setSelectedItems] = useState<OrderInput[]>([]);
  const [expandedCoffeeType, setExpandedCoffeeType] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderInput>({
    coffeeType: '',
    size: 'small',
    quantity: 1,
    customizations: [],
  });

  const toast = useToast();
  const scrollStyles = useStyleConfig("Scroll");

  const toggleCoffeeType = (coffeeType: string) => {
    if (expandedCoffeeType === coffeeType) {
      setExpandedCoffeeType(null);
    } else {
      setOrder({
        coffeeType,
        size: 'small',
        quantity: 1,
        customizations: [],
      });
      setExpandedCoffeeType(coffeeType);
    }
  };

  const handleInputChange = (name: string, value: string | number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleCustomizationChange = (name: string, quantity: number) => {
    setOrder((prevOrder) => {
      const existingCustomization = prevOrder.customizations.find(c => c.name === name);
      if (existingCustomization) {
        if (quantity === 0) {
          return {
            ...prevOrder,
            customizations: prevOrder.customizations.filter(c => c.name !== name),
          };
        } else {
          return {
            ...prevOrder,
            customizations: prevOrder.customizations.map(c =>
              c.name === name ? { ...c, quantity } : c
            ),
          };
        }
      } else {
        return {
          ...prevOrder,
          customizations: [...prevOrder.customizations, { name, quantity }],
        };
      }
    });
  };

  const addOrder = () => {
    setSelectedItems((prevItems) => [...prevItems, order]);
    setOrder({
      coffeeType: '',
      size: 'small',
      quantity: 1,
      customizations: [],
    });
    setExpandedCoffeeType(null);
  };

  const removeOrder = (index: number) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      toast({
        title: "No items in order",
        description: "Please add items to your order before placing it.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const { data } = await placeOrders({ variables: { orders: selectedItems } });
      const totalPrice = data?.placeOrders.reduce((sum: number, order) => sum + order.totalPrice, 0);
      toast({
        title: 'Order placed.',
        description: `Your orders have been placed successfully. Total Price: $${totalPrice?.toFixed(2)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log('Orders placed:', data?.placeOrders);
      setSelectedItems([]);
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to place orders. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error placing orders:', error);
    }
  };

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

