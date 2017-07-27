/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();
    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter)
        regexp = new RegExp(seriesFilter, 'i');

    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.9732893682475, "KoPercent": 0.02671063175249376};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
			"color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6921146176236752, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9927498022673346, 500, 1500, "182 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [0.9982456140350877, 500, 1500, "58 /portal-servicios/ver-orden-servicio.html"], "isController": false}, {"data": [0.9992175273865415, 500, 1500, "301 /common-resources/js/api.js"], "isController": false}, {"data": [0.9992025518341308, 500, 1500, "OrdenesServicio"], "isController": true}, {"data": [0.9908692476260044, 500, 1500, "256 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2"], "isController": false}, {"data": [0.9896949711459192, 500, 1500, "54 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2"], "isController": false}, {"data": [0.9881294964028777, 500, 1500, "254 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1"], "isController": false}, {"data": [0.9982155603140613, 500, 1500, "244 /common-resources/js/api.js"], "isController": false}, {"data": [1.0, 500, 1500, "241 /common-resources/plugins/datatables/jquery.dataTables.js"], "isController": false}, {"data": [0.9848888888888889, 500, 1500, "66 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.17567567567567569, 500, 1500, "257 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2"], "isController": false}, {"data": [0.9943138741470812, 500, 1500, "295 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.0, 500, 1500, "GuardarOrden"], "isController": true}, {"data": [0.999534450651769, 500, 1500, "73 /common-resources/js/api.js"], "isController": false}, {"data": [1.0, 500, 1500, "70 /portal-servicios/listar-orden-servicio.html"], "isController": false}, {"data": [0.9928622412562456, 500, 1500, "Tickets"], "isController": true}, {"data": [0.12089201877934272, 500, 1500, "303 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [0.983001585344372, 500, 1500, "227 /Gmg.Identity.Provider.FrontEnd.Web/Login"], "isController": false}, {"data": [0.986822840409956, 500, 1500, "260 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.9870654810024252, 500, 1500, "52 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1"], "isController": false}, {"data": [1.0, 500, 1500, "237 /common-resources/plugins/datatables/dataTables.bootstrap.css"], "isController": false}, {"data": [0.15943432777993025, 500, 1500, "SeleccionarCliente"], "isController": true}, {"data": [0.9981315396113603, 500, 1500, "264 /common-resources/js/api.js"], "isController": false}, {"data": [0.9863067292644757, 500, 1500, "302 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [0.15676567656765678, 500, 1500, "55 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2"], "isController": false}, {"data": [0.9980503367600142, 500, 1500, "234 /portal-servicios/inicio.html"], "isController": false}, {"data": [0.7877525700106345, 500, 1500, "Login"], "isController": true}, {"data": [1.0, 500, 1500, "262 /portal-servicios/ver-ticket.html"], "isController": false}, {"data": [1.0, 500, 1500, "263 /portal-servicios/js/ver-ticket.js"], "isController": false}, {"data": [0.9982440737489026, 500, 1500, "61 /common-resources/js/api.js"], "isController": false}, {"data": [0.10719874804381847, 500, 1500, "ListarTickets"], "isController": true}, {"data": [0.09347202295552368, 500, 1500, "ListarSolicitudes.Siguiente"], "isController": true}, {"data": [0.0, 500, 1500, "261 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.12285789612443976, 500, 1500, "183 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [1.0, 500, 1500, "59 /portal-servicios/js/ver-orden-servicio.js"], "isController": false}, {"data": [0.879386742289968, 500, 1500, "233 /Gmg.Identity.Provider.FrontEnd.Web/Login/ExecuteLogin?SiteId=873FBBEDDADB4DC0848C1DC7E053F7D6"], "isController": false}, {"data": [0.0, 500, 1500, "BuscarCliente"], "isController": true}, {"data": [0.9808568824065633, 500, 1500, "68 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.08451369216241737, 500, 1500, "77 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [0.9874301675977654, 500, 1500, "74 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [0.0, 500, 1500, "69 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [1.0, 500, 1500, "298 /portal-servicios/js/natural.js"], "isController": false}, {"data": [0.9849420849420849, 500, 1500, "168 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.13268892794376097, 500, 1500, "65 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin"], "isController": false}, {"data": [0.0, 500, 1500, "upload(pdf) /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.983001585344372, 500, 1500, "URL"], "isController": true}, {"data": [1.0, 500, 1500, "243 /common-resources/plugins/datatables/extensions/Responsive/js/dataTables.responsive.min.js"], "isController": false}, {"data": [1.0, 500, 1500, "239 /common-resources/plugins/datatables/extensions/Responsive/css/dataTables.responsive.css"], "isController": false}, {"data": [0.09683426443202979, 500, 1500, "75 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [0.0, 500, 1500, "57 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.9854007633587786, 500, 1500, "330 /Gmg.Identity.Provider.FrontEnd.Web/Logout"], "isController": false}, {"data": [0.5393780290791599, 500, 1500, "AceptarMensaje"], "isController": true}, {"data": [0.9992025518341308, 500, 1500, "51 /common-resources/js/api.js"], "isController": false}, {"data": [0.9894644424934153, 500, 1500, "62 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin"], "isController": false}, {"data": [1.0, 500, 1500, "242 /common-resources/plugins/datatables/dataTables.bootstrap.min.js"], "isController": false}, {"data": [1.0, 500, 1500, "235 /portal-servicios/crear-ticket.html"], "isController": false}, {"data": [1.0, 500, 1500, "238 /common-resources/js/bower_components/jquery-xml2json/src/xml2json.js"], "isController": false}, {"data": [0.9929178470254958, 500, 1500, "76 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo"], "isController": false}, {"data": [0.0, 500, 1500, "GuardarTicket"], "isController": true}, {"data": [1.0, 500, 1500, "71 /portal-servicios/js/listar-ordenes.js"], "isController": false}, {"data": [0.9920965058236273, 500, 1500, "56 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [0.9929701230228472, 500, 1500, "63 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin"], "isController": false}, {"data": [1.0, 500, 1500, "299 /portal-servicios/js/date-dd-MMM-YYYY.js"], "isController": false}, {"data": [1.0, 500, 1500, "300 /portal-servicios/js/listar-tickets.js"], "isController": false}, {"data": [1.0, 500, 1500, "240 /common-resources/plugins/spinnerjs/jquery.babypaunch.spinner.min.js"], "isController": false}, {"data": [0.0, 500, 1500, "169 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1"], "isController": false}, {"data": [1.0, 500, 1500, "297 /portal-servicios/listar-tickets.html"], "isController": false}, {"data": [0.0, 500, 1500, "53 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1"], "isController": false}, {"data": [0.9856433888691953, 500, 1500, "49 /gmg.identity.provider.frontend.web/"], "isController": false}, {"data": [0.9854007633587786, 500, 1500, "LogOut"], "isController": true}, {"data": [0.0, 500, 1500, "ComentarSeguimiento"], "isController": true}, {"data": [0.0, 500, 1500, "SubirArchivo"], "isController": true}, {"data": [1.0, 500, 1500, "236 /portal-servicios/js/crear-tickets.js"], "isController": false}, {"data": [0.08147113594040968, 500, 1500, "ListarSolicitudes"], "isController": true}, {"data": [0.0, 500, 1500, "255 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1"], "isController": false}, {"data": [0.13181019332161686, 500, 1500, "64 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 108571, 29, 0.02671063175249376, 3584.3515763878104, 7460.9000000000015, 20131.050000000014, 46353.890000000014, 40.20872643911436, 197.19105256329658, 206.68756622810105, 1, 124237], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average response time", "90th pct", "95th pct", "99th pct", "Throughput", "Received KB/sec", "Sent KB/sec", "Min", "Max"], "items": [{"data": ["182 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 3793, 0, 0.0, 128.64487213287705, 252.5999999999999, 323.0, 539.2999999999997, 1.541813510887813, 0.5691460030425716, 1.1066727836938892, 39, 2612], "isController": false}, {"data": ["58 /portal-servicios/ver-orden-servicio.html", 1140, 0, 0.0, 16.029824561403494, 18.0, 59.0, 287.8499999999988, 0.4749982187566797, 3.0670376522546374, 0.29084363589886536, 4, 732], "isController": false}, {"data": ["301 /common-resources/js/api.js", 1278, 0, 0.0, 5.98356807511737, 6.0, 7.0, 10.210000000000036, 0.5071420521554728, 2.5010423470557983, 0.31597327077655435, 2, 998], "isController": false}, {"data": ["OrdenesServicio", 1254, 0, 0.0, 13.490430622009578, 16.0, 58.5, 117.65000000000077, 0.509754232606466, 2.513924682287748, 0.3205876228501603, 3, 587], "isController": true}, {"data": ["256 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2", 1369, 0, 0.0, 129.82249817384923, 214.0, 297.0, 732.1999999999975, 0.5306039078648367, 0.19586745817666823, 0.3798170551415286, 76, 2215], "isController": false}, {"data": ["54 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2", 1213, 0, 0.0, 135.7411376751856, 220.0, 315.4999999999998, 748.6999999999905, 0.5183249004051309, 0.19133477768861276, 0.3750769054689473, 76, 4461], "isController": false}, {"data": ["254 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1", 1390, 0, 0.0, 136.66690647481994, 224.0, 315.9000000000001, 1002.3099999999952, 0.5387375557438338, 0.22339652663495219, 0.36362589729840555, 76, 2109], "isController": false}, {"data": ["244 /common-resources/js/api.js", 1401, 0, 0.0, 7.134189864382585, 6.0, 8.0, 14.940000000000055, 0.5430215720261332, 2.678403228909562, 0.3372673045006062, 2, 941], "isController": false}, {"data": ["241 /common-resources/plugins/datatables/jquery.dataTables.js", 1401, 0, 0.0, 13.855103497501789, 19.0, 23.0, 40.0, 0.543015257914806, 59.26170134170504, 0.3086278126039229, 4, 238], "isController": false}, {"data": ["66 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1125, 0, 0.0, 149.7022222222223, 252.0, 351.4000000000001, 1203.1200000000013, 0.4687222672658534, 0.1730244306899342, 0.3423869686668539, 76, 2095], "isController": false}, {"data": ["257 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2", 1369, 0, 0.0, 4106.009495982471, 9526.0, 12341.0, 17499.499999999978, 0.5304649220867537, 0.723041955018977, 0.683056608555442, 660, 31434], "isController": false}, {"data": ["295 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1319, 0, 0.0, 130.27293404094019, 221.0, 306.0, 507.79999999999995, 0.5233933827045272, 0.19320576041241336, 0.3782334992200685, 76, 2183], "isController": false}, {"data": ["GuardarOrden", 1202, 22, 1.8302828618968385, 55181.71547420965, 96399.3, 106978.0, 121723.97, 0.4988199712244785, 0.9484066940021671, 1.7673603070647765, 7713, 124324], "isController": true}, {"data": ["73 /common-resources/js/api.js", 1074, 0, 0.0, 6.821229050279333, 6.0, 9.0, 27.0, 0.45897318212004584, 2.263490790728742, 0.2890993188158492, 2, 805], "isController": false}, {"data": ["70 /portal-servicios/listar-orden-servicio.html", 1074, 0, 0.0, 10.560521415270006, 14.5, 56.25, 111.5, 0.4589720052717678, 1.0823019751073926, 0.3101646754375618, 2, 184], "isController": false}, {"data": ["Tickets", 1401, 0, 0.0, 65.5945753033548, 79.79999999999995, 101.89999999999986, 275.8000000000002, 0.5430062079446344, 72.1251471096014, 3.2108423721726176, 25, 2433], "isController": true}, {"data": ["303 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 1278, 0, 0.0, 3680.0555555555575, 7686.500000000006, 9304.099999999999, 13809.53000000001, 0.5069555652257044, 1.4673987259072143, 0.6792412455953772, 806, 30198], "isController": false}, {"data": ["227 /Gmg.Identity.Provider.FrontEnd.Web/Login", 5677, 0, 0.0, 136.10339968293093, 113.0, 154.0, 2001.0200000000614, 2.102448535933649, 6.560248562829955, 1.2733426569614674, 31, 7644], "isController": false}, {"data": ["260 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1366, 0, 0.0, 140.41142020497804, 232.5999999999999, 331.2999999999997, 870.6499999999996, 0.5294401267555631, 0.19543785929062776, 0.35675164791146335, 76, 2747], "isController": false}, {"data": ["52 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1", 1237, 0, 0.0, 139.1721907841553, 236.0, 337.0999999999999, 648.4799999999996, 0.5028269279469743, 0.18561384644917608, 0.35698747716547885, 76, 1792], "isController": false}, {"data": ["237 /common-resources/plugins/datatables/dataTables.bootstrap.css", 1401, 0, 0.0, 4.772305496074231, 5.0, 6.0, 16.90000000000009, 0.5430224139187382, 1.1982846156682316, 0.3187074909816031, 1, 205], "isController": false}, {"data": ["SeleccionarCliente", 2581, 0, 0.0, 4491.4753971328855, 10428.400000000001, 12955.400000000001, 17972.31999999999, 1.0000643202933626, 1.7323267037903252, 2.0109430347903046, 738, 31516], "isController": true}, {"data": ["264 /common-resources/js/api.js", 1338, 0, 0.0, 6.505231689088207, 6.0, 7.0, 10.0, 0.5309515381721617, 2.6184621755560706, 0.33702978497256353, 2, 806], "isController": false}, {"data": ["302 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 1278, 0, 0.0, 144.18466353677576, 248.10000000000014, 341.04999999999995, 870.0, 0.5071253492438952, 0.18720056837323473, 0.36400110517017864, 76, 2288], "isController": false}, {"data": ["55 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryregisteredproductversion2", 1212, 0, 0.0, 4645.61551155116, 11146.8, 13932.849999999997, 18141.269999999975, 0.5177438329960025, 0.7057470259632299, 0.670720655789632, 660, 26120], "isController": false}, {"data": ["234 /portal-servicios/inicio.html", 5642, 0, 0.0, 12.807692307692301, 12.0, 22.0, 120.27999999999884, 2.1370022199521466, 3.766910058062108, 1.0458387236581903, 3, 949], "isController": false}, {"data": ["Login", 5642, 0, 0.0, 647.9877702942176, 762.6999999999998, 943.8499999999995, 4959.48999999978, 2.1366259033890627, 10.023806374597063, 4.256853057406768, 362, 14122], "isController": true}, {"data": ["262 /portal-servicios/ver-ticket.html", 1338, 0, 0.0, 11.928251121076224, 16.0, 60.0, 104.0499999999995, 0.5309372113177718, 2.291632968472726, 0.31679944933120957, 3, 384], "isController": false}, {"data": ["263 /portal-servicios/js/ver-ticket.js", 1338, 0, 0.0, 4.739910313901336, 6.0, 8.0, 12.6099999999999, 0.5309513274775248, 3.265717726750542, 0.2971046002388884, 2, 207], "isController": false}, {"data": ["61 /common-resources/js/api.js", 1139, 0, 0.0, 7.552238805970147, 6.0, 7.0, 60.59999999999991, 0.4745825423624294, 2.3404705458303403, 0.304956360228983, 2, 792], "isController": false}, {"data": ["ListarTickets", 1278, 0, 0.0, 3852.788732394365, 7875.200000000003, 9591.25, 14127.310000000001, 0.5069189679320205, 8.712765050346812, 2.5237040024584383, 905, 30526], "isController": true}, {"data": ["ListarSolicitudes.Siguiente", 6970, 0, 0.0, 3926.044476327122, 7867.0, 9816.949999999997, 14201.589999999997, 2.832019782694287, 11.414118047787591, 6.057815733383419, 877, 26967], "isController": true}, {"data": ["261 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1366, 7, 0.5124450951683748, 49936.0878477306, 88701.9, 101192.24999999994, 116414.70999999985, 0.5275624336926242, 0.7817385703415292, 1.3653364844664533, 7341, 122619], "isController": false}, {"data": ["183 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 3793, 0, 0.0, 3780.0350645926715, 7916.6, 9769.199999999999, 14728.239999999998, 1.5412208517063546, 5.3966498699633, 2.1808877091040113, 837, 26827], "isController": false}, {"data": ["59 /portal-servicios/js/ver-orden-servicio.js", 1139, 0, 0.0, 6.047410008779626, 8.0, 10.0, 38.19999999999982, 0.4745811581696917, 4.231058488507969, 0.27297685758002777, 2, 209], "isController": false}, {"data": ["233 /Gmg.Identity.Provider.FrontEnd.Web/Login/ExecuteLogin?SiteId=873FBBEDDADB4DC0848C1DC7E053F7D6", 5642, 0, 0.0, 567.0030131159178, 712.0, 807.0, 3031.5599999999686, 2.136735952154081, 1.0328948206213575, 1.779917741393976, 335, 7965], "isController": false}, {"data": ["BuscarCliente", 2626, 0, 0.0, 27032.70068545313, 45201.3, 50195.00000000001, 59318.340000000004, 1.0148188281740913, 56.370185555260676, 1.733119978076667, 6543, 75572], "isController": true}, {"data": ["68 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1097, 0, 0.0, 154.18413855970815, 263.20000000000005, 379.0, 1143.3399999999988, 0.4687839863048412, 0.1730472136945605, 0.34243205249611447, 76, 2383], "isController": false}, {"data": ["77 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 3177, 0, 0.0, 3811.0950582310356, 7522.200000000001, 9550.899999999998, 13231.959999999995, 1.3570677085802816, 5.2272924558333616, 1.9295806481375877, 877, 21219], "isController": false}, {"data": ["74 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 1074, 0, 0.0, 151.9953445065178, 273.5, 339.0, 961.25, 0.45893336877176355, 0.16941095058176428, 0.3325474215123521, 75, 2573], "isController": false}, {"data": ["69 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1097, 0, 0.0, 25087.1403828624, 41380.4, 47216.799999999996, 56232.28, 0.46775596527434293, 0.7061748111334022, 0.5504354864800618, 4793, 75551], "isController": false}, {"data": ["298 /portal-servicios/js/natural.js", 1278, 0, 0.0, 4.392018779342717, 5.0, 8.0, 19.470000000000255, 0.5071422534020793, 0.7658682288771085, 0.2763529076155862, 1, 209], "isController": false}, {"data": ["168 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1295, 0, 0.0, 147.17142857142858, 270.4000000000001, 385.0, 793.9599999999973, 0.513871148099252, 0.18969071677882549, 0.37135219686860016, 76, 2249], "isController": false}, {"data": ["65 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin", 1138, 0, 0.0, 3731.1256590509633, 7601.700000000006, 9575.55, 13289.859999999968, 0.47398872340009024, 1.0965125859260754, 0.5656388867137796, 864, 19235], "isController": false}, {"data": ["upload(pdf) /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 2443, 0, 0.0, 24885.43921408105, 40448.79999999999, 46729.199999999975, 57549.07999999999, 0.9671957144084449, 1.4597861033365283, 186.74716862721257, 4864, 78333], "isController": false}, {"data": ["URL", 5677, 0, 0.0, 136.10357583230567, 113.0, 154.0, 2001.0200000000614, 2.102448535933649, 6.560248562829955, 1.2733426569614674, 31, 7644], "isController": true}, {"data": ["243 /common-resources/plugins/datatables/extensions/Responsive/js/dataTables.responsive.min.js", 1401, 0, 0.0, 4.408993576017131, 5.0, 7.0, 27.0, 0.5430224139187382, 1.6671512276482905, 0.3261316255468984, 1, 205], "isController": false}, {"data": ["239 /common-resources/plugins/datatables/extensions/Responsive/css/dataTables.responsive.css", 1401, 0, 0.0, 5.209136331192008, 5.0, 7.0, 75.44000000000051, 0.5430224139187382, 0.49491997214442307, 0.3330254647861011, 1, 234], "isController": false}, {"data": ["75 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 1074, 0, 0.0, 3964.419925512104, 8178.0, 10740.25, 15308.25, 0.45877516428764265, 1.905548668558865, 0.6178231948756437, 894, 20041], "isController": false}, {"data": ["57 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1202, 22, 1.8302828618968385, 55045.89351081526, 96314.3, 106848.4, 121627.23, 0.49883611822499, 0.7642967178492445, 1.4098533465387952, 7626, 124237], "isController": false}, {"data": ["330 /Gmg.Identity.Provider.FrontEnd.Web/Logout", 5240, 0, 0.0, 125.95992366412189, 111.90000000000055, 151.94999999999982, 1529.7400000000125, 2.0309479255649836, 5.595023533221502, 1.2455422824753999, 31, 7686], "isController": false}, {"data": ["AceptarMensaje", 2476, 0, 0.0, 3800.41962843295, 12152.100000000002, 16301.350000000002, 23523.080000000005, 0.9818519965183116, 19.295943887515293, 3.6574651397433944, 8, 31443], "isController": true}, {"data": ["51 /common-resources/js/api.js", 1254, 0, 0.0, 13.490430622009578, 16.0, 58.5, 117.65000000000077, 0.509754232606466, 2.513924682287748, 0.3205876228501603, 3, 587], "isController": false}, {"data": ["62 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin", 1139, 0, 0.0, 143.8525021949077, 246.0, 330.0, 898.199999999988, 0.47456790987626235, 0.17518229485666717, 0.34573013746844894, 76, 2551], "isController": false}, {"data": ["242 /common-resources/plugins/datatables/dataTables.bootstrap.min.js", 1401, 0, 0.0, 4.57673090649536, 5.0, 7.0, 12.960000000000036, 0.5430224139187382, 0.8951385104441699, 0.31234394706849294, 1, 209], "isController": false}, {"data": ["235 /portal-servicios/crear-ticket.html", 1401, 0, 0.0, 11.008565310492491, 15.799999999999955, 57.0, 100.98000000000002, 0.5430207301361389, 1.9610922745950405, 0.3473423615616904, 3, 234], "isController": false}, {"data": ["238 /common-resources/js/bower_components/jquery-xml2json/src/xml2json.js", 1401, 0, 0.0, 4.6124197002141285, 5.0, 7.0, 29.960000000000036, 0.5430224139187382, 0.7961829801184417, 0.3149954236989555, 1, 208], "isController": false}, {"data": ["76 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestextensionfo", 3177, 0, 0.0, 135.68051621026106, 262.2000000000003, 327.0, 561.9599999999964, 1.3576412510982494, 0.5011605399561896, 0.9837595784325204, 39, 4459], "isController": false}, {"data": ["GuardarTicket", 1366, 7, 0.5124450951683748, 50076.49999999996, 88920.39999999998, 101299.44999999994, 116544.29999999984, 0.5275457267444443, 0.9764523733813015, 1.7207683946331682, 7425, 122731], "isController": true}, {"data": ["71 /portal-servicios/js/listar-ordenes.js", 1074, 0, 0.0, 5.744878957169459, 6.0, 9.0, 52.0, 0.4589735744041463, 2.518629675686452, 0.2563797700773161, 1, 211], "isController": false}, {"data": ["56 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1202, 0, 0.0, 135.81114808652254, 232.0, 316.0, 758.6000000000022, 0.5008147614525961, 0.18487107405183725, 0.35898245596309136, 76, 1932], "isController": false}, {"data": ["63 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin", 1138, 0, 0.0, 87.84358523725847, 219.10000000000014, 296.1999999999998, 590.1499999999985, 0.474158566457823, 0.1750311895713448, 0.34543192439212494, 38, 1784], "isController": false}, {"data": ["299 /portal-servicios/js/date-dd-MMM-YYYY.js", 1278, 0, 0.0, 4.348982785602493, 5.0, 7.0, 10.420000000000073, 0.5071422534020793, 0.7641801728509846, 0.28081021257712785, 1, 205], "isController": false}, {"data": ["300 /portal-servicios/js/listar-tickets.js", 1278, 0, 0.0, 4.307511737089202, 5.0, 7.0, 10.0, 0.5071420521554728, 1.8632581411577125, 0.2798195893240646, 1, 206], "isController": false}, {"data": ["240 /common-resources/plugins/spinnerjs/jquery.babypaunch.spinner.min.js", 1401, 0, 0.0, 4.8900785153461825, 5.0, 7.0, 31.960000000000036, 0.5430224139187382, 0.6803689033767002, 0.314465128372863, 1, 209], "isController": false}, {"data": ["169 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1295, 0, 0.0, 24311.56138996139, 41430.80000000001, 46811.8, 57074.47999999995, 0.5128410244306375, 0.7745060446185552, 0.5994831115658917, 4671, 81544], "isController": false}, {"data": ["297 /portal-servicios/listar-tickets.html", 1278, 0, 0.0, 9.516431924882633, 12.0, 39.049999999999955, 77.84000000000015, 0.5071211233804266, 1.16705765313431, 0.32834111796994414, 3, 243], "isController": false}, {"data": ["53 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1", 1237, 0, 0.0, 27542.011317704142, 45727.8, 50692.69999999998, 60901.57999999998, 0.501367919748708, 27.66727608230317, 0.5116498790404296, 7082, 67570], "isController": false}, {"data": ["49 /gmg.identity.provider.frontend.web/", 5642, 0, 0.0, 68.17688762850034, 48.0, 82.84999999999945, 1518.2499999999927, 2.137117164550825, 5.225919316440688, 1.431701537970572, 2, 7538], "isController": false}, {"data": ["LogOut", 5240, 0, 0.0, 125.96030534351131, 111.90000000000055, 151.94999999999982, 1529.7400000000125, 2.0309479255649836, 5.595023533221502, 1.2455422824753999, 31, 7686], "isController": true}, {"data": ["ComentarSeguimiento", 2392, 0, 0.0, 24817.638795986622, 41512.40000000002, 47067.09999999999, 56561.380000000085, 0.947207065721202, 1.779924418707102, 1.7985258743548835, 4757, 81634], "isController": true}, {"data": ["SubirArchivo", 2443, 0, 0.0, 25024.655341792888, 40610.2, 47317.99999999989, 57705.51999999999, 0.9671601043883653, 1.8167504426301448, 187.44269371322673, 4948, 78419], "isController": true}, {"data": ["236 /portal-servicios/js/crear-tickets.js", 1401, 0, 0.0, 5.127052105638833, 5.0, 8.0, 42.940000000000055, 0.5430222034453421, 2.4932644570940754, 0.2980258577502757, 2, 210], "isController": false}, {"data": ["ListarSolicitudes", 1074, 0, 0.0, 4139.542830540042, 8523.0, 10863.25, 15463.0, 0.4587467500099309, 7.936302590627044, 1.80541933841799, 986, 20146], "isController": true}, {"data": ["255 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/querycustomerin1", 1389, 0, 0.0, 26318.904967602593, 44106.0, 49745.0, 58361.19999999998, 0.5367960348975391, 29.592110252842915, 0.5436108283093244, 6452, 75396], "isController": false}, {"data": ["64 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/queryservicerequestin", 1138, 0, 0.0, 4249.299648506153, 9204.7, 12429.099999999999, 18917.09999999984, 0.474018535874206, 0.6156079968499427, 0.7198230696136624, 694, 22642], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Percentile 1
            case 5:
            // Percentile 2
            case 6:
            // Percentile 3
            case 7:
            // Throughput
            case 8:
            // Kbytes/s
            case 9:
            // Sent Kbytes/s
            case 10:
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0);
    
    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 29, 100.0, 0.02671063175249376], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);
    
        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 108571, 29, "500/Internal Server Error", 29, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": true}, {"data": ["261 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1366, 7, "500/Internal Server Error", 7, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["57 /my322199.crm.ondemand.com:443/sap/bc/srt/scs/sap/manageservicerequestin1", 1202, 22, "500/Internal Server Error", 22, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": true}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": true}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);
    
});
