
 export class PrivateCenterData {
    id: number;
    
	centralCode: string;
	name: string;
	phoneNumber: string;
	government: number;
	sectionCenter: number;
	village: number;
	address: string;
	educationalAdminstration: number;
	centerOwnerName: string;
	iDNumber: string;
	issuer: string;
	responsibleManagerName: string;
	constructor(arg?: PrivateCenterData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
