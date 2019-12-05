
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriberData } from 'app/shared/models/subscriber-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberDataService } from '../shared/subscriber-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-view',
  templateUrl: './subscriber-data-view.component.html',
  styleUrls: ['./subscriber-data-view.component.scss'],
  providers: []
})

export class SubscriberDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriberData: SubscriberData;
  subscriberDataForm: FormGroup;

  private subDepartmentsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriberDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataViewComponent>,
    public subscriberDataService: SubscriberDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberData = this.selectedSubscriberDataDialog.data || this.selectedSubscriberData;

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.subscriberDataForm = this.formBuilder.group({
      
  employeeCode : [this.selectedSubscriberData.employeeCode],
  birthDate : [this.selectedSubscriberData.birthDate],
  hiringDate : [this.selectedSubscriberData.hiringDate],
  subscriptionDate : [this.selectedSubscriberData.subscriptionDate],
  membershipNo : [this.selectedSubscriberData.membershipNo],
  admistrationCode : [this.selectedSubscriberData.admistrationCode]
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
    return this.subscriberDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriberDataForm.controls)) {
      this.subscriberDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

