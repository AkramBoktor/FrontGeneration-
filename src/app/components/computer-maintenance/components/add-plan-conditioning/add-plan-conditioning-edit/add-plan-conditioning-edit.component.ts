
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AddPlanConditioning } from 'app/shared/models/add-plan-conditioning';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AddPlanConditioningService } from '../shared/add-plan-conditioning.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-plan-conditioning-edit',
  templateUrl: './add-plan-conditioning-edit.component.html',
  styleUrls: ['./add-plan-conditioning-edit.component.scss'],
  providers: []
})

export class AddPlanConditioningEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddPlanConditioning: AddPlanConditioning;
  addPlanConditioningForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddPlanConditioningDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddPlanConditioningEditComponent>,
    public addPlanConditioningService: AddPlanConditioningService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddPlanConditioning = new AddPlanConditioning();
    this.selectedAddPlanConditioning = this.selectedAddPlanConditioningDialog.data || this.selectedAddPlanConditioning;

    
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
      
  id : [this.selectedAddPlanConditioning.id],
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
    this.addPlanConditioningService.update(this.addPlanConditioningForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.addPlanConditioningService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.addPlanConditioningForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.buildingTypesService = new LookupService('buildingtypes', this.http);
  }
}
