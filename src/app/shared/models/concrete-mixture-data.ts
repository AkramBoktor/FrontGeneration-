
 export class ConcreteMixtureData {
    id: number;
    
	orderNumber: string;
	mixtureType: number;
	cementWeight: string;
	cementBulk: string;
	waterWeight: string;
	waterVolume: string;
	sandWeight: string;
	sandVolume: string;
	stonesWeight: number;
	stonesVolume: number;
	dolomiteWeight: number;
	dolomiteVolume: number;
	sandSpecificWeight: number;
	stonesSpecificWeight: number;
	dolomiteSpecificWeight: number;
	aggregatesSpecificWeight: number;
	laboratoryLanding: number;
	cementUsed: number;
	sandWeightVolume: number;
	dolomiteWeightVolume: number;
	stonesWeightVolume: number;
	stonesCrush: number;
	dolomiteStones: number;
	sandGradientArea: number;
	constructor(arg?: ConcreteMixtureData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
