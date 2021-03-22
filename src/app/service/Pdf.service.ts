import * as FileSaver from 'file-saver';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './Message.service';

@Injectable({providedIn: 'root'})
export class PdfService{
  constructor(private http:HttpClient, private messageService: MessageService) {}
  downloadPDF(userEmail:string) {
    this.http.get(`http://localhost:8091/api/pdf?email=${userEmail}`, {withCredentials: true, responseType: "blob"}).subscribe(r => {
      const blob = r;
      FileSaver.saveAs(blob, userEmail+".pdf");
    });
  }
}
