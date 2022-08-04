# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route : '/products' [GET]
- Show route : '/products/:id' [GET]
- Create route : '/products' [POST] [token required]

#### Users

- Index route : '/users' [GET] [token required]
- Show route : '/users/:id' [GET] [token required]
- Create route : '/users' [POST] [token required]

#### Orders

- Current Order by user (args: user id) : '/orders/:id' [GET] [token required]

## Data Shapes

#### Product

|    id    |     name     |    price    |
| :------- | :----------- | :---------- |
| `number` |   `string`   |   `number`  |

#### User

|    id    |  first_name  |  last_name  |  password  | 
| :------- | :----------- | :---------- | :--------- |
| `number` |   `string`   |   `string`  |  `string`  |

#### Orders

|    id    |   order_id   |   quantity  |   user_id  |   status   |
| :------- | :----------- | :---------- | :--------- | :--------- |
| `number` |   `string`   |   `string`  |  `string`  |  `string`  |

#### Database tables

- Products (id SERIAL PRIMARY KEY, name VARCHAR(100), price INTEGER)
- Users (id SERIAL PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), password VARCHAR(100))
- Orders (id SERIAL PRIMARY KEY, product_id INTEGER REFERENCES products(id), quantity INTEGER, user_id INTEGER REFERENCES users(id), status VARCHAR(10))
