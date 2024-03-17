-- Insert into users
INSERT INTO users (firstName, lastName, phone, email, password) VALUES
('Terre', 'Nator', '6666666666', 'conchadetumadress@example.com', 'hashed_password_here'),
('John', 'Doe', '5555555555', 'example@example.com', 'hashed_password_here');

-- Insert into policy
-- This assumes you have the userIds. Adjust the policy details as needed, including status and expirationDate.
INSERT INTO policy (userId, type, address, coordinates, status, expirationDate) VALUES
((SELECT id FROM users WHERE email = 'conchadetumadress@example.com'), 'Home Insurance', '123 Main St, Anytown, USA', '{"lat": 40.7128, "long": -74.0060}', 1, '2025-01-01'),
((SELECT id FROM users WHERE email = 'example@example.com'), 'Car Insurance', '456 Elm St, Anycity, USA', '{"lat": 37.7749, "long": -122.4194}', 2, '2025-01-01');

-- Insert into payment
-- Adjust the payment type to either 'card' or 'wallet' and include the amount.
INSERT INTO payment (userId, type, paymentDetails, amount) VALUES
((SELECT id FROM users WHERE email = 'conchadetumadress@example.com'), 'card', '{"method": "credit card", "card_number": "xxxx-xxxx-xxxx-1234"}', 99.99),
((SELECT id FROM users WHERE email = 'example@example.com'), 'wallet', '{"method": "mobile wallet", "provider": "PayApp"}', 1199.88);
