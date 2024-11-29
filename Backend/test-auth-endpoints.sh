#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

BASE_URL="http://localhost:3000/api"

echo -e "${GREEN}Testing Authentication Endpoints${NC}\n"

# 1. Register a new user
echo -e "${GREEN}1. Testing Registration:${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "Test123!@#",
    "phoneNumber": "+1234567890"
  }')
echo $REGISTER_RESPONSE | json_pp
echo -e "\n"

# Extract token from registration response
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# 2. Login with the registered user
echo -e "${GREEN}2. Testing Login:${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "Test123!@#"
  }')
echo $LOGIN_RESPONSE | json_pp
echo -e "\n"

# 3. Get user profile
echo -e "${GREEN}3. Testing Get Profile:${NC}"
PROFILE_RESPONSE=$(curl -s -X GET "${BASE_URL}/auth/profile" \
  -H "Authorization: Bearer ${TOKEN}")
echo $PROFILE_RESPONSE | json_pp
echo -e "\n"

# 4. Update user profile
echo -e "${GREEN}4. Testing Update Profile:${NC}"
UPDATE_RESPONSE=$(curl -s -X PUT "${BASE_URL}/auth/profile" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John Updated",
    "phoneNumber": "+1987654321"
  }')
echo $UPDATE_RESPONSE | json_pp
echo -e "\n"

# 5. Test invalid login
echo -e "${GREEN}5. Testing Invalid Login:${NC}"
INVALID_LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "wrongpassword"
  }')
echo $INVALID_LOGIN_RESPONSE | json_pp
echo -e "\n"
