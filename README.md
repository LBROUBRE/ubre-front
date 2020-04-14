# ubre-front
Aquí voy a describir los pasos a seguir para desplegar el front-end en cualquier ordenador:

Primero instalamos el instalador de paquetes npm utilizando nvm
```
curl https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

Recarga la terminal y comprueba que nvm está correctamente instalado con 
```
nvm --version
```

Ahora instalamos npm
```
nvm install --lts
```

Por último instalamos nuestro repositorio:
```
npm install -g @ionic/cli native-run cordova-res
git clone https://github.com/LBROUBRE/ubre-front.git
cd ubre-front
npm install
ionic serve 
```
se nos desplegará la aplicación en: http://localhost:8100
