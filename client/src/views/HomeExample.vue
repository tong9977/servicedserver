<template>
  <v-container>
    <div>
      <v-btn color="success">Success</v-btn>
      <v-btn color="error">Error</v-btn>
      <v-btn color="warning">Warning</v-btn>
      <v-btn color="info" @click.stop="info()">Info</v-btn>
    </div>
    <div class="text-xs-center">
      <v-btn outline color="indigo">Outline Button</v-btn>
      <v-btn outline fab color="teal">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
      <v-btn outline large fab color="indigo">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </div>
    <div>
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        class="mt-3"
        min="2016-06-15"
        max="2018-03-20"
      ></v-date-picker>
    </div>
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm3>
              <v-checkbox v-model="x" label="Left" value="left"></v-checkbox>
            </v-flex>

            <v-flex xs6 sm3>
              <v-checkbox v-model="x" label="Right" value="right"></v-checkbox>
            </v-flex>

            <v-flex xs6 sm3>
              <v-checkbox v-model="y" label="Top" value="top"></v-checkbox>
            </v-flex>

            <v-flex xs6 sm3>
              <v-checkbox v-model="y" label="Bottom" value="bottom"></v-checkbox>
            </v-flex>

            <v-flex xs12 sm3>
              <v-checkbox v-model="mode" label="Multi-line (mobile)" value="multi-line"></v-checkbox>
            </v-flex>

            <v-flex xs12 sm3>
              <v-checkbox v-model="mode" label="Vertical (mobile)" value="vertical"></v-checkbox>
            </v-flex>

            <v-flex xs12 sm4 offset-sm4>
              <v-text-field v-model="text" label="Text" type="text"></v-text-field>
            </v-flex>

            <v-flex xs12 sm4>
              <v-text-field v-model.number="timeout" label="Timeout" type="number"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn block color="primary" dark @click="snackbar = true">Show Snackbar</v-btn>
      </v-card-text>

      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    date: "2018-03-02",
    snackbar: false,
    y: "top",
    x: null,
    mode: "",
    timeout: 6000,
    text: "Hello, I'm a snackbar"
  }),

  methods: {
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0,
    async info() {
      const res = await this.$dialog.message.info("Test message", {
        position: "top-right"
      });
    }
  }
};
</script>
