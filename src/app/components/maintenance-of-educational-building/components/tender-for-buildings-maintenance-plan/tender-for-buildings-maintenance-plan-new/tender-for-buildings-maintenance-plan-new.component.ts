
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TenderForBuildingsMaintenancePlan } from 'app/shared/models/tender-for-buildings-maintenance-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TenderForBuildingsMaintenancePlanService } from '../shared/tender-for-buildings-maintenance-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-tender-for-buildings-maintenance-plan-new',
  templateUrl: './tender-for-buildings-maintenance-plan-new.component.html',
  styleUrls: ['./tender-for-buildings-maintenance-plan-new.component.scss'],
  providers: [
    ]
})

export class TenderForBuildingsMaintenancePlanNewComponent extends AppBaseComponent implements OnInit {
  tenderForBuildingsMaintenancePlanForm: FormGroup;
  @Input() selectedTenderForBuildingsMaintenancePlan: TenderForBuildingsMaintenancePlan;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private maintenanceTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
maintenanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceType', { static: true }) MaintenanceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TenderForBuildingsMaintenancePlanNewComponent>,
    public tenderForBuildingsMaintenancePlanService: TenderForBuildingsMaintenancePlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTenderForBuildingsMaintenancePlan = new TenderForBuildingsMaintenancePlan();

    
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
     
  id : [0],
  yearPlan : [this.selectedTenderForBuildingsMaintenancePlan.yearPlan, [ Validators.required ]],
  buildingNumber : [this.selectedTenderForBuildingsMaintenancePlan.buildingNumber, [ Validators.required ]],
  schoolName : [this.selectedTenderForBuildingsMaintenancePlan.schoolName, [ Validators.required ]],
  governorate : [this.selectedTenderForBuildingsMaintenancePlan.governorate, [ Validators.required ]],
  maintenanceType : [this.selectedTenderForBuildingsMaintenancePlan.maintenanceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.tenderForBuildingsMaintenancePlanService.create(this.tenderForBuildingsMaintenancePlanForm.value)
        .pipe(switchMap(x => {
			return this.tenderForBuildingsMaintenancePlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.tenderForBuildingsMaintenancePlanForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
  }
 }
