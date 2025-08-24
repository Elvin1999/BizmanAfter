import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('bizman.db');

        await db.execAsync(`
                CREATE TABLE IF NOT EXISTS clients (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    phone TEXT,
                    email TEXT
                )
            `);
    }
};

export const insertClient = async (name: string, phone: string, email: string, callback: () => void) => {
    await db?.execAsync(`
            INSERT INTO clients (name,phone,email)
            VALUES ("${name}","${phone}","${email}")
        `);
    callback();
};

export const getClients=async(callback:(rows:any[])=>void)=>{
    const result=await db?.getAllAsync('SELECT * FROM clients');
    callback(result || []);
};
