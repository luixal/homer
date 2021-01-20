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
        <div class="card-content" v-if="weather">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="weather.icon.url" :alt="weather.icon.alt" />
                    </figure>
                </div>
                <div class="media-content">
                    <div class="level">
                        <div class="level-item">
                            <div>
                                <p class="title ellipsized">{{ item.name }}</p>
                                <p class="description">{{ weather.description }}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">temp</p>
                                <p class="title">{{ weather.temperature}} <span class="unit">{{ getUnit('temperature') }}</span></p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Hum</p>
                                <p class="title">{{ weather.humidity}} <span class="unit">{{ getUnit('humidity') }}</span></p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">press</p>
                                <p class="title">{{ weather.pressure}} <span class="unit">{{ getUnit('pressure') }}</span></p>
                            </div>
                        </div>
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
  name: "WeatherCurrent",
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
              humidity: '%',
              pressure: 'hPa'
          },
          metric: {
              temperature: 'ºC',
              speed: 'm/s',
              humidity: '%',
              pressure: 'hPa'
          },
          imperial: {
              temperature: 'ºF',
              speed: 'mph',
              humidity: '%',
              pressure: 'hPa'
          }
      }
    }
  ),
  created() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
        // loads weather provider file and calls getCurrentWeather function:
        this.weather = await (await import(`./weather/dataProviders/${this.item.provider.name}.js`)).getCurrentWeather(this.item.provider.params);
        if (this.item.refreshInterval) setTimeout(this.getMessage, this.item.refreshInterval);
    },

    toggleModal() {
        this.showModal = !this.showModal;
        if (!this.showModal && this.item.dismissAlertsAfterShown) delete this.weather.alerts;
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

.ellipsized {
    max-width: 9rem;
}

.description:first-letter {
    text-transform: capitalize;
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

.unit {
    font-size: small;
    font-weight: normal;
}
</style>
