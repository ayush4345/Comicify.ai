## Setup instructions for a new instance

Start a new instance, ssh and do the following:

```
sudo apt update
sudo apt upgrade
sudo apt-get install python3-pip lsof libgl1-mesa-glx git
pip install --upgrade pip virtualenv
git config --global pull.rebase false
```

Clone the repo and install requirements

```
git clone https://github.com/ayush4345/Comicify.ai.git
cd Comicify.ai/server/
virtualenv flask
source flask/bin/activate
pip install -r requirements.txt
pip install gunicorn python-dev
```

Add keys

`vi .env`

Test run the server

`gunicorn -b :5000 --timeout=200 main:app`

Add certificate. Copy the `fullchain` and `privkey` contents from an existing server.

```
sudo vi fullchain.pem
sudo vi privkey.pem
```

Troubleshooting, in case files cant be written

```
ls -la ./privkey.pem
sudo chmod 777 ./privkey.pem
ls -la ./fullchain.pem
sudo chmod 777 ./fullchain.pem
```

Test run the server along with the certificate

`gunicorn --keyfile ./privkey.pem --certfile ./fullchain.pem -b :5000 --timeout=200 main:app`

Create a service for the server. Copy the contents from an existing server.

```
sudo vi /etc/systemd/system/comicify.service
sudo systemctl daemon-reload
sudo systemctl enable comicify
sudo systemctl start comicify
sudo systemctl status comicify
```

Redeploying script

```
cd Comicify.ai/server/
source flask/bin/activate
git pull origin main
sudo systemctl stop comicify
sudo systemctl daemon-reload
sudo systemctl enable comicify
sudo systemctl start comicify
sudo systemctl status comicify
```
