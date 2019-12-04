
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TestCode } from 'app/shared/models/test-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TestCodeService } from '../shared/test-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-test-code-new',
  templateUrl: './test-code-new.component.html',
  styleUrls: ['./test-code-new.component.scss'],
  providers: [
    ]
})

export class TestCodeNewComponent extends AppBaseComponent implements OnInit {
  testCodeForm: FormGroup;
  @Input() selectedTestCode: TestCode;
  errorMessages: FormControlError[] = [
        
  ];

  private yesOrNoService: LookupService;
private priceRelationshipsService: LookupService;

  
hasAgeSelectOptions: MaterialSelectOptions;
priceRelationshipSelectOptions: MaterialSelectOptions;

  
	@ViewChild('hasAge', { static: true }) HasAgeSelectComponent: MaterialSelectComponent;
	@ViewChild('priceRelationship', { static: true }) PriceRelationshipSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TestCodeNewComponent>,
    public testCodeService: TestCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTestCode = new TestCode();

    
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
     
  id : [0],
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
    this.testCodeService.create(this.testCodeForm.value)
        .pipe(switchMap(x => {
			return this.testCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.testCodeForm.get(name);
    }

  initializeLookupServices() {
    this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.priceRelationshipsService = new LookupService('pricerelationships', this.http);
  }
 }
