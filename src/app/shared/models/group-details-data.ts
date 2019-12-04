
 export class GroupDetailsData {
    id: number;
    project: string;
	buildingType: number;
	offeringType: number;
	bidNumber: string;
	group: string;
	educationalAdministration: number;
	durationImplementationInMonths: string;
	constructor(arg?: GroupDetailsData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
