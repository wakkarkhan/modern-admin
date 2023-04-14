<!-- add units -->
<template>
  <div class="line-maps-page">
    <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
    <div v-else>
      <div class="row">
        <div class="flex md12">
          <div className="d-flex align-items-center" @click="$router.back()">
            <p v-if="isUpdate" style="width: fit-content; cursor: pointer; font-size: 18px">
              <b>&lt; &nbsp; Edit Units </b>
            </p>
            <p v-else style="width: fit-content; cursor: pointer; font-size: 18px"><b>&lt; &nbsp; </b> Add Units</p>
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

      <div class="row">
        <div class="flex sm3 ml-auto">
          <fieldset>
            <va-radio v-model="radioSelectedOption" option="apartment" label="Apartment" />
            <va-radio v-model="radioSelectedOption" option="penthouse" label="Penthouse" />
          </fieldset>
        </div>
      </div>

      <va-card class="flex mb-4 mt-2">
        <!-- <va-card-title>{{ t('tables.basic') }}</va-card-title> -->
        <va-card-content>
          <va-file-upload v-model="advancedList" dropzone />
          <div class="row">
            <!-- Unit No-->
            <div class="flex md4 sm6 xs12">
              Unit No.
              <va-input
                v-model="unitNo"
                :error="!!unitNoErrors.length"
                :error-messages="unitNoErrors"
                class="mt-1"
                @mousedown="
                  () => {
                    unitNoErrors = []
                  }
                "
              />
              <!-- <template #prepend>
                  <p style="width: 100px">Unit No:</p>
                </template> -->
            </div>

            <!-- Bedrooms -->
            <div class="flex md4 sm6 xs12">
              Bedrooms:
              <va-select
                v-model="bedrooms"
                placeholder="Please select.."
                text-by="description"
                track-by="id"
                :options="simpleOptions"
                :error="!!bedroomsErrors.length"
                :error-messages="bedroomsErrors"
                class="mt-1"
                @mousedown="
                  () => {
                    bedroomsErrors = []
                  }
                "
              />

              <!-- <template #prepend>
                 
                  <p style="width: 100px">Bedrooms:</p>
                </template> -->
            </div>

            <!-- Size -->
            <div class="flex md4 sm6 xs12">
              Size:<br />
              <va-input
                v-model="size"
                :error="!!sizeErrors.length"
                :error-messages="sizeErrors"
                class="mt-1"
                style="width: 45%; margin-right: 10px"
                @mousedown="
                  () => {
                    sizeErrors = []
                  }
                "
              />
              <va-select
                v-model="sizeUnit"
                placeholder="Select unit.."
                text-by="description"
                track-by="id"
                :options="sizeUnitOptions"
                :error="!!sizeUnitErrors.length"
                :error-messages="sizeUnitErrors"
                class="mt-1"
                style="width: 50%"
                @mousedown="
                  () => {
                    sizeUnitErrors = []
                  }
                "
              />

              <!-- <template #prepend>
                  <p style="width: 100px">Size:</p>
                </template> -->
            </div>

            <!-- Premise No-->
            <div class="flex md4 sm6 xs12">
              Premise No./ID:
              <va-input
                v-model="premise"
                :error="!!premiseErrors.length"
                :error-messages="premiseErrors"
                class="mt-1"
                @mousedown="
                  () => {
                    premiseErrors = []
                  }
                "
              />
              <!-- <template #prepend>
                
                  <p style="width: 100px">Premise No./ID:</p>
             </template> -->
            </div>

            <!-- Property ID-->
            <div class="flex md4 sm6 xs12">
              Property Id:
              <va-input
                v-model="propertyID"
                :error="!!propertyIDErrors.length"
                :error-messages="propertyIDErrors"
                class="mt-1"
                @mousedown="
                  () => {
                    propertyIDErrors = []
                  }
                "
              />
              <!-- <template #prepend>
                 
                  <p style="width: 100px">Property Id:</p>
                </template> -->
            </div>

            <div class="flex md3 sm6 xs12">
              <va-button
                v-if="isUpdate"
                class="mr-2 mb-2"
                style="width: 100px; margin-top: 20px; border-radius: 5px"
                @click="edit()"
              >
                Update
              </va-button>
              <va-button
                v-else
                class="mr-2 mb-2"
                style="width: 100px; margin-top: 20px; border-radius: 5px"
                @click="add()"
              >
                Add
              </va-button>
            </div>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  // import LineMap from '../../../../components/maps/LineMap.vue'
  // import { lineMapData } from '../../../../data/maps/lineMapData'

  import { ToastPosition, useToast } from 'vuestic-ui'
  // import ToastPositionPicker from './ToastPositionPicker.vue'
  import service from '../../../../../src/auth/service'

  export default {
    setup() {
      const temp = new service()
      const route = useRoute()
      const buildingName = ref('')
      const totalFloors = ref('')
      const buildingManager = ref('')
      const buildingId = ref('')
      const isUpdate = ref(false)
      // const mainCity = ref(lineMapData.mainCity)
      // const homeCity = ref(lineMapData.homeCity)
      // const cities = ref(lineMapData.cities)

      const radioSelectedOption = ref('penthouse')
      const advancedList = ref([])

      const showSkeleton = ref(true)

      const dataToUpdate = ref([])

      const { init } = useToast()

      const unitNo = ref('')
      const bedrooms = ref({
        id: 1,
        description: '',
      })
      const size = ref('')
      const premise = ref('')
      const propertyID = ref('')
      const sizeUnit = ref({
        id: 1,
        description: '',
      })

      const unitNoErrors = ref<string[]>([])
      const bedroomsErrors = ref<string[]>([])
      const sizeErrors = ref<string[]>([])
      const sizeUnitErrors = ref<string[]>([])

      const premiseErrors = ref<string[]>([])
      const propertyIDErrors = ref<string[]>([])

      const simpleOptions = ref([
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

      const sizeUnitOptions = ref([
        {
          id: 1,
          description: 'meter',
        },
        {
          id: 2,
          description: 'square Meter',
        },
      ])

      const toastText = ref('Unit added successfully!')
      const toastDuration = ref(2500)
      const toastPosition = ref<ToastPosition>('top-right')

      function add() {
        let temp1
        if (sizeUnit.value.description === 'meter') {
          temp1 = 0
        } else temp1 = 1
        if (
          unitNo.value != '' &&
          bedrooms.value.description != '' &&
          size.value != '' &&
          sizeUnit.value.description != '' &&
          premise.value != '' &&
          propertyID.value != ''
        ) {
          var data = JSON.stringify({
            unitNo: unitNo.value,
            bedrooms: bedrooms.value.description,
            size: size.value,
            sizeType: temp1,
            images: advancedList.value,

            unitType: radioSelectedOption.value,
            otherName: '',
            premiseNo: premise.value,
            floorId: route.params.floorId,
            buildingId: route.params.buildingId,
            communityId: null,
            clusterId: null,
            managerId: propertyID.value,
          })

          temp
            .addUnits(data)
            .then((response) => {
              init({
                message: toastText.value,
                position: toastPosition.value,
                duration: Number(toastDuration.value),
                color: 'primary',
              })

              window.history.go(-1)

              console.log(response.data.data)

              // setLogin.setToken(response.data.access_token)
              // service.setRefreshToken(response.data.refresh_token)
            })
            .catch((error) => {
              console.log(error.response)
            })

          // unitNo.value = ''
          // bedrooms.value.description = ''
          // size.value = ''
          // premise.value = ''
          // propertyID.value = ''
          //  advancedList.value = ''
        } else {
          if (unitNo.value === '') unitNoErrors.value = unitNo.value ? [] : ['This field is required']
          if (bedrooms.value.description === '')
            bedroomsErrors.value = bedrooms.value.description ? [] : ['This field is required']
          if (size.value === '') sizeErrors.value = size.value ? [] : ['This field is required']
          if (sizeUnit.value.description === '')
            sizeUnitErrors.value = sizeUnit.value.description ? [] : ['This field is required']

          if (premise.value === '') premiseErrors.value = premise.value ? [] : ['This field is required']
          if (propertyID.value === '') propertyIDErrors.value = propertyID.value ? [] : ['This field is required']

          // init({
          //   message: 'Please fill all the fields first',
          //   position: 'top-right',
          //   duration: Number(2500),
          //   color: 'danger',
          // })
        }
      }

      function edit() {
        let temp1
        if (sizeUnit.value.description === 'meter') {
          temp1 = 0
        } else temp1 = 1
        if (
          unitNo.value != '' &&
          bedrooms.value.description != '' &&
          size.value != '' &&
          sizeUnit.value.description != '' &&
          premise.value != '' &&
          propertyID.value != ''
        ) {
          var data = JSON.stringify({
            id: window.history.state.unitId,
            unitNo: unitNo.value,
            bedrooms: bedrooms.value.description,
            size: size.value,
            sizeType: temp1,
            images: advancedList.value,

            unitType: radioSelectedOption.value,
            otherName: 'OP',
            premiseNo: premise.value,
            floorId: route.params.floorId,
            buildingId: route.params.buildingId,
            communityId: null,
            clusterId: null,
            managerId: propertyID.value,
          })

          temp
            .editUnit(data)
            .then((response) => {
              init({
                message: toastText.value,
                position: toastPosition.value,
                duration: Number(toastDuration.value),
                color: 'primary',
              })

              window.history.go(-1)

              console.log(response.data.data)

              // setLogin.setToken(response.data.access_token)
              // service.setRefreshToken(response.data.refresh_token)
            })
            .catch((error) => {
              console.log(error.response)
            })

          // unitNo.value = ''
          // bedrooms.value.description = ''
          // size.value = ''
          // premise.value = ''
          // propertyID.value = ''
          //  advancedList.value = ''
        } else {
          if (unitNo.value === '') unitNoErrors.value = unitNo.value ? [] : ['This field is required']
          if (bedrooms.value.description === '')
            bedroomsErrors.value = bedrooms.value.description ? [] : ['This field is required']
          if (size.value === '') sizeErrors.value = size.value ? [] : ['This field is required']
          if (sizeUnit.value.description === '')
            sizeUnitErrors.value = sizeUnit.value.description ? [] : ['This field is required']

          if (premise.value === '') premiseErrors.value = premise.value ? [] : ['This field is required']
          if (propertyID.value === '') propertyIDErrors.value = propertyID.value ? [] : ['This field is required']

          // init({
          //   message: 'Please fill all the fields first',
          //   position: 'top-right',
          //   duration: Number(2500),
          //   color: 'danger',
          // })
        }
      }

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
        if (window.history.state.unitId != undefined) {
          isUpdate.value = true
          getUnitById()
        } else {
          isUpdate.value = false
        }
      }

      function getUnitById() {
        temp
          .getUnit(window.history.state.unitId)
          .then((response) => {
            dataToUpdate.value = response.data.data

            unitNo.value = response.data.data.unitNo
            bedrooms.value.description = response.data.data.bedrooms
            size.value = response.data.data.size
            premise.value = response.data.data.premiseNo
            propertyID.value = response.data.data.managerId
            sizeUnit.value = response.data.data.sizeType
            radioSelectedOption.value = response.data.data.unitType
          })
          .catch()
      }

      showLoader()
      getParams()

      return {
        unitNo,
        bedrooms,
        size,
        premise,
        propertyID,
        unitNoErrors,
        bedroomsErrors,
        sizeErrors,
        premiseErrors,
        propertyIDErrors,
        simpleOptions,
        advancedList,
        add,
        radioSelectedOption,
        showSkeleton,
        buildingName,
        totalFloors,
        buildingManager,
        sizeUnitOptions,
        sizeUnit,
        sizeUnitErrors,
        isUpdate,
        edit,
      }
    },
    // data() {
    //   return {
    //     // showSkeleton: true,
    //   }
    // },
    // mounted() {
    //   // setTimeout(() => {
    //   //   showSkeleton.value = false
    //   // }, 500)
    // },
  }
</script>

<style lang="scss">
  .line-maps-page__widget {
    .va-card__inner {
      border-radius: inherit;
    }
  }
</style>
