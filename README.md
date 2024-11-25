# Application MDDAPI
## Installation des outils (Linux) : 

### Java & Maven : 

* Installation de java : `sudo apt install openjdk-21-jdk`

* Télécharger la version de maven 3.9.9 sur le site https://maven.apache.org/download.cgi

* installer maven dans le répertoire /opt : 

`cd ~/Téléchargements`

`unzip apache-maven-3.9.9-bin.zip`

`cd apache-maven-3.9.9-bin/`    

`sudo mv apache-maven-3.9.9 /opt`

* ajouter java & maven au path : 

`gedit ~/.profile`

Ajouter les lignes suivantes en fin de fichier : 

`#java path`

`export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/"`

`#maven path`

`export MAVEN_HOME="/opt/apache-maven-3.8.8/"`

`export M2_HOME="/opt/apache-maven-3.8.8/"`

`export PATH=${M2_HOME}/bin:${PATH}`

### Mysql : 

`sudo apt install mysql-server`

`sudo mysql -u root -p`

`CREATE DATABASE yoga;`

`CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';`

`GRANT ALL ON *.* to 'user'@'localhost';`

Réaliser la combinaison CTRL + D, puis : 

`mysql -u root -p yoga < script.sql`

## Installer API back-end : 

Depuis un terminal ou depuis vscode cloner le dossier distant https://github.com/ZaeRon007/Projet6.git

Monter dans le répertoire : `cd Projet6/back`

Enfin, compilez l'application : `mvn compile`

## Installer API Front-end : 

Monter dans le répertoire : `cd Projet6/front`

Enfin, installez les dépendances de l'application : `npm install`

# Lancer l'application : 

Pour lancer l'application il est nécessaire de démarrer l'API front-end ainsi que le back-end.

## Lancer API back-end : 

`cd Projet6/back`

`mvn spring-boot:run` ou `./launch.sh`

## Lancer API front-end : 

`cd Projet6/front`

`ng serve` ou `./launch.sh`
