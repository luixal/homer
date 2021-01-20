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
    <!-- modal for showing alerts info -->
    <div class="modal" v-if="alerts" :class="{'is-active': showModal}">
    <!-- <div class="modal" v-if="alerts"> -->
        <div class="modal-background" @click="$emit('toggle-modal')"></div>
        <div class="modal-content">
            <div class="box">
                <p class="title"><i class="fas fa-exclamation-triangle alert-icon"></i> {{ item.alertsTitle || 'Alerts' }}</p>
                <div v-for="(alert, index) in alerts" :key="index" class="block alert">
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
        <button class="modal-close is-large" aria-label="close" @click="$emit('toggle-modal')"></button>
    </div>
</template>

<script>
export default {
    name: "WeatherAlerts",
    props: {
        item: Object,
        alerts: Array,
        showModal: Boolean
    },

    methods: {
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
    }
}
</script>


<style scoped lang="scss">
.title {
    color: black !important;
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
}

.alert-date {
    text-align: right;
}
</style>
