import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { writeFile } from 'fs/promises';

@Injectable()
export class StatsService {

    constructor() {}

    async weekdays() {
        const chart = {
            type: 'bar',
            data: {
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [
                    {
                        type: 'line',
                        label: 'Dataset 1',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2,
                        fill: false,
                        data: [-33, 26, 29, 89, -41, 70, -84],
                    },
                    {
                        label: 'Dataset 2',
                        backgroundColor: 'rgb(255, 99, 132)',
                        data: [-42, 73, -69, -94, -81, 18, 87],
                        borderColor: 'white',
                        borderWidth: 2,
                    },
                    {
                        label: 'Dataset 3',
                        backgroundColor: 'rgb(75, 192, 192)',
                        data: [93, 60, -15, 77, -59, 82, -44],
                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: 'Weekdays chart',
                },
            },
        }

        const body= {
            "version": "2",
            "backgroundColor": "white",
            "width": 500,
            "height": 300,
            "devicePixelRatio": 1.0,
            "format": "png",
            "chart": chart
        }

        const response = await axios.post('https://quickchart.io/chart', body, {responseType: 'arraybuffer'});
        await writeFile('chart.png', response.data)
        return response.data;
    }
}
