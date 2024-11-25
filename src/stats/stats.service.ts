import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import { WorkoutsService } from '@app/workouts/workouts.service';
import { groupBy, map } from 'lodash';

@Injectable()
export class StatsService {

    constructor(private readonly workoutsService: WorkoutsService) {}

    async getMonthlyWorkouts(groupId: number) {
        let dataSet = [];
        let users = [];
        let values = [];
        const workouts = await this.workoutsService.getMonthlyWorkouts(groupId);
        const workoutsByUser = groupBy(workouts, 'userId')

        for (const workoutsByUserKey in workoutsByUser) {
            const workoutsByUserValue = workoutsByUser[workoutsByUserKey];
            const value = workoutsByUserValue[0];
            users.push(value['nickName'].length ? value['nickName'] : value['name']);
            values.push(value['workoutsCount']);
        }

        const chart= {
            type: 'bar',
            data: {
                labels: users,
                datasets: [
                    {
                        data: values,
                        backgroundColor: map(users, () => this.getRandomRgbColor())
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Monthly chart',
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                        anchor: 'center',
                        align: 'center',
                        color: '#666',
                        font: {
                            weight: 'normal',
                        },
                    },
                },
            }
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
        await writeFile(process.env.ASSETS_PATH + `chart.png`, response.data)
        return response.data;
    }

    async getWorkoutsByWeekday(groupId: number) {
        let dataSet = [];
        const workouts = await this.workoutsService.getWorkoutsByWeekday(groupId);
        const workoutsByUser = groupBy(workouts, 'userId')

        for (const workoutsByUserKey in workoutsByUser) {
            const workoutsByUserValue = workoutsByUser[workoutsByUserKey];
            const weekdays = Array.from({ length: 7 }, () => null);
            for (let i = 0; i < workoutsByUserValue.length; i++) {
                const workout = workoutsByUserValue[i];
                weekdays[parseInt(workout.weekday)] = workout.workoutsCount;
            }
            dataSet.push({
                label: workoutsByUserValue[0]['nickName'].length ? workoutsByUserValue[0]['nickName'] : workoutsByUserValue[0]['name'],
                borderColor: this.getRandomRgbColor(),
                fill: false,
                data: weekdays
            });
        }

        const chart = {
            type: 'bar',
            data: {
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: dataSet
            },
            options: {
                title: {
                    display: true,
                    text: 'Weekdays chart (past 30 days)',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                        anchor: 'center',
                        align: 'center',
                        color: '#666',
                        font: {
                            weight: 'normal',
                        },
                    },
                },
            }
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
        await writeFile(process.env.ASSETS_PATH + `chart.png`, response.data)
        return response.data;
    }

    async getAvgWorkoutsPerGroup(period: number = 7, groupId: number) {
        let dataSet = [];
        const workouts = await this.workoutsService.getAvgWorkoutsByGroups(period, groupId)
        for (let i = 0; i < workouts.length; i++) {
            const workout = workouts[i];
            dataSet.push({
                label: workout.title,
                borderColor: this.getRandomRgbColor(),
                fill: false,
                data: [workout.avg_workouts_per_user]
            });
        }

        const chart = {
            type: 'bar',
            data: {
                labels: null,
                datasets: dataSet
            },
            options: {
                title: {
                    display: true,
                    text: `Avg workouts per group (past ${period} days)`,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                }
            }
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
        await writeFile(process.env.ASSETS_PATH + `chart.png`, response.data)
        return response.data;
    }

    private getRandomRgbColor() {
        const r = Math.floor(Math.random() * 256); // Random number between 0 and 255 for red
        const g = Math.floor(Math.random() * 256); // Random number between 0 and 255 for green
        const b = Math.floor(Math.random() * 256); // Random number between 0 and 255 for blue
        return `rgb(${r}, ${g}, ${b})`;
    }
}
