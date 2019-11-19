
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExtractionOfTemporaryCardCode } from 'app/shared/models/extraction-of-temporary-card-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExtractionOfTemporaryCardCodeService } from '../shared/extraction-of-temporary-card-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-extraction-of-temporary-card-code-edit',
  templateUrl: './extraction-of-temporary-card-code-edit.component.html',
  styleUrls: ['./extraction-of-temporary-card-code-edit.component.scss'],
  providers: []
})

export class ExtractionOfTemporaryCardCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExtractionOfTemporaryCardCode: ExtractionOfTemporaryCardCode;
  extractionOfTemporaryCardCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private cardCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
cardCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('cardCode', { static: true }) CardCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExtractionOfTemporaryCardCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExtractionOfTemporaryCardCodeEditComponent>,
    public extractionOfTemporaryCardCodeService: ExtractionOfTemporaryCardCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtractionOfTemporaryCardCode = new ExtractionOfTemporaryCardCode();
    this.selectedExtractionOfTemporaryCardCode = this.selectedExtractionOfTemporaryCardCodeDialog.data || this.selectedExtractionOfTemporaryCardCode;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.cardCodeSelectOptions = new MaterialSelectOptions({
	 data: this.cardCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الكارت',
	});


    this.extractionOfTemporaryCardCodeForm = this.formBuilder.group({
      
  id : [this.selectedExtractionOfTemporaryCardCode.id],
  temporaryCardNumber : [this.selectedExtractionOfTemporaryCardCode.temporaryCardNumber, [ Validators.required ]],
  temporaryNumberIssuing : [this.selectedExtractionOfTemporaryCardCode.temporaryNumberIssuing, [ Validators.required ]],
  branchCode : [this.selectedExtractionOfTemporaryCardCode.branchCode, [ Validators.required ]],
  cardCode : [this.selectedExtractionOfTemporaryCardCode.cardCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.extractionOfTemporaryCardCodeService.update(this.extractionOfTemporaryCardCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.extractionOfTemporaryCardCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.extractionOfTemporaryCardCodeForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.cardCodesService = new LookupService('cardcodes', this.http);
  }
}
