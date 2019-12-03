
 export class SubscriptionValueByAgeB {
    id: number;
    
	amount: number;
	age: number;
	constructor(arg?: SubscriptionValueByAgeB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
