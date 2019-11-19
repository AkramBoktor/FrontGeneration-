
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddPermission } from 'app/shared/models/add-permission';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AddPermissionService } from '../shared/add-permission.service';


@Component({
  selector: 'app-add-permission-new',
  templateUrl: './add-permission-new.component.html',
  styleUrls: ['./add-permission-new.component.scss'],
  providers: [
    ]
})

export class AddPermissionNewComponent extends AppBaseComponent implements OnInit {
  addPermissionForm: FormGroup;
  @Input() selectedAddPermission: AddPermission;
  errorMessages: FormControlError[] = [
        
  ];

  private bondCodesService: LookupService;
private bondNumbersService: LookupService;
private gendersService: LookupService;
private itemStatusesService: LookupService;

  
bondCodeSelectOptions: MaterialSelectOptions;
bondNoSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;
conditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bondCode', { static: true }) BondCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bondNo', { static: true }) BondNoSelectComponent: MaterialSelectComponent;
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;
	@ViewChild('condition', { static: true }) ConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AddPermissionNewComponent>,
    public addPermissionService: AddPermissionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddPermission = new AddPermission();

    
	this.bondCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bondCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السند',
	});

	this.bondNoSelectOptions = new MaterialSelectOptions({
	 data: this.bondNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رقم السند  ',
	});

	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع ( مستديم – مستهلك ',
	});

	this.conditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  (حالة ( جديد – مستعمل – كهنة – للاصلاح',
	});


    this.addPermissionForm = this.formBuilder.group({
     
  id : [0],
  recipientStoreNumber : [this.selectedAddPermission.recipientStoreNumber, [ Validators.required ]],
  billNumber : [this.selectedAddPermission.billNumber, [ Validators.required ]],
  addPermissionNumber : [this.selectedAddPermission.addPermissionNumber, [ Validators.required ]],
  dateOfSupply : [this.selectedAddPermission.dateOfSupply, [ Validators.required ]],
  itemNo : [this.selectedAddPermission.itemNo, [ Validators.required ]],
  productName : [this.selectedAddPermission.productName, [ ]],
  quantityBalance : [this.selectedAddPermission.quantityBalance, [ Validators.required ]],
  price : [this.selectedAddPermission.price, [ Validators.required ]],
  value : [this.selectedAddPermission.value, [ Validators.required ]],
  bondCode : [this.selectedAddPermission.bondCode, [ Validators.required ]],
  bondNo : [this.selectedAddPermission.bondNo, [ Validators.required ]],
  type : [this.selectedAddPermission.type, [ Validators.required ]],
  condition : [this.selectedAddPermission.condition, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.addPermissionService.create(this.addPermissionForm.value)
        .pipe(switchMap(x => {
			return this.addPermissionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.addPermissionForm.get(name);
    }

  initializeLookupServices() {
    this.bondCodesService = new LookupService('bondcodes', this.http);
this.bondNumbersService = new LookupService('bondnumbers', this.http);
this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
 }
