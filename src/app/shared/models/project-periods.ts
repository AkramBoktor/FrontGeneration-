
 export class ProjectPeriods {
    id: number;
    
	buildingCode: string;
	buildingName: string;
	governorate: number;
	bidNumber: string;
	offeringType: number;
	contractorCode: string;
	contractorName: string;
	engineerCode: string;
	engineerName: string;
	siteDeliveryDate: Date;
	executionDuration: string;
	referenceCode: string;
	referencesName: string;
	extensionDays: string;
	beganStopDate: Date;
	extensionTimes: string;
	constructor(arg?: ProjectPeriods) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
