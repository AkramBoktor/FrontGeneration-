
 export class BuildingValidityCertificate {
    id: number;
    
	buildingCode: string;
	schoolAddress: string;
	sectionCenter: number;
	village: number;
	educationalAdministration: number;
	previewDate: Date;
	startDate: Date;
	endDate: Date;
	validityPosition: number;
	educationValidity: number;
	statementType: string;
	text: string;
	constructor(arg?: BuildingValidityCertificate) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
