
 export class CodeOfApprovedCompaniesRepresentative {
    id: number;
    
	objectiveCode: string;
	objectiveName: string;
	constructor(arg?: CodeOfApprovedCompaniesRepresentative) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
