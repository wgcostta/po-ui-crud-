import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PoDonutChartSeries, PoPieChartSeries } from '@po-ui/ng-components';
import { ServicosService } from '../servicos/servicos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private servicosService: ServicosService) { }
  
  pseries: Array<PoPieChartSeries | PoDonutChartSeries>;

  ngAfterViewInit(): void {
  
  }
  statusP: any 
  statusC: any 
  ngOnInit(): void {
    this.recuperaCountStatusP();
    this.recuperaCountStatusC();
  }


  recuperaCountStatusP(){
   this.servicosService.recuperarCountServicosPorStatus("P").subscribe(
     res =>{
      this.statusP = res;
     })
  }
  recuperaCountStatusC(){
    this.servicosService.recuperarCountServicosPorStatus("C").subscribe(
      res =>{
        this.statusC = res;
        this.pseries = [{category: "Serviços Concluídos", value: res}, 
        {category: "Serviços Pendentes", value: this.statusP}]

      }
      )
    }
  
  


}
