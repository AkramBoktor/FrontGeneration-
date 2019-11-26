
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ModifyThePricesOfSchoolsForPricing2018 } from 'app/shared/models/modify-the-prices-of-schools-for-pricing-2018';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ModifyThePricesOfSchoolsForPricing2018Service } from '../shared/modify-the-prices-of-schools-for-pricing-2018.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-modify-the-prices-of-schools-for-pricing-2018-new',
  templateUrl: './modify-the-prices-of-schools-for-pricing-2018-new.component.html',
  styleUrls: ['./modify-the-prices-of-schools-for-pricing-2018-new.component.scss'],
  providers: [
    ]
})

export class ModifyThePricesOfSchoolsForPricing2018NewComponent extends AppBaseComponent implements OnInit {
  modifyThePricesOfSchoolsForPricing2018Form: FormGroup;
  @Input() selectedModifyThePricesOfSchoolsForPricing2018: ModifyThePricesOfSchoolsForPricing2018;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ModifyThePricesOfSchoolsForPricing2018NewComponent>,
    public modifyThePricesOfSchoolsForPricing2018Service: ModifyThePricesOfSchoolsForPricing2018Service)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedModifyThePricesOfSchoolsForPricing2018 = new ModifyThePricesOfSchoolsForPricing2018();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.modifyThePricesOfSchoolsForPricing2018Form = this.formBuilder.group({
     
  id : [0],
  schoolNumber : [this.selectedModifyThePricesOfSchoolsForPricing2018.schoolNumber, [ Validators.required ]],
  extensionCode : [this.selectedModifyThePricesOfSchoolsForPricing2018.extensionCode, [ Validators.required ]],
  pLanYear : [this.selectedModifyThePricesOfSchoolsForPricing2018.pLanYear, [ Validators.required ]],
  constructionType : [this.selectedModifyThePricesOfSchoolsForPricing2018.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.modifyThePricesOfSchoolsForPricing2018Service.create(this.modifyThePricesOfSchoolsForPricing2018Form.value)
        .pipe(switchMap(x => {
			return this.modifyThePricesOfSchoolsForPricing2018Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.modifyThePricesOfSchoolsForPricing2018Form.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
