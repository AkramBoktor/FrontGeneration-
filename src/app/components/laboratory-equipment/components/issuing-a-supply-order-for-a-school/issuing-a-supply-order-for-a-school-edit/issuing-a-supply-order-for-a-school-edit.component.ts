
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IssuingASupplyOrderForASchool } from 'app/shared/models/issuing-a-supply-order-for-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IssuingASupplyOrderForASchoolService } from '../shared/issuing-a-supply-order-for-a-school.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-issuing-a-supply-order-for-a-school-edit',
  templateUrl: './issuing-a-supply-order-for-a-school-edit.component.html',
  styleUrls: ['./issuing-a-supply-order-for-a-school-edit.component.scss'],
  providers: []
})

export class IssuingASupplyOrderForASchoolEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIssuingASupplyOrderForASchool: IssuingASupplyOrderForASchool;
  issuingASupplyOrderForASchoolForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;
private constructionTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIssuingASupplyOrderForASchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<IssuingASupplyOrderForASchoolEditComponent>,
    public issuingASupplyOrderForASchoolService: IssuingASupplyOrderForASchoolService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIssuingASupplyOrderForASchool = new IssuingASupplyOrderForASchool();
    this.selectedIssuingASupplyOrderForASchool = this.selectedIssuingASupplyOrderForASchoolDialog.data || this.selectedIssuingASupplyOrderForASchool;

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.issuingASupplyOrderForASchoolForm = this.formBuilder.group({
      
  id : [this.selectedIssuingASupplyOrderForASchool.id],
  yearPlan : [this.selectedIssuingASupplyOrderForASchool.yearPlan, [ ]],
  bidNumber : [this.selectedIssuingASupplyOrderForASchool.bidNumber, [ ]],
  orderNumber : [this.selectedIssuingASupplyOrderForASchool.orderNumber, [ ]],
  supplyOrderDate : [this.selectedIssuingASupplyOrderForASchool.supplyOrderDate, [ ]],
  orderType : [this.selectedIssuingASupplyOrderForASchool.orderType, [ ]],
  constructionPlanYear : [this.selectedIssuingASupplyOrderForASchool.constructionPlanYear, [ ]],
  buildingName : [this.selectedIssuingASupplyOrderForASchool.buildingName, [ ]],
  number : [this.selectedIssuingASupplyOrderForASchool.number, [ ]],
  companyName : [this.selectedIssuingASupplyOrderForASchool.companyName, [ ]],
  listName : [this.selectedIssuingASupplyOrderForASchool.listName, [ ]],
  quantity : [this.selectedIssuingASupplyOrderForASchool.quantity, [ ]],
  processingType : [this.selectedIssuingASupplyOrderForASchool.processingType, [ ]],
  offeringType : [this.selectedIssuingASupplyOrderForASchool.offeringType, [ Validators.required ]],
  offeringMethod : [this.selectedIssuingASupplyOrderForASchool.offeringMethod, [ Validators.required ]],
  constructionType : [this.selectedIssuingASupplyOrderForASchool.constructionType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.issuingASupplyOrderForASchoolService.update(this.issuingASupplyOrderForASchoolForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.issuingASupplyOrderForASchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.issuingASupplyOrderForASchoolForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
