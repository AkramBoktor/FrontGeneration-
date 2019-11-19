
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExaminationCommitteeDateData } from 'app/shared/models/examination-committee-date-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExaminationCommitteeDateDataService } from '../shared/examination-committee-date-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-examination-committee-date-data-edit',
  templateUrl: './examination-committee-date-data-edit.component.html',
  styleUrls: ['./examination-committee-date-data-edit.component.scss'],
  providers: []
})

export class ExaminationCommitteeDateDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExaminationCommitteeDateData: ExaminationCommitteeDateData;
  examinationCommitteeDateDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExaminationCommitteeDateDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExaminationCommitteeDateDataEditComponent>,
    public examinationCommitteeDateDataService: ExaminationCommitteeDateDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExaminationCommitteeDateData = new ExaminationCommitteeDateData();
    this.selectedExaminationCommitteeDateData = this.selectedExaminationCommitteeDateDataDialog.data || this.selectedExaminationCommitteeDateData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.examinationCommitteeDateDataForm = this.formBuilder.group({
      
  id : [this.selectedExaminationCommitteeDateData.id],
  bidNumber : [this.selectedExaminationCommitteeDateData.bidNumber, [ Validators.required ]],
  meetingNumber : [this.selectedExaminationCommitteeDateData.meetingNumber, [ Validators.required ]],
  committeeDate : [this.selectedExaminationCommitteeDateData.committeeDate, [ Validators.required ]],
  committeeHeadquarters : [this.selectedExaminationCommitteeDateData.committeeHeadquarters, [ Validators.required ]],
  approvalFormationDate : [this.selectedExaminationCommitteeDateData.approvalFormationDate, [ Validators.required ]],
  offeringProcedures : [this.selectedExaminationCommitteeDateData.offeringProcedures, [ Validators.required ]],
  offeringType : [this.selectedExaminationCommitteeDateData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.examinationCommitteeDateDataService.update(this.examinationCommitteeDateDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.examinationCommitteeDateDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.examinationCommitteeDateDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
