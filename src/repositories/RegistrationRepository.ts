import { pool } from '../db.js';

export interface Registration {
    id?: number;
    client_name: string;
    client_surname: string;
    phone: string;
    class_id: number;
    class_name?: string;
}

export interface TrainingClass {
    id: number;
    name: string;
    intensity: string;
}
export class RegistrationRepository {

    async create(data: Registration): Promise<void> {
        const query = `
            INSERT INTO registrations (client_name, client_surname, phone, class_id) 
            VALUES ($1, $2, $3, $4)
        `;
        await pool.query(query, [data.client_name, data.client_surname, data.phone, data.class_id]);
    }

    async readAll(): Promise<Registration[]> {
        const query = `
            SELECT r.*, c.name as class_name 
            FROM registrations r 
            LEFT JOIN training_classes c ON r.class_id = c.id
            ORDER BY r.id ASC
        `;
        const res = await pool.query(query);
        return res.rows;

    }
    async getAllClasses(): Promise<TrainingClass[]> {
        const query = 'SELECT * FROM training_classes ORDER BY id ASC';
        const res = await pool.query(query);
        return res.rows;
    }

    async updatePhone(id: number, newPhone: string): Promise<void> {
        const query = `
            UPDATE registrations 
            SET phone = $1 
            WHERE id = $2
        `;
        await pool.query(query, [newPhone, id]);
    }
    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM registrations WHERE id = $1', [id]);
    }
}