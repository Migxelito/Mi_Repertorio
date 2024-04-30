const http = require("http");
const url = require("url");
const { insertar, consultar, editar, eliminar } = require("./consultas");
const { errores } = require("./errores");
const fsPromises = require("fs/promises");

const PORT = 3000;
http
    // Servidor
    .createServer(async (req, res) => {
        if (req.url == "/" && req.method === "GET") {
            res.writeHead(200, { "content-type": "text/html" });
            try {
                const html = await fsPromises.readFile("./www/index.html", "utf8");
                res.end(html);
            } catch (error) {
                errores(error, res);
            };
            // Requisito I
        } else if (req.url == "/cancion" && req.method == "POST") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                try {
                    const bodyObj = JSON.parse(body);
                    console.log('bodyObj :>> ', bodyObj);
                    const datos = Object.values(bodyObj);
                    try {
                        await insertar(datos);
                        res.writeHead(201);
                        res.end();
                    } catch (error) {
                        errores(error, res);
                    }
                } catch (error) {
                    errores(error, res);
                }
            });
            // Requisito II
        } else if (req.url == "/canciones" && req.method === "GET") {
            try {
                res.writeHead(200, { "content-type": "application/json" });
                const registros = await consultar();
                //Envia canciones a la tabla canciones
                res.end(JSON.stringify(registros.rows));
            } catch (error) {
                errores(error, res);
            };
            // Requisito III
        } else if (req.url == "/cancion" && req.method == "PUT") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                try {
                    const datos = Object.values(JSON.parse(body));
                    try {
                        res.writeHead(201, { "content-type": "application/json" });
                        const respuesta = await editar(datos);
                        res.end(JSON.stringify(respuesta));
                    } catch (error) {
                        errores(error, res);
                    }
                } catch (error) {
                    errores(error, res);
                }
            });
            // Requisito IV
        } else if (req.url.startsWith("/cancion") && req.method == "DELETE") {
            const { id } = url.parse(req.url, true).query;
            try {
                await eliminar(id);
                res.writeHead(201);
                res.end();
            } catch (error) {
                errores(error, res);
            };
            // Else que cierra el IF
        } else {
            res.writeHead(404);
            res.end("Recurso no encontrado");
        }
    })
    .listen(PORT, () => console.log(`Iniciando servidor en puerto ${PORT}`));