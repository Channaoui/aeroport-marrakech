const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour analyser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dossier pour les fichiers statiques (CSS, images...)
app.use(express.static('public'));

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Tester la connexion MySQL
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL avec succès !');
});

// Route d'accueil test
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du site de l\'Aéroport de Marrakech ✈️');
});

// Exemple de route pour récupérer les vols depuis la base de données
app.get('/api/vols', (req, res) => {
    db.query('SELECT * FROM vols', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});