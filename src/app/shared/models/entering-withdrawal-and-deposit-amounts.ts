
 export class EnteringWithdrawalAndDepositAmounts {
    id: number;
    
	checkNumber: string;
	checkDate: Date;
	checkAmount: string;
	entityCode: number;
	operationType: number;
	operationDate: Date;
	statement: string;
	constructor(arg?: EnteringWithdrawalAndDepositAmounts) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
