import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { StatsCategoryEntity } from 'src/app/models/stats-category.model';
import { ApiCallsService } from 'src/services/api-calls.service';
import { SidebarService } from 'src/services/sidebar.service';
import { SoundService } from 'src/services/sound.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  public headerTitle = 'Charts';

  constructor(
    private sidebarService: SidebarService,
    private apiService: ApiCallsService,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.sidebarService.closeSidebar();
    this.soundService.playSound('enter');
    this.fetchData();
  }

  public async fetchData() {
    this.apiService.getChart().subscribe({
      next: (data: StatsCategoryEntity) => {
        // console.log("risposta api:", data);
        if (data && Array.isArray(data)) {
          this.createChart(data);
        } else {
          console.error('errore chiamata API');
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  createChart(data: any[]) {
    const ctx = document.getElementById('canvasId') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: data.map((entry) => entry.category),
        datasets: [
          {
            data: data.map((entry) => entry.numberOfProducts),
            backgroundColor: [
              'rgb(255, 99, 13)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(254, 112, 225)',
              'rgb(80, 209, 100)',
              'rgb(54, 125, 235)',
              'rgb(54, 162, 235)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        cutout: 10,
        maintainAspectRatio: true,
        scale: {
          reverse: false,
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      } as any,
    });
  }
}
