export interface Menu {
    id: number;
    categoryAppetizer: number;
    categoryFirst: number;
    categorySecond: number;
    categoryDessert: number;
    visible: boolean;
    price: number;
}


export interface MenuUser {
  id:number;
  appetizer: {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    category: string,
    visible: boolean
  },
  first: {
    id: number,
    name: string,
    description: string,
    image: string,
    price: 0,
    category: string,
    visible: boolean
  },
  second: {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    category: string,
    visible: boolean
  },
  dessert: {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    category: string,
    visible: true
  },
  visible: boolean
  price : number;
}
  export interface MenuUserNew {
    appetizer: {
      id: number,
      name: string,
      description: string,
      image: string,
      price: number,
      category: string,
      visible: boolean
    },
    first: {
      id: number,
      name: string,
      description: string,
      image: string,
      price: 0,
      category: string,
      visible: boolean
    },
    second: {
      id: number,
      name: string,
      description: string,
      image: string,
      price: number,
      category: string,
      visible: boolean
    },
    dessert: {
      id: number,
      name: string,
      description: string,
      image: string,
      price: number,
      category: string,
      visible: true
    },
    visible: boolean
    price : number;
  }

