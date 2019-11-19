
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExaminationCommitteeDateData } from 'app/shared/models/examination-committee-date-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExaminationCommitteeDateDataService } from '../shared/examination-committee-date-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-examination-committee-date-data-new',
  templateUrl: './examination-committee-date-data-new.component.html',
  styleUrls: ['./examination-committee-date-data-new.component.scss'],
  providers: [
    ]
})

export class ExaminationCommitteeDateDataNewComponent extends AppBaseComponent implements OnInit {
  examinationCommitteeDateDataForm: FormGroup;
  @Input() selectedExaminationCommitteeDateData: ExaminationCommitteeDateData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExaminationCommitteeDateDataNewComponent>,
    public examinationCommitteeDateDataService: ExaminationCommitteeDateDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExaminationCommitteeDateData = new ExaminationCommitteeDateData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.examinationCommitteeDateDataForm = this.formBuilder.group({
     
  id : [0],
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
    this.examinationCommitteeDateDataService.create(this.examinationCommitteeDateDataForm.value)
        .pipe(switchMap(x => {
			return this.examinationCommitteeDateDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.examinationCommitteeDateDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
