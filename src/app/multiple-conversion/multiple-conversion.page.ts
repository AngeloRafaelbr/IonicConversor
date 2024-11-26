import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartData, ChartOptions, CategoryScale, LinearScale, BarElement, Title, BarController } from 'chart.js'; // Importando as escalas necessárias
import { HttpClient } from '@angular/common/http';

// Registrando as escalas e outros componentes necessários
Chart.register(CategoryScale, LinearScale, BarElement, Title, BarController);

@Component({
  selector: 'app-multiple-conversion',
  templateUrl: './multiple-conversion.page.html',
  styleUrls: ['./multiple-conversion.page.scss'],
})
export class MultipleConversionPage implements AfterViewInit{

  amount: number = 1;
  currencies: string[] = [
    'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 
    'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 
    'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 
    'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 
    'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 
    'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 
    'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 
    'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 
    'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 
    'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 
    'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 
    'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 
    'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SOS', 'SRD', 'SSP', 
    'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 
    'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 
    'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 
    'ZWL'
  ];

 // Variáveis para o gráfico
 chart: any;
 chartData: ChartData = {
   labels: [],
   datasets: [
     {
       label: 'Taxas de Conversão',
       data: [],
       backgroundColor: 'rgba(75, 192, 192, 0.2)',
       borderColor: 'rgba(75, 192, 192, 1)',
       borderWidth: 1,
     },
   ],
 };

  constructor(private router: Router, private http: HttpClient) { }
  
  ngAfterViewInit(): void {
    const canvasElement = document.getElementById('conversionChart') as HTMLCanvasElement;
    if (canvasElement) {
      this.chart = new Chart(canvasElement, {
        type: 'bar',
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
        } as ChartOptions,
      });
    } else {
      console.error('Elemento canvas não encontrado.');
    }
  }

 // Função para buscar dados da API e gerar gráfico
 fetchConversionRates() {
  const apiKey = '6910d38e304136eeddab5b49';  // Substitua pela sua chave da API
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  this.http.get<any>(url).subscribe(response => {
    console.log(response);
    const conversionRates = response.conversion_rates;
    this.updateChartData(conversionRates);
  });
}

// Função para atualizar os dados do gráfico
  updateChartData(conversionRates: any) {
    this.chartData.labels = this.currencies;
    this.chartData.datasets[0].data = this.currencies.map(currency => conversionRates[currency] * this.amount);
    if (this.chart) {
      this.chart.destroy(); // Destroi o gráfico antigo
    }
    // Verifique se o gráfico já foi inicializado
    if (this.chart) {
      this.chart = new Chart('conversionChart', {
        type: 'bar',
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
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
    this.router.navigate(['/converter']); // Redireciona para a página de conversão direta
  }

  navigateToChart() {
    this.router.navigate(['/multiple-conversion']); // Redireciona para a página de conversão múltipla (ainda a ser criada)
  }

}
