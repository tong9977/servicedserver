<template>
  <v-app>
    <div id="mytoolbar" v-if="!pages.includes($route.name)">
      <!-- Setting Threm-->
      <!-- <core-filter/> -->
      <core-toolbar/>
      <core-drawer/>
    </div>
    <core-view/>
  </v-app>
</template>

<style lang="scss">
@import "@/styles/index.scss";

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}

@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";


</style> 


<script>
import { setTimeout } from "timers";

export default {
  data: () => ({
    // route name ที่ไม่ต้องการให้ขึ้น ToolBar กับ Drawer ใส่ชื่อใน Array นี้
    pages: ["Login", "SignUp"]
  })
};
</script>