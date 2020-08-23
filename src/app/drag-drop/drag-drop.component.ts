import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @Output() text = new EventEmitter<string>();

  @Input() accept = '.xlsx';
  data: [][];


  constructor(private interaction_serivce: InteractionService) { }

  ngOnInit(): void {
  }

  drop(files) {
    console.log(files, '>>>>>>>>>>>');

    this.text.emit("File Successfully Uploaded");


  }
  onFileChange(evt: any) {

    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot upload multiple files');
    const reader: FileReader = new FileReader();
    if (this.accept === '.xlsx') {
      reader.onload = (e: any) => {

        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        this.interaction_serivce.data.next(this.data);
      };
      reader.readAsBinaryString(target.files[0]);
    }
    else {
      throw new Error('Only .xlsx files are allowed');
    }

  }

}
