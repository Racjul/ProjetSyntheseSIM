# DEPRECATED
# ProjetSyntheseSIM
## Programme de jeu d'échec automatisé

### Pour lancer le serveur:

#### 1. Activer les librairies python:
```bash
pip install -r requirements.txt
```


ou  avec un env:

```bash
source piApp/env/bin/activate
```


#### 2. Démarrer le serveur

```bash
gunicorn --bind 0.0.0.0:8000 --worker-class eventlet -w 1 app:app
```
