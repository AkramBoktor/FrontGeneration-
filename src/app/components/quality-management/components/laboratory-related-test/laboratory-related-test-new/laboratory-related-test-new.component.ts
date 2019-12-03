
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LaboratoryRelatedTest } from 'app/shared/models/laboratory-related-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LaboratoryRelatedTestService } from '../shared/laboratory-related-test.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-laboratory-related-test-new',
  templateUrl: './laboratory-related-test-new.component.html',
  styleUrls: ['./laboratory-related-test-new.component.scss'],
  providers: [
    ]
})

export class LaboratoryRelatedTestNewComponent extends AppBaseComponent implements OnInit {
  laboratoryRelatedTestForm: FormGroup;
  @Input() selectedLaboratoryRelatedTest: LaboratoryRelatedTest;
  errorMessages: FormControlError[] = [
        
  ];

  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LaboratoryRelatedTestNewComponent>,
    public laboratoryRelatedTestService: LaboratoryRelatedTestService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLaboratoryRelatedTest = new LaboratoryRelatedTest();

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.laboratoryRelatedTestForm = this.formBuilder.group({
     
  id : [0],
  basicMaterialCode : [this.selectedLaboratoryRelatedTest.basicMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedLaboratoryRelatedTest.subMaterialCode, [ Validators.required ]],
  testCode : [this.selectedLaboratoryRelatedTest.testCode, [ Validators.required ]],
  laboratoryCode : [this.selectedLaboratoryRelatedTest.laboratoryCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.laboratoryRelatedTestService.create(this.laboratoryRelatedTestForm.value)
        .pipe(switchMap(x => {
			return this.laboratoryRelatedTestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.laboratoryRelatedTestForm.get(name);
    }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
 }
