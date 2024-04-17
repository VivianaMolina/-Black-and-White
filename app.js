import express from 'express';
const app = express();
import Jimp from 'jimp';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`)
});

app.use(express.static("assets"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get("/imagen", async (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg')
    const { userImagen } = req.query;
    try {
        const imagen = await Jimp.read(`${userImagen}`)
        const imgId = uuidv4().slice(0,6);
        const rutaImagen = path.join(__dirname, "assets/img", `imagen_${imgId}.jpeg`);
        await imagen
            .resize(350, Jimp.AUTO)
            .greyscale()
            .writeAsync(rutaImagen);

            const imagenData = fs.readFileSync(rutaImagen)
            res.send(imagenData)

    } catch (err) {
        console.log(err)
    }

});