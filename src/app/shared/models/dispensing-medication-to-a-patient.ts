
 export class DispensingMedicationToAPatient {
    id: number;
    
	doctorCode: string;
	patientCode: string;
	day: Date;
	drugCode: string;
	number: string;
	pharmacistCode: string;
	notes: string;
	doctorName: string;
	patientName: string;
	pharmacistName: string;
	drugName: string;
	constructor(arg?: DispensingMedicationToAPatient) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
