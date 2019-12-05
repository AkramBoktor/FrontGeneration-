
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NewServiceRequest } from 'app/shared/models/new-service-request';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NewServiceRequestService } from '../shared/new-service-request.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-new-service-request-edit',
  templateUrl: './new-service-request-edit.component.html',
  styleUrls: ['./new-service-request-edit.component.scss'],
  providers: []
})

export class NewServiceRequestEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNewServiceRequest: NewServiceRequest;
  newServiceRequestForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNewServiceRequestDialog: any,
    @Optional() public dialogRef: MatDialogRef<NewServiceRequestEditComponent>,
    public newServiceRequestService: NewServiceRequestService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNewServiceRequest = new NewServiceRequest();
    this.selectedNewServiceRequest = this.selectedNewServiceRequestDialog.data || this.selectedNewServiceRequest;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم',
	});


    this.newServiceRequestForm = this.formBuilder.group({
      
  id : [this.selectedNewServiceRequest.id],
  orderDate : [this.selectedNewServiceRequest.orderDate, [ Validators.required ]],
  entityName : [this.selectedNewServiceRequest.entityName, [ Validators.required ]],
  landArea : [this.selectedNewServiceRequest.landArea, [ Validators.required ]],
  structuralRatio : [this.selectedNewServiceRequest.structuralRatio, [ Validators.required ]],
  floorsNumber : [this.selectedNewServiceRequest.floorsNumber, [ Validators.required ]],
  schoolName : [this.selectedNewServiceRequest.schoolName, [ Validators.required ]],
  receiptNumber : [this.selectedNewServiceRequest.receiptNumber, [ Validators.required ]],
  receiptDate : [this.selectedNewServiceRequest.receiptDate, [ Validators.required ]],
  governorate : [this.selectedNewServiceRequest.governorate, [ Validators.required ]],
  department : [this.selectedNewServiceRequest.department, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.newServiceRequestService.update(this.newServiceRequestForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.newServiceRequestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.newServiceRequestForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}
