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
            <div class="row">
              <div class="flex xs3">
                <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 15px 15px">
                  <!-- <va-icon class="" name="home" color="#7367F0" size="large" /> -->
                  <i class="fa fa-building fa-lg" size="large"></i>
                </div>
              </div>
              <div class="flex xs7">
                <p class="pt-3" style="font-size: 18px">{{ buildingName }}</p>
              </div>
            </div>
            <!-- <p class="rich-theme-card-text">{{ buildingName }}</p> -->
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
                  <!-- <va-icon class="" name="home" color="#7367F0" size="large" /> -->
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
                  <!-- <va-icon class="" name="home" color="#7367F0" size="large" /> -->
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

    <div class="row">
      <div class="flex md12 xs12">
        <va-accordion v-model="customHeaderAccordionValue">
          <va-collapse class="mb-2">
            <template #header>
              <div class="row">
                <div class="flex xs2">
                  <va-button style="width: fit-content; border-radius: 5px"> Add Building </va-button>
                </div>
              </div>
            </template>
            <!-- <template #header>
              <va-button style="width: 100%"> Add New Floor </va-button>
            </template> -->
            <div class="my-3 pb-3">
              <!-- <va-card-content> -->
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
                    <!-- <template #prepend>
                     
                      <p style="width: 100px">Floor:</p>
                    </template> -->
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
        <!-- </va-card-content> -->
      </div>
    </div>

    <va-card class="flex my-3">
      <!-- <va-card-title>{{ t('tables.basic') }}</va-card-title> -->
      <va-card-content>
        <div class="row">
          <div class="flex xs12 pt-0">
            <p style="font-size: 20px"><b>All Buildings</b></p>
          </div>
        </div>
        <va-data-table
          :items="floorsList"
          :columns="columns"
          :per-page="10"
          :current-page="currentPage"
          :loading="isTableLoading"
        >
          <!-- <template #cell(empty)>
            <h5>No records found</h5>
          </template> -->

          <!-- <template #cell(#)> </template> -->

          <template #cell(actions)="{ rowData }">
            <!-- <va-button class="mr-2 mb-2" color="dark" :to="{ name: 'bubble-maps' }">Units</va-button>
                  </va-popover>
                  <va-button class="mr-2 mb-2" color="warning"> Rename</va-button>
                  <va-button class="mr-2 mb-2" color="danger" @click="showBlurredModal = true"> Delete</va-button> -->

            <va-popover :color="popover.color" :message="popover.message" placement="top" open>
              <router-link
                :to="{
                  name: 'bubble-maps',
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
                  <va-pagination v-model="currentPage" input :pages="totalPages" />
                </div>
              </td>
            </tr>
          </template>
        </va-data-table>
        <!-- <div class="table-wrapper">
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
        </div> -->
      </va-card-content>
    </va-card>

    <va-modal
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

  // No TS declarations are provided - ignoring the error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // import { yandexMap as YandexMap, ymapMarker as YandexMapMarker } from 'vue-yandex-maps'
  import { ToastPosition, useToast } from 'vuestic-ui'
  // import ToastPositionPicker from './ToastPositionPicker.vue'
  import { useI18n } from 'vue-i18n'
  import service from '../../../../../src/auth/service'

  export default {
    setup() {
      const temp = new service()
      const route = useRoute()
      const { t } = useI18n()

      // const markers = ref([
      //   {
      //     'marker-id': 0,
      //     coords: [54.8, 38.9],
      //     clusterName: '1',
      //     balloonTemplate: '<div>"Your custom template"</div>',
      //   },
      // ])

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

      const columns = [
        // { key: '#', label: '#', sortable: true },
        { key: 'name', label: 'Floors', sortable: true },
        { key: 'totalProperties', label: 'Properties', sortable: true },
        { key: 'managerId', label: 'Property Manager', sortable: true },
        { key: 'actions', label: '', sortable: true },
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

              console.log(response.data.data)

              // setLogin.setToken(response.data.access_token)
              // service.setRefreshToken(response.data.refresh_token)
            })
            .catch((error) => {
              console.log(error.response)
            })
          init({
            message: toastText.value,
            position: toastPosition.value,
            duration: Number(toastDuration.value),
            color: 'primary',
          })

          customHeaderAccordionValue.value = false
          floor.value = ''
        } else {
          if (floor.value === '') floorErrors.value = floor.value ? [] : ['This field is required']
          // init({
          //   message: 'Please first fill floor value',
          //   position: 'top-right',
          //   duration: Number(2500),
          //   color: 'danger',
          // })
        }
      }

      const idToDelete = ref('')

      function setIdtoDelete(id: string) {
        idToDelete.value = id
      }

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
          .catch()
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

      function getParams() {
        buildingName.value = window.history.state.buildingName
        totalFloors.value = window.history.state.totalFloors
        buildingManager.value = window.history.state.managerId
        buildingId.value = window.history.state.buildingId
      }
      function getAllFloors() {
        // for query
        // let data = {
        //   params: {
        //     buildingId: route.params.buildingId,
        //   },
        // }

        var data = JSON.stringify({
          page: currentPage.value,
          limit: 100,
          buildingId: route.params.buildingId,
        })
        temp
          .getAllFloors(data)
          .then((response) => {
            floorsList.value = response.data.data.floor_data

            if (perPage.value && perPage.value !== 0)
              totalPages.value = Math.ceil(floorsList.value.length / perPage.value)
            else totalPages.value = floorsList.value.length
            isTableLoading.value = false

            if (floorsList.value.length === 0) totalPages.value = 1
          })
          .catch((error) => {
            console.log(error.response)
            isTableLoading.value = false
          })
      }
      function pages() {
        return perPage.value && perPage.value !== 0
          ? Math.ceil(floorsList.value.length / perPage.value)
          : floorsList.value.length
      }

      const recordToUpdate = ref('')

      function setRecordToUpdate(temp: string, id: string) {
        console.log()
        floor.value = temp
        recordToUpdate.value = id
      }

      function updateFloor() {
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
          })
          .catch()
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
      }
    },
    // data() {
    //   return {}
    // },
    // computed: {
    //   pages() {
    //     return this.perPage && this.perPage !== 0
    //       ? Math.ceil(this.floorsList.length / this.perPage)
    //       : this.floorsList.length
    //   },
    // },
    // mounted() {
    //   // setTimeout(() => {
    //   //   this.showSkeleton = false
    //   // }, 500)
    // },
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
</style>
