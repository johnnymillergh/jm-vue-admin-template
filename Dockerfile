# production stage
FROM nginx
# copy compiled static resources to the directory that NGINX proxies
COPY dist/ /usr/share/nginx/html/
# copy custom NGINX configuration to cover its default one
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
