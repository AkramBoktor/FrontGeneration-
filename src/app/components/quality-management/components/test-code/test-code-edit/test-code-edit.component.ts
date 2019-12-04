
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TestCode } from 'app/shared/models/test-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TestCodeService } from '../shared/test-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-test-code-edit',
  templateUrl: './test-code-edit.component.html',
  styleUrls: ['./test-code-edit.component.scss'],
  providers: []
})

export class TestCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTestCode: TestCode;
  testCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private yesOrNoService: LookupService;
private priceRelationshipsService: LookupService;

  
hasAgeSelectOptions: MaterialSelectOptions;
priceRelationshipSelectOptions: MaterialSelectOptions;

  
	@ViewChild('hasAge', { static: true }) HasAgeSelectComponent: MaterialSelectComponent;
	@ViewChild('priceRelationship', { static: true }) PriceRelationshipSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTestCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<TestCodeEditComponent>,
    public testCodeService: TestCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTestCode = new TestCode();
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
      
  id : [this.selectedTestCode.id],
  basicMaterialCode : [this.selectedTestCode.basicMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedTestCode.subMaterialCode, [ Validators.required ]],
  testCode : [this.selectedTestCode.testCode, [ Validators.required ]],
  testName : [this.selectedTestCode.testName, [ Validators.required ]],
  testPrice : [this.selectedTestCode.testPrice, [ Validators.required ]],
  hasAge : [this.selectedTestCode.hasAge, [ Validators.required ]],
  priceRelationship : [this.selectedTestCode.priceRelationship, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.testCodeService.update(this.testCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.testCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.testCodeForm.get(name);
  }

  initializeLookupServices() {
    this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.priceRelationshipsService = new LookupService('pricerelationships', this.http);
  }
}
