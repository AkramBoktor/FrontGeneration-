
 export class MedicalExaminationForm {
    id: number;
    
	diagnosis: string;
	diseaseCode: number;
	examinationType: number;
	examinationDate: Date;
	patientName: string;
	patientCode: string;
	doctorName: string;
	doctorCode: string;
	constructor(arg?: MedicalExaminationForm) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
