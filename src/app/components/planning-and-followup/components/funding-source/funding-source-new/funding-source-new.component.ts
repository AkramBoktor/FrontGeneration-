
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FundingSource } from 'app/shared/models/funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FundingSourceService } from '../shared/funding-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-funding-source-new',
  templateUrl: './funding-source-new.component.html',
  styleUrls: ['./funding-source-new.component.scss'],
  providers: [
    ]
})

export class FundingSourceNewComponent extends AppBaseComponent implements OnInit {
  fundingSourceForm: FormGroup;
  @Input() selectedFundingSource: FundingSource;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FundingSourceNewComponent>,
    public fundingSourceService: FundingSourceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundingSource = new FundingSource();

    

    this.fundingSourceForm = this.formBuilder.group({
     
  id : [0],
  sourceCategory : [this.selectedFundingSource.sourceCategory, [ Validators.required ]],
  sourceCode : [this.selectedFundingSource.sourceCode, [ Validators.required ]],
  sourceName : [this.selectedFundingSource.sourceName, [ Validators.required ]],
  fundingStart : [this.selectedFundingSource.fundingStart, [ Validators.required ]],
  fundingEnd : [this.selectedFundingSource.fundingEnd, [ Validators.required ]],
  suggesteValue : [this.selectedFundingSource.suggesteValue, [ Validators.required ]],
  dateValue : [this.selectedFundingSource.dateValue, [ Validators.required ]],
  currentYearValue : [this.selectedFundingSource.currentYearValue, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.fundingSourceService.create(this.fundingSourceForm.value)
        .pipe(switchMap(x => {
			return this.fundingSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.fundingSourceForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
