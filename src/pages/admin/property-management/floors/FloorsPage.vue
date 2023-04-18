<template>
  <!-- Floors -->
  <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
  <div v-else class="yandex-maps-page">
    <div class="row">
      <div class="flex md12">
        <div className="d-flex align-items-center" @click="$router.back()">
          <p style="width: fit-content; cursor: pointer; font-size: 18px"><b>&lt; &nbsp;Floors</b></p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="flex xs12 sm6 md3">
        <va-card stripe stripe-color="primary">
          <va-card-title> Building Name </va-card-title>
          <va-card-content>
            <div class="row card-details">
              <div class="flex xs3">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 15px">
                  <i class="fa fa-building fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <p class="" style="font-size: 18px">{{ buildingName }}</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>

      <div class="flex xs12 sm6 md3">
        <va-card stripe stripe-color="primary">
          <va-card-title> Total Floors </va-card-title>
          <va-card-content>
            <div class="row card-details">
              <div class="flex xs3">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 15px">
                  <i class="fa fa-th fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <p class="" style="font-size: 18px">{{ totalFloors }}</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>

      <div class="flex xs12 sm6 md3">
        <va-card stripe stripe-color="primary">
          <va-card-title> Building Manager </va-card-title>
          <va-card-content>
            <div class="row card-details">
              <div class="flex xs3">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 15px">
                  <i class="fa fa-user fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <p class="" style="font-size: 18px">{{ buildingManager }}</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>

    <div class="row">
      <div class="flex md12 xs12">
        <va-accordion v-model="customHeaderAccordionValue">
          <va-collapse class="mb-2">
            <template #header>
              <div class="row">
                <div class="flex xs12">
                  <va-button style="width: fit-content; border-radius: 5px"> Add Floor </va-button>
                </div>
              </div>
            </template>

            <div class="my-3 pb-3">
              <div class="my-2" style="background-color: white">
                <div class="row mx-2 my-2 py-2">
                  <!-- Building Name-->
                  <div class="flex md3 sm6 xs12">
                    Floor:
                    <va-input
                      v-model="floor"
                      :error="!!floorErrors.length"
                      :error-messages="floorErrors"
                      class="mt-1"
                      @mousedown="
                        () => {
                          floorErrors = []
                        }
                      "
                    />
                  </div>

                  <div class="flex md3 sm6 xs12" style="">
                    <va-button
                      class="mr-2 mb-2"
                      style="width: 100px; margin-top: 20px; border-radius: 5px"
                      @click="add"
                    >
                      Add</va-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </va-collapse>
        </va-accordion>
      </div>
    </div>

    <va-card class="flex my-3">
      <va-card-content>
        <div class="row">
          <div class="flex xs12 pt-0">
            <p style="font-size: 20px"><b>All Floors</b></p>
          </div>
        </div>
        <va-data-table :items="floorsList" :columns="columns" :current-page="currentPage" :loading="isTableLoading">
          <template #cell(actions)="{ rowData }">
            <va-popover :color="popover.color" :message="popover.message" placement="top" open>
              <router-link
                :to="{
                  name: 'units',
                  params: { buildingId: buildingId, floorId: rowData._id },
                  state: {
                    totalFloors: totalFloors,
                    managerId: buildingManager,
                    buildingName: buildingName,
                    buildingId: buildingId,
                    floorId: rowData._id,
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
                    setRecordToUpdate(rowData.name, rowData._id)
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
                            getAllFloors()
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
                            getAllFloors()
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
                            getAllFloors()
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
                            getAllFloors()
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
      ref="modal"
      v-model="showBlurredModal"
      message="Are you sure you want to delete this floor ??"
      :ok-text="t('modal.confirm')"
      :cancel-text="t('modal.cancel')"
      blur
      @ok="deleteFloor()"
    />

    <va-modal
      v-model="showEditModal"
      ok-text="Update"
      :cancel-text="t('modal.cancel')"
      blur
      @ok="updateFloor()"
      @cancel="floor = ''"
    >
      <div class="row mx-2 my-2 py-2">
        <!-- Building Name-->
        <div class="flex md12 sm6 xs12">
          Floor:
          <va-input
            v-model="floor"
            :error="!!floorErrors.length"
            :error-messages="floorErrors"
            class="mt-1"
            @mousedown="
              () => {
                floorErrors = []
              }
            "
          />
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { ToastPosition, useToast } from 'vuestic-ui'

  import { useI18n } from 'vue-i18n'
  import service from '../../../../../src/auth/service'

  export default {
    setup() {
      const temp = new service()
      const route = useRoute()
      const { t } = useI18n()

      const showSkeleton = ref(true)
      const floor = ref('')
      const customHeaderAccordionValue = ref(false)
      const showBlurredModal = ref(false)
      const { init } = useToast()
      const toastText = ref('Floor added successfully!')
      const toastDuration = ref(2500)
      const toastPosition = ref<ToastPosition>('top-right')

      const buildingName = ref('')
      const totalFloors = ref('')
      const buildingManager = ref('')
      const buildingId = ref('')

      const floorErrors = ref<string[]>([])

      const floorsList = ref([])
      const perPage = ref(10)

      const currentPage = ref(1)
      const totalPages = ref(1)

      const isTableLoading = ref(true)
      const showEditModal = ref(false)

      const totalRecordsToCompare = ref('')
      const floorsListTest = ref([])

      const columns = [
        { key: 'name', label: 'Floors', sortable: true },
        { key: 'totalProperties', label: 'Properties', sortable: true },
        { key: 'managerId', label: 'Property Manager', sortable: true },
        { key: 'actions' },
      ]

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

      // Add Floor
      function add() {
        if (floor.value != '') {
          var data = JSON.stringify({
            name: floor.value,
            managerId: buildingManager.value,
            buildingId: buildingId.value,
          })
          temp
            .addFloor(data)
            .then((response) => {
              isTableLoading.value = true
              getAllFloors()
              // console.log(response.data.data)
              init({
                message: toastText.value,
                position: toastPosition.value,
                duration: Number(toastDuration.value),
                color: 'primary',
              })

              customHeaderAccordionValue.value = false
              floor.value = ''
            })
            .catch((error) => {
              console.log(error.response)
              if (`${error.response.data.message}` === 'Please change floor name, floor name is already exists!')
                init({
                  message: 'Floor name already exists! Please change!',
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
          if (floor.value === '') floorErrors.value = floor.value ? [] : ['This field is required']
        }
      }

      const idToDelete = ref('')

      // setting id value to delete
      function setIdtoDelete(id: string) {
        idToDelete.value = id
      }

      //  deleting floor
      function deleteFloor() {
        console.log(idToDelete.value)
        temp
          .deleteFloor(idToDelete.value)
          .then(() => {
            getAllFloors()
            init({
              message: 'Floor Deleted Successfully',
              position: 'top-right',
              duration: Number(2500),
              color: 'primary',
            })
          })
          .catch((error) => {
            init({
              message: `${error.response.data.message}`,
              position: toastPosition.value,
              duration: Number(toastDuration.value),
              color: 'danger',
            })
          })
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

      // getting params and state from route
      function getParams() {
        buildingName.value = window.history.state.buildingName
        totalFloors.value = window.history.state.totalFloors
        buildingManager.value = window.history.state.managerId
        buildingId.value = window.history.state.buildingId
      }

      //fetching all floors list
      function getAllFloors() {
        var data = JSON.stringify({
          page: currentPage.value,
          limit: perPage.value,
          buildingId: route.params.buildingId,
        })
        isTableLoading.value = false
        temp
          .getAllFloors(data)
          .then((response) => {
            floorsList.value = response.data.data.floor_data

            if (perPage.value && perPage.value !== 0)
              totalPages.value = Math.ceil(response.data.data.state.data_count / perPage.value)
            else totalPages.value = floorsList.value.length
            isTableLoading.value = false

            if (floorsList.value.length === 0) totalPages.value = 1
          })
          .catch((error) => {
            isTableLoading.value = false
            init({
              message: `${error.response.data.message}`,
              position: toastPosition.value,
              duration: Number(toastDuration.value),
              color: 'danger',
            })
          })
      }
      function pages() {
        return perPage.value && perPage.value !== 0
          ? Math.ceil(floorsList.value.length / perPage.value)
          : floorsList.value.length
      }

      const recordToUpdate = ref('')

      //
      function setRecordToUpdate(temp: string, id: string) {
        floor.value = temp
        recordToUpdate.value = id
      }

      //  update record
      function updateFloor() {
        showEditModal.value = true
        var data = JSON.stringify({
          id: recordToUpdate.value,
          managerId: buildingManager.value,
          buildingId: route.params.buildingId,
          name: floor.value,
        })

        temp
          .editFloor(data)
          .then((response) => {
            getAllFloors()
            init({
              message: 'Floor Updated Successfully',
              position: 'top-right',
              duration: Number(2500),
              color: 'primary',
            })
            floor.value = ''
            showEditModal.value = false
          })
          .catch((error) => {
            showEditModal.value = true
            if (`${error.response.data.message}` === 'Please change floor name, floor name is already exists!')
              init({
                message: 'Floor name already exists! Please change!',
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

      showLoader()
      getParams()
      getAllFloors()
      pages()
      return {
        floor,
        customHeaderAccordionValue,
        showBlurredModal,
        users,
        infoTiles,
        popover,
        add,
        t,
        showSkeleton,
        buildingName,
        buildingManager,
        totalFloors,
        columns,
        floorsList,
        currentPage,
        perPage,
        isTableLoading,
        buildingId,
        floorErrors,
        totalPages,
        deleteFloor,
        idToDelete,
        setIdtoDelete,
        showEditModal,
        setRecordToUpdate,
        recordToUpdate,
        updateFloor,
        pages,
        getAllFloors,
        totalRecordsToCompare,
        floorsListTest,
      }
    },
  }
</script>

<style lang="scss">
  .va-table td {
    vertical-align: unset !important;
  }

  .table-example--pagination {
    display: flex;
    justify-content: center;
  }

  .va-collapse__header-wrapper {
    width: fit-content;
  }
  .card-details {
    align-items: center;
  }
</style>
