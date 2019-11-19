
 export class TerminationOfTheEmployee'sJobPlacement {
    id: number;
    
	branchCode: number;
	employeeCode: string;
	department: number;
	jobDwellingonthem: number;
	analgesiaDate: Date;
	endAnalgesiaDate: Date;
	constructor(arg?: TerminationOfTheEmployee'sJobPlacement) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
