
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalAssayData } from 'app/shared/models/typical-assay-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalAssayDataService } from '../shared/typical-assay-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-assay-data-new',
  templateUrl: './typical-assay-data-new.component.html',
  styleUrls: ['./typical-assay-data-new.component.scss'],
  providers: [
    ]
})

export class TypicalAssayDataNewComponent extends AppBaseComponent implements OnInit {
  typicalAssayDataForm: FormGroup;
  @Input() selectedTypicalAssayData: TypicalAssayData;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private offeringTermsService: LookupService;
private offeringMethodsService: LookupService;
private conditionCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTermsSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
conditionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringTerms', { static: true }) OfferingTermsSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('conditionCode', { static: true }) ConditionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalAssayDataNewComponent>,
    public typicalAssayDataService: TypicalAssayDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalAssayData = new TypicalAssayData();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTermsSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTermsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'شروط الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.conditionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.conditionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الشرط',
	});


    this.typicalAssayDataForm = this.formBuilder.group({
     
  id : [0],
  assayNumber : [this.selectedTypicalAssayData.assayNumber, [ ]],
  supplyingDuration : [this.selectedTypicalAssayData.supplyingDuration, [ ]],
  processingType : [this.selectedTypicalAssayData.processingType, [ Validators.required ]],
  offeringTerms : [this.selectedTypicalAssayData.offeringTerms, [ ]],
  offeringMethod : [this.selectedTypicalAssayData.offeringMethod, [ ]],
  conditionCode : [this.selectedTypicalAssayData.conditionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalAssayDataService.create(this.typicalAssayDataForm.value)
        .pipe(switchMap(x => {
			return this.typicalAssayDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalAssayDataForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTermsService = new LookupService('offeringterms', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.conditionCodesService = new LookupService('conditioncodes', this.http);
  }
 }
