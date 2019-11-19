
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataStore } from 'app/shared/models/data-store';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataStoreService } from '../shared/data-store.service';

@Component({
  selector: 'app-data-store-view',
  templateUrl: './data-store-view.component.html',
  styleUrls: ['./data-store-view.component.scss'],
  providers: []
})

export class DataStoreViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataStore: DataStore;
  dataStoreForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataStoreDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataStoreViewComponent>,
    public dataStoreService: DataStoreService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataStore = this.selectedDataStoreDialog.data || this.selectedDataStore;

    

    this.dataStoreForm = this.formBuilder.group({
      
  storeNumber : [this.selectedDataStore.storeNumber],
  storeName : [this.selectedDataStore.storeName],
  storekeeper : [this.selectedDataStore.storekeeper],
  storeAddress : [this.selectedDataStore.storeAddress]
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
    return this.dataStoreForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataStoreForm.controls)) {
      this.dataStoreForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

