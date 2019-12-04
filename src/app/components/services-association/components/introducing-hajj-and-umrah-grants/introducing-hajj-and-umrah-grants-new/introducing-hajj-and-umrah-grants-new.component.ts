
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IntroducingHajjAndUmrahGrants } from 'app/shared/models/introducing-hajj-and-umrah-grants';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingHajjAndUmrahGrantsService } from '../shared/introducing-hajj-and-umrah-grants.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-hajj-and-umrah-grants-new',
  templateUrl: './introducing-hajj-and-umrah-grants-new.component.html',
  styleUrls: ['./introducing-hajj-and-umrah-grants-new.component.scss'],
  providers: [
    ]
})

export class IntroducingHajjAndUmrahGrantsNewComponent extends AppBaseComponent implements OnInit {
  introducingHajjAndUmrahGrantsForm: FormGroup;
  @Input() selectedIntroducingHajjAndUmrahGrants: IntroducingHajjAndUmrahGrants;
  errorMessages: FormControlError[] = [
        
  ];

  private statusCodesService: LookupService;
private paymentTypesService: LookupService;
private travelTypesService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;
paymentTypeSelectOptions: MaterialSelectOptions;
travelTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentType', { static: true }) PaymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('travelType', { static: true }) TravelTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IntroducingHajjAndUmrahGrantsNewComponent>,
    public introducingHajjAndUmrahGrantsService: IntroducingHajjAndUmrahGrantsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingHajjAndUmrahGrants = new IntroducingHajjAndUmrahGrants();

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});

	this.paymentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paymentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع السداد',
	});

	this.travelTypeSelectOptions = new MaterialSelectOptions({
	 data: this.travelTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع السفر',
	});


    this.introducingHajjAndUmrahGrantsForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedIntroducingHajjAndUmrahGrants.employeeCode, [ ]],
  employeeName : [this.selectedIntroducingHajjAndUmrahGrants.employeeName, [ ]],
  membershipNo : [this.selectedIntroducingHajjAndUmrahGrants.membershipNo, [ Validators.required ]],
  date : [this.selectedIntroducingHajjAndUmrahGrants.date, [ Validators.required ]],
  memberTicketValue : [this.selectedIntroducingHajjAndUmrahGrants.memberTicketValue, [ Validators.required ]],
  utilitiesTicketValue : [this.selectedIntroducingHajjAndUmrahGrants.utilitiesTicketValue, [ Validators.required ]],
  supportValue : [this.selectedIntroducingHajjAndUmrahGrants.supportValue, [ Validators.required ]],
  installmentsNumber : [this.selectedIntroducingHajjAndUmrahGrants.installmentsNumber, [ Validators.required ]],
  installmentsValue : [this.selectedIntroducingHajjAndUmrahGrants.installmentsValue, [ Validators.required ]],
  companionsNumber : [this.selectedIntroducingHajjAndUmrahGrants.companionsNumber, [ Validators.required ]],
  utilitiesName : [this.selectedIntroducingHajjAndUmrahGrants.utilitiesName, [ Validators.required ]],
  status : [this.selectedIntroducingHajjAndUmrahGrants.status, [ ]],
  paymentType : [this.selectedIntroducingHajjAndUmrahGrants.paymentType, [ Validators.required ]],
  travelType : [this.selectedIntroducingHajjAndUmrahGrants.travelType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.introducingHajjAndUmrahGrantsService.create(this.introducingHajjAndUmrahGrantsForm.value)
        .pipe(switchMap(x => {
			return this.introducingHajjAndUmrahGrantsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.introducingHajjAndUmrahGrantsForm.get(name);
    }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.travelTypesService = new LookupService('traveltypes', this.http);
  }
 }
