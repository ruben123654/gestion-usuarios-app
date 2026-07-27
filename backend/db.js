import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password123',
  port: 5433,
});

// Crear tabla de usuarios automáticamente si no existe
const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(queryText);
    console.log('Tabla "usuarios" verificada/creada con éxito.');
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
};

initDb();