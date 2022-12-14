# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
  - URL -> **/api/product**
  - METHOD -> **[ GET ]**
- Show 
  - URL -> **/api/product/:id**
  - METHOD -> **[ GET ]**
- Create [token required]
    - URL -> **/api/product**
    - METHOD -> **[ POST ]**
-   - body -> **{ name: string , price: number }**


#### Users
- sing up

  - URL -> **/api/signup**
  - METHOD -> **[ POST ]**
  - body -> **{ email: string , first_name: string, last_name: string , password:string }**
- log in
  - URL -> **/api/login**
  - METHOD -> **[ POST ]**
  - body -> **{ email: string , password:string }**

- Index [token required]
  - URL -> **/api/user**
  - METHOD -> **[ GET ]**
- Show [token required]
  - URL -> **/api/user/:id**
  - METHOD -> **[ GET ]**

#### Orders
- Current Order by user (args: user id)[token required]
  - URL -> **/api/order**
  - METHOD -> **[ GET ]**

#### Cart

- GET user cart [token required]
  
  - URL -> **/api/cart**
  - METHOD -> **[ GET ]**

- ADD product to cart [token required]
  
  - URL -> **/api/cart**
  - METHOD -> **[ POST ]**
  - body -> **{ product_id: number , quantity : number }**

- UPDATE product in user cart [token required]

  - URL -> **/api/cart**
  - METHOD -> **[ PATCH ]**
  - body -> **{ product_id: number , quantity : number }**

- DELETE product from user cart [token required]

  - URL -> **/api/cart**
  - METHOD -> **[ DELETE ]**
  - body -> **{ product_id: number }**

- Checkout [token required]
  - URL -> **/api/cart/checkout**
  - METHOD -> **[ POST ]**
## Data Shapes
#### Product

- id
- name
- price

#### User

- id
- email
- firstName
- lastName
- password

#### Orders

- id
- user id
- status

#### order_products

- user id
- product id (for each product there is an entry)
- quantity

#### cart

- user id
- product id
- quantity
