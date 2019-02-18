import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngAfterViewInit() {


    let sizeTitle = 12;
    let sizeText = 35; // Texto principal
    let sizeSec = 35 // Porcent el . 30
    let sizeDow = 20; // Fecha
    let sizeFig = 10; // Triangulos
    let sizePorcent2 = 30;
    let width = 170;
    let height = 170;

    let sectionW = 1150;
    let sectionH = 50;

    let y0 = 13; // Section
    let y1 = 76;
    let y2 = 259;
    let y3 = 442;

    let zingchart;
    zingchart.THEME="classic";

    var myConfig = {
        backgroundColor:"#111",
        graphset:[
            {
                backgroundColor:"none",
                type:"null",
                x:0,
                y:0,
                width:"100%",
                height:"100%",
                widgets:[
                    {
                        type:"dashboard_section",
                        width:sectionW,
                        height: sectionH,
                        x:10,
                        y:y0,
                        title:"Universo de Directivos",
                        id:"section1",
                        backgroundColor1:"#212223",
                        backgroundColor2:"#212223"
                    },
                    {
                        type:"dashboard_datetime",
                        width:width,
                        height:height,
                        x:10,
                        y:y1,
                        id:"dash1",
                        title:"Guadalajara",
                        backgroundColor1:"#212223",
                        backgroundColor2:"#212223"
                    },
                    {
                        type:"dashboard_metric",
                        width:width,
                        height:height,
                        x:188,
                        y:y1,
                        title:"Efectividad",
                        value:813.74,
                        percent:+11.52,
                        id:"dash2",
                        backgroundColor1:"#212223",
                        backgroundColor2:"#212223"
                    },
                    {
                        type:"dashboard_accounts",
                        width:(width*2)+8,
                        height:(height*2)+13,
                        x:366,
                        y:y1,
                        id:"dash3",
                        title: "Nominas",
                        backgroundColor1:"#212223",
                        backgroundColor2:"#212223"
                    },
                    {
                        type:"dashboard_metric",
                        width:width,
                        height:height,
                        x:10,
                        y:y2,
                        title:"Escuelas con Director",
                        value:83.18,
                        percent:-21.27,
                        id:"dash4",
                        backgroundColor1:"#212223",
                        backgroundColor2:"#212223"
                    },
                    {
                        type:"dashboard_gauge",
                        width:width,
                        height:height,
                        x:188,
                        y:y2,
                        id:"dash6",
                        title: "Datos",
                        backgroundColor1:"#212223",
                        backgroundColor2:"#212223"
                    },
                    {
                      type:"dashboard_bar",
                      backgroundColor:"#BDBDBD",
                      x: 722,
                      y: y1,
                      id:"dash8",
                      title: "Datos",
                      height: (height*2)+13,
                      width: (width*2)+8
                    },
                    {
                      type:"dashboard_line",
                      backgroundColor:"#BDBDBD",
                      x: 10,
                      y: y3,
                      id:"dash7",
                      title: "Solicitudes",
                      height: height,
                      width: (width*2)+8
                    },
                    { // 722
                        type:"dashboard_metric",
                        width:width,
                        height:height,
                        x:366,
                        y:y3,
                        title:"General",
                        value:"487.32",
                        percent:4.37,
                        id:"dash5",
                        backgroundColor1:"#212223",
                        backgroundColor2:"#212223"
                    }/*
                    {
                      type:"dashboard_bar",
                      backgroundColor:"#BDBDBD",
                      x: 544,
                      y: y2,
                      id:"dash8",
                      title: "Datos",
                      height: height,
                      width: width
                    }*/
                ]
            }
        ]
    };

    zingchart.widgets.dashboard_container = {
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 210;
            var h = data.height || 210;
            var id = data.id || "dash";
            var backgroundColor1 = data.backgroundColor1 || "#212223";
            var backgroundColor2 = data.backgroundColor2 || "#212223";

            var json = {
                labels:[
                ],
                shapes:[
                    {
                        type:"poly",
                        zIndex:-1000,
                        points:[[x,y],
                        [x+w+1,y],
                        [x,y+h+1]],
                        backgroundColor:backgroundColor1,
                        flat:true
                    },
                    {
                        type:"poly",
                        zIndex:-1000,
                        points:[[x+w,y+h],
                        [x+w,y],
                        [x,y+h]],
                        backgroundColor:backgroundColor1 + " " + backgroundColor2,
                        fillAngle:180,
                        fillOffsetX:w/4,
                        flat:true
                    }
                ]
            };
            return json;
        }
    };

    zingchart.widgets.dashboard_datetime = {
        tinfo : function() {

            var dow = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
            var shmon = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

            var date = new Date();
            var hr = date.getHours(), min = date.getMinutes(), mod = 'AM';
            if (hr > 12) {
                hr -= 12;
                mod = 'PM';
            }
            //hr = (hr < 10) ? ("0"+hr) : hr;
            //min = (min < 10) ? ("0"+min) : min;

            return {
                dow: dow[date.getDay()],
                day: date.getDate() + " " + shmon[date.getMonth()] + " " + date.getFullYear(),
                time: hr + ":" + min + "<span style=\"font-size:25px\">" + mod + "</span>"
            };
        },
        update : function(chartid, snippetid, params) {
            var tinfo = zingchart.widgets.dashboard_datetime.tinfo();
            zingchart.exec(chartid, 'updateobject', {
                data : [
                    {
                        type:"label",
                        id:snippetid+"_time_sh",
                        text:tinfo.time
                    },{
                        type:"label",
                        id:snippetid+"_time",
                        text:tinfo.time
                    }
                ]
            });
        },
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 150;
            var h = data.height || 150;
            var id = data.id || "dash";
            var title = data.title || "";
            var value = data.value || "";
            var percent = data.percent || 0;

            var json = zingchart.widgets.dashboard_container.parse(data);

            window.setInterval(function() {
                zingchart.widgets.dashboard_datetime.update(data.loader.id, id, {
                    time : Math.random()
                });
            }, 5000);

            var tinfo = zingchart.widgets.dashboard_datetime.tinfo();

            json.labels.push(
                {
                    text:title,
                    color:"#eee",
                    fontSize: sizeTitle,
                    bold:true,
                    x:x,
                    y:y,
                    width:w,
                    textAlign:"left",
                    padding:"8 8 8 28",
                    flat:true
                },
                {
                    text:tinfo.time,
                    id:id+"_time_sh",
                    color:"#000",
                    fontSize: sizeText,
                    x:x+2,
                    y:y+34,
                    width:w,
                    height:height,
                    textAlign:"left",
                    padding:"8 8 8 8",
                    flat:true,
                    //backgroundImage:"PATTERN_NARROW_HORIZONTAL",
                    vmlBackgroundImage:""
                },
                {
                    text:tinfo.time,
                    id:id+"_time",
                    zIndex:1000,
                    color:"#eee",
                    fontSize:sizeText,
                    x:x,
                    y:y+32,
                    width:w,
                    height:height,
                    textAlign:"left",
                    padding:"8 8 8 8",
                    flat:true
                },
                {
                    text:tinfo.day,
                    color:"#eee",
                    fontSize:sizeDow,
                    x:x+2,
                    y:y+130,
                    width:w,
                    textAlign:"left",
                    padding:"8 8 8 8",
                    flat:true
                }
            );

            json.shapes.push(
                {
                    type:"line",
                    points:[[x,y+33],
                    [x+w,y+33]],
                    lineWidth:1,
                    lineColor:"#121314",
                    flat:true
                },
                {
                    type:"line",
                    points:[[x,y+34],
                    [x+w,y+34]],
                    lineWidth:1,
                    lineColor:"#303334",
                    flat:true
                },
                {
                    type:"line",
                    points:[[x,y+126],
                    [x+w,y+126]],
                    lineWidth:1,
                    lineColor:"#121314",
                    flat:true
                },
                {
                    type:"line",
                    points:[[x,y+127],
                    [x+w,y+127]],
                    lineWidth:1,
                    lineColor:"#303334",
                    flat:true
                }
            );

            return json;
        }
    };

    zingchart.widgets.dashboard_metric = {
        percent : function(percent) {
            var ps = (String(Math.abs(percent))).split('.');
            var p1 = ps[0] || '0';
            var p2 = ps[1] || '00';
            return p1 + "<span style=\"font-size:"+sizePorcent2 + "px\">." + p2 + "%</span>";
        },
        update : function(chartid, snippetid, params) {
            var value = parseFloat(Number(1000*Math.random()).toFixed(2));
            var percent = parseFloat(Number(-10 + 20*Math.random()).toFixed(2));
            zingchart.exec(chartid, 'updateobject', {
                data:[
                    {
                        objtype:"label",
                        id:snippetid+"_value_sh",
                        text:value
                    },{
                        objtype:"label",
                        id:snippetid+"_value",
                        text:value
                    },{
                        objtype:"label",
                        id:snippetid+"_percent",
                        color:(percent>0)?"#77AB13":"#AE432E",
                        text:zingchart.widgets.dashboard_metric.percent(percent)
                    },{
                        objtype:"shape",
                        id:snippetid+"_trend",
                        angle:(percent>0)?0:180,
                        backgroundColor:(percent>0)?"#77AB13":"#AE432E"
                    }
                ]
            });
        },
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 150;
            var h = data.height || 150;
            var id = data.id || "dash";
            var title = data.title || "";
            var value = data.value || "";
            var percent = data.percent || 0;

            var json = zingchart.widgets.dashboard_container.parse(data);

            window.setInterval(function() {
                zingchart.widgets.dashboard_metric.update(data.loader.id, id, {

                });
            }, 2000+(2000*Math.random(), 10));
              //2000+parseInt(2000*Math.random(), 10));

            json.labels.push(
                {
                    text:title,
                    color:"#eee",
                    fontSize:sizeTitle,
                    bold:true,
                    x:x,
                    y:y,
                    width:w,
                    textAlign:"left",
                    padding:"8 8 8 28",
                    flat:true
                },
                {
                    text:value,
                    id:id+"_value_sh",
                    color:"#000",
                    fontSize:sizeText,
                    x:x+12,
                    y:y+42,
                    flat:true
                },
                {
                    text:value,
                    id:id+"_value",
                    color:"#eee",
                    fontSize:sizeText,
                    x:x+10,
                    y:y+40,
                    flat:true
                },
                {
                    text:zingchart.widgets.dashboard_metric.percent(percent),
                    id:id+"_percent",
                    color:(percent>0)?"#77AB13":"#AE432E",
                    fontSize:sizeSec,
                    x:x+50,
                    y:y+105,
                    flat:true
                }
            );

            json.shapes.push(
                {
                    type:"line",
                    points:[[x,y+33],
                    [x+w,y+33]],
                    lineWidth:1,
                    lineColor:"#121314",
                    flat:true
                },
                {
                    type:"line",
                    points:[[x,y+34],
                    [x+w,y+34]],
                    lineWidth:1,
                    lineColor:"#303334",
                    flat:true
                },
                {
                    type:"circle",
                    x:x+16,
                    y:y+16,
                    size:6,
                    fillAngle:45,
                    fillOffsetX:4,
                    fillOffsetY:4,
                    backgroundColor:"#556D2C #384820",
                    flat:true
                },
                {
                    type:"triangle",
                    id:id+"_trend",
                    shadow:true,
                    shadowDistance:2,
                    shadowColor:"#000",
                    x:x+30,
                    y:y+140,
                    size:sizeFig,
                    angle:(percent>0)?0:180,
                    backgroundColor:(percent>0)?"#77AB13":"#AE432E",
                    flat:true
                }
            );
            return json;
        }
    };

    zingchart.widgets.dashboard_accounts = {
        update : function(chartid, snippetid, params) {
            zingchart.exec(chartid, 'setseriesvalues', {
                graphid : snippetid+"_graph",
                values : [
                    [10+(100*Math.random(), 10)],
                    [10+(100*Math.random(), 10)],
                    [10+(100*Math.random(), 10)]
                ],
                smart:true
            });
            /*

                [10+parseInt(100*Math.random(), 10)],
                [10+parseInt(100*Math.random(), 10)],
                [10+parseInt(100*Math.random(), 10)]
            */
        },
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 210;
            var h = data.height || 210;
            var title = data.title || "";
            var id = data.id || "dash";

            var json = zingchart.widgets.dashboard_container.parse(data);

            window.setInterval(function() {
                zingchart.widgets.dashboard_accounts.update(data.loader.id, id, {});
            }, 5000);

            json.graphs = json.graphs || [];
            json.graphs.push({
                id:id+"_graph",
                backgroundColor:"none",
                type:"pie",
                x:x,
                y:y,
                width:w,
                height:h,
                scale:{
                    sizeFactor:0.65
                },
                plotarea:{
                    margin:"10 10 40 10"
                },
                title:{
                    text:title,
                    backgroundColor:"none",
                    color:"#fff"
                },
                legend:{
                    shadow:false,
                    borderWidth:0,
                    backgroundColor:"none",
                    margin:"auto auto 10 auto",
                    layout:"float",
                    item:{
                        margin:2,
                        padding:2,
                        color:"#fff"
                    },
                    marker:{
                        type:"default",
                        width:15,
                        height:10,
                        borderRadius:3,
                        borderWidth:0
                    }
                },
                plot:{
                    _animation:{
                        speed:500,
                        method:0,
                        effect:3
                    },
                    shadow:false,
                    valueBox:{
                        visible:false
                    },
                    slice:20
                },
                series:[
                    {
                        values:[103],
                        text:"Dentro",
                        backgroundColor:"#058DC7"
                    },
                    {
                        values:[37],
                        text:"Fuera",
                        backgroundColor:"#50B432"
                    },
                    {
                        values:[192],
                        text:"Desconocido",
                        backgroundColor:"#EF561A"
                    }
                ]
            });

            return json;
        }
    };

    zingchart.widgets.dashboard_gauge = {
        update : function(chartid, snippetid, params) {
            zingchart.exec(chartid, 'setseriesvalues', {
                graphid : snippetid+"_graph",
                values : [
                    [10+(100*Math.random(), 10)],
                    [10+(100*Math.random(), 10)]
                ],
                smart:true
            });
        },
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 210;
            var h = data.height || 210;
            var id = data.id || "dash";
            var title = data.title || "";

            var json = zingchart.widgets.dashboard_container.parse(data);

            window.setInterval(function() {
                zingchart.widgets.dashboard_gauge.update(data.loader.id, id, {});
            }, 3000);

            json.graphs = json.graphs || [];
            json.graphs.push({
                id:id+"_graph",
                backgroundColor:"none",
                type:"gauge",
                x:x,
                y:y,
                width:w,
                height:h,
                scale:{
                    sizeFactor:0.75
                },
                plotarea:{
                    margin:"40 0 0 10"
                },
                title:{
                    text:title,
                    backgroundColor:"none",
                    color:"#fff"
                },
                legend:{
                    shadow:false,
                    borderWidth:0,
                    backgroundColor:"none",
                    margin:"auto auto 10 auto",
                    layout:"float",
                    item:{
                        margin:2,
                        padding:2,
                        color:"#fff"
                    },
                    marker:{
                        type:"default",
                        width:15,
                        height:10,
                        borderRadius:3,
                        borderWidth:0
                    }
                },
                plot:{
                    _animation:{
                        speed:500,
                        method:0,
                        effect:3
                    },
                    shadow:false,
                    valueBox:{
                        visible:false
                    },
                    slice:20
                },
                series:[
                    {
                        values:[103],
                        text:"Proc",
                        backgroundColor:"#058DC7"
                    },
                    {
                        values:[37],
                        text:"No Proc",
                        backgroundColor:"#50B432"
                    }
                ]
            });

            return json;
        }
    };

    zingchart.widgets.dashboard_line = {
        update : function(chartid, snippetid, params) {
            zingchart.exec(chartid, 'setseriesvalues', {
                graphid : snippetid+"_graph",
                values : [
                    [
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                    ],
                    [
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                    ]
                ],
                smart:true
            });
        },
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 210;
            var h = data.height || 210;
            var id = data.id || "dash";
            var title = data.title || "";

            var json = zingchart.widgets.dashboard_container.parse(data);

            window.setInterval(function() {
                zingchart.widgets.dashboard_line.update(data.loader.id, id, {});
            }, 3000);

            json.graphs = json.graphs || [];
            json.graphs.push({
                id:id+"_graph",
                backgroundColor:"none",
                type:"line",
                x:x,
                y:y,
                width:w,
                height:h,
                scale:{
                    sizeFactor:0.75
                },
                plotarea:{
                  // UP RIGHT BOTTOM LEFT
                    margin:"30 10 20 30"
                },
                title:{
                    text:title,
                    backgroundColor:"none",
                    color:"#fff"
                },
                legend:{
                    shadow:false,
                    borderWidth:0,
                    backgroundColor:"none",
                    margin:"auto auto 10 auto",
                    layout:"float",
                    item:{
                        margin:5,
                        padding:5,
                        color:"#fff"
                    },
                    marker:{
                        type:"default",
                        width:15,
                        height:10,
                        borderRadius:3,
                        borderWidth:0
                    }
                },
                plot:{
                    _animation:{
                        speed:500,
                        method:0,
                        effect:3
                    },
                    shadow:false,
                    valueBox:{
                        visible:false
                    },
                    slice:20
                },
                series:[
                    {
                        values: [42, 35, 19, 50],
                        text:"Año pasado",
                        backgroundColor:"#058DC7"
                    },
                    {
                        values: [36, 21, 45, 47],
                        text:"Actual",
                        backgroundColor:"#50B432"
                    }
                ]
            });

            return json;
        }
    };

    zingchart.widgets.dashboard_bar = {
        update : function(chartid, snippetid, params) {
            zingchart.exec(chartid, 'setseriesvalues', {
                graphid : snippetid+"_graph",
                values : [
                    [
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                      10+(100*Math.random(),10),
                    ],
                      [
                        10+(100*Math.random(),10),
                        10+(100*Math.random(),10),
                        10+(100*Math.random(),10),
                        10+(100*Math.random(),10),
                      ]
                ],
                smart:true
            });
        },
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 210;
            var h = data.height || 210;
            var id = data.id || "dash";
            var title = data.title || "";

            var json = zingchart.widgets.dashboard_container.parse(data);

            window.setInterval(function() {
                zingchart.widgets.dashboard_bar.update(data.loader.id, id, {});
            }, 3000);

            json.graphs = json.graphs || [];
            json.graphs.push({
                id:id+"_graph",
                backgroundColor:"none",
                type:"bar",
                x:x,
                y:y,
                width:w,
                height:h,
                scale:{
                    sizeFactor:0.75
                },
                plotarea:{
                  // UP RIGHT BOTTOM LEFT
                    margin:"30 10 20 30"
                },
                title:{
                    text:title,
                    backgroundColor:"none",
                    color:"#fff"
                },
                legend:{
                    shadow:false,
                    borderWidth:0,
                    backgroundColor:"none",
                    margin:"auto auto 10 auto",
                    layout:"float",
                    item:{
                        margin:5,
                        padding:5,
                        color:"#fff"
                    },
                    marker:{
                        type:"default",
                        width:15,
                        height:10,
                        borderRadius:3,
                        borderWidth:0
                    }
                },
                plot:{
                    _animation:{
                        speed:500,
                        method:0,
                        effect:3
                    },
                    shadow:false,
                    valueBox:{
                        visible:false
                    },
                    slice:20
                },
                series:[
                    {
                        values: [42, 35, 19, 50],
                        text:"Año pasado",
                        backgroundColor:"#058DC7"
                    },
                    {
                        values: [36, 21, 45, 47],
                        text:"Actual",
                        backgroundColor:"#50B432"
                    }
                ]
            });

            return json;
        }
    };

    zingchart.widgets.dashboard_section = {
        parse : function(data) {
            var x = data.x || 0;
            var y = data.y || 0;
            var w = data.width || 170;
            var h = data.height || 170;
            var id = data.id || "dash";
            var title = data.title || "";
            var value = data.value || "";
            var percent = data.percent || 0;

            var json = zingchart.widgets.dashboard_container.parse(data);

            json.labels.push(
                {
                    text:title,
                    id:id+"_value_sh",
                    color:"#000",
                    fontSize:sizeText,
                    x:x+12,
                    y:y+2,
                    flat:true
                },
                {
                    text:title,
                    id:id+"_value",
                    color:"#eee",
                    fontSize:sizeText,
                    x:x+10,
                    y:y,
                    flat:true
                }
            );

            return json;
        }
    };

    zingchart.render({
  	id : 'myChart',
  	data : myConfig,
  	height: 750,
  	width: "100%"
  });
  }
}
