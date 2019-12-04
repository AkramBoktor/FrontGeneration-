
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CodeOfVariousActivityOfApprovedCompanies } from 'app/shared/models/code-of-various-activity-of-approved-companies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CodeOfVariousActivityOfApprovedCompaniesService } from '../shared/code-of-various-activity-of-approved-companies.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-code-of-various-activity-of-approved-companies-view',
  templateUrl: './code-of-various-activity-of-approved-companies-view.component.html',
  styleUrls: ['./code-of-various-activity-of-approved-companies-view.component.scss'],
  providers: []
})

export class CodeOfVariousActivityOfApprovedCompaniesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCodeOfVariousActivityOfApprovedCompanies: CodeOfVariousActivityOfApprovedCompanies;
  codeOfVariousActivityOfApprovedCompaniesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCodeOfVariousActivityOfApprovedCompaniesDialog: any,
    @Optional() public dialogRef: MatDialogRef<CodeOfVariousActivityOfApprovedCompaniesViewComponent>,
    public codeOfVariousActivityOfApprovedCompaniesService: CodeOfVariousActivityOfApprovedCompaniesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodeOfVariousActivityOfApprovedCompanies = this.selectedCodeOfVariousActivityOfApprovedCompaniesDialog.data || this.selectedCodeOfVariousActivityOfApprovedCompanies;

    

    this.codeOfVariousActivityOfApprovedCompaniesForm = this.formBuilder.group({
      
  activityCode : [this.selectedCodeOfVariousActivityOfApprovedCompanies.activityCode],
  activityName : [this.selectedCodeOfVariousActivityOfApprovedCompanies.activityName]
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
    return this.codeOfVariousActivityOfApprovedCompaniesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.codeOfVariousActivityOfApprovedCompaniesForm.controls)) {
      this.codeOfVariousActivityOfApprovedCompaniesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

