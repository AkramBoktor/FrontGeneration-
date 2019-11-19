
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataStore } from 'app/shared/models/data-store';
import { switchMap } from 'rxjs/operators';
import { DataStoreService } from '../shared/data-store.service';


@Component({
  selector: 'app-data-store-new',
  templateUrl: './data-store-new.component.html',
  styleUrls: ['./data-store-new.component.scss'],
  providers: [
    ]
})

export class DataStoreNewComponent extends AppBaseComponent implements OnInit {
  dataStoreForm: FormGroup;
  @Input() selectedDataStore: DataStore;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataStoreNewComponent>,
    public dataStoreService: DataStoreService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataStore = new DataStore();

    

    this.dataStoreForm = this.formBuilder.group({
     
  id : [0],
  storeNumber : [this.selectedDataStore.storeNumber, [ Validators.required ]],
  storeName : [this.selectedDataStore.storeName, [ Validators.required ]],
  storekeeper : [this.selectedDataStore.storekeeper, [ Validators.required ]],
  storeAddress : [this.selectedDataStore.storeAddress, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataStoreService.create(this.dataStoreForm.value)
        .pipe(switchMap(x => {
			return this.dataStoreService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataStoreForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
