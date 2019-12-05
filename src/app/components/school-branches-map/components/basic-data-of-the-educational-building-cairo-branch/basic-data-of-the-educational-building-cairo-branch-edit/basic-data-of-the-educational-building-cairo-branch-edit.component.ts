
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BasicDataOfTheEducationalBuildingCairoBranch } from 'app/shared/models/basic-data-of-the-educational-building-cairo-branch';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BasicDataOfTheEducationalBuildingCairoBranchService } from '../shared/basic-data-of-the-educational-building-cairo-branch.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-basic-data-of-the-educational-building-cairo-branch-edit',
  templateUrl: './basic-data-of-the-educational-building-cairo-branch-edit.component.html',
  styleUrls: ['./basic-data-of-the-educational-building-cairo-branch-edit.component.scss'],
  providers: []
})

export class BasicDataOfTheEducationalBuildingCairoBranchEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicDataOfTheEducationalBuildingCairoBranch: BasicDataOfTheEducationalBuildingCairoBranch;
  basicDataOfTheEducationalBuildingCairoBranchForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionMaterialsService: LookupService;
private fenceStatusesService: LookupService;
private fenceStatusCodesService: LookupService;
private buildingOwnershipsService: LookupService;
private landOwnershipsService: LookupService;
private useBuildingPositionsService: LookupService;
private effectTypeCodesService: LookupService;


  
buildingMaterialSelectOptions: MaterialSelectOptions;
fenceStateSelectOptions: MaterialSelectOptions;
fenceCodeSelectOptions: MaterialSelectOptions;
buildingOwnershipSelectOptions: MaterialSelectOptions;
landOwnershipSelectOptions: MaterialSelectOptions;
usePositionSelectOptions: MaterialSelectOptions;
positiveInfluentialStationsSelectOptions: MaterialSelectOptions;
negativeInfluentialStationsSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingMaterial', { static: true }) BuildingMaterialSelectComponent: MaterialSelectComponent;
	@ViewChild('fenceState', { static: true }) FenceStateSelectComponent: MaterialSelectComponent;
	@ViewChild('fenceCode', { static: true }) FenceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnership', { static: true }) BuildingOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnership', { static: true }) LandOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('usePosition', { static: true }) UsePositionSelectComponent: MaterialSelectComponent;
	@ViewChild('positiveInfluentialStations', { static: true }) PositiveInfluentialStationsSelectComponent: MaterialSelectComponent;
	@ViewChild('negativeInfluentialStations', { static: true }) NegativeInfluentialStationsSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicDataOfTheEducationalBuildingCairoBranchDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicDataOfTheEducationalBuildingCairoBranchEditComponent>,
    public basicDataOfTheEducationalBuildingCairoBranchService: BasicDataOfTheEducationalBuildingCairoBranchService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataOfTheEducationalBuildingCairoBranch = new BasicDataOfTheEducationalBuildingCairoBranch();
    this.selectedBasicDataOfTheEducationalBuildingCairoBranch = this.selectedBasicDataOfTheEducationalBuildingCairoBranchDialog.data || this.selectedBasicDataOfTheEducationalBuildingCairoBranch;

    
	this.buildingMaterialSelectOptions = new MaterialSelectOptions({
	 data: this.constructionMaterialsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ماده البناء',
	});

	this.fenceStateSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله السور',
	});

	this.fenceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السور',
	});

	this.buildingOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.buildingOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكيه المبني',
	});

	this.landOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكيه الارض',
	});

	this.usePositionSelectOptions = new MaterialSelectOptions({
	 data: this.useBuildingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف استخدام',
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
      
  id : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.id],
  buildingCode : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingCode, [ Validators.required ]],
  coordinatesZ : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesZ, [ Validators.required ]],
  coordinatesY : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesY, [ Validators.required ]],
  coordinatesX : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesX, [ Validators.required ]],
  southwestFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.southwestFence, [ Validators.required ]],
  southeastFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.southeastFence, [ Validators.required ]],
  northwestFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.northwestFence, [ Validators.required ]],
  northeastFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.northeastFence, [ Validators.required ]],
  fenceRibEast : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibEast, [ Validators.required ]],
  fenceRibWest : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibWest, [ Validators.required ]],
  fenceRibSouth : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibSouth, [ Validators.required ]],
  fenceRibNorth : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibNorth, [ Validators.required ]],
  fenceHeight : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceHeight, [ Validators.required ]],
  phoneNumber : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.phoneNumber, [ Validators.required ]],
  address : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.address, [ Validators.required ]],
  buildingMaterial : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingMaterial, [ Validators.required ]],
  fenceState : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceState, [ Validators.required ]],
  fenceCode : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceCode, [ Validators.required ]],
  buildingOwnership : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingOwnership, [ Validators.required ]],
  landOwnership : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.landOwnership, [ Validators.required ]],
  usePosition : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.usePosition, [ Validators.required ]],
  positiveInfluentialStations : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.positiveInfluentialStations, [ Validators.required ]],
  negativeInfluentialStations : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.negativeInfluentialStations, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.basicDataOfTheEducationalBuildingCairoBranchService.update(this.basicDataOfTheEducationalBuildingCairoBranchForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.basicDataOfTheEducationalBuildingCairoBranchService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.basicDataOfTheEducationalBuildingCairoBranchForm.get(name);
  }

  initializeLookupServices() {
    this.constructionMaterialsService = new LookupService('constructionmaterials', this.http);
this.fenceStatusesService = new LookupService('fencestatuses', this.http);
this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);

  }
}
