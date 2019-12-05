
 export class NewServiceRequest {
    id: number;
    
	orderDate: Date;
	governorate: number;
	department: number;
	entityName: string;
	landArea: number;
	structuralRatio: number;
	floorsNumber: number;
	schoolName: string;
	receiptNumber: string;
	receiptDate: Date;
	constructor(arg?: NewServiceRequest) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
