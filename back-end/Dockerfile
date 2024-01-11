FROM node:20
RUN     mkdir back-end
WORKDIR /back-end
COPY . ./
RUN chmod +x ./script.sh
EXPOSE 3009
CMD ["./script.sh","bash"]
