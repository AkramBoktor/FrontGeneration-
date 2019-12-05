
 export class BankSalary {
    id: number;
    
	select: number;
	employeeCode: string;
	bankCode: number;
	bank: string;
	accountNumber: string;
	constructor(arg?: BankSalary) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
