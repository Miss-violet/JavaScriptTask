FROM 192.168.250.75:5000/nginx
COPY ./dist /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/nginx.conf
ARG CONT_IMG_VER
ENV CONT_IMG_VER ${CONT_IMG_VER:-dev}
LABEL VERSION=$CONT_IMG_VER
RUN echo $CONT_IMG_VER