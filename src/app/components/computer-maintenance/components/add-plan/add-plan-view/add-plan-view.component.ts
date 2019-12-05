
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddPlan } from 'app/shared/models/add-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AddPlanService } from '../shared/add-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-plan-view',
  templateUrl: './add-plan-view.component.html',
  styleUrls: ['./add-plan-view.component.scss'],
  providers: []
})

export class AddPlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddPlan: AddPlan;
  addPlanForm: FormGroup;

  private areasService: LookupService;
private jobTypesService: LookupService;
private buildingTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
maintenanceDescriptionSelectOptions: MaterialSelectOptions;
buildingTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddPlanViewComponent>,
    public addPlanService: AddPlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddPlan = this.selectedAddPlanDialog.data || this.selectedAddPlan;

    
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


    this.addPlanForm = this.formBuilder.group({
      
  period : [this.selectedAddPlan.period],
  maintainer : [this.selectedAddPlan.maintainer],
  building : [this.selectedAddPlan.building],
  buildingNumber : [this.selectedAddPlan.buildingNumber],
  plannedDate : [this.selectedAddPlan.plannedDate],
  region : [this.selectedAddPlan.region],
  maintenanceDescription : [this.selectedAddPlan.maintenanceDescription],
  buildingType : [this.selectedAddPlan.buildingType]
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
    return this.addPlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addPlanForm.controls)) {
      this.addPlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.buildingTypesService = new LookupService('buildingtypes', this.http);
  }
}

