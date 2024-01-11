FROM node:20
RUN mkdir front-end
COPY . ./front-end
EXPOSE 5173
RUN chmod 777 ./front-end/script.sh
CMD ["./front-end/script.sh", "bash"]
