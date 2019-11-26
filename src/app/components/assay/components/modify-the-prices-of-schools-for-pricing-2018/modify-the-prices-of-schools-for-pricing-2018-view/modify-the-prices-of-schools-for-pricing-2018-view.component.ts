
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ModifyThePricesOfSchoolsForPricing2018 } from 'app/shared/models/modify-the-prices-of-schools-for-pricing-2018';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ModifyThePricesOfSchoolsForPricing2018Service } from '../shared/modify-the-prices-of-schools-for-pricing-2018.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-modify-the-prices-of-schools-for-pricing-2018-view',
  templateUrl: './modify-the-prices-of-schools-for-pricing-2018-view.component.html',
  styleUrls: ['./modify-the-prices-of-schools-for-pricing-2018-view.component.scss'],
  providers: []
})

export class ModifyThePricesOfSchoolsForPricing2018ViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedModifyThePricesOfSchoolsForPricing2018: ModifyThePricesOfSchoolsForPricing2018;
  modifyThePricesOfSchoolsForPricing2018Form: FormGroup;

  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedModifyThePricesOfSchoolsForPricing2018Dialog: any,
    @Optional() public dialogRef: MatDialogRef<ModifyThePricesOfSchoolsForPricing2018ViewComponent>,
    public modifyThePricesOfSchoolsForPricing2018Service: ModifyThePricesOfSchoolsForPricing2018Service) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedModifyThePricesOfSchoolsForPricing2018 = this.selectedModifyThePricesOfSchoolsForPricing2018Dialog.data || this.selectedModifyThePricesOfSchoolsForPricing2018;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.modifyThePricesOfSchoolsForPricing2018Form = this.formBuilder.group({
      
  schoolNumber : [this.selectedModifyThePricesOfSchoolsForPricing2018.schoolNumber],
  extensionCode : [this.selectedModifyThePricesOfSchoolsForPricing2018.extensionCode],
  pLanYear : [this.selectedModifyThePricesOfSchoolsForPricing2018.pLanYear],
  constructionType : [this.selectedModifyThePricesOfSchoolsForPricing2018.constructionType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.modifyThePricesOfSchoolsForPricing2018Form.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.modifyThePricesOfSchoolsForPricing2018Form.controls)) {
      this.modifyThePricesOfSchoolsForPricing2018Form.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

