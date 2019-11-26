
 export class JobPlacementOfTheDepartmentsOfTheBody {
    id: number;
    
	centralAdministration: number;
	subAdministration: number;
	departmentEmployee: string;
	jobDwellingonthem: number;
	analgesiaDate: Date;
	constructor(arg?: JobPlacementOfTheDepartmentsOfTheBody) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
