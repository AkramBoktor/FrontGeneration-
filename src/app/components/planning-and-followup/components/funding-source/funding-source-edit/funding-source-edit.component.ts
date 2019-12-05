
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FundingSource } from 'app/shared/models/funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FundingSourceService } from '../shared/funding-source.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-funding-source-edit',
  templateUrl: './funding-source-edit.component.html',
  styleUrls: ['./funding-source-edit.component.scss'],
  providers: []
})

export class FundingSourceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFundingSource: FundingSource;
  fundingSourceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFundingSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FundingSourceEditComponent>,
    public fundingSourceService: FundingSourceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundingSource = new FundingSource();
    this.selectedFundingSource = this.selectedFundingSourceDialog.data || this.selectedFundingSource;

    

    this.fundingSourceForm = this.formBuilder.group({
      
  id : [this.selectedFundingSource.id],
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
    this.fundingSourceService.update(this.fundingSourceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.fundingSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.fundingSourceForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
