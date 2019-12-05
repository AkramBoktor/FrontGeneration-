
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NewServiceRequest } from 'app/shared/models/new-service-request';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NewServiceRequestService } from '../shared/new-service-request.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-new-service-request-new',
  templateUrl: './new-service-request-new.component.html',
  styleUrls: ['./new-service-request-new.component.scss'],
  providers: [
    ]
})

export class NewServiceRequestNewComponent extends AppBaseComponent implements OnInit {
  newServiceRequestForm: FormGroup;
  @Input() selectedNewServiceRequest: NewServiceRequest;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NewServiceRequestNewComponent>,
    public newServiceRequestService: NewServiceRequestService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNewServiceRequest = new NewServiceRequest();

    
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
     
  id : [0],
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
    this.newServiceRequestService.create(this.newServiceRequestForm.value)
        .pipe(switchMap(x => {
			return this.newServiceRequestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.newServiceRequestForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
 }
