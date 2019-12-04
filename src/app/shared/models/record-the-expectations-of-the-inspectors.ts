
 export class RecordTheExpectationsOfTheInspectors {
    id: number;
    
	buildingCode: string;
	schoolAddress: string;
	sectionCenter: number;
	village: number;
	educationalAdministration: number;
	previewDate: Date;
	startDate: Date;
	endDate: Date;
	responseNumber: string;
	responseName: string;
	responsibility: number;
	constructor(arg?: RecordTheExpectationsOfTheInspectors) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
