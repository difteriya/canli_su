function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "cart:open_modal": {
      return { ...state, collapsed: true };
    }
    case "cart:close_modal": {
      return { ...state, collapsed: false };
    }
    case "cart:add_item": {
      let _item = state.items[action.payload.id];
      let newItems = {
        ...state.items,
        [action.payload.id]: _item
          ? {
              ...action.payload,
              quantity: _item.quantity + action.payload.quantity
            }
          : action.payload
      };
      localStorage.setItem("canlisu-cart", JSON.stringify(newItems));
      return {
        ...state,
        items: newItems
      };
    }

    case "cart:item_check_quantity": {
      let _item = state.items[action.payload];
      if (_item.quantity > 0) {
      } else {
        _item = { ..._item, quantity: 1 };
      }
      let newItems = { ...state.items, [action.payload]: _item };
      localStorage.setItem("canlisu-cart", JSON.stringify(newItems));

      return { ...state, items: newItems };
    }

    case "cart:item_adjust_quantity": {
      let _item = state.items[action.payload.id];
      let qty =
        action.payload.a === "increase"
          ? parseInt(_item.quantity) + 1
          : parseInt(_item.quantity) - 1;
      let newItems = {
        ...state.items,
        [action.payload.id]: { ..._item, quantity: qty > 0 ? qty : 1 }
      };
      localStorage.setItem("canlisu-cart", JSON.stringify(newItems));
      return {
        ...state,
        items: newItems
      };
    }

    case "cart:item_change_quantity": {
      let _item = state.items[action.payload.id];
      let newItems = {
        ...state.items,
        [action.payload.id]: { ..._item, quantity: action.payload.value }
      };
      localStorage.setItem("canlisu-cart", JSON.stringify(newItems));
      return {
        ...state,
        items: newItems
      };
    }

    case "cart:item_remove": {
      let _items = { ...state.items };
      delete _items[action.payload];

      if (isEmpty(_items)) {
        localStorage.removeItem("canlisu-cart");
      } else {
        localStorage.setItem("canlisu-cart", JSON.stringify(_items));
      }

      return {
        ...state,
        items: _items
      };
    }

    case "cart:clear": {
      localStorage.removeItem("canlisu-cart");
      return {
        ...state,
        items: {}
      };
    }

    case "cart:set_items": {
      localStorage.setItem("canlisu-cart", JSON.stringify(action.payload));
      return {
        ...state,
        items: action.payload
      };
    }
  }
};

export default cartReducer;
