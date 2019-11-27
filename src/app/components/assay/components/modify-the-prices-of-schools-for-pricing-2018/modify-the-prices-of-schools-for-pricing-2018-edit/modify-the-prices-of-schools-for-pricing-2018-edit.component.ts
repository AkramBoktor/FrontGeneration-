
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ModifyThePricesOfSchoolsForPricing2018 } from 'app/shared/models/modify-the-prices-of-schools-for-pricing-2018';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ModifyThePricesOfSchoolsForPricing2018Service } from '../shared/modify-the-prices-of-schools-for-pricing-2018.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-modify-the-prices-of-schools-for-pricing-2018-edit',
  templateUrl: './modify-the-prices-of-schools-for-pricing-2018-edit.component.html',
  styleUrls: ['./modify-the-prices-of-schools-for-pricing-2018-edit.component.scss'],
  providers: []
})

export class ModifyThePricesOfSchoolsForPricing2018EditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedModifyThePricesOfSchoolsForPricing2018: ModifyThePricesOfSchoolsForPricing2018;
  modifyThePricesOfSchoolsForPricing2018Form: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedModifyThePricesOfSchoolsForPricing2018Dialog: any,
    @Optional() public dialogRef: MatDialogRef<ModifyThePricesOfSchoolsForPricing2018EditComponent>,
    public modifyThePricesOfSchoolsForPricing2018Service: ModifyThePricesOfSchoolsForPricing2018Service) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedModifyThePricesOfSchoolsForPricing2018 = new ModifyThePricesOfSchoolsForPricing2018();
    this.selectedModifyThePricesOfSchoolsForPricing2018 = this.selectedModifyThePricesOfSchoolsForPricing2018Dialog.data || this.selectedModifyThePricesOfSchoolsForPricing2018;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.modifyThePricesOfSchoolsForPricing2018Form = this.formBuilder.group({
      
  id : [this.selectedModifyThePricesOfSchoolsForPricing2018.id],
  schoolNumber : [this.selectedModifyThePricesOfSchoolsForPricing2018.schoolNumber, [ Validators.required ]],
  extensionCode : [this.selectedModifyThePricesOfSchoolsForPricing2018.extensionCode, [ Validators.required ]],
  pLanYear : [this.selectedModifyThePricesOfSchoolsForPricing2018.pLanYear, [ Validators.required ]],
  constructionType : [this.selectedModifyThePricesOfSchoolsForPricing2018.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.modifyThePricesOfSchoolsForPricing2018Service.update(this.modifyThePricesOfSchoolsForPricing2018Form.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.modifyThePricesOfSchoolsForPricing2018Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.modifyThePricesOfSchoolsForPricing2018Form.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
