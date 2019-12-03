
 export class DecisionOfTheDirectorOfTheCommission {
    id: number;
    
	buildingCode: string;
	schoolAddress: string;
	sectionCenter: number;
	village: number;
	educationalAdministration: number;
	previewDate: Date;
	startDate: Date;
	endDate: Date;
	text: string;
	constructor(arg?: DecisionOfTheDirectorOfTheCommission) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
