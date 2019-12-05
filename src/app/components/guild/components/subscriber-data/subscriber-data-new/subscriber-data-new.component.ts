
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriberData } from 'app/shared/models/subscriber-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataService } from '../shared/subscriber-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscriber-data-new',
  templateUrl: './subscriber-data-new.component.html',
  styleUrls: ['./subscriber-data-new.component.scss'],
  providers: [
    ]
})

export class SubscriberDataNewComponent extends AppBaseComponent implements OnInit {
  subscriberDataForm: FormGroup;
  @Input() selectedSubscriberData: SubscriberData;
  errorMessages: FormControlError[] = [
        
  ];

  private subDepartmentsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('admistrationCode', { static: true }) AdmistrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataNewComponent>,
    public subscriberDataService: SubscriberDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberData = new SubscriberData();

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.subscriberDataForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedSubscriberData.employeeCode, [ ]],
  birthDate : [this.selectedSubscriberData.birthDate, [ ]],
  hiringDate : [this.selectedSubscriberData.hiringDate, [ ]],
  subscriptionDate : [this.selectedSubscriberData.subscriptionDate, [ Validators.required ]],
  membershipNo : [this.selectedSubscriberData.membershipNo, [ Validators.required ]],
  admistrationCode : [this.selectedSubscriberData.admistrationCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriberDataService.create(this.subscriberDataForm.value)
        .pipe(switchMap(x => {
			return this.subscriberDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriberDataForm.get(name);
    }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
 }
