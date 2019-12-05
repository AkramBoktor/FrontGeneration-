
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TenderForBuildingsMaintenancePlan } from 'app/shared/models/tender-for-buildings-maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TenderForBuildingsMaintenancePlanService } from '../shared/tender-for-buildings-maintenance-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-tender-for-buildings-maintenance-plan-view',
  templateUrl: './tender-for-buildings-maintenance-plan-view.component.html',
  styleUrls: ['./tender-for-buildings-maintenance-plan-view.component.scss'],
  providers: []
})

export class TenderForBuildingsMaintenancePlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTenderForBuildingsMaintenancePlan: TenderForBuildingsMaintenancePlan;
  tenderForBuildingsMaintenancePlanForm: FormGroup;

  private governoratesService: LookupService;
private maintenanceTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
maintenanceTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTenderForBuildingsMaintenancePlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<TenderForBuildingsMaintenancePlanViewComponent>,
    public tenderForBuildingsMaintenancePlanService: TenderForBuildingsMaintenancePlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTenderForBuildingsMaintenancePlan = this.selectedTenderForBuildingsMaintenancePlanDialog.data || this.selectedTenderForBuildingsMaintenancePlan;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.maintenanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الصيانه',
	});


    this.tenderForBuildingsMaintenancePlanForm = this.formBuilder.group({
      
  yearPlan : [this.selectedTenderForBuildingsMaintenancePlan.yearPlan],
  buildingNumber : [this.selectedTenderForBuildingsMaintenancePlan.buildingNumber],
  schoolName : [this.selectedTenderForBuildingsMaintenancePlan.schoolName],
  governorate : [this.selectedTenderForBuildingsMaintenancePlan.governorate],
  maintenanceType : [this.selectedTenderForBuildingsMaintenancePlan.maintenanceType]
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
    return this.tenderForBuildingsMaintenancePlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.tenderForBuildingsMaintenancePlanForm.controls)) {
      this.tenderForBuildingsMaintenancePlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
  }
}

