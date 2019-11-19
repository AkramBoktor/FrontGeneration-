
 export class DispensingThePatientsMedicine {
    id: number;
    
	doctorName: string;
	patientName: string;
	date: Date;
	drugCode: string;
	number: string;
	notes: string;
	doctorCode: string;
	patientCode: string;
	constructor(arg?: DispensingThePatientsMedicine) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
