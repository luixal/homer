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
        <div class="card-content">
            <div class="media" v-if="weather">
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
                        <div class="level-item" v-if="weather.alerts">
                            <i class="fas fa-exclamation-triangle alert-icon" @click="toggleModal"></i>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">temp</p>
                                <p class="title">{{ weather.temperature}} {{ getUnit('temperature') }}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Hum</p>
                                <p class="title">{{ weather.humidity}} {{ getUnit('humidity') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal for showing alerts info -->
    <div class="modal" v-if="weather && weather.alerts" :class="{'is-active': showModal}">
        <div class="modal-background" @click="toggleModal"></div>
        <div class="modal-content">
            <div class="box">
                <p class="title"><i class="fas fa-exclamation-triangle"></i> {{ item.alertsTitle || 'Alerts' }}</p>
                <div v-for="(alert, index) in weather.alerts" :key="index" class="block alert">
                    <div class="alert-content">
                        <p>{{alert.event}}</p>
                        <p>{{alert.sender}}</p>
                        <p><b>{{alert.description}}</b></p>
                    </div>
                    <div>
                        <p class="alert-date">{{ formatDateShort(alert.start * 1000) }}</p>
                        <p class="alert-date">{{ formatDateShort(alert.end * 1000) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
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
    // loads weather provider file and calls getCurrentWeather function:
    this.weather = await (await import(`./WeatherDataProviders/${this.item.provider.name}.js`)).getCurrentWeather(this.item.provider.params);
    },

    toggleModal() {
        this.showModal = !this.showModal;
    },

    formatDateShort(ts) {
        let date = new Date(ts);
        return (date).toLocaleDateString(
            date,
            {
                weekday: 'short',
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        );
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

.alert {
    display: flex;
    justify-content: space-between;
}

.alert-content {
    max-width: 26rem;
}

.alert-icon {
    color: #ec6d4c;
    cursor: pointer;
}

.alert-date {
    text-align: right;
}
</style>
