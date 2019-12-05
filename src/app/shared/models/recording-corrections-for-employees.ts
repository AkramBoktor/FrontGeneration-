
 export class RecordingCorrectionsForEmployees {
    id: number;
    
	employeeCode: string;
	employeeStatus: number;
	incomingNumber: string;
	incomingMonthAndYear: Date;
	noteCode: number;
	noteMonth: Date;
	value: string;
	constructor(arg?: RecordingCorrectionsForEmployees) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
