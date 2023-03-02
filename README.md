# ProjetSyntheseSIM
Programme de jeu d'échec automatisé





Pour lancer le serveur:
source piApp/env/bin/activate
gunicorn --bind 0.0.0.0:8000 --worker-class eventlet -w 1 app:app
