#!/bin/bash

echo "🚀 KiroMusic Deployment Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
npm install --prefix backend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install --prefix frontend

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Compile contracts
echo -e "${BLUE}🔨 Compiling smart contracts...${NC}"
npx hardhat compile

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Contracts compiled${NC}"
else
    echo -e "${RED}❌ Contract compilation failed${NC}"
    exit 1
fi
echo ""

# Run tests
echo -e "${BLUE}🧪 Running tests...${NC}"
npx hardhat test

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Tests passed${NC}"
else
    echo -e "${RED}⚠️  Some tests failed${NC}"
fi
echo ""

# Ask for deployment network
echo "Select deployment network:"
echo "1) Local (Hardhat)"
echo "2) Sepolia Testnet"
echo "3) Skip deployment"
read -p "Enter choice (1-3): " network_choice

case $network_choice in
    1)
        echo -e "${BLUE}🌐 Starting local Hardhat network...${NC}"
        npx hardhat node &
        HARDHAT_PID=$!
        sleep 5
        
        echo -e "${BLUE}📝 Deploying contracts to local network...${NC}"
        npx hardhat run scripts/deploy.js --network localhost
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Contracts deployed to localhost${NC}"
        else
            echo -e "${RED}❌ Deployment failed${NC}"
            kill $HARDHAT_PID
            exit 1
        fi
        ;;
    2)
        if [ -z "$PRIVATE_KEY" ]; then
            echo -e "${RED}❌ PRIVATE_KEY environment variable not set${NC}"
            echo "Please set your private key: export PRIVATE_KEY=your_key"
            exit 1
        fi
        
        echo -e "${BLUE}📝 Deploying contracts to Sepolia...${NC}"
        npx hardhat run scripts/deploy.js --network sepolia
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Contracts deployed to Sepolia${NC}"
        else
            echo -e "${RED}❌ Deployment failed${NC}"
            exit 1
        fi
        ;;
    3)
        echo "Skipping contract deployment"
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac
echo ""

# Build frontend
echo -e "${BLUE}🎨 Building frontend...${NC}"
npm run build --prefix frontend

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend built${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi
echo ""

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Start backend: npm run dev --prefix backend"
echo "2. Start frontend: npm run dev --prefix frontend"
echo "3. Visit: http://localhost:5173"
echo ""
