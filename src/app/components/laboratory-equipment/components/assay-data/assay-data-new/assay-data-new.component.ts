
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssayData } from 'app/shared/models/assay-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayDataService } from '../shared/assay-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-data-new',
  templateUrl: './assay-data-new.component.html',
  styleUrls: ['./assay-data-new.component.scss'],
  providers: [
    ]
})

export class AssayDataNewComponent extends AppBaseComponent implements OnInit {
  assayDataForm: FormGroup;
  @Input() selectedAssayData: AssayData;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private offeringTermsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
offeringTermsSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringTerms', { static: true }) OfferingTermsSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssayDataNewComponent>,
    public assayDataService: AssayDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayData = new AssayData();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.offeringTermsSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTermsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'شروط الطرح',
	});


    this.assayDataForm = this.formBuilder.group({
     
  id : [0],
  assayNumber : [this.selectedAssayData.assayNumber, [ ]],
  supplyingDuration : [this.selectedAssayData.supplyingDuration, [ ]],
  processingType : [this.selectedAssayData.processingType, [ ]],
  offeringMethod : [this.selectedAssayData.offeringMethod, [ ]],
  offeringTerms : [this.selectedAssayData.offeringTerms, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assayDataService.create(this.assayDataForm.value)
        .pipe(switchMap(x => {
			return this.assayDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assayDataForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.offeringTermsService = new LookupService('offeringterms', this.http);
  }
 }
