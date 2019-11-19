
 export class ProjectPeriods {
    id: number;
    
	buildingCode: string;
	buildingName: string;
	governorate: number;
	bidNumber: number;
	offeringType: number;
	contractorCode: string;
	contractorName: string;
	engineerCode: string;
	engineerName: string;
	siteDeliveryDate: Date;
	executionDuration: number;
	extensionTimes: number;
	referenceNumber: number;
	referencesName: string;
	extensionDays: number;
	beganStopDate: Date;
	constructor(arg?: ProjectPeriods) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
