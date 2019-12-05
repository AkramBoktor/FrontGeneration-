
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CodeOfApprovedCompaniesRepresentative } from 'app/shared/models/code-of-approved-companies-representative';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CodeOfApprovedCompaniesRepresentativeService } from '../shared/code-of-approved-companies-representative.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-code-of-approved-companies-representative-view',
  templateUrl: './code-of-approved-companies-representative-view.component.html',
  styleUrls: ['./code-of-approved-companies-representative-view.component.scss'],
  providers: []
})

export class CodeOfApprovedCompaniesRepresentativeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCodeOfApprovedCompaniesRepresentative: CodeOfApprovedCompaniesRepresentative;
  codeOfApprovedCompaniesRepresentativeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCodeOfApprovedCompaniesRepresentativeDialog: any,
    @Optional() public dialogRef: MatDialogRef<CodeOfApprovedCompaniesRepresentativeViewComponent>,
    public codeOfApprovedCompaniesRepresentativeService: CodeOfApprovedCompaniesRepresentativeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodeOfApprovedCompaniesRepresentative = this.selectedCodeOfApprovedCompaniesRepresentativeDialog.data || this.selectedCodeOfApprovedCompaniesRepresentative;

    

    this.codeOfApprovedCompaniesRepresentativeForm = this.formBuilder.group({
      
  objectiveCode : [this.selectedCodeOfApprovedCompaniesRepresentative.objectiveCode],
  objectiveName : [this.selectedCodeOfApprovedCompaniesRepresentative.objectiveName]
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
    return this.codeOfApprovedCompaniesRepresentativeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.codeOfApprovedCompaniesRepresentativeForm.controls)) {
      this.codeOfApprovedCompaniesRepresentativeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

