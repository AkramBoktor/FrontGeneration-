
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TheNumberOfApplicationReceivedInTheSamplesHall } from 'app/shared/models/the-number-of-application-received-in-the-samples-hall';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TheNumberOfApplicationReceivedInTheSamplesHallService } from '../shared/the-number-of-application-received-in-the-samples-hall.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-number-of-application-received-in-the-samples-hall-edit',
  templateUrl: './the-number-of-application-received-in-the-samples-hall-edit.component.html',
  styleUrls: ['./the-number-of-application-received-in-the-samples-hall-edit.component.scss'],
  providers: []
})

export class TheNumberOfApplicationReceivedInTheSamplesHallEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheNumberOfApplicationReceivedInTheSamplesHall: TheNumberOfApplicationReceivedInTheSamplesHall;
  theNumberOfApplicationReceivedInTheSamplesHallForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sampleTestedsService: LookupService;
private branchCodesService: LookupService;

  
sampleTestedSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sampleTested', { static: true }) SampleTestedSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheNumberOfApplicationReceivedInTheSamplesHallDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheNumberOfApplicationReceivedInTheSamplesHallEditComponent>,
    public theNumberOfApplicationReceivedInTheSamplesHallService: TheNumberOfApplicationReceivedInTheSamplesHallService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheNumberOfApplicationReceivedInTheSamplesHall = new TheNumberOfApplicationReceivedInTheSamplesHall();
    this.selectedTheNumberOfApplicationReceivedInTheSamplesHall = this.selectedTheNumberOfApplicationReceivedInTheSamplesHallDialog.data || this.selectedTheNumberOfApplicationReceivedInTheSamplesHall;

    
	this.sampleTestedSelectOptions = new MaterialSelectOptions({
	 data: this.sampleTestedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العينة المختبرة',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.theNumberOfApplicationReceivedInTheSamplesHallForm = this.formBuilder.group({
      
  id : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.id],
  date : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.date, [ Validators.required ]],
  orderNumber : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.orderNumber, [ Validators.required ]],
  basicMaterialCode : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.basicMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.subMaterialCode, [ Validators.required ]],
  testCode : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.testCode, [ Validators.required ]],
  sampleTested : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.sampleTested, [ Validators.required ]],
  branchCode : [this.selectedTheNumberOfApplicationReceivedInTheSamplesHall.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.theNumberOfApplicationReceivedInTheSamplesHallService.update(this.theNumberOfApplicationReceivedInTheSamplesHallForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.theNumberOfApplicationReceivedInTheSamplesHallService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.theNumberOfApplicationReceivedInTheSamplesHallForm.get(name);
  }

  initializeLookupServices() {
    this.sampleTestedsService = new LookupService('sampletesteds', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
