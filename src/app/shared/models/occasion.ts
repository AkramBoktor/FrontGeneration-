
 export class Occasion {
    id: number;
    
	employeeCode: string;
	eventType: number;
	startDate: Date;
	startTime: Date;
	expiryDate: Date;
	endTime: Date;
	missionPurpose: string;
	missionIssuer: number;
	exchangedEmployeeNumber: string;
	restDate: Date;
	constructor(arg?: Occasion) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
