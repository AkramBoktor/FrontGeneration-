
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataStore } from 'app/shared/models/data-store';
import { switchMap } from 'rxjs/operators';
import { DataStoreService } from '../shared/data-store.service';




@Component({
  selector: 'app-data-store-edit',
  templateUrl: './data-store-edit.component.html',
  styleUrls: ['./data-store-edit.component.scss'],
  providers: []
})

export class DataStoreEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataStore: DataStore;
  dataStoreForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataStoreDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataStoreEditComponent>,
    public dataStoreService: DataStoreService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataStore = new DataStore();
    this.selectedDataStore = this.selectedDataStoreDialog.data || this.selectedDataStore;

    

    this.dataStoreForm = this.formBuilder.group({
      
  id : [this.selectedDataStore.id],
  storeNumber : [this.selectedDataStore.storeNumber, [ Validators.required ]],
  storeName : [this.selectedDataStore.storeName, [ Validators.required ]],
  storekeeper : [this.selectedDataStore.storekeeper, [ Validators.required ]],
  storeAddress : [this.selectedDataStore.storeAddress, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataStoreService.update(this.dataStoreForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataStoreService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataStoreForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
