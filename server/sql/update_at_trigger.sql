-- Function to update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Trigger for the users table
CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Trigger for the policy table
CREATE OR REPLACE FUNCTION set_policy_expiration_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.expirationDate := NEW.created_at + INTERVAL '1 year';
    NEW.updated_at = now(); -- Update the updated_at column
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_policy_expiration_date_trigger
BEFORE INSERT OR UPDATE ON policy
FOR EACH ROW
EXECUTE PROCEDURE set_policy_expiration_date();

-- Trigger for the payment table
CREATE TRIGGER update_payment_modtime
BEFORE UPDATE ON payment
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();