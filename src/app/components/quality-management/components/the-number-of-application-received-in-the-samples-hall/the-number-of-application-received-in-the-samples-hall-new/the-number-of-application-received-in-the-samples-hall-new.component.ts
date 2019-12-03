
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheNumberOfApplicationReceivedInTheSamplesHall } from 'app/shared/models/the-number-of-application-received-in-the-samples-hall';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheNumberOfApplicationReceivedInTheSamplesHallService } from '../shared/the-number-of-application-received-in-the-samples-hall.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-number-of-application-received-in-the-samples-hall-new',
  templateUrl: './the-number-of-application-received-in-the-samples-hall-new.component.html',
  styleUrls: ['./the-number-of-application-received-in-the-samples-hall-new.component.scss'],
  providers: [
    ]
})

export class TheNumberOfApplicationReceivedInTheSamplesHallNewComponent extends AppBaseComponent implements OnInit {
  theNumberOfApplicationReceivedInTheSamplesHallForm: FormGroup;
  @Input() selectedTheNumberOfApplicationReceivedInTheSamplesHall: TheNumberOfApplicationReceivedInTheSamplesHall;
  errorMessages: FormControlError[] = [
        
  ];

  private sampleTestedsService: LookupService;
private branchCodesService: LookupService;

  
sampleTestedSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sampleTested', { static: true }) SampleTestedSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TheNumberOfApplicationReceivedInTheSamplesHallNewComponent>,
    public theNumberOfApplicationReceivedInTheSamplesHallService: TheNumberOfApplicationReceivedInTheSamplesHallService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheNumberOfApplicationReceivedInTheSamplesHall = new TheNumberOfApplicationReceivedInTheSamplesHall();

    
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
     
  id : [0],
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
    this.theNumberOfApplicationReceivedInTheSamplesHallService.create(this.theNumberOfApplicationReceivedInTheSamplesHallForm.value)
        .pipe(switchMap(x => {
			return this.theNumberOfApplicationReceivedInTheSamplesHallService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theNumberOfApplicationReceivedInTheSamplesHallForm.get(name);
    }

  initializeLookupServices() {
    this.sampleTestedsService = new LookupService('sampletesteds', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
