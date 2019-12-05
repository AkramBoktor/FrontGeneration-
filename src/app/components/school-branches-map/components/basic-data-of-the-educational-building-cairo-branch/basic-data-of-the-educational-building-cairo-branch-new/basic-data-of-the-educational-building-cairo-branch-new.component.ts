
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BasicDataOfTheEducationalBuildingCairoBranch } from 'app/shared/models/basic-data-of-the-educational-building-cairo-branch';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicDataOfTheEducationalBuildingCairoBranchService } from '../shared/basic-data-of-the-educational-building-cairo-branch.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-basic-data-of-the-educational-building-cairo-branch-new',
  templateUrl: './basic-data-of-the-educational-building-cairo-branch-new.component.html',
  styleUrls: ['./basic-data-of-the-educational-building-cairo-branch-new.component.scss'],
  providers: [
    ]
})

export class BasicDataOfTheEducationalBuildingCairoBranchNewComponent extends AppBaseComponent implements OnInit {
  basicDataOfTheEducationalBuildingCairoBranchForm: FormGroup;
  @Input() selectedBasicDataOfTheEducationalBuildingCairoBranch: BasicDataOfTheEducationalBuildingCairoBranch;
  errorMessages: FormControlError[] = [
        
  ];

  private useBuildingPositionsService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;
private fenceStatusCodesService: LookupService;
private fenceStatusesService: LookupService;
private constructionMaterialsService: LookupService;
private effectTypeCodesService: LookupService;


  
usePositionSelectOptions: MaterialSelectOptions;
landOwnershipSelectOptions: MaterialSelectOptions;
buildingOwnershipSelectOptions: MaterialSelectOptions;
fenceCodeSelectOptions: MaterialSelectOptions;
fenceStateSelectOptions: MaterialSelectOptions;
buildingMaterialSelectOptions: MaterialSelectOptions;
positiveInfluentialStationsSelectOptions: MaterialSelectOptions;
negativeInfluentialStationsSelectOptions: MaterialSelectOptions;

  
	@ViewChild('usePosition', { static: true }) UsePositionSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnership', { static: true }) LandOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnership', { static: true }) BuildingOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('fenceCode', { static: true }) FenceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('fenceState', { static: true }) FenceStateSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingMaterial', { static: true }) BuildingMaterialSelectComponent: MaterialSelectComponent;
	@ViewChild('positiveInfluentialStations', { static: true }) PositiveInfluentialStationsSelectComponent: MaterialSelectComponent;
	@ViewChild('negativeInfluentialStations', { static: true }) NegativeInfluentialStationsSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BasicDataOfTheEducationalBuildingCairoBranchNewComponent>,
    public basicDataOfTheEducationalBuildingCairoBranchService: BasicDataOfTheEducationalBuildingCairoBranchService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataOfTheEducationalBuildingCairoBranch = new BasicDataOfTheEducationalBuildingCairoBranch();

    
	this.usePositionSelectOptions = new MaterialSelectOptions({
	 data: this.useBuildingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف استخدام',
	});

	this.landOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكيه الارض',
	});

	this.buildingOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.buildingOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكيه المبني',
	});

	this.fenceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السور',
	});

	this.fenceStateSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله السور',
	});

	this.buildingMaterialSelectOptions = new MaterialSelectOptions({
	 data: this.constructionMaterialsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ماده البناء',
	});

	this.positiveInfluentialStationsSelectOptions = new MaterialSelectOptions({
	 data: this.effectTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'محطات مؤثره ايجابي ',
	});

	this.negativeInfluentialStationsSelectOptions = new MaterialSelectOptions({
	 data: this.effectTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'محطات مؤثره سلبي',
	});


    this.basicDataOfTheEducationalBuildingCairoBranchForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingCode, [ Validators.required ]],
  address : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.address, [ Validators.required ]],
  phoneNumber : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.phoneNumber, [ Validators.required ]],
  fenceHeight : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceHeight, [ Validators.required ]],
  fenceRibNorth : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibNorth, [ Validators.required ]],
  fenceRibSouth : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibSouth, [ Validators.required ]],
  fenceRibWest : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibWest, [ Validators.required ]],
  fenceRibEast : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibEast, [ Validators.required ]],
  northeastFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.northeastFence, [ Validators.required ]],
  northwestFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.northwestFence, [ Validators.required ]],
  southeastFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.southeastFence, [ Validators.required ]],
  southwestFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.southwestFence, [ Validators.required ]],
  coordinatesX : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesX, [ Validators.required ]],
  coordinatesY : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesY, [ Validators.required ]],
  coordinatesZ : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesZ, [ Validators.required ]],
  usePosition : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.usePosition, [ Validators.required ]],
  landOwnership : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.landOwnership, [ Validators.required ]],
  buildingOwnership : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingOwnership, [ Validators.required ]],
  fenceCode : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceCode, [ Validators.required ]],
  fenceState : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceState, [ Validators.required ]],
  buildingMaterial : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingMaterial, [ Validators.required ]],
  positiveInfluentialStations : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.positiveInfluentialStations, [ Validators.required ]],
  negativeInfluentialStations : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.negativeInfluentialStations, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.basicDataOfTheEducationalBuildingCairoBranchService.create(this.basicDataOfTheEducationalBuildingCairoBranchForm.value)
        .pipe(switchMap(x => {
			return this.basicDataOfTheEducationalBuildingCairoBranchService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.basicDataOfTheEducationalBuildingCairoBranchForm.get(name);
    }

  initializeLookupServices() {
    this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
this.fenceStatusesService = new LookupService('fencestatuses', this.http);
this.constructionMaterialsService = new LookupService('constructionmaterials', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
  }
 }
