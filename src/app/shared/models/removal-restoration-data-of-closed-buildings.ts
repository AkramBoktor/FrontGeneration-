
 export class RemovalRestorationDataOfClosedBuildings {
    id: number;
    
	schoolCode: string;
	usageStatus: number;
	extensionNumber: string;
	extensionClosingStatus: number;
	closingDate: Date;
	decisionNumber: string;
	decisionDate: Date;
	removalDate: Date;
	constructor(arg?: RemovalRestorationDataOfClosedBuildings) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
