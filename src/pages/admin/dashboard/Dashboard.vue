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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { VaCard, VaCardContent, VaCardTitle, useColors } from 'vuestic-ui'
  import service from '../../../../src/auth/service'
  import { ToastPosition, useToast } from 'vuestic-ui'

  const temp = new service()

  const { t } = useI18n()
  const { colors } = useColors()

  const summary = ref([])
  const { init } = useToast()

  const buildingCount = ref(0)
  const communitiesCount = ref(0)
  const buildingUnitsCount = ref(0)
  const CommunityUnitsCount = ref(0)
  const UnitsCount = ref(0)

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
      })
      .catch((error) => {
        console.log(error.response)

        init({
          message: `${error.response.data.message}`,
          position: 'top-right',
          duration: Number(2500),
          color: 'danger',
        })
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
