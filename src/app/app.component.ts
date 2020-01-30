import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadWorkflowsDialogComponent } from './upload-workflows-dialog/upload-workflows-dialog.component';
import * as JSZip from 'jszip';
import * as fastxmljs from 'fast-xml-parser';
import {j2xParser} from 'fast-xml-parser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadWorkflowsDialogComponent, { });
    const reader = new FileReader();

    dialogRef.componentInstance.extractFiles.subscribe(files => {
      dialogRef.componentInstance.isLoading = true;
      files.forEach((element) => {
        if (element.type === 'application/zip') {
          this.unzipFiles(element);
        } else {
          reader.onload = (event) => {
            this.parseXML(reader.result);
          };
          reader.readAsText(element);
        }
      });
    });
  }

  unzipFiles(element) {
    const rootFolder = element.name.split('.')[0];

    JSZip()
      .loadAsync(element)
      .then((zip) => {
        const zipFiles = zip.filter((relativePath, file) => {
          return (file.dir === false && relativePath.split('/')[0] === rootFolder);
        });
        console.log(zipFiles);
        zipFiles.forEach((zipEntry) => {
          zipEntry.async('text')
            .then((content) => {
              this.parseXML(content);
            }, (e) => {
              // todo: Exception
            });
          console.log();
        });
      })
      .catch((e) => {
        // todo: Exception
      });
  }

  parseXML(content) {
    //console.log(xmljs);
    const parserOptions = {
      attributeNamePrefix: '',
      attrNodeName: 'attr',
      ignoreAttributes : false,
      ignoreNameSpace: false,
      parseAttributeValue: true,
      cdataTagName: '__cdata'
    };
    let jsonObj = fastxmljs.parse(content, parserOptions);

    let xmlObj = (new j2xParser(parserOptions)).parse(jsonObj);

    console.log(jsonObj);
    console.log(xmlObj);
  }
}
