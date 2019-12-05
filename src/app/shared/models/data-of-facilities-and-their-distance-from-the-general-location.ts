
 export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation {
    id: number;
    
	landCode: string;
	facilityCode: string;
	facilityName: string;
	facilityDimension: string;
	notes: string;
	constructor(arg?: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
