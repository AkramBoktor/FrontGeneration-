
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordingEmployeeDebtValues } from 'app/shared/models/recording-employee-debt-values';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingEmployeeDebtValuesService } from '../shared/recording-employee-debt-values.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-employee-debt-values-new',
  templateUrl: './recording-employee-debt-values-new.component.html',
  styleUrls: ['./recording-employee-debt-values-new.component.scss'],
  providers: [
    ]
})

export class RecordingEmployeeDebtValuesNewComponent extends AppBaseComponent implements OnInit {
  recordingEmployeeDebtValuesForm: FormGroup;
  @Input() selectedRecordingEmployeeDebtValues: RecordingEmployeeDebtValues;
  errorMessages: FormControlError[] = [
        
  ];

  private discountTypesService: LookupService;

  
discountTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('discountType', { static: true }) DiscountTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordingEmployeeDebtValuesNewComponent>,
    public recordingEmployeeDebtValuesService: RecordingEmployeeDebtValuesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingEmployeeDebtValues = new RecordingEmployeeDebtValues();

    
	this.discountTypeSelectOptions = new MaterialSelectOptions({
	 data: this.discountTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخصم',
	});


    this.recordingEmployeeDebtValuesForm = this.formBuilder.group({
     
  id : [0],
  correctionNumber : [this.selectedRecordingEmployeeDebtValues.correctionNumber, [ Validators.required ]],
  employeeCode : [this.selectedRecordingEmployeeDebtValues.employeeCode, [ Validators.required ]],
  discountValue : [this.selectedRecordingEmployeeDebtValues.discountValue, [ Validators.required ]],
  discountType : [this.selectedRecordingEmployeeDebtValues.discountType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.recordingEmployeeDebtValuesService.create(this.recordingEmployeeDebtValuesForm.value)
        .pipe(switchMap(x => {
			return this.recordingEmployeeDebtValuesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordingEmployeeDebtValuesForm.get(name);
    }

  initializeLookupServices() {
    this.discountTypesService = new LookupService('discounttypes', this.http);
  }
 }
