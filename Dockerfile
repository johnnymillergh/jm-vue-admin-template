# inspired by https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html#Real-World-Example
# use multi-stage builds: https://docs.docker.com/develop/develop-images/multistage-build/

# 1 build stage
# 1.1 prepare for building front-end project
FROM node:10 as build-stage

# 1.2 make the 'app' folder the current working directory
WORKDIR /app

# 1.3 copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json ./
COPY package-lock.json ./

# 1.4 install project dependencies
RUN npm install

# 1.5 copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# 1.6 get ENV arguement
ARG ENV
RUN echo ${ENV}

# 1.7 build static resources
RUN npm run build:${ENV} --scripts-prepend-node-path=auto

# 2 publishing stage
# 2.1 publish static resouces
FROM nginx as publishing-stage

# 2.2 copy compiled static resources to the directory that NGINX proxies
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

# 2.3 copy custom NGINX configuration to cover its default one
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 2.4 expose port
EXPOSE 80

# 2.5 start NGINX
CMD ["nginx", "-g", "daemon off;"]
