import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const qtyToAdd = newItem.qty && Number(newItem.qty) > 0 ? Number(newItem.qty) : 1; // 🟩 added: support for custom qty

      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.qty += qtyToAdd; // 🟠 fixed: use qtyToAdd not 1
      } else {
        state.items.push({ ...newItem, qty: qtyToAdd }); // 🟠 fixed: store product with qty
      }

      state.totalQty += qtyToAdd; // 🟠 fixed
      state.totalPrice += (newItem.price || 0) * qtyToAdd; // 🟠 fixed
    },

    removeFromCart(state, action) {
      const removeItem = action.payload; // expected: { id } 🟠 fixed payload structure
      const existingItem = state.items.find((item) => item.id === removeItem.id);

      if (existingItem) {
        state.totalQty -= existingItem.qty;
        state.totalPrice -= existingItem.price * existingItem.qty;
        state.items = state.items.filter((item) => item.id !== removeItem.id);
      }
    },

    increaseQty(state, action) {
      const { id, amount = 1 } = action.payload; // 🟩 added support for amount
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += amount;
        state.totalQty += amount;
        state.totalPrice += existingItem.price * amount;
      }
    },

    decreaseQty(state, action) {
      const { id, amount = 1 } = action.payload; // 🟩 added support for amount
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.qty > amount) {
          existingItem.qty -= amount;
          state.totalQty -= amount;
          state.totalPrice -= existingItem.price * amount;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
          state.totalQty -= existingItem.qty;
          state.totalPrice -= existingItem.price * existingItem.qty;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;


/*
✅ What you understood correctly

initialState is the starting Redux slice (empty cart).

dispatch(addToCart(product)) creates an action whose payload is the product object.

Inside the reducer action.payload becomes newItem (the product you clicked).

The reducer should check if that newItem already exists in state.items by id.

If it exists, increase its qty; otherwise push a new object with qty: 1.

Finally update the totalQty and totalPrice aggregates.
*********************************************************************************************************
Step 1: What is state.items?

From your initialState:

const initialState = {
  items: [],   // array of all items currently in cart
  totalQty: 0,
  totalPrice: 0,
};


So state.items is an array that holds every item in your cart.
Each item looks like this:

{
  id: 1,
  name: "Dumbbell Set",
  price: 1500,
  qty: 2,
  image: "image.jpg"
}

🔹 Step 2: What is newItem?

From your reducer:

const newItem = action.payload;


That means whenever you call:

dispatch(addToCart(product));


→ The product you pass becomes action.payload.

So newItem is the product the user just clicked “Add to Cart” on.

Example:

const newItem = {
  id: 1,
  name: "Dumbbell Set",
  price: 1500,
  image: "image.jpg"
};
Step 3: What .find() does

.find() is an array method in JavaScript that searches an array and returns the first element that matches the given condition.

Syntax:

array.find((element) => condition)


It checks each element of the array until the condition is true.
If it finds one → returns that object.
If it doesn’t → returns undefined.

🔹 Step 4: Applying it here
state.items.find((item) => item.id === newItem.id)


✅ Meaning in plain English:

“Search inside my cart’s items array and find the first item whose id matches the id of the new item I’m trying to add.”

🧠 Example

Let’s say your cart already has:

state.items = [
  { id: 1, name: "Dumbbell Set", price: 1500, qty: 2 },
  { id: 2, name: "Yoga Mat", price: 800, qty: 1 }
];


Now user clicks Add to Cart on this product:

newItem = { id: 1, name: "Dumbbell Set", price: 1500 }


👉 What happens:

const existingItem = state.items.find((item) => item.id === newItem.id);


Here’s how JavaScript runs it:

Takes the first element { id: 1, ... }

Checks: 1 === 1 → ✅ true
So it stops searching.

Returns that whole object { id: 1, name: "Dumbbell Set", ... }

So now:

existingItem = { id: 1, name: "Dumbbell Set", price: 1500, qty: 2 };

🔹 Step 5: Why this matters

Now Redux knows:

The item already exists in the cart (because .find() returned an object).

So instead of pushing a duplicate, we just do:

existingItem.qty += 1;


If .find() returns undefined, it means the item wasn’t in the cart, so we add it new:

state.items.push({ ...newItem, qty: 1 });

********************************88
MY MISTAKE AND UNDERSTNADING, =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.....=>>>>>>>>>>>>>>>>=>>>>>>>>>>>>>>.=>>>>>>>>
reducers: {
  addToCart(state, action) {
    const newItem = action.payload;
    const existingItem = state.items.find((items) => id === items.id);

    if (existingItem) {
      existingItem += existingItem;
    } else {
      existingItem =+ newItem.push([...items] qty: +1),
    },
    totalQty = existingItem + newItem,
    totalPrice = existingItem.price + newItem.price,
  },
}

🚨 Let’s find and fix issues
❌ 1. id is not defined here
const existingItem = state.items.find((items) => id === items.id);


There is no variable called id in this function.

✅ Correct:

const existingItem = state.items.find((item) => item.id === newItem.id);


Why?
You want to check if the cart already has this new product, so you compare the IDs.

❌ 2. You can’t modify the existingItem like this
existingItem += existingItem;


👉 This line doesn’t make sense in Redux.
existingItem is an object, not a number or string — you can’t just add it to itself.

✅ Correct:

existingItem.qty += 1;


Why?
We just want to increase the quantity of that product in the cart, not merge objects.

❌ 3. This part is completely invalid JavaScript
existingItem =+ newItem.push([...items] qty: +1),


A few problems here:

push() is used on arrays, not on single items.

=+ is not valid syntax (it’s like existingItem = +something — converts to number).

[...items] qty: +1 is not valid object syntax.

✅ Correct version:

state.items.push({ ...newItem, qty: 1 });


Why?

{ ...newItem } copies all product info (id, name, price, etc.)

qty: 1 sets initial quantity for that new product.

push() adds this new object into the items array inside Redux state.

❌ 4. Wrong way to handle totals
totalQty = existingItem + newItem;
totalPrice = existingItem.price + newItem.price;


👉 Problem:

You never declared totalQty or totalPrice here.

They should come from state.totalQty and state.totalPrice.

And their values should update numerically, not add entire objects.

✅ Correct version:

state.totalQty += 1;
state.totalPrice += newItem.price;


Why?

Every time you add something, total quantity increases by 1.

And total price increases by that item’s price.


MY MISTAKE AND UNDERSTNADING, =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.....=>>>>>>>>>>>>>>>>=>>>>>>>>>>>>>>.=>>>>>>>>
addToCart(state, action) {
  const newItems = action.payload;
  const existingItem = state.items.find((items) => items.id = newItems.id);

  if(existingItem){
    existingItem.totalQty +=1;
  } else{
    state.items.push([...newItems: qty: 1])
  }
  totalQty += 1;
  totalPrice += newItems.price;
}
What’s wrong (line-by-line)

(items) => items.id = newItems.id

= is assignment, not comparison. This sets items.id to newItems.id and returns that value — wrong and dangerous.

Use comparison ===: (item) => item.id === newItems.id.

Parameter naming & clarity

Use singular names inside callbacks: (item) => ... (not items) to avoid confusion.

existingItem.totalQty += 1

existingItem is a product object in the cart and should have a qty field (convention). totalQty belongs to the slice (state.totalQty), not each item.

Correct: existingItem.qty += 1;

state.items.push([...newItems: qty: 1]) is invalid syntax

[...] creates an array; you want to push an object.

Use object spread: state.items.push({ ...newItems, qty: 1 }).

totalQty += 1; totalPrice += newItems.price;

These are missing the state. prefix. You must update the slice: state.totalQty += 1; state.totalPrice += newItems.price;

=>>>>>>>>>>>>>>>>>>>>>>>>>>>..CONCEPT OF QTY= >>>>>>>>>>>>>>>>>>
⚙️ 3. Inside the reducer: first time adding

When the reducer runs this part:

const existingItem = state.items.find((item) => item.id === newItem.id);


state.items is empty at the start (the cart is empty).

So existingItem will be undefined.

Then this code runs:

state.items.push({ ...newItem, qty: 1 });


That’s where qty is added for the first time.

You’re not using the qty field from productData.js —
you’re creating it here dynamically inside Redux.

So now, your Redux state looks like this:

state = {
  items: [
    {
      id: 1,
      name: "Powerbank 10000mAh",
      price: 1950,
      image: "...",
      qty: 1, // ✅ this field was added inside the reducer
    }
  ],
  totalQty: 1,
  totalPrice: 1950
}

🔁 4. Next time the same product is added

If you again click “Add to Cart” for the same product,
then existingItem will be found in state.items.

So this line runs:

existingItem.qty += 1;


Now Redux updates that same item’s quantity:

qty: 2


and increases the total price and total quantity.

🧠 Summary: why you don’t need qty in productData.js
Concept	Where it lives	Why
product (name, price, image)	productData.js	The base catalog — info about items you sell
qty	Inside Redux cart slice (state.items)	Tracks how many units the user added to their cart

So:

qty is created dynamically by your reducer.

It does not need to exist in your product data file.

The reducer adds and manages it inside the cart state.


*************
🛠️ Initial State (Before any item is added)

When your app first runs, your Redux cart slice might look like this:

state = {
  items: [],       // empty cart
  totalQty: 0,     // total number of all items
  totalPrice: 0,   // total price of all items
};

🛒 After clicking “Add to Cart” for the first time

Say you click “Add to Cart” for this product:

{
  id: 1,
  name: "Powerbank 10000mAh",
  price: 1950,
  image: "p1.jpg"
}


👉 Redux checks:

const existingItem = state.items.find(item => item.id === newItem.id);


Since state.items is empty → existingItem = undefined

So reducer adds:

state.items.push({ ...newItem, qty: 1 });


and updates totals:

state.totalQty += 1;
state.totalPrice += newItem.price;


✅ Now your Redux state becomes:

state = {
  items: [
    {
      id: 1,
      name: "Powerbank 10000mAh",
      price: 1950,
      image: "p1.jpg",
      qty: 1, // <-- dynamically added
    },
  ],
  totalQty: 1,
  totalPrice: 1950,
};

🧩 After clicking “Add to Cart” again for the same product

Now you click again on Add to Cart for the same powerbank.

👉 Redux finds the product:

const existingItem = state.items.find(item => item.id === newItem.id);


✅ It exists, so this code runs:

existingItem.qty += 1;
state.totalQty += 1;
state.totalPrice += newItem.price;


✅ New Redux state:

state = {
  items: [
    {
      id: 1,
      name: "Powerbank 10000mAh",
      price: 1950,
      image: "p1.jpg",
      qty: 2, // increased by 1
    },
  ],
  totalQty: 2,
  totalPrice: 3900, // updated
};
*/
