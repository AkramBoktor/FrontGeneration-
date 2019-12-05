
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssayOfWithdrawnWorks } from 'app/shared/models/assay-of-withdrawn-works';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayOfWithdrawnWorksService } from '../shared/assay-of-withdrawn-works.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-of-withdrawn-works-view',
  templateUrl: './assay-of-withdrawn-works-view.component.html',
  styleUrls: ['./assay-of-withdrawn-works-view.component.scss'],
  providers: []
})

export class AssayOfWithdrawnWorksViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayOfWithdrawnWorks: AssayOfWithdrawnWorks;
  assayOfWithdrawnWorksForm: FormGroup;

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayOfWithdrawnWorksDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayOfWithdrawnWorksViewComponent>,
    public assayOfWithdrawnWorksService: AssayOfWithdrawnWorksService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayOfWithdrawnWorks = this.selectedAssayOfWithdrawnWorksDialog.data || this.selectedAssayOfWithdrawnWorks;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.assayOfWithdrawnWorksForm = this.formBuilder.group({
      
  buildingCode : [this.selectedAssayOfWithdrawnWorks.buildingCode],
  extensionCode : [this.selectedAssayOfWithdrawnWorks.extensionCode],
  modelCode : [this.selectedAssayOfWithdrawnWorks.modelCode],
  planYear : [this.selectedAssayOfWithdrawnWorks.planYear],
  pricingYear : [this.selectedAssayOfWithdrawnWorks.pricingYear],
  itemName : [this.selectedAssayOfWithdrawnWorks.itemName],
  amount : [this.selectedAssayOfWithdrawnWorks.amount],
  price : [this.selectedAssayOfWithdrawnWorks.price],
  constructionType : [this.selectedAssayOfWithdrawnWorks.constructionType],
  workType : [this.selectedAssayOfWithdrawnWorks.workType],
  itemCode : [this.selectedAssayOfWithdrawnWorks.itemCode]
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
    return this.assayOfWithdrawnWorksForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assayOfWithdrawnWorksForm.controls)) {
      this.assayOfWithdrawnWorksForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

