
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Promotion } from 'app/shared/models/promotion';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { PromotionService } from '../shared/promotion.service';




@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss'],
  providers: []
})

export class PromotionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPromotion: Promotion;
  promotionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private financialDegreesService: LookupService;
private jobTypesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPromotionDialog: any,
    @Optional() public dialogRef: MatDialogRef<PromotionEditComponent>,
    public promotionService: PromotionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPromotion = new Promotion();
    this.selectedPromotion = this.selectedPromotionDialog.data || this.selectedPromotion;

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفة',
	});


    this.promotionForm = this.formBuilder.group({
      
  id : [this.selectedPromotion.id],
  employeeCode : [this.selectedPromotion.employeeCode, [ Validators.required ]],
  promotionDate : [this.selectedPromotion.promotionDate, [ Validators.required ]],
  jobDate : [this.selectedPromotion.jobDate, [ Validators.required ]],
  financialDegree : [this.selectedPromotion.financialDegree, [ Validators.required ]],
  jobTitle : [this.selectedPromotion.jobTitle, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.promotionService.update(this.promotionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.promotionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.promotionForm.get(name);
  }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
