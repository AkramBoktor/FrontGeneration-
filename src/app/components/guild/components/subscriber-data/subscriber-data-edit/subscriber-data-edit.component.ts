
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriberData } from 'app/shared/models/subscriber-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriberDataService } from '../shared/subscriber-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscriber-data-edit',
  templateUrl: './subscriber-data-edit.component.html',
  styleUrls: ['./subscriber-data-edit.component.scss'],
  providers: []
})

export class SubscriberDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriberData: SubscriberData;
  subscriberDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private subDepartmentsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('admistrationCode', { static: true }) AdmistrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriberDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataEditComponent>,
    public subscriberDataService: SubscriberDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberData = new SubscriberData();
    this.selectedSubscriberData = this.selectedSubscriberDataDialog.data || this.selectedSubscriberData;

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.subscriberDataForm = this.formBuilder.group({
      
  id : [this.selectedSubscriberData.id],
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
    this.subscriberDataService.update(this.subscriberDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriberDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriberDataForm.get(name);
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
