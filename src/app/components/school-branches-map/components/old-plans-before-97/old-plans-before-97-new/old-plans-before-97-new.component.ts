
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { OldPlansBefore97 } from 'app/shared/models/old-plans-before-97';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OldPlansBefore97Service } from '../shared/old-plans-before-97.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-old-plans-before-97-new',
  templateUrl: './old-plans-before-97-new.component.html',
  styleUrls: ['./old-plans-before-97-new.component.scss'],
  providers: [
    ]
})

export class OldPlansBefore97NewComponent extends AppBaseComponent implements OnInit {
  oldPlansBefore97Form: FormGroup;
  @Input() selectedOldPlansBefore97: OldPlansBefore97;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private constructionTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<OldPlansBefore97NewComponent>,
    public oldPlansBefore97Service: OldPlansBefore97Service)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOldPlansBefore97 = new OldPlansBefore97();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.oldPlansBefore97Form = this.formBuilder.group({
     
  id : [0],
  school : [this.selectedOldPlansBefore97.school, [ Validators.required ]],
  extension : [this.selectedOldPlansBefore97.extension, [ Validators.required ]],
  primaryDeliveryDate : [this.selectedOldPlansBefore97.primaryDeliveryDate, [ Validators.required ]],
  pLanYear : [this.selectedOldPlansBefore97.pLanYear, [ Validators.required ]],
  governorate : [this.selectedOldPlansBefore97.governorate, [ Validators.required ]],
  constructionType : [this.selectedOldPlansBefore97.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.oldPlansBefore97Service.create(this.oldPlansBefore97Form.value)
        .pipe(switchMap(x => {
			return this.oldPlansBefore97Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.oldPlansBefore97Form.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
