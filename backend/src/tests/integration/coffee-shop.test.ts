import request from 'supertest';
import { OrderModel } from '../../models/order.model';
import { CoffeeModel } from '../../models/coffee.model';
import { CustomizationModel } from '../../models/customization.model';
import { setupTestServer, teardownTestServer, setupDatabase, teardownDatabase } from '../utils/test-setup';

describe('Integration test: coffee shop', () => {
  let testHost: any;
  let testPort: any;
    
  beforeAll(async () => {
    await setupDatabase();
    const { testPort: port, testHost: host } = await setupTestServer();
    testPort = port;
    testHost = host;
  });
    
  afterAll(async () => {
    await teardownDatabase();
    await teardownTestServer();
  });

  beforeEach(async () => {
    await OrderModel.deleteMany({});
    await CoffeeModel.deleteMany({});
    await CustomizationModel.deleteMany({});

    await CoffeeModel.create({ name: 'espresso', prices: { small: 2, medium: 2.5, large: 3 } });
    await CoffeeModel.create({ name: 'latte', prices: { small: 3, medium: 3.5, large: 4 } });
    await CustomizationModel.create({ name: 'sugar', price: 0.5 });
    await CustomizationModel.create({ name: 'milk', price: 0.6 });
    await CustomizationModel.create({ name: 'caramel', price: 0.8 });
  })

  describe('should verify coffee types and customizations and create an order', () => {
    it('should fetch all coffee types', async () => {
      const GET_COFFEE_TYPES_QUERY = `
      query GetCoffeeTypes {
          getCoffeeTypes {
          name
          prices {
              small
              medium
              large
          }
          }
      }
      `;

      const response = await request(`http://${testHost}:${testPort}`)
        .post('/graphql')
        .send({ query: GET_COFFEE_TYPES_QUERY });

        expect(response.body.data.getCoffeeTypes).toHaveLength(2);
        expect(response.body.data.getCoffeeTypes[0].name).toBe('espresso');
        expect(response.body.data.getCoffeeTypes[1].name).toBe('latte');
    });

    it('should fetch all customizations', async () => {
      const GET_CUSTOMIZATIONS_QUERY = `
      query GetCustomizations {
          getCustomizations {
              name
              price
          }
      }
      `;

      const response = await request(`http://${testHost}:${testPort}`)
        .post('/graphql')
        .send({ query: GET_CUSTOMIZATIONS_QUERY });

        expect(response.body.data.getCustomizations).toHaveLength(3);
        expect(response.body.data.getCustomizations[0].name).toBe('sugar');
        expect(response.body.data.getCustomizations[1].name).toBe('milk');
        expect(response.body.data.getCustomizations[2].name).toBe('caramel');
    });

    it('should create new orders', async () => {
      const PLACE_ORDERS_MUTATION = `
        mutation PlaceOrders($orders: [CoffeeOrderInput!]!) {
          placeOrders(orders: $orders) {
            id
            coffeeType
            size
            quantity
            customizations {
              name
              quantity
              price
            }
            totalPrice
          }
        }
      `;

      const variables = {
        orders: [
          {
            coffeeType: 'espresso',
            size: 'small',
            quantity: 1,
            customizations: [
              { name: 'sugar', quantity: 2 },
              { name: 'milk', quantity: 1 }
            ],
          },
          {
            coffeeType: 'latte',
            size: 'medium',
            quantity: 2,
            customizations: [
              { name: 'caramel', quantity: 1 }
            ],
          },
        ],
      };

      const response = await request(`http://${testHost}:${testPort}`)
        .post('/graphql')
        .send({ query: PLACE_ORDERS_MUTATION, variables });

        expect(response.body.data.placeOrders).toHaveLength(2);
        expect(response.body.data.placeOrders[0].coffeeType).toBe('espresso');
        expect(response.body.data.placeOrders[1].coffeeType).toBe('latte');
    });
  });
});