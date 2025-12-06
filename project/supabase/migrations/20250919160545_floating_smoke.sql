/*
  # Create Admin Users

  1. Admin Management
    - Insert default admin users
    - Set up proper roles and permissions
    - Ensure secure password hashing

  2. Usage Instructions
    - How to create new admin users
    - How to update admin permissions
    - How to deactivate admin users
*/

-- Insert default admin user (you can modify these details)
INSERT INTO admins (
  email,
  password_hash,
  full_name,
  role,
  is_active
) VALUES (
  'admin@wotecentralsda.org',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- This is 'admin123' hashed
  'System Administrator',
  'super_admin',
  true
);

-- Insert additional admin users (customize as needed)
INSERT INTO admins (
  email,
  password_hash,
  full_name,
  role,
  is_active
) VALUES 
(
  'pastor@wotecentralsda.org',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- This is 'admin123' hashed
  'Pastor Michael Johnson',
  'admin',
  true
),
(
  'secretary@wotecentralsda.org',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- This is 'admin123' hashed
  'Church Secretary',
  'editor',
  true
);

/*
  HOW TO CREATE NEW ADMIN USERS:

  1. Using SQL (Recommended for initial setup):
  
  INSERT INTO admins (
    email,
    password_hash,
    full_name,
    role,
    is_active
  ) VALUES (
    'newemail@wotecentralsda.org',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Change this password hash
    'New Admin Name',
    'admin', -- Options: 'super_admin', 'admin', 'editor'
    true
  );

  2. Password Hashing:
  - The password hash above is for 'admin123'
  - For production, generate proper bcrypt hashes
  - Use online bcrypt generators or Node.js bcrypt library
  - Example: bcrypt.hash('your_password', 10)

  3. Admin Roles:
  - super_admin: Full access to everything
  - admin: Can manage most content and users
  - editor: Can manage content but limited user access

  4. To Update Admin:
  
  UPDATE admins 
  SET 
    full_name = 'Updated Name',
    role = 'super_admin',
    is_active = true
  WHERE email = 'admin@wotecentralsda.org';

  5. To Deactivate Admin:
  
  UPDATE admins 
  SET is_active = false 
  WHERE email = 'admin@wotecentralsda.org';

  6. To Change Password:
  
  UPDATE admins 
  SET password_hash = '$2a$10$NEW_HASH_HERE' 
  WHERE email = 'admin@wotecentralsda.org';

  SECURITY NOTES:
  - Always use strong passwords
  - Hash passwords with bcrypt (cost factor 10+)
  - Regularly review admin access
  - Deactivate unused accounts
  - Use unique emails for each admin
*/