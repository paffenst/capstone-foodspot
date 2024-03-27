FROM openjdk:17
EXPOSE 8080
ADD backend/target/foodspotters.jar foodspotters.jar
CMD ["sh", "-c", "java -jar /foodspotters.jar"]