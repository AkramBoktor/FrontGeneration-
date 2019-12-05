
 export class RequiredServiceses {
    id: number;
    
	orderNumber: number;
	entityName: number;
	schoolName: string;
	governorate: number;
	centerOrSection: number;
	landArea: number;
	structuralRatio: number;
	floorsNumber: number;
	serviceType: number;
	serviceCode: string;
	serviceName: string;
	advanceRequiredRatio: number;
	applictionDate: Date;
	constructor(arg?: RequiredServiceses) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
