
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CodeOfApprovedCompaniesRepresentative } from 'app/shared/models/code-of-approved-companies-representative';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CodeOfApprovedCompaniesRepresentativeService } from '../shared/code-of-approved-companies-representative.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-code-of-approved-companies-representative-edit',
  templateUrl: './code-of-approved-companies-representative-edit.component.html',
  styleUrls: ['./code-of-approved-companies-representative-edit.component.scss'],
  providers: []
})

export class CodeOfApprovedCompaniesRepresentativeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCodeOfApprovedCompaniesRepresentative: CodeOfApprovedCompaniesRepresentative;
  codeOfApprovedCompaniesRepresentativeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCodeOfApprovedCompaniesRepresentativeDialog: any,
    @Optional() public dialogRef: MatDialogRef<CodeOfApprovedCompaniesRepresentativeEditComponent>,
    public codeOfApprovedCompaniesRepresentativeService: CodeOfApprovedCompaniesRepresentativeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodeOfApprovedCompaniesRepresentative = new CodeOfApprovedCompaniesRepresentative();
    this.selectedCodeOfApprovedCompaniesRepresentative = this.selectedCodeOfApprovedCompaniesRepresentativeDialog.data || this.selectedCodeOfApprovedCompaniesRepresentative;

    

    this.codeOfApprovedCompaniesRepresentativeForm = this.formBuilder.group({
      
  id : [this.selectedCodeOfApprovedCompaniesRepresentative.id],
  objectiveCode : [this.selectedCodeOfApprovedCompaniesRepresentative.objectiveCode, [ Validators.required ]],
  objectiveName : [this.selectedCodeOfApprovedCompaniesRepresentative.objectiveName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.codeOfApprovedCompaniesRepresentativeService.update(this.codeOfApprovedCompaniesRepresentativeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.codeOfApprovedCompaniesRepresentativeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.codeOfApprovedCompaniesRepresentativeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
