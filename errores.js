const errores = (errores, res) => {
    console.log('error :>> ', errores);
    res.writeHead(500);
    res.end("Oops!! ha sucedido un error");
};

module.exports = {
    errores
};