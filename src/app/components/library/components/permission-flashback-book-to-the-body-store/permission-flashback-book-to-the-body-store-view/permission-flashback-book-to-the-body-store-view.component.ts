
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PermissionFlashbackBookToTheBodyStore } from 'app/shared/models/permission-flashback-book-to-the-body-store';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PermissionFlashbackBookToTheBodyStoreService } from '../shared/permission-flashback-book-to-the-body-store.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-permission-flashback-book-to-the-body-store-view',
  templateUrl: './permission-flashback-book-to-the-body-store-view.component.html',
  styleUrls: ['./permission-flashback-book-to-the-body-store-view.component.scss'],
  providers: []
})

export class PermissionFlashbackBookToTheBodyStoreViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPermissionFlashbackBookToTheBodyStore: PermissionFlashbackBookToTheBodyStore;
  permissionFlashbackBookToTheBodyStoreForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPermissionFlashbackBookToTheBodyStoreDialog: any,
    @Optional() public dialogRef: MatDialogRef<PermissionFlashbackBookToTheBodyStoreViewComponent>,
    public permissionFlashbackBookToTheBodyStoreService: PermissionFlashbackBookToTheBodyStoreService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPermissionFlashbackBookToTheBodyStore = this.selectedPermissionFlashbackBookToTheBodyStoreDialog.data || this.selectedPermissionFlashbackBookToTheBodyStore;

    

    this.permissionFlashbackBookToTheBodyStoreForm = this.formBuilder.group({
      
  bookNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.bookNumber],
  bookNumberBranch : [this.selectedPermissionFlashbackBookToTheBodyStore.bookNumberBranch],
  returnAuthorizationDate : [this.selectedPermissionFlashbackBookToTheBodyStore.returnAuthorizationDate],
  outgoingLibraryRecipient : [this.selectedPermissionFlashbackBookToTheBodyStore.outgoingLibraryRecipient],
  employeeCode : [this.selectedPermissionFlashbackBookToTheBodyStore.employeeCode],
  extensionNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.extensionNumber],
  generalNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.generalNumber],
  bookTitle : [this.selectedPermissionFlashbackBookToTheBodyStore.bookTitle]
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
    return this.permissionFlashbackBookToTheBodyStoreForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.permissionFlashbackBookToTheBodyStoreForm.controls)) {
      this.permissionFlashbackBookToTheBodyStoreForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

