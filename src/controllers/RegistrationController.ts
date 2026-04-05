import { type Request, type Response } from 'express';
import { RegistrationService } from '../services/RegistrationService.js';

const registrationService = new RegistrationService();

export class RegistrationController {

    async getAll(req: Request, res: Response) {
        try {
            const registrations = await registrationService.getAllRegistrations();
            res.render('index', { registrations }); 
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Помилка при отриманні даних' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const {client_name, client_surname, phone, class_id } = req.body;
            await registrationService.registerClient({
                client_name,
                client_surname,
                phone,
                class_id: parseInt(class_id)
            });
            res.redirect('/'); 
        } catch (error: any) {
            res.render('form', { error: error.message });
        }
    }

    async showAddForm(req: Request, res: Response) {
        res.render('form'); 
    }
    async showEditForm(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id as string);
            const registrations = await registrationService.getAllRegistrations();
            const registration = registrations.find(r => r.id === id);
    
            if (!registration) {
                return res.status(404).send("Запис не знайдено");
            }
    
            res.render('update', { registration });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    async updatePhone(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id as string);
            const { phone } = req.body;
            
            await registrationService.changeClientPhone(id, phone);
            
            res.redirect('/'); 
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id as string);
            await registrationService.deleteRegistration(id);
            res.redirect('/');
        } catch (error: any) {
            res.status(500).send("Помилка: " + error.message);
        }
    }
}