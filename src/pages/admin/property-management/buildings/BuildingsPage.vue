<!-- Buildings -->
<template>
  <div class="markup-tables flex">
    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center">
          <p style="width: fit-content; cursor: pointer; font-size: 18px"><b>&lt; &nbsp;Property Management</b></p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="flex md6">
        <p class="mt-3 mb-2" style="font-size: 22px; font-weight: 500"><b>Buildings</b></p>
      </div>

      <!-- Go to manage buildings screen -->
      <div class="flex md6 ml-auto mt-3" style="text-align: end">
        <va-button preset="plain" icon-right="fa-arrow-circle-right" size="large" :to="{ name: 'manage-buildings' }">
          Manage Buildings
        </va-button>
      </div>
    </div>

    <!-- Total Buildings -->
    <div class="row">
      <div class="flex xs12 sm6 md2">
        <va-card stripe stripe-color="primary">
          <va-card-content>
            <div class="row">
              <div class="flex xs5">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px">
                  <i class="fa fa-building fa-lg" color="#7367F0" size="large"></i>
                </div>
              </div>

              <div class="flex xs7">
                <h2 class="va-h5 ma-0">{{ totalBuildings }}</h2>
                <p class="">Buildings</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
      <!-- units card -->
      <div class="flex xs12 sm6 md2">
        <va-card stripe stripe-color="primary">
          <va-card-content>
            <div class="row">
              <div class="flex xs5">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 12px">
                  <i class="fa fa-cubes fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <h2 class="va-h5 ma-0">34</h2>
                <p class="">Units</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>

    <!-- Search Filters -->
    <div class="row mb-3">
      <!-- Develpoment -->
      <div class="flex md3 sm6 xs12">
        <va-select
          v-model="development"
          placeholder="Please select.."
          searchable
          text-by="description"
          track-by="id"
          :options="developmentOptions"
        >
          <template #prepend>
            <p style="width: 100px">Development:</p>
          </template>
        </va-select>
      </div>
      <!-- Unit ID -->
      <div class="flex md3 sm6 xs12">
        <va-input v-model="unitID">
          <template #prepend>
            <p style="width: 80px">Unit ID:</p>
          </template>
        </va-input>
      </div>
      <!-- Unit Type -->
      <div class="flex md3 sm6 xs12">
        <va-select
          v-model="unitType"
          placeholder="Please select.."
          text-by="description"
          track-by="id"
          :options="unitTypeOptions"
        >
          <template #prepend>
            <p style="width: 100px">Unit Type:</p>
          </template>
        </va-select>
      </div>
      <!-- Unit No. -->
      <div class="flex md3 sm6 xs12">
        <va-input v-model="unitNo">
          <template #prepend>
            <p style="width: 100px">Unit No:</p>
          </template>
        </va-input>
      </div>
      <!-- Bedrooms -->
      <div class="flex md3 sm6 xs12">
        <va-select
          v-model="bedrooms"
          placeholder="Please select.."
          text-by="description"
          track-by="id"
          :options="bedroomsOptions"
        >
          <template #prepend>
            <p style="width: 100px">Bedrooms:</p>
          </template>
        </va-select>
      </div>

      <!-- Occupancy -->
      <div class="flex md3 sm6 xs12">
        <va-select
          v-model="occupancy"
          placeholder="Please select.."
          text-by="description"
          track-by="id"
          :options="occupancyOptions"
        >
          <template #prepend>
            <p style="width: 80px">Occupancy:</p>
          </template>
        </va-select>
      </div>
      <!-- Building Manager-->
      <div class="flex md3 sm6 xs12">
        <va-select
          v-model="buildManager"
          placeholder="Please select.."
          text-by="description"
          track-by="id"
          :options="buildManagerOptions"
        >
          <template #prepend>
            <p style="width: 100px">Building Manager:</p>
          </template>
        </va-select>
      </div>
      <!-- Property Manager -->
      <div class="flex md3 sm6 xs12">
        <va-select
          v-model="propertyManager"
          placeholder="Please select.."
          text-by="description"
          track-by="id"
          :options="propertyManagerOptions"
        >
          <template #prepend>
            <p style="width: 100px">Property Manager:</p>
          </template>
        </va-select>
      </div>
    </div>

    <!-- All Buildings Table -->
    <va-card class="flex mb-4 mt-3">
      <va-card-content>
        <div class="row buildings-list">
          <div class="flex xs8 pt-0">
            <p style="font-size: 20px"><b>All Buildings</b></p>
          </div>
          <div class="flex xs4 pt-0 text-end">
            <va-input
              v-model="searchFilter"
              class="flex flex-col mb-2"
              placeholder="Filter..."
              @input="
                () => {
                  buildings.filter(() => {
                    return buildings
                  })
                }
              "
            />
          </div>
        </div>
        <va-data-table
          :items="buildings"
          :columns="columns"
          :current-page="currentPage"
          :loading="isTableLoading"
          :filter="filter"
          @filtered="filteredCount = $event.items.length"
        >
          <template #bodyAppend>
            <tr class="">
              <td colspan="12">
                <div class="table-example--pagination mt-4">
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
                            getBuildings()
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
                            getBuildings()
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
                            getBuildings()
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
                            getBuildings()
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
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
  import { ref, Suspense } from 'vue'
  import { useI18n } from 'vue-i18n'

  import service from '../../../../../src/auth/service'
  import debounce from 'lodash/debounce.js'

  import { ToastPosition, useToast } from 'vuestic-ui'

  export default {
    setup() {
      const users = ref('')
      const { t } = useI18n()
      const temp = new service()

      const { init } = useToast()

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

      const developmentOptions = ref([
        {
          id: 1,
          description: 'Building A',
        },
        {
          id: 2,
          description: 'Building B',
        },
        {
          id: 3,
          description: 'Building C',
        },
      ])

      const unitTypeOptions = ref([
        {
          id: 1,
          description: '0',
        },
        {
          id: 2,
          description: '1',
        },
      ])

      const bedroomsOptions = ref([
        {
          id: 1,
          description: '1',
        },
        {
          id: 2,
          description: '2',
        },
        {
          id: 3,
          description: '3',
        },
        {
          id: 4,
          description: '4',
        },
        {
          id: 5,
          description: '5',
        },
      ])

      const occupancyOptions = ref([
        {
          id: 1,
          description: 'vacant',
        },
        {
          id: 2,
          description: 'occupied',
        },
      ])

      const buildManagerOptions = ref([
        {
          id: 1,
          description: 'Manager A',
        },
        {
          id: 2,
          description: 'Manager B',
        },
        {
          id: 3,
          description: 'Manager C',
        },
      ])

      const propertyManagerOptions = ref([
        {
          id: 1,
          description: 'Manager A',
        },
        {
          id: 2,
          description: 'Manager B',
        },
        {
          id: 3,
          description: 'Manager C',
        },
      ])

      const totalBuildings = ref('')

      const development = ref('')
      const unitID = ref('')
      const unitType = ref('')
      const unitNo = ref('')
      const bedrooms = ref('')
      const occupancy = ref('')
      const buildManager = ref('')
      const propertyManager = ref('')

      const searchFilter = ref('')

      const input = ref('')

      const showSkeleton = ref(true)
      const isTableLoading = ref(true)

      const buildings = ref([])
      const perPage = ref(10)
      const currentPage = ref(1)
      const totalPages = ref(1)

      const columns = [
        { key: 'name', label: 'Development name', sortable: true },
        { key: 'totalFloors', label: 'Floors', sortable: true },
        { key: 'id', label: 'Unit ID', sortable: true },
        { key: 'type', label: 'Unit Type', sortable: true },
        { key: 'id', label: 'Unit No', sortable: true },
        { key: 'totalFloors', sortable: true },
        { key: 'totalProperties', label: 'total properties', sortable: true },
        { key: 'managerId', label: 'building manager', sortable: true },
        { key: 'managerId', label: 'building manager', sortable: true },
      ]

      function showLoader() {
        setTimeout(() => {
          showSkeleton.value = false
        }, 500)
      }

      // fetching buildings
      function getBuildings() {
        var data = JSON.stringify({
          page: currentPage.value,
          limit: perPage.value,
          type: 0,
          search: '',
        })
        temp
          .getAllBuildings(data)
          .then((response) => {
            buildings.value = response.data.data.building_data
            totalBuildings.value = response.data.data.state.data_count

            if (perPage.value && perPage.value !== 0)
              totalPages.value = Math.ceil(response.data.data.state.data_count / perPage.value)
            else totalPages.value = buildings.value.length

            isTableLoading.value = false

            if (buildings.value.length === 0) totalPages.value = 1
          })
          .catch((error) => {
            console.log(error.response)
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
        return perPage.value && perPage.value !== 0
          ? Math.ceil(buildings.value.length / perPage.value)
          : buildings.value.length
      }

      showLoader()
      getBuildings()
      pages()
      return {
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
        buildings,
        columns,
        perPage,
        currentPage,
        developmentOptions,
        unitTypeOptions,
        bedroomsOptions,
        occupancyOptions,
        buildManagerOptions,
        propertyManagerOptions,
        isTableLoading,
        totalPages,
        input,
        filter: searchFilter,
        isDebounceInput: false,
        useCustomFilteringFn: false,
        filteredCount: buildings.value.length,
        searchFilter: searchFilter,
        getBuildings,
        totalBuildings,
      }
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

  .table-example--pagination {
    display: flex;
    justify-content: center;
  }

  .va-input-wrapper--solid .va-input-wrapper__field {
    border: 1px solid lightgrey;
  }

  .va-input-wrapper {
    --va-input-wrapper-background: transparent;
  }

  .buildings-list {
    align-items: baseline;
  }
</style>
