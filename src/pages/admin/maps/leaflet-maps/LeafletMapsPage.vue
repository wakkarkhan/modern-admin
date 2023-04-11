<!-- Manage Buildings -->
<template>
  <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
  <div v-else class="markup-tables flex">
    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center" @click="$router.back()">
          <h5 style="width: fit-content; cursor: pointer"><b>&lt; &nbsp;</b> Development - Building</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="flex md12 xs12">
        <!-- <leaflet-map style="height: 65vh" /> -->
        <!-- <div class="row mt-2">
            <div class="flex xs12" style="padding: 0"> -->

        <va-card class="my-3">
          <va-card-content>
            <va-accordion v-model="customHeaderAccordionValue">
              <va-collapse class="mb-2">
                <template #header>
                  <va-button style="width: 100%"> Add New Building </va-button>
                </template>
                <div class="pa-3">
                  <p class="va-h3"></p>
                  <div class="row">
                    <!-- Building Name-->
                    <div class="flex md3 sm6 xs12">
                      <va-input v-model="buildName">
                        <template #prepend>
                          <!-- <va-icon color="gray" name="envelope" /> -->
                          <p style="width: 100px">Building Name:</p>
                        </template>
                      </va-input>
                    </div>

                    <!-- Total Floors -->
                    <div class="flex md3 sm6 xs12">
                      <va-input v-model="totalFloors">
                        <template #prepend>
                          <!-- <va-icon color="gray" name="envelope" /> -->
                          <p style="width: 100px">Total Floors:</p>
                        </template>
                      </va-input>
                    </div>

                    <!-- City -->
                    <div class="flex md3 sm6 xs12">
                      <va-select
                        v-model="city"
                        placeholder="Please select.."
                        searchable
                        text-by="description"
                        track-by="id"
                        :options="simpleOptions"
                      >
                        <template #prepend>
                          <!-- <va-icon color="gray" name="envelope" /> -->
                          <p style="width: 100px">City:</p>
                        </template>
                      </va-select>
                    </div>

                    <!-- Area -->
                    <div class="flex md3 sm6 xs12">
                      <va-select
                        v-model="area"
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

                    <!-- Street-->
                    <div class="flex md3 sm6 xs12">
                      <va-input v-model="street">
                        <template #prepend>
                          <!-- <va-icon color="gray" name="envelope" /> -->
                          <p style="width: 100px">Street:</p>
                        </template>
                      </va-input>
                    </div>

                    <!-- Building Manager  -->
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

                    <div class="flex md3 sm6 xs12">
                      <va-button class="mr-2 mb-2" style="width: 100px" @click="launchToast"> Add</va-button>
                    </div>
                  </div>
                </div>
              </va-collapse>
            </va-accordion>
          </va-card-content>
        </va-card>
        <!-- </div>
          </div> -->

        <va-card class="flex my-3">
          <!-- <va-card-title>{{ t('tables.basic') }}</va-card-title> -->
          <va-card-content>
            <div class="table-wrapper">
              <table class="va-table" style="width: -webkit-fill-available">
                <thead>
                  <tr>
                    <th width="20%">Building Name</th>
                    <th width="15%">Total Floors</th>
                    <th width="15%">Total Properties</th>
                    <th width="15%">Building Manager</th>
                    <th width="25%"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.build_name }}</td>
                    <td>{{ user.total_floor }}</td>
                    <td>{{ user.total_properties }}</td>
                    <td>{{ user.build_manager }}</td>
                    <td>
                      <va-popover :color="popover.color" :message="popover.message" placement="top" open>
                        <va-button class="mr-2 mb-2" color="dark" :to="{ name: 'yandex-maps' }">Floors</va-button>
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
      </div>
    </div>
    <va-modal
      v-model="showBlurredModal"
      message="Are you sure you want to delete this building ??"
      :ok-text="t('modal.confirm')"
      :cancel-text="t('modal.cancel')"
      blur
    />
  </div>
</template>

<script lang="ts">
  import { ref, Suspense } from 'vue'
  import LeafletMap from './LeafletMap.vue'
  import { ToastPosition, useToast } from 'vuestic-ui'
  import ToastPositionPicker from './ToastPositionPicker.vue'
  import { useI18n } from 'vue-i18n'

  import data from '../../../../../src/pages/admin/maps/data-tables/data/users.json'

  export default {
    setup() {
      const { t } = useI18n()

      // const users = ref(data.slice(0, 6))
      const customHeaderAccordionValue = ref(false)
      const showBlurredModal = ref(false)

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

      const users = ref([
        {
          id: 1,
          build_name: 'Building A',
          total_floor: '4',
          total_properties: '234',
          build_manager: 'username 01',
        },
        {
          id: 2,
          build_name: 'Building C',
          total_floor: '2',
          total_properties: '214',
          build_manager: 'username 02',
        },
        {
          id: 3,
          build_name: 'Building B',
          total_floor: '3',
          total_properties: '24',
          build_manager: 'test',
        },
      ])

      const buildName = ref('')
      const totalFloors = ref('')
      const city = ref('')
      const area = ref('')
      const buildManager = ref('')
      const street = ref('')

      const { init } = useToast()

      const toastText = ref('Building added successfully!')
      const toastDuration = ref(2500)
      const toastPosition = ref<ToastPosition>('top-right')

      const popover = ref({
        message: 'Go to floors',
        color: 'secondary',
      })

      function launchToast() {
        if (
          buildName.value != '' &&
          totalFloors.value != '' &&
          city.value != '' &&
          area.value != '' &&
          buildManager.value != '' &&
          street.value != ''
        ) {
          init({
            message: toastText.value,
            position: toastPosition.value,
            duration: Number(toastDuration.value),
            color: 'success',
          })

          customHeaderAccordionValue.value = false
          buildName.value = ''
          totalFloors.value = ''
          city.value = ''
          area.value = ''
          buildManager.value = ''
          street.value = ''
        } else {
          init({
            message: 'Please fill all the fields first',
            position: 'top-right',
            duration: Number(2500),
            color: 'danger',
          })
        }
      }

      return {
        buildName,
        totalFloors,
        city,
        area,
        buildManager,
        street,

        popover,
        customHeaderAccordionValue,
        showBlurredModal,

        simpleOptions,
        users,
        launchToast,
        t,
      }
    },
    data() {
      return {
        showSkeleton: true,
      }
    },
    mounted() {
      setTimeout(() => {
        this.showSkeleton = false
      }, 500)
    },
  }
</script>
<style lang="scss">
  .markup-tables {
    .va-table td {
      vertical-align: unset !important;
    }
  }
</style>
