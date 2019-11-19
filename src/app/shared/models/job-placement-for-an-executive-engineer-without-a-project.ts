
 export class JobPlacementForAnExecutiveEngineerWithoutAProject {
    id: number;
    
	branchCode: number;
	department: number;
	employeeCode: string;
	jobDwellingonThem: number;
	hiringdate: Date;
	constructor(arg?: JobPlacementForAnExecutiveEngineerWithoutAProject) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
