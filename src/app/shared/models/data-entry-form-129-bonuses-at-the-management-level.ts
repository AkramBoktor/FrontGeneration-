
 export class DataEntryForm129BonusesAtTheManagementLevel {
    id: number;
    
	incomingNumber: string;
	month: Date;
	bonusCode: string;
	monthAndYearBonus: Date;
	constructor(arg?: DataEntryForm129BonusesAtTheManagementLevel) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
