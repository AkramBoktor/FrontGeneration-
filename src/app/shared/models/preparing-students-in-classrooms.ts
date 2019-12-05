
 export class PreparingStudentsInClassrooms {
    id: number;
    
	buildingCode: string;
	periodNumber: number;
	stage: number;
	classroom: number;
	teamsNumber: number;
	studentsKind: number;
	girlsNumber: number;
	boysNumber: number;
	total: number;
	totalRecorded: number;
	constructor(arg?: PreparingStudentsInClassrooms) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
