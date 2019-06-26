# Boilerplat-Express-MongoDB-JWT-Api
A boilerplate express api with JWT authentication and MongoDB


## Installation
Clone repository, then run npm install.
```
git clone https://github.com/cmoleka/Barebone-Express-MongoDB-JWT-Api.git <foldername>
npm install
```

## MongoDB Configuration
Create a ```.env``` file within root folder.
Within ```.env``` file enter your ```DB_CONNECTION``` URL and create a ```TOKEN_SECRET``` like the following:
```
DB_CONNECTION = mongodb+srv://<username>:<password>@<hostname>/<database>
TOKEN_SECRET = Abcd123456
```
**Use a hard to guess token_secret**

