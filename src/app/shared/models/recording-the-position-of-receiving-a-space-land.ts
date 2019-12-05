
 export class RecordingThePositionOfReceivingASpaceLand {
    id: number;
    
	landID: string;
	notificationDate: Date;
	materPrice: Date;
	receivingPosition: number;
	obstacleCode: number;
	constructor(arg?: RecordingThePositionOfReceivingASpaceLand) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
