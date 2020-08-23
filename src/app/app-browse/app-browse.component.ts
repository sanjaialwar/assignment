
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-browse',
  templateUrl: './app-browse.component.html',
  styleUrls: ['./app-browse.component.css']
})
export class AppBrowseComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(AppBrowsedComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  closeDialog() {
    setTimeout(() => { this.dialog.closeAll(); }, 3000);
  }
}

@Component({
  selector: 'app-browsed',
  templateUrl: './app-browsed.component.html',
  styleUrls: ['./app-browsed.component.css']

})
export class AppBrowsedComponent implements OnInit {
  @Input() text = 'Browse';
  @Input() param = 'file';
  @Input() target = 'https://file.io';
  @Input() accept = '.xlsx';
  @Output() complete = new EventEmitter<string>();
  arrayBuffer;
  fileData = [];
  upload: boolean = false;
  public files: Array<FileUploadModel> = [];

  constructor(public _http: HttpClient,
    public interactionService: InteractionService, public browseComponent: AppBrowseComponent) { }

  ngOnInit() {
  }

  onClick() {

    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () => {
      if (fileUpload.files.length !== 1) throw new Error('Cannot upload multiple files');
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();

  }

  onFileComplete() {
    console.log(`Successful upload`);
  }
  public uploadFile(event) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let fileData = [];
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      fileData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(fileData);
      this.interactionService.data$.subscribe(data => {
        fileData.map(item => {
          if (data.indexOf(item) === -1) {
            item.id = Math.floor((Math.random() * 1000000) + 1);
            data.push(item);
          }
        });
        this.interactionService.data.next(data);
      });
      this.upload = true;
      this.browseComponent.closeDialog();
    }
    fileReader.readAsArrayBuffer(event.target.files[0]);
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }
}
export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}


