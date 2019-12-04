
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CodeOfVariousActivityOfApprovedCompanies } from 'app/shared/models/code-of-various-activity-of-approved-companies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CodeOfVariousActivityOfApprovedCompaniesService } from '../shared/code-of-various-activity-of-approved-companies.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-code-of-various-activity-of-approved-companies-edit',
  templateUrl: './code-of-various-activity-of-approved-companies-edit.component.html',
  styleUrls: ['./code-of-various-activity-of-approved-companies-edit.component.scss'],
  providers: []
})

export class CodeOfVariousActivityOfApprovedCompaniesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCodeOfVariousActivityOfApprovedCompanies: CodeOfVariousActivityOfApprovedCompanies;
  codeOfVariousActivityOfApprovedCompaniesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCodeOfVariousActivityOfApprovedCompaniesDialog: any,
    @Optional() public dialogRef: MatDialogRef<CodeOfVariousActivityOfApprovedCompaniesEditComponent>,
    public codeOfVariousActivityOfApprovedCompaniesService: CodeOfVariousActivityOfApprovedCompaniesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodeOfVariousActivityOfApprovedCompanies = new CodeOfVariousActivityOfApprovedCompanies();
    this.selectedCodeOfVariousActivityOfApprovedCompanies = this.selectedCodeOfVariousActivityOfApprovedCompaniesDialog.data || this.selectedCodeOfVariousActivityOfApprovedCompanies;

    

    this.codeOfVariousActivityOfApprovedCompaniesForm = this.formBuilder.group({
      
  id : [this.selectedCodeOfVariousActivityOfApprovedCompanies.id],
  activityCode : [this.selectedCodeOfVariousActivityOfApprovedCompanies.activityCode, [ Validators.required ]],
  activityName : [this.selectedCodeOfVariousActivityOfApprovedCompanies.activityName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.codeOfVariousActivityOfApprovedCompaniesService.update(this.codeOfVariousActivityOfApprovedCompaniesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.codeOfVariousActivityOfApprovedCompaniesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.codeOfVariousActivityOfApprovedCompaniesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
