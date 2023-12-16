import { Injectable } from '@angular/core';
import { Order } from '../models/orders-admin';
import { Slot } from '../models/slots-admin';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderUserService {
  private slots: Slot[] = [];
  private orders: Order[] = [
    {
      orderId: 1,
      maked: false,
      price: 25.99,
      datetime: new Date(),
      dishes: [
        {
          id: 3,
          name: 'Mushroom Risotto',
          description: 'Creamy mushroom risotto with Arborio rice.',
          image: 'https://example.com/mushroom-risotto.jpg',
          price: 14.99,
          category: 'first',
          attributes: ['vegetarian'],
          visible: false,
        },
        {
          id: 4,
          name: 'BBQ Chicken Pizza',
          description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
          image: 'https://example.com/bbq-chicken-pizza.jpg',
          price: 16.99,
          category: 'second',
          attributes: [],
          visible: false,
        }
      ]
    },
    {
      orderId: 2,
      maked: false,
      price: 25.99,
      datetime: new Date(),
      dishes: [
        {
          id: 3,
          name: 'Mushroom Risotto',
          description: 'Creamy mushroom risotto with Arborio rice.',
          image: 'https://example.com/mushroom-risotto.jpg',
          price: 14.99,
          category: 'first',
          attributes: ['vegetarian'],
          visible: false,
        },
        {
          id: 4,
          name: 'BBQ Chicken Pizza',
          description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
          image: 'https://example.com/bbq-chicken-pizza.jpg',
          price: 16.99,
          category: 'second',
          attributes: [],
          visible: false,
        }
      ]
    },
    {
      orderId: 3,
      maked: true,
      price: 30.5,
      datetime: new Date(),
      dishes: [
        {
          id: 1,
          name: 'Caesar Salad',
          description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
          image: 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg',
          price: 9.99,
          category: 'appetizer',
          attributes: ['vegetarian'],
          visible: true,
        },
        {
          id: 2,
          name: 'Grilled Salmon',
          description: 'Grilled salmon fillet served with lemon butter sauce.',
          image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
          price: 18.99,
          category: 'first',
          attributes: ['lactose'],
          visible: false,
        }
      ]
    }
  ];

  constructor() { }

  getOrderById(orderId: number): Observable<Order> {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      return of(order);
    } else {
      return of();
    }
  }
  

  getAvailableSlots(): Observable<Slot[]> {
    const availableSlots = this.slots.filter(slot => slot.actual < slot.limitSlot);
    return of(availableSlots);
  }
  
}
