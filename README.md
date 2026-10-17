# steps to deploy be and fe in AWS

1. Sign up on AWS
2. Launch instance
   - choose ubuntu image
   - choose t2.micro instance type (free tier)
   - create a key pair
   - select ssh client 
   - chmod 400 devTinder-secret.pem  on terminal
   - copy the ssh command then it will logged you into the machine

3. install node in your machine and verifyy the exact same versions for which code is working on both fe and be repos
4. git clone of fe and be projects using https links 
    - FrontEnd
      - npm install in fe
      - npm run build in fe
      - sudo apt update
      - sudo apt install nginx
      - sudo systemctl start nginx
      - sudo systemctl enable nginx
      - sudo scp -r dist/* /var/www/html/
      - Enable port :80 on aws instance security group
      - to enble port :80 , go to security groups of aws instance and add inbound rule for port :80 allowing traffic from all ip addresses 0.0.0.0/0
      - now load public ip address of aws instance on browser (http://ip_address/), it should display the frontend of the application 
    - Backend
      - on ec2 instance , npm install
      - allow ec2 instance public IP on mongodb
      - install pm2 globally with npm -> npm install pm2 -g
      - pm2 start npm -- start
      - pm2 logs (to debug the process whether its failed or how the process is failed , basically mostly used for debugging)
      - pm2 flush <log name> (to clear the logs)
      - pm2 list (to list all the processes)
      - pm2 stop <process name> (to stop the process)
      - pm2 delete <process name> (to delete the process)
      - pm2 start npm --name "process name" -- start (add a custom name to the process)
      - sudo nano /etc/nginx/sites-available/default
      - add nginx config on that file and replace server_name with your ec2 public ip address
      - exit from nginx and restart nginx -> sudo systemctl restart nginx
      - modify the BASE_URL in FE to /api
       
FE - http://3.111.34.211

NGINX Config 

server_name 3.111.34.211;

location /api/ {
    proxy_pass http://localhost:3000/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}