document.addEventListener('DOMContentLoaded', function () {

    donutChart();
    pieChartWithDrillDown();
    pieChartWithDrillDown2();
    stackBarChart();
    bubbleChart();
    splitBubbleChart();

    function donutChart() {
        var colors = Highcharts.getOptions().colors,
            categories = [
                'Gang Violence', 'Home Invasion ', 'Defensive Use', 'Non-Shooting Incident','Shots Fired'
            ],
            data = [
                {
                    y: 23,
                    color: colors[2],
                    drilldown: {
                        name: 'Gang Violence',
                        categories: [
                            'Injured', 'Killed', 'Unharmed', 'Arrested'
                        ],
                        data: [20, 23, 40,27]
                    }
                }, {
                    y: 33,
                    color: colors[3],
                    drilldown: {
                        name: 'Home Invasion ',
                        categories: [
                            'Injured', 'Killed', 'Unharmed', 'Arrested'
                        ],
                        data: [20, 23, 40,27]
                    }
                }, {
                    y: 10,
                    color: colors[4],
                    drilldown: {
                        name: 'Defensive Use',
                        categories: [
                            'Injured', 'Killed', 'Unharmed', 'Arrested'
                        ],
                        data: [20, 23, 40,27]
                    }
                }
                , {
                    y: 14,
                    color: colors[5],
                    drilldown: {
                        name: 'Non-Shooting Incident',
                        categories: [
                            'Injured', 'Killed', 'Unharmed', 'Arrested'
                        ],
                        data: [0, 0, 100 ,0]
                    }
                }
                , {
                    y: 14,
                    color: colors[6],
                    drilldown: {
                        name: 'Shots Fired',
                        categories: [
                            'Injured', 'Killed', 'Unharmed', 'Arrested'
                        ],
                        data: [25, 5, 35 ,35]
                    }
                }
            ],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


        // Build the data arrays
        for (i = 0; i < dataLen; i += 1) { // add browser data
            browserData.push({name: categories[i], y: data[i].y, color: data[i].color});

            // add version data
            drillDataLen = data[i].drilldown.data.length;
            for (j = 0; j < drillDataLen; j += 1) {
                brightness = 0.2 - (j / drillDataLen) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                    color: Highcharts.color(data[i].color).brighten(brightness).get()
                });
            }
        }

        // Create the chart
        Highcharts.chart('donut-chart', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Incident Attributes',
                align: 'left'
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [
                {
                    name: 'Browsers',
                    data: browserData,
                    size: '60%',
                    dataLabels: {
                        formatter: function () {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: '#ffffff',
                        distance: -30
                    }
                }, {
                    name: 'Incident result',
                    data: versionsData,
                    size: '80%',
                    innerSize: '60%',
                    dataLabels: {
                        formatter: function () { // display only if larger than 1
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                        }
                    },
                    id: 'result'
                }
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 400
                        },
                        chartOptions: {
                            series: [
                                {}, {
                                    id: 'result',
                                    dataLabels: {
                                        enabled: false
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });

    }

    function pieChartWithDrillDown() { 
        var colors = ['#AFDAF5', '#F88FB3']
        Highcharts.chart('pie-chart-dd', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Age ranges',
                align: 'centter'
            },
            subtitle: {
                text: 'Click the slices to view gender breakdown. Source: <a href="https://github.com/awesomedata/awesome-public-datasets" target="_blank">Awesome Public Datasets</a>',
                align: 'left'
            },

            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: '%'
                }
            },

            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [
                {
                    name: 'Age Ranges',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Adult 18+',
                            y: 48,
                            drilldown: 'Adult 18+'
                        }, {
                            name: 'Teen 12-17',
                            y: 45,
                            drilldown: 'Teen 12-17'
                        }, {
                            name: 'Child 0-11',
                            y: 7,
                            drilldown: 'Child 0-11'
                        }
                    ]
                }
            ],
            drilldown: {
                series: [
                    {
                        name: 'Adult 18+',
                        id: 'Adult 18+',
                        color: colors[0],
                        data: [
                            [
                                'Male', 80
                            ],
                            [
                                'Female', 20
                            ]
                        ]
                    }, {
                        name: 'Teen 12-17',
                        id: 'Teen 12-17',
                        color: colors[1],
                        data: [
                            [
                                'Male', 90
                            ],
                            [
                                'Female', 10
                            ]
                        ]
                    }, {
                        name: 'Child 0-11',
                        id: 'Child 0-11',
                        color: colors[1],
                        data: [
                            [
                                'Male', 98
                            ],
                            [
                                'Female', 2
                            ]
                        ]
                    }
                ]
            }
        });
    }

    function pieChartWithDrillDown2() { 
        var colors = ['#AFDAF5', '#F88FB3']
        Highcharts.chart('pie-chart-dd-2', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Incident Attributes',
                align: 'center'
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: '%'
                }
            },

            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [
                {
                    name: 'Incident Attributes',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Gang Violence',
                            y: 23,
                            drilldown: 'Gang Violence'
                        }, {
                            name: 'Home Invasion',
                            y: 10,
                            drilldown: 'Home Invasion'
                        }, {
                            name: 'Defensive Use',
                            y: 7,
                            drilldown: 'Defensive Use'
                        },
                        {
                            name: 'Non-Shooting Incident',
                            y: 24,
                            drilldown: 'Non-Shooting Incident'
                        },
                        {
                            name: 'Shots Fired',
                            y: 16,
                            drilldown: 'Shots Fired'
                        }
                        ,
                        {
                            name: 'Other',
                            y: 10,
                            drilldown: 'Other'
                        }
                    ]
                }
            ],
            drilldown: {
                series: [
                    {
                        name: 'Gang Violence',
                        id: 'Gang Violence',
                        data: [
                            [
                                'Injured', 35
                            ],
                            [
                                'Killed', 15
                            ],
                            [
                                'Unharmed', 37
                            ],
                            [
                                'Arrested', 13
                            ]
                        ]
                    }, {
                        name: 'Home Invasion',
                        id: 'Home Invasion',
                        data: [
                            [
                                'Injured', 35
                            ],
                            [
                                'Killed', 15
                            ],
                            [
                                'Unharmed', 37
                            ],
                            [
                                'Arrested', 13
                            ]
                        ]
                    }, {
                        name: 'Defensive Use',
                        id: 'Defensive Use',
                        data: [
                            [
                                'Injured', 35
                            ],
                            [
                                'Killed', 15
                            ],
                            [
                                'Unharmed', 37
                            ],
                            [
                                'Arrested', 13
                            ]
                        ]
                    }, {
                        name: 'Non-Shooting Incident',
                        id: 'Non-Shooting Incident',
                        data: [
                            [
                                'Injured', 35
                            ],
                            [
                                'Killed', 15
                            ],
                            [
                                'Unharmed', 37
                            ],
                            [
                                'Arrested', 13
                            ]
                        ]
                    }
                    , {
                        name: 'Shots Fired',
                        id: 'Shots Fired',
                        data: [
                            [
                                'Injured', 35
                            ],
                            [
                                'Killed', 15
                            ],
                            [
                                'Unharmed', 37
                            ],
                            [
                                'Arrested', 13
                            ]
                        ]
                    }, {
                        name: 'Other',
                        id: 'Other',
                        data: [
                            [
                                'Injured', 35
                            ],
                            [
                                'Killed', 15
                            ],
                            [
                                'Unharmed', 37
                            ],
                            [
                                'Arrested', 13
                            ]
                        ]
                    }
                ]
            }
        });
    }

    function stackBarChart() { // Data retrieved from: https://www.uefa.com/uefachampionsleague/history/
        var colors = ['#AFDAF5', '#F88FB3']
        Highcharts.chart('stacked-bar', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Persons Involved by Age Range'
            },
            xAxis: {
                categories: ['Adult 18+', 'Teen 12-17', 'Child 0-11',]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of persons involved'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    name: 'Female',
                    color: colors[1],
                    data: [5023, 3904, 459,]
                }, {
                    name: 'Male',
                    color: colors[0],
                    data: [56347, 45673, 6000,]
                }
            ]
        });
    }

    function bubbleChart() {
        Highcharts.chart('bubble-chart', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Number of incidents in each state',
                align: 'left'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}incidents'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: [
                {
                    name: 'States',
                    data: [
                        {
                            name: 'Alabama',
                            value: 767.1
                        },
                        {
                            name: 'Alaska',
                            value: 20.7
                        },
                        {
                            name: 'Arizona',
                            value: 97.2
                        },
                        {
                            name: 'California',
                            value: 111.7
                        }, {
                            name: 'Connecticut',
                            value: 158.1
                        }, {
                            name: 'Delaware',
                            value: 241.6
                        }, {
                            name: 'Florida',
                            value: 249.1
                        }, {
                            name: 'Georgia',
                            value: 298.1
                        }, {
                            name: 'Hawaii',
                            value: 323.7
                        }, {
                            name: 'Idaho',
                            value: 78.3
                        }, {
                            name: 'Illinois',
                            value: 2000
                        }, {
                            name: 'Indiana',
                            value: 353.2
                        }, {
                            name: 'Iowa',
                            value: 337.6
                        }, {
                            name: 'Kansas',
                            value: 71.1
                        }, {
                            name: 'Kentucky',
                            value: 69.8
                        }, {
                            name: 'Louisiana',
                            value: 67.7
                        }, {
                            name: 'Maine',
                            value: 59.3
                        }, {
                            name: 'Maryland',
                            value: 1500
                        }, {
                            name: 'Massachusetts',
                            value: 51.2
                        }, {
                            name: 'Michigan',
                            value: 48.3
                        }, {
                            name: 'Minnesota',
                            value: 44.4
                        }, {
                            name: 'Mississippi',
                            value: 44.3
                        }, {
                            name: 'Missouri',
                            value: 43.7
                        }, {
                            name: 'Montana',
                            value: 40.2
                        }, {
                            name: 'Nebraska',
                            value: 40
                        }, {
                            name: 'Nevada',
                            value: 34.7
                        }, {
                            name: 'New Hampshire',
                            value: 34.6
                        }, {
                            name: 'New Jersey',
                            value: 20.7
                        }, {
                            name: 'New Mexico',
                            value: 19.4
                        }, {
                            name: 'New York',
                            value: 16.7
                        }, {
                            name: 'North Carolina',
                            value: 12.3
                        }, {
                            name: 'North Dakota',
                            value: 10.4
                        }, {
                            name: 'Ohio',
                            value: 9.5
                        }, {
                            name: 'Oklahoma',
                            value: 7.8
                        }, {
                            name: 'Oregon',
                            value: 7.5
                        }, {
                            name: 'Pennsylvania',
                            value: 7.2
                        }
                        , {
                            name: 'Rhode Island',
                            value: 7.2
                        }
                        , {
                            name: 'South Carolina',
                            value: 7.2
                        }
                        , {
                            name: 'South Dakota',
                            value: 7.2
                        }
                        , {
                            name: 'Tennessee',
                            value: 7.2
                        }
                        , {
                            name: 'Texas',
                            value: 7.2
                        }
                        , {
                            name: 'Utah',
                            value: 7.2
                        }
                        , {
                            name: 'Vermont',
                            value: 7.2
                        }
                        , {
                            name: 'Virginia',
                            value: 7.2
                        }
                        , {
                            name: 'Washington',
                            value: 7.2
                        }
                        , {
                            name: 'West Virginia',
                            value: 7.2
                        }
                        , {
                            name: 'Wisconsin',
                            value: 7.2
                        }
                        , {
                            name: 'Wyoming',
                            value: 7.2
                        }

                    ]
                }
            ]
        });

    }

    function splitBubbleChart() {
        Highcharts.chart('split-bubble', {
            chart: {
              type: 'packedbubble',
              height: '100%'
            },
            title: {
              text: 'States with the most incidents and the most common incident type',
              align: 'left'
            },
            tooltip: {
              useHTML: true,
              pointFormat: '<b>{point.name}:</b> {point.value} incidents'
            },
            plotOptions: {
              packedbubble: {
                minSize: '10%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                  gravitationalConstant: 0.05,
                  splitSeries: true,
                  seriesInteraction: false,
                  dragBetweenSeries: false,
                  parentNodeLimit: true
                },
                dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                  filter: {
                    property: 'y',
                    operator: '>',
                    value: 100
                  },
                  style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                  }
                }
              }
            },
            series: [{
              name: 'Illinois',
              data: [{
                name: 'Gang Violoence',
                value: 6000
              }, {
                name: 'Officer Involved Incident ',
                value: 550
              },
              {
                name: 'Drug involvement ',
                value: 50
              },
              {
                name: 'Ghost gun ',
                value: 111.7
              },
              {
                name: 'Home Invasion ',
                value: 158.1
              },
              {
                name: 'Mass Shooting',
                value: 241.6
              },
              {
                name: 'Non-Shooting Incident ',
                value: 249.1
              }]
            }, {
              name: 'California',
              data: [{
                name: 'Gang Violoence',
                value: 300
              }, {
                name: 'Officer Involved Incident ',
                value: 20.7
              },
              {
                name: 'Drug involvement ',
                value: 6000
              },
              {
                name: 'Ghost gun ',
                value: 111.7
              },
              {
                name: 'Home Invasion ',
                value: 158.1
              },
              {
                name: 'Mass Shooting',
                value: 241.6
              },
              {
                name: 'Non-Shooting Incident ',
                value: 249.1
              }]
            }, {
              name: 'New York',
              data: [{
                name: 'Gang Violoence',
                value: 767.1
              }, {
                name: 'Officer Involved Incident ',
                value: 20.7
              },
              {
                name: 'Drug involvement ',
                value: 97.2
              },
              {
                name: 'Ghost gun ',
                value: 111.7
              },
              {
                name: 'Home Invasion ',
                value: 158.1
              },
              {
                name: 'Mass Shooting',
                value: 241.6
              },
              {
                name: 'Non-Shooting Incident ',
                value: 6000
              }]
            }, {
              name: 'Baltimore',
              data: [{
                name: 'Gang Violoence',
                value: 767.1
              }, {
                name: 'Officer Involved Incident ',
                value: 20.7
              },
              {
                name: 'Drug involvement ',
                value: 6000
              },
              {
                name: 'Ghost gun ',
                value: 111.7
              },
              {
                name: 'Home Invasion ',
                value: 158.1
              },
              {
                name: 'Mass Shooting',
                value: 241.6
              },
              {
                name: 'Non-Shooting Incident ',
                value: 249.1
              }]
            }, {
              name: 'Florida',
              data: [{
                name: 'Gang Violoence',
                value: 767.1
              }, {
                name: 'Officer Involved Incident ',
                value: 6000
              },
              {
                name: 'Drug involvement ',
                value: 97.2
              },
              {
                name: 'Ghost gun ',
                value: 111.7
              },
              {
                name: 'Home Invasion ',
                value: 158.1
              },
              {
                name: 'Mass Shooting',
                value: 241.6
              },
              {
                name: 'Non-Shooting Incident ',
                value: 249.1
              }]
            }]
          });
    }

})
