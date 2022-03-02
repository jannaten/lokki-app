FROM centos:centos8


#Install java inside docker container
RUN yum install -y \
    java-1.8.0-openjdk \
    java-1.8.0-openjdk-devel
ENV JAVA_HOME /etc/alternatives/jre

# How to build: docker build --rm=true -t localization-service:1.0 .
MAINTAINER Masood Ahmadi


# Install node 14:
#RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash - && yum install -y gcc-c++ make nodejs && yum clean all
RUN groupadd -g 432 node && useradd -u 432 -g 432 node; for i in `find / -perm /6000 -type f`; do chmod a-s $i; done

# Add the source code to the container and build it:
COPY localization-rest/target/localization-rest-0.0.1.jar  /app/localization-rest/localization-rest-0.0.1.jar 
COPY  localization-rest/application.properties /app/localization-rest/application.properties


# Build localization-rest (actual server):
CMD cd app/localization-rest && java -jar localization-rest-0.0.1.jar


