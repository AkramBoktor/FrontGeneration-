
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NewServicesRequests } from 'app/shared/models/new-services-requests';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NewServicesRequestsService } from '../shared/new-services-requests.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-new-services-requests-edit',
  templateUrl: './new-services-requests-edit.component.html',
  styleUrls: ['./new-services-requests-edit.component.scss'],
  providers: []
})

export class NewServicesRequestsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNewServicesRequests: NewServicesRequests;
  newServicesRequestsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private serviceTypesService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;
serviceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityName', { static: true }) EntityNameSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('centerOrSection', { static: true }) CenterOrSectionSelectComponent: MaterialSelectComponent;
	@ViewChild('serviceType', { static: true }) ServiceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNewServicesRequestsDialog: any,
    @Optional() public dialogRef: MatDialogRef<NewServicesRequestsEditComponent>,
    public newServicesRequestsService: NewServicesRequestsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNewServicesRequests = new NewServicesRequests();
    this.selectedNewServicesRequests = this.selectedNewServicesRequestsDialog.data || this.selectedNewServicesRequests;

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز – قسم',
	});

	this.serviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.serviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  الخدمة',
	});


    this.newServicesRequestsForm = this.formBuilder.group({
      
  id : [this.selectedNewServicesRequests.id],
  applicationDate : [this.selectedNewServicesRequests.applicationDate, [ Validators.required ]],
  schoolName : [this.selectedNewServicesRequests.schoolName, [ Validators.required ]],
  landArea : [this.selectedNewServicesRequests.landArea, [ Validators.required ]],
  structuralRatio : [this.selectedNewServicesRequests.structuralRatio, [ Validators.required ]],
  floorsNumber : [this.selectedNewServicesRequests.floorsNumber, [ Validators.required ]],
  receiptNumber : [this.selectedNewServicesRequests.receiptNumber, [ Validators.required ]],
  receiptDate : [this.selectedNewServicesRequests.receiptDate, [ Validators.required ]],
  buildingCode : [this.selectedNewServicesRequests.buildingCode, [ Validators.required ]],
  orderNumber : [this.selectedNewServicesRequests.orderNumber, [ Validators.required ]],
  entityName : [this.selectedNewServicesRequests.entityName, [ Validators.required ]],
  governorate : [this.selectedNewServicesRequests.governorate, [ Validators.required ]],
  centerOrSection : [this.selectedNewServicesRequests.centerOrSection, [ Validators.required ]],
  serviceType : [this.selectedNewServicesRequests.serviceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.newServicesRequestsService.update(this.newServicesRequestsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.newServicesRequestsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.newServicesRequestsForm.get(name);
  }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serviceTypesService = new LookupService('servicetypes', this.http);
  }
}
