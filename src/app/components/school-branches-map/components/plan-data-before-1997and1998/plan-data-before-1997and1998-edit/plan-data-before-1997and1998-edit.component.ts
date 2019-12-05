
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PlanDataBefore1997and1998 } from 'app/shared/models/plan-data-before-1997and1998';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PlanDataBefore1997and1998Service } from '../shared/plan-data-before-1997and1998.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-plan-data-before-1997and1998-edit',
  templateUrl: './plan-data-before-1997and1998-edit.component.html',
  styleUrls: ['./plan-data-before-1997and1998-edit.component.scss'],
  providers: []
})

export class PlanDataBefore1997and1998EditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPlanDataBefore1997and1998: PlanDataBefore1997and1998;
  planDataBefore1997and1998Form: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private constructionTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPlanDataBefore1997and1998Dialog: any,
    @Optional() public dialogRef: MatDialogRef<PlanDataBefore1997and1998EditComponent>,
    public planDataBefore1997and1998Service: PlanDataBefore1997and1998Service) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPlanDataBefore1997and1998 = new PlanDataBefore1997and1998();
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
      
  id : [this.selectedPlanDataBefore1997and1998.id],
  schoolNumber : [this.selectedPlanDataBefore1997and1998.schoolNumber, [ Validators.required ]],
  schoolName : [this.selectedPlanDataBefore1997and1998.schoolName, [ ]],
  extension : [this.selectedPlanDataBefore1997and1998.extension, [ Validators.required ]],
  primaryDelivaryDate : [this.selectedPlanDataBefore1997and1998.primaryDelivaryDate, [ Validators.required ]],
  planYear : [this.selectedPlanDataBefore1997and1998.planYear, [ Validators.required ]],
  governorate : [this.selectedPlanDataBefore1997and1998.governorate, [ Validators.required ]],
  constructionType : [this.selectedPlanDataBefore1997and1998.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.planDataBefore1997and1998Service.update(this.planDataBefore1997and1998Form.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.planDataBefore1997and1998Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.planDataBefore1997and1998Form.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
