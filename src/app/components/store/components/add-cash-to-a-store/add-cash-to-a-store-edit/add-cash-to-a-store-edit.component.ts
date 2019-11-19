
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddCashToAStore } from 'app/shared/models/add-cash-to-a-store';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AddCashToAStoreService } from '../shared/add-cash-to-a-store.service';




@Component({
  selector: 'app-add-cash-to-a-store-edit',
  templateUrl: './add-cash-to-a-store-edit.component.html',
  styleUrls: ['./add-cash-to-a-store-edit.component.scss'],
  providers: []
})

export class AddCashToAStoreEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddCashToAStore: AddCashToAStore;
  addCashToAStoreForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private gendersService: LookupService;
private itemStatusesService: LookupService;

  
typeSelectOptions: MaterialSelectOptions;
conditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;
	@ViewChild('condition', { static: true }) ConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddCashToAStoreDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddCashToAStoreEditComponent>,
    public addCashToAStoreService: AddCashToAStoreService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddCashToAStore = new AddCashToAStore();
    this.selectedAddCashToAStore = this.selectedAddCashToAStoreDialog.data || this.selectedAddCashToAStore;

    
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
      
  id : [this.selectedAddCashToAStore.id],
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
    this.addCashToAStoreService.update(this.addCashToAStoreForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.addCashToAStoreService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.addCashToAStoreForm.get(name);
  }

  initializeLookupServices() {
    this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}
