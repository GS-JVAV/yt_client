# 设置基础镜像
FROM yt
# 定义作者
MAINTAINER 1sMe
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
#COPY dist/  /usr/share/nginx/html/
#COPY default.conf /etc/nginx/default.conf

# 将前端dist文件中的内容复制到nginx目录
COPY dist/  /usr/share/nginx/html/
# 覆盖镜像的Nginx配置
COPY nginx.conf /usr/share/nginx/nginx.conf

RUN echo 'echo yt client init ok!!'

