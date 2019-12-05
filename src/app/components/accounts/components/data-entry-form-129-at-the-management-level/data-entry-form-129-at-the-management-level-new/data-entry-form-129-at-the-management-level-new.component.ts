
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataEntryForm129AtTheManagementLevel } from 'app/shared/models/data-entry-form-129-at-the-management-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataEntryForm129AtTheManagementLevelService } from '../shared/data-entry-form-129-at-the-management-level.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-entry-form-129-at-the-management-level-new',
  templateUrl: './data-entry-form-129-at-the-management-level-new.component.html',
  styleUrls: ['./data-entry-form-129-at-the-management-level-new.component.scss'],
  providers: [
    ]
})

export class DataEntryForm129AtTheManagementLevelNewComponent extends AppBaseComponent implements OnInit {
  dataEntryForm129AtTheManagementLevelForm: FormGroup;
  @Input() selectedDataEntryForm129AtTheManagementLevel: DataEntryForm129AtTheManagementLevel;
  errorMessages: FormControlError[] = [
        
  ];

  private centralDepartmentsService: LookupService;

  
administrationOrBranchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrBranch', { static: true }) AdministrationOrBranchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129AtTheManagementLevelNewComponent>,
    public dataEntryForm129AtTheManagementLevelService: DataEntryForm129AtTheManagementLevelService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129AtTheManagementLevel = new DataEntryForm129AtTheManagementLevel();

    
	this.administrationOrBranchSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره/الفرع',
	});


    this.dataEntryForm129AtTheManagementLevelForm = this.formBuilder.group({
     
  id : [0],
  incomingMonth : [this.selectedDataEntryForm129AtTheManagementLevel.incomingMonth, [ Validators.required ]],
  incomingNumber : [this.selectedDataEntryForm129AtTheManagementLevel.incomingNumber, [ Validators.required ]],
  administrationOrBranch : [this.selectedDataEntryForm129AtTheManagementLevel.administrationOrBranch, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataEntryForm129AtTheManagementLevelService.create(this.dataEntryForm129AtTheManagementLevelForm.value)
        .pipe(switchMap(x => {
			return this.dataEntryForm129AtTheManagementLevelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataEntryForm129AtTheManagementLevelForm.get(name);
    }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
  }
 }
