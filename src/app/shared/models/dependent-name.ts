
 export class DependentName {
    id: number;
    
	employeeCode: string;
	relationshipType: number;
	name: string;
	birthDate: Date;
	constructor(arg?: DependentName) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
