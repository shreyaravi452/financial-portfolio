import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import csvtojson from 'csvtojson';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Output() selectedSymbol = new EventEmitter<string>();

  searchText: string = '';
  searchResults: string[] = [];
  allStockSymbols: string[] = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'PYPL', 'CSCO', 'INTC',
    'AMD', 'NFLX', 'ADBE', 'MU', 'QCOM', 'AMGN', 'COST', 'GILD', 'FISV', 'NDAQ',
    'EBAY', 'REGN', 'VRTX', 'ILMN', 'FIS', 'BIIB', 'MRNA', 'MDLZ', 'PAYX', 'CDNS',
    'MCHP', 'TXN', 'MELI', 'ADSK', 'KHC', 'SPLK', 'DLTR', 'XEL', 'CTSH', 'ZS',
    'ALXN', 'TROW', 'CHTR', 'NTES', 'TTWO', 'LRCX', 'WBA', 'NLOK', 'LULU', 'CLX',
    'VRSK', 'EXC', 'MNST', 'ZBRA', 'MCHX', 'SPLK', 'IQV', 'LBTYA', 'MAR', 'RGEN',
    'KLAC', 'SNPS', 'WDAY', 'VRSN', 'ON', 'KFY', 'HRS', 'CDW', 'ANSS', 'SGEN',
    'PDD', 'ROST', 'V', 'LULU', 'WDC', 'NTAP', 'SEMR', 'SPLK', 'BMRN', 'PCTY',
    'SIVB', 'MPWR', 'OKTA', 'ISRG', 'HPE', 'SIVB', 'ADP', 'FAST', 'MTCH', 'CSX',
    'SBUX', 'CEG', 'LBTYK', 'TSLA', 'TMO', 'PCAR', 'HPE', 'BMRN', 'IDXX', 'TTWO',
    'GPN', 'TSCO', 'SPLK', 'A', 'MRVL', 'HPE', 'DTE', 'CDNS', 'VRSK', 'DXCM',
    'ADI', 'ANSS', 'GILD', 'QDEL', 'IQV', 'ITW', 'VRSN', 'WAT', 'AZPN', 'HPE',
    'ADSK', 'PODD', 'TSLA', 'SE', 'CSX', 'EXPE', 'VRSK', 'WLTW', 'EXPE', 'WLTW',
    'NXST', 'CDNS', 'MPWR', 'ICHR', 'EA', 'TWLO', 'PRGO', 'ADSK', 'MELI', 'TTWO',
    'CME', 'STX', 'BMRN', 'SWKS', 'NXST', 'MASI', 'RNG', 'VRSN', 'PLD', 'ALGN',
    'ARW', 'ZTS', 'TSLA', 'NSC', 'NLOK', 'ALGN', 'ZBRA', 'CERN', 'EXAS', 'PSMT',
    'RMD', 'IDXX', 'ILMN', 'CHTR', 'NXST', 'KR', 'IRTC', 'AAPL', 'BMRN', 'ZLAB',
    'ROST', 'DOCU', 'VRSN', 'HCP', 'HUBS', 'NRG', 'WST', 'ZLAB', 'BRKS', 'HCA',
    'MSCI', 'AAPL', 'GRMN', 'NLOK', 'PODD', 'ZBRA', 'TMO', 'PSMT', 'LBTYK', 'LMT',
    'PTON', 'CRWD', 'FSLR', 'FTNT', 'BILI', 'JBL', 'INMD', 'WGO', 'SGMS', 'TROW',
    'CSX', 'ON', 'ALGN', 'PAYC', 'TRMB', 'MGNI', 'SLAB', 'LITE', 'FOXA', 'MRVL',
    'NCLH', 'GPN', 'SONO', 'RNG', 'VTR', 'MTTR', 'FEYE', 'FSR', 'ZIOP', 'MXL',
    'MUSA', 'WIFI', 'ARWR', 'ELAN', 'AEIS', 'MIRM', 'FROG', 'MODN', 'WPC', 'PTON',
    'NDAQ', 'KRNT', 'NET', 'SRPT', 'SYNA', 'MNDY', 'FSLR', 'BGNE', 'BPT', 'HLIT',
    'MRNA', 'SSTK', 'AEIS', 'TCRD', 'HEAR', 'IMXI', 'HRTX', 'JBLU', 'DHI', 'OMCL',
    'BIDU', 'EXEL', 'EVBG', 'NPTN', 'REPL', 'GNRC', 'CAJ', 'STIM', 'ADVM', 'QURE',
    'VEEV', 'OPRA', 'TSP', 'SYY', 'IVAC', 'ICUI', 'ELOX', 'OCFT', 'STKL', 'SNY',
    'STNE', 'UCL', 'FIVN', 'LTM', 'PAAS', 'ANVS', 'ISRG', 'PSNL', 'BILL', 'KRNT',
    'CNDT', 'NTRI', 'XOMA', 'NTRA', 'MGA', 'CELG', 'NDRA', 'HIMX', 'MLCO', 'FLWS',
    'MTRN', 'NVEI', 'INVA', 'HST', 'QGEN', 'MRVL', 'VVPR', 'CHKP', 'SYNH', 'BWXT',
    'LOPE', 'LBIO', 'FIVN', 'GMBL', 'BNTX', 'AVRO', 'DFLI', 'CTLT', 'ZTO', 'ARNA',
    'NVCR', 'ROKU', 'ELOX', 'ROG', 'CVLT', 'MRTX', 'EYE', 'XON', 'MCRI', 'APPS',
    'FFIV', 'RDHL', 'XOG', 'PDSB', 'NIO', 'AMKR', 'HRTX', 'MARA', 'FNKO', 'AEHR',
    'PRTA', 'PRTS', 'APLD', 'REPH', 'VYNE', 'VRTS', 'IKNA', 'MGY', 'MCFE', 'NEXA',
    'ABNB', 'ADAP', 'AERI', 'NCLH', 'COIN', 'RPD', 'QDEL', 'INOV', 'KNSA', 'VVNT',
    'HYFM', 'ADPT', 'RDFN', 'CRNC', 'MGEN', 'XPEL', 'RH', 'LSPD', 'PRVA', 'USAB',
    'NVDQ', 'MYO', 'ELSE', 'PERI', 'QFIN', 'XOG', 'ALDX', 'FLIR', 'PXLW', 'DAIO',
    'DLO', 'FRGI', 'VTVT', 'RBLX', 'PRPO', 'VIR', 'BPT', 'GCP', 'RCRD', 'BWV',
    'BAM', 'ISRA', 'IQV', 'SITM', 'VECO', 'OLB', 'MICT', 'SHEN', 'SQNS', 'BLCM',
    'TCMD', 'BMRN', 'ALLO', 'AOSL', 'NCMI', 'ITCI', 'ATXI', 'RCM', 'NSYS', 'HCDI',
    'GOOGL', 'BIDU', 'PDD', 'JD', 'BABA', 'MELI', 'NTES', 'QTT', 'SINA', 'SOHU',
    'IAC', 'TWTR', 'GRUB', 'PINS', 'FSLY', 'WORK', 'SPOT', 'TME', 'DIDI', 'BEKE',
    'FUBO', 'RDFN', 'DOCU', 'COUP', 'CRWD', 'ZM', 'SMAR', 'NET', 'SPLK', 'PLTR',
    'ROKU', 'MNDY', 'SNOW', 'DBX', 'GME', 'AMC', 'MARA', 'BTBT', 'RIOT', 'PSTH',
    'TSLA', 'XPEV', 'LI', 'NIO', 'FUV', 'ARKK', 'ARKG', 'ARKW', 'ARKQ', 'ARKG',
    'NNDM', 'ENPH', 'SPWR', 'SEDG', 'CSIQ', 'RUN', 'JKS', 'SOL', 'DLI', 'LRLCF',
    'CSIQ', 'NNDM', 'FUV', 'PBR', 'PTON', 'NKE', 'LULU', 'URBN', 'AEIS', 'AVGO'
  ];

  // allStockSymbols: string[] = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'BABA', 'INTC', 'CSCO'];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // this.loadStockSymbols();
  }

  onSearchChange(): void {
    if (this.searchText) {
      this.searchResults = this.allStockSymbols.filter(item =>
        item.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  onResultClick(result: string): void {
    this.searchText = result;
    this.searchResults = [];
    // You can also emit an event if needed
    this.selectedSymbol.emit(result);
  }
  // async loadStockSymbols(): Promise<void> {
  //   try {
  //     let data: any;
  //     this.http.get('/assets/Symbols.csv', { responseType: "text" }).subscribe(
  //       dat => {
  //         data = dat;
  //       }
  //     )
  //     // const data = await this.http.get('/assets/Symbols.csv', { responseType: 'text' }).toPromise();
  //     console.log("data", data);
  //     const jsonObj = await csvtojson().fromString(data ? data : "");
  //     this.allStockSymbols = jsonObj.map((row: any) => row[0]);
  //     console.log(this.allStockSymbols); // Extract the single column values
  //   } catch (error) {
  //     console.error('Error loading or parsing CSV file:', error);
  //   }
  // }
  loadStockSymbols(): void {
    this.http.get('/assets/Symbols.csv', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          csvtojson()
            .fromString(data)
            .then((jsonObj) => {
              this.allStockSymbols = jsonObj.map((row: any) => row[0]); // Adjust as needed based on CSV structure
            });
        },
        error: (err) => console.error('Error loading CSV file:', err)
      });
  }
}
