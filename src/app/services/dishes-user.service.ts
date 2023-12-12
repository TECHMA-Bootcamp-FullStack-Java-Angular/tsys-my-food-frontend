import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DishAdmin } from '../models/dish-admin';

@Injectable({
  providedIn: 'root'
})
export class DishesUserService {

  private dishes: DishAdmin[] = [
    {
      id: 1,
      name: 'Caesar Salad',
      description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
      image: 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg',
      price: 9.99,
      category: 'appetizer',
      attributes: ['vegetarian'],
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      description: 'Grilled salmon fillet served with lemon butter sauce.',
      image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
      price: 18.99,
      category: 'first',
      attributes: ['lactose'],
    },
    {
      id: 3,
      name: 'Mushroom Risotto',
      description: 'Creamy mushroom risotto with Arborio rice.',
      image: 'https://chefmunne.com/wp-content/uploads/2020/06/riso-micro.jpg',
      price: 14.99,
      category: 'first',
      attributes: ['vegetarian'],
    },
    {
      id: 4,
      name: 'BBQ Chicken Pizza',
      description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 16.99,
      category: 'second',
      attributes: [],
    },
    {
      id: 5,
      name: 'Chocolate Fondue',
      description: 'Rich chocolate fondue served with strawberries and marshmallows.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 12.99,
      category: 'dessert',
      attributes: ['nuts'],
    },
    {
      id: 6,
      name: 'Shrimp Scampi',
      description: 'Shrimp sautéed in garlic and white wine sauce, served over linguine.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 20.99,
      category: 'second',
      attributes: [],
    },
    {
      id: 7,
      name: 'Vegetable Stir-Fry',
      description: 'Assorted vegetables stir-fried in a savory sauce, served with rice.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 15.99,
      category: 'second',
      attributes: ['vegan', 'vegetarian'],
    },
    {
      id: 8,
      name: 'Key Lime Pie',
      description: 'Refreshing key lime pie with a graham cracker crust.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 8.99,
      category: 'dessert',
      attributes: ['vegetarian'],
    },
    {
      id: 9,
      name: 'Crispy Calamari',
      description: 'Crispy fried calamari rings served with marinara sauce.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 13.99,
      category: 'appetizer',
      attributes: [],
    },
    {
      id: 10,
      name: 'Beef Tacos',
      description: 'Spicy beef tacos with shredded lettuce, cheese, and salsa.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 11.99,
      category: 'first',
      attributes: [],
    },
    {
      id: 11,
      name: 'Lemon Sorbet',
      description: 'Light and tangy lemon sorbet served in a chilled bowl.',
      image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
      price: 7.99,
      category: 'dessert',
      attributes: ['vegan', 'vegetarian'],
    },
  ];
  private dishesSubject = new BehaviorSubject<DishAdmin[]>(this.dishes);

  getDishes() {
    return this.dishesSubject.asObservable();
  }

}
