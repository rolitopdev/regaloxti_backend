const app = require('./app');
const sequelize = require('./config/db');

// Verificar conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('[REGALOXTI_BACKEND] 🎁​: Conexión a la base de datos establecida correctamente. ✅');
    })
    .catch((err) => {
        console.error('[REGALOXTI_BACKEND] 🎁​: Error al conectar a la base de datos ❌:', err);
    });

// Iniciar servidor de Express
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`[REGALOXTI_BACKEND] 🎁​: Servidor corriendo en http://localhost:${PORT}`);
});