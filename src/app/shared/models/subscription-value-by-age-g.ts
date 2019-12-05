
 export class SubscriptionValueByAgeG {
    id: number;
    
	age: number;
	amount: number;
	constructor(arg?: SubscriptionValueByAgeG) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
