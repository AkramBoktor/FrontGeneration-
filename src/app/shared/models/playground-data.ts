
 export class PlaygroundData {
    id: number;
    
	buildingCode: string;
	playgroundNumber: string;
	playgroundType: number;
	landType: number;
	status: number;
	playgroundLength: string;
	playgroundWidth: string;
	constructor(arg?: PlaygroundData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
