
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PermissionFlashbackBookToTheBodyStore } from 'app/shared/models/permission-flashback-book-to-the-body-store';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PermissionFlashbackBookToTheBodyStoreService } from '../shared/permission-flashback-book-to-the-body-store.service';

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

