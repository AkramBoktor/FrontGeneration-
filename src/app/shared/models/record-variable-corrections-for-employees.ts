
 export class RecordVariableCorrectionsForEmployees {
    id: number;
    
	correctionNumber: string;
	incomingMonth: Date;
	employeeCode: string;
	benefitsMonth: Date;
	correctionCode: number;
	noteNumber: string;
	basicaSalary: string;
	valuableEfforts: string;
	incentiveValue: string;
	extraValue: string;
	bonusValue: string;
	constructor(arg?: RecordVariableCorrectionsForEmployees) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
