
 export class IncubationProgram {
    id: number;
    
	buildingNumber: string;
	buildingName: string;
	department: number;
	village: number;
	followed: number;
	streetName: string;
	phoneNumber: number;
	landOwnership: number;
	buildingOwnership: number;
	usePosition: number;
	admissionAge: string;
	coordinates: number;
	constructor(arg?: IncubationProgram) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
