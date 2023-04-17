<!-- Units -->
<template>
  <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
  <div v-else class="bubble-maps-page">
    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center" @click="$router.back()">
          <p style="width: fit-content; cursor: pointer; font-size: 18px"><b>&lt; &nbsp;Units</b></p>
        </div>
      </div>
    </div>

    <!-- Add units button -->
    <div class="row">
      <div class="flex sm4 ml-auto" style="text-align: end">
        <va-button
          preset="plain"
          icon-right="fa-arrow-circle-right"
          size="large"
          :to="{
            name: 'line-maps',
            params: { buildingId: buildingId, floorId: floorId },
            state: {
              totalFloors: totalFloors,
              managerId: buildingManager,
              buildingName: buildingName,
              buildingId: buildingId,
              floorId: floorId,
            },
          }"
        >
          Add Unit
        </va-button>
      </div>
    </div>

    <div class="row">
      <div class="flex xs12 sm6 md3">
        <va-card stripe stripe-color="primary">
          <va-card-title> Building Name </va-card-title>
          <va-card-content>
            <div class="row">
              <div class="flex xs3">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 15px">
                  <i class="fa fa-building fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <p class="pt-3" style="font-size: 18px">{{ buildingName }}</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>

      <div class="flex xs12 sm6 md3">
        <va-card stripe stripe-color="primary">
          <va-card-title> Total Floors </va-card-title>
          <va-card-content>
            <div class="row">
              <div class="flex xs3">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 15px">
                  <i class="fa fa-th fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <p class="pt-3" style="font-size: 18px">{{ totalFloors }}</p>
              </div>
            </div>

            <!-- <p class="rich-theme-card-text">{{ totalFloors }}</p> -->
          </va-card-content>
        </va-card>
      </div>

      <div class="flex xs12 sm6 md3">
        <va-card stripe stripe-color="primary">
          <va-card-title> Building Manager </va-card-title>
          <va-card-content>
            <div class="row">
              <div class="flex xs3">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 15px">
                  <i class="fa fa-user fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <p class="pt-3" style="font-size: 18px">{{ buildingManager }}</p>
              </div>
            </div>
            <!-- <p class="rich-theme-card-text">{{ buildingManager }}</p> -->
          </va-card-content>
        </va-card>
      </div>
    </div>

    <!-- All units table -->
    <va-card class="flex mb-4 mt-2">
      <!-- <va-card-title>{{ t('tables.basic') }}</va-card-title> -->
      <va-card-content>
        <div class="row">
          <div class="flex xs12 pt-0">
            <p style="font-size: 20px"><b>All Units</b></p>
          </div>
        </div>
        <va-data-table :items="units" :columns="columns" :current-page="currentPage" :loading="isTableLoading">
          <template #cell(empty)>
            <h5>No records found</h5>
          </template>

          <template #cell(occupy)="{ rowData }">
            <div v-if="rowData.occupy === 0">Vacant</div>
            <div v-if="rowData.occupy === 1">Occupied</div>
          </template>
          <template #cell(size)="{ rowData }">
            <div v-if="rowData.sizeType === 0">{{ rowData.size }} m</div>
            <div v-if="rowData.sizeType === 1">{{ rowData.size }} Sq m</div>
          </template>

          <template #cell(actions)="{ rowData }">
            <va-popover :color="popover.color" message="Edit Details" placement="top" open>
              <router-link
                :to="{
                  name: 'line-maps',
                  params: { buildingId: buildingId, floorId: floorId },
                  state: {
                    totalFloors: totalFloors,
                    managerId: buildingManager,
                    buildingName: buildingName,
                    buildingId: buildingId,
                    floorId: floorId,
                    unitId: rowData._id,
                  },
                }"
              >
                <va-icon class="mr-2" name="edit" color="#262824" style="cursor: pointer" />
              </router-link>
            </va-popover>

            <va-popover :color="popover.color" message="Delete" placement="top" open>
              <va-icon
                class="mr-2"
                name="delete"
                color="#262824"
                style="cursor: pointer"
                @click="
                  () => {
                    showBlurredModal = true
                    setIdtoDelete(rowData._id)
                  }
                "
              />
            </va-popover>
          </template>
          <template #bodyAppend>
            <tr class="">
              <td colspan="12">
                <div class="table-example--pagination mt-4">
                  <!-- <va-pagination v-model="currentPage" input :pages="totalPages" /> -->
                  <va-pagination v-model="currentPage" input :pages="totalPages">
                    <!-- first page -->
                    <template #firstPageLink="{ disabled }">
                      <va-button
                        preset="primary"
                        :disabled="disabled"
                        aria-label="go prev page"
                        @click="
                          () => {
                            currentPage = 1
                            getAllUnits()
                          }
                        "
                      >
                        <i class="fa fa-angle-double-left" size="large"></i>
                      </va-button>
                    </template>

                    <!-- previous page -->
                    <template #prevPageLink="{ disabled }">
                      <va-button
                        preset="primary"
                        :disabled="disabled"
                        aria-label="go prev page"
                        @click="
                          () => {
                            currentPage = currentPage - 1
                            getAllUnits()
                          }
                        "
                      >
                        <i class="fa fa-angle-left" size="large"></i>
                      </va-button>
                    </template>
                    <!-- next page -->
                    <template #nextPageLink="{ disabled }">
                      <va-button
                        preset="primary"
                        :disabled="disabled"
                        aria-label="go next page"
                        @click="
                          () => {
                            currentPage = currentPage + 1
                            getAllUnits()
                          }
                        "
                      >
                        <i class="fa fa-angle-right" size="large"></i>
                      </va-button>
                    </template>
                    <!-- last page -->
                    <template #lastPageLink="{ disabled }">
                      <va-button
                        preset="primary"
                        :disabled="disabled"
                        aria-label="go prev page"
                        @click="
                          () => {
                            currentPage = totalPages
                            getAllUnits()
                          }
                        "
                      >
                        <i class="fa fa-angle-double-right" size="large"></i>
                      </va-button>
                    </template>
                  </va-pagination>
                </div>
              </td>
            </tr>
          </template>
        </va-data-table>

        <!-- <div class="table-wrapper">
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
                  <va-popover :color="popover.color" :message="popover.message" placement="top" open>
                    <va-button class="mr-2 mb-2" color="dark" :to="{ name: 'bubble-maps' }">Units</va-button>
                  </va-popover>

                  <va-button class="mr-2 mb-2" color="warning" :to="{ name: 'line-maps' }"> Edit</va-button>
                  <va-button class="mr-2 mb-2" color="danger" @click="showBlurredModal = true"> Delete</va-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </va-card-content>
    </va-card>

    <va-modal
      v-model="showBlurredModal"
      message="Are you sure you want to delete this unit ??"
      :ok-text="t('modal.confirm')"
      :cancel-text="t('modal.cancel')"
      blur
      @ok="deleteUnit()"
    />
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { ToastPosition, useToast } from 'vuestic-ui'

  // import BubbleMap from './BubbleMap.vue'
  // import { bubbleMapData } from '../../../../data/maps/bubbleMapData'
  import service from '../../../../../src/auth/service'

  export default {
    setup() {
      const temp = new service()
      const route = useRoute()
      const showBlurredModal = ref(false)
      const { t } = useI18n()
      const showSkeleton = ref(true)

      const buildingName = ref('')
      const totalFloors = ref('')
      const buildingManager = ref('')
      const buildingId = ref('')
      const floorId = ref('')

      const units = ref([])
      const perPage = ref(10)
      const currentPage = ref(1)
      const totalPages = ref(1)

      const isTableLoading = ref(true)
      const { init } = useToast()

      const columns = [
        { key: 'id', label: 'Property ID', sortable: true },
        { key: 'unitNo', label: 'Unit No', sortable: true },
        { key: 'unitType', label: 'unit Type', sortable: true },
        { key: 'bedrooms', sortable: true },
        { key: 'size', label: 'size', sortable: true },
        { key: 'premiseNo', label: 'premise No', sortable: true },
        { key: 'occupy', label: 'occupancy', sortable: true },
        { key: 'managerId', label: 'property manager', sortable: true },
        { key: 'actions', label: '' },
      ]

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

      const popover = ref({
        message: 'Go to Units',
        color: 'secondary',
      })

      const idToDelete = ref('')

      function setIdtoDelete(id: string) {
        idToDelete.value = id
      }

      //  delete unit
      function deleteUnit() {
        console.log(idToDelete.value)
        temp
          .deleteUnit(idToDelete.value)
          .then(() => {
            getAllUnits()
            init({
              message: 'Unit Deleted Successfully!',
              position: 'top-right',
              duration: Number(2500),
              color: 'primary',
            })
          })
          .catch((error) => {
            init({
              message: `${error.response.data.message}`,
              position: 'top-right',
              duration: Number(2500),
              color: 'danger',
            })
          })
      }

      function showLoader() {
        setTimeout(() => {
          showSkeleton.value = false
        }, 500)
      }

      // getting params and state from route
      function getParams() {
        buildingName.value = window.history.state.buildingName
        totalFloors.value = window.history.state.totalFloors
        buildingManager.value = window.history.state.managerId
        buildingId.value = window.history.state.buildingId
        floorId.value = window.history.state.floorId
      }

      // fetching all units
      function getAllUnits() {
        var data = JSON.stringify({
          page: currentPage.value,
          limit: perPage.value,
          search: '',
          clusterId: null,
          communityId: null,
          unitGroupId: null,
          floorId: route.params.floorId,
        })
        temp
          .getAllUnits(data)
          .then((response) => {
            units.value = response.data.data.unit_data
            if (perPage.value && perPage.value !== 0)
              totalPages.value = Math.ceil(response.data.data.state.data_count / perPage.value)
            else totalPages.value = units.value.length
            isTableLoading.value = false

            if (units.value.length === 0) totalPages.value = 1
          })
          .catch((error) => {
            // console.log(error.response)
            isTableLoading.value = false
            init({
              message: `${error.response.data.message}`,
              position: 'top-right',
              duration: Number(2500),
              color: 'danger',
            })
          })
      }

      function pages() {
        return perPage.value && perPage.value !== 0 ? Math.ceil(units.value.length / perPage.value) : units.value.length
      }

      showLoader()
      getParams()
      getAllUnits()
      pages()
      return {
        users,
        showBlurredModal,
        t,
        showSkeleton,
        buildingName,
        totalFloors,
        buildingManager,
        buildingId,
        units,
        perPage,
        currentPage,
        isTableLoading,
        columns,
        popover,
        floorId,
        totalPages,
        deleteUnit,
        idToDelete,
        setIdtoDelete,
        getAllUnits,
      }
    },
    // data() {
    //   return {}
    // },
    // computed: {
    //   pages() {
    //     return this.perPage && this.perPage !== 0 ? Math.ceil(this.units.length / this.perPage) : this.units.length
    //   },
    // },
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

  .table-example--pagination {
    display: flex;
    justify-content: center;
  }
</style>
