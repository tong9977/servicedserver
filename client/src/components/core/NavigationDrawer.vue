<template>
  <v-navigation-drawer v-model="inputValue" fixed app>
    <v-toolbar flat dark :color="color" class="toolbar">
      <router-link :to="{ name: 'Dashboard' }" class="text">Vue Admin Template</router-link>
    </v-toolbar>
    <v-list>
      <v-list-tile @click="changeRoute('Home', 1)">
        <v-list-tile-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 1}, 'item-title' ]">Home</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="changeRoute('ManageZone', 2)">
        <v-list-tile-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">Manage RM Group</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="changeRoute('Report', 2)">
        <v-list-tile-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">Report</v-list-tile-title>
      </v-list-tile>
      
      <v-list-tile @click="changeRoute('ReportRM', 2)">
        <v-list-tile-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">Report RM</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="changeRoute('ReportTechnicianBelong', 2)">
        <v-list-tile-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">Report ทีมช่าง</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="changeRoute('ReportTechnicianBelongPerson', 2)">
        <v-list-tile-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">Report ทีมช่างแยกตามบุคคล</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="changeRoute('Mailbox', 3)">
        <v-list-tile-action>
          <v-icon>mdi-inbox</v-icon>
        </v-list-tile-action>
        <v-list-tile-title :class="[{'active': selectedIndex === 3}, 'item-title' ]">Mailbox</v-list-tile-title>
      </v-list-tile>

      <v-list-group prepend-icon="mdi-calendar">
        <v-list-tile slot="activator">
          <v-list-tile-title class="item-title">Widgets</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('Social', 4)">
          <v-list-tile-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 4}, 'item-title' ]">Social</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('Chart', 5)">
          <v-list-tile-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 5}, 'item-title' ]">Charts</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('Media', 6)">
          <v-list-tile-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 6}, 'item-title' ]">Media</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group prepend-icon="select_all">
        <v-list-tile slot="activator">
          <v-list-tile-title class="item-title">Overlays</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeRoute('Snackbar', 7)">
          <v-list-tile-action>
            <v-icon>event_note</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 7}, 'item-title' ]">Snackbar</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group prepend-icon="fingerprint">
        <v-list-tile slot="activator">
          <v-list-tile-title class="item-title">Authorization</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push({ name: 'Error', params: { errorCode: '403' } })">
          <v-list-tile-action>
            <v-icon>cancel</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="item-title">403</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push({ name: 'Error', params: { errorCode: '404' } })">
          <v-list-tile-action>
            <v-icon>cancel</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="item-title">404</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push({ name: 'Error', params: { errorCode: '500' } })">
          <v-list-tile-action>
            <v-icon>cancel</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="item-title">500</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push({ name: 'Login' })">
          <v-list-tile-action>
            <v-icon>cancel</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="item-title">Login</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group prepend-icon="account_circle">
        <v-list-tile slot="activator">
          <v-list-tile-title class="item-title">Users</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-for="(admin, i) in admins" :key="i">
          <v-list-tile-action>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      selectedIndex: 1,
      admins: [["Management", "people_outline"], ["Settings", "settings"]]
    };
  },
  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  methods: {
    ...mapMutations("app", ["setDrawer"]),
    changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    }
  },
  mounted() {}
};
</script>

<style>
.toolbar {
  font-weight: bold;
  font-size: 18px;
}

.toolbar .text {
  padding-left: 15px;
  color: white;
  text-decoration: none;
}

.item-title {
  font-size: 17px;
  font-weight: 500;
}
.item-sub-title {
  font-size: 15px;
  font-weight: 500;
}

.active {
  font-weight: bold;
}
</style>
