
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SalesForms } from 'app/shared/models/sales-forms';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SalesFormsService } from '../shared/sales-forms.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sales-forms-new',
  templateUrl: './sales-forms-new.component.html',
  styleUrls: ['./sales-forms-new.component.scss'],
  providers: [
    ]
})

export class SalesFormsNewComponent extends AppBaseComponent implements OnInit {
  salesFormsForm: FormGroup;
  @Input() selectedSalesForms: SalesForms;
  errorMessages: FormControlError[] = [
        
  ];

  private modelTypesService: LookupService;

  
typeOfFormSelectOptions: MaterialSelectOptions;

  
	@ViewChild('typeOfForm', { static: true }) TypeOfFormSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SalesFormsNewComponent>,
    public salesFormsService: SalesFormsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSalesForms = new SalesForms();

    
	this.typeOfFormSelectOptions = new MaterialSelectOptions({
	 data: this.modelTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاستمارة',
	});


    this.salesFormsForm = this.formBuilder.group({
     
  id : [0],
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
    this.salesFormsService.create(this.salesFormsForm.value)
        .pipe(switchMap(x => {
			return this.salesFormsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.salesFormsForm.get(name);
    }

  initializeLookupServices() {
    this.modelTypesService = new LookupService('modeltypes', this.http);
  }
 }
