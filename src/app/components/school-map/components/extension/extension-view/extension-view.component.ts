
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Extension } from 'app/shared/models/extension';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExtensionService } from '../shared/extension.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-extension-view',
  templateUrl: './extension-view.component.html',
  styleUrls: ['./extension-view.component.scss'],
  providers: []
})

export class ExtensionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExtension: Extension;
  extensionForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private extensionStructureStatusCodesService: LookupService;
private interiorFinishesStatusCodesService: LookupService;
private sanitationStatusCodesService: LookupService;
private electricalWorksStatusCodesService: LookupService;
private extensionAbilityForRampingCodesService: LookupService;
private extensionConstructionSystemCodesService: LookupService;
private extensionWallConstructionMaterialsCodesService: LookupService;
private roofingMaterialsCodesService: LookupService;
private classFloorsFinishingCodesService: LookupService;
private corridorsFloorFinishingCodesService: LookupService;
private bathroomsFloorFinishingCodesService: LookupService;
private labsFloorFinishingCodesService: LookupService;
private otherFloorFinishingCodesService: LookupService;
private classWallsFinishingCodesService: LookupService;
private corridorsWallsFinishingCodesService: LookupService;
private bathroomsWallsFinishingCodesService: LookupService;
private labsWallsFinishingCodesService: LookupService;
private otherWallsFinishingCodesService: LookupService;
private classCeilingsFinishingCodesService: LookupService;
private corridorsCeilingsFinishingCodesService: LookupService;
private bathroomsCeilingsFinishingCodesService: LookupService;
private labsCeilingsFinishingCodesService: LookupService;
private otherCeilingsFinishingCodesService: LookupService;
private exteriorFinishingCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
extensionStructureStatusCodeSelectOptions: MaterialSelectOptions;
interiorFinishesStatusCodeSelectOptions: MaterialSelectOptions;
sanitationStatusCodeSelectOptions: MaterialSelectOptions;
electricalWorksStatusCodeSelectOptions: MaterialSelectOptions;
extensionAbilityForRampingCodeSelectOptions: MaterialSelectOptions;
extensionConstructionSystemCodeSelectOptions: MaterialSelectOptions;
extensionWallConstructionMaterialsCodeSelectOptions: MaterialSelectOptions;
roofingMaterialsCodeSelectOptions: MaterialSelectOptions;
classFloorsFinishingCodeSelectOptions: MaterialSelectOptions;
corridorsFloorFinishingCodeSelectOptions: MaterialSelectOptions;
bathroomsFloorFinishingCodeSelectOptions: MaterialSelectOptions;
labsFloorFinishingCodeSelectOptions: MaterialSelectOptions;
otherFloorFinishingCodeSelectOptions: MaterialSelectOptions;
classWallsFinishingCodeSelectOptions: MaterialSelectOptions;
corridorsWallsFinishingCodeSelectOptions: MaterialSelectOptions;
bathroomsWallsFinishingCodeSelectOptions: MaterialSelectOptions;
labsWallsFinishingCodeSelectOptions: MaterialSelectOptions;
otherWallsFinishingCodeSelectOptions: MaterialSelectOptions;
classCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
corridorsCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
bathroomsCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
labsCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
otherCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
exteriorFinishingCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExtensionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExtensionViewComponent>,
    public extensionService: ExtensionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtension = this.selectedExtensionDialog.data || this.selectedExtension;

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الإقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.extensionStructureStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionStructureStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة هيكل الملحق',
	});

	this.interiorFinishesStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.interiorFinishesStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة التشطيبات الداخلية',
	});

	this.sanitationStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sanitationStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الاعمال الصحية',
	});

	this.electricalWorksStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.electricalWorksStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الاعمال الكهربائية',
	});

	this.extensionAbilityForRampingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionAbilityForRampingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود قابلة الملحق للتعلية',
	});

	this.extensionConstructionSystemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionConstructionSystemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نظام انشاء الملحق',
	});

	this.extensionWallConstructionMaterialsCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionWallConstructionMaterialsCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مواد بناء حوائط الملحق',
	});

	this.roofingMaterialsCodeSelectOptions = new MaterialSelectOptions({
	 data: this.roofingMaterialsCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مواد بناء الاسقف',
	});

	this.classFloorsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classFloorsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات الفصول',
	});

	this.corridorsFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.corridorsFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات الطرقات',
	});

	this.bathroomsFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bathroomsFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات دورات مياة',
	});

	this.labsFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.labsFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات معامل',
	});

	this.otherFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.otherFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات اخري',
	});

	this.classWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط الفصول',
	});

	this.corridorsWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.corridorsWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط الطرقات',
	});

	this.bathroomsWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bathroomsWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط دورات',
	});

	this.labsWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.labsWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط معامل',
	});

	this.otherWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.otherWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط اخري',
	});

	this.classCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف الفصول',
	});

	this.corridorsCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.corridorsCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف الطرقات',
	});

	this.bathroomsCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bathroomsCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف مياه',
	});

	this.labsCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.labsCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف معامل',
	});

	this.otherCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.otherCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف اخرى',
	});

	this.exteriorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.exteriorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيب الواجاهات الخارجية',
	});


    this.extensionForm = this.formBuilder.group({
      
  buildingCode : [this.selectedExtension.buildingCode],
  extensionSerial : [this.selectedExtension.extensionSerial],
  totalNumberOfFloors : [this.selectedExtension.totalNumberOfFloors],
  totalExtensionArea : [this.selectedExtension.totalExtensionArea],
  extensionConstructionDate : [this.selectedExtension.extensionConstructionDate],
  extensionConstructionWayCode : [this.selectedExtension.extensionConstructionWayCode],
  regionalCenterCode : [this.selectedExtension.regionalCenterCode],
  branchCode : [this.selectedExtension.branchCode],
  extensionStructureStatusCode : [this.selectedExtension.extensionStructureStatusCode],
  interiorFinishesStatusCode : [this.selectedExtension.interiorFinishesStatusCode],
  sanitationStatusCode : [this.selectedExtension.sanitationStatusCode],
  electricalWorksStatusCode : [this.selectedExtension.electricalWorksStatusCode],
  extensionAbilityForRampingCode : [this.selectedExtension.extensionAbilityForRampingCode],
  extensionConstructionSystemCode : [this.selectedExtension.extensionConstructionSystemCode],
  extensionWallConstructionMaterialsCode : [this.selectedExtension.extensionWallConstructionMaterialsCode],
  roofingMaterialsCode : [this.selectedExtension.roofingMaterialsCode],
  classFloorsFinishingCode : [this.selectedExtension.classFloorsFinishingCode],
  corridorsFloorFinishingCode : [this.selectedExtension.corridorsFloorFinishingCode],
  bathroomsFloorFinishingCode : [this.selectedExtension.bathroomsFloorFinishingCode],
  labsFloorFinishingCode : [this.selectedExtension.labsFloorFinishingCode],
  otherFloorFinishingCode : [this.selectedExtension.otherFloorFinishingCode],
  classWallsFinishingCode : [this.selectedExtension.classWallsFinishingCode],
  corridorsWallsFinishingCode : [this.selectedExtension.corridorsWallsFinishingCode],
  bathroomsWallsFinishingCode : [this.selectedExtension.bathroomsWallsFinishingCode],
  labsWallsFinishingCode : [this.selectedExtension.labsWallsFinishingCode],
  otherWallsFinishingCode : [this.selectedExtension.otherWallsFinishingCode],
  classCeilingsFinishingCode : [this.selectedExtension.classCeilingsFinishingCode],
  corridorsCeilingsFinishingCode : [this.selectedExtension.corridorsCeilingsFinishingCode],
  bathroomsCeilingsFinishingCode : [this.selectedExtension.bathroomsCeilingsFinishingCode],
  labsCeilingsFinishingCode : [this.selectedExtension.labsCeilingsFinishingCode],
  otherCeilingsFinishingCode : [this.selectedExtension.otherCeilingsFinishingCode],
  exteriorFinishingCode : [this.selectedExtension.exteriorFinishingCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.extensionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.extensionForm.controls)) {
      this.extensionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.extensionStructureStatusCodesService = new LookupService('extensionstructurestatuscodes', this.http);
this.interiorFinishesStatusCodesService = new LookupService('interiorfinishesstatuscodes', this.http);
this.sanitationStatusCodesService = new LookupService('sanitationstatuscodes', this.http);
this.electricalWorksStatusCodesService = new LookupService('electricalworksstatuscodes', this.http);
this.extensionAbilityForRampingCodesService = new LookupService('extensionabilityforrampingcodes', this.http);
this.extensionConstructionSystemCodesService = new LookupService('extensionconstructionsystemcodes', this.http);
this.extensionWallConstructionMaterialsCodesService = new LookupService('extensionwallconstructionmaterialscodes', this.http);
this.roofingMaterialsCodesService = new LookupService('roofingmaterialscodes', this.http);
this.classFloorsFinishingCodesService = new LookupService('classfloorsfinishingcodes', this.http);
this.corridorsFloorFinishingCodesService = new LookupService('corridorsfloorfinishingcodes', this.http);
this.bathroomsFloorFinishingCodesService = new LookupService('bathroomsfloorfinishingcodes', this.http);
this.labsFloorFinishingCodesService = new LookupService('labsfloorfinishingcodes', this.http);
this.otherFloorFinishingCodesService = new LookupService('otherfloorfinishingcodes', this.http);
this.classWallsFinishingCodesService = new LookupService('classwallsfinishingcodes', this.http);
this.corridorsWallsFinishingCodesService = new LookupService('corridorswallsfinishingcodes', this.http);
this.bathroomsWallsFinishingCodesService = new LookupService('bathroomswallsfinishingcodes', this.http);
this.labsWallsFinishingCodesService = new LookupService('labswallsfinishingcodes', this.http);
this.otherWallsFinishingCodesService = new LookupService('otherwallsfinishingcodes', this.http);
this.classCeilingsFinishingCodesService = new LookupService('classceilingsfinishingcodes', this.http);
this.corridorsCeilingsFinishingCodesService = new LookupService('corridorsceilingsfinishingcodes', this.http);
this.bathroomsCeilingsFinishingCodesService = new LookupService('bathroomsceilingsfinishingcodes', this.http);
this.labsCeilingsFinishingCodesService = new LookupService('labsceilingsfinishingcodes', this.http);
this.otherCeilingsFinishingCodesService = new LookupService('otherceilingsfinishingcodes', this.http);
this.exteriorFinishingCodesService = new LookupService('exteriorfinishingcodes', this.http);
  }
}

