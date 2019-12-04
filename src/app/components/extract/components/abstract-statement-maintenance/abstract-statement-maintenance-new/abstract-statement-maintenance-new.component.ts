
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AbstractStatementMaintenance } from 'app/shared/models/abstract-statement-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AbstractStatementMaintenanceService } from '../shared/abstract-statement-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-abstract-statement-maintenance-new',
  templateUrl: './abstract-statement-maintenance-new.component.html',
  styleUrls: ['./abstract-statement-maintenance-new.component.scss'],
  providers: [
    ]
})

export class AbstractStatementMaintenanceNewComponent extends AppBaseComponent implements OnInit {
  abstractStatementMaintenanceForm: FormGroup;
  @Input() selectedAbstractStatementMaintenance: AbstractStatementMaintenance;
  errorMessages: FormControlError[] = [
        
  ];

  private maintenanceTypesService: LookupService;
private offeringTypesService: LookupService;
private extractTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
maintenanceTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
abstractTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('maintenanceType', { static: true }) MaintenanceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('abstractType', { static: true }) AbstractTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AbstractStatementMaintenanceNewComponent>,
    public abstractStatementMaintenanceService: AbstractStatementMaintenanceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractStatementMaintenance = new AbstractStatementMaintenance();

    
	this.maintenanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الصيانة',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.abstractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.abstractStatementMaintenanceForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedAbstractStatementMaintenance.buildingCode, [ Validators.required ]],
  abstractNumber : [this.selectedAbstractStatementMaintenance.abstractNumber, [ Validators.required ]],
  contractorName : [this.selectedAbstractStatementMaintenance.contractorName, [ Validators.required ]],
  siteDeliveryDate : [this.selectedAbstractStatementMaintenance.siteDeliveryDate, [ ]],
  planYear : [this.selectedAbstractStatementMaintenance.planYear, [ ]],
  bidNumber : [this.selectedAbstractStatementMaintenance.bidNumber, [ Validators.required ]],
  endPrevious : [this.selectedAbstractStatementMaintenance.endPrevious, [ ]],
  businessEnd : [this.selectedAbstractStatementMaintenance.businessEnd, [ Validators.required ]],
  extensionNumber : [this.selectedAbstractStatementMaintenance.extensionNumber, [ Validators.required ]],
  itemName : [this.selectedAbstractStatementMaintenance.itemName, [ ]],
  contractQuantity : [this.selectedAbstractStatementMaintenance.contractQuantity, [ ]],
  totalQuantity : [this.selectedAbstractStatementMaintenance.totalQuantity, [ Validators.required ]],
  maintenanceType : [this.selectedAbstractStatementMaintenance.maintenanceType, [ Validators.required ]],
  offeringType : [this.selectedAbstractStatementMaintenance.offeringType, [ Validators.required ]],
  abstractType : [this.selectedAbstractStatementMaintenance.abstractType, [ Validators.required ]],
  workType : [this.selectedAbstractStatementMaintenance.workType, [ Validators.required ]],
  itemCode : [this.selectedAbstractStatementMaintenance.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.abstractStatementMaintenanceService.create(this.abstractStatementMaintenanceForm.value)
        .pipe(switchMap(x => {
			return this.abstractStatementMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.abstractStatementMaintenanceForm.get(name);
    }

  initializeLookupServices() {
    this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
