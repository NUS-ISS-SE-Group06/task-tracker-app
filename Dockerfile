# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY public /app/public
COPY src /app/src
RUN npm run build

# Production Stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY public /app/public
COPY src /app/src
# Expose the port the app runs on
EXPOSE 3000
CMD ["npm", "start"]
