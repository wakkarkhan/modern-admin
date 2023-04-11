<!-- Units -->
<template>
  <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
  <div v-else class="bubble-maps-page">
    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center" @click="$router.back()">
          <h5 style="width: fit-content; cursor: pointer"><b>&lt; &nbsp;</b> Units</h5>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="flex sm4 ml-auto" style="text-align: end">
        <va-button preset="plain" icon-right="fa-arrow-circle-right" size="large" :to="{ name: 'line-maps' }">
          Add Unit
        </va-button>
      </div>
    </div>

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

    <!-- <va-button class="mr-2 mb-2"  :to="{ name: 'line-maps' }"> Add Unit</va-button> -->

    <va-card class="flex mb-4 mt-2">
      <!-- <va-card-title>{{ t('tables.basic') }}</va-card-title> -->
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table" style="width: -webkit-fill-available">
            <thead>
              <tr width="100%">
                <th width="10%">Property ID</th>
                <th width="10%">Unit No</th>
                <th width="10%">Unit Type</th>
                <th width="10%">Bedrooms</th>
                <th width="10%">Size</th>

                <th width="10%">Premise No</th>

                <th width="10%">Occupancy</th>

                <th width="10%">Property Manager</th>
                <th width="20%"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.property_id }}</td>
                <td>{{ user.unit_no }}</td>
                <td>{{ user.unit_type }}</td>
                <td>{{ user.bedrooms }}</td>
                <td>{{ user.size }}</td>

                <td>{{ user.premise_no }}</td>
                <td>{{ user.occupancy }}</td>
                <td>{{ user.property_manager }}</td>
                <td style="text-align: center">
                  <!-- <va-popover :color="popover.color" :message="popover.message" placement="top" open>
                    <va-button class="mr-2 mb-2" color="dark" :to="{ name: 'bubble-maps' }">Units</va-button>
                  </va-popover> -->

                  <va-button class="mr-2 mb-2" color="warning" :to="{ name: 'line-maps' }"> Edit</va-button>
                  <va-button class="mr-2 mb-2" color="danger" @click="showBlurredModal = true"> Delete</va-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>

    <va-modal
      v-model="showBlurredModal"
      message="Are you sure you want to delete this unit ??"
      :ok-text="t('modal.confirm')"
      :cancel-text="t('modal.cancel')"
      blur
    />
    <!-- <div class="row">
      <div class="flex md12 xs12">
        <va-card class="bubble-maps-page__widget" title="Bubble Maps">
          <bubble-map :map-data="bubbleMapData" style="height: 75vh" />
        </va-card>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  // import BubbleMap from './BubbleMap.vue'
  // import { bubbleMapData } from '../../../../data/maps/bubbleMapData'

  export default {
    setup() {
      const showBlurredModal = ref(false)
      const { t } = useI18n()
      const showSkeleton = ref(true)

      const users = [
        {
          id: 1,
          property_id: '#####',
          unit_no: '####',
          unit_type: 'apartment',
          bedrooms: '#',
          size: '### Sq ft',
          premise_no: '######',
          occupancy: 'Occupied',
          property_manager: '24',
        },
        {
          id: 2,
          property_id: '#####',
          unit_no: '####',
          unit_type: 'apartment',
          bedrooms: '#',
          size: '### Sq ft',
          premise_no: '######',
          occupancy: 'Vacant',
          property_manager: '24',
        },
        {
          id: 3,
          property_id: '#####',
          unit_no: '####',
          unit_type: 'penthouse',
          bedrooms: '#',
          size: '### Sq ft',
          premise_no: '######',
          occupancy: 'Occupied',
          property_manager: '24',
        },
        {
          id: 4,
          property_id: '#####',
          unit_no: '####',
          unit_type: 'apartment',
          bedrooms: '#',
          size: '### Sq ft',
          premise_no: '######',
          occupancy: 'Vacant',
          property_manager: '24',
        },
      ]

      function showLoader() {
        setTimeout(() => {
          showSkeleton.value = false
        }, 500)
      }

      showLoader()

      return {
        users,
        showBlurredModal,
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
  .line-maps-page__widget {
    .va-card__inner {
      border-radius: inherit;
    }
  }

  .va-table td {
    vertical-align: unset !important;
  }
</style>
