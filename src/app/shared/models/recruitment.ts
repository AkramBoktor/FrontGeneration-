
 export class Recruitment {
    id: number;
    
	positionRecruitment: number;
	serviceCertificateDate: Date;
	temporaryExemptionDate: Date;
	callbackReserveDate: Date;
	reserveReturnDate: Date;
	reserveEndDate: Date;
	entryArmyDate: Date;
	departureArmyDate: Date;
	employeeCode: string;
	constructor(arg?: Recruitment) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
