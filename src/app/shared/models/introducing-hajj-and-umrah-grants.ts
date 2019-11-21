
 export class IntroducingHajjAndUmrahGrants {
    id: number;
    
	employeeCode: string;
	employeeName: string;
	membershipNo: string;
	status: number;
	date: Date;
	memberTicketValue: number;
	utilitiesTicketValue: number;
	supportValue: number;
	paymentType: number;
	installmentsNumber: number;
	installmentsValue: number;
	travelType: number;
	companionsNumber: string;
	utilitiesName: string;
	constructor(arg?: IntroducingHajjAndUmrahGrants) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
