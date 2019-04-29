<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 lg12>
        <material-card color="orange" title="รายงานแจ้งซ่อมแยกตามทีมช่าง">
          <div slot="menu" class="title"></div>
          <!-- <v-container px-0 py-0> -->
          <v-layout wrap>
            <v-flex md4 lg4>
              <v-card-text>
                <v-layout align-center>
                  <v-combobox
                    v-model="TechnicianBelongIDSelect"
                    :items="TechnicianBelongs"
                    item-text="TechnicianBelongName"
                    item-value="TechnicianBelongID"
                    label="เลือกทีมช่าง"
                  ></v-combobox>
                </v-layout>
              </v-card-text>
            </v-flex>
            <v-flex md4 lg4>
              <v-card-text>
                <v-layout align-center>
                  <v-combobox v-model="yearSelect" :items="years" label="เลือกปี"></v-combobox>
                </v-layout>
              </v-card-text>
            </v-flex>

            <v-flex md4 lg4>
              <v-btn class="blue" @click="OK()">OK</v-btn>
            </v-flex>
          </v-layout>

          <v-card flat>
            <v-flex
              md12
              lg12
            >รายงานแจ้งซ่อมทีมช่าง : {{ TechnicianBelongIDSelect.TechnicianBelongName }} ประจำปี : {{yearSelect}}</v-flex>
            <v-flex v-if="report1Summary != null">
              ใบงานทั้งหมด {{report1Summary[0].ใบงาน}}
              , ใบงานที่ประเมินทั้งหมด {{report1Summary[0].ประเมิน}}
              , ผลประเมินเฉลี่ย {{report1Summary[0].ผลประเมินเฉลี่ย}}
            </v-flex>
            <v-flex md12 lg12>
              <ejs-grid
                ref="grid"
                id="Grid"
                :dataSource="report1"
                :allowGrouping="false"
                :toolbar="toolbarOptions"
                :allowExcelExport="true"
                :toolbarClick="toolbarClick"
                :allowPaging="false"
                :allowSorting="true"
                :allowMultiSorting="true"
              ></ejs-grid>
            </v-flex>
          </v-card>
          <v-layout wrap>
            <v-flex md12 lg12>
              รายชื่อทีมช่างที่รับผิดชอบ ({{ techTeamTotal }} คน)
              <ul>
                <li v-for="team in technicianteams">{{ team.FullName }}</li>
              </ul>
            </v-flex>
          </v-layout>

          <!--</v-container> -->
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

//Grid จำเป็น
import {
  GridPlugin,
  Page,
  Sort,
  Group,
  Toolbar,
  ExcelExport
} from "@syncfusion/ej2-vue-grids";

import {
  startOfDay,
  endOfDay,
  endOfMonth,
  lastDayOfYear,
  format
} from "date-fns";

var today = new Date();
var yyyy = today.getFullYear();
export default {
  data() {
    return {
      TechnicianBelongs: null,
      TechnicianBelongIDSelect: {
        TechnicianBelongID: 1,
        TechnicianBelongName: "ธพส."
      },
      years: [2019, 2018],
      yearSelect: [yyyy],

      zone: null,

      enabled: false,
      //Grid
      //pageSettings: { pageSize: 20 },
      toolbarOptions: ["ExcelExport"],
      //แยกตามทีมช่าง
      report1: null,
      report1Summary: null,
      technicianteams: null,
      techTeamTotal: 0,

      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {},
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

      if (this.TechnicianBelongIDSelect != null && this.yearSelect != null) {
        q.technicianbelong = this.TechnicianBelongIDSelect.TechnicianBelongName;
        q.year = this.yearSelect;
      }

      //ภาพรวม
      this.$store
        .dispatch("reporttechnicianbelong1/find", { query: q })
        .then(res => {
          //alert(JSON.stringify(res[0]));
          this.report1 = res[0].data;
          this.report1Summary = res[0].summary;
          this.technicianteams = res[0].technicianteam;
          this.techTeamTotal = this.technicianteams.length;
        })
        .catch(error => {
          console.log(error);
        });
    },

    OK() {
      this.getData();
    }
  },
  mounted: function() {
    const { TechnicianBelong } = this.$FeathersVuex;
    //RMGroup
    TechnicianBelong.find().then(res => {
      //alert(JSON.stringify(res));
      this.TechnicianBelongs = res.data;
    });
    this.yearSelect = yyyy;

    this.getData();
  }
};
</script>
