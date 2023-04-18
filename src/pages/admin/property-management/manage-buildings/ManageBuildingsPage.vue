<!-- Manage Buildings -->
<template>
  <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
  <div v-else class="markup-tables flex">
    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center" @click="$router.back()">
          <p style="width: fit-content; cursor: pointer; font-size: 18px"><b>&lt; &nbsp;Development - Building</b></p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="flex md12 xs12">
        <va-accordion v-model="customHeaderAccordionValue">
          <va-collapse class="mb-3">
            <template #header>
              <div class="row">
                <div class="flex xs12">
                  <va-button style="width: fit-content; border-radius: 5px"> Add Building </va-button>
                </div>
              </div>
            </template>
            <div class="my-3 pb-3">
              <div class="my-2" style="background-color: white">
                <div class="row mx-2 my-2 py-2">
                  <!-- Building Name-->
                  <div class="flex md3 sm6 xs12">
                    Building Name:
                    <va-input
                      v-model="buildName"
                      :error="!!buildNameErrors.length"
                      :error-messages="buildNameErrors"
                      class="mt-1"
                      @mousedown="
                        () => {
                          buildNameErrors = []
                        }
                      "
                    />
                  </div>

                  <!-- Total Floors -->
                  <div class="flex md3 sm6 xs12">
                    Total Floors:

                    <va-input
                      v-model="totalFloors"
                      :error="!!totalFloorsErrors.length"
                      :error-messages="totalFloorsErrors"
                      class="mt-1"
                      @mousedown="
                        () => {
                          totalFloorsErrors = []
                        }
                      "
                    />
                  </div>

                  <!-- City -->
                  <div class="flex md3 sm6 xs12">
                    City
                    <va-select
                      v-model="city"
                      placeholder="Please select.."
                      text-by="description"
                      track-by="id"
                      :options="cityOptions"
                      :error="!!cityErrors.length"
                      :error-messages="cityErrors"
                      class="mt-1"
                      @mousedown="
                        () => {
                          cityErrors = []
                        }
                      "
                    />
                  </div>

                  <!-- Area -->
                  <div class="flex md3 sm6 xs12">
                    Area:
                    <va-select
                      v-model="area"
                      placeholder="Please select.."
                      text-by="description"
                      track-by="id"
                      :options="areaOptions"
                      :error="!!areaErrors.length"
                      :error-messages="areaErrors"
                      class="mt-1"
                      @mousedown="
                        () => {
                          areaErrors = []
                        }
                      "
                    />
                  </div>

                  <!-- Street-->
                  <div class="flex md3 sm6 xs12">
                    Street:
                    <va-input
                      v-model="street"
                      :error="!!streetErrors.length"
                      :error-messages="streetErrors"
                      class="mt-1"
                      @mousedown="
                        () => {
                          streetErrors = []
                        }
                      "
                    />
                  </div>

                  <!-- Building Manager  -->
                  <div class="flex md3 sm6 xs12">
                    Building Manager:
                    <va-select
                      v-model="buildManager"
                      placeholder="Please select.."
                      text-by="description"
                      track-by="id"
                      :options="buildManagerOptions"
                      :error="!!buildManagerErrors.length"
                      :error-messages="buildManagerErrors"
                      class="mt-1"
                      @mousedown="
                        () => {
                          buildManagerErrors = []
                        }
                      "
                    />
                  </div>

                  <div class="flex md3 sm6 xs12">
                    <va-button class="mx-2" style="width: 100px; margin-top: 20px; border-radius: 5px" @click="add">
                      Add</va-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </va-collapse>
        </va-accordion>

        <va-card class="flex my-3">
          <va-card-content>
            <div class="row">
              <div class="flex xs12 pt-0">
                <p style="font-size: 20px"><b>All Buildings</b></p>
              </div>
            </div>
            <va-data-table :items="buildings" :columns="columns" :current-page="currentPage" :loading="isTableLoading">
              <template #cell(actions)="{ rowData }">
                <va-popover :color="popover.color" :message="popover.message" placement="top" open>
                  <router-link
                    :to="{
                      name: 'floors',
                      params: { buildingId: rowData._id },
                      state: {
                        totalFloors: rowData.totalFloors,
                        managerId: rowData.managerId,
                        buildingName: rowData.name,
                        buildingId: rowData._id,
                      },
                    }"
                  >
                    <va-icon class="mr-2 cursor" name="layers" color="#262824" style="cursor: pointer" />
                  </router-link>
                </va-popover>

                <va-popover :color="popover.color" message="Edit Details" placement="top" open>
                  <va-icon
                    class="mr-2"
                    name="edit"
                    color="#262824"
                    style="cursor: pointer"
                    @click="
                      () => {
                        showEditModal = true
                        setRecordToUpdate(rowData)
                      }
                    "
                  />
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

                <va-modal
                  v-model="showBlurredModal"
                  message="Are you sure you want to delete this building ??"
                  :ok-text="t('modal.confirm')"
                  :cancel-text="t('modal.cancel')"
                  blur
                  @ok="deleteBuilding(rowData._id)"
                />
              </template>

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

        <va-modal
          v-model="showEditModal"
          ok-text="Update"
          :cancel-text="t('modal.cancel')"
          blur
          @ok="updateBuilding()"
          @cancel="reset()"
        >
          <div class="my-3 pb-3">
            <!-- <va-card-content> -->
            <div class="my-2" style="background-color: white">
              <div class="row mx-2 my-2 py-2">
                <!-- Building Name-->
                <div class="flex md3 sm6 xs12 mb-4">
                  Building Name:
                  <va-input
                    v-model="buildName"
                    :error="!!buildNameErrors.length"
                    :error-messages="buildNameErrors"
                    class="mt-1"
                    style="width: 90%"
                    @mousedown="
                      () => {
                        buildNameErrors = []
                      }
                    "
                  />
                </div>

                <!-- Total Floors -->
                <div class="flex md3 sm6 xs12">
                  Total Floors:

                  <va-input
                    v-model="totalFloors"
                    :error="!!totalFloorsErrors.length"
                    :error-messages="totalFloorsErrors"
                    class="mt-1"
                    style="width: 90%"
                    @mousedown="
                      () => {
                        totalFloorsErrors = []
                      }
                    "
                  />
                </div>

                <!-- City -->
                <div class="flex md3 sm6 xs12">
                  City
                  <va-select
                    v-model="city"
                    placeholder="Please select.."
                    text-by="description"
                    track-by="id"
                    :options="cityOptions"
                    :error="!!cityErrors.length"
                    :error-messages="cityErrors"
                    class="mt-1"
                    style="width: 90%"
                    @mousedown="
                      () => {
                        cityErrors = []
                      }
                    "
                  />
                </div>

                <!-- Area -->
                <div class="flex md3 sm6 xs12">
                  Area:
                  <va-select
                    v-model="area"
                    placeholder="Please select.."
                    text-by="description"
                    track-by="id"
                    :options="areaOptions"
                    :error="!!areaErrors.length"
                    :error-messages="areaErrors"
                    class="mt-1"
                    style="width: 90%"
                    @mousedown="
                      () => {
                        areaErrors = []
                      }
                    "
                  />
                </div>

                <!-- Street-->
                <div class="flex md3 sm6 xs12">
                  Street:
                  <va-input
                    v-model="street"
                    :error="!!streetErrors.length"
                    :error-messages="streetErrors"
                    class="mt-1"
                    style="width: 90%"
                    @mousedown="
                      () => {
                        streetErrors = []
                      }
                    "
                  />
                </div>

                <!-- Building Manager  -->
                <div class="flex md3 sm6 xs12">
                  Building Manager:
                  <va-select
                    v-model="buildManager"
                    placeholder="Please select.."
                    text-by="description"
                    track-by="id"
                    :options="buildManagerOptions"
                    :error="!!buildManagerErrors.length"
                    :error-messages="buildManagerErrors"
                    class="mt-1"
                    style="width: 90%"
                    @mousedown="
                      () => {
                        buildManagerErrors = []
                      }
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </va-modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, Suspense, computed } from 'vue'
  import { ToastPosition, useToast } from 'vuestic-ui'
  import { useI18n } from 'vue-i18n'

  import service from '../../../../../src/auth/service'

  export default {
    setup() {
      const { t } = useI18n()
      const customHeaderAccordionValue = ref(false)
      const showBlurredModal = ref(false)
      const showEditModal = ref(false)

      const showSkeleton = ref(true)
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

      const cityOptions = ref([
        {
          id: 1,
          description: 'City A',
        },
        {
          id: 2,
          description: 'City B',
        },
        {
          id: 3,
          description: 'City C',
        },
      ])

      const areaOptions = ref([
        {
          id: 1,
          description: 'Area A',
        },
        {
          id: 2,
          description: 'Area B',
        },
        {
          id: 3,
          description: 'Area C',
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
      const buildManager = ref({
        id: 1,
        description: '',
      })
      const street = ref('')

      const buildNameErrors = ref<string[]>([])
      const totalFloorsErrors = ref<string[]>([])
      const cityErrors = ref<string[]>([])
      const areaErrors = ref<string[]>([])
      const buildManagerErrors = ref<string[]>([])
      const streetErrors = ref<string[]>([])

      const temp = new service()

      const buildings = ref([])
      const perPage = ref(10)
      const currentPage = ref(1)
      const totalPages = ref(1)

      const isTableLoading = ref(true)

      const { init } = useToast()

      const toastText = ref('Building added successfully!')
      const toastDuration = ref(2500)
      const toastPosition = ref<ToastPosition>('top-right')

      const popover = ref({
        message: 'Go to floors',
        color: 'secondary',
      })

      const columns = [
        { key: 'name', label: 'Building name', sortable: true },
        { key: 'totalFloors', label: 'Floors', sortable: true },
        { key: 'totalProperties', label: 'total properties', sortable: true },
        { key: 'managerId', label: 'property manager', sortable: true },
        { key: 'actions', label: '' },
      ]

      // Adding a new building
      function add() {
        if (
          buildName.value != '' &&
          totalFloors.value != '' &&
          city.value != '' &&
          area.value != '' &&
          buildManager.value.description != '' &&
          street.value != ''
        ) {
          var data = JSON.stringify({
            name: buildName.value,
            managerId: buildManager.value.description,
            totalFloors: totalFloors.value,
          })

          temp
            .addBuilding(data)
            .then(() => {
              isTableLoading.value = true
              getBuildings()
              init({
                message: toastText.value,
                position: toastPosition.value,
                duration: Number(toastDuration.value),
                color: 'primary',
              })
              customHeaderAccordionValue.value = false
              buildName.value = ''
              totalFloors.value = ''
              city.value = ''
              area.value = ''
              buildManager.value.description = ''
              street.value = ''
            })
            .catch((error) => {
              if (`${error.response.data.message}` === 'Please change building name, building name is already exists!')
                init({
                  message: 'Building name already exists! Please change!',
                  position: toastPosition.value,
                  duration: Number(toastDuration.value),
                  color: 'danger',
                })
              else
                init({
                  message: `${error.response.data.message}`,
                  position: toastPosition.value,
                  duration: Number(toastDuration.value),
                  color: 'danger',
                })
            })
        } else {
          if (buildName.value === '') buildNameErrors.value = buildName.value ? [] : ['This field is required']
          if (totalFloors.value === '') totalFloorsErrors.value = totalFloors.value ? [] : ['This field is required']
          if (city.value === '') cityErrors.value = city.value ? [] : ['This field is required']
          if (area.value === '') areaErrors.value = area.value ? [] : ['This field is required']
          if (buildManager.value.description === '')
            buildManagerErrors.value = buildManager.value.description ? [] : ['This field is required']
          if (street.value === '') streetErrors.value = street.value ? [] : ['This field is required']
        }
      }

      function showLoader() {
        setTimeout(() => {
          showSkeleton.value = false
        }, 500)
      }

      function pages() {
        return perPage.value && perPage.value !== 0
          ? Math.ceil(buildings.value.length / perPage.value)
          : buildings.value.length
      }

      const idToDelete = ref('')

      // setting id to delete
      function setIdtoDelete(id: string) {
        idToDelete.value = id
      }

      const recordToUpdate = ref({
        _id: '',
        name: '',
        totalFloors: '',
        city: '',
        area: '',
        managerId: '',
        street: '',
      })

      // update building
      function setRecordToUpdate(temp: any) {
        recordToUpdate.value = temp
        buildName.value = recordToUpdate.value.name
        totalFloors.value = recordToUpdate.value.totalFloors
        city.value = recordToUpdate.value.city
        area.value = recordToUpdate.value.area
        buildManager.value.description = recordToUpdate.value.managerId
        street.value = recordToUpdate.value.street
      }

      // deleting a building
      function deleteBuilding() {
        console.log(idToDelete.value)
        temp
          .deleteBuilding(idToDelete.value)
          .then(() => {
            getBuildings()
            init({
              message: 'Building Deleted Successfully',
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

      // fetching all buildings
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
            isTableLoading.value = false
            buildings.value = response.data.data.building_data
            if (perPage.value && perPage.value !== 0)
              totalPages.value = Math.ceil(response.data.data.state.data_count / perPage.value)
            else totalPages.value = buildings.value.length
            // console.log(buildings.value)

            if (buildings.value.length === 0) totalPages.value = 1
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

      // update building
      function updateBuilding() {
        showEditModal.value = true
        var data = JSON.stringify({
          id: recordToUpdate.value._id,
          name: buildName.value,
          managerId: buildManager.value.description,
          totalFloors: totalFloors.value,
        })

        temp
          .editBuilding(data)
          .then((response) => {
            getBuildings()
            showEditModal.value = false
            init({
              message: 'Building Updated Successfully',
              position: 'top-right',
              duration: Number(2500),
              color: 'primary',
            })
            buildName.value = ''
            totalFloors.value = ''
            city.value = ''
            area.value = ''
            buildManager.value.description = ''
            street.value = ''
          })
          .catch((error) => {
            showEditModal.value = true
            if (`${error.response.data.message}` === 'Please change building name, building name is already exists!')
              init({
                message: 'Building name already exists! Please change!',
                position: toastPosition.value,
                duration: Number(toastDuration.value),
                color: 'danger',
              })
            else
              init({
                message: `${error.response.data.message}`,
                position: toastPosition.value,
                duration: Number(toastDuration.value),
                color: 'danger',
              })
          })
      }

      //
      function reset() {
        buildName.value = ''
        totalFloors.value = ''
        city.value = ''
        area.value = ''
        buildManager.value.description = ''
        street.value = ''
      }

      showLoader()
      getBuildings()
      pages()

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
        add,
        t,
        showSkeleton,
        buildings,
        columns,
        perPage,
        currentPage,
        totalPages,
        buildNameErrors,
        totalFloorsErrors,
        cityErrors,
        areaErrors,
        buildManagerErrors,
        streetErrors,
        isTableLoading,
        cityOptions,
        areaOptions,
        buildManagerOptions,
        deleteBuilding,
        idToDelete,
        setIdtoDelete,
        showEditModal,
        setRecordToUpdate,
        recordToUpdate,
        updateBuilding,
        reset,
        getBuildings,
      }
    },
  }
</script>
<style lang="scss">
  .markup-tables {
    .va-table td {
      vertical-align: unset !important;
    }
  }

  .table-example--pagination {
    display: flex;
    justify-content: center;
  }

  .va-collapse__header-wrapper {
    width: fit-content;
  }
</style>
