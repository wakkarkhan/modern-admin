<!-- add units -->
<template>
  <div class="line-maps-page">
    <!-- <VaSkeletonGroup v-if="showSkeleton === true">
      <VaCard>
        <VaSkeleton variant="squared" height="120px" />
        <va-card-content style="display: flex; align-items: center">
          <VaSkeleton variant="circle" width="1rem" height="48px" />
          <VaSkeleton variant="text" class="ml-2" :lines="2" />
        </va-card-content>
        <va-card-content>
          <VaSkeleton variant="text" :lines="4" text-width="50%" />
        </va-card-content>
        <va-card-actions style="display: flex; justify-content: end">
          <VaSkeleton class="mr-2" variant="rounded" inline width="64px" height="32px" />
          <VaSkeleton variant="rounded" inline width="64px" height="32px" />
        </va-card-actions>
      </VaCard>
    </VaSkeletonGroup> -->
    <va-inner-loading v-if="showSkeleton" loading :size="60" style="justify-content: center; margin-top: 300px" />
    <div v-else>
      <div class="row">
        <div class="flex md12">
          <div className="d-flex align-items-center" @click="$router.back()">
            <h5 style="width: fit-content; cursor: pointer"><b>&lt; &nbsp;</b> Add Units</h5>
          </div>
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

      <div class="row">
        <div class="flex sm3 ml-auto">
          <fieldset>
            <va-radio v-model="radioSelectedOption" option="option1" label="Apartment" />
            <va-radio v-model="radioSelectedOption" option="option2" label="Penthouse" />
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
              <va-input v-model="unitNo">
                <template #prepend>
                  <p style="width: 100px">Unit No:</p>
                </template>
              </va-input>
            </div>

            <!-- Bedrooms -->
            <div class="flex md4 sm6 xs12">
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

            <!-- Size -->
            <div class="flex md4 sm6 xs12">
              <va-select
                v-model="size"
                placeholder="Please select.."
                searchable
                text-by="description"
                track-by="id"
                :options="simpleOptions"
              >
                <template #prepend>
                  <!-- <va-icon color="gray" name="envelope" /> -->
                  <p style="width: 100px">Size:</p>
                </template>
              </va-select>
            </div>

            <!-- Premise No-->
            <div class="flex md4 sm6 xs12">
              <va-input v-model="premise">
                <template #prepend>
                  <!-- <va-icon color="gray" name="envelope" /> -->
                  <p style="width: 100px">Premise No./ID:</p>
                </template>
              </va-input>
            </div>

            <!-- Property ID-->
            <div class="flex md4 sm6 xs12">
              <va-input v-model="propertyID">
                <template #prepend>
                  <!-- <va-icon color="gray" name="envelope" /> -->
                  <p style="width: 100px">Property Id:</p>
                </template>
              </va-input>
            </div>

            <div class="flex md3 sm6 xs12">
              <va-button class="mr-2 mb-2" style="width: 100px" @click="launchToast"> Add </va-button>
            </div>
          </div>
        </va-card-content>
      </va-card>

      <!-- <div class="row">
      <div class="flex md12 xs12">

        <va-card class="line-maps-page__widget" title="Line Maps">
          <line-map v-model="mainCity" :map-data="cities" :home-city="homeCity" style="height: 75vh" />
        </va-card>
      </div>
    </div>  -->
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'

  import LineMap from '../../../../components/maps/LineMap.vue'
  import { lineMapData } from '../../../../data/maps/lineMapData'

  import { ToastPosition, useToast } from 'vuestic-ui'
  // import ToastPositionPicker from './ToastPositionPicker.vue'

  export default {
    setup() {
      const mainCity = ref(lineMapData.mainCity)
      const homeCity = ref(lineMapData.homeCity)
      const cities = ref(lineMapData.cities)

      const radioSelectedOption = ref('option1')
      const advancedList = ref('')

      const showSkeleton = ref(true)

      const { init } = useToast()

      const unitNo = ref('')
      const bedrooms = ref('')
      const size = ref('')
      const premise = ref('')
      const propertyID = ref('')

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

      const toastText = ref('Unit added successfully!')
      const toastDuration = ref(2500)
      const toastPosition = ref<ToastPosition>('top-right')

      function launchToast() {
        if (
          unitNo.value != '' &&
          bedrooms.value != '' &&
          size.value != '' &&
          premise.value != '' &&
          propertyID.value != '' &&
          advancedList.value != ''
        ) {
          init({
            message: toastText.value,
            position: toastPosition.value,
            duration: Number(toastDuration.value),
            color: 'success',
          })

          unitNo.value = ''
          bedrooms.value = ''
          size.value = ''
          premise.value = ''
          propertyID.value = ''
          //  advancedList.value = ''
        } else {
          init({
            message: 'Please fill all the fields first',
            position: 'top-right',
            duration: Number(2500),
            color: 'danger',
          })
        }
      }

      function showLoader() {
        setTimeout(() => {
          showSkeleton.value = false
        }, 500)
      }

      showLoader()
      return {
        unitNo,
        bedrooms,
        size,
        premise,
        propertyID,
        simpleOptions,
        advancedList,
        launchToast,
        radioSelectedOption,
        showSkeleton,
      }
    },
    data() {
      return {
        // showSkeleton: true,
      }
    },
    mounted() {
      // setTimeout(() => {
      //   showSkeleton.value = false
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
</style>
