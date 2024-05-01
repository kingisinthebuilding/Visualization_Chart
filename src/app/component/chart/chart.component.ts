import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';
import { forkJoin } from 'rxjs';
import { ChartsService } from 'src/app/service/charts.service';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private themeService: ThemeService, private service:ChartsService) { }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  ngOnInit(): void {
    accessibility(Highcharts); // Initialize accessibility module

    this.loadData(); // Load chart data
  }

  loadData(): void {
    // Call multiple API endpoints concurrently using forkJoin
    forkJoin([
      this.service.getIntensity(),
      this.service.getRelevance(),
      this.service.getLikelihood(),
      this.service.getYear(),
      this.service.getCountry(),
      this.service.getTopic(),
      this.service.getRegion(),
      this.service.getCity()
    ]).subscribe(
      (results: any[]) => {
        // Combine data from different API responses
        const intensityData = results[0];
        const relevanceData = results[1];
        const likelihoodData = results[2];
        const yearData = results[3];
        const countryData = results[4];
        const topicData = results[5];
        const regionData = results[6];
        const cityData = results[7];

        // Process data and update chartOptions for pie chart
        this.chartOptions = {
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Pie Chart'
          },
          series: [{
            type: 'pie',
            name: 'Data',
            data: [
              { name: 'Intensity', y: intensityData },
              { name: 'Relevance', y: relevanceData },
              { name: 'Likelihood', y: likelihoodData },
              { name: 'Year', y: yearData },
              { name: 'Country', y: countryData },
              { name: 'Topic', y: topicData },
              { name: 'Region', y: regionData },
              { name: 'City', y: cityData }
            ]
          }]
        };
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
