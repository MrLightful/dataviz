FROM node:20-alpine AS development-dependencies-env
# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate
COPY . /app
WORKDIR /app
RUN pnpm install

FROM node:20-alpine AS production-dependencies-env
# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --prod

FROM node:20-alpine AS build-env
# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm build

FROM node:20-alpine
# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["pnpm", "start"]