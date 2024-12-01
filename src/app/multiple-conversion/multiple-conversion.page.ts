import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartData, ChartOptions, CategoryScale, LinearScale, LineElement, Title, LineController, PointElement, Tooltip, Legend } from 'chart.js'; // Importando as escalas necessárias
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

// Registrando as escalas e outros componentes necessários
Chart.register(CategoryScale, LinearScale, LineElement, Title, LineController, PointElement, Tooltip, Legend); // Adicionando o LineController

@Component({
  selector: 'app-multiple-conversion',
  templateUrl: './multiple-conversion.page.html',
  styleUrls: ['./multiple-conversion.page.scss'],
})
export class MultipleConversionPage implements AfterViewInit{

  amount: number = 1;
  currencies: string[] = [
    "USD", // Dólar Americano
  "EUR", // Euro
  "GBP", // Libra Esterlina
  "AUD", // Dólar Australiano
  "CAD", // Dólar Canadense
  "CHF", // Franco Suíço
  "BRL"  // Real Brasileiro
  ];
  selectedCurrency: string = 'x';

 // Variáveis para o gráfico
 chart: any;
 chartData: ChartData = {
   labels: [],
   datasets: [
     {
       label: '',
       data: [],
       fill: false,
       borderColor: 'rgba(255, 255, 0, 1)', // Cor da linha
        tension: 0.1, // Controla a curvatura da linha (0 para linha reta)
        borderWidth: 1,
        pointBackgroundColor: 'rgba(180, 90, 180, 1)', // Cor dos pontos
     },
   ],
 };

  constructor(private router: Router, private http: HttpClient, private alertController: AlertController) { }
  
  ngAfterViewInit(): void {
    const canvasElement = document.getElementById('conversionChart') as HTMLCanvasElement;
    if (canvasElement) {
      this.chart = new Chart(canvasElement, {
        type: 'line', // Alterado para 'line' (gráfico de linha)
        data: this.chartData,
        
      });
    } else {
      console.error('Elemento canvas não encontrado.');
    }
  }

 // Função para buscar dados da API e gerar gráfico
 async fetchConversionRates() {
  if (this.selectedCurrency !== "x") {

    const apiKey = '6910d38e304136eeddab5b49'; 
  const selectedCurrency = this.selectedCurrency;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectedCurrency}`;

  this.http.get<any>(url).subscribe(response => {
    console.log(response);
    const conversionRates = response.conversion_rates;
    this.updateChartData(conversionRates);
  }, error => {
    console.error('Erro ao acessar a API:', error);
  });
  } else {

    const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Insira uma moeda para conversão.',
        buttons: ['OK'],
      });
      await alert.present();
  }
  
}

// Função para atualizar os dados do gráfico
  updateChartData(conversionRates: any) {
    this.chartData.labels = this.currencies;
    const currenciesWithSelected = [this.selectedCurrency, ...this.currencies.filter(currency => currency !== this.selectedCurrency)];

    this.chartData.labels = currenciesWithSelected;
    this.chartData.datasets[0].data = currenciesWithSelected.map(currency => conversionRates[currency] * this.amount);
    if (this.chart) {
      this.chart.destroy(); // Destroi o gráfico antigo
    }

    // Verifique se o gráfico já foi inicializado
    if (this.chart) {
      this.chart = new Chart('conversionChart', {
        type: 'line', // Alterado para 'line' (gráfico de linha)
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true, 
              title: { display: true, text: 'Valor x Moedas' },
              ticks: {
                font: {
                  size: 8
                }
              },
              grid: {
                color: 'rgba(220, 220, 220, 0.2)', // Cor das linhas verticais da grade
                lineWidth: 0.5, // Espessura das linhas da grade
              }
            },
            y: {
              beginAtZero: true,
              title: { display: false, text: 'V A L O R' },
              ticks: {
                font: {
                  size: 9 
                }
              },
              grid: {
                color: 'rgba(220, 220, 220, 0.4)', // Cor das linhas verticais da grade
                lineWidth: 0.5, // Espessura das linhas da grade
              }
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true, // Habilita as dicas de ferramenta (tooltips)
            }
          }
        } as ChartOptions,
      });
      } else {
        console.error('O gráfico não foi inicializado corretamente.');
      }

  }

  // Chama a API e gera o gráfico ao clicar no botão "Converter"
  onConvertClick() {
    this.fetchConversionRates();
  }

  navigateToConverter() {
    this.router.navigate(['/converter']);
  }

  navigateToChart() {
    this.router.navigate(['/multiple-conversion']);
  }

}
