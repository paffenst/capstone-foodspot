FROM openjdk:17
EXPOSE 8080
ADD backend/target/foodspot.jar foodspot.jar
CMD [ "sh", "-c", "java -jar /foodspot.jar"]