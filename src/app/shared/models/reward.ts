
 export class Reward {
    id: number;
    
	bonusCode: string;
	administrationCode: number;
	incomingNumber: string;
	incomingYearAndMonth: Date;
	netValue: string;
	writeOffNumber: string;
	atualDate: Date;
	releaseDate: Date;
	delistingDate: Date;
	constructor(arg?: Reward) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
