
 export class FactoryNameForOrder {
    id: number;
    
	orderNumber: string;
	factoryName: string;
	constructor(arg?: FactoryNameForOrder) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
