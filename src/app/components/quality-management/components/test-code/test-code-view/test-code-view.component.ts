
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TestCode } from 'app/shared/models/test-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TestCodeService } from '../shared/test-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-test-code-view',
  templateUrl: './test-code-view.component.html',
  styleUrls: ['./test-code-view.component.scss'],
  providers: []
})

export class TestCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTestCode: TestCode;
  testCodeForm: FormGroup;

  private yesOrNoService: LookupService;
private priceRelationshipsService: LookupService;

  
hasAgeSelectOptions: MaterialSelectOptions;
priceRelationshipSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTestCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<TestCodeViewComponent>,
    public testCodeService: TestCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTestCode = this.selectedTestCodeDialog.data || this.selectedTestCode;

    
	this.hasAgeSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'لها عمر',
	});

	this.priceRelationshipSelectOptions = new MaterialSelectOptions({
	 data: this.priceRelationshipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'علاقة السعر',
	});


    this.testCodeForm = this.formBuilder.group({
      
  basicMaterialCode : [this.selectedTestCode.basicMaterialCode],
  subMaterialCode : [this.selectedTestCode.subMaterialCode],
  testCode : [this.selectedTestCode.testCode],
  testName : [this.selectedTestCode.testName],
  testPrice : [this.selectedTestCode.testPrice],
  hasAge : [this.selectedTestCode.hasAge],
  priceRelationship : [this.selectedTestCode.priceRelationship]
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
    return this.testCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.testCodeForm.controls)) {
      this.testCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.priceRelationshipsService = new LookupService('pricerelationships', this.http);
  }
}

