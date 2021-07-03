import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // totalAmount 不變
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // 尋找已經存在重複item的index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // 已存在重複的item
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    // 若存在
    if (existingCartItem) {
      // 先淺拷貝現有item, 然後更新amount數值達到重複幾個只變化在amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      // 先拷貝現有state內的item(舊)
      updatedItems = [...state.items];
      // 更新指定位置item的所有值
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // 若不存在，就正常的合併舊值與新值
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItmes;
    // Remove兩個情況 1. 已存在但移除一個就歸零，需移除整個item，用filter篩掉該目標
    if (existingCartItem.amount === 1) {
      updatedItmes = state.items.filter((item) => item.id !== action.id);
    } else {
      // 原有數量大於1個，只須該item的數量-1
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItmes = [...state.items];
      updatedItmes[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItmes,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
