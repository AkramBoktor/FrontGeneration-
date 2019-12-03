
 export class ReportOnTheResistanceOfReinforcedConcrete {
    id: number;
    
	buildingCode: string;
	schoolAddress: string;
	sectionCenter: number;
	village: number;
	educationalAdministration: number;
	previewDate: Date;
	startDate: Date;
	endDate: Date;
	extensionNumber: string;
	structuralComponent: number;
	sampleNumber: string;
	testDate: Date;
	constructor(arg?: ReportOnTheResistanceOfReinforcedConcrete) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
