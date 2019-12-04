
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddPlan } from 'app/shared/models/add-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddPlanService } from '../shared/add-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-plan-new',
  templateUrl: './add-plan-new.component.html',
  styleUrls: ['./add-plan-new.component.scss'],
  providers: [
    ]
})

export class AddPlanNewComponent extends AppBaseComponent implements OnInit {
  addPlanForm: FormGroup;
  @Input() selectedAddPlan: AddPlan;
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
    @Optional() public dialogRef: MatDialogRef<AddPlanNewComponent>,
    public addPlanService: AddPlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddPlan = new AddPlan();

    
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
     
  id : [0],
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
    this.addPlanService.create(this.addPlanForm.value)
        .pipe(switchMap(x => {
			return this.addPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
