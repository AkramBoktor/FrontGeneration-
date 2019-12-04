
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Extension } from 'app/shared/models/extension';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExtensionService } from '../shared/extension.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-extension-new',
  templateUrl: './extension-new.component.html',
  styleUrls: ['./extension-new.component.scss'],
  providers: [
    ]
})

export class ExtensionNewComponent extends AppBaseComponent implements OnInit {
  extensionForm: FormGroup;
  @Input() selectedExtension: Extension;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionStructureStatusCode', { static: true }) ExtensionStructureStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('interiorFinishesStatusCode', { static: true }) InteriorFinishesStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationStatusCode', { static: true }) SanitationStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('electricalWorksStatusCode', { static: true }) ElectricalWorksStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionAbilityForRampingCode', { static: true }) ExtensionAbilityForRampingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionConstructionSystemCode', { static: true }) ExtensionConstructionSystemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionWallConstructionMaterialsCode', { static: true }) ExtensionWallConstructionMaterialsCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('roofingMaterialsCode', { static: true }) RoofingMaterialsCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classFloorsFinishingCode', { static: true }) ClassFloorsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('corridorsFloorFinishingCode', { static: true }) CorridorsFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bathroomsFloorFinishingCode', { static: true }) BathroomsFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('labsFloorFinishingCode', { static: true }) LabsFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('otherFloorFinishingCode', { static: true }) OtherFloorFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classWallsFinishingCode', { static: true }) ClassWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('corridorsWallsFinishingCode', { static: true }) CorridorsWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bathroomsWallsFinishingCode', { static: true }) BathroomsWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('labsWallsFinishingCode', { static: true }) LabsWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('otherWallsFinishingCode', { static: true }) OtherWallsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classCeilingsFinishingCode', { static: true }) ClassCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('corridorsCeilingsFinishingCode', { static: true }) CorridorsCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bathroomsCeilingsFinishingCode', { static: true }) BathroomsCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('labsCeilingsFinishingCode', { static: true }) LabsCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('otherCeilingsFinishingCode', { static: true }) OtherCeilingsFinishingCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('exteriorFinishingCode', { static: true }) ExteriorFinishingCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExtensionNewComponent>,
    public extensionService: ExtensionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtension = new Extension();

    
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
     
  id : [0],
  buildingCode : [this.selectedExtension.buildingCode, [ Validators.required ]],
  extensionSerial : [this.selectedExtension.extensionSerial, [ Validators.required ]],
  totalNumberOfFloors : [this.selectedExtension.totalNumberOfFloors, [ Validators.required ]],
  totalExtensionArea : [this.selectedExtension.totalExtensionArea, [ Validators.required ]],
  extensionConstructionDate : [this.selectedExtension.extensionConstructionDate, [ Validators.required ]],
  extensionConstructionWayCode : [this.selectedExtension.extensionConstructionWayCode, [ Validators.required ]],
  regionalCenterCode : [this.selectedExtension.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedExtension.branchCode, [ Validators.required ]],
  extensionStructureStatusCode : [this.selectedExtension.extensionStructureStatusCode, [ Validators.required ]],
  interiorFinishesStatusCode : [this.selectedExtension.interiorFinishesStatusCode, [ Validators.required ]],
  sanitationStatusCode : [this.selectedExtension.sanitationStatusCode, [ Validators.required ]],
  electricalWorksStatusCode : [this.selectedExtension.electricalWorksStatusCode, [ Validators.required ]],
  extensionAbilityForRampingCode : [this.selectedExtension.extensionAbilityForRampingCode, [ Validators.required ]],
  extensionConstructionSystemCode : [this.selectedExtension.extensionConstructionSystemCode, [ Validators.required ]],
  extensionWallConstructionMaterialsCode : [this.selectedExtension.extensionWallConstructionMaterialsCode, [ Validators.required ]],
  roofingMaterialsCode : [this.selectedExtension.roofingMaterialsCode, [ Validators.required ]],
  classFloorsFinishingCode : [this.selectedExtension.classFloorsFinishingCode, [ Validators.required ]],
  corridorsFloorFinishingCode : [this.selectedExtension.corridorsFloorFinishingCode, [ Validators.required ]],
  bathroomsFloorFinishingCode : [this.selectedExtension.bathroomsFloorFinishingCode, [ Validators.required ]],
  labsFloorFinishingCode : [this.selectedExtension.labsFloorFinishingCode, [ Validators.required ]],
  otherFloorFinishingCode : [this.selectedExtension.otherFloorFinishingCode, [ Validators.required ]],
  classWallsFinishingCode : [this.selectedExtension.classWallsFinishingCode, [ Validators.required ]],
  corridorsWallsFinishingCode : [this.selectedExtension.corridorsWallsFinishingCode, [ Validators.required ]],
  bathroomsWallsFinishingCode : [this.selectedExtension.bathroomsWallsFinishingCode, [ Validators.required ]],
  labsWallsFinishingCode : [this.selectedExtension.labsWallsFinishingCode, [ Validators.required ]],
  otherWallsFinishingCode : [this.selectedExtension.otherWallsFinishingCode, [ Validators.required ]],
  classCeilingsFinishingCode : [this.selectedExtension.classCeilingsFinishingCode, [ Validators.required ]],
  corridorsCeilingsFinishingCode : [this.selectedExtension.corridorsCeilingsFinishingCode, [ Validators.required ]],
  bathroomsCeilingsFinishingCode : [this.selectedExtension.bathroomsCeilingsFinishingCode, [ Validators.required ]],
  labsCeilingsFinishingCode : [this.selectedExtension.labsCeilingsFinishingCode, [ Validators.required ]],
  otherCeilingsFinishingCode : [this.selectedExtension.otherCeilingsFinishingCode, [ Validators.required ]],
  exteriorFinishingCode : [this.selectedExtension.exteriorFinishingCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.extensionService.create(this.extensionForm.value)
        .pipe(switchMap(x => {
			return this.extensionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.extensionForm.get(name);
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
