
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CodeOfApprovedCompaniesRepresentative } from 'app/shared/models/code-of-approved-companies-representative';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CodeOfApprovedCompaniesRepresentativeService } from '../shared/code-of-approved-companies-representative.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-code-of-approved-companies-representative-new',
  templateUrl: './code-of-approved-companies-representative-new.component.html',
  styleUrls: ['./code-of-approved-companies-representative-new.component.scss'],
  providers: [
    ]
})

export class CodeOfApprovedCompaniesRepresentativeNewComponent extends AppBaseComponent implements OnInit {
  codeOfApprovedCompaniesRepresentativeForm: FormGroup;
  @Input() selectedCodeOfApprovedCompaniesRepresentative: CodeOfApprovedCompaniesRepresentative;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CodeOfApprovedCompaniesRepresentativeNewComponent>,
    public codeOfApprovedCompaniesRepresentativeService: CodeOfApprovedCompaniesRepresentativeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodeOfApprovedCompaniesRepresentative = new CodeOfApprovedCompaniesRepresentative();

    

    this.codeOfApprovedCompaniesRepresentativeForm = this.formBuilder.group({
     
  id : [0],
  objectiveCode : [this.selectedCodeOfApprovedCompaniesRepresentative.objectiveCode, [ Validators.required ]],
  objectiveName : [this.selectedCodeOfApprovedCompaniesRepresentative.objectiveName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.codeOfApprovedCompaniesRepresentativeService.create(this.codeOfApprovedCompaniesRepresentativeForm.value)
        .pipe(switchMap(x => {
			return this.codeOfApprovedCompaniesRepresentativeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.codeOfApprovedCompaniesRepresentativeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
