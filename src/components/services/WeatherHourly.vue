<script>
export default {};
</script>

<style></style>
*/

<script>
export default {};
</script>

<style></style>

<template>
  <div>
    <div
      class="card"
      :style="`background-color:${item.background};`"
      :class="item.class"
    >
        <div class="card-content" v-if="weather && weather.hourly">
            <div class="level level-weather-multiple">
                <div class="level-item has-text-centered" v-for="(dailyWeather, index) in weather.hourly" :key="index">
                    <div>
                        <p class="heading">
                            <span v-if="item.showHours">{{ formatHourShort(dailyWeather.dt * 1000) }}</span>
                            <span v-if="item.showTemperatures"> {{ dailyWeather.temperature }}{{ getUnit('temperature') }}</span>
                        </p>
                        <figure class="image is-48x48">
                            <img :src="dailyWeather.icon.url" :alt="dailyWeather.icon.alt" />
                        </figure>
                    </div>
                </div>
            </div>
            <i class="fas fa-exclamation-triangle alert-icon" v-if="weather.alerts" @click="toggleModal"></i>
        </div>
    </div>
    <WeatherAlerts v-if="weather && weather.alerts" :showModal="showModal" :item="item" :alerts="weather.alerts" v-on:toggle-modal="toggleModal"></WeatherAlerts>
  </div>
</template>

<script>
import WeatherAlerts from './weather/components/alerts.vue';

export default {
  name: "WeatherHourly",
  components: {
      WeatherAlerts
  },
  props: {
    item: Object,
  },
  data: () => ({
      weather: null,
      showModal: false,
      units: {
          standard: {
              temperature: 'ºK',
              speed: 'm/s',
              humidity: '%'
          },
          metric: {
              temperature: 'ºC',
              speed: 'm/s',
              humidity: '%'
          },
          imperial: {
              temperature: 'ºF',
              speed: 'mph',
              humidity: '%'
          }
      }
    }
  ),
  created() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
        // loads weather provider file and calls getHourlyWeather function:
        this.weather = await (await import(`./weather/dataProviders/${this.item.provider.name}.js`)).getHourlyWeather(this.item.provider.params);
        if (this.item.refreshInterval) setTimeout(this.getMessage, this.item.refreshInterval);
    },

    toggleModal() {
        this.showModal = !this.showModal;
        if (!this.showModal && this.item.dismissAlertsAfterShown) delete this.weather.alerts;
    },

    formatHourShort(ts) {
        return `${new Date(ts).getHours()}h`;
    },

    getUnit(param) {
        return this.units[this.item.provider.params.units][param];
    }
  }
};
</script>

<style scoped lang="scss">
.media-left img {
  max-height: 100%;
}

.media-left {
    margin-right: 0rem !important;
}

.level-weather-multiple {
    margin-top: -0.5rem;
}

.heading {
    color: var(--text-subtitle)
}

.alert-icon {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: #ec6d4c;
    color: white;
    padding: 2rem 0.3rem 0rem 0.3rem;
    border-radius: 0px 5px 5px 0px;
}
</style>
