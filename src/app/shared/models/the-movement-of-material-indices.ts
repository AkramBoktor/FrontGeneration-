
 export class TheMovementOfMaterialIndices {
    id: number;
    
	startDateForMovement: Date;
	endDateForMovement: Date;
	elementCode: string;
	standardNumber: string;
	constructor(arg?: TheMovementOfMaterialIndices) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
