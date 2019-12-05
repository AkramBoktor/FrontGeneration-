
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CodeOfVariousActivityOfApprovedCompanies } from 'app/shared/models/code-of-various-activity-of-approved-companies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CodeOfVariousActivityOfApprovedCompaniesService } from '../shared/code-of-various-activity-of-approved-companies.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-code-of-various-activity-of-approved-companies-new',
  templateUrl: './code-of-various-activity-of-approved-companies-new.component.html',
  styleUrls: ['./code-of-various-activity-of-approved-companies-new.component.scss'],
  providers: [
    ]
})

export class CodeOfVariousActivityOfApprovedCompaniesNewComponent extends AppBaseComponent implements OnInit {
  codeOfVariousActivityOfApprovedCompaniesForm: FormGroup;
  @Input() selectedCodeOfVariousActivityOfApprovedCompanies: CodeOfVariousActivityOfApprovedCompanies;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CodeOfVariousActivityOfApprovedCompaniesNewComponent>,
    public codeOfVariousActivityOfApprovedCompaniesService: CodeOfVariousActivityOfApprovedCompaniesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodeOfVariousActivityOfApprovedCompanies = new CodeOfVariousActivityOfApprovedCompanies();

    

    this.codeOfVariousActivityOfApprovedCompaniesForm = this.formBuilder.group({
     
  id : [0],
  activityCode : [this.selectedCodeOfVariousActivityOfApprovedCompanies.activityCode, [ Validators.required ]],
  activityName : [this.selectedCodeOfVariousActivityOfApprovedCompanies.activityName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.codeOfVariousActivityOfApprovedCompaniesService.create(this.codeOfVariousActivityOfApprovedCompaniesForm.value)
        .pipe(switchMap(x => {
			return this.codeOfVariousActivityOfApprovedCompaniesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.codeOfVariousActivityOfApprovedCompaniesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
