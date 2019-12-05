
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddMaintenanceImplementation } from 'app/shared/models/add-maintenance-implementation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddMaintenanceImplementationService } from '../shared/add-maintenance-implementation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-maintenance-implementation-new',
  templateUrl: './add-maintenance-implementation-new.component.html',
  styleUrls: ['./add-maintenance-implementation-new.component.scss'],
  providers: [
    ]
})

export class AddMaintenanceImplementationNewComponent extends AppBaseComponent implements OnInit {
  addMaintenanceImplementationForm: FormGroup;
  @Input() selectedAddMaintenanceImplementation: AddMaintenanceImplementation;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private workTypesService: LookupService;
private yesOrNosService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;
doNotExecuteSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('doNotExecute', { static: true }) DoNotExecuteSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AddMaintenanceImplementationNewComponent>,
    public addMaintenanceImplementationService: AddMaintenanceImplementationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddMaintenanceImplementation = new AddMaintenanceImplementation();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});

	this.doNotExecuteSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(ع.ت( عدم تنفيذ',
	});


    this.addMaintenanceImplementationForm = this.formBuilder.group({
     
  id : [0],
  period : [this.selectedAddMaintenanceImplementation.period, [ Validators.required ]],
  maintainer : [this.selectedAddMaintenanceImplementation.maintainer, [ Validators.required ]],
  building : [this.selectedAddMaintenanceImplementation.building, [ Validators.required ]],
  code : [this.selectedAddMaintenanceImplementation.code, [ Validators.required ]],
  plannedDate : [this.selectedAddMaintenanceImplementation.plannedDate, [ Validators.required ]],
  actualDate : [this.selectedAddMaintenanceImplementation.actualDate, [ Validators.required ]],
  case : [this.selectedAddMaintenanceImplementation.case, [ Validators.required ]],
  region : [this.selectedAddMaintenanceImplementation.region, [ Validators.required ]],
  laboratoryType : [this.selectedAddMaintenanceImplementation.laboratoryType, [ Validators.required ]],
  doNotExecute : [this.selectedAddMaintenanceImplementation.doNotExecute, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.addMaintenanceImplementationService.create(this.addMaintenanceImplementationForm.value)
        .pipe(switchMap(x => {
			return this.addMaintenanceImplementationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.addMaintenanceImplementationForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
 }
