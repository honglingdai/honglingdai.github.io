//table2excel.js
;(function ( $, window, document, undefined ) {
    var pluginName = "table2excel",

        defaults = {
            exclude: ".noExl",
            name: "Table2Excel"
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        //
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var e = this;

            e.template = {
                head: "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>",
                sheet: {
                    head: "<x:ExcelWorksheet><x:Name>",
                    tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
                },
                mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>",
                table: {
                    head: "<table>",
                    tail: "</table>"
                },
                foot: "</body></html>"
            };

            e.tableRows = [];
            var tempRows = "";
            $(e.element).find("tr").not(e.settings.exclude).each(function (i,o) {
                var trChildren = $(o).html();
                var filterTr = $(trChildren).not(e.settings.exclude);
                var cacheTr = $("<tr></tr>").html(filterTr).html().replace(/\<th(\s.+)?\s?\>(.+)?\<\/\s?th\>/ig,"<td$1>$2</td>");
                tempRows += "<tr>" + cacheTr + "</tr>";
            });
            e.tableRows.push(tempRows);

            e.tableToExcel(e.tableRows, e.settings.name);
        },

        tableToExcel: function (table, name) {

            var e = this, fullTemplate="", i, link, a;

            e.uri = "data:application/vnd.ms-excel;base64,";
            e.base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)));
            };
            e.format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                });
            };
            e.ctx = {
                worksheet: name || "Worksheet",
                table: table
            };

            fullTemplate= e.template.head;

            if ( $.isArray(table) ) {
                for (i in table) {
                    fullTemplate += e.template.sheet.head + name + i + "" + e.template.sheet.tail;
                }
            }

            fullTemplate += e.template.mid;



            if ( $.isArray(table) ) {
                for (i in table) {
                    fullTemplate += e.template.table.head + "{table" + i + "}" + e.template.table.tail;
                }
            }

            fullTemplate += e.template.foot;

            for (i in table) {
                e.ctx["table" + i] = table[i];
            }
            delete e.ctx.table;

            fullTemplate = e.format(fullTemplate, e.ctx);

            var UA = window.navigator.userAgent;
            link = e.uri + e.base64(fullTemplate);

            // If Internet Explorer
            if (UA.toLowerCase().indexOf("msie") > 0 || !!UA.match(/Trident.*rv\:11\./)){
                if (typeof Blob !== "undefined" && window.navigator.msSaveBlob) {
                    //use blobs if we can
                    //convert to array
                    var blob1 = new Blob([fullTemplate], { type: "text/html" });
                    window.navigator.msSaveBlob(blob1, getFileName(e.settings) );
                }

            } else if(UA.toLowerCase().indexOf("firefox")>0){
                window.open(link);
            } else{
                a = document.createElement("a");
                a.download = getFileName(e.settings);
                a.href = link;
                a.click();
            }

            return true;

        }
    };

    function getFileName(settings) {
        return ( settings.filename ? settings.filename : "table2excel") + ".xlsx";
    }

    $.fn[ pluginName ] = function ( options ) {
        var e = this;

        $.data( e, "plugin_" + pluginName, new Plugin( this, options ) );

        // chain jQuery functions
        return e;
    };

})( jQuery, window, document );