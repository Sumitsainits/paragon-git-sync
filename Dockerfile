FROM node:18

WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
