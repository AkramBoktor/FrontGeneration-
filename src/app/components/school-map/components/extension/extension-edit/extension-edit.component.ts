
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Extension } from 'app/shared/models/extension';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExtensionService } from '../shared/extension.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-extension-edit',
  templateUrl: './extension-edit.component.html',
  styleUrls: ['./extension-edit.component.scss'],
  providers: []
})

export class ExtensionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExtension: Extension;
  extensionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private labsCeilingsFinishingCodesService: LookupService;
private bathroomsCeilingsFinishingCodesService: LookupService;
private corridorsCeilingsFinishingCodesService: LookupService;
private classCeilingsFinishingCodesService: LookupService;
private otherWallsFinishingCodesService: LookupService;
private labsWallsFinishingCodesService: LookupService;
private bathroomsWallsFinishingCodesService: LookupService;
private corridorsWallsFinishingCodesService: LookupService;
private classWallsFinishingCodesService: LookupService;
private otherFloorFinishingCodesService: LookupService;
private labsFloorFinishingCodesService: LookupService;
private bathroomsFloorFinishingCodesService: LookupService;
private corridorsFloorFinishingCodesService: LookupService;
private classFloorsFinishingCodesService: LookupService;
private roofingMaterialsCodesService: LookupService;
private extensionWallConstructionMaterialsCodesService: LookupService;
private extensionConstructionWayCodesService: LookupService;
private extensionConstructionSystemCodesService: LookupService;
private extensionAbilityForRampingCodesService: LookupService;
private electricalWorksStatusCodesService: LookupService;
private sanitationStatusCodesService: LookupService;
private interiorFinishesStatusCodesService: LookupService;
private extensionStructureStatusCodesService: LookupService;
private branchCodesService: LookupService;
private regionalCenterCodesService: LookupService;
private otherCeilingsFinishingCodesService: LookupService;
private exteriorFinishingCodesService: LookupService;

  
labsCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
bathroomsCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
corridorsCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
classCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
otherWallsFinishingCodeSelectOptions: MaterialSelectOptions;
labsWallsFinishingCodeSelectOptions: MaterialSelectOptions;
bathroomsWallsFinishingCodeSelectOptions: MaterialSelectOptions;
corridorsWallsFinishingCodeSelectOptions: MaterialSelectOptions;
classWallsFinishingCodeSelectOptions: MaterialSelectOptions;
otherFloorFinishingCodeSelectOptions: MaterialSelectOptions;
labsFloorFinishingCodeSelectOptions: MaterialSelectOptions;
bathroomsFloorFinishingCodeSelectOptions: MaterialSelectOptions;
corridorsFloorFinishingCodeSelectOptions: MaterialSelectOptions;
classFloorsFinishingCodeSelectOptions: MaterialSelectOptions;
roofingMaterialsCodeSelectOptions: MaterialSelectOptions;
extensionWallConstructionMaterialsCodeSelectOptions: MaterialSelectOptions;
extensionConstructionWayCodeSelectOptions: MaterialSelectOptions;
extensionConstructionSystemCodeSelectOptions: MaterialSelectOptions;
extensionAbilityForRampingCodeSelectOptions: MaterialSelectOptions;
electricalWorksStatusCodeSelectOptions: MaterialSelectOptions;
sanitationStatusCodeSelectOptions: MaterialSelectOptions;
interiorFinishesStatusCodeSelectOptions: MaterialSelectOptions;
extensionStructureStatusCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
regionalCenterCodeSelectOptions: MaterialSelectOptions;
otherCeilingsFinishingCodeSelectOptions: MaterialSelectOptions;
exteriorFinishingCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('labsCeilingsFinishingCode', { static: true }) LabsCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bathroomsCeilingsFinishingCode', { static: true }) BathroomsCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('corridorsCeilingsFinishingCode', { static: true }) CorridorsCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classCeilingsFinishingCode', { static: true }) ClassCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('otherWallsFinishingCode', { static: true }) OtherWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('labsWallsFinishingCode', { static: true }) LabsWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bathroomsWallsFinishingCode', { static: true }) BathroomsWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('corridorsWallsFinishingCode', { static: true }) CorridorsWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classWallsFinishingCode', { static: true }) ClassWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('otherFloorFinishingCode', { static: true }) OtherFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('labsFloorFinishingCode', { static: true }) LabsFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bathroomsFloorFinishingCode', { static: true }) BathroomsFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('corridorsFloorFinishingCode', { static: true }) CorridorsFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classFloorsFinishingCode', { static: true }) ClassFloorsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('roofingMaterialsCode', { static: true }) RoofingMaterialsCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionWallConstructionMaterialsCode', { static: true }) ExtensionWallConstructionMaterialsCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionConstructionWayCode', { static: true }) ExtensionConstructionWayCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionConstructionSystemCode', { static: true }) ExtensionConstructionSystemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionAbilityForRampingCode', { static: true }) ExtensionAbilityForRampingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('electricalWorksStatusCode', { static: true }) ElectricalWorksStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationStatusCode', { static: true }) SanitationStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('interiorFinishesStatusCode', { static: true }) InteriorFinishesStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionStructureStatusCode', { static: true }) ExtensionStructureStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('otherCeilingsFinishingCode', { static: true }) OtherCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('exteriorFinishingCode', { static: true }) ExteriorFinishingCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExtensionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExtensionEditComponent>,
    public extensionService: ExtensionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtension = new Extension();
    this.selectedExtension = this.selectedExtensionDialog.data || this.selectedExtension;

    
	this.labsCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.labsCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف معامل',
	});

	this.bathroomsCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bathroomsCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف مياه',
	});

	this.corridorsCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.corridorsCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف الطرقات',
	});

	this.classCeilingsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classCeilingsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات اسقف الفصول',
	});

	this.otherWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.otherWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط اخري',
	});

	this.labsWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.labsWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط معامل',
	});

	this.bathroomsWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bathroomsWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط دورات',
	});

	this.corridorsWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.corridorsWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط الطرقات',
	});

	this.classWallsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classWallsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات حوائط الفصول',
	});

	this.otherFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.otherFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات اخري',
	});

	this.labsFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.labsFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات معامل',
	});

	this.bathroomsFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bathroomsFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات دورات مياة',
	});

	this.corridorsFloorFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.corridorsFloorFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات الطرقات',
	});

	this.classFloorsFinishingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classFloorsFinishingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود تشطيبات ارضيات الفصول',
	});

	this.roofingMaterialsCodeSelectOptions = new MaterialSelectOptions({
	 data: this.roofingMaterialsCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مواد بناء الاسقف',
	});

	this.extensionWallConstructionMaterialsCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionWallConstructionMaterialsCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مواد بناء حوائط الملحق',
	});

	this.extensionConstructionWayCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionConstructionWayCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود طريقة انشاء الملحق ',
	});

	this.extensionConstructionSystemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionConstructionSystemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نظام انشاء الملحق',
	});

	this.extensionAbilityForRampingCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionAbilityForRampingCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود قابلة الملحق للتعلية',
	});

	this.electricalWorksStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.electricalWorksStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الاعمال الكهربائية',
	});

	this.sanitationStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sanitationStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الاعمال الصحية',
	});

	this.interiorFinishesStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.interiorFinishesStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة التشطيبات الداخلية',
	});

	this.extensionStructureStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.extensionStructureStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة هيكل الملحق',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الإقليمي',
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
      
  id : [this.selectedExtension.id],
  buildingCode : [this.selectedExtension.buildingCode, [ Validators.required ]],
  extensionConstructionDate : [this.selectedExtension.extensionConstructionDate, [ Validators.required ]],
  totalExtensionArea : [this.selectedExtension.totalExtensionArea, [ Validators.required ]],
  totalNumberOfFloors : [this.selectedExtension.totalNumberOfFloors, [ Validators.required ]],
  extensionSerial : [this.selectedExtension.extensionSerial, [ Validators.required ]],
  labsCeilingsFinishingCode : [this.selectedExtension.labsCeilingsFinishingCode, [ Validators.required ]],
  bathroomsCeilingsFinishingCode : [this.selectedExtension.bathroomsCeilingsFinishingCode, [ Validators.required ]],
  corridorsCeilingsFinishingCode : [this.selectedExtension.corridorsCeilingsFinishingCode, [ Validators.required ]],
  classCeilingsFinishingCode : [this.selectedExtension.classCeilingsFinishingCode, [ Validators.required ]],
  otherWallsFinishingCode : [this.selectedExtension.otherWallsFinishingCode, [ Validators.required ]],
  labsWallsFinishingCode : [this.selectedExtension.labsWallsFinishingCode, [ Validators.required ]],
  bathroomsWallsFinishingCode : [this.selectedExtension.bathroomsWallsFinishingCode, [ Validators.required ]],
  corridorsWallsFinishingCode : [this.selectedExtension.corridorsWallsFinishingCode, [ Validators.required ]],
  classWallsFinishingCode : [this.selectedExtension.classWallsFinishingCode, [ Validators.required ]],
  otherFloorFinishingCode : [this.selectedExtension.otherFloorFinishingCode, [ Validators.required ]],
  labsFloorFinishingCode : [this.selectedExtension.labsFloorFinishingCode, [ Validators.required ]],
  bathroomsFloorFinishingCode : [this.selectedExtension.bathroomsFloorFinishingCode, [ Validators.required ]],
  corridorsFloorFinishingCode : [this.selectedExtension.corridorsFloorFinishingCode, [ Validators.required ]],
  classFloorsFinishingCode : [this.selectedExtension.classFloorsFinishingCode, [ Validators.required ]],
  roofingMaterialsCode : [this.selectedExtension.roofingMaterialsCode, [ Validators.required ]],
  extensionWallConstructionMaterialsCode : [this.selectedExtension.extensionWallConstructionMaterialsCode, [ Validators.required ]],
  extensionConstructionWayCode : [this.selectedExtension.extensionConstructionWayCode, [ Validators.required ]],
  extensionConstructionSystemCode : [this.selectedExtension.extensionConstructionSystemCode, [ Validators.required ]],
  extensionAbilityForRampingCode : [this.selectedExtension.extensionAbilityForRampingCode, [ Validators.required ]],
  electricalWorksStatusCode : [this.selectedExtension.electricalWorksStatusCode, [ Validators.required ]],
  sanitationStatusCode : [this.selectedExtension.sanitationStatusCode, [ Validators.required ]],
  interiorFinishesStatusCode : [this.selectedExtension.interiorFinishesStatusCode, [ Validators.required ]],
  extensionStructureStatusCode : [this.selectedExtension.extensionStructureStatusCode, [ Validators.required ]],
  branchCode : [this.selectedExtension.branchCode, [ Validators.required ]],
  regionalCenterCode : [this.selectedExtension.regionalCenterCode, [ Validators.required ]],
  otherCeilingsFinishingCode : [this.selectedExtension.otherCeilingsFinishingCode, [ Validators.required ]],
  exteriorFinishingCode : [this.selectedExtension.exteriorFinishingCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.extensionService.update(this.extensionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.extensionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.extensionForm.get(name);
  }

  initializeLookupServices() {
    this.labsCeilingsFinishingCodesService = new LookupService('labsceilingsfinishingcodes', this.http);
this.bathroomsCeilingsFinishingCodesService = new LookupService('bathroomsceilingsfinishingcodes', this.http);
this.corridorsCeilingsFinishingCodesService = new LookupService('corridorsceilingsfinishingcodes', this.http);
this.classCeilingsFinishingCodesService = new LookupService('classceilingsfinishingcodes', this.http);
this.otherWallsFinishingCodesService = new LookupService('otherwallsfinishingcodes', this.http);
this.labsWallsFinishingCodesService = new LookupService('labswallsfinishingcodes', this.http);
this.bathroomsWallsFinishingCodesService = new LookupService('bathroomswallsfinishingcodes', this.http);
this.corridorsWallsFinishingCodesService = new LookupService('corridorswallsfinishingcodes', this.http);
this.classWallsFinishingCodesService = new LookupService('classwallsfinishingcodes', this.http);
this.otherFloorFinishingCodesService = new LookupService('otherfloorfinishingcodes', this.http);
this.labsFloorFinishingCodesService = new LookupService('labsfloorfinishingcodes', this.http);
this.bathroomsFloorFinishingCodesService = new LookupService('bathroomsfloorfinishingcodes', this.http);
this.corridorsFloorFinishingCodesService = new LookupService('corridorsfloorfinishingcodes', this.http);
this.classFloorsFinishingCodesService = new LookupService('classfloorsfinishingcodes', this.http);
this.roofingMaterialsCodesService = new LookupService('roofingmaterialscodes', this.http);
this.extensionWallConstructionMaterialsCodesService = new LookupService('extensionwallconstructionmaterialscodes', this.http);
this.extensionConstructionWayCodesService = new LookupService('extensionconstructionwaycodes', this.http);
this.extensionConstructionSystemCodesService = new LookupService('extensionconstructionsystemcodes', this.http);
this.extensionAbilityForRampingCodesService = new LookupService('extensionabilityforrampingcodes', this.http);
this.electricalWorksStatusCodesService = new LookupService('electricalworksstatuscodes', this.http);
this.sanitationStatusCodesService = new LookupService('sanitationstatuscodes', this.http);
this.interiorFinishesStatusCodesService = new LookupService('interiorfinishesstatuscodes', this.http);
this.extensionStructureStatusCodesService = new LookupService('extensionstructurestatuscodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.otherCeilingsFinishingCodesService = new LookupService('otherceilingsfinishingcodes', this.http);
this.exteriorFinishingCodesService = new LookupService('exteriorfinishingcodes', this.http);
  }
}
