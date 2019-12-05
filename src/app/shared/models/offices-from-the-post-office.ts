
 export class OfficesFromThePostOffice {
    id: number;
    
	postOfficeReceiptYear: Date;
	governorate: number;
	iD: string;
	officeNmae: string;
	constructor(arg?: OfficesFromThePostOffice) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
