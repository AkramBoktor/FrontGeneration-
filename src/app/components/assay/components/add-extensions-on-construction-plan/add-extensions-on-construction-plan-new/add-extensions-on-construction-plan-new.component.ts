
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddExtensionsOnConstructionPlan } from 'app/shared/models/add-extensions-on-construction-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddExtensionsOnConstructionPlanService } from '../shared/add-extensions-on-construction-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-extensions-on-construction-plan-new',
  templateUrl: './add-extensions-on-construction-plan-new.component.html',
  styleUrls: ['./add-extensions-on-construction-plan-new.component.scss'],
  providers: [
    ]
})

export class AddExtensionsOnConstructionPlanNewComponent extends AppBaseComponent implements OnInit {
  addExtensionsOnConstructionPlanForm: FormGroup;
  @Input() selectedAddExtensionsOnConstructionPlan: AddExtensionsOnConstructionPlan;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;
regionSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AddExtensionsOnConstructionPlanNewComponent>,
    public addExtensionsOnConstructionPlanService: AddExtensionsOnConstructionPlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddExtensionsOnConstructionPlan = new AddExtensionsOnConstructionPlan();

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع',
	});

	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});


    this.addExtensionsOnConstructionPlanForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedAddExtensionsOnConstructionPlan.buildingCode, [ Validators.required ]],
  planYear : [this.selectedAddExtensionsOnConstructionPlan.planYear, [ Validators.required ]],
  extensionSerial : [this.selectedAddExtensionsOnConstructionPlan.extensionSerial, [ Validators.required ]],
  branch : [this.selectedAddExtensionsOnConstructionPlan.branch, [ ]],
  region : [this.selectedAddExtensionsOnConstructionPlan.region, [ ]],
  constructionType : [this.selectedAddExtensionsOnConstructionPlan.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.addExtensionsOnConstructionPlanService.create(this.addExtensionsOnConstructionPlanForm.value)
        .pipe(switchMap(x => {
			return this.addExtensionsOnConstructionPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.addExtensionsOnConstructionPlanForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
