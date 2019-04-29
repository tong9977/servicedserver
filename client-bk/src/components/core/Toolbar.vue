<template>
  <v-toolbar id="core-toolbar" color="blue" fixed flat prominent>
    <div class="v-toolbar-title">
      <v-toolbar-title class="white--text font-weight-light">
        <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon class="default v-btn--simple" to='/login'>
      <v-icon>mdi-logout</v-icon>
    </v-btn>

    <v-toolbar-items></v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations,mapState } from "vuex";

export default {
  data: () => ({
    title: null,
    responsive: false,
    responsiveInput: false
  }),
  computed:{
  },
  watch: {
    $route(val) {
      this.title = val.title || val.name;
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    }
  }
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
