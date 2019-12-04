
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddExtensionsOnConstructionPlan } from 'app/shared/models/add-extensions-on-construction-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AddExtensionsOnConstructionPlanService } from '../shared/add-extensions-on-construction-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-extensions-on-construction-plan-view',
  templateUrl: './add-extensions-on-construction-plan-view.component.html',
  styleUrls: ['./add-extensions-on-construction-plan-view.component.scss'],
  providers: []
})

export class AddExtensionsOnConstructionPlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddExtensionsOnConstructionPlan: AddExtensionsOnConstructionPlan;
  addExtensionsOnConstructionPlanForm: FormGroup;

  private branchCodesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;
regionSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddExtensionsOnConstructionPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddExtensionsOnConstructionPlanViewComponent>,
    public addExtensionsOnConstructionPlanService: AddExtensionsOnConstructionPlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddExtensionsOnConstructionPlan = this.selectedAddExtensionsOnConstructionPlanDialog.data || this.selectedAddExtensionsOnConstructionPlan;

    
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
      
  buildingCode : [this.selectedAddExtensionsOnConstructionPlan.buildingCode],
  planYear : [this.selectedAddExtensionsOnConstructionPlan.planYear],
  extensionSerial : [this.selectedAddExtensionsOnConstructionPlan.extensionSerial],
  branch : [this.selectedAddExtensionsOnConstructionPlan.branch],
  region : [this.selectedAddExtensionsOnConstructionPlan.region],
  constructionType : [this.selectedAddExtensionsOnConstructionPlan.constructionType]
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
    return this.addExtensionsOnConstructionPlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addExtensionsOnConstructionPlanForm.controls)) {
      this.addExtensionsOnConstructionPlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

