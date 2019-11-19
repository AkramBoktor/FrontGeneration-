
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExtractionOfTemporaryCardCode } from 'app/shared/models/extraction-of-temporary-card-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExtractionOfTemporaryCardCodeService } from '../shared/extraction-of-temporary-card-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-extraction-of-temporary-card-code-view',
  templateUrl: './extraction-of-temporary-card-code-view.component.html',
  styleUrls: ['./extraction-of-temporary-card-code-view.component.scss'],
  providers: []
})

export class ExtractionOfTemporaryCardCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExtractionOfTemporaryCardCode: ExtractionOfTemporaryCardCode;
  extractionOfTemporaryCardCodeForm: FormGroup;

  private branchCodesService: LookupService;
private cardCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
cardCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExtractionOfTemporaryCardCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExtractionOfTemporaryCardCodeViewComponent>,
    public extractionOfTemporaryCardCodeService: ExtractionOfTemporaryCardCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  temporaryCardNumber : [this.selectedExtractionOfTemporaryCardCode.temporaryCardNumber],
  temporaryNumberIssuing : [this.selectedExtractionOfTemporaryCardCode.temporaryNumberIssuing],
  branchCode : [this.selectedExtractionOfTemporaryCardCode.branchCode],
  cardCode : [this.selectedExtractionOfTemporaryCardCode.cardCode]
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
    return this.extractionOfTemporaryCardCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.extractionOfTemporaryCardCodeForm.controls)) {
      this.extractionOfTemporaryCardCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.cardCodesService = new LookupService('cardcodes', this.http);
  }
}

