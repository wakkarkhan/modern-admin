<template>
  <div class="dashboard">
    <div class="row mt-2 mx-2">
      <div class="flex xs12 sm12 md12">
        <va-card :bordered="false">
          <va-card-title><p style="font-size: 20px; text-transform: capitalize" class="mx-3">Summary</p></va-card-title>
          <va-card-content>
            <div class="row row-separated">
              <div class="flex xs3">
                <div
                  style="
                    background: #f3f6f9;
                    border: 2px solid #f4f6fc;
                    border-radius: 10px;
                    padding: 20px 20px;

                    margin: 20px 20px;
                    white-space: nowrap;
                    width: 70%;
                  "
                >
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.primary }">
                    {{ buildingCount }}
                  </h2>
                  <p class="va-text-center">Buildings</p>
                </div>
              </div>

              <div class="flex xs3">
                <div
                  style="
                    background: #f3f6f9;
                    border: 2px solid #f4f6fc;
                    border-radius: 10px;
                    padding: 20px 20px;

                    margin: 20px 20px;
                    white-space: nowrap;
                    width: 70%;
                  "
                >
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.danger }">
                    {{ communitiesCount }}
                  </h2>
                  <p class="va-text-center no-wrap">Communities</p>
                </div>
              </div>
              <div class="flex xs3">
                <div
                  style="
                    background: #f3f6f9;
                    border: 2px solid #f4f6fc;
                    border-radius: 10px;
                    padding: 20px 20px;

                    margin: 20px 20px;
                    white-space: nowrap;
                    width: 70%;
                  "
                >
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.warning }">
                    {{ buildingUnitsCount }}
                  </h2>
                  <p class="va-text-center">Building Units</p>
                </div>
              </div>
              <div class="flex xs3">
                <div
                  style="
                    background: #f3f6f9;
                    border: 2px solid #f4f6fc;
                    border-radius: 10px;
                    padding: 20px 20px;

                    margin: 20px 20px;
                    white-space: nowrap;
                    width: 70%;
                  "
                >
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.info }">
                    {{ CommunityUnitsCount }}
                  </h2>
                  <p class="va-text-center">Community Units</p>
                </div>
              </div>

              <div class="flex xs3">
                <div
                  style="
                    background: #f3f6f9;
                    border: 2px solid #f4f6fc;
                    border-radius: 10px;
                    padding: 20px 20px;
                    margin: 20px 20px;
                    white-space: nowrap;
                    width: 70%;
                  "
                >
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: '#7367F0' }">{{ UnitsCount }}</h2>
                  <p class="va-text-center">Units</p>
                </div>
              </div>
            </div>
          </va-card-content>
        </va-card>

        <!-- <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 10px">
        <va-icon
    class=""
    name="home"
    color="#7367F0"
    size="large"
  />  
