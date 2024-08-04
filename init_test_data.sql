CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('OPEN', 'ORDERED'))
);

CREATE TABLE cart_items (
    cart_id UUID REFERENCES carts(id),
    product_id UUID,
    count INTEGER
);

INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', '123e4567-e89b-12d3-a456-426614174000', '2023-01-01', '2023-01-01', 'OPEN'),
    ('550e8400-e29b-41d4-a716-446655440001', '123e4567-e89b-12d3-a456-426614174001', '2023-01-02', '2023-01-02', 'ORDERED');
   
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', '1e7a6b6e-9c77-4c4a-bee2-5934fdc63b6b', 2),
    ('550e8400-e29b-41d4-a716-446655440000', '4b7e3b4b-7a2d-4d5e-8b3d-5a7e4e9c5d76', 1),
    ('550e8400-e29b-41d4-a716-446655440001', '123e4567-e89b-12d3-a456-426614174004', 5);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (id, title, description, price)
VALUES
  ('1e7a6b6e-9c77-4c4a-bee2-5934fdc63b6b', 'Product 1', 'Description for product 1', 10.00),
  ('4b7e3b4b-7a2d-4d5e-8b3d-5a7e4e9c5d76', 'Product 2', 'Description for product 2', 20.00),
  ('123e4567-e89b-12d3-a456-426614174004', 'Product 3', 'Description for product 3', 30.00);