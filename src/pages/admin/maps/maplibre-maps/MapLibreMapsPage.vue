<!-- Buildings -->
<template>
  <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
  <div v-else class="markup-tables flex">
    <!-- <h1 class="my-3">Buildings</h1> -->

    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center">
          <h5 style="width: fit-content; cursor: pointer"><b>&lt; &nbsp;</b> Property Management</h5>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="(info, idx) in infoTiles" :key="idx" class="flex xs12 sm6">
        <va-card class="mb-2" :color="info.color">
          <va-card-content>
            <h2 class="va-h2 ma-0" style="color: white">{{ info.value }}</h2>
            <p style="color: white">{{ info.text }}</p>
          </va-card-content>
        </va-card>
      </div>
    </div>

    <div class="row mb-3">
      <div class="flex sm4 ml-auto" style="text-align: end">
        <va-button preset="plain" icon-right="fa-arrow-circle-right" size="large" :to="{ name: 'leaflet-maps' }">
          Manage Buildings
        </va-button>
      </div>
    </div>

    <!-- <div class="row mb-3">
      <div class="flex md2 sm6 xs12">
        <h6 class="bgwhite p-2 rounded-2" style="width:fit-content; background-color: white; border-radius: 10px; padding:10px">
            Buildings: 25
          </h6>
        </div>

        <div class="flex md2 sm6 xs12">
        <h6 class="bgwhite p-2 rounded-2" style="width:fit-content; background-color: white; border-radius: 10px; padding:10px">
            Units: 76454
          </h6>
        </div>

        <div class="flex md2 sm6 xs12" style="margin-left: auto">
          <va-button class="mr-2 mb-2" size="large" :to="{ name: 'leaflet-maps' }"> Manage Buildings</va-button>
        </div>

    </div> -->
    <va-card class="mb-2">
      <va-card-content>
        <div class="row mb-3">
          <!-- Develpoment -->
          <div class="flex md3 sm6 xs12">
            <va-select
              v-model="development"
              placeholder="Please select.."
              searchable
              text-by="description"
              track-by="id"
              :options="simpleOptions"
            >
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Development:</p>
              </template>
            </va-select>
          </div>
          <!-- Unit ID -->
          <div class="flex md3 sm6 xs12">
            <va-input v-model="unitID">
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Unit ID:</p>
              </template>
            </va-input>
          </div>
          <!-- Unit Type -->
          <div class="flex md3 sm6 xs12">
            <va-select
              v-model="unitType"
              placeholder="Please select.."
              searchable
              text-by="description"
              track-by="id"
              :options="simpleOptions"
            >
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Unit Type:</p>
              </template>
            </va-select>
          </div>
          <!-- Unit No. -->
          <div class="flex md3 sm6 xs12">
            <va-input v-model="unitNo">
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Unit No:</p>
              </template>
            </va-input>
          </div>
          <!-- Bedrooms -->
          <div class="flex md3 sm6 xs12">
            <va-select
              v-model="bedrooms"
              placeholder="Please select.."
              searchable
              text-by="description"
              track-by="id"
              :options="simpleOptions"
            >
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Bedrooms:</p>
              </template>
            </va-select>
          </div>

          <!-- Occupancy -->
          <div class="flex md3 sm6 xs12">
            <va-select
              v-model="occupancy"
              placeholder="Please select.."
              searchable
              text-by="description"
              track-by="id"
              :options="simpleOptions"
            >
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Occupancy:</p>
              </template>
            </va-select>
          </div>
          <!-- Building Manager-->
          <div class="flex md3 sm6 xs12">
            <va-select
              v-model="buildManager"
              placeholder="Please select.."
              searchable
              text-by="description"
              track-by="id"
              :options="simpleOptions"
            >
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Building Manager:</p>
              </template>
            </va-select>
          </div>
          <!-- Property Manager -->
          <div class="flex md3 sm6 xs12">
            <va-select
              v-model="propertyManager"
              placeholder="Please select.."
              searchable
              text-by="description"
              track-by="id"
              :options="simpleOptions"
            >
              <template #prepend>
                <!-- <va-icon color="gray" name="envelope" /> -->
                <p style="width: 100px">Property Manager:</p>
              </template>
            </va-select>
          </div>
        </div>
      </va-card-content>
    </va-card>

    <va-card class="flex mb-4 mt-3">
      <!-- <va-card-title>{{ t('tables.basic') }}</va-card-title> -->
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table">
            <thead>
              <tr>
                <th>Development Name</th>
                <th>Floor</th>
                <th>Unit ID</th>
                <th>Unit Type</th>
                <th>Unit Number</th>
                <th>Bedrooms</th>

                <th>Occupancy</th>
                <th>Building Manager</th>
                <th>Property Manager</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.dev_name }}</td>
                <td>{{ user.floor }}</td>
                <td>{{ user.unit_id }}</td>
                <td>{{ user.unit_type }}</td>
                <td>{{ user.unit_number }}</td>
                <td>{{ user.bedrooms }}</td>
                <td>{{ user.occupancy }}</td>
                <td>{{ user.build_manager }}</td>
                <td>{{ user.property_manager }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
  <!-- <div class="maplibre-maps-page">
    <div class="row">
      <div class="flex md12 xs12">
        <va-card class="maplibre-maps-page__widget" title="MapLibre Maps">
          <map-libre-map style="height: 65vh" />
        </va-card>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
  // import MapLibreMap from './MapLibreMap.vue'
  import { ref, Suspense } from 'vue'
  import { useI18n } from 'vue-i18n'

  import data from '../../../../../src/pages/admin/maps/data-tables/data/users.json'

  export default {
    setup() {
      const users = ref(data.slice(0, 6))
      const { t } = useI18n()

      const simpleOptions = ref([
        {
          id: 1,
          description: 'First option',
        },
        {
          id: 2,
          description: 'Second option',
        },
        {
          id: 3,
          description: 'Third option',
        },
      ])

      const development = ref('')
      const unitID = ref('')
      const unitType = ref('')
      const unitNo = ref('')
      const bedrooms = ref('')
      const occupancy = ref('')
      const buildManager = ref('')
      const propertyManager = ref('')
      const showSkeleton = ref(true)

      function getStatusColor(status: string) {
        if (status === 'paid') {
          return 'success'
        }

        if (status === 'processing') {
          return 'info'
        }

        return 'danger'
      }

      const infoTiles = ref([
        {
          color: 'success',
          value: '256',
          text: 'Buildings',
          icon: '',
        },

        {
          color: 'info',
          value: '564333',
          text: 'Units',
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
        infoTiles,
        development,
        unitID,
        unitType,
        unitNo,
        bedrooms,
        occupancy,
        buildManager,
        propertyManager,
        simpleOptions,
        users,
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
  .markup-tables {
    .table-wrapper {
      overflow: auto;
    }

    .va-table {
      width: 100%;
    }

    .va-table td {
      vertical-align: unset !important;
    }
  }
</style>
