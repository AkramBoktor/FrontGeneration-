
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssayData } from 'app/shared/models/assay-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssayDataService } from '../shared/assay-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-data-edit',
  templateUrl: './assay-data-edit.component.html',
  styleUrls: ['./assay-data-edit.component.scss'],
  providers: []
})

export class AssayDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayData: AssayData;
  assayDataForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayDataEditComponent>,
    public assayDataService: AssayDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayData = new AssayData();
    this.selectedAssayData = this.selectedAssayDataDialog.data || this.selectedAssayData;

    
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
      
  id : [this.selectedAssayData.id],
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
    this.assayDataService.update(this.assayDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assayDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assayDataForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.offeringTermsService = new LookupService('offeringterms', this.http);
  }
}