</div> <span>25</span> -->

        <!-- <va-card-content>
              <div class="row row-separated"> -->
        <!-- <div class="flex xs1"></div>
                <div class="flex xs3">
                  <div
                    style="background: #f3f6f9;
    border: 2px solid #f4f6fc;
    border-radius: 10px;
    padding: 20px 20px;
    
    margin: 20px 20px
    white-space: nowrap;"
                  > -->
        <!-- <div class="row">
                      <div class="flex xs2 mx-2">
                        <div style="background-color: #eef1f5; border-radius: 50%; width: fit-content; padding: 10px">
                          <va-icon class="" name="home" color="#7367F0" size="large" />
                        </div>
                      </div>

                      <div class="flex xs8"> -->
        <!-- <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.dark }">3</h2>
                        <p class="">Buildings</p>
                      </div> -->
        <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->
        <!-- <div class="flex xs4">
                <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.primary }">3</h2>
                <p class="va-text-center">{{ t('dashboard.info.users') }}</p>
              </div>
              <div class="flex xs4">
                <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.info }">24</h2>
                <p class="va-text-center no-wrap">{{ t('dashboard.info.points') }}</p>
              </div>
              <div class="flex xs4">
                <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.warning }">91</h2>
                <p class="va-text-center">{{ t('dashboard.info.units') }}</p>
              </div>
                <div class="flex xs4">
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.info }">24</h2>
                  <p class="va-text-center no-wrap">Communities</p>
                </div>
                <div class="flex xs4">
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.warning }">91</h2>
                  <p class="va-text-center">Building Units</p>
                </div>
                <div class="flex xs4">
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.warning }">91</h2>
                  <p class="va-text-center">Community Units</p>
                </div>

                <div class="flex xs4">
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.warning }">91</h2>
                  <p class="va-text-center">Units</p>
                </div>
              </div>
           
          </va-card-content>
        </va-card> -->
        <!-- <va-card>
            <va-card-header><h3>Statistics</h3></va-card-header>
            <va-card-content>
              <h2 class="va-h2 ma-0" :style="{ color: colors.primary }">291</h2>
              <p class="no-wrap">{{ t('dashboard.info.completedPullRequests') }}</p>
            </va-card-content>
          </va-card> -->
      </div>
      <!-- <div class="flex xs12 sm6 md6">
        <va-card>
          <va-card-content>
            <div class="row row-separated">
              <div class="flex xs4">
                <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.primary }">3</h2>
                <p class="va-text-center">{{ t('dashboard.info.users') }}</p>
              </div>
              <div class="flex xs4">
                <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.info }">24</h2>
                <p class="va-text-center no-wrap">{{ t('dashboard.info.points') }}</p>
              </div>
              <div class="flex xs4">
                <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.warning }">91</h2>
                <p class="va-text-center">{{ t('dashboard.info.units') }}</p>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </div> -->
    </div>
  </div>

  <!-- <div class="flex xs12 sm6 md6 xl3 lg3">
      <va-card stripe stripe-color="info">
        <va-card-title>
          {{ t('dashboard.info.componentRichTheme') }}
        </va-card-title>
        <va-card-content>
          <p class="rich-theme-card-text">
            Buying the right telescope to take your love of astronomy to the next level is a big next step.
          </p>

          <div class="mt-3">
            <va-button color="primary" target="_blank" href="https://github.com/epicmaxco/vuestic-ui">
              {{ t('dashboard.info.viewLibrary') }}
            </va-button>
          </div>
        </va-card-content>
      </va-card>
    </div> -->

  <!-- <div class="flex xs12 sm6 md6 xl3 lg3">
      <va-card>
        <va-image :src="images[currentImageIndex]" style="height: 200px" />
        <va-card-title>
          <va-button preset="plain" icon-right="fa-arrow-circle-right" @click="showModal">
            {{ t('dashboard.info.exploreGallery') }}
          </va-button>
        </va-card-title>
      </va-card>
    </div> -->
  <!-- <va-modal v-model="modal">
      <va-carousel v-model="currentImageIndex" :items="images" class="gallery-carousel" />
    </va-modal> -->
  <!-- </div> -->

  <!-- <dashboard-charts /> -->

  <!-- <dashboard-info-block /> -->

  <!-- <div class="row row-equal">
      <div class="flex xs12 lg6">
        <dashboard-tabs @submit="addAddressToMap" />
      </div> -->

  <!-- <div class="flex xs12 lg6">
        <DashboardMap ref="dashboardMap" />
      </div> -->
  <!-- </div> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // import DashboardCharts from './DashboardCharts.vue'
  // import DashboardInfoBlock from './DashboardInfoBlock.vue'
  // import DashboardTabs from './DashboardTabs.vue'
  // import DashboardMap from './DashboardMap.vue'

  // import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { VaCarousel, VaModal, VaCard, VaCardContent, VaCardTitle, VaButton, VaImage, useColors } from 'vuestic-ui'
  import service from '../../../../src/auth/service'

  const temp = new service()

  const { t } = useI18n()
  const { colors } = useColors()

  const summary = ref([])

  const buildingCount = ref(0)
  const communitiesCount = ref(0)
  const buildingUnitsCount = ref(0)
  const CommunityUnitsCount = ref(0)
  const UnitsCount = ref(0)

  const infoTiles = ref([
    {
      color: 'success',
      value: '803',
      text: 'commits',
      icon: '',
    },
    {
      color: 'danger',
      value: '57',
      text: 'components',
      icon: '',
    },
    {
      color: 'info',
      value: '5',
      text: 'teamMembers',
      icon: '',
    },
  ])

  const modal = ref(false)
  const currentImageIndex = ref(0)
  const images = ref([
    'https://i.imgur.com/qSykGko.jpg',
    'https://i.imgur.com/jYwT08D.png',
    'https://i.imgur.com/9930myH.jpg',
    'https://i.imgur.com/2JxhWD6.jpg',
    'https://i.imgur.com/MpiOWbM.jpg',
  ])

  function showModal() {
    modal.value = true
  }

  const dashboardMap = ref()

  function addAddressToMap({ city, country }: { city: { text: string }; country: string }) {
    dashboardMap.value.addAddress({ city: city.text, country })
  }

  function getSummary() {
    temp
      .getDashboardSummary()
      .then((response) => {
        summary.value = response.data.data

        buildingCount.value = response.data.data.building_count
        communitiesCount.value = response.data.data.community_count
        buildingUnitsCount.value = response.data.data.building_unit_count
        CommunityUnitsCount.value = response.data.data.community_unit_count
        UnitsCount.value = response.data.data.unit_count

        console.log(response.data.data)
        // localStorage.setItem('userData', JSON.stringify(response))

        // setLogin.setToken(response.data.access_token)
        // service.setRefreshToken(response.data.refresh_token)
      })
      .catch((error) => {
        console.log(error.response)

        // init({
        //     message: 'Invalid Credentials',
        //     position: 'top-right',
        //     duration: Number(2500),
        //     color: 'danger',
        //   })
      })
  }

  getSummary()
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
      &__title {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
