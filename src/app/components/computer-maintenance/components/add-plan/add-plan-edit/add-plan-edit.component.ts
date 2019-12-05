
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AddPlan } from 'app/shared/models/add-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AddPlanService } from '../shared/add-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-plan-edit',
  templateUrl: './add-plan-edit.component.html',
  styleUrls: ['./add-plan-edit.component.scss'],
  providers: []
})

export class AddPlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddPlan: AddPlan;
  addPlanForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddPlanEditComponent>,
    public addPlanService: AddPlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddPlan = new AddPlan();
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
      
  id : [this.selectedAddPlan.id],
  period : [this.selectedAddPlan.period, [ Validators.required ]],
  maintainer : [this.selectedAddPlan.maintainer, [ Validators.required ]],
  building : [this.selectedAddPlan.building, [ Validators.required ]],
  buildingNumber : [this.selectedAddPlan.buildingNumber, [ Validators.required ]],
  plannedDate : [this.selectedAddPlan.plannedDate, [ Validators.required ]],
  region : [this.selectedAddPlan.region, [ Validators.required ]],
  maintenanceDescription : [this.selectedAddPlan.maintenanceDescription, [ Validators.required ]],
  buildingType : [this.selectedAddPlan.buildingType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.addPlanService.update(this.addPlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.addPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.addPlanForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.buildingTypesService = new LookupService('buildingtypes', this.http);
  }
}
