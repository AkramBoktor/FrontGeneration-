
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MemoirsOfTransgression } from 'app/shared/models/memoirs-of-transgression';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MemoirsOfTransgressionService } from '../shared/memoirs-of-transgression.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-memoirs-of-transgression-view',
  templateUrl: './memoirs-of-transgression-view.component.html',
  styleUrls: ['./memoirs-of-transgression-view.component.scss'],
  providers: []
})

export class MemoirsOfTransgressionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMemoirsOfTransgression: MemoirsOfTransgression;
  memoirsOfTransgressionForm: FormGroup;

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMemoirsOfTransgressionDialog: any,
    @Optional() public dialogRef: MatDialogRef<MemoirsOfTransgressionViewComponent>,
    public memoirsOfTransgressionService: MemoirsOfTransgressionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMemoirsOfTransgression = this.selectedMemoirsOfTransgressionDialog.data || this.selectedMemoirsOfTransgression;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.memoirsOfTransgressionForm = this.formBuilder.group({
      
  buildingCode : [this.selectedMemoirsOfTransgression.buildingCode],
  bidNumber : [this.selectedMemoirsOfTransgression.bidNumber],
  planYear : [this.selectedMemoirsOfTransgression.planYear],
  noteNumber : [this.selectedMemoirsOfTransgression.noteNumber],
  attachment : [this.selectedMemoirsOfTransgression.attachment],
  itemName : [this.selectedMemoirsOfTransgression.itemName],
  price : [this.selectedMemoirsOfTransgression.price],
  overtakingAmount : [this.selectedMemoirsOfTransgression.overtakingAmount],
  offeringType : [this.selectedMemoirsOfTransgression.offeringType],
  constructionType : [this.selectedMemoirsOfTransgression.constructionType],
  itemCode : [this.selectedMemoirsOfTransgression.itemCode]
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
    return this.memoirsOfTransgressionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.memoirsOfTransgressionForm.controls)) {
      this.memoirsOfTransgressionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

