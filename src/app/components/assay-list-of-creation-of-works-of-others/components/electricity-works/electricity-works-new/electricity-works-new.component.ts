
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ElectricityWorks } from 'app/shared/models/electricity-works';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElectricityWorksService } from '../shared/electricity-works.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-electricity-works-new',
  templateUrl: './electricity-works-new.component.html',
  styleUrls: ['./electricity-works-new.component.scss'],
  providers: [
    ]
})

export class ElectricityWorksNewComponent extends AppBaseComponent implements OnInit {
  electricityWorksForm: FormGroup;
  @Input() selectedElectricityWorks: ElectricityWorks;
  errorMessages: FormControlError[] = [
        
  ];

  private listTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;
private modulesService: LookupService;

  
menuTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('menuType', { static: true }) MenuTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('employmentType', { static: true }) EmploymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ElectricityWorksNewComponent>,
    public electricityWorksService: ElectricityWorksService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectricityWorks = new ElectricityWorks();

    
	this.menuTypeSelectOptions = new MaterialSelectOptions({
	 data: this.listTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع القامه',
	});

	this.employmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل ',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.modulesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحده',
	});


    this.electricityWorksForm = this.formBuilder.group({
     
  id : [0],
  activityType : [this.selectedElectricityWorks.activityType, [ Validators.required ]],
  pricingYear : [this.selectedElectricityWorks.pricingYear, [ Validators.required ]],
  itemName : [this.selectedElectricityWorks.itemName, [ Validators.required ]],
  unitPrice : [this.selectedElectricityWorks.unitPrice, [ Validators.required ]],
  menuType : [this.selectedElectricityWorks.menuType, [ Validators.required ]],
  employmentType : [this.selectedElectricityWorks.employmentType, [ Validators.required ]],
  itemCode : [this.selectedElectricityWorks.itemCode, [ Validators.required ]],
  unit : [this.selectedElectricityWorks.unit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.electricityWorksService.create(this.electricityWorksForm.value)
        .pipe(switchMap(x => {
			return this.electricityWorksService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.electricityWorksForm.get(name);
    }

  initializeLookupServices() {
    this.listTypesService = new LookupService('listtypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
 }
