import { RegistrationRepository, type Registration } from '../repositories/RegistrationRepository.js';

export class RegistrationService {
    private repo = new RegistrationRepository();

    async getAllRegistrations() {
        return await this.repo.readAll();
    }

    async getAvailableClasses() {
        return await this.repo.getAllClasses();
    }

    async registerClient(data: Registration) {
        if (!data.client_name || data.client_name.length < 2) {
            throw new Error("Ім'я занадто коротке");
        }
        
        if (!data.client_surname || data.client_surname.length < 2) {
            throw new Error("Прізвище занадто коротке");
        }

        if (!data.phone || data.phone.length < 10) { 
            throw new Error("Номер телефону занадто короткий або відсутній");
        }

        if (!data.class_id) {
            throw new Error("Не обрано тип тренування");
        }

        return await this.repo.create(data);
    }

    async changeClientPhone(id: number, newPhone: string): Promise<void> {
        if (!newPhone || newPhone.length < 10) {
            throw new Error("Номер телефону занадто короткий");
        }
        await this.repo.updatePhone(id, newPhone);
    }

    async deleteRegistration(id: number) {
        return await this.repo.delete(id);
    }
}