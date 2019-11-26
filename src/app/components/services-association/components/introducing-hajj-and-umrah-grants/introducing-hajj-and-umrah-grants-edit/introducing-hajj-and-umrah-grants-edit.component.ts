
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IntroducingHajjAndUmrahGrants } from 'app/shared/models/introducing-hajj-and-umrah-grants';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IntroducingHajjAndUmrahGrantsService } from '../shared/introducing-hajj-and-umrah-grants.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-hajj-and-umrah-grants-edit',
  templateUrl: './introducing-hajj-and-umrah-grants-edit.component.html',
  styleUrls: ['./introducing-hajj-and-umrah-grants-edit.component.scss'],
  providers: []
})

export class IntroducingHajjAndUmrahGrantsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIntroducingHajjAndUmrahGrants: IntroducingHajjAndUmrahGrants;
  introducingHajjAndUmrahGrantsForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIntroducingHajjAndUmrahGrantsDialog: any,
    @Optional() public dialogRef: MatDialogRef<IntroducingHajjAndUmrahGrantsEditComponent>,
    public introducingHajjAndUmrahGrantsService: IntroducingHajjAndUmrahGrantsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingHajjAndUmrahGrants = new IntroducingHajjAndUmrahGrants();
    this.selectedIntroducingHajjAndUmrahGrants = this.selectedIntroducingHajjAndUmrahGrantsDialog.data || this.selectedIntroducingHajjAndUmrahGrants;

    
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
      
  id : [this.selectedIntroducingHajjAndUmrahGrants.id],
  employeeCode : [this.selectedIntroducingHajjAndUmrahGrants.employeeCode, [ Validators.required ]],
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
    this.introducingHajjAndUmrahGrantsService.update(this.introducingHajjAndUmrahGrantsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.introducingHajjAndUmrahGrantsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.introducingHajjAndUmrahGrantsForm.get(name);
  }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.travelTypesService = new LookupService('traveltypes', this.http);
  }
}
