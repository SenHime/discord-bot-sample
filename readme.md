# Utilisation du bot
Le but de ce code est donner un exemple de code de bot Discord basique
Il contient le code de base recommandé par la documentation de Discord.js, en plus de quelques commandes pour aller un peu plus loin :
- "last_topics" : lit le flux RSS d'un forum Forumactif (peut facilement être adapté avec un autre flux RSS ou une autre API)
- "register_character" : enregiste un personnage lié à l'utilisateur (démontre l'utilisation d'une base de données en arrière-plan)
- "use_character" : permet de poster un message avec le personnage enregistré (démontre l'utilisation des webhooks)

## Installation / pré-requis
- Installation de NodeJS : https://nodejs.org/en
- Installation des librairies : `npm install`
- Initialisation de la base de données (création des tables) : `node init-database.js`

## Configuration
Documentation officielle de Discord.js : https://discordjs.guide/#before-you-begin
- Création d'une application sur le portail développeur de Discord : https://discord.com/developers/applications
- Création d'un bot associé à l'application
- Création du fichier config.json avec les informations utilisées pour le bot et les commandes : https://discordjs.guide/creating-your-bot/#using-config-json
```
{
	"token": "",
	"clientId": "",
	"guildId": "",
	"forum": "",
	"database": "botdatabase.db"
}
```
- `token` : Token du bot (disponible sur le portail développeur), utilisé pour connecter le bot
- `clientId` : ID de l'application, utilisé pour mettre à jour les commandes du bot
- `guildId` : ID du serveur Discord de test, utilisé pour mettre à jour les commandes dans un serveur spécifique avant déploiement global
- `forum` : URL du forum (Forumactif) utilisé par la commande "last_topics" (ex: "https://blankthemerpg.forumactif.com")
- `database` : Nom de la DB SQLite

## Lancer le bot
- `node index.js`

## Ajouter le bot sur un serveur
Instructions : https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links

Pour les commandes présentées ici, la permission "manage webhooks" est nécessaire

## Mettre à jour les commandes disponibles sur un serveur spécifique
À utiliser pour tester les commandes avant un déploiement global :
- `node deploy-commands.js`

## Mettre à jour les commandes disponibles sur tous les serveurs
À utiliser pour déployer les commandes de façon globale :
- `node global-deploy-commands.js`