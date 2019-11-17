
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddCashToAStore } from 'app/shared/models/add-cash-to-a-store';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AddCashToAStoreService } from '../shared/add-cash-to-a-store.service';


@Component({
  selector: 'app-add-cash-to-a-store-new',
  templateUrl: './add-cash-to-a-store-new.component.html',
  styleUrls: ['./add-cash-to-a-store-new.component.scss'],
  providers: [
    ]
})

export class AddCashToAStoreNewComponent extends AppBaseComponent implements OnInit {
  addCashToAStoreForm: FormGroup;
  @Input() selectedAddCashToAStore: AddCashToAStore;
  errorMessages: FormControlError[] = [
        
  ];

  private gendersService: LookupService;
private itemStatusesService: LookupService;

  
typeSelectOptions: MaterialSelectOptions;
conditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;
	@ViewChild('condition', { static: true }) ConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AddCashToAStoreNewComponent>,
    public addCashToAStoreService: AddCashToAStoreService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddCashToAStore = new AddCashToAStore();

    
	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع ( مستديم – مستهلك ',
	});

	this.conditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(حالة ( جديد – مستعمل – كهنة – للاصلاح ',
	});


    this.addCashToAStoreForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedAddCashToAStore.employeeCode, [ Validators.required ]],
  receiptNumber : [this.selectedAddCashToAStore.receiptNumber, [ Validators.required ]],
  itemNo : [this.selectedAddCashToAStore.itemNo, [ Validators.required ]],
  productName : [this.selectedAddCashToAStore.productName, [ ]],
  quantity : [this.selectedAddCashToAStore.quantity, [ Validators.required ]],
  price : [this.selectedAddCashToAStore.price, [ Validators.required ]],
  value : [this.selectedAddCashToAStore.value, [ ]],
  receiptDate : [this.selectedAddCashToAStore.receiptDate, [ Validators.required ]],
  missingQuantity : [this.selectedAddCashToAStore.missingQuantity, [ Validators.required ]],
  type : [this.selectedAddCashToAStore.type, [ ]],
  condition : [this.selectedAddCashToAStore.condition, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.addCashToAStoreService.create(this.addCashToAStoreForm.value)
        .pipe(switchMap(x => {
			return this.addCashToAStoreService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.addCashToAStoreForm.get(name);
    }

  initializeLookupServices() {
    this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
 }
