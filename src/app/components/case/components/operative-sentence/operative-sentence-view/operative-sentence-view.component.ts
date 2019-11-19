
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OperativeSentence } from 'app/shared/models/operative-sentence';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OperativeSentenceService } from '../shared/operative-sentence.service';

@Component({
  selector: 'app-operative-sentence-view',
  templateUrl: './operative-sentence-view.component.html',
  styleUrls: ['./operative-sentence-view.component.scss'],
  providers: []
})

export class OperativeSentenceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOperativeSentence: OperativeSentence;
  operativeSentenceForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private bodyAttributesService: LookupService;
private judgmentResultsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
judgmentresultSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOperativeSentenceDialog: any,
    @Optional() public dialogRef: MatDialogRef<OperativeSentenceViewComponent>,
    public operativeSentenceService: OperativeSentenceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOperativeSentence = this.selectedOperativeSentenceDialog.data || this.selectedOperativeSentence;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.judgmentresultSelectOptions = new MaterialSelectOptions({
	 data: this.judgmentResultsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نتيجة الحكم',
	});


    this.operativeSentenceForm = this.formBuilder.group({
      
  fileNumber : [this.selectedOperativeSentence.fileNumber],
  entityName : [this.selectedOperativeSentence.entityName],
  judgmentDate : [this.selectedOperativeSentence.judgmentDate],
  statement : [this.selectedOperativeSentence.statement],
  branchCode : [this.selectedOperativeSentence.branchCode],
  entityType : [this.selectedOperativeSentence.entityType],
  entityCode : [this.selectedOperativeSentence.entityCode],
  whoIs : [this.selectedOperativeSentence.whoIs],
  judgmentresult : [this.selectedOperativeSentence.judgmentresult]
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
    return this.operativeSentenceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.operativeSentenceForm.controls)) {
      this.operativeSentenceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.judgmentResultsService = new LookupService('judgmentresults', this.http);
  }
}

