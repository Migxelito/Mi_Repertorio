const { pool } = require("./obtienePool");

// Insertar Cancion
const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO cancion (cancion, artista, tono) VALUES ($1, $2, $3)",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console.log(error.code);
        throw error;
    }
};

// Consultar Cancion y Relleno de Tabla de Canciones
const consultar = async () => {
    try {
        const result = await pool.query("SELECT id, cancion, artista, tono FROM cancion ORDER BY id ASC");
        return result;
    } catch (error) {
        console.log(error.code);
        throw error;
    }
};

// Editar Canciones
const editar = async (datos) => {
    const consulta = {
        text: `
        UPDATE cancion SET
        cancion = $2,
        artista = $3,
        tono = $4
        WHERE id = $1 RETURNING *` ,
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Eliminar Canciones
const eliminar = async (id) => {
    const consulta = {
        text: 'DELETE FROM cancion WHERE id = $1',
        values: [id]
    }
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console.log(error.code);
        throw error;
    }
};

// Exportaciones
module.exports = {
    insertar,
    consultar,
    editar,
    eliminar
};