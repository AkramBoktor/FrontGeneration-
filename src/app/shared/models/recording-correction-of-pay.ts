
 export class RecordingCorrectionOfPay {
    id: number;
    
	correctionType: number;
	correctionNumber: string;
	employeeCode: string;
	correctionPeriodFrom: Date;
	correctionPeriodTo: Date;
	supplementaryPay: string;
	extraValue: string;
	allowances: string;
	cashAllowance: string;
	carAllowance: string;
	retirementInstallments: string;
	totalDebt: string;
	sanctions: string;
	governmentShare: string;
	constructor(arg?: RecordingCorrectionOfPay) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
