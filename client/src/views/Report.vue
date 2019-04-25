<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 lg12>
        <material-card color="orange" title="รายงานแจ้งซ่อมแยกตามพื้นที่">
          <div slot="menu" class="title"></div>

          <v-container px-0 py-0>
            <v-layout wrap>
              <v-flex md4 lg4>
                <v-combobox v-model="yearSelect" :items="years" label="เลือกปี"></v-combobox>
              </v-flex>
              <v-flex md4 lg4>
                <v-combobox
                  v-model="monthSelect"
                  :items="listMonth"
                  item-text="monthName"
                  item-value="monthID"
                  label="เลือกเดือน"
                ></v-combobox>
              </v-flex>
              <v-flex md4 lg4>
                <v-btn dark @click="OK()">OK</v-btn>
              </v-flex>
              <v-flex
                md12
                lg12
              >รายงานแจ้งซ่อมแยกตามพื้นที่ ประจำปี : {{yearSelect}} <span v-if="monthShow != null">เดือน : </span>{{ monthShow }}</v-flex>

              <v-flex md12 lg12>
                <ejs-grid
                  ref="grid"
                  id="Grid"
                  :dataSource="report"
                  :allowGrouping="false"
                  :toolbar="toolbarOptions"
                  :allowExcelExport="true"
                  :toolbarClick="toolbarClick"
                  :allowPaging="false"
                  :allowSorting="true"
                  :allowMultiSorting="true"
                >
                </ejs-grid>
              </v-flex>
            </v-layout>
          </v-container>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//Grid จำเป็น
import {
  GridPlugin,
  Page,
  Sort,
  Group,
  Toolbar,
  ExcelExport
} from "@syncfusion/ej2-vue-grids";

import { startOfDay, endOfDay, endOfMonth, lastDayOfYear, format } from "date-fns";

var today = new Date();
var yyyy = today.getFullYear();
export default {

  data() {
    return {
        //Grid
        //pageSettings: { pageSize: 20 },
        toolbarOptions: ["ExcelExport"],
        report: null,

        years: [2019, 2018],
        yearSelect: [yyyy],
        
        listMonth:[
            {
            monthID:'01',
            monthName:"มกราคม"
            },
            {
            monthID:'02',
            monthName:"กุมภาพันธ์ "
            },
            {
            monthID:'03',
            monthName:"มีนาคม"
            },
            {
            monthID:'04',
            monthName:"เมษายน"
            },
            {
            monthID:'05',
            monthName:"พฤษภาคม"
            },
            {
            monthID:'06',
            monthName:"มิถุนายน"
            },
            {
            monthID:'07',
            monthName:"กรกฎาคม"
            },
            {
            monthID:'08',
            monthName:"สิงหาคม"
            },
            {
            monthID:'09',
            monthName:"กันยายน"
            },
            {
            monthID:'10',
            monthName:"ตุลาคม"
            },
            {
            monthID:'11',
            monthName:"พฤศจิกายน"
            },
            {
            monthID:'12',
            monthName:"ธันวาคม"
            },
        ],
        monthSelect: null,
        monthShow:null,
    };
  },
  computed: {

  },
  provide: {
    grid: [Page, Sort, Group, Toolbar, ExcelExport]
  },
  methods: {
    //ExportExcel
    toolbarClick(args) {
      if (args.item.id === "Grid_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.excelExport();
      }
    },

    async getData() {
        const { Report } = this.$FeathersVuex;
        const q = {};

        if(this.yearSelect != null && this.monthSelect == null){
            var day = this.yearSelect + "-01-01";
            var sDate = startOfDay(new Date(day));
            var eDate = lastDayOfYear(new Date(day));

            var x = format(sDate, "YYYY-MM-DDT00:00:00");
            var y = format(eDate, "YYYY-MM-DDT23:59:59");;
            
            // alert("S : " + x + " E : " + y);

            q.start = x;
            q.end = y;
        }else if(this.yearSelect != null && this.monthSelect != null){
            var day = this.yearSelect + "-" + this.monthSelect.monthID +"-01";
            var sDate = startOfDay(new Date(day));
            var eDate = endOfMonth(new Date(day));

            var x = format(sDate, "YYYY-MM-DDT00:00:00");
            var y = format(eDate, "YYYY-MM-DDT23:59:59");

            // alert("S : " + x + " E : " + y);

            q.start = x;
            q.end = y;
        }

        // q.start = "2019-04-01T00:00:00";
        // q.end = "2019-04-01T23:59:59";

        try {
            var res = await Report.find({ query: q });
            this.report = res;
        } catch (err) {
            alert("ไม่สามารถต่อ server ได้");
        }
    },

    OK(){
        if(this.monthSelect != null){
            this.monthShow = this.monthSelect.monthName;
        }
        this.getData();
    }
  },
  mounted: function() {
    this.getData();

    
    this.yearSelect = yyyy;

    // var mm = today.getMonth() + 1;
    // this.monthShow = this.listMonth[mm - 1].monthName;
  }
};
</script>
