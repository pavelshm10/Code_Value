export interface Product {
    ID: number; //(number, unique
    Name: string;  //(string, up to 30 characters, mandatory)
    Description: string; //(string, up to 200 characters, optional)
    Price: number; //(number, larger than zero, mandatory)
    Creation_Date: string; //(Date, mandatory)
    url: string;
}

