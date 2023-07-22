import { Component } from '@angular/core'

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent {
    public path: string = '/assets/documents/'

    public printFile(path: string): void {
        fetch(path)
            .then(response => response.blob())
            .then(blob => {
                const dataURL = URL.createObjectURL(blob)
                const pdfWindow = window.open(dataURL)
                pdfWindow?.print()
            })
            .catch((error) => {
                console.error('Failed to fetch or print the PDF:', error)
            })
    }
}
