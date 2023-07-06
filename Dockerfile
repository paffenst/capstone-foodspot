FROM openjdk:17

EXPOSE 8080

MAINTAINER Pavel Stoyanov <pavel.angelov.stoyanov@gmail.com>

ADD backend/target/foodspotters.jar foodspotters.jar

CMD [ "sh", "-c", "java -jar /foodspotters.jar" ]