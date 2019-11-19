
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SessionSubCodes } from 'app/shared/models/session-sub-codes';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SessionSubCodesService } from '../shared/session-sub-codes.service';

@Component({
  selector: 'app-session-sub-codes-view',
  templateUrl: './session-sub-codes-view.component.html',
  styleUrls: ['./session-sub-codes-view.component.scss'],
  providers: []
})

export class SessionSubCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSessionSubCodes: SessionSubCodes;
  sessionSubCodesForm: FormGroup;

  private commissionChairmanDecisionsService: LookupService;
private subClassificationsService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSessionSubCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<SessionSubCodesViewComponent>,
    public sessionSubCodesService: SessionSubCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSessionSubCodes = this.selectedSessionSubCodesDialog.data || this.selectedSessionSubCodes;

    
	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.commissionChairmanDecisionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});


    this.sessionSubCodesForm = this.formBuilder.group({
      
  courseName : [this.selectedSessionSubCodes.courseName],
  majorClassification : [this.selectedSessionSubCodes.majorClassification],
  subcategory : [this.selectedSessionSubCodes.subcategory]
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
    return this.sessionSubCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sessionSubCodesForm.controls)) {
      this.sessionSubCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.commissionChairmanDecisionsService = new LookupService('commissionchairmandecisions', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
  }
}

