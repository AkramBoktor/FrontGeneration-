
 export class OperativeSentence {
    id: number;
    
	branchCode: number;
	fileNumber: string;
	entityType: number;
	entityCode: number;
	entityName: string;
	whoIs: number;
	judgmentDate: Date;
	judgmentresult: number;
	statement: string;
	constructor(arg?: OperativeSentence) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
