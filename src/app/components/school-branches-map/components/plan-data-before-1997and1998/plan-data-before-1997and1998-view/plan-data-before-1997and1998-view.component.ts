
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PlanDataBefore1997and1998 } from 'app/shared/models/plan-data-before-1997and1998';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PlanDataBefore1997and1998Service } from '../shared/plan-data-before-1997and1998.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-plan-data-before-1997and1998-view',
  templateUrl: './plan-data-before-1997and1998-view.component.html',
  styleUrls: ['./plan-data-before-1997and1998-view.component.scss'],
  providers: []
})

export class PlanDataBefore1997and1998ViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPlanDataBefore1997and1998: PlanDataBefore1997and1998;
  planDataBefore1997and1998Form: FormGroup;

  private governoratesService: LookupService;
private constructionTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPlanDataBefore1997and1998Dialog: any,
    @Optional() public dialogRef: MatDialogRef<PlanDataBefore1997and1998ViewComponent>,
    public planDataBefore1997and1998Service: PlanDataBefore1997and1998Service) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPlanDataBefore1997and1998 = this.selectedPlanDataBefore1997and1998Dialog.data || this.selectedPlanDataBefore1997and1998;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.planDataBefore1997and1998Form = this.formBuilder.group({
      
  schoolNumber : [this.selectedPlanDataBefore1997and1998.schoolNumber],
  schoolName : [this.selectedPlanDataBefore1997and1998.schoolName],
  extension : [this.selectedPlanDataBefore1997and1998.extension],
  primaryDelivaryDate : [this.selectedPlanDataBefore1997and1998.primaryDelivaryDate],
  planYear : [this.selectedPlanDataBefore1997and1998.planYear],
  governorate : [this.selectedPlanDataBefore1997and1998.governorate],
  constructionType : [this.selectedPlanDataBefore1997and1998.constructionType]
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
    return this.planDataBefore1997and1998Form.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.planDataBefore1997and1998Form.controls)) {
      this.planDataBefore1997and1998Form.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

