const multer = require("multer");

const subirArchivos = (req, res) => {
  const almacenamiento = multer.memoryStorage();
  const subida = multer({
    storage: almacenamiento,
    limits: {
      //campos a recibir
      fields: 1,
      //peso del archivo
      fileSize: 60000,
      //cantidad de archivos a subir
      files: 1,
      //cuantos tipos de informacion se va a subir
      //tipos de campos
      parts: 2,
    },
  });
  subida.single("archivo")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: err.msg });
    } else if (!req.body.name) {
      return res
        .status(400)
        .json({ msg: "no especifico el nombre del archivo" });
    }
  });
  let nombreDelArchivo = req.body.name;

  //dependiendo de donde se quiera almacenar el archivo 
  //ejemplo: base de datos 
};
