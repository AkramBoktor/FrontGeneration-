
 export class CashFormAllowance {
    id: number;
    
	formRegistrationDate: Date;
	requestingArea: number;
	formSerial: string;
	buildingCode: string;
	formStatus: string;
	formName: string;
	sectionNumber: string;
	sectionName: string;
	jobNumber: number;
	workTypeNumber: string;
	businessTypeName: string;
	formDate: Date;
	numberIssuedRequestingArea: string;
	budgetDate: Date;
	netAbstract: string;
	constructor(arg?: CashFormAllowance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
