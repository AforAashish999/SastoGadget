import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import ProductCard from '../Components/ProductCard'
import { products } from '../data/productData'
import { useParams } from 'react-router-dom'
   
export default function ProductCategory() {
  const {id, subId, itemId} = useParams();
  
  //filtering
  const filteredProducts = products.filter( (product) => {
    if(itemId) {
      return product.itemId === itemId;
    }
    else if (subId){
      return product.subId === subId;  
    }
    else{
      return product.categoryId === id;
    }
  })
  return (
    <div className='flex flex-col  '>
    
      <Breadcrumb />
      <ProductCard products={filteredProducts}  />
     
    </div>
  )   
}

//logic of working routes finally =>

  /*
  Step 1 – Where /product-category/... comes from

That part of the URL is defined by your <Route> in App.jsx:

<Route path="/product-category/:id/:subId?/:itemId?" element={<ProductCategory />} />


That means:

The base URL must start with /product-category/

Then React Router expects dynamic parts:
:id, :subId (optional), and :itemId (optional)

So this route tells React Router:

“Hey, whenever someone goes to any URL that starts with /product-category/,
load the ProductCategory page.”

🧭 Step 2 – How that URL is created

The URL isn’t magic — it’s made by you, inside your app, in this file:

👉 Header2.jsx

You have this:

<Link to={`/product-category/${category.id}`}>
  {category.name}
</Link>


And also for subcategories:

<Link to={`/product-category/${category.id}/${sub.id}`}>
  {sub.name}
</Link>


And for items:

<Link to={`/product-category/${category.id}/${sub.id}/${item.id}`}>
  {item.name}
</Link>


So when a user clicks those links:

React Router updates the URL in the browser (e.g. /product-category/electronic-devices/powerbanks-batteries)

Then it loads the same page (ProductCategory), but now with new params.

⚙️ Step 3 – How useParams() reads from that URL

When the page loads, useParams() looks at the route pattern and the actual URL:

Route pattern:

/product-category/:id/:subId?/:itemId?


Actual URL:

/product-category/electronic-devices/powerbanks-batteries/powerbanks


React Router automatically matches:

id = "electronic-devices"
subId = "powerbanks-batteries"
itemId = "powerbanks"

🔁 Step 4 – Flow diagram

Here’s a simplified data flow:

User clicks in Header2.jsx
        ↓
<Link to="/product-category/electronic-devices/powerbanks-batteries/powerbanks">
        ↓
Browser URL becomes: /product-category/electronic-devices/powerbanks-batteries/powerbanks
        ↓
React Router finds matching Route
<Route path="/product-category/:id/:subId?/:itemId?" ... />
        ↓
Loads <ProductCategory />
        ↓
useParams() extracts { id, subId, itemId }
        ↓
Filters products based on those values
        ↓
Passes filtered list to <ProductCard />
        ↓
ProductCard displays only relevant products

🧠 In short:
Piece	Role
<Link to="...">	Creates the URL
<Route path="...">	Defines what component to show for that URL
useParams()	Reads the values (like electronic-devices) from the URL
Filter logic	Uses those values to show correct products

*/





//*****************************************************************************************
//CORE CONCEPT

//header 2 sends to product category or header 2 creates an url and thus that the product category
//  and the created URL is same thus product category works???

/*
Header2 does not directly send you to ProductCategory.
Instead, it creates a URL — and React Router detects that URL and decides which component to load.

⚙️ Step-by-step:
🧩 Step 1 – Header2 creates the URL
<Link to={`/product-category/${category.id}/${sub.id}/${item.id}`}>
  Powerbanks
</Link>


This doesn’t “call” or “open” ProductCategory directly —
it just changes the browser’s address bar to something like:

/product-category/electronic-devices/powerbanks-batteries/powerbanks


So, Header2 → only creates the correct URL.

🧭 Step 2 – React Router sees that URL

In your App.jsx, you have:

<Route path="/product-category/:id/:subId?/:itemId?" element={<ProductCategory />} />


React Router constantly watches the URL.
When the URL matches this pattern →
it automatically renders the <ProductCategory /> component.

So, React Router acts like a “traffic police” —
when the address is /product-category/...,
it says “OK, load ProductCategory!”

⚙️ Step 3 – ProductCategory runs

Now that it’s loaded, it runs:

const { id, subId, itemId } = useParams();


to get the actual values from the URL
(like id = electronic-devices, subId = powerbanks-batteries, etc.)

Then it filters your product data and passes it to <ProductCard />.
*/