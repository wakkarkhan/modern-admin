<template>
  <!-- Floors -->
  <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
  <div v-else class="yandex-maps-page">
    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center" @click="$router.back()">
          <h5 style="width: fit-content; cursor: pointer"><b>&lt; &nbsp;</b> Floors</h5>
        </div>
      </div>
    </div>
    <!-- <div class="row">
        <div v-for="(info, idx) in infoTiles" :key="idx" class="flex xs12 sm4">
          <va-card class="mb-4" :color="info.color">
            <va-card-content>
              <h2 class="va-h2 ma-0" style="color: white">{{ info.value }}</h2>
              <p style="color: white">{{ info.text }} </p>
            </va-card-content>
          </va-card>
        </div>
      </div> -->
    <div class="row">
      <div class="flex xs12 sm6 md4">
        <va-card stripe stripe-color="info">
          <va-card-title> Building Name </va-card-title>
          <va-card-content>
            <p class="rich-theme-card-text">Building ABC</p>
          </va-card-content>
        </va-card>
      </div>

      <div class="flex xs12 sm6 md4">
        <va-card stripe stripe-color="info">
          <va-card-title> Total Floors </va-card-title>
          <va-card-content>
            <p class="rich-theme-card-text">1142</p>
          </va-card-content>
        </va-card>
      </div>

      <div class="flex xs12 sm6 md4">
        <va-card stripe stripe-color="info">
          <va-card-title> Building Manager </va-card-title>
          <va-card-content>
            <p class="rich-theme-card-text">John Doe</p>
          </va-card-content>
        </va-card>
      </div>
    </div>

    <!-- <div class="row mb-3">
      <div class="flex md3 sm6 xs12">
        <h6
          class="bgwhite p-2 rounded-2"
          style="width: fit-content; background-color: white; border-radius: 10px; padding: 10px"
        >
          Buildings Name
        </h6>
      </div>

      <div class="flex md3 sm6 xs12">
        <h6
          class="bgwhite p-2 rounded-2"
          style="width: fit-content; background-color: white; border-radius: 10px; padding: 10px"
        >
          Total Floors
        </h6>
      </div>

      <div class="flex md3 sm6 xs12">
        <h6
          class="bgwhite p-2 rounded-2"
          style="width: fit-content; background-color: white; border-radius: 10px; padding: 10px"
        >
          Building Manager: Username
        </h6>
      </div>
    </div> -->

    <va-card class="my-3">
      <va-card-content>
        <va-accordion v-model="customHeaderAccordionValue">
          <va-collapse class="mb-2">
            <template #header>
              <va-button style="width: 100%"> Add New Floor </va-button>
            </template>
            <div class="pa-3">
              <p class="va-h3"></p>
              <div class="row">
                <!-- Building Name-->
                <div class="flex md3 sm6 xs12">
                  <va-input v-model="floor">
                    <template #prepend>
                      <!-- <va-icon color="gray" name="envelope" /> -->
                      <p style="width: 100px">Floor:</p>
                    </template>
                  </va-input>
                </div>

                <div class="flex md3 sm6 xs12">
                  <va-button class="mr-2 mb-2" style="width: 100px" @click="launchToast"> Add</va-button>
                </div>
              </div>
            </div>
          </va-collapse>
        </va-accordion>
      </va-card-content>
    </va-card>

    <va-card class="flex my-3">
      <!-- <va-card-title>{{ t('tables.basic') }}</va-card-title> -->
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table" style="width: -webkit-fill-available">
            <thead>
              <tr>
                <th width="30%">Floors</th>
                <th width="30">Total Properties</th>
                <th width="25%"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.floors }}</td>
                <td>{{ user.total_properties }}</td>
                <td>
                  <va-popover :color="popover.color" :message="popover.message" placement="top" open>
                    <va-button class="mr-2 mb-2" color="dark" :to="{ name: 'bubble-maps' }">Units</va-button>
                  </va-popover>

                  <va-button class="mr-2 mb-2" color="warning"> Rename</va-button>
                  <va-button class="mr-2 mb-2" color="danger" @click="showBlurredModal = true"> Delete</va-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
    <!-- <div class="row">
      <div class="flex md12 xs12">
        <va-card class="yandex-maps-page__widget" title="Yandex Maps">
          <yandex-map
            map-type="hybrid"
            :coords="[55.2, 38.8]"
            :zoom="8"
            :controls="['trafficControl', 'zoomControl', 'geolocationControl', 'fullscreenControl', 'searchControl']"
            style="width: 100%; height: 65vh"
          >
            <yandex-map-marker v-for="marker in markers" :key="marker['marker-id']" v-bind="marker" />
          </yandex-map>
        </va-card>
      </div>
    </div> -->
    <va-modal
      v-model="showBlurredModal"
      message="Are you sure you want to delete this floor ??"
      :ok-text="t('modal.confirm')"
      :cancel-text="t('modal.cancel')"
      blur
    />
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'

  // No TS declarations are provided - ignoring the error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { yandexMap as YandexMap, ymapMarker as YandexMapMarker } from 'vue-yandex-maps'
  import { ToastPosition, useToast } from 'vuestic-ui'
  // import ToastPositionPicker from './ToastPositionPicker.vue'
  import { useI18n } from 'vue-i18n'

  export default {
    setup() {
      const { t } = useI18n()

      const markers = ref([
        {
          'marker-id': 0,
          coords: [54.8, 38.9],
          clusterName: '1',
          balloonTemplate: '<div>"Your custom template"</div>',
        },
      ])

      const showSkeleton = ref(true)
      const floor = ref('')
      const customHeaderAccordionValue = ref(false)
      const showBlurredModal = ref(false)
      const { init } = useToast()
      const toastText = ref('Folder added successfully!')
      const toastDuration = ref(2500)
      const toastPosition = ref<ToastPosition>('top-right')

      const users = [
        {
          id: '1',
          floors: 'floor #',
          total_properties: '##',
        },
        {
          id: '2',
          floors: 'floor #',
          total_properties: '##',
        },
        {
          id: '3',
          floors: 'floor #',
          total_properties: '##',
        },
        {
          id: '4',
          floors: 'floor #',
          total_properties: '##',
        },
      ]

      function launchToast() {
        if (floor.value != '') {
          init({
            message: toastText.value,
            position: toastPosition.value,
            duration: Number(toastDuration.value),
            color: 'success',
          })

          customHeaderAccordionValue.value = false
          floor.value = ''
        } else {
          init({
            message: 'Please first fill floor value',
            position: 'top-right',
            duration: Number(2500),
            color: 'danger',
          })
        }
      }

      const popover = ref({
        message: 'Go to Units',
        color: 'secondary',
      })

      const infoTiles = ref([
        {
          color: 'success',
          value: '803',
          text: 'commits',
          icon: '',
        },
        {
          color: 'danger',
          value: '1122',
          text: 'Total Floors',
          icon: '',
        },
        {
          color: 'info',
          value: '5',
          text: 'teamMembers',
          icon: '',
        },
      ])

      function showLoader() {
        setTimeout(() => {
          showSkeleton.value = false
        }, 500)
      }

      showLoader()
      return {
        floor,
        customHeaderAccordionValue,
        showBlurredModal,
        users,
        infoTiles,
        popover,
        launchToast,
        t,
        showSkeleton,
      }
    },
    data() {
      return {}
    },
    mounted() {
      // setTimeout(() => {
      //   this.showSkeleton = false
      // }, 500)
    },
  }
</script>

<style lang="scss">
  .va-table td {
    vertical-align: unset !important;
  }
</style>
