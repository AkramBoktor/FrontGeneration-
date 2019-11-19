
 export class BidPartsData {
    id: number;
    
	buildingType: number;
	offeringType: number;
	bidNumber: string;
	project: string;
	projectName: string;
	examinationCommitteeDate: Date;
	referenceDate: Date;
	openingEnvelopesDate: Date;
	siteDeliveryDate: Date;
	supplierNumber: number;
	implementationDurationOrSupply: number;
	maintenanceStatus: number;
	bidRequirementsValue: number;
	taxDescription: number;
	constructionType: number;
	assayValue: number;
	contractualValue: number;
	awardBonus: number;
	outgoingPayment: number;
	paymentMethod: number;
	finalInsurance: number;
	projectState: string;
	primaryReceipDate: Date;
	finalReceiptDate: Date;
	governorate: number;
	constructor(arg?: BidPartsData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
