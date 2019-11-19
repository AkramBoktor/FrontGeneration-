
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SalesForms } from 'app/shared/models/sales-forms';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SalesFormsService } from '../shared/sales-forms.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sales-forms-edit',
  templateUrl: './sales-forms-edit.component.html',
  styleUrls: ['./sales-forms-edit.component.scss'],
  providers: []
})

export class SalesFormsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSalesForms: SalesForms;
  salesFormsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private modelTypesService: LookupService;

  
typeOfFormSelectOptions: MaterialSelectOptions;

  
	@ViewChild('typeOfForm', { static: true }) TypeOfFormSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSalesFormsDialog: any,
    @Optional() public dialogRef: MatDialogRef<SalesFormsEditComponent>,
    public salesFormsService: SalesFormsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSalesForms = new SalesForms();
    this.selectedSalesForms = this.selectedSalesFormsDialog.data || this.selectedSalesForms;

    
	this.typeOfFormSelectOptions = new MaterialSelectOptions({
	 data: this.modelTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاستمارة',
	});


    this.salesFormsForm = this.formBuilder.group({
      
  id : [this.selectedSalesForms.id],
  schoolNumber : [this.selectedSalesForms.schoolNumber, [ Validators.required ]],
  formNumber : [this.selectedSalesForms.formNumber, [ Validators.required ]],
  nameOfTheOwner : [this.selectedSalesForms.nameOfTheOwner, [ Validators.required ]],
  famousForNumber : [this.selectedSalesForms.famousForNumber, [ Validators.required ]],
  date : [this.selectedSalesForms.date, [ Validators.required ]],
  space : [this.selectedSalesForms.space, [ Validators.required ]],
  theValue : [this.selectedSalesForms.theValue, [ Validators.required ]],
  typeOfForm : [this.selectedSalesForms.typeOfForm, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.salesFormsService.update(this.salesFormsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.salesFormsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.salesFormsForm.get(name);
  }

  initializeLookupServices() {
    this.modelTypesService = new LookupService('modeltypes', this.http);
  }
}
