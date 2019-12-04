
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GeneralLocationOfAnAdministrativeBuilding } from 'app/shared/models/general-location-of-an-administrative-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralLocationOfAnAdministrativeBuildingService } from '../shared/general-location-of-an-administrative-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-location-of-an-administrative-building-new',
  templateUrl: './general-location-of-an-administrative-building-new.component.html',
  styleUrls: ['./general-location-of-an-administrative-building-new.component.scss'],
  providers: [
    ]
})

export class GeneralLocationOfAnAdministrativeBuildingNewComponent extends AppBaseComponent implements OnInit {
  generalLocationOfAnAdministrativeBuildingForm: FormGroup;
  @Input() selectedGeneralLocationOfAnAdministrativeBuilding: GeneralLocationOfAnAdministrativeBuilding;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionCodesService: LookupService;
private neighborStatesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
limitDirectionSelectOptions: MaterialSelectOptions;
adjacentNeighborStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerCode', { static: true }) CenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('limitDirection', { static: true }) LimitDirectionSelectComponent: MaterialSelectComponent;
	@ViewChild('adjacentNeighborStatus', { static: true }) AdjacentNeighborStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GeneralLocationOfAnAdministrativeBuildingNewComponent>,
    public generalLocationOfAnAdministrativeBuildingService: GeneralLocationOfAnAdministrativeBuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralLocationOfAnAdministrativeBuilding = new GeneralLocationOfAnAdministrativeBuilding();

    
	this.centerCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.limitDirectionSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اتجاه الحد',
	});

	this.adjacentNeighborStatusSelectOptions = new MaterialSelectOptions({
	 data: this.neighborStatesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الجار الملاصق',
	});


    this.generalLocationOfAnAdministrativeBuildingForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.buildingCode, [ Validators.required ]],
  lengthLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.lengthLimit, [ Validators.required ]],
  theAngleOfInclinationOfTheLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.theAngleOfInclinationOfTheLimit, [ Validators.required ]],
  descriptionOfTheLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.descriptionOfTheLimit, [ Validators.required ]],
  mainRoadLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.mainRoadLevel, [ Validators.required ]],
  groundFloorLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.groundFloorLevel, [ Validators.required ]],
  theLevelOfTheCourtyardWithinTheSite : [this.selectedGeneralLocationOfAnAdministrativeBuilding.theLevelOfTheCourtyardWithinTheSite, [ Validators.required ]],
  seaLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.seaLevel, [ Validators.required ]],
  centerCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.centerCode, [ Validators.required ]],
  branchCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.branchCode, [ Validators.required ]],
  limitDirection : [this.selectedGeneralLocationOfAnAdministrativeBuilding.limitDirection, [ Validators.required ]],
  adjacentNeighborStatus : [this.selectedGeneralLocationOfAnAdministrativeBuilding.adjacentNeighborStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.generalLocationOfAnAdministrativeBuildingService.create(this.generalLocationOfAnAdministrativeBuildingForm.value)
        .pipe(switchMap(x => {
			return this.generalLocationOfAnAdministrativeBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.generalLocationOfAnAdministrativeBuildingForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
this.neighborStatesService = new LookupService('neighborstates', this.http);
  }
 }
