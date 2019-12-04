
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddPlanConditioning } from 'app/shared/models/add-plan-conditioning';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AddPlanConditioningService } from '../shared/add-plan-conditioning.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-plan-conditioning-view',
  templateUrl: './add-plan-conditioning-view.component.html',
  styleUrls: ['./add-plan-conditioning-view.component.scss'],
  providers: []
})

export class AddPlanConditioningViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddPlanConditioning: AddPlanConditioning;
  addPlanConditioningForm: FormGroup;

  private areasService: LookupService;
private jobTypesService: LookupService;
private buildingTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
maintenanceDescriptionSelectOptions: MaterialSelectOptions;
buildingTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddPlanConditioningDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddPlanConditioningViewComponent>,
    public addPlanConditioningService: AddPlanConditioningService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  period : [this.selectedAddPlanConditioning.period],
  maintainer : [this.selectedAddPlanConditioning.maintainer],
  building : [this.selectedAddPlanConditioning.building],
  buildingNumber : [this.selectedAddPlanConditioning.buildingNumber],
  plannedDate : [this.selectedAddPlanConditioning.plannedDate],
  region : [this.selectedAddPlanConditioning.region],
  maintenanceDescription : [this.selectedAddPlanConditioning.maintenanceDescription],
  buildingType : [this.selectedAddPlanConditioning.buildingType]
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
    return this.addPlanConditioningForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addPlanConditioningForm.controls)) {
      this.addPlanConditioningForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.buildingTypesService = new LookupService('buildingtypes', this.http);
  }
}

