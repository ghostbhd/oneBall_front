FROM node:20
RUN mkdir front-end
WORKDIR /front-end
COPY . ./
EXPOSE 5173
RUN chmod +x ./script.sh
CMD ["./script.sh", "bash"]
