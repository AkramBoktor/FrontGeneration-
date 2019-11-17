
 export class AdditionalMission {
    id: number;
    
	employeeCode: string;
	centralAdministration: number;
	subAdministration: number;
	totalExtraWork: string;
	eveningTotalWorkingHour: string;
	constructor(arg?: AdditionalMission) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
