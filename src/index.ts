import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { RegistrationController } from './controllers/RegistrationController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const controller = new RegistrationController();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => controller.getAll(req, res));
app.get('/add', (req, res) => controller.showAddForm(req, res));
app.post('/add', (req, res) => controller.create(req, res));
app.get('/edit-phone/:id', (req, res) => controller.showEditForm(req, res));
app.post('/update-phone/:id', (req, res) => controller.updatePhone(req, res));
app.post('/delete/:id', (req, res) => controller.delete(req, res));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});