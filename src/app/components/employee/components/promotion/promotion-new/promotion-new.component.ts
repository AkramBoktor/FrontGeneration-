
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Promotion } from 'app/shared/models/promotion';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { PromotionService } from '../shared/promotion.service';


@Component({
  selector: 'app-promotion-new',
  templateUrl: './promotion-new.component.html',
  styleUrls: ['./promotion-new.component.scss'],
  providers: [
    ]
})

export class PromotionNewComponent extends AppBaseComponent implements OnInit {
  promotionForm: FormGroup;
  @Input() selectedPromotion: Promotion;
  errorMessages: FormControlError[] = [
        
  ];

  private financialDegreesService: LookupService;
private jobTypesService: LookupService;
 

  
financialDegreeSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
preFinancialDegreeSelectOptions: MaterialSelectOptions;
previousJobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
	@ViewChild('preFinancialDegree', { static: true }) PreFinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('previousJobTitle', { static: true }) PreviousJobTitleSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PromotionNewComponent>,
    public promotionService: PromotionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPromotion = new Promotion();

    
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

	this.preFinancialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية السابقة',
	});

	this.previousJobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفة السابقة',
	});


    this.promotionForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedPromotion.employeeCode, [ Validators.required ]],
  promotionDate : [this.selectedPromotion.promotionDate, [ Validators.required ]],
  jobDate : [this.selectedPromotion.jobDate, [ Validators.required ]],
  previousJobDate : [this.selectedPromotion.previousJobDate, [ Validators.required ]],
  financialDegree : [this.selectedPromotion.financialDegree, [ Validators.required ]],
  jobTitle : [this.selectedPromotion.jobTitle, [ Validators.required ]],
  preFinancialDegree : [this.selectedPromotion.preFinancialDegree, [ ]],
  previousJobTitle : [this.selectedPromotion.previousJobTitle, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.promotionService.create(this.promotionForm.value)
        .pipe(switchMap(x => {
			return this.promotionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.promotionForm.get(name);
    }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
