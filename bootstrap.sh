apt-get update -y -q
apt-get install git -y -q
apt-get install curl -y -q
curl -sL https://deb.nodesource.com/setup | sudo bash
apt-get install nodejs -y -q
apt-get install build-essential -y -q
npm install hotnode -g
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 -y -q
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update -y -q
apt-get install mongodb-server -y -q