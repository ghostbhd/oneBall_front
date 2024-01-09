FROM node:20
RUN     mkdir back-end
COPY ./ ./back-end
RUN chmod +x ./back-end/script.sh
EXPOSE 3009
CMD ["./back-end/script.sh","bash"]
