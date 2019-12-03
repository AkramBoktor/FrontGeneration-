
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddPlanConditioning } from 'app/shared/models/add-plan-conditioning';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddPlanConditioningService } from '../shared/add-plan-conditioning.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-plan-conditioning-new',
  templateUrl: './add-plan-conditioning-new.component.html',
  styleUrls: ['./add-plan-conditioning-new.component.scss'],
  providers: [
    ]
})

export class AddPlanConditioningNewComponent extends AppBaseComponent implements OnInit {
  addPlanConditioningForm: FormGroup;
  @Input() selectedAddPlanConditioning: AddPlanConditioning;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private jobTypesService: LookupService;
private buildingTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
maintenanceDescriptionSelectOptions: MaterialSelectOptions;
buildingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceDescription', { static: true }) MaintenanceDescriptionSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AddPlanConditioningNewComponent>,
    public addPlanConditioningService: AddPlanConditioningService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddPlanConditioning = new AddPlanConditioning();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.maintenanceDescriptionSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفه قائم الصيانه',
	});

	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});


    this.addPlanConditioningForm = this.formBuilder.group({
     
  id : [0],
  period : [this.selectedAddPlanConditioning.period, [ Validators.required ]],
  maintainer : [this.selectedAddPlanConditioning.maintainer, [ Validators.required ]],
  building : [this.selectedAddPlanConditioning.building, [ Validators.required ]],
  buildingNumber : [this.selectedAddPlanConditioning.buildingNumber, [ Validators.required ]],
  plannedDate : [this.selectedAddPlanConditioning.plannedDate, [ Validators.required ]],
  region : [this.selectedAddPlanConditioning.region, [ Validators.required ]],
  maintenanceDescription : [this.selectedAddPlanConditioning.maintenanceDescription, [ Validators.required ]],
  buildingType : [this.selectedAddPlanConditioning.buildingType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.addPlanConditioningService.create(this.addPlanConditioningForm.value)
        .pipe(switchMap(x => {
			return this.addPlanConditioningService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.addPlanConditioningForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.buildingTypesService = new LookupService('buildingtypes', this.http);
  }
 }
