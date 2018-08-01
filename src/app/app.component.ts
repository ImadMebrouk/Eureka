import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  results = '';
  value= '';
  value2='1';
   data: any;

   diffs: any[] = new Array();

  constructor(private http: HttpClient){

      }

  ngOnInit(): void {

    }

  onNameKeyup(event: any) { // without type info
    this.value = event.target.value
  }

  onNameKeyup2(event: any) { // without type info
    this.value2 = event.target.value
  }

  getOrder(): void{

    this.DisplayDiv("activeList");

    this.http.get('http://localhost:57799/api/Order/'+this.value+'-' +this.value2).subscribe((res: any) => {
      this.data = res;
      this.diffs = [];
    console.log(this.data);


      this.diffs.push(this.data.originalOrder)
      this.diffs[0].user = this.data.originalOrder.utilisateur;
      this.diffs[0].modificationDate = this.data.originalOrder.dateSaisie;
      this.diffs[0].property = "Création de l'ordre";

                console.log(this.data.changeLog[0]);
      for (var _i = 0; _i < this.data.changeLog.length; _i++) {
        for (var _j = 0; _j < this.data.changeLog[_i].diffs.length; _j++) {
            console.log(this.data.changeLog[_i]);


              this.data.changeLog[_i].diffs[_j].modificationDate = this.data.changeLog[_i].utcDiffDate; // we had some properties to the diffs object
              this.data.changeLog[_i].diffs[_j].user = this.data.changeLog[_i].lastUser;


              this.diffs.push(this.data.changeLog[_i].diffs[_j]); // diffs Array contain all the diffs from the api
            }
          }

    });
  }

  DisplayDiv(myDiv:string): void
  {
    var x = document.getElementById(myDiv);
    x.style.display = "block";
  }

}
