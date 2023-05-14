require('dotenv').config()

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.API_URL;
const serviceRoleKey = process.env.SERVICE_ROLE_KEY;

// Create a Supabase client
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Create a new user
const createUser = async (email, password) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (error) {
    console.error('Error creating user:', error);
  } else {
    console.log('User created:', data);
    return data;
  }
};

// Sign in a user
const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    console.error('Error signing in:', error);
  } else {
    console.log(data);
    return data;
  }
};

// Delete a user
const deleteUser = async (userId) => {
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Error deleting user:', error);
  } else {
    console.log('User deleted:', data);
    return data;
  }
};

// Test the functions
const testUserActions = async () => {
  const email = 'example@example.com';
  const password = 'example-password';

  // Create a user
  console.log("create user")
  const user = await createUser(email, password);

  // Sign in the user
  console.log("login user")
  await signInUser(email, password);

  // Delete the user
  console.log("delete user")
  await deleteUser(user.user.id);
};

testUserActions();

