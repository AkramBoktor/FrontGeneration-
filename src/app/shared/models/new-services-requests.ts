
 export class NewServicesRequests {
    id: number;
    
	applicationDate: Date;
	entityName: number;
	schoolName: string;
	governorate: number;
	centerOrSection: number;
	landArea: number;
	structuralRatio: number;
	floorsNumber: number;
	receiptNumber: string;
	receiptDate: Date;
	serviceType: number;
	buildingCode: string;
	orderNumber: string;
	constructor(arg?: NewServicesRequests) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
